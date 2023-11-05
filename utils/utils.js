const ethers = require('ethers');
const dotenv = require('dotenv');

const gnosis_abi = require('../gnosis/out/Surveyvor.sol/Surveyvor.json');
const ierc20_abi = require('../gnosis/out/IERC20.sol/IERC20.json');
const self_kiss_abi = require('./other_abis/selfkiss.json');
const chronicle_oracle_abi = require('./other_abis/chronicle_oracle.json');
const { CHRONICLE_SMART_CONTRACTS, ADDRESS_MAPPINGS } = require('./constants.js');

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const deployer_wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);
const surveyprod_wallet = new ethers.Wallet(process.env.SURVEYPROD_PRIVATE_KEY, provider);
const respondent_wallet = new ethers.Wallet(process.env.RESPONDENT_PRIVATE_KEY, provider);

const contract_using_deployer = new ethers.Contract(process.env.SC_ADDRESS, gnosis_abi.abi, deployer_wallet);
const contract_using_surveyprod = new ethers.Contract(process.env.SC_ADDRESS, gnosis_abi.abi, surveyprod_wallet);
const contract_using_respondent = new ethers.Contract(process.env.SC_ADDRESS, gnosis_abi.abi, respondent_wallet);



// We read the owner o the contract
async function get_owner() {
    const owner = await contract_using_deployer.owner();
    return owner;
}

async function get_survey(_id, chain_id) {
    const survey = await contract_using_deployer.get_survey(_id);
    let currency_reward = survey[1]; //raw address
    currency_reward = ADDRESS_MAPPINGS[chain_id][currency_reward]; //mapping
    let decimals = currency_reward.decimals;
    currency_reward = currency_reward.tracker; //symbol
    let price_in_usd = await get_price(currency_reward + "_USD");
    return {
        reward_respondent: survey[0].toString() / (10 ** decimals),
        reward_respondent_usd: survey[0].toString() / (10 ** decimals) * price_in_usd,
        currency_reward: currency_reward,
        campaign_budget: survey[2].toString() / (10 ** decimals),
        survey_link: survey[3],
        id: survey[4].toString(),
        start_date: survey[5].toString(),
        respondent_count: survey[6].toString(),
        surveyprod_address: survey[7],
    };
}

async function whitelist_deployer_on_chronicle() {
    const provider_sepolia = new ethers.JsonRpcProvider(process.env.RPC_URL_SEPOLIA);
    const deployer_wallet_sepolia = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider_sepolia);
    let kiss_contract = new ethers.Contract(CHRONICLE_SMART_CONTRACTS.SELF_KISSER, self_kiss_abi.abi, deployer_wallet_sepolia);
    let oracles = Object.values(CHRONICLE_SMART_CONTRACTS)
    oracles = oracles.slice(1, oracles.length);
    for (let i = 0; i < oracles.length; i++) {
        try {
            const tx = await kiss_contract.selfKiss(oracles[i]);
            const receipt = await tx.wait(3);
            console.log(receipt);
            // we send the tx
        } catch (e) {
            console.log(e);
        }
    }

}

// USE ME !
async function get_price(pair) {
    let oracle_address = CHRONICLE_SMART_CONTRACTS[pair];
    const provider_sepolia = new ethers.JsonRpcProvider(process.env.RPC_URL_SEPOLIA);
    const deployer_wallet_sepolia = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider_sepolia);
    let oracle_contract = new ethers.Contract(oracle_address, chronicle_oracle_abi.abi, deployer_wallet_sepolia);
    const decimals = await oracle_contract.decimals();
    const price = await oracle_contract.tryRead();
    return parseFloat(price[1] / BigInt(BigInt(10) ** decimals))
}

async function approve_token(_token, _spender, _amount) {
    const ierc20_contract = new ethers.Contract(_token, ierc20_abi.abi, surveyprod_wallet);
    const tx = await ierc20_contract.approve(_spender, _amount);
    return tx;
}

async function create_survey(
    _respondent_reward,
    _currency_reward,
    _campaign_budget,
    _survey_link
) {
    //REQUIRES PRELIMINARY APPROVE OF TOKENS
    const tx = await contract_using_surveyprod.create_survey(
        _respondent_reward,
        _currency_reward,
        _campaign_budget,
        _survey_link
    );
    return tx;
}

async function close_survey(_survey_id) {
    const tx = await contract_using_surveyprod.close_survey(_survey_id);
    const receipt = await tx.wait(3);
    return receipt;
}

async function add_respondent(_survey_id, _respondent_address, _iexec_dataset_address, reputation_reward) {
    const tx = await contract_using_deployer.add_respondent(_survey_id, _respondent_address, _iexec_dataset_address, reputation_reward);
    const receipt = await tx.wait(3);
    return receipt;
}


module.exports = {
    get_survey,
    add_respondent
};

/* 
// // // We create an async environment for calling getOwner() function
(async () => {
//     // const owner = await get_owner();
//     // console.log(owner);

    let respondent_reward = 2;
    let campaign_budget = 18;
    let GNO = "0x19C653Da7c37c66208fbfbE8908A5051B57b4C70";
    let survey_link = "https://jixajiah.com";

    // // PRELIMINARY APPOVE
    // let tx = await approve_token(GNO, process.env.SC_ADDRESS, campaign_budget);
    // await tx.wait(3);
    // console.log(tx);
    
    // // NOW THAT APPROVE OCCURRED, WE CAN CREATE THE SURVEY
    // tx = await create_survey(respondent_reward, GNO, campaign_budget, survey_link);
    // await tx.wait(3);
    // console.log(tx);

//     // WE CAN CHECK THE SURVEY
//     let survey = await get_survey(0);
//     console.log(survey);

//     // WHITELISTING SERVICE ACCOUNT (DEPLOYER) ON CHRONICLE
//     // await whitelist_deployer_on_chronicle();

//     // // TRY TO ACCESS TO PRICES
//     // let price = await get_price("ETH_USD");
//     // console.log(price);

//     // // CLOSE SURVEY
//     // let receipt = await close_survey(0);
//     // console.log(receipt);

//     // // ADD RESPONDENT
    let id = 3;
    let respondent_address = process.env.RESPONDENT_PUBLIC_KEY;
    let iexec_dataset_address = "0x0000000000000000000000000000000000000000";
    let reputation_reward = 1;
    let tx = await add_respondent(id, respondent_address, iexec_dataset_address, reputation_reward);
    console.log(tx);

})();

 */
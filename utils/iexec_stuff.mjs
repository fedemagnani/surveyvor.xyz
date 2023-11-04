import { IExecDataProtector, getWeb3Provider } from "@iexec/dataprotector";
import {ethers} from 'ethers';
// We load dotenv
import dotenv from 'dotenv';
dotenv.config();

const PRIVATE_KEY  = process.env.RESPONDENT_PRIVATE_KEY; 
// let wallet = new ethers.Wallet(PRIVATE_KEY);
// console.log(wallet);

const web3Provider = getWeb3Provider(PRIVATE_KEY);
// instantiate
const dataProtector = new IExecDataProtector(web3Provider);

(async() => {
    const protectedData = await dataProtector.protectData({
        data: {
            email: 'example@gmail.com',
            password: 'password',
            otherstuff: 'otherstuff',
        }
    })
    console.log(protectedData);
})();

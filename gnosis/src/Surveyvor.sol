// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
// We import IERC20.sol from OpenZeppelin contracts
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
struct Survey {
    uint256 respondent_reward; //total number of respondents fixed for the campaign
    address currency_reward; //address of the currency used to reward the respondents
    uint256 campaign_budget; //balance of the survey (when the balance is 0, the survey is closed)
    string survey_link; //link to the survey (either ipfs or generic url to a survey schema)

    uint256 id; //unique id of the survey
    uint256 start_date; //start date of the campaign
    uint256 respondent_count; //number of respondents who have responded to the survey
    address surveyprod_address; //surveyprod address 
}    

contract Surveyvor is Ownable{
    uint256 public survey_count = 0;
    mapping(uint256 => Survey) public surveys;
    mapping(uint256 => address[]) public survey_respondents; 
    mapping(address => uint256[]) public respondent_surveys;
    mapping(address => address) public respondents_iexec_dataset_address; 
    mapping(address => uint256) public respondents_reputation;

    event SurveyCreated(
        uint256 id,
        address surveyprod_address,
        uint256 capacity,
        uint256 start_date,
        uint256 balance
    );
    event SurveyResponded(
        uint256 id,
        address surveyprod_address,
        address respondent
    );


    constructor() {}

    function get_survey(uint256 _id) public view returns (Survey memory) {
        return surveys[_id];
    }

    modifier is_survey_active(uint256 _id) {
        require(
            surveys[_id].campaign_budget > 0,
            "Survey is not active anymore"
        );
        _;
    }

    modifier is_surveyprod(uint256 _id) {
        require(
            msg.sender == surveys[_id].surveyprod_address,
            "Only the surveyprod can call this function"
        );
        _;
    }

    function edit_survey_reward(uint256 _id, uint256 _new_reward) public is_surveyprod(_id) {
        surveys[_id].respondent_reward = _new_reward;
    }

    function increase_survey_budget(uint256 _id, uint256 _budget) public {
        bool result =  IERC20(surveys[_id].currency_reward).transferFrom(msg.sender, address(this), _budget); //recall that here is the surveyvor contract which calls the transferFrom function        
        require(result, "Not enough budget for survey");
        surveys[_id].campaign_budget += _budget;
    }

    function close_survey(uint256 _id) public is_surveyprod(_id)  returns(address[] memory) {
        // We send the remaining budget back to the surveyprod
        uint256 withdrawable_amount = surveys[_id].campaign_budget;
        if (surveys[_id].campaign_budget > IERC20(surveys[_id].currency_reward).balanceOf(address(this))) {
            withdrawable_amount = IERC20(surveys[_id].currency_reward).balanceOf(address(this));
        }
        IERC20(surveys[_id].currency_reward).transfer(msg.sender, withdrawable_amount);
        surveys[_id].campaign_budget = 0;    
        address[] memory respondents = survey_respondents[_id];
        // We preallocate an array with same length of respondents
        address[] memory iexec_datasets = new address[](respondents.length);
        // We iterate over the respondents
        for (uint256 i = 0; i < respondents.length; i++) {
            // We get the iexec dataset address of the respondent
            address iexec_dataset_address = respondents_iexec_dataset_address[respondents[i]];
            // We add the iexec dataset address to the array
            iexec_datasets[i] = iexec_dataset_address;
        }
        return iexec_datasets;
    }

    function add_respondent (uint256 _id, address _respondent, address _iexec_dataset_address, uint256 reputation_reward) public is_survey_active(_id) onlyOwner() {
        // We add the respondent to the list of respondents
        survey_respondents[_id].push(_respondent);
        // We add the survey to the list of surveys of the respondent
        respondent_surveys[_respondent].push(_id);
        // We add the iexec dataset address of the respondent
        respondents_iexec_dataset_address[_respondent] = _iexec_dataset_address;
        // We add the reputation reward of the respondent
        respondents_reputation[_respondent] += reputation_reward;

        uint256 survey_reward = surveys[_id].respondent_reward;
        if (surveys[_id].respondent_reward > IERC20(surveys[_id].currency_reward).balanceOf(address(this))) {
            survey_reward = IERC20(surveys[_id].currency_reward).balanceOf(address(this));
        }

        // We increase the allowance of the respondent 
        // uint256 past_allowance = IERC20(surveys[_id].currency_reward).allowance(address(this), _respondent);
        // IERC20(surveys[_id].currency_reward).approve(_respondent, past_allowance + survey_reward);

        // Instead of increasing the allowance of the respondent, we directly transfer the reward to the respondent
        IERC20(surveys[_id].currency_reward).transfer(_respondent, survey_reward);

        // We decrease the budget of the survey
        if (surveys[_id].campaign_budget >= survey_reward){
            surveys[_id].campaign_budget -= survey_reward;
        }else{
            surveys[_id].campaign_budget = 0;
        }
        // We increase the number of respondents
        surveys[_id].respondent_count += 1;
        emit SurveyResponded(_id, surveys[_id].surveyprod_address, _respondent);
    }

    function create_survey(
        uint256 _respondent_reward,
        address _currency_reward,
        uint256 _campaign_budget,
        string memory _survey_link
    ) public {
        bool result =  IERC20(_currency_reward).transferFrom(msg.sender, address(this), _campaign_budget); //recall that here is the surveyvor contract which calls the transferFrom function        
        require(result, "Not enough budget for survey");
        surveys [survey_count] = Survey(
            _respondent_reward,
            _currency_reward,
            _campaign_budget,
            _survey_link,
            survey_count,
            block.timestamp,
            0,
            msg.sender
        );
        emit SurveyCreated(
            survey_count,
            msg.sender,
            _respondent_reward,
            block.timestamp,
            _campaign_budget
        );
        survey_count++;
    }



}

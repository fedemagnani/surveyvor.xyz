// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Surveyvor, Survey} from "../src/Surveyvor.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SurveyvorTest is Test {
    Surveyvor public surveyvor;

    // address WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address GNO = 0x19C653Da7c37c66208fbfbE8908A5051B57b4C70;
    address WETH = 0x19C653Da7c37c66208fbfbE8908A5051B57b4C70;
    address USDC = 0x57f7E6ceAc40Aa078F4461ca7946d310A8642A3C;

    address deployer = address(0x01);
    address surveyprod = address(0x02);
    address respondent = address(0x03);
    address respondent_iexec_dataset = address(0x04);






    // SETUP
    function setUp() public {
        vm.startPrank(deployer);
        surveyvor = new Surveyvor(deployer);
        vm.stopPrank();
    }

    // INTERNAL FUNCTIONS
    function _create_survey(uint256 _respondent_reward, address _currency_reward, uint256 _campaign_budget, string memory _survey_link) internal {
        vm.startPrank(surveyprod);
        deal(WETH, surveyprod, _campaign_budget);
        IERC20(WETH).approve(address(surveyvor), _campaign_budget);
        surveyvor.create_survey(_respondent_reward, _currency_reward, _campaign_budget, _survey_link);
        vm.stopPrank();
    }

    function _edit_survey_reward(uint256 _survey_id, uint256 _new_reward) internal {
        vm.startPrank(surveyprod);
        surveyvor.edit_survey_reward(_survey_id, _new_reward);
        vm.stopPrank();
    }

    function _increase_budget(uint256 _survey_id, uint256 _airdrop_budget) internal {
        vm.startPrank(surveyprod);
        deal(WETH, surveyprod, _airdrop_budget);
        IERC20(WETH).approve(address(surveyvor), _airdrop_budget);
        surveyvor.increase_survey_budget(_survey_id, _airdrop_budget);
        vm.stopPrank();
    }

    function _close_survey(uint256 _survey_id) internal {
        vm.startPrank(surveyprod);
        surveyvor.close_survey(_survey_id);
        vm.stopPrank();
    }

    function _add_respondent(uint256 _survey_id, address _respondent, address _iexec_dataset_address, uint256 _reputation_reward) internal {
        vm.startPrank(deployer);
        surveyvor.add_respondent(_survey_id, _respondent, _iexec_dataset_address, _reputation_reward);
        vm.stopPrank();
    }

    // TESTS

    // TEST 1 params: Create a survey
    uint256 campaign_budget = 10 ;
    uint256 respondent_reward = 5 ;
    string survey_link = "https://www.survey.com";
    address currency_reward = WETH;

    function test_survey_creation() public {
        _create_survey(respondent_reward, currency_reward, campaign_budget, survey_link);
        // We make sure that the balance of surveyvor is equal to the campaign budget
        uint256 _survey_id = surveyvor.survey_count() - 1;
        Survey memory _survey = surveyvor.get_survey(_survey_id);
        assertEq(_survey.campaign_budget, campaign_budget);
        assertEq(IERC20(WETH).balanceOf(address(surveyvor)), campaign_budget);

    }

    // TEST 2 params: Edit a survey reward
    uint256 survey_id = 0;
    uint256 new_reward = 6 ;

    function test_edit_survey_reward() public {
        _create_survey(respondent_reward, currency_reward, campaign_budget, survey_link);
        _edit_survey_reward(survey_id, new_reward);
        // We check that the reward has been updated
        assertEq(surveyvor.get_survey(survey_id).respondent_reward, new_reward);
    }


    // TEST 3 params: Edit a survey reward and increase budget
    uint256 airdrop_budget = 5 ;

    function test_edit_survey_reward_and_increase_budget() public {
        _create_survey(respondent_reward, currency_reward, campaign_budget, survey_link);
        _edit_survey_reward(survey_id, new_reward);
        _increase_budget(survey_id, airdrop_budget);
        // We make sure that the survey budget has been increased
        assertEq(surveyvor.get_survey(survey_id).campaign_budget, campaign_budget + airdrop_budget); 
        // ... and that the associated balance has been increased
        assertEq(IERC20(WETH).balanceOf(address(surveyvor)), campaign_budget + airdrop_budget);  
    }

    // TEST 4 params: Close a survey
    function test_close_survey() public {
        _create_survey(respondent_reward, currency_reward, campaign_budget, survey_link);
        // We make sure that the balance of surveyvor is equal to the campaign budget, while the balance of surveyprod is equal to 0
        uint256 _survey_id = surveyvor.survey_count() - 1;
        Survey memory _survey = surveyvor.get_survey(_survey_id);
        assertEq(_survey.campaign_budget, campaign_budget);
        assertEq(IERC20(WETH).balanceOf(address(surveyvor)), campaign_budget);
        assertEq(IERC20(WETH).balanceOf(surveyprod), 0);
        _close_survey(survey_id);
        // We make sure that the balance of surveyprod is equal to the campaign budget, while the balance of surveyvor is equal to 0
        _survey_id = surveyvor.survey_count() - 1;
        _survey = surveyvor.get_survey(_survey_id);
        assertEq(IERC20(WETH).balanceOf(address(surveyvor)), 0);
        assertEq(_survey.campaign_budget, 0);
        assertEq(IERC20(WETH).balanceOf(surveyprod), campaign_budget);
    }

    // TEST 5 params: Respond to a survey
    uint256 reputation_reward = 1;

    function test_add_respondent() public {
        _create_survey(respondent_reward, currency_reward, campaign_budget, survey_link);
        uint256 _survey_id = surveyvor.survey_count() - 1;
        Survey memory _survey = surveyvor.get_survey(_survey_id);
        uint256 _reward = _survey.respondent_reward;
        uint256 _budget = _survey.campaign_budget;
        uint256 _balance = IERC20(currency_reward).balanceOf(address(surveyvor));
        uint256 _balance_respondent = IERC20(currency_reward).balanceOf(respondent);
        _add_respondent(survey_id, respondent, respondent_iexec_dataset, reputation_reward);
        _survey = surveyvor.get_survey(_survey_id);
        uint256 post_budget = _survey.campaign_budget;
        uint256 _post_balance = IERC20(currency_reward).balanceOf(address(surveyvor));
        uint256 _post_balance_respondent = IERC20(currency_reward).balanceOf(respondent);
        // We check that the difference in budget is equal to the reward
        assertEq(_budget - post_budget, _reward);
        // We check that the balance of surveyvor has been lowered by the reward
        assertEq(_balance - _post_balance, _reward);
        // We check that the balance of the respondent has been increased by the reward
        assertEq( _post_balance_respondent- _balance_respondent, _reward);
    }
}

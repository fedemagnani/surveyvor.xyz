// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Surveyvor} from "../src/Surveyvor.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SurveyvorTest is Test {
    Surveyvor public surveyvor;
    address WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    function setUp() public {
        surveyvor = new Surveyvor();
    }

    // function test_check_weth_balance() public {
    //     // we try to create a survey with 1000 gas but without having the balance 
    //     uint256 balance = IERC20(WETH).balanceOf(address(0xF04a5cC80B1E94C69B48f5ee68a08CD2F09A7c3E));
    //     console2.log("balance", balance);
    // }

    function test_survey_creation() public {
        // we try to create a survey with 1000 gas but without having the balance, so we expect a revert

        uint256 campaign_budget = 1 ether;
        uint256 respondent_reward = 0.5 ether;

        vm.startPrank(address(0x01));
        // vm.expectRevert("Not enough gas for survey");
        // surveyvor.create_survey(respondent_reward, address(WETH), campaign_budget, ""); 
        // Now we suppose that we actually do have the sufficent balance...
        deal(WETH, address(0x01), campaign_budget);
        // ... we allow the surveyvor contract to spend our tokens
        IERC20(WETH).approve(address(surveyvor), campaign_budget);
        // we log the allowance of the surveyvor contract
        uint256 allowance = IERC20(WETH).allowance(address(0x01), address(surveyvor));
        console2.log("allowance", allowance);
        // ... and we create the survey
        surveyvor.create_survey(respondent_reward, address(WETH), campaign_budget, "");
        // we make sure that the survey has been created and that WETH balance of the surveyvor contract is equal to the campaign budget
        assertEq(surveyvor.get_survey(0).campaign_budget, campaign_budget);
        assertEq(IERC20(WETH).balanceOf(address(surveyvor)), campaign_budget);
    }

    // function testFuzz_SetNumber(uint256 x) public {
    //     counter.setNumber(x);
    //     assertEq(counter.number(), x);
    // }
}

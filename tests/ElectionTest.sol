// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "../contracts/Election.sol";

contract BallotTest {
   
    bytes32[] proposalNames;
   
    Election VoteToTest;
    function beforeAll () public {
        proposalNames.push(bytes32("Donald Trump"));
        proposalNames.push(bytes32("Joe Biden"));
        VoteToTest = new Election(proposalNames);
    }
    
    function checkWinningProposal () public {
        VoteToTest.vote(0);
        Assert.equal(VoteToTest.winningCandidate(), bytes32("Donald Trump"), "Donald Trump should be the winner name");
    }
    
    function checkGetTotalVoteCountForCandidate () public view returns (bool) {
        return VoteToTest.getTotalVoteCountForCandidate(0) == 1;
    }
}
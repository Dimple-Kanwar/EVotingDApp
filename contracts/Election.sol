// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Election
 * @dev Implements voting process
 */
contract Election {
   
    bytes32[] public CandidateNames;

    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        uint vote;   // index of the voted candidate
        uint voteExpiry; // expiryTimestamp after which voter cannot vote
    }

    mapping(address => Voter) public voters;

    struct Candidate {
        // If you can limit the length to a certain number of bytes, 
        // always use one of bytes1 to bytes32 because they are much cheaper
        bytes32 name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
        address[] votersList;
    }

    address public chairperson;

    Candidate[] public candidates;

    /** 
     * @dev Create a new election to choose one of 'Donald Trump' and 'Joe Biden'.
     */
    constructor() {
        CandidateNames.push(bytes32("Donald Trump"));
        CandidateNames.push(bytes32("Joe Biden"));
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        for (uint i = 0; i < CandidateNames.length; i++) {
            // 'Candidate({...})' creates a temporary
            // Candidate object and 'candidates.push(...)'
            // appends it to the end of 'candidates'.
            candidates.push(Candidate({
                name: CandidateNames[i],
                voteCount: 0,
                votersList: new address[](0)
            }));
        }
    }
    
    /** 
     * @dev Give 'voter' the right to vote on this election. May only be called by 'chairperson'.
     * @param voter address of voter
     */
    function giveRightToVote(address voter) public {
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote."
        );
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    /**
     * @dev Give your vote to candidate 'JoeBiden' or 'DonaldTrump'.
     * @param candidateIndex index of candidate in the candidates array
     */
    function vote(uint candidateIndex) public {
        require(candidateIndex < candidates.length, "user can choose either 0 or 1 only");
        Voter storage voter = voters[msg.sender];
        require(voter.weight != 0, "Has no right to vote");
        require(!voter.voted, "Already voted.");

        voter.voted = true;
        voter.vote = candidateIndex;
        voter.voteExpiry = block.timestamp + (2 * 1 days); // it will expire after 2 days
        
        // If 'candidate' is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        candidates[candidateIndex].voteCount += voter.weight; // add voteCount of new candidate
        candidates[candidateIndex].votersList.push(msg.sender); // add voter to new candidate
    }

    // remove an element from voterList array of the candidates array
    function remove(uint _cindex, uint _index) internal {
        require(_cindex < candidates.length, "index out of bound for candidates");
        require(_index < candidates[_cindex].votersList.length, "index out of bound for voterList");

        for (uint i = _index; i < candidates[_cindex].votersList.length - 1; i++) {
            candidates[_cindex].votersList[i] = candidates[_cindex].votersList[i + 1];
        }
        candidates[_cindex].votersList.pop();
    }

    /**
     * @dev Voter can change its decision after voting once but before voteExpiry time
     * @param candidateIndex index of candidate in the candidates array
     */
    function changeVote(uint candidateIndex) public {
        require(candidateIndex < candidates.length, "user can choose either 0 or 1 only");
        Voter storage voter = voters[msg.sender];
        require(voter.weight != 0, "Has no right to vote");
        require(voter.voted, "voter has not voted once.");
        require(block.timestamp <= voter.voteExpiry, "Time expired for vote change");
        
        voter.vote = candidateIndex;
        // If 'candidate' is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        for (uint i = 0; i < CandidateNames.length; i++) {
            if(i == candidateIndex){
                candidates[i].voteCount += voter.weight;
                candidates[i].votersList.push(msg.sender);
            }else{
                for (uint v = 0; v < candidates[i].votersList.length; v++){
                    if(candidates[i].votersList[v] == msg.sender){
                      remove(i, v); // remove voter address from votersList
                      candidates[i].voteCount -= voter.weight;  // decrease voteCount by voter.weight
                    } 
                }
            }
        }
        
    }

    /** 
     * @dev Computes the winning candidate taking all previous votes into account.
     * @return winningCandidate_ name of winning candidate in the candidates array
     */
    function winningCandidate() public view
            returns (bytes32 winningCandidate_)
    {
        uint winningVoteCount = 0;
        for (uint c = 0; c < candidates.length; c++) {
            if (candidates[c].voteCount > winningVoteCount) {
                winningVoteCount = candidates[c].voteCount;
                winningCandidate_ = candidates[c].name;
            }
        }
    }

    /**
    * @return voteCount total vote, how many vote for Trump and how many vote for Joe Biden
    */
    function getTotalVoteCountForCandidate(uint candidateIndex) public view returns(uint voteCount)
    {
        require(candidateIndex < candidates.length, "user can choose either 0 or 1 only");
        return candidates[candidateIndex].voteCount;
    }

    /**
    * @return votersList list accounts vote for Trump, and list account vote for Joe Biden
    */
    function getVoterListForCandidate(uint candidateIndex) public view returns(address[] memory votersList)
    {
        require(candidateIndex < candidates.length, "user can choose either 0 or 1 only");
        return candidates[candidateIndex].votersList;
    }
}

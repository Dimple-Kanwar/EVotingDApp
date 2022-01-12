import { expect } from "chai";
import web3 from "web3";

describe("Election contract", function () {
    // Mocha has four functions that let you hook into the the test runner's
    // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

    // They're very useful to setup the environment for tests, and to clean it
    // up after they run.

    // A common pattern is to declare some variables, and assign them in the
    // `before` and `beforeEach` callbacks.

    let Election;
    let election;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    // `beforeEach` will run before each test, re-deploying the contract every
    // time. It receives a callback, which can be async.
    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        Election = await ethers.getContractFactory("Election");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        // To deploy our contract, we just have to call Election.deploy() and await
        // for it to be deployed(), which happens once its transaction has been
        // mined.
        election = await Election.deploy();
    });

    // You can nest describe calls to create subsections.
    describe("Deployment", function () {
        // `it` is another Mocha function. This is the one you use to define your
        // tests. It receives the test name, and a callback function.

        it("Should get the chairperson of the election", async function () {
            // Expect receives a value, and wraps it in an Assertion object. These
            // objects have a lot of utility methods to assert values.

            // This test expects the owner variable stored in the contract to be equal
            // to our Signer's owner.
            expect(await election.chairperson()).to.equal(owner);
        });

        // If the callback function is async, Mocha will `await` it.
        it("Should get the right candidate name", async function () {
            // Expect receives a value, and wraps it in an Assertion object. These
            // objects have a lot of utility methods to assert values.

            // This test expects the owner variable stored in the contract to be equal
            // to our Signer's owner.
            expect(await election.CandidateNames(0)).to.equal("0x446f6e616c64205472756d700000000000000000000000000000000000000000");
            expect(await election.CandidateNames(1)).to.equal("0x4a6f6520426964656e0000000000000000000000000000000000000000000000");
        });

        it("Should get the candidate's voteCount to be zero", async function () {
            const candidate1 = await election.candidates(0);
            const candidate2 = await election.candidates(1);
            expect(await candidate1.voteCount).to.equal(0);
            expect(await candidate2.voteCount).to.equal(0);
        });
    });

    describe("Transactions", function () {
        it("Should be able to grant vote right to an account", async function () {
            // Give right to addr1 for vote
            await election.giveRightToVote(addr1.address);

            // expect(await election.voters(addr1.address)).to.equal({
            //     "0": "uint256: weight 1",
            //     "1": "bool: voted false",
            //     "2": "uint256: vote 0",
            //     "3": "uint256: voteExpiry 0"
            // });
        });

        it("Should be able to choose only 1 or 0 for candidates", async function () {
            // Give right to addr1 for vote
            await election.giveRightToVote(addr1.address);

            // vote candidate 0 - Donald Trump
            await election.connect(addr1).vote(0);
            expect(await election.CandidateNames(0)).to.equal("0x446f6e616c64205472756d700000000000000000000000000000000000000000");
            expect(await election.getTotalVoteCountForCandidate(0)).to.equal(1);

            // vote candidate 1 - Joe Biden
            await election.vote(1);
            expect(await election.CandidateNames(1)).to.equal("0x4a6f6520426964656e0000000000000000000000000000000000000000000000");
            expect(await election.getTotalVoteCountForCandidate(1)).to.equal(1);

            // vote candidate 2
            expect(await election.vote(2)).to.be.revertedWith("user can choose either 0 or 1 only");

        });

        it("One account can vote only one time", async function () {

            // Give right to addr1 for vote
            await election.giveRightToVote(addr1.address);

            // Vote to Donald Trump
            await election.connect(addr1).vote(0);
            expect(await election.CandidateNames(0)).to.equal("0x446f6e616c64205472756d700000000000000000000000000000000000000000");
            expect(await election.getTotalVoteCountForCandidate(0)).to.equal(1);

            // Try to vote Joe Biden after voting Donald Trump
            // `require` will evaluate false and revert the transaction.
            await expect(await election.vote(1)).to.be.revertedWith("Already voted.");
        });

        it("Should get totalVoteCount for a specific candidate", async function () {
            // Give right to addr1 for vote
            await election.giveRightToVote(addr1.address);

            // Vote to Donald Trump
            await election.connect(addr1).vote(0);
            // check vote count for Donald Trump
            expect(await election.getTotalVoteCountForCandidate(0)).to.equal(1);

        });

        it("Should get voters list for a specific candidate", async function () {
            // Give right to addr1 for vote
            await election.giveRightToVote(addr1.address);

            // Vote to Donald Trump
            await election.connect(addr1).vote(0);
            // check List of voters for Donald Trump
            expect(await election.getVoterListForCandidate(0)).to.equal(owner.address);
        });

        it("Should get the winning candidate", async function () {
            // Give right to addr1 for vote
            await election.giveRightToVote(addr1.address);

            // Vote to Donald Trump
            await election.connect(addr1).vote(0);

            // Check winningCandidate of the election.
            const winningCandidate = await election.winningCandidate();
            expect(winningCandidate).to.equal("0x446f6e616c64205472756d700000000000000000000000000000000000000000");
        });

        it("Should be able to change voting decision", async function () {

            // Give right to addr1 for vote
            await election.giveRightToVote(addr1.address);

            // Vote to Donald Trump
            await election.connect(addr1).vote(0);

            // check List of voters for Donald Trump
            expect(await election.getVoterListForCandidate(0)).contains(owner.address);

            // change Vote to Joe Biden
            await election.changeVote(1);

            // check List of voters for Donald Trump
            expect(await election.getVoterListForCandidate(0)).not.contains(owner.address);

            // check List of voters for Joe Biden
            expect(await election.getVoterListForCandidate(1)).contains(owner.address);
        });
    });
});
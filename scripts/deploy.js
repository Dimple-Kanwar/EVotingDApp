const { ethers } = require("hardhat");
const web3 = require("web3");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);


    const Election = await ethers.getContractFactory("Election");
    const election = await Election.deploy();
    await election.deployed();

    console.log("Election address:", election.address);
    // We also save the contract's artifacts and address in the frontend directory
    saveFrontendFiles(election);
}
  
function saveFrontendFiles(election) {
    
    const contractsDir = __dirname + "/../frontend/src/contracts";
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      contractsDir + "/contract-address.json",
      JSON.stringify({ Election: election.address }, undefined, 2)
    );
  
    const ElectionArtifact = artifacts.readArtifactSync("Election");
  
    fs.writeFileSync(
      contractsDir + "/Election.json",
      JSON.stringify(ElectionArtifact, null, 2)
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
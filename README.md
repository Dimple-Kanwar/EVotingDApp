# EVotingDApp
## Business Requirement:
1.Write a simple dapp (Solidity on Ethereum) that user can using metamask to vote for Trump or Biden with following condition: <br/>
	&emsp;&emsp; i) There are 2 options to choose, voting for Donald Trump or Joe Biden <br/>
	&emsp;&emsp; ii) One account can vote only one time. <br/>
	&emsp;&emsp; iii) Before specific time (can be configured at deployment), user can change his decision. <br/>
	&emsp;&emsp; iv) After endtime user cannot change his vote, only can view <br/>
	&emsp;&emsp; v) Show total vote, how many vote for Trump and how many vote for Joe Biden <br/>
	&emsp;&emsp; vi) Show list accounts vote for Trump, and list account vote for Joe Biden <br/>
2.Write a service that listens to dapp, and alert the console when there is any change in voting result. <br/>
3.Provide script to deploy contracts on testnet (ropsten or rinkeby) <br/>

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/Dimple-Kanwar/EVotingDApp.git
cd EVotingDApp
npm install
```

Once installed, let's run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

Finally, we can run the frontend with:

```sh
cd frontend
npm install
npm start
```

> Note: There's [an issue in `ganache-core`](https://github.com/trufflesuite/ganache-core/issues/650) that can make the `npm install` step fail. 
>
> If you see `npm ERR! code ENOLOCAL`, try running `npm ci` instead of `npm install`.

Open [http://localhost:3000/](http://localhost:3000/) to see your Dapp. You will
need to have [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.


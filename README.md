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

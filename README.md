# iotex  
This code is to integrate IoTeX mainnet chain tracking API that returns transactions count and UAW count for the given dApp smart contracts (addresses).  
Blockchain data will be uploaded to `MongoDB`, in case nodes are not accessible anymore, we still can have access to the data using stored transactions.

The codes implements web3 client using `express.js` to fetch transactions from nodes properly which you can find more info in the `queue` folder.

The codes also implements an API using `Symfony` to return calculated metrics based on the transactions fetched data which you can find more info in the `webapp` folder.

At the moment, the codes tracks blocks in range from 23224028 to 23226158 only. If you want to change this range, please take a look at `.env` file.

---

API returns a JSON respons as follow:   
```
{ "transactionsCount": 123, "uawCount": 23 };
```
 - `uawCount` stands for unique wallet addresses (interacting with the smart contracts) 
 - `transactionsCount` is simply the sum of all transactions

---
Transactions have `from` and `to` fields, where
 - `from` fom is the wallet address that is interacting with the contract
 - `to` is the smart contract address

---

# Installation
It's peace of cake. You just need to have `docker` already installed on your OS and then run following codes in the terminal:
```shell
chmod +x install.sh
./install.sh
```
[![Docker installation](https://github.com/onlymaj/iotex/blob/main/images/docker.png?raw=true "Docker installation")](https://github.com/onlymaj/iotex/blob/main/images/docker.png?raw=true "Docker installation")

# How to Run ?
To run the downloader queue for transactions, you just need to open following url on your web browser:
```
http://localhost:3000/q/start
```
[![Run queue](https://github.com/onlymaj/iotex/blob/main/images/startq.png?raw=true "Run queue")](https://github.com/onlymaj/iotex/blob/main/images/startq.png?raw=true "Run queue")

you can see the running queue using following url :
```
http://localhost:3002/queues/
```
[![Bullmq Monitor](https://github.com/onlymaj/iotex/blob/main/images/monitor.png?raw=true "Bullmq Monitor")](https://github.com/onlymaj/iotex/blob/main/images/monitor.png?raw=true "Bullmq Monitor")

To view mongodb results, you can open following url on your web browser:
```
http://localhost:8081/
```
[![Mongo Express](https://github.com/onlymaj/iotex/blob/main/images/express.png?raw=true "Mongo Express")](https://github.com/onlymaj/iotex/blob/main/images/express.png?raw=true "Mongo Express")

To get for `0x04C22AfaE6a03438b8FED74cb1Cf441168DF3F12` smart contract you can visit following url :
```
http://localhost:8000/trx/0x04C22AfaE6a03438b8FED74cb1Cf441168DF3F12
```
[![Api result](https://github.com/onlymaj/iotex/blob/main/images/transactions.png?raw=true "Api result")](https://github.com/onlymaj/iotex/blob/main/images/transactions.png?raw=true "Api result")
---
# Used Technologies
- Chain website: https://iotex.io/
- [Docker](https://www.docker.com/)
- [BullMQ](https://github.com/taskforcesh/bullmq)
- [Express.js](https://expressjs.com/)
- [Symfony](https://symfony.com/)
- [Redis](https://redis.io/)
- [MongoDB](https://www.mongodb.com/)
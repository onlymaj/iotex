import { Queue, Worker } from 'bullmq';
import redisconn from '../redisConn.js';
import { Web3 } from 'web3';
import config from 'dotenv';
config.config();

import schema from '../iotex.schema.js';

const nameQ = 'transactions';

const providers = [
  new Web3('https://babel-api.mainnet.iotex.io'),
  new Web3('https://babel-api.mainnet.iotex.one'),
  new Web3('https://iotexrpc.com'),
  new Web3('https://rpc.ankr.com/iotex'),
  new Web3('https://iotex-rpc.gateway.pokt.network')
];


const blocksQ = new Queue(nameQ, {connection: redisconn});

const getNode = (attemps) => {
  return providers[attemps % providers.length];
}

async function fetchTransactions(blockNumber, attempts) {
  try {
    const node = getNode(attempts);
    const block = await node.eth.getBlock(blockNumber);

    if (!block) {
      throw new Error(`Block ${blockNumber} not found`);
    }
    
    const result = [];
    for (let txHash of block.transactions) {
      try
      {
        const tx = await node.eth.getTransaction(txHash);
        if(tx.to !== null)
        {
          result.push({
            block: blockNumber,
            hash: txHash.toString(),
            from: tx.from.toString(),
            to: tx.to.toString(),
            none: tx.nonce.toString(),
          });
        }
      }
      catch(e){
        console.log(e.message);
      }
    }
    return result;
  } catch (error) {
    console.log(`Error occurred: ${error}`);
  }
}

const blocksWorker = new Worker(nameQ, async (job)=>{
  try
  {
    const results = await schema.find({ block: job.data.number });
    if(results.length == 0)
    {
      const transactions = await fetchTransactions(job.data.number, job.opts.attempts);
      schema.insertMany(transactions);
    }
      return true;
  }
  catch(e){
    throw new Error(e.message);
  }
}, {
  connection: redisconn,
  concurrency: 50,
});

export {blocksQ,blocksWorker};

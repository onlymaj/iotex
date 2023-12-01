import express from 'express';

const router = express.Router();
import { blocksQ, blocksWorker } from '../queues/blocksQ.js';


router.get('/start', (req, res) => {
    for (let blockNumber = process.env.START_BLOCK;
        blockNumber <= process.env.END_BLOCK;
        blockNumber++) {
        blocksQ.add('blockjob', { number: blockNumber });
    }
    let msg = 'Blocks Queue is already started working !';
    if (!blocksWorker.isRunning()) {
        msg = 'Blocks Queue started to work !';
        blocksWorker.run();
    }
    res.json({ content: msg });
});

export default router;
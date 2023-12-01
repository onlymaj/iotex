import express from 'express';
import {connectToMongo} from './mongoose.js';
import config from 'dotenv';
config.config();
import blocksRoute from './routes/blocks.js';



const app = express();
connectToMongo();

app.get('/', (req, res) => {
  res.json({ content: 'iotex-iotex v0.1' });
});

app.use('/q', blocksRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server listening on port ${port}!`));
import config from 'dotenv';
config.config();

console.log(process.env.REDIS_HOST, process.env.REDIS_PORT);

export default {
  host: 'redis',
  port: '6379'
};
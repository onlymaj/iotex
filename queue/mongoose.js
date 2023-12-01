import mongoose from 'mongoose';

mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

// print mongoose logs in dev env
if (process.env.ENV === 'development') {
    mongoose.set('debug', true);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */

export const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URI, {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        auth: { authSource: 'admin' },
    }).then(() => console.log('MongoDB Connected!'));
    return mongoose.connection;
};

const getMongoConnection = () => mongoose.connection;

export default {connectToMongo, getMongoConnection};
import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line no-unused-vars
import bodyParser from "body-parser";
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import scheduler from './services/twitter-scheduler';
import mongoDbAdapter from './services/mongodb-adapter';
// import { Client } from '@elastic/elasticsearch';
import logger from './lib/logger';

dotenv.config();

const port = 3001;
const app = express();
// const client = new Client({ node: 'http://localhost:9200' });
const databaseUrl = 'mongodb://localhost:27017/searching-for-javascript';

(async () => {
	try {
		await mongoose.connect(databaseUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	} catch (err) {
		logger.error('Mongo connection error: ', err);
	}
})();

const db = mongoose.connection;
db.on('error', logger.error.bind(logger, 'Mongo connection error:'));
db.once('open', logger.log.bind(logger, 'Mongo connection established'));

scheduler();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.use(bodyParser.json());

app.post('/tweets', (req) => {
    const tweets = req.body.statuses;
    tweets.forEach( async (tweet) => {
        await mongoDbAdapter.saveTweet(tweet);
    });

})

app.listen(port, () => logger.log(`App is listening on port ${port}`));

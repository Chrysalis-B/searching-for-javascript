import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line no-unused-vars
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
// import { Client } from '@elastic/elasticsearch';
import scheduler from './services/twitter-scheduler';
import mongoDbAdapter from './services/mongodb-adapter';
import logger from './lib/logger';

const port = 3001;
const app = express();
// const client = new Client({ node: 'http://localhost:9200' }); // eslint-disable-line no-unused-vars
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

app.use(cors());
app.use(bodyParser.json());

app.post('/tweets', async req => {
	try {
		const tweets = req.body.statuses;
		if (tweets.length > 0) {
			tweets.forEach(async tweet => {
				await mongoDbAdapter.saveTweet(tweet);
			});
		}
	} catch (err) {
		logger.error('Error in /tweets POST: ', err);
	}
});

app.get('/search', async (req, res) => {
	try {
		const query = req.query.q;
		if (query.length > 0) {
			const result = await mongoDbAdapter.searchTweets(query);
 			res.json(result);
		}
	} catch (err) {
		logger.error('Error in /search GET: ', err);
		res.status(500);
	}
});

app.listen(port, () => logger.log(`App is listening on port ${port}`));

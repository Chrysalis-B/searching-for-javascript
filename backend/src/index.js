import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line no-unused-vars
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import twitterScheduler from './services/twitter-scheduler';
import mongoDbAdapter from './services/mongodb-adapter';
import logger from './lib/logger';

const port = 3001;
const app = express();
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

twitterScheduler();

app.use(cors());

app.get('/search', async (req, res) => {
	const query = decodeURIComponent(req.query.q);
	if (!query || query.length === 0) {
		return res.sendStatus(400);
	}
	try {
		const result = await mongoDbAdapter.searchTweets(query);
		return res.json(result);
	} catch (err) {
		logger.error('Error in /search GET: ', err);
		return res.sendStatus(500);
	}
});

app.listen(port, () => logger.log(`App is listening on port ${port}`));

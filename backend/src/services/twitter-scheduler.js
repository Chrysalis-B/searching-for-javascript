import cron from 'node-cron';
import mongoDbAdapter from './mongodb-adapter';
import getTweets from './twitter';
import twitterPoster from './twitter-poster';
import logger from '../lib/logger';

const twitterScheduler = () => {
	cron.schedule('*/5 * * * * *', async () => {
		try {
            const sinceId = await mongoDbAdapter.getSinceId();
            const encodedUri = encodeURIComponent('#javascript AND -filter:retweets AND -filter:replies');
			const twitterQuery = `search/tweets.json?since_id=${sinceId}&count=100&q=${encodedUri}`;
			const tweets = await getTweets(twitterQuery);
			await mongoDbAdapter.saveAsSinceId(
				tweets.search_metadata.max_id_str
            );
			twitterPoster(tweets.statuses);
		} catch (err) {
			logger.log('Error in twitter scheduler', err);
		}
	});
};

export default twitterScheduler;

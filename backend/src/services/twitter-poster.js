import logger from '../lib/logger';
import mongoDbAdapter from './mongodb-adapter';

const twitterPoster = tweets => {
	try {
		if (tweets.length > 0) {
			tweets.forEach(async tweet => {
				await mongoDbAdapter.saveTweet(tweet);
			});
		}
	} catch (err) {
		logger.error('Error in saving tweets', err);
	}
};

export default twitterPoster;

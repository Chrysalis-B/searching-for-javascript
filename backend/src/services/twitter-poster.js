import logger from '../lib/logger';

const request = require('request');

const twitterPoster = tweets => {
	request.post(
		process.env.TWITTER_POSTER_URI,
		{
			json: tweets
		},
		(error, res, body) => {
			if (error) {
				logger.error(error);
				return;
			}
			logger.log(`statusCode: ${res.statusCode}`);
			logger.log(body);
		}
	);
};

export default twitterPoster;

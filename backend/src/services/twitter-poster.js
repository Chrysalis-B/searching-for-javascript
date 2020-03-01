import request from 'request';
import logger from '../lib/logger';

const twitterPoster = tweets => {
	request.post(
		'http://localhost:3001/tweets',
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

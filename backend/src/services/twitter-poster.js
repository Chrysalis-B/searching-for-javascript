import fetch from 'node-fetch';
import logger from '../lib/logger';

const twitterPoster = tweets => {
	fetch('http://localhost:3001/tweets', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(tweets)
	})
		.then(res => logger.log(res))
		.catch(err => logger.error(err));
};

export default twitterPoster;

import Twitter from 'twitter-lite';
import logger from '../lib/logger';


const getTweets = async url => {
	try {
		const user = new Twitter({
			consumer_key: process.env.TWITTER_CONSUMER_KEY,
			consumer_secret: process.env.TWITTER_CONSUMER_SECRET
		});

		const response = await user.getBearerToken();

		const app = new Twitter({
			bearer_token: response.access_token
		});

		const tweets = await app.get(url);

		return tweets;
	} catch (err) {
		return logger.error(err);
	}
};

export default getTweets;

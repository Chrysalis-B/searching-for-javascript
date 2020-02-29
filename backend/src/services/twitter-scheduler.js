import cron from 'node-cron';
import mongoDbAdapter from './mongodb-adapter';
import getTweets from './twitter';
import twitterPoster from './twitter-poster';


const scheduler = () => {
	cron.schedule('*/5 * * * * *', async () => {
        const sinceId = await mongoDbAdapter.getSinceId();
        const twitterQuery = `search/tweets.json?since_id=${sinceId}&q=%23javascript%20AND%20-filter%3Aretweets%20AND%20-filter%3Areplies`;
        const tweets = await getTweets(twitterQuery);
        await mongoDbAdapter.saveAsSinceId(tweets.search_metadata.max_id_str);
        twitterPoster(tweets);
	});
};

export default scheduler;
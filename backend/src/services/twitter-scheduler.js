import cron from 'node-cron';
import mongoDbAdapter from './mongodb-adapter';
import getTweets from './twitter';

const scheduler = () => {
	cron.schedule('*/5 * * * * *', async () => {
        const TwitterUrl = await mongoDbAdapter.getNewestUrl();
        const tweets = await getTweets(`search/tweets.json${TwitterUrl.queryUrl}`);
        await mongoDbAdapter.saveNewestUrl(tweets.search_metadata.next_results);
        // call app post api to save tweets
	});
};

export default scheduler;
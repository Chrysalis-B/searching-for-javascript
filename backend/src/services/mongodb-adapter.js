import SinceId from '../models/since-id';
import Tweet from '../models/tweet';

const mongoDbAdapter = {
	getSinceId: async () => {
		const query = SinceId.findOne({})
			.sort({ _id: -1 })
			.limit(1);
		const result = await query.exec();
		return result ? result.sinceId : '0';
	},
	saveAsSinceId: async maxId => {
		const query = new SinceId({ sinceId: maxId });
		const result = await query.save();
		return result;
	},
	saveTweet: async tweet => {
		const tweetObject = new Tweet({
			created_at: tweet.created_at,
			id: tweet.id_str,
			text: tweet.text,
			userId: tweet.user.id_str,
			userName: tweet.user.name,
			userImg: tweet.user.profile_image_url
		});
		await tweetObject.save();
	},
	searchTweets: async q => {
		const result = await Tweet.search({
			query_string: { query: q }
		});
		return result;
	}
};

export default mongoDbAdapter;

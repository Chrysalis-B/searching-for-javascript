import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';
import Promise from 'bluebird';

const schema = new mongoose.Schema(
	{
		created_at: Date,
		id: String,
		text: { type: String, es_indexed: true },
		userId: String,
		userName: String,
		userImg: String
	},
	{ collection: 'tweets' }
);

schema.plugin(mongoosastic, { hydrate: true, hydrateOptions: { lean: true } });

const Tweet = mongoose.model('Tweet', schema);

Tweet.search = Promise.promisify(Tweet.search, { context: Tweet });

export default Tweet;

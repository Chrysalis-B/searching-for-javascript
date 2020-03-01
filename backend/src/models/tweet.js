import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';
import { promisify } from 'util';

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

schema.plugin(mongoosastic, { hydrate: true, hydrateOptions: { sort: '-created_at', limit: 100  } });

const Tweet = mongoose.model('Tweet', schema);

Tweet.search = promisify(Tweet.search);

export default Tweet;

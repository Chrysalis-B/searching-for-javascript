import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		sinceId: String
	},
	{ collection: 'sinceIds' }
);

const SinceId = mongoose.model('SinceId', schema);

export default SinceId;

import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

const schema = new mongoose.Schema(
    {
        created_at: Date,
        id: String,
        text: String,
        userId: String,
        userName: String,
        userImg: String
    }, {collection: 'tweets'}
);

schema.plugin(mongoosastic);

const Tweet = mongoose.model('Tweet', schema);


export default Tweet;
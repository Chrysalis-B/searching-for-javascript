import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        created_at: Date,
        id: String,
        text: String,
        userId: String,
        userName: String,
        userImg: String
    },
    { collection: 'tweets' }
)

const Tweet = mongoose.model('Tweet', schema);

export default Tweet;
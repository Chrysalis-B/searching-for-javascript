import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        queryUrl: String
    }
)

const TwitterUrl = mongoose.model('TwitterUrl', schema);

export default TwitterUrl;
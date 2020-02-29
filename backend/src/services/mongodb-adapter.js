import TwitterUrl from '../models/twitter-url';

const mongoDbAdapter = {
	getNewestUrl: async () => {
		const query = TwitterUrl.findOne({})
			.sort({_id: -1 })
			.limit(1);
        const result = await query.exec();
		return result;
    },
    saveNewestUrl: async (url) => {
        const query = new TwitterUrl(
            {queryUrl: url}
        );
        const result = await query.save()
        return result;
    }
};

export default mongoDbAdapter;

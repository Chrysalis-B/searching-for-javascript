import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line no-unused-vars
import express from 'express';
import mongoose from 'mongoose';

const port = 3001;
const app = express();
const databaseUrl = 'mongodb://localhost:27017/searching-for-javascript';

(async () => {
	try {
		await mongoose.connect(databaseUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	} catch (err) {
        console.error('Mongo connection error: ', err);
	}
})();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error:'));
db.once('open', console.log.bind(console, 'Mongo connection established'));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.listen(port, () => console.log(`App is listening on port ${port}`));

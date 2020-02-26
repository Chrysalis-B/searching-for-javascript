import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line no-unused-vars
import express from 'express';
import mongoose from 'mongoose';
import { Client } from '@elastic/elasticsearch';
import logger from './lib/logger'

const client = new Client({ node: 'http://localhost:9200' });

async function run () {
    // Let's start by indexing some data
    await client.index({
      index: 'game-of-thrones',
      // type: '_doc', // uncomment this line if you are using {es} ≤ 6
      body: {
        character: 'Ned Stark',
        quote: 'Winter is coming.'
      }
    })
  
    await client.index({
      index: 'game-of-thrones',
      // type: '_doc', // uncomment this line if you are using {es} ≤ 6
      body: {
        character: 'Daenerys Targaryen',
        quote: 'I am the blood of the dragon.'
      }
    })
  
    await client.index({
      index: 'game-of-thrones',
      // type: '_doc', // uncomment this line if you are using {es} ≤ 6
      body: {
        character: 'Tyrion Lannister',
        quote: 'A mind needs books like a sword needs a whetstone.'
      }
    })
  
    // We need to force an index refresh at this point, otherwise we will not
    // get any result in the consequent search
    await client.indices.refresh({ index: 'game-of-thrones' })
  
    // Let's search!
    const { body } = await client.search({
      index: 'game-of-thrones',
      // type: '_doc', // uncomment this line if you are using {es} ≤ 6
      body: {
        query: {
          match: { quote: 'winter' }
        }
      }
    })
  
    logger.log(body.hits.hits)
  }
  
  run().catch(logger.log);

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
		logger.error('Mongo connection error: ', err);
	}
})();

const db = mongoose.connection;
db.on('error', logger.error.bind(logger, 'Mongo connection error:'));
db.once('open', logger.log.bind(logger, 'Mongo connection established'));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.listen(port, () => logger.log(`App is listening on port ${port}`));

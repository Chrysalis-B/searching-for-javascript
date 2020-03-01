# Searching for javacsript

The repo consists of a node backend server and a React frontend.

## Prerequisites

1. node 11 or higher
2. yarn 1
3. elasticSearch 7
4. mongo 4

## Setup

The application expects mongo running on port `27017` and elasticSearch on port `9200` and 
the twitter api consumer key and secret to be saved as environment variables.

To start the frontend & backend:

1. `yarn`
2. `yarn start`

This will start the frontend on port `3000` and the backend on port `3001`.

You can also start each part seperately by running `yarn start` in their respective folders.

## Design decisions & approaches tried

To pull tweets via the twitter API I decided to implement a cron job that calls the API at an interval within
the rate limits of the twitter API `backend/src/services/twitter-scheduler.js`. 
The search query is #javascript and replies and retweets are filtered out. 
The `max_id` of the result will be saved and used as a `since_id` for the following
request, so only tweets that have not yet been pulled will be included in the response.
The tweets are then stored to mongo and elasticSearch in `backend/src/services/twitter-poster.js`.

Ideally this job would run as a seperate service and call an endpoint in the application. For the purpose of this
exercise and due to time constraints I decided to have it included and accessible in the backend application. 
The job will be triggered when the application starts.

I decided to use mongoose in order to generate schemas. For elasticSearch I first implemented the node 
elasticSearch Client but then decided to use the plugin mongoosastic to map the mongoose schema to elasticSearch `backend/src/models/tweet.js`. 
This way the schema does not need to be duplicated and there will be one source of truth. The content
of the tweets will be indexed in elasticSearch and the rest of the fields, like username and avatar, 
will be hydrated with data from mongo for the frontend to consume. The results are limited to the 100 latest tweets.

The elasticSearch query is fairly simple but I would love to take the time to dig deeper into the topic of building queries with it.

To communicate with twitter I decided to use the library twitter-lite `backend/src/services/twitter.js`. The library enabled me
to easily generate the token needed for the requests made on behalf of the application.

For the frontend I decided to user create-react-app as I wanted to get up and running fast but also demonstrate skills in working with
a framework.

I decided to use the Material-UI component library. This way I was able to implement a decent UI quickly.

Unfortunately due to time constraints tests are not implemented.

Thank you for the time to review this project, I am looking forward to your feedback 🙋🏼‍♀️

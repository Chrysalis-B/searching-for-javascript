# Searching for javacsript

The repo consists of a node backend server and a React frontend.

## Prerequisites

1. node 11 or higher
2. yarn 1
3. elasticSearch 7
4. mongo 4

## Setup

The application expects mongo running on port `27017` and elasticSearch on port `9200`.
The application expects the twitter api consumer key and secret to be saved as environment variables.

To start the frontend & backend:

1. `yarn`
2. `yarn start`

This will start the frontend on port `3000` and the backend on port `3001`.

You can also start each part seperately by running `yarn start` in their respective folders.

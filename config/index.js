require('dotenv').config()
const { MongoClient } = require('mongodb')

const config = {
    dev: process.env.NODE_ENV !== 'production',
    mongo_uri: process.env.DB_CONNECTION,
    db_name: process.env.DB_NAME,
    sentryDns: process.env.SENTRY_DNS,
    sentryId: process.env.SENTRY_ID
}

module.exports = {config}
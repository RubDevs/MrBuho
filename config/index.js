require('dotenv').config()
const { MongoClient } = require('mongodb')

const config = {
    dev: process.env.NODE_ENV !== 'production',
    mongo_uri: process.env.DB_CONNECTION,
    db_name: process.env.DB_NAME,
    sentryDns: process.env.SENTRY_DNS,
    sentryId: process.env.SENTRY_ID,
    authAdminUsername: process.env.AUTH_ADMIN_USERNAME,
    authAdminPassword: process.env.AUTH_ADMIN_PASSWORD,
    authAdminEmail: process.env.AUTH_ADMIN_EMAIL,
    authJwtSecret: process.env.AUTH_JWT_SECRET
}

module.exports = {config}
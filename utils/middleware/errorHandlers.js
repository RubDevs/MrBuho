const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const { config } = require('../../config/index')
const sentryDns = `${config.sentryDns}.ingest.sentry.io/${config.sentryId}`
Sentry.init({
    dsn: sentryDns,
  
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });

function logErrors(err,req,res,next){
    Sentry.captureException(err)
    console.log(err.stack)
    next(err)
}

function clientErrorHandler(err,req,res,next){
    //Catch errors from AJAX request
    if (req.xhr) {
        res.status(500).json({err: err.message})
    }else{
        next(err)
    }
}

function errorHandler(err,req,res,next) {
    //catch error while streaming
    if(res.headersSent){
        next(err)
    }

    if(!config.dev){
        delete err.stack
    }

    res.status(err.status || 500)
    res.render("error", { error: err })
}

module.exports = {
    logErrors,
    clientErrorHandler,
    errorHandler
}
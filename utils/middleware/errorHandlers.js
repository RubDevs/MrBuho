const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const { config } = require('../../config/index')
const boom = require('@hapi/boom')
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi')

const sentryDns = `${config.sentryDns}.ingest.sentry.io/${config.sentryId}`
Sentry.init({
    dsn: sentryDns,
  
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });

  function withErrorStack(err, stack) {
      if (config.dev) {
          return { ...err, stack } //Object.assign({},err,stack)
      }
  }

function logErrors(err,req,res,next){
    Sentry.captureException(err)
    console.log(err.stack)
    next(err)
}

function wrapErrors(err,req,res,next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err))
    }
    next(err)
}

function clientErrorHandler(err,req,res,next){
    const {
        output: {statusCode, payload}
    } = err
    //Catch errors from AJAX request or while streaming
    if (isRequestAjaxOrApi(req) || req.headersSent) {
        res.status(statusCode).json(withErrorStack(payload, err.stack))
    }else{
        next(err)
    }
}

function errorHandler(err,req,res,next) {
    const {
        output: {statusCode, payload}
    } = err

    res.status(statusCode)
    res.render("error", withErrorStack(payload, err.stack))
}

module.exports = {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler
}
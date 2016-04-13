/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

  middleware: {

  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

    // order: [
    //   'startRequestTimer',
    //   'cookieParser',
    //   'session',
    //   'myRequestLogger',
    //   'bodyParser',
    //   'handleBodyParserError',
    //   'compress',
    //   'methodOverride',
    //   'poweredBy',
    //   '$custom',
    //   'router',
    //   'www',
    //   'favicon',
    //   '404',
    //   '500'
    // ],

  /****************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/

    // myRequestLogger: function (req, res, next) {
    //     console.log("Requested :: ", req.method, req.url);
    //     return next();
    // }


  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default as of v0.10, Sails uses                                          *
  * [skipper](http://github.com/balderdashy/skipper). See                    *
  * http://www.senchalabs.org/connect/multipart.html for other options.      *
  *                                                                          *
  ***************************************************************************/

    // Every custom middleware must be a function with (req, res, next) params,
    // but we want to initialize a couple of different body parsers and we
    // don't want to do it on every request.  The solution is to create the
    // body parsers as closure variables inside of a self-calling function that
    // returns the middleware function that Sails will use.
    bodyParser: (function() {
      // Initialize a skipper instance with the default options
      var skipper = require('skipper')();
      // Initialize an express-xml-bodyparser instance with the default options
      var xmlparser = require('express-xml-bodyparser')();
      // Create and return the middleware function
      return function(req, res, next) {
        // If we see an application/xml header, parse the body as XML
        var cType =req.headers['content-type'];
        if (cType){
          if (cType.indexOf('xml')>-1) {
            return xmlparser(req, res, next);
          }
        }
        // Otherwise use Skipper to parse the body
        return skipper(req, res, next);
      };
    })()

  },

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};

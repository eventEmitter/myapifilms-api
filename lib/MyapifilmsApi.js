!function() {

    var   Class              = require('ee-class')
        , log                = require('ee-log')
        , type               = require('ee-types')
        , RestfulAPI         = require('restful-api-client')
        , APISpecfication    = require('../definition/definition');




    module.exports = new Class({
        inherits: RestfulAPI

        , init: function init(options) {
            if (type.object(options)) {
                if (options.token) this.apiKey = options.token;
                if (options.rateLimit) APISpecfication.rateLimit = options.rateLimit;
            }
            else if (type.string(options)) this.apiKey = options;

            // automatically build the api
            return init.super.call(this, APISpecfication);
        }


        /**
         * add my auth token to each of the requests
         */
        , prepareRequest: function(request) {
            if (!request.query) request.query = {};

            request.query.format = 'json';

            // the api down regularly, we ddont want to wait for that
            request.timeout = 5000;

            if (this.apiKey) request.query.token = this.apiKey;
        }


        /**
         * add the content type to the response since
         * the omdb api is extremly not restful!
         */
        , prepareResponse: function(response) {
            if (response && response.headers) {
                response.headers['content-type'] = 'application/json';
            }
        }
    });
}();


(function(ng, _) {
    'use strict';

    ng.module('equilibrium', ['restangular', 'ui.router', 'ngSails'])
        .config(function(RestangularProvider, $sailsProvider) {
            
            //$sailsProvider.url = 'http://localhost:1337';

            RestangularProvider
                .addRequestInterceptor(function(el, operation) {
                    if (operation === 'put' || operation === 'post') {
                        // We don't need to send these to the API
                        var excluded_attrs = ['createdAt', 'updatedAt', 'originalElement'];
                        _.each(excluded_attrs, function(prop) {
                            if (el[prop]) {
                                delete el[prop];
                            }
                        });
                    }
                    return el;
                })
                .setResponseExtractor(function(response) {
                    var newResponse = response;
                    if (_.isArray(response)) {
                        _.each(newResponse, function(value, idx) {
                            newResponse[idx].originalElement = _.clone(value, true);
                        });
                    } else {
                        newResponse.originalElement = _.clone(response, true);
                    }
                    return newResponse;
                });
        });

})(
    window.angular,
    window._
);
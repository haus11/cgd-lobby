/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    /*
     * Server Routes
     */

    'GET    /games'                          : 'GameController.all',
    'POST   /game'                           : 'GameController.create',
    'PUT    /game/:gameid/join'              : 'GameController.join',
    'PUT    /game/:gameid/leave'             : 'GameController.leave',
    'PUT    /game/:gameid'                   : 'GameController.update',
    'DELETE /game/:gameid'                   : 'GameController.destroy',
    'GET    /game/:gameid'                   : 'GameController.get',
    'PUT    /game/:gameid/start'             : 'GameController.start',
    'PUT    /game/:gameid/finish'            : 'GameController.finish',

    /*
     * Session Routes
     */

    'POST  /game/:gameid/session'                   : 'SessionController.create',
    'POST  /game/:gameid/session/:session/round'    : 'SessionController.createRound',
    'GET   /game/:gameid/sessions'                  : 'SessionController.allForGame',

    /*
     * EntryExit Routes
     */

    'POST  /ee/restaurant'              : 'EERestaurantController.create',
    'POST  /ee/survey'                  : 'EESurveyController.create',
    'POST  /ee/survey/vote'             : 'EESurveyController.vote',


    /*
     * Applemarket Routes
     */

    'GET    /apple/createTransactions'          : 'AmTransactionController.test',
    'GET    /apple/transactions'                : 'AmTransactionController.all',
    'GET    /apple/transaction'                 : 'AmTransactionController.find',
    'GET    /apple/transaction/:id'             : 'AmTransactionController.findOne',
    'POST   /apple/transaction'                 : 'AmTransactionController.create',
    'PUT    /apple/transaction'                 : 'AmTransactionController.update',
    'DELETE /apple/transaction/:id'             : 'AmTransactionController.destroy',

    'GET    /apple/transaction/player/:player'  : 'AmTransactionController.getTransactionsOfPlayer',
    'GET    /apple/transaction/round/:round'    : 'AmTransactionController.getTransactionsOfRound',
    'GET    /apple/transaction/session/:session': 'AmTransactionController.getTransactionsOfSession',
    'GET    /apple/transaction/server/:server'  : 'AmTransactionController.getTransactionsOfServer',

    'GET    /apple/transaction/testMethod'      : 'AmTransactionController.testMethod',

    'GET    /apple/type'                        : 'AmTypeController.find',
    'GET    /apple/type/:id'                    : 'AmTypeController.findOne',
    'POST   /apple/type'                        : 'AmTypeController.create',
    'PUT    /apple/type'                        : 'AmTypeController.update',
    'DELETE /apple/type/:id'                    : 'AmTypeController.destroy',

    'POST  /apple/offer/'                       : 'OfferController.create',
    'PUT   /apple/offer/:offerid'               : 'OfferController.update',
    'GET   /apple/offer/'                       : 'OfferController.all'

    /*
     * Entry & Exit Routes
     */

    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     *  If a request to a URL doesn't match any of the custom routes above, it  *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
     ***************************************************************************/

};

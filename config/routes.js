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

   'GET     /api/server'            : 'ServerController.all',
   'POST    /api/server'            : 'ServerController.create',
   'PUT     /api/server/:id/join'   : 'ServerController.join',
   'PUT     /api/server/:id/rejoin' : 'ServerController.rejoin',

    /*
     * Applemarket Routes
     */
    'GET    /api/apple/transaction'                 : 'AmTransactionController.find',
    'GET    /api/apple/transaction/:id'             : 'AmTransactionController.findOne',
    'POST   /api/apple/transaction'                 : 'AmTransactionController.create',
    'PUT    /api/apple/transaction'                 : 'AmTransactionController.update',
    'DELETE /api/apple/transaction/:id'             : 'AmTransactionController.destroy',
    'GET    /api/apple/transaction/find/player'     : 'AmTransactionController.getTransactionsOfPlayer',
    'GET    /api/apple/transaction/find/round'      : 'AmTransactionController.getTransactionsOfRound',
    'GET    /api/apple/transaction/find/session'    : 'AmTransactionController.getTransactionsOfSession',
    'GET    /api/apple/transaction/find/server'     : 'AmTransactionController.getTransactionsOfServer',

    'GET    /api/apple/type'                        : 'AmTypeController.find',
    'GET    /api/apple/type/:id'                    : 'AmTypeController.findOne',
    'POST   /api/apple/type'                        : 'AmTypeController.create',
    'PUT    /api/apple/type'                        : 'AmTypeController.update',
    'DELETE /api/apple/type/:id'                    : 'AmTypeController.destroy',

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

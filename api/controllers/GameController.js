/**
 * GamesController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


    definition: function(req, res) {
        res.json(Games.definition);
    }

};


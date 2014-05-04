 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var roleHistoryModel = require('../model/role-history-model');

	var roleHistoryColl = Backbone.Collection.extend({

    	model: roleHistoryModel,

        url: '/role-history',

        columns: [],

        data: [],

        /**
         * Convert attributes data to model data.
         */
		parse: function(resp) {
			// Columns of User Group Table
			this.columns = resp['aoColumns'];
			//console.log(JSON.stringify(columns));

			var attributes = _.pluck(this.columns, 'mData');

			// Data of User Group Table
			var data = resp['aaData'];
			//console.log(JSON.stringify(data));

			for(var i = 0; i < data.length; i++) {
				var roleHistory = new this.model();
                _.each(attributes, function(attr) {
                	// console.log(attr +"---"+ data[i][attr]);
                	roleHistory.set(attr, data[i][attr]);
                });
                //push the model object
                this.push(roleHistory);
			}

            return this.models;
        },

		// filter out selected vehicle recrods.
        selected: function() {
            return this.filter(function(roleHistory) {
            	return roleHistory.get('is_selected') === true;
            });
        }
    });

    module.exports = new roleHistoryColl();
 });

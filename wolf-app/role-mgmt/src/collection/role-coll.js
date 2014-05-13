 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var roleModel = require('../model/role-model');

	var roleColl = Backbone.Collection.extend({

    	model: roleModel,

        url: '/roles',

        columns: [],

        data: [],

        /**
         * Convert attributes data to model data.
         */
		parse: function(resp) {
			// Columns of User Group Table
			this.columns = resp['aoColumns'];

			var attributes = _.pluck(this.columns, 'mData');

			// Data of User Group Table
			var data = resp['aaData'];

			for(var i = 0; i < data.length; i++) {
				var role = new this.model();
                _.each(attributes, function(attr) {
                	role.set(attr, data[i][attr]);
                });
                // Push the model object
                this.push(role);
			}

            return this.models;
        },

		// Filter out selected vehicle recrods.
        selected: function() {
            return this.filter(function(model) {
            	return model.get('is_selected') === true;
            });
        },
        
        unselectAll: function() {
        	this.forEach(function(model) {
            	model.set({'is_selected': false});
            });
        }
    });

    module.exports = new roleColl();
 });

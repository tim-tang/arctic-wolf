 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var criteriaModel = require('../model/criteria-model');

	var criteriaColl = Backbone.Collection.extend({

    	model: criteriaModel,

        url: App.WS_HOST + '/criterias',
        
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
				var criteria = new this.model();
                _.each(attributes, function(attr) {
                	// console.log(attr +"---"+ data[i][attr]);
                	criteria.set(attr, data[i][attr]);
                });
                //push the model object
                this.push(criteria);
			}
            
            return this.models;
        },

		// filter out selected vehicle recrods.
        selected: function() {
            return this.filter(function(criteria) {
            	return criteria.get('is_selected') === true;
            });
        }
    });

    module.exports = new criteriaColl();
 });

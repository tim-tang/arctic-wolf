 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var roleModel = require('../model/role-model');

	var roleColl = Backbone.Collection.extend({

    	model: roleModel,

        url: App.WS_HOST + '/roles',
        
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
				var role = new this.model();
                _.each(attributes, function(attr) {
                	// console.log(attr +"---"+ data[i][attr]);
                	role.set(attr, data[i][attr]);
                });
                //push the model object
                this.push(role);
			}
            
            return this.models;
        },

		// filter out selected vehicle recrods.
        selected: function() {
            return this.filter(function(role) {
            	return role.get('is_selected') === true;
            });
        }
    });

    module.exports = new roleColl();
 });

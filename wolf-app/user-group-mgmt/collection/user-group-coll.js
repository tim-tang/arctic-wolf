 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var userGroupModel = require('../model/user-group-model');

	var userGroupColl = Backbone.Collection.extend({

    	model: userGroupModel,

        url: App.WS_HOST + '/user-groups',
        
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
				var userGroup = new this.model();
                _.each(attributes, function(attr) {
                	// console.log(attr +"---"+ data[i][attr]);
                	userGroup.set(attr, data[i][attr]);
                });
                //push the model object
                this.push(userGroup);
			}
            
            return this.models;
        },

		// filter out selected vehicle recrods.
        selected: function() {
            // return this.filter(function(vehicle) {
                // return vehicle.get('is_selected') === true;
            // });
        }
    });

    module.exports = new userGroupColl();
 });

 define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var userModel = require('../model/user-model');

	var userColl = Backbone.Collection.extend({

    	model: userModel,

        url: App.WS_HOST + '/users',
        
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
				var user = new this.model();
                _.each(attributes, function(attr) {
                	// console.log(attr +"---"+ data[i][attr]);
                	user.set(attr, data[i][attr]);
                });
                //push the model object
                this.push(user);
			}
            
            return this.models;
        },

		// filter out selected vehicle recrods.
        selected: function() {
            return this.filter(function(user) {
            	return user.get('is_selected') === true;
            });
        }
    });

    module.exports = new userColl();
 });

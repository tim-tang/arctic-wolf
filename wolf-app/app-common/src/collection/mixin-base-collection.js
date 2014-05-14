define(function(require, exports, module) {

    var _ = require('underscore');
    var Backbone = require('backbone');

    var backboneCollectionMixin = require('../mixin/collection/backbone-collection-mixin');

    var baseCollection = Backbone.Collection.extend({

        // Convert attributes data to model data.
		parse: function(resp) {
			// Columns of Table
			this.columns = resp['aoColumns'];

			var attributes = _.pluck(this.columns, 'mData');

			// Data of Table
			var data = resp['aaData'];

			for(var i = 0; i < data.length; i++) {
				var _model = new this.model();
                _.each(attributes, function(attr) {
                	_model.set(attr, data[i][attr]);
                });
                // Push the model object
                this.push(_model);
			}

            return this.models;
        },

		// Filter out selected vehicle recrods.
        selected: function() {
            return this.filter(function(model) {
            	return model.get('is_selected') === true;
            });
        },
        
        // Unselect all models
        unselectAll: function() {
        	this.forEach(function(model) {
            	model.set({'is_selected': false});
            });
        }
        
    }, {
        mixin: backboneCollectionMixin.mixin
    });

    module.exports = baseCollection;
});

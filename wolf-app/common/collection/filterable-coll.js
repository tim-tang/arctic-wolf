 define(function(require, exports, module) {
     var $ = require('$');
     var _ = require('underscore');
     var Backbone = require('backbone');
     var eventBus = require('../../app-main/app-eventbus');

     var filterableColl = Backbone.Collection.extend({}, {

         search: function(query, options) {
             var search = $.Deferred();
             options = options || {};
             var collection = new this([], options);
             collection.url = _.result(collection, 'url') + '/filter';
             var fetch = collection.fetch({
                 data: {
                     q: query
                 }
             });

             fetch.done(_.bind(function() {
                 search.resolveWith(this, [collection]);
             }), this);

             fetch.fail(function() {
                 eventBus.trigger('generic-filter:failure');
                 search.reject();
             });

             return search.promise();
         }
     });

     module.exports = filterableColl;
 });

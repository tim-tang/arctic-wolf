define(function(require, exports, module) {


    var Backbone = require('backbone');
    var $ = require('$');
    var _ = require('underscore');

    var authenticationProvider = Backbone.Model.extend({

        url: 'http://localhost:5000/security',

        initialize: function() {
            //check for sessionStorage support
            if (Storage && sessionStorage) {
                this.supportStorage = true;
            }
        },

        //---------------- Methods For Local Storage ----------------//
        get: function(key) {
            if (!this.supportStorage) {
                return Backbone.Model.prototype.get.call(this, key);
            }
            var data = sessionStorage.getItem(key);
            if (data && data[0] !== '{') {
                return data;
            }
            return JSON.parse(data);
        },


        put: function(key, value) {
            if (this.supportStorage) {
                sessionStorage.setItem(key, value);
            } else {
                Backbone.Model.prototype.set.call(this, key, value);
            }
            return this;
        },

        remove: function(key) {
            if (this.supportStorage) {
                sessionStorage.removeItem(key);
            } else {
                Backbone.Model.prototype.unset.call(this, key);
            }
            return this;
        },

        clear: function() {
            if (!this.supportStorage) {
                return Backbone.Model.prototype.clear(this);
            }
            sessionStorage.clear();
        },


        //-------------------- Security APIs ------------------------//
        authenticate: function(credentials, callback) {
            var self = this;
            var authenticate = $.ajax({
                url: this.url + '/authenticate',
                data: credentials,
                type: 'POST',
            });

            authenticate.done(function(resp) {
                self.put('authenticated', true);
                self.put('security-user', JSON.stringify(resp.security_user));
                if (!self.get('redirect-url')) {
                    Backbone.history.navigate('#dashboard/', {
                        trigger: true
                    });
                    return callback();
                }
                var redirectUrl = self.get('redirect-url');
                self.remove('redirect-url');
                Backbone.history.navigate(redirectUrl, {
                    trigger: true
                });
                callback();
            });

            authenticate.fail(function(resp, status) {
                Backbone.history.navigate('#security/login', {
                    trigger: true
                });
                callback();
            });
        },

        signout: function(callback) {
            var self = this;
            var signout = $.ajax({
                url: this.url + '/signout',
                type: 'DELETE'
            });

            signout.done(function(resp) {
                self.clear();
                callback();
            });
        }
    });

    module.exports = new authenticationProvider()
});

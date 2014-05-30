define("wolf-app/security/0.0.1/index-debug", [ "./security-app-debug", "$-debug", "backbone-debug", "app-core-debug", "app-common-debug", "./view/security-login-debug", "parsley-debug", "./view/security-footer-debug", "./authentication/authentication-provider-debug", "underscore-debug", "./view/forgot-password-debug", "./view/reset-password-debug", "./view/404-debug", "./view/500-debug", "./router/security-router-debug", "subroute-debug" ], function(require, exports, module) {
    module.exports.SecurityApp = require("./security-app-debug");
    module.exports.AuthenticationProvider = require("./authentication/authentication-provider-debug");
});

define("wolf-app/security/0.0.1/security-app-debug", [ "$-debug", "backbone-debug", "app-core-debug", "app-common-debug", "wolf-app/security/0.0.1/view/security-login-debug", "parsley-debug", "wolf-app/security/0.0.1/view/security-footer-debug", "wolf-app/security/0.0.1/authentication/authentication-provider-debug", "underscore-debug", "wolf-app/security/0.0.1/view/forgot-password-debug", "wolf-app/security/0.0.1/view/reset-password-debug", "wolf-app/security/0.0.1/view/404-debug", "wolf-app/security/0.0.1/view/500-debug", "wolf-app/security/0.0.1/router/security-router-debug", "subroute-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var Backbone = require("backbone-debug");
    var appCore = require("app-core-debug");
    var appCommon = require("app-common-debug");
    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;
    var commonLoading = appCommon.CommonLoading;
    var securityApp = new Backbone.Layout({
        el: "#main-body",
        initialize: function() {
            eventBus.on("security:show-loading", this.show_loading, this);
            eventBus.on("security:hide-loading", this.hide_loading, this);
            eventBus.on("render-security-login", this.render_security_login, this);
            eventBus.on("render-forgot-password", this.render_forgot_password, this);
            eventBus.on("render-reset-password", this.render_reset_password, this);
            eventBus.on("render-404", this.render_404, this);
            eventBus.on("render-500", this.render_500, this);
        },
        beforeRender: function() {},
        afterRender: function() {},
        render_security_login: function() {
            require("wolf-app/security/0.0.1/view/security-login-debug").run("#security-container", viewManager);
        },
        render_forgot_password: function() {
            require("wolf-app/security/0.0.1/view/forgot-password-debug").run("#security-container", viewManager);
        },
        render_reset_password: function() {
            require("wolf-app/security/0.0.1/view/reset-password-debug").run("#security-container", viewManager);
        },
        render_404: function() {
            require("wolf-app/security/0.0.1/view/404-debug").run("#security-container", viewManager);
        },
        render_500: function() {
            require("wolf-app/security/0.0.1/view/500-debug").run("#security-container", viewManager);
        },
        show_loading: function() {
            commonLoading.init("#security-container");
        },
        hide_loading: function() {
            commonLoading.destroy();
        },
        invokeSecurityRouter: function() {
            var securityRouter = require("wolf-app/security/0.0.1/router/security-router-debug");
            return new securityRouter("security/", {
                createTrailingSlashRoutes: true
            });
        }
    });
    module.exports = securityApp;
});

define("wolf-app/security/0.0.1/view/security-login-debug", [ "backbone-debug", "$-debug", "parsley-debug", "wolf-app/security/0.0.1/view/security-footer-debug", "wolf-app/security/0.0.1/authentication/authentication-provider-debug", "underscore-debug", "app-core-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var $ = require("$-debug");
    require("parsley-debug");
    var securityFooter = require("wolf-app/security/0.0.1/view/security-footer-debug");
    var authenticationProvider = require("wolf-app/security/0.0.1/authentication/authentication-provider-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var securityLogin = Backbone.View.extend({
        manage: true,
        prefix: "security/src/tpl/",
        template: "security-login.html",
        initialize: function() {},
        afterRender: function() {
            var layoutFooterView = new securityFooter();
            this.insertView(".middle-login", layoutFooterView).render();
        },
        events: {
            "submit form": "authenticate"
        },
        authenticate: function(event) {
            if (event) event.preventDefault();
            if ($("#security-login-form").parsley().validate()) {
                var username = $("#username").val();
                var password = $("#password").val();
                eventBus.trigger("security:show-loading");
                authenticationProvider.authenticate({
                    username: username,
                    password: password
                }, function() {
                    //TODO: server side error handling
                    eventBus.trigger("security:hide-loading");
                });
            } else {
                console.log("Client side validate error.");
            }
        }
    });
    module.exports = {
        run: function(selector, viewManager) {
            viewManager.showLogin(selector, new securityLogin());
        }
    };
});

define("wolf-app/security/0.0.1/view/security-footer-debug", [ "backbone-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var securityFooter = Backbone.View.extend({
        manage: true,
        prefix: "security/src/tpl/",
        template: "security-footer.html"
    });
    module.exports = securityFooter;
});

define("wolf-app/security/0.0.1/authentication/authentication-provider-debug", [ "backbone-debug", "$-debug", "underscore-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var authenticationProvider = Backbone.Model.extend({
        url: "http://localhost:5000/security",
        initialize: function() {
            //check for storage support
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
            //var data = localStorage.getItem(key);
            if (data && data[0] !== "{") {
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
                url: this.url + "/authenticate",
                data: credentials,
                type: "POST"
            });
            authenticate.done(function(resp) {
                self.put("authenticated", true);
                self.put("security-user", JSON.stringify(resp.security_user));
                if (!self.get("redirect-url")) {
                    Backbone.history.navigate("#dashboard/", {
                        trigger: true
                    });
                    return callback();
                }
                var redirectUrl = self.get("redirect-url");
                self.remove("redirect-url");
                Backbone.history.navigate(redirectUrl, {
                    trigger: true
                });
                callback();
            });
            authenticate.fail(function(resp, status) {
                Backbone.history.navigate("#security/login", {
                    trigger: true
                });
                callback();
            });
        },
        signout: function(callback) {
            var self = this;
            var signout = $.ajax({
                url: this.url + "/signout",
                type: "DELETE"
            });
            signout.done(function(resp) {
                self.clear();
                callback();
            });
        }
    });
    module.exports = new authenticationProvider();
});

define("wolf-app/security/0.0.1/view/forgot-password-debug", [ "$-debug", "backbone-debug", "wolf-app/security/0.0.1/view/security-footer-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var Backbone = require("backbone-debug");
    var securityFooter = require("wolf-app/security/0.0.1/view/security-footer-debug");
    var forgotPassword = Backbone.View.extend({
        manage: true,
        prefix: "security/src/tpl/",
        template: "forgot-password.html",
        events: {
            "submit form": "send_email"
        },
        initialize: function() {
            this.subviews = [];
        },
        beforeRender: function() {
            $("#main-body").addClass("texture");
        },
        afterRender: function() {
            var layoutFooterView = new securityFooter();
            this.subviews.push(layoutFooterView);
            this.insertView(".middle", layoutFooterView).render();
        },
        send_email: function(e) {
            e.preventDefault();
            //TODO: send email.
            Backbone.history.navigate("security/reset-password", true);
        }
    });
    module.exports = {
        run: function(selector, viewManager) {
            viewManager.show(selector, new forgotPassword());
        }
    };
});

define("wolf-app/security/0.0.1/view/reset-password-debug", [ "$-debug", "backbone-debug", "wolf-app/security/0.0.1/view/security-footer-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var Backbone = require("backbone-debug");
    var securityFooter = require("wolf-app/security/0.0.1/view/security-footer-debug");
    var resetPassword = Backbone.View.extend({
        manage: true,
        prefix: "security/src/tpl/",
        template: "reset-password.html",
        initialize: function() {
            this.subviews = [];
        },
        beforeRender: function() {
            $("#main-body").addClass("texture");
        },
        afterRender: function() {
            var layoutFooterView = new securityFooter();
            this.subviews.push(layoutFooterView);
            this.insertView(".middle", layoutFooterView).render();
        }
    });
    module.exports = {
        run: function(selector, viewManager) {
            viewManager.show(selector, new resetPassword());
        }
    };
});

define("wolf-app/security/0.0.1/view/404-debug", [ "$-debug", "backbone-debug", "wolf-app/security/0.0.1/view/security-footer-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var Backbone = require("backbone-debug");
    var securityFooter = require("wolf-app/security/0.0.1/view/security-footer-debug");
    var notFound = Backbone.View.extend({
        manage: true,
        prefix: "security/src/tpl/",
        template: "404.html",
        initialize: function() {
            this.subviews = [];
        },
        beforeRender: function() {
            $("#main-body").addClass("texture");
        },
        afterRender: function() {
            var layoutFooterView = new securityFooter();
            this.subviews.push(layoutFooterView);
            this.insertView(".middle", layoutFooterView).render();
        }
    });
    module.exports = {
        run: function(selector, viewManager) {
            viewManager.show(selector, new notFound());
        }
    };
});

define("wolf-app/security/0.0.1/view/500-debug", [ "$-debug", "backbone-debug", "wolf-app/security/0.0.1/view/security-footer-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var Backbone = require("backbone-debug");
    var securityFooter = require("wolf-app/security/0.0.1/view/security-footer-debug");
    var internalError = Backbone.View.extend({
        manage: true,
        prefix: "security/src/tpl/",
        template: "500.html",
        initialize: function() {
            this.subviews = [];
        },
        beforeRender: function() {
            $("#main-body").addClass("texture");
        },
        afterRender: function() {
            var layoutFooterView = new securityFooter();
            this.subviews.push(layoutFooterView);
            this.insertView(".middle", layoutFooterView).render();
        }
    });
    module.exports = {
        run: function(selector, viewManager) {
            viewManager.show(selector, new internalError());
        }
    };
});

define("wolf-app/security/0.0.1/router/security-router-debug", [ "backbone-debug", "app-core-debug", "subroute-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var eventBus = require("app-core-debug").Eventbus;
    require("subroute-debug");
    var securityRouter = Backbone.SubRoute.extend({
        initialize: function(options) {},
        routes: {
            login: "login",
            "forgot-password": "forgot_password",
            "reset-password": "reset_password"
        },
        login: function() {
            eventBus.trigger("render-security-login");
        },
        forgot_password: function() {
            eventBus.trigger("render-forgot-password");
        },
        reset_password: function() {
            eventBus.trigger("render-reset-password");
        }
    });
    module.exports = securityRouter;
});

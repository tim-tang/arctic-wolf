define("wolf-app/user-mgmt/0.0.1/index-debug", [ "./user-app-debug", "$-debug", "underscore-debug", "backbone-debug", "app-common-debug", "app-core-debug", "./view/user-mgmt-debug", "./collection/user-coll-debug", "./model/user-model-debug", "./view/user-new-modal-debug", "modalEffects-debug", "quicksearch-debug", "./router/user-router-debug", "subroute-debug" ], function(require, exports, module) {
    module.exports.UserMgmtApp = require("./user-app-debug");
    module.exports.UserColl = require("./collection/user-coll-debug");
    module.exports.UserModel = require("./model/user-model-debug");
});

define("wolf-app/user-mgmt/0.0.1/user-app-debug", [ "$-debug", "underscore-debug", "backbone-debug", "app-common-debug", "app-core-debug", "wolf-app/user-mgmt/0.0.1/view/user-mgmt-debug", "wolf-app/user-mgmt/0.0.1/collection/user-coll-debug", "wolf-app/user-mgmt/0.0.1/model/user-model-debug", "wolf-app/user-mgmt/0.0.1/view/user-new-modal-debug", "modalEffects-debug", "quicksearch-debug", "wolf-app/user-mgmt/0.0.1/router/user-router-debug", "subroute-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var appCommon = require("app-common-debug");
    var commonLoading = appCommon.CommonLoading;
    var eventBus = require("app-core-debug").Eventbus;
    var userMgmt = require("wolf-app/user-mgmt/0.0.1/view/user-mgmt-debug");
    var userModal = require("wolf-app/user-mgmt/0.0.1/view/user-new-modal-debug");
    var userApp = new Backbone.Layout({
        //el: '#main-content',
        manage: true,
        prefix: "user-mgmt/src/tpl/",
        template: "user-container.html",
        initialize: function() {
            eventBus.on("show-loading", this.show_loading, this);
            eventBus.on("hide-loading", this.hide_loading, this);
        },
        afterRender: function() {
            var userMgmtView = new userMgmt();
            this.insertView("#user-home", userMgmtView).render();
            var userModalView = new userModal();
            this.insertView("#user-home", userModalView).render();
        },
        show_loading: function() {
            commonLoading.init("#main-content");
        },
        hide_loading: function() {
            commonLoading.destroy();
        }
    });
    module.exports = {
        run: function(viewManager) {
            viewManager.show("#main-content", userApp);
        },
        invokeUserRouter: function() {
            var userRouter = require("wolf-app/user-mgmt/0.0.1/router/user-router-debug");
            return new userRouter("user-mgmt/", {
                createTrailingSlashRoutes: true
            });
        }
    };
});

define("wolf-app/user-mgmt/0.0.1/view/user-mgmt-debug", [ "$-debug", "underscore-debug", "app-common-debug", "app-core-debug", "wolf-app/user-mgmt/0.0.1/collection/user-coll-debug", "backbone-debug", "wolf-app/user-mgmt/0.0.1/model/user-model-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var appCommon = require("app-common-debug");
    var BaseView = appCommon.BaseView;
    var genericMgmtViewMixin = appCommon.GenericMgmtViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;
    var eventBus = require("app-core-debug").Eventbus;
    var userColl = require("wolf-app/user-mgmt/0.0.1/collection/user-coll-debug");
    var userModel = require("wolf-app/user-mgmt/0.0.1/model/user-model-debug");
    var userMgmt = BaseView.extend({
        prefix: "user-mgmt/src/tpl/",
        template: "user-mgmt.html",
        datatable_id: "user-mgmt-datatable",
        collection: userColl,
        afterRender: function() {
            userColl.fetch();
        }
    });
    userMgmt.mixin(genericMgmtViewMixin);
    module.exports = userMgmt;
});

define("wolf-app/user-mgmt/0.0.1/collection/user-coll-debug", [ "$-debug", "underscore-debug", "backbone-debug", "wolf-app/user-mgmt/0.0.1/model/user-model-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var userModel = require("wolf-app/user-mgmt/0.0.1/model/user-model-debug");
    var userColl = Backbone.Collection.extend({
        model: userModel,
        url: "/users",
        columns: [],
        data: [],
        /**
         * Convert attributes data to model data.
         */
        parse: function(resp) {
            // Columns of User Group Table
            this.columns = resp["aoColumns"];
            //console.log(JSON.stringify(columns));
            var attributes = _.pluck(this.columns, "mData");
            // Data of User Group Table
            var data = resp["aaData"];
            //console.log(JSON.stringify(data));
            for (var i = 0; i < data.length; i++) {
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
                return user.get("is_selected") === true;
            });
        }
    });
    module.exports = new userColl();
});

define("wolf-app/user-mgmt/0.0.1/model/user-model-debug", [ "backbone-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var userModel = Backbone.Model.extend({
        urlRoot: "/users",
        //url: function(){
        //    var origUrl = Backbone.Model.prototype.url.call(this);
        //    var parsedUrl = origUrl + (origUrl.charAt(origUrl.length - 1) == '/' ? '' : '/');
        //    return parsedUrl;
        //},
        defaults: {
            ug_name: "",
            ug_desc: "",
            users: "",
            enabled: ""
        },
        // set is_selected attribute status.
        toggle_select: function() {
            this.set({
                is_selected: !this.get("is_selected")
            });
        }
    });
    module.exports = userModel;
});

define("wolf-app/user-mgmt/0.0.1/view/user-new-modal-debug", [ "modalEffects-debug", "quicksearch-debug", "$-debug", "underscore-debug", "backbone-debug", "app-common-debug", "wolf-app/user-mgmt/0.0.1/collection/user-coll-debug", "wolf-app/user-mgmt/0.0.1/model/user-model-debug" ], function(require, exports, module) {
    require("modalEffects-debug");
    require("quicksearch-debug");
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var appCommon = require("app-common-debug");
    var commonUtils = appCommon.CommonUtils;
    var userColl = require("wolf-app/user-mgmt/0.0.1/collection/user-coll-debug");
    var userModel = require("wolf-app/user-mgmt/0.0.1/model/user-model-debug");
    var userModal = Backbone.View.extend({
        manage: true,
        model: new userModel(),
        prefix: "user-mgmt/src/tpl/",
        template: "user-new-modal.html",
        events: {
            "click #user-create-action": "create_user"
        },
        initialize: function() {},
        /*
        serialize: function() {
                    return {
                        user: _.clone(this.model.attributes)
                    };
                },*/
        afterRender: function() {
            commonUtils.init_switch();
            commonUtils.init_multi_select();
        },
        new_attributes: function() {
            return {
                ug_name: this.$("#ug-name").val().trim(),
                ug_desc: this.$("#ug-desc").val().trim(),
                users: this.$("#users").val(),
                enabled: this.$("#enabled").val().trim() === "on" ? "Yes" : "No"
            };
        },
        /**
         * Handling user instance creation.
         */
        create_user: function() {
            // console.log(JSON.stringify(this.new_attributes()));
            userColl.create(this.new_attributes());
        }
    });
    module.exports = userModal;
});

define("wolf-app/user-mgmt/0.0.1/router/user-router-debug", [ "backbone-debug", "app-core-debug", "subroute-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var eventBus = require("app-core-debug").Eventbus;
    require("subroute-debug");
    var userRouter = Backbone.SubRoute.extend({
        initialize: function(options) {},
        routes: {
            "": "home"
        },
        home: function() {
            eventBus.trigger("layout:switch-module-action");
        }
    });
    module.exports = userRouter;
});

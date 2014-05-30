define("wolf-app/user-group-mgmt/0.0.1/index-debug", [ "./user-group-app-debug", "$-debug", "underscore-debug", "backbone-debug", "app-core-debug", "app-common-debug", "./view/user-group-mgmt-debug", "./collection/user-group-coll-debug", "./model/user-group-model-debug", "./view/user-group-new-modal-debug", "modalEffects-debug", "quicksearch-debug", "./router/user-group-router-debug", "subroute-debug" ], function(require, exports, module) {
    module.exports.UserGrpMgmtApp = require("./user-group-app-debug");
    module.exports.UserGroupColl = require("./collection/user-group-coll-debug");
    module.exports.UserGroupModel = require("./model/user-group-model-debug");
});

define("wolf-app/user-group-mgmt/0.0.1/user-group-app-debug", [ "$-debug", "underscore-debug", "backbone-debug", "app-core-debug", "app-common-debug", "wolf-app/user-group-mgmt/0.0.1/view/user-group-mgmt-debug", "wolf-app/user-group-mgmt/0.0.1/collection/user-group-coll-debug", "wolf-app/user-group-mgmt/0.0.1/model/user-group-model-debug", "wolf-app/user-group-mgmt/0.0.1/view/user-group-new-modal-debug", "modalEffects-debug", "quicksearch-debug", "wolf-app/user-group-mgmt/0.0.1/router/user-group-router-debug", "subroute-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var appCommon = require("app-common-debug");
    var commonLoading = appCommon.CommonLoading;
    var userGroupMgmt = require("wolf-app/user-group-mgmt/0.0.1/view/user-group-mgmt-debug");
    var userGroupModal = require("wolf-app/user-group-mgmt/0.0.1/view/user-group-new-modal-debug");
    var userGroupApp = new Backbone.Layout({
        //el: '#main-content',
        manage: true,
        prefix: "user-group-mgmt/src/tpl/",
        template: "user-group-container.html",
        events: {},
        initialize: function() {
            eventBus.on("show-loading", this.show_loading, this);
            eventBus.on("hide-loading", this.hide_loading, this);
        },
        afterRender: function() {
            var userGroupMgmtView = new userGroupMgmt();
            this.insertView("#user-group-home", userGroupMgmtView).render();
            var userGroupModalView = new userGroupModal();
            this.insertView("#user-group-home", userGroupModalView).render();
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
            viewManager.show("#main-content", userGroupApp);
        },
        invokeUserGroupRouter: function() {
            var userGroupRouter = require("wolf-app/user-group-mgmt/0.0.1/router/user-group-router-debug");
            return new userGroupRouter("user-group-mgmt/", {
                createTrailingSlashRoutes: true
            });
        }
    };
});

define("wolf-app/user-group-mgmt/0.0.1/view/user-group-mgmt-debug", [ "$-debug", "underscore-debug", "app-common-debug", "wolf-app/user-group-mgmt/0.0.1/collection/user-group-coll-debug", "backbone-debug", "wolf-app/user-group-mgmt/0.0.1/model/user-group-model-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    // var Backbone = require('backbone');
    var appCommon = require("app-common-debug");
    var BaseView = appCommon.BaseView;
    var genericMgmtViewMixin = appCommon.GenericMgmtViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;
    var userGroupColl = require("wolf-app/user-group-mgmt/0.0.1/collection/user-group-coll-debug");
    var userGroupModel = require("wolf-app/user-group-mgmt/0.0.1/model/user-group-model-debug");
    var userGroupMgmt = BaseView.extend({
        prefix: "user-group-mgmt/src/tpl/",
        template: "user-group-mgmt.html",
        datatable_id: "user-group-mgmt-datatable",
        collection: userGroupColl,
        afterRender: function() {
            userGroupColl.fetch();
        }
    });
    userGroupMgmt.mixin(genericMgmtViewMixin);
    module.exports = userGroupMgmt;
});

define("wolf-app/user-group-mgmt/0.0.1/collection/user-group-coll-debug", [ "$-debug", "underscore-debug", "backbone-debug", "wolf-app/user-group-mgmt/0.0.1/model/user-group-model-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var userGroupModel = require("wolf-app/user-group-mgmt/0.0.1/model/user-group-model-debug");
    var userGroupColl = Backbone.Collection.extend({
        model: userGroupModel,
        url: "/user-groups",
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
            return this.filter(function(userGroup) {
                return userGroup.get("is_selected") === true;
            });
        }
    });
    module.exports = new userGroupColl();
});

define("wolf-app/user-group-mgmt/0.0.1/model/user-group-model-debug", [ "backbone-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var userGroupModel = Backbone.Model.extend({
        urlRoot: "/user-groups",
        //url: function(){
        //    var origUrl = Backbone.Model.prototype.url.call(this);
        //    var parsedUrl = origUrl + (origUrl.charAt(origUrl.length - 1) == '/' ? '' : '/');
        //    return parsedUrl;
        //},
        defaults: {
            ug_name: "",
            ug_desc: "",
            users: "",
            enabled: "",
            is_selected: false
        },
        // set is_selected attribute status.
        toggle_select: function() {
            this.set({
                is_selected: !this.get("is_selected")
            });
        }
    });
    module.exports = userGroupModel;
});

define("wolf-app/user-group-mgmt/0.0.1/view/user-group-new-modal-debug", [ "modalEffects-debug", "quicksearch-debug", "$-debug", "underscore-debug", "backbone-debug", "app-common-debug", "wolf-app/user-group-mgmt/0.0.1/collection/user-group-coll-debug", "wolf-app/user-group-mgmt/0.0.1/model/user-group-model-debug" ], function(require, exports, module) {
    require("modalEffects-debug");
    require("quicksearch-debug");
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var componentFacade = require("app-common-debug").ComponentFacade;
    var userGroupColl = require("wolf-app/user-group-mgmt/0.0.1/collection/user-group-coll-debug");
    var userGroupModel = require("wolf-app/user-group-mgmt/0.0.1/model/user-group-model-debug");
    var userGroupModal = Backbone.View.extend({
        manage: true,
        model: new userGroupModel(),
        prefix: "user-group-mgmt/src/tpl/",
        template: "user-group-new-modal.html",
        events: {
            "click #user-group-create-action": "create_user_group"
        },
        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
            this.users = {
                selector_id: "users",
                multiple: "multiple",
                optgroups: [ {
                    options: [ {
                        value: "1",
                        label: "User01"
                    }, {
                        value: "2",
                        label: "User02"
                    }, {
                        value: "3",
                        label: "User03"
                    } ]
                } ]
            };
        },
        /*
        serialize: function() {
                    return {
                        userGroup: _.clone(this.model.attributes)
                    };
                },*/
        afterRender: function() {
            componentFacade.init_switch(".switch");
            componentFacade.init_multi_select(".multi-select", this.users);
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
         * Handling user-group instance creation.
         */
        create_user_group: function() {
            // console.log(JSON.stringify(this.new_attributes()));
            userGroupColl.create(this.new_attributes());
        }
    });
    module.exports = userGroupModal;
});

define("wolf-app/user-group-mgmt/0.0.1/router/user-group-router-debug", [ "backbone-debug", "app-core-debug", "subroute-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var eventBus = require("app-core-debug").Eventbus;
    require("subroute-debug");
    var userGroupRouter = Backbone.SubRoute.extend({
        initialize: function(options) {},
        routes: {
            "": "home"
        },
        home: function() {
            eventBus.trigger("layout:switch-module-action");
        }
    });
    module.exports = userGroupRouter;
});

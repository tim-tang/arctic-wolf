define("wolf-app/app-role-mgmt/0.0.1/index-debug", [ "./role-app-debug", "$-debug", "underscore-debug", "backbone-debug", "app-core-debug", "app-common-debug", "./view/role-mgmt-debug", "./collection/role-coll-debug", "./model/role-model-debug", "./view/modal/role-new-modal-debug", "modalEffects-debug", "quicksearch-debug", "./role-details-app-debug", "./view/tab/role-general-info-debug", "./view/tab/role-privilege-debug", "app-privilege-mgmt-debug", "./view/tab/role-user-debug", "app-user-mgmt-debug", "./view/tab/role-user-group-debug", "app-user-group-mgmt-debug", "./view/tab/role-history-debug", "./collection/role-history-coll-debug", "./model/role-history-model-debug", "./view/modal/assign-privilege-modal-debug", "./view/modal/assign-user-group-modal-debug", "./view/modal/assign-user-modal-debug", "./router/role-router-debug", "subroute-debug" ], function(require, exports, module) {
    module.exports.RoleMgmtApp = require("./role-app-debug");
});

define("wolf-app/app-role-mgmt/0.0.1/role-app-debug", [ "$-debug", "underscore-debug", "backbone-debug", "app-core-debug", "app-common-debug", "wolf-app/app-role-mgmt/0.0.1/view/role-mgmt-debug", "wolf-app/app-role-mgmt/0.0.1/collection/role-coll-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-model-debug", "wolf-app/app-role-mgmt/0.0.1/view/modal/role-new-modal-debug", "modalEffects-debug", "quicksearch-debug", "wolf-app/app-role-mgmt/0.0.1/role-details-app-debug", "wolf-app/app-role-mgmt/0.0.1/view/tab/role-general-info-debug", "wolf-app/app-role-mgmt/0.0.1/view/tab/role-privilege-debug", "app-privilege-mgmt-debug", "wolf-app/app-role-mgmt/0.0.1/view/tab/role-user-debug", "app-user-mgmt-debug", "wolf-app/app-role-mgmt/0.0.1/view/tab/role-user-group-debug", "app-user-group-mgmt-debug", "wolf-app/app-role-mgmt/0.0.1/view/tab/role-history-debug", "wolf-app/app-role-mgmt/0.0.1/collection/role-history-coll-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-history-model-debug", "wolf-app/app-role-mgmt/0.0.1/view/modal/assign-privilege-modal-debug", "wolf-app/app-role-mgmt/0.0.1/view/modal/assign-user-group-modal-debug", "wolf-app/app-role-mgmt/0.0.1/view/modal/assign-user-modal-debug", "wolf-app/app-role-mgmt/0.0.1/router/role-router-debug", "subroute-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var appCore = require("app-core-debug");
    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;
    var appCommon = require("app-common-debug");
    var commonLoading = appCommon.CommonLoading;
    var roleMgmt = require("wolf-app/app-role-mgmt/0.0.1/view/role-mgmt-debug");
    var roleModal = require("wolf-app/app-role-mgmt/0.0.1/view/modal/role-new-modal-debug");
    var roleDetailsApp = require("wolf-app/app-role-mgmt/0.0.1/role-details-app-debug");
    var roleApp = new Backbone.Layout({
        //el: '#main-content',
        manage: true,
        keep: true,
        prefix: "role-mgmt/src/tpl/",
        template: "role-container.html",
        events: {},
        initialize: function() {
            eventBus.on("show-loading", this.show_loading, this);
            eventBus.on("hide-loading", this.hide_loading, this);
            eventBus.on("role:view-role", this.view_role, this);
        },
        afterRender: function() {
            var roleMgmtView = new roleMgmt();
            this.insertView("#role-home", roleMgmtView).render();
            var roleModalView = new roleModal();
            this.insertView("#role-home", roleModalView).render();
        },
        show_loading: function() {
            commonLoading.init("#main-content");
        },
        hide_loading: function() {
            commonLoading.destroy();
        },
        view_role: function() {
            var roleDetailsApp = new roleDetailsApp();
            this.insertView("#role-home", roleModalView).render();
            this.subviews.push(roleModalView);
        }
    });
    module.exports = {
        run: function(viewManager) {
            viewManager.show("#main-content", roleApp);
        },
        invokeRoleRouter: function() {
            var roleRouter = require("wolf-app/app-role-mgmt/0.0.1/router/role-router-debug");
            return new roleRouter("role-mgmt/", {
                createTrailingSlashRoutes: true
            });
        }
    };
});

define("wolf-app/app-role-mgmt/0.0.1/view/role-mgmt-debug", [ "$-debug", "underscore-debug", "app-common-debug", "app-core-debug", "wolf-app/app-role-mgmt/0.0.1/collection/role-coll-debug", "backbone-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-model-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var appCommon = require("app-common-debug");
    var BaseView = appCommon.BaseView;
    var genericMgmtViewMixin = appCommon.GenericMgmtViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;
    var appCore = require("app-core-debug");
    var viewManager = appCore.viewMgmt;
    var eventBus = appCore.Eventbus;
    var roleColl = require("wolf-app/app-role-mgmt/0.0.1/collection/role-coll-debug");
    var roleMgmt = BaseView.extend({
        prefix: "role-mgmt/src/tpl/",
        template: "role-mgmt.html",
        datatable_id: "role-mgmt-datatable",
        collection: roleColl,
        afterRender: function() {
            roleColl.fetch();
        }
    });
    roleMgmt.mixin(genericMgmtViewMixin);
    module.exports = roleMgmt;
});

define("wolf-app/app-role-mgmt/0.0.1/collection/role-coll-debug", [ "$-debug", "underscore-debug", "backbone-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-model-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var roleModel = require("wolf-app/app-role-mgmt/0.0.1/model/role-model-debug");
    var roleColl = Backbone.Collection.extend({
        model: roleModel,
        url: "/roles",
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
                return role.get("is_selected") === true;
            });
        }
    });
    module.exports = new roleColl();
});

define("wolf-app/app-role-mgmt/0.0.1/model/role-model-debug", [ "backbone-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var roleModel = Backbone.Model.extend({
        idAttribute: "id",
        urlRoot: "/roles",
        //url: function(){
        //    var origUrl = Backbone.Model.prototype.url.call(this);
        //    var parsedUrl = origUrl + (origUrl.charAt(origUrl.length - 1) == '/' ? '' : '/');
        //    return parsedUrl;
        //},
        defaults: {
            // id: 1,
            role_name: "",
            role_desc: "",
            privileges: "",
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
    module.exports = roleModel;
});

define("wolf-app/app-role-mgmt/0.0.1/view/modal/role-new-modal-debug", [ "modalEffects-debug", "quicksearch-debug", "$-debug", "underscore-debug", "backbone-debug", "wolf-app/app-role-mgmt/0.0.1/collection/role-coll-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-model-debug", "app-common-debug" ], function(require, exports, module) {
    require("modalEffects-debug");
    require("quicksearch-debug");
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var roleColl = require("wolf-app/app-role-mgmt/0.0.1/collection/role-coll-debug");
    var roleModel = require("wolf-app/app-role-mgmt/0.0.1/model/role-model-debug");
    var componentFacade = require("app-common-debug").ComponentFacade;
    var roleModal = Backbone.View.extend({
        manage: true,
        model: new roleModel(),
        prefix: "role-mgmt/src/tpl/modal/",
        template: "role-new-modal.html",
        privileges: null,
        events: {
            "click #role-create-action": "create_role"
        },
        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
            this.privileges = {
                selector_id: "privileges",
                multiple: "multiple",
                optgroups: [ {
                    label: "Read",
                    options: [ {
                        value: "1",
                        label: "Read User"
                    }, {
                        value: "2",
                        label: "Read Vehicle"
                    } ]
                }, {
                    label: "Create",
                    options: [ {
                        value: "3",
                        label: "Create User"
                    }, {
                        value: "4",
                        label: "Create Vehicle"
                    } ]
                }, {
                    label: "Modify",
                    options: [ {
                        value: "5",
                        label: "Modify User"
                    }, {
                        value: "6",
                        label: "Modify Vehicle"
                    } ]
                }, {
                    label: "Delete",
                    options: [ {
                        value: "7",
                        label: "Delete User"
                    }, {
                        value: "8",
                        label: "Delete Vehicle"
                    } ]
                } ]
            };
        },
        /*
        serialize: function() {
                    return {
                        role: _.clone(this.model.attributes)
                    };
                },*/
        afterRender: function() {
            componentFacade.init_switch(".switch");
            componentFacade.init_select2(".select2", this.privileges);
        },
        new_attributes: function() {
            return {
                role_name: this.$("#role-name").val().trim(),
                role_desc: this.$("#role-desc").val().trim(),
                privileges: this.$("#privileges").val(),
                enabled: this.$("#enabled").val().trim() === "on" ? "Yes" : "No"
            };
        },
        clearValues: function() {
            this.$("#role-name").val("");
            this.$("#role-desc").val("");
            this.$("#privileges").val("");
            this.$("#enabled").val("");
        },
        /**
         * Handling role instance creation.
         */
        create_role: function() {
            // console.log(JSON.stringify(this.new_attributes()));
            roleColl.create(this.new_attributes());
        }
    });
    module.exports = roleModal;
});

define("wolf-app/app-role-mgmt/0.0.1/role-details-app-debug", [ "$-debug", "underscore-debug", "backbone-debug", "app-core-debug", "wolf-app/app-role-mgmt/0.0.1/view/tab/role-general-info-debug", "app-common-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-model-debug", "wolf-app/app-role-mgmt/0.0.1/view/tab/role-privilege-debug", "app-privilege-mgmt-debug", "wolf-app/app-role-mgmt/0.0.1/view/tab/role-user-debug", "app-user-mgmt-debug", "wolf-app/app-role-mgmt/0.0.1/view/tab/role-user-group-debug", "app-user-group-mgmt-debug", "wolf-app/app-role-mgmt/0.0.1/view/tab/role-history-debug", "wolf-app/app-role-mgmt/0.0.1/collection/role-history-coll-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-history-model-debug", "wolf-app/app-role-mgmt/0.0.1/view/modal/assign-privilege-modal-debug", "modalEffects-debug", "quicksearch-debug", "wolf-app/app-role-mgmt/0.0.1/collection/role-coll-debug", "wolf-app/app-role-mgmt/0.0.1/view/modal/assign-user-group-modal-debug", "wolf-app/app-role-mgmt/0.0.1/view/modal/assign-user-modal-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var appCore = require("app-core-debug");
    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;
    var roleGeneralInfo = require("wolf-app/app-role-mgmt/0.0.1/view/tab/role-general-info-debug");
    var rolePrivilege = require("wolf-app/app-role-mgmt/0.0.1/view/tab/role-privilege-debug");
    var roleUser = require("wolf-app/app-role-mgmt/0.0.1/view/tab/role-user-debug");
    var roleUsergroup = require("wolf-app/app-role-mgmt/0.0.1/view/tab/role-user-group-debug");
    var roleHistory = require("wolf-app/app-role-mgmt/0.0.1/view/tab/role-history-debug");
    var assignPrivilegeModal = require("wolf-app/app-role-mgmt/0.0.1/view/modal/assign-privilege-modal-debug");
    var assignUserGroupModal = require("wolf-app/app-role-mgmt/0.0.1/view/modal/assign-user-group-modal-debug");
    var assignUserModal = require("wolf-app/app-role-mgmt/0.0.1/view/modal/assign-user-modal-debug");
    // var roleModel = require('./model/role-model');
    var roleDetailsApp = new Backbone.Layout({
        // el: '#main-content',
        manage: true,
        prefix: "role-mgmt/src/tpl/",
        template: "role-details-container.html",
        initialize: function() {
            eventBus.on("role:render-general-info", this.renderGeneralInfo, this);
            eventBus.on("role:render-privileges", this.renderPrivileges, this);
            eventBus.on("role:render-user-groups", this.renderUserGroups, this);
            eventBus.on("role:render-users", this.renderUsers, this);
            eventBus.on("role:render-history", this.renderHistory, this);
        },
        events: {
            "click ul.nav-tabs li": "active_tab"
        },
        afterRender: function() {
            this.renderGeneralInfo();
        },
        renderGeneralInfo: function() {
            var roleGeneralInfoView = new roleGeneralInfo();
            // TODO: Set model as selected model
            // roleGeneralInfoView.model = new roleModel();
            this.insertView("#tab-content", roleGeneralInfoView).render();
        },
        renderPrivileges: function() {
            var rolePrivilegeView = new rolePrivilege();
            //rolePrivilegeView.model = new roleModel();
            this.insertView("#tab-content", rolePrivilegeView).render();
            var assignPrivilegeModalView = new assignPrivilegeModal();
            this.insertView("#tab-content", assignPrivilegeModalView).render();
        },
        renderUserGroups: function() {
            var roleUsergroupView = new roleUsergroup();
            //roleUsergroupView.model = new roleModel();
            this.insertView("#tab-content", roleUsergroupView).render();
            var assignUserGroupModalView = new assignUserGroupModal();
            this.insertView("#tab-content", assignUserGroupModalView).render();
        },
        renderUsers: function() {
            var roleUserView = new roleUser();
            //roleUserView.model = new roleModel();
            this.insertView("#tab-content", roleUserView).render();
            var assignUserModalView = new assignUserModal();
            this.insertView("#tab-content", assignUserModalView).render();
        },
        renderHistory: function() {
            var roleHistoryView = new roleHistory();
            this.insertView("#tab-content", roleHistoryView).render();
        },
        active_tab: function(event) {
            if (event) event.preventDefault();
            // Updated active menu
            var currentTarget = $(event.target).parent();
            currentTarget.siblings(".active").removeClass("active");
            currentTarget.addClass("active");
        }
    });
    module.exports = {
        run: function(viewManager) {
            viewManager.show("#main-content", roleDetailsApp);
        }
    };
});

define("wolf-app/app-role-mgmt/0.0.1/view/tab/role-general-info-debug", [ "$-debug", "underscore-debug", "app-common-debug", "app-core-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-model-debug", "backbone-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var appCommon = require("app-common-debug");
    var BaseView = appCommon.BaseView;
    var genericInfoViewMixin = appCommon.GenericInfoViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;
    var eventBus = require("app-core-debug").Eventbus;
    var roleModel = require("wolf-app/app-role-mgmt/0.0.1/model/role-model-debug");
    var roleGeneralInfo = BaseView.extend({
        prefix: "role-mgmt/src/tpl/tab/",
        template: "role-general-info.html",
        model: new roleModel(),
        pageStatus: "view",
        initialize: function() {},
        events: {},
        load_role_details: function() {
            console.log(this.model.isNew());
            alert("load role details complete...");
            this.hide_loading();
        },
        afterRender: function() {
            componentFacade.init_switch(".switch");
        }
    });
    roleGeneralInfo.mixin(genericInfoViewMixin);
    module.exports = roleGeneralInfo;
});

define("wolf-app/app-role-mgmt/0.0.1/view/tab/role-privilege-debug", [ "$-debug", "app-common-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-model-debug", "backbone-debug", "app-privilege-mgmt-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var appCommon = require("app-common-debug");
    var BaseView = appCommon.BaseView;
    var genericDetailsViewMixin = appCommon.GenericDetailsViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;
    var roleModel = require("wolf-app/app-role-mgmt/0.0.1/model/role-model-debug");
    var privilegeColl = require("app-privilege-mgmt-debug").PrivilegeColl;
    var rolePrivilge = BaseView.extend({
        prefix: "role-mgmt/src/tpl/tab/",
        datatable_id: "assigned-privileges-datatable",
        template: "role-privilege.html",
        model: new roleModel(),
        collection: privilegeColl,
        initialize: function() {
            this.model.urlRoot = "/role-privileges";
            this.model.set("id", "888");
        },
        load_object: function() {
            this.collection.set(this.model.get("privileges")["aaData"]);
            this.init_datatable("privileges");
        },
        events: {},
        afterRender: function() {}
    });
    rolePrivilge.mixin(genericDetailsViewMixin);
    module.exports = rolePrivilge;
});

define("wolf-app/app-role-mgmt/0.0.1/view/tab/role-user-debug", [ "$-debug", "app-common-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-model-debug", "backbone-debug", "app-user-mgmt-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var appCommon = require("app-common-debug");
    var BaseView = appCommon.BaseView;
    var genericDetailsViewMixin = appCommon.GenericDetailsViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;
    var roleModel = require("wolf-app/app-role-mgmt/0.0.1/model/role-model-debug");
    var userColl = require("app-user-mgmt-debug").UserColl;
    var roleUser = BaseView.extend({
        prefix: "role-mgmt/src/tpl/tab/",
        datatable_id: "assigned-users-datatable",
        template: "role-user.html",
        model: new roleModel(),
        collection: userColl,
        initialize: function() {
            this.model.urlRoot = "/role-users";
            this.model.set("id", "777");
        },
        load_object: function() {
            this.collection.set(this.model.get("users")["aaData"]);
            this.init_datatable("users");
        },
        events: {},
        afterRender: function() {}
    });
    roleUser.mixin(genericDetailsViewMixin);
    module.exports = roleUser;
});

define("wolf-app/app-role-mgmt/0.0.1/view/tab/role-user-group-debug", [ "$-debug", "app-common-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-model-debug", "backbone-debug", "app-user-group-mgmt-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var appCommon = require("app-common-debug");
    var BaseView = appCommon.BaseView;
    var genericDetailsViewMixin = appCommon.GenericDetailsViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;
    var roleModel = require("wolf-app/app-role-mgmt/0.0.1/model/role-model-debug");
    var userGroupColl = require("app-user-group-mgmt-debug").UserGroupColl;
    var roleUserGroup = BaseView.extend({
        prefix: "role-mgmt/src/tpl/tab/",
        datatable_id: "assigned-user-groups-datatable",
        template: "role-user-group.html",
        model: new roleModel(),
        collection: userGroupColl,
        initialize: function() {
            this.model.urlRoot = "/role-user-groups";
            this.model.set("id", "666");
        },
        load_object: function() {
            this.collection.set(this.model.get("user_groups")["aaData"]);
            this.init_datatable("user_groups");
        },
        events: {},
        afterRender: function() {}
    });
    roleUserGroup.mixin(genericDetailsViewMixin);
    module.exports = roleUserGroup;
});

define("wolf-app/app-role-mgmt/0.0.1/view/tab/role-history-debug", [ "$-debug", "app-common-debug", "wolf-app/app-role-mgmt/0.0.1/collection/role-history-coll-debug", "underscore-debug", "backbone-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-history-model-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var appCommon = require("app-common-debug");
    var BaseView = appCommon.BaseView;
    var genericDetailsViewMixin = appCommon.GenericDetailsViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var roleHistoryColl = require("wolf-app/app-role-mgmt/0.0.1/collection/role-history-coll-debug");
    var roleHistory = BaseView.extend({
        prefix: "role-mgmt/src/tpl/tab/",
        template: "role-history.html",
        datatable_id: "role-history-datatable",
        collection: roleHistoryColl,
        initialize: function() {
            $("#tab-content").children().remove();
        },
        afterRender: function() {
            roleHistoryColl.reset();
            roleHistoryColl.fetch();
        }
    });
    roleHistory.mixin(genericDetailsViewMixin);
    module.exports = roleHistory;
});

define("wolf-app/app-role-mgmt/0.0.1/collection/role-history-coll-debug", [ "$-debug", "underscore-debug", "backbone-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-history-model-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var roleHistoryModel = require("wolf-app/app-role-mgmt/0.0.1/model/role-history-model-debug");
    var roleHistoryColl = Backbone.Collection.extend({
        model: roleHistoryModel,
        url: "/role-history",
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
                var roleHistory = new this.model();
                _.each(attributes, function(attr) {
                    // console.log(attr +"---"+ data[i][attr]);
                    roleHistory.set(attr, data[i][attr]);
                });
                //push the model object
                this.push(roleHistory);
            }
            return this.models;
        },
        // filter out selected vehicle recrods.
        selected: function() {
            return this.filter(function(roleHistory) {
                return roleHistory.get("is_selected") === true;
            });
        }
    });
    module.exports = new roleHistoryColl();
});

define("wolf-app/app-role-mgmt/0.0.1/model/role-history-model-debug", [ "backbone-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var roleHistoryModel = Backbone.Model.extend({
        urlRoot: "/role-history",
        defaults: {
            action: "",
            user_name: "",
            date_time: "",
            details: "",
            is_selected: false
        },
        // set is_selected attribute status.
        toggle_select: function() {
            this.set({
                is_selected: !this.get("is_selected")
            });
        }
    });
    module.exports = roleHistoryModel;
});

define("wolf-app/app-role-mgmt/0.0.1/view/modal/assign-privilege-modal-debug", [ "modalEffects-debug", "quicksearch-debug", "$-debug", "underscore-debug", "backbone-debug", "wolf-app/app-role-mgmt/0.0.1/collection/role-coll-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-model-debug", "app-core-debug", "app-common-debug" ], function(require, exports, module) {
    require("modalEffects-debug");
    require("quicksearch-debug");
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var roleColl = require("wolf-app/app-role-mgmt/0.0.1/collection/role-coll-debug");
    var roleModel = require("wolf-app/app-role-mgmt/0.0.1/model/role-model-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var componentFacade = require("app-common-debug").ComponentFacade;
    var assignPrivilegeModal = Backbone.View.extend({
        manage: true,
        model: new roleModel(),
        prefix: "role-mgmt/src/tpl/modal/",
        template: "assign-privilege-modal.html",
        assignObjects: null,
        events: {
            "click #role-create-action": "create_role"
        },
        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
            this.assignObjects = {
                selector_id: "privileges",
                multiple: "multiple",
                selected: [],
                optgroups: [ {
                    label: "Read",
                    options: [ {
                        value: "1",
                        label: "Read User"
                    }, {
                        value: "2",
                        label: "Read Vehicle"
                    } ]
                }, {
                    label: "Create",
                    options: [ {
                        value: "3",
                        label: "Create User"
                    }, {
                        value: "4",
                        label: "Create Vehicle"
                    } ]
                }, {
                    label: "Modify",
                    options: [ {
                        value: "5",
                        label: "Modify User"
                    }, {
                        value: "6",
                        label: "Modify Vehicle"
                    } ]
                }, {
                    label: "Delete",
                    options: [ {
                        value: "7",
                        label: "Delete User"
                    }, {
                        value: "8",
                        label: "Delete Vehicle"
                    } ]
                } ]
            };
        },
        /*
        serialize: function() {
                    return {
                        role: _.clone(this.model.attributes)
                    };
                },*/
        afterRender: function() {
            eventBus.trigger("set_selected_objects", this);
        },
        renderMultiSelect: function() {
            componentFacade.init_multi_select(".searchable", this.assignObjects);
        },
        new_attributes: function() {
            return {
                role_name: this.$("#role-name").val().trim(),
                role_desc: this.$("#role-desc").val().trim(),
                privileges: this.$("#privileges").val(),
                enabled: this.$("#enabled").val().trim() === "on" ? "Yes" : "No"
            };
        },
        clearValues: function() {
            this.$("#role-name").val("");
            this.$("#role-desc").val("");
            this.$("#privileges").val("");
            this.$("#enabled").val("");
        },
        /**
         * Handling role instance creation.
         */
        create_role: function() {
            // console.log(JSON.stringify(this.new_attributes()));
            roleColl.create(this.new_attributes());
        }
    });
    module.exports = assignPrivilegeModal;
});

define("wolf-app/app-role-mgmt/0.0.1/view/modal/assign-user-group-modal-debug", [ "modalEffects-debug", "quicksearch-debug", "$-debug", "underscore-debug", "backbone-debug", "wolf-app/app-role-mgmt/0.0.1/collection/role-coll-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-model-debug", "app-core-debug", "app-common-debug" ], function(require, exports, module) {
    require("modalEffects-debug");
    require("quicksearch-debug");
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var roleColl = require("wolf-app/app-role-mgmt/0.0.1/collection/role-coll-debug");
    var roleModel = require("wolf-app/app-role-mgmt/0.0.1/model/role-model-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var componentFacade = require("app-common-debug").ComponentFacade;
    var roleModal = Backbone.View.extend({
        manage: true,
        model: new roleModel(),
        prefix: "role-mgmt/src/tpl/modal/",
        template: "assign-user-group-modal.html",
        assignObjects: null,
        events: {
            "click #role-create-action": "create_role"
        },
        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
            this.assignObjects = {
                selector_id: "user-groups",
                multiple: "multiple",
                selected: [],
                optgroups: [ {
                    options: [ {
                        value: "1",
                        label: "Administrators"
                    }, {
                        value: "2",
                        label: "User Group 01"
                    }, {
                        value: "3",
                        label: "Sales"
                    } ]
                } ]
            };
        },
        /*
        serialize: function() {
                    return {
                        role: _.clone(this.model.attributes)
                    };
                },*/
        afterRender: function() {
            eventBus.trigger("set_selected_objects", this);
        },
        renderMultiSelect: function() {
            componentFacade.init_multi_select(".searchable", this.assignObjects);
        },
        new_attributes: function() {
            return {
                role_name: this.$("#role-name").val().trim(),
                role_desc: this.$("#role-desc").val().trim(),
                privileges: this.$("#privileges").val(),
                enabled: this.$("#enabled").val().trim() === "on" ? "Yes" : "No"
            };
        },
        clearValues: function() {
            this.$("#role-name").val("");
            this.$("#role-desc").val("");
            this.$("#privileges").val("");
            this.$("#enabled").val("");
        },
        /**
         * Handling role instance creation.
         */
        create_role: function() {
            // console.log(JSON.stringify(this.new_attributes()));
            roleColl.create(this.new_attributes());
        }
    });
    module.exports = roleModal;
});

define("wolf-app/app-role-mgmt/0.0.1/view/modal/assign-user-modal-debug", [ "modalEffects-debug", "quicksearch-debug", "$-debug", "underscore-debug", "backbone-debug", "wolf-app/app-role-mgmt/0.0.1/collection/role-coll-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-model-debug", "app-core-debug", "app-common-debug" ], function(require, exports, module) {
    require("modalEffects-debug");
    require("quicksearch-debug");
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var roleColl = require("wolf-app/app-role-mgmt/0.0.1/collection/role-coll-debug");
    var roleModel = require("wolf-app/app-role-mgmt/0.0.1/model/role-model-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var componentFacade = require("app-common-debug").ComponentFacade;
    var roleModal = Backbone.View.extend({
        manage: true,
        model: new roleModel(),
        prefix: "role-mgmt/src/tpl/modal/",
        template: "assign-user-modal.html",
        assignObjects: null,
        events: {
            "click #role-create-action": "create_role"
        },
        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
            this.assignObjects = {
                selector_id: "users",
                multiple: "multiple",
                selected: [],
                optgroups: [ {
                    options: [ {
                        value: "1",
                        label: "Administrators"
                    }, {
                        value: "2",
                        label: "Tim"
                    }, {
                        value: "3",
                        label: "Johnny"
                    } ]
                } ]
            };
        },
        /*
        serialize: function() {
                    return {
                        role: _.clone(this.model.attributes)
                    };
                },*/
        afterRender: function() {
            eventBus.trigger("set_selected_objects", this);
        },
        renderMultiSelect: function() {
            componentFacade.init_multi_select(".searchable", this.assignObjects);
        },
        new_attributes: function() {
            return {
                role_name: this.$("#role-name").val().trim(),
                role_desc: this.$("#role-desc").val().trim(),
                privileges: this.$("#privileges").val(),
                enabled: this.$("#enabled").val().trim() === "on" ? "Yes" : "No"
            };
        },
        clearValues: function() {
            this.$("#role-name").val("");
            this.$("#role-desc").val("");
            this.$("#privileges").val("");
            this.$("#enabled").val("");
        },
        /**
         * Handling role instance creation.
         */
        create_role: function() {
            // console.log(JSON.stringify(this.new_attributes()));
            roleColl.create(this.new_attributes());
        }
    });
    module.exports = roleModal;
});

define("wolf-app/app-role-mgmt/0.0.1/router/role-router-debug", [ "$-debug", "backbone-debug", "app-core-debug", "subroute-debug", "wolf-app/app-role-mgmt/0.0.1/role-details-app-debug", "underscore-debug", "wolf-app/app-role-mgmt/0.0.1/view/tab/role-general-info-debug", "app-common-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-model-debug", "wolf-app/app-role-mgmt/0.0.1/view/tab/role-privilege-debug", "app-privilege-mgmt-debug", "wolf-app/app-role-mgmt/0.0.1/view/tab/role-user-debug", "app-user-mgmt-debug", "wolf-app/app-role-mgmt/0.0.1/view/tab/role-user-group-debug", "app-user-group-mgmt-debug", "wolf-app/app-role-mgmt/0.0.1/view/tab/role-history-debug", "wolf-app/app-role-mgmt/0.0.1/collection/role-history-coll-debug", "wolf-app/app-role-mgmt/0.0.1/model/role-history-model-debug", "wolf-app/app-role-mgmt/0.0.1/view/modal/assign-privilege-modal-debug", "modalEffects-debug", "quicksearch-debug", "wolf-app/app-role-mgmt/0.0.1/collection/role-coll-debug", "wolf-app/app-role-mgmt/0.0.1/view/modal/assign-user-group-modal-debug", "wolf-app/app-role-mgmt/0.0.1/view/modal/assign-user-modal-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var Backbone = require("backbone-debug");
    var appCore = require("app-core-debug");
    var eventBus = appCore.Eventbus;
    var viewManager = appCore.ViewMgmt;
    require("subroute-debug");
    var roleRouter = Backbone.SubRoute.extend({
        initialize: function(options) {},
        routes: {
            "": "home",
            view: "viewRole",
            "general-info": "viewGeneralInfo",
            privileges: "viewPrivileges",
            "user-groups": "viewUserGroups",
            users: "viewUsers",
            history: "viewHistory"
        },
        home: function() {
            eventBus.trigger("layout:switch-module-action");
        },
        viewRole: function() {
            // TODO: Should get selected row
            require("wolf-app/app-role-mgmt/0.0.1/role-details-app-debug").run(viewManager);
        },
        viewGeneralInfo: function() {
            eventBus.trigger("role:render-general-info");
        },
        viewPrivileges: function() {
            eventBus.trigger("role:render-privileges");
        },
        viewUserGroups: function() {
            eventBus.trigger("role:render-user-groups");
        },
        viewUsers: function() {
            eventBus.trigger("role:render-users");
        },
        viewHistory: function() {
            eventBus.trigger("role:render-history");
        }
    });
    module.exports = roleRouter;
});

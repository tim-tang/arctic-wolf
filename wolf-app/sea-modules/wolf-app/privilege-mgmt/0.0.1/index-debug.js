define("wolf-app/privilege-mgmt/0.0.1/index-debug", [ "./privilege-app-debug", "$-debug", "underscore-debug", "backbone-debug", "app-core-debug", "app-common-debug", "./view/privilege-mgmt-debug", "./collection/privilege-coll-debug", "./model/privilege-model-debug", "./view/privilege-new-modal-debug", "modalEffects-debug", "quicksearch-debug", "./router/privilege-router-debug", "subroute-debug" ], function(require, exports, module) {
    module.exports.PrivilegeMgmtApp = require("./privilege-app-debug");
    module.exports.PrivilegeColl = require("./collection/privilege-coll-debug");
    module.exports.PrivilegeModel = require("./model/privilege-model-debug");
});

define("wolf-app/privilege-mgmt/0.0.1/privilege-app-debug", [ "$-debug", "underscore-debug", "backbone-debug", "app-core-debug", "app-common-debug", "wolf-app/privilege-mgmt/0.0.1/view/privilege-mgmt-debug", "wolf-app/privilege-mgmt/0.0.1/collection/privilege-coll-debug", "wolf-app/privilege-mgmt/0.0.1/model/privilege-model-debug", "wolf-app/privilege-mgmt/0.0.1/view/privilege-new-modal-debug", "modalEffects-debug", "quicksearch-debug", "wolf-app/privilege-mgmt/0.0.1/router/privilege-router-debug", "subroute-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var appCommon = require("app-common-debug");
    var commonLoading = appCommon.CommonLoading;
    var privilegeMgmt = require("wolf-app/privilege-mgmt/0.0.1/view/privilege-mgmt-debug");
    var privilegeModal = require("wolf-app/privilege-mgmt/0.0.1/view/privilege-new-modal-debug");
    var privilegeApp = new Backbone.Layout({
        //el: '#main-content',
        manage: true,
        prefix: "privilege-mgmt/src/tpl/",
        template: "privilege-container.html",
        events: {},
        afterRender: function() {
            this.insertView("#privilege-home", new privilegeMgmt()).render();
            this.insertView("#privilege-home", new privilegeModal()).render();
        },
        initialize: function() {
            eventBus.on("show-loading", this.show_loading, this);
            eventBus.on("hide-loading", this.hide_loading, this);
        },
        afterRender: function() {
            var privilegeMgmtView = new privilegeMgmt();
            this.insertView("#privilege-home", privilegeMgmtView).render();
            var privilegeModalView = new privilegeModal();
            this.insertView("#privilege-home", privilegeModalView).render();
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
            viewManager.show("#main-content", privilegeApp);
        },
        invokePrivilegeRouter: function() {
            var privilegeRouter = require("wolf-app/privilege-mgmt/0.0.1/router/privilege-router-debug");
            return new privilegeRouter("privilege-mgmt/", {
                createTrailingSlashRoutes: true
            });
        }
    };
});

define("wolf-app/privilege-mgmt/0.0.1/view/privilege-mgmt-debug", [ "$-debug", "underscore-debug", "app-common-debug", "app-core-debug", "wolf-app/privilege-mgmt/0.0.1/collection/privilege-coll-debug", "backbone-debug", "wolf-app/privilege-mgmt/0.0.1/model/privilege-model-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var appCommon = require("app-common-debug");
    var BaseView = appCommon.BaseView;
    var genericMgmtViewMixin = appCommon.GenericMgmtViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;
    var genericMgmtViewMixin = appCommon.GenericMgmtViewMixin;
    var eventBus = require("app-core-debug").Eventbus;
    var privilegeColl = require("wolf-app/privilege-mgmt/0.0.1/collection/privilege-coll-debug");
    var privilegeModel = require("wolf-app/privilege-mgmt/0.0.1/model/privilege-model-debug");
    var privilegeMgmt = BaseView.extend({
        prefix: "privilege-mgmt/src/tpl/",
        template: "privilege-mgmt.html",
        datatable_id: "privilege-mgmt-datatable",
        collection: privilegeColl,
        afterRender: function() {
            privilegeColl.fetch();
        }
    });
    privilegeMgmt.mixin(genericMgmtViewMixin);
    module.exports = privilegeMgmt;
});

define("wolf-app/privilege-mgmt/0.0.1/collection/privilege-coll-debug", [ "$-debug", "underscore-debug", "backbone-debug", "wolf-app/privilege-mgmt/0.0.1/model/privilege-model-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var privilegeModel = require("wolf-app/privilege-mgmt/0.0.1/model/privilege-model-debug");
    var privilegeColl = Backbone.Collection.extend({
        model: privilegeModel,
        url: "/privileges",
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
                var privilege = new this.model();
                _.each(attributes, function(attr) {
                    // console.log(attr +"---"+ data[i][attr]);
                    privilege.set(attr, data[i][attr]);
                });
                //push the model object
                this.push(privilege);
            }
            return this.models;
        },
        // filter out selected vehicle recrods.
        selected: function() {
            return this.filter(function(privilege) {
                return privilege.get("is_selected") === true;
            });
        }
    });
    module.exports = new privilegeColl();
});

define("wolf-app/privilege-mgmt/0.0.1/model/privilege-model-debug", [ "backbone-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var privilegeModel = Backbone.Model.extend({
        urlRoot: "/privileges",
        //url: function(){
        //    var origUrl = Backbone.Model.prototype.url.call(this);
        //    var parsedUrl = origUrl + (origUrl.charAt(origUrl.length - 1) == '/' ? '' : '/');
        //    return parsedUrl;
        //},
        defaults: {
            priv_name: "",
            priv_desc: "",
            priv_type: "",
            criteria: "",
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
    module.exports = privilegeModel;
});

define("wolf-app/privilege-mgmt/0.0.1/view/privilege-new-modal-debug", [ "modalEffects-debug", "quicksearch-debug", "$-debug", "underscore-debug", "backbone-debug", "wolf-app/privilege-mgmt/0.0.1/collection/privilege-coll-debug", "wolf-app/privilege-mgmt/0.0.1/model/privilege-model-debug", "app-common-debug" ], function(require, exports, module) {
    require("modalEffects-debug");
    require("quicksearch-debug");
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var privilegeColl = require("wolf-app/privilege-mgmt/0.0.1/collection/privilege-coll-debug");
    var privilegeModel = require("wolf-app/privilege-mgmt/0.0.1/model/privilege-model-debug");
    var componentFacade = require("app-common-debug").ComponentFacade;
    var privilegeModal = Backbone.View.extend({
        manage: true,
        model: new privilegeModel(),
        prefix: "privilege-mgmt/src/tpl/modal/",
        template: "privilege-new-modal.html",
        events: {
            "click #privilege-create-action": "create_privilege"
        },
        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
            this.privilegeType = {
                selector_id: "privilege-type",
                optgroups: [ {
                    options: [ {
                        value: "1",
                        label: "Read"
                    }, {
                        value: "2",
                        label: "Create"
                    }, {
                        value: "3",
                        label: "Modify"
                    }, {
                        value: "4",
                        label: "Delete"
                    } ]
                } ]
            };
            this.criterias = {
                selector_id: "criteria",
                optgroups: [ {
                    label: "Vehicle",
                    options: [ {
                        value: "1",
                        label: "All Vehicle"
                    }, {
                        value: "2",
                        label: "Red Car"
                    } ]
                }, {
                    label: "User",
                    options: [ {
                        value: "3",
                        label: "All User"
                    }, {
                        value: "4",
                        label: "All Administrator"
                    } ]
                } ]
            };
        },
        /*
        serialize: function() {
                    return {
                        privilege: _.clone(this.model.attributes)
                    };
                },*/
        afterRender: function() {
            componentFacade.init_switch(".switch");
            componentFacade.init_select2(".select2", this.criterias);
            componentFacade.init_select2(".select2", this.privilegeType);
        },
        new_attributes: function() {
            return {
                priv_name: this.$("#privilege-name").val().trim(),
                priv_desc: this.$("#privilege-desc").val().trim(),
                priv_type: this.$("#privilege-type").val().trim(),
                criteria: this.$("#criteria").val().trim(),
                enabled: this.$("#enabled").val().trim() === "on" ? "Yes" : "No"
            };
        },
        /**
         * Handling privilege instance creation.
         */
        create_privilege: function() {
            // console.log(JSON.stringify(this.new_attributes()));
            privilegeColl.create(this.new_attributes());
        }
    });
    module.exports = privilegeModal;
});

define("wolf-app/privilege-mgmt/0.0.1/router/privilege-router-debug", [ "backbone-debug", "app-core-debug", "subroute-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var eventBus = require("app-core-debug").Eventbus;
    require("subroute-debug");
    var privilegeRouter = Backbone.SubRoute.extend({
        initialize: function(options) {},
        routes: {
            "": "home"
        },
        home: function() {
            eventBus.trigger("layout:switch-module-action");
        }
    });
    module.exports = privilegeRouter;
});

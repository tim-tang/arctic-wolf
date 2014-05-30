define("wolf-app/criteria-mgmt/0.0.1/index-debug", [ "./criteria-app-debug", "$-debug", "underscore-debug", "backbone-debug", "app-common-debug", "app-core-debug", "./view/criteria-mgmt-debug", "./collection/criteria-coll-debug", "./model/criteria-model-debug", "./view/criteria-new-modal-debug", "modalEffects-debug", "./view/criteria-row-debug", "./router/criteria-router-debug", "subroute-debug" ], function(require, exports, module) {
    module.exports.CriteriaMgmtApp = require("./criteria-app-debug");
});

define("wolf-app/criteria-mgmt/0.0.1/criteria-app-debug", [ "$-debug", "underscore-debug", "backbone-debug", "app-common-debug", "app-core-debug", "wolf-app/criteria-mgmt/0.0.1/view/criteria-mgmt-debug", "wolf-app/criteria-mgmt/0.0.1/collection/criteria-coll-debug", "wolf-app/criteria-mgmt/0.0.1/model/criteria-model-debug", "wolf-app/criteria-mgmt/0.0.1/view/criteria-new-modal-debug", "modalEffects-debug", "wolf-app/criteria-mgmt/0.0.1/view/criteria-row-debug", "wolf-app/criteria-mgmt/0.0.1/router/criteria-router-debug", "subroute-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var appCommon = require("app-common-debug");
    var commonLoading = appCommon.CommonLoading;
    var eventBus = require("app-core-debug").Eventbus;
    var criteriaMgmt = require("wolf-app/criteria-mgmt/0.0.1/view/criteria-mgmt-debug");
    var criteriaModal = require("wolf-app/criteria-mgmt/0.0.1/view/criteria-new-modal-debug");
    var criteriaApp = new Backbone.Layout({
        //el: '#main-content',
        manage: true,
        prefix: "criteria-mgmt/src/tpl/",
        template: "criteria-container.html",
        events: {},
        initialize: function() {
            eventBus.on("show-loading", this.show_loading, this);
            eventBus.on("hide-loading", this.hide_loading, this);
        },
        afterRender: function() {
            var criteriaMgmtView = new criteriaMgmt();
            this.insertView("#criteria-home", criteriaMgmtView).render();
            var criteriaModalView = new criteriaModal();
            this.insertView("#criteria-home", criteriaModalView).render();
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
            viewManager.show("#main-content", criteriaApp);
        },
        invokeCriteriaRouter: function() {
            var criteriaRouter = require("wolf-app/criteria-mgmt/0.0.1/router/criteria-router-debug");
            return new criteriaRouter("criteria-mgmt/", {
                createTrailingSlashRoutes: true
            });
        }
    };
});

define("wolf-app/criteria-mgmt/0.0.1/view/criteria-mgmt-debug", [ "$-debug", "underscore-debug", "app-common-debug", "app-core-debug", "wolf-app/criteria-mgmt/0.0.1/collection/criteria-coll-debug", "backbone-debug", "wolf-app/criteria-mgmt/0.0.1/model/criteria-model-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var appCommon = require("app-common-debug");
    var BaseView = appCommon.BaseView;
    var genericMgmtViewMixin = appCommon.GenericMgmtViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;
    var eventBus = require("app-core-debug").EventBus;
    var criteriaColl = require("wolf-app/criteria-mgmt/0.0.1/collection/criteria-coll-debug");
    var criteriaModel = require("wolf-app/criteria-mgmt/0.0.1/model/criteria-model-debug");
    var criteriaMgmt = BaseView.extend({
        manage: true,
        prefix: "criteria-mgmt/src/tpl/",
        template: "criteria-mgmt.html",
        datatable_id: "criteria-mgmt-datatable",
        collection: criteriaColl,
        afterRender: function() {
            criteriaColl.fetch();
        },
        new_obj: function(event) {
            if (event) event.preventDefault();
            eventBus.trigger("reset_criteria_new_modal");
        }
    });
    criteriaMgmt.mixin(genericMgmtViewMixin);
    module.exports = criteriaMgmt;
});

define("wolf-app/criteria-mgmt/0.0.1/collection/criteria-coll-debug", [ "$-debug", "underscore-debug", "backbone-debug", "wolf-app/criteria-mgmt/0.0.1/model/criteria-model-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var criteriaModel = require("wolf-app/criteria-mgmt/0.0.1/model/criteria-model-debug");
    var criteriaColl = Backbone.Collection.extend({
        model: criteriaModel,
        url: "/criterias",
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
                var criteria = new this.model();
                _.each(attributes, function(attr) {
                    // console.log(attr +"---"+ data[i][attr]);
                    criteria.set(attr, data[i][attr]);
                });
                //push the model object
                this.push(criteria);
            }
            return this.models;
        },
        // filter out selected vehicle recrods.
        selected: function() {
            return this.filter(function(criteria) {
                return criteria.get("is_selected") === true;
            });
        }
    });
    module.exports = new criteriaColl();
});

define("wolf-app/criteria-mgmt/0.0.1/model/criteria-model-debug", [ "backbone-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var criteriaModel = Backbone.Model.extend({
        urlRoot: "/criterias",
        //url: function(){
        //    var origUrl = Backbone.Model.prototype.url.call(this);
        //    var parsedUrl = origUrl + (origUrl.charAt(origUrl.length - 1) == '/' ? '' : '/');
        //    return parsedUrl;
        //},
        defaults: {
            cri_name: "",
            cri_desc: "",
            obj_type: "",
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
    module.exports = criteriaModel;
});

define("wolf-app/criteria-mgmt/0.0.1/view/criteria-new-modal-debug", [ "modalEffects-debug", "$-debug", "underscore-debug", "backbone-debug", "wolf-app/criteria-mgmt/0.0.1/collection/criteria-coll-debug", "wolf-app/criteria-mgmt/0.0.1/model/criteria-model-debug", "wolf-app/criteria-mgmt/0.0.1/view/criteria-row-debug", "app-core-debug", "app-common-debug" ], function(require, exports, module) {
    require("modalEffects-debug");
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var criteriaColl = require("wolf-app/criteria-mgmt/0.0.1/collection/criteria-coll-debug");
    var criteriaModel = require("wolf-app/criteria-mgmt/0.0.1/model/criteria-model-debug");
    var criteriaRow = require("wolf-app/criteria-mgmt/0.0.1/view/criteria-row-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var componentFacade = require("app-common-debug").ComponentFacade;
    var criteriaModal = Backbone.View.extend({
        manage: true,
        model: new criteriaModel(),
        prefix: "criteria-mgmt/src/tpl/modal/",
        template: "criteria-new-modal.html",
        criteriaCount: 1,
        events: {
            "click #criteria-create-action": "create_criteria",
            "change #object-type": "changeObjectType"
        },
        initialize: function() {
            //this.listenTo(this.model, 'change', this.test);
            this.objectType = {
                selector_id: "object-type",
                optgroups: [ {
                    options: [ {
                        value: "1",
                        label: "User"
                    }, {
                        value: "2",
                        label: "UserGroup"
                    }, {
                        value: "3",
                        label: "Vehicle"
                    } ]
                } ]
            };
            eventBus.on("add_criteria_row", this.addCriteriaRow, this);
            eventBus.on("remove_criteria_row", this.removeCriteriaRow, this);
            // Reset criteria new modal
            eventBus.on("reset_criteria_new_modal", this.resetCriteriaNewModal, this);
        },
        afterRender: function() {
            componentFacade.init_switch(".switch");
            componentFacade.init_select2(".select2", this.objectType);
            var objType = this.objectType.optgroups[0].options[0].value;
            var criteriaRowView = new criteriaRow({
                objType: objType
            });
            this.insertView("#criteria-row-container", criteriaRowView).render();
        },
        changeObjectType: function() {
            var objType = $("#object-type-container").find("select").val();
            this.resetCriteria(objType);
        },
        // Add & remove crireria row
        addCriteriaRow: function() {
            var objType = $("#object-type-container").find("select").val();
            var criteriaRowView = new criteriaRow({
                objType: objType
            });
            this.insertView("#criteria-row-container", criteriaRowView).render();
            this.criteriaCount++;
        },
        // Add & remove crireria row
        removeCriteriaRow: function(view) {
            if (this.criteriaCount > 1) {
                view.$el.remove();
                this.criteriaCount--;
            }
        },
        // Reset CriteriaNewModal Page
        resetCriteriaNewModal: function() {
            // Initial Object Type & Crieria
            var objType = this.objectType.optgroups[0].options[0].value;
            this.resetObjectType(objType);
            this.resetCriteria(objType);
        },
        resetObjectType: function(objType) {
            $("#object-type-container").children().remove();
            componentFacade.init_select2(".select2", this.objectType);
        },
        resetCriteria: function(objType) {
            _.each(this.views["#criteria-row-container"], function(view) {
                view.$el.remove();
            });
            var criteriaRowView = new criteriaRow({
                objType: objType
            });
            this.insertView("#criteria-row-container", criteriaRowView).render();
            this.criteriaCount = 1;
        },
        /****************************************************
         *
         *					About data
         *
         *****************************************************/
        /*
        serialize: function() {
                    return {
                        criteria: _.clone(this.model.attributes)
                    };
                },*/
        new_attributes: function() {
            var oneCriteriaRowSelectCount = 3;
            var selects = this.$("#criteria-table").children("#criteria-row-container").find("select");
            var criteriaCount = selects.length / 3;
            for (var i = 0; i < criteriaCount; i++) {
                var attributeValue = selects[i * oneCriteriaRowSelectCount + 0].value;
                var operatorValue = selects[i * oneCriteriaRowSelectCount + 1].value;
                var logicOperatorValue = selects[i * oneCriteriaRowSelectCount + 2].value;
                console.log(">>>>>>>>>>>>>>Criteria " + i + ": attributes-" + attributeValue + " operator-" + operatorValue + " logicOperator-" + logicOperatorValue);
            }
            return {
                cri_name: this.$("#cri-name").val().trim(),
                cri_desc: this.$("#cri-desc").val().trim(),
                obj_type: this.$("#object-type").val().trim(),
                enabled: this.$("#enabled").val().trim() === "on" ? "Yes" : "No"
            };
        },
        /**
         * Handling criteria instance creation.
         */
        create_criteria: function() {
            // console.log(JSON.stringify(this.new_attributes()));
            criteriaColl.create(this.new_attributes());
        }
    });
    module.exports = criteriaModal;
});

define("wolf-app/criteria-mgmt/0.0.1/view/criteria-row-debug", [ "modalEffects-debug", "$-debug", "underscore-debug", "backbone-debug", "wolf-app/criteria-mgmt/0.0.1/collection/criteria-coll-debug", "wolf-app/criteria-mgmt/0.0.1/model/criteria-model-debug", "app-core-debug", "app-common-debug" ], function(require, exports, module) {
    require("modalEffects-debug");
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var criteriaColl = require("wolf-app/criteria-mgmt/0.0.1/collection/criteria-coll-debug");
    var criteriaModel = require("wolf-app/criteria-mgmt/0.0.1/model/criteria-model-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var componentFacade = require("app-common-debug").ComponentFacade;
    var criteriaRow = Backbone.View.extend({
        manage: true,
        model: new criteriaModel(),
        prefix: "criteria-mgmt/src/tpl/modal/",
        template: "criteria-row.html",
        events: {
            "change select": "changeSelectValue",
            "click #add": "addCriteria",
            "click #remove": "removeCriteria"
        },
        initialize: function(options) {
            this.userAttrs = {
                //"selector_id": "attributes",
                optgroups: [ {
                    options: [ {
                        value: "1",
                        label: "User Name"
                    }, {
                        value: "2",
                        label: "User Description"
                    }, {
                        value: "3",
                        label: "Attribute01"
                    } ]
                } ]
            };
            this.userGroupAttrs = {
                //"selector_id": "attributes",
                optgroups: [ {
                    options: [ {
                        value: "1",
                        label: "UG Name"
                    }, {
                        value: "2",
                        label: "UG Description"
                    }, {
                        value: "3",
                        label: "Attribute01"
                    } ]
                } ]
            };
            this.vehicleAttrs = {
                //"selector_id": "attributes",
                optgroups: [ {
                    options: [ {
                        value: "1",
                        label: "Vehicle Name"
                    }, {
                        value: "2",
                        label: "Vehicle Description"
                    }, {
                        value: "3",
                        label: "Attribute01"
                    } ]
                } ]
            };
            this.operators_0 = {
                //"selector_id": "operators",
                optgroups: [ {
                    options: [ {
                        value: "1",
                        label: "Start with"
                    }, {
                        value: "2",
                        label: "Contains"
                    }, {
                        value: "3",
                        label: "End with"
                    } ]
                } ]
            };
            this.operators_1 = {
                //"selector_id": "operators",
                optgroups: [ {
                    options: [ {
                        value: "1",
                        label: "Equal to"
                    }, {
                        value: "2",
                        label: "Great than"
                    }, {
                        value: "3",
                        label: "Less than"
                    } ]
                } ]
            };
            this.operators_2 = {
                //"selector_id": "operators",
                optgroups: [ {
                    options: [ {
                        value: "1",
                        label: "Start with(Date)"
                    }, {
                        value: "2",
                        label: "Contains(Date)"
                    }, {
                        value: "3",
                        label: "End with(Date)"
                    } ]
                } ]
            };
            this.logicOperators = {
                //"selector_id": "operators",
                optgroups: [ {
                    options: [ {
                        value: "1",
                        label: "AND"
                    }, {
                        value: "2",
                        label: "OR"
                    } ]
                } ]
            };
            this.objType = this.options.objType;
        },
        afterRender: function() {
            var attValue = null;
            // Attributes selector
            if (this.objType == "1") {
                componentFacade.init_select2(".select2", this.userAttrs, this, 0);
                attValue = this.userAttrs.optgroups[0].options[0].value;
            } else if (this.objType == "2") {
                componentFacade.init_select2(".select2", this.userGroupAttrs, this, 0);
                attValue = this.userGroupAttrs.optgroups[0].options[0].value;
            } else if (this.objType == "3") {
                componentFacade.init_select2(".select2", this.vehicleAttrs, this, 0);
                attValue = this.vehicleAttrs.optgroups[0].options[0].value;
            }
            // Operator selector
            if (attValue == "1") {
                // Assign operators for String
                componentFacade.init_select2(".select2", this.operators_0, this, 1);
            } else if (attValue == "2") {
                // Assign operators for Numeric
                componentFacade.init_select2(".select2", this.operators_1, this, 1);
            } else if (attValue == "3") {
                // Assign operators for Datetime
                componentFacade.init_select2(".select2", this.operators_2, this, 1);
            }
            componentFacade.init_select2(".select2", this.logicOperators, this, 3);
        },
        changeSelectValue: function(select) {
            var containerDivID = select.currentTarget.parentElement.parentElement["id"];
            // Attributes changed
            if (containerDivID === "attributes-container") {
                this.$el.children("#operators-container").children().remove();
                var attValue = select.val;
                if (attValue == "1") {
                    // Assign operators for String
                    componentFacade.init_select2(".select2", this.operators_0, this, 1);
                } else if (attValue == "2") {
                    // Assign operators for Numeric
                    componentFacade.init_select2(".select2", this.operators_1, this, 1);
                } else if (attValue == "3") {
                    // Assign operators for Datetime
                    componentFacade.init_select2(".select2", this.operators_2, this, 1);
                }
            } else if (containerDivID === "operators-container") {} else if (containerDivID === "logic-operators-container") {}
        },
        addCriteria: function(event) {
            if (event) event.preventDefault();
            eventBus.trigger("add_criteria_row");
        },
        removeCriteria: function(event) {
            if (event) event.preventDefault();
            eventBus.trigger("remove_criteria_row", this);
        }
    });
    module.exports = criteriaRow;
});

define("wolf-app/criteria-mgmt/0.0.1/router/criteria-router-debug", [ "backbone-debug", "app-core-debug", "subroute-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var eventBus = require("app-core-debug").Eventbus;
    require("subroute-debug");
    var criteriaRouter = Backbone.SubRoute.extend({
        initialize: function(options) {},
        routes: {
            "": "home"
        },
        home: function() {
            eventBus.trigger("layout:switch-module-action");
        }
    });
    module.exports = criteriaRouter;
});

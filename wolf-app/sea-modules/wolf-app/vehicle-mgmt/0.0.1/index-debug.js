define("wolf-app/vehicle-mgmt/0.0.1/index-debug", [ "./vehicle-app-debug", "$-debug", "underscore-debug", "backbone-debug", "app-core-debug", "app-common-debug", "./view/vehicle-mgmt-debug", "./collection/vehicle-coll-debug", "./model/vehicle-model-debug", "./view/vehicle-new-modal-debug", "modalEffects-debug", "bt-touchspin-debug", "./router/vehicle-router-debug", "subroute-debug" ], function(require, exports, module) {
    module.exports.VehicleMgmtApp = require("./vehicle-app-debug");
});

define("wolf-app/vehicle-mgmt/0.0.1/vehicle-app-debug", [ "$-debug", "underscore-debug", "backbone-debug", "app-core-debug", "app-common-debug", "wolf-app/vehicle-mgmt/0.0.1/view/vehicle-mgmt-debug", "wolf-app/vehicle-mgmt/0.0.1/collection/vehicle-coll-debug", "wolf-app/vehicle-mgmt/0.0.1/model/vehicle-model-debug", "wolf-app/vehicle-mgmt/0.0.1/view/vehicle-new-modal-debug", "modalEffects-debug", "bt-touchspin-debug", "wolf-app/vehicle-mgmt/0.0.1/router/vehicle-router-debug", "subroute-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var appCommon = require("app-common-debug");
    var commonLoading = appCommon.CommonLoading;
    var vehicleMgmt = require("wolf-app/vehicle-mgmt/0.0.1/view/vehicle-mgmt-debug");
    var vehicleModal = require("wolf-app/vehicle-mgmt/0.0.1/view/vehicle-new-modal-debug");
    var vehicleApp = new Backbone.Layout({
        manage: true,
        prefix: "vehicle-mgmt/src/tpl/",
        template: "vehicle-container.html",
        initialize: function() {
            eventBus.on("show-loading", this.show_loading, this);
            eventBus.on("hide-loading", this.hide_loading, this);
        },
        events: {},
        afterRender: function() {
            var vehicleMgmtView = new vehicleMgmt();
            this.insertView("#vehicle-home", vehicleMgmtView).render();
            var vehicleModalView = new vehicleModal();
            this.insertView("#vehicle-home", vehicleModalView).render();
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
            viewManager.show("#main-content", vehicleApp);
        },
        invokeVehicleRouter: function() {
            var vehicleRouter = require("wolf-app/vehicle-mgmt/0.0.1/router/vehicle-router-debug");
            return new vehicleRouter("vehicle-mgmt/", {
                createTrailingSlashRoutes: true
            });
        }
    };
});

define("wolf-app/vehicle-mgmt/0.0.1/view/vehicle-mgmt-debug", [ "underscore-debug", "app-common-debug", "app-core-debug", "wolf-app/vehicle-mgmt/0.0.1/collection/vehicle-coll-debug", "$-debug", "backbone-debug", "wolf-app/vehicle-mgmt/0.0.1/model/vehicle-model-debug" ], function(require, exports, module) {
    var _ = require("underscore-debug");
    var appCommon = require("app-common-debug");
    var BaseView = appCommon.BaseView;
    var genericMgmtViewMixin = appCommon.GenericMgmtViewMixin;
    var commonUtils = appCommon.CommonUtils;
    var componentFacade = appCommon.ComponentFacade;
    var eventBus = require("app-core-debug").Eventbus;
    var vehicleColl = require("wolf-app/vehicle-mgmt/0.0.1/collection/vehicle-coll-debug");
    var vehicleMgmt = BaseView.extend({
        prefix: "vehicle-mgmt/src/tpl/",
        template: "vehicle-mgmt.html",
        datatable_id: "vehicle-mgmt-datatable",
        collection: vehicleColl,
        afterRender: function() {
            // waiting for all vehicle mgmt DOM element ready.
            vehicleColl.fetch();
        }
    });
    vehicleMgmt.mixin(genericMgmtViewMixin);
    module.exports = vehicleMgmt;
});

define("wolf-app/vehicle-mgmt/0.0.1/collection/vehicle-coll-debug", [ "$-debug", "underscore-debug", "backbone-debug", "wolf-app/vehicle-mgmt/0.0.1/model/vehicle-model-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var vehicleModel = require("wolf-app/vehicle-mgmt/0.0.1/model/vehicle-model-debug");
    var vehicleColl = Backbone.Collection.extend({
        model: vehicleModel,
        url: "/vehicles",
        columns: [],
        /**
          * Convert attributes data to model data.
          */
        parse: function(resp) {
            var values = _.pluck(resp, "values");
            var attributes = _.pluck(resp, "mData");
            var size = _.size(_.first(values));
            for (var i = 0; i < size; i++) {
                var vehicle = new this.model();
                _.each(attributes, function(attr, index) {
                    vehicle.set(attr, values[index][i]);
                });
                //push the model object
                this.push(vehicle);
            }
            // clear columns array.
            this.columns.length = 0;
            var self_columns = this.columns;
            _.map(resp, function(column) {
                // remove values key pair then push to column array.
                self_columns.push(_.omit(column, "values"));
            });
            return this.models;
        },
        // filter out selected vehicle recrods.
        selected: function() {
            return this.filter(function(vehicle) {
                return vehicle.get("is_selected") === true;
            });
        }
    });
    module.exports = new vehicleColl();
});

define("wolf-app/vehicle-mgmt/0.0.1/model/vehicle-model-debug", [ "backbone-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var vehicleModel = Backbone.Model.extend({
        urlRoot: "/vehicles",
        defaults: {
            vehicle_name: "",
            vehicle_price: "168",
            vehicle_desc: "",
            is_selected: false
        },
        // set is_selected attribute status.
        toggle_select: function() {
            this.set({
                is_selected: !this.get("is_selected")
            });
        }
    });
    module.exports = vehicleModel;
});

define("wolf-app/vehicle-mgmt/0.0.1/view/vehicle-new-modal-debug", [ "modalEffects-debug", "bt-touchspin-debug", "$-debug", "underscore-debug", "backbone-debug", "wolf-app/vehicle-mgmt/0.0.1/collection/vehicle-coll-debug", "wolf-app/vehicle-mgmt/0.0.1/model/vehicle-model-debug", "app-common-debug" ], function(require, exports, module) {
    require("modalEffects-debug");
    require("bt-touchspin-debug");
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var vehicleColl = require("wolf-app/vehicle-mgmt/0.0.1/collection/vehicle-coll-debug");
    var vehicleModel = require("wolf-app/vehicle-mgmt/0.0.1/model/vehicle-model-debug");
    var componentFacade = require("app-common-debug").ComponentFacade;
    var vehicleModal = Backbone.View.extend({
        manage: true,
        model: new vehicleModel(),
        prefix: "vehicle-mgmt/src/tpl/",
        template: "vehicle-new-modal.html",
        events: {
            "click #vehicle-create-action": "create_vehicle"
        },
        initialize: function() {},
        serialize: function() {
            return {
                vehicle: _.clone(this.model.attributes)
            };
        },
        afterRender: function() {
            componentFacade.init_touchspine("#vehicle-price", {
                min: 1,
                max: 1e6,
                interval: 1,
                prefix: "$"
            });
        },
        new_attributes: function() {
            return {
                vehicle_name: this.$("#vehicle-name").val().trim(),
                vehicle_price: this.$("#vehicle-price").val().trim(),
                vehicle_desc: this.$("#vehicle-desc").val().trim()
            };
        },
        /**
         * Handling vehicle instance creation.
         */
        create_vehicle: function() {
            vehicleColl.create(this.new_attributes());
        }
    });
    module.exports = vehicleModal;
});

define("wolf-app/vehicle-mgmt/0.0.1/router/vehicle-router-debug", [ "backbone-debug", "app-core-debug", "subroute-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var eventBus = require("app-core-debug").Eventbus;
    require("subroute-debug");
    var vehicleRouter = Backbone.SubRoute.extend({
        initialize: function(options) {},
        routes: {
            "": "home"
        },
        home: function() {
            eventBus.trigger("layout:switch-module-action");
        }
    });
    module.exports = vehicleRouter;
});

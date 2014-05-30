define("wolf-app/generic-filter/0.0.1/index-debug", [ "./generic-filter-app-debug", "backbone-debug", "app-common-debug", "app-core-debug", "./view/generic-filter-debug", "$-debug", "./collection/generic-filter-coll-debug", "underscore-debug", "./collection/generic-record-coll-debug", "./model/generic-record-model-debug", "./view/generic-record-container-debug", "./view/generic-records-debug", "./router/generic-filter-router-debug", "subroute-debug" ], function(require, exports, module) {
    module.exports.GenericFilterApp = require("./generic-filter-app-debug");
});

define("wolf-app/generic-filter/0.0.1/generic-filter-app-debug", [ "backbone-debug", "app-common-debug", "app-core-debug", "wolf-app/generic-filter/0.0.1/view/generic-filter-debug", "$-debug", "wolf-app/generic-filter/0.0.1/collection/generic-filter-coll-debug", "underscore-debug", "wolf-app/generic-filter/0.0.1/collection/generic-record-coll-debug", "wolf-app/generic-filter/0.0.1/model/generic-record-model-debug", "wolf-app/generic-filter/0.0.1/view/generic-record-container-debug", "wolf-app/generic-filter/0.0.1/view/generic-records-debug", "wolf-app/generic-filter/0.0.1/router/generic-filter-router-debug", "subroute-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var appCommon = require("app-common-debug");
    var commonLoading = appCommon.CommonLoading;
    var eventBus = require("app-core-debug").Eventbus;
    var genericFilter = require("wolf-app/generic-filter/0.0.1/view/generic-filter-debug");
    var genericFilterRecords = require("wolf-app/generic-filter/0.0.1/view/generic-record-container-debug");
    var _ = require("underscore-debug");
    var genericFilterApp = new Backbone.Layout({
        manage: true,
        prefix: "generic-filter/src/tpl/",
        template: "generic-filter-container.html",
        initialize: function() {
            eventBus.on("generic-filter:show-loading", this.show_loading, this);
            eventBus.on("generic-filter:hide-loading", this.hide_loading, this);
        },
        afterRender: function() {
            // append generic filter view.
            var genericFilterView = new genericFilter({
                el: "#generic-filter-home"
            });
            this.insertView(genericFilterView).render();
            // append generic filter records view.
            var genericFilterRecordsView = new genericFilterRecords({
                el: "#generic-records-home"
            });
            this.insertView(genericFilterRecordsView).render();
        },
        show_loading: function(selector) {
            commonLoading.init(selector);
        },
        hide_loading: function() {
            commonLoading.destroy();
        }
    });
    module.exports = {
        run: function(viewManager) {
            viewManager.show("#main-content", genericFilterApp);
        },
        invokeGenericFilterRouter: function() {
            var genericFilterRouter = require("wolf-app/generic-filter/0.0.1/router/generic-filter-router-debug");
            return new genericFilterRouter("generic-filter/", {
                createTrailingSlashRoutes: true
            });
        }
    };
});

define("wolf-app/generic-filter/0.0.1/view/generic-filter-debug", [ "$-debug", "backbone-debug", "app-core-debug", "wolf-app/generic-filter/0.0.1/collection/generic-filter-coll-debug", "underscore-debug", "app-common-debug", "wolf-app/generic-filter/0.0.1/collection/generic-record-coll-debug", "wolf-app/generic-filter/0.0.1/model/generic-record-model-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var Backbone = require("backbone-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var genericFilterColl = require("wolf-app/generic-filter/0.0.1/collection/generic-filter-coll-debug");
    var genericRecordColl = require("wolf-app/generic-filter/0.0.1/collection/generic-record-coll-debug");
    var genericFilter = Backbone.View.extend({
        manage: true,
        prefix: "generic-filter/src/tpl/",
        template: "generic-filter.html",
        events: {
            "click #generic-filter-btn": "filter_records"
        },
        initialize: function(options) {
            this.selector = options.el;
            this.listenTo(genericFilterColl, "request", this.show_loading);
            this.listenTo(genericFilterColl, "sync", this.hide_loading);
        },
        show_loading: function() {
            eventBus.trigger("generic-filter:show-loading", this.selector);
        },
        hide_loading: function() {
            eventBus.trigger("generic-filter:hide-loading");
        },
        afterRender: function() {
            genericFilterColl.fetch();
        },
        filter_records: function(e) {
            e.preventDefault();
            //TODO: collect params.
            genericRecordColl.fetch({
                data: $.param({
                    q: "audi"
                })
            });
        }
    });
    module.exports = genericFilter;
});

define("wolf-app/generic-filter/0.0.1/collection/generic-filter-coll-debug", [ "backbone-debug", "underscore-debug", "app-common-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var componentFacade = require("app-common-debug").ComponentFacade;
    var genericFilterColl = Backbone.Collection.extend({
        url: "/generic-filter",
        parse: function(resp) {
            componentFacade.init_by_component_settings(resp.component_settings);
        }
    });
    module.exports = new genericFilterColl();
});

define("wolf-app/generic-filter/0.0.1/collection/generic-record-coll-debug", [ "backbone-debug", "underscore-debug", "wolf-app/generic-filter/0.0.1/model/generic-record-model-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    //var FilterableColl = require('../../common/collection/filterable-coll');
    var genericRecord = require("wolf-app/generic-filter/0.0.1/model/generic-record-model-debug");
    var genericRecordColl = Backbone.Collection.extend({
        url: "/generic-records/filter",
        model: genericRecord
    });
    module.exports = new genericRecordColl();
});

define("wolf-app/generic-filter/0.0.1/model/generic-record-model-debug", [ "backbone-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var genericRecordModel = Backbone.Model.extend({
        url: "/generic-records",
        defaults: {
            name: "",
            image: "",
            price: "",
            desc: ""
        }
    });
    module.exports = genericRecordModel;
});

define("wolf-app/generic-filter/0.0.1/view/generic-record-container-debug", [ "$-debug", "underscore-debug", "backbone-debug", "app-core-debug", "wolf-app/generic-filter/0.0.1/collection/generic-record-coll-debug", "wolf-app/generic-filter/0.0.1/model/generic-record-model-debug", "wolf-app/generic-filter/0.0.1/view/generic-records-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var genericRecordColl = require("wolf-app/generic-filter/0.0.1/collection/generic-record-coll-debug");
    var genericRecords = require("wolf-app/generic-filter/0.0.1/view/generic-records-debug");
    var genericRecordView;
    var genericFilterRecords = Backbone.View.extend({
        manage: true,
        prefix: "generic-filter/src/tpl/",
        template: "generic-record-container.html",
        initialize: function(options) {
            //_.bindAll(this, 'cleanup');
            this.selector = options.el;
            this.listenTo(genericRecordColl, "request", this.show_loading);
            this.listenTo(genericRecordColl, "sync", this.filter_complete);
        },
        afterRender: function() {
            genericRecordColl.fetch({
                data: $.param({
                    q: "audi"
                })
            });
        },
        filter_complete: function() {
            // append generic record view.
            genericRecordView = new genericRecords({
                el: "#generic-filter-records",
                records: genericRecordColl.models
            });
            this.insertView(genericRecordView).render();
            // trigger hide loading.
            eventBus.trigger("generic-filter:hide-loading");
        },
        show_loading: function() {
            eventBus.trigger("generic-filter:show-loading", this.selector);
        },
        cleanup: function() {
            this.undelegateEvents();
            genericRecordView.remove();
        }
    });
    module.exports = genericFilterRecords;
});

define("wolf-app/generic-filter/0.0.1/view/generic-records-debug", [ "$-debug", "backbone-debug", "underscore-debug", "app-core-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var Backbone = require("backbone-debug");
    var _ = require("underscore-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var genericRecords = Backbone.View.extend({
        manage: true,
        prefix: "generic-filter/src/tpl/",
        template: "generic-records.html",
        initialize: function(options) {
            this.records = options.records;
        },
        afterRender: function() {},
        serialize: function() {
            return {
                records: _.chain(this.records)
            };
        }
    });
    module.exports = genericRecords;
});

define("wolf-app/generic-filter/0.0.1/router/generic-filter-router-debug", [ "backbone-debug", "app-core-debug", "subroute-debug" ], function(require, exports, module) {
    var Backbone = require("backbone-debug");
    var eventBus = require("app-core-debug").Eventbus;
    require("subroute-debug");
    var genericFilterRouter = Backbone.SubRoute.extend({
        initialize: function(options) {},
        routes: {
            "": "home"
        },
        home: function() {
            eventBus.trigger("layout:switch-module-action");
        }
    });
    module.exports = genericFilterRouter;
});

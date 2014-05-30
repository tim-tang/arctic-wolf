define("wolf-app/app-common/0.0.1/index-debug", [ "./view/mixin-base-view-debug", "$-debug", "underscore-debug", "backbone-debug", "./mixin/backbone-view-mixin-debug", "app-core-debug", "./mixin/generic-info-view-mixin-debug", "./common-utils-debug", "jquery-datatables-debug", "datatables-debug", "jasny-debug", "select2-debug", "switch-debug", "multi-select-debug", "./component-facade-debug", "moment-debug", "daterangepicker-debug", "datetimepicker-debug", "bootstrap-slider-debug", "modalEffects-debug", "bt-touchspin-debug", "./view/component-select2-debug", "./view/component-multi-select-debug", "./mixin/generic-details-view-mixin-debug", "./mixin/generic-mgmt-view-mixin-debug", "./common-constants-debug", "./common-loading-debug" ], function(require, exports, module) {
    //----------------- Common Views -------------------//
    module.exports.BaseView = require("./view/mixin-base-view-debug");
    module.exports.GenericInfoViewMixin = require("./mixin/generic-info-view-mixin-debug");
    module.exports.GenericDetailsViewMixin = require("./mixin/generic-details-view-mixin-debug");
    module.exports.GenericMgmtViewMixin = require("./mixin/generic-mgmt-view-mixin-debug");
    //----------------- Common Utils -------------------//
    module.exports.CommonConstants = require("./common-constants-debug");
    module.exports.CommonLoading = require("./common-loading-debug");
    module.exports.CommonUtils = require("./common-utils-debug");
    //---------------- Common Components ------------------//
    module.exports.ComponentFacade = require("./component-facade-debug");
});

define("wolf-app/app-common/0.0.1/view/mixin-base-view-debug", [ "$-debug", "underscore-debug", "backbone-debug", "wolf-app/app-common/0.0.1/mixin/backbone-view-mixin-debug", "app-core-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var backboneViewMixin = require("wolf-app/app-common/0.0.1/mixin/backbone-view-mixin-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var baseView = Backbone.View.extend({
        manage: true,
        show_loading: function() {
            eventBus.trigger("show-loading");
        },
        hide_loading: function() {
            eventBus.trigger("hide-loading");
        }
    }, {
        mixin: backboneViewMixin.mixin
    });
    module.exports = baseView;
});

define("wolf-app/app-common/0.0.1/mixin/backbone-view-mixin-debug", [ "underscore-debug", "backbone-debug" ], function(require, exports, module) {
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    var backboneViewMixin = {
        mixin: function(from) {
            var to = this.prototype;
            // we add those methods which exists on `from` but not on `to` to the latter
            _.defaults(to, from);
            // we do the same for events and triggers
            _.defaults(to.events, from.events);
            _.defaults(to.triggers, from.triggers);
            // we then extend `to`'s `initialize`
            backboneViewMixin.extendMethod(to, from, "initialize");
            backboneViewMixin.extendMethod(to, from, "render");
        },
        // Helper method to extend an already existing method
        extendMethod: function(to, from, methodName) {
            // if the method is defined on from ...
            if (!_.isUndefined(from[methodName])) {
                var old = to[methodName];
                // ... we create a new function on to
                to[methodName] = function() {
                    // wherein we first call the method which exists on `to`
                    var oldReturn = old.apply(this, arguments);
                    // and then call the method on `from`
                    from[methodName].apply(this, arguments);
                    // and then return the expected result,
                    return oldReturn;
                };
            }
        }
    };
    module.exports = _.extend(Backbone.View.prototype, backboneViewMixin);
});

define("wolf-app/app-common/0.0.1/mixin/generic-info-view-mixin-debug", [ "$-debug", "underscore-debug", "wolf-app/app-common/0.0.1/common-utils-debug", "jquery-datatables-debug", "datatables-debug", "jasny-debug", "select2-debug", "switch-debug", "multi-select-debug", "wolf-app/app-common/0.0.1/component-facade-debug", "moment-debug", "daterangepicker-debug", "datetimepicker-debug", "bootstrap-slider-debug", "modalEffects-debug", "bt-touchspin-debug", "wolf-app/app-common/0.0.1/view/component-select2-debug", "backbone-debug", "wolf-app/app-common/0.0.1/view/component-multi-select-debug", "app-core-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var commonUtils = require("wolf-app/app-common/0.0.1/common-utils-debug");
    var componentFacade = require("wolf-app/app-common/0.0.1/component-facade-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var objInfoViewMixin = {
        initialize: function() {
            $("#tab-content").children().remove();
            this.listenTo(this.model, "sync", this.load_object);
            // Fetch model data
            this.model.fetch();
        },
        events: {},
        add_obj: function(event) {
            if (event) event.preventDefault();
            $("#assign-modal").modal("show");
        },
        delete_obj: function(event) {
            if (event) event.preventDefault();
            _.invoke(this.collection.selected(), "destroy");
            commonUtils.remove_selected_row(this.datatable);
            console.log(this.collection);
        }
    };
    module.exports = objInfoViewMixin;
});

/*
 *
 * Common functions are defined and exported here
 *
 */
define("wolf-app/app-common/0.0.1/common-utils-debug", [ "$-debug", "jquery-datatables-debug", "datatables-debug", "jasny-debug", "select2-debug", "switch-debug", "multi-select-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    require("jquery-datatables-debug");
    require("datatables-debug");
    require("jasny-debug");
    require("select2-debug");
    require("switch-debug");
    require("multi-select-debug");
    module.exports = {
        generate_datatable: function(header, data, datatable_id, fnDatatableCallback) {
            var datatable_div = datatable_id + "-div";
            $("#" + datatable_div).html('<table class="table table-bordered" id="' + datatable_id + '"></table>');
            datatable_id = "#" + datatable_id;
            // console.log(JSON.stringify(header));
            // console.log(JSON.stringify(data));
            /* Init the table with dynamic ajax loader.*/
            var datatable = $(datatable_id).dataTable({
                aaData: data,
                aoColumns: header
            });
            // Search input style
            $(".dataTables_filter input").addClass("form-control").attr("placeholder", "Search");
            $(".dataTables_length select").addClass("form-control");
            fnDatatableCallback(datatable);
        },
        remove_selected_row: function(datatable) {
            var selected_rows = datatable.$("tr.row_selected");
            selected_rows.each(function(index, row) {
                datatable.fnDeleteRow(row);
            });
        },
        init_select2: function() {
            $(".select2").select2({
                width: "100%"
            });
        },
        init_select2_tag: function() {
            /*Tags*/
            $(".tags").select2({
                tags: 0,
                width: "100%"
            });
        },
        init_switch: function() {
            /*Switch*/
            $(".switch").bootstrapSwitch();
        },
        init_multi_select: function() {
            /*Multi-Select Search*/
            $(".searchable").multiSelect({
                selectableHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Filter String'>",
                selectionHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Filter String'>",
                afterInit: function(ms) {
                    var that = this, $selectableSearch = that.$selectableUl.prev(), $selectionSearch = that.$selectionUl.prev(), selectableSearchString = "#" + that.$container.attr("id") + " .ms-elem-selectable:not(.ms-selected)", selectionSearchString = "#" + that.$container.attr("id") + " .ms-elem-selection.ms-selected";
                    that.qs1 = $selectableSearch.quicksearch(selectableSearchString).on("keydown", function(e) {
                        if (e.which === 40) {
                            that.$selectableUl.focus();
                            return false;
                        }
                    });
                    that.qs2 = $selectionSearch.quicksearch(selectionSearchString).on("keydown", function(e) {
                        if (e.which == 40) {
                            that.$selectionUl.focus();
                            return false;
                        }
                    });
                },
                afterSelect: function() {
                    this.qs1.cache();
                    this.qs2.cache();
                },
                afterDeselect: function() {
                    this.qs1.cache();
                    this.qs2.cache();
                }
            });
        },
        // Reset form
        // to call, use:
        // resetForm($('#myform')); // by id, recommended
        // resetForm($('form[name=myName]')); // by name
        resetForm: function($form) {
            $form.find("input:text, input:password, input:file, select, textarea").val("");
            $form.find("input:radio, input:checkbox").removeAttr("checked").removeAttr("selected");
        }
    };
});

define("wolf-app/app-common/0.0.1/component-facade-debug", [ "underscore-debug", "$-debug", "jquery-datatables-debug", "datatables-debug", "jasny-debug", "select2-debug", "switch-debug", "multi-select-debug", "moment-debug", "daterangepicker-debug", "datetimepicker-debug", "bootstrap-slider-debug", "modalEffects-debug", "bt-touchspin-debug", "wolf-app/app-common/0.0.1/view/component-select2-debug", "backbone-debug", "wolf-app/app-common/0.0.1/view/component-multi-select-debug" ], function(require, exports, module) {
    var _ = require("underscore-debug");
    var $ = require("$-debug");
    require("jquery-datatables-debug");
    require("datatables-debug");
    require("jasny-debug");
    require("select2-debug");
    require("switch-debug");
    require("multi-select-debug");
    require("moment-debug");
    require("daterangepicker-debug");
    require("datetimepicker-debug");
    require("bootstrap-slider-debug");
    require("modalEffects-debug");
    require("bt-touchspin-debug");
    var componentFacade = {
        init_by_component_settings: function(componet_settings) {
            var self = this;
            _.each(componet_settings, function(setting) {
                switch (setting.component) {
                  case "DATE_RANGE_PICKER":
                    self.init_daterange_picker(setting.selector, setting.options);
                    break;

                  case "SELECT2":
                    self.init_select2(setting.selector, setting.options);
                    break;

                  case "SELECT2TAG":
                    self.init_select2_tag(setting.selector, setting.options);
                    break;

                  case "SLIDER_RANGE":
                    self.init_slider_range(setting.selector, setting.options);
                    break;
                }
            });
        },
        init_datatable: function(selector, options, fnDatatableCallback) {
            var datatable_div = selector + "-div";
            $("#" + datatable_div).html('<table class="table table-bordered" id="' + selector + '"></table>');
            datatable_id = "#" + selector;
            /* Init the table with dynamic ajax loader.*/
            var datatable = $(datatable_id).dataTable({
                aaData: options.data,
                aoColumns: options.header
            });
            // Search input style
            $(".dataTables_filter input").addClass("form-control").attr("placeholder", "Search");
            $(".dataTables_length select").addClass("form-control");
            fnDatatableCallback(datatable);
        },
        /**
         * Initial date range picker component.
         *
         * @param selector
         */
        init_daterange_picker: function(selector, options) {
            /*Date Range Picker*/
            var cb = function(start, end) {
                $(selector + " span").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));
            };
            var optionSet1 = {
                startDate: moment().subtract("days", 29),
                endDate: moment(),
                minDate: options.minDate,
                maxDate: options.maxDate,
                dateLimit: {
                    days: 60
                },
                showDropdowns: true,
                showWeekNumbers: true,
                timePicker: false,
                timePickerIncrement: 1,
                timePicker12Hour: true,
                ranges: {
                    Today: [ moment(), moment() ],
                    Yesterday: [ moment().subtract("days", 1), moment().subtract("days", 1) ],
                    "Last 7 Days": [ moment().subtract("days", 6), moment() ],
                    "Last 30 Days": [ moment().subtract("days", 29), moment() ],
                    "This Month": [ moment().startOf("month"), moment().endOf("month") ],
                    "Last Month": [ moment().subtract("month", 1).startOf("month"), moment().subtract("month", 1).endOf("month") ]
                },
                opens: "left",
                buttonClasses: [ "btn btn-default" ],
                applyClass: "btn-small btn-primary",
                cancelClass: "btn-small",
                format: "MM/DD/YYYY",
                separator: " to ",
                locale: {
                    applyLabel: "Submit",
                    cancelLabel: "Clear",
                    fromLabel: "From",
                    toLabel: "To",
                    customRangeLabel: "Custom",
                    daysOfWeek: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
                    monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                    firstDay: 1
                }
            };
            $(selector + " span").html(moment().subtract("days", 29).format("MMMM D, YYYY") + " - " + moment().format("MMMM D, YYYY"));
            $(selector).daterangepicker(optionSet1, cb);
            $(selector).on("show", function() {
                console.log("show event fired");
            });
            $(selector).on("hide", function() {
                console.log("hide event fired");
            });
            $(selector).on("apply", function(ev, picker) {
                console.log("apply event fired, start/end dates are " + picker.startDate.format("MMMM D, YYYY") + " to " + picker.endDate.format("MMMM D, YYYY"));
            });
            $(selector).on("cancel", function(ev, picker) {
                console.log("cancel event fired");
            });
        },
        /**
         * Initial date selector
         *
         * @param selector, options, view, index
         */
        init_select2: function(selector, options, view, index) {
            var componentSelect2 = require("wolf-app/app-common/0.0.1/view/component-select2-debug");
            var select2_view = new componentSelect2({
                selector: selector,
                attrs: options
            }).render().promise().done(function(select2_view) {
                // Fetch select_id
                var select_id = select2_view.options["selector_id"];
                var _select = select2_view.$el.find("select");
                // If select_id is not null, then set id to this select and append this selector to its container
                if (select_id) {
                    select2_view.$el.appendTo("#" + select_id + "-container");
                    _select.attr("id", select_id);
                } else {
                    select2_view.$el.appendTo(view.$el.children()[index]);
                }
                // Set selector attributes: multiple
                if (select2_view.options["multiple"] === "multiple") _select.attr("multiple", "multiple");
                // Setup CSS for this select element
                _select.select2({
                    width: "100%",
                    placeholder: "Please select",
                    allowClear: true
                });
            });
        },
        init_select2_tag: function(selector, options) {
            /*Tags*/
            $(selector).select2({
                tags: 0,
                width: "100%"
            });
        },
        init_slider_range: function(selector, options) {
            /*Slider update range*/
            $(selector).slider().on("slide", function(e) {
                $(options.min_selector).html("¥" + e.value[0]);
                $(options.max_selector).html("¥" + e.value[1]);
            });
        },
        init_switch: function(selector, options) {
            /*Switch*/
            $(selector).bootstrapSwitch();
        },
        init_multi_select: function(selector, options) {
            /*Multi-Select Search*/
            var componentMultiSelect = require("wolf-app/app-common/0.0.1/view/component-multi-select-debug");
            var multi_select_view = new componentMultiSelect({
                selector: selector,
                attrs: options
            }).render().promise().done(function(multi_select_view) {
                // Fetch select_id
                var select_id = multi_select_view.options["selector_id"];
                var _select = multi_select_view.$el.find("select");
                // If select_id is not null, then set id to this select and append this selector to its container
                if (select_id) {
                    var select_container = "#" + select_id + "-container";
                    // Remove existing multi selector
                    if ($(select_container).children()) $(select_container).children().remove();
                    multi_select_view.$el.appendTo(select_container);
                    _select.attr("id", select_id);
                }
                // Set selector attributes: multiple
                if (multi_select_view.options["multiple"] === "multiple") _select.attr("multiple", "multiple");
                // Setup CSS for this select element
                _select.multiSelect({
                    selectableOptgroup: true,
                    selectableHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Filter String'>",
                    selectionHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Filter String'>",
                    afterInit: function(ms) {
                        var that = this, $selectableSearch = that.$selectableUl.prev(), $selectionSearch = that.$selectionUl.prev(), selectableSearchString = "#" + that.$container.attr("id") + " .ms-elem-selectable:not(.ms-selected)", selectionSearchString = "#" + that.$container.attr("id") + " .ms-elem-selection.ms-selected";
                        that.qs1 = $selectableSearch.quicksearch(selectableSearchString).on("keydown", function(e) {
                            if (e.which === 40) {
                                that.$selectableUl.focus();
                                return false;
                            }
                        });
                        that.qs2 = $selectionSearch.quicksearch(selectionSearchString).on("keydown", function(e) {
                            if (e.which == 40) {
                                that.$selectionUl.focus();
                                return false;
                            }
                        });
                    },
                    afterSelect: function() {
                        this.qs1.cache();
                        this.qs2.cache();
                    },
                    afterDeselect: function() {
                        this.qs1.cache();
                        this.qs2.cache();
                    }
                });
                // Set default options
                console.log(options.selected);
                _select.multiSelect("select", options.selected);
            });
        },
        init_touchspine: function(selector, options) {
            $(selector).TouchSpin({
                min: options.min,
                max: options.max,
                stepinterval: options.interval,
                maxboostedstep: 1e7,
                prefix: options.prefix
            });
        }
    };
    module.exports = componentFacade;
});

define("wolf-app/app-common/0.0.1/view/component-select2-debug", [ "$-debug", "underscore-debug", "backbone-debug", "select2-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    require("select2-debug");
    var componentSelect2 = Backbone.View.extend({
        manage: true,
        prefix: "app-common/src/tpl/",
        template: "component-select2.html",
        initialize: function(options) {
            this.selector = options.selector;
            this.options = options.attrs;
        },
        afterRender: function() {},
        serialize: function() {
            return {
                options: _.clone(this.options)
            };
        }
    });
    module.exports = componentSelect2;
});

define("wolf-app/app-common/0.0.1/view/component-multi-select-debug", [ "$-debug", "underscore-debug", "backbone-debug", "select2-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var Backbone = require("backbone-debug");
    require("select2-debug");
    var componentSelect2 = Backbone.View.extend({
        manage: true,
        prefix: "app-common/src/tpl/",
        template: "component-multi-select.html",
        initialize: function(options) {
            this.selector = options.selector;
            this.options = options.attrs;
        },
        afterRender: function() {},
        serialize: function() {
            return {
                options: _.clone(this.options)
            };
        }
    });
    module.exports = componentSelect2;
});

define("wolf-app/app-common/0.0.1/mixin/generic-details-view-mixin-debug", [ "$-debug", "underscore-debug", "wolf-app/app-common/0.0.1/common-utils-debug", "jquery-datatables-debug", "datatables-debug", "jasny-debug", "select2-debug", "switch-debug", "multi-select-debug", "wolf-app/app-common/0.0.1/component-facade-debug", "moment-debug", "daterangepicker-debug", "datetimepicker-debug", "bootstrap-slider-debug", "modalEffects-debug", "bt-touchspin-debug", "wolf-app/app-common/0.0.1/view/component-select2-debug", "backbone-debug", "wolf-app/app-common/0.0.1/view/component-multi-select-debug", "app-core-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var commonUtils = require("wolf-app/app-common/0.0.1/common-utils-debug");
    var componentFacade = require("wolf-app/app-common/0.0.1/component-facade-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var objDetailsViewMixin = {
        initialize: function() {
            $("#tab-content").children().remove();
            this.listenTo(this.model, "sync", this.load_object);
            // Fetch model data
            this.model.fetch();
            // This trigger is used to reverse control multi selector data in assign-privilege-modal
            console.log("######## Register event: set_selected_objects");
            eventBus.off("set_selected_objects");
            eventBus.on("set_selected_objects", this.setSelectedObjectsForMultiSelect, this);
        },
        events: {
            "click #delete": "delete_obj",
            "click #add": "add_obj"
        },
        // Initialze jquery datatable
        init_datatable: function(tab_identify) {
            var self = this;
            componentFacade.init_datatable(this.datatable_id, {
                data: this.model.get(tab_identify)["aaData"],
                header: this.model.get(tab_identify)["aoColumns"]
            }, function(datatable) {
                self.datatable = datatable;
                $("#" + self.datatable_id).on("click", "tbody tr", function(e) {
                    $(this).toggleClass("row_selected");
                    var selectedId = $(this).find("td:first").html().trim();
                    var model = self.collection.get(selectedId);
                    model.toggle_select();
                });
                eventBus.trigger("hide-loading");
            });
        },
        // This trigger method is used to reverse control assign-modal
        setSelectedObjectsForMultiSelect: function(view) {
            var selectedObjectsValue = [];
            console.log("***************" + this.collection);
            console.log("***************" + this.model.get("privileges")["aaData"]);
            _.each(this.collection.models, function(model) {
                selectedObjectsValue.push(model.id);
            });
            view.assignObjects.selected = selectedObjectsValue;
            console.log(view.assignObjects);
            view.renderMultiSelect();
        },
        add_obj: function(event) {
            if (event) event.preventDefault();
            $("#assign-modal").modal("show");
        },
        delete_obj: function(event) {
            if (event) event.preventDefault();
            _.invoke(this.collection.selected(), "destroy");
            commonUtils.remove_selected_row(this.datatable);
            console.log(this.collection);
        }
    };
    module.exports = objDetailsViewMixin;
});

define("wolf-app/app-common/0.0.1/mixin/generic-mgmt-view-mixin-debug", [ "$-debug", "underscore-debug", "wolf-app/app-common/0.0.1/common-utils-debug", "jquery-datatables-debug", "datatables-debug", "jasny-debug", "select2-debug", "switch-debug", "multi-select-debug", "wolf-app/app-common/0.0.1/component-facade-debug", "moment-debug", "daterangepicker-debug", "datetimepicker-debug", "bootstrap-slider-debug", "modalEffects-debug", "bt-touchspin-debug", "wolf-app/app-common/0.0.1/view/component-select2-debug", "backbone-debug", "wolf-app/app-common/0.0.1/view/component-multi-select-debug", "app-core-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var _ = require("underscore-debug");
    var commonUtils = require("wolf-app/app-common/0.0.1/common-utils-debug");
    var componentFacade = require("wolf-app/app-common/0.0.1/component-facade-debug");
    var eventBus = require("app-core-debug").Eventbus;
    var objMgmtViewMixin = {
        initialize: function() {
            this.listenTo(this.collection, "request", this.show_loading);
            this.listenTo(this.collection, "remove", this.hide_loading);
            this.listenTo(this.collection, "sync", this.load_objects);
        },
        events: {
            "click #mgmt-delete": "delete_obj",
            "click #mgmt-edit": "edit_obj",
            "click #mgmt-view": "view_obj",
            "click #mgmt-new": "new_obj"
        },
        load_objects: function() {
            var self = this;
            // initialze jquery datatable
            componentFacade.init_datatable(this.datatable_id, {
                data: this.collection.toJSON(),
                header: this.collection.columns
            }, function(datatable) {
                self.datatable = datatable;
                $("#" + self.datatable_id).on("click", "tbody tr", function(e) {
                    $(this).toggleClass("row_selected");
                    var selectedId = $(this).find("td:first").html().trim();
                    var model = self.collection.get(selectedId);
                    model.toggle_select();
                });
                eventBus.trigger("hide-loading");
            });
        },
        view_obj: function(event) {
            if (event) event.preventDefault();
            alert("mgmtViewMixin");
        },
        edit_obj: function(event) {
            if (event) event.preventDefault();
        },
        delete_obj: function(event) {
            if (event) event.preventDefault();
            console.log(JSON.stringify(this.collection));
            _.invoke(this.collection.selected(), "destroy");
            commonUtils.remove_selected_row(this.datatable);
        },
        new_obj: function(event) {
            if (event) event.preventDefault();
        }
    };
    module.exports = objMgmtViewMixin;
});

define("wolf-app/app-common/0.0.1/common-constants-debug", [], function(require, exports, module) {
    var GLOBAL_CONSTANT = {
        WS_HOST: "http://localhost:5000",
        // ----------------- Define Security Resources -------------------//
        /**
         *  Resource that need be authorized
         */
        SECURITY_RESOURCES: [ "#dashboard/", "#vehicle-mgmt/", "#user-group-mgmt/", "#user-mgmt/", "#role-mgmt/", "#privilege-mgmt/", "#criteria-mgmt/", "#generic-filter/" ],
        /**
         * Resource that is public
         */
        PUBLIC_RESOURCES: [ "", "#security/login", "#security/forgot-password", "#security/reset-password" ],
        /**
         * Cancelled access resources while user authenticated.
         */
        CANCELLED_WHILE_AUTH_DONE: [ "#security/login" ]
    };
    module.exports = GLOBAL_CONSTANT;
});

define("wolf-app/app-common/0.0.1/common-loading-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    module.exports = {
        init: function(selector) {
            var parent = $(selector);
            var loading = $('<div id="loading" class="loading"><i class="fa fa-refresh fa-spin"></i></div>');
            loading.appendTo(parent);
            loading.fadeIn(0);
        },
        destroy: function() {
            $("#loading").remove();
        }
    };
});

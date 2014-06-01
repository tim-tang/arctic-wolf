define(function(require, exports, module) {

    var $ = require('$');
    var _ = require('underscore');
    var eventBus = require('app-core').Eventbus;

    var appCommon = require('app-common');
    var BaseView = appCommon.BaseView;
    var commonUtils = appCommon.CommonUtils;
    var genericInfoViewMixin = appCommon.GenericInfoViewMixin;
    var layoutFactory = require('app-common').GenericPageLayoutFactory;

    var userGroupModel = require('../../model/user-group-model');

    var userGroupGeneralInfo = BaseView.extend({

        prefix : "user-group-mgmt/src/tpl/tab/",

        template : 'user-group-general-info.html',

        model : new userGroupModel(),

        pageMode : 'view',

        initialize : function(options) {
            this.model.urlRoot = '/user-group-general-info';
            this.pageMode = options.pageMode ? options.pageMode : this.pageMode;
        },

        events : {
            //TODO:
        },

        load_object : function() {
            console.log("##################In userGroupGeneralInfo load_object()");
            var pageForm = $('#general-info');
            // Remove all attribute lines
            pageForm.children('.form-group').remove();

            /*
             * Generate a line for an element， such as:
             * <div class="form-group">
             *	<label class="col-sm-3 control-label">Enabled</label>
             *	<div class="col-sm-6">
             *  	<div class="switch" data-on="success">
             *       	<input type="checkbox" checked="">
             * 		</div>
             *	</div>
             * </div>
             *
             * Each line is a div with class 'form-group', two elements are contained in this div
             * one is a label used to display the attribute name
             * another is component or plain text displaying.
             * So, for a single attribute, there properties should be difine:
             * 1. id - number
             * 2. name - attribute identity
             * 3. desc - display name
             * 4. type - text/number/date/list/multi-list
             * 5. length(for text)
             * 6. range(for number)
             * 7. element type - input/textarea/datepicker/select2/multi-select/......
             * 8. default value
             *
             */
            var mock_attr = [{
                'id' : 3000,
                'name' : 'ug_name',
                'desc' : 'Name',
                'type' : 'text',
                'component_type' : 'input'
            }, {
                'id' : 3001,
                'name' : 'ug_desc',
                'desc' : 'Description',
                'type' : 'text',
                'component_type' : 'textarea'
            }, {
                'id' : 3003,
                'name' : 'enabled',
                'desc' : 'Enabled',
                'type' : 'input',
                'component_type' : 'checkbox'
            }];

            pageForm = layoutFactory.makeLayout({
                'layout_type' : 'TWO_COLUMNS',
                'container' : pageForm,
                'attrs' : mock_attr,
                'model' : this.model
            });
        },

        afterRender : function() {
            // TODO:
        }
    });

    userGroupGeneralInfo.mixin(genericInfoViewMixin);
    module.exports = userGroupGeneralInfo;
});

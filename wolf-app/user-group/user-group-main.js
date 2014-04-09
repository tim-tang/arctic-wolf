/*
 *
 * Define & export functions for User Group and related
 *
 */
define(function(require, exports, module) {

    // - Import dependency css
    require('css-datatables');
    require('css-jasny');

    var $ = require('$');
    var common = require('../common/common');

    module.exports = {
        ready_user_group_mgmt: function() {

            common.init_switch();
            common.init_multi_select();

            // User Group Management DataTable
            common.make_generic_datatable('userGroup-mgmt-datatable', "/userGroup-mgmt-data", function(datatable) {

                // Add new vehicle in datatable.
                $("#user-group-create-action").click(function(e) {
                    datatable.fnAddData(["Trident-new", "Internet Explorer 4.0", "Win 95+", "4", "X"]);
                });

                // Delete vehicle in datatable.
                $("#userGroup-mgmt-delete").click(function(e) {
                    e.preventDefault();
                    common.remove_selected_row(datatable);
                });
            });
        }
    };
});

/*
 *
 * Define & export functions for Role and related
 *
 */
define(function(require, exports, module) {

    //- Import dependency css
    require('css-multi-select');

    //- Import dependency js
    require('quicksearch');

    var $ = require('$');
    var common = require('../common/common');

    module.exports = {

        ready_role_mgmt: function() {

            common.init_select2();
            common.init_switch();

            // Role Management DataTable
            common.make_generic_datatable('role-mgmt-datatable', "/role-mgmt-data", function(datatable) {

                // Add new role in datatable.
                $("#role-create-action").click(function(e) {
                    datatable.fnAddData([$("#role-name").val(), $("#role-desc").val(), $("#enabled").val() == "on" ? "Yes" : "No"]);
                });

                // Delete role in datatable.
                $("#role-mgmt-delete").click(function(e) {
                    e.preventDefault();
                    common.remove_selected_row(datatable);
                });
            });
        },

        ready_role_details: function() {

            common.init_select2();
            common.init_switch();
            common.init_multi_select();

            // Assigned Privilege DataTable
            common.make_generic_datatable("assigned-privilege-table", "/privilege-mgmt-data", function(datatable) {
                // TODO: Get selected role data here
            });

            // Assigned User Group DataTable
            common.make_generic_datatable("assigned-userGroup-table", "/userGroup-mgmt-data", function(datatable) {
                // TODO: Get selected role data here
            });

            // Assigned User DataTable
            common.make_generic_datatable("assigned-user-table", "/user-mgmt-data", function(datatable) {
                // TODO: Get selected role data here
            });

            // Privilege History DataTable
            common.make_generic_datatable("role-history-datatable", "/role-history-data", function(datatable) {
                // TODO: Fetch all history data here
            });
        }
    };
});

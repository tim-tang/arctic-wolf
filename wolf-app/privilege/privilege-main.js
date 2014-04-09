/*
 *
 * Define & export functions for Privilege and related
 *
 */
define(function(require, exports, module) {

    require('quicksearch');

    var $ = require('$');
    var common = require('../common/common');

    module.exports = {

        ready_privilege_mgmt: function() {
            common.init_select2();
            common.init_switch();

            // Privilege Management DataTable
            common.make_generic_datatable("privilege-mgmt-datatable", "/privilege-mgmt-data", function(datatable) {
                // Add new privilege in datatable.
                $("#priv-create-action").click(function(e) {
                    datatable.fnAddData([$("#priv-name").val(), $("#priv-desc").val(), $("#priv-type").val(), $("#enabled").val() == "on" ? "Yes" : "No"]);
                });

                // Delete privilege in datatable.
                $("#priv-mgmt-delete").click(function(e) {
                    e.preventDefault();
                    common.remove_selected_row(datatable);
                });
            });
        },

        ready_privilege_details: function() {

            common.init_select2();
            common.init_switch();

            // Privilege Where-Used DataTable
            common.make_generic_datatable("privilege-where-used-datatable", "/role-mgmt-data", function(datatable) {
                // TODO: Get selected role data here
            });

            // Privilege History DataTable
            common.make_generic_datatable("privilege-history-datatable", "/privilege-history-data", function(datatable) {
                // TODO: Fetch all history data here
            });
        }
    };
});

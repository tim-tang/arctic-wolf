define(function(require, exports, module) {
    require('parsley');

    var $ = require('$');
    var common = require('../common/common');

    module.exports = {
        ready_user_mgmt: function() {
            common.make_generic_datatable("user-mgmt-datatable", "/user-mgmt-data", function(datatable) {
                // Add new vehicle in datatable.
                $("#user-mgmt-proceed").click(function(e) {
                    datatable.fnAddData(["Trident-new", "Internet Explorer 4.0", "Win 95+", "4", "X"]);
                });

                // Delete vehicle in datatable.
                $("#user-mgmt-delete").click(function(e) {
                    e.preventDefault();
                    common.remove_selected_row(datatable);
                });
            });
        }
    };
});

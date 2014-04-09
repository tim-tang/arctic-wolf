/*
 *
 * Define & export functions for Privilege and related
 *
 */
define(function(require, exports, module) {

    require('quicksearch');

    require('css-daterangepicker');
    require('daterangepicker');
    require('datetimepicker');

    var $ = require('$');
    var common = require('../common/common');
    var vehicleCriteriableAttrsColl = require('../vehicle/collection/vehicle-criteriable-attrs-coll');

    module.exports = {

        ready_criteria_mgmt: function() {

            common.init_select2();
            common.init_switch();

            // Criteria Management DataTable
            common.make_generic_datatable("criteria-mgmt-datatable", "/criteria-mgmt-data", function(datatable) {
                // Add new criteria in datatable.
                $("#cri-create-action").click(function(e) {
                    datatable.fnAddData([$("#cri-name").val(), $("#cri-desc").val(), $("#obj-type").val(), $("#enabled").val() == "on" ? "Yes" : "No"]);
                });

                // Delete criteria in datatable.
                $("#cri-mgmt-delete").click(function(e) {
                    e.preventDefault();
                    common.remove_selected_row(datatable);
                });
            });

            // Add/Delete one Criteria
            var criteriaCount = 0;
            // Add button functionality
            $("#criteriaTable").on("click", "table.table a.add", function() {
                criteriaCount++;
                var master = $(this).parents("table.table");
                // Get a new row based on the prototype row
                var newCriteria = master.find("tr").last().clone();
                newCriteria.attr("class", "")
                newCriteria.find("#value").attr("value", criteriaCount);

                master.find("tbody").append(newCriteria);
            });

            // Remove button functionality
            $("#criteriaTable").on("click", "table.table a.remove", function() {
                //alert(criteriaCount);
                if(criteriaCount >= 1) {
                    $(this).parents("tr").remove();
                    criteriaCount--;
                }
            });
        },

        ready_object_attrs_selectors: function() {
            $("#obj-type").change(function(e){
                var objType = $("#obj-type").val();
                //alert(vehicleCriteriableAttrsColl);
                if(objType == 'Vehicle') {

                    vehicleCriteriableAttrsColl.fetch();
                    var vehicleAttrs = vehicleCriteriableAttrsColl.toJSON();

                    for(var i = 0; i < vehicleAttrs.length; i++) {
                        $("#attrs").append("<option value='"+ vehicleAttrs[i].mData +"'>"+ vehicleAttrs[i].sTitle +"</option>");
                    }
                }
            });

            $("#attrs").change(function(e) {

                // Clear operator selector
                $("#operator").empty();

                var attrVal = $("#attrs").val();
                if(attrVal == 'vehicle_name') {
                    // Assign operators for String
                    $("#operator").append("<option value='start_with'>Start with</option>");
                    $("#operator").append("<option value='contain'>Contains</option>");
                    $("#operator").append("<option value='end_with'>End with</option>");
                } else if(attrVal == 'vehicle_price') {
                    // Assign operators for Numeric
                    $("#operator").append("<option value='equal_to'>Equal to</option>");
                    $("#operator").append("<option value='great_than'>Great than</option>");
                    $("#operator").append("<option value='less_than'>Less than</option>");
                } else if(attrVal == 'vehicle_desc') {
                    // Assign operators for Datetime
                    $("#operator").append("<option value='equal_to'>Equal to(Date)</option>");
                    $("#operator").append("<option value='great_than'>Great than(Date)</option>");
                    $("#operator").append("<option value='less_than'>Less than(Date)</option>");
                    // Value input
                    $("#value").remove();
                    $("#value-div").append("<input class='form-control datetime' type='text' value='This is DatePicker' size='8'>");
                }
            });
        },

        ready_criteria_details: function() {

            common.init_select2();
            common.init_switch();

            // Criteria Where-Used DataTable
            common.make_generic_datatable("criteria-where-used-datatable", "/privilege-mgmt-data", function(datatable) {
                // TODO: Get selected role data here
            });

            // Criteria History DataTable
            common.make_generic_datatable("criteria-history-datatable", "/criteria-history-data", function(datatable) {
                // TODO: Fetch all history data here
            });
        }
    };
});

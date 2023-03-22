

//new content to add in ManageRegCalls.js file (General functions)
//Please see prev and next button code which is above in doucument.ready function
var options = {
    "backdrop": "static",
    "keyboard": false
}
var count = 0;
var totalFilters = 0;

//Show filter popup modal
function ShowFilters() {

    $('#FilterModel').modal(options);
    $('#FilterModel').modal('show');

}

//Add Filter options Dropdown
function AddFilters() {
    var rawFilterString = $("#afvalue").val(); //this string comes from controller
    var valueAfterSplitbyVerticalLine = [];
    valueAfterSplitbyVerticalLine = rawFilterString.split("|");  //split raw filter string by "|" and make an array

    var filterOptionsDropdown = $("<select class='filter' style='height:30px!important;  vertical-align: top;' onChange=filterChange(this);>");
    filterOptionsDropdown.append($("<option>", {
        value: 1,
        text: "No Filter"
    }));

    var valueAfterSplitbyTilde;
    for (i = 0; i <= valueAfterSplitbyVerticalLine.length - 1; i = i + 1) {
        valueAfterSplitbyTilde = valueAfterSplitbyVerticalLine[i].split("~");
        filterOptionsDropdown.append($('<option>', {
            value: valueAfterSplitbyTilde[0] + ":" + valueAfterSplitbyTilde[2] + ":" + valueAfterSplitbyTilde[3] + ":" + valueAfterSplitbyTilde[4],
            text: valueAfterSplitbyTilde[1]

        }));
    };

    var row = $("<tr></tr>");
    var td = $("<td></td>");
    var removeButton = $('<td><span style="color:#555; cursor:pointer; margin:5px; border-radius: 50px; padding: 2px 4px; font-size: 11px; font-weight: 500; vertical-align:top;" class="" onclick=removeRow(this); ><i class="glyphicon glyphicon-remove"></i></span></td>');
    row.append(removeButton);
    td.append(filterOptionsDropdown);
    row.append(td);

    $("#filterTable").append(row);
}

//Remove fitler row
function removeRow(btn) {
    //set search string null in sesstion 
    var rowCount = $('#filterTable tbody tr').length;
    if (rowCount == 0) {
        $("#filterIcon").find("#filterspan").remove();
        totalFilters = 0;

        //sessionStorage.setItem("search", "");
        setSearchSessionStorage(""); //Implement this method on JS file of individual page
    }

    //"remove And-Or condition radio button "
    $(btn).closest('tr').prevAll('tr').each(function () {
        if ($(this).nextAll('tr').not($(btn).closest('tr')).find('td:eq(2)').find('input,select').length == 0) {
            $(this).find('td:eq(3)').remove();
            $(this).append('<td></td>');
        }
    });
    //remove row here
    $(btn).closest('tr').remove();
}

//Append input according to filter option
function filterChange(select) {
    var selectedFilterOptionValue = $(select).val();
    if (selectedFilterOptionValue != "1") {
        var html = "";
        count += 1;
        var condition = $('<label style="margin-left:15px;"><input type="radio" name="ConditionText' + count + '" id="ConditionText"  value="And" /> AND </label> <label><input type="radio" name="ConditionText' + count + '" id="ConditionText"  value="or"  checked="checked" /> OR </label>');
        var td = "";
        var valueAfterSplitbyColon = selectedFilterOptionValue.split(":");
        var valueAfterSplitbyDollor = valueAfterSplitbyColon[1].split("$");
        if (valueAfterSplitbyDollor[0] == 1)/**Check is it a textBox?**/ {
            html = $('<input type="text" id="filterText" style="height: 29px;  width:90%; margin-right:8px; margin-left:10px; margin-top: 5px;" placeholder="Type to search">');
        }
        else if (valueAfterSplitbyDollor[0] == 2)/**Check is it a dropdown?**/ {
            var valueAfterSplitbyHash = valueAfterSplitbyDollor[1].split("#");
            html = $('<select style="width:90%; margin-right:8px; height: 30px;  margin-left:10px;" id="filterDropdown" name="filterDropdown" ></select>')
            html.append('<option value="0" selected="">-' + valueAfterSplitbyHash[6] + '-</option>')
            $.post("/CRM/GetDataforDropdown", { tableName: valueAfterSplitbyHash[1], displayColumnName: valueAfterSplitbyHash[2], keyColumnName: valueAfterSplitbyHash[3], where: valueAfterSplitbyHash[4], order: valueAfterSplitbyHash[5] }, function (data) {
                var data1 = JSON.parse(data);
                $.each(data1, function (index, item) {
                    html.append($('<option>', {
                        value: item[valueAfterSplitbyHash[3]],
                        text: item[valueAfterSplitbyHash[2]]
                    }));
                });
            });
        }
        else if (valueAfterSplitbyDollor[0] == 4)/**Check is it a From To date?**/ {
            var t = new Date($.now());
            var towDigitMonth = (t.getMonth() + 1) >= 10 ? (t.getMonth() + 1) : "0" + (t.getMonth() + 1);
            var towDigitDay = t.getDate() >= 10 ? t.getDate() : "0" + t.getDate();
            var maxDate = t.getFullYear() + "-" + towDigitMonth + "-" + towDigitDay;
            html = $('<label style="margin-left:10px;">From:</label><input type="date" style="height: 30px;  margin-top:1px; margin-bottom:0px; margin-left:10px;" id="min" value="" max="' + maxDate + '"> <label style="margin-left:10px; margin-top:7px;">To: </label><input type="date" style="height: 30px;  margin-top:1px; margin-bottom:0px; margin-left:10px;" id="max" value="" max="' + maxDate + '">');
        }
            //Added by aslam for datetimefilter
        else if (valueAfterSplitbyDollor[0] == 5)/**Check is it a From To datetime?**/ {
            var t = new Date($.now());
            var towDigitMonth = (t.getMonth() + 1) >= 10 ? (t.getMonth() + 1) : "0" + (t.getMonth() + 1);
            var towDigitDay = t.getDate() >= 10 ? t.getDate() : "0" + t.getDate();
            var maxDate = t.getFullYear() + "-" + towDigitMonth + "-" + towDigitDay + "T23:59:59";
            html = $('<label>From:</label><input type="datetime-local"  id="minDT" value="" max="' + maxDate + '" step="1"> <label>To:</label><input type="datetime-local"   id="maxDT" value="" max="' + maxDate + '" step="1">');
        }

        $(select).parents('td').next().next().remove();
        $(select).parents('td').next().remove();
        $(select).parents('tr').append('<td></td>');
        $(select).parents('tr').append('<td></td>');
        $(select).parents('td').next().append(html);

        //check , does we need to append radion button  on this row?
        if ($(select).closest('tr').nextAll('tr').find('td:eq(2)').find('input,select').length) {
            $(select).parent('td').next().next().append(condition);
        }

        //check , does we need to append radion button on all prev rows which have no radion button but have filter input?
        //debugger
        $(select).closest('tr').prevAll('tr').each(function () {
            if ($(this).find('td:eq(2)').find('input,select').length) {
                if ($(this).find('td:eq(3)').find('input[id="ConditionText"]').length == 0) {
                    $(this).find('td:eq(3)').append(condition);
                }
            }
        });

    }
    else {
        $(select).parents('td').next().next().remove();
        $(select).parents('td').next().remove();
        //check , does we need to remove radio button on this row?
        $(select).closest('tr').prevAll('tr').each(function () {
            if ($(this).nextAll('tr').find('td:eq(2)').find('input,select').length == 0) {
                $(this).find('td:eq(3)').remove();
                $(this).append('<td></td>');
            }

        });
    }
    $("#filterTable").css("margin-left", "10px");
}





//Clear filter values 
function removeFilter2() {
    $("#filterTable tr").each(function () {
        $(this).find("#filterDropdown").val(0);
        $(this).find("#filterText").val("");
        $(this).find("#min").val("");
        $(this).find("#max").val("");
        //Added by aslam for datetimefilter
        $(this).find("#minDT").val("");
        $(this).find("#maxDT").val("");
    });

    if (totalFilters > 0) {
        $("#filterIcon").find("#filterspan").remove();
        totalFilters = 0;
    }

    //sessionStorage.setItem("search", "");
    //sessionStorage.setItem("order", "");
    setSearchSessionStorage(""); //Implement this method on JS file of individual page
    setOrderSessionStorage("") //Implement this method on JS file of individual page
}

//Apply Filters and sorting order
//Apply Filters and sorting order
function ApplyFilters2() {
    var search = "";
    var condition = "";
    var order = "";
    var sortOrder = "";
    var searchMsg = "";
    //search string
    $("#filterTable tr").each(function () {
        var selectedFilterOptionValue = $(this).find(".filter").val();
        var selectedFilterText = $(this).find(".filter option:selected").text();
        if (selectedFilterOptionValue != "1") {
            var valueAfterSplitbyColon = selectedFilterOptionValue.split(":");
            var valueAfterSplitbyDollor = valueAfterSplitbyColon[1].split("$");
            if (valueAfterSplitbyDollor[0] == 1) {
                var value = $(this).find("#filterText").val();
                if (value != "" && value != "undefined") {
                    condition = $(this).find('input[id="ConditionText"]:checked').val();
                    if (typeof condition === 'undefined') {
                        condition = "";
                    }
                    search += search == "" ? value + "," + valueAfterSplitbyColon[3] + ":" + valueAfterSplitbyColon[2] + "," + condition : ";" + value + "," + valueAfterSplitbyColon[3] + ":" + valueAfterSplitbyColon[2] + "," + condition;
                    searchMsg +=" " + selectedFilterText + " <span class='' style='font-weight: 600'> '" + value + "'</span>";
                }
            }
            else if (valueAfterSplitbyDollor[0] == 2) {
                var value = $(this).find("#filterDropdown").val();
                var ddltext = $(this).find("#filterDropdown option:selected").text();
                if (value > 0) {
                    condition = $(this).find('input[id="ConditionText"]:checked').val();
                    if (typeof condition === 'undefined') {
                        condition = "";
                    }
                    search += search == "" ? value + "," + valueAfterSplitbyColon[3] + ":" + valueAfterSplitbyColon[2] + "," + condition : ";" + value + "," + valueAfterSplitbyColon[3] + ":" + valueAfterSplitbyColon[2] + "," + condition;
                    searchMsg += " " + selectedFilterText + " <span class='' style='font-weight: 600'> '" + ddltext + "'</span>";
                }
            }
            else if (valueAfterSplitbyDollor[0] == 4) {
                var value1 = $(this).find("#min").val();
                var value2 = $(this).find("#max").val();
                if ((value1 != "undefined" || value2 != "undefined") && (value1 != "" || value2 != "")) {
                    condition = $(this).find('input[id="ConditionText"]:checked').val();
                    if (typeof condition === 'undefined') {
                        condition = "";
                    }
                    search += search == "" ? value1 + "," + value2 + "," + valueAfterSplitbyColon[3] + ":" + valueAfterSplitbyColon[2] + "," + condition : ";" + value1 + "," + value2 + "," + valueAfterSplitbyColon[3] + ":" + valueAfterSplitbyColon[2] + "," + condition;
                    searchMsg += " " + selectedFilterText + " From <span class='' style='font-weight: 600'> '" + value1 + "'</span>" + " To <span class='' style='font-weight: 600'> '" + value2 + "'</span>";
                }
            }
                //Added by aslam for datetimefilter
            else if (valueAfterSplitbyDollor[0] == 5) {
                var value1 = $(this).find("#minDT").val();
                var value2 = $(this).find("#maxDT").val();
                if ((value1 != "undefined" || value2 != "undefined") && (value1 != "" || value2 != "")) {
                    condition = $(this).find('input[id="ConditionText"]:checked').val();
                    if (typeof condition === 'undefined') {
                        condition = "";
                    }
                    var dtv1 = value1.replace("T", " ");
                    dtv1 = dtv1.replace(/:/g, "_");

                    var dtv2 = value2.replace("T", " ");
                    dtv2 = dtv2.replace(/:/g, "_");
                    search += search == "" ? dtv1 + "," + dtv2 + "," + valueAfterSplitbyColon[3] + ":" + valueAfterSplitbyColon[2] + "," + condition : ";" + dtv1 + "," + dtv2 + "," + valueAfterSplitbyColon[3] + ":" + valueAfterSplitbyColon[2] + "," + condition;
                    searchMsg += " " + selectedFilterText + " From <span class='' style='font-weight: 600'> '" + value1 + "'</span>" + " To <span class='' style='font-weight: 600'> '" + value2 + "'</span>";
                }
            }

        }
    });

    ///order string
    $("#sortingTable tr").each(function () {
        var selectedSortColumnValue = $(this).find(".sort").val();
        if (selectedSortColumnValue != "1") {
            sortOrder = $(this).find(".sortOrders").val();
            order += order == "" ? selectedSortColumnValue + " " + sortOrder : " , " + selectedSortColumnValue + " " + sortOrder;
        }
    });


    if (search != "" || order != "") {
        //if (search != "") {
        //    totalFilters = JSON.stringify(search).split(";").length;
        //    if (totalFilters > 0) {
        //        $("#filterIcon").find("#filterspan").remove();
        //        var iconNumber = $('<span class="badge" id="filterspan" style="position: absolute;top: -10px;right: -10px;border-radius: 50%;background-color: blue;color: white;">' + totalFilters + '</span>');
        //        $("#filterIcon").append(iconNumber);
        //    }
        //}

        //sessionStorage.setItem("search", search);
        //sessionStorage.setItem("order", order);
        setSearchSessionStorage(search); //Implement this method on JS file of individual page
        setOrderSessionStorage(order); //Implement this method on JS file of individual page

        var pSize = sessionStorage.getItem("PageSize");
        if ($.trim(searchMsg)!="") {
            searchMsg = "Search Results: " + searchMsg
        }
        setSearchMsgSessionStorage(searchMsg);
        SubmitFilterSort(search, order, pSize,searchMsg)
        //$.ajax({
        //    url: '/ManageRegCalls/AjaxGetJsonData',
        //    type: "POST",
        //    data: { start: 0, pSize: pSize, search: search, order: order },
        //    success: function (data) {
        //        $('#FilterModel').modal('hide');
        //        sessionStorage.setItem("Total", data.recordsTotal);
        //        loadData(data);
        //    },
        //    error: function (data) {
        //        alert("Failed");
        //    }
        //});
    }
    else {
        alert("Please select filter or sorting order")
    }
}



function AddSortingOptions() {
    var rawSortString = $("#svalue").val();
    var valueAfterSplitbyVerticalLine = [];
    valueAfterSplitbyVerticalLine = rawSortString.split("|");

    var sortOptionsDropdown = $("<select class='sort' style='height:30px!important' onChange=sortChange(this); >");
    sortOptionsDropdown.append($("<option>", {
        value: 1,
        text: "--Select--"
    }));
    var valueAfterSplitbyTilde;
    for (i = 0; i <= valueAfterSplitbyVerticalLine.length - 1; i = i + 1) {
        valueAfterSplitbyTilde = valueAfterSplitbyVerticalLine[i].split("~");
        sortOptionsDropdown.append($('<option>', {
            value: valueAfterSplitbyTilde[1],
            text: valueAfterSplitbyTilde[0]
        }));
    };

    var sortOrderSelect = $("<select class='sortOrders' style='margin-left:25px; height:30px!important; width:100%;'>");
    sortOrderSelect.append($("<option value='ASC'>Ascending</option><option value='DESC'>Descending</option>"));

    var row = $("<tr></tr>");
    var td = $("<td></td>");
    var removeButton = $('<td><span style="color:#555; cursor:pointer; margin:5px; border-radius: 50px; padding: 2px 4px; font-size: 11px; font-weight: normal; vertical-align:top;" class="" onclick=removeRow(this);><i class="glyphicon glyphicon-remove"></i></span></td>');
    row.append(removeButton);
    td.append(sortOptionsDropdown);
    row.append(td);
    var td2 = $("<td></td>");
    td2.append(sortOrderSelect);
    row.append(td2);

    $("#sortingTable").append(row);
}

//Check, is selected column name is duplicate or not?
//Means user already selected sort column then he/she will not select same sort column in another row
function sortChange(select) {
    var value = $(select).val();
    if (value != "1") {
        var txt = $(select).find('option:selected').text();
        $("#sortingTable tr").each(function (i, row) {
            i += 1;
            var val = $(this).find('.sort').not(select).val();
            if (val == value) {
                alert("Warning!You have already selected '" + txt.toUpperCase() + "' column at row number " + i);
                $(select).val(1);
                return false;
            }

        });
    }
}





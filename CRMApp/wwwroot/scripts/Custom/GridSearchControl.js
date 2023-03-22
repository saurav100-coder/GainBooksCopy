
//GSC => Grid Search Control
var gscValue = "";
var isMultiSelect = true;

//Show Data on Grid Search Control 
function ShowDataGSC(ctrl, searchFieldName, outputColumn, tableName, ljoin, lcondition, lorder, headerDt,multiSelect) {
    if (multiSelect.toLocaleLowerCase() == 'true') {
        isMultiSelect = true;
    } 
    else {
        isMultiSelect = false;
    }
    var ctrlId = $(ctrl)[0].id;
    var fieldValue =$("#" + ctrlId).val();

    if ($.trim(fieldValue).length==0) {
        $("#" + ctrlId + "-container").css("display", "none");
        return false;
    }

    //Commented by aslam
    //if (fieldValue.length < 3) {
    //    $("#" + ctrlId + "-container").css("display", "none");
    //    return false;
    //}

    $("#" + ctrlId + "-loading").show();
    $("#" + ctrlId + "-loadingmessage").show();
    $("#" + ctrlId + "-Msg").hide();
    $("#" + ctrlId + "-container").css("display", "");
    var table = $("#" + ctrlId + "-table");
    $("#" + ctrlId + "-table tbody tr").remove();
    var searchString = searchFieldName + " Like '" + $.trim(fieldValue).toLowerCase() + "%'  ";
    lcondition = (lcondition == "" ? searchString : lcondition + " and " + searchString);
    $.post("/CRM/GetDataforGridSearchControl", { headerDtStr: JSON.stringify(headerDt), tableName: tableName, lJoin: ljoin, lCondition: lcondition, lOrder: lorder }, function (dataStr) {
        if (dataStr == "") {
            window.location.href = "/home/logout";
        }
        else {
            $("#" + ctrlId + "-table tbody tr").remove();
            var data = JSON.parse(dataStr);
            $.each(data, function (index, item) {
                var m = index + 1;
                var onClickFunc = "";
                if (isMultiSelect) {
                    onClickFunc = "SelectionToggleOnGridSearchRow(this);";
                }
                else {
                    onClickFunc = "SelectAndApplyOnGSC(this,\'"+ ctrlId +"\');";
                }
                var tr = $("<tr style='cursor:pointer;' id='" + item[outputColumn] + "' onClick=" + onClickFunc + "  data-outputcolname='" + outputColumn +"' data-searchcolname='"+searchFieldName+"'></tr>");
                var html = "";
                if (isMultiSelect) {
                    html = "<td><span class='GSCCheckbox glyphicon glyphicon-unchecked'></span>&nbsp;" + m + "</td>";
                }    
                else {
                    html = "<td><span class='GSCCheckbox glyphicon glyphicon-unchecked' style='display:none;'></span>&nbsp;" + m + "</td>";
                }

                for (var i = 0; i < headerDt.length; i++) {
                    var colName = headerDt[i]["NeedTxtField"] ? "txt" + headerDt[i]["SqlColumn"] : headerDt[i]["SqlColumn"];
                    var className = headerDt[i]["SqlColumn"];
                    var itemVal = item[colName];
                    if (itemVal === undefined) {
                        itemVal == "";
                    }

                    var style = headerDt[i]["Visible"] == false ? "display:none;" : "";

                    var dataAttribute = "";
                    if (headerDt[i]["NeedTxtField"] && !headerDt[i]["TxtFieldIsDate"]) {
                        dataAttribute = "data-value='" + item[headerDt[i]["SqlColumn"]] + "'";
                    }

                    html += "<td  class='" + className + "' style='" + style + "'" + dataAttribute + " >" + (itemVal || "") + "</td>"
                }

                tr.html(html);
                table.append(tr);
            });

            $("#" + ctrlId + "-loading").hide();
            $("#" + ctrlId + "-loadingmessage").hide();
            $("#" + ctrlId + "-Msg").hide();
        }
    });
}




//Close button function on Grid Search Control 
function closeGSC(button) {
    $(button).parents("table").parent().hide();
}


//Toggle Row Selection on Click
function SelectionToggleOnGridSearchRow(ctrl) {
    $(ctrl).toggleClass("GSCSelectedRow");
    var span = $(ctrl).find(".GSCCheckbox");

    if ($(ctrl).hasClass("GSCSelectedRow")) {
        $(span).removeClass("glyphicon glyphicon-unchecked");  
        $(span).addClass("glyphicon glyphicon-check");  
    }
    else {
        $(span).removeClass("glyphicon glyphicon-check");  
        $(span).addClass("glyphicon glyphicon-unchecked");  
       
    }
}


function SelectionToggleOnGridSearchAllRows(span) {
    $(span).toggleClass("GSCSelectedRow");
    var tableId = $(span).parents("table")[0].id;

    if ($(span).hasClass("GSCSelectedRow")) {
        $(span).removeClass("glyphicon glyphicon-unchecked");
        $(span).addClass("glyphicon glyphicon-check");
        $("#" + tableId + " tbody tr").not(".GSCSelectedRow").each(function myfunction() {
            SelectionToggleOnGridSearchRow(this);
        });
    }
    else {
        $(span).removeClass("glyphicon glyphicon-check");
        $(span).addClass("glyphicon glyphicon-unchecked");
        $("#" + tableId + " tbody tr.GSCSelectedRow").each(function myfunction() {
            SelectionToggleOnGridSearchRow(this);
        });
    }
}


function GetValues(inputCtrlName) {
    let intVal = "";
    $("#" + inputCtrlName + "-table tbody tr.GSCSelectedRow").each(function () {
        let outputColumn = $(this).attr("data-outputcolname");
        intVal += intVal == "" ? $(this).find("td." + outputColumn).text() : "," + $(this).find("td." + outputColumn).text();
    });
    return intVal;
}

function SetSelectedText(inputCtrlName) {
     let strVal = "";
    $("#" + inputCtrlName + "-table tbody tr.GSCSelectedRow").each(function () {
        let searchFieldName = $(this).attr("data-searchcolname");
        let val =$.trim($(this).find("td." + searchFieldName).text());
        strVal += strVal == "" ? val : ", " + val;
    });
    if (strVal!="") {
        $("#" + inputCtrlName).val(strVal);
    }
    
}


function ApplyOnGSC(inputCtrlName) {
    gscValue = GetValues(inputCtrlName);
    SetSelectedText(inputCtrlName);
    $("#" + inputCtrlName + "-container").css("display", "none");
}


function SelectAndApplyOnGSC(ctrl,inputCtrlName) {
    SelectionToggleOnGridSearchRow(ctrl);
    ApplyOnGSC(inputCtrlName);
}




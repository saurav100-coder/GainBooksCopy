var count = 0;
var Timeout;
var p_acccode = -1;

$(document).ready(function () {
    $("#divUsersSettings").hide();
    /* loadData(p_acccode);*/
    let isAdmin = $.trim($("#isAdmin").val()).toLowerCase();
    //if (isAdmin == "y") {
    //    p_acccode = $.trim($("#adminPCode").val())
    //    let adminName = $.trim($("#adminName").val());
    //    $("#employee").val(adminName);
    //}
    if (isAdmin!=="y") {
        loadData(p_acccode);
    }

    $('input[type=radio][name=user-type]').change(function () {
        if (this.value == 'employee') {
            $('.empCtrl').show();
            $('.custCtrl').hide();
        }
        else if (this.value == 'customer') {
            $('.empCtrl').hide();
            $('.custCtrl').show();
        }
    });
});


function GetEmpSettings() {
    let acccode = $.trim(GetValues("employee"));
    if (acccode == "") {
        $("#startingView").css("display", "");
        $("#divUsersSettings").hide();
        return false;
    }
    p_acccode = parseInt(acccode);
    loadData(p_acccode);
}


function GetCustSettings() {
    let acccode = $.trim(GetValues("customer"));
    if (acccode == "") {
        $("#startingView").css("display", "");
        $("#divUsersSettings").hide();
        return false;
    }
    p_acccode = parseInt(acccode);
    loadData(p_acccode);
}

function loadData(p_acccode) {
    $("#startingView").hide();
    $("#divUsersSettings").hide();
    $(".loader").show();
    $.post('/Configuration/GetUsersSettingsForEmp', { P_acccode: p_acccode }, function (settingmaster) {
        //$("#tbl tbody").empty();
        if (settingmaster == "") {
            window.location = "/Home/Logout";
        }
        //var data = JSON.parse(settingmaster);
        var resultJson = JSON.parse(settingmaster);
        var html = "";
        $("#settingaccordion").empty();

        $.each(resultJson, function (i, settingdata) {
            var data = settingdata.settings;
            if (data.length > 0) {
                html += '<div class="panel panel-default"><div class="panel-heading" role="tab" id="' + settingdata.module + '-web"><a role="button" data-toggle="collapse" data-parent="#settingaccordion" href="#' + settingdata.module + '-webdiv" aria-expanded="true" aria-controls="' + settingdata.module + '-webdiv" class="collapsed "><h4 class="panel-title accordion-toggle" style="text-transform:uppercase">' + settingdata.module + '</h4></a></div>';
                html += '<div id="' + settingdata.module + '-webdiv" class="panel-collapse collapse" role="tabpanel" aria-labelledby="' + settingdata.module + '-web" style="height: 0px;"><div class="panel-body">';
                html += '<div style="overflow-y:scroll; max-height:60vh;  box-shadow: 0px 1px 4px 0px #33333359; border-radius:5px; padding-bottom:10px;"><table class="table table-striped tbl" ><thead><tr><th>Sr No.</th><th class="Ikey">Setting</th><th class="value">Value</th></tr></thead><tbody>';

                $.each(data, function (index, item) {
                    html += "<tr><td>" + (index + 1) + "</td><td>" + item.settinglabelweb + "</td>"
                    var inputtypeweb = $.trim(item.inputtypeweb).toLowerCase();
                    if (inputtypeweb == "dropdown") {
                        html += "<td><select id='" + $.trim(item.settingname) + "' name='" + $.trim(item.settingname) + "' data-module='" + $.trim(item.module) + "' class='form-control'><option value=''>-Select-</option>";
                        if ($.trim(item.settingname) == "defacust") {
                            var selectedValue = $.trim(item.selectedvalue).toLowerCase();
                            var ddlId = "#" + $.trim(item.settingname);
                            $.post("/CRM/GetDataforDropdown", { tableName: "customers", displayColumnName: "custname", keyColumnName: "custcode, p_acccode", where: " Rowstatus=0 and activeFlag='Y' and  (updateflag<>'D' or updateflag is null) ", order: " custname asc" }, function (custdata) {
                                var data1 = JSON.parse(custdata);
                                $.each(data1, function (indx, custitem) {

                                    var keyValue = $.trim(custitem.custname) + "|" + custitem.custcode + "|" + custitem.p_acccode;
                                    if (keyValue.toLowerCase() == selectedValue) {
                                        //$(ddlId).append("<option value='" + keyValue + "' selected>" + custitem.custname + "</option>");
                                        $(ddlId).append("<option value='" + keyValue + "' selected>" + keyValue + "</option>");

                                    }
                                    else {
                                        //$(ddlId).append("<option value='" + keyValue + "'>" + custitem.custname + "</option>");
                                        $(ddlId).append("<option value='" + keyValue + "'>" + keyValue + "</option>");
                                    }
                                });
                            });
                        }
                        else {
                            var optionsArr = (item.settingvaluesweb).split(",");
                            for (var i = 0; i < optionsArr.length; i++) {
                                var option = (optionsArr[i]).split("=");
                                if ($.trim(option[1]).toLowerCase() == $.trim(item.selectedvalue).toLowerCase()) {
                                    html += "<option value='" + option[1] + "' selected>" + option[0] + "</option>"
                                }
                                else {
                                    html += "<option value='" + option[1] + "'>" + option[0] + "</option>"
                                }
                            }
                        }

                        html += "</select></td>";
                    }
                    else if (inputtypeweb == "textbox") {
                        html += "<td><input type='text' id='" + $.trim(item.settingname) + "' name='" + $.trim(item.settingname) + "' data-module='" + $.trim(item.module) + "' class='form-control' value='" + $.trim(item.selectedvalue) + "'/></td>";
                    }

                    html += "</tr>"; 
                });

                html += "</tbody></table></div></div></div></div>"
            }

        })


        $("#settingaccordion").append(html);
       
        $(".loader").hide();
        $("#divUsersSettings").show();
    })
}




//function empChange() {

//    if ($("#ddEmp").val() != 0) {
//        $("#startingView").css("display", "none");
//        p_acccode = $("#ddEmp").val();
//    }
//    else {
//        $("#startingView").css("display", "");
//        $("#divUsersSettings").hide();
//        p_acccode = 0;
//        return false;
//    }

//    loadData(p_acccode);
//}

//function loadData(p_acccode) {
//    $("#divUsersSettings").hide();
//    $(".loader").show();
//    $.post('/Configuration/GetUsersSettingsForEmp', { P_acccode: p_acccode }, function (settingmaster) {
//        $("#tbl tbody").empty();
//        if (settingmaster == "") {
//            window.location = "/Home/Logout";
//        }
//        var data = JSON.parse(settingmaster);
//        $.each(data, function (index, item) {
//            var html = "<tr><td>" + (index + 1) + "</td><td>" + item.settinglabelweb + "</td>"
//            var inputtypeweb = $.trim(item.inputtypeweb).toLowerCase();
//            if (inputtypeweb == "dropdown") {
//                html += "<td><select id='" + $.trim(item.settingname) + "' name='" + $.trim(item.settingname) + "' data-module='" + $.trim(item.module) + "' class='form-control'><option value=''>-Select-</option>";
//                if ($.trim(item.settingname) == "defacust") {
//                    var selectedValue = $.trim(item.selectedvalue).toLowerCase();
//                    var ddlId = "#" + $.trim(item.settingname);
//                    $.post("/CRM/GetDataforDropdown", { tableName: "customers", displayColumnName: "custname", keyColumnName: "custcode, p_acccode", where: " Rowstatus=0 and activeFlag='Y' and  (updateflag<>'D' or updateflag is null) ", order: " custname asc" }, function (custdata) {
//                        var data1 = JSON.parse(custdata);
//                        $.each(data1, function (indx, custitem) {
                            
//                            var keyValue = $.trim(custitem.custname) + "|" + custitem.custcode + "|" + custitem.p_acccode;
//                            if (keyValue.toLowerCase() == selectedValue) {
//                                $(ddlId).append("<option value='" + keyValue + "' selected>" + custitem.custname + "</option>");
//                            }
//                            else {
//                                $(ddlId).append("<option value='" + keyValue + "'>" + custitem.custname + "</option>");
//                            }
//                        });
//                    });
//                }
//                else {
//                    var optionsArr = (item.settingvaluesweb).split(",");
//                    for (var i = 0; i < optionsArr.length; i++) {
//                        var option = (optionsArr[i]).split("=");
//                        if ($.trim(option[1]).toLowerCase() == $.trim(item.selectedvalue).toLowerCase()) {
//                            html += "<option value='" + option[1] + "' selected>" + option[0] + "</option>"
//                        }
//                        else {
//                            html += "<option value='" + option[1] + "'>" + option[0] + "</option>"
//                        }
//                    }
//                }
               
//                html += "</select></td>";
//            }
//            else if (inputtypeweb=="textbox") {
//                html += "<td><input type='text' id='" + $.trim(item.settingname) + "' name='" + $.trim(item.settingname) + "' data-module='" + $.trim(item.module) + "' class='form-control' value='" + $.trim(item.selectedvalue) + "'/></td>";
//            }
                
//            html += "</tr>";
//            $("#tbl tbody").append(html);

//        });
//        $(".loader").hide();
//        $("#divUsersSettings").show();
//    })
//}



function updateSettings() {
    var userSettingString = "";
    var shopControlString = "";
    /*$("#tbl tbody tr").each(function () {*/
    $(".tbl tbody tr").each(function () {
        var ctrl = $(this).find("td:eq(2)").children();
        var type = $(ctrl).prop("type");
        if (type == "select-one" || type == "textbox") {
            var ctrlId = $(ctrl).prop("id");
            if ($("#" + ctrlId).attr("data-module") == "shopcontrol") {
                shopControlString += $.trim(shopControlString) == "" ? ctrlId + "=" + $("#" + ctrlId).val() : "~" + ctrlId + "=" + $("#" + ctrlId).val();
            }
            else {
                userSettingString += $.trim(userSettingString) == "" ? ctrlId + "=" + $("#" + ctrlId).val() : "~" + ctrlId + "=" + $("#" + ctrlId).val();
            }
        }
    });
    
    if ($.trim(userSettingString) != "") {
        $(".loader").show();
        $("#btnUpdate").attr("disabled", true);
        $.post('/Configuration/UpdateSettings', { userSettingString: userSettingString, shopControlString: shopControlString, P_acccode:p_acccode }, function (response) {
            loadData(p_acccode);
            $("#alertMsgDiv").empty();
            var alertClass = response[0] == 0 ? "alert-info" : "alert-success";
            showAlert(response[1], alertClass);
            $("#btnUpdate").attr("disabled", false);
        });
    }



}
function showAlert(msg, classname) {
    clearTimeout(Timeout);

    var alertdiv = '<div id="alert" class="alert ' + classname + '  show " >';
    alertdiv += '<button type="button" class="close" onClick="closeAlert();" >&times;</button>';
    alertdiv += msg + '</div>';
    $("#alertMsgDiv").append(alertdiv);

    Timeout = setTimeout(function () {
        closeAlert();
    }, 1500);
}

function closeAlert() {
    $("#alert").addClass("hide_alert");
    setTimeout(function () {
        $("#alertMsgDiv").empty();
    }, 1000);
}



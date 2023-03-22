var count = 0;
var Timeout;
var p_acccode = -1;

$(document).ready(function () {
    //loadData(p_acccode);
    $("#divRole").hide();

    let isAdmin = $.trim($("#isAdmin").val()).toLowerCase();
    if (isAdmin !== "y") {
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
        $("#divRole").hide();
        return false;
    }
    p_acccode = parseInt(acccode);
    loadData(p_acccode);
}


function GetCustSettings() {
    let acccode = $.trim(GetValues("customer"));
    if (acccode == "") {
        $("#startingView").css("display", "");
        $("#divRole").hide();
        return false;
    }
    p_acccode = parseInt(acccode);
    loadData(p_acccode);
}

//function empChange() {
//    if ($("#ddEmp").val() != 0) {
//        $("#startingView").css("display", "none");
//        p_acccode = $("#ddEmp").val();
//    }
//    else {
//        $("#startingView").css("display", "");
//        $("#divRole").hide();
//        p_acccode = 0;
//        return false;
//    }

//    loadData(p_acccode);
//}

//function loadData(p_acccode) {
//    $("#divRole").hide();
//    $(".loader").show();
//    $.post('/Configuration/GetMenuMasterForEmp', { P_acccode: p_acccode }, function (response) {
//        var webRolesData = JSON.parse(response[0])
//        var appRolesData = JSON.parse(response[1])
//        var errorMsg = response[2]
//        var webRolehtml = "";
//        var appRolehtml = "";

//        $("#tblWebRole").find('tbody').remove();
//        $("#tblAppRole").find('tbody').remove();

//        if (webRolesData.length > 0 || appRolesData.length > 0) {
//            //Fill data into WEBROLES Table
//            $.each(webRolesData, function (index, item) {
//                count += 1;
//                /* webRolehtml += "<tr><td class='key'>" + item.menumaster_key + "</td><td class='item'>" + item.menulabelweb + "</td><td class='action'>";*/
//                webRolehtml += "<tr><td class='key'>" + item.p_menumaster + "</td><td class='item'>" + item.menulabelweb + "</td><td class='action'>";
//                webRolehtml += '<div class="material-switch ">'

//                if (item.TxtEnabled == "Y") {
//                    webRolehtml += '<input class="switchValue" id="switch' + count + '" name="switch' + count + '" type="checkbox" checked="checked"/>'
//                }
//                else {
//                    webRolehtml += '<input class="switchValue" id="switch' + count + '" name="switch' + count + '" type="checkbox"/>'
//                }
//                webRolehtml += '<label for="switch' + count + '" class="label-primary"></label></div>';
//                webRolehtml += "</td></tr>"
//            });

//            $("#tblWebRole").append("<tbody></tbody>");
//            $("#tblWebRole tbody").append(webRolehtml);

//            //Fill data into APPROLES Table
//            $.each(appRolesData, function (index, item) {
//                count += 1;
//                /*appRolehtml += "<tr><td class='key'>" + item.menumaster_key + "</td><td class='item'>" + item.menulabelapp + "</td><td class='action'>";*/
//                appRolehtml += "<tr><td class='key'>" + item.p_menumaster + "</td><td class='item'>" + item.menulabelapp + "</td><td class='action'>";
//                appRolehtml += '<div class="material-switch">'

//                if (item.TxtEnabled == "Y") {
//                    appRolehtml += '<input class="switchValue" id="switch' + count + '" name="switch' + count + '" type="checkbox" checked="checked"/>'
//                }
//                else {
//                    appRolehtml += '<input class="switchValue" id="switch' + count + '" name="switch' + count + '" type="checkbox"/>'
//                }
//                appRolehtml += '<label for="switch' + count + '" class="label-primary"></label></div>';
//                appRolehtml += "</td></tr>"
//            });
//            $("#tblAppRole").append("<tbody></tbody>");
//            $("#tblAppRole tbody").append(appRolehtml);

//            $("#divRole").css("display", "");
//            //$("#alertMsgDiv").empty();

//            //Make Webrole tab active
//            $("ul.nav-tabs li").removeClass("active"); //Remove any "active" class
//            $("ul.nav-tabs li:first").addClass("active"); //Activate first tab
//            $(".tab-pane").removeClass("active");
//            $(".tab-content div:first").addClass("active");

//        }
//        else {
//            if (errorMsg != "") {
//                $("#alertMsgDiv").empty();
//                showAlert(errorMsg, "alert-info");
//            }
//            $("#divRole").css("display", "none");
//        }
//        $(".loader").hide();
//    })


//}


function loadData(p_acccode) {
    $("#divRole").hide();
    $(".loader").show();
    $.post('/Configuration/GetMenuMasterForEmp', { P_acccode: p_acccode }, function (response) {
        var errorMsg = response[1]

        if (response[0] == "" || response[0]=="[]") {
            if (errorMsg != "") {
                $("#alertMsgDiv").empty();
                showAlert(errorMsg, "alert-info");
            }
            $("#divRole").css("display", "none");
            $(".loader").hide();
            return false;
        }

        var resultJson = JSON.parse(response[0]);
        var webRolehtml = "";
        var appRolehtml = "";

        $("#webaccordion").empty();
        $("#appaccordion").empty();

        $.each(resultJson, function (i, data) {
            //For WebRoles
            var webRolesData = data.webroles;
            if (webRolesData.length>0) {
                webRolehtml += '<div class="panel panel-default"><div class="panel-heading" role="tab" id="' + data.module + '-web"><a role="button" data-toggle="collapse" data-parent="#webaccordion" href="#' + data.module + '-webdiv" aria-expanded="true" aria-controls="' + data.module + '-webdiv" class="collapsed "><h4 class="panel-title accordion-toggle" style="text-transform:uppercase">' + data.module + '</h4></a></div>';
                webRolehtml += '<div id="' + data.module + '-webdiv" class="panel-collapse collapse" role="tabpanel" aria-labelledby="' + data.module + '-web" style="height: 0px;"><div class="panel-body">';
                webRolehtml += '<div style="overflow-y:scroll; max-height:60vh;  box-shadow: 0px 1px 4px 0px #33333359; border-radius:5px; padding-bottom:10px;"><table class="table table-striped tblWebRole" ><thead><tr><th class="key">Key</th><th class="item">Item</th><th class="action">Action</th></tr></thead><tbody>';
                var webRolesData = data.webroles;

                $.each(webRolesData, function (index, webRoleItem) {
                    count += 1;
                    webRolehtml += "<tr><td class='key'>" + webRoleItem.p_menumaster + "</td><td class='item'>" + webRoleItem.menulabelweb + "</td><td class='action'>";
                    webRolehtml += '<div class="material-switch ">'

                    if (webRoleItem.TxtEnabled == "Y") {
                        webRolehtml += '<input class="switchValue" id="switch' + count + '" name="switch' + count + '" type="checkbox" checked="checked"/>'
                    }
                    else {
                        webRolehtml += '<input class="switchValue" id="switch' + count + '" name="switch' + count + '" type="checkbox"/>'
                    }
                    webRolehtml += '<label for="switch' + count + '" class="label-primary"></label></div>';
                    webRolehtml += "</td></tr>"
                });

                webRolehtml += "</tbody></table></div></div></div></div>"
            }
            
            //For AppRoles
            var appRolesData = data.approles;
            if (appRolesData.length>0) {
                appRolehtml += '<div class="panel panel-default"><div class="panel-heading" role="tab" id="' + data.module + '-app"><a role="button" data-toggle="collapse" data-parent="#appaccordion" href="#' + data.module + '-appdiv" aria-expanded="true" aria-controls="' + data.module + '-appdiv" class="collapsed"><h4 class="panel-title accordion-toggle" style="text-transform:uppercase">' + data.module + '</h4></a></div>';
                appRolehtml += '<div id="' + data.module + '-appdiv" class="panel-collapse collapse" role="tabpanel" aria-labelledby="' + data.module + '-app" style="height: 0px;"><div class="panel-body">';
                appRolehtml += '<div style="overflow-y:scroll; max-height:60vh;  box-shadow: 0px 1px 4px 0px #33333359; border-radius:5px; padding-bottom:10px;"><table class="table table-striped tblAppRole"><thead><tr><th class="key">Key</th><th class="item">Item</th><th class="action">Action</th></tr></thead><tbody>';


                $.each(appRolesData, function (index, appRoleItem) {
                    count += 1;
                    appRolehtml += "<tr><td class='key'>" + appRoleItem.p_menumaster + "</td><td class='item'>" + appRoleItem.menulabelweb + "</td><td class='action'>";
                    appRolehtml += '<div class="material-switch ">'

                    if (appRoleItem.TxtEnabled == "Y") {
                        appRolehtml += '<input class="switchValue" id="switch' + count + '" name="switch' + count + '" type="checkbox" checked="checked"/>'
                    }
                    else {
                        appRolehtml += '<input class="switchValue" id="switch' + count + '" name="switch' + count + '" type="checkbox"/>'
                    }
                    appRolehtml += '<label for="switch' + count + '" class="label-primary"></label></div>';
                    appRolehtml += "</td></tr>"
                });

                appRolehtml += "</tbody></table></div></div></div></div>"
            }
           
        })

        $("#webaccordion").append(webRolehtml);
        $("#appaccordion").append(appRolehtml);
        if (webRolehtml != "" || appRolehtml!="") {
            $("#divRole").css("display", "");
            //Make Webrole tab active
            $("ul.nav-tabs li").removeClass("active"); //Remove any "active" class
            $("ul.nav-tabs li:first").addClass("active"); //Activate first tab
            $(".tab-pane").removeClass("active");
            $(".tab-content div:first").addClass("active");
        }
        $(".loader").hide();
    })


}


function updateWebRoles() {
    var disableWebRoles = "";
    var enableWebRoles = "";
    //var p_acccode = "";

    $(".tblWebRole tbody tr").each(function () {
        var toggleSwitch = $(this).find(".switchValue")
        if (toggleSwitch.is(":checked")) {
            enableWebRoles += enableWebRoles == "" ? $(this).find("td:eq(0)").text() : "," + $(this).find("td:eq(0)").text();
        }
        if (!toggleSwitch.is(":checked")) {
            disableWebRoles += disableWebRoles == "" ? $(this).find("td:eq(0)").text() : "," + $(this).find("td:eq(0)").text();
        }
    });

    /*p_acccode = $("#ddEmp").val();*/

    $.post('/Configuration/UpdateUserRoles', { P_acccode: p_acccode, Type: "Web", EnableRoles: enableWebRoles, DisableRoles: disableWebRoles }, function (response) {
        
        loadData(p_acccode);
        
        $("#alertMsgDiv").empty();
        var alertClass = response[0] == 0 ? "alert-info" : "alert-success";
        showAlert(response[1], alertClass);
    });


}

function updateAppRoles() {
    
    var disableAppRoles = "";
    var enableAppRoles = "";
    //var p_acccode = "";

    $(".tblAppRole tbody tr").each(function () {
        var toggleSwitch = $(this).find(".switchValue")
        if (toggleSwitch.is(":checked")) {
            enableAppRoles += enableAppRoles == "" ? $(this).find("td:eq(0)").text() : "," + $(this).find("td:eq(0)").text();
        }
        if (!toggleSwitch.is(":checked")) {
            disableAppRoles += disableAppRoles == "" ? $(this).find("td:eq(0)").text() : "," + $(this).find("td:eq(0)").text();
        }
    });

    //p_acccode = $("#ddEmp").val();
    
    $.post('/Configuration/UpdateUserRoles', { P_acccode: p_acccode, Type: "App", EnableRoles: enableAppRoles, DisableRoles: disableAppRoles }, function (response) {
        
        loadData(p_acccode);
        $("#alertMsgDiv").empty();
        var alertClass = response[0]==0?"alert-info":"alert-success";
        showAlert(response[1], alertClass);
    });
    

}

function showAlert(msg, classname) {
    clearTimeout(Timeout);

    var alertdiv = '<div id="alert" class="alert ' + classname + '  show " >';
    alertdiv += '<button type="button" class="close" onClick="closeAlert();" >&times;</button>';
    alertdiv += msg + '</div>';
    $("#alertMsgDiv").append(alertdiv);

    Timeout = setTimeout(function () {
             closeAlert();
            }, 5000);
}

function closeAlert() {
    $("#alert").addClass("hide_alert");
    setTimeout(function () {
        $("#alertMsgDiv").empty();
    }, 1000);
}



//var alertDiv = '<div id="alert" class="alert ' + classname + '">';
//alertDiv += '<span class="msg">' + msg + '</span>';
//alertDiv += '<div class="close-btn"><span>&times;</span></div>';

//var alertdiv = '<div class="alert ' + classname + ' alert-dismissible" role="alert">';
//alertdiv += '<button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button>';
//alertdiv += msg + '</div>';


//var alertMsg = "";
//alertMsg += '<div class="alert alert-danger alert-dismissible" role="alert">';
//alertMsg += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
//alertMsg += errorMsg + '</div>'
//$("#alertMsg").empty();
//$("#alertMsg").fadeOut(3000);
//$(".alert-danger").fadeTo(3000, 500).slideUp(500, function () {
//    $(".alert-danger").slideUp(500);
//});






//fillEmployees();


//function fillEmployees() {
//    $.get('/UserRoles/GetActiveEmployeeofCS', "", function (data) {
//        //console.log(data);
//        var ddEmp = $('#ddEmp');
//        ddEmp.append('<option value="0">-Select Employee-</option>')
//        $.each(data.data, function(index,item) {
//            ddEmp.append($('<option>', {
//                value: item.P_acccode,
//                text: item.AccName
//            }));
//        })
//    })
//}



//function btnClick(elm) {
//    $(elm).toggleClass("btn-danger");
//}

//if ($(this).find("#btnDisable").hasClass("btn-danger")) {
//    if ($(this).find("td:eq(1)").text() == "W") {
//        disableWebRoles += disableWebRoles == "" ? $(this).find("td:eq(0)").text() : "," + $(this).find("td:eq(0)").text();
//    }
//    if ($(this).find("td:eq(1)").text() == "A") {
//        disableAppRoles += disableAppRoles == "" ? $(this).find("td:eq(0)").text() : "," + $(this).find("td:eq(0)").text();
//    }
//}

//<button class='btn btn-default' id='btnDisable' onclick=btnClick(this);>Disable</button>
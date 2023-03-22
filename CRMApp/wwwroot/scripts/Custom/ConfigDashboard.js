var options = {
    "backdrop": "static",
    keyboard: true
};


//Create Feedback link for Call
function GeneratePublicURL() {
    $("#erMsg").hide();
    $(".Box").hide();
    $(".Box input[type='text']").val("");
    var corpid = $("#PublicURLDiv #corpid").val();
    var urlType = $("#PublicURLDiv #urlType").val();
    if (urlType!=="" & urlType!=="0" & corpid!=="") {
        $.post('/Configuration/GeneratePublicURL', { corpid: corpid ,urlType:urlType}, function (data) {
            if (data == "logout") {
                window.location.href = "/Home/LogOut";
            }
            else {
                $(".Box input[type='text']").val(data);
                $(".Box").show();
                $("#PublicURLDiv #corpid").val("");
                $("#PublicURLDiv #urlType").val("0")
            }
        })
    }
    else {
        $("#erMsg").show();
    }
  
}



$(document).ready(function () {
    //document.getElementById("loadspin").style.display = "block";
    //document.getElementById("overlay").style.display = "block";
    $("#loadspin,#overlay").show();
    //// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        // modal.style.display = "none";
        $(".modal").css("display", "none");
    }
    getIssueType();
    getWorkFlowStatus();
    getDepartments();
    getCustomerGroups();
    getTags();
    getTaskPriority();
    $('.MoreDetails').hide();

    $('.Box button').click(function () {
        $(this).prev("input").focus();
        $(this).prev("input").select();

        document.execCommand('copy');

    });
});

//issuetype block functions
function AddIssueType() {
    $("#IssueTypeTxt").val("");
    $("#Exitmode").val("create");
    $("#pid").val(-1);
    var Mtitle = " Create issue Type";
    $('#issueTypeModal .modal-title').text(Mtitle);
    $('.modal-title').css('text-align', 'center');
    $('#issueTypeModal').modal(options);
    $('#issueTypeModal').modal('show');
}
function EditIssueType(id) {
    var divid = "#" + id;
    var value = $(divid).parent().find(".issue")[0].innerText;
    var pid = $(divid).parent().find(".pid")[0].innerText;
    $("#IssueTypeTxt").val(value);
    $("#Exitmode").val("edit");
    //$("#Key").val(id);
    $("#pid").val(pid);
    var Mtitle = "Edit issue Type";
    $('#issueTypeModal .modal-title').text(Mtitle);
    $('.modal-title').css('text-align', 'center');
    $('#issueTypeModal').modal(options);
    $('#issueTypeModal').modal('show');
}
function DeleteIssueCtrl(id) {
    $("#deleteIssueTypeModal #delId").val(id);
    $("#deleteIssueTypeModal").modal(options);
    $("#deleteIssueTypeModal").modal("show");
    //var divid = "#" + id;
    //var value = $(divid).parent().find(".issue")[0].innerText;
    //var pid = $(divid).parent().find(".pid")[0].innerText;
    //$("#IssueTypeTxt").val(value);
    //$("#Exitmode").val("delete");
    ////$("#Key").val(id);
    //$("#pid").val(pid);
    //SubmitIssueType();
}
function DeleteIssueType() {
    $("#deleteIssueTypeModal").modal("hide");
    var id = $("#deleteIssueTypeModal #delId").val();
    var divid = "#" + id;
    var value = $(divid).parent().find(".issue")[0].innerText;
    var pid = $(divid).parent().find(".pid")[0].innerText;
    $("#IssueTypeTxt").val(value);
    $("#Exitmode").val("delete");
    //$("#Key").val(id);
    $("#pid").val(pid);
    SubmitIssueType();
}
function SubmitIssueType() {
    var issuetypetxt = $("#IssueTypeTxt").val();
    if (issuetypetxt != "" && issuetypetxt != null && issuetypetxt != undefined) {
        $("#loadspin,#overlay").show();
        var exitmode = $("#Exitmode").val();
        var pid = $("#pid").val();
        $('#issueTypeModal').modal('hide');
        $.ajax({
            type: "POST",
            url: "/Configuration/SubmitIssueType",
            data: { pid: pid, issuetypeText: issuetypetxt, Exitmode: exitmode },
            success: function (data) {
                if (data == "logout") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }    
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    getIssueType();
                    $("#loadspin,#overlay").hide();
                }
            },
            error: function () {
                $("#loadspin,#overlay").hide();
                $('#Result').modal(options);
                var Mtitle = "An error occured please try again";
                $('#Result .modal-title').text(Mtitle);
                $('.modal-title').css('text-align', 'center');
                $('#Result').modal('show');
            }
        });
    } else {
        $('#Result').modal(options);
        var Mtitle = "Please enter the issue!";
        $('#Result .modal-title').text(Mtitle);
        $('.modal-title').css('text-align', 'center');
        $('#Result').modal('show');
    }
    //var exitmode = $("#Exitmode").val("");
    //var id = $("#Key").val(0);
    $("#Exitmode").val("");
    $("#Key").val("");

}
function getIssueType() {
    $('#loading1').show();
    $('#loadingmessageIssue').hide();
    $('#IssueMsg').show();
    $.ajax({
        type: "POST",
        url: "/Configuration/getIssueType",
        //data: {  start: start, pSize: PSize },
        success: function (data) {
            //$("#loadspin,#overlay").show();
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                loadIssueTypeData(data);
            }
            //document.getElementById("loadspin").style.display = "none";
            //document.getElementById("overlay").style.display = "none";
            //$("#loadspin,#overlay").hide();

        },
        error: function () {
            alert("Error in loading data")
        }
    });

}
function loadIssueTypeData(data) {
    $("#loadspin,#overlay").show();
    $("#IssueTypeDiv").empty();
    var issuetypeDiv = $("#IssueTypeDiv")
    $.each(data.data, function (index, item) {
        var m = index + 1;
        var Parentdiv = "";
        var MoreDetailsdiv = "";
        Parentdiv = $("<div id='MainDiv-" + item.Infotable_key + "' class='col-md-12  clickable parentdiv' style='height:50px;padding-top: 15px'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        MoreDetailsdiv = $("<div  class='MoreDetails' id='" + item.Infotable_key + "' style='display:none;width:90px; height:35px;margin-left: 330px; padding-left:0.75em;padding-top:8px;top:156px;background-color:white;margin-bottom:15px;'>"
          + "<a data-toggle='Edit' style='bottom:25px;cursor:pointer'><i class='glyphicon glyphicon-pencil' onClick='EditIssueType(" + item.Infotable_key + ")' style='font-size:18px; color:#616A6B;'></i></a>"
          + "<a data-toggle='Delete' style='bottom:25px;cursor:pointer'><i class='glyphicon glyphicon-trash' onClick='DeleteIssueCtrl(" + item.Infotable_key + ")' style='font-size:18px; color:#616A6B; padding-left:9px;'></i></a>" +
          +"</div>")

        issuetypeDiv.append(Parentdiv);
        var div1 = $("<div style='padding-right:0px;' class='col-md-1' id='" + item.Infotable_key + "' >" + m + ".</div><span class='pid' style='display:none'>" + item.P_infotable + "</span>");
        var div2 = $("<div style='padding-right:0px;' class='col-md-11 issue' >" + item.NameOfInfo + "</div>");

        Parentdiv.append(div1)
        Parentdiv.append(div2)
        Parentdiv.append(MoreDetailsdiv)
    })
    $("#loadspin,#overlay").hide();
    if (data.data.length == 0) {
        $('#loading1').show();
        $('#loadingmessageIssue').hide();
        $("#IssueMsg").show();
        $("#IssueMsg").text("No record found");
        $('#loading').addClass('clickable');
    } else {
        $('#loading1').hide();
        $('#loadingmessageIssue').hide();
        $('#IssueMsg').hide();
    }
}

//work flow status block functions
function AddWorkFlowStatus() {
    $("#WorkFlowStatusTxt").val("");
    $("#Exitmode").val("create");
    //$("#Key").val(0);
    $("#pid").val(-1);
    var Mtitle = "Create Work Flow Status";
    $('#WorkFlowStatusModal .modal-title').text(Mtitle);
    $('.modal-title'
        ).css('text-align', 'center');
    $('#WorkFlowStatusModal').modal(options);
    $('#WorkFlowStatusModal').modal('show');
}
function EditWorkFlowStatus(id) {
    var divid = "#" + id;
    var value = $(divid).parent().find(".status")[0].innerText;
    var pid = $(divid).parent().find(".pid")[0].innerText;
    $("#WorkFlowStatusTxt").val(value);
    $("#Exitmode").val("edit");
    //$("#Key").val(id);
    $("#pid").val(pid);
    var Mtitle = "Edit Work Flow Status";
    $('#WorkFlowStatusModal .modal-title').text(Mtitle);
    $('.modal-title').css('text-align', 'center');
    $('#WorkFlowStatusModal').modal(options);
    $('#WorkFlowStatusModal').modal('show');
}
function DeleteWorkFlowStatusCtrl(id) {
    $("#deleteWorkFlowStatusModal #delId").val(id);
    $("#deleteWorkFlowStatusModal").modal(options);
    $("#deleteWorkFlowStatusModal").modal("show");
}
function DeleteWorkFlowStatus() {
    $("#deleteWorkFlowStatusModal").modal("hide");
    var id = $("#deleteWorkFlowStatusModal #delId").val();
    var divid = "#" + id;
    var value = $(divid).parent().find(".status")[0].innerText;
    var pid = $(divid).parent().find(".pid")[0].innerText;
    $("#WorkFlowStatusTxt").val(value);
    $("#Exitmode").val("delete");
    //$("#Key").val(id);
    $("#pid").val(pid);
    SubmitWorkFlowStatus();
}
function SubmitWorkFlowStatus() {
    var statustxt = $("#WorkFlowStatusTxt").val();
    if (statustxt != "" && statustxt != null && statustxt != undefined) {
        $("#loadspin,#overlay").show();
        var exitmode = $("#Exitmode").val();
        //var id = $("#Key").val();
        var pid = $("#pid").val();
        $('#WorkFlowStatusModal').modal('hide');
        $.ajax({
            type: "POST",
            url: "/Configuration/SubmitWorkFlowStatus",
            data: { pid: pid, text: statustxt, Exitmode: exitmode },
            success: function (data) {
                if (data == "logout") {
                    window.location.href = "/Home/LogOut";
                    return true;
                } 
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    getWorkFlowStatus();
                    $("#loadspin,#overlay").hide();
                }
            },
            error: function () {
                $("#loadspin,#overlay").hide();
                $('#Result').modal(options);
                var Mtitle = "An error occured please try again";
                $('#Result .modal-title').text(Mtitle);
                $('.modal-title').css('text-align', 'center');
                $('#Result').modal('show');
            }
        });
    } else {
        $('#Result').modal(options);
        var Mtitle = "Please enter the issue!";
        $('#Result .modal-title').text(Mtitle);
        $('.modal-title').css('text-align', 'center');
        $('#Result').modal('show');
    }
    //var exitmode = $("#Exitmode").val("");
    //var id = $("#Key").val(0);
    $("#Exitmode").val("");
    $("#pid").val("");
}
function getWorkFlowStatus() {
    $.ajax({
        type: "POST",
        url: "/Configuration/getWorkFlowStatus",
        //data: {  start: start, pSize: PSize },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                //$("#loadspin,#overlay").show();
                loadWorkFlowStatusData(data);
                //$("#loadspin,#overlay").hide();
            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });

}
function loadWorkFlowStatusData(data) {
    $("#loadspin,#overlay").show();
    $("#WorkFlowStatusDiv").empty();
    var statusDiv = $("#WorkFlowStatusDiv")
    $.each(data.data, function (index, item) {
        var m = index + 1;
        var Parentdiv = "";
        var MoreDetailsdiv = "";
        Parentdiv = $("<div id='MainDiv-" + item.Infotable_key + "' class='col-md-12  clickable parentdiv' style='height:50px;padding-top: 15px;'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        MoreDetailsdiv = $("<div  class='MoreDetails' id='" + item.Infotable_key + "' style='display:none;width:90px;padding-top: 10px; margin-left: 330px; height:35px; padding-left:0.75em;padding-top:8px;top:156px;background-color:white;margin-bottom:15px;'>"
          + "<a data-toggle='Edit' style='bottom:25px;cursor:pointer'><i class='glyphicon glyphicon-pencil' onClick='EditWorkFlowStatus(" + item.Infotable_key + ")' style='font-size:18px; color:#616A6B;'></i></a>"
          + "<a data-toggle='Delete' style='bottom:25px;cursor:pointer'><i class='glyphicon glyphicon-trash' onClick='DeleteWorkFlowStatusCtrl(" + item.Infotable_key + ")' style='font-size:18px; color:#616A6B; padding-left:9px;'></i></a>" +
          +"</div>")

        statusDiv.append(Parentdiv);
        var div1 = $("<div style='padding-right:0px;' class='col-md-1' id='" + item.Infotable_key + "' >" + m + ".</div><span class='pid' style='display:none'>" + item.P_infotable + "</span>");
        var div2 = $("<div style='padding-right:0px;' class='col-md-11 status' >" + item.NameOfInfo + "</div>");

        Parentdiv.append(div1)
        Parentdiv.append(div2)
        Parentdiv.append(MoreDetailsdiv)
    })
    $("#loadspin,#overlay").hide();
}

//No. Of departments block functions
function AddDepartments() {
    $("#departmentTxt").val("");
    $("#Exitmode").val("create");
    //$("#Key").val(0);
    $("#pid").val(-1);
    var Mtitle = "Create Departments";
    $('#DepartmentsModal .modal-title').text(Mtitle);
    $('.modal-title').css('text-align', 'center');
    $('#DepartmentsModal').modal(options);
    $('#DepartmentsModal').modal('show');
}
function EditDepartments(id) {
    var divid = "#" + id;
    var value = $(divid).parent().find(".dep")[0].innerText;
    var pid = $(divid).parent().find(".pid")[0].innerText;
    $("#departmentTxt").val(value);
    $("#Exitmode").val("edit");
    //$("#Key").val(id);
    $("#pid").val(pid);
    var Mtitle = "Edit Departments";
    $('#DepartmentsModal .modal-title').text(Mtitle);
    $('.modal-title').css('text-align', 'center');
    $('#DepartmentsModal').modal(options);
    $('#DepartmentsModal').modal('show');
}
function DeleteDepartmentsCtrl(id) {
    $("#deleteDepartmentsModal #delId").val(id);
    $("#deleteDepartmentsModal").modal(options);
    $("#deleteDepartmentsModal").modal("show");
}
function DeleteDepartments() {
    $("#deleteDepartmentsModal").modal("hide");
    var id = $("#deleteDepartmentsModal #delId").val();
    var divid = "#" + id;
    var value = $(divid).parent().find(".dep")[0].innerText;
    var pid = $(divid).parent().find(".pid")[0].innerText;
    $("#departmentTxt").val(value);
    $("#Exitmode").val("delete");
    //$("#Key").val(id);
    $("#pid").val(pid);
    SubmitDepartment();
}
function SubmitDepartment() {
    var deptxt = $("#departmentTxt").val();
    if (deptxt != "" && deptxt != null && deptxt != undefined) {
        $("#loadspin,#overlay").show();
        var exitmode = $("#Exitmode").val();
        //var id = $("#Key").val();
        var pid = $("#pid").val();
        $('#DepartmentsModal').modal('hide');
        $.ajax({
            type: "POST",
            url: "/Configuration/SubmitDepartments",
            data: { pid: pid, text: deptxt, Exitmode: exitmode },
            success: function (data) {
                if (data == "logout") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }     
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    getDepartments();
                    $("#loadspin,#overlay").hide();
                }
            },
            error: function () {
                $("#loadspin,#overlay").hide();
                $('#Result').modal(options);
                var Mtitle = "An error occured please try again";
                $('#Result .modal-title').text(Mtitle);
                $('.modal-title').css('text-align', 'center');
                $('#Result').modal('show');
            }
        });
    } else {
        $('#Result').modal(options);
        var Mtitle = "Please enter the Department!";
        $('#Result .modal-title').text(Mtitle);
        $('.modal-title').css('text-align', 'center');
        $('#Result').modal('show');
    }
    //var exitmode = $("#Exitmode").val("");
    //var id = $("#Key").val(0);
    $("#Exitmode").val("");
    $("#pid").val("");
}
function getDepartments() {
    $.ajax({
        type: "POST",
        url: "/Configuration/getDepartments",
        //data: {  start: start, pSize: PSize },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                //$("#loadspin,#overlay").show();
                loadDepartmentsData(data);
                //$("#loadspin,#overlay").hide();
            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });

}
function loadDepartmentsData(data) {
    $("#loadspin,#overlay").show();
    $("#DepartmentsDiv").empty();
    var DepartmentsDiv = $("#DepartmentsDiv")
    $.each(data.data, function (index, item) {
        var m = index + 1;
        var Parentdiv = "";
        var MoreDetailsdiv = "";
        Parentdiv = $("<div id='MainDiv-" + item.Infotable_key + "' class='col-md-12  clickable parentdiv' style='height:50px;padding-top: 15px'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        MoreDetailsdiv = $("<div  class='MoreDetails' id='" + item.Infotable_key + "' style='display:none;width:90px;padding-top: 10px;margin-left: 330px; height:35px; padding-left:0.75em;padding-top:8px;top:156px;background-color:white;margin-bottom:15px;'>"
          + "<a data-toggle='Edit' style='bottom:25px;cursor:pointer'><i class='glyphicon glyphicon-pencil' onClick='EditDepartments(" + item.Infotable_key + ")' style='font-size:18px; color:#616A6B;'></i></a>"
          + "<a data-toggle='Delete' style='bottom:25px;cursor:pointer'><i class='glyphicon glyphicon-trash' onClick='DeleteDepartmentsCtrl(" + item.Infotable_key + ")' style='font-size:18px; color:#616A6B; padding-left:9px;'></i></a>" +
          +"</div>")

        DepartmentsDiv.append(Parentdiv);
        var div1 = $("<div style='padding-right:0px;' class='col-md-1' id='" + item.Infotable_key + "' >" + m + ".</div><span class='pid' style='display:none'>" + item.P_infotable + "</span>");
        var div2 = $("<div style='padding-right:0px;' class='col-md-11 dep' >" + item.NameOfInfo + "</div>");

        Parentdiv.append(div1)
        Parentdiv.append(div2)
        Parentdiv.append(MoreDetailsdiv)
    })
    $("#loadspin,#overlay").hide();
}

//Customer Groups block functions
function AddCustomerGroups() {
    $("#CustomerGroupTxt").val("");
    $("#Exitmode").val("create");
    //$("#Key").val(0);
    $("#pid").val(-1);
    var Mtitle = "Create Customer Groups";
    $('#CustomerGroupsModal .modal-title').text(Mtitle);
    $('.modal-title').css('text-align', 'center');
    $('#CustomerGroupsModal').modal(options);
    $('#CustomerGroupsModal').modal('show');
}
function EditCustomerGroup(id) {
    var divid = "#" + id;
    var value = $(divid).parent().find(".CustGrp")[0].innerText;
    var pid = $(divid).parent().find(".pid")[0].innerText;
    $("#CustomerGroupTxt").val(value);
    $("#Exitmode").val("edit");
    //$("#Key").val(id);
    $("#pid").val(pid);
    var Mtitle = "Edit Customer Groups";
    $('#CustomerGroupsModal .modal-title').text(Mtitle);
    $('.modal-title').css('text-align', 'center');
    $('#CustomerGroupsModal').modal(options);
    $('#CustomerGroupsModal').modal('show');
}
function DeleteCustomerGroupCtrl(id) {
    $("#deleteCustomerGroupsModal #delId").val(id);
    $("#deleteCustomerGroupsModal").modal(options);
    $("#deleteCustomerGroupsModal").modal("show");
}
function DeleteCustomerGroup() {
    $("#deleteCustomerGroupsModal").modal("hide");
    var id = $("#deleteCustomerGroupsModal #delId").val();
    var divid = "#" + id;
    var value = $(divid).parent().find(".CustGrp")[0].innerText;
    var pid = $(divid).parent().find(".pid")[0].innerText;
    $("#CustomerGroupTxt").val(value);
    $("#Exitmode").val("delete");
    //$("#Key").val(id);
    $("#pid").val(pid);
    SubmitCustomerGroup();
}
function SubmitCustomerGroup() {
    var CustomerGroupTxt = $("#CustomerGroupTxt").val();
    if (CustomerGroupTxt != "" && CustomerGroupTxt != null && CustomerGroupTxt != undefined) {
        $("#loadspin,#overlay").show();
        var exitmode = $("#Exitmode").val();
        //var id = $("#Key").val();
        var pid = $("#pid").val();
        $('#CustomerGroupsModal').modal('hide');
        $.ajax({
            type: "POST",
            url: "/Configuration/SubmitCustomerGroups",
            data: { pid: pid, text: CustomerGroupTxt, Exitmode: exitmode },
            success: function (data) {
                if (data == "logout") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }   
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    getCustomerGroups();
                    $("#loadspin,#overlay").hide();
                }
            },
            error: function () {
                $("#loadspin,#overlay").hide();
                $('#Result').modal(options);
                var Mtitle = "An error occured please try again";
                $('#Result .modal-title').text(Mtitle);
                $('.modal-title').css('text-align', 'center');
                $('#Result').modal('show');
            }
        });
    } else {
        $('#Result').modal(options);
        var Mtitle = "Please enter the Customer Group!";
        $('#Result .modal-title').text(Mtitle);
        $('.modal-title').css('text-align', 'center');
        $('#Result').modal('show');
    }
    //var exitmode = $("#Exitmode").val("");
    //var id = $("#Key").val(0);
    $("#Exitmode").val("");
    $("#pid").val("");
}
function getCustomerGroups() {
    $.ajax({
        type: "POST",
        url: "/Configuration/getCustomerGroups",
        //data: {  start: start, pSize: PSize },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                //$("#loadspin,#overlay").show();
                loadCustomerGroupsData(data);
                //$("#loadspin,#overlay").hide();
            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });

}
function loadCustomerGroupsData(data) {
    $("#loadspin,#overlay").show();
    $("#CustomerGroupsDiv").empty();
    var CustomerGroupsDiv = $("#CustomerGroupsDiv")
    $.each(data.data, function (index, item) {
        var m = index + 1;
        var Parentdiv = "";
        var MoreDetailsdiv = "";
        Parentdiv = $("<div id='MainDiv-" + item.Infotable_key + "' class='col-md-12  clickable parentdiv' style='height:50px;padding-top: 15px'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        MoreDetailsdiv = $("<div  class='MoreDetails' id='" + item.Infotable_key + "' style='display:none;padding-top: 10px;width:90px;margin-left: 330px; height:35px; padding-left:0.75em;padding-top:8px; top:156px;background-color:white;margin-bottom:15px;'>"
          + "<a data-toggle='Edit' style='bottom:25px;'cursor:pointer><i class='glyphicon glyphicon-pencil' onClick='EditCustomerGroup(" + item.Infotable_key + ")' style='font-size:18px; color:#616A6B;'></i></a>"
          + "<a data-toggle='Delete' style='bottom:25px;cursor:pointer'><i class='glyphicon glyphicon-trash' onClick='DeleteCustomerGroupCtrl(" + item.Infotable_key + ")' style='font-size:18px; color:#616A6B; padding-left:9px;'></i></a>" +
          +"</div>")

        CustomerGroupsDiv.append(Parentdiv);
        var div1 = $("<div style='padding-right:0px;' class='col-md-1' id='" + item.Infotable_key + "' >" + m + ".</div><span class='pid' style='display:none'>" + item.P_infotable + "</span>");
        var div2 = $("<div style='padding-right:0px;' class='col-md-11 CustGrp' >" + item.NameOfInfo + "</div>");

        Parentdiv.append(div1)
        Parentdiv.append(div2)
        Parentdiv.append(MoreDetailsdiv)
    })
    $("#loadspin,#overlay").hide();
}

function hoverId(ctrl) {
    $(ctrl).find('.MoreDetails').show();
    // $(ctrl).find('.MoreDetails').css("display", "inline-flex");
}

function hoverNot(ctrl) {
    $('.MoreDetails').hide();
}



//Tags block functions

function getTags() {
    $.ajax({
        type: "POST",
        url: "/Configuration/getTags",
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                loadTagsData(data);
            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });

}

function loadTagsData(data) {
    $("#loadspin,#overlay").show();
    $("#TagsDiv").empty();
    var TagDiv = $("#TagsDiv")
    var header = $("<div class='row' style='font-weight:bold;'><div class='col-md-1'>SrNo.</div><div class='col-md-6' style='padding-left: 25px;'>Tag Name</div><div class='col-md-5'>Type</div></div>");
    TagDiv.append(header);
    $.each(data.data, function (index, item) {
        var m = index + 1;
        var Parentdiv = "";
        var MoreDetailsdiv = "";
        Parentdiv = $("<div id='MainDiv-" + item.Infotable_key + "' class='col-md-12 col-sm-12  clickable parentdiv' style='height:50px;padding-top: 15px;'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        MoreDetailsdiv = $("<div  class='MoreDetails' id='" + item.Infotable_key + "' style='display:none;width:90px;padding-top: 10px; margin-left: 330px; height:35px; padding-left:0.75em;padding-top:8px;top:156px;background-color:white;margin-bottom:15px;'>"
          + "<a data-toggle='Edit' style='bottom:25px;cursor:pointer'><i class='glyphicon glyphicon-pencil' onClick='EditTags(" + item.Infotable_key + ")' style='font-size:18px; color:#616A6B;'></i></a>"
          + "<a data-toggle='Delete' style='bottom:25px;cursor:pointer'><i class='glyphicon glyphicon-trash' onClick='DeleteTagsCtrl(" + item.Infotable_key + ")' style='font-size:18px; color:#616A6B; padding-left:9px;'></i></a>" +
          +"</div>")

        TagDiv.append(Parentdiv);
        var div1 = $("<div style='padding-right:0px;' class='col-md-1 col-sm-1' id='" + item.Infotable_key + "' >" + m + ".</div><span class='pid' style='display:none'>" + item.P_infotable + "</span>");
        var div2 = $("<div style='padding-right:0px;' class='col-md-6 col-sm-6 tags' >" + item.NameOfInfo + "</div>");
        var div3 = $("<div style='padding-right:0px;' class='col-md-5 col-sm-5 infotype' data-infotype='" + item.Infotype +"'>" + item.Department + "</div>");

        Parentdiv.append(div1)
        Parentdiv.append(div2)
        Parentdiv.append(div3)
        Parentdiv.append(MoreDetailsdiv)
    })
    $("#loadspin,#overlay").hide();
}

function AddTags() {
    $("#TagsTxt").val("");
    $("#infotype").val(0);
    $("#infotype").show();
    $("#Exitmode").val("create");
    $("#pid").val(-1);
    var Mtitle = "Create Tag";
    $('#TagsModal .modal-title').text(Mtitle);
    $('.modal-title').css('text-align', 'center');
    $('#TagsModal').modal(options);
    $('#TagsModal').modal('show');
}

function EditTags(id) {
    var divid = "#" + id;
    var value = $(divid).parent().find(".tags")[0].innerText;
    var pid = $(divid).parent().find(".pid")[0].innerText;
    var infotype = $(divid).parent().find(".infotype").attr("data-infotype");
    $("#TagsTxt").val(value);
    $("#Exitmode").val("edit");
    $("#pid").val(pid);
    $("#infotype").val(infotype);
    $("#infotype").hide();
    var Mtitle = "Edit Tag";
    $('#TagsModal .modal-title').text(Mtitle);
    $('.modal-title').css('text-align', 'center');
    $('#TagsModal').modal(options);
    $('#TagsModal').modal('show');
}

function DeleteTagsCtrl(id) {
    $("#deleteTagsModal #delId").val(id);
    $("#deleteTagsModal").modal(options);
    $("#deleteTagsModal").modal("show");
}

function DeleteTags() {
    $("#deleteTagsModal").modal("hide");
    var id = $("#deleteTagsModal #delId").val();
    var divid = "#" + id;
    var value = $(divid).parent().find(".tags")[0].innerText;
    var pid = $(divid).parent().find(".pid")[0].innerText;
    var infotype = $(divid).parent().find(".infotype").attr("data-infotype");
    $("#TagsTxt").val(value);
    $("#Exitmode").val("delete");
    $("#pid").val(pid);
    $("#infotype").val(infotype);
    $("#infotype").hide();
    SubmitTags();
}

function SubmitTags() {
    var statustxt = $("#TagsTxt").val();
    if (statustxt != "" && statustxt != null && statustxt != undefined) {
        $("#loadspin,#overlay").show();
        var exitmode = $("#Exitmode").val();
        var pid = $("#pid").val();
        var infotype= $("#infotype").val();
        $('#TagsModal').modal('hide');
        $.ajax({
            type: "POST",
            url: "/Configuration/SubmitTags",
            data: { pid: pid, text: statustxt, Exitmode: exitmode, infotype:infotype},
            success: function (data) {
                if (data == "logout") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                if (data=="Tags") {
                    $("#loadspin,#overlay").hide();
                    $('#Result').modal(options);
                    var Mtitle = "This tag cannot be deleted because some records are associated with this tag.";
                    $('#Result .modal-title').text(Mtitle);
                    $('.modal-title').css('text-align', 'center');
                    $('#Result').modal('show');
                }
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    getTags();
                    $("#loadspin,#overlay").hide();
                }

                
            },
            error: function () {
                $("#loadspin,#overlay").hide();
                $('#Result').modal(options);
                var Mtitle = "An error occured please try again";
                $('#Result .modal-title').text(Mtitle);
                $('.modal-title').css('text-align', 'center');
                $('#Result').modal('show');
            }
        });
    } else {
        $('#Result').modal(options);
        var Mtitle = "Please enter the Tag!";
        $('#Result .modal-title').text(Mtitle);
        $('.modal-title').css('text-align', 'center');
        $('#Result').modal('show');
    }
    //var exitmode = $("#Exitmode").val("");
    //var id = $("#Key").val(0);
    $("#Exitmode").val("");
    $("#pid").val("");
    $("#infotype").val(0);
}


//TaskPriority block functions
function getTaskPriority() {
    $.ajax({
        type: "POST",
        url: "/Configuration/getTaskPriority",
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                loadTaskPriorityData(data);
            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });

}

function loadTaskPriorityData(data) {
    $("#loadspin,#overlay").show();
    $("#TaskPriorityDiv").empty();
    var $Div = $("#TaskPriorityDiv")
    $.each(data.data, function (index, item) {
        var m = index + 1;
        var Parentdiv = "";
        var MoreDetailsdiv = "";
        Parentdiv = $("<div id='MainDiv-" + item.Infotable_key + "' class='col-md-12  clickable parentdiv' style='height:50px;padding-top: 15px;'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        MoreDetailsdiv = $("<div  class='MoreDetails' id='" + item.Infotable_key + "' style='display:none;width:90px;padding-top: 10px; margin-left: 330px; height:35px; padding-left:0.75em;padding-top:8px;top:156px;background-color:white;margin-bottom:15px;'>"
          + "<a data-toggle='Edit' style='bottom:25px;cursor:pointer'><i class='glyphicon glyphicon-pencil' onClick='EditTaskPriority(" + item.Infotable_key + ")' style='font-size:18px; color:#616A6B;'></i></a>"
          + "<a data-toggle='Delete' style='bottom:25px;cursor:pointer'><i class='glyphicon glyphicon-trash' onClick='DeleteTaskPriorityCtrl(" + item.Infotable_key + ")' style='font-size:18px; color:#616A6B; padding-left:9px;'></i></a>" +
          +"</div>")

        $Div.append(Parentdiv);
        var div1 = $("<div style='padding-right:0px;' class='col-md-1' id='" + item.Infotable_key + "' >" + m + ".</div><span class='pid' style='display:none'>" + item.P_infotable + "</span>");
        var div2 = $("<div style='padding-right:0px;' class='col-md-11 taskPriority' >" + item.NameOfInfo + "</div>");

        Parentdiv.append(div1)
        Parentdiv.append(div2)
        Parentdiv.append(MoreDetailsdiv)
    })
    $("#loadspin,#overlay").hide();
}

function AddTaskPriority() {
    $("#TaskPriorityTxt").val("");
    $("#Exitmode").val("create");
    $("#pid").val(-1);
    var Mtitle = "Create Task Priority";
    $('#TaksPriorityModal .modal-title').text(Mtitle);
    $('.modal-title').css('text-align', 'center');
    $('#TaksPriorityModal').modal(options);
    $('#TaksPriorityModal').modal('show');
}

function EditTaskPriority(id) {
    var divid = "#" + id;
    var value = $(divid).parent().find(".taskPriority")[0].innerText;
    var pid = $(divid).parent().find(".pid")[0].innerText;
    $("#TaskPriorityTxt").val(value);
    $("#Exitmode").val("edit");
    $("#pid").val(pid);
    var Mtitle = "Edit Task Priority";
    $('#TaksPriorityModal .modal-title').text(Mtitle);
    $('.modal-title').css('text-align', 'center');
    $('#TaksPriorityModal').modal(options);
    $('#TaksPriorityModal').modal('show');
}

function DeleteTaskPriorityCtrl(id) {
    $("#deleteTaskPriorityModal #delId").val(id);
    $("#deleteTaskPriorityModal").modal(options);
    $("#deleteTaskPriorityModal").modal("show");
}

function DeleteTaskPriority() {
    $("#deleteTaskPriorityModal").modal("hide");
    var id = $("#deleteTaskPriorityModal #delId").val();
    var divid = "#" + id;
    var value = $(divid).parent().find(".taskPriority")[0].innerText;
    var pid = $(divid).parent().find(".pid")[0].innerText;
    $("#TaskPriorityTxt").val(value);
    $("#Exitmode").val("delete");
    $("#pid").val(pid);
    SubmitTaskPriority();
}

function SubmitTaskPriority() {
    var $txt = $("#TaskPriorityTxt").val();
    if ($txt != "" && $txt != null && $txt != undefined) {
        $("#loadspin,#overlay").show();
        var exitmode = $("#Exitmode").val();
        var pid = $("#pid").val();
        $('#TaksPriorityModal').modal('hide');
        $.ajax({
            type: "POST",
            url: "/Configuration/SubmitTaskPriority",
            data: { pid: pid, text: $txt, Exitmode: exitmode },
            success: function (data) {
                if (data == "logout") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    getTaskPriority();
                    $("#loadspin,#overlay").hide();
                }
            },
            error: function () {
                $("#loadspin,#overlay").hide();
                $('#Result').modal(options);
                var Mtitle = "An error occured please try again";
                $('#Result .modal-title').text(Mtitle);
                $('.modal-title').css('text-align', 'center');
                $('#Result').modal('show');
            }
        });
    } else {
        $('#Result').modal(options);
        var Mtitle = "Please enter Task Priority!";
        $('#Result .modal-title').text(Mtitle);
        $('.modal-title').css('text-align', 'center');
        $('#Result').modal('show');
    }
    $("#Exitmode").val("");
    $("#pid").val("");
}

///------////


//IssueType context
$(function () {
    $.contextMenu({
        selector: '#IssueTypeDiv div.parentdiv',
        build: function ($trigger) {
            var options = {
                callback: function (key, options) {
                    var divid = options.$trigger[0].id;
                    var temp = divid.split("-");
                    var id = temp[1];
                    var Rowid = "#MainDiv-" + id;
                    var pid = '';

                    switch (key) {
                        case "Edit":
                            var Rowid = "#MainDiv-" + id;
                            var pid = $(Rowid).find(".pid")[0].innerText;
                            var value = $(Rowid).find(".issue")[0].innerText;
                            $("#IssueTypeTxt").val(value);
                            $("#Exitmode").val("edit");
                            $("#pid").val(pid);
                            var Mtitle = "Edit issue Type";
                            $('#issueTypeModal .modal-title').text(Mtitle);
                            $('.modal-title').css('text-align', 'center');
                            $('#issueTypeModal').modal(options);
                            $('#issueTypeModal').modal('show');
                            break;
                        
                        case "Delete":
                            $("#deleteIssueTypeModal #delId").val(id);
                            $("#deleteIssueTypeModal").modal(options);
                            $("#deleteIssueTypeModal").modal("show");
                    }
                },
                items: {
                    "Edit": { name: "Edit", icon: "fa-pencil" },
                    "Delete": { name: "Delete", icon: "fa-trash" },

                }
            }
            return options;
        }
    });
});


//Departments Context
$(function () {
    $.contextMenu({
        selector: '#DepartmentsDiv div.parentdiv',
        build: function ($trigger) {
            var options = {
                callback: function (key, options) {
                    var divid = options.$trigger[0].id;
                    var temp = divid.split("-");
                    var id = temp[1];
                    var Rowid = "#MainDiv-" + id;
                    var pid = '';

                    switch (key) {
                        case "Edit":
                            var Rowid = "#MainDiv-" + id;
                            var pid = $(Rowid).find(".pid")[0].innerText;
                            var value = $(Rowid).find(".dep")[0].innerText;
                            $("#departmentTxt").val(value);
                            $("#Exitmode").val("edit");
                            $("#pid").val(pid);
                            var Mtitle = "Edit Departments";
                            $('#DepartmentsModal .modal-title').text(Mtitle);
                            $('.modal-title').css('text-align', 'center');
                            $('#DepartmentsModal').modal(options);
                            $('#DepartmentsModal').modal('show');
                            break;

                        case "Delete":
                            $("#deleteDepartmentsModal #delId").val(id);
                            $("#deleteDepartmentsModal").modal(options);
                            $("#deleteDepartmentsModal").modal("show");
                    }
                },
                items: {
                    "Edit": { name: "Edit", icon: "fa-pencil" },
                    "Delete": { name: "Delete", icon: "fa-trash" },

                }
            }
            return options;
        }
    });
});


//WorkFlowStatus Context
$(function () {
    $.contextMenu({
        selector: '#WorkFlowStatusDiv div.parentdiv',
        build: function ($trigger) {
            var options = {
                callback: function (key, options) {
                    var divid = options.$trigger[0].id;
                    var temp = divid.split("-");
                    var id = temp[1];
                    var Rowid = "#MainDiv-" + id;
                    var pid = '';

                    switch (key) {
                        case "Edit":
                            var Rowid = "#MainDiv-" + id;
                            var pid = $(Rowid).find(".pid")[0].innerText;
                            var value = $(Rowid).find(".status")[0].innerText;
                            $("#WorkFlowStatusTxt").val(value);
                            $("#Exitmode").val("edit");
                            $("#pid").val(pid);
                            var Mtitle = "Edit Work Flow Status";
                            $('#WorkFlowStatusModal .modal-title').text(Mtitle);
                            $('.modal-title').css('text-align', 'center');
                            $('#WorkFlowStatusModal').modal(options);
                            $('#WorkFlowStatusModal').modal('show');
                            break;

                        case "Delete":
                            $("#deleteWorkFlowStatusModal #delId").val(id);
                            $("#deleteWorkFlowStatusModal").modal(options);
                            $("#deleteWorkFlowStatusModal").modal("show");
                    }
                },
                items: {
                    "Edit": { name: "Edit", icon: "fa-pencil" },
                    "Delete": { name: "Delete", icon: "fa-trash" },

                }
            }
            return options;
        }
    });
});


//Tags Context
$(function () {
    $.contextMenu({
        selector: '#TagsDiv div.parentdiv',
        build: function ($trigger) {
            var options = {
                callback: function (key, options) {
                    var divid = options.$trigger[0].id;
                    var temp = divid.split("-");
                    var id = temp[1];
                    var Rowid = "#MainDiv-" + id;
                    var pid = '';

                    switch (key) {
                        case "Edit":
                            var Rowid = "#MainDiv-" + id;
                            var pid = $(Rowid).find(".pid")[0].innerText;
                            var value = $(Rowid).find(".tags")[0].innerText;
                            var infotype = $(Rowid).find(".infotype").attr("data-infotype");
                            $("#TagsTxt").val(value);
                            $("#Exitmode").val("edit");
                            $("#pid").val(pid);
                            $("#infotype").val(infotype);
                            $("#infotype").hide();
                            var Mtitle = "Edit Tag";
                            $('#TagsModal .modal-title').text(Mtitle);
                            $('.modal-title').css('text-align', 'center');
                            $('#TagsModal').modal(options);
                            $('#TagsModal').modal('show');
                            break;

                        case "Delete":
                            $("#deleteTagsModal #delId").val(id);
                            $("#deleteTagsModal").modal(options);
                            $("#deleteTagsModal").modal("show");
                    }
                },
                items: {
                    "Edit": { name: "Edit", icon: "fa-pencil" },
                    "Delete": { name: "Delete", icon: "fa-trash" },

                }
            }
            return options;
        }
    });
});

//CustomerGroups Context
$(function () {
    $.contextMenu({
        selector: '#CustomerGroupsDiv div.parentdiv',
        build: function ($trigger) {
            var options = {
                callback: function (key, options) {
                    var divid = options.$trigger[0].id;
                    var temp = divid.split("-");
                    var id = temp[1];
                    var Rowid = "#MainDiv-" + id;
                    var pid = '';

                    switch (key) {
                        case "Edit":
                            var Rowid = "#MainDiv-" + id;
                            var pid = $(Rowid).find(".pid")[0].innerText;
                            var value = $(Rowid).find(".CustGrp")[0].innerText;
                            $("#CustomerGroupTxt").val(value);
                            $("#Exitmode").val("edit");
                            $("#pid").val(pid);
                            var Mtitle = "Edit Customer Groups";
                            $('#CustomerGroupsModal .modal-title').text(Mtitle);
                            $('.modal-title').css('text-align', 'center');
                            $('#CustomerGroupsModal').modal(options);
                            $('#CustomerGroupsModal').modal('show');
                            break;

                        case "Delete":
                            $("#deleteCustomerGroupsModal #delId").val(id);
                            $("#deleteCustomerGroupsModal").modal(options);
                            $("#deleteCustomerGroupsModal").modal("show");
                    }
                },
                items: {
                    "Edit": { name: "Edit", icon: "fa-pencil" },
                    "Delete": { name: "Delete", icon: "fa-trash" },

                }
            }
            return options;
        }
    });
});


//Task Priority Context
$(function () {
    $.contextMenu({
        selector: '#TaskPriorityDiv div.parentdiv',
        build: function ($trigger) {
            var options = {
                callback: function (key, options) {
                    var divid = options.$trigger[0].id;
                    var temp = divid.split("-");
                    var id = temp[1];
                    var Rowid = "#MainDiv-" + id;
                    var pid = '';

                    switch (key) {
                        case "Edit":
                            var Rowid = "#MainDiv-" + id;
                            var pid = $(Rowid).find(".pid")[0].innerText;
                            var value = $(Rowid).find(".taskPriority")[0].innerText;
                            $("#TaskPriorityTxt").val(value);
                            $("#Exitmode").val("edit");
                            $("#pid").val(pid);
                            var Mtitle = "Edit Task Priority";
                            $('#TaksPriorityModal .modal-title').text(Mtitle);
                            $('.modal-title').css('text-align', 'center');
                            $('#TaksPriorityModal').modal(options);
                            $('#TaksPriorityModal').modal('show');
                            break;

                        case "Delete":
                            $("#deleteTaskPriorityModal #delId").val(id);
                            $("#deleteTaskPriorityModal").modal(options);
                            $("#deleteTaskPriorityModal").modal("show");
                    }
                },
                items: {
                    "Edit": { name: "Edit", icon: "fa-pencil" },
                    "Delete": { name: "Delete", icon: "fa-trash" },

                }
            }
            return options;
        }
    });
});



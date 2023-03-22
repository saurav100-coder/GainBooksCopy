var options = { "backdrop": "static", keyboard: true };
var popOverOpen = false;
var CurrentHoverRowId = 0;
var CollabPopOpen = false

//1) global variable for viewSettings
var infoString = "";

//this is a sessionStorageKey for Search
var searchKey = "searchManageAllRegCalls";
//this is a sessionStorageKey for order
var orderKey = "orderManageAllRegCalls";
//this is a sessionStorageKey for search Criteria div value
var searchMsgKey = "searchMsgManageAllRegCalls";
//this is a sessionStorageKey for basicFilter UI consistency on Page Reload
var basicFilterStrKey = "basicFilterStrManageAllRegCalls";

//this is a sessionStorageKey for PageSize
var regPageSizeKey = "pageSizeManageAllRegCalls"

var chkvalesArr = [];
var selectAll = false;

function searchByMobileNum() {
    var mobileNum = $("#mobileNumFilter").val();
    if (mobileNum.length == 0) {
        setSearchSessionStorage("");
        setSearchMsgSessionStorage("");
        ReloadGrid();
    }
    else {
        let search = mobileNum + ",m1.Mobileno:string";
        setSearchSessionStorage(search);
        let searchMsg = "Search Results: Mobile No <span class='' style='font-weight: 600'>'" + mobileNum + "'</span>";
        setSearchMsgSessionStorage(searchMsg);
        ReloadGrid();
    }

}


function getMyCalls() {
    var col = "mycalls";
    var search = "y" + "," + col + ":string";
    JSON.stringify(search);
    var searchMsg = "Search Results: <span class='' style='font-weight: 600'>'Your Calls'</span>";
    var basicFilterStr = "mycalls";
    setSearchSessionStorage(search);
    setSearchMsgSessionStorage(searchMsg)
    setBasicFilterStrSessionStorage(basicFilterStr);
    var pSize = sessionStorage.getItem(regPageSizeKey);
    chkvalesArr = [];

    $("#example div ").remove();
    $("#example").height(0);
    $("#loading").show();
    $('#loadingmessage').show();
    $.ajax({
        url: '/CRM/AjaxAllRegCallsData',
        type: "POST",
        data: {  start: 0, pSize: pSize, search: search },
        success: function (data) {
            if ($.trim(searchMsg) != "") {
                $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p>");
                $(".resultDiv").show();
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        },
        error: function (data) {
            alert("Failed");
        }
    });
}

function getAllCalls() {
    setSearchSessionStorage("");
    ReloadGrid();

}

//initial search string 
function setMyCallsSearch() {
    if (sessionStorage.getItem(searchKey) == null || sessionStorage.getItem(searchKey) == "" || sessionStorage.getItem(searchKey) == undefined) {
        setSearchSessionStorage("y,mycalls:string");
        var searchMsg = "Search Results: <span class='' style='font-weight: 600'>'Your Calls'</span>";
        var basicFilterStr = "mycalls";
        setSearchMsgSessionStorage(searchMsg)
        setBasicFilterStrSessionStorage(basicFilterStr);
    }
}



//Basic filter multiple
function SubmitBasicFilter(search, searchMsg) {
    chkvalesArr = [];
    var pSize = sessionStorage.getItem(regPageSizeKey);
    $("#example div").remove();
    $("#example").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    /*$('#Msg').hide();*/
    $.ajax({
        url: "/CRM/AjaxAllRegCallsData",
        type: "POST",
        data: {start: 0, pSize: pSize, search: search },
        success: function (data) {
            if ($.trim(searchMsg) != "") {
                $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p>");
                $(".resultDiv").show();
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        },
        error: function (data) {
            alert("Failed");
        }
    });

}

function lastcalltimesort(lastcallbtn) {
    $(".fa-caret-up").show()
    $(".fa-caret-down").show()
    $(lastcallbtn).toggleClass("Ascend");
    if ($(lastcallbtn).hasClass("Ascend")) {
        setOrderSessionStorage("LastCallTime asc")
        $(lastcallbtn).find(".fa-caret-down").hide();
        $(lastcallbtn).find(".fa-caret-up").show();
    }
    else {
        setOrderSessionStorage("LastCallTime desc")
        $(lastcallbtn).find(".fa-caret-down").show();
        $(lastcallbtn).find(".fa-caret-up").hide();

    }
    $('#loading').show();
    $('#loadingmessage').show();
    $("#example").height(0);
    callSortfun();
}
function registerdatesort(creationbtn) {
    $(".fa-caret-up").show()
    $(".fa-caret-down").show()
    $(creationbtn).toggleClass("Ascend");
    if ($(creationbtn).hasClass("Ascend")) {
        setOrderSessionStorage("registerdate asc")
        $(creationbtn).find(".fa-caret-down").hide();
        $(creationbtn).find(".fa-caret-up").show();
    }
    else {
        setOrderSessionStorage("registerdate desc")
        $(creationbtn).find(".fa-caret-down").show();
        $(creationbtn).find(".fa-caret-up").hide();
    }
    $('#loading').show();
    $('#loadingmessage').show();
    $("#example").height(0);
    callSortfun();
}
function callSortfun() {
    var pSize = sessionStorage.getItem(regPageSizeKey);
    var search = sessionStorage.getItem(searchKey);
    var order = sessionStorage.getItem(orderKey);

    $.ajax({
        url: "/CRM/AjaxAllRegCallsData",
        type: "POST",
        data: { id: "", start: 0, pSize: pSize, search: search, order: order },
        success: function (data) {
            //if ($.trim(searchMsg) != "") {
            //    $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p>");
            //    $(".resultDiv").show();
            //}
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        },
        error: function (data) {
            alert("Failed");
        }
    });

}


function ExportCalls() {
    var search = sessionStorage.getItem(searchKey);
    var order = sessionStorage.getItem(orderKey);

    $.post('/CRM/AjaxExportAllCalls', { search: search, order: order }, function (data) {
        if (data.statusCode == 500) {
            window.location.href = "/Home/Error";
        }
        if (data == "0") {
            ShowMsg("No record found to export", "info");
        }
        else if (data == "") {
            window.location.href = "/Home/Logout";
        }
        else if (data !== "") {
            window.location.href = "/Tasks/downloadTaskExcel?filename=" + data;
        }
    });
}

function remarkExportToExcel(callid) {
    window.location = '/CRM/remarkExportToExcel?callid=' + callid + '&calltype=C';
}

function downloadRemarkFile(filename, filepath) {
    $.post('/Tasks/DownloadRemarkFile', { filename: filename, filepath: filepath }, function (data) {
        if (data.statusCode == 500) {
            window.location.href = "/Home/Error";
        }
        if (data == "") {
            window.location.href = "/Home/Logout";
        }
        else if (data == "err") {
            ShowMsg("File not found", "info");
            //$('#TaskClosedContent').html('');
            //$('#TaskClose').modal(options);
            //$('#TaskClosedContent').html("<h3 class='text-center'>File not found</h3>");
            //$('#TaskClose').modal("show");
            //setTimeout(function () { $('#TaskClose').modal("hide"); }, 1000);
        }
        else {
            window.location.href = "/Tasks/DownloadFile?FullFilepath=" + data.FullFilepath + "&contentType=" + data.contentType + "&filename=" + data.filename
        }

    })
}

//create all the data div and controls
function loadData(data) {
    $("#side").removeClass("test")
    var tblEmployee = $("#example");
    $("#example div").remove();
    $("#example").height(0);
    var a = data.draw;
    if ($("#Next").hasClass("disabledbutton") == true) { $("#Next").removeClass("disabledbutton"); }
    if ($("#Prev").hasClass("disabledbutton") == true) { $("#Prev").removeClass("disabledbutton"); }
    var d = sessionStorage.getItem(regPageSizeKey);
    if (d == null || d == 0 || d == "undefined") { d = 50; sessionStorage.setItem(regPageSizeKey, d); };
    var b;
    if (a == 1) { b = d; sessionStorage.setItem("start", 0); } else { b = parseInt(a) + parseInt(d); a = parseInt(a) + 1; sessionStorage.setItem("start", a); }
    sessionStorage.setItem("Total", data.recordsTotal);
    var c = data.recordsTotal;
    if (c == 0) { a = c; b = c; $("#Next").addClass("disabledbutton"); $("#Prev").addClass("disabledbutton"); }
    else if (c < b && a == 1) { b = c; $("#Next").addClass("disabledbutton"); $("#Prev").addClass("disabledbutton"); }
    else if (c < b && a > 1) { b = c; $("#Next").addClass("disabledbutton"); }
    else if (a == 1) { $("#Prev").addClass("disabledbutton"); }
    else if (b == d) { $("#Next").addClass("disabledbutton"); }
    else if (parseInt(a) + parseInt(d) > c) { $("#Next").addClass("disabledbutton"); $("#Prev").removeClass("disabledbutton"); }
    $("#info").text(a + "-" + b + " of " + c);
    var m = a - 1;
    //4) split infoString by "~"  
    var infoStringArray = infoString.split("~");
    $("#RightShift").click();

    //Added by aslam
    $.each(data.data, function (index, item) {
        if (item.statusCode == 500) {
            window.location.href = "/Home/Error";
        }

        var Parentdiv = "";
        var MoreDetailsdiv = "";

        Parentdiv = $("<div id='MainDiv-" + item.AllCallsReg_key + "' class='col-md-12  clickable parentdiv maindiv opendetail' onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        MoreDetailsdiv = $(("<div  class='MoreDetails' id='" + item.AllCallsReg_key + "'  style='background-color:#cce6ff;'> </div>"))
      
        tblEmployee.append(Parentdiv);

        var statusColor = "";
        if ($.trim(item.TextStatus).toLowerCase() == "call registered") {
            statusColor = "#5cc961";
        }
        else if ($.trim(item.TextStatus).toLowerCase() == "in progress") {
            statusColor = "#5cc961";
        }
        else if ($.trim(item.TextStatus).toLowerCase() == "closed") {
            statusColor = "#f57200";
        }
        else {
            statusColor = "transparent";
        }


        m = m + 1;
        var div = $("<div id='tr-" + item.AllCallsReg_key + "' class='tr u  main MainTr opendetail'  style='display:inline-flex;'></div>");
        div.html(("<input type='checkbox' onclick='chkCheckUncheck(this)' class='checkboxall' id='" + item.P_AllCallsReg + "' value='" + item.P_AllCallsReg + "' style='margin-top: 0px;margin-right:10px;'/>")
            + " " + ("<div style='width:3%; padding-left:3px;text-align: left;' class='callkey basicTr' id='" + item.AllCallsReg_key + "' value='" + item.AllCallsReg_key + " style='margin-top:2px; float:left'><input type='hidden' class='isDeffered' value='" + item.IsDeffered + "'/>" + m + ".</div>")
            + " " + ("<div style='width:4%;' class='callid basicTr'><input type='hidden' id='HasRemark-" + item.AllCallsReg_key + "' value='" + item.hasRemarks + "'/><input type='hidden' id='P-" + item.P_AllCallsReg + "' value='" + item.AllCallsReg_key + "'/>" + item.P_AllCallsReg + "</div>")
            + " " + ("<div style='width:7%;' class='callregdate basicTr'>" + item.TxtRegisterDate + "</div>")
            + " " + ("<div class='combineCol firm opendetail' style='width:18%;padding-right: 7px;'>"
                + "<div class='Tasktitle firmname basicTr clampTr'  style='font-size:13px !important;' data-p_customers='" + item.p_customers + "'>" + item.Firmname + " </div>"
                + "<div class='contactperson basicTr clampTr' style='font-size:13px !important;'>" + item.Contactperson + "</div></div>")
            + " " + ("<div style='width:7%;' class='mobno basicTr'>" + item.Mobileno + "</div>")
            + " " + ("<div style='width:9%;padding-left:0px; text-align:left; padding-right:0px;' class='location basicTr'>" + item.Location + "</div>")
            + " " + ("<div class='combineCol issue opendetail' style='width:16%;padding-right: 7px;'>"
                + "<div class='Tasktitle td titlemanage basicTr clampTr issuetype' style='font-size:13px !important;' data-issuetype='" + item.Issuetype + "'>" + item.TextIssuetype + " </div>"
                + "<div class='basicTr clampTr' style='font-size:13px !important;'>Desc - <span class='issuedescription'>" + item.Issuedescription + "</span></div></div>")
            //+ " " + ("<div style='width:3%;' class='callstatus basicTr' data-callstatus='" + item.Status + "'>" + item.TextStatus + "</div>")
            + " " + ("<div style='width:3%;' class='callstatus basicTr' data-callstatus='" + item.Status + "'><span style = 'display:none;'>" + item.TextStatus + "</span><div class='circle' style='background-color:" + statusColor + "'></div></div>")
            + " " + ("<div style='width:11%; padding:0 5px;' class='assignedto basicTr' data-assignedto='" + item.assignedto + "' >" + item.TextAssignedto + "</div>")
            + " " + ("<div style='width:7%;' class='lastcalldate basicTr'>" + item.txtlastcalltime + "</div>")
            + " " + ("<div style='width:12%' class='basicTr clamptr source'>" + item.Source + "</div>")
            + " " + ("<div style='width:5%;padding-left:40px;display:none;'><input type='hidden' id='Onsite-" + item.AllCallsReg_key + "' class='Onsite basicTr' value='" + item.OnsiteCount + "'/>" + item.onsiteflag + "</div>")
            + " " + ("<div style='width:9%;' class='basicTr nextactiondate'>" + item.FrmtNextActionDate + "</div>")
            + " " + ("<div style='display:none' class='emailId'>" + item.EmailId + "</div>")
            + " " + ("<div style='display:none' class='priorityOrder'>" + item.PriorityOrder + "</div>"));
        Parentdiv.append(div);

        //5) Operation to show hoverStrip menu
        var moreDetailsDivHtml = "";
        var moreDetailsDivPopoverDiv = "";
        for (var i = 0; i <= infoStringArray.length - 1; i++) {
            var infoStringItemArray = infoStringArray[i].split("#");
            var itemOrder = infoStringItemArray[0];
            var itemEnable = infoStringItemArray[1];
            var itemtext = $.trim(infoStringItemArray[2]);
            //if (itemtext.toLocaleLowerCase() == "call engage") {
            //    if (itemEnable.toLocaleLowerCase() == "y") {
            //        moreDetailsDivHtml += "<a  data-toggle='Call Engage'> <img src='/images/1.0.png' class= 'ShowCallEngageCtrls' onclick='CallEngagectrls(this)' data-placement='bottom'></a>";
            //        moreDetailsDivPopoverDiv += "<div class='popover_content_wrapper8' style='display:none; z-index:12; width:70px; margin-top:0px; padding-top:0px' id='CallEngagaeControlDiv'> <span class='close' onclick='popoverClose();' style=' font-size:15px; text-align:right; padding-bottom:15px;'> &times; </span>  <div class='col-md-12' style='height: 55px; padding:0px; width:90%'>Status:<select  id='callstatusInput-" + item.AllCallsReg_key + "' name='callstatusInput'  onchange='SubmitCallEngage(this)' class='callstatusInput col-md-9' style='width:100%; outline:none; border-radius:2px; border:1px solid; margin-right:5px; height:25px;color:black; margin-top: 5px;padding-left: 5px;' /></div></div>";
            //    }
            //}
            //else if (itemtext.toLocaleLowerCase() == "link customer") {
            //    if (itemEnable.toLocaleLowerCase() == "y") {
            //        moreDetailsDivHtml += "<a data-toggle='Link Customer' onclick='ShowLinkCustomerModal(" + item.P_AllCallsReg + "," + item.Mobileno + ")'><img src='/images/2.00.png' data-placement='right'></a>";
            //    }
            //}
            //else if (itemtext.toLocaleLowerCase() == "add remarks") {
            //    if (itemEnable.toLocaleLowerCase() == "y") {
            //        //moreDetailsDivHtml += "<a data-toggle='Add Remarks'  ><i class='glyphicon glyphicon-comment AddRemarkCtrl' onclick='AddRemarkCtrl(this);' data-placement='bottom' style='font-size:20px; color:#616A6B;  padding-left:11px;'></i></a>";
            //        moreDetailsDivHtml += "<a data-toggle='Add Progress Note'  ><img src='/images/3.0.png' class='AddRemarkCtrl' onclick='AddRemarkCtrl(this);' data-placement='bottom'></a>";
            //        //moreDetailsDivPopoverDiv += "<div class='popover_content_wrapper11' style='display:none; z-index:12; width:70px; margin-top:0px; padding-top:0px' id='AddRemarkCtrlDiv' class='AddRemarkCtrlDiv'><span class='close' onclick='popoverClose();' style=' font-size:15px; text-align:right; padding-left:15px;padding-bottom:15px;'> &times; </span>     <div class='col-md-12' style='height: 140px;margin-top: 10px;padding-left:0px;'>Remark <textarea id='AddRemarkCtrl-" + item.AllCallsReg_key + "' name='AddRemarkCtrl' class='col-md-9 AddRemarkInput' type='text' style='width: 207px;color: black;margin-top: 5px;margin-right: 10px;height: 86px;padding: 5px;border-radius: 4px;' /><div class='col-md-3 btn btn-success' id='popoverRemarkSubmit' onclick='SubmitCallRemark(this)' style='width: auto; float: right; padding: 2px 5px 0px 5px;top: 10px;font-size: 12px;'>Submit</div></div></div> ";
            //        moreDetailsDivPopoverDiv += "<div class='popover_content_wrapper11' style='display:none; z-index:12; width:70px; margin-top:0px; padding-top:0px' id='AddRemarkCtrlDiv' class='AddRemarkCtrlDiv'><span class='close' onclick='popoverClose();' style=' font-size:15px; text-align:right; padding-left:15px;padding-bottom:0px;'> &times; </span>     <div class='col-md-12' style='height: 160px;margin-top: 10px;padding-left:0px;display:contents'>Progress Note <textarea id='AddRemarkCtrl-" + item.AllCallsReg_key + "' name='AddRemarkCtrl' class='col-md-9 AddRemarkInput' type='text' style='width: 200px;color: black;margin-top: 5px;margin-right: 10px;height: 70px;padding: 5px;border-radius: 4px;' /><input type='file' name='popoverremarkfile' id='popoverremarkfile' style='display: inline-block; color: #0F5FAF; outline:none; color:white; font-size:10px;'><div class='btn btn-success' id='popoverRemarkSubmit' onclick='SubmitCallRemark(this)' style='width: auto; float: right; padding: 2px 5px 0px 5px;font-size: 12px;margin: 2px 3px 0px 0;'>Submit</div></div></div> ";
            //    }
            //}
            if (itemtext.toLocaleLowerCase() == "view remarks") {
                if (itemEnable.toLocaleLowerCase() == "y") {
                    moreDetailsDivHtml += "<a data-toggle='View Progress Notes' class='ShowRemark' style='width:37px'><img src='/images/4.0.png' class= 'ShowRemark' data-placement='left' onclick='ViewRemarks(this)'></i></a>";
                    moreDetailsDivPopoverDiv += "<div class='popover_content_wrapper3' style='display:none; float:left; data-placement=bottom' id='ShowRemarksDiv'></div>";
                }
            }
            //else if (itemtext.toLocaleLowerCase() == "call assign to") {
            //    if (itemEnable.toLocaleLowerCase() == "y") {
            //        moreDetailsDivHtml += "<a data-toggle='Call Assign To'> <img src='/images/5.0.png' class= 'CallAssignToCtrls'  onclick='CallAssignToCtrls(this)' data-placement='bottom'></a>";
            //        moreDetailsDivPopoverDiv += "<div class='popover_content_wrapper9' style='display:none; z-index:12; width:70px; margin-top:0px; padding-top:0px' id='CallAssignToDiv'><span class='close' onclick='popoverClose();' style='font-size:15px; text-align:right; padding-left:15px;padding-bottom:15px;'> &times; </span>     <div class='col-md-12' style='height: 55px; margin-top: 10px; padding:0px;'>Call Assign To:<select id='CallAssignToInput-" + item.AllCallsReg_key + "'' name='CallAssignToInput' class='CallAssignToInput col-md-9' onchange='SubmitCallAssignTo(this)' style='width:90%; border-radius:2px; margin-right:10px; outline:none; border:1px solid; color:black; margin-top: 5px; padding-left: 5px;' /></div></div> ";
            //    }
            //}
            else if (itemtext.toLocaleLowerCase() == "go to call dashboard") {
                if (itemEnable.toLocaleLowerCase() == "y") {
                    moreDetailsDivHtml += "<a data-toggle='Go To Call Dashboard' style='width:37px' href='/CustomerDetails/Calldashboard?CallId=" + item.P_AllCallsReg + "' > <img src='/images/dashboard.png' style='height:22px; width:22px; margin-top:3px;'></a>";
                }
            }
            //else if (itemtext.toLocaleLowerCase() == "edit") {
            //    if (itemEnable.toLocaleLowerCase() == "y") {
            //        moreDetailsDivHtml += "<a data-toggle='Edit&nbsp&nbsp&nbsp' href='/CRM/EditRegCalls?P_allCallReg=" + item.P_AllCallsReg + "&CalledFrom=ManageAllRegCalls' id='Edit'><img src='/images/70.png'></a>";
            //    }
            //}
            //else if (itemtext.toLocaleLowerCase() == "call transfer to lead") {
            //    if (itemEnable.toLocaleLowerCase() == "y") {
            //        moreDetailsDivHtml += "<a data-toggle='Call Transfer to Lead' onclick='CallTransferToLead(" + item.AllCallsReg_key + ")'> <img src='/images/8.png'></a>";
            //    }
            //}
            //else if (itemtext.toLocaleLowerCase() == "call closed") {
            //    if (itemEnable.toLocaleLowerCase() == "y") {
            //        moreDetailsDivHtml += "<a data-toggle='Call Closed' onclick='CallClose(" + item.AllCallsReg_key + ")'> <img src='/images/9.png'></a>";
            //    }
            //}
            //else if (itemtext.toLocaleLowerCase() == "onsite service") {
            //    if (itemEnable.toLocaleLowerCase() == "y") {
            //        moreDetailsDivHtml += "<a data-toggle='Onsite Service'><img src='/images/10.png' class='OnsiteVisitCtrls' onclick='OnsiteVisitCtrls(this)' data-placement='bottom'></a>";
            //        moreDetailsDivPopoverDiv += "<div class='popover_content_wrapper10'style='display:none; z-index:12; width:70px; margin-top:0px; padding-top:0px' id='OnsiteVisitDiv'><span class='close' onclick='popoverClose();'  style='font-size:15px; text-align:right; padding-left:15px;padding-bottom:15px;'> &times; </span>     <div class='col-md-12' style='height: 55px;margin-top:5px;padding-left:0px;text-align: center;'>Current Onsite Visits:<span id='onsitespan-" + item.AllCallsReg_key + "'></span> <br> <p style='color: grey;margin: 0px;padding-top: 8px;'>Do you want to register Onsite Service</p> </br><hr style='margin-bottom: 3px; width: 200px;border-top-width: 2px;margin-left: 0px;'> <div class='col-md-3 btn btn-primary' id='Yes' onclick='submitOnsiteVisit(this)' style='padding: 2px 5px 0px 5px; top:0px; margin-left: 47px;width: 105px;font-size: 12px;'> Register Visit</div></div></div> ";
            //    }
            //}
            //else if (itemtext.toLocaleLowerCase() == "defercall") {
            //    if (itemEnable.toLocaleLowerCase() == "y") {
            //        moreDetailsDivHtml += "<a data-toggle='DeferCall'> <img src='/images/calldiffer-icon.png' class='ShowDefferCallCtrls' onclick='DeferCallctrls(this)' data-placement='bottom'></a>";
            //        moreDetailsDivPopoverDiv += "<div class='popover_content_wrapper7' style='display:none;z-index:12; width:70px; margin-top:0px; padding-top:0px' id='ShowDefferCallControlDiv'><span class='close' onclick='popoverClose();' style=' font-size:15px; text-align:right; padding-left:15px;padding-bottom:15px;'> &times; </span><div class='col-md-12' style='height: 55px;padding-left:10px; padding-right: 10px;'>Date <input id='NextActionDate' name='NextActionDate' class='NextActionDate col-md-9' type='datetime-local' style='width:100%; max-width: 80% !important; color:black; margin-top: 5px;margin-right: 5px;padding: 2px;border-radius: 3px;outline: none;border: 1px solid;' /><div class='col-md-3 btn btn-success DateBtn' id='DefferDate' onclick='defferCallSubmit(this)' style='border-radius: 50%; padding-top: 0px;padding-bottom: 0px;padding-right:5px; padding-left:3px;width: 20px; height:20px; margin-top:9px; margin-left:4px;'><i class='glyphicon glyphicon-ok' class='IconClose'></i></div></div></div> ";
            //    }
            //}
            //else if (itemtext.toLocaleLowerCase() == "contact customer") {
            //    if (itemEnable.toLocaleLowerCase() == "y") {
            //        moreDetailsDivHtml += "<a data-toggle='Contact Customer'><img src='/images/contact-icon.png' class='ContactCustomerCtrls' onclick='ContactCustomerCtrls(this)' data-placement='bottom'> </a>";
            //        moreDetailsDivPopoverDiv += "<div class='popover_content_wrapper5 ' style='display:none; z-index:12; width:70px; margin-top:0px; padding-top:0px' id='ContactCustomerCtrlsDiv'><span class='close' onclick='popoverClose();' style=' font-size:15px; text-align:right; padding-left:15px;padding-bottom:15px;'> &times; </span><a  onclick='MsgToCustomer(this)'style='color:#222223; cursor:pointer; font-size:11.25px; margin-left: 5px;font-family: verdana,arial,sans-serif;'><i class='fa fa-mobile' style='font-size:25px;padding-left: 3px;     vertical-align: middle; color:#616A6B;z-index:12;opacity: 1; padding-right:4px;'></i>&nbsp; Message To Customer</a> </br><hr style='margin-top: 4px; margin-bottom: 3px; width: 180px;border-top-width: 2px;margin-left: 0px;'><a  onclick='MailToCustomer(this);' style='color:#222223; z-index:12;cursor:pointer; font-size:13.25px' ><i class='fa fa-envelope-o' style='font-size:17px; padding-right: 1px; opacity:1; color:#616A6B;z-index:12;margin-left: 7px;'></i>&nbsp; Mail To Customer</a></div> ";
            //    }
            //}
            //else if (itemtext.toLocaleLowerCase() == "mark duplicate") {
            //    if (itemEnable.toLocaleLowerCase() == "y") {
            //        moreDetailsDivHtml += "<a data-toggle='Mark Duplicate'><img src='/images/clone-icon.png' class= 'MarkDuplicateCtrls' onclick='MarkDuplicateCtrls(this)' data-placement='bottom'></a>";
            //        moreDetailsDivPopoverDiv += "<div class='popover_content_wrapper6 ' style=' display:none; z-index:12; width:70px; margin-top:0px; padding-top:0px' id='MarkDuplicateCtrlsDiv'>     <span class='close' onclick='popoverClose();' style=' font-size:15px; text-align:right; '> &times; </span> <span>Call Id <form style='display:inline-flex;' > <input class='TxtCallId' type='text' style='width:77%; margin-right:10px; border:1px solid; outline:none; color:black; height:20px; margin-top:5px;' /><div class='btn btn-success DateBtn' onclick='SubmitMarkAsDuplicate(this)' style='padding: 0px 5px 1px 3px;height:20px; width:20px; margin-top:5px; margin-bottom: 5px; border-radius:50%;'><i class='glyphicon glyphicon-ok' style='font-size:12px;'></i></div></form></span </div> ";
            //    }
            //}
            //else if (itemtext.toLocaleLowerCase() == "collaborators") {
            //    if (itemEnable.toLocaleLowerCase() == "y") {
            //        moreDetailsDivHtml += "<a data-toggle='Collaborators'><img src='/images/user-icon.png' class='ShowCollaboratorCtrls' data-placement='bottom' onclick='ShowCollaboratorCtrls(this)'></a>";
            //        moreDetailsDivPopoverDiv += "<div class='popover_content_wrapper4' style='display:none; margin-top:0px; padding-top:0px' id='ShowCollaboratorsCtrlsDiv'><span class='close' onclick='popoverClose();' style=' font-size:15px; text-align:right; padding-right:15px;padding-bottom:15px;'> &times; </span><a  onclick='AddCollaborator(this);' style='color:#222223; cursor:pointer; font-size:11.25px;margin-left: 5px;'><i class='fa fa-plus' style='font-size:17px; opacity:1; color:#616A6B; padding-top:10px; padding-right:8px; margin-left:5x;'></i>&nbsp; Add Collaborators</a></br><hr style='margin-top: 4px; margin-bottom: 3px; width: 160px;border-top-width: 2px;margin-left: 0px;'><a onclick='ShowCollaborators(this);' class='ViewCollaborator' style='color:#222223; cursor:pointer; font-size:11.25px' ><i class='fa fa-eye' style='font-size:16px; color:#616A6B; opacity:1;margin-left: 5px;'></i>&nbsp; View Collaborators</a></div>";
            //    }
            //}
        }

        //6) at last we show Customize HoverStrip menu and this will redirect to viewsetting controller
        moreDetailsDivHtml += "<a data-toggle='Customize HoverStrip' href='/Configuration/ManageViewSettings?infotype=hoverstripstring&viewid=manageregcalls'><img src='/images/setting-icon.png' style='height:32px; margin-top:-3px;'></a>";
        /*   <i class='glyphicon glyphicon-wrench'>*/

        //7) append anchore tag data on MoreDetailsDiv
        MoreDetailsdiv.append(moreDetailsDivHtml);
        //8) append popover_content_wrapper div on MoreDetailsDiv
        MoreDetailsdiv.append(moreDetailsDivPopoverDiv);

        div.append(MoreDetailsdiv);
        div.append(MoreDetailsdiv);
        var Maindivid = "#" + "MainDiv-" + item.AllCallsReg_key;
        var engStatus = "#eng-" + item.P_AllCallsReg
        var loggedUser = $("#LoggedUser").val();
        //if ((item.EngageStatus.includes("Locked")) && (item.EngageStatus.indexOf(loggedUser) == -1)) {
        //    $(Maindivid).find(".MoreDetails").addClass("disabledbutton")
        //    $(engStatus).addClass("alert-warning")
        //}
        //if (item.IsDeffered == "Y") {

        //    $(Maindivid).css("background-color", "#cfcccc")
        //    $(Maindivid).css("color", "black")
        //    var ctrldivid = "#" + item.AllCallsReg_key;
        //    $(Maindivid).find(".MoreDetails").css("background-color", "#cfcccc")

        //}
        //else if (item.TextTaskStatus == "Deffered") {
        //    var Maindivid = "#" + "MainDiv-" + item.AllCallsReg_key;
        //    $(Maindivid).css("background-color", "rgb(243, 102, 99)")
        //    $(Maindivid).css("color", "white")
        //    var ctrldivid = "#" + item.AllCallsReg_key;
        //    $(ctrldivid).css("background-color", "rgb(243, 102, 99)")
        //    $(Maindivid).find(".MoreDetails").css("background-color", "rgb(243, 102, 99)")
        //}

        //if (item.EngageStatus != "") {
        //    $(engStatus).css('display', 'block');
        //} else {
        //    $(engStatus).css('display', 'none');
        //}
        //$('.OnsiteVisitCtrls').popover({
        //    html: true,
        //    trigger: 'manual',
        //    content: function () {
        //        return $('.popover_content_wrapper10').html();
        //    }
        //})

        //$('.AddRemarkCtrl').popover({
        //    html: true,
        //    trigger: 'manual',
        //    content: function () {
        //        return $('.popover_content_wrapper11').html();
        //    }
        //})

        $('.ShowRemark').popover({
            html: true,
            trigger: 'manual',
            content: function () {
                return $('.popover_content_wrapper3').html();
            }
        })

        //$('.CallAssignToCtrls').popover({
        //    html: true,
        //    trigger: 'manual',
        //    content: function () {
        //        return $('.popover_content_wrapper9').html();
        //    }
        //})

        //$('.MarkDuplicateCtrls').popover({
        //    html: true,
        //    trigger: 'manual',
        //    content: function () {
        //        return $('.popover_content_wrapper6').html();
        //    }
        //})

        //$('.ShowCallEngageCtrls').popover({
        //    html: true,
        //    trigger: 'manual',
        //    content: function () {
        //        return $('.popover_content_wrapper8').html();
        //    }
        //})

        //$('.ShowCollaboratorCtrls').popover({
        //    html: true,
        //    trigger: 'manual',
        //    content: function () {
        //        return $('.popover_content_wrapper4').html();
        //    }
        //})

        //$('.ContactCustomerCtrls').popover({
        //    html: true,
        //    trigger: 'manual',
        //    content: function () {
        //        return $('.popover_content_wrapper5').html();
        //    }
        //})
        //$('.ShowDefferCallCtrls').popover({
        //    html: true,
        //    trigger: 'manual',
        //    content: function () {
        //        return $('.popover_content_wrapper7').html();
        //    }
        //})


        if (selectAll) {
            $("#selectall").prop('checked', true);
            $('.checkboxall').each(function () {
                $(".checkboxall").prop('checked', true);
            })
        }
        else {
            for (var i = 0; i < chkvalesArr.length; i++) {
                $("#chk-" + chkvalesArr[i]).prop('checked', true);
            }
        }

    });

    if (data.data.length == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $('#loading').addClass('clickable');
        $("#example").height(0);
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
        Deviceheight();
        DetailPaneHeight();
    }
    //Deviceheight();


    //onclick select all checkbox
    $("#selectall").click(function () {
        if (this.checked) {
            $('.checkboxall').each(function () {
                $(".checkboxall").prop('checked', true);
                var index = chkvalesArr.indexOf($(this).val());
                if (index == -1) {
                    chkvalesArr.push($(this).val());
                    $(".maindiv").addClass("rowChecked")
                    $(".MoreDetails").addClass("rowChecked");
                }
            })
            $("#subDiv #subDivLable").text("Select all rows");
            $("#subDiv").show();
        }
        else {
            $('.checkboxall').each(function () {
                $(".checkboxall").prop('checked', false);
                var index = chkvalesArr.indexOf($(this).val());
                if (index > -1) {
                    chkvalesArr.splice(index, 1);
                    $(".maindiv").removeClass("rowChecked")
                    $(".MoreDetails").removeClass("rowChecked");
                }
            })
            selectAll = false;
            $("#subDiv").hide();
        }
    });


    $(document).ready(function () {
        $('#right1').on('click', '#hideDetailPane', function () {

            var isSomethingTrue = true;
            if (isSomethingTrue) {

                $("#right1").hide();
                $(".left").show();
                //$(".Taskstatus").addClass(".mov");
                Deviceheight();
                DetailPaneHeight();

            }

        });

        $('.right').on('click', '#RightShift', function () {
            var isSomethingTrue = true;
            if (isSomethingTrue && ($(window).width() >= 600)) {
                Deviceheight();
                var lastChkbox = $(".maindiv.rowActive").find(".checkboxall")[0];
                if (lastChkbox !== undefined) {
                    $(lastChkbox).attr("checked", false);
                    chkCheckUncheck(lastChkbox);
                }

                $(".maindiv").removeClass("rowActive");
                $(".MoreDetails").removeClass("rowActive")
                $(".main").css("display", "inline-flex");
                $("#dropdown").removeClass("setStyle");
                $(".right").hide();
                $(".left").show();
                $(".left").removeClass("move");
                $(".h").show();
                $("div").removeClass("style");
                $("div").css("box-shadow", "none");
                $(".right").css('display', 'none');

                $(".LastCallTime").show();
                $(".AssignedTo").show();
                $(".NextActionDate").show();
                $(".assignedto").show();
                $(".lastcalldate").show();
                $(".nextactiondate").show();
                $(".callkey").removeClass("n")
                $(".callid").removeClass("c")
                $(".callregdate").removeClass("d")
                $(".mobno").removeClass("m")
                $(".callstatus").removeClass("s")
                $(".issue").removeClass("i")
                $(".firm").removeClass("f")

                $(".SNo").removeClass("nt")
                $(".CallId").removeClass("ct")
                $(".Date").removeClass("dt")
                $(".Firm").removeClass("ft")
                $(".Status").removeClass("st")
                $(".Issue").removeClass("it")
                $(".Mobile").removeClass("mt")
                Deviceheight();
                DetailPaneHeight();

            }
            else if (isSomethingTrue && ($(window).width() <= 600)) {
                $(".right").hide();
                $(".left").show();
                $(".left").removeClass("move");
                //$(".Taskstatus").addClass(".mov");
                Deviceheight();
                DetailPaneHeight();
            }
        });
    });

    $(document).ready(function () {
        $('.tabs-navWeb a').on('click', function (event) {
            event.preventDefault();

            $('.tab-activeWeb').removeClass('tab-activeWeb');
            $(this).parent().addClass('tab-activeWeb');
            $('.tabs-stageWeb .div').hide();
            $('.tabs-stageWeb').find($(this).attr('href')).show();
        });

        $('.tabs-navWeb a:first').trigger('click'); // Default

        $('.tabs-nav a').on('click', function (event) {
            event.preventDefault();

            $('.tab-active').removeClass('tab-active');
            $(this).parent().addClass('tab-active');
            $('.tabs-stage .div').hide();
            $('.tabs-stage').find($(this).attr('href')).show();
        });

        $('.tabs-nav a:first').trigger('click'); // Default
        $('.ShareBox button').click(function () {
            $(this).prev("input").focus();
            $(this).prev("input").select();

            document.execCommand('copy');

        });

    });

}


$(document).ready(function () {
    $("nav").find(".newTitle").remove();
    /*var s = "<p class='newTitle' >Manage AllCalls</p>";*/
    var s = "<p class='newTitle' >Manage All Service Request</p>";
    $("nav").find(".titleName").append(s);

    $('[data-toggle="tooltip"]').tooltip({ delay: { "show": 500, "hide": 100 } });
    $("#dropdown").removeClass("setStyle");


    $('#tblFirms').on('click', 'tr', function () {
        $("#FirmContainer").css("display", "none");
        var rowid = this.id;
        var fname = $(this).find("td:nth-child(3)").text();
        $('#txtfirmtitle').val(fname);
        if (rowid != 0 || rowid != undefined || rowid != null) {
            $("#P_Cust").val(rowid);
        } else {
            $("#P_Cust").val(-1);
        }
    });


    $('#example').on('click', '.u', function (e) {
        let targetCtrl = $(e.target)
        if (!(targetCtrl.hasClass("checkboxall"))) {
            let targetParent = $(e.target).parent();
            let id = targetParent[0].id;
            //if (id !== 'undefind' && $.trim(id.substring(0, id.indexOf("-"))) == 'tr')
            if (id !== 'undefind' && targetParent.hasClass("opendetail")) {
                $(".right").hide();
                var isSomethingTrue = true;
                $("div").css("box-shadow", "none");
                if (isSomethingTrue && ($(window).width() >= 600)) {
                    var lastChkbox = $(".maindiv.rowActive").find(".checkboxall")[0];
                    if (lastChkbox !== undefined) {
                        $(lastChkbox).attr("checked", false);
                        chkCheckUncheck(lastChkbox);
                    }

                    $(".maindiv").removeClass("rowActive");
                    $(".MoreDetails").removeClass("rowActive")
                    $(this).parent("div").addClass("rowActive");
                    $(this).parent("div").find(".MoreDetails").addClass("rowActive");
                    var chkBox = $(this).parent("div").find(".checkboxall")[0];
                    $(chkBox).attr("checked", true);
                    chkCheckUncheck(chkBox);
                    $(this).parent("div").css("box-shadow", "0px 1px 4px 0px #33333359");
                    $(".Taskdescription").css("margin-right", "15px");
                    $("#dropdown").addClass("setStyle");
                    $(".right").css("display", "flex")
                    $(".left").addClass("move");
                    $(".h").hide();
                    Deviceheight();
                    var $row = $(this).closest("div");
                    SetDetailPane($row, ".right");
                    $(".LastCallTime").css("display", "none");
                    $(".AssignedTo").css("display", "none");
                    $(".NextActionDate").css("display", "none");
                    $(".assignedto").css("display", "none");
                    $(".lastcalldate").css("display", "none");
                    $(".nextactiondate").css("display", "none");
                    $(".callkey").addClass("n")
                    $(".callid").addClass("c")
                    $(".callregdate").addClass("d")
                    $(".mobno").addClass("m")
                    $(".callstatus").addClass("s")
                    $(".issue").addClass("i")
                    $(".firm").addClass("f")

                    $(".SNo").addClass("nt")
                    $(".CallId").addClass("ct")
                    $(".Date").addClass("dt")
                    $(".Firm").addClass("ft")
                    $(".Status").addClass("st")
                    $(".Issue").addClass("it")
                    $(".Mobile").addClass("mt")

                }
            }
        }
    });


    //Mobile detailpane onclick function
    $('#example').on('click', '.u', function () {
        var isSomethingTrue = true;
        if (isSomethingTrue && ($(window).width() <= 600)) {
            $("#dropdown").addClass("setStyle");
            $(".right").css("display", "flex")
            $(".right").addClass("mobileDetailPane");
            $(".left").hide();
            Deviceheight();
            var $row = $(this).closest("div");
            SetDetailPane($row, ".right");
        }
    });

    $(".right").hide();

});

//Set table height according to screen
function Deviceheight() {
    var h = $(".content-wrapper").css("min-height")
    $("#example").height(h);
    //var Header = $("header").outerHeight(true);
    //var Container = 0;
    //var icondiv = $(".calHeightIcon").outerHeight(true);
    //var TableDive = $(".calHeightTaskBar").outerHeight(true);
    //var Footer = $(".main-footer").outerHeight(true);
    //var windowHeight = $(window).outerHeight(true);
    //var SumOfElementHeight = Header + Container + TableDive + icondiv + Footer;
    //var MainHeight = windowHeight - SumOfElementHeight - 15; //- 40;
    //$("#example").height(MainHeight);
}

//added by Rasika for purpose of responsiveness while switching from desktop view to mobile view
$(document).ready(function () {
    function resizewidth() {
        if ($(window).width() >= 600) {
            $(".detailpaneIconrow").find("#RightShift").removeClass("fa-arrow-left").addClass("fa-arrow-right");
            if ($(".right").css('display') != 'none') {
                $(".left").addClass("move");
                $(".left").show();
                $(".right").css("display", "flex")
                $(".right").removeClass("mobileDetailPane");
            }
            else {
                $(".left").show();
                $(".right").hide();
            }
        }

        if ($(window).width() <= 600) {
            var i = $(".detailpaneIconrow").find("#RightShift").removeClass("fa-arrow-right").addClass("fa-arrow-left");
            if ($(".right").css('display') != 'none') {
                $(".left").hide();
                $(".right").addClass("mobileDetailPane");
            }
            else {
                $(".left").show();
                $(".right").hide();
                $(".right").removeClass("mobileDetailPane");
            }
        }
    }

    $(window).resize(function () {
        resizewidth();
        Deviceheight();
        DetailPaneHeight();
    });
});
// End Of Function

//Set  destop detail pane height according to screen 
function DetailPaneHeight() {
    //var Header = $("header").outerHeight(true);
    //var Footer = $(".main-footer").outerHeight(true);
    //var windowHeight = $(window).outerHeight(true);
    //var SumOfElementHeight = Header + Footer;
    //var MainHeight = windowHeight - SumOfElementHeight;//- 20;
    //$(".right").height(MainHeight);
    var h = $(".content-wrapper").css("min-height")
    $(".right").height(h + 30);
}

//Table height will change according to Sidebar height

var Sidebar = $(".sidebar")[0];
var resizeObserver = new ResizeObserver((event) => {
    var h = $(".content-wrapper").css("min-height")
    $("#example").height(h);
    $(".right").height(h + 30)
    if ($(Sidebar).hasClass("test")) {
        $("#example").height(0)
    }
});
resizeObserver.observe(Sidebar);


//Load call Remarks
function LoadRemarks(Pid, destination) {
    $(destination + " #remarkTab #boxLoading #boxLoadingMessage").show();
    $(destination + " #remarkTab #AllRemarks").hide();
    $.ajax({
        type: "POST",
        url: "/CRM/AddRemarkData",
        data: { CallId: Pid },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }

            var a = 1;
            var finalDestination = $(destination + " #remarkTab #AllRemarks")
            finalDestination.empty();

            var iconsHtml = $("<div style='top:0px;position:sticky;z-index:2;background:white;height:40px;'><a data-toggle='Export to excel' class='col-md-1' style='padding-left: 0px;padding-top: 9px;margin-bottom: 5px;padding-right: 10px;text-align: center;' onclick='remarkExportToExcel(" + Pid + ");' > <span class='glyphicon glyphicon-share' style='font-size:20px;Cursor:pointer;'></span></a></div>");

            $.each(data.data, function (index, item) {
                var m = (a) + index;
                //Load Data
                var html = '<div class="RemarkHistoryItem col-sm-12 HistoryItem" id="' + item.CRMCommunication_key + '">'
                    + '<div class="line1 ">  <span class="">' + m + '</span>   <div class="text">' + item.Commtext + '</div></div>'
                    + '<div class="line2"><span class="Remarkuser"><img src="/images/profilemini.png">' + item.TextLogincode + '</span><span class="Remarkdate" style="float:right;"><img src="/images/calender.png">' + item.FrmtCreationDate + '</span></div>';
                if (item.FileName != "") {
                    html = html + '<div class="line3"><span class="upload">Uploaded File :</span><a style="cursor:pointer" onClick="downloadRemarkFile(\'' + $.trim(item.FileName) + '\',\'' + item.LinkURL + '\')"  class="filenam">' + item.FileName + '</a></div></div>';
                }
                var remarkDiv = $(html);

                finalDestination.append(remarkDiv);
                $(destination + " #remarkTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            });
            if (data.recordsTotal == 0) {
                //var NothingDiv = $('<div class="RemarkHistoryItem" style="padding-bottom:8px;"><div class="line1"><span>No Remarks here</span> </div></div>');
                var NothingDiv = $('<div class="RemarkHistoryItem HistoryItem"><div class="line1"><span style="width:100%;">No Progress Notes here</span> </div></div>');
                finalDestination.append(NothingDiv);
                $(destination + " #remarkTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            }
            else {
                finalDestination.prepend(iconsHtml);
            }
        },
        error: function () {
            //var NothingDiv = $('<div class="RemarkHistoryItem" style="padding-bottom:8px;"><div class="line1"><span>No Remarks here</span> </div></div>');
            var NothingDiv = $('<div class="RemarkHistoryItem HistoryItem"><div class="line1"><span style="width:100%;">No Progress Notes here</span> </div></div>');
            $(destination + " #remarkTab #AllRemarks").append(NothingDiv);
            $(destination + " #remarkTab #boxLoading #boxLoadingMessage").hide();
            $(destination + " #remarkTab #AllRemarks").show();
        }
    });
}

//Load Call Logs with Recording
function LoadCallLogs(Pid, destination) {
    $(destination + " #callLogsTab #boxLoading #boxLoadingMessage").show();
    $(destination + " #callLogsTab #AllCallLogs").hide();
    $.ajax({
        type: "POST",
        url: "/CustomerDetails/GetCallRecordingData",
        data: { P_allcallsreg: Pid },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }

            var a = 1;
            var finalDestination = $(destination + " #callLogsTab #AllCallLogs")
            finalDestination.empty();
            var CallRecordingdata = JSON.parse(data)

            $.each(CallRecordingdata, function (index, item) {
                var m = (a) + index;
                //Load Data
                //var html = '<div class="CallLogHistoryItem col-sm-12 HistoryItem" id="' + item.p_callfreq + '">'
                //    + '<div class="line1 ">  <span class="">' + m + '</span>   <div class=""><i class="fa fa-phone" style="padding-right:8px;"></i></div>  <div style="">' + item.mobileno + '</div></div>'
                //    + '<div class="line2"><span class="Remarkuser"><i class="fa fa-clock-o"></i>' + item.TextCallDuration + '</span><span class="Remarkdate" style="float:right;"><i class="fa fa-tag" aria-hidden="true"></i>' + item.calltype + '</span></div>'
                //    + '<div class="line2"><span class="Remarkuser" style="visibility:hidden";><img src="/images/profilemini.png">' + item.TextLogincode + '</span><span class="Remarkdate" style="float:right;"><img src="/images/calender.png">' + item.Textcalltime + '</span></div>';
                //if (item.callduration > 0 && item.filename !== "" && item.filename !== null) {
                //    html += '<div class="line2"><span class="Remarkuser"><i class="fa fa-play-circle" style="padding-right:8px;font-size:25px;cursor:pointer;"onclick="PlayFile(' + item.p_callfreq + ');"></i><input type="hidden" id="file-' + item.p_callfreq + '" value="' + $.trim(item.filename) + '"/><input type="hidden" id="link-' + item.p_callfreq + '" value="' + item.linkurl + '"/></span><div style="display: flex;"  id="recording-' + item.p_callfreq + '" ></div></div>'
                //}
                var html = '<div class="CallLogHistoryItem col-sm-12 HistoryItem" id="' + item.p_callfreq + '">'
                    + '<div class="line1"><div style="display:flex;"><span class="">' + m + '</span><div class=""><i class="fa fa-phone" style="padding-right:8px;"></i></div>  <div style="">' + item.mobileno + '</div></div><div style="display:flex;width:100%;justify-content:flex-end;"><div class=""><i class="fa fa-phone" style="padding-right:8px;"></i></div><div>' + item.empMobile + '</div></div></div>'
                    + '<div class="line2"><span class="Remarkuser"><i class="fa fa-clock-o"></i>' + item.TextCallDuration + '</span><span class="Remarkuser" style="float:right;margin-top: 3px;"><img src="/images/profilemini.png" style="margin-right:5px;">' + item.TextLogincode + '</span></div>'
                    + '<div class="line2"><span class="Remarkdate" style="" ><i class="fa fa-tag" aria-hidden="true"></i>' + item.Textcalltype + '</span><span class="Remarkdate" style="float:right;margin-top:3px;"><img src="/images/calender.png" style="margin-right:5px;">' + item.Textcalltime + '</span></div>';
                if (item.callduration > 0 && item.filename !== "" && item.filename !== null) {
                    html += '<div class="line2"><span class="Remarkuser"><i class="fa fa-play-circle" style="padding-right:8px;font-size:25px;cursor:pointer;"onclick="PlayFile(' + item.p_callfreq + ');">&nbsp;' + item.filename + '</i><input type="hidden" id="file-' + item.p_callfreq + '" value="' + $.trim(item.filename) + '"/><input type="hidden" id="link-' + item.p_callfreq + '" value="' + item.linkurl + '"/></span><div style="display: flex;"  id="recording-' + item.p_callfreq + '" ></div></div>'
                }

                var callLogsDiv = $(html);

                finalDestination.append(callLogsDiv);
                $(destination + " #callLogsTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            });
            if (CallRecordingdata.length == 0) {
                var NothingDiv = $('<div class="CallLogHistoryItem HistoryItem"><div class="line1"><span class="text" style="width:100% ">No Call Logs here</span> </div></div>');
                finalDestination.append(NothingDiv);
                $(destination + " #callLogsTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            }
        },
        error: function () {
            var NothingDiv = $('<div class="CallLogHistoryItem"><div class="line1"><span class="text" style="width:100% ;">No Call Logs here</span> </div></div>');
            $(destination + " #callLogsTab #AllCallLogs").append(NothingDiv);
            $(destination + " #callLogsTab #boxLoading #boxLoadingMessage").hide();
            $(destination + " #callLogsTab #AllCallLogs").show();
        }
    });
}

//Load Call Collaborators
function ShowCollaboratorsNew(destination) {
    $(destination + " .SectionCollaborators #boxLoading #boxLoadingMessage").show();
    $(destination + " .SectionCollaborators #AllCollab").hide();
    var CallPid = $(destination + " #callid").text();
    $.ajax({
        type: "POST",
        url: "/CRM/AddCallCollaboratorsData",
        data: { CallId: CallPid, calltype: "C" },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }

            $(destination + " .SectionCollaborators .boxx #AllCollab").empty();
            $.each(data.data, function (index, item) {
                var html = ' <div class="CollaboratorsBoxx" id="' + item.CRMCollaborator_key + '"><img src="/images/profilemini.png" class="icon-image collabIcon">'
                    + ' <span id="collaboratorName" class="text">' + item.TxtCollaborator + '</span>';
                    /*+ '<img src="/images/icon-cancel.png" alt="Delete" class="deleteCollabIcon" id="' + item.CRMCollaborator_key + '" onclick=" deleteCollaboratorNew(this.id, \'' + destination + '\')">';*/
                var collaboratorDiv = $(html);
                $(destination + " .SectionCollaborators .boxx #AllCollab").append(collaboratorDiv);
                $(destination + " .SectionCollaborators #boxLoading #boxLoadingMessage").hide();
                $(destination + " .SectionCollaborators #AllCollab").show();
            });

            if (data.recordsTotal == 0) {
                var NotingCollabDiv = $('<div class="CollaboratorsBoxx"><span id="collaboratorName" class="text">No Collaborators here</span></div>');
                $(destination + " .SectionCollaborators .boxx #AllCollab").append(NotingCollabDiv);
                $(destination + " .SectionCollaborators #boxLoading #boxLoadingMessage").hide();
                $(destination + " .SectionCollaborators #AllCollab").show();
            }
        },
        error: function () {
            var NotingCollabDiv = $('<div class="CollaboratorsBoxx"><span id="collaboratorName" class="text">No Collaborators here</span></div>');
            $(destination + " .SectionCollaborators .boxx #AllCollab").append(NotingCollabDiv);
            $(destination + " .SectionCollaborators #boxLoading #boxLoadingMessage").hide();
            $(destination + " .SectionCollaborators #AllCollab").show();
        }
    });

}

////Delete Call Collaborators
//function deleteCollaboratorNew(id, destination) {
//    $.ajax({
//        type: "GET",
//        url: "/Tasks/DeleteCollaborator",
//        contentType: "application/json; charset=utf-8",
//        datatype: "json",
//        data: { id: id },
//        success: function (data) {
//            if (data == "") {
//                window.location.href = "/Home/LogOut";
//                return true;
//            }
//            if (data.statusCode == 500) {
//                window.location.href = "/Home/Error";
//            }
//            else {
//                ShowMsg("Collaborator deleted Successfully", "success");
//                ShowCollaboratorsNew(destination);
//            }
//        },
//        error: function () {
//            ShowMsg("Something went wrong,Please try again later.", "error");
//        }
//    });
//}

////Add new Task Collaborator
//function SubmitCollaboratorsNew(destination) {
//    var PCall = $(destination + " #callid").text();
//    var selectedCollaborator = $(destination + " #ddlCollab").val();
//    if (selectedCollaborator != 0) {
//        $.ajax({
//            type: "POST",
//            url: "/CRM/AddCallCollaborators",
//            data: { PCall: PCall, calltype: "C", collaboratorId: selectedCollaborator },
//            success: function (data) {
//                if (data.statusCode == 500) {
//                    window.location.href = "/Home/Error";
//                }
//                if (data == "Already Collborate") {
//                    ShowMsg("This user is already a collaborator", "info");
//                    return true;
//                }
//                else if (data == "success") {
//                    ShowMsg("Collaborator added Successfully.", "success");
//                    closeAddCollab(destination);
//                    ShowCollaboratorsNew(destination);
//                }
//                else {
//                    ShowMsg("An error occured while storing your Information .Please try again later.", "error");
//                }
//            },
//            error: function () {
//                ShowMsg("An error occured while storing your Information .Please try again later.", "error");
//            }
//        });
//    }

//}

////Show Controls to Add new call Collaborator
//function AddCollaboratorsNew(destination) {
//    $(destination + " .SectionCollaborators #AddCollab").hide();
//    $(destination + " .SectionCollaborators #ddlCollab").show();
//    $(destination + " .SectionCollaborators #closeAddCollab").show();
//}

////Close Controls of Add new call Collaborator
//function closeAddCollab(destination) {
//    $(destination + " .SectionCollaborators #AddCollab").show();
//    $(destination + " .SectionCollaborators #ddlCollab").val(0);
//    $(destination + " .SectionCollaborators #ddlCollab").hide();
//    $(destination + " .SectionCollaborators #closeAddCollab").hide();
//}

//Load calls Tags
function ShowTagsNew(destination) {
    $(destination + " .task-classification #boxLoading #boxLoadingMessage").show();
    $(destination + " .task-classification #tag-container").hide();
    var callid = $("#callid").text();
    $.ajax({
        type: "POST",
        url: "/CRM/ShowTagsData",
        data: { Callid: callid },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }

            $(destination + " .task-classification .boxx #tag-container").empty();
            $.each(data.data, function (index, item) {
                var html = ' <div class="TagsBoxx" id="' + item.tags_key + '">'
                    + ' <span id="TagName" class="text">' + item.txttagname + '</span>';
             /*       + ' <img src="/images/icon-cancel.png" alt="Delete" class="tagDeleteIcon" id="' + item.p_tags + '" onclick="deleteTagsNew(this.id, \'' + destination + '\' )">';*/
                var TagDiv = $(html);
                $(destination + " .task-classification .boxx #tag-container").append(TagDiv);
                $(destination + " .task-classification #boxLoading #boxLoadingMessage").hide();
                $(destination + " .task-classification #tag-container").show();
            });

            if (data.recordsTotal == 0) {
                var NotingCollabDiv = $('<div class="TagsBoxx"><span id="TagName" class="text">No Tags here</span></div>');
                $(destination + " .task-classification .boxx #tag-container").append(NotingCollabDiv);
                $(destination + " .task-classification #boxLoading #boxLoadingMessage").hide();
                $(destination + " .task-classification #tag-container").show();
            }
        },
        error: function () {
            var NotingCollabDiv = $('<div class="TagsBoxx"><span id="TagName" class="text">No Tags here</span></div>');
            $(destination + " .task-classification .boxx #tag-container").append(NotingCollabDiv);
            $(destination + " .task-classification #boxLoading #boxLoadingMessage").hide();
            $(destination + " .task-classification #tag-container").show();
        }
    });

}

////Delete Task Collaborators
//function deleteTagsNew(p_tags, destination) {
//    $.ajax({
//        type: "GET",
//        url: "/CRM/DeleteTag",
//        contentType: "application/json; charset=utf-8",
//        datatype: "json",
//        data: { p_tags: p_tags },
//        success: function (data) {
//            if (data == "") {
//                window.location.href = "/Home/LogOut";
//                return true;
//            }
//            if (data.statusCode == 500) {
//                window.location.href = "/Home/Error";
//            }
//            else {
//                ShowMsg("Tag deleted Successfully", "success");
//                ShowTagsNew(destination);
//            }
//        },
//        error: function () {
//            ShowMsg("Something went wrong,Please try again later.", "error");
//        }
//    });
//}

////Add new Task Tag
//function SubmitTagsNew(destination) {
//    var callid = $(destination + " #callid").text();
//    var selectedTag = $(destination + " #ddlTags").val();
//    if (selectedTag != 0) {
//        $.ajax({
//            type: "POST",
//            url: "/CRM/AjaxAddCallTags",
//            data: { Callid: callid, p_infotable: selectedTag },
//            success: function (data) {
//                if (data.statusCode == 500) {
//                    window.location.href = "/Home/Error";
//                }

//                if (data == "Already Added") {
//                    ShowMsg("This tag is already added", "info");
//                    return true;
//                }
//                else if (data == "true") {
//                    ShowMsg("Tag has been added Successfully.", "success");
//                    closeTag(destination);
//                    ShowTagsNew(destination);
//                }
//                else {
//                    ShowMsg("An error occured while storing your Information .Please try again later.", "error");
//                }
//            },
//            error: function () {
//                ShowMsg("An error occured while storing your Information .Please try again later.", "error");
//            }
//        });
//    }

//}

////Show Controls to Add new Call Tag
//function AddTagsNew(destination) {
//    $(destination + " .task-classification #PlusTag").hide();
//    $(destination + " .task-classification #ddlTags").show();
//    $(destination + " .task-classification #closeTag").show();
//}

////Close Controls of Add new Call Tag
//function closeTag(destination) {
//    $(destination + " .task-classification #PlusTag").show();
//    $(destination + " .task-classification #ddlTags").val(0);
//    $(destination + " .task-classification #ddlTags").hide();
//    $(destination + " .task-classification #closeTag").hide();
//}

//Show Messages
//function ShowMsg(msg) {
//    $(".RemarkMessage #Content").text(msg);
//    $('.RemarkMessage').show();
//    setTimeout(function () { $('.RemarkMessage').hide(); }, 7000);

//}


//Show Messages
function ShowMsg(msg, msgType) {
    var bgColor = "";
    switch ($.trim(msgType).toLowerCase()) {
        case "success":
            bgColor = "#4abc4a";
            break;

        case "info":
            bgColor = "#53bcf1";
            break;

        case "warning":
            bgColor = "#d0b62d";
            break;

        case "error":
            bgColor = "#e82121";
            break;

        default:
            bgColor = "#53bcf1";
    }

    $(".RemarkMessage").css("background-color", bgColor);
    $(".RemarkMessage #Content").text(msg);
    $('.RemarkMessage').show();
    setTimeout(function () { $('.RemarkMessage').hide(); }, 7000);

}

//Set Main-Task Values to the DetailPane
function SetDetailPane($row, destination) {
    var $id = $row[0].id;
    var $Key = $.trim($id.substring($id.indexOf("-") + 1));
    var $callid = $row.find(".callid").text();
    var $firmname = $row.find(".firmname").text();
    var $p_customer = $row.find(".firmname").attr("data-p_customers");
    var $contactperson = $row.find(".contactperson").text();
    var $mobno = $row.find(".mobno").text();
    var $email = $row.find(".emailId").text();
    var $location = $row.find(".location").text();
    var $issuetype = $row.find(".issuetype").text();
    var $ddlIssueType = $row.find(".issuetype").attr("data-issuetype");
    var $description = $row.find(".issuedescription").text();
    var $registerdate = $row.find(".callregdate").text();
    var $callstatus = $row.find(".callstatus").text();
    var $ddlCallStatus = $row.find(".callstatus").attr("data-callstatus");
    var $assignedto = $row.find(".assignedto").text();
    var $ddlassignedto = $row.find(".assignedto").attr("data-assignedto");
    var $priorityOrder = $row.find(".priorityOrder").text();


    $(destination + "   #callid").text($callid);
    $(destination + "   #callkey").text($Key);
    $(destination + "   #firmtitle").text($firmname);
    $(destination + "   #P_Cust").val($p_customer);
    $(destination + "   #txtfirmtitle").val($firmname);
    $(destination + "   #contactPerson").text($contactperson);
    $(destination + "   #txtcontactPerson").val($contactperson);
    $(destination + "   #mobno").text($mobno);
    $(destination + "   #location").text($location);
    $(destination + "   #txtmobno").val($mobno);
    $(destination + "   #txtemail").val($email);
    $(destination + "   #txtlocation").val($location);
    $(destination + "   #issuetitle").text($issuetype);
    $(destination + "   #ddlIssueType").val($ddlIssueType);
    $(destination + "   #issuedescription").text($description);
    $(destination + "   #txtissuedescription").text($description);
    $(destination + "   #registerdate").text($registerdate);
    $(destination + "   #callstatus").text($callstatus);
    $(destination + "   #ddlCallStatus").val($ddlCallStatus);
    $(destination + "   #assignedto").text($assignedto);
    $(destination + "   #ddlAssignedto").val($ddlassignedto);
    $(destination + "   #priorityOrder").text($priorityOrder);
    $(destination + "   #txtpriorityOrder").val($priorityOrder);

    $(destination + " .ShareBox input[type='text']").val("");
    $(destination + " .ShareBox").hide();

    $(".RemarkMessage #Content").text("");
    $('.RemarkMessage').hide();

    $("#taskeditTab #allActivity").empty();
    $('.tabs-navWeb a:first').trigger('click'); // Default

    CancleEditCall(destination);
    LoadRemarks($callid, destination);
    ShowCollaboratorsNew(destination);
    ShowTagsNew(destination);
    LoadCallLogs($callid, destination);
}


//Advance filter
function SubmitFilterSort(search, order, pSize, searchMsg) {
    $('#FilterModel').modal('hide');
    chkvalesArr = [];
    $("#example div").remove();
    $("#example").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $.ajax({
        url: '/CRM/AjaxAllRegCallsData',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search, order: order },
        success: function (data) {
            $(".filterclose").show();
            if ($.trim(searchMsg) != "") {
                $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p>");
                $(".resultDiv").show();
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        },
        error: function (data) {
            alert("Failed");
        }
    });

}

function chkCheckUncheck(ctrl) {
    if (ctrl.checked) {
        var index = chkvalesArr.indexOf($(ctrl).val());
        if (index == -1) {
            chkvalesArr.push($(ctrl).val());
        }
        $(ctrl).parents(".maindiv").addClass("rowChecked");
        $(ctrl).parents(".maindiv").find(".MoreDetails").addClass("rowChecked");

    }
    else {
        var index = chkvalesArr.indexOf($(ctrl).val());
        if (index > -1) {
            chkvalesArr.splice(index, 1);
        }
        $(ctrl).parents(".maindiv").removeClass("rowChecked");
        $(ctrl).parents(".maindiv").find(".MoreDetails").removeClass("rowChecked");
    }
}

function Allselection() {
    if (!selectAll) {
        selectAll = true;
        $("#subDiv #subDivLable").text("Clear selections");
    }
    else {
        selectAll = false;
        $("#selectall").prop('checked', false);
        $('.checkboxall').each(function () {
            $(".checkboxall").prop('checked', false);
        })
        chkvalesArr = [];
        $("#subDiv").hide();
    }

}


$(document).ready(function () {
    //$('#Tags').selectpicker();
    //$('#Tags').multiselect();

    //sessionStorage.clear();
    //filter list filling logic
    //var d = $("#type2").val();
    var d = $("#fvalue").val();
    var m = [];
    m = d.split("|");
    var l;
    for (i = 0; i <= m.length - 1; i = i + 1) {
        l = m[i].split("~");
        $('#filter').append($('<option>', { value: l[1] + ":" + l[2], text: l[0] }));
    };
    var a = 1;

    $("#filter").on("change", function () {
        var a = $("#filter").val();
        $(".filterDiv").css("display", "none")
        if (a != "0" && a != "1") {
            b = a.split(":");
            if (b[0] == 2) {
                var a = document.getElementById("dateC")
                a.style.display = "";
            } else if (b[0] == 3 || b[0] == 5 || b[0] == 9) {
                $("#TextC").css("display", "");
            } else if (b[0] == 6) {
                var a = document.getElementById("IssueC")
                a.style.display = "";
            }
            else if (b[0] == 4) {
                var a = document.getElementById("DealerC")
                a.style.display = "";
            }
            else if (b[0] == 7) {
                var a = document.getElementById("assigntoC")
                a.style.display = "";
            }
            else if (b[0] == 8) {
                $("#TextC").css("display", "");
            }
            //Added by aslam
            else if (b[0] == 10) {
                $("#datetimeC").css("display", "");
            }
            else if (b[0] == 11) {
                var a = document.getElementById("sourceC")
                a.style.display = "";
            }
            else if (b[0] == 12) {
                var a = document.getElementById("tagsC")
                a.style.display = "";
            }
        }
    });

    setBasicFilterUIOnPageReload();


    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem(regPageSizeKey);
    if (t == null) { t = 50 }
    var SelectedRows = "";
    //GetEmployeeData(a, 0, t);
    //sessionStorage.setItem("search", null);
    //2) get viewSetting data for current user 
    //getViewSettingData();
    infoString = $("#infostring").val();
    //setMyCallsSearch();
    setInterval(ReloadGrid(), 15 * 60 * 1000);//setting Interval of 15 minutes by which every 15 minutes grid is getting refresh.

    var counter = 0;
    $("#Prev").on("click", function () {
        var a = sessionStorage.getItem(regPageSizeKey);
        //var b = sessionStorage.getItem("search");
        var b = sessionStorage.getItem(searchKey);
        if (b == "null") {
            b = "";
        }
        var d = sessionStorage.getItem("start");
        //var o = sessionStorage.getItem("order");
        var o = sessionStorage.getItem(orderKey);
        var total = sessionStorage.getItem("Total");
        //if (o != undefined && o != "null") {
        //    order = o.split(":");
        //    var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
        //    ordervalue = $(orderid).text();
        //    o = order[1] + "~" + ordervalue + "~" + order[2];
        //    JSON.stringify(o);
        //}
        if (a != null) { d = (d - a) - 1; } else { d = (d - 40) - 1; }
        $("#example div").remove();
        $("#example").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d >= 0) {
            $.post('/CRM/AjaxAllRegCallsData', { start: d, pSize: a, search: b, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });
    $("#Next").on("click", function () {
        var total = sessionStorage.getItem("Total");
        var a = sessionStorage.getItem(regPageSizeKey);
        //var c = sessionStorage.getItem("search");
        var c = sessionStorage.getItem(searchKey);
        if (c == "null") {
            c = "";
        }
        var d = sessionStorage.getItem("start");

        //var o = sessionStorage.getItem("order");
        var o = sessionStorage.getItem(orderKey);
        //if (o != undefined && o != "null") {
        //    order = o.split(":");
        //    var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
        //    ordervalue = $(orderid).text();
        //    o = order[1] + "~" + ordervalue + "~" + order[2];
        //    JSON.stringify(o);
        //}
        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 40 - 1; }
        $("#example div").remove();
        $("#example").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/CRM/AjaxAllRegCallsData', { start: d, pSize: a, search: c, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });

    $("#IssueFilter").on("change", function () {
        var text = $("#IssueFilter option:selected").text();
        var value = $("#IssueFilter").val();
        var col = "m1.Issuetype";
        var search = value + "," + col + ":integer";
        $(".filterclose").show();
        JSON.stringify(search);
        //sessionStorage.setItem("search", search);
        var searchMsg = "Search Results: Issue <span class='' style='font-weight: 600'>'" + text + "'</span>";
        //sessionStorage.setItem("search", search);
        var basicFilterStr = $("#filter").val() + "~#IssueFilter:" + value;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem(regPageSizeKey);
        $("#example div").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/CRM/AjaxAllRegCallsData',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $("#fText").text(text);
                    //$("#FilterText").show();
                    //$(".filterDiv").css("display", "none")
                    $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p> ");
                    $(".resultDiv").show();
                    sessionStorage.setItem("Total", data.recordsTotal);
                    loadData(data);
                }
            },
            error: function (data) {
                alert("Failed");
            }
        });
    });

    $("#assignto").on("change", function () {
        var text = $("#assignto option:selected").text();
        var value = $("#assignto").val();
        var col = "m2.assignedto";
        var search = value + "," + col + ":integer";
        $(".filterclose").show();
        JSON.stringify(search);
        //sessionStorage.setItem("search", search);
        var searchMsg = "Search Results: Call AssignedTo <span class='' style='font-weight: 600'>'" + text + "'</span>";
        var basicFilterStr = $("#filter").val() + "~#assignto:" + value;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem(regPageSizeKey);
        $("#example div").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/CRM/AjaxAllRegCallsData',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $("#fText").text(text);
                    //$("#FilterText").show();
                    //$(".filterDiv").css("display", "none")
                    $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p> ");
                    $(".resultDiv").show();
                    sessionStorage.setItem("Total", data.recordsTotal);
                    loadData(data);
                }
            },
            error: function (data) {
                alert("Failed");
            }
        });
    });

    $("#source").on("change", function () {
        var text = $("#source option:selected").text();
        var value = $("#source").val();
        var col = "m1.lastcalltype";
        var search = value + "," + col + ":integer";
        $(".filterclose").show();
        JSON.stringify(search);
        //sessionStorage.setItem("search", search);
        var searchMsg = "Search Results: Call Source <span class='' style='font-weight: 600'>'" + text + "'</span>";
        var basicFilterStr = $("#filter").val() + "~#source:" + value;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem(regPageSizeKey);
        $("#example div").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/CRM/AjaxAllRegCallsData',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $("#fText").text(text);
                    //$("#FilterText").show();
                    //$(".filterDiv").css("display", "none")
                    $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p> ");
                    $(".resultDiv").show();
                    sessionStorage.setItem("Total", data.recordsTotal);
                    loadData(data);
                }
            },
            error: function (data) {
                alert("Failed");
            }
        });
    });


    $('#ddlmultiTags').on('changed.bs.select', function () {
        var value = $("#ddlmultiTags").val();
        if (value.length > 0) {
            $("#btnAddMultiTags").attr("disabled", false)
        }
        else {
            $("#btnAddMultiTags").attr("disabled", true)
        }

    });

    $('#Tags').on('changed.bs.select', function () {
        var value = $("#Tags").val();
        if (value.length > 0) {
            $("#btnTagSearch").show()
        }
        else {
            $("#btnTagSearch").hide()
        }

    });

    //for filtering on hometown
    //$("#HomeTownfilter").submit(function () {
    //    //$('#ModelHomeTownFilter').modal('toggle');
    //    $('#ModelHomeTownFilter .close').click()
    //    var m = document.getElementById("homeTown");
    //    if (m.value != 0 || m.value != "undefined") {
    //        var hometown = document.getElementsByName("searchString");
    //        var empName = hometown["0"].value;
    //        var col = "HomeTown";
    //        var search = m.value + "," + col + ":integer";
    //        JSON.stringify(search);
    //        var pSize = sessionStorage.getItem(regPageSizeKey);
    //        alert(search);
    //        $("tbody").empty();
    //        $("#loading").show();
    //        $('#loadingmessage').show();
    //        gf1 = "HomeTown";
    //        $.ajax({
    //            url: '/CRM/AjaxGetJsonDataSortManageRegCalls',
    //            type: "POST",
    //            data: { start: 0, pSize: pSize, search: search },
    //            success: function (data) {
    //                $("#fText").text(empName);
    //                $("#FilterText").show();
    //                sessionStorage.setItem("Total", data.recordsTotal);
    //                loadData(data);
    //            },
    //            error: function (data) {
    //                alert("Failed");
    //            }
    //        });
    //    }
    //    return false;
    //});

    // Function to fetch msg based on selected MsgTemplateId
    function onTemplateChange(value, id) {

        if (value != 0) {
            $.ajax({
                url: '/CRM/GetMessageTemplateText',
                type: "POST",
                data: { TempId: value },
                success: function (data) {
                    if (data != "") {
                        $("#T").val(data);
                    }
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }

                },
                error: function () {
                    //$('#CallClosedContent').html();
                    //$('#CallClosed').modal(options);
                    var Mtitle = "An error occured.Please try again later!"
                    ShowMsg(Mtitle, "error");
                    //$('#CallClosed .modal-title').text(Mtitle);
                    //$('#CallClosed').modal('show');
                }
            });

        }

    }
    function getViewSettingData() {
        $.post('/Configuration/GetViewSettingData', { InfoType: "hoverstripstring", ViewId: "manageregcalls" }, function (viewData) {
            //3) set Data to infoString (Global variable)
            infoString = viewData.Infostring;
        });
    }

    $(function () {

        //Added by Shweta
        $(".btn-ExportToExcel").click(function () {
            $(".LoaderOverlay").show();
            var $buttonClicked = $(this);

            $.ajax({
                //  type: "GET",
                url: "/CRM/ExportToExcel",
                //    contentType: "application/json; charset=utf-8",
                //    datatype: "json",
                //    data: {},
                success: function (data) {
                    //        ;
                    //      //  $('#MailCustomerContent').html(data);
                    //     //   $('#MailToCustomer').modal(options);
                    //        //    $('#MailToCustomer').modal('show');
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    else {
                        $(".LoaderOverlay").hide();
                    }
                },
                error: function () {
                    //        //$('#NoRow').modal(options);
                    //        //var Mtitle = "Select a Row";
                    //        //$('.modal-title').text(Mtitle);
                    //        //$('#NoRow').modal('show');
                    $(".LoaderOverlay").hide();
                }
            });
        });



        $("#AssignedtoForm").submit(function () {
            $('#Assignedto').modal('hide');

        });


        $("#closbtn").click(function () {
            ;
            $('#myModal').modal('hide');
        });
    });


    //$('#popover1').popover({
    //    html: true,
    //    trigger: 'manual',
    //    content: function () { return $('#popover_content_wrapper1').html(); }
    //});
    //$(document).on('click', '#popover1', function () {
    //    $(this).popover('toggle');
    //    $('#popover2').popover({
    //        html: true,
    //        trigger: 'manual',
    //        content: function () { return $('#popover_content_wrapper2').html(); }
    //    });
    //});
    //$(document).on('click', '#popover2', function () { $(this).popover('toggle'); });

    //$(document).on('click', '.MoreDetails', function () {
    //});



    $('a').tooltip();

});


function GetEmployeeData(pageNumber, start, PSize) {
    //var search = sessionStorage.getItem("search");
    //var order = sessionStorage.getItem("order");
    var search = sessionStorage.getItem(searchKey);
    var order = sessionStorage.getItem(orderKey);
    if (search == null || search == "") {
        $(".resultDiv .result-msg").html("");
        $(".resultDiv").hide();
    }
    else if (search != "" && sessionStorage.getItem(searchMsgKey) !== null) {
        $(".resultDiv .result-msg").html("<p>" + sessionStorage.getItem(searchMsgKey) + "</p>");
        $(".resultDiv").show();
    }
    chkvalesArr = [];
    $("#subDiv").hide();
    $("#example  div").remove();
    $("#example").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $.ajax({
        type: "POST",
        url: "/CRM/AjaxAllRegCallsData",
        data: { start: start, pSize: PSize, search: search, order: order },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });
}

function ReloadGrid() {
    $("#example  div").remove();
    //removeFilter();
    if ($(window).width() >= 600) {
        sessionStorage.setItem("start", 0);
        var t = sessionStorage.getItem(regPageSizeKey);
        if (t == null) { t = 50 }
        GetEmployeeData(1, 0, 50);
        $(".left").removeClass("move");
        $(".h").show();
        $(".right").css('display', 'none');
        $("#dropdown").removeClass("setStyle");
    }
    else {
        sessionStorage.setItem("start", 0);
        var t = sessionStorage.getItem(regPageSizeKey);
        if (t == null) { t = 50 }
        GetEmployeeData(1, 0, 50);
        // $(".reloadhide").hide();

    }

}

function CallTransferToLead(id) {
    var RowId = "#tr-" + id;
    var callid = $(RowId).find(".callid").text();
    //if ($(RowId).parent().hasClass("red")) {
    //    callid = $(RowId).children(1)[2].innerText;
    //} else {
    //    callid = $(RowId).children(1)[1].innerText;
    //}
    $.ajax({
        type: "POST",
        url: "/CRM/CallTransfer",
        data: { PCall: callid, calltype: "C" },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            else if (data.toLowerCase() == "notauthorized") {
                var Mtitle = "You have no right for this feature. Please contact to Admin."
                ShowMsg(Mtitle, "error");

                //$('#CallClosedContent').html('');
                //$('#CallClosed').modal(options);
                //$('#CallClosed .modal-title').text(Mtitle);
                //$('#CallClosed').modal("show");
                return false;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }

            var Mtitle = "Call is successfully transfered to CRMLead!"
            ShowMsg(Mtitle, "success");

            //$('#CallClosedContent').html('');
            //$('#CallClosed').modal(options);
            //$('#CallClosed .modal-title').text(Mtitle);
            //$('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
            //$('#CallClosed').modal("show");
            var MainDivid = "#MainDiv-" + id
            $(MainDivid).remove();

            //setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "An Error Occured! Please try Again";
            ShowMsg(Mtitle, "error");

            //$('#NoRow .modal-title').text(Mtitle);
            //$('#NoRow .modal-title').css('text-align', 'center');
            //$('#NoRow').modal('show');
        }
    });

}


function tagSearch() {
    var text = $("#Tags option:selected").map(function () { return $(this).text(); }).get().join(",");
    var value = $("#Tags").val();
    var col = "m3.tagkey";
    var search = value + "," + col + ":integer";
    $(".filterclose").show();
    JSON.stringify(search);
    var searchMsg = "Search Results: Tags <span class='' style='font-weight: 600'>'" + text + "'</span>";
    //sessionStorage.setItem("search", search);
    var basicFilterStr = $("#filter").val() + "~#Tags:" + value;
    setSearchSessionStorage(search);
    setSearchMsgSessionStorage(searchMsg);
    setBasicFilterStrSessionStorage(basicFilterStr);
    var pSize = sessionStorage.getItem(regPageSizeKey);
    $("#example div").remove();
    $("#example").height(0);
    $("#loading").show();
    $('#loadingmessage').show();

    $.ajax({
        url: '/CRM/AjaxAllRegCallsData',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p> ")
                $(".resultDiv").show();
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        },
        error: function (data) {
            alert("Failed");
        }
    });
}


function removeFilter() {
    //$(".filterDiv").css("display", "none")
    //$("#P_dealers").val(0);
    //$("#IssueFilter").val(0);
    //$("#assignto").val(0);
    //$("#filter").val(0);
    //$("#filterText").val("");
    //$("#min").val("");
    //$("#max").val("");
    ////Added by aslam for datetimefilter
    //$("#minDT").val("");
    //$("#maxDT").val("");

    //$(".filterclose").hide();

    ////sessionStorage.setItem("search", "");
    ////sessionStorage.setItem("order", "");
    //setSearchSessionStorage("");
    //setOrderSessionStorage("");

    //$(".resultDiv .result-msg").html("");
    //$(".resultDiv").hide();
    removeBasicAdvanceFilter();
   // setMyCallsSearch();
    ReloadGrid()
}

function DateTimeSearch() {
    value1 = $("#datetimeC #minDT").val();
    value2 = $("#datetimeC #maxDT").val();
    col = "m1.registerdate";

    var dtv1 = value1.replace("T", " ");
    dtv1 = dtv1.replace(/:/g, "_");

    var dtv2 = value2.replace("T", " ");
    dtv2 = dtv2.replace(/:/g, "_");

    search = dtv1 + "," + dtv2 + "," + col + ":Datetime";
    $(".filterclose").show();
    JSON.stringify(search);
    //sessionStorage.setItem("search", search);
    var searchMsg = "Search Results: DateTime From <span class='' style='font-weight: 600'>'" + value1 + "'</span> To <span class='' style='font-weight: 600'>'" + value2 + "'</span>";
    var basicFilterStr = $("#filter").val() + "~#datetimeC #minDT:" + value1 + "|#datetimeC #maxDT:" + value2;
    setSearchSessionStorage(search);
    setSearchMsgSessionStorage(searchMsg);
    setBasicFilterStrSessionStorage(basicFilterStr);
    var pSize = sessionStorage.getItem(regPageSizeKey);
    $("#example div").remove();
    $("#example").height(0);
    $("#loading").show();
    $('#loadingmessage').show();

    $.ajax({
        url: '/CRM/AjaxAllRegCallsData',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search },
        success: function (data) {
            // $("#fText").text(value);
            // $("#FilterText").show();
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                $(".resultDiv  .result-msg").html("<p>" + searchMsg + "</p>");
                $(".resultDiv").show();
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        },
        error: function (data) {
            alert("Failed");
        }
    });
}

//Changed by aslam
function DoSearch() {
    var ValueToSearch = $("#filterText").val().trim();
    var filterSelected = $("#filter").val();
    var filter = filterSelected.split(":")
    var col = ""
    var search = ""
    var searchMsg = "";
    //(#filter).val()~ActualFilterId:value
    var basicFilterStr = "";
    if ($("#filterText").val() != "" || $("#filterText").val() != "undefined") {
        if (filter[0] == 3) {
            value = $("#filterText").val();
            col = "m1.Firmname";
            search = ValueToSearch + "," + col + ":String";
            searchMsg = "Search Results: Firm Name <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        if (filter[0] == 6) {
            value = $("#filterText").val();
            col = "m1.Location";
            search = ValueToSearch + "," + col + ":String";
            searchMsg = "Search Results: Location <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        if (filter[0] == 8) {
            value = $("#filterText").val();
            col = "m1.P_AllCallsReg";
            search = ValueToSearch + "," + col + ":Integer";
            searchMsg = "Search Results: CallId <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        if (filter[0] == 9) {
            value = $("#filterText").val();
            col = "m1.Mobileno";
            search = ValueToSearch + "," + col + ":String";
            searchMsg = "Search Results: Mobile Number <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        $(".filterclose").show();
        JSON.stringify(search);
        //sessionStorage.setItem("search", search);
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem(regPageSizeKey);
        $("#example div").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/CRM/AjaxAllRegCallsData',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                //$(".filterDiv").css("display", "none")
                //$("#fText").text(ValueToSearch);
                //$("#FilterText").show();
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p>");
                    $(".resultDiv").show();
                    sessionStorage.setItem("Total", data.recordsTotal);
                    loadData(data);
                }
            },
            error: function (data) {
                alert("Failed");
            }
        });
    }
    return false;
}

function DateSearch() {

    value1 = $("#dateC #min").val();
    value2 = $("#dateC #max").val();
    col = "m1.registerdate";
    search = value1 + "," + value2 + "," + col + ":Date";
    $(".filterclose").show();
    JSON.stringify(search);
    //sessionStorage.setItem("search", search);
    var searchMsg = "Search Results: Date From <span class='' style='font-weight: 600'>'" + value1 + "'</span> To <span class='' style='font-weight: 600'>'" + value2 + "'</span>";
    var basicFilterStr = $("#filter").val() + "~#dateC #min:" + value1 + "|#dateC #max:" + value2;
    setSearchSessionStorage(search);
    setSearchMsgSessionStorage(searchMsg);
    setBasicFilterStrSessionStorage(basicFilterStr);
    var pSize = sessionStorage.getItem(regPageSizeKey);
    $("#example div").remove();
    $("#example").height(0);
    $("#loading").show();
    $('#loadingmessage').show();

    $.ajax({
        url: '/CRM/AjaxAllRegCallsData',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search },
        success: function (data) {
            // $("#fText").text(value);
            // $("#FilterText").show();
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                $(".resultDiv  .result-msg").html("<p>" + searchMsg + "</p>");
                $(".resultDiv").show();
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        },
        error: function (data) {
            alert("Failed");
        }
    });


}

function hoverId(ctrl) {
    // $(ctrl).find('.MoreDetails').show()
    if (popOverOpen == true) {
        $(".MoreDetails").not(CurrentHoverRowId).hide;
    } else {
        $(ctrl).find('.MoreDetails').show();
        $(ctrl).find('.MoreDetails').css("display", "inline-flex");
    }
}

function hoverNot(ctrl) {
    $('.MoreDetails').hide();
    if (popOverOpen == true) {
        $(CurrentHoverRowId).find('.MoreDetails').show();
    }
}

function ShowCollaboratorCtrls(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    CurrentHoverRowId = Rowid;
    $(".ShowCollaboratorCtrls").popover('toggle');
    $(".ShowCollaboratorCtrlsDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })

    // Popover Grid
    $('.ShowCollaboratorCtrls').not(ctrl).popover('hide');
    $('.popover.fade.right.in').css('width', '180px');
    $('.popover.fade.right.in').css('left', '30px');
    $('.popover.fade.right.in').css('top', '40px');
    $('.popover.fade.right.in').css('max-width', 'none');
    $('.bottom').css('left', '-92px');
    $('.arrow').css('top', '-11px');
    $('.arrow').css('left', '61%');
    $('.popover-content').css('width', '167px');
    $('.popover-content').css('padding-right', '0px');
    $('.popover-content').css('padding-top', '3px');
    $('.popover-content').css('padding-left', '5px');
    $('.popover-content').css('padding-bottom', '0 !important');

    event.preventDefault();
}

function ContactCustomerCtrls(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    CurrentHoverRowId = Rowid;
    $(".ContactCustomerCtrls").popover('toggle');
    $(".ContactCustomerCtrlsDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })

    // Popover Grid
    $('.ContactCustomerCtrls').not(ctrl).popover('hide');
    $('.popover.fade.right.in').css('width', '190px');
    $('.popover.fade.right.in').css('left', '30px');
    $('.popover.fade.right.in').css('top', '40px');
    $('.popover.fade.right.in').css('max-width', 'none');
    $('.arrow').css('top', '-11px');
    $('.popover-content').css('width', '209px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-top', '3px');



    event.preventDefault();

}
function MarkDuplicateCtrls(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    CurrentHoverRowId = Rowid;
    $(".MarkDuplicateCtrls").popover('toggle');
    $(".MarkDuplicateCtrlsDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })

    // Popover Grid
    $('.MarkDuplicateCtrls').not(ctrl).popover('hide');
    $('.popover.fade.right.in').css('width', '157px');
    $('.popover.fade.right.in').css('left', '-70px');
    $('.popover.fade.right.in').css('top', '40px');
    $('.popover.fade.right.in').css('max-width', 'none');
    $('.bottom').css('top', '25px')
    $('.bottom').css('left', '-60px')
    $('.arrow').css('top', '-11px');
    $('.arrow').css('left', '45%');
    $('.popover-content').css('width', '157px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-left', '5px');
    $('.popover-content').css('padding-top', '3px');
    $('.popover-content').css('height', '55px');




    event.preventDefault();

}

// function to close button on popover
function popoverClose() {
    popOverOpen = false
    $('.popover').hide();
    $('.MoreDetails').popover('hide');
    $("#ShowSubTaskControlDiv").popover('hide');
    $(".ShowRemark").popover('hide');
}

function AddCollaborator(ctrl) {
    var id = $(ctrl).parent().parent().parent().parent()[0].id;
    popOverOpen = false
    var Rowid = "#tr-" + id;
    var TaskPid = $(Rowid).find(".callid").text();
    //if ($(Rowid).parent().hasClass("red")) {
    //    TaskPid = $(Rowid).children(1)[2].innerText;
    //} else {
    //    TaskPid = $(Rowid).children(1)[1].innerText;
    //}

    $('#CallCollaborators #PCall').val(TaskPid);

    $('#CallCollaborators').modal(options);
    $('#CallCollaborators').modal('show');

}
//$('["data-toggle"]').data - toggle();

function ShowLinkCustomerModal(CallId, Mobileno) {
    $("#LinkCustomerCallId").val(CallId);

    $('#LinkCustomer').modal(options);
    $('#LinkCustomer').modal('show');
    //Added by aslam
    $("#linkCustomerForm").show();
    $("#AddAndLinkCustomerForm").hide();
    $("#AddAndLinkCustomerForm #MobNo").val(Mobileno);

}
function CallClose(id) {
    popOverOpen = false
    var RowId = "#tr-" + id
    var CustName = $(RowId).find(".firmname").text();
    var CallId = $(RowId).find(".callid").text();
    //if ($(RowId).parent().hasClass("red")) {
    //    CustName = $(RowId).children(1)[4].innerText;
    //    CallId = $(RowId).children(1)[2].innerText;
    //} else {
    //    CustName = $(RowId).children(1)[3].innerText;
    //    CallId = $(RowId).children(1)[1].innerText;
    //}
    var hasRemarkid = "#HasRemark-" + id
    var hasRemarkValue = $(hasRemarkid).val();
    if (hasRemarkValue === "Y") {
        $.ajax({
            type: "GET",
            url: "/CRM/CallClosed",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: { Pid: CallId },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }

                var Mtitle
                //$('#CallClosedContent').html();
                //$('#CallClosed').modal(options);
                //$('#CallClosed').modal('show');

                if (data == "NoRemarkAfterLastCall") {
                    Mtitle = "There is no remark after Last Call.Please add remark to close call :" + "  " + CustName;
                    ShowMsg(Mtitle, "info");
                    //$('#CallClosed .modal-title').text(Mtitle);
                } else if (data == "CustomerNotLink") {
                    Mtitle = "Call is not linked to customer, please link customer , then close the call."
                    ShowMsg(Mtitle, "info");
                    //$('#CallClosed .modal-title').text(Mtitle);
                } else if (data == "CallNotAssigned") {
                    Mtitle = "Call is not Assigned, please Assign call , then close the call."
                    ShowMsg(Mtitle, "info");
                    //$('#CallClosed .modal-title').text(Mtitle);
                } else if (data == "CallNotAssignedtoLoggedInEmployee") {
                    Mtitle = "Call can only be closed by whomever it is assigned!"
                    ShowMsg(Mtitle, "error");
                    //$('#CallClosed .modal-title').text(Mtitle);
                } else {
                    Mtitle = "Call Closed Successfully :" + "  " + CustName;
                    ShowMsg(Mtitle, "success");
                    //$('#CallClosed .modal-title').text(Mtitle);
                    var MainDivid = "#MainDiv-" + id
                    $(MainDivid).remove();
                    //setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);
                }
            },
            error: function (data) {
                //Changed Shweta
                //alert("An error occured.Please try again later.");
                //$('#CallClosedContent').html();
                //$('#CallClosed').modal(options);
                var Mtitle = "Call is not linked to customer, please link customer , then close the call."
                ShowMsg(Mtitle, "info");
                //$('#CallClosed .modal-title').text(Mtitle);
                //$('#CallClosed').modal('show');
                //alert("An error occured.Please try again later.");
            }
        });
    } else {
        //$('#CallClosedContent').html();
        //$('#CallClosed').modal(options);
        var Mtitle = "Please add Remark to close Call!"
        ShowMsg(Mtitle, "error");
        //$('#CallClosed .modal-title').text(Mtitle);
        //$('#CallClosed').modal('show');
    }

}
function OnsiteVisit(id) {
    popOverOpen = false;
    var onsite = "#Onsite-" + id;
    var OnsiteCount = $(onsite).val();
    var Rowid = "#tr-" + id;
    var Callid = $(Rowid).find(".callid").text();

    //if ($(Rowid).parent().hasClass("red")) {
    //    Callid = $(Rowid).children(1)[2].innerText;
    //} else {
    //    Callid = $(Rowid).children(1)[1].innerText;
    //}
    $("#Onsitevisit").text("Current Onsite Visits: " + OnsiteCount);
    $("#PCall1").val(Callid);
    $("#CalledFrom").val("ManageAllRegCalls");
    $('#OnsiteModal').modal(options);
    $('#OnsiteModal').modal('show');

}
function CallAssignTo(Callid) {
    popOverOpen = false
    $("#PCall").val(Callid);
    $('#Assignedto').modal(options);
    $('#Assignedto').modal('show');

}

function MsgToCustomer(ctrl) {
    var id = $(ctrl).parent().parent().parent().parent()[0].id;
    popOverOpen = false;
    var RowId = "#tr-" + id
    var CustName = $(RowId).find(".firmname").text();
    var PCall = $(RowId).find(".callid").text();
    var phone = $(RowId).find(".mobno").text();
    //if ($(RowId).parent().hasClass("red")) {
    //    CustName = $(RowId).children(1)[4].innerText;
    //    PCall = $(RowId).children(1)[2].innerText;
    //    phone = $(RowId).children(1)[6].innerText;
    //} else {
    //    CustName = $(RowId).children(1)[3].innerText;
    //    PCall = $(RowId).children(1)[1].innerText;
    //    phone = $(RowId).children(1)[5].innerText;
    //}
    $("#PCallMsgToCustomer").val(PCall);
    $("#Mobileno").val(phone);
    $("#firmNameMsgtoCustomer").val(CustName);
    $('#MsgCustomer').modal(options);
    var Mtitle = "Message to Customer: " + CustName;
    $('#MsgCustomer .modal-title').text(Mtitle);
    $('#MsgCustomer').modal('show');

}
function MailToCustomer(ctrl) {
    var id = $(ctrl).parent().parent().parent().parent()[0].id;
    popOverOpen = false;
    var RowId = "#tr-" + id
    var CustName = $(RowId).find(".firmname").text();
    var PCall = $(RowId).find(".callid").text();

    //if ($(RowId).parent().hasClass("red")) {
    //    CustName = $(RowId).children(1)[4].innerText;
    //    PCall = $(RowId).children(1)[2].innerText;
    //} else {
    //    CustName = $(RowId).children(1)[3].innerText;
    //    PCall = $(RowId).children(1)[1].innerText;
    //}

    $("#PCallMailToCustomer").val(PCall);
    $("#firmNameMailtoCustomer").val(CustName);

    $('#MailToCustomer').modal(options);
    var Mtitle = "Mail To Customer: " + CustName;
    ShowMsg(Mtitle, "success");

    //$('#CallClosed .modal-title').text(Mtitle);
    //$('#MailToCustomer').modal('show');

}

function AddRemark(id) {
    popOverOpen = false
    $('#Remarktextarea').val('');
    var Rowid = "#tr-" + id;
    var Callid = $(Rowid).find(".callid").text();
    var firmname = $(Rowid).find(".firmname").text();

    //if ($(Rowid).parent().hasClass("red")) {
    //    Callid = $(Rowid).children(1)[2].innerText;
    //    firmname = $(Rowid).children(1)[4].innerText;
    //} else {
    //    Callid = $(Rowid).children(1)[1].innerText;
    //    firmname = $(Rowid).children(1)[3].innerText;
    //}
    $('#issueId').val(Callid);
    $('#Remark').modal(options);
    var Mtitle = "Firm Name :  " + firmname;
    $('#Remark .modal-title').text(Mtitle);
    $('#Remark').modal('show');
}

function engageStatus(id) {
    popOverOpen = false
    var Rowid = "#tr-" + id;
    var Callid = $(Rowid).find(".callid").text();
    var firmname = $(Rowid).find(".firmname").text();

    //if ($(Rowid).parent().hasClass("red")) {
    //    Callid = $(Rowid).children(1)[2].innerText;
    //    firmname = $(Rowid).children(1)[4].innerText;
    //} else {
    //    Callid = $(Rowid).children(1)[1].innerText;
    //    firmname = $(Rowid).children(1)[3].innerText;
    //}
    $('#callId').val(Callid);
    $('#EngageStatus').modal(options);
    var Mtitle = "Firm Name :  " + firmname;
    $('#EngageStatus .modal-title').text(Mtitle);
    $('#EngageStatus').modal('show');
}
//Function to show the controls of collaborator in popover
function DeferCallctrls(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    CurrentHoverRowId = Rowid;
    $(".ShowDefferCallCtrls").popover('toggle');
    $(".ShowDefferCallControlDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })
    // Popover Grid
    $('.ShowDefferCallCtrls').not(ctrl).popover('hide');
    $('.popover.fade.right.in').css('width', '280px');
    $('.popover.fade.right.in').css('height', '60px');
    $('.popover.fade.right.in').css('left', '-20px');
    $('.arrow').css('right', '-11px');
    $('.arrow').css('left', '130px');
    $('.popover-content').css('width', '245px');
    $('.popover-content').css('height', '68px');
    //$('.popover-content').css('margin-top', '10px');
    $('.popover-content').css('padding-top', '3px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-left', '9px');

    event.preventDefault();
}

function CallEngagectrls(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var Callid = $(Rowid).find(".callid").text();

    //if ($(Rowid).parent().hasClass("red")) {
    //    Callid = $(Rowid).children(1)[2].innerText;
    //} else {
    //    Callid = $(Rowid).children(1)[1].innerText;
    //}
    $('#callId').val(Callid);
    CurrentHoverRowId = Rowid;
    $(".ShowCallEngageCtrls").popover('toggle');
    $(".CallEngagaeControlDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })
    var selectid = "#callstatusInput-" + id;
    $(selectid).empty();
    $.ajax({
        type: "POST",
        url: "/CRM/CallEngageStatusList",
        data: { key: id },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }

            var select = $(Rowid).find(".callstatusInput");
            // $("#callstatusInput").append('<option value=0>Select Engage Status</option');
            $(select[0]).append('<option value=0>Select Engage Status</option');
            var a = 1;
            $.each(data.data, function (index, item) {
                $(select[0]).append('<option value=' + item.P_infotable + '>' + item.NameOfInfo + '</option>');
            });

            if (data.recordsTotal == 0) {
                $(".popover-content #LoadingData").css('display', 'block');
                $(".popover-content #LoadingData").text('No Data');
            } else {
                $(".popover-content #LoadingData").css('display', 'none');
                $(".popover-content #LoadingData").text('');
            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });
    // Popover Grid
    $('.ShowCallEngageCtrls').not(ctrl).popover('hide');
    $('.popover.fade.right.in').css('width', '280px');
    $('.popover.fade.right.in').css('height', '60px');
    $('.popover.fade.right.in').css('left', '-20px');
    $('.arrow').css('right', '-11px');
    $('.arrow').css('left', '85px');
    $('.popover-content').css('width', '165px');
    $('.popover-content').css('height', '68px');
    $('.popover-content').css('padding-top', '3px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-left', '9px');

    event.preventDefault();
}

function SubmitCallRemark(ctrl) {
    var remark = ""
    var Callid = '';
    var file;
    if (ctrl.id == "SubmitRemarkBtn") {
        remark = $("#Remarktextarea").val();
        var Callid = $('#issueId').val();
        file = $("#modalremarkfile")[0].files[0];
        $("#Remarktextarea").val("");
        $("#modalremarkfile").val("");
        $('#Remark').modal("hide");

    } else {
        var id = $(ctrl).parent().parent().parent().parent().parent()[0].id;
        var Rowid = "#tr-" + id;
        //if ($(Rowid).parent().hasClass("red")) {
        //    Callid = $(Rowid).children(1)[2].innerText;
        //} else {
        //    Callid = $(Rowid).children(1)[1].innerText;
        //}
        Callid = $(Rowid).find(".callid").text();
        var select = $(Rowid).find(".AddRemarkInput");
        remark = $(select[0]).val();
        var fileCtrl = $(Rowid).find("#popoverremarkfile");
        file = $(fileCtrl)[0].files[0];
        popoverClose()
    }
    if (remark != "" || typeof file !== "undefined") {
        var formdata = new FormData();
        formdata.append('remark', remark);
        formdata.append('CallId', Callid);
        formdata.append('file1', file);

        $.ajax({
            type: "POST",
            url: "/CRM/AddCallRemark",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data == "LogOut") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }

                var Mtitle = "Progress Note added Successfully.";
                ShowMsg(Mtitle, "success");
                //$('#CallClosedContent').html('');
                //$('#CallClosed').modal(options);
                //$('#CallClosed .modal-title').text(Mtitle);
                // $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
                //$('#CallClosed').modal("show");
                $(ctrl).removeClass("disabledbutton")
                //setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
                var hasRemarkid = "#HasRemark-" + id
                $(hasRemarkid).val("Y");
                var parentid = "#MainDiv-" + id;
                $(parentid).removeClass("red");
                $(parentid).css("background-color", "white");
                $(parentid).find(".MoreDetails").css("background-color", "white");
                var moredetails = "#" + id;
                $(moredetails).css("background-color", "white");
                $(parentid).css("color", "black");

                if ($(".right").is(":visible")) {
                    if (Callid == $(".right .call-id #callid").text()) {
                        LoadRemarks(Callid, ".right");
                    }
                }

            }
        })
        return false;
    }
}

function SubmitCallAssignTo(ctrl) {
    var empId = ""
    var Callid = '';
    if (ctrl.id == "Employee") {
        var empId = $("#Employee").val();
        var Callid = $('#PCall').val();
        $('#Assignedto').modal("hide");
    } else {
        var id = $(ctrl).parent().parent().parent().parent().parent()[0].id;
        var Rowid = "#tr-" + id;
        //if ($(Rowid).parent().hasClass("red")) {
        //    Callid = $(Rowid).children(1)[2].innerText;
        //} else {
        //    Callid = $(Rowid).children(1)[1].innerText;
        //}
        Callid = $(Rowid).find(".callid").text();
        var select = $(Rowid).find(".CallAssignToInput");
        empId = $(select[0]).children("option:selected").val();
    }
    $(ctrl).addClass("disabledbutton");
    //var status = $("#callstatusInput").val();
    if (empId != "0") {
        $.ajax({
            type: "POST",
            url: "/CRM/CallAssignedTo",
            data: { Callid: Callid, empId: empId },
            success: function (data) {
                if (data == "LogOut") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    var Mtitle = "Call assigned Successfully.";
                    ShowMsg(Mtitle, "success");
                    $("#Employee").val("");
                    $('#PCall').val("");

                    //$('#CallClosedContent').html('');
                    //$('#CallClosed').modal(options);
                    //$('#CallClosed .modal-title').text(Mtitle);
                    // $('#CallClosed').modal("show");

                    // setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
                }
            },
            error: function () {
                //$('#NoRow').modal(options);
                var Mtitle = "An error Occured! Please try again";
                ShowMsg(Mtitle, "error");

                //$('#NoRow .modal-title').text(Mtitle);
                //$('#NoRow .modal-title').css('text-align', 'center');
                //$('#NoRow').modal('show');
            }
        });
    }
    popoverClose();
    $(ctrl).removeClass("disabledbutton");

}

function SubmitMarkAsDuplicate(ctrl) {
    var Rowid1 = $(ctrl).parent().parent().parent().parent().parent().parent()[0].id;
    var hasRemarkid = "#HasRemark-" + Rowid1
    var hasRemarkValue = $(hasRemarkid).val();
    var rowid = "#tr-" + Rowid1
    $(ctrl).addClass("disabledbutton")

    var Callid = $(rowid).find(".TxtCallId").val();
    var selectRowCallId = $(rowid).find(".callid").text();

    if (Callid == selectRowCallId) {
        //$('#CallClosedContent').html();
        //$('#CallClosed').modal(options);
        var Mtitle = "You can not enter same CallId."
        ShowMsg(Mtitle, "error");

        //$('#CallClosed .modal-title').text(Mtitle);
        //$('#CallClosed').modal('show');
        return false;
    }

    //var DuplicateCallid = ''
    //if ($(rowid).parent().hasClass("red")) {
    //    DuplicateCallid = $(rowid).children(1)[2].innerText;
    //    firmname = $(rowid).children(1)[4].innerText;
    //} else {
    //    DuplicateCallid = $(rowid).children(1)[1].innerText;
    //    firmname = $(rowid).children(1)[3].innerText;
    //}
    if (Callid != "" || Callid != "undefined") {
        //var PMainRow = "#P-" + Callid;
        //var MainRowId = $(PMainRow).val();
        //var MainRowKey = "#tr-" + MainRowId;
        //if ($(MainRowKey).parent().hasClass("red")) {
        //    var firmname = $(MainRowKey).children(1)[4].innerText;
        //} else {
        //    var firmname = $(MainRowKey).children(1)[3].innerText;
        //}
        //firmname="";
        AjaxCallMarkAsDuplicate(Callid, Rowid1, hasRemarkValue)
    }
    popoverClose();
    $(ctrl).removeClass("disabledbutton")

}
// Function to fetch msg based on selected MsgTemplateId
function onTemplateChange(value, id) {

    if (value != 0) {
        $.ajax({
            url: '/CRM/GetMessageTemplateText',
            type: "POST",
            data: { TempId: value },
            success: function (data) {
                if (data != "") {
                    $("#T").val(data);
                }
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }

            },
            error: function () {
                //$('#CallClosedContent').html();
                //$('#CallClosed').modal(options);
                var Mtitle = "An error occured.Please try again later!"
                ShowMsg(Mtitle, "error");

                //$('#CallClosed .modal-title').text(Mtitle);
                //$('#CallClosed').modal('show');
            }
        });

    }

}
function AjaxCallMarkAsDuplicate(CallidText, CallKeytoDuplicate, hasRemark) {
    if (hasRemark === "Y") {
        $.ajax({
            url: '/CRM/CallMarkAsDuplicate',
            type: "POST",
            data: { MainCallid: CallidText, DuplicateCallkey: CallKeytoDuplicate, calltype: "C" },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }

                if (data == "NoRemarkAfterLastCall") {
                    //$('#CallClosedContent').html();
                    //$('#CallClosed').modal(options);
                    var Mtitle = "There is no remark after Last Call from Customer. Please put remark!"
                    ShowMsg(Mtitle, "info");

                    //$('#CallClosed .modal-title').text(Mtitle);
                    //$('#CallClosed').modal('show');
                } else {
                    //$('#CallClosedContent').html();
                    //$('#CallClosed').modal(options);
                    var Mtitle = "Call Marked as Duplicate!"
                    ShowMsg(Mtitle, "info");

                    //$('#CallClosed .modal-title').text(Mtitle);
                    //$('#CallClosed').modal('show');
                    //setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);
                }
            },
            error: function () {
                //$('#CallClosedContent').html();
                //$('#CallClosed').modal(options);
                var Mtitle = "An error occured.Please try again later!"
                ShowMsg(Mtitle, "error");

                //$('#CallClosed .modal-title').text(Mtitle);
                //$('#CallClosed').modal('show');
            }
        });

    } else {
        //$('#CallClosedContent').html();
        //$('#CallClosed').modal(options);
        var Mtitle = "Add remark first then Mark as duplicate!"
        ShowMsg(Mtitle, "info");

        //$('#CallClosed .modal-title').text(Mtitle);
        //$('#CallClosed').modal('show');
    }
    var rowid = "#tr-" + CallKeytoDuplicate;
    $(rowid).find(".TxtCallId").val("");
}
//Show remarks of a task when clicking on the icon
function ViewRemarks(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var Callid = $(Rowid).find(".callid").text();
    //if ($(Rowid).parent().hasClass("red")) {
    //    Callid = $(Rowid).children(1)[2].innerText;
    //} else {
    //    if ($(Rowid).children(1).hasClass("numberCircle")) {
    //        Callid = $(Rowid).children(1)[2].innerText;
    //    }
    //    else {
    //        Callid = $(Rowid).children(1)[1].innerText;
    //    }
    //}
    CurrentHoverRowId = Rowid;
    // Popover Grid
    $("#ShowRemarksDiv div").remove();
    $(".popover-content div").empty();
    var morediv = $("#ShowRemarksDiv");
    var more1 = $("<div class='' style='display:flex; padding-right: 0px; z-index:10; margin-right:0px; margin-bottom:0px; width: 450px; height:46px; color: #325faf; padding-left:0px; background-color:white;' id='SRTitle'  ></div>");
    more1.html(("<a data-toggle='Export to excel' class='col-md-1' style='padding-left: 0px;padding-top: 9px;margin-bottom: 5px;padding-right: 10px;text-align: center;' onclick='remarkExportToExcel(" + Callid + ");' > <span class='glyphicon glyphicon-share' style='font-size:22px;'>  </span></a>")
        + " " + ("<a data-toggle='Mail to customer' id='mailtocust' class='col-md-8' style='padding-left: 0px;padding-top: 10px;padding-right: 10px;left: 0px;' onclick=showEmailCtrl()><div class='col-md-1' style='margin-right: 4px;bottom: 2px;right: 4px;'><span class='fa fa-envelope' style='font-size:24px'></span></div><div class='ShowEmailInRemark' style='display:none;'><input type='text' id='email-" + Callid + "' placeholder='Enter email address' style='width:150px; margin-left:5px; outline:none; border-radius:2px; border:1px solid; color:black; height: 23px;' /><div class='btn btn-success DateBtn'  style='padding: 2px 5px 1px 5px; margin-bottom: 4px; font-size: 12px;margin-left: 4px;' onclick='submitRemarkEmail(" + Callid + "," + id + ")'>Send Email</div></div></div>")
        + " " + ("<div class='col-md-1' style='margin-top:0px; padding-right: 0px;left: 485px;position: absolute;bottom: 14px;'> <span class='close' onclick='popoverClose();' style='padding-left: 10px;padding-bottom: 10px; font-size:18px'> &times; </span> </div>")
    );
    morediv.append(more1);
    var more = $("<div class='col-md-12' style='display:flex; margin-right:0px; padding-right: 0px; z-index:10; height:20px; color: #325faf; padding-left:0px; ' id='SRTitle'  ></div>");
    more.html(("<div class='' style='width:10%; text-align:left; padding-top:0px; margin-bottom:5px; padding-left: 0px;'><b>Sno.</b></div>")
        + " " + ("<div class='' style=' width:30%;padding-left: 0px; padding-top:0px; margin-bottom:5px; padding-right:0px; text-align:left;'><b>Remark</b></div>")
        + " " + ("<div class='' style='width:20%; text-align: left;padding-top:0px;margin-bottom: 5px;padding-right: 0px;padding-left: 0px; margin-left: 10px;' > <b>Comm. type</b> </div>")
        + " " + ("<div class='' style=' width:17%; text-align: left;padding-top:0px;margin-bottom: 5px;padding-right: 0px;' ><b>Date</b> </div>")
        + " " + ("<div class='' style='width:20%; padding-left: 0px; padding-top: 0px; padding-right:0px;text-align: left;margin-left: 0px;' > <b>Created By</b> </div>")

    );
    morediv.append(more);

    var more2 = $("<div class='col-md-12 ShowRemarksValueM' style='margin-bottom:0px' id='' ></div>");
    morediv.append(more2);

    var DataLoading = document.createElement('div');
    DataLoading.id = 'LoadingData';
    DataLoading.innerHTML = '...Loading...';
    DataLoading.className = 'col-md-12';
    $(DataLoading).css('text-align', 'center');
    $(DataLoading).css('margin-bottom', '10px');
    $(DataLoading).css('margin-top', '25px');
    $(DataLoading).css('position', 'absolute');
    morediv.append(DataLoading);
    // $(this).popover('toggle');
    $(".ShowRemark").popover('toggle');



    $.ajax({
        type: "POST",
        url: "/CRM/AddRemarkData",
        data: { CallId: Callid },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }

            $(".popover-content").css("height", "auto")
            //$(".popover-content").css("overflow-y", "scroll")
            //loadData1(data);
            var tblEmployee1 = $(".popover-content");
            //$(".popover-content #LoadingData").css('display', 'none');
            var a = 1;
            var divContainer = $("<div class='col-md-12' style='z-index:12;color:black; overflow-y:scroll; height:150px; padding:0;'></div>");

            $.each(data.data, function (index, item) {
                var m = (a) + index;
                var more1 = $("<div class='col-md-12'  style='width:100%; display:flex;margin-bottom:10px;color:black; margin-top:10px; padding:0; ' id='" + item.CRMCommunication_key + "'>" + m + "</div>");
                more1.html(("<div class='col-md-1' style='width:10%; margin-left: 0px; padding-left: 8px; padding-right:0;  text-align:left;'>" + m + "</div>")
                    + " " + ("<div class='col-md-3' style='width:33%;padding-left:0px; padding-right:0px;text-align:left;' >" + item.Commtext + "</div>")
                    + " " + ("<div class='col-md-1' style='width:20%;  text-align:left; padding-right:0px; padding-left:0px; margin-left:0px;'  >" + item.TextCommunicationType + " </div>")
                    + " " + ("<div class='col-md-3' style='width:17%;   text-align:left; padding:0;'>" + item.FrmtCreationDate + " </div>")
                    + " " + ("<div class='col-md-1' style='width:20%;padding-right:0px; text-align:left; padding-left:0;'>" + item.TextLogincode + "</div>")
                );
                divContainer.append(more1);
            });

            tblEmployee1.append(divContainer);
            if (data.recordsTotal == 0) {
                $(".popover-content #LoadingData").css('display', 'block');
                $(".popover-content #LoadingData").text('No Data');
            } else {
                $(".popover-content #LoadingData").css('display', 'none');
                $(".popover-content #LoadingData").text('');
            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });

    // Popover Grid
    $('.ShowRemark').not(ctrl).popover('hide');
    $('.popover.fade.left.in').css('max-width', '600px');
    $('.popover.fade.left.in').css('height', '235px');
    $('.popover.fade.left.in').css('width', '600px');
    $('.popover.fade.left.in').css('left', '-594px');
    $('.popover.fade.left.in').css('background-color', 'white');
    $('.popover.fade.left.in').css('top', '-34px');
    $('.arrow').css('top', '13px');
    $('.popover-content').css('width', '600px');
    //$('.popover-content').css('max-height','186px');
    $('.popover-content').css('padding-top', '0px');
    $('.popover-content').css('overflow-y', 'hidden');
    $('.popover-content').css('overflow-x', 'hidden');


    event.preventDefault();
}
function showEmailCtrl() {
    $(".ShowEmailInRemark").css("display", "block");
}

function submitRemarkEmail(callid, rowid) {
    var eid = "#tr-" + rowid + " #email-" + callid
    var emailId = $(eid).val();
    if (emailId != "" && emailId != "undefined" && emailId != null) {
        $.ajax({
            type: "POST",
            url: "/CRM/SendRemarkInEmail",
            data: { callid: callid, calltype: "C", emailId: emailId },
            success: function (data) {
                if (data == "") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }

                //$(btn).removeClass("disabledbutton");
                var Mtitle = "Mail sent Successfully.";
                $(eid).val("");
                ShowMsg(Mtitle, "success");

                //$('#CallClosedContent').html('');
                //$('#CallClosed').modal(options);
                //$('#CallClosed .modal-title').text(Mtitle);
                //// $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
                //$('#CallClosed').modal("show");

                //setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
            },
            error: function () {
                //$('#CallClosedContent').html('');
                //$('#CallClosed').modal(options);
                var Mtitle = "An error Occured! Please try again";
                ShowMsg(Mtitle, "error");

                /* $('#CallClosed .modal-title').text(Mtitle);*/
                //$('.modal-title').css('text-align', 'center');
                //$('#CallClosed').modal('show');
            }
        });
    }
    // $(btn).removeClass("disabledbutton")


}


function remarkExportToExcel(callid) {
    window.location = '/CRM/remarkExportToExcel?callid=' + callid + '&calltype=C';
}



function SubmitLinkCustomer(btnid) {
    var P_customers = $("#P_Customers").val();
    var CallId = $("#LinkCustomerCallId").val();
    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton")
    $.ajax({
        type: "POST",
        url: "/CRM/LinkCustomer",
        data: { CallId: CallId, P_Customers: P_customers },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            $('#LinkCustomer').modal("hide");
            $(btn).removeClass("disabledbutton");
            var Mtitle = "Customer is linked Successfully.";
            $("#P_Customers").val("");
            $("#LinkCustomerCallId").val("");
            $("#FirmName1").val("");
            ShowMsg(Mtitle, "success");

            //$('#CallClosedContent').html('');
            //$('#CallClosed').modal(options);
            //$('#CallClosed .modal-title').text(Mtitle);
            //// $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
            //$('#CallClosed').modal("show");

            //setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            //$('#NoRow').modal(options);
            var Mtitle = "Select a Row";
            ShowMsg(Mtitle, "info");

            //$('#NoRow .modal-title').text(Mtitle);
            //$('#NoRow .modal-title').css('text-align', 'center');
            //$('#NoRow').modal('show');
        }
    });
    $(btn).removeClass("disabledbutton")
}

function deleteCollaborator(id) {
    $.ajax({
        type: "GET",
        url: "/Tasks/DeleteCollaborator",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        data: { id: id },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                $('#ViewCollaborator').modal('hide');
                var Mtitle = "Collaborator deleted Successfully";
                ShowMsg(Mtitle, "success");

                //$('#CallClosedContent').html('');
                //$('#CallClosed').modal(options);
                //$('#CallClosed .modal-title').text(Mtitle);
                //// $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
                //$('#CallClosed').modal("show");

                //setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
            }
        },
        error: function () {
            alert("error")
        }
    });

}
function SubmitMsgToCustomer(btnid) {
    var Pcall = $("#PCallMsgToCustomer").val();
    var MobNo = $("#Mobileno").val();
    var PhoneMsg = $("#T").val();
    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton")
    $('#MsgCustomer').modal("hide");
    $.ajax({
        type: "POST",
        url: "/CRM/MsgToCustomer",
        data: { PCall: Pcall, MobNo: MobNo, Message: PhoneMsg, calltype: 'C' },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }


            var Mtitle = "Message is sent to Customer.";
            ShowMsg(Mtitle, "success");

            //$('#CallClosedContent').html('');
            //$('#CallClosed').modal(options);
            //$('#CallClosed .modal-title').text(Mtitle);
            //// $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
            //$('#CallClosed').modal("show");
            $("#T").val("");
            $("#Mobileno").val("");
            $("#PCallMsgToCustomer").val("");
            //setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "Select a Row";
            ShowMsg(Mtitle, "info");

            //$('#NoRow .modal-title').text(Mtitle);
            //$('#NoRow .modal-title').css('text-align', 'center');
            //$('#NoRow').modal('show');
        }
    });
    $(btn).removeClass("disabledbutton")
}

function OnsiteVisitCtrls(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var Callid = $(Rowid).find(".callid").text();
    //if ($(Rowid).parent().hasClass("red")) {
    //    Callid = $(Rowid).children(1)[2].innerText;
    //} else {
    //    Callid = $(Rowid).children(1)[1].innerText;
    //}
    CurrentHoverRowId = Rowid;
    $(".OnsiteVisitCtrls").popover('toggle');
    $(".OnsiteVisitDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })


    var selectid = "#onsitespan-" + id;
    $(selectid).empty();

    $.ajax({
        type: "POST",
        url: "/CRM/GetCurrentOnsiteVisit",
        data: { PCall: Callid },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }

            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            } else {
                $(selectid).text(data);
            }
        }
    })
    // control.text("Current Onsite Visits: " + OnsiteCount);
    // Popover Grid
    $('.OnsiteVisitCtrls').not(ctrl).popover('hide');
    $('.popover.fade.right.in').css('width', '235px');
    $('.popover.fade.right.in').css('top', '27px');
    $('.popover.fade.right.in').css('max-width', 'none');
    $('.arrow').css('top', '-11px');
    $('.arrow').css('left', '54%');
    $('.popover-content').css('width', '227px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-top', '3px');
    $('.popover-content').css('height', '113px');




    event.preventDefault();

}



function SubmitMailToCustomer(btnid) {
    var Pcall = $("#PCallMailToCustomer").val();
    var email = $("#emailMailtoCustomer").val();
    var Msg = $("#msgMailToCustomer").val();
    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton");
    $('#MailToCustomer').modal("hide");
    $.ajax({
        type: "POST",
        url: "/CRM/MailToCustomer",
        data: { PCall: Pcall, EmailId: email, Message: Msg, calltype: 'C' },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }


            var Mtitle = "Email is sent to Customer.";
            ShowMsg(Mtitle, "success");

            //$('#CallClosedContent').html('');
            //$('#CallClosed').modal(options);
            //$('#CallClosed .modal-title').text(Mtitle);
            //// $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
            //$('#CallClosed').modal("show");
            $("#PCallMailToCustomer").val("");
            $("#firmNameMailtoCustomer").val("");
            $("#emailMailtoCustomer").val("");
            $("#msgMailToCustomer").val("");
            //setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "Select a Row";
            ShowMsg(Mtitle, "info");

            //$('#NoRow .modal-title').text(Mtitle);
            //$('#NoRow .modal-title').css('text-align', 'center');
            //$('#NoRow').modal('show');
        }
    });
    popoverClose();
    $(btn).removeClass("disabledbutton")
}
function submitCallCollaborator(btnid) {
    var Pcall = $("#CallCollaborators #PCall").val();
    var collabId = $("#collaboratorId").val();
    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton")
    $('#CallCollaborators').modal("hide");

    $.ajax({
        type: "POST",
        url: "/CRM/AddCallCollaborators",
        data: { PCall: Pcall, collaboratorId: collabId, calltype: "C" },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }

            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }


            var Mtitle = "Collaborator added successfully.";
            ShowMsg(Mtitle, "success");

            //$('#CallClosedContent').html('');
            //$('#CallClosed').modal(options);
            //$('#CallClosed .modal-title').text(Mtitle);
            //// $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
            //$('#CallClosed').modal("show");
            $("#CallCollaborators #PCall").val("");
            $("#collaboratorId").val("");
            //setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "Select a Row";
            ShowMsg(Mtitle, "info");

            //$('#NoRow .modal-title').text(Mtitle);
            //$('#NoRow .modal-title').css('text-align', 'center');
            //$('#NoRow').modal('show');
        }
    });
    popoverClose();
    $(btn).removeClass("disabledbutton")
}

function SubmitCallEngage(ctrl) {
    var status = ""
    //if (ctrl.id == "popup") {
    //    status = $("#callEngageStatus :selected").val();
    //    $("#callEngageStatus").val("0")
    //    $('#EngageStatus').modal("hide");
    //    console.log(status)
    //} else {
    //    var id = $(ctrl).parent().parent().parent().parent().parent()[0].id;
    //    var Rowid = "#tr-" + id;
    //    var select = $(Rowid).find(".callstatusInput");
    //    status = $(select[0]).children("option:selected").val();
    //    console.log(status)
    //    console.log("testing")
    //    popoverClose()
    //}
    var status = ""
    if (ctrl.id == "callEngageStatus") {
        status = $("#callEngageStatus :selected").val();
        $("#callEngageStatus").val("0")
        $('#EngageStatus').modal("hide");
    } else {
        var id = $(ctrl).parent().parent().parent().parent().parent()[0].id;
        var Rowid = "#tr-" + id;
        var select = $(Rowid).find(".callstatusInput");
        status = $(select[0]).children("option:selected").val();
        popoverClose()
    }

    var CallId = $("#callId").val();
    $(ctrl).addClass("disabledbutton");
    //var status = $("#callstatusInput").val();
    if (status != "0") {

        $.ajax({
            type: "POST",
            url: "/CRM/AddCallEngageStatus",
            data: { CallId: CallId, status: status },
            success: function (data) {
                if (data == "LogOut") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }

                var id = "#eng-" + CallId;
                $(id).html(data);
                ;

                var Mtitle = "Status added successfully.";
                ShowMsg(Mtitle, "success");
                //$('#CallClosedContent').html('');
                //$('#CallClosed').modal(options);
                //$('#CallClosed .modal-title').text(Mtitle);
                //$('#CallClosed').modal("show");
                //$("#callId").val("");
                //$("#CallEngageStatus").val("0");
                //setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
            },
            error: function () {
                $('#NoRow').modal(options);
                var Mtitle = "An error Occured! Please try again";
                ShowMsg(Mtitle, "error");
                //$('#NoRow .modal-title').text(Mtitle);
                //$('#NoRow .modal-title').css('text-align', 'center');
                //$('#NoRow').modal('show');
            }
        });
    }
    popoverClose();
    $(ctrl).removeClass("disabledbutton");
}

function submitOnsiteVisit(ctrl) {
    var Callid = '';
    if (ctrl.id == "onsiteVisitSubmitBtn") {
        var Callid = $("#PCall1").val();
        $('#OnsiteModal').modal("hide");
    } else {
        var id = $(ctrl).parent().parent().parent().parent().parent()[0].id;
        var Rowid = "#tr-" + id;
        //if ($(Rowid).parent().hasClass("red")) {
        //    Callid = $(Rowid).children(1)[2].innerText;
        //} else {
        //    Callid = $(Rowid).children(1)[1].innerText;
        //}
        Callid = $(Rowid).find(".callid").text();
        popoverClose()
    }

    $(ctrl).addClass("disabledbutton");

    $.ajax({
        type: "POST",
        url: "/CRM/OnsiteVisit",
        data: { PCall: Callid },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }

            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            var Mtitle = "Visit added successfully.";
            ShowMsg(Mtitle, "success");
            //$('#CallClosedContent').html('');
            //$('#CallClosed').modal(options);
            //$('#CallClosed .modal-title').text(Mtitle);
            //// $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
            //$('#CallClosed').modal("show");

            //setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "An Error Occured. Please try again Later";
            ShowMsg(Mtitle, "error");
            //$('#NoRow .modal-title').text(Mtitle);
            //$('#NoRow .modal-title').css('text-align', 'center');
            //$('#NoRow').modal('show');
        }
    });
    $(ctrl).removeClass("disabledbutton");
}
function defferCallSubmit(ctrl) {
    var rid = $(ctrl).parent().parent().parent().parent().parent().parent()[0].id;
    $(ctrl).addClass("disabledbutton");
    popoverClose();
    var id = rid.split("-")
    var rowid = "#" + rid
    var CallId = $(rowid).find(".callid").text();
    //if ($(rowid).parent().hasClass("red")) {
    //    CallId = $(rowid).children(1)[2].innerText;
    //} else {
    //    CallId = $(rowid).children(1)[1].innerText;
    //}
    var NextDate = $(rowid).find(".NextActionDate").val();
    if (NextDate != undefined && NextDate != "") {

        $.ajax({
            type: "GET",
            url: "/CRM/DefferCalls",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: { Callid: CallId, NextActionDate: NextDate, calltype: "C" },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }

                if (data == "") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                else {
                    $('#CallClosedContent').html();
                    $('#CallClosed').modal(options);
                    var Mtitle = "Call Deffered Successfully"
                    ShowMsg(Mtitle, "success");
                    //$('#CallClosed .modal-title').text(Mtitle);
                    //$('#CallClosed').modal('show');
                    //setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);
                }
            },
            error: function () {
                $('#CallClosedContent').html();
                $('#CallClosed').modal(options);
                var Mtitle = "An error Occured.Please try again."
                ShowMsg(Mtitle, "error");
                //$('#CallClosed .modal-title').text(Mtitle);
                //$('#CallClosed').modal('show');
            }
        });
    } else {
        $('#CallClosedContent').html();
        $('#CallClosed').modal(options);
        var Mtitle = "Please enter dateTime."
        ShowMsg(Mtitle, "info");
        //$('#CallClosed .modal-title').text(Mtitle);
        //$('#CallClosed').modal('show');
    }
    $(ctrl).removeClass("disabledbutton");

}
function ShowCollaborators(ctrl) {

    var id = $(ctrl).parent().parent().parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var CallPid = $(Rowid).find(".callid").text();
    //var CallPid = $(Rowid).children(1)[1].innerText;
    //if ($(Rowid).parent().hasClass("red")) {
    //    CallPid = $(Rowid).children(1)[2].innerText;
    //} else {
    //    CallPid = $(Rowid).children(1)[1].innerText;
    //}


    $.ajax({
        type: "POST",
        url: "/CRM/AddCallCollaboratorsData",
        data: { CallId: CallPid, calltype: "C" },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }

            //loadData1(data);

            var tblEmployee1 = $("#ShowCollaborators");
            $("#ShowCollaborators").empty();
            //$(".popover-content #LoadingData").css('display', 'none');
            var a = 1;
            $.each(data.data, function (index, item) {
                var m = (a) + index;

                var more1 = $("<div style='display:flex; height:20px; margin-bottom:10px; padding-left:0px' id='" + item.CRMCollaborator_key + "'  class='col-md-12 body'>" + m + "</div>");
                more1.html(("<div class='col-md-2 ViewcollaboratorsSno ' style='text-align: center;'>" + m + "</div>")
                    + " " + ("<div class='col-md-8 ViewcollaboratorsEmpName' style='text-align:center;' >" + item.TxtCollaborator + "</div>")
                    + " " + ("<div class='col-md-2 ViewcollaboratorsClose' style='padding-right: 0px;padding-left: 30px;' ><a class='' id='" + item.CRMCollaborator_key + "' onclick='deleteCollaborator(this.id)' style='cursor: pointer;'><i class='glyphicon glyphicon-remove'></i></a></div>")
                );
                tblEmployee1.append(more1);
            });

            $("#loading1").css("display", "none")
            if (data.recordsTotal == 0) {
                $(".popover-content #LoadingData").css('display', 'block');
                $(".popover-content #LoadingData").text('No Data');
            } else {
                $(".popover-content #LoadingData").css('display', 'none');
                $(".popover-content #LoadingData").text('');
            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });

    $('#ViewCollaborator').modal(options);
    $('#ViewCollaborator').modal('show');

    event.preventDefault();
}






function PageSize() {
    var a = $("#size").val();
    sessionStorage.setItem(regPageSizeKey, a);
    $(".yy").hide();
    var b = sessionStorage.getItem("search");
    if (b == "null") {
        b = "";
    }
    var o = sessionStorage.getItem("order");
    //if (o != undefined && o != "null") {
    //    order = o.split(":");
    //    var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
    //    ordervalue = "";
    //    o = order[1] + "~" + ordervalue + "~" + order[2];
    //    JSON.stringify(o);
    //}
    $("#example tbody tr").remove();
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $('#p').css("display", "none");

    $.post('/CRM/AjaxAllRegCallsData', { start: 1, pSize: a, search: b, order: o, ServerOrderValue: firmname }, function (data) {
        loadData(data);
    })
}

function CallAssignToCtrls(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    CurrentHoverRowId = Rowid;
    $(".CallAssignToCtrls").popover('toggle');
    $(".CallAssignToDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })
    var selectid = "#CallAssignToInput-" + id;
    $(selectid).empty();
    $.ajax({
        type: "POST",
        url: "/CRM/GetActiveEmployeeofCS",
        data: { key: id },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }

            var select = $(Rowid).find(".CallAssignToInput");
            // $("#callstatusInput").append('<option value=0>Select Engage Status</option');
            $(select[0]).append('<option value=0>Select Employee</option');
            var a = 1;
            $.each(data.data, function (index, item) {
                $(select[0]).append('<option value=' + item.P_acccode + '>' + item.AccName + '</option>');
            });

            if (data.recordsTotal == 0) {
                $(".popover-content #LoadingData").css('display', 'block');
                $(".popover-content #LoadingData").text('No Data');
            } else {
                $(".popover-content #LoadingData").css('display', 'none');
                $(".popover-content #LoadingData").text('');
            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });
    // Popover Grid
    $('.CallAssignTo').not(ctrl).popover('hide');
    $('.popover.fade.right.in').css('width', '246px');
    $('.popover.fade.right.in').css('left', '30px');
    $('.popover.fade.right.in').css('top', '40px');
    $('.popover.fade.right.in').css('max-width', 'none');
    $('.arrow').css('left', '50%');
    $('.popover-content').css('width', '180px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-top', '3px');




    event.preventDefault();

}
function AddRemarkCtrl(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    CurrentHoverRowId = Rowid;
    $(".AddRemarkCtrl").popover('toggle');
    $(".AddRemarkCtrlDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })

    // Popover Grid
    $('.AddRemarkCtrl').not(ctrl).popover('hide');
    $('.popover.fade.right.in').css('width', '225px');
    $('.popover.fade.right.in').css('left', '30px');
    $('.popover.fade.right.in').css('top', '40px');
    $('.popover.fade.right.in').css('max-width', 'none');
    $('.arrow').css('top', '-11px');
    $('.arrow').css('left', '57%');
    $('.popover-content').css('width', '240px');
    $('.popover-content').css('height', '135px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-top', '3px');




    event.preventDefault();

}

function isNumberKey(evt) {
    evt = evt ? evt : window.event;
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;

}


//Added by aslam for Add and LinkCustomer
function ShowAddAndLinkCustomerForm() {
    $("#linkCustomerForm").hide();
    $("#AddAndLinkCustomerForm").show();
}

function SubmitAddAndLinkCustomer(btnid) {
    var CallId = $("#LinkCustomerCallId").val();
    var formData = $("#AddAndLinkCustomerForm").serialize() + "&CallId=" + CallId;

    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton")
    $.ajax({
        type: "POST",
        url: "/CRM/AddAndLinkCustomer",
        data: formData,
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }

            $('#LinkCustomer').modal("hide");
            $(btn).removeClass("disabledbutton");
            var Mtitle = "Customer is Created and linked Successfully.";
            $("#LinkCustomerCallId").val("");
            $("#AddAndLinkCustomerForm #CustCode").val("");
            $("#AddAndLinkCustomerForm #CustName").val("");
            $("#AddAndLinkCustomerForm #Contactperson").val("");
            $("#AddAndLinkCustomerForm #MobNo").val("");
            $("#AddAndLinkCustomerForm #CustEmail").val("");

            ShowMsg(Mtitle, "success");
            //$('#CallClosedContent').html('');
            //$('#CallClosed').modal(options);
            //$('#CallClosed .modal-title').text(Mtitle);
            //$('#CallClosed').modal("show");
            //setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "Select a Row";
            ShowMsg(Mtitle, "info");

            //$('#NoRow .modal-title').text(Mtitle);
            //$('#NoRow .modal-title').css('text-align', 'center');
            //$('#NoRow').modal('show');
        }
    });
    $(btn).removeClass("disabledbutton")
}

function progressdata() {
    $(".editSectiondata").hide();
    $(".SectionCollaborators").hide();
    $(".task-classification").hide();
    $(".AddRemarkDetailView").show();
    $(".tabSection").show();
    $(".AddRemarkDetailView").show();
    $("#list1").show();
    $("#list2").show();
    $("#list5").show();
    $("#remarkTab").show();
    $("#taskeditTab").hide();
    $(".AddRemarkDetailView").css("padding-top", "10px");
    $("#progressdata").addClass("active");
    $("#homedata").removeClass("active");
    $("#homedata").addClass("unactive");
    $("#edithistorydata").removeClass("active");
    $("#edithistorydata").addClass("unactive");
    $("#collaboratordata").addClass("unactive")
    $("#collaboratordata").removeClass("active")

    $("#classificationdata").addClass("unactive");
    $("#classificationdata").removeClass("active");
    $("#edithead").css("display", "none");
    $("#list3").show();
    $(".asidenav").hide();
    $(".detailPane").css("width", "100%");
    //$(".topnavbar a").css("padding", "8px 19.5px")
    $("#list1").addClass("tab-activeWeb");
    $("#list4").removeClass("tab-activeWeb");
    $(".save").css("margin-right", "20px");
    $("#CallEditTab").hide();


}

function homedata() {
    $(".editSectiondata").show();
    $(".SectionCollaborators").show();
    $(".task-classification").show();
    $(".tabSection").show();
    $("#taskeditTab").hide();
    $(".AddRemarkDetailView").show();
    $("#list1").show();
    $("#list2").show();
    $("#list5").show();

    $("#remarkTab").show();
    $("#homedata").addClass("active")
    $("#progressdata").removeClass("active");
    $("#progressdata").addClass("unactive");
    $("#edithistorydata").removeClass("active");
    $("#edithistorydata").addClass("unactive");
    $("#collaboratordata").addClass("unactive")
    $("#collaboratordata").removeClass("active")

    $("#classificationdata").addClass("unactive");
    $("#classificationdata").removeClass("active");

    $(".AddRemarkDetailView").css("padding-top", "30px");
    $("#edithead").css("display", "none");
    $("#list3").show();
    $(".asidenav").show();
    $(".detailPane").css("width", "93%");
    //$(".topnavbar a").css("padding", "8px 16px");
    //$(".topnavbar a:last-child").css("padding-right", "7px");
    $("#list1").addClass("tab-activeWeb");
    $("#list4").removeClass("tab-activeWeb");
    $(".save").css("margin-right", "0px");
    $("#CallEditTab").hide();
}

function edithistorydata() {

    showEditHistoryTab()
    $("#CallEditTab").show();
    $(".tabSection").show();
    //$("boxLoading").hide();
    //$("#allActivity").show();
    $(".editSectiondata").hide();
    $(".SectionCollaborators").hide();
    $(".task-classification").hide();
    $(".AddRemarkDetailView").hide();
    $("#list1").hide();
    $("#list2").hide();
    $("#list5").hide();
    $("#remarkTab").hide();
    $("#edithistorydata").addClass("active")
    $("#homedata").removeClass("active");
    $("#homedata").addClass("unactive")
    $("#progressdata").removeClass("active");
    $("#progressdata").addClass("unactive");
    $("#collaboratordata").addClass("unactive")
    $("#collaboratordata").removeClass("active")
    $("#classificationdata").addClass("unactive");
    $("#classificationdata").removeClass("active");
    $("#edithead").css("display", "block");
    $("#list3").hide();
    $(".asidenav").hide();
    $(".detailPane").css("width", "100%");
    //$(".topnavbar a").css("padding", "8px 19.5px")
    $(".save").css("margin-right", "20px");

}

function collaboratordata() {
    $(".editSectiondata").hide();
    $(".AddRemarkDetailView").hide();
    $(".tabSection").hide();
    $(".task-classification").hide();
    $(".SectionCollaborators").show();
    $("#collaboratordata").addClass("active")
    $("#edithistorydata").removeClass("active")
    $("#edithistorydata").addClass("unactive")
    $("#homedata").removeClass("active");
    $("#homedata").addClass("unactive")
    $("#progressdata").removeClass("active");
    $("#progressdata").addClass("unactive");
    $("#classificationdata").addClass("unactive");
    $("#classificationdata").removeClass("active");
    $(".asidenav").hide();
    $(".detailPane").css("width", "100%");
    //$(".topnavbar a").css("padding", "8px 19.5px")
    $(".save").css("margin-right", "20px");

}

function classificationdata() {
    $(".editSectiondata").hide();
    $(".AddRemarkDetailView").hide();
    $(".tabSection").hide();
    $(".task-classification").show();
    $(".SectionCollaborators").hide();
    $("#classification").addClass("active")
    $("#collaboratordata").removeClass("active")
    $("#edithistorydata").removeClass("active")
    $("#edithistorydata").addClass("unactive")
    $("#homedata").removeClass("active");
    $("#homedata").addClass("unactive")
    $("#progressdata").removeClass("active");
    $("#progressdata").addClass("unactive");
    $("#collaboratordata").addClass("unactive")
    $("#collaboratordata").removeClass("active")
    $("#classificationdata").addClass("active");
    $(".asidenav").hide();
    $(".detailPane").css("width", "100%");
    //$(".topnavbar a").css("padding", "8px 19.5px")
    $(".save").css("margin-right", "20px");

}

function asidenavActive(ctrl, scrollCtrl) {
    $(".asidenav .asidenav-tab").removeClass("menu__item--active");
    $(".asidenav " + ctrl).addClass("menu__item--active");
    var container = $(".detailPane");
    var scrollTo = $(scrollCtrl);
    var a = parseInt(scrollTo.position().top);
    var b = parseInt(container.position().top);
    var c = parseInt(container.scrollTop());
    var position = a - b + c - 55;

    container.animate({
        scrollTop: parseInt(position)
    });
}


////Added by aslam to set Search or Order sessionStorage
//set search sessionStorage value
function setSearchSessionStorage(searchValue) {
    sessionStorage.setItem(searchKey, searchValue);
}

//set order sessionStorage value
function setOrderSessionStorage(orderValue) {
    sessionStorage.setItem(orderKey, orderValue);
}

//set searchCriteria sessionStorage value (This msg will show on Top of the grid)
function setSearchMsgSessionStorage(searchMsgValue) {
    sessionStorage.setItem(searchMsgKey, searchMsgValue);
}

//This sessionStorage value used for set Basic Filter UI after Page Reload 
function setBasicFilterStrSessionStorage(basicFilterStrValue) {
    sessionStorage.setItem(basicFilterStrKey, basicFilterStrValue);
}

//function setBasicFilterUIOnPageReload() {
//    var str = sessionStorage.getItem(basicFilterStrKey);
//    var search = sessionStorage.getItem(searchKey);
//    if (search !== null && search != "") {
//        if (str !== null && str != "") {
//            var arr = str.split("~");
//            $("#filter").val(arr[0]).trigger('change');
//            var controls = arr[1].split("|");
//            for (var i = 0; i < controls.length; i++) {
//                var ctrl = controls[i].split(":");
//                //setFilterControlValueOnPageReload(ctrl[0],ctrl[1]);
//                var type = $(ctrl[0]).prop("type");
//                if (type == "select-multiple") {
//                    var valArr = ctrl[1].split(",");
//                    $(ctrl[0]).val(valArr);
//                    $("#btnTagSearch").show()
//                }
//                else {
//                    $(ctrl[0]).val(ctrl[1]);
//                }

//            }
//            $(".filterclose").show();
//        }
//    }

//}

//function setBasicFilterUIOnPageReload() {
//    var str = sessionStorage.getItem(basicFilterStrKey);
//    var search = sessionStorage.getItem(searchKey);
//    if (search !== null && search != "") {
//        if (str !== null && str != "") {
//            var FiltersArr = str.split("!");
//            for (var i = 0; i < FiltersArr.length; i++) {
//                var arr = FiltersArr[i].split("~");
//                if (arr.length > 1) {
//                    var tr = "#basicFilterTable tr" + arr[0];
//                    var controls = arr[1].split("|");
//                    for (var j = 0; j < controls.length; j++) {
//                        $(tr + " .basicFilterChk").prop("checked", true);
//                        $(tr).addClass("basicFilterSeleted");
//                        var ctrl = controls[j].split(":");
//                        var type = $(tr + " " + ctrl[0]).prop("type");
//                        if (type == "select-multiple") {
//                            var valArr = ctrl[1].split(",");
//                            $(tr + " " + ctrl[0]).val(valArr);
//                        }
//                        else {
//                            $(tr + " " + ctrl[0]).val(ctrl[1]);
//                        }

//                    }
//                }
//            }
//            $(".selectpicker").selectpicker('referesh');

//        }
//    }

//}



function setBasicFilterUIOnPageReload() {
    var str = sessionStorage.getItem(basicFilterStrKey);
    var search = sessionStorage.getItem(searchKey);
    if (search !== null && search != "") {
        if (str !== null && str != "") {
            var FiltersArr = str.split("!");
            for (var i = 0; i < FiltersArr.length; i++) {
                var arr = FiltersArr[i].split("~");
                if (arr.length > 1) {
                    var tr = "#basicFilterTable tr" + arr[0];
                    var controls = arr[1].split("|");
                    for (var j = 0; j < controls.length; j++) {
                        $(tr + " .basicFilterChk").prop("checked", true);
                        $(tr).addClass("basicFilterSeleted");
                        var ctrl = controls[j].split(":");
                        var type = $(tr + " " + ctrl[0]).attr("data-type");
                        if (type == "select-multiple") {
                            console.log("setValues :" + tr + " " + ctrl[0]);
                            var valArr = ctrl[1].split(",");
                            var idArr = ctrl[0].split("#");
                            var id = idArr[1];
                            SetValue(valArr, id, tr);
                        }
                        else {
                            $(tr + " " + ctrl[0]).val(ctrl[1]);
                        }

                    }
                }
            }
            /*$(".selectpicker").selectpicker('referesh');*/

        }
    }

}


function showEditHistoryTab() {
    //if ($("#CallEditTab #allActivity").children().length == 0) {
    var callid = $(".editSection #callid").text();
    LoadEditHistory(callid)
    //}

}

function LoadEditHistory(callid) {
    $("#CallEditTab #boxLoading #boxLoadingMessage").show();
    $("#CallEditTab #allActivity").hide();
    $.ajax({
        type: "POST",
        url: "/CRM/GetCallActivityLog",
        data: { callid: callid },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }

            var a = 1;
            var finalDestination = $("#CallEditTab #allActivity")
            finalDestination.empty();
            $.each(data.data, function (index, item) {
                var m = (a) + index;
                //Load Data
                var html = '<div class="EditHistoryItem col-sm-12 HistoryItem" id="' + item.SrNo + '">'
                    + '<div class="line1 ">  <span class="">' + m + '</span>'
                if (item.ActivityType.toLowerCase() == "remark") {
                    html += '<div class=""><i class="fa fa-comment"></i></div>'
                        + '<div class="text">' + item.Text + '</div></div>'
                }
                else if (item.ActivityType.toLowerCase() == "document") {
                    var arr = item.Text.split(":");

                    html += '<div class=""><i class="fa fa-file-o"></i></div>'
                        + '<div style="">' + arr[0] + ': <a style="cursor:pointer" onClick="downloadRemarkFile(\'' + $.trim(arr[1]) + '\',\'' + $.trim(arr[2]) + '\')"  class="filenam">' + arr[1] + '</a></div></div>'
                }
                else if (item.ActivityType.toLowerCase() == "collaborator") {
                    html += '<div class=""><i class="fa fa-user"></i></div>'
                        + '<div class="text">' + item.Text + '</div></div>'
                }
                else if (item.ActivityType.toLowerCase() == "edit") {
                    html += '<div class=""><i class="fa fa-pencil-square-o" style="padding-right:8px;"></i></div>'
                        + '<div class="text">' + item.Text + '</div></div>'
                }

                //html +='<div style="">' + item.Text + '</div></div>'
                html += '<div class="line2"><span class="Remarkuser"><i class="" aria-hidden="true" ></i></span><span class="Remarkdate" style="float:right;"><img src="/images/calender.png">' + item.FrmDateTime + '</span></div>';

                var remarkDiv = $(html);

                finalDestination.append(remarkDiv);
                $("#CallEditTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            });
            if (data.recordsTotal == 0) {
                var NothingDiv = $('<div class="EditHistoryItem HistoryItem"><div class="line1"><span style="width:100%;">No Edit history here</span> </div></div>');
                finalDestination.append(NothingDiv);
                $("#CallEditTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            }
        },
        error: function () {
            var NothingDiv = $('<div class="EditHistoryItem HistoryItem"><div class="line1"><span style="width:100%;">No Edit history here</span> </div></div>');
            $("#CallEditTab #allActivity").append(NothingDiv);
            $("#CallEditTab #boxLoading #boxLoadingMessage").hide();
            $("#CallEditTab #allActivity").show();
        }
    });
}

////Show controls to edit Call
//function ShowEditCall(destination) {
//    //Hide
//    $(destination + " #editIcon").hide();
//    $(destination + " #firmtitle").hide();
//    $(destination + " #contactPerson").hide();
//    $(destination + " #mobno").hide();
//    $(destination + " #issuetitle").hide();
//    $(destination + " #issuedescription").hide();
//    $(destination + " #callstatus").hide();
//    $(destination + " #assignedto").hide();
//    $(destination + " #priorityOrder").hide();
//    $(destination + " #n").hide();
//    $(destination + " #f").hide();
//    $(destination + " #m").hide();
//    $(destination + " #l").hide();


//    //Show
//    $(destination + " #SaveCall").show();
//    $(destination + " #CancleEdit").show();
//    $(destination + " #firmDiv").show();
//    $(destination + " #contactDiv").show();
//    $(destination + " #issueDiv").show();
//    $(destination + " #txtissuedescription").show();
//    $(destination + " #ddlCallStatus").show();
//    $(destination + " #ddlAssignedto").show();
//    $(destination + " #txtpriorityOrder").show();
//    $(destination + " #spc").show();

//}

//Close Controls to edit Call
function CancleEditCall(destination) {
    //Show
    $(destination + " #editIcon").show();
    $(destination + " #firmtitle").show();
    $(destination + " #contactPerson").show();
    $(destination + " #mobno").show();
    $(destination + " #issuetitle").show();
    $(destination + " #issuedescription").show();
    $(destination + " #callstatus").show();
    $(destination + " #assignedto").show();
    $(destination + " #priorityOrder").show();
    $(destination + " #n").show();
    $(destination + " #f").show();
    $(destination + " #m").show();
    $(destination + " #l").show();

    //Hide
    $(destination + " #SaveCall").hide();
    $(destination + " #CancleEdit").hide();
    $(destination + " #firmDiv").hide();
    $(destination + " #contactDiv").hide();
    $(destination + " #issueDiv").hide();
    $(destination + " #txtissuedescription").hide();
    $(destination + " #spc").hide();
    $(destination + " #ddlCallStatus").hide();
    $(destination + " #ddlAssignedto").hide();
    $(destination + " #txtpriorityOrder").hide();

}



////Submit Call Edit
//function SubmitEditCall(destination) {
//    var formData = {
//        Firmname: $(destination + " #txtfirmtitle").val(),
//        Contactperson: $(destination + " #txtcontactPerson").val(),
//        Mobileno: $(destination + " #txtmobno").val(),
//        Emailid: $(destination + " #txtemail").val(),
//        Location: $(destination + " #txtlocation").val(),
//        Issuetype: $(destination + " #ddlIssueType").val(),
//        IssueDescription: $(destination + " #txtissuedescription").val(),
//        Status: $(destination + " #ddlCallStatus").val(),
//        PriorityOrder: $(destination + " #txtpriorityOrder").val(),
//        P_Customers: $(destination + " #P_Cust").val(),
//        AllCallsReg_key: $(destination + " #callkey").text(),
//        P_AllCallsReg: $(destination + " #callid").text()

//    };
//    //Assignedto: $(destination + " #ddlAssignedto").val(),
//    $.ajax({
//        type: "POST",
//        url: "/CRM/EditCall",
//        data: formData,
//        success: function (data) {
//            if (data.statusCode == 500) {
//                window.location.href = "/Home/Error";
//            }

//            if (data.toLowerCase() == "logout") {
//                window.location.href = "/Home/LogOut";
//                return true;
//            }
//            else if (data.toLowerCase() == "success") {
//                ShowMsg("Call Edited Successfully.", "success")
//                window.location.href = "/CRM/ManageAllRegCalls";
//            }
//            else {
//                ShowMsg(data, "info");
//            }
//        },
//        error: function () {
//            ShowMsg("Error in loading data.", "error");
//        }
//    });

//    return false;
//}


function ShowFirmGrid() {
    var firmname = $("#txtfirmtitle").val();
    if (firmname.length >= 3) {
        $('#FirmContainer #loading').show();
        $('#FirmContainer #loadingmessage').show();
        $('#FirmContainer #Msg').hide();
        $("#FirmContainer").css("display", "");
        var tblEmployee = $("#tblFirms");
        $("#tblFirms tbody tr").remove();
        $.post('/CRM/FindCustomersCombinedAddress', { firmname: firmname }, function (data) {
            if (data != "error") {
                $.each(data.data, function (index, item) {
                    if (item.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    var m = index + 1;
                    var tr = $("<tr id='" + item.P_Customers + "' ></tr>");
                    tr.html(("<td>" + m + "</td>")
                        + " " + ("<td>" + item.CustCode + "</td>")
                        + " " + ("<td><input type='hidden' id='Email' class='Email' value='" + item.Email + "'/>" + item.CustName + "</td>")
                        + " " + ("<td>" + item.MobNo + "</td>")
                        + " " + ("<td><input type='hidden' id='MainBussCode' class='MainBusscode' value='" + item.MainBussCode + "'/>" + item.TextMainBussCode + "</td>")
                        + " " + ("<td>" + item.TextHomeTown + "</td>")
                        + " " + ("<td>" + item.CombinedAddress + "</td>")
                        + " " + ("<td>" + item.OnsiteFlag + "</td>")
                    );
                    tblEmployee.append(tr);
                })
                $('#FirmContainer #loading').hide();
                $('#FirmContainer #loadingmessage').hide();
                $('#FirmContainer #Msg').hide();
            } else {
                $('#FirmContainer #loading').show();
                $('#FirmContainer #loadingmessage').hide();
                $("#FirmContainer #Msg").show();
                $("#FirmContainer #Msg").text("No record found");
                $('#FirmContainer').css("display", "none");
            }
        });
    }
    else {
        $('#FirmContainer').css("display", "none");
        return;
    }
}



//Submit Task Remark
function SubmitCallRemarkNew(destination) {
    var formdata = new FormData();
    var remark = $(destination + " #frmRemarkRight #txtRemark").val();
    formdata.append('remark', remark);
    var callid = $(destination + " #callid").text();
    formdata.append('CallId', callid);
    var file = $(destination + ' #frmRemarkRight #remarkfile')[0].files[0];
    formdata.append('file1', file);
    if ($.trim(remark) != "" || typeof file !== "undefined") {
        $.ajax({
            type: "POST",
            url: "/CRM/AddCallRemark",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data == "LogOut") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    ShowMsg("Progress Note added Successfully. . !", "success");
                    LoadRemarks(callid, destination);
                    $(destination + " #frmRemarkRight #txtRemark").val("");
                    $(destination + ' #frmRemarkRight #remarkfile').val("");
                    var id = $(destination + " #callkey").text();
                    var hasRemarkid = "#HasRemark-" + id
                    $(hasRemarkid).val("Y");
                    var parentid = "#MainDiv-" + id;
                    $(parentid).removeClass("red");
                    $(parentid).css("background-color", "white");
                    $(parentid).find(".MoreDetails").css("background-color", "white");
                    var moredetails = "#" + id;
                    $(moredetails).css("background-color", "white");
                    $(parentid).css("color", "black");
                }
            }
        });
    }
    else {
        /*  ShowMsg("Please fill at lease one");*/
        ShowMsg("Please enter progress note or choose a file.", "error");

    }

    return false;
}



function PlayFile(id) {
    $("#AUDIO").remove();
    var Filename = $("#file-" + id).val();
    var LinkUrl = $("#link-" + id).val();
    //var path = '/CRM/PlayAudio?Filename=' + Filename;
    var path = '/CRM/PlayAudio?Filename=' + Filename + "&LinkUrl=" + LinkUrl;
    gfg = document.createElement("AUDIO");
    gfg.setAttribute("src", path);
    gfg.setAttribute("controls", "controls");
    gfg.crossOrigin = 'anonymous';
    gfg.id = 'AUDIO'
    gfg.style = "width:100%;height:25px";
    gfg.play();
    $("#recording-" + id).append(gfg);
    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.style = "font-size: 25px;";
    span.appendChild(txt);
    $("#recording-" + id).append(span);
    span.addEventListener('click', () => {
        $("#AUDIO").remove();
        $(".close").remove();
    });
}


function showAssignmentHistoryTab() {
    //if ($("#callAssignHistoryTab #AllCallAssignment").children().length == 0) {

    //}

    var callid = $(".editSection #callid").text();
    LoadCallAssignmentHistory(callid)

}

function LoadCallAssignmentHistory(callid) {
    $("#callAssignHistoryTab #boxLoading #boxLoadingMessage").show();
    $("#callAssignHistoryTab #AllCallAssignment").hide();
    $.ajax({
        type: "POST",
        url: "/CustomerDetails/GetAssignedHistoryOfCall",
        data: { CallId: callid, calltype: "C" },
        success: function (data) {
            if (data == "logout") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }

            var a = 1;
            var finalDestination = $("#callAssignHistoryTab #AllCallAssignment")
            finalDestination.empty();
            var arr = JSON.parse(data)
            $.each(arr, function (index, item) {
                var m = (a) + index;
                //Load Data
                if (item.TextAssignedto != "") {
                    var html = '<div class="EditHistoryItem col-sm-12 HistoryItem" id="' + item.SrNo + '">'
                        + '<div class="line1 ">  <span class="">' + m + '</span>   <span class=""><img src="/images/profilemini.png" style="width:15px;"></span>  <div class="text">' + item.TextAssignedto + '</div></div>'
                        + '<div class="line2"><span class="Remarkuser" style="margin-top:-8px; float:right;"><span class="Remarkdate" style="float:right;"><img src="/images/calender.png">' + item.frmtStartDate + '</span></div>';

                    var detailDiv = $(html);

                    finalDestination.append(detailDiv);
                }
                $("#callAssignHistoryTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            });
            if (arr.length == 0) {
                var NothingDiv = $('<div class="EditHistoryItem HistoryItem"><div class="line1"><span class="text" style="width:100% ;">No Assignment history here</span> </div></div>');
                finalDestination.append(NothingDiv);
                $("#callAssignHistoryTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            }
            if (finalDestination.children().length == 0) {
                var NothingDiv = $('<div class="EditHistoryItem HistoryItem"><div class="line1"><span class="text" style="width:100% ;">No Assignment history here</span> </div></div>');
                finalDestination.append(NothingDiv);
                $("#callAssignHistoryTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            }
        },
        error: function () {
            var NothingDiv = $('<div class="EditHistoryItem HistoryItem"><div class="line1"><span class="text" style="width:100% ;">No Assignment history here</span> </div></div>');
            $("#callAssignHistoryTab #AllCallAssignment").append(NothingDiv);
            $("#callAssignHistoryTab #boxLoading #boxLoadingMessage").hide();
            $("#callAssignHistoryTab #AllCallAssignment").show();
        }
    });
}



////Show Confirmation PopUp modal before close a call from Detail Pane
//function ShowCloseCallModal(destination) {
//    $("#CallCloseModal").modal(options);
//    $("#CallCloseModal").modal("show");
//    $("#CallCloseModal #destinationName").val(destination);

//}

////Close a Call From Detail Pane
//function CloseCallFromDetailPane() {
//    var destination = $("#CallCloseModal #destinationName").val();
//    $("#CallCloseModal").modal("hide");
//    var CallId = $(destination + " #callid").text();
//    var id = $(destination + " #callkey").text();
//    var hasRemarkid = "#HasRemark-" + id;
//    var hasRemarkValue = $(hasRemarkid).val();
//    if (hasRemarkValue.toLowerCase() == "y") {
//        $.ajax({
//            type: "GET",
//            url: "/CRM/CallClosed",
//            contentType: "application/json; charset=utf-8",
//            datatype: "json",
//            data: { Pid: CallId },
//            success: function (data) {
//                if (data.statusCode == 500) {
//                    window.location.href = "/Home/Error";
//                }

//                var Mtitle
//                if (data == "NoRemarkAfterLastCall") {
//                    Mtitle = "There is no remark after Last Call.Please add remark to close call";
//                    ShowMsg(Mtitle, "error");
//                }
//                else if (data == "CustomerNotLink") {
//                    Mtitle = "Please link Customer, then close the call.";
//                    ShowMsg(Mtitle, "error");
//                }
//                else if (data == "CallNotAssigned") {
//                    Mtitle = "Please Assign Call, then close the call.";
//                    ShowMsg(Mtitle, "error");
//                }
//                else if (data == "CallNotAssignedtoLoggedInEmployee") {
//                    Mtitle = "Call can only be closed by whomever it is assigned!";
//                    ShowMsg(Mtitle, "error");
//                }
//                else {
//                    //$('#CallClosedContent').html();
//                    //$('#CallClosed').modal(options);
//                    //$('#CallClosed').modal('show');
//                    Mtitle = "Call Closed Successfully";
//                    ShowMsg(Mtitle, "success");

//                    //$('#CallClosed .modal-title').text(Mtitle);
//                    var MainDivid = "#MainDiv-" + id
//                    $(MainDivid).remove();
//                    $("#RightShift").trigger("click");
//                    //setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);


//                }
//            },
//            error: function (data) {
//                ShowMsg("Please link Customer, then close the call.", "info");
//            }
//        });
//    }
//    else {
//        ShowMsg("Please add Remark to close Call!", "info");
//    }
//}

//Create Feedback link for Call
function CreateFeedbackLink(destination) {
    var p_allcallsreg = $(destination + " #callid").text();
    $.post('/CRM/CreateFeedbackUrlForCall', { P_AllCallsReg: p_allcallsreg }, function (data) {
        if (data == "logout") {
            window.location.href = "/Home/LogOut";
        }
        else if (data=="") {
            ShowMsg("Please check contact number");
        }
        else {
            //$(destination + " .ShareBox input[type='text']").val(data);
            //$(destination + " .ShareBox").show();
            window.open(data, "_blank");

        }

    })
}

////Show Confirmation PopUp modal before close Calls
//function ShowMultiCallCloseModal() {
//    var callids = "";

//    for (var i = 0; i < chkvalesArr.length; i++) {
//        var val = chkvalesArr[i];
//        callids += callids == "" ? val : "," + val;
//    }
//    if ($.trim(callids) !== "") {
//        $("#MultiCallCloseModal").modal(options);
//        $("#MultiCallCloseModal").modal("show");
//        $("#MultiCallCloseModal #callids").val(callids);
//    }
//    else {
//        ShowMsg("Please select at least 1 Call.", "error");
//        //$('#TaskClosedContent').html('');
//        //$('#TaskClose').modal(options);
//        //$('#TaskClosedContent').html("<p class='text-center' style='font-size: 18px;margin-bottom: 30px;'>Please select at least 1 Call.</p>");
//        //$('#TaskClose').modal("show");
//        //setTimeout(function () { $('#TaskClose').modal("hide"); }, 2000);
//    }


//}


//Close multiple Calls
//function CloseMultipleCalls() {
//    var callids = $("#MultiCallCloseModal #callids").val();
//    $("#MultiCallCloseModal").modal("hide");
//    $.post('/CRM/MultilpleCallClosed', { callIds: callids }, function (data) {
//        if (data == "") {
//            window.location.href = "/Home/LogOut";
//            return true;
//        }
//        ShowMsg(data[0], data[1]);
//        //$('#TaskClosedContent').html('');
//        //$('#TaskClose').modal(options);
//        //$('#TaskClosedContent').html("<p class='text-center' style='font-size: 18px;margin-bottom: 30px;'>" + data + "</p>");
//        //$('#TaskClose').modal("show");

//    });
//}



////Show PopUp modal before AddTags on Calls
//function ShowMultiCallAddTagsModal() {
//    var callids = "";

//    for (var i = 0; i < chkvalesArr.length; i++) {
//        var val = chkvalesArr[i];
//        callids += callids == "" ? val : "," + val;
//    }
//    if ($.trim(callids) !== "") {
//        $("#MultiTagsAddModal").modal(options);
//        $("#MultiTagsAddModal").modal("show");
//        $("#MultiTagsAddModal #callids").val(callids);
//        $("#MultiTagsAddModal #ddlmultiTags").selectpicker('deselectAll');
//    }
//    else {
//        ShowMsg("Please select at least 1 Call.", "error");
//        //$('#TaskClosedContent').html('');
//        //$('#TaskClose').modal(options);
//        //$('#TaskClosedContent').html("<p class='text-center' style='font-size: 18px;margin-bottom: 30px;'>Please select at least 1 Call.</p>");
//        //$('#TaskClose').modal("show");
//        //setTimeout(function () { $('#TaskClose').modal("hide"); }, 2000);
//    }


//}

//function AddMultipleTagsOnCalls() {
//    var callids = $("#MultiTagsAddModal #callids").val();
//    var tagkeys = $("#MultiTagsAddModal #ddlmultiTags option:selected").map(function () { return $(this).val(); }).get().join(",");

//    $("#MultiTagsAddModal").modal("hide");
//    $.post('/CRM/AjaxAddMultipleTags', { Callids: callids, tagkeys: tagkeys }, function (data) {
//        if (data.statusCode == 500) {
//            window.location.href = "/Home/Error";
//        }

//        if (data == "") {
//            window.location.href = "/Home/LogOut";
//            return true;
//        }
//        var msg = "";
//        var msgType = "";
//        if (data == "Already Added") {
//            msg = "Tags already Added";
//            msgType = "info";
//        }
//        else if (data == "true") {
//            msg = "Tag has been added Successfully.";
//            msgType = "success";
//        }
//        else {
//            msg = "An error occured while storing your Information .Please try again later.";
//            msgType = "error";
//        }

//        ShowMsg(msg, msgType)
//        //$('#TaskClosedContent').html('');
//        //$('#TaskClose').modal(options);
//        //$('#TaskClosedContent').html("<p class='text-center' style='font-size: 18px;margin-bottom: 30px;'>" + msg + "</p>");
//        //$('#TaskClose').modal("show");
//        //setTimeout(function () { $('#TaskClose').modal('hide'); }, 1500);

//        if (data == "true") {
//            ReloadGrid();
//        }
//    });
//}



$('#example').on('contextmenu', 'div.parentdiv', function (e) {
    console.log("right clicked");
});
$(function () {
    /**************************************************
     * Custom Command Handler
     **************************************************/

    //For Customer Name Filter
    $.contextMenu.types.input = function (key, options, item, opt, root) {
        // this === item.$node
        var Rowid1;
        if ($(item.$trigger[0]).hasClass("red")) {
            Rowid1 = item.$trigger[0].children[0].children[2].id//childNodes[0]//.id;

        } else {
            Rowid1 = item.$trigger[0].children[0].children[1].id//childNodes[0]//.id;           
        }

        var hasRemarkid = "#HasRemark-" + Rowid1
        var hasRemarkValue = $(hasRemarkid).val();
        $('<span>Call Id'
            + '<form  id="MarkAsDuplicate"> <input id="TxtCallId" name="TxtCallId" type="text" style="width:80%; margin-right:5px; outline:none; border-radius:3px; border:1px solid; color:black" /><div class="btn btn-success DateBtn" id="SubmitMarkAsDuplicate" style="padding: 2px 5px 1px 5px; border-radius:50%; margin-bottom: 5px;"><i class="glyphicon glyphicon-ok"></i></div></form>')
            .appendTo(this)
            .on('click', '#SubmitMarkAsDuplicate', function () {
                //alert("Clicked");
                // Session["taskId"].val;
                if ($("#TxtCallId").val() != "" || $("#TxtCallId").val() != "undefined") {
                    var Callid = $("#TxtCallId").val();
                    var PMainRow = "#P-" + Callid;
                    var MainRowId = $(PMainRow).val();
                    var MainRowKey = "#tr-" + MainRowId;

                    var selectRowCallid = $("#tr-" + Rowid1).find(".callid").text();
                    if (Callid == selectRowCallid) {
                        //$('#CallClosedContent').html();
                        //$('#CallClosed').modal(options);
                        var Mtitle = "You can not enter same CallId."
                        ShowMsg(Mtitle, "info");
                        //$('#CallClosed .modal-title').text(Mtitle);
                        //$('#CallClosed').modal('show');
                        return false;
                    }

                    //if ($(MainRowKey).parent().hasClass("red")) {
                    //    var firmname = $(MainRowKey).children(1)[4].innerText;
                    //} else {
                    //    var firmname = $(MainRowKey).children(1)[3].innerText;
                    //}
                    var firmname = $(MainRowKey).find(".firmname").text();
                    AjaxCallMarkAsDuplicate(Callid, Rowid1, hasRemarkValue, firmname)

                }
                return false;
            });

        this.addClass('labels').on('contextmenu:focus', function (e) {
            // setup some awesome stuff
        }).on('contextmenu:blur', function (e) {
            // tear down whatever you did
        }).on('keydown', function (e) {
            // some funky key handling, maybe?
        });

    };
    //For Customer Code Filter
    $.contextMenu.types.DefferCall1 = function (key, options, item, opt, root) {
        // this === item.$node
        //var Rowid1 = options.$trigger[0].cells[0].children[0].childNodes[0].id;
        var id = item.$trigger[0].children[0].id
        var RowId = "#" + id
        var CallId = $(RowId).find(".callid").text();
        //if ($(item.$trigger[0]).hasClass("red")) {
        //    //var id = item.$trigger[0].children[0]
        //    // var RowId = "#tr-" + id
        //    CallId = $(RowId).children(1)[2].innerText;
        //} else {
        //    // var id = item.$trigger[0].children[0]
        //    //var RowId = "#tr-" + id
        //    CallId = $(RowId).children(1)[1].innerText;
        //}
        $('<span>Date'
            + ' <input id="NextActionDateContext" name="NextActionDate" type="datetime-local" style="width:80%; max-width:100px; margin:0 6px; color:black" /><div class="btn btn-success DateBtn" id="DefferDate" style="width:26px; border-radius:50%;"><i class="glyphicon glyphicon-ok"></i></div>')
            .appendTo(this)
            .on('click', '#DefferDate', function () {
                var NextDate = $("#NextActionDateContext").val();
                if (NextDate != undefined && NextDate != "") {
                    $.ajax({
                        type: "GET",
                        url: "/CRM/DefferCalls",
                        contentType: "application/json; charset=utf-8",
                        datatype: "json",
                        data: { Callid: CallId, NextActionDate: NextDate, calltype: "C" },
                        success: function (data) {
                            if (data.statusCode == 500) {
                                window.location.href = "/Home/Error";
                            }

                            if (data == "") {
                                window.location.href = "/Home/LogOut";
                                return true;
                            }
                            else {
                                $('#CallClosedContent').html();
                                $('#CallClosed').modal(options);
                                var Mtitle = "Call Deffered Successfully"
                                ShowMsg(Mtitle, "success");

                                //$('#CallClosed .modal-title').text(Mtitle);
                                //$('#CallClosed').modal('show');
                                //setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);
                            }
                        },
                        error: function () {
                            $('#CallClosedContent').html();
                            $('#CallClosed').modal(options);
                            var Mtitle = "An error Occured.Please try again."
                            ShowMsg(Mtitle, "error");

                            //$('#CallClosed .modal-title').text(Mtitle);
                            //$('#CallClosed').modal('show');
                        }
                    });
                } else {
                    $('#CallClosedContent').html();
                    $('#CallClosed').modal(options);
                    var Mtitle = "Please enter dateTime."
                    ShowMsg(Mtitle, "info");

                    //$('#CallClosed .modal-title').text(Mtitle);
                    //$('#CallClosed').modal('show');
                }
            });
        this.addClass('labels').on('contextmenu:focus', function (e) {
            // setup some awesome stuff
        }).on('contextmenu:blur', function (e) {
            // tear down whatever you did
        }).on('keydown', function (e) {
            // some funky key handling, maybe?
        });
    };

    $.contextMenu.types.CustomerName1 = function (key, options, item, opt, root) {
        // this === item.$node
        //var Rowid1 = options.$trigger[0].cells[0].children[0].childNodes[0].id;
        $('<span>Customer Name'
            + '<form  id="CustNameFilter"> <input id="TxtCustomerName" name="TxtCustomerName" type="text" style="width:150px; color:black" /><div class="btn btn-success DateBtn" id="SubmitCustName" style="padding: 2px 5px 1px 5px; margin-bottom: 5px";><i class="glyphicon glyphicon-ok"></i></div></form>')
            .appendTo(this)
            .on('click', '#SubmitCustName', function () {
                //alert("Clicked");
                // Session["taskId"].val;
                if ($("#TxtCustomerName").val() != "" || $("#TxtCustomerName").val() != "undefined") {
                    var empName = $("#TxtCustomerName").val();
                    var col = "m1.Firmname";
                    var search = empName + "," + col + ":string";
                    JSON.stringify(search);
                    sessionStorage.setItem("search", search);
                    var pSize = sessionStorage.getItem(regPageSizeKey);
                    $("#example div").remove();
                    $("#example").height(0);
                    $("#loading").show();
                    $('#loadingmessage').show();
                    gf1 = "CustName";
                    $.ajax({
                        url: '/CRM/AjaxAllRegCallsData',
                        type: "POST",
                        data: { start: 0, pSize: pSize, search: search },
                        success: function (data) {
                            if (data.statusCode == 500) {
                                window.location.href = "/Home/Error";
                            }
                            else {
                                $("#fText").text(empName);
                                $("#FilterText").show();
                                sessionStorage.setItem("Total", data.recordsTotal);
                                loadData(data);
                            }
                        },
                        error: function (data) {
                            alert("Failed");
                        }
                    });
                }
                return false;
                $(".btn-success").attr("disabled", true);
                //  $("#DefferTask").submit();        //Commented by Shweta
            });
        this.addClass('labels').on('contextmenu:focus', function (e) {
            // setup some awesome stuff
        }).on('contextmenu:blur', function (e) {
            // tear down whatever you did
        }).on('keydown', function (e) {
            // some funky key handling, maybe?
        });
    };
    $.contextMenu.types.Location = function (key, options, item, opt, root) {
        // this === item.$node
        //var Rowid1 = options.$trigger[0].cells[0].children[0].childNodes[0].id;
        $('<span>Location'
            + '<form  id="LocationFilter"> <input id="TxtLoc"  type="text" style="width:150px; color:black" /><div class="btn btn-success DateBtn" style="padding: 2px 5px 1px 5px; margin-bottom: 5px;" id="SubmitLocation"><i class="glyphicon glyphicon-ok"></i></div></form>')
            .appendTo(this)
            .on('click', '#SubmitLocation', function () {
                //alert("Clicked");
                // Session["taskId"].val;
                if ($("#TxtLoc").val() != "" || $("#TxtLoc").val() != "undefined") {
                    var empName = $("#TxtLoc").val();
                    var col = "m1.Location";
                    var search = empName + "," + col + ":string";
                    JSON.stringify(search);
                    sessionStorage.setItem("search", search);
                    var pSize = sessionStorage.getItem(regPageSizeKey);
                    alert(search);
                    $("#example div").remove();
                    $("#example").height(0);
                    $("#loading").show();
                    $('#loadingmessage').show();

                    $.ajax({
                        url: '/CRM/AjaxAllRegCallsData',
                        type: "POST",
                        data: { start: 0, pSize: pSize, search: search },
                        success: function (data) {
                            if (data.statusCode == 500) {
                                window.location.href = "/Home/Error";
                            }
                            else {
                                $("#fText").text(empName);
                                $("#FilterText").show();
                                sessionStorage.setItem("Total", data.recordsTotal);
                                loadData(data);
                            }
                        },
                        error: function (data) {
                            alert("Failed");
                        }
                    });
                }
                return false;
                $(".btn-success").attr("disabled", true);
                //  $("#DefferTask").submit();        //Commented by Shweta
            });
        this.addClass('labels').on('contextmenu:focus', function (e) {
            // setup some awesome stuff
        }).on('contextmenu:blur', function (e) {
            // tear down whatever you did
        }).on('keydown', function (e) {
            // some funky key handling, maybe?
        });
    };
    $.contextMenu({
        selector: '#example div.parentdiv',
        build: function ($trigger) {
            var options = {
                callback: function (key, options) {
                    var divid = options.$trigger[0].id;
                    var temp = divid.split("-");
                    var id = temp[1];
                    var Rowid = "#tr-" + id;
                    var Callid = '';


                    switch (key) {
                        //function add Remark modal
                        case "AddRemark":
                            var Rowid = "#tr-" + id;
                            var Callid = $(Rowid).find(".callid").text();
                            //$('#issueId').val(id);
                            var firmname = $(Rowid).find(".firmname").text();
                            //if ($(Rowid).parent().hasClass("red")) {
                            //    var Callid = $(Rowid).children(1)[2].innerText;
                            //    var firmname = $(Rowid).children(1)[4].innerText;
                            //} else {
                            //    if ($(Rowid).children(1).hasClass("numberCircle")) {
                            //        Callid = $(Rowid).children(1)[2].innerText;
                            //    }
                            //    else {
                            //        var Callid = $(Rowid).children(1)[1].innerText;
                            //    }
                            //    var firmname = $(Rowid).children(1)[3].innerText;
                            //}
                            $('#issueId').val(Callid);
                            $('#Remark').modal(options);
                            var Mtitle = "Firm Name :  " + firmname;
                            $('#Remark .modal-title').text(Mtitle);
                            $('#Remark').modal('show');
                            break;

                        //function to show remarks model
                        case "ViewRemarks":
                            var Rowid = "#tr-" + id;
                            var Callid = $(Rowid).find(".callid").text();
                            //if ($(Rowid).parent().hasClass("red")) {
                            //    Callid = $(Rowid).children(1)[2].innerText;
                            //} else {
                            //    if ($(Rowid).children(1).hasClass("numberCircle")) {
                            //        Callid = $(Rowid).children(1)[2].innerText;
                            //    }
                            //    else {
                            //        Callid = $(Rowid).children(1)[1].innerText;
                            //    }
                            //}
                            $.ajax({
                                type: "POST",
                                url: "/CRM/AddRemarkData",
                                data: { CallId: Callid },
                                success: function (data) {
                                    if (data.statusCode == 500) {
                                        window.location.href = "/Home/Error";
                                    }

                                    if (data == "") {
                                        window.location.href = "/Home/LogOut";
                                        return true;
                                    }
                                    ;

                                    $(".popover-content").css("height", "200px")
                                    $(".popover-content").css("overflow-y", "scroll")
                                    //loadData1(data);
                                    $("#ShowRemarkContent").empty();
                                    var tblEmployee1 = $("#ShowRemarkContent");
                                    //$(".popover-content #LoadingData").css('display', 'none');
                                    var a = 1;
                                    $.each(data.data, function (index, item) {
                                        var m = (a) + index;
                                        var more1 = $("<div class='col-md-12 vr'  style='display:flex; margin-bottom:10px; color:black; padding-left:0px; ' id='" + item.CRMCommunication_key + "'  class='col-md-12'>" + m + "</div>");
                                        more1.html(("<div class='col-md-1 vr1' style='margin-left: 0px; padding-left: 10px;padding-right: 18px; width:11%;'>" + m + "</div>")
                                            + " " + ("<div class='col-md-3 vr2' style='width: 40%; text-align:left;padding:0;' >" + item.Commtext + "</div>")
                                            + " " + ("<div class='col-md-4 vr3' style='width: 22%; padding-left: 0px; padding-right: 0px; text-align:left;'  >" + item.TextCommunicationType + " </div>")
                                            + " " + ("<div class='col-md-2 vr4' style='padding-left: 0px; width: 25%; padding-right: 10px;text-align: left;'>" + item.FrmtCreationDate + " </div>")
                                            + " " + ("<div class='col-md-2 vr5' style='width:23%; padding-left:5px; text-align:left; padding-right:0px'>" + item.TextLogincode + "</div><div class='col-md-1'></div>")
                                        );
                                        tblEmployee1.append(more1);
                                    });

                                    if (data.recordsTotal == 0) {
                                        $(".popover-content #LoadingData").css('display', 'block');
                                        tblEmployee1.text('No Data');
                                    } else {
                                        $(".popover-content #LoadingData").css('display', 'none');
                                        //tblEmployee1.text('');
                                    }
                                },
                                error: function () {
                                    alert("Error in loading data")
                                }
                            });
                            $('#ViewRemarks').modal(options);
                            $('#ViewRemarks').modal('show');
                            event.preventDefault();
                            break;


                        // function to show call assign too modal
                        case "CallAssignTo":
                            popOverOpen = false
                            var RowId = "#tr-" + id
                            var callId = $(RowId).find(".callid").text();
                            //if ($(RowId).parent().hasClass("red")) {
                            //    callId = $(RowId).children(1)[2].innerText
                            //} else {
                            //    if ($(Rowid).children(1).hasClass("numberCircle")) {
                            //        Callid = $(Rowid).children(1)[2].innerText;
                            //    }
                            //    else {
                            //        callId = $(RowId).children(1)[1].innerText
                            //    }
                            //}
                            $("#PCall").val(callId);
                            $('#Assignedto').modal(options);
                            $('#Assignedto').modal('show');
                            break;

                        //Function for call close modal
                        case "CallClose":
                            var RowId = "#tr-" + id
                            var CustName = $(RowId).find(".firmname").text();
                            var callId = $(RowId).find(".callid").text();
                            //if ($(RowId).parent().hasClass("red")) {
                            //    CustName = $(RowId).children(1)[4].innerText;
                            //    callId = $(RowId).children(1)[2].innerText
                            //} else {
                            //    CustName = $(RowId).children(1)[3].innerText;
                            //    callId = $(RowId).children(1)[1].innerText
                            //}
                            var hasRemarkid = "#HasRemark-" + id
                            var hasRemarkValue = $(hasRemarkid).val();
                            if (hasRemarkValue === "Y") {
                                $.ajax({
                                    type: "GET",
                                    url: "/CRM/CallClosed",
                                    contentType: "application/json; charset=utf-8",
                                    datatype: "json",
                                    data: { Pid: callId },
                                    success: function (data) {
                                        if (data.statusCode == 500) {
                                            window.location.href = "/Home/Error";
                                        }

                                        var Mtitle
                                        //$('#CallClosedContent').html();
                                        //$('#CallClosed').modal(options);
                                        //$('#CallClosed').modal('show');

                                        if (data == "NoRemarkAfterLastCall") {
                                            Mtitle = "There is no remark after Last Call.Please add remark to close call :" + "  " + CustName;
                                            ShowMsg(Mtitle, "info");
                                            //$('#CallClosed .modal-title').text(Mtitle);
                                        } else if (data == "CustomerNotLink") {
                                            Mtitle = "Call is not linked to customer, please link customer , then close the call."
                                            ShowMsg(Mtitle, "info");
                                            //$('#CallClosed .modal-title').text(Mtitle);
                                        } else if (data == "CallNotAssigned") {
                                            Mtitle = "Call is not Assigned, please Assign call , then close the call."
                                            ShowMsg(Mtitle, "info");
                                            //$('#CallClosed .modal-title').text(Mtitle);
                                        } else if (data == "CallNotAssignedtoLoggedInEmployee") {
                                            Mtitle = "Call can only be closed by whomever it is assigned!"
                                            ShowMsg(Mtitle, "error");
                                            //$('#CallClosed .modal-title').text(Mtitle);
                                        } else {
                                            Mtitle = "Call Closed Successfully :" + "  " + CustName;
                                            ShowMsg(Mtitle, "success");
                                            //$('#CallClosed .modal-title').text(Mtitle);
                                            var MainDivid = "#MainDiv-" + id
                                            $(MainDivid).remove();
                                            //setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);
                                        }
                                    },
                                    error: function (data) {
                                        //Changed Shweta
                                        //alert("An error occured.Please try again later.");
                                        //$('#CallClosedContent').html();
                                        //$('#CallClosed').modal(options);
                                        var Mtitle = "Call is not linked to customer, please link customer , then close the call."
                                        ShowMsg(Mtitle, "error");
                                        //$('#CallClosed .modal-title').text(Mtitle);
                                        //$('#CallClosed').modal('show');

                                    }
                                });
                            } else {
                                //$('#CallClosedContent').html();
                                //$('#CallClosed').modal(options);
                                var Mtitle = "Please add Remark to close Call!"
                                ShowMsg(Mtitle, "info");
                                //$('#CallClosed .modal-title').text(Mtitle);
                                //$('#CallClosed').modal('show');
                            }

                            break;

                        //function for onsite service modal
                        case "OnsiteVisit":
                            var OId = "#Onsite-" + id;
                            var RowId = "#tr-" + id
                            var callId = $(RowId).find(".callid").text();
                            //if ($(RowId).parent().hasClass("red")) {
                            //    callId = $(RowId).children(1)[2].innerText
                            //} else {
                            //    callId = $(RowId).children(1)[1].innerText
                            //}
                            $.ajax({
                                type: "POST",
                                url: "/CRM/GetCurrentOnsiteVisit",
                                data: { PCall: callId },
                                success: function (data) {
                                    if (data.statusCode == 500) {
                                        window.location.href = "/Home/Error";
                                    }

                                    if (data == "") {
                                        window.location.href = "/Home/LogOut";
                                        return true;
                                    } else {
                                        $("#Onsitevisit").text("Current Onsite Visits: " + data);
                                    }
                                }
                            })

                            $("#PCall1").val(callId);
                            $("#CalledFrom").val("ManageAllRegCalls");
                            $('#OnsiteModal').modal(options);
                            $('#OnsiteModal').modal('show');
                            break;

                        //function to show msgto customer modal
                        case "MsgToCustomer":
                            var RowId = "#tr-" + id
                            var CustName = $(RowId).find(".firmname").text();
                            var PCall = $(RowId).find(".callid").text();
                            var phone = $(RowId).find(".mobno").text();
                            //if ($(RowId).parent().hasClass("red")) {
                            //    CustName = $(RowId).children(1)[4].innerText;
                            //    PCall = $(RowId).children(1)[2].innerText;
                            //    phone = $(RowId).children(1)[6].innerText;
                            //} else {
                            //    CustName = $(RowId).children(1)[3].innerText;
                            //    PCall = $(RowId).children(1)[1].innerText;
                            //    phone = $(RowId).children(1)[5].innerText;
                            //}


                            $("#PCallMsgToCustomer").val(PCall);
                            $("#Mobileno").val(phone);
                            $("#firmNameMsgtoCustomer").val(CustName);
                            $('#MsgCustomer').modal(options);
                            var Mtitle = "Message to Customer: " + CustName;
                            $('#MsgCustomer .modal-title').text(Mtitle);
                            $('#MsgCustomer').modal('show');
                            break;

                        //function to show mailtocustomer model
                        case "MailToCustomer":
                            var RowId = "#tr-" + id
                            var CustName = $(RowId).find(".firmname").text();
                            var PCall = $(RowId).find(".callid").text();
                            //if ($(RowId).parent().hasClass("red")) {
                            //    CustName = $(RowId).children(1)[4].innerText;
                            //    PCall = $(RowId).children(1)[1].innerText;
                            //} else {
                            //    CustName = $(RowId).children(1)[3].innerText;
                            //    PCall = $(RowId).children(1)[1].innerText;
                            //}
                            $("#PCallMailToCustomer").val(PCall);
                            $("#firmNameMailtoCustomer").val(CustName);
                            $('#MailToCustomer').modal(options);
                            var Mtitle = "Mail To Customer: " + CustName;
                            ShowMsg(Mtitle, "info");

                            //$('#CallClosed .modal-title').text(Mtitle);
                            //$('#MailToCustomer').modal('show');
                            break;

                        //function to show addcollaborator model
                        case "AddCollaborator":
                            var Rowid = "#tr-" + id;
                            var TaskPid = $(Rowid).find(".callid").text();
                            //if ($(Rowid).parent().hasClass("red")) {
                            //    var TaskPid = $(Rowid).children(1)[2].innerText;
                            //} else {
                            //    var TaskPid = $(Rowid).children(1)[1].innerText;
                            //}
                            $('#CallCollaborators #PCall').val(TaskPid);
                            $('#CallCollaborators').modal(options);
                            $('#CallCollaborators').modal('show');
                            break;

                        //function to show ShowCollaborators model
                        case "ShowCollaborators":
                            var Rowid = "#tr-" + id;
                            var CallPid = $(Rowid).find(".callid").text();
                            var CustName = $(Rowid).find(".firmname").text();
                            //if ($(Rowid).parent().hasClass("red")) {
                            //    var CallPid = $(Rowid).children(1)[2].innerText;
                            //    var CustName = $(Rowid).children(1)[4].innerText;
                            //} else {
                            //    var CallPid = $(Rowid).children(1)[1].innerText;
                            //    var CustName = $(Rowid).children(1)[3].innerText;
                            //}
                            var Mtitle = "Collaborators: " + CustName;

                            $.ajax({
                                type: "POST",
                                url: "/CRM/AddCallCollaboratorsData",
                                data: { CallId: CallPid, calltype: "C" },
                                success: function (data) {
                                    if (data.statusCode == 500) {
                                        window.location.href = "/Home/Error";
                                    }

                                    if (data == "") {
                                        window.location.href = "/Home/LogOut";
                                        return true;
                                    }
                                    ;
                                    //loadData1(data);

                                    var tblEmployee1 = $("#ShowCollaborators");
                                    $("#ShowCollaborators").empty();
                                    //$(".popover-content #LoadingData").css('display', 'none');
                                    var a = 1;
                                    $.each(data.data, function (index, item) {
                                        var m = (a) + index;

                                        var more1 = $("<div style='display:flex; height:20px; margin-bottom:10px; padding-left:0px' id='" + item.CRMCollaborator_key + "'  class='col-md-12 body'>" + m + "</div>");
                                        more1.html(("<div class='col-md-2 ViewcollaboratorsSno ' style='text-align: center;'>" + m + "</div>")
                                            + " " + ("<div class='col-md-8 ViewcollaboratorsEmpName' style='text-align:center;' >" + item.TxtCollaborator + "</div>")
                                            + " " + ("<div class='col-md-2 ViewcollaboratorsClose' style='padding-right: 0px; padding-left: 30px;' ><a class='' id='" + item.CRMCollaborator_key + "' onclick='deleteCollaborator(this.id)' style='cursor: pointer;'><i class='glyphicon glyphicon-remove'></i></a></div>")
                                        );
                                        tblEmployee1.append(more1);
                                    });

                                    $("#loading1").css("display", "none")
                                    if (data.recordsTotal == 0) {
                                        $(".popover-content #LoadingData").css('display', 'block');
                                        $(".popover-content #LoadingData").text('No Data');
                                    } else {
                                        $(".popover-content #LoadingData").css('display', 'none');
                                        $(".popover-content #LoadingData").text('');
                                    }
                                },
                                error: function () {
                                    alert("Error in loading data")
                                }
                            });
                            $('#ViewCollaborator >.modal-title').text(Mtitle)
                            $('#ViewCollaborator').modal(options);
                            $('#ViewCollaborator').modal('show');
                            event.preventDefault();
                            break;

                        //function to show LinkCustomer model
                        case "ShowLinkCustomerModal":
                            var Rowid = "#tr-" + id;
                            var CallPid = $(Rowid).find(".callid").text();
                            //var CustName = '';
                            var Mobileno = $(Rowid).find(".mobno").text();
                            //if ($(Rowid).parent().hasClass("red")) {
                            //    CallPid = $(Rowid).children(1)[2].innerText;
                            //    Mobileno = $(Rowid).children(1)[6].innerText;
                            //} else {
                            //    CallPid = $(Rowid).children(1)[1].innerText;
                            //    Mobileno = $(Rowid).children(1)[5].innerText;
                            //}
                            $("#LinkCustomerCallId").val(CallPid);
                            $('#LinkCustomer').modal(options);
                            $('#LinkCustomer').modal('show');
                            break;
                        //function to show Edit model
                        case "Edit":
                            var Rowid = "#tr-" + id;
                            var CallPid = $(Rowid).find(".callid").text();
                            //var CustName = '';
                            //if ($(Rowid).parent().hasClass("red")) {
                            //    var CallPid = $(Rowid).children(1)[2].innerText;
                            //} else {
                            //    var CallPid = $(Rowid).children(1)[1].innerText;
                            //}

                            window.location = '/CRM/EditRegCalls?P_allCallReg=' + CallPid + '&CalledFrom=ManageAllRegCalls'
                            break;
                        case "DeferCall":
                            var options = {
                                "backdrop": "static",
                                keyboard: true
                            };
                            $('#DeferCall').modal(options);
                            $('#DeferCall').modal('show');
                            position: [100, 200],
                                $(".LoaderOverlay").hide();
                            break;

                        case "CallEngage":
                            popOverOpen = false
                            var Rowid = "#tr-" + id;
                            var Callid = $(Rowid).find(".callid").text();
                            var firmname = $(Rowid).find(".firmname").text();

                            //if ($(Rowid).parent().hasClass("red")) {
                            //    Callid = $(Rowid).children(1)[2].innerText;
                            //    firmname = $(Rowid).children(1)[4].innerText;
                            //} else {
                            //    Callid = $(Rowid).children(1)[1].innerText;
                            //    firmname = $(Rowid).children(1)[3].innerText;
                            //}
                            $('#callId').val(Callid);
                            $('#EngageStatus').modal(options);
                            var Mtitle = "Firm Name :  " + firmname;
                            $('#EngageStatus .modal-title').text(Mtitle);
                            $('#EngageStatus').modal('show');
                            break;
                        //9) function to redirect to  view Setting controller
                        case "ViewSetting":
                            window.location = '/Configuration/ManageViewSettings?infotype=hoverstripstring&viewid=manageregcalls'
                            break;
                    }
                },
                //10) blank array on item property
                items: {},
                //    items: {
                //        "AddRemark": { name: "Add Remarks", icon: "fa-comment-o" },
                //        "ViewRemarks": { name: "View Remarks", icon: "fa-list" },
                //        "CallAssignTo": { name: "Call Assign To", icon: "fa-phone" },
                //        "CallClose": { name: "Call Closed", icon: "fa-close", css: "height'15px'" },
                //        "OnsiteVisit": { name: "Onsite Service", icon: "fa-suitcase" },
                //        "ContactCustomer": {
                //            name: "Contact Customer", icon: "fa-address-book",
                //            "items": {
                //                "MsgToCustomer": { name: "Msg To Customer", icon: "fa-mobile", css: "height'25px'" },
                //                "MailToCustomer": { name: "Mail To Customer", icon: "fa-envelope-o" }
                //            }
                //        },
                //        "Collaborators": {
                //            name: "Collaborators", icon: "fa-users",
                //            "items": {
                //                "AddCollaborator": { name: "Add Collaborator", icon: "fa-plus" },
                //                "ShowCollaborators": { name: "View Collaborator", icon: "fa-eye" },
                //            }
                //        },
                //        "ShowLinkCustomerModal": { name: "Link Customer", icon: "fa-link" },
                //        "Edit": { name: "Edit", icon: "fa-pencil" },
                //        "MarkAsDuplicate": {
                //            name: "Mark As Duplicate", icon: "fa-clone",
                //            "items": {
                //                "input": {
                //                    type: 'input', customName: 'input', callback: HTMLInputElement
                //                }
                //            }
                //        },
                //        "DefferCall": {
                //            name: "Deffer Call", icon: "fa-clock-o",
                //            "items": {
                //                "CustCode1": {
                //                    type: 'DefferCall1', customName: 'DefferCall1', callback: HTMLInputElement
                //                }
                //            }
                //        },
                //        "CallEngage": {
                //            name: "Call Engage Status", icon: "fa-user",
                //            //"items": {
                //            //    "CallEngagectrls": {
                //            //        type: 'CallEngagectrls', customName: 'select', callback: HTMLSelectElement
                //            //    }
                //            //}
                //        },
                //        "Filter": {
                //            name: "Filter", icon: "fa-filter",
                //            "items": {
                //                "CustomerName": {
                //                    name: "Customer Name", icon: "fa-user",
                //                    "items": {
                //                        "CustomerName1": {
                //                            type: 'CustomerName1', customName: 'CustomerName1', callback: HTMLInputElement
                //                        }
                //                    }
                //                },
                //                "ServicingDealer": { name: "Servicing Dealer", icon: "fa-user-circle-o" },
                //                "HomeTown": {
                //                    name: "Home Town", icon: "fa-home", "items": {
                //                        "Location": {
                //                            type: 'Location', customName: 'Location', callback: HTMLInputElement
                //                        }
                //                    }
                //                },
                //            }

                //        }
                //    },
            }
            //11) for loop which we use in stpe , but this is for context menu
            if ($trigger.hasClass('parentdiv')) {
                var infoStringArray = infoString.split("~");
                var infoStringArray = infoString.split("~");
                for (var i = 0; i <= infoStringArray.length - 1; i++) {
                    var infoStringItemArray = infoStringArray[i].split("#");
                    var itemOrder = infoStringItemArray[0];
                    var itemEnable = infoStringItemArray[1];
                    var itemtext = $.trim(infoStringItemArray[2]);
                    //if (itemtext.toLocaleLowerCase() == "call engage") {
                    //    if (itemEnable.toLocaleLowerCase() == "y") {
                    //        options.items.CallEngage = { name: "Call Engage Status", icon: "fa-user" };
                    //    }
                    //}
                    //else if (itemtext.toLocaleLowerCase() == "link customer") {
                    //    if (itemEnable.toLocaleLowerCase() == "y") {
                    //        options.items.ShowLinkCustomerModal = { name: "Link Customer", icon: "fa-link" };
                    //    }
                    //}
                    //else if (itemtext.toLocaleLowerCase() == "add remarks") {
                    //    if (itemEnable.toLocaleLowerCase() == "y") {
                    //        //options.items.AddRemark = { name: "Add Remarks", icon: "fa-comment-o" };   
                    //        options.items.AddRemark = { name: "Add Progress Note", icon: "fa-comment-o" };
                    //    }
                    //}
                    if (itemtext.toLocaleLowerCase() == "view remarks") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            //options.items.ViewRemarks = { name: "View Remarks", icon: "fa-list" };
                            options.items.ViewRemarks = { name: "View Progress Note", icon: "fa-list" };
                        }
                    }
                    //else if (itemtext.toLocaleLowerCase() == "call assign to") {
                    //    if (itemEnable.toLocaleLowerCase() == "y") {
                    //        options.items.CallAssignTo = { name: "Call Assign To", icon: "fa-phone" }
                    //    }
                    //}

                    //else if (itemtext.toLocaleLowerCase() == "edit") {
                    //    if (itemEnable.toLocaleLowerCase() == "y") {
                    //        options.items.Edit = { name: "Edit", icon: "fa-pencil" };
                    //    }
                    //}

                    //else if (itemtext.toLocaleLowerCase() == "call closed") {
                    //    if (itemEnable.toLocaleLowerCase() == "y") {
                    //        options.items.CallClose = { name: "Call Closed", icon: "fa-close", css: "height'15px'" };
                    //    }
                    //}
                    //else if (itemtext.toLocaleLowerCase() == "onsite service") {
                    //    if (itemEnable.toLocaleLowerCase() == "y") {
                    //        options.items.OnsiteVisit = { name: "Onsite Service", icon: "fa-suitcase" };
                    //    }
                    //}
                    //else if (itemtext.toLocaleLowerCase() == "defercall") {
                    //    if (itemEnable.toLocaleLowerCase() == "y") {
                    //        options.items.DefferCall = {
                    //            name: "Deffer Call", icon: "fa-clock-o",
                    //            "items": {
                    //                "CustCode1": {
                    //                    type: 'DefferCall1', customName: 'DefferCall1', callback: HTMLInputElement
                    //                }
                    //            }
                    //        };
                    //    }
                    //}
                    //else if (itemtext.toLocaleLowerCase() == "contact customer") {
                    //    if (itemEnable.toLocaleLowerCase() == "y") {
                    //        options.items.ContactCustomer = {
                    //            name: "Contact Customer", icon: "fa-address-book",
                    //            "items": {
                    //                "MsgToCustomer": { name: "Msg To Customer", icon: "fa-mobile", css: "font-size'25px'" },
                    //                "MailToCustomer": { name: "Mail To Customer", icon: "fa-envelope-o" }
                    //            }
                    //        };
                    //    }
                    //}
                    //else if (itemtext.toLocaleLowerCase() == "mark duplicate") {
                    //    if (itemEnable.toLocaleLowerCase() == "y") {
                    //        options.items.MarkAsDuplicate = {
                    //            name: "Mark As Duplicate", icon: "fa-clone",
                    //            "items": {
                    //                "input": {
                    //                    type: 'input', customName: 'input', callback: HTMLInputElement
                    //                }
                    //            }
                    //        };

                    //    }
                    //}
                    //else if (itemtext.toLocaleLowerCase() == "collaborators") {
                    //    if (itemEnable.toLocaleLowerCase() == "y") {
                    //        options.items.Collaborators = {
                    //            name: "Collaborators", icon: "fa-users",
                    //            "items": {
                    //                "AddCollaborator": { name: "Add Collaborator", icon: "fa-plus" },
                    //                "ShowCollaborators": { name: "View Collaborator", icon: "fa-eye" },
                    //            }
                    //        };
                    //    }
                    //}
                    //else if (itemtext.toLocaleLowerCase() == "mail to dealer") {
                    //    if (itemEnable.toLocaleLowerCase() == "y") {
                    //        options.items.MailToDealer = { name: "Mail To Dealer", icon: "fa-envelope" };
                    //    }
                    //}

                }
                //12) at last Show context menu which redirect to viewSetting Contoller
                options.items.ViewSetting = { name: "Customize HoverStrip", icon: "glyphicon glyphicon-wrench" };

            }
            return options;
        }
    });
});










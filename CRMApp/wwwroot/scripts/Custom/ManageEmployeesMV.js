
var options = { "backdrop": "static", keyboard: true };
var popOverOpen = false;
var CurrentHoverRowId = 0;
var CollabPopOpen = false
//1) global variable for viewSettings
var infoString = "";

//this is a sessionStorageKey for Search
var searchKey = "searchManageEmployee";
//this is a sessionStorageKey for order
var orderKey = "orderManageEmployee";
//this is a sessionStorageKey for search Criteria div value
var searchMsgKey = "searchMsgManageEmployee";
//this is a sessionStorageKey for basicFilter UI consistency on Page Reload
var basicFilterStrKey = "basicFilterStrManageEmployee";


CallView();
function CallView() {
    if ($(window).width() > 700) {
        window.location = '/Configuration/ManageEmployees';
    }
}

function loadData(data) {
    var tblEmployee = $("#example");
    $("#example div").remove();
    var a = data.draw;
    if ($("#Next").hasClass("disabledbutton") == true) { $("#Next").removeClass("disabledbutton"); }
    if ($("#Prev").hasClass("disabledbutton") == true) { $("#Prev").removeClass("disabledbutton"); }
    var d = sessionStorage.getItem("PageSize");
    if (d == null || d == 0 || d == "undefined") { d = 50; sessionStorage.setItem("PageSize", d); };
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

    $.each(data.data, function (index, item) {
        var Parentdiv = "";
        var MoreDetailsdiv = "";

        //Parentdiv = $("<div id='MainDiv-" + item.Employees_Key + "' class='col-md-12  clickable parentdiv' style='padding-left:2px; padding-right:2px;'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        Parentdiv = $("<div id='MainDiv-" + item.Employees_Key + "' class='col-md-12  clickable parentdiv' style='padding-left:2px; padding-right:2px;'></div>");
        MoreDetailsdiv = $(("<div  class='MoreDetails' id='" + item.Employees_Key + "' > </div>"))

        tblEmployee.append(Parentdiv);
        m = m + 1;
        var div = $("<div id='tr-" + item.Employees_Key + "'  style=' position:relative; background-color: white; min-height:65px;  width:100%;  margin-bottom:15px; padding:13px; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; border-radius:5px; font-size:13px; font-family: verdana,arial,sans-serif; padding-right:3px; padding-left:18px;'></div>");
        div.html(("<div class='row' style='color:#4f4f4f; display:block; padding-left:0px; padding-right:25px;'> <span class= 'nameValue' style = 'color:#4f4f4f; width:100%; padding-top:8px;' > <i class='fa fa-user' style=' padding-right: 14px; font-size:16px; color: #337ab7;'></i>" + item.EmpName + "</span> <span class='empIdValue' style='font-size:12px; float:right; text-align:right; right:0px; font-weight:bold;'>" + item.P_Employees + "</span><span class='empP_acccode' style='display:none'>" + item.P_acccode + "</span></div>")
            //+ " " + ("<div class='nameValue' style='color:#4f4f4f; width:100%; padding-top:8px;'><i class='fa fa-user' style=' padding-right: 14px; font-size:16px; color: #337ab7;'></i>" + item.EmpName + "</div>")
            + " " + ("<div class='mobileValue' style='color:#4f4f4f; width:100%;padding-top:8px;'><i class='fa fa-phone' style=' padding-right: 14px; font-size:16px; color: #337ab7;'></i>" + item.MobNo + "</div>")
            + " " + ("<div class='mobileValue' style='color:#4f4f4f; width:100%;padding-top:8px;'><i class='fa fa-user' style=' padding-right: 14px; font-size:16px; color: #337ab7;'></i>" + item.userid + "</div>")
            + " " + ("<div class='emailValue' style='color:#4f4f4f; width:100%; padding-top:8px;'> <i class='fa fa-envelope' style=' padding-right: 14px; font-size:14px; color: #337ab7;'></i>" + item.Email + "</div>")
            + " " + (" <div class='departmentValue' style='color:#4f4f4f; width:100%; padding-top:8px;'> <img src='/images/Department-Icon.png'  style='font-size:14px;  padding-right: 10px; color: #337ab7;'> " + item.TxtDepartment + "</div> ")
            + " " + ("<div class='row' style='color:#4f4f4f; display:flow-root; padding-left:0px; padding-right:15px;'><span class='designationValue' style=' padding-top:8px; float: left; text-align:left;  padding-right: 10px;'> <i class='fa fa-briefcase' style=' padding-right: 10px; color: #337ab7;'></i>" + item.TxtDesignation + "</span> <span class='joiningValue' style='  padding-top:8px; float:right; width:50%; '> <i class='fa fa-calendar-check-o' style='color: #337ab7; padding-right: 10px;'></i>" + item.FrmtDateOfJoining + "</span> </div>")
            + " " + ("<div class='row col-md-12' style='color:#4f4f4f; display:block; padding-left:0px; padding-right:15px; padding-top:8px;'><span class='homeTownValue col-md-6' style='color:#4f4f4f;  padding-top:8px; padding-left:0px;'><i class='fa fa-map-marker' style='font-size:17px; color: #337ab7;  padding-right: 10px;'></i>" + item.TxtHomeTown + "</span><span class='col-md-6' style='float:right; color:#4f4f4f; width:50%; padding-left:0px;'><span style='color:#337ab7; font-weight:500;'>Status :</span>" + item.TxtStatus + "</span></div>"));
        //    + " " + ("<div class='' style='width:100%; color:#4f4f4f;'>" + item.TxtStatus + "</div>"));
        Parentdiv.append(div);

        //5) Operation to show hoverStrip menu
        var moreDetailsDivHtml = "";
        var moreDetailsDivPopoverDiv = "";
        for (var i = 0; i <= infoStringArray.length - 1; i++) {
            var infoStringItemArray = infoStringArray[i].split("#");
            var itemOrder = infoStringItemArray[0];
            var itemEnable = infoStringItemArray[1];
            var itemtext = $.trim(infoStringItemArray[2]);
            if (itemtext.toLocaleLowerCase() == "edit") {
                if (itemEnable.toLocaleLowerCase() == "y") {
                    moreDetailsDivHtml += "<a data-toggle='Edit&nbsp' href='/Configuration/EmployeesForm?P_Employee=" + item.P_Employees + "&exitmode=edit'>       <i class='glyphicon glyphicon-pencil' style='font-size:20px; color:#616A6B;padding-left:11px;' ></i></a>";
                }
            }
            else if (itemtext.toLocaleLowerCase() == "delete") {
                if (itemEnable.toLocaleLowerCase() == "y") {
                    moreDetailsDivHtml += "<a data-toggle='Delete&nbsp&nbsp&nbsp' href='/Configuration/EmployeesForm?P_Employee=" + item.P_Employees + "&exitmode=delete'>       <i class='glyphicon glyphicon-trash' style='font-size:20px; color:#616A6B;padding-left:11px;' ></i></a>";
                }
            }
            else if (itemtext.toLocaleLowerCase() == "importemployee") {
                if (itemEnable.toLocaleLowerCase() == "y") {
                    moreDetailsDivHtml += "<a data-toggle='Import Employees' onclick='OpenImportModal();'><i class='glyphicon glyphicon-import' style='font-size:20px; color:#616A6B;padding-left:11px;' ></i></a>";
                }
            }
        }

        //6) at last we show Customize HoverStrip menu and this will redirect to viewsetting controller
        moreDetailsDivHtml += "<a data-toggle='Customize Hover Strip' href='/Configuration/ManageViewSettings?infotype=hoverstripstring&viewid=manageemployees'><i class='fa fa-wrench'  style='font-size:22px; color:#616A6B; padding-left:11px;'></i></a>";

        //7) append anchore tag data on MoreDetailsDiv
        MoreDetailsdiv.append(moreDetailsDivHtml);
        //8) append popover_content_wrapper div on MoreDetailsDiv
        MoreDetailsdiv.append(moreDetailsDivPopoverDiv);

        div.append(MoreDetailsdiv);

    });
    if (data.data.length == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $('#loading').addClass('clickable');
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
    }
    Deviceheight();
}
function Deviceheight() {
    var Header = $("header").height();
    
    var icondiv = $(".calHeightIcon").height();
    
    var FilterSection = $(".FilterSection").height();
    var Footer = $(".main-footer").height();
    var windowHeight = $(window).height();
    
    var SumOfElementHeight = Header + FilterSection + icondiv + Footer;
    var MainHeight = windowHeight - SumOfElementHeight-60;
    
    $("#example").height(MainHeight);

}


function DeleteEmployee() {
    $("#deleteEmployee").modal("hide");
    var Pid = $("#deleteEmployeeForm #p_employees").val();
    var p_acccode = $("#deleteEmployeeForm #p_acccode").val();
    $.post('/Configuration/AjaxDeleteEmployee', { p_employees: Pid, p_acccode: p_acccode }, function (data) {
        if (data.toLowerCase() === "success") {
            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text("Deleted successfully");
            $('#CallClosed').modal("show");
            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
            ReloadGrid();
        }
        else {
            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text("Error while deleting");
            $('#CallClosed').modal("show");
            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        }
    });
}


$(document).ready(function () {
    var d = $("#fvalue").val();
    var m = [];
    m = d.split("|");
    var l;
    for (i = 0; i <= m.length - 1; i = i + 1) {
        l = m[i].split("~");
        var dropdown = $("#filter");
        $('#filter').append($('<option>', {
            value: l[1] + ":" + l[2],
            text: l[0]
        }));
    };

    $('a').tooltip();
    var a = 1;

    $("#filter").on("change", function () {
        var a = $("#filter").val();
        $(".filterDiv").css("display", "none")
        if (a != "0" && a != "1") {
            b = a.split(":");
            if (b[0] == 2) {
                var a = document.getElementById("dateC")
                a.style.display = "";
            } else if (b[0] == 3 || b[0] == 7 || b[0] == 4) {
                $("#TextC").css("display", "");
            } else if (b[0] == 6) {
                var a = document.getElementById("desC")
                a.style.display = "";
            }
            else if (b[0] == 5) {
                var a = document.getElementById("depC")
                a.style.display = "";
            }
            //else if (b[0] == 7) {
            //    var a = document.getElementById("depC")
            //    a.style.display = "";
            //}
            //else if (b[0] == 8) {
            //    $("#TextC").css("display", "");
            //}
        }
    });

    setBasicFilterUIOnPageReload();

    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 50 }
    var SelectedRows = "";
    //GetEmployeeData(a, 0, t);
    //sessionStorage.setItem("search", null);
    //2) get viewSetting data for current user
    getViewSettingData();
    setInterval(ReloadGrid(), 15 * 60 * 1000);//setting Interval of 15 minutes by which every 15 minutes grid is getting refresh.

    $("#Prev").on("click", function () {
        var a = sessionStorage.getItem("PageSize");
        //var b = sessionStorage.getItem("search");
        var b = sessionStorage.getItem(searchKey);
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
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d >= 0) {
            $.post('/Configuration/AjaxGetEmployeesData', { start: d, pSize: a, search: b, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });
    $("#Next").on("click", function () {
        var total = sessionStorage.getItem("Total");
        var a = sessionStorage.getItem("PageSize");
        //var c = sessionStorage.getItem("search");
        var c = sessionStorage.getItem(searchKey);
        var d = sessionStorage.getItem("start");
        
        //var o = sessionStorage.getItem("order");
        var o = sessionStorage.getItem(orderKey);

        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 40 - 1; }
        $("#example div").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/Configuration/AjaxGetEmployeesData', { start: d, pSize: a, search: c, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });

    $("#department").on("change", function () {
        var text = $("#department option:selected").text();
        var value = $("#department").val();
        var col = "department";
        var search = value + "," + col + ":integer";
        $(".filterclose").show();
        $(".filterclose").addClass("DatesMargin");
        JSON.stringify(search);
        //sessionStorage.setItem("search", search);
        var searchMsg = "Search Results: Department <span class='' style='font-weight: 600'>'" + text + "'</span>";
        var basicFilterStr = $("#filter").val() + "~#department:" + value;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem("PageSize");
        $("#example div").remove();
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Configuration/AjaxGetEmployeesData',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                //$("#fText").text(text);
                //$("#FilterText").show();
                //$(".filterDiv").css("display", "none")
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
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

    $("#designation").on("change", function () {
        var text = $("#designation option:selected").text();
        var value = $("#designation").val();
        var col = "designation";
        var search = value + "," + col + ":integer";
        $(".filterclose").show();
        $(".filterclose").addClass("DatesMargin");
        JSON.stringify(search);
        //sessionStorage.setItem("search", search);
        var searchMsg = "Search Results: Designation <span class='' style='font-weight: 600'>'" + text + "'</span>";
        var basicFilterStr = $("#filter").val() + "~#designation:" + value;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem("PageSize");
        $("#example div").remove();
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Configuration/AjaxGetEmployeesData',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                //$("#fText").text(text);
                //$("#FilterText").show();
                //$(".filterDiv").css("display", "none")
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
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
    //        var pSize = sessionStorage.getItem("RegPageSize");
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


    function getViewSettingData() {
        $.post('/Configuration/GetViewSettingData', { InfoType: "hoverstripstring", ViewId: "manageemployees" }, function (viewData) {
            //3) set Data to infoString (Global variable)
            infoString = viewData.Infostring;
        });
    }
   
});

function removeFilter() {
    $(".filterDiv").css("display", "none")
    $("#P_dealers").val(0);
    $("#IssueFilter").val(0);
    $("#assignto").val(0);
    $("#filter").val(0);
    $("#filterText").val("");
    $("#dateC #min").val("");
    $("#dateC #max").val("");
    $(".filterclose").hide();
    setSearchSessionStorage("");
    setOrderSessionStorage("");

    $(".resultDiv .result-msg").html("");
    $(".resultDiv").hide();
    ReloadGrid();
}

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
            col = "empname";
            search = ValueToSearch + "," + col + ":String";
            searchMsg = "Search Results: Employee Name <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        if (filter[0] == 4) {
            value = $("#filterText").val();
            col = "P_employees";
            search = ValueToSearch + "," + col + ":String";
            searchMsg = "Search Results: EmployeeId <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        if (filter[0] == 7) {
            value = $("#filterText").val();
            col = "mobno";
            search = ValueToSearch + "," + col + ":Integer";
            searchMsg = "Search Results: Mobile Number <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        $(".filterclose").show();
        $(".filterclose").addClass("DatesMargin");
        JSON.stringify(search);
        //sessionStorage.setItem("search", search);
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem("PageSize");
        $("#example div").remove();
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Configuration/AjaxGetEmployeesData',
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
function OpenImportModal() {
    $('#ImportEmployeeModal').modal('show');
}
function SubmitImportEmployees() {
    var formdata = new FormData(document.getElementById('importForm'))
    //Creating an XMLHttpRequest and sending
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/Configuration/ImportEmployeesFromExcel');
    xhr.send(formdata);
    $('#ImportEmployeeModal').modal("hide");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            ReloadGrid();
            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosedContent').html("<p class='text-center' style='font-size: 18px;margin-bottom: 30px;'>Employees Imported Successfully.</p>");
            $('#CallClosed').modal("show");
            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        }
    }
    return false;
}

function DateSearch() {

    value1 = $("#dateC #min").val();
    value2 = $("#dateC #max").val();
    col = "dateofjoining";
    search = value1 + "," + value2 + "," + col + ":Date";
    $(".filterclose").show();
    $(".filterclose").addClass("DatesMargin");
    var searchMsg = "Search Results: Date Of Joining From <span class='' style='font-weight: 600'>'" + value1 + "'</span> To <span class='' style='font-weight: 600'>'" + value2 + "'</span> ";
    JSON.stringify(search);
    //sessionStorage.setItem("search", search);
    var basicFilterStr = $("#filter").val() + "~#dateC #min:" + value1 + "|#dateC #max:" + value2;
    setSearchSessionStorage(search);
    setSearchMsgSessionStorage(searchMsg);
    setBasicFilterStrSessionStorage(basicFilterStr);
    var pSize = sessionStorage.getItem("PageSize");
    $("#example div").remove();
    $("#loading").show();
    $('#loadingmessage').show();

    $.ajax({
        url: '/Configuration/AjaxGetEmployeesData',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search },
        success: function (data) {
            // $("#fText").text(value);
            // $("#FilterText").show();
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
    $('.arrow').css('top', '-11px');
    $('.popover-content').css('width', '190px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-top', '3px');

    event.preventDefault();
}

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
    $('#loading').show();
    $('#loadingmessage').show();
    $.ajax({
        type: "POST",
        url: "/Configuration/AjaxGetEmployeesData",
        data: { id: "", start: start, pSize: PSize },
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

// function to close button on popover
function popoverClose() {
    popOverOpen = false
    $('.popover').hide();
    $('.MoreDetails').popover('hide');
    $("#ShowSubTaskControlDiv").popover('hide');
    $(".ShowRemark").popover('hide');
}



function ReloadGrid() {
    //removeFilter();
    $("#example div").remove();
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 40 }
    GetEmployeeData(1, 0, 40);
    $("#fText").text("");
    $("#FilterText").hide();
}

function SubmitFilterSort(search, order, pSize, searchMsg) {
    $.ajax({
        url: '/Configuration/AjaxGetEmployeesData',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search, order: order },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                $('#FilterModel').modal('hide');
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        },
        error: function (data) {
            alert("Failed");
        }
    });

}
function PageSize() {
    var a = $("#size").val();
    sessionStorage.setItem("PageSize", a);
    $(".yy").hide();
    var b = sessionStorage.getItem("search");
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

    $.post('/Configuration/AjaxGetEmployeesData', { id: "", start: 1, pSize: a, search: b, order: o, ServerOrderValue: firmname }, function (data) {
        loadData(data);
    })
}



function ResetPassword() {
    $("#ResetEmpPass").modal("hide");
    var p_acccode = $("#ResetEmpPassForm #p_acccode").val();
    window.open("/Configuration/ResetEmpPassword?p_acccode=" + p_acccode, "_blank");
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

function setBasicFilterUIOnPageReload() {
    //if (window.performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    //    alert("screen reloaded");
    //}

    var str = sessionStorage.getItem(basicFilterStrKey);
    var search = sessionStorage.getItem(searchKey);
    if (search !== null && search != "") {
        if (str !== null && str != "") {
            var arr = str.split("~");
            $("#filter").val(arr[0]).trigger('change');
            var controls = arr[1].split("|");
            for (var i = 0; i < controls.length; i++) {
                var ctrl = controls[i].split(":");
                //setFilterControlValueOnPageReload(ctrl[0],ctrl[1]);
                var type = $(ctrl[0]).prop("type");
                if (type == "select-multiple") {
                    var valArr = ctrl[1].split(",");
                    $(ctrl[0]).val(valArr);
                    $("#btnTagSearch").show()
                }
                else {
                    $(ctrl[0]).val(ctrl[1]);
                }

            }
            $(".filterclose").show();
            $(".filterclose").addClass("DatesMargin");
        }
    }

}



$('#example').on('contextmenu', 'div.parentdiv', function (e) {
    console.log("right clicked");
});
$(function () {
    /**************************************************
     * Custom Command Handler
     **************************************************/
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
                        //function to show Edit model
                        case "Edit":
                            var Rowid = "#tr-" + id;
                            var row = $(Rowid).children(1)[0];
                            var Pid = $(row).children(1)[1].innerText;
                            window.location = '/Configuration/EmployeesForm?P_employee=' + Pid + '&&exitmode=edit'
                            break;
                        case "Delete":
                            var Rowid = "#tr-" + id;
                            var row = $(Rowid).children(1)[0];
                            var Pid = $(row).children(1)[1].innerText;
                            var p_acccode = $(row).children(1)[2].innerText;
                            $("#deleteEmployeeForm #p_employees").val(Pid);
                            $("#deleteEmployeeForm #p_acccode").val(p_acccode);
                            $("#deleteEmployee").modal(options);
                            $("#deleteEmployee").modal("show");
                            break;

                        case "ResetPassword":
                            var Rowid = "#tr-" + id;
                            var row = $(Rowid).children(1)[0];
                            var p_acccode = $(row).children(1)[2].innerText;
                            $("#ResetEmpPassForm #p_acccode").val(p_acccode);
                            $("#ResetEmpPass").modal(options);
                            $("#ResetEmpPass").modal("show");
                            break;
                        //9) function to redirect to  view Setting controller
                        case "ViewSetting":
                            window.location = '/Configuration/ManageViewSettings?infotype=hoverstripstring&viewid=manageemployees'
                            break;
                    }
                },
                //10) blank array on item property
                items: {},

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

                    if (itemtext.toLocaleLowerCase() == "edit") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.Edit = { name: "Edit", icon: "fa-pencil" };
                        }
                    }
                    else if (itemtext.toLocaleLowerCase() == "delete") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.Delete = { name: "Delete", icon: "fa-trash" };
                        }
                    }
                    else if (itemtext.toLocaleLowerCase() == "resetpassword") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.ResetPassword = { name: "Reset Password", icon: "fa-key" };
                        }
                    }
                }
                //12) at last Show context menu which redirect to viewSetting Contoller
                options.items.ViewSetting = { name: "Customize HoverStrip", icon: "glyphicon glyphicon-wrench" };
            }
            return options;
        }
    });
});

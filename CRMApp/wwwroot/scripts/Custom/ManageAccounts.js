var options = { "backdrop": "static", keyboard: true };
var popOverOpen = false;
var CurrentHoverRowId = 0;
var CollabPopOpen = false
function PageSize() {
    var a = $("#size").val();
    sessionStorage.setItem("PageSize", a);
    $(".yy").hide();
    var b = sessionStorage.getItem("search");
    var key = $("#example").find('tr:nth-child(1) td:first input').val();
    var o = sessionStorage.getItem("order");
    //var accname = $("#example").find('tr:last td:nth-child(2)').text();
    //var key = $("#example").find('tr:nth-child(1) td:first input').val();
    if (o != undefined && o != "null") {
        order = o.split(":");
        var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
        ordervalue = "";
        o = order[1] + "~" + ordervalue + "~" + order[2];
        JSON.stringify(o);
    }
    $("#example tbody tr").remove();
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $.post('/Sales/AjaxAccountData', { start: 1, pSize: a, search: b }, function (data) {
        loadData(data);
    })
}
function dd() {
    var selectedIDs = [];
    $("#example tr.highlight").each(function (index, row) {
        selectedIDs.push($(row).find("td:first input").val());
    });
    if (selectedIDs.length == "1") {
        var a = document.getElementById("grid1").value;
        location.href = '/Sales/AccountsForm?exitmode=Edit&id=' + a;
    }
}
function GetEmployeeData(pageNumber, start, PSize) {
    $('#loading').show();
    $('#loadingmessage').show();
    $.post('/Sales/AjaxAccountData', { start: start, pSize: PSize }, function (data) {
        debugger;
        if (data == "Logout") {
            Windows.location.href = '/Home/LogOut';
        } else {
            sessionStorage.setItem("Total", data.recordsTotal);
            loadData(data);
        }

    });
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
    $.each(data.data, function (index, item) {
        var Parentdiv = $("<div id='MainDiv-" + item.CRMAccounts_Key + "' class='col-md-12  clickable parentdiv' style='display: inline-flex;border-bottom:1px black solid;padding-left: 20px;margin-left: 0px;width: 1080px;'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        var MoreDetailsdiv = $(("<div  class='MoreDetails' id='" + item.CRMAccounts_Key + "'  style='background-color: white;display: inline-flex;position: absolute;left: 940px;float: right;height: 40px;width: 100px;display:none;'> </div>"))
        var m = parseInt(a) + index;
        var busstype = "";
        var hometown = "";
        if (item.TextBussType != undefined && item.TextBussType != null) {
            busstype = item.TextBussType;
        }
        if (item.TextHomeTown != undefined && item.TextHomeTown != null) {
            hometown = item.TextHomeTown;
        }
        tblEmployee.append(Parentdiv);
        var div = $("<div id='tr-" + item.CRMAccounts_Key + "'  style='display:inline-flex; position:relative; min-height:55px; width: 1080px;  margin-top:10px;  font-size:11px; font-family: verdana,arial,sans-serif; padding-right:0px'></div>");
        div.html(("<div style='padding-right: 3px;width: 4%;text-align: center;' id='" + item.CRMAccounts_Key + "' value='" + item.CRMAccounts_Key + " style='margin-top:2px; float:left'>" + m + ".</div>")
       + " " + ("<div style='width:7%; padding-right:0px;padding-left:10px;'>" + item.P_CRMAccounts + "</div>")
       + " " + ("<div style='width:8%;padding-left:15px;'>" + item.FrmtCreationDate + "</div>")
       + " " + ("<div style='width:12%; padding-right:5px; margin-right:0px; padding-left:15px;'>" + item.AccountName + "</div>")
       + " " + ("<div style='width:10%;padding-left: 5px;margin-right:0px;'>" + item.Phone + "</div>")
       + " " + ("<div style='width:13%;margin-left:5px; margin-right:5px;'>" + item.Email + "</div>")
       + " " + ("<div style='width:12%;padding-left:5px; text-align:left; padding-right:5px;'>" + item.Website + "</div>")
       + " " + ("<div style='width:11%;padding-right: 5px;padding-left: 10px;'>" + item.TextParentAccount + "</div>")
       + " " + ("<div style='width:12%;padding-left:0px; text-align:left;'>" + busstype + "</div>")
       + " " + ("<div style='width:12%;padding-left:25px; text-align:left;'>" + hometown + "</div>"))
        Parentdiv.append(div);
        MoreDetailsdiv.html(("<a data-toggle='Edit&nbsp' href='/Sales/AccountsForm?P_crmaccounts=" + item.P_CRMAccounts + "&exitmode=edit&CalledFrom=ManageAccounts' id='Edit' style='margin-top: 7px;margin-right: 11px;'>       <i class='glyphicon glyphicon-pencil' style='font-size:20px; color:#616A6B;padding-left:11px;' ></i></a>" +
          "<a data-toggle='Delete&nbsp' href='/CRM/AccountsForm?P_crmaccounts=" + item.P_CRMAccounts + "&exitmode=delete&CalledFrom=ManageAccounts' id='Edit' style='margin-top: 7px;'>       <i class='glyphicon glyphicon-trash' style='font-size:20px; color:#616A6B;padding-left:11px;' ></i></a>"));

        div.append(MoreDetailsdiv);
    })
    if (data.recordsTotal == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
    }
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
function DoSearch() {
    var value = $("#filterText").val();
    var col = $("#filter").val();
    var b = col.split(":");
    var search = value + "," + b[0] + ":" + b[1];
    JSON.stringify(search);
    sessionStorage.setItem("search", search);
    var a = sessionStorage.getItem("PageSize");
    var o = sessionStorage.getItem("order");
    if (o != undefined && o != "null") {
        order = o.split(":");
        var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
        ordervalue = "";
        o = order[1] + "~" + ordervalue + "~" + order[2];
        JSON.stringify(o);
    }
    $("#example tbody tr").remove();
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $.ajax({
        url: '/Sales/AjaxAccountData',
        type: "POST",
        data: { start: 1, pSize: a, search: search, order: o },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                $(".filterDiv").css("display", "none")
                $("#fText").text(value);
                $("#FilterText").show();
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        },
        error: function (data) {
            alert("Failed");
        }
    });
    return false;

}
$(document).ready(function () {
    sessionStorage.clear();

    //logic to fill search dropdown
    var d = $("#fvalue").val();
    var m = [];
    m = d.split("|");
    var l;
    for (i = 0; i <= m.length - 1; i = i + 1) {
        l = m[i].split("~");
        var dropdown = $("#filter");
        $('#filter').append($('<option>', { value: l[1] + ":" + l[2], text: l[0] }));
    };
    //done logic of filter dropdown 
    var a = 1;
    sessionStorage.setItem("start", 1);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 20 }
    var SelectedRows = "";
    GetEmployeeData(a, 1, t);
    sessionStorage.setItem("search", null);
   // setInterval(ReloadGrid(), 15 * 60 * 1000);//setting Interval of 15 minutes by which every 15 minutes grid is getting refresh.

    
   
    $("#Prev").on("click", function () {
        var key = $("#example").find('tr:nth-child(1) td:first input').val();
        var accname = $("#example").find('tr:nth-child(1) td:nth-child(2)').text();
        var a = sessionStorage.getItem("PageSize");
        var b = sessionStorage.getItem("search");
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem("order");
        if (o != undefined && o != "null") {
            order = o.split(":");
            var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
            ordervalue = $(orderid).text();
            o = order[1] + "~" + ordervalue + "~" + order[2];
            JSON.stringify(o);
        }
        if (a != null) { d = (parseInt(d) - a) - 1; } else { d = (parseInt(d) - 20) - 1; }
        $("#example tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (key != 1) {
            $.post('/Sales/AjaxAccountData', { start: d, pSize: a, search: b, order: o, ServerOrderValue: accname }, function (data) {
                loadData(data);
            })
        }
    });
    $("#Next").on("click", function () {
        var b = sessionStorage.getItem("Total");
        var accname = $("#example").find('tr:last td:nth-child(2)').text();
        var key = $("#example").find('tr:last td:first input').val();
        var a = sessionStorage.getItem("PageSize");
        var c = sessionStorage.getItem("search");
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem("order");
        if (o != undefined && o != "null") {
            order = o.split(":");
            var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
            ordervalue = $(orderid).text();
            o = order[1] + "~" + ordervalue + "~" + order[2];
            JSON.stringify(o);
        }
        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 20 - 1; }
        $("#example tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (key != b) {
            $.post('/Sales/AjaxAccountData', { start: d, pSize: a, search: c, order: o, ServerOrderValue: accname }, function (data) {
                loadData(data);
            })
        }
    });
    function ReloadGrid() {
        removeFilter();
        $("#example div").remove();
        sessionStorage.setItem("start", 0);
        var t = sessionStorage.getItem("RegPageSize");
        if (t == null) { t = 40 }
        GetEmployeeData(1, 0, 40);
        $("#fText").text("");
        $("#FilterText").hide();
    }
    function removeFilter() {
        $(".filterDiv").css("display", "none")

        $("#min").val("");
        $("#max").val("");
    }

    $("#filter").on("change", function () {
        var a = $("#filter").val();
        if (a != "0") { $("#TextC").css("display", ""); }
        else { $("#TextC").css("display", "none"); }
    });
    $('a').tooltip();

    $('#popover1').popover({
        html: true,
        trigger: 'manual',
        content: function () { return $('#popover_content_wrapper1').html(); }
    });
    $(document).on('click', '#popover1', function () {
        $(this).popover('toggle');
        $('#popover2').popover({
            html: true,
            trigger: 'manual',
            content: function () { return $('#popover_content_wrapper2').html(); }
        });
    });
    $(document).on('click', '#popover2', function () { $(this).popover('toggle'); });
});
$(function () {
    /**************************************************
     * Custom Command Handler
     **************************************************/

    //For Customer Name Filter
    //$.contextMenu.types.CallEngagectrls = function (key, options, item, opt, root) {


    //    var RowId = "#tr-" + id;
    //    var CallId = '';

    //    if ($(item.$trigger[0]).hasClass("red")) {
    //        var id = item.$trigger[0].children[0].children[1].id
    //        var RowId = "#tr-" + id
    //        CallId = $(RowId).children(1)[2].innerText;
    //    } else {
    //        var id = item.$trigger[0].children[0].children[0].id
    //        var RowId = "#tr-" + id
    //        CallId = $(RowId).children(1)[1].innerText;
    //    }
    //    $('<span>Status'
    //    + '<select id="CallEngagectrls" name="CallEngagectrls"  style="width:180px; color:black"/><div class="btn btn-success DateBtn"  style="padding: 2px 5px 1px 5px; margin-bottom: 5px;"><i class="glyphicon glyphicon-ok"></i></div></form>')
    //                .appendTo(this)
    //           .on('click', '#CallEngagectrls', function () {

    //               var CallEngage = $("#CallEngagectrls").val();
    //               if (CallEngage != undefined && CallEngage != "") {

    //                   $('#callId').val(Callid);
    //                   CurrentHoverRowId = Rowid;
    //                   $(".ShowCallEngageCtrls").popover('toggle');
    //                   $(".CallEngagaeControlDiv").show();
    //                   $('.popover-dismiss').popover({
    //                       trigger: 'focus'
    //                   })
    //                   $("#callstatusInput").val('');
    //                   $.ajax({
    //                       type: "POST",
    //                       url: "/CRM/CallEngageStatusList",
    //                       data: { key: id },
    //                       success: function (data) {
    //                           if (data == "") {
    //                               window.location.href = "/Home/LogOut";
    //                               return true;
    //                           }
    //                           debugger;
    //                           var select = $("#callstatusInput");
    //                           $("#callstatusInput").append('<option value=0>Select Engage Status</option');

    //                           var a = 1;
    //                           $.each(data.data, function (index, item) {
    //                               $("#callstatusInput").append('<option value=' + item.P_Infotable + '>' + item.NameOfInfo + '</option>');
    //                           });

    //                           if (data.recordsTotal == 0) {
    //                               $(".popover-content #LoadingData").css('display', 'block');
    //                               $(".popover-content #LoadingData").text('No Data');
    //                           } else {
    //                               $(".popover-content #LoadingData").css('display', 'none');
    //                               $(".popover-content #LoadingData").text('');
    //                           }
    //                       }
    //                   });
    //               }


    //               this.addClass('labels').on('contextmenu:focus', function (e) {
    //                   // setup some awesome stuff
    //               }).on('contextmenu:blur', function (e) {
    //                   // tear down whatever you did
    //               }).on('keydown', function (e) {
    //                   // some funky key handling, maybe?
    //               })




    //           });
    //};
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
                            var CallPid = '';
                            var CustName = '';
                            if ($(Rowid).parent().hasClass("red")) {
                                var CallPid = $(Rowid).children(1)[2].innerText;
                            } else {
                                var CallPid = $(Rowid).children(1)[1].innerText;
                            }
                            window.location = '/Sales/AccountsForm?P_crmaccounts=' + CallPid + '&exitmode=edit&CalledFrom=ManageAccounts';
                            break;
                        case "Delete":
                            var Rowid = "#tr-" + id;
                            var CallPid = '';
                            var CustName = '';
                            if ($(Rowid).parent().hasClass("red")) {
                                var CallPid = $(Rowid).children(1)[2].innerText;
                            } else {
                                var CallPid = $(Rowid).children(1)[1].innerText;
                            }
                            window.location = '/Sales/AccountsForm?P_crmaccounts=' + CallPid + '&exitmode=delete&CalledFrom=ManageAccounts';
                            break;


                    }
                },
                items: {
                    "Edit": { name: "Edit", icon: "fa-pencil" },
                    "Delete": { name: "Delete", icon: "fa-trash" }
                    //"Filter": {
                    //    name: "Filter", icon: "fa-filter",
                    //    "items": {
                    //        "CustomerName": {
                    //            name: "Customer Name", icon: "fa-user",
                    //            "items": {
                    //                "CustomerName1": {
                    //                    type: 'CustomerName1', customName: 'CustomerName1', callback: HTMLInputElement
                    //                }
                    //            }
                    //        },
                    //        //"ServicingDealer": { name: "Servicing Dealer", icon: "fa-user-circle-o" },
                    //        //"HomeTown": {
                    //        //    name: "Home Town", icon: "fa-home", "items": {
                    //        //        "Location": {
                    //        //            type: 'Location', customName: 'Location', callback: HTMLInputElement
                    //        //        }
                    //        //    }
                    //        //},

                    //    }

                    //}
                },
            }
            return options;
        }
    })
})
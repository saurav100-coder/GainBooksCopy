var options = { "backdrop": "static", keyboard: true };
var popOverOpen = false;
var CurrentHoverRowId = 0;
var CollabPopOpen = false
function loadData(data) {
    var tblEmployee = $("#example");
    $("#example div").remove();
    var a = data.draw;
    if ($("#Next").hasClass("disabledbutton") == true) { $("#Next").removeClass("disabledbutton"); }
    if ($("#Prev").hasClass("disabledbutton") == true) { $("#Prev").removeClass("disabledbutton"); }
    var d = sessionStorage.getItem("RegPageSize");
    if (d == null || d == 0 || d == "undefined") { d = 50; sessionStorage.setItem("RegPageSize", d); };
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
        var callFreqdiv = ""

           var Parentdiv = $("<div id='MainDiv-" + item.Issuesfilegstkey + "' class='col-md-12  clickable parentdiv' style='display: inline-flex;border-bottom:1px black solid;padding-left:5px;margin-left:20px;width: 1080px;'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
           var MoreDetailsdiv = $(("<div  class='MoreDetails' id='" + item.Issuesfilegstkey + "'  style='background-color:white;'> </div>"))
       
        tblEmployee.append(Parentdiv);
        m = m + 1;
        var div = $("<div id='tr-" + item.Issuesfilegstkey + "'  style='display:inline-flex; position:relative; min-height:55px; width: 1080px;  margin-top:10px;  font-size:11px; font-family: verdana,arial,sans-serif; padding-right:0px'></div>");
        div.html(callFreqdiv
         + " " + ("<div style='width:1%; padding-right:3px;text-align: right;' id='" + item.Issuesfilegstkey + "' value='" + item.Issuesfilegstkey + " style='margin-top:2px; float:left'><input type='hidden' class='isDeffered' value='" + item.IsDeffered + "'/>" + m + ".</div>")
         + " " + ("<div style='width:4%; padding-right:0px;padding-left:10px;'><input type='hidden' id='HasRemark-" + item.Issuesfilegstkey + "' value='" + item.hasRemarks + "'/>" + item.P_issuesfilegst + "</div>")
         + " " + ("<div style='width:10%;padding-left:15px;'>" + item.TxtRegisterDate + "</div>")
         + " " + ("<div style='width:8%; padding-right:5px; margin-right:5px; padding-left:0px;'>" + item.Firmname + "</div>")
         + " " + ("<div style='width:8%;padding-left: 5px;margin-right:10px;'>" + item.Contactperson + "</div>")
         + " " + ("<div style='width:7%; margin-left:10px; margin-right:5px;'>" + item.Mobileno + "</div>")
         + " " + ("<div style='width:8%;padding-left:10px; text-align:left; padding-right:10px;'>" + item.Location + "</div>")
         + " " + ("<div style='width:8%;padding-right: 10px;'>" + item.TextIssuetype + "</div>")
         + " " + ("<div style='width:10%;padding-left:0px; text-align:left;'>" + item.Issuedescription + "</div>")
         + " " + ("<div style='width:8%;padding-left:5px; text-align:left;'>" + item.TextTaskStatus + "</div>")
         + " " + ("<div style='width:6%;padding-left:0px; padding-right: 20px;text-align: left;'>" + item.TextAssignedto + "</div>")
         + " " + ("<div style='width:9%;padding-left:10px;'><input type='hidden' id='Onsite-" + item.Issuesfilegstkey + "' class='Onsite' value='" + item.OnsiteCount + "'/>" + item.TextServicingDealer + "</div>")
         + " " + ("<div style='width:9%;padding-left:0px;'>" + item.TxtLastCallDate + "</div>")
         + " " + ("<div style='width:5%;padding-left:40px;'>" + item.onsiteflag + "</div>")
            + " " + ("<div style='width:10%;text-align: left;padding-left:0px;'>" + item.FrmtNextActionDate + "</div>")
          + " " + ("<div style='width:6%;padding-left:0px;'>" + item.Textsource + "</div>"));
        Parentdiv.append(div);

        MoreDetailsdiv.html("<a data-toggle='View Remarks' class='ShowRemark'>              <i class='glyphicon glyphicon-list ShowRemark' data-placement='left' style='font-size:17.75px; color:#616A6B; padding-left:11px;'  onclick='ViewRemarks(this)'></i></a>" +
        "<div class='popover_content_wrapper3' style='display:none; float:left; data-placement=bottom' id='ShowRemarksDiv'></div>"
     );
        div.append(MoreDetailsdiv);

        $('.ShowRemark').popover({
            html: true,
            trigger: 'manual',
            content: function () {
                return $('.popover_content_wrapper3').html();
            }
        })

        
    });
    if (data.data.Array == 0) {
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
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("RegPageSize");
    if (t == null) { t = 50 }
    var SelectedRows = "";
    GetEmployeeData(a, 0, t);
    sessionStorage.setItem("search", null);
   
    $("#Prev").on("click", function () {
        var a = sessionStorage.getItem("RegPageSize");
        var b = sessionStorage.getItem("search");
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem("order");
        var total = sessionStorage.getItem("Total");
        if (o != undefined && o != "null") {
            order = o.split(":");
            var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
            ordervalue = $(orderid).text();
            o = order[1] + "~" + ordervalue + "~" + order[2];
            JSON.stringify(o);
        }
        if (a != null) { d = (d - a) - 1; } else { d = (d - 40) - 1; }
        $("#example div").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d >= 0) {
            $.post('/CRM/AjaxAllRegCallsData', { start: d, pSize: a, search: b, order: o }, function (data) {
                loadData(data);
            })
        }
    });
    $("#Next").on("click", function () {
        var total = sessionStorage.getItem("Total");
        var a = sessionStorage.getItem("RegPageSize");
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
        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 40 - 1; }
        $("#example div").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/CRM/AjaxAllRegCallsData', {  start: d, pSize: a, search: c, order: o }, function (data) {
                loadData(data);
            })
        }
    });

    $("#IssueFilter").on("change", function () {
        var text = $("#IssueFilter option:selected").text();
        var  value = $("#IssueFilter").val();
        var    col = "Issuetype";
        var   search = value + "," + col + ":integer";
        
        JSON.stringify(search);
        sessionStorage.setItem("search", search);
        var pSize = sessionStorage.getItem("RegPageSize");
        $("#example div").remove();
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
                    $("#FilterText").show();
                    $(".filterDiv").css("display", "none")
                    sessionStorage.setItem("Total", data.recordsTotal);
                    loadData(data);
                }
            },
            error: function (data) {
                alert("Failed");
            }
        });
    });
    $("#P_dealers").on("change", function () {

        var value = $("#P_dealers").val();
        var text = $("#P_dealers option:selected").text();
        var col = "p_dealers";
        var search = value + "," + col + ":integer";

        JSON.stringify(search);
        sessionStorage.setItem("search", search);
        var pSize = sessionStorage.getItem("RegPageSize");
        $("#example div").remove();
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
                    $(".filterDiv").css("display", "none")
                    $("#fText").text(text);
                    $("#FilterText").show();
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
        var col = "assignedto";
        var search = value + "," + col + ":integer";

        JSON.stringify(search);
        sessionStorage.setItem("search", search);
        var pSize = sessionStorage.getItem("RegPageSize");
        $("#example div").remove();
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
                    $("#FilterText").show();
                    $(".filterDiv").css("display", "none")
                    sessionStorage.setItem("Total", data.recordsTotal);
                    loadData(data);
                }
            },
            error: function (data) {
                alert("Failed");
            }
        });      
    })

    //for filtering on hometown
    $("#HomeTownfilter").submit(function () {
        //$('#ModelHomeTownFilter').modal('toggle');
        $('#ModelHomeTownFilter .close').click()
        var m = document.getElementById("homeTown");
        if (m.value != 0 || m.value != "undefined") {
            var hometown = document.getElementsByName("searchString");
            var empName = hometown["0"].value;
            var col = "HomeTown";
            var search = m.value + "," + col + ":integer";
            JSON.stringify(search);
            var pSize = sessionStorage.getItem("RegPageSize");
            alert(search);
            $("tbody").empty();
            $("#loading").show();
            $('#loadingmessage').show();
            gf1 = "HomeTown";
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
    });
    //for filtering on servicing agent
    $("#ServicingAgentFilterForm").submit(function () {
        $('#ServicingAgent').modal('hide');
        if ($("#DealerId").val() != 0) {
            var dealercode = $("#DealerId option:selected").val();
            var empName = $("#DealerId option:selected").text();
            var col = "p_dealers";
            var search = dealercode + "," + col + ":integer";
            JSON.stringify(search);
            sessionStorage.setItem("search", search);
            var pSize = sessionStorage.getItem("RegPageSize");
            $("#example div").remove();
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
    });
    $("#filter").on("change", function () {
        var a = $("#filter").val();
        $(".filterDiv").css("display", "none")
        if (a != "0" && a != "1") {
            b = a.split(":");
            if (b[0] == 2) {
                var a = document.getElementById("dateC")
                a.style.display = "";
            } else if (b[0] == 3 || b[0] == 5) {
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
        }
    });

})
function removeFilter() {
    $(".filterDiv").css("display", "none")
    $("#P_dealers").val(0);
    $("#IssueFilter").val(0);
    $("#assignto").val(0);
    $("#filter").val(0);
    $("#filterText").val("");
    $("#min").val("");
    $("#max").val("");
}

function ReloadGrid() {
    removeFilter();
    $("#example div").remove();
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("RegPageSize");
    if (t == null) { t = 50 }
    GetEmployeeData(1, 0, 50);
    $("#fText").text("");
    $("#FilterText").hide();
}
function DoSearch() {
    var ValueToSearch = $("#filterText").val().toLowerCase();
    var filterSelected = $("#filter").val();
    var filter = filterSelected.split(":")
    var col = ""
    var search = ""
    if ($("#filterText").val() != "" || $("#filterText").val() != "undefined") {
        if (filter[0] == 3) {
            value = $("#filterText").val();
            col = "Firmname";
            search = ValueToSearch + "," + col + ":string";
        }
        if (filter[0] == 6) {
            value = $("#filterText").val();
            col = "Location";
            search = ValueToSearch + "," + col + ":string";
        }
        JSON.stringify(search);
        sessionStorage.setItem("search", search);
        var pSize = sessionStorage.getItem("RegPageSize");
        $("#example div").remove();
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
                    $(".filterDiv").css("display", "none")
                    $("#fText").text(ValueToSearch);
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
}
function DateSearch() {

    value1 = $("#min").val();
    value2 = $("#max").val();
    col = "registerdate";
    search = value1 + "," + value2 + "," + col + ":date";

    JSON.stringify(search);
    sessionStorage.setItem("search", search);
    var pSize = sessionStorage.getItem("RegPageSize");
    $("#example div").remove();
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
                // $("#fText").text(value);
                // $("#FilterText").show();
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

function GetEmployeeData(pageNumber, start, PSize) {
    $('#loading').show();
    $('#loadingmessage').show();
    $.ajax({
        type: "POST",
        url: "/CRM/AjaxAllRegCallsData",
        data: { start: start, pSize: PSize },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                debugger;
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

//Show remarks of a task when clicking on the icon
function ViewRemarks(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var Callid = $(Rowid).children(1)[1].innerText;
    CurrentHoverRowId = Rowid;
    // Popover Grid
    $("#ShowRemarksDiv div").remove();
    $(".popover-content div").empty();
    var morediv = $("#ShowRemarksDiv");
    var more = $("<div class='col-md-12' style='display:flex; position:absolute; padding-right: 0px; z-index:10; margin-bottom:40px; width:665px; height:30px; color: #325faf; padding-left:0px; background-color:white;' id='SRTitle'  class='col-md-12'></div>");
    more.html(("<div class='col-md-1' style='text-align:center; padding-top:10px; margin-bottom:5px; padding-left: 0px;'><b>Sno.</b></div>")
      + " " + ("<div class='col-md-3' style='padding-left: 0px;padding-top: 10px;margin-bottom: 5px;padding-right: 50px; text-align:center;'><b>Remark</b></div>")
      + " " + ("<div class='col-md-2' style='text-align: center;padding-top: 10px;margin-bottom: 5px;padding-right: 20px;padding-left: 0px;width: 100px;' > <b>Comm. type</b> </div>")
     + " " + ("<div class='col-md-3' style='text-align: center;padding-top: 10px;margin-bottom: 5px;padding-right: 50px;' ><b>Date</b> </div>")
         + " " + ("<div class='col-md-2' style='padding-left: 0px; text-align:right; padding-top: 10px; margin-bottom: 5px;padding-right:10px;' > <b>Created By</b> </div>")
            + " " + ("<div class='col-md-1' style='margin-top:5px;padding-right: 0px;'> <span class='close' onclick='popoverClose();' style='padding-left: 10px;padding-bottom: 10px; font-size:18px'> &times; </span> </div>")
         );
    morediv.append(more);

    var more2 = $("<div class='col-md-12 ShowRemarksValueM' style='margin-bottom:40px' id='' ></div>");
    morediv.append(more2);

    var DataLoading = document.createElement('div');
    DataLoading.id = 'LoadingData';
    DataLoading.innerHTML = '...Loading...';
    DataLoading.className = 'col-md-12';
    $(DataLoading).css('text-align', 'center');
    $(DataLoading).css('margin-bottom', '10px');
    morediv.append(DataLoading);
    // $(this).popover('toggle');
    $(".ShowRemark").popover('toggle');



    $.ajax({
        type: "POST",
        url: "/CRM/AddRemarkData",
        data: { key: id },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            debugger;

            $(".popover-content").css("height", "200px")
            $(".popover-content").css("overflow-y", "scroll")
            //loadData1(data);
            var tblEmployee1 = $(".popover-content");
            //$(".popover-content #LoadingData").css('display', 'none');
            var a = 1;
            $.each(data.data, function (index, item) {
                var m = (a) + index;
                var more1 = $("<div class='col-md-12'  style='display:flex;margin-bottom:10px;color:black; padding-left:0px' id='" + item.CRMCommunication_key + "'  class='col-md-12'>" + m + "</div>");
                more1.html(("<div class='col-md-1' style='margin-left: 0px; padding-left: 10px;padding-right: 18px;'>" + m + "</div>")
                 + " " + ("<div class='col-md-3' style='width: 215px; padding-left:5px; text-align:left;padding-right:25px;' >" + item.Commtext + "</div>")
                 + " " + ("<div class='col-md-4' style='width: 130px; padding-left: 0px; padding-right: 0px; text-align:center;'  >" + item.TextCommunicationType + " </div>")
                 + " " + ("<div class='col-md-2' style='padding-left: 0px; width: 200px; padding-right: 10px;text-align: right;'>" + item.FrmtCreationDate + " </div>")
                 + " " + ("<div class='col-md-2' style='width:180px; padding-left:0px; text-align:right; padding-right:0px'>" + item.TextLogincode + "</div><div class='col-md-1'></div>")
                     );
                tblEmployee1.append(more1);
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
    $('.ShowRemark').not(ctrl).popover('hide');
    $('.popover.fade.left.in').css('max-width', '700px');
    $('.popover.fade.left.in').css('left', '-700px');
    $('.popover.fade.left.in').css('background-color', 'white');
    $('.popover.fade.left.in').css('top', '10px');
    $('.arrow').css('top', '13px');
    $('.popover-content').css('width', '698px');
    $('.popover-content').css('padding-top', '0px');
    $('.popover-content').css('overflow-y', 'scroll');
    event.preventDefault();
}

function PageSize() {
    var a = $("#size").val();
    sessionStorage.setItem("RegPageSize", a);
    $(".yy").hide();
    var b = sessionStorage.getItem("search");
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
    $('#p').css("display", "none");

    $.post('/CRM/AjaxAllRegCallsData', { id: "", start: 1, pSize: a, search: b, order: o, ServerOrderValue: firmname }, function (data) {
        loadData(data);
    })
}
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
            Rowid1 = item.$trigger[0].children[0].children[1].id//childNodes[0]//.id;

        } else {
            Rowid1 = item.$trigger[0].children[0].children[0].id//childNodes[0]//.id;           
        }

        var hasRemarkid = "#HasRemark-" + Rowid1
        var hasRemarkValue = $(hasRemarkid).val();
        $('<span>Call Id'
            + '<form  id="MarkAsDuplicate"> <input id="TxtCallId" name="TxtCallId" type="text" style="width:150px; color:black" /><div class="btn btn-success DateBtn" id="SubmitMarkAsDuplicate" style="padding: 2px 5px 1px 5px; margin-bottom: 5px;"><i class="glyphicon glyphicon-ok"></i></div></form>')
            .appendTo(this)
       .on('click', '#SubmitMarkAsDuplicate', function () {
           //alert("Clicked");
           // Session["taskId"].val;
           if ($("#TxtCallId").val() != "" || $("#TxtCallId").val() != "undefined") {
               var Callid = $("#TxtCallId").val();
               AjaxCallMarkAsDuplicate(Callid, Rowid1, hasRemarkValue)

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
        var id;
        var RowId = "#tr-" + id
        var CallId = ""
        if ($(item.$trigger[0]).hasClass("red")) {
            var id = item.$trigger[0].children[0].children[1].id
            var RowId = "#tr-" + id
            CallId = $(RowId).children(1)[2].innerText;
        } else {
            var id = item.$trigger[0].children[0].children[0].id
            var RowId = "#tr-" + id
            CallId = $(RowId).children(1)[1].innerText;
        }
        $('<span>Date'
        + ' <input id="NextActionDateContext" name="NextActionDate" type="datetime-local" style="width:180px; color:black" /><div class="btn btn-success DateBtn" id="DefferDate" style="padding-top: 2px;padding-right: 7px;padding-bottom: 1px;padding-left: 7px;"><i class="glyphicon glyphicon-ok"></i></div>')
        .appendTo(this)
   .on('click', '#DefferDate', function () {
       var NextDate = $("#NextActionDateContext").val();
       if (NextDate != undefined && NextDate != "") {
           $.ajax({
               type: "GET",
               url: "/CRM/DefferCalls",
               contentType: "application/json; charset=utf-8",
               datatype: "json",
               data: { Callid: CallId, NextActionDate: NextDate },
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
                       $('.modal-title').text(Mtitle);
                       $('#CallClosed').modal('show');
                       setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);
                   }
               },
               error: function () {
                   $('#CallClosedContent').html();
                   $('#CallClosed').modal(options);
                   var Mtitle = "An error Occured.Please try again."
                   $('.modal-title').text(Mtitle);
                   $('#CallClosed').modal('show');
               }
           });
       } else {
           $('#CallClosedContent').html();
           $('#CallClosed').modal(options);
           var Mtitle = "Please enter dateTime."
           $('.modal-title').text(Mtitle);
           $('#CallClosed').modal('show');
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
               var col = "Firmname";
               var search = empName + "," + col + ":string";
               JSON.stringify(search);
               sessionStorage.setItem("search", search);
               var pSize = sessionStorage.getItem("RegPageSize");
               $("#example div").remove();
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
               var col = "Location";
               var search = empName + "," + col + ":string";
               JSON.stringify(search);
               sessionStorage.setItem("search", search);
               var pSize = sessionStorage.getItem("RegPageSize");
               alert(search);
               $("#example div").remove();
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

                    switch (key) {                    
                            //function to show remarks model
                        case "ViewRemarks":
                            var Rowid = "#tr-" + id;
                            var Callid = '';
                            if ($(Rowid).parent().hasClass("red")) {
                                Callid = $(Rowid).children(1)[2].innerText;
                            } else {
                                Callid = $(Rowid).children(1)[1].innerText;
                            }
                            $.ajax({
                                type: "POST",
                                url: "/CRM/AddRemarkData",
                                data: { key: id },
                                success: function (data) {
                                    if (data == "") {
                                        window.location.href = "/Home/LogOut";
                                        return true;
                                    }
                                    if (data.statusCode == 500) {
                                        window.location.href = "/Home/Error";
                                    }
                                    debugger;

                                    $(".popover-content").css("height", "200px")
                                    $(".popover-content").css("overflow-y", "scroll")
                                    //loadData1(data);
                                    $("#ShowRemarkContent").empty();
                                    var tblEmployee1 = $("#ShowRemarkContent");
                                    //$(".popover-content #LoadingData").css('display', 'none');
                                    var a = 1;
                                    $.each(data.data, function (index, item) {
                                        var m = (a) + index;
                                        var more1 = $("<div class='col-md-12'  style='display:flex;margin-bottom:10px;color:black; padding-left:0px' id='" + item.CRMCommunication_key + "'  class='col-md-12'>" + m + "</div>");
                                        more1.html(("<div class='col-md-1' style='margin-left: 0px; padding-left: 10px;padding-right: 18px;'>" + m + "</div>")
                                         + " " + ("<div class='col-md-3' style='width: 215px; padding-left:5px; text-align:left;padding-right:25px;' >" + item.Commtext + "</div>")
                                         + " " + ("<div class='col-md-4' style='width: 130px; padding-left: 0px; padding-right: 0px; text-align:center;'  >" + item.TextCommunicationType + " </div>")
                                         + " " + ("<div class='col-md-2' style='padding-left: 0px; width: 200px; padding-right: 10px;text-align: right;'>" + item.FrmtCreationDate + " </div>")
                                         + " " + ("<div class='col-md-2' style='width:180px; padding-left:0px; text-align:right; padding-right:0px'>" + item.TextLogincode + "</div><div class='col-md-1'></div>")
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

                            //case "HomeTown":
                            //    var $buttonClicked = $(this);
                            //    var options = {
                            //        "backdrop": "static",
                            //        keyboard: true
                            //    };
                            //    $.ajax({
                            //        type: "GET",
                            //        url: "/CRM/LocationGrid",
                            //        contentType: "application/json; charset=utf-8",
                            //        datatype: "json",
                            //        success: function (data) {
                            //            debugger;
                            //            $('#ModelHomeTownFilter').modal(options);
                            //            $('#ModelHomeTownFilter').modal('show');
                            //            $('#LinkHometown').html(data);

                            //        },
                            //        error: function () {
                            //            alert("Content load failed.");
                            //        }
                            //    });
                            //    break;
                        case "ServicingDealer":
                            var options = {
                                "backdrop": "static",
                                keyboard: true
                            };
                            $('#ServicingAgent').modal(options);
                            $('#ServicingAgent').modal('show');
                            break;
                    }
                },
                items: {
                    "ViewRemarks": { name: "View Remarks", icon: "fa-list" },                  
                    "Filter": {
                        name: "Filter", icon: "fa-filter",
                        "items": {
                            "CustomerName": {
                                name: "Customer Name", icon: "fa-user",
                                "items": {
                                    "CustomerName1": {
                                        type: 'CustomerName1', customName: 'CustomerName1', callback: HTMLInputElement
                                    }
                                }
                            },
                            "ServicingDealer": { name: "Servicing Dealer", icon: "fa-user-circle-o" },
                            "HomeTown": {
                                name: "Home Town", icon: "fa-home", "items": {
                                    "Location": {
                                        type: 'Location', customName: 'Location', callback: HTMLInputElement
                                    }
                                }
                            },
                        }

                    }
                },
            }
            return options;
        }
    })
})

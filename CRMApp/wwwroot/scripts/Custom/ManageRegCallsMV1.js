var options = { "backdrop": "static", keyboard: true };
var popOverOpen = false;
var CurrentHoverRowId = 0;
var CollabPopOpen = false;
var a_ID = 0;

//1) global variable for viewSettings
var infoString = "";

CallView();
function CallView() {
    if ($(window).width() >= 700) {
        window.location = '/CRM/ManageRegCalls';
    }
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
                $('#CallClosedContent').html();
                $('#CallClosed').modal(options);
                var Mtitle = "An error occured.Please try again later!"
                $('.modal-title').text(Mtitle);
                $('#CallClosed').modal('show');
            }
        });

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
    $.each(data.data, function (index, item) {
        var Parentdiv = "";
        var callFreqdiv = "";
        var accordion = "";
        var panel = "";
        var rcorners = "";
        var div = "";
        var rcorners_inner = "";
        var Callinaction = "";
        
        if (item.hasRemarks == "Y") {
            Parentdiv = $("<div id='MainDiv-" + item.AllCallsReg_key + "' class='col-md-12  clickable parentdiv' style='width: 100%;padding-left: 0px;padding-right: 0px;'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
            accordion = $("<div class='accordion accordionBlue' id='accordionBlue-" + item.AllCallsReg_key + "'></div>");
            panel = $("<div id='panelBlue- " + item.AllCallsReg_key + "' class='panelBlue blue col-md-4' style=''></div>");
            panel.html(("<div class='col-sm-12 HiddenBlue' style='height:auto;padding-left:0px; overflow-y:auto;padding-right: 0px;padding-left:15px; padding-right: 5px;'><b>Description:</b>" + item.Issuedescription + "</div>")
               + " " + ("<div class='col-sm-12 HiddenBlue' style='padding-left:0px;height:auto;padding-bottom:7px;padding-left:15px; padding-right: 5px;'><b> Next Action Date: </b> <br />" + item.FrmtNextActionDate + "</div>"));
            rcorners = $("<div id='rcorners1'></div>");
            div = $("<div class='col-sm-12 TopBlue'  id='top-" + item.AllCallsReg_key + "' style='display:inline-flex;height:24px; '></div>");
            rcorners_inner = $("<div id='rcorners_inner-" + item.AllCallsReg_key + "'   class='clickable  rcorners_innerBlue' style=''></div>");
            Callinaction = $("<div id='eng-" + item.P_AllCallsReg + "' class='col-md-12 alert cgs' style=''><span>" + item.EngageStatus + "<span><b>&nbsp;" + item.EngageBy + "</b><span>&nbsp;&nbsp;" + item.EngageTime + "</span></div>");
        }
        else {
            Parentdiv = $("<div id='MainDiv-" + item.AllCallsReg_key + "' class='col-md-12  clickable parentdiv' style='width: 100%;padding-left: 0px;padding-right: 0px;'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
            accordion = $("<div class='accordion accordionRed' id='accordionRed-" + item.AllCallsReg_key + "'></div>");
            panel = $("<div id='panelRed- " + item.AllCallsReg_key + "' class='panelRed col-md-4' style='width: 346px; font-size:13px; z-index: 100;'></div>");
            panel.html(("<div class='col-sm-12 HiddenRed' style='height:auto;padding-left:0px; overflow-y:auto;padding-left:15px; padding-right: 5px;'><b>Description:</b>" + item.Issuedescription + "</div>")
               + " " + ("<div class='col-sm-12 HiddenRed' style='padding-left:0px;height:auto;padding-bottom:7px;padding-left:15px; padding-right: 5px;'><b> Next Action Date: </b> <br />" + item.FrmtNextActionDate + "</div>"));
            rcorners = $("<div id='rcorners3'></div>");
            div = $("<div class='col-sm-12 TopRed' id='top-" + item.AllCallsReg_key + "' style='padding-left:15px; height:24px;'></div>");
            rcorners_inner = $("<div id='rcorners_inner-" + item.AllCallsReg_key + "'   class='clickable rcorners_innerRed ' style='z-index:20;padding-bottom: 0px;padding-left: 5px; padding-right: 22px;padding: 20px;padding: 2px 5px 0px 5px;margin-right: 20px;background-color: white;border-top-left-radius: 0px;border-top-right-radius: 0px;border-bottom-right-radius: 12px;border-bottom-left-radius: 12px;border-right: 2px solid #e64945;border-left: 2px solid #e64945;border-bottom: 1px solid #e64945;width:100%;'></div>");
            Callinaction = $("<div id='eng-" + item.P_AllCallsReg + "' class='col-md-12 alert cgs' style='bottom:2px; padding-left:25px; margin-left: 20px;width: 300px;background-color: antiquewhite;margin-bottom: 0px;padding-bottom: 0px;padding-top: 0px;'><span>" + item.EngageStatus + "<span><b>&nbsp;" + item.EngageBy + "</b><span>&nbsp;&nbsp;" + item.EngageTime + "</span></div>");
        }
        if (item.callFreqCount > 0) {
            Parentdiv = $("<div id='MainDiv-" + item.AllCallsReg_key + "' class='col-md-12  clickable parentdiv red' style='width: 100%;padding-left: 0px;padding-right: 0px;'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
            accordion = $("<div class='accordion accordionRed' id='accordionRed-" + item.AllCallsReg_key + "'></div>");
            panel = $("<div id='panelRed- " + item.AllCallsReg_key + "' class='panelRed col-md-4' style='width: 346px; font-size:13px; z-index: 100;'></div>");
            panel.html(("<div class='col-sm-12 HiddenRed' style='height:auto;padding-left:0px; overflow-y:auto;padding-right: 0px;padding-left:15px; padding-right: 5px;'><b>Description:</b>" + item.Issuedescription + "</div>")
               + " " + ("<div class='col-sm-12 HiddenRed' style='padding-left:0px;height:auto;padding-bottom:7px;padding-left:15px; padding-right: 5px;'><b> Next Action Date: </b> <br />" + item.FrmtNextActionDate + "</div>"));
            rcorners = $("<div id='rcorners3'></div>");
            div = $("<div class='col-sm-12 TopRed red' id='top-" + item.AllCallsReg_key + "' style='padding-left:0px; height:24px;'></div>");
            rcorners_inner = $("<div id='rcorners_inner-" + item.AllCallsReg_key + "'   class='clickable rcorners_innerRed ' style='z-index:20;padding-bottom: 0px;padding-left: 5px; padding-right: 22px;padding: 20px;padding: 2px 5px 0px 5px;margin-right: 20px;background-color: white;border-top-left-radius: 0px;border-top-right-radius: 0px;border-bottom-right-radius: 12px;border-bottom-left-radius: 12px;border-right: 2px solid #e64945;border-left: 2px solid #e64945;border-bottom: 1px solid #e64945;width:100%;'></div>");
            callFreqdiv = ("<div class='numberCircle' style='margin-left: 10px;'>" + item.callFreqCount + "</div>");
            Callinaction = $("<div id='eng-" + item.P_AllCallsReg + "' class='col-md-12 alert cgs' style='bottom:2px; padding-left:25px; margin-left: 20px;width: 300px;background-color: antiquewhite;margin-bottom: 0px;padding-bottom: 0px;padding-top: 0px;'><span>" + item.EngageStatus + "<span><b>&nbsp;" + item.EngageBy + "</b><span>&nbsp;&nbsp;" + item.EngageTime + "</span></div>");
        }
        tblEmployee.append(Parentdiv);
        Parentdiv.append(accordion);
        Parentdiv.append(panel);
        accordion.append(rcorners);
        rcorners_inner.append(Callinaction);

        div.html(callFreqdiv
         + " " + ("<div class='col-sm-10' style='font-size:13px;top:2px; padding-left:5px;'> <b>" + item.Firmname + "</b></div>")
         + " " + ("<div class='col-sm-2' style='font-size:14px;  position:absolute; right:5px; padding:0px;'><input type='hidden' id='HasRemark-" + item.AllCallsReg_key + "' value='" + item.hasRemarks + "'/>" + item.P_AllCallsReg + "</div>"));
        rcorners.append(div);

        //var rcorners_inner = $("<div id='rcorners_inner' class='clickable' style='' onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        rcorners.append(rcorners_inner);

        var div1 = $("<div  style='min-height: 40px;'></div>");
        div.append(div1);

        var div2 = $("<div class='col-sm-12 col-xs-12' style='float:left; font-size:13px;'></div>");
        div2.html(("<div class='col-sm-12' style='padding-bottom: 5px;padding-left: 0px;'>                     <i class='fa fa-user'></i>&nbsp;&nbsp;" + item.Contactperson + "   </div>")
            + " " + ("<div class='col-sm-12' style='padding-bottom: 5px;padding-left: 0px;padding-right: 0px;'> <i class='fa fa-phone'></i>&nbsp;&nbsp;<span class='phone'>" + item.Mobileno + "</span></div>")
            + " " + ("<div class='col-sm-12' style='padding-bottom: 5px;padding-left: 0px;padding-right: 0px;bottom: 2px;'><b>Created:     </b>                                     " + item.TxtRegisterDate + "</div>")
            + " " + ("<div class='col-sm-12' style='padding-bottom: 5px;padding-left: 0px;padding-right: 0px;bottom: 2px;'><b>Last Called: </b>                                     " + item.TxtLastCallDate + " </div>")
            + " " + ("<div class='col-sm-12' style='padding-bottom: 5px;padding-left: 0px;padding-right: 0px;bottom: 2px;'><b>Call Source: </b>                                     " + item.Source + "      </div>")
            + " " + ("<div class='col-sm-12' style='padding-bottom: 5px;padding-left: 0px;padding-right: 0px;bottom: 2px;'><b>Issue:       </b>                                     " + item.TextIssuetype + "   </div>"));
        rcorners_inner.append(div2);

        var div3 = $("<div class='col-sm-12' style='padding-left: 0px;font-size:13px;display:inline-flex;bottom:3px;'></div>");
        rcorners_inner.append(div3);
        div3.html(("<div class='col-md-5'  style='padding-right:0px;'>                   <i class='glyphicon glyphicon-headphones'></i>&nbsp;" + item.TextAssignedto + "</div>")
          + " " + ("<div class='col-md-3'  style='padding-right:0px;'> <i class='fa fa-bell'>                    </i>&nbsp;" + item.TextTaskStatus + "&nbsp;&nbsp;&nbsp;&nbsp;</div>")
          + " " + ("<div class='col-md-4'  style='padding-left: 5px;padding-right:0px;'> <i class='glyphicon glyphicon-map-marker'></i>&nbsp;" + item.Location + "</div>"));
        var engStatus = "#eng-" + item.P_AllCallsReg;
        if (item.EngageStatus != "") {
            $(engStatus).css('display', 'block');
        } else {
            $(engStatus).css('display', 'none');
        }


        if (data.Array == 0) {
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
    });
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                if ($(this).hasClass("accordionBlue")) {
                    panel.style.borderBottom = '0px solid #4e4c4c';
                    panel.style.borderTop = '0px';
                    panel.style.borderLeft = '1px solid #4e4c4c';
                    panel.style.borderRight = '1px solid #4e4c4c';
                }
                else {
                    panel.style.borderBottom = '0px solid #e64945';
                    panel.style.borderTop = '0px';
                    panel.style.borderLeft = '2px solid #e64945';
                    panel.style.borderRight = '1px solid #e64945';
                }


                $(this).find('.clickable').css('border-top-left-radius', ' 0px');
                $(this).find('.clickable').css('border-top-right-radius', ' 0px');
                $(this).find('.clickable').css('border-bottom-right-radius', '12px');
                $(this).find('.clickable').css('border-bottom-left-radius', '12px');
                $(this).find('.clickable').css('border-bottom-width', '1px');
                $(this).find('.plus').removeClass('glyphicon-minus');
                $(this).find('.plus').addClass('glyphicon-plus');
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                if ($(this).hasClass("accordionBlue")) {
                    panel.style.borderBottom = '1px solid #3c8dbc';
                    //panel.style.borderTop     = '2px solid #d8d8d8';
                    panel.style.borderLeft = '2px solid #3c8dbc';
                    panel.style.borderRight = '2px solid #3c8dbc';
                }
                else {
                    panel.style.borderBottom = '1px solid #e64945';
                    //panel.style.borderTop    = '2px solid #d8d8d8';
                    panel.style.borderLeft = '2px solid #e64945';
                    panel.style.borderRight = '2px solid #e64945';
                }

                $(this).find('.clickable').css('border-top-left-radius', '0px');
                $(this).find('.clickable').css('border-top-right-radius', '0px');
                $(this).find('.clickable').css('border-bottom-right-radius', '0px');
                $(this).find('.clickable').css('border-bottom-left-radius', '0px');
                $(this).find('.clickable').css('border-bottom-width', '0px');
                $(this).find('.plus').removeClass('glyphicon-plus');
                $(this).find('.plus').addClass('glyphicon-minus');
            }
        });
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
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 50 }
    var SelectedRows = "";


    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.style.borderBottom = '0px solid #4e4c4c';
                panel.style.borderTop = '0px';
                panel.style.borderLeft = '1px solid #4e4c4c';
                panel.style.borderRight = '1px solid #4e4c4c';
                $(this).find('.clickable').css('border-top-left-radius', ' 25px');
                $(this).find('.clickable').css('border-top-right-radius', ' 25px');
                $(this).find('.clickable').css('border-bottom-right-radius', '25px');
                $(this).find('.clickable').css('border-bottom-left-radius', '25px');
                $(this).find('.clickable').css('border-bottom-width', '1px');
                $(this).find('.plus').removeClass('glyphicon-minus');
                $(this).find('.plus').addClass('glyphicon-plus');
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.style.borderBottom = '1px solid #4e4c4c';
                panel.style.borderTop = '2px solid #d8d8d8';
                panel.style.borderLeft = '1px solid #4e4c4c';
                panel.style.borderRight = '1px solid #4e4c4c';
                $(this).find('.clickable').css('border-top-left-radius', ' 25px');
                $(this).find('.clickable').css('border-top-right-radius', ' 25px');
                $(this).find('.clickable').css('border-bottom-right-radius', '0px');
                $(this).find('.clickable').css('border-bottom-left-radius', '0px');
                $(this).find('.clickable').css('border-bottom-width', '0px');
                $(this).find('.plus').removeClass('glyphicon-plus');
                $(this).find('.plus').addClass('glyphicon-minus');
            }
        });
    }
    sessionStorage.setItem("search", null);
    getViewSettingData();
    setInterval(ReloadGrid(), 15 * 60 * 1000);//setting Interval of 15 minutes by which every 15 minutes grid is getting refresh.
    $("#Prev").on("click", function () {
        var a = sessionStorage.getItem("RegPageSize");
        var b = sessionStorage.getItem("search");
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem("order");
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
            $.post('/CRM/AjaxGetJsonDataSortManageRegCalls', { id: "", start: d, pSize: a, search: b, order: o, ServerOrderValue: "" }, function (data) {
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
        //if (o != undefined && o != "null") {
        //    order = o.split(":");
        //    var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
        //    ordervalue = $(orderid).text();
        //    o = order[1] + "~" + ordervalue + "~" + order[2];
        //    JSON.stringify(o);
        //}
        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 40 - 1; }
        $("#example div").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/CRM/AjaxGetJsonDataSortManageRegCalls', { id: "", start: d, pSize: a, search: c, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });

    $("#IssueFilter").on("change", function () {
        var text = $("#IssueFilter option:selected").text();
        var value = $("#IssueFilter").val();
        var col = "Issuetype";
        var search = value + "," + col + ":integer";

        JSON.stringify(search);
        sessionStorage.setItem("search", search);
        var pSize = sessionStorage.getItem("RegPageSize");
        $("#example div").remove();
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/CRM/AjaxGetJsonDataSortManageRegCalls',
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
    //$("#P_dealers").on("change", function () {

    //    var value = $("#P_dealers").val();
    //    var text = $("#P_dealers option:selected").text();
    //    var col = "p_dealers";
    //    var search = value + "," + col + ":integer";

    //    JSON.stringify(search);
    //    sessionStorage.setItem("search", search);
    //    var pSize = sessionStorage.getItem("RegPageSize");
    //    $("#example div").remove();
    //    $("#loading").show();
    //    $('#loadingmessage').show();

    //    $.ajax({
    //        url: '/CRM/AjaxGetJsonDataSortManageRegCalls',
    //        type: "POST",
    //        data: { start: 0, pSize: pSize, search: search },
    //        success: function (data) {
    //            $(".filterDiv").css("display", "none")
    //            $("#fText").text(text);
    //            $("#FilterText").show();
    //            sessionStorage.setItem("Total", data.recordsTotal);
    //            loadData(data);
    //        },
    //        error: function (data) {
    //            alert("Failed");
    //        }
    //    });
    //});
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
            url: '/CRM/AjaxGetJsonDataSortManageRegCalls',
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
    ////for filtering on hometown
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

    ////for filtering on servicing agent
    //$("#ServicingAgentFilterForm").submit(function () {
    //    $('#ServicingAgent').modal('hide');
    //    if ($("#DealerId").val() != 0) {
    //        var dealercode = $("#DealerId option:selected").val();
    //        var empName = $("#DealerId option:selected").text();
    //        var col = "p_dealers";
    //        var search = dealercode + "," + col + ":integer";
    //        JSON.stringify(search);
    //        sessionStorage.setItem("search", search);
    //        var pSize = sessionStorage.getItem("RegPageSize");
    //        $("#example div").remove();
    //        $("#loading").show();
    //        $('#loadingmessage').show();
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
    $("#filterbtn").attr("disabled", false)

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
                    $(".LoaderOverlay").hide();
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
        }
    });
});

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
function Refresh() {

    $("#example1 tbody tr").remove();
    $("#example1").hide();
    $("#Remark").modal("hide");
    $(".tab").show();
}

function DoSearch() {
    var ValueToSearch = $("#filterText").val().trim();
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
        if (filter[0] == 8) {
            value = $("#filterText").val();
            col = "P_issuesfilegst";
            search = ValueToSearch + "," + col + ":integer";
        }
        if (filter[0] == 9) {
            value = $("#filterText").val();
            col = "Mobileno";
            search = ValueToSearch + "," + col + ":string";
        }
        JSON.stringify(search);
        sessionStorage.setItem("search", search);
        var pSize = sessionStorage.getItem("RegPageSize");
        $("#example div").remove();
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/CRM/AjaxGetJsonDataSortManageRegCalls',
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
        url: '/CRM/AjaxGetJsonDataSortManageRegCalls',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search },
        success: function (data) {
            // $("#fText").text(value);
            // $("#FilterText").show();
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

function hoverId(ctrl) {

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
    $('#loading').show();
    $('#loadingmessage').show();
    $.ajax({
        type: "POST",
        url: "/CRM/AjaxGetJsonDataSortManageRegCalls",
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
    $('.popover.fade.right.in').css('width', '225px');
    $('.popover.fade.right.in').css('left', '30px');
    $('.popover.fade.right.in').css('top', '40px');
    $('.popover.fade.right.in').css('max-width', 'none');
    $('.arrow').css('top', '-11px');
    $('.arrow').css('left', '40%');
    $('.popover-content').css('width', '225px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-top', '3px');




    event.preventDefault();

}


function AddCollaborator(ctrl) {
    var id = $(ctrl).parent().parent().parent().parent()[0].id;
    popOverOpen = false
    var Rowid = "#tr-" + id;
    var TaskPid = '';
    if ($(Rowid).hasClass("red")) {
        TaskPid = $(Rowid).children(1)[2].innerText;
    } else {
        TaskPid = $(Rowid).children(1)[1].innerText;
    }

    $('#CallCollaborators #PCall').val(TaskPid);

    $('#CallCollaborators').modal(options);
    $('#CallCollaborators').modal('show');

}
//$('["data-toggle"]').data - toggle();

function ShowLinkCustomerModal(CallId) {
    $("#LinkCustomerCallId").val(CallId);

    $('#LinkCustomer').modal(options);
    $('#LinkCustomer').modal('show');
}
function CallClose(id) {
    popOverOpen = false
    var RowId = "#tr-" + id
    var CustName = ""
    var CallId = ""
    if ($(RowId).hasClass("red")) {
        CustName = $(RowId).children(1)[4].innerText;
        CallId = $(RowId).children(1)[2].innerText;
    } else {
        CustName = $(RowId).children(1)[3].innerText;
        CallId = $(RowId).children(1)[1].innerText;
    }
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
                $('#CallClosedContent').html();
                $('#CallClosed').modal(options);
                $('#CallClosed').modal('show');

                if (data == "NoRemarkAfterLastCall") {
                    Mtitle = "There is no remark after Last Call.Please add remark to close call :" + "  " + CustName;
                    $('.modal-title').text(Mtitle);
                } else if (data == "CustomerNotLink") {
                    Mtitle = "Call is not linked to customer, please link customer , then close the call."
                    $('.modal-title').text(Mtitle);
                } else {
                    Mtitle = "Call Closed Successfully :" + "  " + CustName;
                    $('.modal-title').text(Mtitle);
                    var MainDivid = "#MainDiv-" + id
                    $(MainDivid).remove();
                    setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);
                }
            },
            error: function (data) {
                //Changed Shweta
                //alert("An error occured.Please try again later.");
                $('#CallClosedContent').html();
                $('#CallClosed').modal(options);
                var Mtitle = "Call is not linked to customer, please link customer , then close the call."
                $('.modal-title').text(Mtitle);
                $('#CallClosed').modal('show');

                //alert("An error occured.Please try again later.");
            }
        });
    } else {
        $('#CallClosedContent').html();
        $('#CallClosed').modal(options);
        var Mtitle = "Please add Remark to close Call!"
        $('.modal-title').text(Mtitle);
        $('#CallClosed').modal('show');
    }

}
function OnsiteVisit(id) {
    popOverOpen = false;
    var RowId = "#Onsite-" + id;
    var OnsiteCount = $(RowId).val();

    $("#Onsitevisit").text("Current Onsite Visits: " + OnsiteCount);
    $("#PCall1").val(id);
    $("#CalledFrom").val("ManageRegCalls");
    $('#OnsiteModal').modal(options);
    $('#OnsiteModal').modal('show');

}
function CallAssignTo(Callid) {
    popOverOpen = false
    $("#PCall").val(Callid);
    $('#Assignedto').modal(options);
    $('#Assignedto').modal('show');

}


function AddRemark(id) {
    popOverOpen = false
    $('#Remarktextarea').val('');
    var Rowid = "#tr-" + id;
    var Callid = '';
    var firmname = '';
    $('#issueId').val(id);
    if ($(Rowid).hasClass("red")) {
        Callid = $(Rowid).children(1)[2].innerText;
        firmname = $(Rowid).children(1)[4].innerText;
    } else {
        Callid = $(Rowid).children(1)[1].innerText;
        firmname = $(Rowid).children(1)[3].innerText;
    }

    $('#Remark').modal(options);
    var Mtitle = "Firm Name :  " + firmname;
    $('#Remark .modal-title').text(Mtitle);
    $('#Remark').modal('show');
}

function engageStatus(id) {
    popOverOpen = false
    var Rowid = "#tr-" + id;
    var Callid = '';
    var firmname = '';

    if ($(Rowid).hasClass("red")) {
        Callid = $(Rowid).children(1)[2].innerText;
        firmname = $(Rowid).children(1)[4].innerText;
    } else {
        Callid = $(Rowid).children(1)[1].innerText;
        firmname = $(Rowid).children(1)[3].innerText;
    }
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
    var Callid = '';

    if ($(Rowid).hasClass("red")) {
        Callid = $(Rowid).children(1)[2].innerText;
    } else {
        Callid = $(Rowid).children(1)[1].innerText;
    }
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
                $(select[0]).append('<option value=' + item.P_Infotable + '>' + item.NameOfInfo + '</option>');
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
    $('.arrow').css('left', '100px');
    $('.popover-content').css('width', '210px');
    $('.popover-content').css('height', '68px');
    $('.popover-content').css('padding-top', '3px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-left', '9px');

    event.preventDefault();
}

function SubmitCallRemark(btnid) {
    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton")   
    var Callid = $('#issueId').val();
    remark = $("#Remarktextarea").val();
    $("#Remarktextarea").val("");
    $('#Remark').modal("hide");
    var id = a_ID;
    if (remark != "") {
        $.ajax({
            type: "POST",
            url: "/CRM/AddCallRemark",
            data: { CallId: Callid, remark: remark },
            success: function (data) {
                if (data == "LogOut") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                var Mtitle = "Remark added Successfully.";
                $('#CallClosedContent').html('');
                $('#CallClosed').modal(options);
                $('#CallClosed .modal-title').text(Mtitle);
                $('#CallClosed').modal("show");
                $(btn).removeClass("disabledbutton")
                setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
                var hasRemarkid = "#HasRemark-" + id
                $(hasRemarkid).val("Y");
                //$("#top-" + id).removeClass("red").removeClass("TopRed").addClass("TopBlue");
                
                //var parentid = "#MainDiv-" + id;
                //$(parentid).removeClass("red");
                
                //var rconrners_inner = "rcorners_inner-" + id;
                //$(rconrners_inner).removeClass("rcorners_innerRed");
                //$(rconrners_inner).attr("style", "");
                //$(rconrners_inner).addClass("rcorners_innerBlue");

                //var paenlRed = "panelRed-" + id;
                //$(paenlRed).removeClass("panelRed");
                //$(paenlRed).addClass("panelBlue blue");
                //$(paenlRed).children().removeClass("HiddenRed");
                //$(paenlRed).addClass("HiddenBlue");
                //$(paenlRed).css("border-color", "rgb(60, 141, 188)");
            
                //$(parentid).css("background-color", "white");
                //$(parentid).find(".MoreDetails").css("background-color", "white");
                //var moredetails = "#" + id;
                //$(moredetails).css("background-color", "white");
                //$(parentid).css("color", "black");

            }
        })
        return false;
    }
}

function SubmitCallAssignTo(btnid) {
    var empId = $("#Employee").val();
    var Callid = $('#PCall').val();
    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton");
    $('#Assignedto').modal("hide");
    if (empId != "0") {
        $.ajax({
            type: "POST",
            url: "/CRM/CallAssignedTo",
            data: { Callid: Callid, empId: empId },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                if (data == "") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                var Mtitle = "Call assigned Successfully.";

                $('#CallClosedContent').html('');
                $('#CallClosed').modal(options);
                $('#CallClosed .modal-title').text(Mtitle);

                $('#CallClosed').modal("show");
                $("#Employee").val("");
                $('#PCall').val("");
                setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
            },
            error: function () {
                $('#NoRow').modal(options);
                var Mtitle = "Select a Row";
                $('#NoRow .modal-title').text(Mtitle);
                $('.modal-title').css('text-align', 'center');
                $('#NoRow').modal('show');
            }
        });
    }
    $(btn).removeClass("disabledbutton")
}

function SubmitMarkAsDuplicate(ctrl) {
    var Rowid1 = $(ctrl).parent().parent().parent().parent().parent().parent()[0].id;
    var hasRemarkid = "#HasRemark-" + Rowid1
    var hasRemarkValue = $(hasRemarkid).val();
    var rowid = "#tr-" + Rowid1
    $(ctrl).addClass("disabledbutton")

    var Callid = $(rowid).find(".TxtCallId").val();
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
                    $('#CallClosedContent').html();
                    $('#CallClosed').modal(options);
                    var Mtitle = "There is no remark after Last Call from Customer. Please put remark!"
                    $('.modal-title').text(Mtitle);
                    $('#CallClosed').modal('show');
                } else {
                    $('#CallClosedContent').html();
                    $('#CallClosed').modal(options);
                    var Mtitle = "Call Marked as Duplicate!"
                    $('.modal-title').text(Mtitle);
                    $('#CallClosed').modal('show');
                    setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);
                }
            },
            error: function () {
                $('#CallClosedContent').html();
                $('#CallClosed').modal(options);
                var Mtitle = "An error occured.Please try again later!"
                $('.modal-title').text(Mtitle);
                $('#CallClosed').modal('show');
            }
        });

    } else {
        $('#CallClosedContent').html();
        $('#CallClosed').modal(options);
        var Mtitle = "Add remark first then Mark as duplicate!"
        $('.modal-title').text(Mtitle);
        $('#CallClosed').modal('show');
    }
    var rowid = "#top-" + CallKeytoDuplicate;
    $(rowid).find(".TxtCallId").val("");
}

//Show remarks of a task when clicking on the icon
function ViewRemarks(ctrl) {
    
    //popoverClose()
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

function SubmitLinkCustomer(btnid) {
    var P_customers = $("#P_Customers").val();
    //var id = $("#Issuesfilegstkey").val();
    var CallId = $("#LinkCustomerCallId").val();
    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton")
    $.ajax({
        type: "POST",
        url: "/CRM/LinkCustomer",
        data: { CallId: CallId, P_Customers: P_customers },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }

          
            $('#LinkCustomer').modal("hide");
            $(btn).removeClass("disabledbutton");
            var Mtitle = "Customer is linked Successfully.";
            $("#P_Customers").val("");
            $("#LinkCustomerCallId").val("");
            $("#FirmName1").val("");

            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text(Mtitle);
            // $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
            $('#CallClosed').modal("show");

            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "Select a Row";
            $('#NoRow .modal-title').text(Mtitle);
            $('.modal-title').css('text-align', 'center');
            $('#NoRow').modal('show');
        }
    });
    $(btn).removeClass("disabledbutton")
}
function SubmitMailtoDealer(btnid) {
    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton")
    var formdata = new FormData(document.getElementById('MailDealer'))
    //Creating an XMLHttpRequest and sending
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/CRM/MailToDealer');
    xhr.send(formdata);
    $('#MailToDealer').modal("hide");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            $('#MailToDealer').modal("hide");
            var Mtitle = "Email Sent Successfully.";
            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text(Mtitle);
            $('#CallClosed').modal("show");
            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
            $("#issuesfilegstkeyMailTodealer").val("");
            $("#MailtodealerEmail").val("");
            $("#OtherEmail").val("");

        }
    }
    $(btn).removeClass("disabledbutton");
    return false;

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

                $('#CallClosedContent').html('');
                $('#CallClosed').modal(options);
                $('#CallClosed .modal-title').text(Mtitle);
                // $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
                $('#CallClosed').modal("show");

                setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
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
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            ;

            var Mtitle = "Message is sent to Customer.";

            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text(Mtitle);
            // $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
            $('#CallClosed').modal("show");
            $("#T").val("");
            $("#Mobileno").val("");
            $("#PCallMsgToCustomer").val("");
            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "Select a Row";
            $('#NoRow .modal-title').text(Mtitle);
            $('.modal-title').css('text-align', 'center');
            $('#NoRow').modal('show');
        }
    });
    $(btn).removeClass("disabledbutton")
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
        data: { PCall: Pcall, EmailId: email, Message: Msg,calltype: 'C' },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            ;

            var Mtitle = "Email is sent to Customer.";

            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text(Mtitle);
            // $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
            $('#CallClosed').modal("show");
            $("#PCallMailToCustomer").val("");
            $("#firmNameMailtoCustomer").val("");
            $("#emailMailtoCustomer").val("");
            $("#msgMailToCustomer").val("");
            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "Select a Row";
            $('#NoRow .modal-title').text(Mtitle);
            $('.modal-title').css('text-align', 'center');
            $('#NoRow').modal('show');
        }
    });
    $(btn).removeClass("disabledbutton")
}
function submitCallCollaborator(btnid) {
    var Pcall = $("#CallCollaborators #PCall").val();
    var collabId = $("#collaboratorId").val();
    $('#CallCollaborators').modal("hide");
    $.ajax({
        type: "POST",
        url: "/CRM/AddCallCollaborators",
        data: { PCall: Pcall, collaboratorId: collabId, calltype: "C" },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }



            var Mtitle = "Collaborator added successfully.";

            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text(Mtitle);
            // $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
            $('#CallClosed').modal("show");
            $("#CallCollaborators #PCall").val("");
            $("#collaboratorId").val("");
            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "Select a Row";
            $('#NoRow .modal-title').text(Mtitle);
            $('.modal-title').css('text-align', 'center');
            $('#NoRow').modal('show');
        }
    });

}

function SubmitCallEngage(ctrl) {
    
    var status = ""
    if (ctrl.id == "popup") {
        status = $("#callEngageStatus :selected").val();
        $("#callEngageStatus").val("0")
        $('#EngageStatus').modal("hide");
    } else {
        var id = $(ctrl).parent().parent().parent().parent().parent()[0].id;
        var Rowid = "#tr-" + id;
        var select = $(Rowid).find(".callstatusInput");
        status = $(select[0]).children("option:selected").val();
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
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                if (data == "LogOut") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                var id = "#eng-" + CallId;
                $(id).html(data);
                ;

                var Mtitle = "Status added successfully.";
                $('#CallClosedContent').html('');
                $('#CallClosed').modal(options);
                $('#CallClosed .modal-title').text(Mtitle);
                $('#CallClosed').modal("show");
                $("#callId").val("");
                $("#CallEngageStatus").val("0");
                setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
            },
            error: function () {
                $('#NoRow').modal(options);
                var Mtitle = "An error Occured! Please try again";
                $('#NoRow .modal-title').text(Mtitle);
                $('.modal-title').css('text-align', 'center');
                $('#NoRow').modal('show');
            }
        });
    }
    //popoverClose();
    $(ctrl).removeClass("disabledbutton");
}

function submitOnsiteVisit(btnid) {
    
    var Pcall = $("#PCall1").val();
    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton");
    $('#OnsiteModal').modal("hide");
    $.ajax({
        type: "POST",
        url: "/CRM/OnsiteVisit",
        data: { PCall: Pcall },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }

            ;

            var Mtitle = "Visit added successfully.";

            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text(Mtitle);
            // $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
            $('#CallClosed').modal("show");

            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "An Error Occured. Please try again Later";
            $('#NoRow .modal-title').text(Mtitle);
            $('.modal-title').css('text-align', 'center');
            $('#NoRow').modal('show');
        }
    });
    $(btn).removeClass("disabledbutton");
}
function defferCallSubmit(ctrl) {
    var rid = $(ctrl).parent().parent().parent().parent().parent().parent()[0].id;
    $(ctrl).addClass("disabledbutton");
    popoverClose();
    var id = rid.split("-")
    var rowid = "#" + rid
    var CallId = ""
    if ($(rowid).hasClass("red")) {
        CallId = $(rowid).children(1)[2].innerText;
    } else {
        CallId = $(rowid).children(1)[1].innerText;
    }

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
    $(ctrl).removeClass("disabledbutton");

}
function ShowCollaborators(ctrl) {

    var id = $(ctrl).parent().parent().parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var CallPid = $(Rowid).children(1)[1].innerText;
    if ($(Rowid).hasClass("red")) {
        CallPid = $(Rowid).children(1)[2].innerText;
    } else {
        CallPid = $(Rowid).children(1)[1].innerText;
    }


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

    $.post('/CRM/AjaxGetJsonDataSortManageRegCalls', { id: "", start: 1, pSize: a, search: b, order: o, ServerOrderValue: firmname }, function (data) {
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
        debugger
        // this === item.$node
        var Rowid1;

        var DivId = item.$trigger[0].id
        DivIdArr = DivId.split("-")
        Rowid1 = DivIdArr[1];
        var RowId = "#top-" + Rowid1

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
        var RowId = "#top-" + id
        var CallId = ""
        var DivId = item.$trigger[0].id
        DivIdArr = DivId.split("-")
        Rowid1 = DivIdArr[1];
        var RowId = "#top-" + Rowid1
        if ($(item.$trigger[0]).hasClass("red")) {

            CallId = $(RowId).children(1)[2].innerText;
        } else {

            CallId = $(RowId).children(1)[1].innerText;
        }
        $('<span>Date'
        + ' <input id="NextActionDateContext" name="NextActionDate" type="datetime-local" style="width:135px; color:black" /><div class="btn btn-success DateBtn" id="DefferDate" style="padding-top: 2px;padding-right: 7px;padding-bottom: 1px;padding-left: 7px;"><i class="glyphicon glyphicon-ok"></i></div>')
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
                   url: '/CRM/AjaxGetJsonDataSortManageRegCalls',
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
                   url: '/CRM/AjaxGetJsonDataSortManageRegCalls',
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
                    a_ID = id;
                    switch (key) {
                        //function add Remark modal
                        case "AddRemark":
                            
                            var Rowid = "#top-" + id;

                            var Callid = '';
                            //$('#issueId').val(id);

                            var firmname = '';
                            if ($(Rowid).hasClass("red")) {
                                var Callid = $(Rowid).children(1)[2].innerText;
                                var firmname = $(Rowid).children(1)[1].innerText;
                            } else {
                                if ($(Rowid).children(1).hasClass("numberCircle")) {
                                    Callid = $(Rowid).children(1)[2].innerText;
                                }
                                else {
                                    var Callid = $(Rowid).children(1)[1].innerText;
                                }
                                var firmname = $(Rowid).children(1)[0].innerText;
                            }
                            $('#issueId').val(Callid);
                            $('#Remark').modal(options);
                            var Mtitle = "Firm Name :  " + firmname;
                            $('#Remark .modal-title').text(Mtitle);
                            $('#Remark').modal('show');
                            break;

                            //function to show remarks model
                        case "ViewRemarks":
                            
                            var Rowid = "#top-" + id;
                            var Callid = '';
                            if ($(Rowid).hasClass("red")) {
                                Callid = $(Rowid).children(1)[2].innerText;
                            } else {
                                if ($(Rowid).children(1).hasClass("numberCircle")) {
                                    Callid = $(Rowid).children(1)[2].innerText;
                                }
                                else {
                                    Callid = $(Rowid).children(1)[1].innerText;
                                }
                            }
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
                                         + " " + ("<div class='col-md-3' style='width: 300px; padding-left:5px; text-align:left;padding-right:0px;' >" + item.Commtext + "</div>")
                                         + " " + ("<div class='col-md-4' style='width: 130px; padding-left: 0px; padding-right: 15px; text-align:center;'  >" + item.TextCommunicationType + " </div>")
                                         + " " + ("<div class='col-md-2' style='padding-left: 0px; width: 250px; padding-right: 10px;margin-left: 20px;'>" + item.FrmtCreationDate + " </div>")
                                         + " " + ("<div class='col-md-2' style='width:180px; padding-left:15px; text-align:center; padding-right:0px; margin-left: 10px;'>" + item.TextLogincode + "</div>")
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
                            var Rowid = "#top-" + id;
                            var Callid = '';
                            if ($(Rowid).hasClass("red")) {
                                Callid = $(Rowid).children(1)[2].innerText;
                            } else {
                                if ($(Rowid).children(1).hasClass("numberCircle")) {
                                    Callid = $(Rowid).children(1)[2].innerText;
                                }
                                else {
                                    Callid = $(Rowid).children(1)[1].innerText;
                                }
                            }
                            $("#PCall").val(Callid);
                            $('#Assignedto').modal(options);
                            $('#Assignedto').modal('show');
                            break;

                            //Function for call close modal
                        case "CallClose":
                            var RowId = "#top-" + id
                            var CustName = ""
                            var callId = ""
                            if ($(RowId).hasClass("red")) {
                                CustName = $(RowId).children(1)[1].innerText;
                                callId = $(RowId).children(1)[2].innerText
                            } else {
                                CustName = $(RowId).children(1)[0].innerText;
                                callId = $(RowId).children(1)[1].innerText
                            }
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
                                        $('#CallClosedContent').html();
                                        $('#CallClosed').modal(options);
                                        $('#CallClosed').modal('show');

                                        if (data == "NoRemarkAfterLastCall") {
                                            Mtitle = "There is no remark after Last Call.Please add remark to close call :" + "  " + CustName;
                                            $('.modal-title').text(Mtitle);
                                        } else if (data == "CustomerNotLink") {
                                            Mtitle = "Call is not linked to customer, please link customer , then close the call."
                                            $('.modal-title').text(Mtitle);
                                        } else if (data == "CallNotAssigned") {
                                            Mtitle = "Call is not Assigned, please Assign call , then close the call."
                                            $('.modal-title').text(Mtitle);
                                        } else if (data == "CallNotAssignedtoLoggedInEmployee") {
                                            Mtitle = "Call can only be closed by whomever it is assigned!"
                                            $('.modal-title').text(Mtitle);
                                        } else {
                                            Mtitle = "Call Closed Successfully :" + "  " + CustName;
                                            $('.modal-title').text(Mtitle);
                                            var MainDivid = "#MainDiv-" + id
                                            $(MainDivid).remove();
                                            setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);
                                        }
                                    },
                                    error: function (data) {
                                        //Changed Shweta
                                        //alert("An error occured.Please try again later.");
                                        $('#CallClosedContent').html();
                                        $('#CallClosed').modal(options);
                                        var Mtitle = "Call is not linked to customer, please link customer , then close the call."
                                        $('.modal-title').text(Mtitle);
                                        $('#CallClosed').modal('show');

                                    }
                                });
                            } else {
                                $('#CallClosedContent').html();
                                $('#CallClosed').modal(options);
                                var Mtitle = "Please add Remark to close Call!"
                                $('.modal-title').text(Mtitle);
                                $('#CallClosed').modal('show');
                            }

                            break;

                            //function to show CallEngagectrls model
                        case "CallEngage":
                            var Rowid = "#top-" + id;
                            var Callid = '';
                            var firmname = '';

                            if ($(Rowid).hasClass("red")) {
                                Callid = $(Rowid).children(1)[2].innerText;
                                firmname = $(Rowid).children(1)[1].innerText;
                            } else {
                                Callid = $(Rowid).children(1)[1].innerText;
                                firmname = $(Rowid).children(1)[0].innerText;
                            }
                            $('#callId').val(Callid);
                            $('#EngageStatus').modal(options);
                            var Mtitle = "Firm Name :  " + firmname;
                            $('#EngageStatus .modal-title').text(Mtitle);
                            $('#EngageStatus').modal('show');

                            break;

                            //function for onsite service modal
                        case "OnsiteVisit":
                            
                            //var RowId = "#Onsite-" + id;
                            //var OnsiteCount = $(RowId).val();

                            //$("#Onsitevisit").text("Current Onsite Visits: " + OnsiteCount);
                            var RowId = "#top-" + id;
                            var callId = "";
                            if ($(RowId).hasClass("red")) {
                                callId = $(RowId).children(1)[2].innerText
                            } else {
                                callId = $(RowId).children(1)[1].innerText
                            }
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
                            });

                            $("#PCall1").val(callId);
                            $("#CalledFrom").val("ManageRegCalls");
                            $('#OnsiteModal').modal(options);
                            $('#OnsiteModal').modal('show');
                            break;

                            //Function to show mailtodealer modal
                        //case "MailToDealer":
                        //    var RowId = "#top-" + id
                        //    var CustName = '';
                        //    if ($(RowId).hasClass("red")) {
                        //        var CustName = $(RowId).children(1)[1].innerText;
                        //    } else {
                        //        var CustName = $(RowId).children(1)[0].innerText;
                        //    }

                        //    $("#issuesfilegstkeyMailTodealer").val(id);

                        //    $('#MailToDealer').modal(options);
                        //    var Mtitle = "Mail To Dealer: " + CustName;
                        //    $('MailToDealer .modal-title').text(Mtitle);
                        //    $('#MailToDealer').modal('show');
                        //    break;

                            //function to show msgto customer modal
                        case "MsgToCustomer":
                            
                            var RowId = "#top-" + id
                            var CustName = '';
                            var PCall = '';
                            var innerdivid = "#rcorners_inner-" + id;
                            var innerdivChild = $(innerdivid).children()[1];
                            var phonediv = $(innerdivChild).children()[1]
                            var phone = $(phonediv).children(1)[1].innerText;
                            if ($(RowId).hasClass("red")) {
                                CustName = $(RowId).children(1)[1].innerText;
                                PCall = $(RowId).children(1)[2].innerText;
                            } else {
                                CustName = $(RowId).children(1)[0].innerText;
                                PCall = $(RowId).children(1)[1].innerText;
                            }

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
                            var RowId = "#top-" + id
                            var CustName = '';
                            var PCall = '';
                            if ($(RowId).hasClass("red")) {
                                CustName = $(RowId).children(1)[1].innerText;
                                PCall = $(RowId).children(1)[2].innerText;
                            } else {
                                CustName = $(RowId).children(1)[0].innerText;
                                PCall = $(RowId).children(1)[1].innerText;
                            }
                            $("#PCallMailToCustomer").val(PCall);
                            $("#firmNameMailtoCustomer").val(CustName);
                            $('#MailToCustomer').modal(options);
                            var Mtitle = "Mail To Customer: " + CustName;
                            $('.modal-title').text(Mtitle);
                            $('#MailToCustomer').modal('show');
                            break;

                            //function to show addcollaborator model
                        case "AddCollaborator":
                            var Rowid = "#top-" + id;
                            var TaskPid = '';
                            if ($(Rowid).hasClass("red")) {
                                var TaskPid = $(Rowid).children(1)[2].innerText;
                            } else {
                                var TaskPid = $(Rowid).children(1)[1].innerText;
                            }
                            $('#CallCollaborators #PCall').val(TaskPid);
                            $('#CallCollaborators').modal(options);
                            $('#CallCollaborators').modal('show');
                            break;

                            //function to show ShowCollaborators model
                        case "ShowCollaborators":
                            
                            var Rowid = "#top-" + id;
                            var CallPid = '';
                            var CustName = '';
                            if ($(Rowid).hasClass("red")) {
                                var CallPid = $(Rowid).children(1)[2].innerText;
                                var CustName = $(Rowid).children(1)[1].innerText;
                            } else {
                                var CallPid = $(Rowid).children(1)[1].innerText;
                                var CustName = $(Rowid).children(1)[0].innerText;
                            }
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
                                        more1.html(("<div class='col-md-3 col-sm-3 col-xs-3 ViewcollaboratorsSno ' style='/*text-align: center;*/'>" + m + "</div>")
                                                     + " " + ("<div class='col-md-7 col-sm-7 col-xs-7 ViewcollaboratorsEmpName' style='/*text-align:center;*/' >" + item.TxtCollaborator + "</div>")
                                                     + " " + ("<div class='col-md-2 col-sm-2 col-xs-2 ViewcollaboratorsClose' style='padding-right: 0px;padding-left: 30px;' ><a class='' id='" + item.CRMCollaborator_key + "' onclick='deleteCollaborator(this.id)' style='cursor: pointer;'><i class='glyphicon glyphicon-remove'></i></a></div>")
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
                            var Rowid = "#top-" + id;
                            var CallPid = '';
                            if ($(Rowid).hasClass("red")) {
                                CallPid = $(Rowid).children(1)[2].innerText;
                            } else {
                                CallPid = $(Rowid).children(1)[1].innerText;
                            }
                            $("#LinkCustomerCallId").val(CallPid);
                            $('#LinkCustomer').modal(options);
                            $('#LinkCustomer').modal('show');
                            break;
                            //function to show Edit model
                        case "Edit":
                            var Rowid = "#top-" + id;
                            var CallPid = '';
                            if ($(Rowid).hasClass("red")) {
                                CallPid = $(Rowid).children(1)[2].innerText;
                            } else {
                                CallPid = $(Rowid).children(1)[1].innerText;
                            }
                            window.location = '/CRM/EditRegCalls?P_allCallReg=' + CallPid + '&CalledFrom=ManageRegCalls'
                            break;

                            //function to show Defercall model
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

                            //function to show ServicingDealer model
                        //case "ServicingDealer":
                        //    var options = {
                        //        "backdrop": "static",
                        //        keyboard: true
                        //    };
                        //    $('#ServicingAgent').modal(options);
                        //    $('#ServicingAgent').modal('show');
                        //    break;

                        case "ViewSetting":
                            window.location = '/Configuration/ManageViewSettings?infotype=hoverstripstring&viewid=manageregcalls'
                            break;
                    }
                },
                items: {},
                //    "AddRemark": { name: "Add Remarks", icon: "fa-comment-o" },
                //    "ViewRemarks": { name: "View Remarks", icon: "fa-list" },
                //    "CallAssignTo": { name: "Call Assign To", icon: "fa-phone" },
                //    "CallClose": { name: "Call Closed", icon: "fa-close", css: "height'15px'" },
                //    "OnsiteVisit": { name: "Onsite Service", icon: "fa-suitcase" },
                //    "MailToDealer": { name: "Mail To Dealer", icon: "fa-envelope" },
                //    "ContactCustomer": {
                //        name: "Contact Customer", icon: "fa-address-book", "items": {
                //            "MsgToCustomer": { name: "Msg To Customer", icon: "fa-mobile", css: "height'25px'" },
                //            "MailToCustomer": { name: "Mail To Customer", icon: "fa-envelope-o" }
                //        }
                //    },
                //    "Collaborators": {
                //        name: "Collaborators", icon: "fa-users", "items": {
                //            "AddCollaborator": { name: "Add Collaborator", icon: "fa-plus" },
                //            "ShowCollaborators": { name: "View Collaborator", icon: "fa-eye" },
                //        }
                //    },
                //    "ShowLinkCustomerModal": { name: "Link Customer", icon: "fa-link" },
                //    "Edit": { name: "Edit", icon: "fa-pencil" },
                //    "MarkAsDuplicate": { name: "Mark As Duplicate", icon: "fa-clone", "items": { "input": { type: 'input', customName: 'input', callback: HTMLInputElement } } },
                //    "DefferCall": { name: "Deffer Call", icon: "fa-clock-o", "items": { "CustCode1": { type: 'DefferCall1', customName: 'DefferCall1', callback: HTMLInputElement } } },
                //    "CallEngage": { name: "Call Engage Status", icon: "fa-user", },
                //    "Filter": {
                //        name: "Filter", icon: "fa-filter", "items": {
                //            "nofilter": { name: "No filter", icon: "fa-times" },
                //            "Date": { name: "Date", icon: "fa-calendar" },
                //            "FirmName": { name: "Firm Name", icon: "fa-user" },
                //            "ServicingDealer": { name: "Servicing Dealer", icon: "fa-user-circle-o" },
                //            "HomeTown": {
                //                name: "Home Town", icon: "fa-home", "items": {
                //                    "Location": { type: 'Location', customName: 'Location', callback: HTMLInputElement }
                //                }
                //            },
                //            "Issue": { name: "Issue", icon: "fa-exclamation-triangle" },
                //            "Assignto": { name: "Assign To", icon: "fa-phone" },
                //            "CallId": { name: "Call Id", icon: "fa-phone" },
                //            "Mobileno": { name: "Mobile No.", icon: "fa-mobile" },
                //            "CustomerName": { name: "Customer Name", icon: "fa-user", "items": { "CustomerName1": { type: 'CustomerName1', customName: 'CustomerName1', callback: HTMLInputElement } } },
                //        }
                //    }
                //},

            }
            if ($trigger.hasClass('parentdiv')) {
                var infoStringArray = infoString.split("~");
                for (var i = 0; i <= infoStringArray.length - 1; i++) {
                    var infoStringItemArray = infoStringArray[i].split("#");
                    var itemOrder = infoStringItemArray[0];
                    var itemEnable = infoStringItemArray[1];
                    var itemtext = $.trim(infoStringItemArray[2]);
                    if (itemtext.toLocaleLowerCase() == "call engage") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.CallEngage = { name: "Call Engage Status", icon: "fa-user" };
                        }
                    }
                    else if (itemtext.toLocaleLowerCase() == "link customer") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.ShowLinkCustomerModal = { name: "Link Customer", icon: "fa-link" };
                        }
                    }
                    else if (itemtext.toLocaleLowerCase() == "add remarks") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.AddRemark = { name: "Add Remarks", icon: "fa-comment-o" };
                        }
                    }
                    else if (itemtext.toLocaleLowerCase() == "view remarks") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.ViewRemarks = { name: "View Remarks", icon: "fa-list" };
                        }
                    }
                    else if (itemtext.toLocaleLowerCase() == "call assign to") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.CallAssignTo = { name: "Call Assign To", icon: "fa-phone" }
                        }
                    }

                    else if (itemtext.toLocaleLowerCase() == "edit") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.Edit = { name: "Edit", icon: "fa-pencil" };
                        }
                    }

                    else if (itemtext.toLocaleLowerCase() == "call closed") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.CallClose = { name: "Call Closed", icon: "fa-close", css: "height'15px'" };
                        }
                    }
                    else if (itemtext.toLocaleLowerCase() == "onsite service") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.OnsiteVisit = { name: "Onsite Service", icon: "fa-suitcase" };
                        }
                    }
                    else if (itemtext.toLocaleLowerCase() == "defercall") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.DefferCall = {
                                name: "Deffer Call", icon: "fa-clock-o",
                                "items": {
                                    "CustCode1": {
                                        type: 'DefferCall1', customName: 'DefferCall1', callback: HTMLInputElement
                                    }
                                }
                            };
                        }
                    }
                    else if (itemtext.toLocaleLowerCase() == "contact customer") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.ContactCustomer = {
                                name: "Contact Customer", icon: "fa-address-book",
                                "items": {
                                    "MsgToCustomer": { name: "Msg To Customer", icon: "fa-mobile", css: "height'25px'" },
                                    "MailToCustomer": { name: "Mail To Customer", icon: "fa-envelope-o" }
                                }
                            };
                        }
                    }
                    else if (itemtext.toLocaleLowerCase() == "mark duplicate") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.MarkAsDuplicate = {
                                name: "Mark As Duplicate", icon: "fa-clone",
                                "items": {
                                    "input": {
                                        type: 'input', customName: 'input', callback: HTMLInputElement
                                    }
                                }
                            };

                        }
                    }
                    else if (itemtext.toLocaleLowerCase() == "collaborators") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.Collaborators = {
                                name: "Collaborators", icon: "fa-users",
                                "items": {
                                    "AddCollaborator": { name: "Add Collaborator", icon: "fa-plus" },
                                    "ShowCollaborators": { name: "View Collaborator", icon: "fa-eye" },
                                }
                            };
                        }
                    }
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
    })
})

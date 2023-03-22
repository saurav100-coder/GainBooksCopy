var options = { "backdrop": "static", keyboard: true };
var popOverOpen = false;
var CurrentHoverRowId = 0;
var CollabPopOpen = false
//1) global variable for viewSettings
var infoString = "";




function loadData(data) {
    var tblEmployee = $("#example");
    $("#example div").remove();
    var a = data.draw;
    if ($("#Next").hasClass("disabledbutton") == true) { $("#Next").removeClass("disabledbutton"); }
    if ($("#Prev").hasClass("disabledbutton") == true) { $("#Prev").removeClass("disabledbutton"); }
    //var d = sessionStorage.getItem("PageSize");
    var d = 49999
    if (d == null || d == 0 || d == "undefined") { d = 49999; sessionStorage.setItem("PageSize", d); };
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

        Parentdiv = $("<div id='MainDiv-" + item.menumaster_key + "' class='col-md-12  clickable parentdiv maindiv' style='padding-left:0px;' onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        MoreDetailsdiv = $(("<div  class='MoreDetails' id='" + item.menumaster_key + "' style='position: absolute; z-index: 2; background-color: rgb(204, 230, 255); width: 180px; height: 34px; right:10px; top:3px; border: none !important; display:none;'> </div>"))

        tblEmployee.append(Parentdiv);
        m = m + 1;
        var div = $("<div id='tr-" + item.menumaster_key + "'  style='display:inline-flex;' class='MainTr'></div>");
        //"<div style='width: 3%;padding: 0px 5px;' id='" + item.Customers_Key + "' value='" + item.Customers_Key + " style='margin-top:2px; float:left'>" + m + ".</div>"
        div.html(("<div class='sno basicTr' style='width: 6%;padding: 0px 0px; text-align:left;' id='" + item.menumaster_key + "' value='" + item.menumaster_key + "'><input type='checkbox' onclick='chkCheckUncheck(this)' style='margin-right: 0px;' id='" + item.menumaster_key + "' value='" + item.menumaster_key + "'>&nbsp;" + m + ".</div>")
            + " " + ("<div class='p_menumaster basicTr' style='width: 10%;padding: 0px 0px 0px 0px; text-align:center '>" + item.p_menumaster + "</div>")
            + " " + ("<div class='prgname basicTr clamp' style='width:12%;padding: 0px 4px 0px 0px;'>" + item.prgname + "</div>")
            + " " + ("<div  class='text basicTr clamp2' style='width: 14%;padding: 0px 0px 0px 0px;'>" + item.text + "</div>")
            + " " + ("<div class='usedin basicTr'style='width: 5%;padding: 0px 0px 0px 7px; '>" + item.usedin + "</div>")
            + " " + ("<div class='under basicTr' style='width: 6%;padding: 0px 0px 0px 0px; text-align:center; '>" + item.under + "</div>")
            + " " + ("<div class='menuitemyn basicTr' style='width: 10%;padding: 0px 0px 0px 0px; text-align:center; '>" + item.menuitemyn + "</div>")
            + " " + ("<div class='menulabelweb basicTr clamp2' style='width: 13%;padding: 0px 0px 0px 0px; '>" + item.menulabelweb + "</div>")
            + " " + ("<div class='menulabelapp basicTr clamp2' style='width: 13%;padding: 0px 0px 0px 5px; '>" + item.menulabelapp + "</div>")
            + " " + ("<div class='synchstatus basicTr' style='width: 6%;padding: 0px 0px 0px 0px; text-align:center; '>" + item.synchstatus + "</div>")
            + " " + ("<div class='webmenuorder basicTr' style='width: 10%;padding: 0px 0px 0px 0px; text-align:center; '>" + item.webmenuorder + "</div>")
            + " " + ("<div class='appmenuorder basicTr' style='width: 10%;padding: 0px 0px 0px 0px; text-align:center; '>" + item.appmenuorder + "</div>")
            + " " + ("<div class='webicon basicTr clamp2' style='width: 12%;padding: 0px 0px 0px 0px; '>" + item.webicon + "</div>")
            + " " + ("<div class='appicon basicTr clamp2' style='width: 12%;padding: 0px 0px 0px 0px; '>" + item.appicon + "</div>")
            + " " + ("<div class='webmenuurl basicTr clamp2' style='width: 12%;padding: 0px 0px 0px 0px; '>" + item.webmenuurl + "</div>")
            + " " + ("<div class='show_on_home basicTr' style='width: 8%;padding: 0px 0px 0px 15px; '>" + item.show_on_home + "</div>")
            + " " + ("<div class='apphomeorder basicTr' style='width: 6%;padding: 0px 0px 0px 6px; '>" + item.apphomeorder + "</div>")
         );
        
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
                    moreDetailsDivHtml += "<a data-toggle='Edit Menu'><img src='/images/edit.png' onclick='EditMenuCtrls(this)' style='width: 37px; margin-top:-3px;' ></a>";
                }
            }
            else if (itemtext.toLocaleLowerCase() == "delete") {
                if (itemEnable.toLocaleLowerCase() == "y") {
                    moreDetailsDivHtml += "<a data-toggle='Delete Menu'><img src='/images/icon-delete.png' style='width: 20px; padding-top:6px;' onclick='DeleteMenuCtrls(this)'></a>";
                }
            }
        }

        //6) at last we show Customize HoverStrip menu and this will redirect to viewsetting controller
        //moreDetailsDivHtml += "<a data-toggle='Customize Hover Strip' href='/Configuration/ManageViewSettings?infotype=hoverstripstring&viewid=updateinfotable'><i class='fa fa-wrench'  style='font-size:22px; color:#616A6B; padding-left:11px;'></i></a>";

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
    var TableDive = $(".calHeightTaskBar").height();
    var Footer = $(".main-footer").height();
    var databaseDiv = $("#databaseDiv").height()
    var windowHeight = $(window).height();
    var SumOfElementHeight = Header + TableDive + icondiv + Footer + databaseDiv;
    var MainHeight = windowHeight - SumOfElementHeight - 15;
    $("#example").height(MainHeight);
}



$(document).ready(function () {
    $(window).resize(function () {
        Deviceheight();
    });
});
$(document).ready(function () {
    
    //var d = $("#fvalue").val();
    //var m = [];
    //m = d.split("|");
    //var l;
    //for (i = 0; i <= m.length - 1; i = i + 1) {
    //    l = m[i].split("~");
    //    var dropdown = $("#filter");
    //    $('#filter').append($('<option>', {
    //        value: l[1] + ":" + l[2],
    //        text: l[0]
    //    }));
    //};

    $('a').tooltip();
    var a = 1;
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 49999 }
    var SelectedRows = "";
    //GetEmployeeData(a, 0, t);
    sessionStorage.setItem("search", null);
    //2) get viewSetting data for current user 
    getViewSettingData();
    //setInterval(ReloadGrid(), 15 * 60 * 1000);//setting Interval of 15 minutes by which every 15 minutes grid is getting refresh.

    //added by aslam on 15/03/2021
    $('#example').on('click', "input[type='checkbox']", function () {
        
        if ($(this).prop("checked") == true) {
            var s = $(this).parent().parent();
            var m = s.find(".MoreDetails");
            $(s).parent().toggleClass('highlight');
            $(m).toggleClass('highlight');
        }
        else if ($(this).prop("checked") == false) {
            var t = $(this).parent().parent();
            var m = t.find(".MoreDetails");
            $(t).parent().toggleClass('highlight');
            $(m).toggleClass('highlight');
        }
    })

    //$("#Prev").on("click", function () {
    //    var a = sessionStorage.getItem("PageSize");
    //    var b = sessionStorage.getItem("search");
    //    var d = sessionStorage.getItem("start");
    //    var o = sessionStorage.getItem("order");
    //    var total = sessionStorage.getItem("Total");
    //    //if (o != undefined && o != "null") {
    //    //    order = o.split(":");
    //    //    var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
    //    //    ordervalue = $(orderid).text();
    //    //    o = order[1] + "~" + ordervalue + "~" + order[2];
    //    //    JSON.stringify(o);
    //    //}
    //    if (a != null) { d = (d - a) - 1; } else { d = (d - 40) - 1; }
    //    $("#example div").remove();
    //    $('#loading').show();
    //    $('#loadingmessage').show();
    //    $('#Msg').hide();
    //    if (d >= 0) {
    //        $.post('/DevUtility/AjaxGetInfotTableDataFromCRMTemplate', { start: d, pSize: a, search: b, order: o, ServerOrderValue: "" }, function (data) {
    //            loadData(data);
    //        })
    //    }
    //});
    //$("#Next").on("click", function () {
    //    var total = sessionStorage.getItem("Total");
    //    var a = sessionStorage.getItem("PageSize");
    //    var c = sessionStorage.getItem("search");
    //    var d = sessionStorage.getItem("start");
        
    //    var o = sessionStorage.getItem("order");

    //    if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 40 - 1; }
    //    $("#example div").remove();
    //    $('#loading').show();
    //    $('#loadingmessage').show();
    //    $('#Msg').hide();
    //    if (d < total) {
    //        $.post('/DevUtility/AjaxGetInfotTableDataFromCRMTemplate', { start: d, pSize: a, search: c, order: o, ServerOrderValue: "" }, function (data) {
    //            loadData(data);
    //        })
    //    }
    //});

    //$("#Infotype").on("keydown", function (e) {
    //    console.log(e.charCode);
    //    if (!((e.charCode > 95 && e.charCode < 106)
    //  || (e.charCode > 47 && e.charCode < 58)
    //  || e.charCode == 8)) {
    //        return false;
    //    }
    //})
    //var number = document.getElementById('Infotype');

    //number.onkeydown = function (e) {
    //    console.log(e.charCode);
    //    if (!((e.keyCode > 95 && e.keyCode < 106)
    //      || (e.keyCode > 47 && e.keyCode < 58)
    //      || e.keyCode == 8)) {
    //        return false;
    //    }
    //}
    
    function getViewSettingData() {
        $.post('/Configuration/GetViewSettingData', { InfoType: "hoverstripstring", ViewId: "updateinfotable" }, function (viewData) {
            infoString = viewData.Infostring;
        });
    }
    //$("#filter").on("change", function () {
    //    var a = $("#filter").val();
    //    $(".filterDiv").css("display", "none")
    //    if (a != "0" && a != "1") {
    //        b = a.split(":");
    //        if (b[0] == 5) {
    //            var a = document.getElementById("dateC")
    //            a.style.display = "";
    //        } else if (b[0] == 2 || b[0] == 3 || b[0] == 4 || b[0] == 7) {
    //            $("#TextC").css("display", "");
    //        } else if (b[0] == 6) {
    //            var a = document.getElementById("IssueC")
    //            a.style.display = "";
    //        }
    //            //else if (b[0] == 4) {
    //            //    var a = document.getElementById("DealerC")
    //            //    a.style.display = "";
    //            //}
    //            //else if (b[0] == 7) {
    //            //    var a = document.getElementById("assigntoC")
    //            //    a.style.display = "";
    //            //}
    //        else if (b[0] == 8) {
    //            $("#TextC").css("display", "");
    //        }
    //    }
    //});


    //$("#usedin").on("change", function() {
    //    var a = $("#usedin").val();
    //    if (a=="A") {
    //        $("#appmenuorderDiv").show();
    //    }
    //    else {
    //        $("#appmenuorderDiv").hide();
    //    }
    //})

    $("#ddlDatabase").on("change", function () {
        var a = $("#ddlDatabase").val();
        if (a == "userdefined") {
            $("#userdefinedDiv").show();
        }
        else {
            $("#userdefinedDiv").hide();
            $("#databaseName").val("");
            if (a!="0") {
                ReloadGrid();
            }
            else {
                $("#containerDiv").hide();
            }
        }
    })
});

//function removeFilter() {
//    $(".filterDiv").css("display", "none")
//    $("#P_dealers").val(0);
//    $("#IssueFilter").val(0);
//    $("#assignto").val(0);
//    $("#filter").val(0);
//    $("#filterText").val("");
//    $("#min").val("");
//    $("#max").val("");
//}

//function DoSearch() {
//    var ValueToSearch = $("#filterText").val().trim();
//    var filterSelected = $("#filter").val();
//    var filter = filterSelected.split(":")
//    var col = ""
//    var search = ""
//    if ($("#filterText").val() != "" || $("#filterText").val() != "undefined") {
//        if (filter[0] == 2) {
//            value = $("#filterText").val();
//            col = "P_Infotable";
//            search = ValueToSearch + "," + col + ":Integer";
//        }
//        if (filter[0] == 3) {
//            value = $("#filterText").val();
//            col = "InfoType";
//            search = ValueToSearch + "," + col + ":Integer";
//        }
//        if (filter[0] == 4) {
//            value = $("#filterText").val();
//            col = "NameOfInfo";
//            search = ValueToSearch + "," + col + ":String";
//        }
//        JSON.stringify(search);
//        sessionStorage.setItem("search", search);
//        var pSize = sessionStorage.getItem("PageSize");
//        $("#example div").remove();
//        $("#loading").show();
//        $('#loadingmessage').show();

//        $.ajax({
//            url: '/DevUtility/AjaxGetInfotTableDataFromCRMTemplate',
//            type: "POST",
//            data: { start: 0, pSize: pSize, search: search },
//            success: function (data) {
//                //$(".filterDiv").css("display", "none")
//                $("#fText").text(ValueToSearch);
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
//}

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
    $('.LoaderOverlay').show();
    var ddldatabase = $("#ddlDatabase").val();
    if (ddldatabase != "0") {
        var databaseName = "";
        if (ddldatabase == "userdefined") {
            databaseName = $.trim($("#databaseName").val());
        }
        else {
            databaseName = ddldatabase;
        }
    }
    if (databaseName!="") {
        $.ajax({
            type: "POST",
            url: "/DevUtility/AjaxGetMenumasterData",
            data: { start: start, pSize: PSize, databaseName: databaseName },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                $('.LoaderOverlay').hide();
                if (data == 'db') {
                    $('#CallClosedContent').html('');
                    $('#CallClosed').modal(options);
                    $('#CallClosed .modal-title').text("No database found.");
                    $('#CallClosed').modal("show");
                    return false;
                }
                else if (data == "") {
                    return false;
                }
                $("#containerDiv").show();
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            },
            error: function () {
                $('.LoaderOverlay').hide();
                alert("Error in loading data")
            }
        });
    }
    else {
        $('.LoaderOverlay').hide();
        $('#CallClosedContent').html('');
        $('#CallClosed').modal(options);
        $('#CallClosed .modal-title').text("Please select database.");
        $('#CallClosed').modal("show");
        setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
    }
   
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
    if (t == null) { t = 49999 }
    GetEmployeeData(1, 0, 49999);
    $("#fText").text("");
    $("#FilterText").hide();
}

//function SubmitFilterSort(search, order, pSize) {
//    $.ajax({
//        url: '/Configuration/AjaxGetCustomersData',
//        type: "POST",
//        data: { start: 0, pSize: pSize, search: search, order: order },
//        success: function (data) {
//            $('#FilterModel').modal('hide');
//            sessionStorage.setItem("Total", data.recordsTotal);
//            loadData(data);
//        },
//        error: function (data) {
//            alert("Failed");
//        }
//    });

//}

//function PageSize() {
//    var a = $("#size").val();
//    sessionStorage.setItem("PageSize", a);
//    $(".yy").hide();
//    var b = sessionStorage.getItem("search");
//    var o = sessionStorage.getItem("order");
//    //if (o != undefined && o != "null") {
//    //    order = o.split(":");
//    //    var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
//    //    ordervalue = "";
//    //    o = order[1] + "~" + ordervalue + "~" + order[2];
//    //    JSON.stringify(o);
//    //}
//    $("#example tbody tr").remove();
//    $('#loading').show();
//    $('#loadingmessage').show();
//    $('#Msg').hide();
//    $('#p').css("display", "none");

//    $.post('/Configuration/AjaxGetCustomersData', { id: "", start: 1, pSize: a, search: b, order: o, ServerOrderValue: firmname }, function (data) {
//        loadData(data);
//    })
//}

function AddMenuCtrls() {
    $("#MenuMasterAddModal #p_menumaster").val("-1");
    $("#MenuMasterAddModal #prgname").val("");
    $("#MenuMasterAddModal #text").val("");
    $("#MenuMasterAddModal #usedin").val(0);
    $("#MenuMasterAddModal #menulabelweb").val("");
    $("#MenuMasterAddModal #menulabelapp").val("");
    $("#MenuMasterAddModal #menuitemyn").val(0);
    $("#MenuMasterAddModal #under").val(0);
    $("#MenuMasterAddModal #synchstatus").val(0);
    $("#MenuMasterAddModal #webicon").val("");
    $("#MenuMasterAddModal #appicon").val("");
    $("#MenuMasterAddModal #webmenuorder").val(0);
    $("#MenuMasterAddModal #appmenuorder").val(0);

    $("#MenuMasterAddModal #webmenuurl").val("");
    $("#MenuMasterAddModal #show_on_home").val(0);
    $("#MenuMasterAddModal #apphomeorder").val(0);

    $("#MenuMasterAddModal").modal(options);
    $("#MenuMasterAddModal").modal("show");
}

function EditMenuCtrls(ctrl) {
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var menumaster_key = $(Rowid).find('div.menumaster_key').text();
    var p_menumaster = $(Rowid).find('div.p_menumaster').text();
    var text = $(Rowid).find('div.text').text();
    var prgname = $(Rowid).find('div.prgname').text();
    var usedin = $(Rowid).find('div.usedin').text();
    var menuitemyn = $(Rowid).find('div.menuitemyn').text();
    var under = $(Rowid).find('div.under').text();
    var menulabelweb = $(Rowid).find('div.menulabelweb').text();
    var menulabelapp = $(Rowid).find('div.menulabelapp').text();
    var synchstatus = $(Rowid).find('div.synchstatus').text();
    var webmenuorder = $(Rowid).find('div.webmenuorder').text();
    var appmenuorder = $(Rowid).find('div.appmenuorder').text();
    var webicon = $(Rowid).find('div.webicon').text();
    var appicon = $(Rowid).find('div.appicon').text();

    var webmenuurl = $(Rowid).find('div.webmenuurl').text();
    var show_on_home = $(Rowid).find('div.show_on_home').text();
    var apphomeorder = $(Rowid).find('div.apphomeorder').text();


    $("#MenuMasterEditModal #menumaster_key").val(menumaster_key);
    $("#MenuMasterEditModal #p_menumaster").val(p_menumaster);
    $("#MenuMasterEditModal #prgname").val(prgname);
    $("#MenuMasterEditModal #text").val(text);
    $("#MenuMasterEditModal #usedin").val(usedin);
    $("#MenuMasterEditModal #menuitemyn").val(menuitemyn);
    $("#MenuMasterEditModal #under").val(under);
    $("#MenuMasterEditModal #menulabelweb").val(menulabelweb);
    $("#MenuMasterEditModal #menulabelapp").val(menulabelapp);
    $("#MenuMasterEditModal #synchstatus").val(synchstatus);
    $("#MenuMasterEditModal #webmenuorder").val(webmenuorder);
    $("#MenuMasterEditModal #appmenuorder").val(appmenuorder);
    $("#MenuMasterEditModal #webicon").val(webicon);
    $("#MenuMasterEditModal #appicon").val(appicon);

    $("#MenuMasterEditModal #webmenuurl").val(webmenuurl);
    $("#MenuMasterEditModal #show_on_home").val(show_on_home);
    $("#MenuMasterEditModal #apphomeorder").val(apphomeorder);

    $("#MenuMasterEditModal").modal(options);
    $("#MenuMasterEditModal").modal("show");
} 


function SubmitAddManumaster() {
    var objMenumaster = $("#MenumasterAddForm").serialize();
    var p_menumaster = $("#MenuMasterAddModal #p_menumaster").val();
    $("#MenuMasterAddModal").modal("hide");
    var ddldatabase = $("#ddlDatabase").val();
    if (ddldatabase != "0") {
        var databaseName = "";
        if (ddldatabase == "userdefined") {
            databaseName = $.trim($("#databaseName").val());
        }
        else {
            databaseName = ddldatabase;
        }
    }
    if (databaseName!="") {
        $.post('/DevUtility/AjaxAddUpdateMenumaster?exitMode=add&databaseName=' + databaseName, objMenumaster, function (data) {
            if (data == "success") {
                $('#CallClosedContent').html('');
                $('#CallClosed').modal(options);
                $('#CallClosed .modal-title').text("Added Successfully.");
                $('#CallClosed').modal("show");
                setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);

                ReloadGrid();
            }
            else if (data=="db") {
                $('#CallClosedContent').html('');
                $('#CallClosed').modal(options);
                $('#CallClosed .modal-title').text("No database found.");
                $('#CallClosed').modal("show");
            }
            else {
                $('#CallClosedContent').html('');
                $('#CallClosed').modal(options);
                $('#CallClosed .modal-title').text("Something went wrong, Please try again later.");
                $('#CallClosed').modal("show");
                setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
            }

        });
    }
    else {
        $('#CallClosedContent').html('');
        $('#CallClosed').modal(options);
        $('#CallClosed .modal-title').text("Please select database.");
        $('#CallClosed').modal("show");
        setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
    }

    
}

function SubmitEditManumaster() {
    var objMenumaster = $("#MenumasterEditForm").serialize();
    var p_menumaster = $("#MenuMasterEditModal #p_menumaster").val();
    $("#MenuMasterEditModal").modal("hide");
    var ddldatabase = $("#ddlDatabase").val();
    if (ddldatabase != "0") {
        var databaseName = "";
        if (ddldatabase == "userdefined") {
            databaseName = $.trim($("#databaseName").val());
        }
        else {
            databaseName = ddldatabase;
        }
    }
    if (databaseName != "") {
        $.post('/DevUtility/AjaxAddUpdateMenumaster?exitMode=edit&databaseName=' + databaseName, objMenumaster, function (data) {
            if (data == "success") {
                $('#CallClosedContent').html('');
                $('#CallClosed').modal(options);
                $('#CallClosed .modal-title').text("Edited Successfully.");
                $('#CallClosed').modal("show");
                setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);

                ReloadGrid();
            }
            else if (data=="db") {
                $('#CallClosedContent').html('');
                $('#CallClosed').modal(options);
                $('#CallClosed .modal-title').text("No database found.");
                $('#CallClosed').modal("show");
            }
            else {
                $('#CallClosedContent').html('');
                $('#CallClosed').modal(options);
                $('#CallClosed .modal-title').text("Something went wrong, Please try again later.");
                $('#CallClosed').modal("show");
                setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
            }

        });
    }
    else {
        $('#CallClosedContent').html('');
        $('#CallClosed').modal(options);
        $('#CallClosed .modal-title').text("Please select database.");
        $('#CallClosed').modal("show");
        setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
    }
}

function DeleteMenuCtrls(ctrl) {
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var pid = $(Rowid).find('div.p_menumaster').text();
    $("#deleteMenumaster #p_menumaster").val(pid);
    $("#deleteMenumaster").modal(options);
    $("#deleteMenumaster").modal("show");
}
 
function DeleteMenumaster() {
    $("#deleteMenumaster").modal("hide");
    var p_menumaster = $("#deleteMenumaster #p_menumaster").val();
    var ddldatabase = $("#ddlDatabase").val();
    if (ddldatabase != "0") {
        var databaseName = "";
        if (ddldatabase == "userdefined") {
            databaseName = $.trim($("#databaseName").val());
        }
        else {
            databaseName = ddldatabase;
        }
    }
    if (databaseName=="") {
        $('#CallClosedContent').html('');
        $('#CallClosed').modal(options);
        $('#CallClosed .modal-title').text("Please select database.");
        $('#CallClosed').modal("show");
        setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        return false;
    }
    $.post('/DevUtility/AjaxDeleteMenumaster', {databaseName:databaseName, p_menumaster: p_menumaster }, function (data) {
        if (data == "success") {
            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text("Delete successfully");
            $('#CallClosed').modal("show");
            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
            ReloadGrid();
        }
        else if (data=="db") {
            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text("No database found.");
            $('#CallClosed').modal("show");
        }
        else {
            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text("Something went wrong, Please try again later.");
            $('#CallClosed').modal("show");
            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        }
        
    });
}

function chkCheckUncheck(ctrl) {
    var chkvalesArr = [];

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
                            var menumaster_key = $(Rowid).find('div.menumaster_key').text();
                            var p_menumaster = $(Rowid).find('div.p_menumaster').text();
                            var text = $(Rowid).find('div.text').text();
                            var prgname = $(Rowid).find('div.prgname').text();
                            var usedin = $(Rowid).find('div.usedin').text();
                            var menuitemyn = $(Rowid).find('div.menuitemyn').text();
                            var under = $(Rowid).find('div.under').text();
                            var menulabelweb = $(Rowid).find('div.menulabelweb').text();
                            var menulabelapp = $(Rowid).find('div.menulabelapp').text();
                            var synchstatus = $(Rowid).find('div.synchstatus').text();
                            var webmenuorder = $(Rowid).find('div.webmenuorder').text();
                            var appmenuorder = $(Rowid).find('div.appmenuorder').text();
                            var webicon = $(Rowid).find('div.webicon').text();
                            var appicon = $(Rowid).find('div.appicon').text();

                            var webmenuurl = $(Rowid).find('div.webmenuurl').text();
                            var show_on_home = $(Rowid).find('div.show_on_home').text();
                            var apphomeorder = $(Rowid).find('div.apphomeorder').text();

                            $("#MenuMasterEditModal #menumaster_key").val(menumaster_key);
                            $("#MenuMasterEditModal #p_menumaster").val(p_menumaster);
                            $("#MenuMasterEditModal #prgname").val(prgname);
                            $("#MenuMasterEditModal #text").val(text);
                            $("#MenuMasterEditModal #usedin").val(usedin);
                            $("#MenuMasterEditModal #menuitemyn").val(menuitemyn);
                            $("#MenuMasterEditModal #under").val(under);
                            $("#MenuMasterEditModal #menulabelweb").val(menulabelweb);
                            $("#MenuMasterEditModal #menulabelapp").val(menulabelapp);
                            $("#MenuMasterEditModal #synchstatus").val(synchstatus);
                            $("#MenuMasterEditModal #webmenuorder").val(webmenuorder);
                            $("#MenuMasterEditModal #appmenuorder").val(appmenuorder);
                            $("#MenuMasterEditModal #webicon").val(webicon);
                            $("#MenuMasterEditModal #appicon").val(appicon);

                            $("#MenuMasterEditModal #webmenuurl").val(webmenuurl);
                            $("#MenuMasterEditModal #show_on_home").val(show_on_home);
                            $("#MenuMasterEditModal #apphomeorder").val(apphomeorder);

                            $("#MenuMasterEditModal").modal(options);
                            $("#MenuMasterEditModal").modal("show");
                            break;

                        case "Delete":
                            var Rowid = "#tr-" + id;
                            var pid = $(Rowid).find('div.p_menumaster').text();
                            $("#deleteMenumaster #p_menumaster").val(pid);
                            $("#deleteMenumaster").modal(options);
                            $("#deleteMenumaster").modal("show");
                            break;

                            //9) function to redirect to  view Setting controller
                        case "ViewSetting":
                            window.location = '/Configuration/ManageViewSettings?infotype=hoverstripstring&viewid=updateinfotable'
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
                }
                //12) at last Show context menu which redirect to viewSetting Contoller
                //options.items.ViewSetting = { name: "Customize HoverStrip", icon: "glyphicon glyphicon-wrench" };
            }
            return options;
        }
    });
});

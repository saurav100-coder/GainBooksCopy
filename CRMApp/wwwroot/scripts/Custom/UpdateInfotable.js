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
    var d = sessionStorage.getItem("PageSize");
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

        Parentdiv = $("<div id='MainDiv-" + item.Infotable_key + "' class='col-md-12  clickable parentdiv' style='display: inline-flex; padding-left:5px; width: 100%;  padding-right:0px'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        MoreDetailsdiv = $(("<div  class='MoreDetails' id='" + item.Infotable_key + "' style='position: absolute; padding-top: 5px; z-index: 2; display: none; background-color: white; width: 180px; padding-left: 20px;margin-left: 870px; min-height:20px;'> </div>"))

        tblEmployee.append(Parentdiv);
        m = m + 1;
        var div = $("<div id='tr-" + item.Infotable_key + "'  style='display:inline-flex; position:relative;  padding-top:10px; padding-bottom:20px; width:100%;  margin-top:10px;  font-size:11px; font-family: verdana,arial,sans-serif; padding-right:0px'></div>");
        //"<div style='width: 3%;padding: 0px 5px;' id='" + item.Customers_Key + "' value='" + item.Customers_Key + " style='margin-top:2px; float:left'>" + m + ".</div>"
        div.html(("<div style='width: 10%;padding: 0px 0px;' id='" + item.Infotable_key + "' value='" + item.Infotable_key + "'><input type='checkbox' style='margin-right: 20px;' id='" + item.Infotable_key + "' value='" + item.Infotable_key + "' style='margin-top:2px; float:left'>&nbsp;" + m + ".</div>")
         + " " + ("<div style='width: 15%;padding: 0px 5px 0px 20px;  '>" + item.P_infotable + "</div>")
         + " " + ("<div style='width: 15%;padding: 0px 5px 0px 30px; '>" + item.Infotype + "</div>")
         + " " + ("<div style='width: 30%;padding: 0px 5px 0px 25px;'>" + item.NameOfInfo + "</div>")
         + " " + ("<div style='width: 15%;padding: 0px 5px 0px 65px; '>" + item.GeneratedBy + "</div>"));
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
                    moreDetailsDivHtml += "<a data-toggle='Edit Infotable'><i class='glyphicon glyphicon-pencil' onclick='EditInfotableCtrls(this)' style='font-size:20px; color:#616A6B;padding-left:11px;' ></i></a>";
                }
            }
            else if (itemtext.toLocaleLowerCase() == "delete") {
                if (itemEnable.toLocaleLowerCase() == "y") {
                    moreDetailsDivHtml += "<a data-toggle='Delete Infotable'><i class='glyphicon glyphicon-trash' onclick='DeleteInfotableCtrls(this)' style='font-size:20px; color:#616A6B;padding-left:11px;'></i></a>";
                }
            }
        }

        //6) at last we show Customize HoverStrip menu and this will redirect to viewsetting controller
        moreDetailsDivHtml += "<a data-toggle='Customize Hover Strip' href='/Configuration/ManageViewSettings?infotype=hoverstripstring&viewid=updateinfotable'><i class='fa fa-wrench'  style='font-size:22px; color:#616A6B; padding-left:11px;'></i></a>";

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
    var windowHeight = $(window).height();
    var SumOfElementHeight = Header + TableDive + icondiv + Footer;
    var MainHeight = windowHeight - SumOfElementHeight - 60;
    $("#example").height(MainHeight);
}



$(document).ready(function () {
    $(window).resize(function () {
        Deviceheight();
    });
});
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
    if (t == null) { t = 49999 }
    var SelectedRows = "";
    //GetEmployeeData(a, 0, t);
    sessionStorage.setItem("search", null);
    //2) get viewSetting data for current user 
    getViewSettingData();
    setInterval(ReloadGrid(), 15 * 60 * 1000);//setting Interval of 15 minutes by which every 15 minutes grid is getting refresh.

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

    $("#Prev").on("click", function () {
        var a = sessionStorage.getItem("PageSize");
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
            $.post('/DevUtility/AjaxGetInfotTableDataFromCRMTemplate', { start: d, pSize: a, search: b, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });
    $("#Next").on("click", function () {
        var total = sessionStorage.getItem("Total");
        var a = sessionStorage.getItem("PageSize");
        var c = sessionStorage.getItem("search");
        var d = sessionStorage.getItem("start");
        
        var o = sessionStorage.getItem("order");

        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 40 - 1; }
        $("#example div").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/DevUtility/AjaxGetInfotTableDataFromCRMTemplate', { start: d, pSize: a, search: c, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });

    //$("#Infotype").on("keydown", function (e) {
    //    console.log(e.charCode);
    //    if (!((e.charCode > 95 && e.charCode < 106)
    //  || (e.charCode > 47 && e.charCode < 58)
    //  || e.charCode == 8)) {
    //        return false;
    //    }
    //})
    var number = document.getElementById('Infotype');

    number.onkeydown = function (e) {
        console.log(e.charCode);
        if (!((e.keyCode > 95 && e.keyCode < 106)
          || (e.keyCode > 47 && e.keyCode < 58)
          || e.keyCode == 8)) {
            return false;
        }
    }
    
    function getViewSettingData() {
        $.post('/Configuration/GetViewSettingData', { InfoType: "hoverstripstring", ViewId: "updateinfotable" }, function (viewData) {
            //3) set Data to infoString (Global variable)
            infoString = viewData.Infostring;
        });
    }
    $("#filter").on("change", function () {
        var a = $("#filter").val();
        $(".filterDiv").css("display", "none")
        if (a != "0" && a != "1") {
            b = a.split(":");
            if (b[0] == 5) {
                var a = document.getElementById("dateC")
                a.style.display = "";
            } else if (b[0] == 2 || b[0] == 3 || b[0] == 4 || b[0] == 7) {
                $("#TextC").css("display", "");
            } else if (b[0] == 6) {
                var a = document.getElementById("IssueC")
                a.style.display = "";
            }
                //else if (b[0] == 4) {
                //    var a = document.getElementById("DealerC")
                //    a.style.display = "";
                //}
                //else if (b[0] == 7) {
                //    var a = document.getElementById("assigntoC")
                //    a.style.display = "";
                //}
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

function DoSearch() {

    var ValueToSearch = $("#filterText").val().trim();
    var filterSelected = $("#filter").val();
    var filter = filterSelected.split(":")
    var col = ""
    var search = ""
    if ($("#filterText").val() != "" || $("#filterText").val() != "undefined") {
        if (filter[0] == 2) {
            value = $("#filterText").val();
            col = "P_Infotable";
            search = ValueToSearch + "," + col + ":Integer";
        }
        if (filter[0] == 3) {
            value = $("#filterText").val();
            col = "InfoType";
            search = ValueToSearch + "," + col + ":Integer";
        }
        if (filter[0] == 4) {
            value = $("#filterText").val();
            col = "NameOfInfo";
            search = ValueToSearch + "," + col + ":String";
        }
        JSON.stringify(search);
        sessionStorage.setItem("search", search);
        var pSize = sessionStorage.getItem("PageSize");
        $("#example div").remove();
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/DevUtility/AjaxGetInfotTableDataFromCRMTemplate',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                //$(".filterDiv").css("display", "none")
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                } else {
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
        url: "/DevUtility/AjaxGetInfotTableDataFromCRMTemplate",
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
    removeFilter();
    $("#example div").remove();
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 49999 }
    GetEmployeeData(1, 0, 49999);
    $("#fText").text("");
    $("#FilterText").hide();
}

function SubmitFilterSort(search, order, pSize) {
    $.ajax({
        url: '/Configuration/AjaxGetCustomersData',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search, order: order },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            } else {
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

    $.post('/Configuration/AjaxGetCustomersData', { id: "", start: 1, pSize: a, search: b, order: o, ServerOrderValue: firmname }, function (data) {
        loadData(data);
    })
}

function AddInfotableCtrls() {
    $("#Infotable .modal-title").text("Add Infotable");
    $("#InfotypeDiv").show();
    $("#P_infotable").val("");
    $("#Infotype").val("");
    $("#NameOfInfo").val("");
    $("#Infotable").modal(options);
    $("#Infotable").modal("show");
}

function EditInfotableCtrls(ctrl) {
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var Pid = $(Rowid).children(1)[1].innerText;
    var infotype = $(Rowid).children(1)[2].innerText;
    var nameofinfo = $(Rowid).children(1)[3].innerText;
    
    $("#P_infotable").val(Pid);
    $("#Infotype").val(infotype);
    $("#NameOfInfo").val(nameofinfo);
   
    $("#Infotable .modal-title").text("Edit Infotable");
    $("#InfotypeDiv").hide();


    $("#Infotable").modal(options);
    $("#Infotable").modal("show");
} 


function SubmitInfotable() {
    var objInfotable = $("#myInfotableForm").serialize();
    var p_infotable = $("#P_infotable").val();
    var exitMode = p_infotable == "" ? "add" : "edit";
    var mTitle = exitMode == "add" ? "Added successfully" : "Edit successfully";
    $("#Infotable").modal("hide");
    $.post('/DevUtility/AjaxUpdateInfotable?exitMode=' + exitMode, objInfotable, function (data) {

        $('#CallClosedContent').html('');
        $('#CallClosed').modal(options);
        $('#CallClosed .modal-title').text(mTitle);
        $('#CallClosed').modal("show");
        setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);

        ReloadGrid();
    });
}


function DeleteInfotableCtrls(ctrl) {
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var Pid = $(Rowid).children(1)[1].innerText;
    var infotype = $(Rowid).children(1)[2].innerText;
    var nameofinfo = $(Rowid).children(1)[3].innerText;
    $("#p_infotable").val(Pid);
    $("#infotype").val(infotype);
    $("#nameofinfo").val(nameofinfo);
    $("#deleteInfotable").modal(options);
    $("#deleteInfotable").modal("show");
}
 
function DeleteInfotable() {
    var objInfotable = $("#deleteInfotableForm").serialize();
    $("#deleteInfotable").modal("hide");
    $.post('/DevUtility/AjaxUpdateInfotable?exitMode=delete', objInfotable, function (data) {
        $('#CallClosedContent').html('');
        $('#CallClosed').modal(options);
        $('#CallClosed .modal-title').text("Delete successfully");
        $('#CallClosed').modal("show");
        setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        ReloadGrid();
    });
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
                            var Pid = $(Rowid).children(1)[1].innerText;
                            var infotype = $(Rowid).children(1)[2].innerText;
                            var nameofinfo = $(Rowid).children(1)[3].innerText;
                            $("#P_infotable").val(Pid);
                            $("#Infotype").val(infotype);
                            $("#NameOfInfo").val(nameofinfo);

                            $("#Infotable .modal-title").text("Edit Infotable");
                            $("#InfotypeDiv").hide();

                            $("#Infotable").modal(options);
                            $("#Infotable").modal("show");
                            break;

                        case "Delete":
                            debugger
                            var Rowid = "#tr-" + id;
                            var Pid = $(Rowid).children(1)[1].innerText;
                            var infotype = $(Rowid).children(1)[2].innerText;
                            var nameofinfo = $(Rowid).children(1)[3].innerText;
                            $("#p_infotable").val(Pid);
                            $("#infotype").val(infotype);
                            $("#nameofinfo").val(nameofinfo);
                            $("#deleteInfotable").modal(options);
                            $("#deleteInfotable").modal("show");
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
                options.items.ViewSetting = { name: "Customize HoverStrip", icon: "glyphicon glyphicon-wrench" };
            }
            return options;
        }
    });
});

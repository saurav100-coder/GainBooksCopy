var options = { "backdrop": "static", keyboard: true };
var popOverOpen = false;
var CurrentHoverRowId = 0;
var CollabPopOpen = false
//1) global variable for viewSettings
var infoString = "";

var chkvalesArr = [];
var selectAll = false;



//this is a sessionStorageKey for Search
var searchKey = "searchManageCustomers";
//this is a sessionStorageKey for order
var orderKey = "orderManageCustomers";
//this is a sessionStorageKey for search Criteria div value
var searchMsgKey = "searchMsgManageCustomers";
//this is a sessionStorageKey for basicFilter UI consistency on Page Reload
var basicFilterStrKey = "basicFilterStrManageCustomers";

function loadData(data) {
    var tblEmployee = $("#example");
    $("#example div").remove();
    $("#selectall").prop('checked', false);
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

        Parentdiv = $("<div id='MainDiv-" + item.Customers_Key + "' class='maindiv clickable parentdiv' onmouseover='hoverId(this)' onmouseout='hoverNot(this)' style='position:relative;'></div>");
        MoreDetailsdiv = $(("<div  class='MoreDetails' id='" + item.Customers_Key + "' style='position: absolute; z-index: 2; display: none; background-color: #cce6ff; width: 100px; border:none !important; height: 30px; right:35px; top:3px;'> </div>"))

        tblEmployee.append(Parentdiv);
        m = m + 1;
        var div = $("<div id='tr-" + item.Customers_Key + "' class='MainTr' style='height:40px'></div>");
        //"<div style='width: 3%;padding: 0px 5px;' id='" + item.Customers_Key + "' value='" + item.Customers_Key + " style='margin-top:2px; float:left'>" + m + ".</div>"
        div.html(("<div class='custSr basicTr' style='width: 5%;padding: 0px 0px;' id='" + item.Customers_Key + "' value='" + item.Customers_Key + "'><input type='checkbox'onclick='chkCheckUncheck(this)' class='checkboxall' id='chk-" + item.Customers_Key + "' value='" + item.Customers_Key + "' style='margin-top:2px; margin-right:10px; float:left'>&nbsp;" + m + ".</div>")
            + " " + ("<div class='custId basicTr' style='width: 4%; text-align:left; padding-left:5px; '>" + item.P_Customers + "</div>")
            + " " + ("<div class='custCode basicTr' style='width: 8%;padding: 0px 5px; text-align: left;'>" + item.CustCode + "</div>")
            + " " + ("<div class='CustName basicTr Clamp' style='width: 17%;text-align: left;'>" + item.CustName + "</div>")
            + " " + ("<div class='basicTr' style='display:none'>" + item.p_acccode + "</div>")
            + " " + ("<div class='ContactPerson basicTr Clamp' style='width: 10%;text-align: left;padding-left:5px; '>" + item.Contactperson + "</div>")
            + " " + ("<div class='MobNo basicTr' style='width: 8%;'>" + item.MobNo + "</div>")
            + " " + ("<div class='TextHomeTown basicTr' style='width: 8%;text-align: left;'>" + item.TextHomeTown + "</div>")
            + " " + ("<div class='TextCustomerType basicTr' style='width: 6%; text-align: left;'>" + item.TextCustomerType + "</div>")
            + " " + ("<div class='CustomerStatus basicTr' style='width: 4%;text-align: center;'>" + item.CustomerStatus + "</div>")
            + " " + ("<div class='TxtActivationDate basicTr' style='width: 7%;text-align: left;'>" + item.TxtActivationDate + "</div>")
            + " " + ("<div class='TextMainBussCode basicTr Clamp' style='width: 9%; text-align: left;'>" + item.TextMainBussCode + "</div>")
            + " " + ("<div class='TextProductCode basicTr' style='width: 8%; padding: 0px;'>" + item.TextProductCode + "</div>")
            + " " + ("<div class='TextGst basicTr' style='width: 8%; padding: 0px;'>" + item.GSTIN + "</div>")
            + " " + ("<div class='TextTags basicTr' style='width: 8%; padding: 0px;'>" + item.Tags + "</div>")        
            + " " + ("<div class='TextBilledUpto basicTr' style='width: 7%; padding: 0px;'>" + item.TxtBilledUpto + "</div>")  );
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
                    moreDetailsDivHtml += "<a data-toggle='Edit&nbsp' href='/Configuration/CustomerForm?P_customers=" + item.P_Customers + "&exitmode=edit'> <img src='/images/edit.png' style='width:37px; margin-top:-3px;'></a>";
                }
            }
            else if (itemtext.toLocaleLowerCase() == "delete") {
                if (itemEnable.toLocaleLowerCase() == "y") {
                    //moreDetailsDivHtml += "<a data-toggle='Delete&nbsp&nbsp&nbsp' href='/Configuration/CustomerForm?P_customers=" + item.P_Customers + "&exitmode=delete'>       <i class='glyphicon glyphicon-trash' style='font-size:20px; color:#616A6B;padding-left:11px;' ></i></a>";
                    moreDetailsDivHtml += "<a data-toggle='Delete&nbsp&nbsp&nbsp'> <img src='/images/icon-delete.png' onclick = 'DeleteCustomerCtrls(this)' style='width:20px; padding-top:6px;'></a>";
                }
            }
            //else if (itemtext.toLocaleLowerCase() == "importcustomer") {
            //    if (itemEnable.toLocaleLowerCase() == "y") {
            //        moreDetailsDivHtml += "<a data-toggle='Import Cusomerss' onclick='OpenImportModal();'><i class='glyphicon glyphicon-import' style='font-size:20px; color:#616A6B;padding-left:11px;' ></i></a>";
            //    }
            //}
        }

        //6) at last we show Customize HoverStrip menu and this will redirect to viewsetting controller
        moreDetailsDivHtml += "<a  data-toggle='Customize Hover Strip' href='/Configuration/ManageViewSettings?infotype=hoverstripstring&viewid=managecustomers'><img src='/images/121.png' style='width:30px; padding-top:6px;'></a>";

        //7) append anchore tag data on MoreDetailsDiv
        MoreDetailsdiv.append(moreDetailsDivHtml);
        //8) append popover_content_wrapper div on MoreDetailsDiv
        MoreDetailsdiv.append(moreDetailsDivPopoverDiv);

        div.append(MoreDetailsdiv);

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
    }
    
    $(document).ready(function () {
    $("#selectall").click(function () {
        if (this.checked) {
            $('.checkboxall').each(function () {
                $(".checkboxall").prop('checked', true);
                var s = $(this).parent().parent();
                var m = s.find(".MoreDetails");
                var n = m.find(".atag");
                // var c = n.find("i");
                $(n).addClass('colorwhite');
                
                $(s).parent().addClass('highlight');
                $(m).addClass('highlight');
               // $(m).css("color", "white !important");
               
                $(s).parent().removeClass('clickable');
                var index = chkvalesArr.indexOf($(this).val());
                if (index == -1) {
                    chkvalesArr.push($(this).val());
                }
            })
            $("#subDiv #subDivLable").text("Select all rows");
            $("#subDiv").show();
        } else {
            $('.checkboxall').each(function () {
                $(".checkboxall").prop('checked', false);
                var t = $(this).parent().parent();
                var m = t.find(".MoreDetails");
                var n = m.find(".atag");
                console.log(n);
                $(n).removeClass('colorwhite');
                $(t).parent().removeClass('highlight');
                $(m).removeClass('highlight');
                $(t).parent().removeClass('clickable');
                var index = chkvalesArr.indexOf($(this).val());
                if (index > -1) {
                    chkvalesArr.splice(index, 1);
                }
            })
            selectAll = false;
            $("#subDiv").hide();
        }

    });
    });


}

$("nav").find(".newTitle").remove();
var s = "<p class='newTitle' >Manage Customers</p>";
$("nav").find(".titleName").append(s);

function Deviceheight() {
    var h = $(".content-wrapper").css("min-height")
    $("#example").height(h);
    //var sidebarposition = side.getBoundingClientRect();
    //$("#example").height(sidebarposition.height - 100)
    //var Header = $("header").height();
    //var icondiv = $(".calHeightIcon").height();
    //var TableDive = $(".calHeightTaskBar").height();
    //var Footer = $(".main-footer").height();
    //var windowHeight = $(window).height();
    //var SumOfElementHeight = Header + TableDive + icondiv + Footer;
    //var MainHeight = windowHeight - SumOfElementHeight - 15;
    //$("#example").height(MainHeight);

    //if($(window).width() <= 600){
    //    MainHeight + 10;
    //    $("#example").height(MainHeight);
    //}
}

var Sidebar = $(".sidebar")[0];
var resizeObserver = new ResizeObserver((event) => {
    var h = $(".content-wrapper").css("min-height")
    $("#example").height(h);
   
});
resizeObserver.observe(Sidebar);

$(document).ready(function () {
    $(window).resize(function () {
        Deviceheight();
    });
});


//$(document).ready(function () {
//    $(window).resize(function () {
//        Deviceheight();
//        //DetailPaneHeight();
//    });
//});
function OpenImportModal() {
    $('#ImportCustomerModal').modal('show');
}
function SubmitImportCustomers() {
    var file = document.getElementById('file1');
    if (file.files.length !== 0) {
        if (checkFile(file)) {

            //$("#fileErrormsg").text("");
            var formdata = new FormData(document.getElementById('importForm'))
            //Creating an XMLHttpRequest and sending
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Configuration/ImportCustomersFromExcel');
            xhr.send(formdata);
            $('#ImportCustomerModal').modal("hide");
            $("#loadspin,#overlay").show();
            xhr.onreadystatechange = function (data) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    $("#loadspin,#overlay").hide();
                    ReloadGrid()
                    //$('#CallClosedContent').html('');
                    //$('#CallClosed').modal(options);
                    //$('#CallClosedContent').html("<p class='text-center' style='font-size: 18px;margin-bottom: 30px;'>Customers Imported Successfully.</p>");
                    //$('#CallClosed').modal("show");
                    //setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
                    ShowMsg("Customers Imported Successfully.","success");

                }
                else {
                    $("#loadspin,#overlay").hide();
                    //$('#CallClosedContent').html('');
                    //$('#CallClosed').modal(options);
                    //$('#CallClosedContent').html("<p class='text-center' style='font-size: 18px;margin-bottom: 30px;'>An Error occured While storing your Information .Please Try again later.</p>");
                    //$('#CallClosed').modal("show");
                    //setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
                    ShowMsg("An Error occured While storing your Information .Please Try again later.", "info");
                }
            }
        }
    }
    else {
        //$("#fileErrormsg").text("*Please select file.");
        $('#ImportCustomerModal').modal("hide");
        //$('#CallClosedContent').html('');
        //$('#CallClosed').modal(options);
        //$('#CallClosedContent').html("<p class='text-center' style='font-size: 18px;margin-bottom: 30px;'>*Please select file.</p>");
        //$('#CallClosed').modal("show");
        //setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        ShowMsg("Please select file.", "info");
    }
    return false;
}

function checkFile(sender) {
    //var validExts = new Array(".xlsx", ".xls");
    var validExts = new Array(".xlsx");
    var fileExt = sender.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
        //$('#CallClosedContent').html('');
        //$('#CallClosed').modal(options);
        //$('#CallClosedContent').html("<p class='text-center' style='font-size: 18px;margin-bottom: 30px;'>Invalid file selected, Please select  " + validExts.toString() + " type files.</p>");
        //$('#CallClosed').modal("show");
        //setTimeout(function () { $('#CallClosed').modal("hide"); }, 2000);
        ShowMsg("Invalid file selected, Please select  " + validExts.toString() + " type files.", "info");
        $('#ImportCustomerModal').modal("hide");
        return false;
    }
    else return true;
}



$(document).ready(function () {

    $('#ddlmultiTags').SumoSelect({ okCancelInMulti: true, triggerChangeCombined: true, placeholder: 'Select Tag' });
    $(".okCancelInMulti .btnOk").text("Apply");
    $(".okCancelInMulti .btnCancel").text("Close");

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
            if (b[0] == 5) {
                var a = document.getElementById("dateC")
                a.style.display = "";
            }
            else if (b[0] == 2 || b[0] == 3 || b[0] == 4 || b[0] == 6) {
                $("#TextC").css("display", "");
            }
        }
    });

    setBasicFilterUIOnPageReload();

    sessionStorage.setItem("start", 0);
    //sessionStorage.setItem("search", "");
    //sessionStorage.setItem("order", "");
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 50 }
    var SelectedRows = "";
    //GetEmployeeData(a, 0, t);
    //2) get viewSetting data for current user
    infoString = $("#infostring").val();
    setInterval(ReloadGrid(), 15 * 60 * 1000);//setting Interval of 15 minutes by which every 15 minutes grid is getting refresh.

    //added by aslam on 15/03/2021
    $('#example').on('click', "input[type='checkbox']", function () {
        if ($(this).prop("checked") == true) {
            var s = $(this).parent().parent();
            var m = s.find(".MoreDetails");
            var n = m.find(".atag");
            // var c = n.find("i");
            console.log(n);
            $(n).addClass('colorwhite');

            $(s).parent().toggleClass('highlight');
            $(m).toggleClass('highlight');
            $(m).css("color", "white !important");
            $(s).parent().removeClass('clickable');
        }
        else if ($(this).prop("checked") == false) {
            var t = $(this).parent().parent();
            var m = t.find(".MoreDetails");
            var n = m.find(".atag");
            console.log(n);
            $(n).removeClass('colorwhite');
            $(t).parent().toggleClass('highlight');
            $(m).toggleClass('highlight');
            $(t).parent().removeClass('clickable');
        }
    });

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
        if (a != null) { d = (d - a) - 1; } else { d = (d - 50) - 1; }
        $("#example div").remove();
        $("#example").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d >= 0) {
            $.post('/Configuration/AjaxGetCustomersData', { start: d, pSize: a, search: b, order: o, ServerOrderValue: "" }, function (data) {
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

        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 50 - 1; }
        $("#example div").remove();
        $("#example").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/Configuration/AjaxGetCustomersData', { start: d, pSize: a, search: c, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });

    $('#ddlmultiTags').on('change', function () {
        var value = $("#ddlmultiTags").val();
        if (value.length > 0) {
            AddMultipleTagsOnCustomers();
        }
    });

    $('#ddlmultiTags').parent().on('focusout', function () {
        $("#ddlmultiTags").parent().hide();
    });

    $('#ddlmultiTags').parent().find('.MultiControls .btnCancel').on('click', function () {
        $("#ddlmultiTags").parent().hide();
    });


    function getViewSettingData() {
        $.post('/Configuration/GetViewSettingData', { InfoType: "hoverstripstring", ViewId: "managecustomers" }, function (viewData) {
            infoString = viewData.Infostring;
        });
    }
   
});

//function removeFilter() {
//    $(".filterDiv").css("display", "none")
//    $("#filter").val(0);
//    $("#filterText").val("");
//    $("#dateC #min").val("");
//    $("#dateC #max").val("");
//    $(".filterclose").hide();
//    //sessionStorage.setItem("search", "");
//    //sessionStorage.setItem("order", "");
//    setSearchSessionStorage("");
//    setOrderSessionStorage("");
//    $(".resultDiv .result-msg").html("");
//    $(".resultDiv").hide();
//    ReloadGrid();

//}
function removeFilter() {
    removeBasicAdvanceFilter();
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
        if (filter[0] == 2) {
            value = $("#filterText").val();
            col = "custcode";
            search = ValueToSearch + "," + col + ":String";
            searchMsg = "Search Results: CustCode <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        if (filter[0] == 3) {
            value = $("#filterText").val();
            col = "custname";
            search = ValueToSearch + "," + col + ":String";
            searchMsg = "Search Results: Customer Name <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        if (filter[0] == 4) {
            value = $("#filterText").val();
            col = "P_Customers";
            search = ValueToSearch + "," + col + ":Integer";
            searchMsg = "Search Results: CustomerId <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;

        }
        if (filter[0] == 6) {
            value = $("#filterText").val();
            col = "MobNo";
            search = ValueToSearch + "," + col + ":String";
            searchMsg = "Search Results: Customer mobile number <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
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
        chkvalesArr = [];
        $("#example div").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Configuration/AjaxGetCustomersData',
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
    col = "activationdate";
    search = value1 + "," + value2 + "," + col + ":Date";
    $(".filterclose").show();
    $(".filterclose").addClass("DatesMargin");
    var searchMsg = "Search Results: Customer Activation Date From <span class='' style='font-weight: 600'>'" + value1 + "'</span> To <span class='' style='font-weight: 600'>'" + value2 + "'</span>";
    JSON.stringify(search);
    //sessionStorage.setItem("search", search);
    var basicFilterStr = $("#filter").val() + "~#dateC #min:" + value1 + "|#dateC #max:" + value2;
    setSearchSessionStorage(search);
    setSearchMsgSessionStorage(searchMsg);
    setBasicFilterStrSessionStorage(basicFilterStr);
    var pSize = sessionStorage.getItem("PageSize");
    chkvalesArr = [];
    $("#example div").remove();
    $("#example").height(0);
    $("#loading").show();
    $('#loadingmessage').show();

    $.ajax({
        url: '/Configuration/AjaxGetCustomersData',
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

//function hoverId(ctrl) {
//    setTimeout(function () {
//        //$(ctrl).find('.MoreDetails').show()
//        if (popOverOpen == true) {
//            $(".MoreDetails").not(CurrentHoverRowId).hide();
//        }
//        else {
//            $(ctrl).find('.MoreDetails').show();
//            $(ctrl).find('.MoreDetails').css("display", "inline-flex");
//        }
//    },1000)

function hoverId(ctrl) {
    //console.log(ctrl)
    // $(ctrl).find('.MoreDetails').show()
     if (popOverOpen == true) {
        $(".MoreDetails").not(CurrentHoverRowId).hide;
     }
     else {
        $(ctrl).find('.MoreDetails').show();
        $(ctrl).find('.MoreDetails').css("display", "inline-flex");
     }
}

function hoverNot(ctrl) {
    //setTimeout(function () {
    $('.MoreDetails').hide();
    if (popOverOpen == true) {
        $(CurrentHoverRowId).find('.MoreDetails').show();
    }
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

    chkvalesArr = [];
    $("#example  div").remove();
    $("#example").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $.ajax({
        type: "POST",
        url: "/Configuration/AjaxGetCustomersData",
        data: { id: "", start: start, pSize: PSize, search: search, order: order },
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
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 50 }
    GetEmployeeData(1, 0, 50);
    $("#fText").text("");
    $("#FilterText").hide();
}

function SubmitFilterSort(search, order, pSize, searchMsg) {
    $('#FilterModel').modal('hide');
    chkvalesArr = [];
    $("#example div").remove();
    $("#example").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $.ajax({
        url: '/Configuration/AjaxGetCustomersData',
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



function DeleteCustomerCtrls(ctrl) {
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var Pid = $(Rowid).children(1)[1].innerText;
    var custCode = $(Rowid).children(1)[2].innerText;
    var custName = $(Rowid).children(1)[3].innerText;
    var p_acccode = $(Rowid).children(1)[4].innerText;
    $("#deleteCustomerForm #p_Customer").val(Pid);
    $("#deleteCustomerForm #custCode").val(custCode);
    $("#deleteCustomerForm #custName").val(custName);
    $("#deleteCustomerForm #p_acccode").val(p_acccode);
    $("#deleteCustomer").modal(options);
    $("#deleteCustomer").modal("show");
}

function DeleteCustomer() {
    $("#deleteCustomer").modal("hide");
    var Pid = $("#deleteCustomerForm #p_Customer").val();
    var p_acccode = $("#deleteCustomerForm #p_acccode").val();
    $.post('/Configuration/AjaxDeleteCustomer', { p_customers: Pid, p_acccode: p_acccode }, function (data) {
        if (data.toLowerCase() === "success") {
            //$('#CallClosedContent').html('');
            //$('#CallClosed').modal(options);
            //$('#CallClosed .modal-title').text("Delete successfully");
            //$('#CallClosed').modal("show");
            //setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
            ShowMsg("Customer Deleted successfully","success");
            ReloadGrid();
        }
        else if("") {
            //$('#CallClosedContent').html('');
            //$('#CallClosed').modal(options);
            //$('#CallClosed .modal-title').text("Error while deleting");
            //$('#CallClosed').modal("show");
            //setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
            window.location.href = "/home/logout";
        }
        else {
            ShowMsg(data);
        }
    });
}

function ShowGroupModal() {
    var mp_acccode =""
    $(".checkboxall:checked").each(function () {
        var val = $(this).attr("data-p_acccode")
        mp_acccode += mp_acccode == "" ? val : "," + val;

    });
    if ($.trim(mp_acccode)!=="") {
        $("#AddCustomertoGroupModal").modal(options);
        $("#AddCustomertoGroupModal").modal("show");
        $("#AddCustomertoGroupModal #p_acccode").val(mp_acccode);
    }
    else {
        //$('#CallClosedContent').html('');
        //$('#CallClosed').modal(options);
        //$('#CallClosedContent').html("<p class='text-center' style='font-size: 18px;margin-bottom: 30px;'>Please select minimum 1 customer.</p>");
        //$('#CallClosed').modal("show");
        //setTimeout(function () { $('#CallClosed').modal("hide"); }, 2000);
        ShowMsg("Please select minimum 1 customer.","info");
    }
    
}

function AddCustomertoGroup() {
    $("#AddCustomertoGroupModal").modal("hide");
    var p_acccode = $("#AddCustomertoGroupModal #p_acccode").val();
    var p_infotable = $("#AddCustomertoGroupModal #Customergroup").val();
    if ($.trim(p_acccode) !== "" && $.trim(p_infotable)!=="0") {
        $.post('/Configuration/AjaxAddCustomertoGroup', { p_acccode: p_acccode, p_infotable: p_infotable }, function (data) {
            if ($.trim(data)=="") {
                window.location.href = "/Home/Logout";
            }
            else if ($.trim(data) == "True") {
                //$('#CallClosedContent').html('');
                //$('#CallClosed').modal(options);
                //$('#CallClosedContent').html("<p class='text-center' style='font-size: 18px;margin-bottom: 30px;'>Customer successfully added in group. </p>");
                //$('#CallClosed').modal("show");
                //setTimeout(function () { $('#CallClosed').modal("hide"); }, 2000);
                ShowMsg("Customer successfully added in group.","success");

            }

        })
    }
    else {
        //$('#CallClosedContent').html('');
        //$('#CallClosed').modal(options);
        //$('#CallClosedContent').html("<p class='text-center' style='font-size: 18px;margin-bottom: 30px;'>Please select customer group.</p>");
        //$('#CallClosed').modal("show");
        //setTimeout(function () { $('#CallClosed').modal("hide"); }, 2000);
        ShowMsg("Please select customer group.", "info");

    }

    
}

function chkCheckUncheck(ctrl) {
    if (ctrl.checked) {
        var index = chkvalesArr.indexOf($(ctrl).val());
        if (index == -1) {
            chkvalesArr.push($(ctrl).val());
        }
    }
    else {
        var index = chkvalesArr.indexOf($(ctrl).val());
        if (index > -1) {
            chkvalesArr.splice(index, 1);
        }
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


//Basic filter multiple
function SubmitBasicFilter(search, searchMsg) {
    chkvalesArr = [];
    var pSize = sessionStorage.getItem("PageSize");
    $("#example div").remove();
    $("#example").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();

    $.ajax({
        url: "/Configuration/AjaxGetCustomersData",
        type: "POST",
        data: { id: "", start: 0, pSize: pSize, search: search},
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
//    //if (window.performance.navigation.type == performance.navigation.TYPE_RELOAD) {
//    //    alert("screen reloaded");
//    //}

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
//            $(".filterclose").addClass("DatesMargin");
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



//Show PopUp modal before AddTags on Customer
function ShowMultiCustomerAddTagsModal() {
    var p_customers = "";

    for (var i = 0; i < chkvalesArr.length; i++) {
        var val = chkvalesArr[i];

        var p_customer = $("#tr-" + val).find(".custId").text();

        p_customers += p_customers == "" ? p_customer : "," + p_customer;
    }
    if ($.trim(p_customers) !== "") {
        $("#MultiTagsAddModal").show();
        $("#MultiTagsAddModal #p_customers").val(p_customers);
        $("#MultiTagsAddModal #ddlmultiTags").parent().show().removeClass('open').addClass('open');
    }
    else {
        ShowMsg("Please select at least 1 Customer.", "error");
    }


}

function AddMultipleTagsOnCustomers() {
    var p_customers = $("#MultiTagsAddModal #p_customers").val();
    var tagkeys = $("#MultiTagsAddModal #ddlmultiTags option:selected").map(function () { return $(this).val(); }).get().join(",");

    $("#MultiTagsAddModal").hide();
    $.post('/Configuration/AjaxAddMultipleTags', { p_customers: p_customers, tagkeys: tagkeys }, function (data) {
        if (data.statusCode == 500) {
            window.location.href = "/Home/Error";
        }
        if (data == "") {
            window.location.href = "/Home/LogOut";
            return true;
        }
        var msg = "";
        var msgType = "";
        if (data == "Already Added") {
            msg = "Tags already Added";
            msgType = "info";
        }
        else if (data == "true") {
            msg = "Tag has been added Successfully.";
            msgType = "success";
        }
        else {
            msg = "An error occured while storing your Information .Please try again later.";
            msgType = "error";
        }


        ShowMsg(msg, msgType)

        if (data == "true") {
            ReloadGrid();
        }
    });
}


function searchByCustName() {
    var custname = $("#custnameFilter").val();
    if (custname.length == 0) {
        setSearchSessionStorage("");
        setSearchMsgSessionStorage("");
        ReloadGrid();
    }
    else {
        let search = custname + ",m1.custname:string";
        setSearchSessionStorage(search);
        let searchMsg = "Search Results: Name <span class='' style='font-weight: 600'>'" + custname + "'</span>";
        setSearchMsgSessionStorage(searchMsg);
        ReloadGrid();
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
                            var Pid = $(Rowid).children(1)[1].innerText;
                            window.location = '/Configuration/CustomerForm?P_Customers=' + Pid + '&&exitmode=edit'
                            break;
                        case "Delete":
                            var Rowid = "#tr-" + id;
                            var Pid = $(Rowid).children(1)[1].innerText;
                            //window.location = '/Configuration/CustomersForm?P_Customers=' + Pid + '&&exitmode=delete'
                            var custCode = $(Rowid).children(1)[2].innerText;
                            var custName = $(Rowid).children(1)[3].innerText;
                            var p_acccode = $(Rowid).children(1)[4].innerText;
                            $("#deleteCustomerForm #p_Customer").val(Pid);
                            $("#deleteCustomerForm #custCode").val(custCode);
                            $("#deleteCustomerForm #custName").val(custName);
                            $("#deleteCustomerForm #p_acccode").val(p_acccode);
                            $("#deleteCustomer").modal(options);
                            $("#deleteCustomer").modal("show");
                            break;

                            //9) function to redirect to  view Setting controller
                        case "ViewSetting":
                            window.location = '/Configuration/ViewSetting?infotype=hoverstripstring&viewid=managecustomers'
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

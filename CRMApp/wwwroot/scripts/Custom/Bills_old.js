var options = { "backdrop": "static", keyboard: true };
var chkvalesArr = [];
var selectAll = false;

function getCurrentDate() {
    var crtDate = new Date();
    var month = (crtDate.getMonth() + 1) < 10 ? '0' + (crtDate.getMonth() + 1) : (crtDate.getMonth() + 1);
    var day = crtDate.getDate() < 10 ? '0' + crtDate.getDate() : crtDate.getDate();
    var date = crtDate.getFullYear() + "-" + month + "-" + day;
    return date
}


$(document).ready(function () {
    $("#billdatepickerFrom").val(getCurrentDate());
    $("#billdatepickerTo").val(getCurrentDate());
    //logic to fill search dropdown
    //var d = $("#fvalue").val();
    //var m = [];
    //m = d.split("|");
    //var l;
    //for (i = 0; i <= m.length - 1; i = i + 1) {
    //    l = m[i].split("~");
    //    $('#filter').append($('<option>', { value: l[1] + ":" + l[2], text: l[0] }));
    //};
    $('a').tooltip();
    //done logic of filter dropdown
    var a = 1;
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("RegPageSize");
    if (t == null) { t = 500 }
    var SelectedRows = "";

    setInterval(ReloadGrid(), 15 * 60 * 1000)

    $("#Prev").on("click", function () {
        var a = sessionStorage.getItem("RegPageSize");
        var b = sessionStorage.getItem("search");
        if (b == "null") {
            b = "";
        }
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem("order");
        var total = sessionStorage.getItem("Total");
        if (a != null) { d = (d - a) - 1; } else { d = (d - 500) - 1; }
        $("#example tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d >= 0) {
            $.post('/Invoices/AjaxGetSaleOrdersDataForGrid', { start: d, pSize: a, search: b, order: o }, function (dataStr) {
                var obj = JSON.parse(dataStr);
                var data = obj.data;
                //var totalAmt = obj.totalAmt;
                //$(".TotalAmountSection").show();
                //$(".TotalAmountValue").html(totalAmt);
                loadData(data);
            })
        }
    });

    $("#Next").on("click", function () {
        var total = sessionStorage.getItem("Total");
        var a = sessionStorage.getItem("RegPageSize");
        var c = sessionStorage.getItem("search");
        if (c == "null") {
            c = "";
        }
        var d = sessionStorage.getItem("start");

        var o = sessionStorage.getItem("order");

        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 500 - 1; }
        $("#example tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/Invoices/AjaxGetSaleOrdersDataForGrid', { start: d, pSize: a, search: c, order: o }, function (dataStr) {
                var obj = JSON.parse(dataStr);
                var data = obj.data;
                //var totalAmt = obj.totalAmt;
                //$(".TotalAmountSection").show();
                //$(".TotalAmountValue").html(totalAmt);
                loadData(data);
            })
        }
    });


    $("#btnSearch").on("click", function () {
        var billDateFrom = $("#billdatepickerFrom").val();
        var billDateTo = $("#billdatepickerTo").val();
        var col = ""
        var search = ""

        //if (billDate!=="") {
            col = "m1.billdate";
            search = billDateFrom + "," + billDateTo + "," + col + ":Date";
        //}

        chkvalesArr = [];
        $("#example tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        sessionStorage.setItem("search", search);
        var pSize = sessionStorage.getItem("RegPageSize");
        $.ajax({
            type: "POST",
            url: "/Invoices/AjaxGetSaleOrdersDataForGrid",
            data: { start: 0, pSize: pSize, search: search },
            success: function (dataStr) {
                if (dataStr.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    var obj = JSON.parse(dataStr);
                    var data = obj.data;
                    //var totalAmt = obj.totalAmt;
                    sessionStorage.setItem("Total", data.recordsTotal);
                    //$(".TotalAmountSection").show();
                    //$(".TotalAmountValue").html(totalAmt);
                    loadData(data);
                }

            },
            error: function () {
                alert("Error in loading data")
            }
        });
        
    });
    
    $("#selectall").click(function () {
        if (this.checked) {
            $('.checkboxall').each(function () {
                $(".checkboxall").prop('checked', true);
                var index = chkvalesArr.indexOf($(this).val());
                if (index == -1) {
                    chkvalesArr.push($(this).val());
                }
            })
            $("#subDiv #subDivLable").text("Select all rows");
            //$("#subDiv").show();
        }
        else {
            $('.checkboxall').each(function () {
                $(".checkboxall").prop('checked', false);
                var index = chkvalesArr.indexOf($(this).val());
                if (index>-1) {
                    chkvalesArr.splice(index,1);
                }
            })
            selectAll = false;
            //$("#subDiv").hide();
        }
    });
 
     
});

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
//function ExportToExcel() {
//    var billDate = $("#billdatepicker").val();
//    var col = ""
//    var search = ""
//    if (billDate !== "") {
//        col = "m1.billdate";
//        search = billDate + ",," + col + ":Date";
//    }
//    $("#loadspin,#overlay").show();
//    $.ajax({
//        type: "POST",
//        url: "/Invoices/ExportToExcel",
//        data: { search: search },
//        success: function (filepath) {
//            $("#loadspin,#overlay").hide();
//            if (filepath !== "") {
//                window.location.href = "/Invoices/downloadSrlOrdExcel?filepath=" + filepath;
//            }
//            else {
//                showMsg("There are no data to export")
//            }
//        }
//    });
//}

//function DeleteCtrl() {
//    var p_saleiems = "";
//    $(".checkboxall:checked").each(function (i, item) {
//        p_saleiems += p_saleiems == "" ? $(item).val() : "," + $(item).val();
//    })
//    if (p_saleiems=="") {
//        return false;
//    }
//    $("#deleteDailySaleForm #p_saleiems").val(p_saleiems);
//    $("#deleteDailySale").modal(options);
//    $("#deleteDailySale").modal("show");
//}

//function DeleteDailySale() {
//    $("#deleteDailySale").modal("hide");
//    var p_saleiems = $("#deleteDailySaleForm #p_saleiems").val();
//    $.post('/IEMS/AjaxDeleteSaleData', { p_saleiems: p_saleiems }, function (data) {
//        if (data == "success") {
//            showMsg("Deleted successfully");
//            ReloadGrid();
//        }
//        else {
//            window.location.href = "/Home/LogOut";
//        }
//    });
//}


function showMsg(title) {
    $('#msgModelContent').html("");
    $('#msgModel').modal(options);
    $('#msgModel .modal-title').text(title);
    $('#msgModel').modal("show");
}



function ReloadGrid() {
    $("#billdatepickerFrom").val(getCurrentDate());
    $("#billdatepickerTo").val(getCurrentDate());
    $("#example tbody tr").remove();
    $("#example tbody ").height(0);
    chkvalesArr = [];
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("RegPageSize");
    if (t == null) { t = 500 }
    GetEmployeeData(1, 0, 500);
   
}



function GetEmployeeData(pageNumber, start, PSize) {
    $('#loading').show();
    $('#loadingmessage').show();
    $.ajax({
        type: "POST",
        url: "/Invoices/AjaxGetSaleOrdersDataForGrid",
        data: {  start: start, pSize: PSize },
        success: function (dataStr) {
            if (dataStr.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                var obj = JSON.parse(dataStr);
                var data = obj.data;
                //var totalAmt = obj.totalAmt;
                sessionStorage.setItem("Total", data.recordsTotal);
                //$(".TotalAmountSection").show();
                //$(".TotalAmountValue").html(totalAmt);
                loadData(data);
            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });
}

function loadData(data) {
    var tblEmployee = $("#example tbody");
    $("#example tbody tr").remove();
    $("#example tbody ").height(0);
    $("#selectall").prop('checked', false);
    var a = data.draw;
    if ($("#Next").hasClass("disabledbutton") == true) { $("#Next").removeClass("disabledbutton"); }
    if ($("#Prev").hasClass("disabledbutton") == true) { $("#Prev").removeClass("disabledbutton"); }
    var d = sessionStorage.getItem("RegPageSize");
    if (d == null || d == 0 || d == "undefined") { d = 500; sessionStorage.setItem("RegPageSize", d); };
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
        //var m = parseInt(a) + index;
        m = m + 1;
        var tr = $(' <tr id="MainRow-' + item.billheader_key + '" class="maindiv" style="height:45px">')
        tr.html(("<th class='icon' style='width:4%' ><input type='checkbox' onclick='chkCheckUncheck(this)' class='checkboxall' id='chk-" + item.p_billheader + "' value='" + item.p_billheader + "' style='cursor:pointer' /><a  class ='pull-left-container' onClick='LoadItems(" + item.billheader_key + ", " + item.p_billheader + ")' style='cursor: pointer; padding:5px;'> <i class='careticon fa fa-angle-right' style='color:#105faf; font-size:25px;  margin-top: 10px;padding-bottom: 20px; padding-right:0px;  padding-left:0px; font-weight: 600; z-index:1;'></i></a></th> ")
            + ('<th class="sno basicTr" style="width: 3%; padding-left: 15px;">' + m + '</th>')
            + ('<th class="SaleDate basicTr" style=" width: 8%; padding-left: 15px;">' + item.frmtbilldate + '</th>')
            + ('<th class="invoiceid billseries basicTr" style="width:7%;">' + item.billseries + '</th>')
            + ('<th class="invoiceid billno basicTr" style="width:7%;">' + item.billno + '</th>')
            + ('<th class="BrandName customer basicTr" style="width:8%;padding-left: 8px !important;">' + item.txtcustomer + '</th>')
            + ('<th class="BrandName salesman basicTr" style="width:8%;padding-left: 5px !important;">' + item.txtsalesman + '</th>')
            + ('<th class="BrandName Payment basicTr" style="width:10%;padding-left: 5px !important;">' + item.txtpaymentmode + '</th>')
            + ('<th class="PackingCode basicTr" style="width:10%;">' + item.grossamt + '</th>')
            + ('<th class="Quantity basicTr" style="width:7%;">' + item.discount + '</th>')
            + ('<th class="mrp basicTr" style="width:6%;">' + item.addition + '</th>')
            + ('<th class="total basicTr" style="width:8%;">' + item.netamount + '</th>')
            + ('<th class="invoiceid orderid basicTr" style="width:7%;">' + item.orderid + '</th>')
            + ('<th class="invoiceid Timestamp basicTr" style="width:7%;text-align:center;">' + item.frmtmtimestamp + '</th>')
            
        );

        tblEmployee.append(tr);
        
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
               
    })

    if (data.recordsTotal == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $('#loading').addClass('clickable');
        $('#example tbody').height(0);
        //$(".TotalAmountSection").hide();
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
        //$(".TotalAmountSection").show();
        Deviceheight();
    }

    
}




function Deviceheight() {

    var Header = $("header").outerHeight(true);
    var icondiv = $(".panelpanel-default").outerHeight(true);
    var mainDiv = $("#MainDiv").outerHeight(true);
    var subDiv = $("#subDiv").outerHeight(true);
    var totalAmt = 0 //$(".TotalAmountSection").outerHeight(true);
    var Footer = $(".main-footer").outerHeight();
    var windowHeight = $(window).outerHeight(true);
    
    var SumOfElementHeight = Header + icondiv + mainDiv + subDiv + totalAmt + Footer;
    var MainHeight = windowHeight - SumOfElementHeight - 10;
    //$(".table-responsive").height(MainHeight);
   $(".Table-Dive").height(MainHeight);

    
}

function LoadItems(billheader_key, p_billheader) {
    var childRows = $("#example tbody").children("tr.ChildRow-" + billheader_key);

    $("#MainRow-" + billheader_key).find(".careticon").toggleClass("fa-angle-right fa-angle-down");

    $("#MainRow-" + billheader_key).toggleClass("style");

    if (childRows.length > 0) {
        if ($("#example tbody").children("tr.ChildRow-" + billheader_key + ":visible").length > 0) {
            $("#example tbody").children("tr.ChildRow-" + billheader_key + ":visible").hide();
        }
        else {
            $("#example tbody").children("tr.ChildRow-" + billheader_key + ":hidden").show();
        }
    }
    else {
        $.post('/Invoices/AjaxGetBillItemsDataForPBillheader', { p_billheader: p_billheader }, function (dataStr) {
            var orderObj = JSON.parse(dataStr);
            var orderItems = orderObj.data;
            if (orderItems.recordsTotal > 0) {
                var html = (' <tr class="ChildRow-' + billheader_key + '" style="border-spacing: 5em;border-collapse: collapse; text-align: center;  color: #404040; background-color: #f3f8fa; width: 100%; border-bottom: 6px solid white; height: 50px; display:inline-block; ">')
                    + ('<th class="blank" style="width: 50px; padding-left: 15px; font-weight:bold !important; cursor:default; color:transparent;">black</th>')
                    + ('<th class="SNo" style="width:13%; padding-left: 15px; font-weight:bold !important;">Item SNo</th>')
                    + ('<th colspan="2" class="SaleDate" style="width: 30%; padding-left: 15px; font-weight:bold !important;">Product Name</th>')
                    + ('<th class="invoiceid" style="width:12%; font-weight:bold !important;">Packing</th>')
                    + ('<th class="invoiceid" style="width:12%; font-weight:bold !important;">Lotorexpry</th>')
                    + ('<th class="BrandName" style="width:10%; font-weight:bold !important;">Quantity</th>')
                    + ('<th class="PackingCode" style="width:10%; font-weight:bold !important;">Rate</th>')
                    + ('<th colspan="6" class="PackingCode" style="width:10%; font-weight:bold !important;">Total</th></tr>');

                $.each(orderItems.data, function (index, item) {
                    var tr = (' <tr class="ChildRow-' + billheader_key + '" id="' + item.billitems_key + '" class="" style="text-align: center;  color: #404040; background-color: white; width: 100%;  height: 50px; display:block;">')
                        + ('<th class="blank" style="width: 50px; padding-left: 15px; font-weight:bold !important; cursor:default; color:transparent;">black</th>')
                        + ('<th class="SNo" style="width: 13%; padding-left: 15px !important;">' + item.itemsno + '</th>')
                        + ('<th colspan="2" class="SaleDate" style="width: 30%; padding-left: 1px !important;">' + item.prodname + '</th>')
                        + ('<th class="invoiceid" style="width:12%; padding-left: 5px !important;">' + item.packing + '</th>')
                        + ('<th class="invoiceid" style="width:12%; padding-left: 5px !important;">' + item.lotorexpry + '</th>')
                        + ('<th class="BrandName" style="width:10%;padding-left: 15px !important;">' + item.itemqty + '</th>')
                        + ('<th class="PackingCode" style="width:10%;padding-left: 5px !important;">' + item.sellingprice + '</th>')
                        + ('<th colspan="6" class="PackingCode" style="width:10%;padding-left: 5px !important;">' + item.itemamount + '</th> </tr>');
                    html += tr;
                })
                if ($("#example tbody").children("tr.ChildRow-" + billheader_key).length == 0) {
                    $("#MainRow-" + billheader_key).after(html);
                    $("#example tbody").children("tr.ChildRow-" + billheader_key).last().css("border-bottom","solid 1px #494949 ")
                }
            }

        })
    }

   

}



function ExportToIEMS() {
    var p_billheaders = ""
    $(".checkboxall:checked").each(function () {
        var val = $(this).val();
        p_billheaders += p_billheaders == "" ? val : "," + val;
    });
    if ($.trim(p_billheaders)!="") {
        $.post('/Invoices/ExportToIEMS', { p_billheaders: p_billheaders }, function (data) {
            console.log(data);
        });
    }
    else {
        showMsg("Please select Bills.");
    }
}



function GenerateBillSummary() {
    var p_billheaders = ""
    $(".checkboxall:checked").each(function () {
        var val = $(this).val();
        p_billheaders += p_billheaders == "" ? val : "," + val;
    });
    
    var billDateFrom = $("#billdatepickerFrom").val();
    var billDateTo = $("#billdatepickerTo").val();
    var col = "m1.billdate";
    var search = billDateFrom + "," + billDateTo + "," + col + ":Date";

    $.post('/Invoices/GenerateBillSummary', { p_billheaders: p_billheaders, search :search }, function (data) {
        if (data == "err") {
            showMsg("Something went wrong. Please try again later.");
        }
        if (data == "success") {
            window.location.href = "/IEMS/DailySale";
        }
        if (data == "Norows") {
            showMsg("No bills on this date.");
        }
    });
    
    //if ($.trim(p_billheaders) != "") {
    //    $.post('/Invoices/GenerateBillSummary', { p_billheaders: p_billheaders }, function (data) {
    //        if (data=="err") {
    //            showMsg("Something went wrong. Please try again later.");
    //        }
    //        if (data == "success") {
    //            window.location.href = "/IEMS/DailySale";
    //        }
    //    });
    //}
    //else {
    //    showMsg("Please select Bills.");
    //}
}



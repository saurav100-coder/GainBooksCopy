var options = { "backdrop": "static", keyboard: true };


function getCurrentDate() {
    var crtDate = new Date();
    var month = (crtDate.getMonth() + 1) < 10 ? '0' + (crtDate.getMonth() + 1) : (crtDate.getMonth() + 1);
    var day = crtDate.getDate() < 10 ? '0' + crtDate.getDate() : crtDate.getDate();
    var date = crtDate.getFullYear() + "-" + month + "-" + day;
    return date
}


$(document).ready(function () {
    $("#billdatepicker").val(getCurrentDate());
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
    if (t == null) { t = 50 }
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
        if (a != null) { d = (d - a) - 1; } else { d = (d - 50) - 1; }
        $("#example tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d >= 0) {
            $.post('/Orders/AjaxGetSaleOrdersDataForGrid', { start: d, pSize: a, search: b, order: o }, function (dataStr) {
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

        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 50 - 1; }
        $("#example tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/Orders/AjaxGetSaleOrdersDataForGrid', { start: d, pSize: a, search: c, order: o }, function (dataStr) {
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
        var billDate = $("#billdatepicker").val();
        var col = ""
        var search = ""

        if (billDate!=="") {
            col = "m1.billdate";
            search = billDate + ",," + col + ":Date";
        }


        $("#example tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        sessionStorage.setItem("search", search);
        var pSize = sessionStorage.getItem("RegPageSize");
        $.ajax({
            type: "POST",
            url: "/Orders/AjaxGetSaleOrdersDataForGrid",
            data: { start: 0, pSize: pSize, search: search },
            success: function (dataStr) {
                if (data.statusCode == 500) {
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
            })
        } else {
            $('.checkboxall').each(function () {
                $(".checkboxall").prop('checked', false);
            })
        }
    });
 
     
});

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
//        url: "/Orders/ExportToExcel",
//        data: { search: search },
//        success: function (filepath) {
//            $("#loadspin,#overlay").hide();
//            if (filepath !== "") {
//                window.location.href = "/Orders/downloadSrlOrdExcel?filepath=" + filepath;
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
    $("#billdatepicker").val(getCurrentDate());
    $("#example tbody tr").remove();
    $("#example tbody ").height(0);
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("RegPageSize");
    if (t == null) { t = 50 }
    GetEmployeeData(1, 0, 50);
   
}



function GetEmployeeData(pageNumber, start, PSize) {
    $('#loading').show();
    $('#loadingmessage').show();
    $.ajax({
        type: "POST",
        url: "/Orders/AjaxGetSaleOrdersDataForGrid",
        data: {  start: start, pSize: PSize },
        success: function (dataStr) {
            if (data.statusCode == 500) {
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
        //var m = parseInt(a) + index;
        m = m + 1;
        var tr = $(' <tr id="MainRow-' + item.billheader_key + '" class="" style="  text-align: center;  color: #404040; background-color: white; width: 100%;  height: 50px;" >')
        tr.html(("<th style='width:75px' ><input type='checkbox' class='checkboxall'' value='" + item.p_billheader + "' style='cursor:pointer' /><a  class ='pull-left-container' onClick='LoadItems(" + item.billheader_key + ", " + item.p_billheader + ")' style='cursor: pointer; padding:5px;'> <i class='careticon fa fa-angle-right' style='color:#105faf; font-size:25px;  margin-top: 10px;padding-bottom: 20px; padding-right:0px;  padding-left:0px; font-weight: 600; z-index:1;'></i></a></th> ")
            + ('<th class="SNo" style="width: 50px; padding-left: 15px;">' + m + '</th>')
            + ('<th class="SaleDate" style=" width: 100px; padding-left: 15px;">' + item.frmtbilldate + '</th>')
            + ('<th class="invoiceid" style="width:100px;">' + item.billseries + '</th>')
            + ('<th class="invoiceid" style="width:100px;">' + item.billno + '</th>')
            + ('<th class="BrandName" style="width:130px;">' + item.txtcustomer + '</th>')
            + ('<th class="BrandName" style="width:100px;">' + item.txtsalesman + '</th>')
            + ('<th class="BrandName" style="width:80px;">' + item.txtpaymentmode + '</th>')
            + ('<th class="PackingCode" style="width:150px;">' + item.grossamt + '</th>')
            + ('<th class="Quantity" style="width:75px;">' + item.discount + '</th>')
            + ('<th class="mrp" style="width:75px;">' + item.addition + '</th>')
            + ('<th class="total" style="width:150px;">' + item.netamount + '</th>')
            
        );

        tblEmployee.append(tr);
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
    var totalAmt = 0 //$(".TotalAmountSection").outerHeight(true);
    var Footer = $(".main-footer").outerHeight();
    var windowHeight = $(window).outerHeight(true);
    var SumOfElementHeight = Header + icondiv + mainDiv + totalAmt + Footer;
    var MainHeight = windowHeight - SumOfElementHeight - 10;
    $(".table-responsive").height(MainHeight);
    
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
        $.post('/orders/AjaxGetBillItemsDataForPBillheader', { p_billheader: p_billheader }, function (dataStr) {
            var orderObj = JSON.parse(dataStr);
            var orderItems = orderObj.data;
            if (orderItems.recordsTotal > 0) {
                var html = (' <tr class="ChildRow-' + billheader_key + '" style="border-spacing: 5em;border-collapse: collapse; text-align: center;  color: #404040; background-color: #f3f8fa; width: 100%; border-bottom: 6px solid white; height: 50px; ">')
                    + ('<th class="blank" style="width: 50px; padding-left: 15px; font-weight:bold !important; cursor:default; color:transparent;">black</th>')
                    + ('<th class="SNo" style="width: 50px; padding-left: 15px; font-weight:bold !important;">Item SNo</th>')
                    + ('<th colspan="2" class="SaleDate" style="width: 150px; padding-left: 15px; font-weight:bold !important;">Product Name</th>')
                    + ('<th class="invoiceid" style="width:100px; font-weight:bold !important;">Packing</th>')
                    + ('<th class="invoiceid" style="width:100px; font-weight:bold !important;">Lotorexpry</th>')
                    + ('<th class="BrandName" style="width:200px; font-weight:bold !important;">Quantity</th>')
                    + ('<th class="PackingCode" style="width:120px; font-weight:bold !important;">Rate</th>')
                    + ('<th colspan="4" class="PackingCode" style="width:120px; font-weight:bold !important;">Total</th></tr>');

                $.each(orderItems.data, function (index, item) {
                    var tr = (' <tr class="ChildRow-' + billheader_key + '" id="' + item.billitems_key + '" class="" style="text-align: center;  color: #404040; background-color: white; width: 100%;  height: 50px;">')
                        + ('<th class="blank" style="width: 50px; padding-left: 15px; font-weight:bold !important; cursor:default; color:transparent;">black</th>')
                        + ('<th class="SNo" style="width: 50px; padding-left: 15px;">' + item.itemsno + '</th>')
                        + ('<th colspan="2" class="SaleDate" style="width: 150px; padding-left: 15px;">' + item.prodname + '</th>')
                        + ('<th class="invoiceid" style="width:100px;">' + item.packing + '</th>')
                        + ('<th class="invoiceid" style="width:100px;">' + item.lotorexpry + '</th>')
                        + ('<th class="BrandName" style="width:200px;">' + item.itemqty + '</th>')
                        + ('<th class="PackingCode" style="width:120px;">' + item.sellingprice + '</th>')
                        + ('<th colspan="4" class="PackingCode" style="width:120px;">' + item.itemamount + '</th> </tr>');
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
        $.post('/Orders/ExportToIEMS', { p_billheaders: p_billheaders }, function (data) {
            console.log(data);
        });
    }
    else {
        showMsg("Please select Bills.");
    }
}







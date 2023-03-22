﻿var options = { "backdrop": "static", keyboard: true };
var chkvalesArr = [];
var selectAll = false;

function getCurrentDate() {
    var crtDate = new Date();
    var month = (crtDate.getMonth() + 1) < 10 ? '0' + (crtDate.getMonth() + 1) : (crtDate.getMonth() + 1);
    var day = crtDate.getDate() < 10 ? '0' + crtDate.getDate() : crtDate.getDate();
    var date = crtDate.getFullYear() + "-" + month + "-" + day;
    return date
}

$("nav").find(".newTitle").remove();
var s = "<p class='newTitle' >Daily Sale</p>";
$("nav").find(".titleName").append(s);

function getShopCodes() {
    var strDtShop = $("#dtshopCodes").val();
    if (strDtShop !== "") {
        var dtShop = JSON.parse(strDtShop);
        $("#SCode").empty();
        var allVal = "";
        $.each(dtShop, function (i, shopItem) {
            $("#SCode").append($("<option>", {
                value: (shopItem.shopcode).trim(),
                text:(shopItem.shopcode).trim()
            }));
            allVal += allVal == "" ? (shopItem.shopcode).trim() : "," + (shopItem.shopcode).trim();
        })

        $("#SCode").prepend($("<option>", {
            value: allVal,
            text: "All",
            selected:true
        }));

    }
}



function fillFormDropdowns() {
    var strDtShop = $("#dtshopCodes").val();
    if (strDtShop !== "") {
        var dtShop = JSON.parse(strDtShop);
        $("#shopcode").empty();
        $("#shopcode").append($("<option>", {value:0,text:"-Select-"}))
        $.each(dtShop, function (i, shopItem) {
            $("#shopcode").append($("<option>", {
                value: (shopItem.shopcode).trim(),
                text: (shopItem.shopcode).trim()
            }));
        })
    }

    var strDtGroup = $("#dtgroupCodes").val();
    if (strDtGroup !== "") {
        var dtGroup = JSON.parse(strDtGroup);
        $("#groupcode").empty();
        $("#groupcode").append($("<option>", { value: 0, text: "-Select-" }))
        $.each(dtGroup, function (i, groupItem) {
            $("#groupcode").append($("<option>", {
                value: (groupItem.groupcode).trim(),
                text: (groupItem.grouptype).trim()
            }));
        })
    }

   
    //var strDtBrand = $("#dtbrandCodes").val();
    //if (strDtBrand !== "") {
    //    var dtBrand = JSON.parse(strDtBrand);
    //    $("#brandcode").empty();
    //    $("#brandcode").append($("<option>", { value: 0, text: "-Select-" }))
    //    $.each(dtBrand, function (i, brandItem) {
    //        $("#brandcode").append($("<option>", {
    //            value: (brandItem.brandcode).trim(),
    //            text: (brandItem.brandname).trim()
    //        }));
    //    })
    //}

    //var strDtPacking = $("#dtpackingCode").val();
    //if (strDtPacking !== "") {
    //    var dtPacking = JSON.parse(strDtPacking);
    //    $("#packingcode").empty();
    //    $("#packingcode").append($("<option>", { value: 0, text: "-Select-" }))
    //    $.each(dtPacking, function (i, packingItem) {
    //        $("#packingcode").append($("<option>", {
    //            value: (packingItem.packingcode).trim(),
    //            text: (packingItem.packingdesc).trim()
    //        }));
    //    })
    //}

}


$(document).ready(function () {
    $("#billdatepicker").val(getCurrentDate());
    getShopCodes();
    
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
            $.post('/IEMS/AjaxGetDailySaleDataForGrid', { start: d, pSize: a, search: b, order: o }, function (dataStr) {
                var obj = JSON.parse(dataStr);
                var data = obj.data;
                var totalAmt = obj.totalAmt;
                $(".TotalAmountSection").show();
                $(".TotalAmountValue").html(totalAmt);
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
            $.post('/IEMS/AjaxGetDailySaleDataForGrid', { start: d, pSize: a, search: c, order: o }, function (dataStr) {
                var obj = JSON.parse(dataStr);
                var data = obj.data;
                var totalAmt = obj.totalAmt;
                $(".TotalAmountSection").show();
                $(".TotalAmountValue").html(totalAmt);
                loadData(data);
            })
        }
    });


    $("#btnSearch").on("click", function () {
        var billDate = $("#billdatepicker").val();
        var shopCode = $("#SCode").val();
        var col = ""
        var search = ""

        if (billDate!=="") {
            col = "m1.saledate";
            search = billDate + ",," + col + ":Date";
        }

        if (shopCode!=="") {
            col = "m1.shopcode";
            search += ", and ;" + shopCode + "," + col + ":String,";
        }

        chkvalesArr = [];
        $("#example tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        sessionStorage.setItem("search", search);
        var pSize = sessionStorage.getItem("RegPageSize");
        $.ajax({
            type: "POST",
            url: "/IEMS/AjaxGetDailySaleDataForGrid",
            data: { start: 0, pSize: pSize, search: search },
            success: function (dataStr) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    var obj = JSON.parse(dataStr);
                    var data = obj.data;
                    var totalAmt = obj.totalAmt;
                    sessionStorage.setItem("Total", data.recordsTotal);
                    $(".TotalAmountSection").show();
                    $(".TotalAmountValue").html(totalAmt);
                    loadData(data);
                }
            },
            error: function () {
                alert("Error in loading data")
            }
        });
        
    });
    
    $("#SCode").on("change", function () {
        var shopCode = $("#SCode").val();
        var arr = shopCode.split(",");

        if (arr.length > 1) {
            $("#SName").html("");
        }
        else {
            $.post('/IEMS/AjaxGetShopNameFromShopCode', { shopcode: shopCode }, function (data) {
                $("#SName").html(data);
            })
        }
        
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
            $("#subDiv").show();
        } else {
            $('.checkboxall').each(function () {
                $(".checkboxall").prop('checked', false);
                var index = chkvalesArr.indexOf($(this).val());
                if (index > -1) {
                    chkvalesArr.splice(index, 1);
                }
            })
            selectAll = false;
            $("#subDiv").hide();
        }
    });


    $(".btn-CreateDailySale").click(function () {
        $("#DailySaleFormModel").modal(options);
        $("#DailySaleFormModel").modal('show');      
    });


    fillFormDropdowns();
    $("#saledate").val(getCurrentDate());
  
    $("#groupcode").on("change", function () {
        $("#brandcode").empty();
        $("#brandcode").append($("<option>", { value: 0, text: "-Select-" }))
        $("#packingcode").empty();
        $("#packingcode").append($("<option>", { value: 0, text: "-Select-" }))
        $("#mrp").val("");
        $("#total").val("");
        var gCode = $(this).val();
        if (gCode !== "0") {
            $.post('/IEMS/AjaxGetBrandData', { groupcode: gCode }, function (strData) {
                if (strData !== "") {
                    var data = JSON.parse(strData);
                    $.each(data, function (i, item) {
                        $("#brandcode").append($("<option>", {
                            value: (item.brandcode).trim(),
                            text: (item.brandname).trim()
                        }));
                    });
                }
            });
        }
    });

    $("#brandcode").on("change", function () {
        $("#packingcode").empty();
        $("#packingcode").append($("<option>", { value: 0, text: "-Select-" }))
        $("#mrp").val("");
        $("#total").val("");
        var bCode = $(this).val();
        var gCode = $("#groupcode").val();
        if (gCode!=="0" && bCode!=="0") {
            $.post('/IEMS/AjaxGetPackingData', { groupcode: gCode, brandcode : bCode}, function (strData) {
                if (strData !== "") {
                    var data = JSON.parse(strData);
                    $.each(data, function (i, item) {
                        $("#packingcode").append($("<option>", {
                            value: (item.packingcode).trim(),
                            text: (item.packingdesc).trim()
                        }));
                    });
                }
            });
        }
    });

    


    $("#packingcode").on("change", function () {
        $("#mrp").val("");
        $("#total").val("");
        var pCode = $(this).val();
        var bCode = $("#brandcode").val();
        var gCode = $("#groupcode").val();
        if (pCode !== "0" && gCode !== "0" && bCode!=="0") {
            $.post('/IEMS/AjaxGetMRP', { groupcode: gCode, packingcode: pCode, brandcode: bCode }, function (Data) {
                if (Data !== "") {
                    $("#mrp").val(Data);
                    var qty = $("#sale_qty").val();
                    if (qty=="") {
                        $("#sale_qty").val("1");
                        $("#total").val(Data * 1);
                    }
                    else {
                        $("#total").val(Data * qty);
                    }

                    
                }
            });
        }
    });

    $("#sale_qty").keyup(function () {
        var mrp = $("#mrp").val();
        var qty = $(this).val();
        if (mrp!=="" && qty!=="") {
            $("#total").val(mrp*qty);
        }
        else {
            $("#total").val("");
        }
        
});

});

function ExportToExcel() {
    var billDate = $("#billdatepicker").val();
    var shopCode = $("#SCode").val();

    var col = ""
    var search = ""

    if (billDate !== "") {
        col = "m1.saledate";
        search = billDate + ",," + col + ":Date";
    }

    if (shopCode !== "") {
        col = "m1.shopcode";
        search += ", and ;" + shopCode + "," + col + ":String,";
    }

    $("#loadspin,#overlay").show();
    $.ajax({
        type: "POST",
        url: "/IEMS/ExportToExcel",
        data: { search: search },
        success: function (filename) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            $("#loadspin,#overlay").hide();
            if (filename !== "") {
                window.location.href = "/IEMS/downloadDailySaleExcel?filename=" + filename;
            }
            else {
               showMsg("There are no data to export")
            }
        }
    });

}

function DeleteCtrl() {
    var p_saleiems = "";
    $(".checkboxall:checked").each(function (i, item) {
        p_saleiems += p_saleiems == "" ? $(item).val() : "," + $(item).val();
    })
    if (p_saleiems=="") {
        return false;
    }

    $("#deleteDailySaleForm #p_saleiems").val(p_saleiems);
    $("#deleteDailySale").modal(options);
    $("#deleteDailySale").modal("show");
}

function DeleteDailySale() {
    $("#deleteDailySale").modal("hide");
    var p_saleiems = $("#deleteDailySaleForm #p_saleiems").val();
    $.post('/IEMS/AjaxDeleteSaleData', { p_saleiems: p_saleiems }, function (data) {
        if (data == "success") {
            showMsg("Deleted successfully");
            ReloadGrid();
        }
        else {
            window.location.href = "/Home/LogOut";
        }
    });
}


function showMsg(title) {
    $('#msgModelContent').html("");
    $('#msgModel').modal(options);
    $('#msgModel .modal-title').text(title);
    $('#msgModel').modal("show");
}


function SubmitDailySaleForm() {
    var formdata = $("#DailySaleForm").serialize();
    $.post('/IEMS/AjaxPostDailySale', formdata, function (data) {
        if (data == "success") {
            $(".errMsg").html("");
            $("#DailySaleFormModel").modal('hide');
            $("#DailySaleForm")[0].reset();
            showMsg("Added successfully");
            ReloadGrid();
            
        }
        else if (data == "err-Model") {
            $(".errMsg").html("Please fill all required fields.")
        }
        else {
            window.location.href = "/Home/LogOut";
        }

    })
}

//For accept only numbers in input box
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (!((charCode > 95 && charCode < 106)
      || (charCode > 47 && charCode < 58)
      || charCode == 8)) {
        return false;
    }
}

function ReloadGrid() {
    $("#example tbody tr").remove();
    $("#example tbody ").height(0);
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("RegPageSize");
    if (t == null) { t = 50 }
    GetEmployeeData(1, 0, 50);
   
}



function GetEmployeeData(pageNumber, start, PSize) {
    chkvalesArr = [];
    $('#loading').show();
    $('#loadingmessage').show();
    $.ajax({
        type: "POST",
        url: "/IEMS/AjaxGetDailySaleDataForGrid",
        data: {  start: start, pSize: PSize },
        success: function (dataStr) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                var obj = JSON.parse(dataStr);
                var data = obj.data;
                var totalAmt = obj.totalAmt;
                sessionStorage.setItem("Total", data.recordsTotal);
                $(".TotalAmountSection").show();
                $(".TotalAmountValue").html(totalAmt);
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
        var tr = $(' <tr id="' + item.saleiems_key + '" class="" style="text-align: center;  color: #404040; background-color: white; width: 100%;  height: 50px; ">')
        tr.html(("<th style='width:10px' ><input type='checkbox' onclick='chkCheckUncheck(this)' class='checkboxall' id='chk-" + item.p_saleiems + "' value='" + item.p_saleiems + "' style='cursor:pointer' /></th> ")
              + ('<th class="SNo" style="width: 50px; padding-left: 15px; id="' + item.p_saleiems + '"">' + m + '</th>')
              + ('<th class="SaleDate" style="width: 150px; padding-left: 15px;">' + item.frmtsaledate + '</th>')
              + ('<th class="GroupName" style="width: 100px; padding-left: 15px;">' + item.grouptype + '</th>')
              + ('<th class="BrandName" style="width:200px;">' + item.brandname + '</th>')
              + ('<th class="PackingCode" style="width:120px;">' + item.packingdesc + '</th>')
              + ('<th class="Quantity" style="width:75px;">' + item.sale_qty + '</th>')
              + ('<th class="mrp" style="width:125px;">' + item.mrp + '</th>')
              + ('<th class="total" style="width:150px;">' + item.total + '</th>')
              + ('<th class="invoiceid" style="width:100px;">' + item.invoiceid + '</th>')
              + ('<th class="ShopCodeHeading" style="width:125px;">' + item.shopcode + '</th>')
              + ('<th class="ShopNameHeading" style="width:150px;text-align:left;">' + item.shopname + '</th>'));
        
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
        $(".TotalAmountSection").hide();
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
        $(".TotalAmountSection").show();
        Deviceheight();
    }

    
}




function Deviceheight() {

    var Header = $("header").outerHeight(true);
    var icondiv = $(".panelpanel-default").outerHeight(true);
    var mainDiv = $("#MainDiv").outerHeight(true);
    var totalAmt = $(".TotalAmountSection").outerHeight(true);
    var Footer = $(".main-footer").outerHeight();
    var windowHeight = $(window).outerHeight(true);
    var SumOfElementHeight = Header + icondiv + mainDiv + totalAmt + Footer;
    var MainHeight = windowHeight - SumOfElementHeight - 10;
    $(".table-responsive").height(MainHeight);
    
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












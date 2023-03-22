var popOverOpen = false;

//this is a sessionStorageKey for Search
var searchKey = "searchManageProducts";
//this is a sessionStorageKey for order
var orderKey = "orderManageProducts";
//this is a sessionStorageKey for search Criteria div value
var searchMsgKey = "searchMsgManageProducts";
//this is a sessionStorageKey for basicFilter UI consistency on Page Reload
var basicFilterStrKey = "basicFilterStrManageProducts";

//this is a sessionStorageKey for PageSize
var regPageSizeKey = "pageSizeManageProducts"

//for popups
var options = {
    "backdrop": "static",
    keyboard: true
}


var showscheme = false;

$(document).ready(function () {
    if ($.trim($("#showscheme").val()).toLowerCase() == "y") {
        showscheme = true;
    }

    var a = 1;
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem(regPageSizeKey);
    if (t == null) { t = 50 }

    GetData(0, t);

    var counter = 0;
    $("#Prev").on("click", function () {
        var a = sessionStorage.getItem(regPageSizeKey);
        var b = sessionStorage.getItem(searchKey);
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem(orderKey);
        var total = sessionStorage.getItem("Total");

        if (a != null) { d = (d - a) - 1; } else { d = (d - 50) - 1; }
        $("#example  div").remove();
        $("#example").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d >= 0) {
            $.post('/Invoices/ProductInfoGet', { start: d, pSize: a, search: b, order: o }, function (resdata) {
                data = JSON.parse(resdata);
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }); 
        }
    });

    $("#Next").on("click", function () {
        var b = sessionStorage.getItem("Total");
        var a = sessionStorage.getItem(regPageSizeKey);
        var c = sessionStorage.getItem(searchKey);
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem(orderKey);
        var total = sessionStorage.getItem("Total");

        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 50 - 1; }
        $("#example div").remove();
        $("#example").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/Invoices/ProductInfoGet', { start: d, pSize: a, search: c, order: o }, function (resdata) {
                data = JSON.parse(resdata);
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            });
        }
    });

    $(".btn-AddProduct").click(function () {
        $.ajax({
            type: "GET",
            url: "/Invoices/ProductForm",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: { exitmode: "manageproducts" },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $('#AddProductDiv').html(data);
                    $('#AddProductModal').modal(options);
                    $('#AddProductModal').modal('show');
                    $(".PanelForm").css({ "border": "none", "box-shadow": "none"});
                    $(".hr").append('<hr />')
                    $(".hr").css("margin-bottom", "20px")
                    $(".mainpanel").css({ "margin-left": "0px", "padding-left": "5px" });
                    $(".labeltext").css({ "margin-bottom": "10px" });
                    $(".forminput").css({ "margin-bottom": "15px" });
                    $(".mainbutton").css({ "margin": "20px 0px 20px 15px" });
                }
            }
           
        });
    });

    $('a').tooltip();

});


//function to get products
function GetData(start, PSize) {
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

   
    $("#example  div").remove();
    $("#example").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $.post('/Invoices/ProductInfoGet', { start: start, pSize: PSize, search: search, order: order }, function (resdata) {
        var data = JSON.parse(resdata);
        sessionStorage.setItem("Total", data.recordsTotal);
        loadData(data);
    });
}


function loadData(data) {
    var tblEmployee = $("#example");
    $("#example  div").remove();
    tblEmployee.css("height", "0px");
    var a = data.draw;
    if ($("#Next").hasClass("disabledbutton") == true) {
        $("#Next").removeClass("disabledbutton");
    }
    if ($("#Prev").hasClass("disabledbutton") == true) {
        $("#Prev").removeClass("disabledbutton");
    }
    var d = sessionStorage.getItem(regPageSizeKey);
    if (d == null || d == 0 || d == "undefined") { d = 50; sessionStorage.setItem(regPageSizeKey, d); };
    var b;
    if (a == 1) { b = d; sessionStorage.setItem("start", 0); } else { b = parseInt(a) + parseInt(d); a = parseInt(a) + 1; sessionStorage.setItem("start", a); }

    sessionStorage.setItem("Total", data.recordsTotal);
    var c = data.recordsTotal;
    if (c == 0) { a = c; b = c; $("#Next").addClass("disabledbutton"); $("#Prev").addClass("disabledbutton"); }
    else if (c < b && a == 1) { b = c; $("#Next").addClass("disabledbutton"); $("#Prev").addClass("disabledbutton"); }
    else if (c < b && a > 1) { b = c; $("#Next").addClass("disabledbutton"); }
    else if (a == 1) { $("#Prev").addClass("disabledbutton"); }
    else if (parseInt(a) + parseInt(d) > c) { $("#Next").addClass("disabledbutton"); $("#Prev").removeClass("disabledbutton"); }
    $("#info").text(a + "-" + b + " of " + c);
    var m = a - 1;

    var allowEditProduct = $("#allowEditProduct").val();

    $.each(data.data, function (index, item) {
        if (item.statusCode == 500) {
            window.location.href = "/Home/Error";
        }

        m = m + 1;
        var Parentdiv = $("<div id='MainDiv-" + item.srl_pro_key + "' role='tab' class='col-md-12 parentdiv  maindiv' onmouseover='hoverId(this)' onmouseout='hoverNot(this)'><a role='button' data-toggle='collapse' data-parent='#example' href='#toggleDiv-" + item.srl_pro_key + "' aria-expanded='true' aria-controls='toggleDiv-" + item.srl_pro_key + "' class ='collapsed accordion-toggle' style='cursor: pointer; width:9px;'></a></div>");
        tblEmployee.append(Parentdiv);

        var div = $("<div id='tr-" + item.srl_pro_key + "' class='tr u col-md-12 main MainTr'></div>");

        div.html(("<div class='stno td basicTr' style='width:2%;padding-left:1px;'><i class='fa fa-bookmark priority-icon' style='color:transparent'></i> </div>")
            + " " + ("<div class='Sno td basicTr' style='width:3%;padding-left:2px;'>" + m + "</div>")
            + " " + ("<div class='combineCol' style='padding-left:11px;width:25%;padding-right: 7px;'>"
            + "<div class='Tasktitle td titlemanage basicTr clampTr'>" + $.trim(item.prodname) + " </div>"
            + "<div class='Taskdescription td basicTr clampTr'><span>" + $.trim(item.packing) + "</span></div></div>")
            + " " + ("<div class='Tasktitle td  basicTr prodcode' style='width: 23%;padding: 0 8px 0 13px;'>" + $.trim(item.prodcode) + "</div>")
            + " " + ("<div class='Tasktitle td  basicTr' style='width: 23%;padding: 0 8px 0 13px;'>" + (item.manuname || '') + "</div>")
            + " " + ("<div class='Duedate td h basicTr' style='width: 8%; padding: 0 8px 0 8px;'>&#8377;" + Number(item.mrp).toFixed(2)  + "</div>")
            + " " + ("<div class='Duedate td h basicTr' style='width: 8%; padding: 0 8px 0 8px;'>&#8377;" + Number(item.baserate).toFixed(2)  + "</div>")
            + " " + ("<div class='Duedate td h basicTr' style='width: 8%; padding: 0 8px 0 8px;'>" + (item.totstock || '') + "</div>") 
        );
        Parentdiv.append(div);
        if (allowEditProduct) {
            var MoreDetailsdiv = $(("<div  class='MoreDetails' id='" + item.srl_pro_key + "' style='position: absolute; z-index: 2; display: none; background-color: #cce6ff; width: 100px; border:none !important; height: 30px; right:35px; top:3px;'> </div>"))
            var moreDetailsDivHtml = "<a data-toggle='Edit&nbsp' href='/Invoices/ProductForm?exitmode=edit&prodcode=" + item.prodcode + "'><img src='/images/edit.png' style='width:37px; margin-top:-3px;'></a>";
            MoreDetailsdiv.append(moreDetailsDivHtml);
            div.append(MoreDetailsdiv);
        }
       

        togglediv = $("<div class='BatchBox collapse' style='height:0px;' role='tabpanel' id='toggleDiv-" + item.srl_pro_key + "' aria-labelledby='MainDiv-" + item.srl_pro_key + "'></div>");
        var batchData = item.srlBch;
        $.each(batchData, function (ind, batchItem) {
            var batchHtml = "<div class='card'><div class='form-group'><label style='margin-right:5px;'>Batch No:</label>" + (batchItem.batchno || '') + "</div>"
                + " " + "<div class='form-group'><label style='margin-right:5px;'>Exp Date:</label>" + batchItem.txtexpiry + "</div>"
                + " " + "<div class='form-group'><label style='margin-right:5px;'>Qty:</label>" + (batchItem.quantity || '') + "</div>"
                + " " + "<div class='form-group'><label style='margin-right:5px;'>PTR:</label>&#8377;" + Number(batchItem.ptr).toFixed(2) + "</div>"
                + " " + "<div class='form-group'><label style='margin-right:5px;'>MRP:</label>&#8377;" + Number(batchItem.mrp).toFixed(2) + "</div>"
                + " " + "<div class='form-group'><label style='margin-right:5px;'>Purch Date:</label>" + batchItem.txtpurchdate + "</div>";
            if (showscheme) {
                batchHtml += "<div class='form-group'><label style='margin-right:5px;'>Scheme:</label>" + batchItem.scheme + "</div>";
            }
            batchHtml += "</div>";
            
            togglediv.append($(batchHtml));
        })

        tblEmployee.append(togglediv);

    });


    if (data.recordsTotal == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $('#loading').addClass('clickable');
        $("#example").css("height", "0px");
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
        //Deviceheight();
    }

    tblEmployee.css("height", "80vh");
}



//Set table height according to screen
function Deviceheight() {
    var sidebarposition = side.getBoundingClientRect();
    $("#example").height(sidebarposition.height - 120)
    
}


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
        }
    }

}


//Basic filter multiple
function SubmitBasicFilter(search, searchMsg) {    
    var pSize = sessionStorage.getItem(regPageSizeKey);
    $("#example div").remove();
    $("#example").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();

    $.ajax({
        url: '/Invoices/ProductInfoGet',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search },
        success: function (resdata) {
            if ($.trim(searchMsg) != "") {
                $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p>");
                $(".resultDiv").show();
            }
            var data = JSON.parse(resdata);
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        }
    });

}


//Added by aslam to set Search or Order sessionStorage
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



function removeFilter() {
    removeBasicAdvanceFilter();
    reloadGrid()
}



function reloadGrid() {
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem(regPageSizeKey);
    if (t == null) { t = 50 }
    GetData(0, t);
}



//Advance filter
function SubmitFilterSort(search, order, pSize, searchMsg) {
    $('#FilterModel').modal('hide');
    $("#example div").remove();
    $("#example").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $.ajax({
        url: '/Invoices/ProductInfoGet',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search, order: order },
        success: function (resdata) {
            if ($.trim(searchMsg) != "") {
                $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p>");
                $(".resultDiv").show();
            }
            var data = JSON.parse(resdata);
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        }
    });

}



function hoverId(ctrl) {
    if (popOverOpen == true) {
        $(".MoreDetails").not(CurrentHoverRowId).hide;
    }
    else {
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



function searchByProdName() {
    var prodname = $("#prodnameFilter").val();
    if (prodname.length == 0) {
        setSearchSessionStorage("");
        setSearchMsgSessionStorage("");
        reloadGrid();
    }
    else {
        let search = prodname +",m1.prodname:string";
        setSearchSessionStorage(search);
        let searchMsg = "Search Results: Product Name <span class='' style='font-weight: 600'>'" + prodname + "'</span>";
        setSearchMsgSessionStorage(searchMsg);
        reloadGrid();
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

                    switch (key) {
                        //function to show Edit model
                        case "Edit":
                            var prodcode = $("#tr-" + id +" .prodcode").text();
                            window.location = '/Invoices/ProductForm?exitmode=edit&prodcode=' + prodcode;
                            break;
                    }
                },
                
                items: {
                    "Edit": { name: "Edit", icon: "fa-pencil" }
                },

            }
            return options;
        }
    });
});
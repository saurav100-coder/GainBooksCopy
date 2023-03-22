var recordsTotal = 0;
var prodStart = 0;
var prodSearch = "";
var pSize = 50;
var showqty = false;
var editprice = false;
var cartDict = {};
var defacust = false;
var showscheme = false;
var withbch = "n";

function ShowProductList() {
    //$("#prodnameFilter").val("");
    //searchByProdName();
    $(".mProductList").show();
    $(".mCart").hide();   
}

function GoToCart() {
    $(".mProductList").hide();
    $(".mCart").show();
}

$(window).resize(function () {
    updateProductListHeight();
});

$(document).ready(function () {
    $("nav").find(".newTitle").remove();
    var s = "<p class='newTitle' >Order Form</p>";
    $("nav").find(".titleName").append(s);

    if ($.trim($("#showqty").val()).toLowerCase()=="y") {
        showqty = true;
    }

    if ($.trim($("#pricmode").val()).toLowerCase() == "s") {
        editprice = true;
    }

    if ($.trim($("#defacust").val()) !== "" && $.trim($("#shdecust").val()).toLowerCase() == "y") {
        defacust = true;
    }

    if ($.trim($("#showscheme").val()).toLowerCase() == "y") {
        showscheme = true;
    }

    if (showscheme) {
        withbch = "y";
    }

    searchByProdName();
    ShowProductList();

    $(document).on("click", ".card", function () {
        var card = $(this);
        card.toggleClass("checked");
        var checkBoxes = $(this).find(".check");
        checkBoxes.prop("checked", !checkBoxes.prop("checked"));
        checkBoxes.toggleClass("box-checked");
        if (card.hasClass("checked")) {
            selectproduct(card);
        }
        else {
            let cardId = "pro-" + $(card).attr('id');
            removeProcard(cardId);
        }

        updateCartItemCountText();
    });

    $(document).on("change", ".check", function () {
        var item = $(this).parent().parent();
        var checkB = $(this).parent().find(".check")
        checkB.prop("checked", !checkB.prop("checked"));
    });

    //$(document).on("click", ".price", function (e) {
    //    e.stopPropagation()

    //})

    //$(document).on("click", ".quantity", function (e) {
    //    e.stopPropagation()

    //})

    $(document).on("click", ".quantity .itemQty", function (e) {
        e.stopPropagation()

    })
/


    ////Function on Product list scroll down
    //$("#cardsDiv").scroll(function () {
    //    if (($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) && (recordsTotal > $("#cardsDiv .card").length) && $("#cards .loader").length == 0 ) {
    //        $("#cards").append($('<div id="" style="margin-top:10px;margin-bottom:10px;" class="loader overlay col-md-offset-6"></div>'));
    //        let start = parseInt(prodStart) + pSize;
    //        $.post('/Invoices/ProductInfoGet', { start: start, search: prodSearch, pSize: pSize, withbch: withbch }, function (resdata) {
    //            var data = JSON.parse(resdata);
    //            recordsTotal = data.recordsTotal;
    //            $("#cards .loader").remove();
    //            loadData(data);
    //        });
    //    }
    //});

    $("#card-tbody").scroll(function () {
        if (($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) && (recordsTotal > $("#card-tbody .card").length) && $("#card-tbody .loader").length == 0) {
            $("#card-tbody").append($('<tr><td style="float: inherit;"><div id="" style="margin-top:10px;margin-bottom:10px;" class="loader overlay col-md-offset-6"></div></td></tr>'));
            let start = parseInt(prodStart) + pSize;
            $.post('/Invoices/ProductInfoGet', { start: start, search: prodSearch, pSize: pSize, withbch: withbch }, function (resdata) {
                var data = JSON.parse(resdata);
                recordsTotal = data.recordsTotal;
                $("#card-tbody .loader").parents("tr").remove();
                loadData(data);
            });
        }
    });


})


function searchByProdName() {
    var prodname = $.trim($("#prodnameFilter").val());
    recordsTotal = 0;
    prodStart = 0;

    if (prodname.length > 0) {
        let search = prodname + ",m1.prodname:string";
        prodSearch = search;
        $("#cards").empty().hide();
        $("#card-tbody").empty();
        $(".table-card").hide();
        $('#cardsDiv,#loading,#loadingmessage').show();
        $('#Msg').hide();
        GetData(search);
    }
    else {
        $("#cards").empty().hide();
        $("#card-tbody").empty();
        $(".table-card").hide();
        //$('#cardsDiv,#loading,#loadingmessage,#Msg').hide();
        //prodSearch = "";
        //recordsTotal = 0;
        $('#cardsDiv,#loading,#loadingmessage').show();
        $('#Msg').hide();
        prodSearch = "";
        GetData("");

    }
}

//function to get products
function GetData(search) {
    $.post('/Invoices/ProductInfoGet', { start: 0, search: search, pSize: pSize, withbch: withbch }, function (resdata) {
        $("#cards").empty().hide();
        $("#card-tbody").empty();
        $(".table-card").hide();
        $('#cardsDiv,#loading,#loadingmessage').show();
        var data = JSON.parse(resdata);
        recordsTotal = data.recordsTotal;
        loadData(data);
        $("#cards").show();
        //$(".table-card").show();
    });
}

function loadData(data) {
    var a = data.draw;
    prodStart = a;
    var m = $("#card-tbody .card").length;
    $.each(data.data, function (index, item) {
        if (item.statusCode == 500) {
            window.location.href = "/Home/Error";
        }

        m = m + 1;

        //var card = $('<div class="card" id="' + item.srl_pro_key + '" style="overflow:hidden;">');
        //card.html(('<div class="card-mainDiv" style="cursor:pointer;" onclick="selectItem('+ item.srl_pro_key +')">')
        //    + ' ' + ('<div class="col-md-12 col-xs-12" style="overflow:hidden;padding:0;" >')
        //    + ' ' + ('<p class="col-md-6"><span style="padding-right:5px; font-size:15px; font-weight:600;color:#105faf;" class="prodname">' + item.prodname + '</span><span>(</span><span style="color:gray; font-weight:600;" class="prodcode">' + item.prodcode + '</span><span>)</span><span style="display:block; font-size:small;" class="packing">' + item.packing + '</span></p>')
        //    + ' ' + ('<p class="col-md-3 col-xs-6">MRP &nbsp;&#8377;<span class="mrp"> ' + Number(item.mrp).toFixed(2) + '</span></p>')
        //    + ' ' + ('<p class="col-md-3 col-xs-6">Total Qty :<span class="totstock">' + (item.totstock || '') + '</span></p>')
        //    + ' ' + ('</div></div>')
        //    + ' ' + ('<div class="col-md-12 col-xs-12" style="overflow:hidden;padding:0;">')
        //    + ' ' + ('<p class="col-md-3 col-xs-6">Qty <span style="padding-left:10px;"><button type="button" class="btn btn-default" onclick="updateItemQty(' + item.srl_pro_key + ',-1)" style="padding:2px 8px; height:25px; margin-bottom:3px; border-radius: 0 2px 2px 0;"><span class="glyphicon glyphicon-minus" style="font-family: Source Sans Pro;"></span> </button><input type="text" onkeypress="return isNumberKey(event)"  onkeyup="updateItemTotal(' + item.srl_pro_key + ')" value="1" class="text itemQty"><button type="button" class="btn btn-default" onclick="updateItemQty(' + item.srl_pro_key +',1)" style="padding:2px 8px; height:25px; margin-bottom:3px; border-radius: 0 2px 2px 0;"><span class="glyphicon glyphicon-plus" style="font-family:Source Sans Pro;"></span></button></span></p>')
        //    + ' ' + ('<p class="col-md-3 col-xs-6">Price &#8377;<input type="text" class="itemPrice" onkeypress="return isNumberKey(event)"  onkeyup="updateItemTotal(' + item.srl_pro_key +')" style="border: none; border-bottom: grey solid 1px; outline:none; width:55px;margin-left:5px;" value="' + Number(item.baserate).toFixed(2) + '"  /></p>')
        //    + ' ' + ('<p class="col-md-3 col-xs-6">Total &#8377; <span class="itemTotal" style="font-weight:bold;">' +  Number(item.baserate).toFixed(2)  +'<span></p>')
        //    + ' ' + ('<p class="col-md-3 col-xs-6"><a>More Details</a></p>')
        //    + ' ' + ('</div>')

        //);
        //$("#cards").append(card);
        var readonlyPrice = editprice ? "" : "readonly";  //If editprice is true then variable value is blank otherwise variable value is readonly
        
        
        let itemQty = 1;
        let baserate = Number(item.baserate).toFixed(2);
        let itemTotal = Number(item.baserate).toFixed(2);
        let cardclass = "";
        let checkboxClass = "";
        let checked = "";
        if (cartDict.hasOwnProperty(item.srl_pro_key)) {
            itemQty = cartDict[item.srl_pro_key].qty;
            baserate = cartDict[item.srl_pro_key].price;
            itemTotal = cartDict[item.srl_pro_key].total;
            cardclass = " checked";
            checkboxClass = " box-checked";
            checked = " checked";
        }


        var card = $('<tr class="card ' + cardclass +' " style="cursor:pointer;padding-top:0;padding-bottom:0;" id="' + item.srl_pro_key + '"></tr>');
        var cardHtml = ('<td class="sno" style="width:7%; padding-left:4px; padding-right:0; margin-top:5px;"> <input type="checkbox" class="check ' + checkboxClass + ' " ' + checked + ' style="margin:0; vertical-align:middle; margin-right:5px; margin-top:-2px;" />' + m + '</td>')
            /*+ ' ' + ('<td class="name" style="display: flex; width:34%; flex-direction:column; margin-top: 0px;"><span><span style="font-weight:600; color:#105faf; padding-right:5px;" class="prodname">' + $.trim(item.prodname) + '</span><span>(</span><span class="packing" style="font-size:13px;">' + $.trim(item.packing) + '</span><span>)</span></span><span style="margin-top:2px;"><span class="manuname" style="font-size:13px; font-weight:600;">' + $.trim(item.manuname) + '</span><span class="prodcode" style="font-size:12px; padding-left:10px;">' + $.trim(item.prodcode) + '</span></span></td>')*/
            + ' ' + ('<td class="name" style="display: flex; width:34%; flex-direction:column; margin-top: 0px;"><span><span style="font-weight:800;font-size:12px; color:#105faf; padding-right:5px;" class="prodname">' + $.trim(item.prodname) + '</span>');
        if ($.trim(item.packing)!="") {
            cardHtml += ('<span>(</span><span class="packing" style="font-size:12px;">' + $.trim(item.packing) + '</span><span>)</span>');
        }
        cardHtml += ('</span><span style="/*margin-top:2px;*/"><span class="prodcode" style="font-size:11px;font-weight: 600; padding-right:10px;">' + $.trim(item.prodcode) + '</span><span class="manuname" style="font-size:10px; font-weight:700;">' + $.trim(item.manuname) + '</span></span></td>');

        //+ ' ' + ('<td style="display: flex;flex-direction: column; margin: 0 !important;"><span style="font-weight:600; color:105faf;">' + item.prodname + '</span><span class="prodcode">' + item.prodcode + '</span></td>')
            //+ ' ' + ('<td class="packing" style = "width:8%; margin-top:5px;">' + item.packing + '</td>')
        /*+ ' ' + ('<td class="quantity" style = "width:15%; text-align: center;"> <span style="width:15%"><button type="button" class="btn btn-default" onclick="updateItemQty(' + item.srl_pro_key + ',-1)" style="padding:2px 8px; height:25px; margin-bottom:3px; border-radius: 0 2px 2px 0; background:#105faf; color:yellow; "><span class="glyphicon glyphicon-minus" style="font-family: Source Sans Pro;"></span> </button><input type="text" onkeypress="return isNumberKey(event)"  onkeyup="updateItemTotal(' + item.srl_pro_key + ')" value="'+ itemQty +'" class="text itemQty" style="width:50px; margin-top:3px;"><button type="button" class="btn btn-default" onclick="updateItemQty(' + item.srl_pro_key + ',1)" style="padding:2px 8px; height:25px; margin-bottom:3px; border-radius: 0 2px 2px 0; background:#105faf; color:yellow; "><span class="glyphicon glyphicon-plus" style="font-family:Source Sans Pro;"></span></button></span></td>')*/
        cardHtml += ('<td class="quantity" style = "width:13%; text-align: center;"><input type="text" onkeypress="return isNumberKey(event)"  onkeyup="updateItemTotal(' + item.srl_pro_key + ',true)" value="' + itemQty + '" class="text itemQty" style="width:50px; margin-top:3px;"></td>');
        cardHtml += ('<td class="price" style = "width:10%; margin-top:5px; text-align: center;"> <input type="text"  class="itemPrice" ' + readonlyPrice + ' onkeypress="return isNumberKey(event)"  onkeyup="updateItemTotal(' + item.srl_pro_key + ',true)" style="border: none;text-align: center; /*border-bottom: grey solid 1px;*/ outline:none; width:55px;margin-left:5px;background:inherit;cursor:pointer;" value="' + baserate + '"  /></td>');
        cardHtml += ('<td class="mrp" style="text-align: center;width:11%; margin-top:5px;"> ' + Number(item.mrp).toFixed(2) + '</td>');
        cardHtml+= ('<td style="display:none;">Total &#8377; <span class="itemTotal" style="font-weight:bold;">' + itemTotal + '<span></td>');
        if (showqty) {
            cardHtml += ('<td class="totstock" style="text-align: center;width:12%; margin-top:5px; ">' + $.trim(item.totstock) + '</td>');
        }
        else {
            cardHtml += ('<td class="totstock" style="text-align: center;width:12%; margin-top:5px;display:none;">' + $.trim(item.totstock) + '</td>');
        }
        if (showscheme) {
            var batchData = item.srlBch;
            if (batchData.length>0) {
                cardHtml += ('<td class="scheme" style="text-align: center;width:13%; margin-top:5px; ">' + $.trim(batchData[0].scheme) + '</td>');
            }
        }
        
        card.html(cardHtml);

            //+ ' ' + ('<td class="manuname Clamptr" style="text-align: left;width:14%; font-size:13px; margin-top:3px; padding-left:4px; padding-right:0; ">' + item.manuname + '</td>')
        //);
        $("#card-tbody").append(card);

    });

    if (data.recordsTotal == 0) {
        $(".table-card").hide();
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").text("No record found").show();
    } else {
        $('#loading,#loadingmessage,#Msg').hide();
        $(".table-card").show();
        updateProductListHeight();
    }
    //$("#cards").show();
}

//For accept only numbers in input box
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = String.fromCharCode(charCode);
    if (value == "." && $.trim(evt.target.value).length > 0 && !evt.target.value.includes(".")) {
        return true;
    }
    if (value==" ") {
        return false;
    }
    if (isNaN(value)) {
        return false;
    }
}

//For update Item total when price or qty change. callGrandTotal is a boolean parameter , if true then it calls updateGrandTotal function
function updateItemTotal(cardId,callGrandTotal) {
    //let itemQty = Number($.trim($("#" + cardId + " .itemQty").val()));
    //let itemPrice = Number($.trim($("#" + cardId + " .itemPrice").val()));
    //let itemTotal =Number(itemPrice * itemQty).toFixed(2);
    //$("#" + cardId + " .itemTotal").text(itemTotal);

    //if (callGrandTotal) {
    //    updateGrandTotal();
    //}

    var currentElementId = "";
    var otherElementId = "";
    var key = "";
    if (cardId.toString().indexOf("pro-") == -1) {
        currentElementId = cardId;
        otherElementId = "pro-" + cardId;
        key = cardId;
    }
    else {
        currentElementId = cardId;
        var arr = cardId.toString().split("-");
        otherElementId = arr[1];
        key = arr[1];
    }


    let itemQty = $.trim($("#" + currentElementId + " .itemQty").val());
    let itemPrice = $.trim($("#" + currentElementId + " .itemPrice").val());
    let itemTotal = Number(Number(itemPrice) * Number(itemQty)).toFixed(2);

    $("#" + otherElementId + " .itemQty").val(itemQty);
    $("#" + otherElementId + " .itemPrice").val(itemPrice);

    $("#" + currentElementId + " .itemTotal").text(itemTotal);
    $("#" + otherElementId + " .itemTotal").text(itemTotal);

    if (cartDict.hasOwnProperty(key)) {
        cartDict[key] = { price: itemPrice, qty: itemQty, total: itemTotal }; // update values
    }

    if (callGrandTotal) {
        updateGrandTotal();
    }
}

//For update item qty and item total when click on + or - button. callGrandTotal is a boolean parameter , if true then it calls updateGrandTotal function
function updateItemQty(cardId, step, callGrandTotal) {
    let itemQty = Number($.trim($("#" + cardId + " .itemQty").val()));
    let newQty = itemQty + (step);
    if (newQty<1) {
        newQty=1;
    }
    $("#" + cardId + " .itemQty").val(newQty);
    updateItemTotal(cardId);

    if (callGrandTotal) {
        updateGrandTotal();
    }
}


//Select product on Product Search List table
function selectproduct(card) {
    //var a = $(".table-fixed #card-tbody").find(".checked");
    //$.each(a, function () {

    //});

    let srl_pro_key = $(card).attr('id');
    let prodname = $.trim($(card).find(".prodname").text());
    let prodcode = $.trim($(card).find(".prodcode").text());
    let packing = $.trim($(card).find(".packing").text());
    let mrp = $.trim($(card).find(".mrp").text());
    let totstock = $.trim($(card).find(".totstock").text());
    if (totstock == "" || totstock == "0") {
        var card = $(card);
        card.toggleClass("checked");
        var checkBoxes = $(card).find(".check");
        checkBoxes.prop("checked", !checkBoxes.prop("checked"));
        checkBoxes.toggleClass("box-checked");
        ShowMsg("Product with current stock 0 (Zero) will not be added to cart", "info");
        return false;
    }
    let itemQty = $.trim($(card).find(".itemQty").val());
    let baserate = $.trim($(card).find(".itemPrice").val());
    let itemTotal = $.trim($(card).find(".itemTotal").text());
    let scheme = $.trim($(card).find(".scheme").text());
    let manufac = $.trim($(card).find(".manuname").text());

    var readonlyPrice = editprice ? "" : "readonly";  //If editprice is true then variable value is blank otherwise variable value is readonly

    //Check if cart dictionary contains key
    if (cartDict.hasOwnProperty(srl_pro_key)) {
        cartDict[srl_pro_key] = { price: baserate, qty: itemQty, total: itemTotal }; // update values
        $("#pro-" + srl_pro_key + " .itemQty").val(itemQty);
        $("#pro-" + srl_pro_key + " .itemPrice").val(baserate);
        $("#pro-" + srl_pro_key + " .itemTotal").text(itemTotal);
    }
    else {
        cartDict[srl_pro_key] = { price: baserate, qty: itemQty, total: itemTotal }; // Add details in cartDict

        //append product in cart
        var prod = $('<tr class="procard" id="pro-' + srl_pro_key + '"></tr>');
       /* var prodHtml = ('<td style="display: flex;flex-direction: column; margin: 0 !important;"><span style="font-weight:600; color:#105faf;">' + prodname + '</span><span class="prodcode">' + prodcode + '</span></td>')*/
        /* + ' ' + ('<td style="text-align:center;"> <span ><button type="button" class="btn btn-default" onclick="updateItemQty(\'pro-' + srl_pro_key + '\',-1,true)" style="padding:2px 8px;  color: white; background: #105faf; height:25px; margin-bottom:3px; border-radius: 0 2px 2px 0;"><span class="glyphicon glyphicon-minus" style="font-family: Source Sans Pro;"></span> </button><input type="text" onkeypress="return isNumberKey(event)"  onkeyup="updateItemTotal(\'pro-' + srl_pro_key + '\',true)" value="' + itemQty + '" class="text itemQty" style="width:50px; margin-top:8px;"><button type="button" class="btn btn-default" onclick="updateItemQty(\'pro-' + srl_pro_key + '\',1,true)" style="padding:2px 8px; color: white; background: #105faf; height:25px; margin-bottom:3px; border-radius: 0 2px 2px 0;"><span class="glyphicon glyphicon-plus" style="font-family:Source Sans Pro;"></span></button></span></td>')*/

        var prodHtml = ('<td style="display: flex;flex-direction: column; margin: 0 !important;"><span><span style="font-weight:800;font-size:12px; color:#105faf;padding-right:5px;">' + prodname + '</span>');
        if (packing != "") {
            prodHtml += ('<span>(</span><span style="font-size:12px;">' + packing + '</span><span>)</span>');
        }
        prodHtml += ('</span><span><span class="prodcode" style="font-size:11px;font-weight: 600; padding-right:10px;">' + prodcode + '</span><span  style="font-size:10px; font-weight:700;">' + manufac + '</span></span></td>');
        
        prodHtml += ('<td style="text-align:center;"> <input type="text" onkeypress="return isNumberKey(event)"  onkeyup="updateItemTotal(\'pro-' + srl_pro_key + '\',true)" value="' + itemQty + '" class="text itemQty" style="width:50px; margin-top:8px;"></td>');
            //+ ' ' + ('<td>' + packing + '</td>')
        prodHtml += ('<td> <input type="text" class="itemPrice" ' + readonlyPrice + ' onkeypress="return isNumberKey(event)"  onkeyup="updateItemTotal(\'pro-' + srl_pro_key + '\',true)" style="border: none;text-align: center; /*border-bottom: grey solid 1px;*/ outline:none; width:55px;margin-left:5px;background:inherit;" value="' + Number(baserate).toFixed(2) + '"  /></td>');
        prodHtml += ('<td style="text-align: center;"><span class="itemTotal" style="font-weight:bold;">' + Number(itemTotal).toFixed(2) + '<span></td>');
        prodHtml += ('<td class="mrp" style="text-align: center;"> ' + Number(mrp).toFixed(2) + '</td>');
       
        if (showqty) {
            prodHtml += ('<td class="totstock" style="text-align: center;">' + totstock + '</td>');
        }
        if (showscheme) {
            prodHtml += ('<td class="scheme" style="text-align: center;">' + scheme + '</td>');
        }

        /*prodHtml += ('<td style="display:none;">Total &#8377; <span class="itemTotal" style="font-weight:bold;">' + Number(itemTotal).toFixed(2) + '<span></td>')*/
        prodHtml += ('<td style="display: flex; justify-content:center; padding-bottom:0;"><a style="margin-right: 5px; display:none;" data-toggle="Edit"><img src="/images/edit.png" style="width:37px; padding-top:3px;cursor:pointer;"></a> <a data-toggle="Delete"><img src="/images/icon-delete.png" onclick="removeProcard(\'pro-' + srl_pro_key + '\',true)" style="width:20px;cursor:pointer;margin-top:11px"></a></td>');

        prod.html(prodHtml);
        $("#tbody").prepend(prod);
        ShowMsg("'" + prodname + "' added to cart", "Success");
    }


    //$("#cards").empty().hide();
    //$("#cardsDiv").hide();

    //$("#prodnameFilter").val("");

    

    
    updateGrandTotal();

}

//For update GrandTotal of cart and show amount on PlaceOrder button.
function updateGrandTotal() {
    var grandTotal = 0;
    $(".procard .itemTotal").each(function () {
        grandTotal += parseFloat($(this).text());
    });
    $("#grandTotal").text(grandTotal.toFixed(2));
}

//For submit cart . Call "OrderForm" post method
function placeOrder() {
    if ($(".procard").length > 0) {

        let custcode = "";
        if (defacust) {
            custcode = $("#customer").attr("data-value");
        }
        else {
            custcode = $.trim(GetValues("customer"));
            if (custcode == "") {
                ShowMsg("Please select customer")
                return false;
            }
        }
           
        

        //if (custcode.split(",").length > 1) {
        //    ShowMsg("Please select only 1 customer")
        //    return false;
        //}

        var orderItems = [];

        $(".procard").each(function () {
            orderItems.push({
                Prodcode: $(this).find(".prodcode").text(),
                Qty: $(this).find(".itemQty").val(),
                Rate: $(this).find(".itemPrice").val(),
                Itemtotal: $(this).find(".itemTotal").text()
            });
        });

        var order = {
            Custcode: custcode,
            Mobile: $.trim($("#fieldsDiv input[name=Mobile]").val()),
            Deliverymode: $.trim($("#fieldsDiv input[name=Deliverymode]").val()),
            Remarks: $.trim($("#fieldsDiv input[name=Remarks]").val()),
            OrderItems: orderItems
        };

        $("#btnPlaceOrder").prop("disabled", true);

        $.ajax({
            type: "POST",
            url: "/invoices/OrderForm",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(order),
            success: function (resp) {
                if (resp=="logout") {
                    window.location = "/home/logout";
                }
                else if (resp =="error") {
                    ShowMsg("Something went wrong.Please try again later.");
                    $("#btnPlaceOrder").prop("disabled", false);
                }
                else if(resp=="success") {
                    ShowMsg("Order Created Successfully.", "success");
                    window.location = "/invoices/OrderForm";
                }
                else {
                    ShowMsg(resp);
                    $("#btnPlaceOrder").prop("disabled", false);
                }

            }
        });



    }
    else {
        ShowMsg("Cart is empty. Please add items to cart.", "error");
    }
}


//For Delete Product from Cart
function removeProcard(proCardId,uncheck) {
    const [pre, key] = proCardId.split("-");
    delete cartDict[key];
    $("#orderItemsDiv #" + proCardId).remove();
    var card = $(".table-card #" + key);
    card.removeClass("checked");
    var checkBoxes = $(card).find(".check");
    if (uncheck) {
        checkBoxes.prop("checked", false);
    }
    checkBoxes.removeClass("box-checked");
    updateGrandTotal();
    let prodname = $.trim($(card).find(".prodname").text());
    ShowMsg("'" + prodname + "' removed from cart", "error");

    updateCartItemCountText();
}

//For Close button on Product Search List
function cancelprodutgrid(button) {
    $(button).parents("table").parent().hide();
}

//Show Current Date and Time 
const timeID = setInterval(setdatetime, 1000);
function setdatetime() {
    var time = new Date();
    var date = time.getDate() + '-' + (time.getMonth() + 1) + '-' + time.getFullYear();
    var datetime = new Date().toLocaleTimeString();
    var dateTime = date + ' ' + datetime;
    $(".DateTime").text(dateTime)
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



function toggleMultiCheckbox(ctrl) {
    if ($(ctrl).is(":checked")) {
        $("#card-tbody .card .check").prop('checked', true).addClass("box-checked");
        $("#card-tbody .card").addClass("checked");

        var a = $(".table-fixed #card-tbody").find(".checked");
        $.each(a, function () {
            selectproduct(this);
        });
    }
    else {
        var a = $(".table-fixed #card-tbody").find(".checked");
        $.each(a, function () {
            let cardId = "pro-" + $(this).attr('id');
            removeProcard(cardId);
        });

        $("#card-tbody .card .check").prop('checked', false).removeClass("box-checked");
        $("#card-tbody .card").removeClass("checked");
        
    }

}


function updateProductListHeight() {
    //$(".table-card tbody").height($(window).height() - $(".table-card").offset().top - $('.table-card thead').outerHeight() - $('.table-card tfoot').outerHeight());
    //$(".table-card tbody").height("60vh");
    $(".table-card tbody").height("auto");
    $(".table-card tbody").css("max-height", ($(window).height() - $(".table-card").offset().top - $('.table-card thead').outerHeight() - $('.table-card tfoot').outerHeight() - 50));
}

function updateCartItemCountText() {
    let cartItemsCount = $(".procard").length;
    if (cartItemsCount > 0) {
        $(".CartItemsCount").text("( Total items : " + cartItemsCount + " )");
    }
    else {
        $(".CartItemsCount").text("");
    }
}
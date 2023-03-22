var recordsTotal = 0;
var prodStart = 0;
var prodSearch = "";
var pSize = 50;

$(document).ready(function () {

    //Function on Product list scroll down
    $("#cardsDiv").scroll(function () {
        if (($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) && (recordsTotal > $("#cardsDiv .card").length) && $("#cards .loader").length == 0 ) {
            $("#cards").append($('<div id="" style="margin-top:10px;margin-bottom:10px;" class="loader overlay col-md-offset-6"></div>'));
            let start = parseInt(prodStart) + pSize;
            var encStr = $("#encStr").val();
            $.post('/PublicUrl/ProductInfoGet', { encStr:encStr, start: start, search: prodSearch, pSize: pSize }, function (resdata) {
                var data = JSON.parse(resdata);
                recordsTotal = data.recordsTotal;
                $("#cards .loader").remove();
                loadData(data);
                $("#cards").show();
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
        $('#cardsDiv,#loading,#loadingmessage').show();
        $('#Msg').hide();
        GetData(search);
    }
    else {
        $("#cards").empty().hide();
        $('#cardsDiv,#loading,#loadingmessage,#Msg').hide();
        prodSearch = "";
        recordsTotal = 0;

    }
}

//function to get products
function GetData(search) {
    var encStr = $("#encStr").val();
    $.post('/PublicUrl/ProductInfoGet', { encStr: encStr, start: 0, search: search, pSize: pSize }, function (resdata) {
        $("#cards").empty().hide();
        $('#cardsDiv,#loading,#loadingmessage').show();
        var data = JSON.parse(resdata);
        recordsTotal = data.recordsTotal;
        loadData(data);
        $("#cards").show();

    });
}

function loadData(data) {
    var a = data.draw;
    prodStart = a;
    $.each(data.data, function (index, item) {
        if (item.statusCode == 500) {
            window.location.href = "/Home/Error";
        }

        var card = $('<div class="card" id="' + item.srl_pro_key + '" style="overflow:hidden;">');
        card.html(('<div class="card-mainDiv" style="cursor:pointer;" onclick="selectItem('+ item.srl_pro_key +')">')
            + ' ' + ('<div class="col-md-12 col-xs-12" style="overflow:hidden;padding:0;" >')
            + ' ' + ('<p class="col-md-6"><span style="padding-right:5px; font-size:15px; font-weight:600;color:#105faf;" class="prodname">' + item.prodname + '</span><span>(</span><span style="color:gray; font-weight:600;" class="prodcode">' + item.prodcode + '</span><span>)</span><span style="display:block; font-size:small;" class="packing">' + item.packing + '</span></p>')
            + ' ' + ('<p class="col-md-3 col-xs-6">MRP &nbsp;&#8377;<span class="mrp"> ' + Number(item.mrp).toFixed(2) + '</span></p>')
            + ' ' + ('<p class="col-md-3 col-xs-6">Total Qty :<span class="totstock">' + (item.totstock || '') + '</span></p>')
            + ' ' + ('</div></div>')
            + ' ' + ('<div class="col-md-12 col-xs-12" style="overflow:hidden;padding:0;">')
            + ' ' + ('<p class="col-md-3 col-xs-6">Qty <span style="padding-left:10px;"><button type="button" class="btn btn-default" onclick="updateItemQty(' + item.srl_pro_key + ',-1)" style="padding:2px 8px; height:25px; margin-bottom:3px; border-radius: 0 2px 2px 0;"><span class="glyphicon glyphicon-minus" style="font-family: Source Sans Pro;"></span> </button><input type="text" onkeypress="return isNumberKey(event)"  onkeyup="updateItemTotal(' + item.srl_pro_key + ')" value="1" class="text itemQty"><button type="button" class="btn btn-default" onclick="updateItemQty(' + item.srl_pro_key +',1)" style="padding:2px 8px; height:25px; margin-bottom:3px; border-radius: 0 2px 2px 0;"><span class="glyphicon glyphicon-plus" style="font-family:Source Sans Pro;"></span></button></span></p>')
            + ' ' + ('<p class="col-md-3 col-xs-6">Price &#8377;<input type="text" class="itemPrice" onkeypress="return isNumberKey(event)"  onkeyup="updateItemTotal(' + item.srl_pro_key +')" style="border: none; border-bottom: grey solid 1px; outline:none; width:55px;margin-left:5px;" value="' + Number(item.baserate).toFixed(2) + '"  /></p>')
            + ' ' + ('<p class="col-md-3 col-xs-6">Total &#8377; <span class="itemTotal" style="font-weight:bold;">' +  Number(item.baserate).toFixed(2)  +'<span></p>')
            + ' ' + ('<p class="col-md-3 col-xs-6"><a>More Details</a></p>')
            + ' ' + ('</div>')
        );
        $("#cards").append(card);
    });
    if (data.recordsTotal == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").text("No record found").show();
    } else {
        $('#loading,#loadingmessage,#Msg').hide();
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
    let itemQty = Number($.trim($("#" + cardId + " .itemQty").val()));
    let itemPrice = Number($.trim($("#" + cardId + " .itemPrice").val()));
    let itemTotal =Number(itemPrice * itemQty).toFixed(2);
    $("#" + cardId + " .itemTotal").text(itemTotal);

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

//For Select individual item from product list 
function selectItem(cardId) {
    let srl_pro_key = cardId;
    let prodname = $.trim($("#" + cardId + " .prodname").text());
    let prodcode = $.trim($("#" + cardId + " .prodcode").text());
    let packing = $.trim($("#" + cardId + " .packing").text());
    let mrp = $.trim($("#" + cardId + " .mrp").text());
    let totstock = $.trim($("#" + cardId + " .totstock").text());
    let itemQty = $.trim($("#" + cardId + " .itemQty").val());
    let baserate = $.trim($("#" + cardId + " .itemPrice").val());
    let itemTotal = $.trim($("#" + cardId + " .itemTotal").text());

    $("#cards").empty().hide();
    $("#cardsDiv").hide();

    $("#prodnameFilter").val("");

    var prod = $('<div class="procard" id="pro-' + srl_pro_key + '" style="overflow:hidden;">');
    prod.html(('<div class="procard-mainDiv">')
        + ' ' + ('<div class="col-md-12 col-xs-12" style="overflow:hidden;padding:0;" >')
        + ' ' + ('<p class="col-md-6"><span style="padding-right:5px; font-size:15px; font-weight:600;color:#105faf;" class="prodname">' + prodname + '</span><span>(</span><span style="color:gray; font-weight:600;" class="prodcode">' + prodcode + '</span><span>)</span><span style="display:block; font-size:small;" class="packing">' + packing + '</span></p>')
        + ' ' + ('<p class="col-md-3 col-xs-6">MRP &nbsp;&#8377;<span class="mrp"> ' + Number(mrp).toFixed(2) + '<span></p>')
        + ' ' + ('<p class="col-md-3 col-xs-6">Total Qty :<span class="totstock">' + totstock + '<span></p>')
        + ' ' + ('</div></div>')
        + ' ' + ('<div class="col-md-12 col-xs-12" style="overflow:hidden;padding:0;">')
        + ' ' + ('<p class="col-md-3 col-xs-6">Qty <span style="padding-left:10px;"><button type="button" class="btn btn-default" onclick="updateItemQty(\'pro-' + srl_pro_key + '\',-1,true)" style="padding:2px 8px; height:25px; margin-bottom:3px; border-radius: 0 2px 2px 0;"><span class="glyphicon glyphicon-minus" style="font-family: Source Sans Pro;"></span> </button><input type="text" onkeypress="return isNumberKey(event)"  onkeyup="updateItemTotal(\'pro-' + srl_pro_key + '\',true)" value="' + itemQty +'" class="text itemQty"><button type="button" class="btn btn-default" onclick="updateItemQty(\'pro-' + srl_pro_key + '\',1,true)" style="padding:2px 8px; height:25px; margin-bottom:3px; border-radius: 0 2px 2px 0;"><span class="glyphicon glyphicon-plus" style="font-family:Source Sans Pro;"></span></button></span></p>')
        + ' ' + ('<p class="col-md-3 col-xs-6">Price &#8377;<input type="text" class="itemPrice" onkeypress="return isNumberKey(event)"  onkeyup="updateItemTotal(\'pro-' + srl_pro_key + '\',true)" style="border: none; border-bottom: grey solid 1px; outline:none; width:55px;margin-left:5px;" value="' + Number(baserate).toFixed(2) + '"  /></p>')
        + ' ' + ('<p class="col-md-3 col-xs-6">Total &#8377; <span class="itemTotal" style="font-weight:bold;">' + Number(itemTotal).toFixed(2) + '<span></p>')
        + ' ' + ('<p class="col-md-3 col-xs-6"><a style="margin-right:10px;" data-toggle="Edit"><img src="/images/edit.png" style="width:37px; margin-top:-3px;cursor:pointer;"></a> <a data-toggle="Delete"><img src="/images/icon-delete.png" onclick="removeProcard(\'pro-'+ srl_pro_key +'\')" style="width:20px;cursor:pointer;"></a></p>')
        + ' ' + ('</div>')
    );
    $("#orderItemsDiv").append(prod);
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
        let custcode = $.trim(GetValues("customer"));
        if (custcode == "") {
            ShowMsg("Please select customer")
            return false;
        }
        if (custcode.split(",").length > 1) {
            ShowMsg("Please select only 1 customer")
            return false;
        }

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
            OrderItems: orderItems,
            EncStr: $("#encStr").val()
        };

        $("#btnPlaceOrder").prop("disabled", true);
        $.ajax({
            type: "POST",
            url: "/PublicUrl/OrderForm",
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify(order),
            success: function (resp) {
                if (resp =="error") {
                    ShowMsg("Something went wrong.Please try again later.");
                    $("#btnPlaceOrder").prop("disabled", false);
                }
                else if(resp=="success") {
                    ShowMsg("Order Created Successfully.","success");
                    window.location = "/PublicUrl/OrderForm?encstr=" + encodeURIComponent($("#encStr").val());
                }

            }
        });



    }
}



function removeProcard(proCardId) {
    $("#orderItemsDiv #" + proCardId).remove();
    updateGrandTotal();
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
function submitProductForm(formId, btn) {
    $("#" + formId + " .errorMsgSpan").text("");
    var prodname = $("#" + formId + " #prodname").val();
    if ($.trim(prodname) == "") {
        $("#" + formId + " #productNameMsg").text("Product Name is required!");
        return false;
    }

    var packing = $("#" + formId + " #packing").val();
    if ($.trim(packing) == "") {
        $("#" + formId + " #packingMsg").text("Packing is required!");
        return false;
    }

    var mrp = $("#" + formId + " #mrp").val();
    if ($.trim(mrp) == "") {
        $("#" + formId + " #mrpMsg").text("MRP is required!");
        return false;
    }

    var msp = $("#" + formId + " #baserate").val();
    if ($.trim(msp) == "") {
        $("#" + formId + " #mspMsg").text("MSP is required!");
        return false;
    }

    console.log("Valid");
    $("#" + formId).submit();
    $(btn).attr("disabled", true);
}


function PageSize(value) {
    var a = $("#size").val();
    sessionStorage.setItem("PageSize", a);
    $(".yy").hide();
    var b = sessionStorage.getItem("search");
    var key = $("#examples").find('tr:nth-child(1) td:first input').val();
    $("#examples tbody tr").remove();
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $.post('/CRM/ajaxPendingOTP', { start:0, pSize: a, search: b }, function (data) {
        loadData(data);
    })
}
$(document).ready(function () {
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 20 }
    var SelectedRows = "";
    GetEmployeeData(0, t);
    sessionStorage.setItem("search", null);

    $("#Prev").on("click", function () {
        var key = $("#examples").find('tr:nth-child(1) td:first input').val();
        var a = sessionStorage.getItem("PageSize");
        var b = sessionStorage.getItem("search");
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem("order");
        if (a != null) { d = (parseInt(d) - a) - 1; } else { parseInt(d) = (d - 20) - 1; }
        $("#examples tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (key != 1) {
            $.post('/CRM/ajaxPendingOTP', { start: d, pSize: a, search: b, order: o }, function (data) {
                loadData(data);
            })
        }
    });
    $("#Next").on("click", function () {
        var b = sessionStorage.getItem("Total");
        var key = $("#examples").find('tr:last td:first input').val();
        var a = sessionStorage.getItem("PageSize");
        var c = sessionStorage.getItem("search");
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem("order");
        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 20 - 1; }
        $("#examples tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (key != b) {
            $.post('/CRM/ajaxPendingOTP', { start: d, pSize: a, search: c, order: o }, function (data) {
                loadData(data);
            })
        }
    });

    $('#popover1').popover({
        html: true,
        trigger: 'manual',
        content: function () { return $('#popover_content_wrapper1').html(); }
    });
    $(document).on('click', '#popover1', function () {
        $(this).popover('toggle');
        $('#popover2').popover({
            html: true,
            trigger: 'manual',
            content: function () { return $('#popover_content_wrapper2').html(); }
        });
    });
    $(document).on('click', '#popover2', function () { $(this).popover('toggle'); });
});
function GetEmployeeData(start, PSize) {
    $('#loading').show();
    $('#loadingmessage').show();
    $.post('/CRM/ajaxPendingOTP', { start: start, pSize: PSize }, function (data) {
        sessionStorage.setItem("Total", data.recordsTotal);
        loadData(data);
    });
}
function loadData(data) {
    var tblEmployee = $("#examples tbody");
    $("#examples tbody tr").remove();
    var a = data.draw;
    if ($("#Next").hasClass("disabledbutton") == true) { $("#Next").removeClass("disabledbutton"); }
    if ($("#Prev").hasClass("disabledbutton") == true) { $("#Prev").removeClass("disabledbutton"); }
    var d = sessionStorage.getItem("PageSize");
    if (d == null || d == 0 || d == "undefined") { d = 20; sessionStorage.setItem("PageSize", d); };
    var b;
    if (a == 1) { b = d; } else { b = parseInt(a) + parseInt(d); a = parseInt(a) + 1 }
    sessionStorage.setItem("start", a);
    sessionStorage.setItem("Total", data.recordsTotal);
    var c = data.recordsTotal;
    if (c == 0) { a = c; b = c; $("#Next").addClass("disabledbutton"); $("#Prev").addClass("disabledbutton"); }
    else if (c < b && a == 1) { b = c; $("#Next").addClass("disabledbutton"); $("#Prev").addClass("disabledbutton"); }
    else if (c < b && a > 1) { b = c; $("#Next").addClass("disabledbutton"); }
    else if (a == 1) { $("#Prev").addClass("disabledbutton"); }
    else if (parseInt(a) + parseInt(d) > c) { $("#Next").addClass("disabledbutton"); $("#Prev").removeClass("disabledbutton"); }
    $("#info").text(a + "-" + b + " of " + c);

    $.each(data.data, function (index, item) {
        var m = parseInt(a) + index;
        var tr = $("<tr class='maindiv' style='padding-left:0;'></tr>");
        tr.html(("<td class='basicTr sno' style='width: 5%;padding:0 0 0 5px;'>&nbsp;" + m + "</td>")
            + " " + ("<td class='basicTr custcode' style='width:10%;padding:0 0 0 0px;text-align:left;'>" + item.custcode + "</td>")
            + " " + ("<td class='basicTr custname clamp' style='width:29%;padding:0 5px 0 0px;text-align:left;'>" + item.custname + "</td>")
            + " " + ("<td class='basicTr customer' style='width:10%;padding:0 0 0 5px;text-align:left;'>" + item.p_customers + "</td>")
            + " " + ("<td class='basicTr mobno' style='width:9%;padding:0 0 0 0px;text-align:left;'>" + item.mobno + "</td>")
            + " " + ("<td class='basicTr hometown' style='width:15%;padding:0 0 0 5px;text-align:left;'>" + item.txthometown + "</td>")
            + " " + ("<td class='basicTr otp' style='width:8%;padding:0 0 0 5px;text-align:left;'>" + item.otp + "</td>")
            + " " + ("<td class='basicTr timestamp' style='width:15%;padding:0 0 0 5px;text-align:left;'>" + item.txtmtimestamp + "</td>"));
        tblEmployee.append(tr);
    })

    if (data.recordsTotal == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $("#Next").addClass("disabledbutton");
        $("#Prev").addClass("disabledbutton");
        $("#examples tbody").height(0);


    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
        Deviceheight();

    }
}

//$(document).ready(function () {
//    $(window).resize(function () {
//        Deviceheight();
//    });
//});
function Deviceheight() {
    var Header = $("header").outerHeight(true);
    var icondiv = $(".calHeightIcon").outerHeight(true);
    var Footer = $(".main-footer").outerHeight(true);
    var windowHeight = $(window).outerHeight(true);
    var SumOfElementHeight = Header + icondiv + Footer;
    var MainHeight = windowHeight - SumOfElementHeight - 90;
    $("#examples tbody").height(MainHeight);
}
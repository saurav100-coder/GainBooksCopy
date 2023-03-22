$(document).ready(function () {
    sessionStorage.clear();
    //logic to fill search dropdown
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
    //done logic of filter dropdown
    var a = 1;
    sessionStorage.setItem("start", 1);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 20 }
    var SelectedRows = "";
    GetEmployeeData(a, 1, t, "F");
    sessionStorage.setItem("search", null);

    $("#example tbody tr").remove();
    //var table = $("#example").DataTable();
    var counter = 0;
    $("#Prev").on("click", function () {
        var key = $("#example").find('tr:nth-child(1) td:first input').val();
        //var key = $("#example").find('tr:last td:first input').val();
        var firmname = $("#example").find('tr:nth-child(1) td:nth-child(3)').text();
        var a = sessionStorage.getItem("PageSize");
        var b = sessionStorage.getItem("search");
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem("order");
        if (o != undefined && o != "null") {
            order = o.split(":");
            var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
            ordervalue = $(orderid).text();
            o = order[1] + "~" + ordervalue + "~" + order[2];
            JSON.stringify(o);
        }
        if (a != null) { d = (d - a) - 1; } else { d = (d - 20) - 1; }
        $("#example tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (key != 1) {
            $.post('/CRM/AjaxAllRegCallsData', {  start: d, pSize: a, search: b, order: o }, function (data) {
                loadData(data);
            })
        }
    });
    $("#Next").on("click", function () {
        var b = sessionStorage.getItem("Total");
        var firmname = $("#example").find('tr:last td:nth-child(3)').text();
        var key = $("#example").find('tr:last td:first input').val();
        var a = sessionStorage.getItem("PageSize");
        var c = sessionStorage.getItem("search");
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem("order");
        if (o != undefined && o != "null") {
            order = o.split(":");
            var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
            ordervalue = $(orderid).text();
            o = order[1] + "~" + ordervalue + "~" + order[2];
            JSON.stringify(o);
        }
        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 20 - 1; }
        $("#example tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (key != b) {
            $.post('/CRM/AjaxAllRegCallsData', { start: d, pSize: a, search: c, order: o}, function (data) {
                loadData(data);
            })
        }
    });


    //var Table = $('#example').DataTable();
    $('#example').on('click', "input[type='checkbox']", function () {
        if ($(this).prop("checked") == true) {
            var s = $(this).parent().parent();
            $(s).toggleClass('highlight');
            var rowData = $(s).find("td:first input").val()
            document.getElementById("grid1").value = rowData;
        }
        else if ($(this).prop("checked") == false) {
            var t = $(this).parent().parent();
            $(t).toggleClass('highlight');
        }
    })
    $('#example').on('click', 'tr', function () {
        if (event.target.type !== 'checkbox') {
            $(':checkbox', this).trigger('click');
        }
    });
    $('#example thead tr').on('click', 'th', function () {
        var ordervalue = "";
        var ele = $(this).find("input").val();
        var ids = $('.sortable');
        for (i = 0; i <= ids.length - 1; i++) {
            var selector = "#" + ids[i].id;
            $(selector).removeClass();
            $(selector).addClass("glyphicon glyphicon-sort sortable ");         
        }    
        if (ele != undefined) {
            var order = ele.split(":");
            var sort = "#" + "sort-" + order[0];         
            if (order[2] == "none") {
                order[2] = "asc";
                $(sort).removeClass();
                $(sort).addClass("glyphicon glyphicon-sort-by-attributes sortable");            
            } else if (order[2] == "asc") {
                order[2] = "desc";
                $(sort).removeClass();
                $(sort).addClass("glyphicon glyphicon-sort-by-attributes-alt sortable");                 
            }
            else if (order[2] == "desc") {
                order[2] = "asc";               
                $(sort).removeClass();
                $(sort).addClass("glyphicon glyphicon-sort-by-attributes sortable");                          
            }
            var ControlVal = order[0] + ":" + order[1] + ":" + order[2];
            $(this).find("input").val(ControlVal);
            var a = "tbody tr:last td:nth-child(" + order[0] + ")";
            ordervalue = "";
            var o = order[1] + "~" + ordervalue + "~" + order[2];
            JSON.stringify(o);
            var search = sessionStorage.getItem("search");
            var a = sessionStorage.getItem("PageSize");
            sessionStorage.setItem("order", ele);
            $("#example tbody tr").remove();
            $('#loading').show();
            $('#loadingmessage').show();
            $('#Msg').hide();
            $.post('/CRM/AjaxAllRegCallsData', { id: 1, start: 1, pSize: a,search: search, order: o }, function (data) {
                loadData(data);
            })
        }
    });
    $("#filter").on("change", function () {
        var a = $("#filter").val();
        if (a == "0") {
            $("#TextC").css("display", "none");
            $("#StatusC").css("display", "none");
            var a = document.getElementById("dateC")
            a.style.display = "none";
        } else {
            b = a.split(":");
            if (b[1] == "date") {
                $("#TextC").css("display", "none");
                $("#StatusC").css("display", "none");
                var a = document.getElementById("dateC")
                a.style.display = "";
            } else if (b[1] == "string") {
                var a = document.getElementById("dateC")
                a.style.display = "none";
                $("#StatusC").css("display", "none");
                $("#TextC").css("display", "");
            } else if (b[1] == "integer") {
                var a = document.getElementById("dateC")
                a.style.display = "none";
                $("#TextC").css("display", "none");
                var a = document.getElementById("StatusC")
                a.style.display = "";
            }
        }
    });
    $("#StatusFilter").on("change", function () {
        var value = $(this).val();
        var col = $("#filter").val();
        var firmname = $("#example").find('tr:last td:nth-child(3)').text();
        var b = col.split(":");
        var search = value + "," + b[0] + ":" + b[1];
        JSON.stringify(search);
        sessionStorage.setItem("search", search);
        var a = sessionStorage.getItem("PageSize");
        var o = sessionStorage.getItem("order");
        if (o != undefined && o != "null") {
            order = o.split(":");
            var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
            ordervalue = "";
            o = order[1] + "~" + ordervalue + "~" + order[2];
            JSON.stringify(o);
        }
        $("#example tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        $.post('/CRM/AjaxAllRegCallsData', { start: 1, pSize: a,  search: search, order: o }, function (data) {
            loadData(data);
        })
    });
});
function DoSearch() {
    var value = $("#filterText").val();
    var col = $("#filter").val();
    var b = col.split(":");
    var search = value + "," + b[0] + ":" + b[1];
    JSON.stringify(search);
    sessionStorage.setItem("search", search);
    var a = sessionStorage.getItem("PageSize");
    var o = sessionStorage.getItem("order");
    if (o != undefined && o != "null") {
        order = o.split(":");
        var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
        ordervalue = "";
        o = order[1] + "~" + ordervalue + "~" + order[2];
        JSON.stringify(o);
    }
    $("#example tbody tr").remove();
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $.post('/CRM/AjaxAllRegCallsData', { id: 1, start: 1, pSize: a, search: search, order: o }, function (data) {
        loadData(data);
    })
}

function dd() {
    //var selectedIDs = [];
    //$("#example tr.highlight").each(function (index, row) {
    //    selectedIDs.push($(row).find("td:first input").val());
    //});
    //if (selectedIDs.length == "1") {
    //    var a = document.getElementById("grid1").value;
    //    location.href = '/Dealer/CustomerForm?exitmode=Edit&id=' + a;
    //}
}

function myFunction() { $("#register").empty(); };
//$('a').tooltip();
function DateSearch() {
    var min = $("#min").val();
    var max = $("#max").val();
    var col = $("#filter").val();
    var b = col.split(":");
    var search = min + "," + max + "," + b[0] + ":" + b[1];
    JSON.stringify(search);
    sessionStorage.setItem("search", search);
    var a = sessionStorage.getItem("PageSize");
    var o = sessionStorage.getItem("order");
    if (o != undefined && o != "null") {
        order = o.split(":");
        var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
        ordervalue = "";
        o = order[1] + "~" + ordervalue + "~" + order[2];
        JSON.stringify(o);
    }
    $("#example tbody tr").remove();
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $.post('/CRM/AjaxAllRegCallsData', { id: 1, start: 1, pSize: a, search: search, order: o }, function (data) {
        loadData(data);
    })
}
function GetEmployeeData(pageNumber, start, PSize) {
    $('#loading').show();
    $('#loadingmessage').show();
    $.post('/CRM/AjaxAllRegCallsData', { id: pageNumber, start: start, pSize: PSize }, function (data) {
        sessionStorage.setItem("Total", data.recordsTotal);
        loadData(data);
    });
}
function loadData(data) {
    var tblEmployee = $("#example tbody");
    $("#example tbody tr").remove();
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
        var tr = $("<tr id='" + item.Issuesfilegstkey + "'></tr>");
        tr.html(("<td style='width:8%;'><input type='checkbox' id='" + item.Issuesfilegstkey + "' value='" + item.Issuesfilegstkey + "' 'style='margin-top:2px; float:left'/>&nbsp;" + m + "</td>")
           + " " + ("<td style='width:7%;'>" + item.FrmtCreationDate + "</td>")
        + " " + ("<td style='width:13%;'>" + item.Firmname + "</td>")
        + " " + ("<td style='width:12%;'>" + item.Contactperson + "</td>")
        + " " + ("<td style='width:10%;'>" + item.Mobileno + "</td>")
        + " " + ("<td style='width:10%;'>" + item.Location + "</td>")
         + " " + ("<td style='width:10%;'>" + item.TextIssuetype + "</td>")
        + " " + ("<td style='width:20%; padding-right:0px;'>" + item.Issuedescription + "</td>")
         + " " + ("<td style='width:10%'>" + item.TextStatus + "</td>")
        );
        tblEmployee.append(tr);
    })
    if (data.recordsTotal == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $("#Next").addClass("disabledbutton");
        $("#Prev").addClass("disabledbutton");
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();

    }
}
function PageSize() {
    var a = $("#size").val();
    sessionStorage.setItem("PageSize", a);
    $(".yy").hide();
    var b = sessionStorage.getItem("search");
    var key = $("#example").find('tr:nth-child(1) td:first input').val();
    var firmname = $("#example").find('tr:last td:nth-child(3)').text();
    var o = sessionStorage.getItem("order");
    if (o != undefined && o != "null") {
        order = o.split(":");
        var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
        ordervalue = "";
        o = order[1] + "~" + ordervalue + "~" + order[2];
        JSON.stringify(o);
    }
    $("#example tbody tr").remove();
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $('#p').css("display", "none");

    $.post('/CRM/AjaxAllRegCallsData', { id: 1, start: 1, pSize: a, search: b, order: o, ServerOrderValue: firmname }, function (data) {
        loadData(data);
    })
}
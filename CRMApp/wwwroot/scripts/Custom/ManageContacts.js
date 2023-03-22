function PageSize() {
    var a = $("#size").val();
    sessionStorage.setItem("PageSize", a);
    $(".yy").hide();
    var b = sessionStorage.getItem("search");
    var o = sessionStorage.getItem("order");
    var fullname = $("#example").find('tr:last td:nth-child(2)').text();

    if (o != undefined && o != "null") {
        order = o.split(":");
        var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
        ordervalue = "";
        o = order[1] + "~" + ordervalue + "~" + order[2];
        JSON.stringify(o);
    }
    var key = $("#example").find('tr:nth-child(1) td:first input').val();
    $("#example tbody tr").remove();
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $('#p').css("display", "none");
    $.post('/CRM/AjaxContactsData', { id: 1, start: 1, pSize: a, direction: "F", search: b, order: o, ServerOrderValue: fullname }, function (data) {
        loadData(data);
    })
}
function loadData(data) {
    var tblEmployee = $("#example");
    $("#example tbody tr").remove();
    var a = data.draw;
    if ($("#Next").hasClass("disabledbutton") == true) {
        $("#Next").removeClass("disabledbutton");
    }
    if ($("#Prev").hasClass("disabledbutton") == true) {
        $("#Prev").removeClass("disabledbutton");
    }
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
        var tr = $("<tr id='" + item.CRMContacts_Key + "'></tr>");
        tr.html(("<td style='width:216px'><input type='checkbox' id='" + item.CRMContacts_Key + "' value='" + item.CRMContacts_Key + "'style='margin-top:2px; float:left'/>&nbsp;" + m + "</td>")
        + " " + ("<td style='width:216px'>" + item.Fullname + "</td>")
        + " " + ("<td style='width:216px'>" + item.MobilePhone + "</td>")
        + " " + ("<td style='width:216px'>" + item.Email + "</td>")
        + " " + ("<td style='width:216px'>" + item.TextJobTitle + "</td>"));
        tblEmployee.append(tr);
    })
    if (data.recordsTotal == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
    }
}
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
    $.post('/CRM/AjaxContactsData', { id: 1, start: 1, pSize: a, direction: "F", search: search, order: o }, function (data) {
        loadData(data);
    })
}
function DateSearch() {
    var rows = document.getElementsByTagName("tr");
    var min = document.getElementById("min");
    var max = document.getElementById("max");
    if (min.value == "") {
        var min1 = null;
    }
    else {
        var min1 = new Date(min.value);
    }
    if (max.value == "") {
        var max1 = null;
    }
    else {
        var max1 = new Date(max.value);
    }
    var on = 0;
    var value = $("#filterText").val();
    var col = $("#filter").val();
    var b = col.split(":");
    var search = value + "," + b;
    JSON.stringify(search);
    var a = $("#size").val();
    $.post('/CRM/AjaxContactsData', { id: 1, pSize: a, direction: "F", search: search }, function (data) {
        loadData(data);
    })
}
function dd() {
    var selectedIDs = [];

    $("#example tr.highlight").each(function (index, row) {
        selectedIDs.push($(row).find("td:first input").val());
    });
    if (selectedIDs.length == "1") {
        var a = document.getElementById("grid1").value;
        location.href = '/CRM/ContactsForm?exitmode=Edit&id=' + a;
    }

}

$(document).ready(function () {
    sessionStorage.clear();
    //filter list filling logic
    var d = $("#type2").val();
    var m = [];
    m = d.split("|");
    var l;
    for (i = 0; i <= m.length - 1; i = i + 1) {
        l = m[i].split("~");
        $('#filter').append($('<option>', { value: l[1] + ":" + l[2], text: l[0] }));
    };
    var a = 1;
    var SelectedRows = "";
    sessionStorage.setItem("start", 1);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 20 }
    var SelectedRows = "";
    GetEmployeeData(a, 1, t, "F");
    sessionStorage.setItem("search", null);  
    $("#example tbody tr").remove();
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
        if (event.target.type !== 'checkbox') { $(':checkbox', this).trigger('click'); }
    });

    $("#filter").on("change", function () {
        var a = $("#filter").val();
        if (a != "0") { $("#TextC").css("display", ""); }
        else { $("#TextC").css("display", "none"); }
    });
    var counter = 0;
    $("#Prev").on("click", function () {
        var key = $("#example").find('tr:nth-child(1) td:first input').val();
        var fullname = $("#example").find('tr:last td:nth-child(2)').text();
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
            $.post('/CRM/AjaxContactsData', { id: key, start: d, pSize: a, direction: "R", search: b, order: o, ServerOrderValue: fullname }, function (data) {
                loadData(data);
            })
        }
    });
    $("#Next").on("click", function () {
        var b = sessionStorage.getItem("Total");
        var fullname = $("#example").find('tr:last td:nth-child(2)').text();
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
            $.post('/CRM/AjaxContactsData', { id: key, start: d, pSize: a, direction: "F", search: c, order: o, ServerOrderValue: fullname }, function (data) {
                loadData(data);
            })
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
            $.post('/CRM/AjaxContactsData', { id: 1, start: 1, pSize: a, direction: "F", search: search, order: o }, function (data) {
                loadData(data);
            })
        }
    });
    $('a').tooltip();

function GetEmployeeData(pageNumber, start, PSize, dir) {
    $('#loading').show();
    $('#loadingmessage').show();
    $.post('/CRM/AjaxContactsData', { id: pageNumber, start: start, pSize: PSize, direction: dir }, function (data) {
        sessionStorage.setItem("Total", data.recordsTotal);
        loadData(data);
    });
}


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
$(document).on('click', '#popover2', function () { $(this).popover('toggle'); 
});
});
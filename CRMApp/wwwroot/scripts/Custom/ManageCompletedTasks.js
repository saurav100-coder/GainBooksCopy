﻿
var options = {
    "backdrop": "static",
    keyboard: true
}

function ExportCompletedTasks() {    
    $.post('/Tasks/AjaxExportCompletedTasks', function (data) {
        if (data == "0") {
            $('#TaskClosedContent').html('');
            $('#TaskClose').modal(options);
            $('#TaskClosedContent').html("<h3 class='text-center'>No record found to export</h3>");
            $('#TaskClose').modal("show");
            setTimeout(function () { $('#TaskClose').modal("hide"); }, 1000);
        }
        else if (data == "") {
            window.location.href = "/Home/Logout";
        }
        else if (data !== "") {
            window.location.href = "/Tasks/downloadTaskExcel?filename=" + data;
        }
    });
}


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
    $.post('/Tasks/AjaxCompletedTasks', { id: 1, start: 1, pSize: a, direction: "F", search: b, order: o, ServerOrderValue: fullname }, function (data) {
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
        var tr = $("<tr id='" + item.CRMTasks_Key + "' class='clickable' style='height: 55px;'></tr>");
        tr.html(("<td style='width:216px'><input type='checkbox' id='" + item.CRMTasks_Key + "' value='" + item.CRMTasks_Key + "'style='margin-top:2px; float:left'/>&nbsp;" + m + "</td>")
        + " " + ("<td style='width:216px'>" + item.TaskTitle + "</td>")
        + " " + ("<td style='width:216px'>" + item.TaskDescription + "</td>")
        + " " + ("<td style='width:216px'>" + item.TextTaskStatus + "</td>")
        + " " + ("<td style='width:216px'>" + item.FrmtStartDate + "</td>")
         + " " + ("<td style='width:216px'>" + item.FrmtDueDate + "</td>"));
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
    Deviceheight();
}
//Set table height according to screen
$(document).ready(function () {
    function Deviceheight() {
         var Header = $("header").height();
  
         var icondiv = $(".calHeightIcon").height();
         //var TableDive = $(".calHeightTaskBar").height();
         var Footer = $(".main-footer").height();
         var windowHeight = $(window).height();
         var SumOfElementHeight = Header +   icondiv + Footer;
         var MainHeight = windowHeight - SumOfElementHeight - 140;
         $("#example").height(MainHeight);
    }
    $(window).resize(function () {
  
        Deviceheight();
   
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
    $.post('/Tasks/AjaxPendingTasks', { id: 1, start: 1, pSize: a, direction: "F", search: search, order: o }, function (data) {
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
    $.post('/Tasks/AjaxCompletedTasks', { id: 1, pSize: a, direction: "F", search: search }, function (data) {
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
        location.href = '/Tasks/CRMTasksForm?exitmode=Edit&id=' + a;
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
        var t = $(this).parent().parent();
        if ($(this).prop("checked") == true) {
            if ($(t).hasClass('highlight')) {
                $(t).removeClass('highlight');
            }
            else {
                var row = $('#example tr.highlight').find("td:first input");
                if ($(row).prop("checked") == true) {
                    $(row).prop("checked", false);
                }
                $('#example tr.highlight').removeClass('highlight');
                $(t).addClass('highlight');
            }
        }
        else if ($(this).prop("checked") == false) {
            var t = $(this).parent().parent();
            $(t).removeClass('highlight');
        }
    })
    $('#example').on('click', 'tr', function () {
        if (event.target.type !== 'checkbox') {
            $(':checkbox', this).trigger('click');
            var s = $(this);
            var rowData = s[0].id;
            document.getElementById("grid1").value = rowData;
        }
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
            $.post('/Tasks/AjaxCompletedTasks', { id: key, start: d, pSize: a, direction: "R", search: b, order: o, ServerOrderValue: fullname }, function (data) {
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
            $.post('/Tasks/AjaxCompletedTasks', { id: key, start: d, pSize: a, direction: "F", search: c, order: o, ServerOrderValue: fullname }, function (data) {
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
            $.post('/Tasks/AjaxCompletedTasks', { id: 1, start: 1, pSize: a, direction: "F", search: search, order: o }, function (data) {
                loadData(data);
            })
        }
    });


    $('a').tooltip();

    function GetEmployeeData(pageNumber, start, PSize, dir) {
        $('#loading').show();
        $('#loadingmessage').show();
        $.post('/Tasks/AjaxCompletedTasks', { id: pageNumber, start: start, pSize: PSize, direction: dir }, function (data) {
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
    $(document).on('click', '#popover2', function () {
        $(this).popover('toggle');
    });

    $("#TeamCompletedTasksBy").submit(function () {
    $('#EmployeeTasks').modal('hide');
    if ($("#EmployeeId").val() != 0) {
        var empName = $("#EmployeeId option:selected").text();
 $("tbody").empty();
$("#loading").show();
        $('#loadingmessage').show();
        $.ajax({
            url: '/Tasks/TeamCompletedTasksBy',
            type: "POST",
            data: { empId: $("#EmployeeId").val() },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    loadData(data);
                    $("#FilterText").show();
                    $("#fText").text(empName);
                }
                
            },
            error: function (data) {
                alert("Failed");
            }

        });
    }
    return false;
});
});

function removeFilter() {
 $("tbody").empty();
    $("#loading").show();
    $('#loadingmessage').show();

    $.post('/Tasks/AjaxCompletedTasks', { id: 1, start: 1, pSize: 20, direction: 'F' }, function (data) {
        sessionStorage.setItem("Total", data.recordsTotal);
        loadData(data);
        $("#FilterText").hide();
        $("#fText").text("");
    });
}

//Laveena Starts
//Code for context menu
$.contextMenu({
    selector: '#example tr',
    build: function ($trigger) {
        var options = {
            callback: function (key, options) {
                //var m = "clicked: " + key + options.$trigger[0].cells[0].children[0].childNodes[0].id + "" + options.$trigger[0].cells[3].textContent;
                var Rowid = options.$trigger[0].id;
                //window.console && console.log(m) || alert(m);
                switch (key) {

                    case "TasksCompletedBy":
                        var options = {
                            "backdrop": "static",
                            keyboard: true
                        };
                        $('#EmployeeTasks').modal(options);
                        $('#EmployeeTasks').modal('show');
                        break;
                }

            },
            items: {},
        }
        if ($trigger.hasClass('clickable')) {
            if ($("#Logintype").val() == "Manager") {

                options.items.TeamFilter = {
                    name: "Team Filter", icon: "fa-th-list",
                    "items": {

                        "TasksCompletedBy": { name: "Tasks Completed By", icon: "fa-pencil-square-o" }
                    }

                }
            } else {



            }

        }
        else {

        }
        return options;
    }

});
$('#example tr').on('click', function (e) {

    console.log('clicked', this);
})


$('#example').on('contextmenu', 'tr', function (e) {
    if ($(this).hasClass('highlight')) {
    }
    else {
        var row = table.$('tr.highlight').find("td:first input");
        if ($(row).prop("checked") == true) {
            $(row).prop("checked", false);
        }
        table.$('tr.highlight').removeClass('highlight');
        $(this).addClass('highlight');
        $(this).find("td:first input").prop("checked", true);

    }
});
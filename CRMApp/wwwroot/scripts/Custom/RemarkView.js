

    //function PageSize(value) {
    //    var a = $("#size").val();
    //    sessionStorage.setItem("PageSize", a);
    //    $(".yy").hide();
    //    var b = sessionStorage.getItem("search");
    //    var key = $("#example").find('tr:nth-child(1) td:first input').val();
    //    $("#example tbody tr").remove();
    //    $('#loading').show();
    //    $('#loadingmessage').show();
    //    $('#Msg').hide();
    //    $.post('/CRM/ajaxRemarksData', { id: key, start: 1, pSize: a, direction: "F", search: b }, function (data) {
    //        loadData(data);
    //    })
    //}
    $(document).ready(function () {
        //logic to fill search dropdown
        var d = $("#fValue").val();
        var m = [];
        m = d.split("|");
        var l;
        for (i = 0; i <= m.length - 1; i = i + 1) {
            l = m[i].split("~");
            $('#filter').append($('<option>', { value: l[1] + ":" + l[2], text: l[0] }));
        };
        //done logic of filter dropdown
        var a = 1;
        sessionStorage.setItem("start", 1);
        var t = sessionStorage.getItem("PageSize");
        if (t == null) { t = 20 }
        var SelectedRows = "";
        GetEmployeeData(a, 1, t, "F");
        sessionStorage.setItem("search", null);
        $("#example").dataTable({
            "scrollY": 420,
            "bPaginate": false,
            "bFilter": false,
            "info": false,
            "columns": [{ "orderable": false },
  { "orderable": false },
 { "orderable": false },
  { "orderable": false },
  { "orderable": false },
           { "orderable": false },
  { "orderable": false }
            ],
            "order": [[1, "asc"], [2, "desc"]],
        });
        $("#example tbody tr").remove();
        var table = $("#example").DataTable();
        var counter=0;
        
    });
function GetEmployeeData(pageNumber, start, PSize, dir) {
    $('#loading').show();
    $('#loadingmessage').show();
    $.post('/CRM/ajaxRemarksData', { id: pageNumber, start: start, pSize: PSize, direction: dir }, function (data) {
        sessionStorage.setItem("Total", data.recordsTotal);
        loadData(data);
    });
}
function loadData(data) {
    var tblEmployee = $("#example");
    $("#example tbody tr").remove();
    var a = data.draw;
    if( $("#Next").hasClass("disabledbutton")==true){$("#Next").removeClass("disabledbutton");}
    if ($("#Prev").hasClass("disabledbutton") == true) {$("#Prev").removeClass("disabledbutton");}
    var d = sessionStorage.getItem("PageSize");
    if (d == null || d == 0 || d == "undefined") { d = 20; sessionStorage.setItem("PageSize", d); };
    var b;
    if (a == 1) { b = d; } else { b = parseInt(a) + parseInt(d); a = parseInt(a) + 1 }
    sessionStorage.setItem("start", a);
    sessionStorage.setItem("Total", data.recordsTotal);
    b = data.recordsTotal;
    var c = data.recordsTotal;
    $("#Next").addClass("disabledbutton"); $("#Prev").addClass("disabledbutton");
    $("#popover1").addClass("disabledbutton");
    $("#info").text(a + "-" + b + " of " + c);
    $.each(data.data, function (index, item) {
        var m = parseInt(a) + index;
        var tr = $("<tr id='" + item.Issuesfilegstkey + "'></tr>");
        tr.html(("<td style='width:100px;'><input type='checkbox' id='" + item.Issuesfilegstkey + "' value='" + item.Issuesfilegstkey + "'/>&nbsp;&nbsp;" + m + "</td>")
            + " " + ("<td style='width:150px;'>" + item.P_issuesfilegst + "</td>")
              + " " + ("<td style='width:150px;'>" + item.FrmtCreationDate + "</td>")
           + " " + ("<td style='width:120px;'>" + item.Firmname + "</td>")
            + " " + ("<td style='width:250px;'>" + item.Commtext + "</td>")
        + " " + ("<td style='width:250px;'>" + item.Issuedescription + "</td>")
       + " " + ("<td style='width:105px;'>" + item.Location + "</td>")
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
$(document).ready(function () {

    var Table = $('#example').DataTable();
    $('#example tbody').on('click', "input[type='checkbox']", function () {
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
    $('#example tbody').on('click', 'tr', function () {if (event.target.type !== 'checkbox') {$(':checkbox', this).trigger('click');}});
    $("#filter").on("change", function () {
        var a = $("#filter").val();
        if (a=="0"){
            $("#TextC").css("display", "none");
            var a = document.getElementById("dateC")
            a.style.display = "none";
        }else{
            b = a.split(":");
            if (b[1] == "date") {
                $("#TextC").css("display", "none");
                var a = document.getElementById("dateC")
                a.style.display = "";
            }else if (b[1] == "string") {
                var a = document.getElementById("dateC")
                a.style.display = "none";
                $("#TextC").css("display", "");
            }else if (b[1] == "integer") {}
        }
    });
});
function DoSearch() {
    
    var table = $('#example');
    var rows = document.getElementsByTagName("tr");
    var q = document.getElementById("filterText");
    var v = q.value.toLowerCase();
    var on = 0;

    var a = $("#filter").val();
    var b = [];
    b = a.split(":");
    for (var i = 4; i < rows.length; i++) {
        //var m = table.column(b[0]);
        var fullname = rows[i].getElementsByTagName("td");
        //var c = $(fullname).text(b[0]);
        //var s = rows[i].ce
        fullname = fullname[b[0]].innerHTML.toLowerCase();
        if (fullname) {
            if (v.length == 0 || (v.length < 3 && fullname.indexOf(v) == 0) || (v.length >= 3 && fullname.indexOf(v) > -1)) {
                rows[i].style.display = "";
                on++;
            } else {
                rows[i].style.display = "none";
            }
        }
    }
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
    for (var i = 4; i < rows.length; i++) {
        var fullname = rows[i].getElementsByTagName("td");
        fullname = new Date(fullname[2].innerHTML);
        if (fullname >= min1 && fullname <= max1 || fullname >= min1 && max1 == null || min1 == null && fullname <= max1 || max1 == null && min1 == null) {
            rows[i].style.display = "";
            on++;
        } else {
            rows[i].style.display = "none";
        }
    }
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

function myFunction() {$("#register").empty();};
$('a').tooltip();
//function DateSearch() {
//    var min = $("#min").val();
//    var max = $("#max").val();
//    var col = $("#filter").val();
//    var b = col.split(":");
//    var search = min + "," + max +"," +b[0]+":"+b[1];
//    JSON.stringify(search);
//    sessionStorage.setItem("search", search);
//    var a = sessionStorage.getItem("PageSize");
//    var o = sessionStorage.getItem("order");
//    $("#example tbody tr").remove();
//    $('#loading').show();
//    $('#loadingmessage').show();
//    $('#Msg').hide();
//    $.post('/CRM/ajaxRemarksData', { id: 1, start: 1, pSize: a, direction: "F", search: search, order: o }, function (data) {
//        loadData(data);
//    })
//}

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


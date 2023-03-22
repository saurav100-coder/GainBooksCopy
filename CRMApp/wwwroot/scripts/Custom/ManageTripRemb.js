//Function to set the pageSize of a grid i.e. no of rows to be shown on the grid and 
//bring data from server and show on grid 
function PageSize(value) {
    var a = $("#size").val();
    sessionStorage.setItem("PageSize", a);
    $(".yy").hide();
    var b = sessionStorage.getItem("search");
    var key = $("#example").find('tr:nth-child(1) td:first input').val();
    $("#example tbody tr").remove();
    //show loader
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
     //post call to get data from server
    $.post('/CRM/ajaxTripRembData', { start: 1, pSize: a, search: b }, function (data) {
        //call loaddata function
        loadData(data);
    })
}
//things to do on page load are done in this function & 
// all events are included in this as well.
$(document).ready(function () {
    //logic to fill search dropdown
    var d = $("#Fvalue").val();
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
    //call get data function to get grid data by ajax
    GetEmployeeData(a, 1, t, "F");
    sessionStorage.setItem("search", null);

    $("#example tbody tr").remove();
    //var table = $("#example").DataTable();
    var counter = 0;
    //click of Prev button for pagination in grid
    $("#Prev").on("click", function () {
        //get values from session variables of client side
        var key = $("#example").find('tr:nth-child(1) td:first input').val();
        var a = sessionStorage.getItem("PageSize");
        var b = sessionStorage.getItem("search");
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem("order");
        if (a != null) { d = (parseInt(d) - a) - 1; } else { parseInt(d) = (d - 20) - 1; }
        //remove previous rows from grid
        $("#example tbody tr").remove();
        //show loader
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        //call ajax function to bring data
        if (key != 1) {
            $.post('/CRM/ajaxTripRembData', { start: d, pSize: a, search: b, order: o }, function (data) {
                //call loadData function to fill rows
                loadData(data);
            })
        }
    });
    //click of Next button for pagination in grid
    $("#Next").on("click", function () {
        //get values from session variables of client side
        var b = sessionStorage.getItem("Total");
        var key = $("#example").find('tr:last td:first input').val();
        var a = sessionStorage.getItem("PageSize");
        var c = sessionStorage.getItem("search");
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem("order");
        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 20 - 1; }
        //remove previous rows from grid
        $("#example tbody tr").remove();
        //show loader
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        //call loadData function to fill rows
        if (key != b) {
            $.post('/CRM/ajaxTripRembData', { start: d, pSize: a, search: c, order: o }, function (data) {
                //call loadData function to fill rows
                loadData(data);
            })
        }
    });
    //show popover on click on pagesize icon
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
    //end popover function
});
//End Document load

//Function for ajax callto get data when page is first load 
function GetEmployeeData(pageNumber, start, PSize, dir) {
    $('#loading').show();
    $('#loadingmessage').show();
    $.post('/CRM/ajaxTripRembData', { start: start, pSize: PSize, direction: dir }, function (data) {
        //set session variable
        sessionStorage.setItem("Total", data.recordsTotal);
        //call loadData function to fill rows
        loadData(data);
    });
}
//LoadData function to fill rows from server data 
function loadData(data) {
    var tblEmployee = $("#example");
    $("#example tbody tr").remove();
    //set next and previous buttons,pagesize etc. according to data
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
    //show totalno of rows on server and no of rows shown in grid as pagination information
    $("#info").text(a + "-" + b + " of " + c);
    //loop to get data from array and fll in rows accordingly in grid.
    $.each(data.data, function (index, item) {
        var m = parseInt(a) + index;
        var tr = $("<tr id='" + item.ReimbVisit_Key + "'></tr>");
        //create rows dynamically and fill data in it
        tr.html(("<td style='width:10%'><input type='checkbox' id='" + item.ReimbVisit_Key + "' value='" + item.ReimbVisit_Key + "'style='margin-top:2px;'/>&nbsp;" + m + "</td>")
           + " " + ("<td style='width:10%'>" + item.Firmname + "</td>")
        + " " + ("<td style='width:15%'>" + item.TripName + "</td>")
        + " " + ("<td style='width:11%'>" + item.TxtStartDate + "</td>")
         + " " + ("<td style='width:10%'>" + item.TxtEndDate + "</td>")
        + " " + ("<td style='width:12%'>" + item.StartLocation + "</td>")
         + " " + ("<td style='width:10%'>" + item.EndLocation + "</td>")
          + " " + ("<td style='width:10%'>" + item.KmDistance + " Km</td>")
          + " " + ("<td style='width:10%'> <a href='#' id='" + item.P_imagefile + "'class='ViewImage' onclick='ViewImage(this.id)'> View Path</a> </td>")
          );
        tblEmployee.append(tr);
    })//if data is not available on server show message accordingly
    if (data.recordsTotal == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $("#Next").addClass("disabledbutton");
        $("#Prev").addClass("disabledbutton");
    } else {//hide loader
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
    }
}
function ViewImage(id) {
    var imagekey = id;
    var options = {
        "backdrop": "static",
        keyboard: true
    };
    $('#ImageModal').modal(options);
    $('#ImageModal').modal('show');
    $("#overlay").show();
    $("#loadspin").show();
    var path = "/CRM/ajaxTripRembImage?imagekey=" + imagekey;
    $('#tripImg').attr("src", path);
    setTimeout(function () {
        $("#overlay").hide();
        $("#loadspin").hide();
    }, 60000);
}
$('a').tooltip();

var options = { "backdrop": "static", keyboard: true };


//this is a sessionStorageKey for Search
var searchKey = "searchManageTrip";
//this is a sessionStorageKey for order
var orderKey = "orderManageTrip";
//this is a sessionStorageKey for search Criteria div value
var searchMsgKey = "searchMsgManageTrip";
//this is a sessionStorageKey for basicFilter UI consistency on Page Reload
var basicFilterStrKey = "basicFilterStrManageTrip";



$(document).ready(function () {
    //logic to fill search dropdown
    var d = $("#fvalue").val();
    var m = [];
    m = d.split("|");
    var l;
    for (i = 0; i <= m.length - 1; i = i + 1) {
        l = m[i].split("~");
        $('#filter').append($('<option>', { value: l[1] + ":" + l[2], text: l[0] }));
    };
    $('a').tooltip();
    //done logic of filter dropdown
    var a = 1;
    $("#filter").on("change", function () {
        var a = $("#filter").val();
        $(".filterDiv").css("display", "none")
        if (a != "0" && a != "1") {
            b = a.split(":");
            if (b[0] == 2) {
                var a = document.getElementById("dateC")
                a.style.display = "";
            } else if (b[0] == 3 || b[0] == 4 || b[0] == 5) {
                $("#TextC").css("display", "");
            }
        }
    });

    setBasicFilterUIOnPageReload();

    sessionStorage.setItem("start", 0);
    //sessionStorage.setItem("search", "");
    //sessionStorage.setItem("order", "");
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 50 }
    var SelectedRows = "";

    setInterval(ReloadGrid(), 15 * 60 * 1000)

    $("#Prev").on("click", function () {
        var a = sessionStorage.getItem("PageSize");
        //var b = sessionStorage.getItem("search");
        var b = sessionStorage.getItem(searchKey);
        if (b == "null") {
            b = "";
        }
        var d = sessionStorage.getItem("start");
        //var o = sessionStorage.getItem("order");
        var o = sessionStorage.getItem(orderKey);
        var total = sessionStorage.getItem("Total");
        if (a != null) { d = (d - a) - 1; } else { d = (d - 50) - 1; }
        $("#example tbody tr").remove();
        $("#example tbody").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d >= 0) {
            $.post('/Trip/ajaxManageTripInfo', { start: d, pSize: a, search: b, order: o }, function (data) {
                loadData(data);
            })
        }
    });

    $("#Next").on("click", function () {
        var total = sessionStorage.getItem("Total");
        var a = sessionStorage.getItem("PageSize");
        //var c = sessionStorage.getItem("search");
        var c = sessionStorage.getItem(searchKey);
        if (c == "null") {
            c = "";
        }
        var d = sessionStorage.getItem("start");

        //var o = sessionStorage.getItem("order");
        var o = sessionStorage.getItem(orderKey);

        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 50 - 1; }
        $("#example tbody tr").remove();
        $("#example tbody").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/Trip/ajaxManageTripInfo', { start: d, pSize: a, search: c, order: o }, function (data) {
                loadData(data);
            })
        }
    });


   
});

function ReloadGrid() {
    //removeFilter();
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 50 }
    GetEmployeeData(1, 0, 50);
    $("#fText").text("");
    $("#FilterText").hide();
}

function removeFilter() {
    $(".filterDiv").css("display", "none")
    $("#filter").val(0);
    $("#filterText").val("");
    $("#dateC #min").val("");
    $("#dateC #max").val("");
    $(".filterclose").hide();
    //sessionStorage.setItem("search", "");
    //sessionStorage.setItem("order", "");
    setSearchSessionStorage("");
    setOrderSessionStorage("");
    $(".resultDiv .result-msg").html("");
    $(".resultDiv").hide();
    ReloadGrid();
}

function GetEmployeeData(pageNumber, start, PSize) {
    //var search = sessionStorage.getItem("search");
    //var order = sessionStorage.getItem("order");
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
    $("#example tbody tr").remove();
    $("#example tbody ").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $.ajax({
        type: "POST",
        url: "/Trip/ajaxManageTripInfo",
        data: { start: start, pSize: PSize, search: search, order: order },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            } else {
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });
}

function loadData(data) {
    var tblEmployee = $("#example tbody");
    $("#example tbody tr").remove();
    $("#example tbody ").height(0);
    var a = data.draw;
    if ($("#Next").hasClass("disabledbutton") == true) { $("#Next").removeClass("disabledbutton"); }
    if ($("#Prev").hasClass("disabledbutton") == true) { $("#Prev").removeClass("disabledbutton"); }
    var d = sessionStorage.getItem("PageSize");
    if (d == null || d == 0 || d == "undefined") { d = 50; sessionStorage.setItem("PageSize", d); };
    var b;
    if (a == 1) { b = d; sessionStorage.setItem("start", 0); } else { b = parseInt(a) + parseInt(d); a = parseInt(a) + 1; sessionStorage.setItem("start", a); }
    sessionStorage.setItem("Total", data.recordsTotal);
    var c = data.recordsTotal;
    if (c == 0) { a = c; b = c; $("#Next").addClass("disabledbutton"); $("#Prev").addClass("disabledbutton"); }
    else if (c < b && a == 1) { b = c; $("#Next").addClass("disabledbutton"); $("#Prev").addClass("disabledbutton"); }
    else if (c < b && a > 1) { b = c; $("#Next").addClass("disabledbutton"); }
    else if (a == 1) { $("#Prev").addClass("disabledbutton"); }
    else if (b == d) { $("#Next").addClass("disabledbutton"); }
    else if (parseInt(a) + parseInt(d) > c) { $("#Next").addClass("disabledbutton"); $("#Prev").removeClass("disabledbutton"); }
    $("#info").text(a + "-" + b + " of " + c);
    var m = a - 1;

    
    $.each(data.data, function (index, item) {
        var m = parseInt(a) + index;
        var tr = $("<tr class='clickable' id='" + item.tripinfo_key + "' style=' border:none; height:50px; color: #3c8dbc;' onClick=ShowTripDetail('" + item.tripid + "')></tr>");
        tr.html(("<td class='selectValue' style='width:50px;'>" + m + "</td>")
            + ("<td class='TaskIdValue' style='width:160px;'>" + item.tripid + "</td>")
            + ("<td class='DateValue' style='width:200px;'>" + item.triplbl + "</td>")
            + ("<td class='TaskTitleValue' style='width:200px;'>" + item.FrmtStartTime + "</td>")
            + ("<td class='TaskTitleValue' style='width:200px;'>" + item.FrmtEndTime + "</td>")
            + ("<td class='RemarkValue' style='width:160px; '>" + item.duration + "</td>")
            + ("<td class='TaskDescriptionValue' style='width:150px;'>" + item.avgspeed + "</td>")
            + ("<td class='RemakByValue' style='width:150px; text-align:center;'>" + item.covereddistance + "</td>")
            + ("<td class='RemakByValue' style='width:150px; text-align:center;'>" + item.accname + "</td>"));
        tblEmployee.append(tr);
    })

    if (data.recordsTotal == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $('#loading').addClass('clickable');
        $('#example tbody').height(0);
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
        Deviceheight();
    }
    
}

$("nav").find(".newTitle").remove();
var s = "<p class='newTitle' >Manage Trip </p>";
$("nav").find(".titleName").append(s);

function ShowTripDetail(tripid) {
    window.location = '/Trip/TripDetails?tripid=' + tripid;
}


function Deviceheight() {

    var Header = $("header").height();
    var icondiv = $(".icon-div").outerHeight();
    var TableDive = $(".horizontal thead").height();
    var Footer = $(".main-footer").outerHeight();
    var windowHeight = $(window).height();
    var SumOfElementHeight = Header + TableDive + icondiv + Footer;
    var MainHeight = windowHeight - SumOfElementHeight -15;
    $(".horizontal tbody").height(MainHeight);
}
$(document).ready(function () {
    $(window).resize(function () {
        Deviceheight();
    });
});

function DoSearch() {
    $(".filterclose").removeClass("DatesMargin");
    var ValueToSearch = $("#filterText").val().trim();
    var filterSelected = $("#filter").val();
    var filter = filterSelected.split(":")
    var col = ""
    var search = ""
    var searchMsg = "";
    //(#filter).val()~ActualFilterId:value
    var basicFilterStr = "";
    if ($("#filterText").val() != "" || $("#filterText").val() != "undefined") {
        if (filter[0] == 3) {
            value = $("#filterText").val();
            col = "m1.triplbl";
            search = ValueToSearch + "," + col + ":String";
            searchMsg = "Search Results: Trip Name <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        if (filter[0] == 4) {
            value = $("#filterText").val();
            col = "m1.duration";
            search = ValueToSearch + "," + col + ":Integer";
            searchMsg = "Search Results: Duration <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        if (filter[0] == 5) {
            value = $("#filterText").val();
            col = "m1.covereddistance";
            search = ValueToSearch + "," + col + ":Integer";
            searchMsg = "Search Results: Distance <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        $(".filterclose").show();
        JSON.stringify(search);
        //sessionStorage.setItem("search", search);
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);

        var pSize = sessionStorage.getItem("PageSize");
        $("#example tbody tr").remove();
        $("#example tbody").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Trip/ajaxManageTripInfo',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                } else {
                    $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p>");
                    $(".resultDiv").show();
                    sessionStorage.setItem("Total", data.recordsTotal);
                    loadData(data);
                }
            },
            error: function (data) {
                alert("Failed");
            }
        });
    }
    return false;
}

function DateSearch() {
    value1 = $("#dateC #min").val();
    value2 = $("#dateC #max").val();
    col = "m1.endtime";
    search = value1 + "," + value2 + "," + col + ":Date";

    if (value1 != 0 || value2 != 0) {
        $(".filterclose").show();
        $(".filterclose").addClass("DatesMargin");
        var searchMsg = "Search Results: Trip Date From <span class='' style='font-weight: 600'>'" + value1 + "'</span> To <span class='' style='font-weight: 600'>'" + value2 + "'</span>";
        JSON.stringify(search);
        //sessionStorage.setItem("search", search);
        var basicFilterStr = $("#filter").val() + "~#dateC #min:" + value1 + "|#dateC #max:" + value2;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem("PageSize");
        $("#example tbody tr").remove();
        $("#example tbody ").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Trip/ajaxManageTripInfo',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                } else {
                    $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p>");
                    $(".resultDiv").show();
                    sessionStorage.setItem("Total", data.recordsTotal);
                    loadData(data);
                }
            },
            error: function (data) {
                alert("Failed");
            }
        });
    }
}

function SubmitFilterSort(search, order, pSize, searchMsg) {
    $('#FilterModel').modal('hide');
    $("#example tbody tr").remove();
    $("#example tbody ").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $.ajax({
        url: '/Trip/ajaxManageTripInfo',
        type: "POST",
        data: {start: 0, pSize: pSize, search: search, order: order },
        success: function (data) {
            $(".filterclose").show();
            if ($.trim(searchMsg) != "") {
                $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p>");
                $(".resultDiv").show();
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            } else {
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        },
        error: function (data) {
            alert("Failed");
        }
    });

}



////Added by aslam to set Search or Order sessionStorage
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

function setBasicFilterUIOnPageReload() {
    //if (window.performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    //    alert("screen reloaded");
    //}

    var str = sessionStorage.getItem(basicFilterStrKey);
    var search = sessionStorage.getItem(searchKey);
    if (search !== null && search != "") {
        if (str !== null && str != "") {
            var arr = str.split("~");
            $("#filter").val(arr[0]).trigger('change');
            var controls = arr[1].split("|");
            for (var i = 0; i < controls.length; i++) {
                var ctrl = controls[i].split(":");
                //setFilterControlValueOnPageReload(ctrl[0],ctrl[1]);
                var type = $(ctrl[0]).prop("type");
                if (type == "select-multiple") {
                    var valArr = ctrl[1].split(",");
                    $(ctrl[0]).val(valArr);
                    $("#btnTagSearch").show()
                }
                else {
                    $(ctrl[0]).val(ctrl[1]);
                }

            }
            $(".filterclose").show();
        }
    }

}



















//this is a sessionStorageKey for Search
var searchKey = "searchTaskFile";
//this is a sessionStorageKey for order
var orderKey = "orderTaskFile";
//this is a sessionStorageKey for search Criteria div value
var searchMsgKey = "searchMsgTaskFile";
//this is a sessionStorageKey for basicFilter UI consistency on Page Reload
var basicFilterStrKey = "basicFilterStrTaskFile";

//this is a sessionStorageKey for PageSize
var regPageSizeKey = "pageSizeManageTaskFile"


//Basic filter multiple
function SubmitBasicFilter(search, searchMsg) {
    var pSize = sessionStorage.getItem(regPageSizeKey);
    $("#example tbody tr").remove();
    $('#loading').show();
    $('#loadingmessage').show();
    /*$('#Msg').hide();*/
    $.ajax({
        url: "/Tasks/AjaxTaskFileData",
        type: "POST",
        data: { id: "", start: 0, pSize: pSize, search: search, order: order  },
        success: function (data) {
            if ($.trim(searchMsg) != "") {
                $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p>");
                $(".resultDiv").show();
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        },
        error: function (data) {
            alert("Failed");
        }
    });

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
    /*$("#info").text(a + "-" + b + " of " + c);*/
    $("#info").text(a + "-" + data.recordsTotal + " of " + data.recordsTotal);
    $("#Next").addClass("disabledbutton");
    $("#Prev").addClass("disabledbutton");

    $.each(data.data, function (index, item) {
        var m = (a) + index;
        var tr = $("<tr id='" + item.CRMDocumentsLink_Key + "' class='clickable' data-toggle='collapse' data-target='." + item.CRMDocumentsLink_Key + "'+ ></tr>");
        tr.html(("<td style='width:70px'><input type='checkbox' id='" + item.CRMDocumentsLink_Key + "' value='" + item.CRMDocumentsLink_Key + "'style='margin-top:2px; float:left'/>&nbsp;" + m + "</td>")
          + " " + ("<td style='width:531px;color:white'><a href='" + item.LinkURL + "' download>" + item.FileName + "</td>")
        + " " + ("<td style='width:236px'>" + item.FrmtCreationDate + "</td>")
        + " " + ("<td style='width:416px'>" + item.TextLogincode + "</td>"));
        tblEmployee.append(tr);
    })

    if (data.recordsTotal == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $('#loading').addClass('clickable');
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
    }
    Deviceheight();
}
//Set table height according to screen 

function Deviceheight() {
    var Header = $("header").height();
    var icondiv = $(".calHeightIcon").height();
    var TableDive = $(".calHeightTaskBar").height();
    var Footer = $(".main-footer").height();
    var windowHeight = $(window).height();
    var SumOfElementHeight = Header + TableDive + icondiv + Footer;
    var MainHeight = windowHeight - SumOfElementHeight - 30;
    $(".horizontal").height(MainHeight);
}


$(document).ready(function () {
    $(window).resize(function () {
        Deviceheight();
    });
});


function dd() {
    var selectedIDs = [];
    $("#example tr.highlight").each(function (index, row) {
        selectedIDs.push($(row).id);
    });
    if (selectedIDs.length == "1") {
        var a = document.getElementById("grid1").value;
        location.href = '/Tasks/CRMTasksForm?exitmode=Edit&id=' + a;
    }
}
function Collaborator() {
    var selectedIDs = [];
    var selectedTasks = [];
    $("#example tr.highlight").each(function (index, row) {
        selectedIDs.push($(row).find("td:first input").val());
        selectedTasks.push($(row).find("td:nth-child(2)").text());
    });
    if (selectedIDs.length == "1") {
        var options = {
            "backdrop": "static",
            keyboard: true
        };
        var a = selectedTasks[0]
        //$('#PTask').val(a);
        var options = {
            "backdrop": "static",
            keyboard: true
        };
        $.ajax({
            type: "GET",
            url: "/Tasks/AddTaskCollaborators",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: { id: a, CalledFrom: "ManagePendingTasks" },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                } else {
                    debugger;
                    $('#myCollaborators').html(data);
                    $('#TaskCollaborators').modal(options);
                    $('#TaskCollaborators').modal('show');
                }
            },
            error: function () {
                $('#NoRow').modal(options);
                var Mtitle = "Select a Row";
                $('.modal-title').text(Mtitle);
                $('#NoRow').modal('show');
            }
        });

    }
}

function subtask() {
    var selectedIDs = [];

    $("#example tr.highlight").each(function (index, row) {
        selectedIDs.push($(row).find("td:nth-child(2)").text());
    });
    if (selectedIDs.length == "1") {
        var a = selectedIDs[0]
        location.href = '/Tasks/CRMSubTasksForm?id=' + a;
    }
}


$(document).ready(function () {
   // sessionStorage.clear();
    ////filter list filling logic
    //var d = $("#type2").val();
    //var m = [];
    //m = d.split("|");
    //var l;
    //for (i = 0; i <= m.length - 1; i = i + 1) {
    //    l = m[i].split("~");
    //    $('#filter').append($('<option>', { value: l[1] + ":" + l[2], text: l[0] }));
    //};
    var a = 1;
    var SelectedRows = "";

    setBasicFilterUIOnPageReload();

    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem(regPageSizeKey);
    if (t == null) { t = 50 }
    var SelectedRows = "";
    GetEmployeeData(a, 1, t, "F");
    //sessionStorage.setItem("search", null);
    /*$("#example tbody tr").remove();*/

    //$('#example').on('click', "input[type='checkbox']", function () {
    //    var t = $(this).parent().parent();
    //    if ($(this).prop("checked") == true) {
    //        if ($(t).hasClass('highlight')) {
    //            $(t).removeClass('highlight');
    //        }
    //        else {
    //            var row = $('#example tr.highlight').find("td:first input");
    //            if ($(row).prop("checked") == true) {
    //                $(row).prop("checked", false);
    //            }
    //            $('#example tr.highlight').removeClass('highlight');
    //            $(t).addClass('highlight');
    //        }
    //    }
    //    else if ($(this).prop("checked") == false) {
    //        var t = $(this).parent().parent();
    //        $(t).removeClass('highlight');
    //    }
       
    //})

    $("#EmployeeFile").submit(function () {
        $('#EmployeeTasks').modal('hide');
        if ($("#EmployeeId").val() != 0) {
            var empName = $("#EmployeeId option:selected").text();
            $("tbody").empty();
            $("#loading").show();
            $('#loadingmessage').show();
            $.ajax({
                url: '/Tasks/EmployeeFile',
                type: "POST",
                data: { empId: $("#EmployeeId").val() },
                success: function (data) {
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    } else {
                        loadData(data);
                        $("#fText").text(empName);
                        $("#FilterText").show();
                    }
                },
                error: function (data) {
                    alert("Failed");
                }

            });
        }
        return false;
    });

    $('#example').on('click', 'tr', function () {
        if (event.target.type !== 'checkbox') {
            $(':checkbox', this).trigger('click');
        }
        var s = $(this);
        var rowData = s[0].id;
        document.getElementById("grid1").value = rowData;
    });

    //$("#filter").on("change", function () {
    //    var a = $("#filter").val();
    //    if (a != "0") { $("#TextC").css("display", ""); }
    //    else { $("#TextC").css("display", "none"); }
    //});
    var counter = 0;
    //$("#Prev").on("click", function () {
    //    var key = $("#example").find('tr:nth-child(1) td:first input').val();
    //    var fullname = $("#example").find('tr:last td:nth-child(2)').text();
    //    var a = sessionStorage.getItem("PageSize");
    //    var b = sessionStorage.getItem("search");
    //    var d = sessionStorage.getItem("start");
    //    var o = sessionStorage.getItem("order");
    //    if (o != undefined && o != "null") {
    //        order = o.split(":");
    //        var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
    //        ordervalue = $(orderid).text();
    //        o = order[1] + "~" + ordervalue + "~" + order[2];
    //        JSON.stringify(o);
    //    }
    //    if (a != null) { d = (d - a) - 1; } else { d = (d - 20) - 1; }
    //    $("#example tbody tr").remove();
    //    $('#loading').show();
    //    $('#loadingmessage').show();
    //    $('#Msg').hide();
    //    if (key != 1) {
    //        $.post('/Tasks/AjaxPendingTasks', { id: key, start: d, pSize: a, direction: "R", search: b, order: o, ServerOrderValue: fullname }, function (data) {
    //            loadData(data);
    //        })
    //    }
    //});
    //$("#Next").on("click", function () {
    //    var b = sessionStorage.getItem("Total");
    //    var fullname = $("#example").find('tr:last td:nth-child(2)').text();
    //    var key = $("#example").find('tr:last td:first input').val();
    //    var a = sessionStorage.getItem("PageSize");
    //    var c = sessionStorage.getItem("search");
    //    var d = sessionStorage.getItem("start");
    //    var o = sessionStorage.getItem("order");
    //    if (o != undefined && o != "null") {
    //        order = o.split(":");
    //        var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
    //        ordervalue = $(orderid).text();
    //        o = order[1] + "~" + ordervalue + "~" + order[2];
    //        JSON.stringify(o);
    //    }
    //    if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 20 - 1; }
    //    $("#example tbody tr").remove();
    //    $('#loading').show();
    //    $('#loadingmessage').show();
    //    $('#Msg').hide();
    //    if (key != b) {
    //        //$.post('/Task/AjaxContactsData', { id: key, start: d, pSize: a, direction: "F", search: c, order: o, ServerOrderValue: fullname }, function (data) {
    //        //    loadData(data);
    //        //})
    //    }
    //});


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
            //$.post('/CRM/AjaxPendingTasks', { id: 1, start: 1, pSize: a, direction: "F", search: search, order: o }, function (data) {
            //    loadData(data);
            //})
        }
    });

    $(function () {
        $(".btn-Remark").click(function () {
            var $buttonClicked = $(this);
            var options = {
                "backdrop": "static",
                keyboard: true
            };
            $.ajax({
                type: "GET",
                url: "/Tasks/AddTasksRemark",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                data: { id: $("#grid1").val(), CalledFrom: "ManagePendingTasks" },
                success: function (data) {
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    else {
                        debugger;
                        $('#myRemark').html(data);
                        $('#Remark').modal(options);
                        $('#Remark').modal('show');
                    }
                },
                error: function () {
                    $('#NoRow').modal(options);
                    var Mtitle = "Select a Row";
                    $('.modal-title').text(Mtitle);
                    $('#NoRow').modal('show');
                }
            });
        });
        $(".btn-Upload").click(function () {
            var options = {
                "backdrop": "static",
                keyboard: true
            };
            $('#UploadProject').modal(options);
            $('#UploadProject').modal('show');
        });
    });
    $('a').tooltip();

    function GetEmployeeData(pageNumber, start, PSize, dir) {
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

        $('#loading').show();
        $('#loadingmessage').show();
        $.post('/Tasks/AjaxTaskFileData', { id: pageNumber, start: start, pSize: PSize, direction: dir, search: search, order: order }, function (data) {
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
});


function removeFilter() {
    removeBasicAdvanceFilter();
    ReloadGrid()
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
    var str = sessionStorage.getItem(basicFilterStrKey);
    var search = sessionStorage.getItem(searchKey);
    if (search !== null && search != "") {
        if (str !== null && str != "") {
            var FiltersArr = str.split("!");
            for (var i = 0; i < FiltersArr.length; i++) {
                var arr = FiltersArr[i].split("~");
                if (arr.length > 1) {
                    var tr = "#basicFilterTable tr" + arr[0];
                    var controls = arr[1].split("|");
                    for (var j = 0; j < controls.length; j++) {
                        $(tr + " .basicFilterChk").prop("checked", true);
                        $(tr).addClass("basicFilterSeleted");
                        var ctrl = controls[j].split(":");
                        var type = $(tr + " " + ctrl[0]).prop("type");
                        if (type == "select-multiple") {
                            var valArr = ctrl[1].split(",");
                            $(tr + " " + ctrl[0]).val(valArr);
                        }
                        else {
                            $(tr + " " + ctrl[0]).val(ctrl[1]);
                        }

                    }
                }
            }
            $(".selectpicker").selectpicker('referesh');

        }
    }

}


//function removeFilter() {
// $("tbody").empty();
//    $("#loading").show();
//   $("#loadingmessage").show();
//    $("#FilterText").hide();
//    $("#fText").text("");

//    $.post('/Tasks/AjaxTaskFileData', { id: 1, start: 1, pSize: 20, direction: 'F' }, function (data) {
//        sessionStorage.setItem("Total", data.recordsTotal);
//        loadData(data);
//        $("#FilterText").hide();
//         $("#fText").text("");
//    });
//}


//Laveena Starts
//Code for context menu
//$.contextMenu({
//    selector: '#example tr',
//    build: function ($trigger) {
//        var options = {
//            callback: function (key, options) {
//                //var m = "clicked: " + key + options.$trigger[0].cells[0].children[0].childNodes[0].id + "" + options.$trigger[0].cells[3].textContent;
//                var Rowid = options.$trigger[0].id;
//                //window.console && console.log(m) || alert(m);
//                switch (key) {
//                    case "SubmittedBy":
//                        var options = {
//                            "backdrop": "static",
//                            keyboard: true
//                        };
//                        $('#EmployeeTasks').modal(options);
//                        $('#EmployeeTasks').modal('show');
//                        break;
//                }
//            },
//            items: {},
//        }


//        if ($trigger.hasClass('clickable')) {
//            if ($("#Logintype").val() == "Manager") {


//                options.items.TeamFilter = {
//                    name: "Team Filter", icon: "fa-th-list",
//                    "items": {
//                        "SubmittedBy": { name: "Uploaded By", icon: "fa-calendar-plus-o" },
//                    }
//                }
//            } else {

//            }

//        }
//        else {

//        }
//        return options;
//    }

//});
//$('#example tr').on('click', function (e) {

//    console.log('clicked', this);
//})


//$('#example').on('contextmenu', 'tr', function (e) {
//    if ($(this).hasClass('highlight')) {
//    }
//    else {
//        var row = table.$('tr.highlight').find("td:first input");
//        if ($(row).prop("checked") == true) {
//            $(row).prop("checked", false);
//        }
//        table.$('tr.highlight').removeClass('highlight');
//        $(this).addClass('highlight');
//        $(this).find("td:first input").prop("checked", true);

//    }
//});




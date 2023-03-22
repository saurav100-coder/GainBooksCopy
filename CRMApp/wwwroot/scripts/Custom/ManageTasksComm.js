var options = { "backdrop": "static", keyboard: true };
var crmCommKey = 0;

//this is a sessionStorageKey for Search
var searchKey = "searchTasksComm";
//this is a sessionStorageKey for order
var orderKey = "orderTasksComm";
//this is a sessionStorageKey for search Criteria div value
var searchMsgKey = "searchMsgTasksComm";
//this is a sessionStorageKey for basicFilter UI consistency on Page Reload
var basicFilterStrKey = "basicFilterStrTasksComm";

function searchRemarkBy() {
    var remarkBy = $("#remarkByFilter").val();
    if (remarkBy.length == 0) {
        setSearchSessionStorage("");
        setSearchMsgSessionStorage("");
        ReloadGrid();
    }
    else {
        let search = remarkBy + ",accmaster.accname:string";
        setSearchSessionStorage(search);
        let searchMsg = "Search Results: RemarkBy <span class='' style='font-weight: 600'>'" + remarkBy + "'</span>";
        setSearchMsgSessionStorage(searchMsg);
        ReloadGrid();
    }

}


//Basic filter multiple
function SubmitBasicFilter(search, searchMsg) {
    var pSize = sessionStorage.getItem("PageSize");
    $("#examples tbody tr").remove();
    $("#examples tbody .tagDiv").remove();
    $("#examples tbody ").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();

    $.ajax({
        url: '/Tasks/ajaxManageTasksComm',
        type: "POST",
        data: { id: 0, start: 0, pSize: pSize, search: search },
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


//Point to selected remark 
function pointToRemark(remarkDivId) {
    $(".RemarkHistoryItem#" + remarkDivId + "").css("border", "solid 1px black");
    var container = $('.tabs-stageWeb');
    var scrollTo = $("#" + remarkDivId + "");
    var position = scrollTo.offset().top - container.offset().top + container.scrollTop();
    container.animate({
        scrollTop: position
    });

    var containerOuter = $('.right');
    var scrollToOuter = $('.tabs-stageWeb');
    var positionOuter = scrollToOuter.offset().top - containerOuter.offset().top +  containerOuter.scrollTop();
    containerOuter.animate({
        scrollTop: positionOuter
    });
}

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
            } else if (b[0] == 3 || b[0] == 5 || b[0] == 8) {
                $("#TextC").css("display", "");
            } else if (b[0] == 6) {
                var a = document.getElementById("StatusC")
                a.style.display = "";
            }
            else if (b[0] == 7) {
                var a = document.getElementById("remarkByC")
                a.style.display = "";
            }
            else if (b[0] == 9) {
                var a = document.getElementById("tagsC")
                a.style.display = "";
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
        $("#examples tbody tr").remove();
        $("#examples tbody .tagDiv").remove();

        $("#examples tbody").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d >= 0) {
            $.post('/Tasks/ajaxManageTasksComm', {id:0, start: d, pSize: a, search: b, order: o }, function (data) {
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

        var o = sessionStorage.getItem("order");

        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 50 - 1; }
        $("#examples tbody tr").remove();
        $("#examples tbody .tagDiv").remove();
        $("#examples tbody").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/Tasks/ajaxManageTasksComm', {id:0, start: d, pSize: a, search: c, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });


    

    $("#StatusFilter").on("change", function () {
        var text = $("#StatusFilter option:selected").text();
        var value = $("#StatusFilter").val();
        //var col = "m1.Taskstatus";
        var col = "m2.Taskstatus";
        var search = value + "," + col + ":integer";
        $(".filterclose").show();
        JSON.stringify(search);
        //sessionStorage.setItem("search", search);
        var searchMsg = "Search Results: Tasks Status <span class='' style='font-weight: 600'>'" + text + "'</span>";
        var basicFilterStr = $("#filter").val() + "~#StatusFilter:" + value;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem("PageSize");
        $("#examples tbody tr").remove();
        $("#examples tbody .tagDiv").remove();
        $("#examples tbody").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Tasks/ajaxManageTasksComm',
            type: "POST",
            data: {id:0, start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $("#fText").text(text);
                    //$(".resultDiv .result-msg").html("<p>Search Results: Tasks Status <span class='' style='font-weight: 600'>'" + text + "'</span></p> ");
                    $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p> ");
                    $(".resultDiv").show();
                    sessionStorage.setItem("Total", data.recordsTotal);
                    loadData(data);
                }
            },
            error: function (data) {
                alert("Failed");
            }
        });
    });


    $("#RemarkBy").on("change", function () {
        var text = $("#RemarkBy option:selected").text();
        var value = $("#RemarkBy").val();
        //var col = "CRMCommunication.logincode";
        var col = "m1.logincode";
        var search = value + "," + col + ":integer";
        $(".filterclose").show();
        JSON.stringify(search);
        //sessionStorage.setItem("search", search);
        var searchMsg = "Search Results: Remark by <span class='' style='font-weight: 600'>'" + text + "'</span>";
        var basicFilterStr = $("#filter").val() + "~#RemarkBy:" + value;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem("PageSize");
        $("#examples tbody tr").remove();
        $("#examples tbody .tagDiv").remove();
        $("#examples tbody").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Tasks/ajaxManageTasksComm',
            type: "POST",
            data: { id: 0, start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                } else {
                    $("#fText").text(text);
                    //$(".resultDiv .result-msg").html("<p>Search Results: Remark by <span class='' style='font-weight: 600'>'" + text +"'</span></p>");
                    $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p> ");
                    $(".resultDiv").show();
                    sessionStorage.setItem("Total", data.recordsTotal);
                    loadData(data);
                }
            },
            error: function (data) {
                alert("Failed");
            }
        });
    });


    $('#Tags').on('changed.bs.select', function () {
        var value = $("#Tags").val();
        if (value.length > 0) {
            $("#btnTagSearch").show()
        }
        else {
            $("#btnTagSearch").hide()
        }

    });
});




function showEditHistoryTab() {
    if ($("#taskeditTab #allActivity").children().length == 0) {
        var taskid = $(".editSection #taskid").text();
        LoadEditHistory(taskid)
    }

}

function LoadEditHistory(TaskPid) {
    $("#taskeditTab #boxLoading #boxLoadingMessage").show();
    $("#taskeditTab #allActivity").hide();
    $.ajax({
        type: "POST",
        url: "/Tasks/GetTaskActivityLog",
        data: { taskId: TaskPid },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            var a = 1;
            var finalDestination = $("#taskeditTab #allActivity")
            finalDestination.empty();
            $.each(data.data, function (index, item) {
                var m = (a) + index;
                //Load Data
                var html = '<div class="EditHistoryItem col-sm-12 HistoryItem" id="' + item.SrNo + '">'
                    + '<div class="line1 ">  <span class="">' + m + '</span>'
                if (item.ActivityType.toLowerCase() == "remark") {
                    html += '<div class=""><i class="fa fa-comment"></i></div>'
                         + '<div style="" class="text">' + item.Text + '</div></div>'
                }
                else if (item.ActivityType.toLowerCase() == "document") {
                    var arr = item.Text.split(":");

                    html += '<div class=""><i class="fa fa-file-o"></i></div>'
                         + '<div style="">' + arr[0] + ': <a style="cursor:pointer" onClick="downloadRemarkFile(\'' + $.trim(arr[1]) + '\',\'' + $.trim(arr[2]) + '\')"  class="filenam">' + arr[1] + '</a></div></div>'
                    //<a style="cursor:pointer" onClick="downloadRemarkFile(\'' + $.trim(item.FileName) + '\',\'' + item.LinkURL + '\')"  class="filenam">' + item.FileName + '</a>
                }
                else if (item.ActivityType.toLowerCase() == "collaborator") {
                    html += '<div class=""><i class="fa fa-user"></i></div>'
                        + '<div style="" class="text">' + item.Text + '</div></div>'
                }
                else if (item.ActivityType.toLowerCase() == "edit") {
                    html += '<div class=""><i class="fa fa-pencil-square-o"></i></div>'
                        + '<div style="" class="text">' + item.Text + '</div></div>'
                }

                //html +='<div style="">' + item.Text + '</div></div>'
                html += '<div class="line2"><span class="Remarkuser"><i class="" aria-hidden="true" ></i></span><span class="Remarkdate" style="float:right;"><img src="/images/calender.png">' + item.FrmDateTime + '</span></div>';

                var remarkDiv = $(html);

                finalDestination.append(remarkDiv);
                $("#taskeditTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            });
            if (data.recordsTotal == 0) {
                var NothingDiv = $('<div class="EditHistoryItem" style="padding-bottom:8px;"><div class="line1"><span>No Edit history here</span> </div></div>');
                finalDestination.append(NothingDiv);
                $("#taskeditTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            }
        },
        error: function () {
            var NothingDiv = $('<div class="EditHistoryItem" style="padding-bottom:8px;"><div class="line1"><span>No Edit history here</span> </div></div>');
            $("#taskeditTab #allActivity").append(NothingDiv);
            $("#taskeditTab #boxLoading #boxLoadingMessage").hide();
            $("#taskeditTab #allActivity").show();
        }
    });
}




function ReloadGrid() {
    //removeFilter();
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 50 }
    GetEmployeeData(1, 0, 50);
    $("#fText").text("");
    $("#FilterText").hide();
    $(".left").removeClass("move");
    $(".h").show();
    $(".right").css('display', 'none');
}

function tagSearch() {
    var text = $("#Tags option:selected").map(function () { return $(this).text(); }).get().join(",");
    var value = $("#Tags").val();
    var col = "m3.tagkey";
    var search = value + "," + col + ":integer";
    $(".filterclose").show();
    JSON.stringify(search);
    var searchMsg = "Search Results: Tags <span class='' style='font-weight: 600'>'" + text + "'</span>";
    //sessionStorage.setItem("search", search);
    var basicFilterStr = $("#filter").val() + "~#Tags:" + value;
    setSearchSessionStorage(search);
    setSearchMsgSessionStorage(searchMsg);
    setBasicFilterStrSessionStorage(basicFilterStr);
    var pSize = sessionStorage.getItem("PageSize");
    $("#examples tbody tr").remove();
    $("#examples tbody .tagDiv").remove();
    $("#examples tbody ").height(0);
    $("#loading").show();
    $('#loadingmessage').show();

    $.ajax({
        url: '/Tasks/ajaxManageTasksComm',
        type: "POST",
        data: { id: 0, start: 0, pSize: pSize, search: search },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                $("#fText").text(text);
                $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p> ")
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

function removeFilter() {
    //$(".filterDiv").css("display", "none")
    //$("#StatusFilter").val(0);
    //$("#RemarkBy").val(0);
    //$("#filter").val(0);
    //$("#filterText").val("");
    //$("#dateC #min").val("");
    //$("#dateC #max").val("");
    //$(".filterclose").hide();
    ////sessionStorage.setItem("search", "");
    ////sessionStorage.setItem("order", "");
    //setSearchSessionStorage("");
    //setOrderSessionStorage("");
    //$(".resultDiv .result-msg").html("");
    //$(".resultDiv").hide();
    removeBasicAdvanceFilter();
    ReloadGrid()
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

    $("#examples tbody tr").remove();
    $("#examples tbody .tagDiv").remove();
    $("#examples tbody ").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $.ajax({
        type: "POST",
        url: "/Tasks/ajaxManageTasksComm",
        data: { id: 0, start: start, pSize: PSize, search: search, order: order },
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
    $("#side").removeClass("test")
    var tblEmployee = $("#examples tbody");
    $("#examples tbody tr").remove();
    $("#examples tbody .tagDiv").remove();
    $("#examples tbody ").height(0);
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
    $("#RightShift").click();


    $.each(data.data, function (index, item) {
        if (item.statusCode == 500) {
            window.location.href = "/Home/Error";
        }
        var m = parseInt(a) + index;

        //if (item.Tags != "") {
        //    var tagsRow = $("<div id='trtags-" + item.CRMTasks_Key + "' class='col-md-12 tagDiv' style='width: 400px;background-color: gainsboro;padding-bottom: 6px;padding-top: 6px;text-align: start;border-radius: 5px;color: black;'><b>Tags: &nbsp;</b>" + item.Tags + "</div>");
        //    tblEmployee.append(tagsRow);
        //}

        var tr = $("<tr class='clickable u maindiv' id='" + item.CRMTasks_Key + "' style='border:none; height:auto;  color: #3c8dbc;'></tr>");
        tr.html(("<td class='selectValue basicTr' style='width:5%;'>" + m + "</td>")
            + ("<td class='TaskIdValue basicTr' style='width:6%; text-align:left;'>" + item.P_CRMTasks + "</td>")
            + ("<td class='DateValue basicTr' style='width:9%; text-align:left;'>" + item.FrmtCreationDate + "</td>")
            + " " + ("<td class='combineCol' style='width:25%;padding-right: 7px;'>" + "<div class='Tasktitle td titlemanage basicTr clampTr'>" + item.TaskTitle + " </div>" + "<div class='Taskdescription td basicTr clampTr' style='font-size: 13px !important;'>Desc - <span>" + item.TaskDescription + "</span></div></td>")
            //+ ("<td class='TaskTitleValue basicTr' style='width:20%;'>" + item.TaskTitle + "</td>")
            + ("<td class='RemarkValue basicTr ' style='width:21%; padding-right:10px;'><div class='DivforHeight basicTr clamptr'>" + item.Commtext + "</div></td>")
            //+ ("<td class='TaskDescriptionValue basicTr clamptr' style='width:20%;'>" + item.TaskDescription + "</td>")
            + ("<td class='RemakByValue basicTr' style='width:10%; text-align:left; padding:0 5px;'>" + item.TextLogincode + "</td>")
            + " " + ("<td class='TaskTags td h basicTr clampTr' style='width:13%;padding-left:12px; font-size:13px !important; text-align:left;'>" + item.Tags + "</td>")
            + ("<td class='FileValue h clamptr' style='width:10%; word-wrap:break-word;text-align:left;'><a style='cursor:pointer; font-size:12px; font-weight:700;' onClick='downloadRemarkFile(\"" + $.trim(item.FileName) + "\",\"" + item.LinkURL + "\")' download>" + item.FileName + "</a></td>")
            + ("<td class='crmCommKey' style='display:none'>" + item.CRMCommunication_key + "</td>"));
        tblEmployee.append(tr);
    })
    if (data.recordsTotal == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $('#loading').addClass('clickable');
        $("#examples tbody").height(0);
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
        Deviceheight();
        DetailPaneHeight();
    }
    

    $('#examples').on('click', '.u', function () {
        $("tr").removeClass("style");
        var isSomethingTrue = true;
        if (isSomethingTrue && ($(window).width() >= 600)) {
            //var lastChkbox = $(".maindiv.rowActive").find(".checkboxall")[0];
            //if (lastChkbox !== undefined) {
            //    $(lastChkbox).attr("checked", false);
            //    chkCheckUncheck(lastChkbox);
            //}

            $(".maindiv").removeClass("rowActive");
            $(this).addClass("rowActive")
            $(this).addClass("style");
            $(".right").css("display","flex")
            $(".left").addClass("move");
            $(".h").hide();
            $(".select").addClass("s")
            $(".TaskId").addClass("i")
            $(".Date").addClass("d")
            $(".Title").addClass("t")
            $(".Remark").addClass("r")
            $(".RemarkBy").addClass("b")
            $(".selectValue").addClass("sv")
            $(".TaskIdValue").addClass("iv")
            $(".DateValue").addClass("dv")
            $(".combineCol").addClass("tv")
            $(".RemarkValue").addClass("rv")
            $(".RemakByValue").addClass("bv")


            Deviceheight();
            DetailPaneHeight();
            var $row = $(this).closest("tr");
            var $taskid = $row.find(".TaskIdValue").text();
            crmCommKey = $row.find(".crmCommKey").text();
            GetTaskData($taskid);
        }
        else if (isSomethingTrue && ($(window).width() <= 600)) {
            //$("#dropdown").addClass("setStyle");
            $(this).addClass("style");
            $(".right").css("display", "flex")
            $(".right").addClass("mobileDetailPane");
            $(".left").hide();
            Deviceheight();
            var $row = $(this).closest("tr");
            var $taskid = $row.find(".TaskIdValue").text();
            crmCommKey = $row.find(".crmCommKey").text();
            GetTaskData($taskid);
        }

    });

    $(document).ready(function () {

        $("nav").find(".newTitle").remove();
        //var s = "<p class='newTitle' >Task Communications</p>";
        var s = "<p class='newTitle' >Task Progress Notes</p>";
        $("nav").find(".titleName").append(s);

        $('.right').on('click', '#RightShift', function () {

        var isSomethingTrue = true;
        if (isSomethingTrue) {
            Deviceheight();
            var lastChkbox = $(".maindiv.rowActive").find(".checkboxall")[0];
            if (lastChkbox !== undefined) {
                $(lastChkbox).attr("checked", false);
                chkCheckUncheck(lastChkbox);
            }

            $(".maindiv").removeClass("rowActive");
            $("#dropdown").removeClass("setStyle");
            $(".right").hide();
            $(".left").show();
            $(".left").removeClass("move");
            $(".h").show();
            $(".right").css('display', 'none');
            $(".select").removeClass("s")
            $(".TaskId").removeClass("i")
            $(".Date").removeClass("d")
            $(".Title").removeClass("t")
            $(".Remark").removeClass("r")
            $(".RemarkBy").removeClass("b")
            $(".selectValue").removeClass("sv")
            $(".TaskIdValue").removeClass("iv")
            $(".DateValue").removeClass("dv")
            $(".combineCol").removeClass("tv")
            $(".RemarkValue").removeClass("rv")
            $(".RemakByValue").removeClass("bv")

        }

    });
    });
    $(document).ready(function () {
        $('.tabs-navWeb a').on('click', function (event) {
            event.preventDefault();

            $('.tab-activeWeb').removeClass('tab-activeWeb');
            $(this).parent().addClass('tab-activeWeb');
            $('.tabs-stageWeb .div').hide();
            $('.tabs-stageWeb').find($(this).attr('href')).show();
        });

        $('.tabs-navWeb a:first').trigger('click'); // Default

        $('.tabs-nav a').on('click', function (event) {
            event.preventDefault();

            $('.tab-active').removeClass('tab-active');
            $(this).parent().addClass('tab-active');
            $('.tabs-stage .div').hide();

            $('.tabs-stage').find($(this).attr('href')).show();
        });

        $('.tabs-nav a:first').trigger('click'); // Default


        $('.ShareBox button').click(function () {
            $(this).prev("input").focus();
            $(this).prev("input").select();

            document.execCommand('copy');

        });

    });
}


function Deviceheight() {
    var h = $(".content-wrapper").css("min-height")
    $("#examples tbody").height(h);
    //var sidebarposition = side.getBoundingClientRect();
    //$("#examples tbody").height(sidebarposition.height - 90)
    //var Header = $("header").outerHeight(true);
    //var icondiv = $(".calHeightIcon").outerHeight(true);
    //var Footer = $(".main-footer").outerHeight(true);
    //var windowHeight = $(window).outerHeight(true);
    //var SumOfElementHeight = Header + icondiv + Footer;
    //var MainHeight = windowHeight - SumOfElementHeight-25;
    //$("#examples tbody").height(MainHeight);
}

function DetailPaneHeight() {
    //var Header = $("header").outerHeight(true);
    //var Footer = $(".main-footer").outerHeight();
    //var windowHeight = $(window).outerHeight(true);
    //var SumOfElementHeight = Header  + Footer;
    //var MainHeight = windowHeight - SumOfElementHeight - 15;
    //$(".right").height(MainHeight);
    var h = $(".content-wrapper").css("min-height")
    $(".right").height(h + 30);
}

//Table height will change according to Sidebar height

var Sidebar = $(".sidebar")[0];
var resizeObserver = new ResizeObserver((event) => {
    var h = $(".content-wrapper").css("min-height")
    $("#examples tbody").height(h);
    $(".right").height(h + 30)
    if ($(Sidebar).hasClass("test")) {
        $("#example").height(0)
    }
});
resizeObserver.observe(Sidebar);



//added by Rasika for purpose of responsiveness while switching from desktop view to mobile view

$(document).ready(function () {
    function resizewidth() {
        if ($(window).width() >= 600) {
            if ($(".right").css('display') != 'none') {
                $(".left").addClass("move");
                $(".left").show();
                $(".right").css("display","flex")
                $(".right").removeClass("mobileDetailPane");
            }
            else {
                $(".left").show();
                $(".right").hide();
            }
        }

        if ($(window).width() <= 600) {
           if ($(".right").css('display') != 'none') {
                $(".left").hide();
                $(".right").addClass("mobileDetailPane");
            }
            else {
                $(".left").show();
                $(".right").hide();
                $(".right").removeClass("mobileDetailPane");
            }

        }
    }

    $(window).resize(function () {
        resizewidth();
        Deviceheight();
        DetailPaneHeight();
   });


});
// End Of Function

$(document).ready(function () {
    $(window).resize(function () {
        Deviceheight();
        DetailPaneHeight();
    });
});

function DoSearch() {
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
            //col = "m1.TaskTitle";
            col = "m2.TaskTitle";
            search = ValueToSearch + "," + col + ":String";
            searchMsg = "Search Results: Task Title <span class='' style='font-weight: 600'> '" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        if (filter[0] == 8) {
            value = $("#filterText").val();
            //col = "m1.p_crmtasks";
            col = "m2.p_crmtasks";
            search = ValueToSearch + "," + col + ":Integer";
            searchMsg = "Search Results: TaskId <span class='' style='font-weight: 600'> '" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        if (filter[0] == 5) {
            value = $("#filterText").val();
            //col = "m1.TaskDescription";
            col = "m2.TaskDescription";
            search = ValueToSearch + "," + col + ":String";
            searchMsg = "Search Results: Task Description <span class='' style='font-weight: 600'> '" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        $(".filterclose").show();
        JSON.stringify(search);
        //sessionStorage.setItem("search", search);
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);

        var pSize = sessionStorage.getItem("PageSize");
        $("#examples tbody tr").remove();
        $("#examples tbody .tagDiv").remove();
        $("#examples tbody").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Tasks/ajaxManageTasksComm',
            type: "POST",
            data: {id:0, start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
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
    //col = "crmcommunication.creationdate";
    col = "m1.creationdate";
    search = value1 + "," + value2 + "," + col + ":Date";
    var searchMsg = "Search Results: Date From <span class='' style='font-weight: 600'>'" + value1 + "'</span> To <span class='' style='font-weight: 600'>'" + value2 + "'</span>";
    $(".filterclose").show();
    $(".filterclose").addClass("DatesMargin");
    JSON.stringify(search);
    //sessionStorage.setItem("search", search);
    var basicFilterStr = $("#filter").val() + "~#dateC #min:" + value1 + "|#dateC #max:" + value2;
    setSearchSessionStorage(search);
    setSearchMsgSessionStorage(searchMsg);
    setBasicFilterStrSessionStorage(basicFilterStr);
    var pSize = sessionStorage.getItem("PageSize");
    $("#examples tbody tr").remove();
    $("#examples tbody .tagDiv").remove();
    $("#examples tbody").height(0);
    $("#loading").show();
    $('#loadingmessage').show();

    $.ajax({
        url: '/Tasks/ajaxManageTasksComm',
        type: "POST",
        data: {id:0, start: 0, pSize: pSize, search: search },
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

function SubmitFilterSort(search, order, pSize, searchMsg) {
    $('#FilterModel').modal('hide');
    $("#examples tbody tr").remove();
    $("#examples tbody .tagDiv").remove();
    $("#examples tbody").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $.ajax({
        url: '/Tasks/ajaxManageTasksComm',
        type: "POST",
        data: {id:0, start: 0, pSize: pSize, search: search, order: order },
        success: function (data) {
            $(".filterclose").show();
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



//Added by aslam
function GetTaskData(taskid) {
    $("#detail-container").hide();
    $('#detail-loading').show();
    $('#detail-loadingmessage').show();
    $("#RemarkMessage").hide();
    $.post('/Tasks/AjaxTaskDetail', { Taskid: taskid }, function (data1) {
        if (data1 == "") {
            window.location.href = "/Home/Logout";
        }
        else {
            var data = JSON.parse(data1);
            LoadTaskData(data);
        }

    });
}

function LoadTaskData(data) {
    $.each(data, function (index, item) {
        $("#taskid").text(item.p_crmtasks);
        $("#taskkey").text(item.crmtasks_key);
        $("#tasktitle").text(item.tasktitle);
        $("#txttasktitle").val(item.tasktitle);
        $("#taskdescription").text(item.taskdescription);
        $("#txttaskdescription").val(item.taskdescription);
        $("#startdate").text(item.FrmtStartDate);
        $("#duedate").text(item.FrmtDueDate);
        $("#ddlAssignedto").val(item.assignedto);
        $("#assignedto").text(item.TextAssignedto);
        $("#ddlTaskStatus").val(item.taskstatus);
        $("#taskstatus").text(item.TextTaskStatus);
        $("#creadtedby").text(item.TextCreatedBy);
        if (item.under == 0) {
            $("#subtask").text("Main-Task")
        }
        else {
            $("#subtask").text("Sub-Task")
        }

        //if ($.trim(item.FrmtDueDate) != "") {
        //    var dateArr1 = item.FrmtDueDate.split(" ");
        //    var dateArr2 = dateArr1[0].split("/");
        //    var dtmduedate = dateArr2[2] + '-' + dateArr2[1] + '-' + dateArr2[0];
        //    $("#dtduedate").val(dtmduedate);
        //}
        //else {
        //    var crtDate = new Date();
        //    var month = (crtDate.getMonth() + 1) < 10 ? '0' + (crtDate.getMonth() + 1) : (crtDate.getMonth() + 1);
        //    var day = crtDate.getDate() < 10 ? '0' + crtDate.getDate() : crtDate.getDate();
        //    var dtmduedate = crtDate.getFullYear() + "-" + month + "-" + day;
        //    $("#dtduedate").val(dtmduedate);
        //}


        if ($.trim(item.FrmtDueDate) != "") {
            var dateArr1 = item.FrmtDueDate.split(" ");
            var dateArr2 = dateArr1[0].split("/");
            var dtmduedate = dateArr2[2] + '-' + dateArr2[1] + '-' + dateArr2[0] + "T" + dateArr1[1];
            $("#dtduedate").val(dtmduedate);
        }
        else {
            var crtDate = new Date();
            var month = (crtDate.getMonth() + 1) < 10 ? '0' + (crtDate.getMonth() + 1) : (crtDate.getMonth() + 1);
            var day = crtDate.getDate() < 10 ? '0' + crtDate.getDate() : crtDate.getDate();
            var hour = crtDate.getHours().toString().padStart(2, "0");
            var minute = crtDate.getMinutes().toString().padStart(2, "0");
            var dtmduedate = crtDate.getFullYear() + "-" + month + "-" + day+"T"+hour+":"+minute;
            $("#dtduedate").val(dtmduedate);
        }


        $(".RemarkMessage #Content").text("");
        $('.RemarkMessage').hide();

        $('#detail-loading').hide();
        $('#detail-loadingmessage').hide();
        $("#detail-container").show();
        
        $("#taskeditTab #allActivity").empty();
        $('.tabs-navWeb a:first').trigger('click'); // Default
        

        CancleEditTask();
        LoadRemarks(item.p_crmtasks);
        ShowCollaboratorsNew();
        ShowTagsNew();
    })

    

}
function chkCheckUncheck(ctrl) {
    if (ctrl.checked) {
        var index = chkvalesArr.indexOf($(ctrl).val());
        if (index == -1) {
            chkvalesArr.push($(ctrl).val());
        }

        $(ctrl).parent().addClass("rowChecked");
    }
    else {
        var index = chkvalesArr.indexOf($(ctrl).val());
        if (index > -1) {
            chkvalesArr.splice(index, 1);
        }

        $(ctrl).parent().removeClass("rowChecked");
    }
}

//Show controls to edit task
function ShowEditTask() {
    //Hide
    $("#editIcon").hide();
    $("#tasktitle").hide();
    $("#taskdescription").hide();
    $("#duedate").hide();
    //$("#addSubTask").hide();
    $("#taskstatus").hide();
    $("#assignedto").hide();

    //Show
    $("#SaveTask").show();
    $("#CancleEdit").show();
    $("#txttasktitle").show();
    $("#txttaskdescription").show();
    $("#dtduedate").show();
    $("#ddlAssignedto").show();
    $("#ddlTaskStatus").show();
}

//Close Controls to edit task
function CancleEditTask() {
    //Show
    $("#editIcon").show();
    $("#tasktitle").show();
    $("#taskdescription").show();
    $("#duedate").show();
    //$("#addSubTask").show();
    $("#taskstatus").show();
    $("#assignedto").show();

    //Hide
    $("#SaveTask").hide();
    $("#CancleEdit").hide();
    $("#txttasktitle").hide();
    $("#txttaskdescription").hide();
    $("#dtduedate").hide();
    $("#ddlAssignedto").hide();
    $("#ddlTaskStatus").hide();
}

function ShowMsg(msg) {
    $(".RemarkMessage #Content").text(msg);
    $('.RemarkMessage').show();
    setTimeout(function () { $('.RemarkMessage').hide(); }, 7000)
}

function SubmitEditTask() {
    var formData = {
        P_CRMTasks: $("#taskid").text(),
        TaskTitle: $("#txttasktitle").val(),
        TaskDescription: $("#txttaskdescription").val(),
        duedate: $("#dtduedate").val(),
        Taskstatus: $("#ddlTaskStatus").val(),
        Assignedto: $("#ddlAssignedto").val()
    };

    $.ajax({
        type: "POST",
        url: "/Tasks/EditTask",
        data: formData,
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            if (data == "err-close") {
                ShowMsg("To close this task first close all subtasks of this task");
            }
            else if (data == "success") {
                ShowMsg("Edited Successfully");
                CancleEditTask();
                ReloadGrid();
                $("#dropdown").removeClass("setStyle");
                $(".left").removeClass("move");
            }
            else if (data == "err-try") {
                ShowMsg("An error occured while storing your Information .Please try again later");
            }
            else {
                ShowMsg("Error to edit task");

            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });

}

function SubmitTaskRemarkNew() {
    var formdata = new FormData();
    var remark = $("#frmRemarkRight #txtRemark").val();
    formdata.append('remark', remark);
    var taskId = $("#taskid").text();
    formdata.append('taskId', taskId);
    var file = $('#frmRemarkRight #remarkfile')[0].files[0];
    formdata.append('file1', file)
    if ($.trim(remark) != "" || typeof file !== "undefined") {
        //Creating an XMLHttpRequest and sending
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/Tasks/AddTasksRemark');
        xhr.send(formdata);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                ShowMsg("Remark added Successfully.");
                $("#frmRemarkRight #txtRemark").val("");
                $('#frmRemarkRight #remarkfile').val("");
                LoadRemarks($("#taskid").text());
            }
        }
    }
    else {
        ShowMsg("Please fill at lease one");
    }

    return false;
}

//Load Task Remarks
function LoadRemarks(TaskPid) {
    $("#remarkTab #boxLoading #boxLoadingMessage").show();
    $("#remarkTab #AllRemarks").hide();
    $.ajax({
        type: "POST",
        url: "/Tasks/AddTasksRemarkData",
        data: { taskId: TaskPid },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            var a = 1;
            var finalDestination = $("#remarkTab #AllRemarks")
            finalDestination.empty();
            $.each(data.data, function (index, item) {
                var m = (a) + index;
                //Load Data
                var html = '<div class="RemarkHistoryItem col-sm-12 HistoryItem" style="border:none !important"  id="' + item.CRMCommunication_key + '">'
                    + '<div class="line1"><span>' + m + '</span><div class="text">' + item.Commtext + '<span style="padding-right:0;"> (Id -</span> <span id="commid" style="padding-right:0;">' + item.CRMCommunication_key + '</span><span>)</span></div></div>'
                + '<div class="line2"><span class="Remarkuser"><img src="/images/profilemini.png"  />' + item.TextLogincode + '</span><span class="Remarkdate" style="float:right;"><img src="/images/calender.png"/>' + item.FrmtCreationDate + '</span></div>';
                if (item.FileName != "") {
                    html = html + '<div class="line3"><span class="upload">Uploaded File :</span><a style="cursor:pointer" onClick="downloadRemarkFile(\'' + $.trim(item.FileName) + '\',\'' + item.LinkURL + '\')"  class="filenam">' + item.FileName + '</a></div></div>';
                }
                var remarkDiv = $(html);

                finalDestination.append(remarkDiv);
                $(" #remarkTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();

            });
            if (data.recordsTotal == 0) {
                //var NothingDiv = $('<div class="RemarkHistoryItem col-sm-12" style="margin-bottom:12px; border-radius:5px; background-color:#f3f8fa; padding:10px;"><div class="line1"><span>No Remarks here</span> </div></div>');
                var NothingDiv = $('<div class="RemarkHistoryItem col-sm-12 HistoryItem"><div class="line1"><span>No Progress Notes here</span> </div></div>');
                finalDestination.append(NothingDiv);
                $(" #remarkTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            }

            //Special case only for ManageTaskCom page
            if (data.recordsTotal > 0 && crmCommKey > 0) {
                pointToRemark(crmCommKey);
            }
        },
        error: function () {
            //var NothingDiv = $('<div class="RemarkHistoryItem col-sm-12" style="margin-bottom:12px; border-radius:5px; background-color:#f3f8fa; padding:10px;"><div class="line1"><span>No Remarks here</span> </div></div>');
            var NothingDiv = $('<div class="RemarkHistoryItem col-sm-12 HistoryItem"><div class="line1"><span>No Progress Notes here</span> </div></div>');
            $(" #remarkTab #AllRemarks").append(NothingDiv);
            $(" #remarkTab #boxLoading #boxLoadingMessage").hide();
            $(" #remarkTab #AllRemarks").show();
        }
    });
}

function downloadRemarkFile(filename, filepath) {
    $.post('/Tasks/DownloadRemarkFile', { filename: filename, filepath: filepath }, function (data) {
        if (data == "") {
            window.location.href = "/Home/Logout";
        }
        else if (data == "err") {
            $('#TaskClosedContent').html('');
            $('#TaskClose').modal(options);
            $('#TaskClosedContent').html("<h3 class='text-center'>File not found</h3>");
            $('#TaskClose').modal("show");
            setTimeout(function () { $('#TaskClose').modal("hide"); }, 1000);
        }
        else {
            window.location.href = "/Tasks/DownloadFile?FullFilepath=" + data.FullFilepath + "&contentType=" + data.contentType + "&filename=" + data.filename
        }

    })
}

//Load Task Collaborators
function ShowCollaboratorsNew() {
    $(".SectionCollaborators #boxLoading #boxLoadingMessage").show();
    $(".SectionCollaborators #AllCollab").hide();
    var p_crmtasks = $("#taskid").text();
    $.ajax({
        type: "POST",
        url: "/Tasks/AddCollaboratorsData",
        data: { TaskId: p_crmtasks },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            $(".SectionCollaborators .boxx #AllCollab").empty();
            $.each(data.data, function (index, item) {
                var html = ' <div class="CollaboratorsBoxx" id="' + item.CRMCollaborator_key + '"><img img src="/images/profilemini.png" class="icon-image collabIcon" />'
                        + ' <span id="collaboratorName" class="text">' + item.TxtCollaborator + '</span>'
                        //+ ' <span class="closebn" id="' + item.CRMCollaborator_key + '" onclick="deleteCollaboratorNew(this.id)" >&times;</span></div>';
                    + '<img src="/images/icon-cancel.png" alt="Delete" class="deleteCollabIcon" id="' + item.CRMCollaborator_key + '" onclick="deleteCollaboratorNew(this.id)">';


                var collaboratorDiv = $(html);
                $(".SectionCollaborators .boxx #AllCollab").append(collaboratorDiv);
                $(".SectionCollaborators #boxLoading #boxLoadingMessage").hide();
                $(".SectionCollaborators #AllCollab").show();
            });

            if (data.recordsTotal == 0) {
                var NotingCollabDiv = $('<div class="CollaboratorsBoxx"><span id="collaboratorName" class="text">No Collaborators here</span></div>');
                $(".SectionCollaborators .boxx #AllCollab").append(NotingCollabDiv);
                $(".SectionCollaborators #boxLoading #boxLoadingMessage").hide();
                $(".SectionCollaborators #AllCollab").show();
            }
        },
        error: function () {
            var NotingCollabDiv = $('<div class="CollaboratorsBoxx"><span id="collaboratorName" class="text" >Error in loading data</span></div>');
            $(".SectionCollaborators .boxx #AllCollab").append(NotingCollabDiv);
            $(".SectionCollaborators #boxLoading #boxLoadingMessage").hide();
            $(".SectionCollaborators #AllCollab").show();
        }
    });

}

//Add new Task Collaborator
function SubmitCollaboratorsNew() {
    var TaskId = $("#taskid").text();
    var selectedCollaborator = $("#ddlCollab").val();
    var Taskkey = $("#taskkey").text();
    if (selectedCollaborator != 0) {
        $.ajax({
            type: "POST",
            url: "/Tasks/AddTaskCollaborators",
            data: { Taskid: TaskId, Taskkey: Taskkey, collaboratorId: selectedCollaborator },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                if (data == "Already Collborate") {
                    ShowMsg("Already a collaborator");
                    return true;
                }
                else if (data == "true") {
                    ShowMsg("Collaborator has been added Successfully.");
                    closeAddCollab();
                    ShowCollaboratorsNew();
                }
                else {
                    ShowMsg("An error occured while storing your Information .Please try again later.");
                }
            },
            error: function () {
                ShowMsg("An error occured while storing your Information .Please try again later.");
            }
        });
    }

}

//Show Controls to Add new Task Collaborator
function AddCollaboratorsNew() {
    $(".SectionCollaborators #AddCollab").hide();
    $(".SectionCollaborators #ddlCollab").show();
    $(".SectionCollaborators #closeAddCollab").show();
}

//Close Controls of Add new Task Collaborator
function closeAddCollab() {
    $(".SectionCollaborators #AddCollab").show();
    $(".SectionCollaborators #ddlCollab").val(0);
    $(".SectionCollaborators #ddlCollab").hide();
    $(".SectionCollaborators #closeAddCollab").hide();
}

//Delete Task Collaborators
function deleteCollaboratorNew(id) {
    $.ajax({
        type: "GET",
        url: "/Tasks/DeleteCollaborator",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        data: { id: id },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            ShowMsg("Collaborator deleted Successfully");
            ShowCollaboratorsNew();
        },
        error: function () {
            alert("error")
        }
    });
}



//Load Task Tags
function ShowTagsNew() {
    $(".task-classification #boxLoading #boxLoadingMessage").show();
    $(".task-classification #tag-container").hide();
    var p_crmtasks = $("#taskid").text();
    $.ajax({
        type: "POST",
        url: "/Tasks/ShowTagsData",
        data: { TaskId: p_crmtasks },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            $(".task-classification .boxx #tag-container").empty();
            $.each(data.data, function (index, item) {
                var html = ' <div class="TagsBoxx" id="' + item.tags_key + '">'
                    + ' <span id="TagName" class="text">' + item.txttagname + '</span>'
                    + ' <span id="' + item.p_tags + '" onclick="deleteTagsNew(this.id)"><img src="/images/icon-cancel.png" alt="Delete" class="tagDeleteIcon"></span></div>';
                
                var TagDiv = $(html);
                $(".task-classification .boxx #tag-container").append(TagDiv);
                $(".task-classification #boxLoading #boxLoadingMessage").hide();
                $(".task-classification #tag-container").show();
            });

            if (data.recordsTotal == 0) {
                var NotingCollabDiv = $('<div class="TagsBoxx"><span id="TagName" style="padding-left:10px; display: inline-flex; font-size: 13px; font-weight:300; color:black;">No Tags here</span></div>');
                $(".task-classification .boxx #tag-container").append(NotingCollabDiv);
                $(".task-classification #boxLoading #boxLoadingMessage").hide();
                $(".task-classification #tag-container").show();
            }
        },
        error: function () {
            var NotingCollabDiv = $('<div class="TagsBoxx"><span id="TagName" style="padding-left:10px; display: inline-flex; font-size: 13px; font-weight:300; color:black;">No Tags here</span></div>');
            $(".task-classification .boxx #tag-container").append(NotingCollabDiv);
            $(".task-classification #boxLoading #boxLoadingMessage").hide();
            $(".task-classification #tag-container").show();
        }
    });

}

//Delete Task Collaborators
function deleteTagsNew(p_tags) {
    $.ajax({
        type: "GET",
        url: "/Tasks/DeleteTag",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        data: { p_tags: p_tags },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            } else {
                ShowMsg("Tag deleted Successfully");
                ShowTagsNew();
            }
        },
        error: function () {
            alert("error")
        }
    });
}

//Add new Task Tag
function SubmitTagsNew() {
    var TaskId = $("#taskid").text();
    var selectedTag = $("#ddlTags").val();
    if (selectedTag != 0) {
        $.ajax({
            type: "POST",
            url: "/Tasks/AjaxAddTaskTags",
            data: { Taskid: TaskId, p_infotable: selectedTag },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                if (data == "Already Added") {
                    ShowMsg("This tag is already added");
                    return true;
                }
                else if (data == "true") {
                    ShowMsg("Tag has been added Successfully.");
                    closeTag();
                    ShowTagsNew();
                }
                else {
                    ShowMsg("An error occured while storing your Information .Please try again later.");
                }
            },
            error: function () {
                ShowMsg("An error occured while storing your Information .Please try again later.");
            }
        });
    }

}

//Show Controls to Add new Task Tag
function AddTagsNew() {
    $(".task-classification #PlusTag").hide();
    $(".task-classification #ddlTags").show();
    $(".task-classification #closeTag").show();
}

//Close Controls of Add new Task Tag
function closeTag() {
    $(".task-classification #PlusTag").show();
    $(".task-classification #ddlTags").val(0);
    $(".task-classification #ddlTags").hide();
    $(".task-classification #closeTag").hide();
}


//Show Confirmation PopUp modal before close a task
function ShowCloseTaskModal() {
    $("#TaskCloseModal").modal(options);
    $("#TaskCloseModal").modal("show");
}

//Close a task
function CloseTask() {
    var TaskKey = $("#taskkey").text();
    $("#TaskCloseModal").modal("hide");
    $.post('/Tasks/TaskClose', { id: TaskKey }, function (data) {
        if (data.statusCode == 500) {
            window.location.href = "/Home/Error";
        }
        if (data == "") {
            window.location.href = "/Home/LogOut";
            return true;
        }
        else if (data == "HasSubTask") {
            ShowMsg("This task contains Subtasks. Please close them first");
            return false;
        }
        else if (data == "true") {
            ShowMsg("Task Closed Successfully");
            var p_crmtasks = $("#taskid").text();
            GetTaskData(p_crmtasks);
            return false;
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

//function setBasicFilterUIOnPageReload() {
//    var str = sessionStorage.getItem(basicFilterStrKey);
//    var search = sessionStorage.getItem(searchKey);
//    if (search !== null && search != "") {
//        if (str !== null && str != "") {
//            if (str.toLowerCase() == "mytasks") {
//                $(".filterclose").show();
//            }
//            else if (str.toLowerCase() == "teamemptasks") {

//            }
//            else {
//                var arr = str.split("~");
//                $("#filter").val(arr[0]).trigger('change');
//                var controls = arr[1].split("|");
//                for (var i = 0; i < controls.length; i++) {
//                    var ctrl = controls[i].split(":");
//                    //setFilterControlValueOnPageReload(ctrl[0],ctrl[1]);
//                    var type = $(ctrl[0]).prop("type");
//                    if (type == "select-multiple") {
//                        var valArr = ctrl[1].split(",");
//                        $(ctrl[0]).val(valArr);
//                        $("#btnTagSearch").show()
//                    }
//                    else {
//                        $(ctrl[0]).val(ctrl[1]);
//                    }

//                }
//                $(".filterclose").show();
//            }


//        }
//    }

//}

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
                        var type = $(tr + " " + ctrl[0]).attr("data-type");
                        if (type == "select-multiple") {
                            console.log("setValues :" + tr + " " + ctrl[0]);
                            var valArr = ctrl[1].split(",");
                            var idArr = ctrl[0].split("#");
                            var id = idArr[1];
                            SetValue(valArr, id, tr);
                        }
                        else {
                            $(tr + " " + ctrl[0]).val(ctrl[1]);
                        }

                    }
                }
            }
        }
    }

}



function progressdata() {
    $(".editSectiondata").hide();
    $(".SectionCollaborators").hide();
    $(".task-classification").hide();
    $(".AddRemarkDetailView").show();
    $(".tabSection").show();
    $(".AddRemarkDetailView").show();
    $("#list1").show();
    $("#list2").show();
    $("#remarkTab").show();
    $("#taskeditTab").hide();
    $(".AddRemarkDetailView").css("padding-top", "10px");
    $("#progressdata").addClass("active");
    $("#homedata").removeClass("active");
    $("#homedata").addClass("unactive");
    $("#edithistorydata").removeClass("active");
    $("#edithistorydata").addClass("unactive");
    $("#collaboratordata").addClass("unactive")
    $("#collaboratordata").removeClass("active")

    $("#classificationdata").addClass("unactive");
    $("#classificationdata").removeClass("active");
    $("#edithead").css("display", "none");
    $("#list3").show();
    $(".asidenav").hide();
    $(".detailPane").css("width", "100%");
    //$(".topnavbar a").css("padding", "8px 19.5px")
    $("#list1").addClass("tab-activeWeb");
    $("#list4").removeClass("tab-activeWeb");
    $(".save").css("margin-right", "20px");


}

function homedata() {
    $(".editSectiondata").show();
    $(".SectionCollaborators").show();
    $(".task-classification").show();
    $(".tabSection").show();
    $("#taskeditTab").hide();
    $(".AddRemarkDetailView").show();
    $("#list1").show();
    $("#list2").show();
    $("#remarkTab").show();
    $("#homedata").addClass("active")
    $("#progressdata").removeClass("active");
    $("#progressdata").addClass("unactive");
    $("#edithistorydata").removeClass("active");
    $("#edithistorydata").addClass("unactive");
    $("#collaboratordata").addClass("unactive")
    $("#collaboratordata").removeClass("active")

    $("#classificationdata").addClass("unactive");
    $("#classificationdata").removeClass("active");

    $(".AddRemarkDetailView").css("padding-top", "30px");
    $("#edithead").css("display", "none");
    $("#list3").show();
    $(".asidenav").show();
    $(".detailPane").css("width", "93%");
    //$(".topnavbar a").css("padding", "8px 16px");
    //$(".topnavbar a:last-child").css("padding-right", "7px");
    $("#list1").addClass("tab-activeWeb");
    $("#list4").removeClass("tab-activeWeb");
    $(".save").css("margin-right", "0px");
}

function edithistorydata() {

    showEditHistoryTab()
    $("#taskeditTab").show();
    $(".tabSection").show();
    //$("boxLoading").hide();
    //$("#allActivity").show();
    $(".editSectiondata").hide();
    $(".SectionCollaborators").hide();
    $(".task-classification").hide();
    $(".AddRemarkDetailView").hide();
    $("#list1").hide();
    $("#list2").hide();
    $("#remarkTab").hide();
    $("#edithistorydata").addClass("active")
    $("#homedata").removeClass("active");
    $("#homedata").addClass("unactive")
    $("#progressdata").removeClass("active");
    $("#progressdata").addClass("unactive");
    $("#collaboratordata").addClass("unactive")
    $("#collaboratordata").removeClass("active")
    $("#classificationdata").addClass("unactive");
    $("#classificationdata").removeClass("active");
    $("#edithead").css("display", "block");
    $("#list3").hide();
    $(".asidenav").hide();
    $(".detailPane").css("width", "100%");
    //$(".topnavbar a").css("padding", "8px 19.5px")
    $(".save").css("margin-right", "20px");

}

function collaboratordata() {
    $(".editSectiondata").hide();
    $(".AddRemarkDetailView").hide();
    $(".tabSection").hide();
    $(".task-classification").hide();
    $(".SectionCollaborators").show();
    $("#collaboratordata").addClass("active")
    $("#edithistorydata").removeClass("active")
    $("#edithistorydata").addClass("unactive")
    $("#homedata").removeClass("active");
    $("#homedata").addClass("unactive")
    $("#progressdata").removeClass("active");
    $("#progressdata").addClass("unactive");
    $("#classificationdata").addClass("unactive");
    $("#classificationdata").removeClass("active");
    $(".asidenav").hide();
    $(".detailPane").css("width", "100%");
    //$(".topnavbar a").css("padding", "8px 19.5px")
    $(".save").css("margin-right", "20px");

}

function classificationdata() {
    $(".editSectiondata").hide();
    $(".AddRemarkDetailView").hide();
    $(".tabSection").hide();
    $(".task-classification").show();
    $(".SectionCollaborators").hide();
    $("#classification").addClass("active")
    $("#collaboratordata").removeClass("active")
    $("#edithistorydata").removeClass("active")
    $("#edithistorydata").addClass("unactive")
    $("#homedata").removeClass("active");
    $("#homedata").addClass("unactive")
    $("#progressdata").removeClass("active");
    $("#progressdata").addClass("unactive");
    $("#collaboratordata").addClass("unactive")
    $("#collaboratordata").removeClass("active")
    $("#classificationdata").addClass("active");
    $(".asidenav").hide();
    $(".detailPane").css("width", "100%");
    //$(".topnavbar a").css("padding", "8px 19.5px")
    $(".save").css("margin-right", "20px");

}
function asidenavActive(ctrl, scrollCtrl) {
    $(".asidenav .asidenav-tab").removeClass("menu__item--active");
    $(".asidenav " + ctrl).addClass("menu__item--active");
    var container = $(".detailPane");
    var scrollTo = $(scrollCtrl);
    var a = parseInt(scrollTo.position().top);
    var b = parseInt(container.position().top);
    var c = parseInt(container.scrollTop());
    var position = a - b + c - 55;

    container.animate({
        scrollTop: parseInt(position)
    });
}





//old code
//function GetEmployeeData(pageNumber, start, PSize, dir) {
//    $('#loading').show();
//    $('#loadingmessage').show();
//    $.post('/Tasks/ajaxManageTasksComm', { id: pageNumber, start: start, pSize: PSize, direction: dir }, function (data) {
//        sessionStorage.setItem("Total", data.recordsTotal);
//        loadData(data);
//    });
//}

$(document).ready(function () {
    //$('#examples').on('click', "input[type='checkbox']", function () {
    //    if ($(this).prop("checked") == true) {
    //        var s = $(this).parent().parent();
    //        $(s).toggleClass('highlight');
    //        var rowData = $(s).find("td:first input").val()
    //        document.getElementById("grid1").value = rowData;
    //    }
    //    else if ($(this).prop("checked") == false) {
    //        var t = $(this).parent().parent();
    //        $(t).toggleClass('highlight');
    //    }
    //})

    //$("#dateSearchInTaskComm").submit(function () {
    //    if ($("#toDate" && "#frmDate").val() != 0) {
    //        $('#RemarkDate').modal('hide');
    //        var ToDate = $("#toDate").val();
    //        var FrmDate = $("#frmDate").val();
    //        //if (FrmDate > ToDate) {
    //        //   return 0
    //        //}
    //        $("tbody").empty();
    //        $("#loading").show();
    //        $("#loadingmessage").show();
    //        $.ajax({
    //            url: '/Task/dateSearchInTaskComm',
    //            type: "POST",
    //            data: { fromDate: $("#frmDate").val(), toDate: $("#toDate").val(), emp: $("#EmpId").val(), calledBy: $("#calledBy").val() },
    //            success: function (data) {
    //                loadData(data);
    //                $("#fText1").text(FrmDate + "  -  " + ToDate);
    //                $("#FilterText1").show();
    //                $("#calledBy").val('')
    //            },
    //            error: function (data) {
    //                alert("Failed");
    //                $("#calledBy").val('')
    //            }
    //        });
    //    }
    //    return false;
    //});

    // Laveena
    //$("#TeamRemarkBy").submit(function () {
    //    $('#RemarkBy').modal('hide');
    //    if ($("#EmployeeId").val() != 0) {
    //        var empName = $("#EmployeeId option:selected").text();
    //        $("tbody").empty();
    //        $("#loading").show();
    //        $("#loadingmessage").show();
    //        $.ajax({
    //            url: '/Tasks/TeamRemarkBySearchInTaskComm',
    //            type: "POST",
    //            data: { empId: $("#EmployeeId").val(),calledBy: $("#calledBy").val() },
    //            success: function (data) {
    //                loadData(data);
    //                $("#fText1").text(empName);
    //                $("#FilterText1").show();
    //                $("#calledBy").val('')
    //            },
    //            error: function (data) {
    //                alert("Failed");
    //                $("#calledBy").val('')
    //            }
    //        });
    //    }
    //    return false;
    //});
    // Laveena

    //$('#examples').on('click', 'tr', function () { if (event.target.type !== 'checkbox') { $(':checkbox', this).trigger('click'); } });

    //$("#filter").on("change", function () {
    //    var a = $("#filter").val();
    //    if (a == "0") {
    //        $("#TextC").css("display", "none");
    //        var a = document.getElementById("dateC")
    //        a.style.display = "none";
    //    } else {
    //        b = a.split(":");
    //        if (b[1] == "date") {
    //            $("#TextC").css("display", "none");
    //            var a = document.getElementById("dateC")
    //            a.style.display = "";
    //        } else if (b[1] == "string") {
    //            var a = document.getElementById("dateC")
    //            a.style.display = "none";
    //            $("#TextC").css("display", "");
    //        } else if (b[1] == "integer") { }
    //    }
    //});

    //$('#examples thead tr').on('click', 'th', function () {
    //    var ordervalue = "";
    //    var ele = $(this).find("input").val();
    //    var ids = $('.sortable');
    //    for (i = 0; i <= ids.length - 1; i++) {
    //        var selector = "#" + ids[i].id;
    //        $(selector).css("display", "none");
    //    }
    //    var nosort = $('.none');
    //    for (i = 0; i <= nosort.length - 1; i++) {
    //        var selector = "#" + nosort[i].id;
    //        $(selector).css("display", "");
    //    }
    //    if (ele != undefined) {
    //        var order = ele.split(":");
    //        var sort = "#" + "sort-" + order[0];
    //        var sort1 = "#" + "sort1-" + order[0];
    //        var sort2 = "#" + "sort2-" + order[0];
    //        if (order[2] == "none") {
    //            order[2] = "asc";
    //            $(sort1).css("display", "");
    //            $(sort).css("display", "none");
    //        } else if (order[2] == "asc") {
    //            order[2] = "desc";
    //            $(sort2).css("display", "");
    //            $(sort).css("display", "none");
    //            $(sort1).css("display", "none");
    //        }
    //        else if (order[2] == "desc") {
    //            order[2] = "asc";
    //            $(sort2).css("display", "none");
    //            $(sort).css("display", "none");
    //            $(sort1).css("display", "");
    //        }
    //        var ControlVal = order[0] + ":" + order[1] + ":" + order[2];
    //        $(this).find("input").val(ControlVal);
    //        var a = "tbody tr:last td:nth-child(" + order[0] + ")";
    //        ordervalue = "";
    //        var o = order[1] + "~" + ordervalue + "~" + order[2];
    //        JSON.stringify(o);
    //        var search = sessionStorage.getItem("search");
    //        var a = sessionStorage.getItem("PageSize");
    //        sessionStorage.setItem("order", ele);
    //        $("#examples tbody tr").remove();
    //        $('#loading').show();
    //        $('#loadingmessage').show();
    //        $('#Msg').hide();
    //        $.post('/Tasks/ajaxManageTasksComm', { id: 1, start: 1, pSize: a, direction: "F", search: search, order: o }, function (data) {
    //            loadData(data);
    //        })
    //    }
    //});

    $('a').tooltip();
});

//function DoSearch() {
//    //    var value = $("#filterText").val();
//    //    var col = $("#filter").val();
//    //    var b = col.split(":");
//    //    var search = value + "," + b[0] + ":" + b[1];
//    //    JSON.stringify(search);
//    //    sessionStorage.setItem("search", search);
//    //    var a = sessionStorage.getItem("PageSize");
//    //    var o = sessionStorage.getItem("order");
//    //    $("#examples tbody tr").remove();
//    //    $('#loading').show();
//    //    $('#loadingmessage').show();
//    //    $('#Msg').hide();
//    //    $.post('/CRM/ajaxRemarksData', { id: 1, start: 1, pSize: a, direction: "F", search: search, order: o }, function (data) {
//    //        loadData(data);
//    //    })
//    //}    function DoSearch() {
//    var table = $('#examples');
//    var rows = document.getElementsByTagName("tr");
//    var q = document.getElementById("filterText");
//    var v = q.value.toLowerCase();
//    var on = 0;

//    var a = $("#filter").val();
//    var b = [];
//    b = a.split(":");
//    for (var i = 4; i < rows.length; i++) {
//        //var m = table.column(b[0]);
//        var fullname = rows[i].getElementsByTagName("td");
//        //var c = $(fullname).text(b[0]);
//        //var s = rows[i].ce
//        fullname = fullname[b[0]].innerHTML.toLowerCase();
//        if (fullname) {
//            if (v.length == 0 || (v.length < 3 && fullname.indexOf(v) == 0) || (v.length >= 3 && fullname.indexOf(v) > -1)) {
//                rows[i].style.display = "";
//                on++;
//            } else {
//                rows[i].style.display = "none";
//            }
//        }
//    }
//}
//function DateSearch() {
//    var rows = document.getElementsByTagName("tr");
//    var min = document.getElementById("min");
//    var max = document.getElementById("max");
//    if (min.value == "") {
//        var min1 = null;
//    }
//    else {
//        var min1 = new Date(min.value);
//    }
//    if (max.value == "") {
//        var max1 = null;
//    }
//    else {
//        var max1 = new Date(max.value);
//    }
//    var on = 0;
//    for (var i = 4; i < rows.length; i++) {
//        var fullname = rows[i].getElementsByTagName("td");
//        fullname = new Date(fullname[2].innerHTML);
//        if (fullname >= min1 && fullname <= max1 || fullname >= min1 && max1 == null || min1 == null && fullname <= max1 || max1 == null && min1 == null) {
//            rows[i].style.display = "";
//            on++;
//        } else {
//            rows[i].style.display = "none";
//        }
//    }
//}
function dd() {
    //var selectedIDs = [];
    //$("#examples tr.highlight").each(function (index, row) {
    //    selectedIDs.push($(row).find("td:first input").val());
    //});
    //if (selectedIDs.length == "1") {
    //    var a = document.getElementById("grid1").value;
    //    location.href = '/Dealer/CustomerForm?exitmode=Edit&id=' + a;
    //}
}


//function myFunction() { $("#register").empty(); };

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
//    $("#examples tbody tr").remove();
//    $('#loading').show();
//    $('#loadingmessage').show();
//    $('#Msg').hide();
//    $.post('/CRM/ajaxRemarksData', { id: 1, start: 1, pSize: a, direction: "F", search: search, order: o }, function (data) {
//        loadData(data);
//    })
//}
//function LatestTasksComm() {
//    $.ajax({
//        type: "GET",
//        url: "/Tasks/ajaxLatestTasksComm",
//        contentType: "application/json; charset=utf-8",
//        datatype: "json",
//        data: { filterText: "LatestTaskComm" },
//        success: function (data) {
//            loadData(data);
//        }
//    })
//}
//function TodaysTasksComm() {
//    $.ajax({
//        type: "GET",
//        url: "/Tasks/ajaxTodaysTasksComm",
//        contentType: "application/json; charset=utf-8",
//        datatype: "json",
//        data: { filterText: "TodaysTasksComm" },
//        success: function (data) {
//            loadData(data);
//        }
//    })
//}
//function removeFilter() {
//    $("tbody").empty();
//    $("#loading").show();
//$("#loadingmessage").show();
//$("#FilterText").hide();
//    $("#fText").text("");

//    $.post('/Tasks/AjaxManageTasksComm', { id: 1, start: 1, pSize: 20, direction: 'F' }, function (data) {
//            sessionStorage.setItem("Total", data.recordsTotal);
//            loadData(data);
//            //$("#FilterText").hide();
//            //$("#fText").text("");
//        });

//}

//function removeFilter1() {
//    $("tbody").empty();
//    $("#loading").show();
// $("#loadingmessage").show();
//$("#FilterText1").hide();
//    $("#fText1").text("");
//    if ($("#TeamTaskDate").text() == 'TeamTaskDate' || $("#TeamTaskRemark").text() == 'TeamTaskRemark') {
//        $.ajax({
//            type: "GET",
//            url: "/Tasks/FilterTeamTaskComm",
//            contentType: "application/json; charset=utf-8",
//            datatype: "json",
//            data: { filterText: "TeamComm" },
//            success: function (data) {
//                loadData(data);
//               // $("#fText1").text("");
//                $("#TeamTaskDate").text("");
//                $("#TeamTaskRemark").text("");
//               // $("#FilterText1").hide();
//            }
//        })
//    }
//    else {
//        $.ajax({
//            type: "GET",
//            url: "/Tasks/ajaxManageTasksComm",
//            contentType: "application/json; charset=utf-8",
//            datatype: "json",
//            data: {},
//            success: function (data) {
//                loadData(data);
// $("#FilterText1").hide();
//                $("#fText1").text("");

//            }
//        })

//    }
//}





//Code for context menu
//$.contextMenu({
//    selector: '#examples tbody tr',
//    build: function ($trigger) {
//        var options = {
//            callback: function (key, options) {
//                //var m = "clicked: " + key + options.$trigger[0].cells[0].children[0].childNodes[0].id + "" + options.$trigger[0].cells[3].textContent;
//                var Rowid = options.$trigger[0].cells[0].id;

//                //window.console && console.log(m) || alert(m);
//                switch (key) {
//                    case "Date":

//                        var options = {
//                            "backdrop": "static",
//                            keyboard: true
//                        };
//                        $('#calledBy').val('DateFilter')
//                        $('#RemarkD').html();
//                        $('#RemarkDate').modal(options);
//                        var Mtitle = "Search by Date";
//                        $('.modal-title').text(Mtitle);
//                        $('#RemarkDate').modal('show');

//                        break;
//                    case "RemarkBy":
//                        var options = {
//                            "backdrop": "static",
//                            keyboard: true
//                        };
//                        $('#calledBy').val('RemarkBy')
//                        $('#RemarkBy').modal(options);
//                        $('#RemarkBy').modal('show');
//                        var Mtitle = "Select Team Member";
//                        break;
//                    case "TeamComm":
//                        $("tbody").empty();
//                        $("#loading").show();
//                        $("#loadingmessage").show();
//                        $.ajax({
//                            type: "GET",
//                            url: "/Tasks/FilterTeamTaskComm",
//                            contentType: "application/json; charset=utf-8",
//                            datatype: "json",
//                            data: { filterText: "TeamComm" },
//                            success: function (data) {
//                                loadData(data);
//                                $("#fText").text("Team Communication");
//                                $("#FilterText").show();
//                            }
//                        })
//                        break;
//                    case "TeamDate":
//                        $("#TeamTaskDate").text("TeamTaskDate");
//                        $("#fText").text("Team Communication");
//                        $("#FilterText").show();
//                        var options = {
//                            "backdrop": "static",
//                            keyboard: true
//                        };
//                        $('#calledBy').val('TeamDateFilter')
//                        $('#RemarkD').html();
//                        $('#RemarkDate').modal(options);
//                        var Mtitle = "Search by Date";
//                        $('.modal-title').text(Mtitle);
//                        $('#RemarkDate').modal('show');
//                        break;
//                        // Laveena
//                    case "TeamRemarkBy":
//                        $("#TeamTaskRemark").text("TeamTaskRemark");
//                        $("#fText").text("Team Communication");
//                        $("#FilterText").show();
//                        var options = {
//                            "backdrop": "static",
//                            keyboard: true
//                        };
//                        $('#calledBy').val('TeamRemarkBy')
//                        $('#RemarkBy').modal(options);
//                        $('#RemarkBy').modal('show');
//                        var Mtitle = "Select Team Member";
//                        break;
//                        // Laveena
//                }

//                function removeFilter1() {
//                    $("#loading").show();
//                    $.ajax({
//                        type: "GET",
//                        url: "/Tasks/FilterTeamTaskComm",
//                        contentType: "application/json; charset=utf-8",
//                        datatype: "json",
//                        data: { filterText: "TeamComm" },
//                        success: function (data) {
//                            loadData(data);
//                            $("#fText1").text("");
//                            $("#FilterText1").show();

//                        }
//                    })
//                }

//            },
//            items: {},
//        }





//        if ($trigger) {
//            options.items.RemarkFilter = {
//                name: "Filter", icon: "fa-filter",
//                "items": {
//                    "Date": { name: "Date", icon: "fa-calendar" },
//                    "RemarkBy": { name: "Remark By", icon: "fa-user-plus" }
//                }
//            }
//            if ($("#Logintype").val() == "Manager") {

//                options.items.TeamComm = { name: "Team Communication", icon: "fa-users" }
//                options.items.TeamCommFilter = {
//                    name: "Team Filter", icon: "fa-th-list",
//                    "items": {
//                        "TeamDate": { name: "Date", icon: "fa-calendar" },
//                        "TeamRemarkBy": { name: "Remark By", icon: "fa-user-plus" }
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


//$('#examples tr').on('click', function (e) {

//    console.log('clicked', this);
//})
//function dateChange(value, id){
//    $("#toDate").val(value);
//    $("#toDate").min=value;
//}

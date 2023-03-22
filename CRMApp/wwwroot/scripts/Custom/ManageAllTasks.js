var popOverOpen = false;
var CurrentHoverRowId = 0;
var SubTaskPopupOpen = true;

//this is a sessionStorageKey for Search
var searchKey = "searchAllTasks";
//this is a sessionStorageKey for order
var orderKey = "orderAllTasks";
//this is a sessionStorageKey for search Criteria div value
var searchMsgKey = "searchMsgAllTasks";
//this is a sessionStorageKey for basicFilter UI consistency on Page Reload
var basicFilterStrKey = "basicFilterStrAllTasks";
//this is a sessionStorageKey for PageSize
var regPageSizeKey = "pageSizeAllTasks"


//for popups
var options = {
    "backdrop": "static",
    keyboard: true
}
var chkvalesArr = [];
var selectAll = false;


function searchByTaskId(event) {
    var taskid = $("#taskidFilter").val();
    if (taskid.length == 0 && event.keyCode == 13) {
        return false;
    }

    if (taskid.length == 0) {
        setSearchSessionStorage("");
        setSearchMsgSessionStorage("");
        setMyTasksSearch();
        reloadGrid();
    }
    else {
        if (event.keyCode == 13) {
            let search = taskid + ",p_crmtasks:integer";
            setSearchSessionStorage(search);
            let searchMsg = "Search Results: TaskId  <span class='' style='font-weight: 600'>'" + taskid + "'</span>";
            setSearchMsgSessionStorage(searchMsg);
            reloadGrid();
        }
    }

}



function startDateSort(ctrl) {
    $(".fa-caret-up").show()
    $(".fa-caret-down").show()
    $(ctrl).toggleClass("Ascend");
    if ($(ctrl).hasClass("Ascend")) {
        setOrderSessionStorage("startdate asc")
        $(ctrl).find(".fa-caret-down").hide();
        $(ctrl).find(".fa-caret-up").show();
    }
    else {
        setOrderSessionStorage("startdate desc")
        $(ctrl).find(".fa-caret-down").show();
        $(ctrl).find(".fa-caret-up").hide();

    }
    $('#loading').show();
    $('#loadingmessage').show();
    $("#example").height(0);
    taskSortfun();
}
function lastActionTimeSort(ctrl) {
    $(".fa-caret-up").show()
    $(".fa-caret-down").show()
    $(ctrl).toggleClass("Ascend");
    if ($(ctrl).hasClass("Ascend")) {
        setOrderSessionStorage("lastactiontime asc")
        $(ctrl).find(".fa-caret-down").hide();
        $(ctrl).find(".fa-caret-up").show();
    }
    else {
        setOrderSessionStorage("lastactiontime desc")
        $(ctrl).find(".fa-caret-down").show();
        $(ctrl).find(".fa-caret-up").hide();
    }
    $('#loading').show();
    $('#loadingmessage').show();
    $("#example").height(0);
    taskSortfun();
}

function taskSortfun() {
    var pSize = sessionStorage.getItem(regPageSizeKey);
    var search = sessionStorage.getItem(searchKey);
    var order = sessionStorage.getItem(orderKey);

    $.ajax({
        url: "/Tasks/AjaxAllTasks",
        type: "POST",
        data: { start: 0, pSize: pSize, search: search, order: order },
        success: function (data) {
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




//Basic filter multiple
function SubmitBasicFilter(search, searchMsg) {
    chkvalesArr = [];
    var pSize = sessionStorage.getItem(regPageSizeKey);
    $("#example div").remove();
    $("#example").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();

    $.ajax({
        url: '/Tasks/AjaxAllTasks',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search },
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


function showEditHistoryTab() {
    if ($("#taskeditTab #allActivity").children().length==0) {
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
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            var a = 1;
            var finalDestination = $("#taskeditTab #allActivity")
            finalDestination.empty();
            $.each(data.data, function (index, item) {
                var m = (a) + index;
                //Load Data
                var html = '<div class="EditHistoryItem col-sm-12 HistoryItem" id="' + item.SrNo + '">'
                    + '<div class="line1"><span>' + m + '.</span><div>'
                if (item.ActivityType.toLowerCase() == "remark") {
                    html += '<i class="fa fa-comment"></i></div><div class="text">' + item.Text + '</div></div>'
                }
                else if (item.ActivityType.toLowerCase() == "document") {
                    var arr = item.Text.split(":");
                    html += '<i class="fa fa-file-o"></i></div><div>' + arr[0] + ': <a onClick="downloadRemarkFile(\'' + $.trim(arr[1]) + '\',\'' + $.trim(arr[2]) + '\')"  class="filenam">' + arr[1] + '</a></div></div>'
                }
                else if (item.ActivityType.toLowerCase() == "collaborator") {
                    html += '<i class="fa fa-user" ></i></div><div class="text">' + item.Text + '</div></div>'
                }
                else if (item.ActivityType.toLowerCase() == "edit") {
                    html += '<i class="fa fa-pencil-square-o"></i></div><div class="text">' + item.Text + '</div></div>'
                }

                //html +='<div style="">' + item.Text + '</div></div>'
                html += '<div class="line2"><span class="Remarkuser"><i class="" aria-hidden="true" ></i></span><span class="Remarkdate" style="float:right;"><img src="/images/calender.png"> ' + item.FrmDateTime + '</span></div>';
                var remarkDiv = $(html);


                finalDestination.append(remarkDiv);
                $("#taskeditTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            });
            if (data.recordsTotal == 0) {
                var NothingDiv = $('<div class="EditHistoryItem"><div class="line1"><p>No Edit history here</p> </div></div>');
                finalDestination.append(NothingDiv);
                $("#taskeditTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            }
        },
        error: function () {
                var NothingDiv = $('<div class="EditHistoryItem"><div class="line1"><p>No Edit history here</p> </div></div>');
                $("#taskeditTab #allActivity").append(NothingDiv);
                $("#taskeditTab #boxLoading #boxLoadingMessage").hide();
                $("#taskeditTab #allActivity").show();
            
        }
    });
}


function ExportAllTasks() {
    //var search = sessionStorage.getItem("search");
    //var order = sessionStorage.getItem("order");
    var search = sessionStorage.getItem(searchKey);
    var order = sessionStorage.getItem(orderKey);
    $.post('/Tasks/AjaxExportAllTasks', { search: search, order: order }, function (data) {
        if (data=="0") {
            $('#TaskClosedContent').html('');
            $('#TaskClose').modal(options);
            $('#TaskClosedContent').html("<h3 class='text-center'>No record found to export</h3>");
            $('#TaskClose').modal("show");
            setTimeout(function () { $('#TaskClose').modal("hide"); }, 1000);
        }
        else if (data=="") {
            window.location.href = "/Home/Logout";
        }
        else if (data!=="") {
            window.location.href = "/Tasks/downloadTaskExcel?filename=" + data;
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

//create all the data div and controls
function loadData(data) {
    $("#side").removeClass("test")
    var tblEmployee = $("#example ");
    $("#example  div").remove();
    tblEmployee.height(0);
    $("#selectall").prop('checked', false);
    var a = data.draw;
    if ($("#Next").hasClass("disabledbutton") == true) {
        $("#Next").removeClass("disabledbutton");
    }
    if ($("#Prev").hasClass("disabledbutton") == true) {
        $("#Prev").removeClass("disabledbutton");
    }
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
    else if (parseInt(a) + parseInt(d) > c) { $("#Next").addClass("disabledbutton"); $("#Prev").removeClass("disabledbutton"); }
    $("#info").text(a + "-" + b + " of " + c);
    var m = a - 1;
    $("#RightShift").click();

    //Added by aslam
    $.each(data.data, function (index, item) {

        //if (item.Tags != "") {
        //    var tagsRow = $("<div id='trtags-" + item.CRMTasks_Key + "' class='col-md-12' style='width: 400px;background-color: gainsboro;margin-bottom: 0px;padding-bottom: 3px;padding-top: 3px;text-align: start;border-radius: 5px;color: black;'><b>Tags: &nbsp;</b>" + item.Tags + "</div>");
        //    tblEmployee.append(tagsRow);
        //}
        if (item.statusCode == 500) {
            window.location.href = "/Home/Error";
        }

        m = m + 1;
        var Parentdiv = $("<div id='MainDiv-" + item.CRMTasks_Key + "'class='col-md-12  clickable  parentdiv' style='display: inline-flex;' width:100%;  style='overflow-x:scroll;  ' onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        if (item.hasSubtasks == "Y") {
            Parentdiv = $("<div id='MainDiv-" + item.CRMTasks_Key + "' class='col-md-12  clickable  parentdiv  viewSubTaskbycaret maindiv'><input type='checkbox' onclick='chkCheckUncheck(this)' class='checkboxall' id='chk-" + item.CRMTasks_Key + "' value='" + item.CRMTasks_Key + "'/> <a onclick='GetSubTasksData(" + item.CRMTasks_Key + "," + item.P_CRMTasks + ",this)' data-target='." + item.CRMTasks_Key + "' class ='pull-left-container' style='cursor: pointer; width:9px;'> <i class='fa fa-angle-right subCarate'></i></a> </div>");
        }
        else {
            Parentdiv = $("<div id='MainDiv-" + item.CRMTasks_Key + "' class='col-md-12  clickable  parentdiv  viewSubTaskbycaret maindiv'> <input type='checkbox' onclick='chkCheckUncheck(this)' class='checkboxall' id='chk-" + item.CRMTasks_Key + "' value='" + item.CRMTasks_Key + "'/> <a onclick='return false;' class ='pull-left-container' style='cursor: pointer; width:9px;'> <i class='fa fa-angle-right subCarate' style='color:transparent;'></i></a> </div>");
        }
        //Parentdiv = $("<div id='MainDiv-" + item.CRMTasks_Key + "' class='col-md-12  clickable  parentdiv  viewSubTaskbycaret' style='display: inline-flex;  ' ><input type='checkbox' class='checkboxall'' value='checkbox1' style='margin-top: 25px; margin-right:10px;' /> <a onclick='GetSubTasksData(" + item.CRMTasks_Key + "," + item.P_CRMTasks + ",this)' data-target='." + item.CRMTasks_Key + "' class ='pull-left-container' style='cursor: pointer; padding:7px;'> <i class='fa fa-angle-right' style='font-size:25px; cursor: pointer; margin-top: 10px;padding-bottom: 20px;font-weight: 600; z-index:1; padding-right:0px; padding-left:0px;'></i></a> </div>");
        tblEmployee.append(Parentdiv);
        var div = $("<div id='tr-" + item.CRMTasks_Key + "' class='tr u col-md-12  main MainTr' ></div>");

        var color = "";
        if ($.trim(item.TextPriority).toLowerCase() == "high") {
            color = "red";
        }
        else if ($.trim(item.TextPriority).toLowerCase() == "low") {
            color = "green";
        }
        else if ($.trim(item.TextPriority).toLowerCase() == "mid" || $.trim(item.TextPriority).toLowerCase() == "medium") {
            color = "hsl(37deg 94% 55%)";
        }
        else {
            color = "transparent";
        }

        var statusColor = "";
        if ($.trim(item.TextTaskStatus).toLowerCase() == "active") {
            statusColor = "#5cc961";
        }
        else if ($.trim(item.TextTaskStatus).toLowerCase() == "closed") {
            statusColor = "#f57200";
        }
        else if ($.trim(item.TextPriority).toLowerCase() == "deffered") {
            statusColor = "lightgray";
        }
        else {
            statusColor = "transparent";
        }

        div.html(("<div class='stno td basicTr' style='width:2%;padding-left:1px;'><i class='fa fa-bookmark priority-icon' style='color:transparent'></i> </div>")
            + " " + ("<div class='Sno td basicTr' style='width:3%;padding-left:2px;'>" + m + "</div>")
            + " " + ("<div class='Taskid td idmanage basicTr' style='width:5%;padding-left:3px;'>" + item.P_CRMTasks + "</div>")
            + " " + ("<div class='combineCol' style='padding-left:11px;width:25%;padding-right: 7px;'>"
                  + "<div class='Tasktitle td titlemanage basicTr clampTr'>" + item.TaskTitle + " </div>"
                  + "<div class='Taskdescription td basicTr clampTr'>Desc - <span>" + item.TaskDescription + "</span></div></div>")
            + " " + ("<div class='TaskPriority td basicTr' style='color:" + color + " ;width:6%;' data-priority='" + item.priority + "'>" + item.TextPriority + "</div>")
            + " " + ("<div class='Startdate td h basicTr' style='width:9%;padding-left:10px;'>" + item.FrmtStartDate + "</div>")
            + " " + ("<div class='Duedate td h basicTr' style='width:9%;padding-left:10px;'>" + item.FrmtDueDate + "</div>")
            + " " + ("<div class='LastActionTime td h basicTr' style='width:10%;padding-left:10px;'>" + item.FrmtLastActionTime + "</div>")
            + " " + ("<div class='TaskAssignedto  td basicTr' style='width:11%;padding-left:13px;' data-assignedto='" + item.Assignedto + "'>" + item.TextAssignedto + "</div>")
            + " " + ("<div class='Taskcreateby h td basicTr' style='width:10%;padding-left:6px;'>" + item.TextCreatedBy + "</div>")
            + " " + ("<div class='TaskTags td h basicTr clampTr' style='width:13%;padding-left:12px;'>" + item.Tags + "</div>")
            + " " + ("<div class='Taskstatus td basicTr' style='width:5%; text-align:center;padding-left:13px;' data-taskstatus='" + item.Taskstatus + "'><span style='display:none;'>" + item.TextTaskStatus + "</span><div class='circle' style='background-color:" + statusColor + "'></div></div>")
            + " " + ("<div class='Taskunder td' style='display:none'>" + item.Under + "</div>")
            
        );
        Parentdiv.append(div);

        togglediv = $("<div class='SubtaskBox' id='toggleDiv-" + item.CRMTasks_Key + "' class='col-md-12' style='display:none'><div id='loading' style='padding: 10px; '><div colspan='5'><div id='loadingmessage' class='loader overlay col - md - offset - 6' style='margin: 10px auto;'></div><p id='Msg'></p></div></div></div>");
        tblEmployee.append(togglediv);

        if (selectAll) {
            $("#selectall").prop('checked', true);
            $('.checkboxall').each(function () {
                $(".checkboxall").prop('checked', true);
                $(this).parent().addClass("rowChecked");
            })
        }
        else {
            for (var i = 0; i < chkvalesArr.length; i++) {
                $("#chk-" + chkvalesArr[i]).prop('checked', true);
                $("#chk-" + chkvalesArr[i]).parent().addClass("rowChecked")
            }
        }

    });

    if (data.recordsTotal == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $('#loading').addClass('clickable');
        $("#example").height(0);
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
        Deviceheight();
        DetailPaneHeight();
    }


    //onclick select all checkbox
    $("#selectall").click(function () {
        if (this.checked) {
            $('.checkboxall').each(function () {
                $(".checkboxall").prop('checked', true);
                var index = chkvalesArr.indexOf($(this).val());
                if (index == -1) {
                    chkvalesArr.push($(this).val());
                }
                $(this).parent().addClass("rowChecked");
            })
            $("#subDiv #subDivLable").text("Select all rows");
            $("#subDiv").show();
        }
        else {
            $('.checkboxall').each(function () {
                $(".checkboxall").prop('checked', false);
                var index = chkvalesArr.indexOf($(this).val());
                if (index > -1) {
                    chkvalesArr.splice(index, 1);
                }
                $(this).parent().removeClass("rowChecked");
            })
            selectAll = false;
            $("#subDiv").hide();
        }
    });


    $(document).ready(function () {
        $('#right1').on('click', '#hideDetailPane', function () {

            var isSomethingTrue = true;
            if (isSomethingTrue) {

                $("#right1").hide();
                $(".left").show();
                $(".Taskstatus").addClass(".mov");

            }

        });

        $('.right').on('click', '#RightShift', function () {

            var isSomethingTrue = true;
            if (isSomethingTrue && ($(window).width() >= 600)) {
                Deviceheight();
                var lastChkbox = $(".maindiv.rowActive").find(".checkboxall")[0];
                if (lastChkbox !== undefined) {
                    $(lastChkbox).attr("checked", false);
                    chkCheckUncheck(lastChkbox);
                }
                $(".maindiv").removeClass("rowActive")
                $(".main").css("display", "inline-flex");
                $("#dropdown").removeClass("setStyle");
                $(".right").hide();
                $(".left").show();
                $(".left").removeClass("move");
                $(".h").show();
                $("div").removeClass("style");
                $("div").css("box-shadow", "none");
                $(".right").css('display', 'none');
                removeGridColumnCss();

            }
            else if (isSomethingTrue && ($(window).width() <= 600)) {
                $(".right").hide();
                $(".left").show();
                $(".left").removeClass("move");
                $(".Taskstatus").addClass(".mov");
                Deviceheight();
                DetailPaneHeight();
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

$(document).ready(function () {
    $("nav").find(".newTitle").remove();
    var s = "<p class='newTitle' >All Tasks</p>";
    $("nav").find(".titleName").append(s);

    $('[data-toggle="tooltip"]').tooltip({ delay: { "show": 500, "hide": 100 } });
    $("#dropdown").removeClass("setStyle");
    $('#example').on('click', '.u', function () {
        $(".right").hide();
        var isSomethingTrue = true;
        $("div").css("box-shadow", "none");
        if (isSomethingTrue && ($(window).width() >= 600)) {
            var lastChkbox = $(".maindiv.rowActive").find(".checkboxall")[0];
            if (lastChkbox !== undefined) {
                $(lastChkbox).attr("checked", false);
                chkCheckUncheck(lastChkbox);
            }
            $(".maindiv").removeClass("rowActive");
            $(this).parent("div").addClass("rowActive");
            var chkBox = $(this).parent("div").find(".checkboxall")[0];
            $(chkBox).attr("checked", true);
            chkCheckUncheck(chkBox);

            $(this).parent("div").css("box-shadow", "0px 1px 4px 0px #33333359");
            $(".Taskdescription").css("margin-right", "15px");
            //$("#dropdown").addClass("setStyle");
            $(".right").show();
            $(".right").css("display", "flex");
            $(".left").addClass("move");
            $(".Taskstatus").addClass(".mov");
            $(".h").hide();
            setGridColumnCss();

            Deviceheight();
            var $row = $(this).closest("div");
            SetMainTasktDetailPane($row, ".right");
        }
    });

    $('#example').on('click', '.sub', function () {
        $(".right").hide();
        $("div").removeClass("style");
        var isSomethingTrue = true;
        if (isSomethingTrue && ($(window).width() >= 600)) {
            var lastChkbox = $(".maindiv.rowActive").find(".checkboxall")[0];
            if (lastChkbox !== undefined) {
                $(lastChkbox).attr("checked", false);
                chkCheckUncheck(lastChkbox);
            }

            $(".maindiv").removeClass("rowActive");
            $(this).parent("div").addClass("rowActive");
            var chkBox = $(this).parent("div").find(".checkboxall")[0];
            $(chkBox).attr("checked", true);
            chkCheckUncheck(chkBox);
            //$("#dropdown").addClass("setStyle");
            $(this).addClass("style");
            $(".right").show();
            $(".right").css("display", "flex");
            $(".left").addClass("move");
            $(".Taskstatus").addClass(".mov");
            $(".h").hide();
            setGridColumnCss();

            var $row = $(this).closest("div");
            SetSubTaskDetailPane($row, ".right")
        }
    });


    //Mobile detailpane onclick function
    $('#example').on('click', '.u', function () {
        var isSomethingTrue = true;
        if (isSomethingTrue && ($(window).width() <= 600)) {

            $(".right").show();
            $(".right").css("display", "flex");
            $(".right").addClass("mobileDetailPane");
            $(".left").hide();
            Deviceheight();
            var $row = $(this).closest("div");
            SetMainTasktDetailPane($row, ".right");
        }
    });

    $(".right").hide();
    $('#example').on('click', '.sub', function () {
        var isSomethingTrue = true;
        if (isSomethingTrue && ($(window).width() <= 600)) {
            //$("#dropdown").addClass("setStyle");
            $(".right").show();
            $(".right").css("display", "flex");
            $(".right").addClass("mobileDetailPane");
            $(".left").hide();
            var $row = $(this).closest("div");
            SetSubTaskDetailPane($row, ".right")
        }
    });
});

//Set table height according to screen
function Deviceheight() {
    //var sidebarposition = side.getBoundingClientRect();
    //$("#example").height(sidebarposition.height - 120)
    var h = $(".content-wrapper").css("min-height")
    $("#example").height(h);
}

//added by Rasika for purpose of responsiveness while switching from desktop view to mobile view
$(document).ready(function () {
    function resizewidth() {
        if ($(window).width() >= 600) {
            $(".detailpaneIconrow").find("#RightShift").removeClass("fa-arrow-left").addClass("fa-arrow-right");
            if ($(".right").css('display') != 'none') {
                $(".left").addClass("move");
                $(".left").show();
                $(".right").show();
                $(".right").css("display", "flex");
                $(".right").removeClass("mobileDetailPane");
            }
            else {
                $(".left").show();
                $(".right").hide();
            }
        }

        if ($(window).width() <= 600) {
            var i = $(".detailpaneIconrow").find("#RightShift").removeClass("fa-arrow-right").addClass("fa-arrow-left");
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

//Set  destop detail pane height according to screen 
function DetailPaneHeight() {
    var h = $(".content-wrapper").css("min-height")
    $(".right").height(h + 30);
}

//Table height will change according to Sidebar height

var Sidebar = $(".sidebar")[0];
var resizeObserver = new ResizeObserver((event) => {
    var h = $(".content-wrapper").css("min-height")
    $("#example").height(h);
    $(".right").height(h + 30)
    if ($(Sidebar).hasClass("test")) {
        $("#example").height(0)
    }
});
resizeObserver.observe(Sidebar);



//Load Task Remarks
function LoadRemarks(TaskPid, destination) {
    $(destination + " #remarkTab #boxLoading #boxLoadingMessage").show();
    $(destination + " #remarkTab #AllRemarks").hide();
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
            var finalDestination = $(destination + " #remarkTab #AllRemarks")
            finalDestination.empty();
            $.each(data.data, function (index, item) {
                var m = (a) + index; var html = '<div class="RemarkHistoryItem col-sm-12 HistoryItem" id="' + item.CRMCommunication_key + '">'
                    + '<div class="line1"><span>' + m + '.</span>'
                    //<div><i class="fa fa-comment"></i></div>
                    + '<div class="text">' + item.Commtext + '<span style="padding-right:0;"> (Id -</span> <span id="commid" style="padding-right:0;">' + item.CRMCommunication_key + '</span><span>)</span></div></div>'
                    + '<div class="line2"><span class="Remarkuser">'
                    //<i class="fa fa-user" aria-hidden="true"></i>
                    //+ '<img src="/images/profilemini.png"> '+ item.TextLogincode + '</span><span class="Remarkdate" style="float:right;"><i class="fa fa-calendar"></i>' + item.FrmtCreationDate + '</span></div>';
                    + '<img src="/images/profilemini.png"> ' + item.TextLogincode + '</span><span class="Remarkdate" style="float:right;"><img src="/images/calender.png"> ' + item.FrmtCreationDate + '</span></div>';
                //Load Data
                //var html = '<div class="RemarkHistoryItem col-sm-12" style="margin-bottom:12px; border-radius:5px; background-color:#f3f8fa; padding:10px;" id="' + item.CRMCommunication_key + '">'
                //    + '<div class="line1 " style="display:flex; overflow: hidden;">  <span class="">' + m + '</span>   <div class=""><i class="fa fa-comment" style="padding-right:8px;"></i></div>  <div style="">' + item.Commtext + '</div></div>'
                //    + '<div class="line2"><span class="Remarkuser"><i class="fa fa-user" aria-hidden="true"></i>' + item.TextLogincode + '</span><span class="Remarkdate" style="float:right;"><i class="fa fa-calendar"></i>' + item.FrmtCreationDate + '</span></div>';
                if (item.FileName != "") {
                    html = html + '<div class="line3"><span class="upload">Uploaded File :</span><a onClick="downloadRemarkFile(\'' + $.trim(item.FileName) + '\',\'' + item.LinkURL + '\')"  class="filenam">' + item.FileName + '</a></div></div>';
                }
                var remarkDiv = $(html);
                finalDestination.append(remarkDiv);
                $(destination + " #remarkTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            });
            if (data.recordsTotal == 0) {
                var NothingDiv = $('<div class="RemarkHistoryItem"><div class="line1"><p>No Progress Notes here</p></div></div>');
                finalDestination.append(NothingDiv);
                $(destination + " #remarkTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            }
        },
        error: function () {
            var NothingDiv = $('<div class="RemarkHistoryItem"><div class="line1"><p>No Progress Notes here</p></div></div>');
            $(destination + " #remarkTab #AllRemarks").append(NothingDiv);
            $(destination + " #remarkTab #boxLoading #boxLoadingMessage").hide();
            $(destination + " #remarkTab #AllRemarks").show();
        }
    });
}

//Load Task Collaborators
function ShowCollaboratorsNew(destination) {
    $(destination + " .SectionCollaborators #boxLoading #boxLoadingMessage").show();
    $(destination + " .SectionCollaborators #AllCollab").hide();
    var p_crmtasks = $(destination + " #taskid").text();
    $.ajax({
        type: "POST",
        url: "/Tasks/AddCollaboratorsData",
        data: { taskId: p_crmtasks },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            $(destination + " .SectionCollaborators .boxx #AllCollab").empty();
            $.each(data.data, function (index, item) {
                var html = ' <div class="CollaboratorsBoxx" id="' + item.CRMCollaborator_key + '"><img src="/images/profilemini.png" class="icon-image collabIcon"/>'
                    + ' <span id="collaboratorName" class="text">' + item.TxtCollaborator + '</span>';
                    //+ ' <span class="closebn" id="' + item.CRMCollaborator_key + '" onclick="deleteCollaboratorNew(this.id,\'' + destination + '\')" style="margin-right: 10px;">&times;</span></div>';
                   /* + '<img src="/images/icon-cancel.png" alt="Delete" class="deleteCollabIcon" id="' + item.CRMCollaborator_key + '" onclick="deleteCollaboratorNew(this.id,\'' + destination + '\')">';*/

                var collaboratorDiv = $(html);
                $(destination + " .SectionCollaborators .boxx #AllCollab").append(collaboratorDiv);
                $(destination + " .SectionCollaborators #boxLoading #boxLoadingMessage").hide();
                $(destination + " .SectionCollaborators #AllCollab").show();
            });

            if (data.recordsTotal == 0) {
                var NotingCollabDiv = $('<div class="CollaboratorsBoxx"><span id="collaboratorName" class="text">No Collaborators here</span></div>');
                $(destination + " .SectionCollaborators .boxx #AllCollab").append(NotingCollabDiv);
                $(destination + " .SectionCollaborators #boxLoading #boxLoadingMessage").hide();
                $(destination + " .SectionCollaborators #AllCollab").show();
            }
        },
        error: function () {
            var NotingCollabDiv = $('<div class="CollaboratorsBoxx"><span id="collaboratorName" class="text">No Collaborators here</span></div>');
            $(destination + " .SectionCollaborators .boxx #AllCollab").append(NotingCollabDiv);
            $(destination + " .SectionCollaborators #boxLoading #boxLoadingMessage").hide();
            $(destination + " .SectionCollaborators #AllCollab").show();
        }
    });

}


//Load Task Tags
function ShowTagsNew(destination) {
    $(destination + " .task-classification #boxLoading #boxLoadingMessage").show();
    $(destination + " .task-classification #tag-container").hide();
    var p_crmtasks = $("#taskid").text();
    $.ajax({
        type: "POST",
        url: "/Tasks/ShowTagsData",
        data: { TaskId: p_crmtasks },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            $(destination + " .task-classification .boxx #tag-container").empty();
            $.each(data.data, function (index, item) {
                var html = '<div class="TagsBoxx" id="' + item.tags_key + '"><span id="TagName" class="text">' + item.txttagname + '</span>'
                    //+ ' <span class="closebn" id="' + item.p_tags + '" onclick="deleteTagsNew(this.id, \'' + destination + '\')">&times;</span></div>';
                    + '<img src="/images/icon-cancel.png" alt="Delete" class="tagDeleteIcon" id="' + item.p_tags + '" onclick="deleteTagsNew(this.id, \'' + destination + '\')">';

                var TagDiv = $(html);
                $(destination + " .task-classification .boxx #tag-container").append(TagDiv);
                $(destination + " .task-classification #boxLoading #boxLoadingMessage").hide();
                $(destination + " .task-classification #tag-container").show();
            });

            if (data.recordsTotal == 0) {
                var NotingCollabDiv = $('<div class=""><span id="TagName" class="text">No Tags here</span></div>');
                $(destination + " .task-classification .boxx #tag-container").append(NotingCollabDiv);
                $(destination + " .task-classification #boxLoading #boxLoadingMessage").hide();
                $(destination + " .task-classification #tag-container").show();
            }
        },
        error: function () {
            var NotingCollabDiv = $('<div class=""><span id="TagName" class="text">No Tags here</span></div>');
            $(destination + " .task-classification .boxx #tag-container").append(NotingCollabDiv);
            $(destination + " .task-classification #boxLoading #boxLoadingMessage").hide();
            $(destination + " .task-classification #tag-container").show();
        }
    });

}


//Show Messages
function ShowMsg(msg) {
    $(".RemarkMessage #Content").text(msg);
    $('.RemarkMessage').show();
}



//Set Main-Task Values to the DetailPane
function SetMainTasktDetailPane($row, destination) {
    var $id = $row[0].id;
    var $taskKey = $.trim($id.substring($id.indexOf("-") + 1));
    var $taskid = $row.find(".Taskid").text();
    var $tasktitle = $row.find(".Tasktitle").text();
    //var $taskdescription = $row.find(".Taskdescription").text();
    var $taskdescription = $row.find(".Taskdescription span").text();
    var $taskstatus = $row.find(".Taskstatus").text();
    var $startdate = $row.find(".Startdate").text();
    var $duedate = $row.find(".Duedate").text();
    var $createdby = $row.find(".Taskcreateby").text();
    var $assignedto = $row.find(".TaskAssignedto").text();
    var $taskunder = $row.find(".Taskunder").text();

    var $priority = $row.find(".TaskPriority").text();

    $(destination + "   #taskid").text($taskid);
    $(destination + "   #taskkey").text($taskKey);
    $(destination + "   #tasktitle").text($tasktitle);
    $(destination + "   #taskdescription").text($taskdescription);
    $(destination + "   #taskstatus").text($taskstatus);
    $(destination + "   #assignedto").text($assignedto);
    $(destination + "   #startdate").text($startdate);
    $(destination + "   #duedate").text($duedate);
    $(destination + "   #creadtedby").text($createdby);


    if ($priority == "missing") {
        $priority = ""
    }
    else if ($priority == "Mid") {
        $("#taskPriority").css("color", "#f8a520")
    }
    else if ($priority == "High") {
        $("#taskPriority").css("color", "red")
    }
    else if ($priority == "Low") {
        $("#taskPriority").css("color", "green")
    }

    $(destination + "   #taskPriority").text($priority);

    if ($taskunder == 0) {
        $(destination + "   #subtask").text('Main-Task');
    }
    else {
        $(destination + "   #subtask").text('Sub-Task');
    }
   
    $(destination + " .ShareBox input[type='text']").val("");
    $(destination + " .ShareBox").hide();

    $(".RemarkMessage #Content").text("");
    $('.RemarkMessage').hide();

    $("#taskeditTab #allActivity").empty();
    $('.tabs-navWeb a:first').trigger('click'); // Default

    LoadRemarks($taskid, destination);
    ShowCollaboratorsNew(destination);
    ShowTagsNew(destination);
}

//Set Sub-Task Values to the DetailPane
function SetSubTaskDetailPane($row, destination) {
    var $id = $row[0].id;
    var $taskKey = $.trim($id.substring($id.indexOf("-") + 1));
    var $taskid = $row.find(".SubTaskid").text();
    var $tasktitle = $row.find(".SubTasktitle").text();
    //var $taskdescription = $row.find(".SubTaskdescription").text();
    var $taskdescription = $row.find(".SubTaskdescription span").text();
    var $taskstatus = $row.find(".SubTaskstatus").text();
    var $startdate = $row.find(".SubTaskStartdate").text();
    var $duedate = $row.find(".SubTaskDuedate").text();
    var $createdby = $row.find(".Taskcreateby").text();

    var $assignedto = $row.find(".TaskAssignedto").text();
    var $priority = $row.find(".TaskPriority").text();

    $(destination + "   #taskid").text($taskid);
    $(destination + "   #taskkey").text($taskKey);
    $(destination + "   #tasktitle").text($tasktitle);
    $(destination + "   #taskdescription").text($taskdescription);    
    $(destination + "   #taskstatus").text($taskstatus);
    $(destination + "   #assignedto").text($assignedto);
    $(destination + "   #startdate").text($startdate);
    $(destination + "   #duedate").text($duedate);
    $(destination + "   #subtask").text('Sub-Task');

    $(destination + "   #creadtedby").text($createdby);

    if ($priority == "missing") {
        $priority = ""
    }
    else if ($priority == "Mid") {
        $("#taskPriority").css("color", "#f8a520")
    }
    else if ($priority == "High") {
        $("#taskPriority").css("color", "red")
    }
    else if ($priority == "Low") {
        $("#taskPriority").css("color", "green")
    }
    $(destination + "   #taskPriority").text($priority);

    $(".RemarkMessage #Content").text("");
    $('.RemarkMessage').hide();

    $("#taskeditTab #allActivity").empty();
    $('.tabs-navWeb a:first').trigger('click'); // Default

    
    LoadRemarks($taskid, destination );
    $(destination + " .ShareBox input[type='text']").val("");
    $(destination + " .ShareBox").hide();

    ShowCollaboratorsNew(destination);
}

//Create Shareable link for Task
function CreateLink(destination) {
    var taskid = $(destination + " #taskid").text();
    $.post('/Tasks/CreatePublicUrlForTask', { P_CrmTasks: taskid }, function (data) {
        if (data == "logout") {
            window.location.href = "/Home/LogOut";
        }
        else {
            $(destination + " .ShareBox input[type='text']").val(data);
            $(destination + " .ShareBox").show();
        }

    })
}


//Advance filter
function SubmitFilterSort(search, order, pSize, searchMsg) {
    $('#FilterModel').modal('hide');
    chkvalesArr = [];
    $("#example div").remove();
    $("#example").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $.ajax({
        url: '/Tasks/AjaxAllTasks',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search, order: order },
        success: function (data) {
            $(".filterclose").show();
            if ($.trim(searchMsg)!="") {
                $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p>");
                $(".resultDiv").show();
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            

            sessionStorage.setItem("Total", data.recordsTotal);
            loadData(data);
        },
        error: function (data) {
            alert("Failed");
        }
    });

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

function Allselection() {
    if (!selectAll) {
        selectAll = true;
        $("#subDiv #subDivLable").text("Clear selections");
    }
    else {
        selectAll = false;
        $("#selectall").prop('checked', false);
        $('.checkboxall').each(function () {
            $(".checkboxall").prop('checked', false);
            $(this).parent().removeClass("rowChecked");
        })
        chkvalesArr = [];
        $("#subDiv").hide();
    }

}

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
        if (filter[0] == 5) {
            value = $("#filterText").val();
            col = "TaskTitle";
            search = ValueToSearch + "," + col + ":String";
            searchMsg = "Search Results: Task Title <span class='' style='font-weight: 600'> '" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        if (filter[0] == 4) {
            value = $("#filterText").val();
            col = "p_crmtasks";
            search = ValueToSearch + "," + col + ":Integer";
            searchMsg = "Search Results: TaskId <span class='' style='font-weight: 600'> '" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        if (filter[0] == 6) {
            value = $("#filterText").val();
            col = "TaskDescription";
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
        chkvalesArr = [];
        $("#example div").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Tasks/AjaxAllTasks',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
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

function StartDateSearch() {
    value1 = $("#startDateC #min").val();
    value2 = $("#startDateC #max").val();
    col = "StartDate";
    search = value1 + "," + value2 + "," + col + ":Date";
    $(".filterclose").show();
    var searchMsg = "Search Results: Start Date From<span class='' style='font-weight: 600'>'" + value1 + "'</span> To <span class='' style='font-weight: 600'>'" + value2 + "'</span>";
    JSON.stringify(search);
    var basicFilterStr = $("#filter").val() + "~#startDateC #min:" + value1 + "|#startDateC #max:" + value2;
    //sessionStorage.setItem("search", search);
    setSearchSessionStorage(search);
    setSearchMsgSessionStorage(searchMsg);
    setBasicFilterStrSessionStorage(basicFilterStr);
    var pSize = sessionStorage.getItem("PageSize");
    chkvalesArr = [];
    $("#example div").remove();
    $("#example").height(0);
    $("#loading").show();
    $('#loadingmessage').show();

    $.ajax({
        url: '/Tasks/AjaxAllTasks',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search },
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

function DueDateSearch() {
    value1 = $("#dueDateC #min").val();
    value2 = $("#dueDateC #max").val();
    col = "DueDate";
    search = value1 + "," + value2 + "," + col + ":Date";
    $(".filterclose").show();
    var searchMsg = "Search Results: Due Date From<span class='' style='font-weight: 600'>'" + value1 + "'</span> To <span class='' style='font-weight: 600'>'" + value2 + "'</span>";
    JSON.stringify(search);
    var basicFilterStr = $("#filter").val() + "~#dueDateC #min:" + value1 + "|#dueDateC #max:" + value2;
    //sessionStorage.setItem("search", search);
    setSearchSessionStorage(search);
    setSearchMsgSessionStorage(searchMsg);
    setBasicFilterStrSessionStorage(basicFilterStr);
    var pSize = sessionStorage.getItem("PageSize");
    chkvalesArr = [];
    $("#example div").remove();
    $("#example").height(0);
    $("#loading").show();
    $('#loadingmessage').show();

    $.ajax({
        url: '/Tasks/AjaxAllTasks',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search },
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


//initial search string 
function setMyTasksSearch() {
    if (sessionStorage.getItem(searchKey) == null || sessionStorage.getItem(searchKey) == "" || sessionStorage.getItem(searchKey) == undefined) {
        setSearchSessionStorage("y,mytasks:string");
        var searchMsg = "Search Results: <span class='' style='font-weight: 600'>'Your Tasks'</span>";
        var basicFilterStr = "mytasks";
        setSearchMsgSessionStorage(searchMsg)
        setBasicFilterStrSessionStorage(basicFilterStr);
    }
}

function getMyTasks() {
    $(".filterclose").removeClass("DatesMargin");
    var col = "mytasks";
    var search = "y" + "," + col + ":string";
    $(".filterclose").show();
    JSON.stringify(search);
    var searchMsg = "Search Results: <span class='' style='font-weight: 600'>'Your Tasks'</span>";
    var basicFilterStr = "mytasks";
    //sessionStorage.setItem("search", search);
    setSearchSessionStorage(search);
    setSearchMsgSessionStorage(searchMsg);
    setBasicFilterStrSessionStorage(basicFilterStr);
    //var pSize = sessionStorage.getItem("PageSize");
    var pSize = sessionStorage.getItem("pageSizeManageRegCalls");
    chkvalesArr = [];
    $("#example div ").remove();
    $("#example").height(0);
    $("#loading").show();
    $('#loadingmessage').show();
    $.ajax({
        url: '/Tasks/AjaxAllTasks',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                //$(".resultDiv .result-msg").html("<p>Search Results: <span class='' style='font-weight: 600'>'Your Tasks'</span></p>");
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
}

function getAllTasks() {
    setSearchSessionStorage("");
    reloadGrid();

}

$(document).ready(function () {
  
    //sessionStorage.clear();
    //filter list filling logic
    //var d = $("#type2").val();
    var d = $("#fvalue").val();
    var m = [];
    m = d.split("|");
    var l;
    for (i = 0; i <= m.length - 1; i = i + 1) {
        l = m[i].split("~");
        $('#filter').append($('<option>', { value: l[1] + ":" + l[2], text: l[0] }));
    };
    var a = 1;

    $("#filter").on("change", function () {
        var a = $("#filter").val();
        $(".filterDiv").css("display", "none")
        if (a != "0" && a != "1") {
            b = a.split(":");
            if (b[0] == 2) {
                var a = document.getElementById("startDateC")
                a.style.display = "";
            }
            else if (b[0] == 3) {
                var a = document.getElementById("dueDateC")
                a.style.display = "";
            }
            else if (b[0] == 4 || b[0] == 5 || b[0] == 6) {
                $("#TextC").css("display", "");
            } else if (b[0] == 7) {
                var a = document.getElementById("StatusC")
                a.style.display = "";
            }
            else if (b[0] == 8) {
                var a = document.getElementById("assignedtoC")
                a.style.display = "";
            }
            else if (b[0] == 9) {
                var a = document.getElementById("createdByC")
                a.style.display = "";
            }
            else if (b[0] == 10) {
                getMyTasks();
            }
            else if (b[0] == 11) {
                var a = document.getElementById("teamEmployeeC")
                a.style.display = "";
            }
            else if (b[0] == 12) {
                var a = document.getElementById("tagsC")
                a.style.display = "";
            }

        }
    });
    //setBasicFilterUIOnPageReload();

    sessionStorage.setItem("start", 0);
    //sessionStorage.setItem("search", "");
    //sessionStorage.setItem("order", "");
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 50 }
    var SelectedRows = "";
    setMyTasksSearch();
    GetData(0, t);
    //sessionStorage.setItem("search", null);


    var counter = 0;
    $("#Prev").on("click", function () {
        var a = sessionStorage.getItem("PageSize");
        //var b = sessionStorage.getItem("search");
        var b = sessionStorage.getItem(searchKey);
        var d = sessionStorage.getItem("start");
        //var o = sessionStorage.getItem("order");
        var o = sessionStorage.getItem(orderKey);
        var total = sessionStorage.getItem("Total");

        if (a != null) { d = (d - a) - 1; } else { d = (d - 50) - 1; }
        $("#example  div").remove();
        $("#example").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d >= 0) {
            $.post('/Tasks/AjaxAllTasks', { start: d, pSize: a, search: b, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });
    $("#Next").on("click", function () {
        var b = sessionStorage.getItem("Total");
        var a = sessionStorage.getItem("PageSize");
        //var c = sessionStorage.getItem("search");
        var c = sessionStorage.getItem(searchKey);
        var d = sessionStorage.getItem("start");
        //var o = sessionStorage.getItem("order");
        var o = sessionStorage.getItem(orderKey);
        var total = sessionStorage.getItem("Total");

        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 50 - 1; }
        $("#example div").remove();
        $("#example").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/Tasks/AjaxAllTasks', { start: d, pSize: a, search: c, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });


   

    $("#StatusFilter").on("change", function () {
        $(".filterclose").removeClass("DatesMargin");
        var text = $("#StatusFilter option:selected").text();
        var value = $("#StatusFilter").val();
        var col = "Taskstatus";
        var search = value + "," + col + ":integer";
        $(".filterclose").show();
        JSON.stringify(search);
        var searchMsg = "Search Results: Tasks Status <span class='' style='font-weight: 600'>'" + text + "'</span>";
        //sessionStorage.setItem("search", search);
        var basicFilterStr = $("#filter").val() + "~#StatusFilter:" + value;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem("PageSize");
        $("#example div ").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Tasks/AjaxAllTasks',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
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

    $("#assignedTo").on("change", function () {
        $(".filterclose").removeClass("DatesMargin");
        var text = $("#assignedTo option:selected").text();
        var value = $("#assignedTo").val();
        var col = "Assignedto";
        var search = value + "," + col + ":integer";
        $(".filterclose").show();
        JSON.stringify(search);
        var searchMsg = "Search Results: Task Assigned To <span class='' style='font-weight: 600'>'" + text + "'</span>";
        var basicFilterStr = $("#filter").val() + "~#assignedTo:" + value;
        //sessionStorage.setItem("search", search);
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem("PageSize");
        $("#example div ").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Tasks/AjaxAllTasks',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $("#fText").text(text);
                    //$(".resultDiv .result-msg").html("<p>Search Results: Task Assigned To <span class='' style='font-weight: 600'>'" + text + "'</span></p> ");
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

    $("#teamEmployee").on("change", function () {
        var text = $("#teamEmployee option:selected").text();
        var value = $("#teamEmployee").val();
        var col = "teamemptasks";
        var search = value + "," + col + ":integer";
        $(".filterclose").show();
        JSON.stringify(search);
        var searchMsg = "Search Results: Team Member <span class='' style='font-weight: 600'>'" + text + "'</span> Tasks"
        //sessionStorage.setItem("search", search);
        var basicFilterStr = "teamemptasks";
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem("PageSize");
        $("#example div ").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();
        $.ajax({
            url: '/Tasks/AjaxAllTasks',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $("#fText").text(text);
                    //$(".resultDiv .result-msg").html("<p>Search Results: Team Member <span class='' style='font-weight: 600'>'" + text + "'</span> Tasks</p> ");
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

    $("#CreatedBy").on("change", function () {
        $(".filterclose").removeClass("DatesMargin");
        var text = $("#CreatedBy option:selected").text();
        var value = $("#CreatedBy").val();
        var col = "CreatedBY";
        var search = value + "," + col + ":integer";
        $(".filterclose").show();
        JSON.stringify(search);
        var searchMsg = "Search Results: Tasks Created By <span class='' style='font-weight: 600'>'" + text + "'</span>";
        //sessionStorage.setItem("search", search);
        var basicFilterStr = $("#filter").val() + "~#CreatedBy:" + value;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem("PageSize");
        $("#example div ").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Tasks/AjaxAllTasks',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $("#fText").text(text);
                    //$(".resultDiv .result-msg").html("<p>Search Results: Tasks Created By <span class='' style='font-weight: 600'>'" + text + "'</span></p> ");
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

    $('#Tags').on('changed.bs.select', function() {
        var value = $("#Tags").val();
        if (value.length>0) {
            $("#btnTagSearch").show()
        }
        else {
            $("#btnTagSearch").hide()
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

    $(document).on('click', '.MoreDetails', function () {



    });
  
    $('a').tooltip();

});

function tagSearch() {
        $(".filterclose").removeClass("DatesMargin");
        var text = $("#Tags option:selected").map(function () { return $(this).text();}).get().join(",");
        var value = $("#Tags").val();
        var col = "m2.tagkey";
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
        $("#example div ").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Tasks/AjaxAllTasks',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $("#fText").text(text);
                    //$(".resultDiv .result-msg").html("<p>Search Results: Tags <span class='' style='font-weight: 600'>'" + text + "'</span></p> ");
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
}


function removeFilter() {
    //$(".filterDiv").css("display", "none")
    //$("#StatusFilter").val(0);
    //$("#assignedTo").val(0);
    //$("#teamEmployee").val(0);
    //$("#CreatedBy").val(0);
    //$("#filter").val(0);
    //$("#filterText").val("");
    //$("#startDateC #min").val("");
    //$("#startDateC #max").val("");
    //$("#dueDateC #min").val("");
    //$("#dueDateC #max").val("");
    //$(".filterclose").hide();

    //sessionStorage.setItem("search", "");
    //sessionStorage.setItem("order", "");
    //setSearchSessionStorage("");
    //setOrderSessionStorage("");

    //$(".resultDiv .result-msg").html("");
    //$(".resultDiv").hide();
    removeBasicAdvanceFilter();
    setMyTasksSearch();
    reloadGrid()
}



//function to get pending task of logged in emp from backend
function GetData(start, PSize) {
    //var search = sessionStorage.getItem("search");
    //var order = sessionStorage.getItem("order");
    var search = sessionStorage.getItem(searchKey);
    var order = sessionStorage.getItem(orderKey);
    if (search == null || search == "") {
        $(".resultDiv .result-msg").html("");
        $(".resultDiv").hide();
    }
    else if (search != "" && sessionStorage.getItem(searchMsgKey) !==null) {
        $(".resultDiv .result-msg").html("<p>" + sessionStorage.getItem(searchMsgKey) + "</p>");
        $(".resultDiv").show();
    }
    //setBasicFilterUIOnPageReload();

    chkvalesArr = [];
    $("#subDiv").hide();
    $("#example  div").remove();
    $("#example").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $.post('/Tasks/AjaxAllTasks', { start: start, pSize: PSize, search: search, order: order }, function (data) {
        sessionStorage.setItem("Total", data.recordsTotal);
        loadData(data);
    });
}

function reloadGrid() {
    $("#example  div").remove();
    //removeFilter();
    if ($(window).width() >= 600) {
        sessionStorage.setItem("start", 0);
        var t = sessionStorage.getItem("PageSize");
        if (t == null) { t = 50 }
        GetData(0, t)
        $(".left").removeClass("move");
        $(".h").show();
        $(".right").css('display', 'none');
        //$("#dropdown").removeClass("setStyle");
    }
    else {
        sessionStorage.setItem("start", 0);
        var t = sessionStorage.getItem("PageSize");
        if (t == null) { t = 50 }
        GetData(0, t)
        // $(".reloadhide").hide();

    }

}


function GetSubTasksData(id, pid, ctrl) {
    var parent = ctrl.parentNode.id;
    var parentid = "#" + parent;
    var toggleDiv = $("#toggleDiv-" + id);
    toggleDiv.toggle();
    if ($(ctrl).hasClass('active') == false) {
        $(ctrl).addClass('active');
        var child = $(ctrl).children(1)[0];
        $(child).removeClass("fa-angle-right").addClass("fa-angle-down");
        $(ctrl).css('cursor', 'pointer');
        $(parentid).css('color', '#3c8dbc');
    }
    else {
        $(ctrl).removeClass('active');
        var child = $(ctrl).children(1)[0];
        $(child).removeClass("fa-angle-down").addClass("fa-angle-right");
        $(parentid).css('background-color', 'transparent');
        $(parentid).css('color', '#3c8dbc');
        var child = $(ctrl).children(1)[0];
        $(child).removeClass("fa-angle-down").addClass("fa-angle-right");

    }
    $.post('/Tasks/AjaxPendingSubTasks', { under: pid }, function (data) {
        if (data !== "") {
            LoadSubTasksData(data, id);
        }
    })

}

function LoadSubTasksData(data, id) {
    var toggleDiv = $("#toggleDiv-" + id);
    toggleDiv.empty();
    var m = 0;
    $.each(data.data, function (index, item) {

        //if (item.Tags != "") {
        //    var tagsRow = $("<div id='trtags-" + item.CRMTasks_Key + "' class='col-md-12' style='margin-left:10px;width: 400px;background-color: gainsboro;margin-bottom: 0px;padding-bottom: 3px;padding-top: 3px;text-align: start;border-radius: 5px;color: black;'><b>Tags: &nbsp;</b>" + item.Tags + "</div>");
        //    toggleDiv.append(tagsRow);
        //}

        m = m + 1;
        var SubParentdiv = $("<div id='MainDiv-" + item.CRMTasks_Key + "'' class='col-md-12  submaindiv maindiv' ><input type='checkbox' onclick='chkCheckUncheck(this)' class='checkboxall' id='chk-" + item.CRMTasks_Key + "' value='" + item.CRMTasks_Key + "' /></div>");
        toggleDiv.append(SubParentdiv);
        var div = $("<div id='tr-" + item.CRMTasks_Key + "' class='collapse sub MainTr tr" + item.CRMTasks_Key + "'></div>");

        var color = "";
        if ($.trim(item.TextPriority).toLowerCase() == "high") {
            color = "red";
        }
        else if ($.trim(item.TextPriority).toLowerCase() == "low") {
            color = "green";
        }
        else if ($.trim(item.TextPriority).toLowerCase() == "mid" || $.trim(item.TextPriority).toLowerCase() == "medium") {
            color = "hsl(37deg 94% 55%)";
        }
        else {
            color = "transparent";
        }

        var statusColor = "";
        if ($.trim(item.TextTaskStatus).toLowerCase() == "active") {
            statusColor = "#5cc961";
        }
        else if ($.trim(item.TextTaskStatus).toLowerCase() == "closed") {
            statusColor = "#f57200";
        }
        else if ($.trim(item.TextPriority).toLowerCase() == "deffered") {
            statusColor = "lightgray";
        }
        else {
            statusColor = "transparent";
        }

        div.html(("<div class='Tno td basicTr' style ='width:3%; text-align:center;padding:0px;' >  <i class='fa fa-bookmark priority-icon' style='color:transparent' ></i></div >")
            + " " + ("<div class='SubTaskSno td basicTr'  style = 'width:3%;padding:0px;padding-left: 2px;' >  " + m + "</div >")
            + " " + ("<div class='SubTaskid td basicTr' style='width:5%;padding:0px;padding-left: 3px;'>" + item.P_CRMTasks + "</div>")
            + " " + ("<div class='combineCol' style='padding-left:12px;width:25%;padding-right:10px;'>"
                + "<div class='SubTasktitle td basicTr clampTr'>" + item.TaskTitle + " </div>"
                + "<div class='SubTaskdescription td basicTr clampTr'>Desc - <span>" + item.TaskDescription + "</span></div></div>")
            + " " + ("<div class='TaskPriority td basicTr' style='color:" + color + ";width:6%;' data-priority='" + item.priority + "'>" + item.TextPriority + "</div>")
            + " " + ("<div  class='SubTaskStartdate td h basicTr' style='width:9%;padding-left:8px'>" + item.FrmtStartDate + "</div>")
            + " " + ("<div class='SubTaskDuedate td h basicTr' style='width:9%;padding-left:8px'>" + item.FrmtDueDate + "</div>")
            + " " + ("<div class='SubTaskLastActionTime td h basicTr' style='width:9%;padding-left:8px'>" + item.FrmtLastActionTime + "</div>")
            + " " + ("<div class='TaskAssignedto td  basicTr' style='width:11%;padding-left:4px;'  data-assignedto='" + item.Assignedto + "' >" + item.TextAssignedto + "</div>")
            + " " + ("<div class='Taskcreateby td h basicTr' style='width:10%;padding:0;'>" + item.TextCreatedBy + "</div>")
            + " " + ("<div class='TaskTags td h basicTr clampTr' style='width:13%;padding-left:12px;'>" + item.Tags + "</div>")
            + " " + ("<div class='SubTaskstatus td basicTr' style='width:6%; text-align:center;padding-left:12px;' data-taskstatus='" + item.Taskstatus + "'><span style='display:none;'>" + item.TextTaskStatus + "</span><div class='circle' style='background-color:" + statusColor + "'></div></div>")
            + " " + ("<div class='Taskunder td' style='display:none'>" + item.Under + "</div>")
        );
        SubParentdiv.append(div);
        if ($(".right").is(":visible")) { $(".submaindiv  .h").hide(); setGridColumnCss(); }

    });
}



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
            /*$(".selectpicker").selectpicker('referesh');*/

        }
    }

}

function setGridColumnCss() {
    $(".MainTr .combineCol").addClass("setCombineCol");
    $(".MainTr .TaskPriority").addClass("setTaskPriority");
    $(".MainTr .TaskAssignedto").addClass("setCreatedBy");

    $(".TaskBar .TaskTitle").addClass("setTaskTitle");
    $(".TaskBar .TaskPriority").addClass("setTaskPriority");
    $(".TaskBar .AssignedTo").addClass("setCreatedBy");
}

function removeGridColumnCss() {
    $(".MainTr .combineCol").removeClass("setCombineCol");
    $(".MainTr .TaskPriority").removeClass("setTaskPriority");
    $(".MainTr .TaskAssignedto").removeClass("setCreatedBy");

    $(".TaskBar .TaskTitle").removeClass("setTaskTitle");
    $(".TaskBar .TaskPriority").removeClass("setTaskPriority");
    $(".TaskBar .AssignedTo").removeClass("setCreatedBy");
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

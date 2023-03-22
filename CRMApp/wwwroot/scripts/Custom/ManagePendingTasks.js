var popOverOpen = false;
var CurrentHoverRowId = 0;
var SubTaskPopupOpen = true;

//this is a sessionStorageKey for Search
var searchKey = "searchPendingTasks";
//this is a sessionStorageKey for order
var orderKey = "orderPendingTasks";
//this is a sessionStorageKey for search Criteria div value
var searchMsgKey = "searchMsgPendingTasks";
//this is a sessionStorageKey for basicFilter UI consistency on Page Reload
var basicFilterStrKey = "basicFilterStrPendingTasks";

//this is a sessionStorageKey for PageSize
var regPageSizeKey = "pageSizeManagePendingTasks"

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
        if (event.keyCode==13) {
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
        url: "/Tasks/AjaxPendingTasks",
        type: "POST",
        data: { start: 0, pSize: pSize, search: search, order: order  },
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

                //html += '<div class="line2"><span class="Remarkuser"><i class="" aria-hidden="true" ></i></span><span class="Remarkdate" style="float:right;"><i class="fa fa-calendar"></i>' + item.FrmDateTime + '</span></div>';
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

function ExportPendingTasks() {
    var search = sessionStorage.getItem(searchKey);
    var order = sessionStorage.getItem(orderKey);
    $.post('/Tasks/AjaxExportPendingTasks', { search: search, order: order }, function (data) {
        if (data.statusCode == 500) {
            window.location.href = "/Home/Error";
        }
        if (data == "0") {
            ShowMsg("No record found to export", "info");
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
        if (data.statusCode == 500) {
            window.location.href = "/Home/Error";
        }
        if (data == "") {
            window.location.href = "/Home/Logout";
        }
        else if (data == "err") {
            ShowMsg("File not found", "info");
        }
        else {
            window.location.href = "/Tasks/DownloadFile?FullFilepath=" + data.FullFilepath + "&contentType=" + data.contentType + "&filename=" + data.filename
        }

    })
}

function loadData(data) {
    $("#side").removeClass("test")
    var tblEmployee = $("#example");
    $("#example  div").remove();
    tblEmployee.css("height", "0px");
    $("#selectall").prop('checked', false);
    var a = data.draw;
    if ($("#Next").hasClass("disabledbutton") == true) {
        $("#Next").removeClass("disabledbutton");
    }
    if ($("#Prev").hasClass("disabledbutton") == true) {
        $("#Prev").removeClass("disabledbutton");
    }
    var d = sessionStorage.getItem(regPageSizeKey);
    if (d == null || d == 0 || d == "undefined") { d = 50; sessionStorage.setItem(regPageSizeKey, d); };
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

    $.each(data.data, function (index, item) {
        //if (item.Tags != "") {
        //    var tagsArr = item.Tags.split(",");
        //    var tagsRow = "<div id='trtags-" + item.CRMTasks_Key + "' class='col-md-12 tags-row'><div class='tags-wrapper'>"

        //    for (let i = 0; i < tagsArr.length; i++) {
        //        tagsRow += "<span class='tag-item'>" + tagsArr[i] + "</span>";
        //    }
        //    tagsRow += "</div></div>";
        //    tblEmployee.append(tagsRow);
        //}
        if (item.statusCode == 500) {
            window.location.href = "/Home/Error";
        }
      
        m = m + 1;
        var Parentdiv = $("<div id='MainDiv-" + item.CRMTasks_Key + "'class='col-md-12  /*clickable*/  parentdiv ' style='display: inline-flex;' width:100%;  style='overflow-x:scroll; border:1px solid black; ' onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        //if (item.hasSubtasks == "Y") {
        //    Parentdiv = $("<div id='MainDiv-" + item.CRMTasks_Key + "' class='col-md-12  carate clickable  parentdiv  viewSubTaskbycaret ' style='display: inline-flex; border-bottom:1px solid black;padding-left:5px; padding-right:0px; width:100%; ' ><input type='checkbox' onclick='chkCheckUncheck(this)' class='checkboxall' id='chk-" + item.CRMTasks_Key + "' value='" + item.CRMTasks_Key + "' style='height:15px; margin-bottom:0px;    margin-top: 2px;' /> <a onclick='GetSubTasksData(" + item.CRMTasks_Key + "," + item.P_CRMTasks + ",this)' data-target='." + item.CRMTasks_Key + "' class ='pull-left-container' style='cursor: pointer; width:9px;'> <i class='fa fa-angle-right ' style='font-size:17px; padding-left:4px; cursor: pointer; /*margin-top: 10px;padding-bottom: 20px;*/font-weight: 600; z-index:1; padding-right:0px;transition:transform .5s ease;'></i></a> <!--<i class='fa fa-bookmark colormanage' style='font-size:16px; margin-top:3px; margin-left:7px;' ></i> --> </div>");
        //}
        //else {
        //    Parentdiv = $("<div id='MainDiv-" + item.CRMTasks_Key + "' class='col-md-12   clickable  parentdiv  viewSubTaskbycaret' style='display: inline-flex; border-bottom:1px solid black; padding-left:5px; padding-right:0px; width:100%;' > <input type='checkbox' onclick='chkCheckUncheck(this)' class='checkboxall' id='chk-" + item.CRMTasks_Key + "' value='" + item.CRMTasks_Key + "' style='height:15px;  margin-bottom:0px;    margin-top: 2px;' /> <!--<i class='fa fa-bookmark colormanage' style='font-size:16px; margin-top:3px; margin-left:7px;' ></i> --> </div>");
        //}
        //Parentdiv = $("<div id='MainDiv-" + item.CRMTasks_Key + "' class='col-md-12  clickable  parentdiv  viewSubTaskbycaret' style='display: inline-flex;  ' ><input type='checkbox' class='checkboxall'' value='checkbox1' style='margin-top: 25px; margin-right:10px;' /> <a onclick='GetSubTasksData(" + item.CRMTasks_Key + "," + item.P_CRMTasks + ",this)' data-target='." + item.CRMTasks_Key + "' class ='pull-left-container' style='cursor: pointer; padding:7px;'> <i class='fa fa-angle-right' style='font-size:25px; cursor: pointer; margin-top: 10px;padding-bottom: 20px;font-weight: 600; z-index:1; padding-right:0px; padding-left:0px;'></i></a> </div>");

        if (item.hasSubtasks == "Y") {
            Parentdiv = $("<div id='MainDiv-" + item.CRMTasks_Key + "' class='col-md-12 parentdiv viewSubTaskbycaret maindiv'><input type='checkbox' onclick='chkCheckUncheck(this)' class='checkboxall' id='chk-" + item.CRMTasks_Key + "' value='" + item.CRMTasks_Key + "'/> <a onclick='GetSubTasksData(" + item.CRMTasks_Key + "," + item.P_CRMTasks + ",this)' data-target='." + item.CRMTasks_Key + "' class ='pull-left-container' style='cursor: pointer; width:9px;'> <i class='fa fa-angle-right subCarate'></i></a></div>");
        }
        else {
            Parentdiv = $("<div id='MainDiv-" + item.CRMTasks_Key + "' class='col-md-12 parentdiv viewSubTaskbycaret maindiv'><input type='checkbox' onclick='chkCheckUncheck(this)' class='checkboxall' id='chk-" + item.CRMTasks_Key + "' value='" + item.CRMTasks_Key + "'/><a onclick='return false;' class ='pull-left-container' style='cursor: pointer; width:9px;'> <i class='fa fa-angle-right subCarate' style='color:transparent;'></i></a></div>");
        }
        tblEmployee.append(Parentdiv);
       
        var div = $("<div id='tr-" + item.CRMTasks_Key + "' class='tr u col-md-12 main MainTr'></div>");

        var color = "";
        if ($.trim(item.TextPriority).toLowerCase() == "high") {
            color="red";
        }
        else if ($.trim(item.TextPriority).toLowerCase() == "low") {
           color="green";
        }
        else if ($.trim(item.TextPriority).toLowerCase() == "mid" || $.trim(item.TextPriority).toLowerCase() == "medium") {
            color="hsl(37deg 94% 55%)";
        }
        else {
           color="transparent";
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
                      +"<div class='Tasktitle td titlemanage basicTr clampTr'>" + item.TaskTitle + " </div>"
                      + "<div class='Taskdescription td basicTr clampTr'>Desc - <span>" + item.TaskDescription + "</span></div></div>")
            //+ " " + ("<div class='Tasktitle td titlemanage basicTr clampTr' style='padding-left:11px;'>" + item.TaskTitle + " </div>")
            //+ " " + ("<div class='Taskdescription td basicTr clampTr' style='margin-right:0px;padding:0 0px 0 10px;'>" + item.TaskDescription + "</div>")
            + " " + ("<div class='TaskPriority td basicTr' style='color:"+ color +" ;width:6%;' data-priority='" + item.priority + "'>" + item.TextPriority + "</div>")
            + " " + ("<div class='Startdate td h basicTr' style='width:9%;padding-left:10px;'>" + item.FrmtStartDate + "</div>")
            + " " + ("<div class='Duedate td h basicTr' style='width:9%;padding-left:10px;'>" + item.FrmtDueDate + "</div>")
            + " " + ("<div class='LastActionTime td h basicTr' style='width:10%;padding-left:10px;'>" + item.FrmtLastActionTime + "</div>")
            + " " + ("<div class='TaskAssignedto h td basicTr' style='width:11%;padding-left:13px;' data-assignedto='" + item.Assignedto + "'>" + item.TextAssignedto + "</div>")
            + " " + ("<div class='Taskcreateby td basicTr' style='width:10%;padding-left:6px;'>" + item.TextCreatedBy + "</div>")
            + " " + ("<div class='TaskTags td h basicTr clampTr' style='width:13%;padding-left:12px;'>" + item.Tags + "</div>")
            + " " + ("<div class='Taskstatus td basicTr' style='width:5%; text-align:center;padding-left:13px;' data-taskstatus='" + item.Taskstatus + "'><span style='display:none;'>" + item.TextTaskStatus + "</span><div class='circle' style='background-color:" + statusColor + "'></div></div>")
            //+ " " + ("<div class='Taskstatus td basicTr' style='width:7%; text-align:center;padding-left:13px;' data-taskstatus='" + item.Taskstatus + "'>" + item.TextTaskStatus + "</div>")
            //+ " " + ("<div class='Startdate td h basicTr' style='width:11%;; padding-left:8px;'>" + item.FrmtStartDate + "</div>")
            //+ " " + ("<div class='Duedate td basicTr' style='width:11%;padding-left:8px;'>" + item.FrmtDueDate + "</div>")
            //+ " " + ("<div class='TaskAssignedto td basicTr' style='width:11%;padding-left:9px;' data-assignedto='" + item.Assignedto + "'>" + item.TextAssignedto + "</div>")
            //+ " " + ("<div class='Taskcreateby td basicTr' style='width:10%;padding:0;'>" + item.TextCreatedBy + "</div>")
            + " " + ("<div class='Taskunder td' style='display:none'>" + item.Under + "</div>")
            //+ " " + ("<div class='TaskPriority td' style='display:none' data-priority='" + item.priority + "'>" + item.TextPriority + "</div>")

            );
        
        Parentdiv.append(div);

        togglediv = $("<div class='SubtaskBox' id='toggleDiv-" + item.CRMTasks_Key + "' class='col-md-12'><div id='loading' style='padding:10px;'><div colspan='5'><div id='loadingmessage' class='loader overlay col-md-offset-6' style='margin: 10px auto;'></div><p id='Msg'></p></div></div></div>");
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
        $("#example").css("height", "0px");
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
        $('.right').on('click', '#RightShift', function () {
            var isSomethingTrue = true;
            if (isSomethingTrue && ($(window).width() >= 600)) {
               
                var lastChkbox = $(".maindiv.rowActive").find(".checkboxall")[0];
                if (lastChkbox !== undefined) {
                    $(lastChkbox).attr("checked", false);
                    chkCheckUncheck(lastChkbox);
                }

                $(".maindiv").removeClass("rowActive");
                $(".main").css("display", "inline-flex");
                $("#dropdown").removeClass("setStyle");
                $(".right").hide();
                $(".left").show();
                $(".left").removeClass("move");
                $(".h").show();
                $("div").removeClass("style");
                $("div").css("box-shadow", "none");
                $(".right").css('display', 'none');
                Deviceheight();
                removeGridColumnCss();




                //$(".SubTaskSno").removeClass("sno");
                //$(".SubTaskid").removeClass("id");
                //$(".SubTasktitle").removeClass("tasktitle");
                //$(".SubTaskdescription").removeClass("taskdesc");
                //$(".SubTaskstatus").removeClass("taskstat");
                //$(".SubTaskDuedate").removeClass("date");
            }
            else if (isSomethingTrue && ($(window).width() <= 600)) {
                $(".right").hide();
                $(".left").show();
                $(".left").removeClass("move");
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
    var s = "<p class='newTitle' >Pending Tasks</p>";
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

            //$(".Taskdescription").css("margin-right", "0px");
            //$("#dropdown").addClass("setStyle");
            $(".right").css("display", "flex");
            $(".left").addClass("move");
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
            //$("#dropdown").addClass("setStyle");
            //$(this).addClass("style");
            
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
            //$(this).parent("div").addClass("style");
            $(".right").show();
            $(".right").css("display", "flex");
            $(".left").addClass("move");
            //$(".Taskstatus").addClass(".mov");
            $(".h").hide();

            setGridColumnCss();

            //$(".Tno").addClass("tno");
            //$(".SubTaskSno").addClass("sno");
            //$(".SubTaskid").addClass("id");
            //$(".SubTasktitle").addClass("tasktitle");
            //$(".SubTaskdescription").addClass("taskdesc");
            //$(".SubTaskstatus").addClass("taskstat");
            //$(".SubTaskDuedate").addClass("date");
            //$('.TaskAssignedto').addClass("assign");
            //$(".Taskcreateby").addClass("create");
            //$(".SNo").addClass("ssno")
            //$(".TaskId").addClass("sid")
            //$(".TaskTitle").addClass("stitle")
            //$(".TaskDescription").addClass("sdesc")
            //$(".TaskStatus").addClass("sstat")
            //$(".CreatedBy").addClass("screate")
            //$(".DueDate").addClass("sdue");
            //$(".AssignedTo").addClass("sassign");


            //$(".Sno").addClass("sno");
            //$(".Taskid").addClass("id");
            //$(".Tasktitle").addClass("tasktitle");
            //$(".Taskdescription").addClass("taskdesc");
            //$(".Taskstatus").addClass("taskstat");
            //$(".Duedate").addClass("date");
            var $row = $(this).closest("div");
            SetSubTaskDetailPane($row, ".right")
        }
    });


    //Mobile detailpane onclick function
    $('#example').on('click', '.u', function () {
        var isSomethingTrue = true;
        if (isSomethingTrue && ($(window).width() <= 600)) {
            //$("#dropdown").addClass("setStyle");
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
    var h = $(".content-wrapper").css("min-height")
    $("#example").height(h);
    //var Header = $("header").outerHeight(true);
    //var Container = 0;
    //var icondiv = $(".calHeightIcon").outerHeight(true);
    //var TableDive = $(".calHeightTaskBar").outerHeight(true);
    //var Footer = $(".main-footer").outerHeight(true);
    //var windowHeight = $(window).outerHeight(true);
    //var SumOfElementHeight = Header + Container + TableDive + icondiv + Footer;
    //var MainHeight = windowHeight - SumOfElementHeight - 10; //- 40;
    //$("#example").height(MainHeight);
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

    //$(window).resize(function () {
    //    resizewidth();
    //    Deviceheight();
    //    DetailPaneHeight();
    //});
});
// End Of Function

function setGridColumnCss() {
    $(".MainTr .combineCol").addClass("setCombineCol");
    $(".MainTr .TaskPriority").addClass("setTaskPriority");
    $(".MainTr .Taskcreateby").addClass("setCreatedBy");

    $(".TaskBar .TaskTitle").addClass("setTaskTitle");
    $(".TaskBar .TaskPriority").addClass("setTaskPriority");
    $(".TaskBar .CreatedBy").addClass("setCreatedBy");
}

function removeGridColumnCss() {
    $(".MainTr .combineCol").removeClass("setCombineCol");
    $(".MainTr .TaskPriority").removeClass("setTaskPriority");
    $(".MainTr .Taskcreateby").removeClass("setCreatedBy");

    $(".TaskBar .TaskTitle").removeClass("setTaskTitle");
    $(".TaskBar .TaskPriority").removeClass("setTaskPriority");
    $(".TaskBar .CreatedBy").removeClass("setCreatedBy");
}


//Set  destop detail pane height according to screen 
function DetailPaneHeight() {
    //var Header = $("header").outerHeight(true);
    //var Footer = $(".main-footer").outerHeight(true);
    //var windowHeight = $(window).outerHeight(true);
    //var SumOfElementHeight = Header + Footer;
    //var MainHeight = windowHeight - SumOfElementHeight;//- 20;
    //$(".right").height(MainHeight);
    var h = $(".content-wrapper").css("min-height")
    var a = parseFloat(h)
    $(".right").height(a + 130);
}

//Table height will change according to Sidebar height

     //Sidebar = $(".sidebar")[0];
     //var resizeObserver = new ResizeObserver(() => {
     //   var sidebarposition = side.getBoundingClientRect();
     //   $("#example").height(sidebarposition.height - 120)
     //   $(".right").height(sidebarposition.height)
     //   if ($(Sidebar).hasClass("test")) {
     //        $("#example").height(0)
     //   }

     // });

     //resizeObserver.observe(Sidebar);

var Sidebar = $(".sidebar")[0];
var resizeObserver = new ResizeObserver((event) => {
    var h = $(".content-wrapper").css("min-height")
    $("#example").height(h);
    var a = parseFloat(h)
    $(".right").height(a+130)
    if ($(Sidebar).hasClass("test")) {
        $("#example").height(0)
    }
});
resizeObserver.observe(Sidebar);
   

//Show controls to edit task
function ShowEditTask(destination) {
    //Hide
    $(destination + " #editIcon").hide();
    $(destination + " #addSubTask").hide();
    $(destination + " #tasktitle").hide();
    $(destination + " #taskdescription").hide();
    $(destination + " #duedate").hide();
    $(destination + " #taskstatus").hide();
    $(destination + " #assignedto").hide();
    $(destination + " #taskPriority").hide();

    //Show
    $(destination + " #SaveTask").show();
    $(destination + " #txttasktitle").show();
    $(destination + " #txttaskdescription").show();
    $(destination + " #CancleEdit").show();
    $(destination + " #dtduedate").show();
    $(destination + " #ddlAssignedto").show();
    $(destination + " #ddlTaskStatus").show();
    $(destination + " #ddlTaskPriority").show();

}

//Close Controls to edit task
function CancleEditTask(destination) {
    //Show
    $(destination + " #editIcon").show();
    $(destination + " #taskdescription").show();
    $(destination + " #duedate").show();
    $(destination + " #addSubTask").show();
    $(destination + " #tasktitle").show();
    $(destination + " #taskstatus").show();
    $(destination + " #assignedto").show();
    $(destination + " #taskPriority").show();

    //Hide
    $(destination + " #SaveTask").hide();
    $(destination + " #txttaskdescription").hide();
    $(destination + " #txttasktitle").hide();
    $(destination + " #CancleEdit").hide();
    $(destination + " #dtduedate").hide();
    $(destination + " #ddlAssignedto").hide();
    $(destination + " #ddlTaskStatus").hide();
    $(destination + " #ddlTaskPriority").hide();
}


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
                var m = (a) + index;
                //Load Data 
                var html = '<div class="RemarkHistoryItem col-sm-12 HistoryItem" id="' + item.CRMCommunication_key + '">'
                    + '<div class="line1"><span>' + m + '.</span>'
                    //<div><i class="fa fa-comment"></i></div>
                    + '<div class="text">' + item.Commtext + '<span style="padding-right:0;"> (Id -</span> <span id="commid" style="padding-right:0;">' + item.CRMCommunication_key + '</span><span>)</span></div></div>'
                    + '<div class="line2"><span class="Remarkuser">'
                //<i class="fa fa-user" aria-hidden="true"></i>
                //+ '<img src="/images/profilemini.png"> '+ item.TextLogincode + '</span><span class="Remarkdate" style="float:right;"><i class="fa fa-calendar"></i>' + item.FrmtCreationDate + '</span></div>';
                + '<img src="/images/profilemini.png"> ' + item.TextLogincode + '</span><span class="Remarkdate" style="float:right;"><img src="/images/calender.png"> ' + item.FrmtCreationDate + '</span></div>';
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
                //var html = ' <div class="CollaboratorsBoxx" id="' + item.CRMCollaborator_key + '"><i class="fa fa-user collabIcon" aria-hidden="true"></i>'
                var html = ' <div class="CollaboratorsBoxx" id="' + item.CRMCollaborator_key + '"><img src="/images/profilemini.png" class="icon-image collabIcon"/>'
                    + ' <span id="collaboratorName" class="text">' + item.TxtCollaborator + '</span>'
                //+ ' <span class="closebn" id="' + item.CRMCollaborator_key + '" onclick="deleteCollaboratorNew(this.id,\'' + destination + '\')" style="margin-right: 10px;">&times;</span></div>';
                + '<img src="/images/icon-cancel.png" alt="Delete" class="deleteCollabIcon" id="' + item.CRMCollaborator_key + '" onclick="deleteCollaboratorNew(this.id,\'' + destination + '\')">';

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

//Delete Task Collaborators
function deleteCollaboratorNew(id, destination) {
    $.ajax({
        type: "GET",
        url: "/Tasks/DeleteCollaborator",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        data: { id: id },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                ShowMsg("Collaborator deleted Successfully", "success");
                ShowCollaboratorsNew(destination);
            }
        },
        error: function () {
            ShowMsg("Something went wrong,Please try again later.", "error");
        }
    });
}

//Add new Task Collaborator
function SubmitCollaboratorsNew(destination) {
    var TaskId = $(destination + " #taskid").text();
    var selectedCollaborator = $(destination + " #ddlCollab").val();
    var Taskkey = $(destination + "   #taskkey").text();
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
                    ShowMsg("This user is already a collaborator","info");
                    return true;
                }
                else if (data == "true") {
                 ShowMsg("Collaborator added Successfully.","success");
                closeAddCollab(destination);
                ShowCollaboratorsNew(destination);
                }
                else {
                    ShowMsg("Something went wrong,Please try again later.", "error");
                }
            },
            error: function () {
                ShowMsg("Something went wrong,Please try again later.", "error");
            }
        });
    }

}

//Show Controls to Add new Task Collaborator
function AddCollaboratorsNew(destination) {
    $(destination + " .SectionCollaborators #AddCollab").hide();
    $(destination + " .SectionCollaborators #ddlCollab").show();
    $(destination + " .SectionCollaborators #closeAddCollab").show();
}

//Close Controls of Add new Task Collaborator
function closeAddCollab(destination) {
    $(destination + " .SectionCollaborators #AddCollab").show();
    $(destination + " .SectionCollaborators #ddlCollab").val(0);
    $(destination + " .SectionCollaborators #ddlCollab").hide();
    $(destination + " .SectionCollaborators #closeAddCollab").hide();
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

//Delete Task Collaborators
function deleteTagsNew(p_tags, destination) {
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
            }
            else {
                ShowMsg("Tag deleted Successfully", "success");
                ShowTagsNew(destination);
            }
        },
        error: function () {
            ShowMsg("Something went wrong,Please try again later.", "error");
        }
    });
}

//Add new Task Tag
function SubmitTagsNew(destination) {
    var TaskId = $(destination + " #taskid").text();
    var selectedTag = $(destination + " #ddlTags").val();
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
                    ShowMsg("This tag is already added","info");
                    return true;
                }
                else if (data == "true") {
                    ShowMsg("Tag added Successfully.","success");
                    closeTag(destination);
                    ShowTagsNew(destination);
                }
                else {
                    ShowMsg("Something went wrong,Please try again later.", "error");
                }
            },
            error: function () {
                ShowMsg("Something went wrong,Please try again later.", "error");
            }
        });
    }

}

//Show Controls to Add new Task Tag
function AddTagsNew(destination) {
    $(destination + " .task-classification #PlusTag").hide();
    $(destination + " .task-classification #ddlTags").show();
    $(destination + " .task-classification #closeTag").show();
}

//Close Controls of Add new Task Tag
function closeTag(destination) {
    $(destination + " .task-classification #PlusTag").show();
    $(destination + " .task-classification #ddlTags").val(0);
    $(destination + " .task-classification #ddlTags").hide();
    $(destination + " .task-classification #closeTag").hide();
}

//Submit Task Edit
function SubmitEditTask(destination) {
    //NextActionDate: $("#dtmNextActionDate").val()
    var formData = {
        P_CRMTasks: $(destination + " #taskid").text(),
        TaskTitle: $(destination + " #txttasktitle").val(),
        TaskDescription: $(destination + " #txttaskdescription").val(),
        duedate: $(destination + " #dtduedate").val(),
        Taskstatus: $(destination + " #ddlTaskStatus").val(),
        Assignedto: $(destination + " #ddlAssignedto").val(),
        priority: $(destination + " #ddlTaskPriority").val()
    };
    $.ajax({
        type: "POST",
        url: "/Tasks/EditTask",
        data: formData,
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            else if (data == "err-close") {
                ShowMsg("To close this task first close all subtasks of this task","info");
            }
            else if (data == "success") {
                ShowMsg("Edited Successfully","success");
                window.location.href = '/Tasks/ManagePendingTasks';
            }
            else if (data == "err-try") {
                ShowMsg("Something went wrong,Please try again later.", "error");
            }
        },
        error: function () {
            ShowMsg("Error in loading data.", "error");
        }
    });

    return false;
}

//Show Messages
function ShowMsg(msg,msgType) {
    var bgColor = "";
    switch ($.trim(msgType).toLowerCase()) {
        case "success":
            bgColor = "#4abc4a"; 
            break;

        case "info":
            bgColor = "#53bcf1"; 
            break;

        case "warning":
            bgColor = "#d0b62d"; 
            break;

        case "error":
            bgColor = "#e82121"; 
            break;

        default:
            bgColor = "#53bcf1";
    }

    $(".RemarkMessage").css("background-color", bgColor);
    $(".RemarkMessage #Content").text(msg);
    $('.RemarkMessage').show();
    setTimeout(function () { $('.RemarkMessage').hide(); }, 7000);
}

//Submit Task Remark
function SubmitTaskRemarkNew(destination) {
    var formdata = new FormData();
    var remark = $(destination + " #frmRemarkRight #txtRemark").val();
    formdata.append('remark', remark);
    var taskId = $(destination + " #taskid").text();
    formdata.append('taskId', taskId);
    var file = $(destination + ' #frmRemarkRight #remarkfile')[0].files[0];
    formdata.append('file1', file)
    if ($.trim(remark) != "" || typeof file !== "undefined") {
        //Creating an XMLHttpRequest and sending
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/Tasks/AddTasksRemark');
        xhr.send(formdata);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                ShowMsg("Remark added Successfully","success");
                var taskpid = $(destination + " #taskid").text();
                LoadRemarks(taskpid, destination);
            }
        }
        $(destination + " #frmRemarkRight #txtRemark").val("");
        $(destination + ' #frmRemarkRight #remarkfile').val("");
    }
    else {
        //ShowMsg("Please fill at lease one");
        ShowMsg("Please enter progress note or choose a file.","error");
    }

    return false;
}

//Set Main-Task Values to the DetailPane
function SetMainTasktDetailPane($row, destination) {
    var $id = $row[0].id;
    var $taskKey = $.trim($id.substring($id.indexOf("-") + 1));
    var $taskid = $row.find(".Taskid").text();
    var $tasktitle = $row.find(".Tasktitle").text();
    var $taskdescription = $row.find(".Taskdescription span").text();
    var $taskstatus = $row.find(".Taskstatus span").text();
    var $startdate = $row.find(".Startdate").text();
    var $duedate = $row.find(".Duedate").text();
    var $createdby = $row.find(".Taskcreateby").text();

    var $ddltaskstatus = $row.find(".Taskstatus").attr("data-taskstatus");
    var $assignedto = $row.find(".TaskAssignedto").text();
    var $ddlassignedto = $row.find(".TaskAssignedto").attr("data-assignedto");
    var $taskunder = $row.find(".Taskunder").text();

    var $priority = $row.find(".TaskPriority").text();
    var $ddlpriority = $row.find(".TaskPriority").attr("data-priority");
   
    $(destination + "   #taskid").text($taskid);
    $(destination + "   #taskkey").text($taskKey);
    $(destination + "   #tasktitle").text($tasktitle);
    $(destination + "   #txttasktitle").text($tasktitle);
    $(destination + "   #taskdescription").text($taskdescription);
    $(destination + "   #txttaskdescription").text($taskdescription);
    $(destination + "   #taskstatus").text($taskstatus);
    $(destination + "   #ddlTaskStatus").val($ddltaskstatus);
    $(destination + "   #assignedto").text($assignedto);
    $(destination + "   #ddlAssignedto").val($ddlassignedto);
    $(destination + "   #startdate").text($startdate);
    $(destination + "   #duedate").text($duedate);
    $(destination + "   #creadtedby").text($createdby);


    if ($priority == "missing") {
        $priority = ""
    }
    else if ($priority == "Mid") {
        $("#taskPriority").css("color","#f8a520")
    }
    else if ($priority == "High") {
        $("#taskPriority").css("color", "red")
    }
    else if ($priority == "Low") {
        $("#taskPriority").css("color", "green")
    }
  
    $(destination + "   #taskPriority").text($priority);
    console.log($priority)

    $(destination + "   #ddlTaskPriority").val($ddlpriority);


    if ($taskunder == 0) {
        $(destination + "   #subtask").text('Main-Task');
    }
    else {
        $(destination + "   #subtask").text('Sub-Task');
    }
    

    //if ($duedate!="") {
    //    var dateArr1 = $duedate.split(" ");
    //    var dateArr2 = dateArr1[0].split("/");
    //    var dtduedate = dateArr2[2] + '-' + dateArr2[1] + '-' + dateArr2[0];
    //    $(destination + " #dtduedate").val(dtduedate);
    //}
    //else {
    //    var crtDate = new Date();
    //    var month = (crtDate.getMonth() + 1)<10 ? '0' + (crtDate.getMonth() + 1) : (crtDate.getMonth() + 1) ;
    //    var day = crtDate.getDate() < 10 ? '0' + crtDate.getDate() : crtDate.getDate();
    //    var dtduedate =crtDate.getFullYear() + "-" + month + "-" + day ;
    //    $(destination + " #dtduedate").val(dtduedate);
    //}

    if ($duedate!="") {
        var dateArr1 = $duedate.split(" ");
        var dateArr2 = dateArr1[0].split("/");
        var dtduedate = dateArr2[2] + '-' + dateArr2[1] + '-' + dateArr2[0] + "T" + dateArr1[1];
        $(destination + " #dtduedate").val(dtduedate);
    }
    else {
        var crtDate = new Date();
        var month = (crtDate.getMonth() + 1)<10 ? '0' + (crtDate.getMonth() + 1) : (crtDate.getMonth() + 1) ;
        var day = crtDate.getDate() < 10 ? '0' + crtDate.getDate() : crtDate.getDate();
        var hour = crtDate.getHours().toString().padStart(2, "0");
        var minute = crtDate.getMinutes().toString().padStart(2, "0");
        var dtduedate =crtDate.getFullYear() + "-" + month + "-" + day +"T"+hour+":"+minute;
        $(destination + " #dtduedate").val(dtduedate);
    }
    

   
    $(destination + " .ShareBox input[type='text']").val("");
    $(destination + " .ShareBox").hide();

    $(".RemarkMessage #Content").text("");
    $('.RemarkMessage').hide();

    $("#taskeditTab #allActivity").empty();
    $('.tabs-navWeb a:first').trigger('click'); // Default

    $(".detailPane").scrollTop(0);
    CloseDiv('#TaskCloseModal')

    CancleEditTask(destination);
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
    var $taskdescription = $row.find(".SubTaskdescription span").text();
    var $taskstatus = $row.find(".SubTaskstatus span").text();
    var $startdate = $row.find(".SubTaskStartdate").text();
    var $duedate = $row.find(".SubTaskDuedate").text();
    var $createdby = $row.find(".Taskcreateby").text();

    var $assignedto = $row.find(".TaskAssignedto").text();
    var $ddltaskstatus = $row.find(".SubTaskstatus").attr("data-taskstatus");
    var $ddlassignedto = $row.find(".TaskAssignedto").attr("data-assignedto");


    var $priority = $row.find(".TaskPriority").text();
    var $ddlpriority = $row.find(".TaskPriority").attr("data-priority");
 
    $(destination + "   #taskid").text($taskid);
    $(destination + "   #taskkey").text($taskKey);
    $(destination + "   #tasktitle").text($tasktitle);
    $(destination + "   #txttasktitle").text($tasktitle);
    $(destination + "   #taskdescription").text($taskdescription);
    $(destination + "   #txttaskdescription").text($taskdescription);
    $(destination + "   #taskstatus").text($taskstatus);
    $(destination + "   #ddlTaskStatus").val($ddltaskstatus);
    $(destination + "   #assignedto").text($assignedto);
    $(destination + "   #ddlAssignedto").val($ddlassignedto);
    $(destination + "   #startdate").text($startdate);
    $(destination + "   #duedate").text($duedate);
    $(destination + "   #subtask").text('Sub-Task');

    $(destination + "   #creadtedby").text($createdby);

    //if ($priority == "missing") {
    //    $priority = ""
    //}

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
   
    $(destination + "   #ddlTaskPriority").val($ddlpriority);


    //var dateArr1 = $duedate.split(" ");
    //var dateArr2 = dateArr1[0].split("/");
    //var dtduedate = dateArr2[2] + '-' + dateArr2[1] + '-' + dateArr2[0];
    //$(destination + " #dtduedate").val(dtduedate);

    if ($duedate != "") {
    var dateArr1 = $duedate.split(" ");
    var dateArr2 = dateArr1[0].split("/");
        var dtduedate = dateArr2[2] + '-' + dateArr2[1] + '-' + dateArr2[0] + "T" + dateArr1[1];
    $(destination + " #dtduedate").val(dtduedate);
    }
    else {
        var crtDate = new Date();
        var month = (crtDate.getMonth() + 1) < 10 ? '0' + (crtDate.getMonth() + 1) : (crtDate.getMonth() + 1);
        var day = crtDate.getDate() < 10 ? '0' + crtDate.getDate() : crtDate.getDate();
        var hour = crtDate.getHours().toString().padStart(2, "0");
        var minute = crtDate.getMinutes().toString().padStart(2, "0"); 
        var dtduedate = crtDate.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + minute;
        $(destination + " #dtduedate").val(dtduedate);
    }

    $(".RemarkMessage #Content").text("");
    $('.RemarkMessage').hide();

    $("#taskeditTab #allActivity").empty();
    $('.tabs-navWeb a:first').trigger('click'); // Default

    CancleEditTask(destination);
    LoadRemarks($taskid, destination );
    $(destination + " .ShareBox input[type='text']").val("");
    $(destination + " .ShareBox").hide();

    $(".detailPane").scrollTop(0);
    CloseDiv('#TaskCloseModal')

    ShowCollaboratorsNew(destination);
    ShowTagsNew(destination);
}

//Create Shareable link for Task
function CreateLink(destination) {
    var taskid = $(destination + " #taskid").text();
    $.post('/Tasks/CreatePublicUrlForTask', { P_CrmTasks: taskid }, function (data) {
        if (data.statusCode == 500) {
            window.location.href = "/Home/Error";
        }
        if (data == "logout") {
            window.location.href = "/Home/LogOut";
        }
        else {
            $(destination + " .ShareBox input[type='text']").val(data);
            $(destination + " .ShareBox").show();
        }

    })
}

function AddSubTask(destination) {
    var TaskPid = $(destination + " #taskid").text();
    $.ajax({
        type: "GET",
        url: '/Tasks/CRMSubTasksForm?PCRMTasks=' + TaskPid,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        data: { exitmode: "ManagePendingTasks", PCRMTasks: TaskPid },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                $('#CreateCRMSubTasks').html(data);
                $('#CreateSubTasks').modal(options);
                $('#CreateSubTasks').modal();
                $(".PanelForm").css({ "width": "252px" });
                $(".Task").css({ "margin-top": "0px", "margin-bottom": "10px" });
                $(".hr").css("margin-bottom", "20px")
                $(".hr").append('<hr />')
                $(".mainpanel").css({ "margin-left": "20px", "padding-left": "5px", "width": "270px" });
                $(".mainpanel").css('margin-top', '20px');
                $(".labeltext").css({ "margin-bottom": "10px" });
                $(".mainbutton").css({ "margin": "20px 0px 20px 15px" });
                //$("#frmTags").selectpicker('refresh');
            }
        },

    })
}

//Show Confirmation PopUp modal before close a task
function ShowCloseTaskModal(destination) {
    $("#TaskCloseModal").show();
}

//Close a task
function CloseTask() {
    var destination = $("#TaskCloseModal #destinationName").val();
    var TaskKey = $(destination + " #taskkey").text();
    $("#TaskCloseModal").hide();
    $.post('/Tasks/TaskClose', { id: TaskKey }, function (data) {
        if (data == "") {
            window.location.href = "/Home/LogOut";
            return true;
        }
        else if (data == "HasSubTask") {
            ShowMsg("This task contains Subtasks. Please close them first","info");
            return false;
        }
        else if (data == "true") {
            ShowMsg("Task Closed Successfully","success");
            window.location.href = '/Tasks/ManagePendingTasks';
            return false;
        }
    });
}

//Show Confirmation PopUp modal before close a task
function ShowMultiTaskCloseModal() {
    var TaskKeys = "";
    for (var i = 0; i < chkvalesArr.length; i++) {
        var val = chkvalesArr[i];
        TaskKeys += TaskKeys == "" ? val : "," + val;
    }
    if ($.trim(TaskKeys) !== "") {
        $("#MultiTaskCloseModal").show();
        $("#MultiTaskCloseModal #taskKeys").val(TaskKeys);
    }
    else {
        ShowMsg("Please select at least 1 Task.", "error");
    } 
}




//Close Multiple task
function CloseMultipleTask() {
    var taskKeys = $("#MultiTaskCloseModal #taskKeys").val();
    $("#MultiTaskCloseModal").hide();
    $.post('/Tasks/MultipleTaskClose', { TaskKeys: taskKeys }, function (data) {
        if (data == "") {
            window.location.href = "/Home/LogOut";
            return true;
        }
        ShowMsg(data[0], data[1]);
        
    });
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
        url: '/Tasks/AjaxPendingTasks',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search, order: order },
        success: function (data) {
            //$(".filterclose").show();
            if ($.trim(searchMsg)!="") {
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

//Basic filter multiple
function SubmitBasicFilter(search, searchMsg) {
    console.log(sessionStorage.getItem(basicFilterStrKey));
    chkvalesArr = [];
    var pSize = sessionStorage.getItem(regPageSizeKey);
    $("#example div").remove();
    $("#example").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();

    $.ajax({
        url: '/Tasks/AjaxPendingTasks',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search},
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
    //$(".filterclose").removeClass("DatesMargin");
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
        //$(".filterclose").show();
        JSON.stringify(search);

        //sessionStorage.setItem("search", search);
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem(regPageSizeKey);
        chkvalesArr = [];
        $("#example div").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Tasks/AjaxPendingTasks',
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
    //$(".filterclose").show();
    var searchMsg = "Search Results: Start Date From<span class='' style='font-weight: 600'>'" + value1 + "'</span> To <span class='' style='font-weight: 600'>'" + value2 + "'</span>";
    JSON.stringify(search);
    //(#filter).val()~ActualFilterId:value
    var basicFilterStr = $("#filter").val() + "~#startDateC #min:" + value1 + "|#startDateC #max:" + value2;
    //sessionStorage.setItem("search", search);
    setSearchSessionStorage(search);
    setSearchMsgSessionStorage(searchMsg);
    setBasicFilterStrSessionStorage(basicFilterStr);
    var pSize = sessionStorage.getItem(regPageSizeKey);
    chkvalesArr = [];
    $("#example div").remove();
    $("#example").height(0);
    $("#loading").show();
    $('#loadingmessage').show();

    $.ajax({
        url: '/Tasks/AjaxPendingTasks',
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
    //$(".filterclose").show();
    var searchMsg = "Search Results: Due Date From<span class='' style='font-weight: 600'>'" + value1 + "'</span> To <span class='' style='font-weight: 600'>'" + value2 + "'</span>";
    JSON.stringify(search);
    //sessionStorage.setItem("search", search);
    //(#filter).val()~ActualFilterId:value
    var basicFilterStr = $("#filter").val() + "~#dueDateC #min:" + value1 + "|#dueDateC #max:" + value2;
    setSearchSessionStorage(search);
    setSearchMsgSessionStorage(searchMsg);
    setBasicFilterStrSessionStorage(basicFilterStr);
    var pSize = sessionStorage.getItem(regPageSizeKey);
    chkvalesArr = [];
    $("#example div").remove();
    $("#example").height(0);
    $("#loading").show();
    $('#loadingmessage').show();

    $.ajax({
        url: '/Tasks/AjaxPendingTasks',
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
    //$(".filterclose").show();
    JSON.stringify(search);
    var searchMsg = "Search Results: <span class='' style='font-weight: 600'>'Your Tasks'</span>";
    //sessionStorage.setItem("search", search);
    var basicFilterStr = "mytasks";
    setSearchSessionStorage(search);
    setSearchMsgSessionStorage(searchMsg)
    setBasicFilterStrSessionStorage(basicFilterStr);
    var pSize = sessionStorage.getItem(regPageSizeKey);
    chkvalesArr = [];
    $("#example div ").remove();
    $("#example").height(0);
    $("#loading").show();
    $('#loadingmessage').show();
    $.ajax({
        url: '/Tasks/AjaxPendingTasks',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                //$(".resultDiv .result-msg").html("<p>Search Results: <span class='' style='font-weight: 600'>'Your Tasks'</span></p>");
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

function getAllTasks() {
    setSearchSessionStorage("");
    reloadGrid(); 
   
}

$(document).ready(function () {

    //$('#ddlmultiTags').SumoSelect({ okCancelInMulti: true, triggerChangeCombined: true, placeholder: 'Select Tag' });
    //$(".okCancelInMulti .btnOk").text("Apply");
    //$(".okCancelInMulti .btnCancel").text("Close");



    //sessionStorage.clear();
    //filter list filling logic
    //var d = $("#type2").val();


    //var d = $("#fvalue").val();
    //var m = [];
    //m = d.split("|");
    //var l;
    //for (i = 0; i <= m.length - 1; i = i + 1) {
    //    l = m[i].split("~");
    //    $('#filter').append($('<option>', { value: l[1] + ":" + l[2], text: l[0] }));
    //};
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
            else if (b[0] == 13) {
                var a = document.getElementById("priorityC")
                a.style.display = "";
            }

        }
    });
    //setBasicFilterUIOnPageReload();

    sessionStorage.setItem("start", 0);
    //sessionStorage.setItem("search", "");
    //sessionStorage.setItem("order", "");
    var t = sessionStorage.getItem(regPageSizeKey);
    if (t == null) { t = 50 }
    var SelectedRows = "";

    setMyTasksSearch();
    
    GetData(0, t);
    //sessionStorage.setItem("search", null);

    

    var counter = 0;
    $("#Prev").on("click", function () {
        var a = sessionStorage.getItem(regPageSizeKey);
        var b = sessionStorage.getItem(searchKey);
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem(orderKey);
        var total = sessionStorage.getItem("Total");

        if (a != null) { d = (d - a) - 1; } else { d = (d - 50) - 1; }
        $("#example  div").remove();
        $("#example").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d >= 0) {
            $.post('/Tasks/AjaxPendingTasks', { start: d, pSize: a, search: b, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });
    $("#Next").on("click", function () {
        var b = sessionStorage.getItem("Total");
        var a = sessionStorage.getItem(regPageSizeKey);
        var c = sessionStorage.getItem(searchKey);
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem(orderKey);
        var total = sessionStorage.getItem("Total");

        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 50 - 1; }
        $("#example div").remove();
        $("#example").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/Tasks/AjaxPendingTasks', { start: d, pSize: a, search: c, order: o, ServerOrderValue: "" }, function (data) {
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
        //$(".filterclose").show();
        JSON.stringify(search);
        var searchMsg = "Search Results: Tasks Status <span class='' style='font-weight: 600'>'" + text + "'</span>";
        var basicFilterStr = $("#filter").val() + "~#StatusFilter:" + value;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem(regPageSizeKey);
        $("#example div ").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Tasks/AjaxPendingTasks',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $("#fText").text(text);
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
    });

    $("#assignedTo").on("change", function () {
        $(".filterclose").removeClass("DatesMargin");
        var text = $("#assignedTo option:selected").text();
        var value = $("#assignedTo").val();
        var col = "Assignedto";
        var search = value + "," + col + ":integer";
        //$(".filterclose").show();
        JSON.stringify(search);
        var searchMsg = "Search Results: Task Assigned To <span class='' style='font-weight: 600'>'" + text + "'</span>";
        var basicFilterStr = $("#filter").val() + "~#assignedTo:" + value;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem(regPageSizeKey);
        $("#example div ").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Tasks/AjaxPendingTasks',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $("#fText").text(text);
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
        //$(".filterclose").show();
        JSON.stringify(search);
        var searchMsg = "Search Results: Team Member <span class='' style='font-weight: 600'>'" + text + "'</span> Tasks";
        var basicFilterStr = $("#filter").val() + "~#teamEmployee:" + value;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem(regPageSizeKey);
        $("#example div ").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();
        $.ajax({
            url: '/Tasks/AjaxPendingTasks',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
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
    });

    $("#CreatedBy").on("change", function () {
        $(".filterclose").removeClass("DatesMargin");
        var text = $("#CreatedBy option:selected").text();
        var value = $("#CreatedBy").val();
        var col = "CreatedBY";
        var search = value + "," + col + ":integer";
        //$(".filterclose").show();
        JSON.stringify(search);
        var searchMsg = "Search Results: Tasks Created By <span class='' style='font-weight: 600'>'" + text + "'</span>";
        var basicFilterStr = $("#filter").val() + "~#CreatedBy:" + value;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem(regPageSizeKey);
        $("#example div ").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Tasks/AjaxPendingTasks',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $("#fText").text(text);
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


    $('#ddlmultiTags').on('change', function () {
        var value = $("#ddlmultiTags").val();
        if (value.length>0) {
            AddMultipleTagsOnTasks();
        }
    });

    $('#ddlmultiTags').parent().on('focusout', function () {
        $("#ddlmultiTags").parent().hide();
    });

    $('#ddlmultiTags').parent().find('.MultiControls .btnCancel').on('click', function () {
        $("#ddlmultiTags").parent().hide();
    });


    $('#Priority').on('changed.bs.select', function () {
        var value = $("#Priority").val();
        if (value.length > 0) {
            $("#btnPrioritySearch").show()
        }
        else {
            $("#btnPrioritySearch").hide()
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
    $(function () {
        //function to show create task form in popup when clicking on icon
        $(".btn-CreateTask").click(function () {

            var $buttonClicked = $(this);

            $.ajax({
                type: "GET",
                url: "/Tasks/CRMTasksForm",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                data: { exitmode: "ManagePendingTasks", id: $("#grid1").val() },
                success: function (data) {
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    else {
                        $('#CreateCRMTasks').html(data);
                        $('#CreateTasks').modal(options);
                        $('#CreateTasks').modal('show');
                        $(".PanelForm").css({ "border": "none", "box-shadow": "none", "width": "200px" });
                        $(".Task").css({ "margin-top": "0px", "margin-bottom": "20px" });
                        $(".hr").append('<hr />')
                        $(".hr").css("margin-bottom", "20px")
                        $(".mainpanel").css({ "margin-left": "0px", "padding-left": "5px", "width": "270px" });
                        $(".labeltext").css({ "margin-bottom": "10px" });
                        $(".forminput").css({ "margin-bottom": "15px" });
                        $(".mainbutton").css({ "margin": "20px 0px 20px 15px" });

                        $("#TaskDescription").empty();
                        //$(".can-tag").hide();

                        //$("#frmTags").selectpicker('refresh');
                        $(".dropdown").addClass("dd")
                        //$(".dd").click(function () {
                        //    $(".can-tag").hide();


                        //})
                    }
                },
                error: function () {
                    $('#NoRow').modal(options);
                    var Mtitle = "Select a Row";
                    $('#NoRow .modal-title').text(Mtitle);
                    $('.modal-title').css('text-align', 'center');
                    $('#NoRow').modal('show');
                }
            });
        });
    });


    $('a').tooltip();

});

function Showbtn() {
    $(".can-tag").show();

}

//function CanTag() {
//    $(".selectpicker option:selected").prop("selected", false);
//    //$("option:selected").removeAttr("selected");
//    //$("select option").prop("selected", false);
//    //$("select").val([]);
//    //$('select').val('')
//    $(".filter-option-inner-inner").text("-Select Tag-")
//    $(".can-tag").hide();
//}

function tagSearch() {
        $(".filterclose").removeClass("DatesMargin");
        var text = $("#Tags option:selected").map(function () { return $(this).text();}).get().join(",");
        var value = $("#Tags").val();
        var col = "m2.tagkey";
        var search = value + "," + col + ":integer";
        //$(".filterclose").show();
        JSON.stringify(search);
        var searchMsg = "Search Results: Tags <span class='' style='font-weight: 600'>'" + text + "'</span>";
        var basicFilterStr = $("#filter").val() + "~#Tags:" + value;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem(regPageSizeKey);
        $("#example div ").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Tasks/AjaxPendingTasks',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
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

function prioritySearch() {
    $(".filterclose").removeClass("DatesMargin");
    var text = $("#Priority option:selected").map(function () { return $(this).text(); }).get().join(",");
    var value = $("#Priority").val();
    var col = "priority";
    var search = value + "," + col + ":integer";
    //$(".filterclose").show();
    JSON.stringify(search);
    var searchMsg = "Search Results: Priority <span class='' style='font-weight: 600'>'" + text + "'</span>";
    var basicFilterStr = $("#filter").val() + "~#Priority:" + value;
    setSearchSessionStorage(search);
    setSearchMsgSessionStorage(searchMsg);
    setBasicFilterStrSessionStorage(basicFilterStr);
    var pSize = sessionStorage.getItem(regPageSizeKey);
    $("#example div ").remove();
    $("#example").height(0);
    $("#loading").show();
    $('#loadingmessage').show();

    $.ajax({
        url: '/Tasks/AjaxPendingTasks',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search },
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
    var search = sessionStorage.getItem(searchKey);
    var order = sessionStorage.getItem(orderKey);
    if (search==null || search=="") {
        $(".resultDiv .result-msg").html("");
        $(".resultDiv").hide();
    }
    else if (search != "" && sessionStorage.getItem(searchMsgKey) !== null) {
        $(".resultDiv .result-msg").html("<p>" + sessionStorage.getItem(searchMsgKey) + "</p>");
        $(".resultDiv").show();
    }

    chkvalesArr = [];
    $("#subDiv").hide();
    $("#example  div").remove();
    $("#example").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $.post('/Tasks/AjaxPendingTasks', { start: start, pSize: PSize, search: search, order: order }, function (data) {
        sessionStorage.setItem("Total", data.recordsTotal);
        loadData(data);
    });
}

function reloadGrid() {
    $("#example  div").remove();
    //removeFilter();
    if ($(window).width() >= 600) {
        sessionStorage.setItem("start", 0);
        var t = sessionStorage.getItem(regPageSizeKey);
        if (t == null) { t = 50 }
        GetData(0, t)
        $(".left").removeClass("move");
        $(".h").show();
        $(".right").css('display', 'none');
        //$("#dropdown").removeClass("setStyle");
        removeGridColumnCss();

    }
    else {
        sessionStorage.setItem("start", 0);
        var t = sessionStorage.getItem(regPageSizeKey);
        if (t == null) { t = 50 }
        GetData(0, t)
        // $(".reloadhide").hide();

    }

}

//Show PopUp modal before AddTags on Task
function ShowMultiTaskAddTagsModal() {
    var taskids = "";

    for (var i = 0; i < chkvalesArr.length; i++) {
        var val = chkvalesArr[i];

        var taskid = $("#tr-"+val).find(".Taskid").text();

        taskids += taskids == "" ? taskid : "," + taskid;
    }
    if ($.trim(taskids) !== "") {
        $("#MultiTagsAddModal").show();
        $("#MultiTagsAddModal #taskids").val(taskids);
        //$("#MultiTagsAddModal #ddlmultiTags").selectpicker('deselectAll');
        //$("#MultiTagsAddModal #ddlmultiTags")[0].sumo.unSelectAll();
        $("#MultiTagsAddModal #ddlmultiTags").parent().show().removeClass('open').addClass('open');
        //$("#MultiTagsAddModal #ddlmultiTags")[0].sumo.unSelectAll();
        //$("#MultiTagsAddModal #ddlmultiTags").parent().show();
        $(".select-ddlmultiTags.toggle-select").addClass("open")
        $(".select-ddlmultiTags.open").removeClass("toggle-select")
    }
    else {
        ShowMsg("Please select at least 1 Task.", "error");
    }


}

function AddMultipleTagsOnTasks() {
    var taskids = $("#MultiTagsAddModal #taskids").val();
    var tagkeys = $("#MultiTagsAddModal #wrapper-ddlmultiTags .box-checked").parents(".item").find(".item-text").map(function () { return $(this).attr("data-value"); }).get().join(",");
    $.post('/Tasks/AjaxAddMultipleTags', { Taskids: taskids, tagkeys: tagkeys }, function (data) {
        if (data.statusCode == 500) {
            window.location.href = "/Home/Error";
        }
        if (data == "") {
            window.location.href = "/Home/LogOut";
            return true;
        }
        var msg = "";
        var msgType="";
        if (data == "Already Added") {
            msg = "Tags already Added";
            msgType ="info";
        }
        else if (data == "true") {
            msg = "Tag has been added Successfully.";
            msgType="success";
        }
        else {
            msg = "An error occured while storing your Information .Please try again later.";
            msgType="error";
        }

        
        ShowMsg(msg, msgType)

        if (data == "true") {
            reloadGrid();
        }
    });
}



//Added by aslam to set Search or Order sessionStorage
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
//    //if (window.performance.navigation.type == performance.navigation.TYPE_RELOAD) {
//    //    alert("screen reloaded");
//    //}

//    var str = sessionStorage.getItem(basicFilterStrKey);
//    var search = sessionStorage.getItem(searchKey);
//    if (search!==null && search!="") {
//        if (str !== null && str != "") {
//            if (str.toLowerCase() == "mytasks") {
//                //$(".filterclose").show();
//            }
//            else if (str.toLowerCase() == "teamemptasks") {

//            }
//            else {
//                var arr = str.split("~");
//                $("#filter").val(arr[0]).trigger('change');
//                var controls = arr[1].split("|");
//                for (var i = 0; i < controls.length; i++) {
//                    var ctrl = controls[i].split(":");
//                    var type=  $(ctrl[0]).prop("type");
//                    if (type == "select-multiple") {
//                        var valArr = ctrl[1].split(",");
//                        $(ctrl[0]).val(valArr);
//                        if (ctrl[0] == "#Tags") {
//                            $("#btnTagSearch").show()
//                        }
//                        if (ctrl[0] == "#Priority") {
//                            $("#btnPrioritySearch").show()
//                        }
//                    }
//                    else {
//                        $(ctrl[0]).val(ctrl[1]);
//                    }
                    
//                }
//                //$(".filterclose").show();
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
                if (arr.length>1) {
                    var tr = "#basicFilterTable tr" + arr[0];
                    var controls = arr[1].split("|");
                    for (var j = 0; j < controls.length; j++) {
                        $(tr + " .basicFilterChk").prop("checked", true);
                        $(tr).addClass("basicFilterSeleted");
                        var ctrl = controls[j].split(":");
                        var type = $(tr +" "+ ctrl[0]).attr("data-type");
                        if (type == "select-multiple") {
                            console.log("setValues :" + tr + " " + ctrl[0] );
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




function ShowDetails() {
    $(".editSection").css("display", "block");

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


function CloseDiv(ctrl) {
    $(ctrl).hide();
}

///old code
function subtask(ctrl) {
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var TaskPid = $(Rowid).children(1)[1].innerText;
    var TaskName = $(Rowid).children(1)[2].innerText;

    $.ajax({
        type: "GET",
        url: '/Tasks/CRMSubTasksForm?PCRMTasks=' + TaskPid,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        data: { exitmode: "ManagePendingTasks", PCRMTasks: TaskPid },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                $('#CreateCRMSubTasks').html(data);
                $('#CreateSubTasks').modal(options);
                $('#CreateSubTasks').modal();
                $(".PanelForm").css({ "width": "252px" });
                $(".Task").css({ "margin-top": "0px", "margin-bottom": "10px" });
                $(".hr").css("margin-bottom", "20px")
                $(".hr").append('<hr />')
                $(".mainpanel").css({ "margin-left": "20px", "padding-left": "5px", "width": "270px" });
                $(".mainpanel").css('margin-top', '20px');
                $(".labeltext").css({ "margin-bottom": "10px" });
                //$(".forminput").css({ "margin-bottom": "15px" });
                $(".mainbutton").css({ "margin": "20px 0px 20px 15px" });
            }
        },

    })
}

function EditTask(ctrl) {
    var id = $(ctrl).parent().parent()[0].id;
    $.ajax({
        type: "GET",
        url: '/Tasks/CRMTasksForm?exitmode=Edit&id=' + id,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        // bdata: { exitmode: "ManagePendingTasks", id: $("#grid1").val() },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                $('#CreateCRMTasks').html(data);
                $('#CreateTasks').modal(options);
                $('#CreateTasks').modal('show');
                $(".PanelForm").css({ "border": "none", "box-shadow": "none", "width": "200px" });
                $(".Task").css({ "margin-top": "0px", "margin-bottom": "10px" });
                // $(".hr").append('<hr />')
                $(".hr").css("margin-bottom", "20px")
                $(".mainpanel").css({ "margin-left": "0px", "padding-left": "5px", "width": "270px" });
                $(".labeltext").css({ "margin-bottom": "10px" });
                $(".forminput").css({ "margin-bottom": "15px" });
                $(".mainbutton").css({ "margin": "20px 0px 20px 15px" });
                $(".cancel").attr("data-dismiss", "modal");
            }
        },

    })
}

function SubmitTaskRemark() {
    var formdata = new FormData(document.getElementById('RemarkForm'))
    //Creating an XMLHttpRequest and sending
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/Tasks/AddTasksRemark');
    xhr.send(formdata);
    $('#Remark').modal("hide");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            $('#TaskClosedContent').html('');
            $('#TaskClose').modal(options);
            $('#TaskClosedContent').html("<h3 class='text-center'>Remark added Successfully.</h3>");
            $('#TaskClose').modal("show");
            setTimeout(function () { $('#TaskClose').modal("hide"); }, 1000);
        }
    }
    return false;
}

function deleteCollaborator(id) {
    $.ajax({
        type: "GET",
        url: "/Tasks/DeleteCollaborator",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        data: { id: id },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                $('#ViewCollaborator').modal('hide');
                $('#TaskCollaborators').modal('hide');
                // $(".LoaderOverlay").hide();

                $('#TaskClosedContent').html('');
                $('#TaskClose').modal(options);
                $('#TaskClosedContent').html("<h3 class='text-center'>Collaborator deleted Successfully.</h3>");
                $('#TaskClose').modal("show");

                setTimeout(function () { $('#TaskClose').modal("hide"); }, 3000);
            }
        },
        error: function () {
            alert("error")
        }
    });

}

function SubmitTaskCollaborator(ctrl) {

    //$(ctrl).attr("disabled", "true");
    var selectedCollaborator = $("#collaboratorId").val();
    var TaskId = $('#PTask').val();
    var Taskkey = $('#Taskkey').val();

    $.ajax({
        type: "POST",
        url: "/Tasks/AddTaskCollaborators",
        data: { Taskid: TaskId, Taskkey: Taskkey, collaboratorId: selectedCollaborator },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                // $(ctrl).attr("disabled", "false");
                $('#TaskCollaborators').modal('hide');
                // $(".LoaderOverlay").hide();

                $('#TaskClosedContent').html('');
                $('#TaskClose').modal(options);
                $('#TaskClosedContent').html("<h3 class='text-center'>Collaborator has been added Successfully.</h3>");
                $('#TaskClose').modal("show");

                setTimeout(function () { $('#TaskClose').modal("hide"); }, 3000);
            }
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "Select a Row";
            $('#NoRow .modal-title').text(Mtitle);
            $('.modal-title').css('text-align', 'center');
            $('#NoRow').modal('show');
        }
    });

}

function CloseRemarkModal() {
    $('#Remark').modal('hide');
    popOverOpen = false;
}


//when a row is 
//show controls
//function 

//Id(ctrl) {
// if (popOverOpen == true) {
//$(".MoreDetails").not(CurrentHoverRowId).hide;
//} else {
//$(ctrl).find('.MoreDetails').hide();
//$(ctrl).find('.MoreDetails').css("display", "inline-flex");
//}
//}

//when row is not hover hide controls
//function hoverNot(ctrl) {
// $('.MoreDetails').hide();
// if (popOverOpen == true) {
//     $(CurrentHoverRowId).find('.MoreDetails').show();
// }
//}

//Show remarks of a task when clicking on the icon
function ViewRemarks(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var TaskPid = $(Rowid).children(1)[1].innerText;
    CurrentHoverRowId = Rowid;

    // Popover Grid
    $("#ShowRemarksDiv div").remove();

    $(".popover-content div").empty();
    var morediv = $("#ShowRemarksDiv");
    var more = $("<div class='col-md-12 ShowRemarksTitle' style='' id='' ></div>");
    more.html(("<div class='col-md-1' style='text-align: center;padding-top:10px; margin-bottom:5px'><b>Sno.</b></div>")
        + " " + ("<div class='col-md-3' style='padding-left: 30px;padding-top:10px;margin-bottom:5px'><b>Remark</b></div>")
        + " " + ("<div class='col-md-3' style='text-align:center;padding-top:10px;margin-bottom:5px;padding-left: 0px;' ><b>Date</b> </div>")
        + " " + ("<div class='col-md-2' style='padding-left: 20px;text-align:center;padding-top:10px;margin-bottom:5px' > <b>Created By</b> </div>")
        + " " + ("<div class='col-md-2' style='text-align:center; padding-top:10px;margin-bottom:5px' > <b>FileName</b> </div>")
        + " " + ("<div class='col-md-1' style='padding-right: 0px; padding-top: 5px;'> <span class='close' onclick='popoverClose();' style='padding-bottom:20px; padding-left:20px; padding-right:5px; font-size:18px;'> &times; </span> </div>")
    );
    morediv.append(more);


    var more2 = $("<div class='col-md-12 ShowRemarksValueM' style='margin-bottom:40px' id='' ></div>");
    morediv.append(more2);

    var DataLoading = document.createElement('div');
    DataLoading.id = 'LoadingData';
    DataLoading.innerHTML = '...Loading...';
    DataLoading.className = 'col-md-12';
    $(DataLoading).css('text-align', 'center');
    $(DataLoading).css('margin-bottom', '10px');
    morediv.append(DataLoading);
    // $(this).popover('toggle');
    $(".ShowRemark").popover('toggle');

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
  
            $(".popover-content").css("height", "500px")
            $(".popover-content").css("overflow-y", "scroll")
            var tblEmployee1 = $(".popover-content");

            var a = 1;
            $.each(data.data, function (index, item) {
                var m = (a) + index;
                var more1 = $("<div class='col-md-12 ShowRemarksValues'  style='' id='" + item.CRMCommunication_key + "'  class='col-md-12'>" + m + "</div>");
                more1.html(("<div class='col-md-1' style='margin-left:10px'>" + m + "</div>")
                    + " " + ("<div class='col-md-3' style='width:200px;min-height:20px' >" + item.Commtext + "</div>")
                    + " " + ("<div class='col-md-4' style='width:180px;padding-left: 0px;'  >" + item.FrmtCreationDate + " </div>")
                    + " " + ("<div class='col-md-2' style='padding-left:10px; width:130px; text-align:center;'>" + item.TextLogincode + " </div>")
                    + " " + ("<div class='col-md-2' style='padding-left:0px;padding-right:0px;'> <a href='" + item.LinkURL + "' download>" + item.FileName + "</a></div><div class='col-md-1'></div>")
                );
                tblEmployee1.append(more1);
            });

            if (data.recordsTotal == 0) {
                $(".popover-content #LoadingData").css('display', 'block');
                $(".popover-content #LoadingData").text('No Data');
            } else {
                $(".popover-content #LoadingData").css('display', 'none');
                $(".popover-content #LoadingData").text('');
            }


        },
        error: function () {
            alert("Error in loading data")
        }
    });

    // Popover Grid
    $('.ShowRemark').not(ctrl).popover('hide');
    $('.popover.fade.left.in').css('max-width', '804px');
    $('.popover.fade.left.in').css('max-height', '250px');
    $('.popover.fade.left.in').css('left', '-804px');
    $('.popover.fade.left.in').css('background-color', 'white');
    $('.popover.fade.left.in').css('top', '10px');
    //$('.popover.fade.left.in').css('width', '3000');
    $('.arrow').css('top', '13px');
    $('.popover-content').css('width', '801px');
    $('.popover-content').css('padding-top', '0px');
    $('.popover-content').css('overflow-y', 'scroll');
    $('.popover-content').css('max-height', '240px');
    //$('.popover-content').css('margin-bottom', '5px');

    event.preventDefault();
}
//Task Close functionality
function taskClose(ctrl) {
    var Rowid = $(ctrl).parent().parent()[0].id;

    $.ajax({
        type: "GET",
        url: "/Tasks/TaskClose",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        data: { id: Rowid },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            
            if (data == "HasSubTask") {
                $('#TaskClosedContent').html('');
                $('#TaskClose').modal(options);
                $('#TaskClosedContent').html("<h4 class='text-center text-alert'>This task contains Subtasks. Please close them to close task.</h4>");
                $('#TaskClose').modal('show');
                return false;
            } else {
                var MainDivid = "#MainDiv-" + Rowid
                $(MainDivid).remove();
                $('#TaskClosedContent').html('');
                $('#TaskClose').modal(options);
                //var Mtitle = "Task Closed Successfully"
                //$('#TaskClose .modal-title').text(Mtitle);
                $('#TaskClosedContent').html("<h4 class='text-center text-alert'>Task Closed Successfully</h4>");
                $('#TaskClose').modal('show');
                setTimeout(function () { $('#TaskClose').modal('hide'); }, 1000);
            }
        },
        error: function () {
            $('#TaskClosedContent').html('');
            $('#TaskClose').modal(options);
            $('#TaskClosedContent').html("<h3 class='text-center'>An error Occured.Please try again.</h3>");
            $('#TaskClose').modal('show');
        }
    });
    return false;
}
// function to close button on popover
function popoverClose() {
    popOverOpen = false
    $('.popover').hide();
    $('.MoreDetails').popover('hide');
    $(".disabled").removeClass("disabled");
    $("#ShowSubTaskControlDiv").popover('hide');
    $(".ShowRemark").popover('hide');
}

//function to show collaborators of a task when click on view Collaborator
function ShowCollaborators(ctrl) {
    // Popover Grid
    // popoverClose()

    var id = $(ctrl).parent().parent().parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var TaskPid = $(Rowid).children(1)[1].innerText;
    $.ajax({
        type: "POST",
        url: "/Tasks/AddCollaboratorsData",
        data: { taskId: TaskPid },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
           
            //loadData1(data);

            var tblEmployee1 = $("#ShowCollaborators");
            $("#ShowCollaborators").empty();
            //$(".popover-content #LoadingData").css('display', 'none');
            var a = 1;
            $.each(data.data, function (index, item) {
                var m = (a) + index;

                var more1 = $("<div style='display:flex; height:20px; margin-bottom:10px; padding-left:0px' id='" + item.CRMCollaborator_key + "'  class='col-md-12 body'>" + m + "</div>");
                more1.html(("<div class='col-md-2 ViewcollaboratorsSno ' style=''>" + m + "</div>")
                    + " " + ("<div class='col-md-8 ViewcollaboratorsEmpName' style='' >" + item.TxtCollaborator + "</div>")
                    + " " + ("<div class='col-md-2 ViewcollaboratorsClose' style='' ><a class='' id='" + item.CRMCollaborator_key + "' onclick='deleteCollaborator(this.id," + id + ")'><i class='glyphicon glyphicon-remove'></i></a></div>")
                );
                tblEmployee1.append(more1);
            });

            $("#loading1").css("display", "none")
            if (data.recordsTotal == 0) {
                $(".popover-content #LoadingData").css('display', 'block');
                $(".popover-content #LoadingData").text('No Data');
            } else {
                $(".popover-content #LoadingData").css('display', 'none');
                $(".popover-content #LoadingData").text('');
            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });

    $('#ViewCollaborator').modal(options);
    $('#ViewCollaborator').modal('show');
    event.preventDefault();
}

function AddRemarkFromDetailPane() {
    var TaskPid = $("#mtaskid").text();
    $('#RemarkTaskId').val(TaskPid);
    $('#RemarkText').val('');
    var TaskTitle = $("#mtasktitle").text();
    $('#Remark').modal(options);
    var Mtitle = "Task Title :  " + TaskTitle;
    $('#Remark .modal-title').text(Mtitle);
    $('#Remark').modal('show');
}

//function show add Remark modal
function AddRemark(ctrl) {
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var TaskPid = $(Rowid).children(1)[1].innerText;
    $('#RemarkTaskId').val(TaskPid);
    $('#RemarkText').val('');
    var TaskTitle = $(Rowid).children(1)[2].innerText;
    $('#Remark').modal(options);
    var Mtitle = "Task Title :  " + TaskTitle;
    $('#Remark .modal-title').text(Mtitle);
    $('#Remark').modal('show');
}

//function to show the controls of subtask in  popover
function ShowSubTaskControl(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    CurrentHoverRowId = Rowid;
    $(".ShowSubTaskControl").popover('toggle');
    $(".ShowSubTaskControlDiv").show();
    // Popover Grid
    $('.ShowSubTaskControl').not(ctrl).popover('hide');
    $('.popover.fade.right.in').css('width', '170px');
    $('.popover.fade.right.in').css('height', '70px');
    $('.popover.fade.right.in').css('left', '30px');
    $('.popover.fade.right.in').css('top', '40px');
    $('.popover.fade.right.in').css('max-width', 'none');
    $('.arrow').css('top', '-11px');
    $('.popover-content').css('width', '170px');
    $('.popover-content').css('height', '70px');
    $('.popover-content').css('padding', '5px 5px 9px 15px');
    event.preventDefault();
}
//Function to show the controls of collaborator in popover
function ShowCollaboratorsCtrls(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    CurrentHoverRowId = Rowid;
    $(".ShowCollaboratorsCtrls").popover('toggle');
    $(".ShowCollaboratorsCtrlsDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })
    // Popover Grid
    $('.ShowCollaboratorsCtrls').not(ctrl).popover('hide');
    $('.popover.fade.right.in').css('width', '170px');
    $('.popover.fade.right.in').css('height', '60px');
    $('.popover.fade.right.in').css('left', '-20px');
    $('.arrow').css('top', '-11px');
    $('.popover-content').css('width', '180px');
    $('.popover-content').css('height', '70px');
    $('.popover-content').css('padding-top', '3px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-left', '9px');

    event.preventDefault();
}

//function to show subtask of a task
function viewSubTask(ctrl) {
    popOverOpen = false
    var id = $(ctrl).parent().parent().parent().parent()[0].id;

    if ($('div').hasClass(id) == false) {
        $('#TaskClosedContent').html('');
        $('#TaskClose').modal(options);
        $('#TaskClosedContent').html("<h3 class='text-center'>No SubTask.</h3>");
        $('#TaskClose').modal("show");

        //setTimeout(function () { $('#TaskClose').modal("hide"); }, 1000);
        return false;
    }
    function popoverClose() {

    }



    var subtaskClass = "div." + id;
    $(subtaskClass).parent().toggle();
    var parentid = "#tr-" + id;
    var Mainparentid = "#MainDiv-" + id;
    var parent = $(parentid);
    var c = $(parentid).find('.MoreDetails');
    var b = $(Mainparentid).find('i');

    if (SubTaskPopupOpen == true) {

        SubTaskPopupOpen = false;
        $(Mainparentid).css('background-color', '#3c8dbc');
        $(Mainparentid).css('background-color', '#3c8dbc');
        $(c).css('background-color', '#3c8dbc');
        $(b).first().css('transition', 'transform .5s ease');
        $(b).first().css('transform', 'rotate(90deg)');




        //    $(parent).css('border-left-width', '4px');
        //    $(parent).css('border-left-style', 'solid');
        //    $(parent).css('border-left-color', '#3c8dbc');

        //    $(parent).css('border-right-width', '4px');
        //    $(parent).css('border-right-style', 'solid');
        //    $(parent).css('border-right-color', '#3c8dbc');

    }

    else {
        SubTaskPopupOpen = true;
        $(Mainparentid).css('background-color', 'white');
        $(c).css('background-color', 'white');
        $(b).first().css('transition', 'transform .5s ease');
        $(b).first().css('transform', 'rotate(0deg)');



        //    $(parent).css('border-left-width', '');
        //    $(parent).css('border-left-style', '');
        //    $(parent).css('border-left-color', '');

        //    $(parent).css('border-right-width', '');
        //    $(parent).css('border-right-style', '');
        //    $(parent).css('border-right-color', '');
    }
    event.preventDefault();

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
        $(".fa-angle-down").css("padding-left", "0px");
        $(ctrl).css('cursor', 'pointer');
        //$(parentid).css('color', '#3c8dbc');
    }
    else {
        $(ctrl).removeClass('active');
        var child = $(ctrl).children(1)[0];
        $(child).removeClass("fa-angle-down").addClass("fa-angle-right");
        $(".fa-angle-right").css("padding-left", "4px");
        //$(parentid).css('background-color', 'transparent');
        //$(parentid).css('color', '#3c8dbc');
        var child = $(ctrl).children(1)[0];
        $(child).removeClass("fa-angle-down").addClass("fa-angle-right");
        $(".fa-angle-right").css("padding-left", "4px");

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
        //    var tagsArr = item.Tags.split(",");
        //    var tagsRow = "<div id='trtags-" + item.CRMTasks_Key + "' class='col-md-12 tags-row'><div class='tags-wrapper'>"

        //    for (let i = 0; i < tagsArr.length; i++) {
        //        tagsRow += "<span class='tag-item'>" + tagsArr[i] + "</span>";
        //    }
        //    tagsRow += "</div></div>";
        //    toggleDiv.append(tagsRow);
        //}
       
        m = m + 1;
        /* var SubParentdiv = $("<div id='MainDiv-" + item.CRMTasks_Key + "'' class='col-md-12 sub clickable' style='widht:100%;border-bottom:1px solid black; margin-left: 0px; display: inline-flex; padding-left:2px;padding-right:0px'  ><input type='checkbox' class='checkboxall'' value='checkbox1' style='height:15px; margin-right:0px;' /></div>");*/
        //var SubParentdiv = $("<div id='MainDiv-" + item.CRMTasks_Key + "'' class='col-md-12  /*clickable*/ submaindiv maindiv ' style='/*widht:100%;border-bottom:1px solid black; margin-left: 0px; display: inline-flex; padding-left:2px;padding-right:0px*/'  ><input type='checkbox' class='checkboxall'' value='checkbox1' style='height:15px; margin-right:0px;' /></div>");
        var SubParentdiv = $("<div id='MainDiv-" + item.CRMTasks_Key + "'' class='col-md-12  submaindiv maindiv' ><input type='checkbox' onclick='chkCheckUncheck(this)' class='checkboxall' id='chk-" + item.CRMTasks_Key + "' value='" + item.CRMTasks_Key + "' /></div>");
        toggleDiv.append(SubParentdiv);
        var div = $("<div id='tr-" + item.CRMTasks_Key + "' class='collapse sub MainTr tr " + item.CRMTasks_Key + "' ></div>");
     
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

               //+ " " + ("<div class='SubTasktitle td basicTr clampTr' style='padding-left:7px;'>" + item.TaskTitle + "</div>")
               //+ " " + ("<div class='SubTaskdescription td basicTr clampTr ' style='margin-right:0px;padding:0 0px 0 7px;'>" + item.TaskDescription + "</div>")
               + " " + ("<div class='TaskPriority td basicTr' style='color:" + color + ";width:6%;' data-priority='" + item.priority + "'>" + item.TextPriority + "</div>")
               + " " + ("<div  class='SubTaskStartdate td h basicTr' style='width:9%;padding-left:8px'>" + item.FrmtStartDate + "</div>")
               + " " + ("<div class='SubTaskDuedate td h basicTr' style='width:9%;padding-left:8px'>" + item.FrmtDueDate + "</div>")
               + " " + ("<div class='SubTaskLastActionTime td h basicTr' style='width:9%;padding-left:8px'>" + item.FrmtLastActionTime + "</div>")
               + " " + ("<div class='TaskAssignedto td h basicTr' style='width:11%;padding-left:4px;'  data-assignedto='" + item.Assignedto + "' >" + item.TextAssignedto + "</div>")
               + " " + ("<div class='Taskcreateby td basicTr' style='width:10%;padding:0;'>" + item.TextCreatedBy + "</div>")
               + " " + ("<div class='TaskTags td h basicTr clampTr' style='width:13%;padding-left:12px;'>" + item.Tags + "</div>")
               + " " + ("<div class='SubTaskstatus td basicTr' style='width:6%; text-align:center;padding-left:12px;' data-taskstatus='" + item.Taskstatus + "'><span style='display:none;'>" + item.TextTaskStatus + "</span><div class='circle' style='background-color:" + statusColor + "'></div></div>")
               //+ " " + ("<div class='SubTaskstatus td basicTr' style='width:7%; text-align:center; padding:0 8px 0 8px;  ' data-taskstatus='" + item.Taskstatus + "'>" + item.TextTaskStatus + "</div>")
               + " " + ("<div class='Taskunder td' style='display:none'>" + item.Under + "</div>")
               //+ " " + ("<div class='TaskPriority td' style='display:none' data-priority='" + item.priority + "'>" + item.TextPriority + "</div>")
               );


        //if ($(".right").is(":visible")) {
        //    div.html(("<div class='Tno td tno basicTr' style = 'width:3%; text-align:center;padding:0px;' >  <i class='fa fa-bookmark priority-icon' style='color:transparent' ></i></div >")
        //        + " " + ("<div class='SubTaskSno td sno basicTr'  style = 'width:3%;padding:0px;' >  " + m + "</div >")
        //        + " " + ("<div class='SubTaskid td id basicTr' style='width:5%;padding:0px;'>" + item.P_CRMTasks + "</div>")
        //        + " " + ("<div class='SubTasktitle td tasktitle basicTr clampTr' style='padding-left:7px;'>" + item.TaskTitle + "</div>")
        //        + " " + ("<div class='SubTaskdescription td taskdesc basicTr clampTr' style='margin-right:0px;padding:0 0px 0 7px;'>" + item.TaskDescription + "</div>")
        //        + " " + ("<div class='SubTaskstatus td taskstat basicTr' style='width:7%; text-align:center; padding:0 8px 0 8px;' data-taskstatus='" + item.Taskstatus + "'>" + item.TextTaskStatus + "</div>")
        //        + " " + ("<div  class='SubTaskStartdate td  h basicTr' style='width:11%;display:none;'>" + item.FrmtStartDate + "</div>")
        //        + " " + ("<div class='SubTaskDuedate td  date basicTr' style='width:11%;'>" + item.FrmtDueDate + "</div>")
        //        + " " + ("<div class='TaskAssignedto td assign basicTr' style='width:10%;'  data-assignedto='" + item.Assignedto + "' >" + item.TextAssignedto + "</div>")
        //        + " " + ("<div class='Taskcreateby td create basicTr' style='width:10%;'>" + item.TextCreatedBy + "</div>")
        //        + " " + ("<div class='Taskunder td' style='display:none'>" + item.Under + "</div>")
        //        + " " + ("<div class='TaskPriority td' style='display:none' data-priority='" + item.priority + "'>" + item.TextPriority + "</div>"));
        //}
        //else {
        //    div.html(("<div class='Tno td basicTr' style ='width:3%; text-align:center;padding:0px;' >  <i class='fa fa-bookmark priority-icon' style='color:transparent' ></i></div >")
        //        + " " + ("<div class='SubTaskSno td basicTr'  style = 'width:3%;padding:0px;' >  " + m + "</div >")
        //        + " " + ("<div class='SubTaskid td tno basicTr' style='width:5%;padding:0px;'>" + item.P_CRMTasks + "</div>")
        //        + " " + ("<div class='SubTasktitle td basicTr clampTr' style='padding-left:7px;'>" + item.TaskTitle + "</div>")
        //        + " " + ("<div class='SubTaskdescription td basicTr clampTr ' style='margin-right:0px;padding:0 0px 0 7px;'>" + item.TaskDescription + "</div>")
        //        + " " + ("<div class='SubTaskstatus td basicTr' style='width:7%; text-align:center; padding:0 8px 0 8px;  ' data-taskstatus='" + item.Taskstatus + "'>" + item.TextTaskStatus + "</div>")
        //        + " " + ("<div  class='SubTaskStartdate td h basicTr' style='width:11%;'>" + item.FrmtStartDate + "</div>")
        //        + " " + ("<div class='SubTaskDuedate td basicTr' style='width:11%;'>" + item.FrmtDueDate + "</div>")
        //        + " " + ("<div class='TaskAssignedto td basicTr' style='width:10%;'  data-assignedto='" + item.Assignedto + "' >" + item.TextAssignedto + "</div>")
        //        + " " + ("<div class='Taskcreateby td basicTr' style='width:10%;'>" + item.TextCreatedBy + "</div>")
        //        + " " + ("<div class='Taskunder td' style='display:none'>" + item.Under + "</div>")
        //        + " " + ("<div class='TaskPriority td' style='display:none' data-priority='" + item.priority + "'>" + item.TextPriority + "</div>"));
        //}
        
        SubParentdiv.append(div);

        if ($(".right").is(":visible")) { $(".submaindiv  .h").hide(); setGridColumnCss(); }
    });
}

        

//function to show subtask of a task by caret
function viewSubTaskbycaret(id, ctrl) {

    var parent = ctrl.parentNode.id;
    var parentid = "#" + parent;
    var c = $(parentid).find('.MoreDetails');
    $(c).css('background-color', '#3c8dbc');

    popOverOpen = false
    if ($(ctrl).hasClass('active') == false) {
        $(ctrl).addClass('active');
        //$(ctrl).css('transition', 'transform .5s ease');
        //$(ctrl).css('transform', 'rotate(90deg)');
        var child = $(ctrl).children(1)[0];
        $(child).removeClass("fa-angle-right").addClass("fa-angle-down");
        $(".fa-angle-down").css("padding-left", "0px");

        $(ctrl).css('cursor', 'pointer');
        // $(parentid).css('background-color', '#3c8dbc');
        $(parentid).css('color', '#3c8dbc');

        //$('.SubTasksHeadingdiv').html("<i class='fa fa-eye' style='font-size:16px; color:#616A6B; opacity:1;margin-left: 5px;float:left;'></i>&nbsp; SubTasks");
        //$('.SubTasksHeadingdiv').html("<i class='fa fa-plus' style='font-size:17px; color:#616A6B; opacity:1;margin-left:5px;float:right;'></i><i class='fa fa-eye' style='font-size:16px; color:#616A6B; opacity:1;margin-left: 5px;float:left;'></i>&nbsp; SubTasks");
        //$('.AddSubTasksDiv').css("display", "block");
        // $('.SubTasksHeadingdiv').css("display", "block");
    }
    else {
        $(ctrl).removeClass('active');
        //$(ctrl).css('transition', 'transform .5s ease');
        //$(ctrl).css('transform', 'rotate(0deg)');
        var child = $(ctrl).children(1)[0];
        $(child).removeClass("fa-angle-down").addClass("fa-angle-right");
        $(".fa-angle-right").css("padding-left", "4px");
        $(c).css('background-color', 'white');
        $(parentid).css('background-color', 'transparent');
        $(parentid).css('color', '#3c8dbc');
        //$(c).css('background-color', 'white');
        var child = $(ctrl).children(1)[0];
        $(child).removeClass("fa-angle-down").addClass("fa-angle-right");
        $(".fa-angle-right").css("padding-left", "4px");





        // $('.SubTasksHeadingdiv').text("");
        // $('.AddSubTasksDiv').text("");
        // $('.AddSubTasksDiv').css("display", "none");
        // $('.SubTasksHeadingdiv').css("display", "none");
    }

    if ($('div').hasClass(id) == false) {
        $('#TaskClosedContent').html('');
        //$('.viewSubTaskbycaret').ctrl().toggle();
        $('#TaskClose').modal(options);
        $('#TaskClosedContent').html("<h3 class='text-center'>No SubTask.</h3>");
        $('#TaskClose').modal("show");
        //setTimeout(function () { $('#TaskClose').modal("hide"); }, 1000);
        return false;
    }

    function CaretAddsubtask(id, ctrl) {

        var Rowid = "#tr-" + id;
        var TaskPid = $(Rowid).children(1)[1].innerText;
        var TaskName = $(Rowid).children(1)[2].innerText;

        $.ajax({
            type: "GET",
            url: '/Tasks/CRMSubTasksForm?PCRMTasks=' + TaskPid,
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: { exitmode: "ManagePendingTasks", PCRMTasks: TaskPid },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $('#CreateCRMSubTasks').html(data);
                    $('#CreateSubTasks').modal(options);
                    $('#CreateSubTasks').modal();
                    $(".PanelForm").css({ "width": "252px" });
                    $(".Task").css({ "margin-top": "0px", "margin-bottom": "10px" });
                    $(".hr").css("margin-bottom", "20px")
                    $(".hr").append('<hr />')
                    $(".mainpanel").css({ "margin-left": "20px", "padding-left": "5px", "width": "270px" });
                    $(".mainpanel").css('margin-top', '20px');
                    $(".labeltext").css({ "margin-bottom": "10px" });
                    //$(".forminput").css({ "margin-bottom": "15px" });
                    $(".mainbutton").css({ "margin": "20px 0px 20px 15px" });
                }
            },

        })
    }
    function popoverClose() {

    }
    var subtaskClass = "div." + id;
    $(subtaskClass).parent().toggle();

    var parentid = "#tr-" + id;
    var parent = $(parentid);
}

//function to show Add Collaborator modal
function AddCollaborator(ctrl) {
    popOverOpen = false
    var id = $(ctrl).parent().parent().parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var TaskPid = $(Rowid).children(1)[1].innerText;

    $('#PTask').val(TaskPid);
    $('#Taskkey').val(id);
    $('#TaskCollaborators').modal(options);
    $('#TaskCollaborators').modal('show');
}

function collapse() {
    $(".hide-div").toggle();
}

function change() {
   
    (".transparent").css("background-color","red");
  
}

function scrollit() {
    var re = document.getElementById("remarks")
    re.scrollIntoView();
}




$('#example').on('contextmenu', 'div.parentdiv', function (e) {
    //    if ($(this).hasClass('highlight')) {
    //    }
    //    else {
    //        var row = table.$('div.highlight').find("div:first input");
    //        if ($(row).prop("checked") == true) {
    //            $(row).prop("checked", false);
    //        }
    //        table.$('div.highlight').removeClass('highlight');
    //        $(this).addClass('highlight');
    //        $(this).find("div:first input").prop("checked", true);

    //    }
});
//$.contextMenu({
//    selector: '#example div.parentdiv',
//    build: function ($trigger) {
//        var options = {
//            callback: function (key, options) {
//                //var m = "clicked: " + key + options.$trigger[0].cells[0].children[0].childNodes[0].id + "" + options.$trigger[0].cells[3].textContent;
//                var divid = options.$trigger[0].id;
//                var temp = divid.split("-");
//                var id = temp[1];
//                //window.console && console.log(m) || alert(m);
//                switch (key) {
//                    case "taskClose":
//                        $.ajax({
//                            type: "GET",
//                            url: "/Tasks/TaskClose",
//                            contentType: "application/json; charset=utf-8",
//                            datatype: "json",
//                            data: { id: id },
//                            success: function (data) {
//                                if (data == "") {
//                                    window.location.href = "/Home/LogOut";
//                                    return true;
//                                }
//                                ;
//                                if (data == "HasSubTask") {
//                                    $('#TaskClosedContent').html('');
//                                    $('#TaskClose').modal(options);
//                                    $('#TaskClosedContent').html("<h4 class='text-center text-alert'>This task contains Subtasks. Please close them to close task.</h4>");
//                                    $('#TaskClose').modal('show');
//                                    return false;
//                                } else {
//                                    var MainDivid = "#MainDiv-" + id
//                                    $(MainDivid).remove();
//                                    $('#TaskClosedContent').html('');
//                                    $('#TaskClose').modal(options);
//                                    //var Mtitle = "Task Closed Successfully"
//                                    //$('#TaskClose .modal-title').text(Mtitle);
//                                    $('#TaskClosedContent').html("<h4 class='text-center text-alert'>Task Closed Successfully</h4>");
//                                    $('#TaskClose').modal('show');
//                                    setTimeout(function () { $('#TaskClose').modal('hide'); }, 1000);
//                                }
//                            },
//                            error: function () {
//                                $('#TaskClosedContent').html('');
//                                $('#TaskClose').modal(options);
//                                $('#TaskClosedContent').html("<h3 class='text-center'>An error Occured.Please try again.</h3>");
//                                $('#TaskClose').modal('show');
//                            }
//                        });
//                        break;
//                        //function add Remark modal
//                    case "AddRemark":
//                        var Rowid = "#tr-" + id;
//                        var TaskPid = $(Rowid).children(1)[1].innerText;
//                        $('#RemarkTaskId').val(TaskPid);
//                        $('#RemarkText').val('');
//                        var TaskTitle = $(Rowid).children(1)[2].innerText;
//                        $('#Remark').modal(options);
//                        var Mtitle = "Task Title :  " + TaskTitle;
//                        $('#Remark .modal-title').text(Mtitle);
//                        $('#Remark').modal('show');
//                        break;
//                        //function to ViewRemarks modal
//                    case "ViewRemarks":
//                        var Rowid = "#tr-" + id;
//                        var TaskPid = $(Rowid).children(1)[1].innerText;
//                        $.ajax({
//                            type: "POST",
//                            url: "/Tasks/AddTasksRemarkData",
//                            data: { taskId: TaskPid },
//                            success: function (data) {
//                                if (data == "") {
//                                    window.location.href = "/Home/LogOut";
//                                    return true;
//                                }
//                                ;
//                                var tblEmployee1 = $("#RemarkModalContent");
//                                tblEmployee1.empty();
//                                var a = 1;
//                                $.each(data.data, function (index, item) {
//                                    var m = (a) + index;
//                                    var more1 = $("<div class='col-md-6 ShowRemarksValues'  style=' padding-top:10px; width:730px;' id='" + item.CRMCommunication_key + "'</div>");
//                                    more1.html(("<div class='col-md-1' style='text-align: center; '>" + m + "</div>")
//                                        + " " + ("<div class='col-md-2' style='padding-left: 20px;' >" + item.Commtext + "</div>")
//                                        + " " + ("<div class='col-md-1' style='text-align: center;   padding-left: 0px; padding-left: 0px;'  >" + item.FrmtCreationDate + " </div>")
//                                        + " " + ("<div class='col-md-1' style=' text-align:center;   '>" + item.TextLogincode + " </div>")
//                                        + " " + ("<div class='col-md-1' style='text-align:center; margin-bottom:1px; padding-left:10px;'> <a href='" + item.LinkURL + "' download>" + item.FileName + "</a></div><div class='col-md-1'></div>")
//                                    );
//                                    tblEmployee1.append(more1);
//                                });
//                                if (data.recordsTotal == 0) {
//                                    $(".popover-content #LoadingData").css('display', 'block');
//                                    $(".popover-content #LoadingData").text('No Data');
//                                } else {
//                                    $(".popover-content #LoadingData").css('display', 'none');
//                                    $(".popover-content #LoadingData").text('');
//                                }
//                            },
//                            error: function () {
//                                alert("Error in loading data")
//                            }
//                        });
//                        $('#ViewRemarks').modal(options);
//                        $('#ViewRemarks').modal('show');
//                        event.preventDefault();
//                        break;
//                        //function add SubTask modal
//                    case "subtask":
//                        var Rowid = "#tr-" + id;
//                        var TaskPid = $(Rowid).children(1)[1].innerText;
//                        var TaskName = $(Rowid).children(1)[2].innerText;
//                        $.ajax({
//                            type: "GET",
//                            url: '/Tasks/CRMSubTasksForm?PCRMTasks=' + TaskPid,
//                            contentType: "application/json; charset=utf-8",
//                            datatype: "json",
//                            data: { exitmode: "ManagePendingTasks", PCRMTasks: TaskPid },
//                            success: function (data) {
//                                ;
//                                $('#CreateCRMSubTasks').html(data);
//                                $('#CreateSubTasks').modal(options);
//                                $('#CreateSubTasks').modal();
//                                $(".PanelForm").css({ "width": "252px" });
//                                $(".Task").css({ "margin-top": "0px", "margin-bottom": "10px" });
//                                $(".hr").css("margin-bottom", "20px")
//                                $(".hr").append('<hr />')
//                                $(".mainpanel").css({ "margin-left": "20px", "padding-left": "5px", "width": "270px" });
//                                $(".mainpanel").css('margin-top', '20px');
//                                $(".labeltext").css({ "margin-bottom": "10px" });
//                                //$(".forminput").css({ "margin-bottom": "15px" });
//                                $(".mainbutton").css({ "margin": "20px 0px 20px 15px" });
//                            },
//                        })
//                        break;
//                        //function to add Collaborators modal
//                    case "AddCollaborator":
//                        var Rowid = "#tr-" + id;
//                        var TaskPid = $(Rowid).children(1)[1].innerText;
//                        $('#PTask').val(TaskPid);
//                        $('#Taskkey').val(id);
//                        $('#TaskCollaborators').modal(options);
//                        $('#TaskCollaborators').modal('show');
//                        break;
//                        //function to view Collaborators modal
//                    case "ShowCollaborators":
//                        var Rowid = "#tr-" + id;
//                        var TaskPid = $(Rowid).children(1)[1].innerText;
//                        $.ajax({
//                            type: "POST",
//                            url: "/Tasks/AddCollaboratorsData",
//                            data: { taskId: TaskPid },
//                            success: function (data) {
//                                if (data == "") {
//                                    window.location.href = "/Home/LogOut";
//                                    return true;
//                                }
//                                ;
//                                //loadData1(data);
//                                var tblEmployee1 = $("#ShowCollaborators");
//                                $("#ShowCollaborators").empty();
//                                //$(".popover-content #LoadingData").css('display', 'none');
//                                var a = 1;
//                                $.each(data.data, function (index, item) {
//                                    var m = (a) + index;
//                                    var more1 = $("<div style='display:flex; height:20px; margin-bottom:10px; padding-left:0px' id='" + item.CRMCollaborator_key + "'  class='col-md-12 body'>" + m + "</div>");
//                                    more1.html(("<div class='col-md-2 ViewcollaboratorsSno ' style=''>" + m + "</div>")
//                                        + " " + ("<div class='col-md-8 ViewcollaboratorsEmpName' style='' >" + item.TxtCollaborator + "</div>")
//                                        + " " + ("<div class='col-md-2 ViewcollaboratorsClose' style='' ><a class='' id='" + item.CRMCollaborator_key + "' onclick='deleteCollaborator(this.id," + id + ")'><i class='glyphicon glyphicon-remove'></i></a></div>")
//                                    );
//                                    tblEmployee1.append(more1);
//                                });
//                                $("#loading1").css("display", "none")
//                                if (data.recordsTotal == 0) {
//                                    $(".popover-content #LoadingData").css('display', 'block');
//                                    $(".popover-content #LoadingData").text('No Data');
//                                } else {
//                                    $(".popover-content #LoadingData").css('display', 'none');
//                                    $(".popover-content #LoadingData").text('');
//                                }
//                            },
//                            error: function () {
//                                alert("Error in loading data")
//                            }
//                        });
//                        $('#ViewCollaborator').modal(options);
//                        $('#ViewCollaborator').modal('show');
//                        event.preventDefault();
//                        break;
//                        // function to edit task
//                    case "EditTask":
//                        var Rowid = "#tr-" + id;
//                        //var id = $(ctrl).parent().parent()[0].id;
//                        $.ajax({
//                            type: "GET",
//                            url: '/Tasks/CRMTasksForm?exitmode=Edit&id=' + id,
//                            contentType: "application/json; charset=utf-8",
//                            datatype: "json",
//                            // bdata: { exitmode: "ManagePendingTasks", id: $("#grid1").val() },
//                            success: function (data) {
//                                ;
//                                $('#CreateCRMTasks').html(data);
//                                $('#CreateTasks').modal(options);
//                                $('#CreateTasks').modal('show');
//                                $(".PanelForm").css({ "border": "none", "box-shadow": "none", "width": "200px" });
//                                $(".Task").css({ "margin-top": "0px", "margin-bottom": "10px" });
//                                $(".hr").append('<hr />')
//                                $(".hr").css("margin-bottom", "20px")
//                                $(".mainpanel").css({ "margin-left": "0px", "padding-left": "5px", "width": "270px" });
//                                $(".labeltext").css({ "margin-bottom": "10px" });
//                                $(".forminput").css({ "margin-bottom": "15px" });
//                                $(".mainbutton").css({ "margin": "20px 0px 20px 15px" });
//                                $(".cancel").attr("data-dismiss", "modal");
//                            },
//                        })
//                        break;
//                        //fuction to view subtasks
//                    case "viewSubTask":
//                        popOverOpen = false
//                        var subtaskClass = "div." + id;
//                        $(subtaskClass).parent().toggle();
//                        break;
//                    case "CreatedByMe":
//                        $.ajax({
//                            type: "GET",
//                            url: "/CRM/FilterPendingTask",
//                            contentType: "application/json; charset=utf-8",
//                            datatype: "json",
//                            data: { filterText: "CreatedByMe" },
//                            success: function (data) {
//                                loadData(data);
//                                $("#fText").text("Created By Me");
//                                $("#FilterText").show();
//                            }
//                        })
//                        break;
//                    case "Collaborate":
//                        $.ajax({
//                            type: "GET",
//                            url: "/CRM/FilterPendingTask",
//                            contentType: "application/json; charset=utf-8",
//                            datatype: "json",
//                            data: { filterText: "Collaborate" },
//                            success: function (data) {
//                                loadData(data);
//                                $("#fText").text("Collaborate with me");
//                                $("#FilterText").show();
//                            }
//                        })
//                        break;
//                    case "Assigned":
//                        $.ajax({
//                            type: "GET",
//                            url: "/CRM/FilterPendingTask",
//                            contentType: "application/json; charset=utf-8",
//                            datatype: "json",
//                            data: { filterText: "Assigned" },
//                            success: function (data) {
//                                loadData(data);
//                                $("#fText").text("Assigned To me");
//                                $("#FilterText").show();
//                            }
//                        })
//                        break;
//                    case "TeamTasks":
//                        $.ajax({
//                            type: "GET",
//                            url: "/Tasks/AjaxTeamTasks",
//                            contentType: "application/json; charset=utf-8",
//                            datatype: "json",
//                            data: {},
//                            success: function (data) {
//                                loadData(data);
//                                $("#fText").text("Team Task");
//                                $("#FilterText").show();
//                            }
//                        })
//                        break;
//                    case "TeamFilter":
//                        $("#fText").text("Team Task");
//                        $("#FilterText").show();
//                        var options = {
//                            "backdrop": "static",
//                            keyboard: true
//                        };
//                        $('#EmployeeTasks').modal(options);
//                        $('#EmployeeTasks').modal('show');
//                        break;
//                }
//                function removeFilter1() {
//                    $("#loading").show();
//                    $.ajax({
//                        type: "GET",
//                        url: "/CRM/AjaxTeamTasks",
//                        contentType: "application/json; charset=utf-8",
//                        datatype: "json",
//                        data: {},
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
//        if ($trigger.hasClass('parentdiv')) {
//            if ($("#Logintype").val() == "Manager") {
//                options.items.TaskClose = { name: "Close Task", icon: "fa-check" },
//                options.items.edit = { name: "Edit", icon: "fa-pencil" },
//                options.items.filter = {
//                    name: "Filter", icon: "fa-filter",
//                    "items": {
//                        "CreatedByMe": { name: "Created by me", icon: "fa-calendar-plus-o" },
//                        "Collaborate": { name: "Collaborator", icon: "fa-sitemap" },
//                        "Assigned": { name: "Assigned to me", icon: "fa-pencil-square-o" }
//                    }
//                },
//                options.items.TeamTasks = { name: "Team Tasks", icon: "fa-users" }
//                options.items.TeamFilter = { name: "Team Filter", icon: "fa-th-list" }
//            } else {
//                options.items.AddRemark = { name: "Add Remark", icon: "fa-plus" },
//                options.items.ViewRemarks = { name: "View Remark", icon: "fa-eye" },
//                options.items.subtask = { name: "Add SubTask", icon: "fa-plus" },
//                //name: "Sub Tasks",     icon: "fa-copy",
//                //       "items": {
//                //      "Add subtask":      { name: "Add SubTask",    icon: "fa-plus" },
//                //     "viewSubTask":  { name: "View SubTasks",  icon: "fa-eye" },
//                //  }
//                // }
//                options.items.ShowCollaboratorsCtrls = {
//                    name: "Collaborators", icon: "fa-users",
//                    "items": {
//                        "AddCollaborator": { name: "Add Collaborator", icon: "fa-plus" },
//                        "ShowCollaborators": { name: "View Collaborator", icon: "fa-eye" },
//                    }
//                }
//                options.items.taskClose = { name: "Close Task", icon: "fa-check" },
//        options.items.EditTask = { name: "Edit", icon: "fa-pencil" },
//        options.items.filter = {
//            name: "Filter", icon: "fa-filter",
//            "items": {
//                "CreatedByMe": { name: "Created by me", icon: "fa-calendar-plus-o" },
//                "Collaborate": { name: "Collaborator", icon: "fa-sitemap" },
//                "Assigned": { name: "Assigned to me", icon: "fa-pencil-square-o" }
//            }
//        }
//            }
//        }
//        else {
//        }
//        return options;
//    }
//});

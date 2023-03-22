
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

function loadData(data) {
    var tblEmployee = $("#example tbody");
    $("#example tbody tr").remove();
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
    /* $("#info").text(a + "-" + b + " of " + c);*/
    $("#info").text(a + "-" + data.recordsTotal + " of " + data.recordsTotal);
    $("#Next").addClass("disabledbutton");
    $("#Prev").addClass("disabledbutton");
    var m = a - 1;
    $("#RightShift").click();

    $.each(data.data, function (index, item) {
        var m = (a) + index;
        var tr = $("<tr id='" + item.CRMDocumentsLink_Key + "' class='clickable maindiv u' data-toggle='collapse' data-target='." + item.CRMDocumentsLink_Key + "' style='width:99%;'></tr>");
        tr.html(("<td style='width:5%'><input type='checkbox' onclick='chkCheckUncheck(this)' id='" + item.CRMDocumentsLink_Key + "' value='" + item.CRMDocumentsLink_Key + "'style='margin-top:2px; float:left' class='checkboxall'/></td>")
            + " " + ("<td class='basicTr' style='width:5%;'>" + m + "</td>")
            + " " + ("<td class='basicTr TaskIdValue' style='width:10%;'>" + item.LinkCode + "</td>")
            + " " + ('<td class="basicTr uploadfile clampTr" style="width:23%;word-break:break-all;"><a onClick="downloadRemarkFile(\'' + $.trim(item.FileName) + '\',\'' + item.LinkURL + '\')"  class="filenam">' + item.FileName + '</a></td>')
            //+ " " + ("<td class='basicTr clampTr' style='width:20%;'><a href='" + item.LinkURL + "' download>" + item.FileName + "</td>")
            + " " + ("<td class='basicTr' style='width:17%; padding-left:15px;'>" + item.FrmtCreationDate + "</td>")
            + " " + ("<td class='basicTr tasknotes' style='width:20%'>" + item.TextLogincode + "</td>")
            + " " + ("<td class='basicTr clampTr tasktags' style='width:20%;word-break:break-all;'>" + item.Tags + "</td>")
        );
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
        Deviceheight();
        DetailPaneHeight();
    }
    $('#examples').on('click', '.u', function () {
        $("tr").removeClass("style");
        var isSomethingTrue = true;
        if (isSomethingTrue && ($(window).width() >= 600)) {
            var lastChkbox = $(".maindiv.rowActive").find(".checkboxall")[0];
            if (lastChkbox !== undefined) {
                $(lastChkbox).attr("checked", false);
                chkCheckUncheck(lastChkbox);
            }

            $(".maindiv").removeClass("rowActive");
            $(this).addClass("rowActive");
            var chkBox = $(this).find(".checkboxall")[0];
            $(chkBox).attr("checked", true);
            chkCheckUncheck(chkBox);

            //$("#dropdown").addClass("setStyle");
            //$(this).addClass("style");
            $(".right").css("display", "flex")
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
            SetMainTasktDetailPane($row, ".right");
            var $taskid = $row.find(".TaskIdValue").text();
            crmCommKey = $row.find(".crmCommKey").text();
            GetTaskData($taskid);
        }
        else if (isSomethingTrue && ($(window).width() <= 600)) {
            //$("#dropdown").addClass("setStyle");
            //$(this).addClass("style");
            $(".right").css("display", "flex")
            $(".right").addClass("mobileDetailPane");
            $(".left").hide();
            Deviceheight();
            var $row = $(this).closest("tr");
            SetMainTasktDetailPane($row, ".right");
            var $taskid = $row.find(".TaskIdValue").text();
            crmCommKey = $row.find(".crmCommKey").text();
            GetTaskData($taskid);
        }

    });

    $(document).ready(function () {

        $("nav").find(".newTitle").remove();
        //var s = "<p class='newTitle' >Task Communications</p>";
        var s = "<p class='newTitle' >Task Files</p>";
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
                // $("div").removeClass("style");
                $(".right").css('display', 'none');
                // $(".Taskstatus").addClass(".mov");
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
            //$($(this).attr('href')).show();
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
    var Header = $("header").outerHeight(true);
    var icondiv = $(".calHeightIcon").outerHeight(true);
    var Footer = $(".main-footer").outerHeight(true);
    var windowHeight = $(window).outerHeight(true);
    var SumOfElementHeight = Header + icondiv + Footer;
    var MainHeight = windowHeight - SumOfElementHeight - 90;
    $("#example tbody").height(MainHeight);
}

function DetailPaneHeight() {
    var Header = $("header").outerHeight(true);
    var Footer = $(".main-footer").outerHeight();
    var windowHeight = $(window).outerHeight(true);
    var SumOfElementHeight = Header + Footer;
    var MainHeight = windowHeight - SumOfElementHeight - 15;
    $(".right").height(MainHeight);
}
//added by Rasika for purpose of responsiveness while switching from desktop view to mobile view

$(document).ready(function () {
    function resizewidth() {
        if ($(window).width() >= 600) {
            if ($(".right").css('display') != 'none') {
                $(".left").addClass("move");
                $(".left").show();
                $(".right").css("display", "flex")
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
            var dtmduedate = crtDate.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + minute;
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
function SetMainTasktDetailPane($row, destination) { 
    var $file = $row.find(".uploadfile").text();  
    $(destination + " #uploadedfile").text($file); 
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

////Set table height according to screen
//function Deviceheight() {
//    var Header = $("header").outerHeight(true);
//    var Container = 0;
//    var icondiv = $(".calHeightIcon").outerHeight(true);
//    /*var TableDive = $(".calHeightTaskBar").outerHeight(true);*/
//    var Footer = $(".main-footer").outerHeight(true);
//    var windowHeight = $(window).outerHeight(true);
//    var SumOfElementHeight = Header + Container  + icondiv + Footer;
//    var MainHeight = windowHeight - SumOfElementHeight - 15; //- 40;
//    $("#example tbody").height(MainHeight);
//}


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

function chkCheckUncheck(ctrl) {
    if (ctrl.checked) {
        //var index = chkvalesArr.indexOf($(ctrl).val());
        //if (index == -1) {
        //    chkvalesArr.push($(ctrl).val());
        //}

        $(ctrl).parents("tr").addClass("rowChecked");
    }
    else {
        //var index = chkvalesArr.indexOf($(ctrl).val());
        //if (index > -1) {
        //    chkvalesArr.splice(index, 1);
        //}

        $(ctrl).parents("tr").removeClass("rowChecked");
    }
}
//Basic filter multiple
function SubmitBasicFilter(search, searchMsg) {
    var pSize = sessionStorage.getItem(regPageSizeKey);
    $("#example tbody tr").remove();
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();

    $.ajax({
        url: '/Tasks/AjaxTaskFileData',
        type: "POST",
        data: { id: "", start: 0, pSize: pSize, search: search  },
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

$(document).ready(function () {
    var a = 1;
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem(regPageSizeKey);
    if (t == null) { t = 50 }
    var SelectedRows = "";
    GetEmployeeData(a, 1, t, "F");
    var counter = 0;
    $('a').tooltip();
    });

function removeFilter() {
    removeBasicAdvanceFilter();
    $("#example tbody tr").remove();
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();

    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem(regPageSizeKey);
    if (t == null) { t = 50 }
    GetEmployeeData(1, 1, t, "F");
}


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
    $.post('/Tasks/AjaxTaskFileData', { id: pageNumber, start: start, pSize: PSize, direction: dir, search: search }, function (data) {
        sessionStorage.setItem("Total", data.recordsTotal);
        loadData(data);
    });
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
//            var FiltersArr = str.split("!");
//            for (var i = 0; i < FiltersArr.length; i++) {
//                var arr = FiltersArr[i].split("~");
//                if (arr.length > 1) {
//                    var tr = "#basicFilterTable tr" + arr[0];
//                    var controls = arr[1].split("|");
//                    for (var j = 0; j < controls.length; j++) {
//                        $(tr + " .basicFilterChk").prop("checked", true);
//                        $(tr).addClass("basicFilterSeleted");
//                        var ctrl = controls[j].split(":");
//                        var type = $(tr + " " + ctrl[0]).prop("type");
//                        if (type == "select-multiple") {
//                            var valArr = ctrl[1].split(",");
//                            $(tr + " " + ctrl[0]).val(valArr);
//                        }
//                        else {
//                            $(tr + " " + ctrl[0]).val(ctrl[1]);
//                        }

//                    }
//                }
//            }
//            $(".selectpicker").selectpicker('referesh');

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

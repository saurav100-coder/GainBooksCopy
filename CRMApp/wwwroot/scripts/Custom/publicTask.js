$(document).ready(function () {
    //$('.tabs-nav a').on('click', function (event) {
    //    event.preventDefault();

    //    $('.tab-active').removeClass('tab-active');
    //    $(this).parent().addClass('tab-active');
    //    $('.tabs-stage .div').hide();
    //    $($(this).attr('href')).show();
    //});

    //$('.tabs-nav a:first').trigger('click'); // Default

    //GetTaskStatus();
    //GetEmployees();
    GetTaskData();


});

//function GetTaskStatus() {
//    var listTaskStatus = $.trim($("#hiddenTaskStatus").val());
//    if (listTaskStatus != "") {
//        var data = JSON.parse(listTaskStatus);
//        var ddlTaskStatus = $("#ddlTaskStatus");
//        $.each(data, function (index, item) {
//            var option = $("<option value='" + item.p_infotable + "'>" + $.trim(item.nameofinfo) + "</option>")
//            ddlTaskStatus.append(option);
//        })
//    }
//}

//function GetEmployees() {
//    var listAssignedTo = $.trim($("#hiddenAssignedTo").val());
//    if (listAssignedTo != "") {
//        var data = JSON.parse(listAssignedTo);
//        var ddlAssignedto = $("#ddlAssignedto");
//        $.each(data, function (index, item) {
//            var option = $("<option value='" + item.p_acccode + "'>" + item.accname + "</option>")
//            ddlAssignedto.append(option);
//        })
//    }
//}

function GetTaskData() {
    var encStr = $("#encStr").val();
    $("#container").hide();
    $('#loading').show();
    $('#loadingmessage').show();
    $.post('/publicurl/AjaxGetTask', { encStr: encStr }, function (data1) {
        if (data1 == "err") {
            $('#loading').show();
            $('#loadingmessage').hide();
            $("#Msg").show();
            $("#Msg").text("Error in loading data");
            $('#loading').addClass('clickable');
        }
        else {
            var data = JSON.parse(data1);
            LoadTaskData(data);
        }

    });
}

function LoadTaskData(data) {
    //Remove all content 
    ClearFields();

    //Set Values of fields
    $.each(data, function (index, item) {
        $("#mtaskid").text(item.p_crmtasks);
        $("#taskkey").text(item.crmtasks_key);
        $("#mtasktitle").text(item.tasktitle);
        $("#txtmtasktitle").val(item.tasktitle);
        $("#mtaskdescription").text(item.taskdescription);
        $("#txtmtaskdescription").val(item.taskdescription);
        $("#startdate").text(item.FrmtStartDate);
        $("#mduedate").text(item.FrmtDueDate);
        $("#ddlAssignedto").val(item.assignedto);
        $("#massignedto").text(item.TextAssignedto);
        $("#ddlTaskStatus").val(item.taskstatus);
        $("#mtaskstatus").text(item.TextTaskStatus);
        if (item.under==0) {
            $("#mtaskType").text("Main-Task")
        }
        else {
            $("#mtaskType").text("Sub-Task")
        }

        //var dateArr1 = item.FrmtDueDate.split(" ");
        //var dateArr2 = dateArr1[0].split("/");
        //var dtmduedate = dateArr2[2] + '-' + dateArr2[1] + '-' + dateArr2[0];
        //$("#dtmduedate").val(dtmduedate);

        if ($.trim(item.FrmtDueDate) != "") {
            var dateArr1 = item.FrmtDueDate.split(" ");
            var dateArr2 = dateArr1[0].split("/");
            var dtmduedate = dateArr2[2] + '-' + dateArr2[1] + '-' + dateArr2[0] + "T" + dateArr1[1];
            $("#dtmduedate").val(dtmduedate);
        }
        else {
            var crtDate = new Date();
            var month = (crtDate.getMonth() + 1) < 10 ? '0' + (crtDate.getMonth() + 1) : (crtDate.getMonth() + 1);
            var day = crtDate.getDate() < 10 ? '0' + crtDate.getDate() : crtDate.getDate();
            var hour = crtDate.getHours().toString().padStart(2, "0");
            var minute = crtDate.getMinutes().toString().padStart(2, "0");
            var dtmduedate = crtDate.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + minute;
            $("#dtmduedate").val(dtmduedate);
        }


        CancleEditTask();
        LoadRemarks(item.p_crmtasks);
        ShowCollaboratorsNew();
        ShowTagsNew();
    })

    if (data.length == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $('#loading').addClass('clickable');
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
        $("#container").show();
    }
}

function ShowMsg(msg) {
    $(".RemarkMessage #Content").text(msg);
    $('.RemarkMessage').show();
}

function SubmitTaskRemark() {
    var formdata = new FormData();
    var encStr = $("#encStr").val();
    formdata.append('encStr', encStr);
    var remark = $("#frmRemark #txtRemark").val();
    formdata.append('remark', remark);
    var taskId = $("#mtaskid").text();
    formdata.append('taskId', taskId);
    var file = $('#frmRemark #remarkfile')[0].files[0];
    formdata.append('file1', file)
    console.log(formdata);
    if ($.trim(remark) != "" || typeof file !== "undefined") {
        //Creating an XMLHttpRequest and sending
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/PublicUrl/AddTasksRemark');
        xhr.send(formdata);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (xhr.response.toString() == "\"success\"") {
                    ShowMsg("Remark added Successfully.");
                    $("#frmRemark #txtRemark").val("");
                    $('#frmRemark #remarkfile').val("");
                    LoadRemarks($("#mtaskid").text());
                }
                else {
                    ShowMsg("Error to add remark.");
                }
            }
        }
    }
    else {
        ShowMsg("Please fill at lease one");
    }

    return false;
}

function SubmitEditTask() {
    var formData = {
        P_CRMTasks: $("#mtaskid").text(),
        TaskTitle: $("#txtmtasktitle").val(),
        TaskDescription: $("#txtmtaskdescription").val(),
        duedate: $("#dtmduedate").val(),
        Taskstatus: $("#ddlTaskStatus").val(),
        Assignedto: $("#ddlAssignedto").val(),
        encStr: $("#encStr").val()
    };

    $.ajax({
        type: "POST",
        url: "/PublicUrl/EditTask",
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
                GetTaskData();
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


function ClearFields() {
    $("#mtaskid").text("");
    $("#mtasktitle").text("");
    $("#txtmtasktitle").val("");
    $("#mtaskdescription").text("");
    $("#txtmtaskdescription").val("");
    $("#startdate").text("");
    $("#mduedate").text();
    $("#dtmduedate").val("");
    $("#mtaskstatus").text("");
    $("#ddlTaskStatus").val(0);
    $("#massignedto").text("");
    $("#ddlAssignedto").val(0);
    $("#txtRemark").val("");
    //$("#tab-1").empty();
}

function ShowEditTask() {
    //Hide
    $("#editIcon").hide();
    $("#mtasktitle").hide();
    $("#mtaskdescription").hide();
    $("#mduedate").hide();
    $("#mtaskstatus").hide();
    $("#massignedto").hide();

    //Show
    $("#SaveTask").show();
    $("#txtmtasktitle").show();
    $("#txtmtaskdescription").show();
    $("#CancleEdit").show();
    $("#dtmduedate").show();
    $("#ddlAssignedto").show();
    $("#ddlTaskStatus").show();

}

function CancleEditTask() {
    //Show
    $("#editIcon").show();
    $("#mtasktitle").show();
    $("#mtaskdescription").show();
    $("#mduedate").show();
    $("#mtaskstatus").show();
    $("#massignedto").show();

    //Hide
    $("#SaveTask").hide();
    $("#txtmtasktitle").hide();
    $("#txtmtaskdescription").hide();
    $("#CancleEdit").hide();
    $("#dtmduedate").hide();
    $("#ddlAssignedto").hide();
    $("#ddlTaskStatus").hide();
}




//Load Task Remarks
function LoadRemarks(TaskPid) {
    $("#remarkTab #boxLoading #boxLoadingMessage").show();
    $("#remarkTab #AllRemarks").hide();
    var encStr= $("#encStr").val()
    $.ajax({
        type: "POST",
        url: "/PublicUrl/LoadTasksRemarkData",
        data: { encStr: encStr, taskId: TaskPid },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            if (data == "err") {
                var NothingDiv = $('<div class="RemarkHistoryItem col-sm-12" style="margin-bottom:12px; border-radius:5px; background-color:#f3f8fa; padding:10px;"><div class="line1"><span>Error in loading Remarks </span> </div></div>');
                $(" #remarkTab #AllRemarks").append(NothingDiv);
                $(" #remarkTab #boxLoading #boxLoadingMessage").hide();
                $(" #remarkTab #AllRemarks").show();
            }
            var a = 1;
            var finalDestination = $(" #remarkTab #AllRemarks")
            finalDestination.empty();
            $.each(data.data, function (index, item) {
                var m = (a) + index;
                //Load Data
                var html = '<div class="RemarkHistoryItem col-sm-12" style="margin-bottom:12px; border-radius:5px; background-color:#f3f8fa; padding:10px;" id="' + item.CRMCommunication_key + '">'
                + '<div class="line1" style="display:flex; overflow: hidden;"><span>' + m + '</span> <div class=""><img src="/images/remark-txt.png" style="width: 25px; padding-right: 8px;" /></div><div style="">' + item.Commtext + '</div></div>'
                + '<div class="line2"><span class="Remarkuser"><img src="/images/remark-by.png" style="width: 20px; padding-right: 8px;" />' + item.TextLogincode + '</span><span class="Remarkdate" style="float:right;"><img src="/images/remark-date.png" style="width: 25px; padding-right: 8px;" />' + item.FrmtCreationDate + '</span></div>';
                if (item.FileName != "") {
                    html = html + '<div class="line3"><span class="upload">Uploaded File :</span><a href="' + item.LinkURL + '" class="filenam">' + item.FileName + '</a></div></div>';
                }
                var remarkDiv = $(html);

                finalDestination.append(remarkDiv);
                $(" #remarkTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            });
            if (data.recordsTotal == 0) {
                var NothingDiv = $('<div class="RemarkHistoryItem col-sm-12" style="margin-bottom:12px; border-radius:5px; background-color:#f3f8fa; padding:10px;"><div class="line1"><span>No Remarks here</span> </div></div>');
                finalDestination.append(NothingDiv);
                $(" #remarkTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            }
        },
        error: function () {
            var NothingDiv = $('<div class="RemarkHistoryItem col-sm-12" style="margin-bottom:12px; border-radius:5px; background-color:#f3f8fa; padding:10px;"><div class="line1"><span>No Remarks here</span> </div></div>');
            $(" #remarkTab #AllRemarks").append(NothingDiv);
            $(" #remarkTab #boxLoading #boxLoadingMessage").hide();
            $(" #remarkTab #AllRemarks").show();
        }
    });
}



//Add new Task Collaborator
function SubmitCollaboratorsNew() {
    var encStr = $("#encStr").val()
    var TaskId = $("#mtaskid").text();
    var selectedCollaborator = $("#ddlCollab").val();
    var Taskkey = $("#taskkey").text();
    if (selectedCollaborator != 0) {
        $.ajax({
            type: "POST",
            url: "/PublicUrl/AddTaskCollaborators",
            data: {encStr:encStr, Taskid: TaskId, Taskkey: Taskkey, collaboratorId: selectedCollaborator },
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
    $(".Collaborators #AddCollab").hide();
    $(".Collaborators #ddlCollab").show();
    $(".Collaborators #closeAddCollab").show();
}

//Close Controls of Add new Task Collaborator
function closeAddCollab(destination) {
    $(".Collaborators #AddCollab").show();
    $(".Collaborators #ddlCollab").val(0);
    $(".Collaborators #ddlCollab").hide();
    $(".Collaborators #closeAddCollab").hide();
}




//Load Task Collaborators
function ShowCollaboratorsNew() {
    $(".Collaborators #boxLoading #boxLoadingMessage").show();
    $(".Collaborators #AllCollab").hide();
    var p_crmtasks = $("#mtaskid").text();
    var encStr = $("#encStr").val()
    $.ajax({
        type: "POST",
        url: "/PublicUrl/LoadCollaboratorsData",
        data: { encStr: encStr, taskId: p_crmtasks },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            if (data == "err") {
                var NotingCollabDiv = $('<div class="CollaboratorsBoxx"><span id="collaboratorName" style="display: inline-flex; font-size: 13px; font-weight:300; color:black;">Error in loading data</span></div>');
                $(".Collaborators .boxx #AllCollab").append(NotingCollabDiv);
                $(".Collaborators #boxLoading #boxLoadingMessage").hide();
                $(".Collaborators #AllCollab").show();
                return true;
            }
            $(".Collaborators .boxx #AllCollab").empty();
            $.each(data.data, function (index, item) {
                var html = ' <div class="CollaboratorsBoxx" id="' + item.CRMCollaborator_key + '"><img img src="/images/person.png" style="display: inline-flex;  margin-left: 10px;" />'
                        + ' <span id="collaboratorName" style="display: inline-flex; font-size: 13px; font-weight:300; color:black;">' + item.TxtCollaborator + '</span>'
                        + ' <span class="closebn" id="' + item.CRMCollaborator_key + '" onclick="deleteCollaboratorNew(this.id)" style="float: right; display: inline-flex; cursor: pointer; ">&times;</span></div>';

                var collaboratorDiv = $(html);
                $(".Collaborators .boxx #AllCollab").append(collaboratorDiv);
                $(".Collaborators #boxLoading #boxLoadingMessage").hide();
                $(".Collaborators #AllCollab").show();
            });

            if (data.recordsTotal == 0) {
                var NotingCollabDiv = $('<div class="CollaboratorsBoxx"><span id="collaboratorName" style="display: inline-flex; font-size: 13px; font-weight:300; color:black;">No Collaborators here</span></div>');
                $(".Collaborators .boxx #AllCollab").append(NotingCollabDiv);
                $(".Collaborators #boxLoading #boxLoadingMessage").hide();
                $(".Collaborators #AllCollab").show();
            }
        },
        error: function () {
            var NotingCollabDiv = $('<div class="CollaboratorsBoxx"><span id="collaboratorName" style="display: inline-flex; font-size: 13px; font-weight:300; color:black;">Error in loading data</span></div>');
            $(".Collaborators .boxx #AllCollab").append(NotingCollabDiv);
            $(".Collaborators #boxLoading #boxLoadingMessage").hide();
            $(".Collaborators #AllCollab").show();
        }
    });

}


//Delete Task Collaborators
function deleteCollaboratorNew(id) {
    var encStr = $("#encStr").val()
    $.ajax({
        type: "GET",
        url: "/PublicUrl/DeleteCollaborator",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        data: {encStr:encStr, id: id },
        success: function (data) {
            if (data == "err") {
                ShowMsg("Something went wrong.Please try again later.");
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                ShowMsg("Collaborator deleted Successfully");
                ShowCollaboratorsNew();
            }
        },
        error: function () {
            ShowMsg("Something went wrong.Please try again later.");
        }
    });
}

//Load Task Tags
function ShowTagsNew() {
    $(".task-classification #boxLoading #boxLoadingMessage").show();
    $(".task-classification #tag-container").hide();
    var p_crmtasks = $("#mtaskid").text();
    var encStr = $("#encStr").val()
    $.ajax({
        type: "POST",
        url: "/PublicUrl/ShowTagsData",
        data: {encStr: encStr, TaskId: p_crmtasks },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            if (data == "err") {
                var NotingCollabDiv = $('<div class="TagsBoxx"><span id="TagName" style="padding-left:10px; display: inline-flex; font-size: 13px; font-weight:300; color:black;">Error in loading data</span></div>');
                $(".task-classification .boxx #tag-container").append(NotingCollabDiv);
                $(".task-classification #boxLoading #boxLoadingMessage").hide();
                $(".task-classification #tag-container").show();
            }
            $(".task-classification .boxx #tag-container").empty();
            $.each(data.data, function (index, item) {
                var html = ' <div class="TagsBoxx" id="' + item.tags_key + '">'
                        + ' <span id="TagName" style="padding-left:10px; display: inline-flex; font-size: 13px; font-weight:300; color:black;">' + item.txttagname + '</span>'
                        + ' <span class="closebn" id="' + item.p_tags + '" onclick="deleteTagsNew(this.id)" style="float: right; display: inline-flex; cursor: pointer; ">&times;</span></div>';

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
    var encStr = $("#encStr").val()
    $.ajax({
        type: "GET",
        url: "/PublicUrl/DeleteTag",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        data: { encStr:encStr,p_tags: p_tags },
        success: function (data) {
            if (data == "err") {
                ShowMsg("Something went wrong.Please try again later.");
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                ShowMsg("Tag deleted Successfully");
                ShowTagsNew();
            }
        },
        error: function () {
            alert("Something went wrong.Please try again later.");
        }
    });
}

//Add new Task Tag
function SubmitTagsNew() {
    var encStr = $("#encStr").val()
    var TaskId = $("#mtaskid").text();
    var selectedTag = $("#ddlTags").val();
    if (selectedTag != 0) {
        $.ajax({
            type: "POST",
            url: "/PublicUrl/AjaxAddTaskTags",
            data: {encStr:encStr, Taskid: TaskId, p_infotable: selectedTag },
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

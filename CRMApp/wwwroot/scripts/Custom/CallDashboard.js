var options = { "backdrop": "static", keyboard: true };
$(document).ready(function () {
    $("nav").find(".newTitle").remove();
    var s = "<p class='newTitle' >Call Dashboard</p>";
    $("nav").find(".titleName").append(s);

    $(".NoRecord").hide();

    //Click of search button
    $(".btn-Submit").click(function () {
        $("#CallDetails").hide();
        document.getElementById("loadspin").style.display = "block";
        document.getElementById("overlay").style.display = "block";

        var Pissuesfilegst = $("#CallId").val();

        GetCallData(Pissuesfilegst)
        GetRemarkData(Pissuesfilegst)
        GetAssignData(Pissuesfilegst);
        GetPrevCallData(Pissuesfilegst)
        GetCallEngagedData(Pissuesfilegst)
        GetCallLogsData(Pissuesfilegst)

    });


});


function GetCallLogsData(value) {
    var parentCallLogDiv = $("#ParentCallLogDiv");
    parentCallLogDiv.text('');
    $.post('/CustomerDetails/GetCallRecordingData', { P_allcallsreg: value }, function (callLogsdata) {
        var callLogs = JSON.parse(callLogsdata)
        if (callLogs.length == 0) {
            var CallLogsContainerDiv = $('<h4 class="text-center" style="color: gray; margin-bottom: 20px; margin-top: 20px;">No Record Found!</h4>');
            parentCallLogDiv.append(CallLogsContainerDiv);
        }
        else {
            $.each(callLogs, function (index, item) {
                var CallLogsContainerDiv = $('<div class="col-md-11" style="margin-bottom:10px;padding-top:12px;"></div>');
                parentCallLogDiv.append(CallLogsContainerDiv);

                var MobileDiv = '<div class="col-sm-6 col-xs-6"><label style="margin-right:5px;margin-left:-15px;">' + (index + 1) + '. ' + '&nbsp;<i class="fa fa-phone"></i>  </label><span>' + item.mobileno + '</span></div>';
                CallLogsContainerDiv.append(MobileDiv);

                var CallType = '<div class="col-sm-6 col-xs-6"><label style="margin-right:5px"><i class="fa fa-tag"></i></label><span>' + item.calltype + '</span></div>';
                CallLogsContainerDiv.append(CallType);

                var CallDuration = '<div class="col-sm-6 col-xs-6 "><label style="margin-right:5px"><i class="fa fa-clock-o"></i></label><span>' + item.TextCallDuration + '</span></div>';
                CallLogsContainerDiv.append(CallDuration);

                var CallTimeDiv = '<div class="col-sm-6 col-xs-6"><label style="margin-right:5px"><i class="fa fa-calendar-o"></i></label>' + item.Textcalltime + '</div>';
                CallLogsContainerDiv.append(CallTimeDiv);

                var CallByDiv = '<div class="col-sm-6 col-xs-6"><label style="margin-right:5px;"><i class="fa fa-user"></i></label>';
                if (item.TextLogincode == "" || item.TextLogincode == undefined || item.TextLogincode == null) {
                    CallByDiv += '<span>Not Available</span></div>';
                }
                else {
                    CallByDiv += '<span>' + item.TextLogincode + '</span></div>';
                }
                CallLogsContainerDiv.append(CallByDiv);

                //var CallRecordingPlayDiv = '<div class="col-md-4 col-sm-6 col-xs-6" id="recording-' + item.p_callfreq + '">';
                //if (item.callduration > 0) {
                //    CallRecordingPlayDiv += '<i class="fa fa-play-circle" style="font-size:25px;cursor:pointer;" onclick="PlayFile(' + item.p_callfreq + ');"></i><input type="hidden" id="file-' + item.p_callfreq + '" value="' + $.trim(item.filename) + '"/></div>';
                //}
                //else {
                //    CallRecordingPlayDiv += '</div>';
                //}
                //CallRecordingContainerDiv.append(CallRecordingPlayDiv);

                CallLogsContainerDiv.append('<hr class="col-sm-11 col-xs-11">');
            });
        }
    });
}

//Get latest call details from server
function GetCallData(value) {
    var data;
    data = { CallId: value }
    $.post('/CustomerDetails/SearchCallDetails',
        data = data,
        success = function (data) {
            if (data != "Error" && data != "logout") {
                //loadCallData(data);
                $(".NoRecord").hide();
                var obj1, obj2, obj3 = "";
                var data1 = data.split("|");
                if (data1[0] != "" && data1[0] != "[]") {
                    obj1 = JSON.parse(data1[0]);
                    $("#Firmname").text(obj1[0].Firmname);
                    $("#Assignedto").text(obj1[0].Assignedtotext);
                    $("#issue").text(obj1[0].Issuetypetext)
                    $("#desc").text(obj1[0].Issuedescription)
                    $("#MobNo").text(obj1[0].Mobileno);
                } else {
                    $("#Firmname").text("N/A");
                    $("#Assignedto").text("N/A");
                    $("#issue").text("N/A")
                    $("#desc").text("N/A")
                    $("#MobNo").text("N/A");
                }
                if (data1[1] != "" && data1[1] != "[]") {
                    obj2 = JSON.parse(data1[1]);
                    $("#callTime").text(obj2[0].frmtCallTime)
                    $("#callDuration").text(obj2[0].callduration)
                } else {

                    $("#callTime").text("N/A")
                    $("#callDuration").text("N/A")
                }
                if (data1[2] != "" && data1[2] != "[]") {
                    obj3 = JSON.parse(data1[2]);
                    $("#Collab").text(obj3[0].TxtCollaborator)
                } else {
                    $("#Collab").text("N/A")
                }


                $("#P_allcallsreg").val(value);







                $("#CallDetails").show();
                document.getElementById("loadspin").style.display = "none";
                document.getElementById("overlay").style.display = "none";
            } else if (data == "False") {
                $("#CallDetails").hide();
                document.getElementById("loadspin").style.display = "none";
                document.getElementById("overlay").style.display = "none";
                $(".NoRecord").show();
                var options = { "backdrop": "static", keyboard: true };
                $('#CallClosed').modal(options);
                $('#CallClosed').modal("show");

            } else if (data == "logout") {
                location.href = '/Home/LogOut/';
            }
        });
}
//Function to get the remark list of this  call
function GetRemarkData(value) {
    var data;
    data = { CallId: value, calltype: "C" }
    $.post('/CustomerDetails/GetRemarkDataofACall',
        data = data,
        success = function (data) {
            if (data != "Error" && data != "logout") {
                LoadRemarkData(data);
                $("#CallDetails").show();
                document.getElementById("loadspin").style.display = "none";
                document.getElementById("overlay").style.display = "none";
            } else if (data == "logout") {
                location.href = '/Home/LogOut/';
            }
        });

}
//function to get AssgnHistory of the call
function GetAssignData(value) {
    var data;
    data = { CallId: value, calltype: "C" }
    $.post('/CustomerDetails/GetAssignedHistoryOfCall',
        data = data,
        success = function (data) {
            if (data != "Error" && data != "logout") {
                LoadAssignData(data);
                $("#CallDetails").show();
                document.getElementById("loadspin").style.display = "none";
                document.getElementById("overlay").style.display = "none";
            } else if (data == "logout") {
                location.href = '/Home/LogOut/';
            }
        });
}
//function to get callEngageStatusHistory of the call
function GetCallEngagedData(value) {
    var data;
    data = { CallId: value }
    $.post('/CustomerDetails/GetCallEngagedStatusHistoryOfCall',
        data = data,
        success = function (data) {
            if (data != "Error" && data != "logout") {
                LoadCallEngageStatusData(data);
                $("#CallDetails").show();
                document.getElementById("loadspin").style.display = "none";
                document.getElementById("overlay").style.display = "none";
            } else if (data == "logout") {
                location.href = '/Home/LogOut/';
            }
        });
}
//function to get the Previous call data of same customer
function GetPrevCallData(value) {
    var data;
    data = { CallId: value }
    $.post('/CustomerDetails/GetPreviousCallDetails',
        data = data,
        success = function (data) {
            if (data != "Error" && data != "logout") {
                loadPrevCallData(data);
                $("#CallDetails").show();
                document.getElementById("loadspin").style.display = "none";
                document.getElementById("overlay").style.display = "none";
            } else if (data == "logout") {
                location.href = '/Home/LogOut/';
            }
        });
}


//function to dynamically Remarks related data 
function LoadRemarkData(Calldata) {
    var parentCallDiv = $("#RemarkList");
    parentCallDiv.text('');
    var arr = JSON.parse(Calldata)
    //if there is no data
    if (arr.length == 0) {
        var containerDiv = document.createElement('h4');
        containerDiv.className = 'text-center';
        containerDiv.style = "color:gray; margin-bottom:20px; margin-top:20px";
        containerDiv.innerHTML = 'No Remarks!'
        parentCallDiv.append(containerDiv);
    } else {
        $.each(arr, function (index, item) {
            var m = index + 1;
            var fileName = '';
            if (item.FileName == null) {
                item.FileName = "N/A";
            }

            //var more1 = $("<div class='col-md-12' style='display: inline-flex;'></div>");
            //more1.html(("<div class='col-md-1' style='font-size:13px; color:#222d32;margin-top:15px;padding-left: 5px;'>" + m + "</div>")
            //       + " " + ("<div class='col-md-2' style='font-size:13px; color:#222d32;margin-top:15px;text-align:left;padding-left:0;padding-right:0;' >" + item.TextCommunicationType + "</div>")
            // + " " + ("<div class='col-md-4' style='font-size:13px; color:#222d32;margin-top:15px;text-align:left;padding-left:0;padding-right:0;' >" + item.commtext + "</div>")
            //  + " " + ("<div class='col-md-3' style='font-size:13px; color:#222d32;margin-top:15px;text-align:left;padding-left:0;padding-right:0;' >" + item.TextLogincode + "</div>")
            //  + " " + ("<div class='col-md-2' style='font-size:13px; color:#222d32;margin-top:15px;text-align:left;padding-left:0;padding-right:0;' >" + item.FrmtCreationDate + "</div>")
            //     );
            var more1 = $("<div class='col-md-12 col-sm-12 col-xs-12' style='display: inline-flex;'></div>");
            more1.html(("<div class='col-md-1 col-sm-1 col-xs-1' style='font-size:13px; color:#222d32;margin-top:15px;'>" + m + "</div>")
              + " " + ("<div class='col-md-2 col-sm-2 col-xs-2' style='font-size:13px; color:#222d32;margin-top:15px;' >" + item.TextCommunicationType + "</div>")
             + " " + ("<div class='col-md-4 col-sm-4 col-xs-4' style='font-size:13px; color:#222d32;margin-top:15px;' >" + item.commtext + "</div>")
              + " " + ("<div class='col-md-2 col-sm-2 col-xs-2' style='font-size:13px; color:#222d32;margin-top:15px;' >" + item.TextLogincode + "</div>")
              + " " + ("<div class='col-md-3 col-sm-3 col-xs-3' style='font-size:13px; color:#222d32;margin-top:15px;' >" + item.FrmtCreationDate + "</div>")
                 );
            parentCallDiv.append(more1);
        });

    }
    return false;
}
//function to dynamically show callengaged related data 
function LoadCallEngageStatusData(Calldata) {
    var parentCallDiv = $("#CallEngageList");
    parentCallDiv.text('');
    //if there is no data
    if (Calldata.length == 0 || Calldata == "False") {
        var containerDiv = document.createElement('h4');
        containerDiv.className = 'text-center';
        containerDiv.style = "color:gray; margin-bottom:20px; margin-top:20px";
        containerDiv.innerHTML = 'No Record Found!'
        parentCallDiv.append(containerDiv);
    } else {
        var arr = JSON.parse(Calldata)
        $.each(arr, function (index, item) {
            var m = index + 1;

            //var more1 = $("<div class='col-md-12' style='display: inline-flex;'></div>");
            //more1.html(("<div class='col-md-1' style='font-size:13px; color:#222d32;margin-top:10px;padding-left: 5px;'>" + m + "</div>")
            // + " " + ("<div class='col-md-4' style='font-size:13px; color:#222d32;margin-top:10px;' >" + item.txtengageStatus + "</div>")
            // + " " + ("<div class='col-md-3' style='font-size:13px; color:#222d32;margin-top:10px;text-align:center;padding-left: 0px;'  >" + item.LoginName + " </div>")
            //  + " " + ("<div class='col-md-4' style='font-size:13px; color:#222d32;margin-top:10px;text-align:center;padding-left: 0px;'  >" + item.frmtStartime + " </div>")
            //     );

            var more1 = $("<div class='col-md-12 col-sm-12 col-xs-12' style='display: inline-flex;'></div>");
            more1.html(("<div class='col-md-1 col-sm-1 col-xs-1' style='font-size:13px; color:#222d32;margin-top:15px;padding-left: 5px;'>" + m + "</div>")
                + " " + ("<div class='col-md-3 col-sm-3 col-xs-3' style='font-size:13px; color:#222d32;margin-top:15px;text-align:center' >" + item.txtengageStatus + "</div>")
                + " " + ("<div class='col-md-4 col-sm-4 col-xs-4' style='font-size:13px; color:#222d32;margin-top:15px;text-align:center' >" + item.LoginName + "</div>")
                + " " + ("<div class='col-md-4 col-sm-4 col-xs-4' style='font-size:13px; color:#222d32;margin-top:15px;padding-right: 0px;text-align:center;padding-left: 0px;'>" + item.frmtStartime + " </div>")
                 );
            m = m + 1;
            parentCallDiv.append(more1);
        });

    }
    return false;
}

function SubmitCallEngage(ctrl) {
    var CallId = $("#newCallId").val();
    var select = $("#callEngageStatus");
    var status = $(select).children("option:selected").val();
    $('#CallEngageStatusDiv').hide();
    if (status != "0") {
        select.val(0);
        $.ajax({
            type: "POST",
            url: "/CRM/AddCallEngageStatus",
            data: { CallId: CallId, status: status },
            success: function (data) {
                if (data == "LogOut") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    GetCallEngagedData(CallId);
                }
            },
            error: function () {

            }
        });
    }
}
//function to dynamically load assignment related data 
function LoadAssignData(Calldata) {
    var parentCallDiv = $("#AssignList");
    parentCallDiv.text('');
    var arr = JSON.parse(Calldata)
    //if there is no data
    if (arr.length == 0) {
        var containerDiv = document.createElement('h4');
        containerDiv.className = 'text-center';
        containerDiv.style = "color:gray; margin-bottom:20px; margin-top:20px";
        containerDiv.innerHTML = 'No Assignment History!'
        parentCallDiv.append(containerDiv);
    } else {
        
        var m = 1;
        
        $.each(arr, function (index, item) {

            //if (item.Assignedtotext != "") {
            if (item.TextAssignedto != "") {
                //var more1 = $("<div class='col-md-12' style='display: inline-flex;'></div>");
                //more1.html(("<div class='col-md-1' style='font-size:13px; color:#222d32;margin-top:15px;padding-left: 5px;'>" + m + "</div>")
                // + " " + ("<div class='col-md-7' style='font-size:13px; color:#222d32;margin-top:15px;padding-left: 110px;' >" + item.TextAssignedto + "</div>")
                // + " " + ("<div class='col-md-4' style='font-size:13px; color:#222d32;margin-top:15px;padding-right: 0px;text-align:center;padding-left: 0px;'  >" + item.frmtStartDate + " </div>")
                //     );
                //var more1 = $("<div class='col-md-12 col-sm-12 col-xs-12' style='display: inline-flex;'></div>");
                //more1.html(("<div class='col-md-8 col-sm-8 col-xs-8' style='font-size:13px; color:#222d32;margin-top:15px;' ><label style='margin-right:5px'>"+m+ ". &nbsp; <i class='fa fa-user'></i></label>" + item.TextAssignedto + "</div>")
                // + " " + ("<div class='col-md-4 col-sm-4 col-xs-4' style='font-size:13px; color:#222d32;margin-top:15px;padding-right: 0px;text-align:center;padding-left: 0px;'><label style='margin-right:5px'><i class='fa fa-calendar-o'></i></label>" + item.frmtStartDate + " </div>")
                //     );
                //m = m + 1;
                var more1 = $("<div class='col-md-12 col-sm-12 col-xs-12' style='display: inline-flex;'></div>");
                more1.html(("<div class='col-md-1 col-sm-1 col-xs-1' style='font-size:13px; color:#222d32;margin-top:15px;padding-left: 5px;'>" + m + "</div>")
                 + " " + ("<div class='col-md-7 col-sm-7 col-xs-7' style='font-size:13px; color:#222d32;margin-top:15px;text-align:center' >" + item.TextAssignedto + "</div>")
                 + " " + ("<div class='col-md-4 col-sm-4 col-xs-4' style='font-size:13px; color:#222d32;margin-top:15px;padding-right: 0px;text-align:center;padding-left: 0px;'>" + item.frmtStartDate + " </div>")
                     );
                m = m + 1;

                parentCallDiv.append(more1);
            }
        });

    }
    return false;
}
//Function to load previous call data of a ccustomer
function loadPrevCallData(Calldata) {
    var parentCallDiv = $("#ParentCallDiv");
    parentCallDiv.text('');
    var arr = JSON.parse(Calldata)
    //if there is no data
    if (arr.length == 0) {
        var containerDiv = document.createElement('h4');
        containerDiv.className = 'text-center';
        containerDiv.style = "color:gray; margin-bottom:20px; margin-top:20px";
        containerDiv.innerHTML = 'No Call Registered'
        parentCallDiv.append(containerDiv);
    } else {
        $.each(arr, function (index, item) {
            var containerDiv = document.createElement('div');
            containerDiv.className = 'col-md-12 ';
            containerDiv.style = "padding:0px; height:auto; margin-top:20px;";
            parentCallDiv.append(containerDiv);
            //var SnoDiv = document.createElement('div');
            //SnoDiv.className = 'col-md-1 CallSno';
            //SnoDiv.style = 'width:21px; padding-left:10px; padding-right:0px; margin-right:5px; font-size:14px';

            //SnoDiv.innerHTML = index + 1 + ".";
            //containerDiv.append(SnoDiv);

            var CallIdDiv = document.createElement('div');
            CallIdDiv.className = 'col-md-8 col-sm-8 col-xs-8';
            CallIdDiv.style='padding-left:1px'
            containerDiv.append(CallIdDiv);
            var CallIdLabel = document.createElement('label')
            CallIdLabel.style = 'font-weight:600; margin-right:5px;font-size:14px ;'
            CallIdLabel.innerHTML = index + 1 + '.  CallId:';  //'IssueType:';
            CallIdDiv.append(CallIdLabel);
            var CallIdSpan = document.createElement('span');
            CallIdSpan.innerHTML = item.p_allcallsreg;
            CallIdDiv.append(CallIdSpan);

            var statusDiv = document.createElement('div');
            statusDiv.className = 'col-md-4 col-sm-4 col-xs-4 statusDiv';
            statusDiv.style = "";
            containerDiv.append(statusDiv);
            var statusspan = document.createElement('span');
            //statusDiv.className = 'col-md-2';
            statusspan.innerHTML = item.textstatus;
            if (item.textstatus.trim() == "Call Registered") {
                statusspan.className = "label label-danger"
            } else {
                statusspan.className = "label label-success"
            }

            statusDiv.append(statusspan);
            //var statusbreak = document.createElement('br');
            //containerDiv.append(statusbreak);
            var IssueTypeDiv = document.createElement('div');
            IssueTypeDiv.className = 'col-md-8 col-sm-8 col-xs-8 FirmNameDiv';
            //IssueTypeDiv.style = 'padding-left:0px';
            containerDiv.append(IssueTypeDiv);
            var IssueTypeLabel = document.createElement('label')
            IssueTypeLabel.style = 'font-weight:600; margin-right:5px;font-size:14px '
            IssueTypeLabel.innerHTML ='Issue Type:';  //'IssueType:';
            IssueTypeDiv.append(IssueTypeLabel);
            var IssueTypeSpan = document.createElement('span');

            if (item.textissuetype == '' || item.textissuetype == undefined || item.textissuetype == null) {
                IssueTypeSpan.innerHTML = 'Not Available';
            } else {
                IssueTypeSpan.innerHTML = item.textissuetype;
            }
            IssueTypeDiv.append(IssueTypeSpan);


            var CreationdateDiv = document.createElement('div');
            CreationdateDiv.className = 'col-md-4 col-sm-4 col-xs-4 CreationDate';
            CreationdateDiv.innerHTML = item.frmtRegisterDate;
            CreationdateDiv.style = "text-align:right";
            //CreationdateDiv.style = "text-align:left";
            //CreationdateDiv.style = "padding-right:0px";
            //CreationdateDiv.style = "font-size:14px";
            //CreationdateDiv.style = "top:8px";
            containerDiv.append(CreationdateDiv);

            var IssueDiv = document.createElement('div');
            IssueDiv.className = 'col-md-8 col-sm-8 col-xs-8';
            IssueDiv.style = "clear:both";
            containerDiv.append(IssueDiv);
            var IssueLabel = document.createElement('label')
            IssueLabel.style = 'font-weight:600; margin-right:5px;font-size:14px'
            IssueLabel.innerHTML = 'IssueDescription:';
            IssueDiv.append(IssueLabel);
            var IssueSpan = document.createElement('span');
            if ($.trim(item.issuedescription) == '' || item.issuedescription == undefined || item.issuedescription == null) {
                IssueSpan.innerHTML = 'Not Available';
            } else {
                IssueSpan.innerHTML = item.issuedescription;
            }
            IssueDiv.append(IssueSpan);


            var TimeTakenDiv = document.createElement('div');
            TimeTakenDiv.className = 'col-md-6 col-sm-6 col-xs-6';
            TimeTakenDiv.style = "margin-top:5px; margin-bottom:10px; padding-right:0px; padding-left:15px; ";
            containerDiv.append(TimeTakenDiv);
            var TimeTakenLabel = document.createElement('label');
            TimeTakenLabel.style = 'font-weight:600;  margin-right:5px; font-size:14px';
            TimeTakenLabel.innerHTML = 'Time Taken:';
            TimeTakenDiv.append(TimeTakenLabel);
            var TimeTakenSpan = document.createElement('span');
            var accordiondiv = document.createElement('div');

            if ($.trim(item.textstatus) == "Call Registered") {
                //TimeTakenDiv.style = "display:none";
                //accordiondiv.className = 'accordion col-md-12 CallAccordion';
                TimeTakenSpan.innerHTML = "Not Available";
                accordiondiv.className = 'accordion col-md-6 col-sm-6  col-xs-6 CallAccordion';
                TimeTakenDiv.append(TimeTakenSpan);
            }
            else {
                TimeTakenSpan.innerHTML = item.timetakentocomplete;
                accordiondiv.className = 'accordion col-md-6 col-sm-6  col-xs-6 CallAccordion';
                TimeTakenDiv.append(TimeTakenSpan);
            }

            accordiondiv.id = item.p_allcallsreg;

            accordiondiv.style = "";
            containerDiv.append(accordiondiv);
            var accordioni = document.createElement('i')
            accordioni.className = 'glyphicon glyphicon-plus';
            //accordioni.style = "left: 150px;top: 10px;";
            accordiondiv.append(accordioni);
            var paneldiv = document.createElement('div')
            paneldiv.className = 'panel col-md-12 col-sm-12 col-xs-12';
            paneldiv.style = "margin-top:40px;overflow-y:scroll";
            paneldiv.id = 'panel-' + item.p_allcallsreg;
            containerDiv.append(paneldiv);
        });
        //Code to dynamically create Call remarks accordion
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                    $(this).children('i').removeClass();
                    $(this).children('i').addClass('glyphicon glyphicon-plus');

                } else {
                    var P_allcallsreg = this.id;
                    var panelDivId = "#panel-" + P_allcallsreg;
                    var paneldiv = $(panelDivId);

                    //$(panelDivId).html('');
                    if ($(panelDivId).html().length) {
                        panel.style.maxHeight = 88 + "px";
                        $(this).children('i').removeClass();
                        $(this).children('i').addClass('glyphicon glyphicon-minus');
                    } else {
                        document.getElementById("loadspin").style.display = "block";
                        document.getElementById("overlay").style.display = "block";
                        $.post('/CustomerDetails/GetCallRemarkData', { P_allcallsreg: this.id }, function (Remarkdata) {
                            var CallRemarkdata = JSON.parse(Remarkdata)
                            if (CallRemarkdata.length == 0) {
                                var remarkContainerDiv = document.createElement('div');
                                remarkContainerDiv.className = 'col-md-12';
                                remarkContainerDiv.style = "height:20px; margin-bottom:10px";
                                paneldiv.append(remarkContainerDiv);
                                var RemarkDiv = document.createElement('div');
                                RemarkDiv.className = 'col-md-7';
                                RemarkDiv.innerHTML = 'Remarks not available';
                                remarkContainerDiv.append(RemarkDiv);
                            } else {
                                $.each(CallRemarkdata, function (index, item) {
                                    var remarkContainerDiv = $('<div class="col-md-12" style="margin-bottom:10px"></div>');
                                    paneldiv.append(remarkContainerDiv);

                                    var RemarkDiv = '<div class="col-md-12 col-sm-12 col-xs-12"><label style="margin-right:5px;margin-left:-15px;padding-top:12px;">' + (index + 1) + '. ' + '&nbsp;<i class="fa fa-comment"></i></label>';
                                    if (item.commtext == '' || item.commtext == undefined || item.commtext == null) {
                                        RemarkDiv += '<span>Not Available</span></div>';
                                    } else {
                                        RemarkDiv += '<span>' + item.commtext + '</span></div>';
                                    }
                                    remarkContainerDiv.append(RemarkDiv);

                                    var RemarkByDiv = '<div class="col-md-6 col-sm-6 col-xs-6"><label style="margin-right:5px;"><i class="fa fa-user"></i></label>';
                                    if (item.TextLogincode == "" || item.TextLogincode == undefined || item.TextLogincode == null) {
                                        RemarkByDiv += '<span>Not Available</span></div>';
                                    }
                                    else {
                                        RemarkByDiv += '<span>' + item.TextLogincode + '</span></div>';
                                    }
                                    remarkContainerDiv.append(RemarkByDiv);

                                    var RemarkCreationDiv = '<div class="col-md-6 col-sm-6 col-xs-6 RemarkCreationDiv"><label style="margin-right:5px"><i class="fa fa-calendar-o"></i></label>' + item.FrmtCreationDate + '</div>';
                                    remarkContainerDiv.append(RemarkCreationDiv);

                                    remarkContainerDiv.append('<hr class="col-md-12 col-sm-12 col-xs-12">');
                                });
                            }
                            document.getElementById("loadspin").style.display = "none";
                            document.getElementById("overlay").style.display = "none";
                        });

                        panel.style.maxHeight = 88 + "px";
                        $(panel).parent().find('i').removeClass();
                        $(panel).parent().find('i').addClass('glyphicon glyphicon-minus');
                    }
                }
            });

        }
        $("#CallsSeeMore").show();
    }
    if (Calldata.length > 3) {

        $("#ParentCallDiv").css("height", "250px");
        $("#ParentCallDiv").css("overflow-y", "scroll");
    }
    return false;
}





//Added by Aslam 


///START -> ADD REMARK FROM DASHBOARD///
//show remark entry window
function AddRemarkCtrl() {
    $('#AddRemarkDiv').show();
}

//close remark entry window
function popoverClose() {
    $('#AddRemarkDiv').hide();
    $("#AddRemarkInput").val("");
}

//Submit button on remark entry window
function SubmitCallRemark() {
    var Callid = $("#newCallId").val();;
    var remark = $("#AddRemarkInput").val();
    $("#AddRemarkDiv").hide();
    $("#AddRemarkInput").val("");
    if (remark != "") {
        $.ajax({
            type: "POST",
            url: "/CRM/AddCallRemark",
            data: { CallId: Callid, remark: remark },
            success: function (data) {
                if (data == "LogOut") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    GetRemarkData(Callid)
                }

            }
        })
        return false;
    }
}

///END -> ADD REMARK FROM DASHBOARD///


///START -> EDIT CALL DETAILS ON DASHBOARD///
//Fill dropdowns on Edit form
function FillCallEditFormDropdowns() {
    //BussinessTypes
    //$.ajax({
    //    type: "Get",
    //    url: "/CustomerDetails/GetBussinessType",
    //    success: function (data) {
    //        var select = $("#Buss");
    //        select.empty();
    //        $(select).append('<option value=0>-Select Business Types-</option');
    //        $.each(data.data, function (index, item) {
    //            $(select).append('<option value=' + item.P_Infotable + '>' + item.NameOfInfo + '</option>');
    //        });
    //        $(select).append('<option value=-1>Others</option');
    //    }
    //});

    //Dealers
    //$.ajax({
    //    type: "Get",
    //    url: "/CustomerDetails/GetActiveDealer",
    //    success: function (data) {
    //        var select = $("#p_dealers");
    //        $(select).append('<option value=0>-Select Dealer-</option');
    //        var a = 1;
    //        $.each(data.data, function (index, item) {
    //            $(select).append('<option value=' + item.P_acccode + '>' + item.AccName + '</option>');
    //        });
    //    }
    //});

    //IssueTypes
    //$.ajax({
    //    type: "Get",
    //    url: "/CustomerDetails/GetIssueType",
    //    success: function (Issuedata) {
    //        var select = $("#IssueType");
    //        select.empty();
    //        $(select).append('<option value=0>-Select Issue Types-</option');
    //        $.each(Issuedata.data, function (index, item) {
    //            $(select).append('<option value=' + item.P_Infotable + '>' + item.NameOfInfo + '</option>');
    //        });
    //    }
    //});

    ////IssueStatus
    //$.ajax({
    //    type: "Get",
    //    url: "/CustomerDetails/GetIssueStatus",
    //    success: function (data) {
    //        var select = $("#Status");
    //        select.empty();
    //        $(select).append('<option value=0>-Select Issue Status-</option');
    //        var a = 1;
    //        $.each(data.data, function (index, item) {
    //            $(select).append('<option value=' + item.P_Infotable + '>' + item.NameOfInfo + '</option>');
    //        });
    //        $(select).append('<option value=-1>Others</option');
    //    }
    //});
}

//Show call edit form
function EditCall() {
    var P_issue = $("#newCallId").val();
    //window.location.href = "/CRM/EditRegCalls?P_issue=" + P_issuesfilegst + "&CalledFrom=ManageRegCalls";
    document.getElementById("loadspin").style.display = "block";
    document.getElementById("overlay").style.display = "block";

    $.ajax({
        type: "POST",
        url: "/CustomerDetails/EditRegCallsJson",
        data: { P_issue },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                $("#CallEditForm input[name='FirmName']").val($.trim(data.Firmname));
                $("#CallEditForm input[name='ContactPerson']").val($.trim(data.Contactperson));
                $("#CallEditForm input[name='EmailId']").val($.trim(data.Emailid));
                $("#CallEditForm input[name='Mobileno']").val($.trim(data.Mobileno));
                $("#Buss").val(data.Businesstype);
                $("#CallEditForm input[name='Location']").val($.trim(data.Location));
                //$("#p_dealers").val(data.p_dealers);
                $("#IssueType").val(data.Issuetype);
                $("#CallEditForm input[name='Issuedescription']").val($.trim(data.Issuedescription));
                $("#Status").val(data.Status);
                $("#CallEditForm input[name='Creationdate']").val($.trim(data.FrmtCreationdate));
                //$("#CallEditForm input[name='PriorityOrder']").val(data.PriorityOrder);
                //$("#CallEditForm input[name='RemarkSaral']").val(data.RemarkSaral);
                $("#CallEditForm input[name='AllCallsReg_key']").val(data.AllCallsReg_key);
                $("#CallEditForm input[name='P_AllCallsReg']").val(data.P_AllCallsReg);
                $("#CallEditForm input[name='P_Customers']").val(data.P_Customers);
                //$("#CallEditForm input[name='registerdate']").val($.trim(data.FrmtRegisterdate));

                $("#CallDetails #CallDetails").hide();
                $("#CallEditFormDiv .error").text("");
                $("#CallEdit").show();
                document.getElementById("loadspin").style.display = "none";
                document.getElementById("overlay").style.display = "none";
            }

        },
        error: function () {

        }
    });
}

//Close Call Edit Form
function CloseEditForm() {
    $("#CallDetails #CallDetails").show();
    $("#CallEdit").hide();
}

//Submit call Edit Form
function SubmitCallEditForm() {
    
    var isFormValid = CallEditFormValidation();
    if (isFormValid) {

        var data = $("#CallEditForm").serialize();
        var Callid = $("#newCallId").val();
        console.log(data);
        

        $.ajax({
            type: "POST",
            url: "/CustomerDetails/SubmitEditRegCalls",
            data: data,
            success: function (data) {
                if (data == "logout") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                else if (data == "customerError") {
                    $("#errorCustomer").text("Call Is Not linked To customer, please link customer , then close the call.");
                }
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    GetCallData(Callid);
                    $("#CallEditFormDiv .error").text("");
                    CloseEditForm();
                }
              
            }
        });
    }
}

function CallEditFormValidation() {
    var isFormValid = true;
    var firmName = $("#CallEditForm input[name='FirmName']").val().trim();
    if (firmName == "") {
        isFormValid = false;
        $("#CallEditForm #errorFirmName").text("FirmName is Required");
    }
    var mobile = $("#CallEditForm input[name='Mobileno']").val().trim();
    if (mobile == "") {
        isFormValid = false;
        $("#CallEditForm #errorMobile").text("Mobile Number is Required");
    }

    return isFormValid;
}
///END -> EDIT CALL DETAILS ON DASHBOARD///


//Show window for call assign , here we fill employee dropdown 
function CallAssignCtrl() {

    //if ($("#UserId").val() == 8357 || $("#UserId").val() == 8374 || $("#UserId").val() == 7) {
    if ($("#UserId").val()!==0){
        $('#CallAssignDiv').show();
        //$("#CallAssignToInput").empty();

        //$.ajax({
        //    type: "POST",
        //    url: "/CRM/GetActiveEmployeeofCS",
        //    data: {},
        //    success: function (data) {
        //        if (data == "") {
        //            window.location.href = "/Home/LogOut";
        //            return true;
        //        }
        //        var select = $("#CallAssignToInput");
        //        $(select).append('<option value=0>Select Employee</option');
        //        var a = 1;
        //        $.each(data.data, function (index, item) {
        //            $(select).append('<option value=' + item.P_acccode + '>' + item.AccName + '</option>');
        //        });
        //    },
        //});
    }
    else {
        var options = { "backdrop": "static", keyboard: true };
        $('#AssignedtoModal').modal(options);
        var Mtitle = "You are not authorized to perform this action!"
        $('#AssignedtoModal .modal-title').text(Mtitle);
        $('#AssignedtoModal').modal("show");


    }


}

//close call assign window
function CallAssignPopoverClose() {
    $('#CallAssignDiv').hide();
}

//Submit button on call assign window
function SubmitCallAssignTo(ctrl) {
    var Callid = $("#newCallId").val();
    var select = $("#CallAssignToInput");
    var empId = $(select).children("option:selected").val();
    $('#CallAssignDiv').hide();
    if (empId != "0") {
        select.val(0);
        $.ajax({
            type: "POST",
            url: "/CRM/CallAssignedTo",
            data: { Callid: Callid, empId: empId },
            success: function (data) {
                if (data == "LogOut") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    GetAssignData(Callid);
                    GetCallData(Callid);
                }
            },
            error: function () {

            }
        });
    }


}


//close call engage status window
function CallEngageStatusPopoverClose() {
    $('#CallEngageStatusDiv').hide();
}


//Show window for call engage status
function CallEngageStatusCtrl() {
    $('#CallEngageStatusDiv').show();
}

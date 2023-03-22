  $(document).ready(function () {
        $(".NoRecord").hide();

        //Click of search button
        $(".btn-Submit").click(function () {
            $("#CallDetails").hide();
            document.getElementById("loadspin").style.display = "block";
            document.getElementById("overlay").style.display = "block";

            var Pcrmlead = $("#CallId").val();
          
            GetLeadCallData(Pcrmlead)
            GetRemarkData(Pcrmlead)
            GetAssignData(Pcrmlead);
            GetPrevCallData(Pcrmlead)
           
        });


  });
//Get latest call details from server
    function GetLeadCallData(value) {
        var data;
        data = { CallId: value }
        $.post('/CustomerDetails/SearchLeadCallDetails',
            data = data,
            success = function (data) {
                if (data != "Error" && data != "logout") {
                    //loadCallData(data);
                    $(".NoRecord").hide();
                    var obj1, obj2, obj3 = "";
                    var data1 = data.split("|");
                    if (data1[0] != ""&& data1[0] != "[]") {
                        obj1 = JSON.parse(data1[0]);
                        $("#topic").text(obj1[0].Topic);
                        $("#Assignedto").text(obj1[0].Assignedtotext);
                        $("#AccountCode").text(obj1[0].AccountName)
                        $("#contactperson").text(obj1[0].Contactperson)
                        $("#MobNo").text(obj1[0].Mobileno);
                    } else {
                        $("#topic").text("N/A");
                        $("#Assignedto").text("N/A");
                        $("#AccountCode").text("N/A")
                        $("#contactperson").text("N/A")
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
                    if (data1[2] != "" && data1[2]!="[]") {
                        obj3 = JSON.parse(data1[2]);
                        $("#Collab").text(obj3[0].TxtCollaborator)
                    } else {
                        $("#Collab").text("N/A")
                    }
                    
                    
                   // $("#P_issuesfilegst").val(value);
                  
                   
                               
                    
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
        data = { CallId: value, calltype: "L" }
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
        data = { CallId: value,calltype:"L" }
        $.post('/CustomerDetails/GetAssignedHistoryOfCall',
            data = data,
            success = function (data) {
                console.log(data)
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
  
//function to get the Previous call data of same customer
    function GetPrevCallData(value) {
        var data;
        data = { CallId: value }
        $.post('/CustomerDetails/GetPreviousLeadCallDetails',
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
    //if there is no data
    if (Calldata.length == 0) {
        var containerDiv = document.createElement('h4');
        containerDiv.className = 'text-center';
        containerDiv.style = "color:gray; margin-bottom:20px; margin-top:20px";
        containerDiv.innerHTML = 'No Remarks!'
        parentCallDiv.append(containerDiv);
    } else {
        var arr = JSON.parse(Calldata)
        $.each(arr, function (index, item) {
            var m = index + 1;
            var fileName='';
            if (item.FileName == null ) {
                item.FileName="N/A";
            }

            var more1 = $("<div class='col-md-12' style='display: inline-flex;'></div>");
            more1.html(("<div class='col-md-1' style='font-size:13px; color:#222d32;margin-top:15px;padding-left: 5px;'>" + m + "</div>")
                   + " " + ("<div class='col-md-2' style='font-size:13px; color:#222d32;margin-top:15px;text-align:left;padding-left:0;padding-right:0;' >" + item.TextCommunicationType + "</div>")
             + " " + ("<div class='col-md-4' style='font-size:13px; color:#222d32;margin-top:15px;text-align:left;padding-left:0;padding-right:0;' >" + item.Commtext + "</div>")
              + " " + ("<div class='col-md-3' style='font-size:13px; color:#222d32;margin-top:15px;text-align:left;padding-left:0;padding-right:0;' >" + item.TextLogincode + "</div>")
              + " " + ("<div class='col-md-2' style='font-size:13px; color:#222d32;margin-top:15px;text-align:left;padding-left:0;padding-right:0;' >" + item.FrmtCreationDate + "</div>")
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
    if (Calldata.length == 0 || Calldata=="False") {
        var containerDiv = document.createElement('h4');
        containerDiv.className = 'text-center';
        containerDiv.style = "color:gray; margin-bottom:20px; margin-top:20px";
        containerDiv.innerHTML = 'No Record Found!'
        parentCallDiv.append(containerDiv);
    } else {
        var arr = JSON.parse(Calldata)
        $.each(arr, function (index, item) {
            var m = index + 1;
           
            var more1 = $("<div class='col-md-12' style='display: inline-flex;'></div>");
            more1.html(("<div class='col-md-1' style='font-size:13px; color:#222d32;margin-top:10px;padding-left: 5px;'>" + m + "</div>")
             + " " + ("<div class='col-md-4' style='font-size:13px; color:#222d32;margin-top:10px;' >" + item.txtengageStatus + "</div>")
             + " " + ("<div class='col-md-3' style='font-size:13px; color:#222d32;margin-top:10px;text-align:center;padding-left: 0px;'  >" + item.LoginName + " </div>")
              + " " + ("<div class='col-md-4' style='font-size:13px; color:#222d32;margin-top:10px;text-align:center;padding-left: 0px;'  >" + item.frmtStartime + " </div>")
                 );
            parentCallDiv.append(more1);
        });

    }
    return false;
}

function SubmitCallEngage(ctrl) {
    var status = ""
    if (ctrl.id == "popup") {
        status = $("#callEngageStatus :selected").val();
        $("#callEngageStatus").val("")
        $('#EngageStatus').modal("hide");
    } else {
        var id = $(ctrl).parent().parent().parent().parent().parent()[0].id;
        var Rowid = "#tr-" + id;
        var select = $(Rowid).find(".callstatusInput");
        status = $(select[0]).children("option:selected").val();
    }

    var CallId = $("#callId").val();
    $(ctrl).addClass("disabledbutton");
    //var status = $("#callstatusInput").val();
    if (status != "0") {

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
                    var id = "#eng-" + CallId;
                    $(id).html(data);
                    debugger;

                    var Mtitle = "Status added successfully.";
                    $('#CallClosedContent').html('');
                    $('#CallClosed').modal(options);
                    $('#CallClosed .modal-title').text(Mtitle);
                    $('#CallClosed').modal("show");
                    $("#callId").val("");
                    $("#CallEngageStatus").val("");
                    setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
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
    //if there is no data
    if (Calldata.length == 0) {
        var containerDiv = document.createElement('h4');
        containerDiv.className = 'text-center';
        containerDiv.style = "color:gray; margin-bottom:20px; margin-top:20px";
        containerDiv.innerHTML = 'No Assignment History!'
        parentCallDiv.append(containerDiv);
    } else {
        var arr = JSON.parse(Calldata)
        var m = 1;
        $.each(arr, function (index, item) {
         
            if (item.TextAssignedto != "") {
                var more1 = $("<div class='col-md-12' style='display: inline-flex;'></div>");
                more1.html(("<div class='col-md-1' style='font-size:13px; color:#222d32;margin-top:15px;padding-left: 5px;'>" + m + "</div>")
                 + " " + ("<div class='col-md-7' style='font-size:13px; color:#222d32;margin-top:15px;padding-left: 110px;' >" + item.TextAssignedto + "</div>")
                 + " " + ("<div class='col-md-4' style='font-size:13px; color:#222d32;margin-top:15px;padding-right: 0px;text-align:center;padding-left: 0px;'  >" + item.frmtStartDate + " </div>")
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
    //if there is no data
    if (Calldata.length == 0) {
        var containerDiv = document.createElement('h4');
        containerDiv.className = 'text-center';
        containerDiv.style = "color:gray; margin-bottom:20px; margin-top:20px";
        containerDiv.innerHTML = 'No Call Registered'
        parentCallDiv.append(containerDiv);    
    } else {
        var arr = JSON.parse(Calldata)
        $.each(arr, function (index, item) {
            var containerDiv = document.createElement('div');
            containerDiv.className = 'col-md-12 ';
            containerDiv.style = "padding:0px; height:auto; margin-top:20px;";
            parentCallDiv.append(containerDiv);
            var SnoDiv = document.createElement('div');
            SnoDiv.className = 'col-md-1 CallSno';
            SnoDiv.style = 'width:21px; padding-left:10px; padding-right:0px; margin-right:5px; font-size:14px';

            SnoDiv.innerHTML = index + 1 + ".";
            containerDiv.append(SnoDiv);
            var IssueTypeDiv = document.createElement('div');
            IssueTypeDiv.className = 'col-md-8 FirmNameDiv';
            IssueTypeDiv.style = 'padding-left:0px';
            containerDiv.append(IssueTypeDiv);
            var IssueTypeLabel = document.createElement('label')
            IssueTypeLabel.style = 'font-weight:600; margin-right:5px;font-size:14px '
            IssueTypeLabel.innerHTML = 'Topic:';
            IssueTypeDiv.append(IssueTypeLabel);
            var IssueTypeSpan = document.createElement('span');

            if (item.Topic == '' || item.Topic == undefined || item.Topic == null) {
                IssueTypeSpan.innerHTML = 'Not Available';
            } else {
                IssueTypeSpan.innerHTML = item.Topic;
            }
            IssueTypeDiv.append(IssueTypeSpan);

            var statusDiv = document.createElement('div');
            statusDiv.className = 'col-md-3 statusDiv';
            statusDiv.style = "";
            containerDiv.append(statusDiv);
            var statusspan = document.createElement('span');
            //statusDiv.className = 'col-md-2';
            statusspan.innerHTML = item.TextStatus;
            if (item.TextStatus.trim() == "Call Registered") {
                statusspan.className = "label label-danger"
            } else {
                statusspan.className = "label label-success"
            }

            statusDiv.append(statusspan);
            var statusbreak = document.createElement('br');
            containerDiv.append(statusbreak);
            var IssueDiv = document.createElement('div');
            IssueDiv.className = 'col-md-7';
            IssueDiv.style = "margin-top:5px; clear:both";
            containerDiv.append(IssueDiv);
            var IssueLabel = document.createElement('label')
            IssueLabel.style = 'font-weight:600; margin-right:5px;font-size:14px'
            IssueLabel.innerHTML = 'AccountName:';
            IssueDiv.append(IssueLabel);
            var IssueSpan = document.createElement('span');
            if (item.AccountName == '' || item.AccountName == undefined || item.AccountName == null) {
                IssueSpan.innerHTML = 'Not Available';
            } else {
                IssueSpan.innerHTML = item.AccountName;
            }
            IssueDiv.append(IssueSpan);


            var CreationdateDiv = document.createElement('div');
            CreationdateDiv.className = 'col-md-5 CreationDate';
            CreationdateDiv.innerHTML = item.frmtRegisterDate;
            CreationdateDiv.style = "text-align:left";
            CreationdateDiv.style = "padding-right:0px";
            CreationdateDiv.style = "font-size:14px";
            CreationdateDiv.style = "top:8px";
            containerDiv.append(CreationdateDiv);

            var TimeTakenDiv = document.createElement('div');
            TimeTakenDiv.className = 'col-md-6';
            TimeTakenDiv.style = "margin-top:5px; margin-bottom:10px; padding-right:0px; padding-left:15px; ";
            containerDiv.append(TimeTakenDiv);
            var TimeTakenLabel = document.createElement('label');
            TimeTakenLabel.style = 'font-weight:600;  margin-right:5px; font-size:14px';
            TimeTakenLabel.innerHTML = 'Time Taken:';
            TimeTakenDiv.append(TimeTakenLabel);
            var TimeTakenSpan = document.createElement('span');
            var accordiondiv = document.createElement('div');

            if (item.TextStatus == "Call Registered") {
                TimeTakenDiv.style = "display:none";
                accordiondiv.className = 'accordion col-md-12 CallAccordion';
            }
            else {
                TimeTakenSpan.innerHTML = item.timeTakentoComplete;
                accordiondiv.className = 'accordion col-md-6 CallAccordion';
                TimeTakenDiv.append(TimeTakenSpan);
            }

            accordiondiv.id = item.P_issuesfilegst;

            accordiondiv.style = "";
            containerDiv.append(accordiondiv);
            var accordioni = document.createElement('i')
            accordioni.className = 'glyphicon glyphicon-plus';
            accordioni.style = "left: 150px;top: 10px;";
            accordiondiv.append(accordioni);
            var paneldiv = document.createElement('div')
            paneldiv.className = 'panel col-md-12';
            paneldiv.style = "margin-top:40px;overflow-y:scroll";
            paneldiv.id = 'panel-' + item.P_issuesfilegst;
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
                    var P_issuesfilegst = this.id;
                    var panelDivId = "#panel-" + P_issuesfilegst;
                    var paneldiv = $(panelDivId);

                    //$(panelDivId).html('');
                    if ($(panelDivId).html().length) {
                        panel.style.maxHeight = 88 + "px";
                        $(this).children('i').removeClass();
                        $(this).children('i').addClass('glyphicon glyphicon-minus');
                    } else {
                        $.post('/CustomerDetails/GetCallRemarkData', { P_issuesfilegst: this.id,calltype:'L' }, function (CallRemarkdata) {
                            console.log(CallRemarkdata.data.length);
                            if (CallRemarkdata.data.length == 0) {
                                var remarkContainerDiv = document.createElement('div');
                                remarkContainerDiv.className = 'col-md-12';
                                remarkContainerDiv.style = "height:20px; margin-bottom:10px";
                                paneldiv.append(remarkContainerDiv);
                                var RemarkDiv = document.createElement('div');
                                RemarkDiv.className = 'col-md-7';
                                RemarkDiv.innerHTML = 'Remarks not available';
                                remarkContainerDiv.append(RemarkDiv);
                            } else {
                                $.each(CallRemarkdata.data, function (index, item) {
                                    var remarkContainerDiv = document.createElement('div');
                                    remarkContainerDiv.className = 'col-md-12';
                                    remarkContainerDiv.style = "margin-bottom:10px";
                                    paneldiv.append(remarkContainerDiv);
                                    var RemarkSnoDiv = document.createElement('div');
                                    RemarkSnoDiv.className = 'col-md-1 RemarkSnoDiv';
                                    RemarkSnoDiv.innerHTML = (index + 1) + '.';
                                    remarkContainerDiv.append(RemarkSnoDiv);
                                    var RemarkDiv = document.createElement('div');
                                    RemarkDiv.className = 'col-md-11';
                                    RemarkDiv.style = 'font-weight:bold; margin-bottom:3px';
                                    RemarkDiv.innerHTML = item.Commtext;
                                    remarkContainerDiv.append(RemarkDiv);
                                    //var RemarkByDiv = document.createElement('div');
                                    //RemarkByDiv.className = 'col-md-4';
                                    //RemarkByDiv.innerHTML = item.FrmtCreationDate;
                                    //remarkContainerDiv.append(RemarkByDiv);
                                    var RemarkByDiv = document.createElement('div');
                                    RemarkByDiv.className = 'col-md-6';
                                    RemarkByDiv.style = 'padding-left:50px; margin-bottom:10px';
                                    RemarkByDiv.innerHTML = item.TextLogincode;
                                    remarkContainerDiv.append(RemarkByDiv);
                                    var RemarkCreationDiv = document.createElement('div');
                                    RemarkCreationDiv.className = 'col-md-6 RemarkCreationDiv';
                                    RemarkCreationDiv.style = '';
                                    RemarkCreationDiv.innerHTML = item.FrmtCreationDate;
                                    remarkContainerDiv.append(RemarkCreationDiv);
                                    var hr = document.createElement('hr');
                                    hr.className = 'col-md-12';
                                    remarkContainerDiv.append(hr);
                                });
                                panel.style.maxHeight = 88 + "px";
                                $(panel).parent().find('i').removeClass();
                                $(panel).parent().find('i').addClass('glyphicon glyphicon-minus');
                            }
                        });

                    }
                }
            });

        }
        $("#CallsSeeMore").show();
    }
    if (Calldata.length > 3) {

        $("#ParentCallDiv").css("height", "300px");
        $("#ParentCallDiv").css("overflow-y", "scroll");
    }
    return false;
}

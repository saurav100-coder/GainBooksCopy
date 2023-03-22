//function to dynamically create Call related data

//function PlayFile(id) {
//    $("#AUDIO").remove();
//    var Filename = $("#file-" + id).val();
//    var path = '/CRM/PlayAudio?Filename=' + Filename;
//    gfg = document.createElement("AUDIO");
//    gfg.setAttribute("src", path);
//    gfg.setAttribute("controls", "controls");
//    gfg.crossOrigin = 'anonymous';
//    gfg.id = 'AUDIO'
//    gfg.style = "width:100%;height:25px;margin-left:15px;";
//    gfg.play();
//    $("#recording-" + id).append(gfg);

//}

function PlayFile(id) {
    $("#AUDIO").remove();
    var Filename = $("#file-" + id).val();
    var LinkUrl = $("#link-" + id).val();
    //var path = '/CRM/PlayAudio?Filename=' + Filename;
    var path = '/CRM/PlayAudio?Filename=' + Filename + "&LinkUrl=" + LinkUrl;
    gfg = document.createElement("AUDIO");
    gfg.setAttribute("src", path);
    gfg.setAttribute("controls", "controls");
    gfg.crossOrigin = 'anonymous';
    gfg.id = 'AUDIO'
    gfg.style = "width:100%;height:25px";
    gfg.play();
    $("#recording-" + id).append(gfg);
    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.style = "font-size: 25px;";
    span.appendChild(txt);
    $("#recording-" + id).append(span);
    span.addEventListener('click', () => {
        $("#AUDIO").remove();
        $(".close").remove();
    });
}

function loadRemarksAndCallLogs() {

    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        $(this).children('i').removeClass();
        $(this).children('i').addClass('glyphicon glyphicon-plus');
    }
    else {
        var P_AllCallsReg = this.id;
        var panelDivId = "#panel-" + P_AllCallsReg;
        var paneldiv = $(panelDivId);

        if ($(panelDivId).html().length) {
            panel.style.maxHeight = 450 + "px";
            $(this).children('i').removeClass();
            $(this).children('i').addClass('glyphicon glyphicon-minus');
        }
        else {
            
            document.getElementById("loadspin").style.display = "block";
            document.getElementById("overlay").style.display = "block";

            var ulTag = $('<ul class="nav nav-tabs">'
                            + '<li class="active" style="width:50%"><a data-toggle="tab" href="#remarksTab-' + P_AllCallsReg + '" style="text-align:center;background:#cee1eb;">Remarks</a></li>'
                            + '<li style="width:50%"><a data-toggle="tab" href="#callTab-' + P_AllCallsReg + '" style="text-align:center;background:#d5e5cf;">Call Logs</a></li></ul>');

            paneldiv.append(ulTag);

            var tabContentDiv = $('<div class="tab-content" style="margin-top:5px;"></div>');
            var remarksTabdiv = $('<div class="tab-pane fade in active" id="remarksTab-' + P_AllCallsReg + '" style="background:#cee1eb;"></div>'); //d9edf7
            var callTabdiv = $('<div class="tab-pane fade" id="callTab-' + P_AllCallsReg + '" style="background:#d5e5cf;"></div>');   //dff0d8
            tabContentDiv.append(remarksTabdiv);
            tabContentDiv.append(callTabdiv);
            paneldiv.append(tabContentDiv);

            $.post('/CustomerDetails/GetCallRemarkData', { P_allcallsreg: this.id }, function (Remarkdata) {
                var CallRemarkdata = JSON.parse(Remarkdata)
                if (CallRemarkdata.length == 0) {
                    var remarkContainerDiv = $('<div class="col-md-12" style="height:40px;"><div class="col-md-7" style="padding-top:12px;">Remarks Not available</div></div>');
                    remarksTabdiv.append(remarkContainerDiv);
                }
                else {
                    $.each(CallRemarkdata, function (index, item) {
                        var remarkContainerDiv = $('<div class="col-md-12" style="margin-bottom:10px"></div>');
                        remarksTabdiv.append(remarkContainerDiv);
                        
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

            $.post('/CustomerDetails/GetCallRecordingData', { P_allcallsreg: this.id }, function (Recordingdata) {
                document.getElementById("loadspin").style.display = "block";
                document.getElementById("overlay").style.display = "block";

                var CallRecordingdata = JSON.parse(Recordingdata)
                if (CallRecordingdata.length == 0) {
                    var CallRecordingContainerDiv = $('<div class="col-md-12" style="height:40px;"><div class="col-md-7" style="padding-top:12px;">Call Logs Not Available</div></div>');
                    callTabdiv.append(CallRecordingContainerDiv);
                }
                else {
                    $.each(CallRecordingdata, function (index, item) {
                        var CallRecordingContainerDiv = $('<div class="col-md-12" style="margin-bottom:10px;padding-top:12px;"></div>');
                        callTabdiv.append(CallRecordingContainerDiv);

                        var MobileDiv = '<div class="col-md-3 col-sm-6 col-xs-6"><label style="margin-right:5px;margin-left:-15px;">' + (index + 1) + '. ' + '&nbsp;<i class="fa fa-phone"></i>  </label><span>' + item.mobileno + '</span></div>';
                        CallRecordingContainerDiv.append(MobileDiv);

                        /*var CallType = '<div class="col-md-3 col-sm-6 col-xs-6"><label style="margin-right:5px"><i class="fa fa-tag"></i></label><span>' + item.calltype + '</span></div>';*/
                        var CallType = '<div class="col-md-3 col-sm-6 col-xs-6"><label style="margin-right:5px"><i class="fa fa-tag"></i></label><span>' + item.Textcalltype + '</span></div>';
                        CallRecordingContainerDiv.append(CallType);

                        var CallDuration = '<div class="col-md-2 col-sm-6 col-xs-6 "><label style="margin-right:5px"><i class="fa fa-clock-o"></i></label><span>' + item.TextCallDuration + '</span></div>';
                        CallRecordingContainerDiv.append(CallDuration);

                        var CallTimeDiv = '<div class="col-md-4 col-sm-6 col-xs-6"><label style="margin-right:5px"><i class="fa fa-calendar-o"></i></label>' + item.Textcalltime + '</div>';
                        CallRecordingContainerDiv.append(CallTimeDiv);

                        var CallByDiv = '<div class="col-md-3 col-sm-6 col-xs-6"><label style="margin-right:5px;"><i class="fa fa-user"></i></label>';
                        if (item.TextLogincode == "" || item.TextLogincode == undefined || item.TextLogincode == null) {
                            CallByDiv += '<span>Not Available</span></div>';
                        }
                        else {
                            CallByDiv += '<span>' + item.TextLogincode + '</span></div>';
                        }
                        CallRecordingContainerDiv.append(CallByDiv);

                        var empMobileDiv = '<div class="col-md-3 col-sm-6 col-xs-6"><i class="fa fa-phone"></i>  </label><span>' + item.empMobile + '</span></div>';
                        CallRecordingContainerDiv.append(empMobileDiv);


                        //var CallRecordingPlayDiv = '<div class="col-md-4 col-sm-6 col-xs-6" id="recording-'+ item.p_callfreq + '">';
                        var CallRecordingPlayDiv = '<div class="col-md-6 col-sm-6 col-xs-6">';
                        if (item.callduration > 0 && item.filename !== "" && item.filename !== null) {  
                            CallRecordingPlayDiv += '<i class="fa fa-play-circle" style="cursor:pointer;" onclick="PlayFile(' + item.p_callfreq + ');">&nbsp;<span>' + item.filename + '</span></i><input type="hidden" id="file-' + item.p_callfreq + '" value="' + $.trim(item.filename) + '"/><input type="hidden" id="link-' + item.p_callfreq + '" value="' + item.linkurl + '"/><div style="display: flex;"  id="recording-' + item.p_callfreq + '" ></div></div>';
                        }
                        else {
                            CallRecordingPlayDiv += '</div>';
                        }
                        CallRecordingContainerDiv.append(CallRecordingPlayDiv);

                        CallRecordingContainerDiv.append('<hr class="col-md-12 col-sm-12 col-xs-12">');
                    });
                }
                document.getElementById("loadspin").style.display = "none";
                document.getElementById("overlay").style.display = "none";
            });

            panel.style.maxHeight = 450 + "px";
            $(panel).parent().find('i').removeClass();
            $(panel).parent().find('i').addClass('glyphicon glyphicon-minus');
           
        }
    }
}

function loadCallData(Calldata) {
    var parentCallDiv = $("#ParentCallDiv");
    $("#ParentCallDiv").css("height", "auto");
    $("#ParentCallDiv").css("overflow-y", "auto");
    parentCallDiv.text('');
    //if there is no data
    if (Calldata.data.length == 0) {
        var containerDiv = document.createElement('h4');
        containerDiv.className = 'text-center';
        containerDiv.style = "color:gray; margin-bottom:20px; margin-top:20px";
        containerDiv.innerHTML = 'No Call Registered'
        parentCallDiv.append(containerDiv);
        $("#CallsSeeMore").hide();
    } else {
        $.each(Calldata.data, function (index, item) {
            var containerDiv = document.createElement('div');
            containerDiv.className = 'col-md-12';
            containerDiv.style = "padding:0px; height:auto; margin-top:20px;border-bottom: 2px solid #eeeeee;";
            parentCallDiv.append(containerDiv);

            var CallIdDiv = document.createElement('div');
            CallIdDiv.className = 'col-md-8 col-sm-8 col-xs-8';
            CallIdDiv.style = 'padding-left:1px'
            containerDiv.append(CallIdDiv);
            var CallIdLabel = document.createElement('label')
            CallIdLabel.style = 'font-weight:600; margin-right:5px;font-size:14px ;'
            CallIdLabel.innerHTML = index + 1 + '.  CallId:';  //'IssueType:';
            CallIdDiv.append(CallIdLabel);
            var CallIdSpan = document.createElement('span');
            CallIdSpan.innerHTML = item.P_AllCallsReg;
            CallIdDiv.append(CallIdSpan);

            var statusDiv = document.createElement('div');
            statusDiv.className = 'col-md-4 col-sm-4 col-xs-4 statusDiv';
            statusDiv.style = "";
            containerDiv.append(statusDiv);
            var statusspan = document.createElement('span');
            statusspan.innerHTML = item.TextStatus;
            if (item.TextStatus == "Call Registered") {
                statusspan.className = "label label-danger"
            } else {
                statusspan.className = "label label-success"
            }

            statusDiv.append(statusspan);

            var IssueTypeDiv = document.createElement('div');
            IssueTypeDiv.className = 'col-md-8 col-sm-8 col-xs-8 IssueType';
            containerDiv.append(IssueTypeDiv);
            var IssueTypeLabel = document.createElement('label')
            IssueTypeLabel.style = 'font-weight:800; margin-right:5px;'
            IssueTypeLabel.innerHTML = 'Issue Type:';
            IssueTypeDiv.append(IssueTypeLabel);
            var IssueTypeSpan = document.createElement('span');

            if (item.TextIssuetype == '' || item.TextIssuetype == undefined || item.TextIssuetype == null) {
                IssueTypeSpan.innerHTML = 'Not Available';
            } else {
                IssueTypeSpan.innerHTML = item.TextIssuetype;
            }
            IssueTypeDiv.append(IssueTypeSpan);

            var CreationdateDiv = document.createElement('div');
            CreationdateDiv.className = 'col-md-4 col-sm-4 col-xs-4 CreationDate';
            //CreationdateDiv.innerHTML = item.FrmtCreationDate;
            CreationdateDiv.innerHTML = item.TxtRegisterDate;
            CreationdateDiv.style = "text-align:right";
            containerDiv.append(CreationdateDiv);


            var IssueDiv = document.createElement('div');
            IssueDiv.className = 'col-md-8 col-sm-8 col-xs-8';
            IssueDiv.style = " clear:both";
            containerDiv.append(IssueDiv);
            var IssueLabel = document.createElement('label')
            IssueLabel.style = 'font-weight:800; margin-right:5px'
            IssueLabel.innerHTML = 'IssueDescription:';
            IssueDiv.append(IssueLabel);
            var IssueSpan = document.createElement('span');
            if (item.Issuedescription == '' || item.Issuedescription == undefined || item.Issuedescription == null) {
                IssueSpan.innerHTML = 'Not Available';
            } else {
                IssueSpan.innerHTML = item.Issuedescription;
            }
            IssueDiv.append(IssueSpan);

            var TimeTakenDiv = document.createElement('div');
            TimeTakenDiv.className = 'col-md-6 col-sm-6 col-xs-6';
            TimeTakenDiv.style = "margin-top:5px; margin-bottom:10px; padding-right:0px; padding-left:15px; ";
            containerDiv.append(TimeTakenDiv);
            var TimeTakenLabel = document.createElement('label');
            TimeTakenLabel.style = 'font-weight:800;  margin-right:5px';
            TimeTakenLabel.innerHTML = 'Time Taken:';
            TimeTakenDiv.append(TimeTakenLabel);
            var TimeTakenSpan = document.createElement('span');
            var accordiondiv = document.createElement('div');

            if (item.TextStatus == "Call Registered") {
                //TimeTakenDiv.style = "display:none";
                //accordiondiv.className = 'accordion col-md-12 CallAccordion';
                TimeTakenSpan.innerHTML = "Not Available";
                accordiondiv.className = 'accordion col-md-6 col-sm-6  col-xs-6 CallAccordion';
                TimeTakenDiv.append(TimeTakenSpan);
            }
            else {
                TimeTakenSpan.innerHTML = item.timeTakentoComplete;
                accordiondiv.className = 'accordion col-md-6  col-sm-6 col-xs-6 CallAccordion';
                TimeTakenDiv.append(TimeTakenSpan);
            }
            accordiondiv.id = item.P_AllCallsReg;
            accordiondiv.style = "";
            accordiondiv.addEventListener("click",loadRemarksAndCallLogs,false)

            containerDiv.append(accordiondiv);
            var accordioni = document.createElement('i')
            accordioni.className = 'glyphicon glyphicon-plus';
            accordiondiv.append(accordioni);
            var paneldiv = document.createElement('div')
            paneldiv.className = 'panel col-md-12 col-sm-12 col-xs-12';
            paneldiv.style = "margin-top:40px;overflow-y:scroll;background:transparent;";
            paneldiv.id = 'panel-' + item.P_AllCallsReg;
            containerDiv.append(paneldiv);  
        });

        $("#CallsSeeMore").show();
    }
    if (Calldata.data.length > 3) {
        $("#ParentCallDiv").css("height", "500px");
        $("#ParentCallDiv").css("overflow-y", "scroll");
    }
    return false;
}


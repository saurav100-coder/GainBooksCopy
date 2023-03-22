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
                        var CallRecordingPlayDiv = '<div class="col-md-6 col-sm-12 col-xs-12">';
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


//function to dynamically create Registration related data 
function loadRegistrationData(RegistrationData) {
    var parentRegistrationDiv = $("#ParentRegDiv");
    parentRegistrationDiv.text('');
    //if there is no data
    if (RegistrationData.data.length == 0) {
        var containerDiv = document.createElement('h4');
        containerDiv.className = 'text-center';
        containerDiv.style = "color:gray; margin-bottom:20px; margin-top:20px";
        containerDiv.innerHTML = 'No Registration Record.'
        parentRegistrationDiv.append(containerDiv);
        $("#RegistrationSeeMore").hide();
    } else {
        $.each(RegistrationData.data, function (index, item) {
            var containerDiv = document.createElement('div');
            containerDiv.className = 'col-md-12 RegistrationDiv';
            containerDiv.style = "padding:0px; height:auto; overflow:auto; margin-top:20px;border-bottom: 2px solid #eeeeee;";
            parentRegistrationDiv.append(containerDiv);
            //var SnoDiv = document.createElement('div');
            //SnoDiv.className = 'col-md-1 RegSno';
            //SnoDiv.style = 'width:21px; padding-left:10px; padding-right:0px; margin-right:5px';
            //SnoDiv.innerHTML = index + 1 + ".";
            //containerDiv.append(SnoDiv);
            var RegsendDateDiv = document.createElement('div');
            /*RegsendDateDiv.className = 'col-md-8 RegsendDateDiv';*/
            RegsendDateDiv.className = 'col-md-8 col-sm-8 col-xs-8 ';
            /*RegsendDateDiv.style = 'padding-left:0px';*/
            RegsendDateDiv.style = 'padding-left:1px';
            /*// RegsendDateDiv.innerHTML = '<b>'+ item.TextBenAccount +'</b>';*/               
            containerDiv.append(RegsendDateDiv);
            var RegsendLabel = document.createElement('label');
            /*RegsendLabel.style = 'font-weight:800;  margin-right:5px';*/
            RegsendLabel.style = 'font-weight:600; margin-right:5px;font-size:14px;';
            RegsendLabel.innerHTML = index + 1 + '.  Reg Send Date: ';
            RegsendDateDiv.append(RegsendLabel);
            var Regsendspan = document.createElement('span');
            Regsendspan.style = '';
            Regsendspan.innerHTML = item.textRegsendDate;
            RegsendDateDiv.append(Regsendspan);

            var regtypeDiv = document.createElement('div');
            /*regtypeDiv.className = 'col-md-3 regtypeDiv';*/
            regtypeDiv.className = 'col-md-4 col-sm-4 col-xs-4 ';
            /*regtypeDiv.style = "text-align:right; padding-right:5px"*/;
            /*//regtypeDiv.innerHTML = item.Regtype;*/
            containerDiv.append(regtypeDiv);
            var regtypeLabel = document.createElement('label');
            /*regtypeLabel.style = 'font-weight:800;   margin-right:5px';*/
            regtypeLabel.style = 'font-weight:600;   margin-right:5px';
            regtypeLabel.innerHTML = 'Reg type:';
            regtypeDiv.append(regtypeLabel);
            var regtypespan = document.createElement('span');
            regtypespan.style = '';
            regtypespan.innerHTML = item.Regtype;
            regtypeDiv.append(regtypespan);

            var openedUptoDiv = document.createElement('div');
            /*openedUptoDiv.className = 'col-md-6 openedUptoDiv';*/
            openedUptoDiv.className = 'col-md-8 col-sm-8 col-xs-8 ';
            openedUptoDiv.style = "";
            ////openedUptoDiv.innerHTML = item.textOpenedupto;
            containerDiv.append(openedUptoDiv);
            var openedUptoLabel = document.createElement('label');
            openedUptoLabel.style = 'font-weight:800;  margin-right:5px';
            openedUptoLabel.innerHTML = 'Opened Upto:';
            openedUptoDiv.append(openedUptoLabel);
            var openedUptospan = document.createElement('span');
            openedUptospan.style = '';
            openedUptospan.innerHTML = item.textOpenedupto;
            openedUptoDiv.append(openedUptospan);

            var regtype2Div = document.createElement('div');
            /*regtype2Div.className = 'col-md-4 regtype2Div';*/
            regtype2Div.className = 'col-md-4 col-sm-4 col-xs-4 ';
            regtype2Div.style = "";
            //regtype2Div.innerHTML = item.Regtype2;
            containerDiv.append(regtype2Div);
            var regtype2Label = document.createElement('label');
            regtype2Label.style = 'font-weight:800;  margin-right:5px';
            regtype2Label.innerHTML = 'RegType 2:';
            regtype2Div.append(regtype2Label);
            var regtype2Span = document.createElement('span');
            regtype2Span.style = '';
            regtype2Span.innerHTML = item.Regtype2;
            regtype2Div.append(regtype2Span);


            var LanDiv = document.createElement('div');
            //LanDiv.className = 'col-md-6 LanDiv';
            LanDiv.className = 'col-md-8 col-sm-8 col-xs-8';
            // LanDiv.innerHTML = item.Lan;
            LanDiv.style = "";
            containerDiv.append(LanDiv);
            var LanLabel = document.createElement('label');
            LanLabel.style = 'font-weight:800;  margin-right:5px';
            LanLabel.innerHTML = 'Lan:';
            LanDiv.append(LanLabel);
            var LanSpan = document.createElement('span');
            LanSpan.style = '';
            LanSpan.innerHTML = item.Lan;
            LanDiv.append(LanSpan);

            var NodesDiv = document.createElement('div');
            /*NodesDiv.className = 'col-md-6 NodesDiv';*/
            NodesDiv.className = 'col-md-4 col-sm-4 col-xs-4 ';
            // NodesDiv.innerHTML = item.Node;
            NodesDiv.style = "";
            containerDiv.append(NodesDiv);
            var NodesSpan = document.createElement('label');
            NodesSpan.style = 'font-weight:800;  margin-right:5px';
            NodesSpan.innerHTML = 'Nodes:';
            NodesDiv.append(NodesSpan);
            var NodesLabel = document.createElement('span');
            NodesLabel.style = '';
            NodesLabel.innerHTML = item.Node;
            NodesDiv.append(NodesLabel);
        });
        $("#RegistrationSeeMore").show();
    }
    if (RegistrationData.data.length > 3) {

        $("#ParentRegDiv").css("height", "340px");
        $("#ParentRegDiv").css("overflow-y", "scroll");
    }
    return false;
}

//function to dynamically create Payment related data 
function loadPaymentData(paymentData) {
    var parentPaymentDiv = $("#ParentPaymentDiv");
    parentPaymentDiv.text('');
    //If there is no data
    if (paymentData.data.length == 0) {
        var containerDiv = document.createElement('h4');
        containerDiv.className = 'text-center';
        containerDiv.style = "color:gray; margin-bottom:20px; margin-top:20px";
        containerDiv.innerHTML = 'No Payment Record'
        parentPaymentDiv.append(containerDiv);
        $("#PaymentSeeMore").hide();
    } else {
        $.each(paymentData.data, function (index, item) {
            var containerDiv = document.createElement('div');
            containerDiv.className = 'col-md-12 ';
            containerDiv.style = "padding:0px; height:auto; overflow:auto; margin-top:20px;border-bottom: 2px solid #eeeeee;";
            parentPaymentDiv.append(containerDiv);
            //var SnoDiv = document.createElement('div');
            //SnoDiv.style = 'width:21px; padding-left:10px; padding-right:0px; margin-right:5px'
            //SnoDiv.className = 'col-md-1';
            //SnoDiv.innerHTML = index + 1 + ".";
            //containerDiv.append(SnoDiv);

            var PaymentOrderDiv = document.createElement('div');
            /*PaymentOrderDiv.className = 'col-md-5';*/
            PaymentOrderDiv.className = 'col-md-8 col-sm-8 col-xs-8 ';
            PaymentOrderDiv.style = 'padding-left:1px'
            containerDiv.append(PaymentOrderDiv);
            var PaymentOrderLabel = document.createElement('label');
            PaymentOrderLabel.style = 'font-weight:600; margin-right:5px;font-size:14px; ';
            PaymentOrderLabel.innerHTML = index + 1 +  '.  BillNo:';
            PaymentOrderDiv.append(PaymentOrderLabel);
            var PaymentOrderspan = document.createElement('span');
            PaymentOrderspan.style = '';
            PaymentOrderspan.innerHTML = item.HeaderNo
            PaymentOrderDiv.append(PaymentOrderspan);

            var PaymentIdDiv = document.createElement('div');
            /*PaymentIdDiv.className = 'col-md-6';*/
            PaymentIdDiv.className = 'col-md-4 col-sm-4 col-xs-4';
            /*PaymentIdDiv.style = 'Text-align:right; padding-right:5px'*/
            containerDiv.append(PaymentIdDiv);
            var PaymentIdLabel = document.createElement('label');
            PaymentIdLabel.style = 'font-weight:600; margin-right:5px ';
            PaymentIdLabel.innerHTML = 'PaymentId:';
            PaymentIdDiv.append(PaymentIdLabel);
            var PaymentIdspan = document.createElement('span');
            PaymentIdspan.style = '';
            PaymentIdspan.innerHTML = item.P_Payment
            PaymentIdDiv.append(PaymentIdspan);

            var BenAccountDiv = document.createElement('div');
            /*BenAccountDiv.className = 'col-md-6';*/
            BenAccountDiv.className = 'col-md-8 col-sm-8 col-xs-8';
            /*BenAccountDiv.style = 'margin-top:5px';*/
            containerDiv.append(BenAccountDiv);
            var BenAccountLabel = document.createElement('label');
            BenAccountLabel.style = 'font-weight:800; margin-right:5px';
            BenAccountLabel.innerHTML = 'Beneficiary Acc: ';
            BenAccountDiv.append(BenAccountLabel);
            var BenAccountspan = document.createElement('span');
            BenAccountspan.style = '';
            if (item.TextBenAccount == '' || item.TextBenAccount == undefined || item.TextBenAccount == null) {
                BenAccountspan.innerHTML = 'Not Available';
            } else {
                BenAccountspan.innerHTML = '<b>' + item.TextBenAccount + '</b>';
            }
            BenAccountDiv.append(BenAccountspan);


            var PaymentDateDiv = document.createElement('div');
            /*PaymentDateDiv.className = 'col-md-6';*/
            PaymentDateDiv.className = 'col-md-4 col-sm-4 col-xs-4';
            /*PaymentDateDiv.style = "text-align:right; margin-top:5px;";*/
            containerDiv.append(PaymentDateDiv);
            var PaymentDateLabel = document.createElement('label');
            PaymentDateLabel.style = 'font-weight:800; margin-right:5px';
            PaymentDateLabel.innerHTML = 'Payment Adjusted Date: ';
            PaymentDateDiv.append(PaymentDateLabel);
            var PaymentDatespan = document.createElement('span');
            PaymentDatespan.style = '';
            if (item.Textmtimestamp == '' || item.Textmtimestamp == undefined || item.Textmtimestamp == null) {
                PaymentDatespan.innerHTML = 'Not Available';
            } else {
                PaymentDatespan.innerHTML = item.Textmtimestamp;
            }
            PaymentDateDiv.append(PaymentDatespan);


            //var PaymentDatebreak = document.createElement('br');
            //containerDiv.append(PaymentDatebreak);

            var PaymentModeDiv = document.createElement('div');
            //PaymentModeDiv.className = 'col-md-6';
            PaymentModeDiv.className = 'col-md-8 col-sm-8 col-xs-8';
            /*PaymentModeDiv.style = "margin-top:5px; margin-left:10px; padding-left:5px; padding-right:0px;";*/
            containerDiv.append(PaymentModeDiv);
            var PaymentModeLabel = document.createElement('label');
            PaymentModeLabel.style = 'font-weight:800; margin-right:5px ';
            PaymentModeLabel.innerHTML = 'Payment Mode:';
            PaymentModeDiv.append(PaymentModeLabel);
            var PaymentModespan = document.createElement('span');
            PaymentModespan.style = '';

            if (item.TextPaymentMode == '' || item.TextPaymentMode == undefined || item.TextPaymentMode == null) {
                PaymentModespan.innerHTML = 'Not Available';
            } else {
                PaymentModespan.innerHTML = item.TextPaymentMode;
            }
            PaymentModeDiv.append(PaymentModespan);

            var AmountDiv = document.createElement('div');
            /*AmountDiv.className = 'col-md-5';*/
            AmountDiv.className = 'col-md-4 col-sm-4 col-xs-4';
            //AmountDiv.style = "margin-top:5px; margin-left:13px;padding-right:0px; padding-left:0px;  text-align:right; margin-bottom:5px";
            containerDiv.append(AmountDiv);
            var AmountLabel = document.createElement('label');
            AmountLabel.style = 'font-weight:800; margin-right:5px';
            AmountLabel.innerHTML = 'Adjusted Amount:';
            AmountDiv.append(AmountLabel);
            var Amountspan = document.createElement('span');
            Amountspan.style = '';

            if (item.TextAmountAdjusted == '' || item.TextAmountAdjusted == undefined || item.TextAmountAdjusted == null) {
                Amountspan.innerHTML = 'Not Available';
            } else {
                Amountspan.innerHTML = item.TextAmountAdjusted;
            }
            AmountDiv.append(Amountspan);

            var RemarksDiv = document.createElement('div');
            /*RemarksDiv.className = 'col-md-8';*/
            RemarksDiv.className = 'col-md-8 col-sm-8 col-xs-8';
            /*RemarksDiv.style = "padding-left:15px; clear:both; margin-bottom:10px";*/
            containerDiv.append(RemarksDiv);
            var RemrksLabel = document.createElement('label');
            RemrksLabel.style = 'font-weight:800; margin-right:5px';
            RemrksLabel.innerHTML = 'Remarks:';
            RemarksDiv.append(RemrksLabel);
            var Remarkspan = document.createElement('span');
            Remarkspan.style = '';

            if (item.Proceedings == '' || item.Proceedings == undefined || item.Proceedings == null) {
                Remarkspan.innerHTML = 'Not Available';
            } else {
                Remarkspan.innerHTML = item.Proceedings;
            }
            RemarksDiv.append(Remarkspan);

            var DiscountDiv = document.createElement('div');
            /*DiscountDiv.className = 'col-md-4';*/
            DiscountDiv.className = 'col-md-4 col-sm-4 col-xs-4';
            //DiscountDiv.style = "padding-left:0px; text-align:right; margin-bottom:5px";
            containerDiv.append(DiscountDiv);
            var DiscountLabel = document.createElement('label');
            DiscountLabel.style = 'font-weight:800; margin-right:5px';
            DiscountLabel.innerHTML = 'Discount:';
            DiscountDiv.append(DiscountLabel);
            var Discountspan = document.createElement('span');
            Discountspan.style = '';

            if (item.TextAmountAdjusted == '' || item.TextAmountAdjusted == undefined || item.TextAmountAdjusted == null) {
                Discountspan.innerHTML = 'Not Available';
            } else {
                Discountspan.innerHTML = item.Textdiscount;
            }
            DiscountDiv.append(Discountspan);
        });
        $("#PaymentSeeMore").show();
    }
    if (paymentData.data.length > 3) {

        $("#ParentPaymentDiv").css("height", "340px");
        $("#ParentPaymentDiv").css("overflow-y", "scroll");
    }
    return false;
}

//function to dynamically create Order related data 
function loadOrderData(OrderData) {
    var parentOrderDiv = $("#ParentOrderDiv");
    parentOrderDiv.text('');
    //iif there is no data
    if (OrderData.data.length == 0) {
        var containerDiv = document.createElement('h4');
        containerDiv.className = 'text-center';
        containerDiv.style = "color:gray; margin-bottom:20px; margin-top:20px";
        containerDiv.innerHTML = 'No Order Record.'
        parentOrderDiv.append(containerDiv);
        $("#OrderSeeMore").hide();
    } else {
        $.each(OrderData.data, function (index, item) {
            var containerDiv = document.createElement('div');
            containerDiv.className = 'col-md-12 ';
            containerDiv.style = "padding:0px; height:auto;overflow:auto; margin-top:20px;border-bottom: 2px solid #eeeeee;";
            parentOrderDiv.append(containerDiv);
            var SnoDiv = document.createElement('div');
            SnoDiv.className = 'col-md-1 SnoDiv';
            SnoDiv.style = 'width:21px; padding-left:10px; padding-right:0px; margin-right:5px';
            SnoDiv.innerHTML = index + 1 + ".";
            containerDiv.append(SnoDiv);
            var OrderIdDiv = document.createElement('div');
            OrderIdDiv.className = 'col-md-8';
            OrderIdDiv.style = 'padding-left:0px';
            // RegsendDateDiv.innerHTML = '<b>'+ item.TextBenAccount +'</b>';               
            containerDiv.append(OrderIdDiv);
            var OrderIdLabel = document.createElement('label');
            OrderIdLabel.style = 'font-weight:800;  margin-right:5px';
            OrderIdLabel.innerHTML = 'MainOrderId:';
            OrderIdDiv.append(OrderIdLabel);
            var OrderIdspan = document.createElement('span');
            OrderIdspan.style = '';
            OrderIdspan.innerHTML = item.OrderHeader;
            OrderIdDiv.append(OrderIdspan);

            var PaymenFlagDiv = document.createElement('div');
            PaymenFlagDiv.className = 'col-md-3 PaymentFlagDiv';
            PaymenFlagDiv.style = "padding-right:4px";
            //regtypeDiv.innerHTML = item.Regtype;
            containerDiv.append(PaymenFlagDiv);
            var PaymentFlagspan = document.createElement('span');
            PaymentFlagspan.class = 'label label-danger';
            PaymentFlagspan.innerHTML = item.TextPaymentFlag;
            if (item.PaymentFlag == "U") {
                PaymentFlagspan.className = "label label-warning"
                PaymentFlagspan.innerHTML = "Unpaid"
            } else if (item.PaymentFlag == "P") {
                PaymentFlagspan.className = "label label-success"
                PaymentFlagspan.innerHTML = "Paid"
            }
            else {
                PaymentFlagspan.className = "label label-danger"
                PaymentFlagspan.innerHTML = "Cancelled"
            }
            PaymenFlagDiv.append(PaymentFlagspan);

            var ChargingHeaderDiv = document.createElement('div');
            ChargingHeaderDiv.className = 'col-md-6';
            ChargingHeaderDiv.style = "padding-left:15px; ";
            //openedUptoDiv.innerHTML = item.textOpenedupto;
            containerDiv.append(ChargingHeaderDiv);
            var ChargingHeaderLabel = document.createElement('label');
            ChargingHeaderLabel.style = 'font-weight:800;  margin-top:5px; margin-right:5px';
            ChargingHeaderLabel.innerHTML = 'BillNo:';
            ChargingHeaderDiv.append(ChargingHeaderLabel);
            var ChargingHeaderspan = document.createElement('span');
            //openedUptospan.style = 'font-weight:800; ';
            ChargingHeaderspan.innerHTML = item.HeaderNo;
            ChargingHeaderDiv.append(ChargingHeaderspan);

            var OrderDateDiv = document.createElement('div');
            OrderDateDiv.className = 'col-md-6 OrderDateDiv';
            OrderDateDiv.style = "";
            //regtype2Div.innerHTML = item.Regtype2;
            containerDiv.append(OrderDateDiv);
            var OrderDateLabel = document.createElement('label');
            OrderDateLabel.style = 'font-weight:800;  margin-right:5px';
            OrderDateLabel.innerHTML = 'OrderDate:';
            OrderDateDiv.append(OrderDateLabel);
            var OrderDateSpan = document.createElement('span');
            // OrderDateSpan.style = 'font-weight:800; ';
            OrderDateSpan.innerHTML = item.Textmtimestamp;
            OrderDateDiv.append(OrderDateSpan);


            var GrandTotalDiv = document.createElement('div');
            GrandTotalDiv.className = 'col-md-6';
            // LanDiv.innerHTML = item.Lan;
            GrandTotalDiv.style = "margin-top:5px; margin-bottom:5px; padding-right:0px; padding-left:15px; ";
            containerDiv.append(GrandTotalDiv);
            var GrandTotalLabel = document.createElement('label');
            GrandTotalLabel.style = 'font-weight:800;  margin-right:5px';
            GrandTotalLabel.innerHTML = 'Amount:';
            GrandTotalDiv.append(GrandTotalLabel);
            var GrandTotalSpan = document.createElement('span');
            //GrandTotalSpan.style = 'font-weight:800; ';
            GrandTotalSpan.innerHTML = item.GrandTotal;
            GrandTotalDiv.append(GrandTotalSpan);

            var accordiondiv = document.createElement('div');
            accordiondiv.id = item.HeaderNo;
            accordiondiv.className = 'accordion1 col-md-6';
            accordiondiv.style = "";
            containerDiv.append(accordiondiv);
            var accordioni = document.createElement('i')
            accordioni.className = 'glyphicon glyphicon-plus';
            accordiondiv.append(accordioni);
            var paneldiv = document.createElement('div')
            paneldiv.className = 'panel col-md-12 OrderPanel';
            paneldiv.style = "";
            paneldiv.id = 'panel-' + item.HeaderNo;
            containerDiv.append(paneldiv);

        });

        //code to create dynamically create charging item data accordion
        var acc1 = document.getElementsByClassName("accordion1");
        var i;
        for (i = 0; i < acc1.length; i++) {
            acc1[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                    $(this).children('i').removeClass();
                    $(this).children('i').addClass('glyphicon glyphicon-plus');

                } else {
                    var HeaderNo = this.id;
                    var panelDivId = "#panel-" + HeaderNo;
                    var paneldiv = $(panelDivId);

                    //$(panelDivId).html('');
                    if ($(panelDivId).html().length) {
                        panel.style.maxHeight = 100 + "px";
                        $(this).children('i').removeClass();
                        $(this).children('i').addClass('glyphicon glyphicon-minus');
                    } else {
                        $.post('/CustomerDetails/ChargingItemsbyChargingHeader', { HeaderNo: this.id }, function (ChargingItemdata) {
                            console.log(ChargingItemdata.data.length);
                            if (ChargingItemdata.data.length == 0) {
                                var remarkContainerDiv = document.createElement('div');
                                remarkContainerDiv.className = 'col-md-12';
                                remarkContainerDiv.style = "height:20px; margin-bottom:10px";
                                paneldiv.append(remarkContainerDiv);
                                var RemarkDiv = document.createElement('div');
                                RemarkDiv.className = 'col-md-7';
                                RemarkDiv.innerHTML = 'Not available';
                                remarkContainerDiv.append(RemarkDiv);
                            } else {
                                $.each(ChargingItemdata.data, function (index, item) {
                                    var remarkContainerDiv = document.createElement('div');
                                    remarkContainerDiv.className = 'col-md-12';
                                    remarkContainerDiv.style = "height:auto; overflow:auto; padding:5px; 0px 5px 0px; border-bottom:2px solid #eeeeee; margin-bottom:5px";
                                    paneldiv.append(remarkContainerDiv);
                                    //var RemarkSnoDiv = document.createElement('div');
                                    //RemarkSnoDiv.className = 'col-md-1 RemarkSnoDiv';
                                    //RemarkSnoDiv.innerHTML = (index + 1) + '.';
                                    //remarkContainerDiv.append(RemarkSnoDiv);
                                    var ServiceCodeDiv = document.createElement('div');
                                    /*ServiceCodeDiv.className = 'col-md-9 ServiceCodeDiv';*/
                                    ServiceCodeDiv.className = 'col-md-12 ServiceCodeDiv';
                                    ServiceCodeDiv.style = '';
                                    remarkContainerDiv.append(ServiceCodeDiv);
                                    var ServiceCodeLabel = document.createElement('label');
                                    ServiceCodeLabel.style = 'font-weight:800;  margin-right:5px';
                                    ServiceCodeLabel.innerHTML = (index + 1) + '. Service:';
                                    ServiceCodeDiv.append(ServiceCodeLabel);
                                    var ServiceCode = document.createElement('span');
                                    ServiceCode.innerHTML = item.TextServiceCode;
                                    ServiceCodeDiv.append(ServiceCode);
                                    var ChargingToDiv = document.createElement('div');
                                    ChargingToDiv.className = 'col-md-6';
                                    ChargingToDiv.style = 'padding-left:15px;  margin-bottom:5px;';
                                    remarkContainerDiv.append(ChargingToDiv);
                                    var ChargingToLabel = document.createElement('label');
                                    ChargingToLabel.style = 'font-weight:800;   margin-right:5px';
                                    ChargingToLabel.innerHTML = 'Charging To:';
                                    ChargingToDiv.append(ChargingToLabel);
                                    var ChargingTospan = document.createElement('span');
                                    ChargingTospan.innerHTML = item.FrmtChargingToDate;
                                    ChargingToDiv.append(ChargingTospan);

                                    var ChargingFromDiv = document.createElement('div');
                                    ChargingFromDiv.className = 'col-md-6 ChargingFromDiv';
                                    ChargingFromDiv.style = '';
                                    remarkContainerDiv.append(ChargingFromDiv);
                                    var ChargingFromLabel = document.createElement('label');
                                    ChargingFromLabel.style = 'font-weight:800;   margin-right:5px';
                                    ChargingFromLabel.innerHTML = 'Charging From:';
                                    ChargingFromDiv.append(ChargingFromLabel);
                                    var ChargingFromspan = document.createElement('span');
                                    ChargingFromspan.innerHTML = item.FrmtChargingFromDate;
                                    ChargingFromDiv.append(ChargingFromspan);


                                    var RateDiv = document.createElement('div');
                                    RateDiv.className = 'col-md-6';
                                    RateDiv.style = 'padding-left:15px;  margin-bottom:5px;';
                                    remarkContainerDiv.append(RateDiv);
                                    var RateLabel = document.createElement('label');
                                    RateLabel.style = 'font-weight:800; ';
                                    RateLabel.innerHTML = 'Rate:';
                                    RateDiv.append(RateLabel);
                                    var Ratespan = document.createElement('span');
                                    Ratespan.innerHTML = item.ProductRate;
                                    RateDiv.append(Ratespan);

                                    var QtyDiv = document.createElement('div');
                                    QtyDiv.className = 'col-md-6 QtyDiv';
                                    QtyDiv.style = '';
                                    remarkContainerDiv.append(QtyDiv);
                                    var QtyLabel = document.createElement('label');
                                    QtyLabel.style = 'font-weight:800;   margin-right:5px';
                                    QtyLabel.innerHTML = 'Qty:';
                                    QtyDiv.append(QtyLabel);
                                    var Qtyspan = document.createElement('span');
                                    Qtyspan.innerHTML = item.Quantity;
                                    QtyDiv.append(Qtyspan);

                                    var AmtDiv = document.createElement('div');
                                    AmtDiv.className = 'col-md-12';
                                    AmtDiv.style = 'padding-right:0px; padding-left:15px;  clear:both';
                                    remarkContainerDiv.append(AmtDiv);
                                    var AmtLabel = document.createElement('label');
                                    AmtLabel.style = 'font-weight:800; ';
                                    AmtLabel.innerHTML = 'Amount:';
                                    AmtDiv.append(AmtLabel);
                                    var Amtspan = document.createElement('span');
                                    Amtspan.innerHTML = item.TaxableAmount;
                                    AmtDiv.append(Amtspan);
                                    //var hr = document.createElement('hr');
                                    //remarkContainerDiv.append(hr);
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
        $("#OrderSeeMore").show();
    }
    if (OrderData.data.length > 3) {

        $("#ParentOrderDiv").css("height", "340px");
        $("#ParentOrderDiv").css("overflow-y", "scroll");
    }
    return false;
}
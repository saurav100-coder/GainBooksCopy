function loadPendingCalls(Data) {
    var ParentPendingCallDiv = $("#ParentPendingCallDiv");
    ParentPendingCallDiv.text('');
    //if there is no data
    if (Data == "Error") {
        var containerDiv = document.createElement('h4');
        containerDiv.className = 'text-center';
        containerDiv.style = "color:gray; margin-bottom:20px; margin-top:20px";
        containerDiv.innerHTML = 'No Registration Record.'
        ParentPendingCallDiv.append(containerDiv);
        //$("#RegistrationSeeMore").hide();
    } else {
        $.each(Data.data, function (index, item) {
            var containerDiv = document.createElement('div');
            containerDiv.className = 'col-md-12 RegistrationDiv';
            containerDiv.style = "padding:0px; height:auto; overflow:auto; margin-top:20px;border-bottom: 2px solid #eeeeee;";
            ParentPendingCallDiv.append(containerDiv);
            var SnoDiv = document.createElement('div');
            SnoDiv.className = 'col-md-1 RegSno';
            SnoDiv.style = '';
            SnoDiv.innerHTML = index + 1;
            containerDiv.append(SnoDiv);

            var FirmNameDiv = document.createElement('div');
            FirmNameDiv.className = 'col-md-11';
            containerDiv.append(FirmNameDiv);

            //var FirmNameLabel = document.createElement('label');
            //FirmNameLabel.innerHTML = 'FirmName:'
            //FirmNameDiv.append(FirmNameLabel);

            var FirmNameSpan = document.createElement('span');
            FirmNameSpan.innerHTML = item.Firmname;
            FirmNameDiv.append(FirmNameSpan);

            var IssueTypeDiv = document.createElement('div');
            IssueTypeDiv.className = 'col-md-8';
            IssueTypeDiv.style = 'margin-top:5px'
            containerDiv.append(IssueTypeDiv);

            var IssueTypeLabel = document.createElement('Label');
            IssueTypeLabel.style = 'margin-bottom:0px; margin-right:5px';
            IssueTypeLabel.innerHTML = 'IssueType:'
            IssueTypeDiv.append(IssueTypeLabel);

            var IssueTypeSpan = document.createElement('span');
            IssueTypeSpan.innerHTML = item.TextIssuetype;
            IssueTypeDiv.append(IssueTypeSpan);

            var CreationDateDiv = document.createElement('div');
            CreationDateDiv.className = 'col-md-4';
            CreationDateDiv.style = 'margin-top:5px; text-align:right';
            CreationDateDiv.innerHTML = item.FrmtCreationDate;
            containerDiv.append(CreationDateDiv);

            var IssueDescriptionDiv = document.createElement('div');
            IssueDescriptionDiv.className = 'col-md-10';
            IssueDescriptionDiv.style = 'margin-top:5px; margin-bottom:15px';
            containerDiv.append(IssueDescriptionDiv);

            var IssueDescriptionLabel = document.createElement('label');
            IssueDescriptionLabel.innerHTML = 'IssueDescription:'
            IssueDescriptionLabel.style = 'margin-bottom:0px; margin-right:5px';
            IssueDescriptionDiv.append(IssueDescriptionLabel);

            var IssueDescriptionSpan = document.createElement('span');
            IssueDescriptionSpan.innerHTML = item.Issuedescription;
            IssueDescriptionDiv.append(IssueDescriptionSpan);


            var accordiondiv = document.createElement('div');
            accordiondiv.id = item.P_issuesfilegst;
            accordiondiv.className = 'accordion col-md-2';
            accordiondiv.style = "margin-top:5px; text-align:right";
            containerDiv.append(accordiondiv);
            var accordioni = document.createElement('i')
            accordioni.className = 'glyphicon glyphicon-plus';
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
                        $.post('/EmpDashboard/GetPendingCallRemarkData', { P_issuesfilegst: this.id }, function (PendingCallRemarkdata) {
                            console.log(PendingCallRemarkdata.data.length);
                            if (PendingCallRemarkdata.data.length == 0) {
                                var remarkContainerDiv = document.createElement('div');
                                remarkContainerDiv.className = 'col-md-12';
                                remarkContainerDiv.style = "height:20px; margin-bottom:10px";
                                paneldiv.append(remarkContainerDiv);
                                var RemarkDiv = document.createElement('div');
                                RemarkDiv.className = 'col-md-7';
                                RemarkDiv.innerHTML = 'Remarks not available';
                                remarkContainerDiv.append(RemarkDiv);
                            } else {
                                $.each(PendingCallRemarkdata.data, function (index, item) {
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

    }
}

function loadDueRegCustData(Data) {
    var ParentDueRegDiv = $("#ParentDueRegDiv");
    ParentDueRegDiv.text('');
    //if there is no data
    if (Data == "Error") {
        var containerDiv = document.createElement('h4');
        containerDiv.className = 'text-center';
        containerDiv.style = "color:gray; margin-bottom:20px; margin-top:20px";
        containerDiv.innerHTML = 'No Registration Record.'
        ParentDueRegDiv.append(containerDiv);
        //$("#RegistrationSeeMore").hide();
    } else {
        $.each(Data.data, function (index, item) {
            var containerDiv = document.createElement('div');
            containerDiv.className = 'col-md-12 RegistrationDiv';
            containerDiv.style = "padding:0px; height:auto; overflow:auto; margin-top:20px;border-bottom: 2px solid #eeeeee;";
            ParentDueRegDiv.append(containerDiv);
            var SnoDiv = document.createElement('div');
            SnoDiv.className = 'col-md-1 RegSno';
            SnoDiv.style = '';
            SnoDiv.innerHTML = index + 1;
            containerDiv.append(SnoDiv);

            var FirmNameDiv = document.createElement('div');
            FirmNameDiv.className = 'col-md-11';
            FirmNameDiv.innerHTML = item.CustName;
            containerDiv.append(FirmNameDiv);

            //var FirmNameLabel = document.createElement('label');
            //FirmNameLabel.innerHTML = 'FirmName:'
            //FirmNameDiv.append(FirmNameLabel);



            var CustCodeDiv = document.createElement('div');
            CustCodeDiv.className = 'col-md-4';
            CustCodeDiv.innerHTML = item.CustCode;
            CustCodeDiv.style = 'margin-top:5px;'
            containerDiv.append(CustCodeDiv);

            //var CustCodeLabel = document.createElement('Label');
            //CustCodeLabel.style = 'margin-top:5px';
            //CustCodeLabel.innerHTML = 'CustCode:'
            //CustCodeDiv.append(CustCodeLabel);



            var AllowUptoDiv = document.createElement('div');
            AllowUptoDiv.className = 'col-md-8';
            AllowUptoDiv.style = 'margin-top:5px; text-align:right';
            containerDiv.append(AllowUptoDiv);

            var AllowUptoLabel = document.createElement('Label');
            AllowUptoLabel.style = 'margin-right:5px';
            AllowUptoLabel.innerHTML = 'AllowUpto:'
            AllowUptoDiv.append(AllowUptoLabel);

            var AllowUptoSpan = document.createElement('span');
            AllowUptoSpan.innerHTML = item.FrmtAllowUpto;
            AllowUptoDiv.append(AllowUptoSpan);

            var HomeTownDiv = document.createElement('div');
            HomeTownDiv.className = 'col-md-6';
            HomeTownDiv.style = 'margin-top:5px;';
            HomeTownDiv.innerHTML = item.TextHomeTown;
            containerDiv.append(HomeTownDiv);

            var MobNoDiv = document.createElement('div');
            MobNoDiv.className = 'col-md-6';
            MobNoDiv.style = 'margin-top:5px; text-align:right';

            MobNoDiv.id = 'MobileNoText';
            if (item.MobNo == '' || item.MobNo == undefined || item.MobNo == null) {
                MobNoDiv.innerHTML = 'Mobile number not available';
            } else {
                MobNoDiv.innerHTML = item.MobNo;
            }
            containerDiv.append(MobNoDiv);


            var OnSiteFlagDiv = document.createElement('div');
            OnSiteFlagDiv.className = 'col-md-6';
            OnSiteFlagDiv.style = 'margin-top:5px; margin-bottom:10px';
            containerDiv.append(OnSiteFlagDiv);

            var OnSiteFlagLabel = document.createElement('Label');
            OnSiteFlagLabel.style = 'margin-right:5px';
            OnSiteFlagLabel.innerHTML = 'Onsite Flag:'
            OnSiteFlagDiv.append(OnSiteFlagLabel);

            var OnSiteFlagSpan = document.createElement('span');
            OnSiteFlagSpan.innerHTML = item.onsiteflag;
            OnSiteFlagSpan.id = "OnsiteFlagSpan"
            if (item.onsiteflag == '' || item.onsiteflag == undefined || item.onsiteflag == null) {
                OnSiteFlagSpan.innerHTML = 'Not Available';
            } else {
                OnSiteFlagSpan.innerHTML = item.onsiteflag;
            }
            OnSiteFlagDiv.append(OnSiteFlagSpan);

        });

        $("#RegistrationSeeMore").show();
    }
    return false;
}

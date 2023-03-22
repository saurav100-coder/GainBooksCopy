var options = { "backdrop": "static", keyboard: true };
var popOverOpen = false;
var CurrentHoverRowId = 0;
var CollabPopOpen = false
function loadData(data) {
    var tblEmployee = $("#example");
    $("#example div").remove();
    var a = data.draw;
    if ($("#Next").hasClass("disabledbutton") == true) { $("#Next").removeClass("disabledbutton"); }
    if ($("#Prev").hasClass("disabledbutton") == true) { $("#Prev").removeClass("disabledbutton"); }
    var d = sessionStorage.getItem("PageSize");
    if (d == null || d == 0 || d == "undefined") { d = 20; sessionStorage.setItem("PageSize", d); };
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
    $.each(data.data, function (index, item) {
        var Parentdiv = "";
        var MoreDetailsdiv = "";
        var callFreqdiv = ""
        var Callinaction = ""
        Callinaction = $("<div id='eng-" + item.P_CRMLead + "' class='col-md-12 alert cgs' style='padding-left:25px; margin-left: 20px;width: 400px;background-color: gainsboro;margin-bottom: 0px;padding-bottom: 0px;padding-top: 0px;'><span>" + item.EngageStatus + "<span><b>&nbsp;" + item.EngageBy + "</b><span>&nbsp;&nbsp;" + item.EngageTime + "</span></div>");
        if (item.hasRemarks == "Y") {

            Parentdiv = $("<div id='MainDiv-" + item.CRMLead_key + "' class='col-md-12  clickable parentdiv' style='display: inline-flex;border-bottom:1px black solid;padding-left:5px;margin-left:0px;width: 1100px;'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
            MoreDetailsdiv = $(("<div  class='MoreDetails' id='" + item.CRMLead_key + "'  style='background-color:white; position:absolute; display:none; min-height:53px; padding-left:10px; padding-top:8px;width: 342px;margin-left:750px;'> </div>"))
        } else {
            //Callinaction = $("<div id='eng-" + item.P_issuesfilegst + "' class='col-md-12 alert cgs' style='padding-left:25px; margin-left: 20px;width: 400px;background-color: antiquewhite;margin-bottom: 0px;padding-bottom: 0px;padding-top: 0px;'><span>" + item.EngageStatus + "<span></div>");
            Parentdiv = $("<div id='MainDiv-" + item.CRMLead_key + "' class='col-md-12  clickable parentdiv' style='display:inline-flex; border-bottom:1px black solid; padding-left:5px;background-color:rgb(243, 102, 99); color:white; margin-left: 0px;width: 1100px;'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
            MoreDetailsdiv = $(("<div  class='MoreDetails' id='" + item.CRMLead_key + "'  style='background-color:rgb(243, 102, 99); opacity:1; position:absolute; display:none; min-height:53px; padding-left:10px; padding-top:8px;width: 342px;margin-left: 750px;'> </div>"))
        }
        if (item.callFreqCount > 0) {
            // Callinaction = $("<div id='eng-" + item.P_issuesfilegst + "' class='col-md-12 alert cgs' style=' padding-left:25px; margin-left: 20px;width: 400px;background-color: antiquewhite;margin-bottom: 0px;padding-bottom: 0px;padding-top: 0px;'><span>" + item.EngageStatus + "<span></div>");
            Parentdiv = $("<div id='MainDiv-" + item.CRMLead_key + "' class='col-md-12  clickable parentdiv red' style='display: inline-flex;border-bottom:1px black solid;padding-left:5px;background-color:rgb(243, 102, 99);color:white;width: 1100px;'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
            MoreDetailsdiv = $(("<div  class='MoreDetails' id='" + item.CRMLead_key + "'  style='background-color:rgb(243, 102, 99);opacity:1; position:absolute; display:none; min-height:53px; padding-left:10px; padding-top:8px;width: 342px;margin-left: 750px;'> </div>"))
            callFreqdiv = ("<div class='numberCircle' style=''>" + item.callFreqCount + "</div>")
        }

        // tblEmployee.append(Callinaction);
        tblEmployee.append(Parentdiv);
        m = m + 1;
        var div = $("<div id='tr-" + item.CRMLead_key + "'  style='display:inline-flex; position:relative; min-height:55px; width: 1100px;  margin-top:10px;  font-size:11px; font-family: verdana,arial,sans-serif; padding-right:0px'></div>");
        div.html(callFreqdiv
         + " " + ("<div style='width:3%; padding-right:3px;text-align: center;' id='" + item.CRMLead_key + "' value='" + item.CRMLead_key + " style='margin-top:2px; float:left'><input type='hidden' class='isDeffered' value='" + item.IsDeffered + "'/>" + m + ".</div>")
         + " " + ("<div style='width:5%; padding-right:0px;padding-left:10px;'><input type='hidden' id='HasRemark-" + item.CRMLead_key + "' value='" + item.hasRemarks + "'/><input type='hidden' id='P-" + item.P_CRMLead + "' value='" + item.P_CRMLead + "'/>" + item.P_CRMLead + "</div>")
         + " " + ("<div style='width:10%;padding-left:15px;'>" + item.TxtRegisterDate + "</div>")
         + " " + ("<div style='width:8%; padding-right:5px; margin-right:5px; padding-left:0px;'>" + item.Topic + "</div>")
         + " " + ("<div style='width:8%;padding-left: 5px;margin-right:10px;'>" + item.Contactperson + "</div>")
         + " " + ("<div style='width:7%; margin-left:10px; margin-right:5px;'>" + item.Mobileno + "</div>")
         + " " + ("<div style='width:14%;padding-left:10px; text-align:left; padding-right:10px;'>" + item.Email + "</div>")
         + " " + ("<div style='width:14%;padding-left:0px; text-align:center;'>" + item.TextStatus + "</div>")
         + " " + ("<div style='width:5%;padding-left:0px; padding-right: 20px;text-align: left;'>" + item.TextAssignedto + "</div>")
         + " " + ("<div style='width:9%;padding-left:15px;'>" + item.TxtLastCallDate + "</div>")
         + " " + ("<div style='width:5%;padding-left:0px;'>" + item.onsiteflag + "</div>")
         + " " + ("<div style='width:10%;text-align: left;padding-left:0px;'>" + item.FrmtNextActionDate + "</div>")
         + " " + ("<div style='width:6%;padding-left:0px;'>" + item.Source + "</div>"))
        Parentdiv.append(div);


        //MoreDetailsdiv.html(("<a data-toggle='Call Engage'> <i class='fa fa-user ShowCallEngageCtrls' onclick='CallEngagectrls(this)' data-placement='bottom' style='font-size:18px; color:#616A6B; padding-left:11px;'></i></a>" +
        //    "<a data-toggle='Link Customer' onclick='ShowLinkCustomerModal(" + item.P_issuesfilegst + ")'>             <i class='fa fa-link' data-placement='right'  style='font-size:20px; color:#616A6B;padding-left:11px;'>                                                                                                                    </i></a>" +
        //    "<a data-toggle='Add Remarks' onclick='AddRemark(" + item.Issuesfilegstkey + ");'>                   <i class='glyphicon glyphicon-comment' data-placement='bottom' style='font-size:20px; color:#616A6B;  padding-left:11px;'>                                                                                                              </i></a>" +
        //    "<a data-toggle='View Remarks' class='ShowRemark'>              <i class='glyphicon glyphicon-list ShowRemark' data-placement='left' style='font-size:17.75px; color:#616A6B; padding-left:11px;'  onclick='ViewRemarks(this)'></i></a>" +
        //   "<a data-toggle='Call Assign To' onclick='CallAssignTo(" + item.P_issuesfilegst + ")'>            <i class='fa fa-phone'  style='font-size:20px; color:#616A6B; padding-left:11px;'>                                                                                                                                 </i></a>" +
        //    "<a data-toggle='Go To Call Dashboard' href='/CustomerDetails/Calldashboard?CallId=" + item.P_issuesfilegst + "' >       <i class='glyphicon glyphicon-th-large' style='font-size:20px; color:#616A6B;padding-left:11px;' >                                                                                                                             </i></a>" +
        // "<a data-toggle='Edit&nbsp&nbsp&nbsp' href='/CRM/EditRegCalls?P_issue=" + item.P_issuesfilegst + "&CalledFrom=ManageRegCalls' id='Edit'>       <i class='glyphicon glyphicon-pencil' style='font-size:20px; color:#616A6B;padding-left:11px;' >                                                                                                                             </i></a>" +
        //   "<a data-toggle='Call Closed' onclick='CallClose(" + item.Issuesfilegstkey + ")'>               <i class='fa fa-close'  style='font-size:22px; color:#616A6B; padding-left:11px;'>                                                                                                                                          </i></a>" +
        //    "<a data-toggle='Onsite Service' onclick='OnsiteVisit(" + item.Issuesfilegstkey + ")'>            <i class='fa fa-suitcase'  style='font-size:20px; color:#616A6B; padding-left:11px;'>                                                                                                                                        </i></a>" +
        //    "<a data-toggle='DeferCall'> <i class='fa fa-clock-o ShowDefferCallCtrls' onclick='DeferCallctrls(this)' data-placement='bottom' style='font-size:22px; color:#616A6B; padding-left:11px;'></i></a>" +
        //    "<a data-toggle='Contact Customer'>          <i class='fa fa-address-book ContactCustomerCtrls' onclick='ContactCustomerCtrls(this)' data-placement='bottom'  style='font-size:21px;  color:#616A6B; padding-left:11px;'>                                                 </i></a>" +
        //    "<a data-toggle='Mark Duplicate'>          <i class='fa fa-clone MarkDuplicateCtrls' onclick='MarkDuplicateCtrls(this)' data-placement='bottom'  style='font-size:21px;  color:#616A6B; padding-left:11px;'>                                                 </i></a>" +
        //    "<a data-toggle='Collaborators'>             <i class='fa fa-users ShowCollaboratorCtrls' data-placement='bottom' onclick='ShowCollaboratorCtrls(this)' style='font-size:19px;  color:#616A6B; padding-left:11px;'>                                                       </i></a>" +
        //    "<a data-toggle='Mail To Dealer' onclick='MailToDealer(this)'>            <i class='fa fa-envelope'  style='font-size:20px; color:#616A6B; padding-left:11px;'>                                                                                                                                     </i></a>" +
        //    "<div class='popover_content_wrapper3' style='display:none; float:left; data-placement=bottom' id='ShowRemarksDiv'></div>" +
        //    "<div class='popover_content_wrapper4' style='display:none; margin-top:0px; padding-top:0px' id='ShowCollaboratorsCtrlsDiv'>                            <span class='close' onclick='popoverClose();' style=' font-size:15px; text-align:right; padding-left:15px;padding-bottom:15px;'> &times; </span>                    <a  onclick='AddCollaborator(this);' style='color:#222223; cursor:pointer; font-size:11.25px;margin-left: 5px;'>        <i class='fa fa-plus' style='font-size:17px; opacity:1; color:#616A6B; padding-top:10px; padding-right:8px; margin-left:5x;'>           </i>&nbsp; Add Collaborators  </a> </br>   <hr style='margin-top: 4px; margin-bottom: 3px; width: 160px;border-top-width: 2px;margin-left: 0px;'>    <a onclick='ShowCollaborators(this);' class='ViewCollaborator' style='color:#222223; cursor:pointer; font-size:11.25px' >             <i class='fa fa-eye' style='font-size:16px; color:#616A6B; opacity:1;margin-left: 5px;'>                                         </i>&nbsp; View Collaborators        </a> </div>" +
        //    "<div class='popover_content_wrapper5' style='display:none; z-index:12; width:70px; margin-top:0px; padding-top:0px' id='ContactCustomerCtrlsDiv'>     <span class='close' onclick='popoverClose();' style=' font-size:15px; text-align:right; padding-left:15px;padding-bottom:15px;'> &times; </span>                    <a  onclick='MsgToCustomer(this)'style='color:#222223; cursor:pointer; font-size:11.25px; margin-left: 5px;font-family: verdana,arial,sans-serif;'>   <i class='fa fa-mobile' style='font-size:27px;padding-left: 3px; color:#616A6B;z-index:12;opacity: 1; padding-right:4px;'>              </i>&nbsp; Message To Customer</a> </br>   <hr style='margin-top: 4px; margin-bottom: 3px; width: 180px;border-top-width: 2px;margin-left: 0px;'>    <a  onclick='MailToCustomer(this);' style='color:#222223; z-index:12;cursor:pointer; font-size:11.25px' >     <i class='fa fa-envelope-o' style='font-size:17px; padding-right: 1px; opacity:1; color:#616A6B;z-index:12;margin-left: 7px;'>   </i>&nbsp; Mail To Customer          </a> </div> " +
        //    "<div class='popover_content_wrapper6' style='display:none; z-index:12; width:70px; margin-top:0px; padding-top:0px' id='MarkDuplicateCtrlsDiv'>     <span class='close' onclick='popoverClose();' style=' font-size:15px; text-align:right; padding-left:15px;padding-bottom:15px;'> &times; </span> <span>Call Id <form > <input class='TxtCallId' type='text' style='width:150px; color:black' /><div class='btn btn-success DateBtn' onclick='SubmitMarkAsDuplicate(this)' style='padding: 2px 5px 1px 5px; margin-bottom: 5px;'><i class='glyphicon glyphicon-ok'></i></div></form></span </div> " +
        //    "<div class='popover_content_wrapper7' style='display:none; z-index:12; width:70px; margin-top:0px; padding-top:0px' id='ShowDefferCallControlDiv'>                                         <span class='close' onclick='popoverClose();' style=' font-size:15px; text-align:right; padding-left:15px;padding-bottom:15px;'> &times; </span>     <div class='col-md-12' style='height: 55px;margin-top: 10px;padding-left:0px;'>Date <input id='NextActionDate' name='NextActionDate' class='NextActionDate col-md-9' type='datetime-local' style='width:180px; color:black; margin-top: 5px;margin-right: 5px;padding-left: 5px;' /><div class='col-md-3 btn btn-success DateBtn' id='DefferDate' onclick='defferCallSubmit(this)' style='padding-top: 2px;padding-bottom: 0px;padding-right: 5px;padding-left: 5px;width: 28px;'><i class='glyphicon glyphicon-ok' class='IconClose'></i></div></div></div> " +
        //    "<div class='popover_content_wrapper8' style='display:none; z-index:12; width:70px; margin-top:0px; padding-top:0px' id='CallEngagaeControlDiv'>                                         <span class='close' onclick='popoverClose();' style=' font-size:15px; text-align:right; padding-left:15px;padding-bottom:15px;'> &times; </span>     <div class='col-md-12' style='height: 55px; margin-top: 10px; padding:0px;'>Status:<select  id='callstatusInput-" + item.Issuesfilegstkey + "' name='callstatusInput' class='callstatusInput col-md-9' style='width:165px; height:25px;color:black; margin-top: 5px;padding-left: 5px;' /><div class='col-md-3 btn btn-success' id='CallEngageSubmitBtn' onclick='SubmitCallEngage(this)' style='padding-top: 2px;padding-bottom: 0px;padding-right: 5px;padding-left: 5px;width: 28px;'><i class='glyphicon glyphicon-ok' class='IconClose'></i></div></div></div> ")

        //);
        MoreDetailsdiv.html(("<a data-toggle='Add Remarks' onclick='AddRemark(" + item.CRMLead_key + ");'><i class='glyphicon glyphicon-comment' data-placement='bottom' style='font-size:20px; color:#616A6B;  padding-left:11px;'></i></a>" +
            "<a data-toggle='View Remarks' class='ShowRemark'><i class='glyphicon glyphicon-list ShowRemark' data-placement='left' style='font-size:17.75px; color:#616A6B; padding-left:11px;'  onclick='ViewRemarks(this)'></i></a>" +
             "<a data-toggle='Link Account' onclick='ShowLinkAccountModal(" + item.P_CRMLead + ")'><i class='fa fa-link' data-placement='right'  style='font-size:20px; color:#616A6B;padding-left:11px;'></i></a>" +
           "<a data-toggle='Call Assign To' onclick='CallAssignTo(" + item.P_CRMLead + ")'>            <i class='fa fa-phone'  style='font-size:20px; color:#616A6B; padding-left:11px;'></i></a>" +
            "<a data-toggle='Edit&nbsp&nbsp&nbsp' href='/Sales/LeadForm?P_crmLead=" + item.P_CRMLead + "&exitmode=edit&CalledFrom=ManageCRMLead' ><i class='glyphicon glyphicon-pencil' style='font-size:20px; color:#616A6B;padding-left:11px;' ></i></a>" +
            "<a data-toggle='Go To Call Dashboard' href='/CustomerDetails/LeadCalldashboard?CallId=" + item.P_CRMLead + "' ><i class='glyphicon glyphicon-th-large' style='font-size:20px; color:#616A6B;padding-left:11px;' ></i></a>" +
            "<a data-toggle='DeferCall'><i class='fa fa-clock-o ShowDefferCallCtrls' onclick='DeferCallctrls(this)' data-placement='bottom' style='font-size:22px; color:#616A6B; padding-left:11px;'></i></a>" +
            "<a data-toggle='Contact Customer'><i class='fa fa-address-book ContactCustomerCtrls' onclick='ContactCustomerCtrls(this)' data-placement='bottom'  style='font-size:21px;  color:#616A6B; padding-left:11px;'>                                                 </i></a>" +
            "<a data-toggle='Mark Duplicate'><i class='fa fa-clone MarkDuplicateCtrls' onclick='MarkDuplicateCtrls(this)' data-placement='bottom'  style='font-size:21px;  color:#616A6B; padding-left:11px;'>                                                 </i></a>" +
            "<a data-toggle='Collaborators'><i class='fa fa-users ShowCollaboratorCtrls' data-placement='bottom' onclick='ShowCollaboratorCtrls(this)' style='font-size:19px;  color:#616A6B; padding-left:11px;'>                                                       </i></a>" +
            "<div class='popover_content_wrapper3' style='display:none; float:left; data-placement=bottom' id='ShowRemarksDiv'></div>" +
            "<div class='popover_content_wrapper4' style='display:none; margin-top:0px; padding-top:0px' id='ShowCollaboratorsCtrlsDiv'><span class='close' onclick='popoverClose();' style=' font-size:15px; text-align:right; padding-left:15px;padding-bottom:15px;'> &times; </span><a  onclick='AddCollaborator(this);' style='color:#222223; cursor:pointer; font-size:11.25px;margin-left: 5px;'><i class='fa fa-plus' style='font-size:17px; opacity:1; color:#616A6B; padding-top:10px; padding-right:8px; margin-left:5x;'></i>&nbsp; Add Collaborators  </a> </br>   <hr style='margin-top: 4px; margin-bottom: 3px; width: 160px;border-top-width: 2px;margin-left: 0px;'><a onclick='ShowCollaborators(this);' class='ViewCollaborator' style='color:#222223; cursor:pointer; font-size:11.25px' ><i class='fa fa-eye' style='font-size:16px; color:#616A6B; opacity:1;margin-left: 5px;'></i>&nbsp; View Collaborators</a></div>" +
            "<div class='popover_content_wrapper5' style='display:none; z-index:12; width:70px; margin-top:0px; padding-top:0px' id='ContactCustomerCtrlsDiv'><span class='close' onclick='popoverClose();' style=' font-size:15px; text-align:right; padding-left:15px;padding-bottom:15px;'> &times; </span><a  onclick='MsgToCustomer(this)'style='color:#222223; cursor:pointer; font-size:11.25px; margin-left: 5px;font-family: verdana,arial,sans-serif;'>   <i class='fa fa-mobile' style='font-size:27px;padding-left: 3px; color:#616A6B;z-index:12;opacity: 1; padding-right:4px;'></i>&nbsp; Message To Customer</a> </br>   <hr style='margin-top: 4px; margin-bottom: 3px; width: 180px;border-top-width: 2px;margin-left: 0px;'><a  onclick='MailToCustomer(this);' style='color:#222223; z-index:12;cursor:pointer; font-size:11.25px' ><i class='fa fa-envelope-o' style='font-size:17px; padding-right: 1px; opacity:1; color:#616A6B;z-index:12;margin-left: 7px;'></i>&nbsp; Mail To Customer</a> </div> " +
            "<div class='popover_content_wrapper6' style='display:none; z-index:12; width:70px; margin-top:0px; padding-top:0px' id='MarkDuplicateCtrlsDiv'><span class='close' onclick='popoverClose();' style=' font-size:15px; text-align:right; padding-left:15px;padding-bottom:15px;'> &times; </span> <span>Call Id <form > <input class='TxtCallId' type='text' style='width:150px; color:black' /><div class='btn btn-success DateBtn' onclick='SubmitMarkAsDuplicate(this)' style='padding: 2px 5px 1px 5px; margin-bottom: 5px;'><i class='glyphicon glyphicon-ok'></i></div></form></span </div> " +
            "<div class='popover_content_wrapper7' style='display:none; z-index:12; width:70px; margin-top:0px; padding-top:0px' id='ShowDefferCallControlDiv'><span class='close' onclick='popoverClose();' style=' font-size:15px; text-align:right; padding-left:15px;padding-bottom:15px;'> &times; </span>     <div class='col-md-12' style='height: 55px;margin-top: 10px;padding-left:0px;'>Date <input id='NextActionDate' name='NextActionDate' class='NextActionDate col-md-9' type='datetime-local' style='width:180px; color:black; margin-top: 5px;margin-right: 5px;padding-left: 5px;' /><div class='col-md-3 btn btn-success DateBtn' id='DefferDate' onclick='defferCallSubmit(this)' style='padding-top: 2px;padding-bottom: 0px;padding-right: 5px;padding-left: 5px;width: 28px;'><i class='glyphicon glyphicon-ok' class='IconClose'></i></div></div></div> ")
            );
        div.append(MoreDetailsdiv);
        var Maindivid = "#" + "MainDiv-" + item.CRMLead_key;
        //var engStatus = "#eng-" + item.P_issuesfilegst
        //var loggedUser = $("#LoggedUser").val();
        //if ((item.EngageStatus.includes("Locked")) && (item.EngageStatus.indexOf(loggedUser) == -1)) {
        //    $(Maindivid).find(".MoreDetails").addClass("disabledbutton")
        //    $(engStatus).addClass("alert-warning")
        //}
        if (item.IsDeffered == "Y") {

            $(Maindivid).css("background-color", "#cfcccc")
            $(Maindivid).css("color", "black")
            var ctrldivid = "#" + item.Issuesfilegstkey;
            $(Maindivid).find(".MoreDetails").css("background-color", "#cfcccc")

        }
        else if (item.TextTaskStatus == "Deffered") {
            var Maindivid = "#" + "MainDiv-" + item.Issuesfilegstkey;
            $(Maindivid).css("background-color", "rgb(243, 102, 99)")
            $(Maindivid).css("color", "white")
            var ctrldivid = "#" + item.Issuesfilegstkey;
            $(ctrldivid).css("background-color", "rgb(243, 102, 99)")
            $(Maindivid).find(".MoreDetails").css("background-color", "rgb(243, 102, 99)")
        }

        //if (item.EngageStatus != "") {
        //    $(engStatus).css('display', 'block');
        //} else {
        //    $(engStatus).css('display', 'none');
        //}


        $('.ShowRemark').popover({
            html: true,
            trigger: 'manual',
            content: function () {
                return $('.popover_content_wrapper3').html();
            }
        })

        $('.MarkDuplicateCtrls').popover({
            html: true,
            trigger: 'manual',
            content: function () {
                return $('.popover_content_wrapper6').html();
            }
        })

        $('.ShowCallEngageCtrls').popover({
            html: true,
            trigger: 'manual',
            content: function () {
                return $('.popover_content_wrapper8').html();
            }
        })

        $('.ShowCollaboratorCtrls').popover({
            html: true,
            trigger: 'manual',
            content: function () {
                return $('.popover_content_wrapper4').html();
            }
        })

        $('.ContactCustomerCtrls').popover({
            html: true,
            trigger: 'manual',
            content: function () {
                return $('.popover_content_wrapper5').html();
            }
        })
        $('.ShowDefferCallCtrls').popover({
            html: true,
            trigger: 'manual',
            content: function () {
                return $('.popover_content_wrapper7').html();
            }
        })

    });
    if (data.data.length == "") {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $('#loading').addClass('clickable');
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
    }

}

$(document).ready(function () {
    var d = $("#fvalue").val();
    var m = [];
    m = d.split("|");
    var l;
    for (i = 0; i <= m.length - 1; i = i + 1) {
        l = m[i].split("~");
        var dropdown = $("#filter");
        $('#filter').append($('<option>', {
            value: l[1] + ":" + l[2],
            text: l[0]
        }));
    };
    $('a').tooltip();
    var a = 1;
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 50 }
    var SelectedRows = "";
    //GetEmployeeData(a, 0, t);
    sessionStorage.setItem("search", null);
    setInterval(ReloadGrid(), 15 * 60 * 1000);//setting Interval of 15 minutes by which every 15 minutes grid is getting refresh.
    $("#Prev").on("click", function () {
        var a = sessionStorage.getItem("PageSize");
        var b = sessionStorage.getItem("search");
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem("order");
        var total = sessionStorage.getItem("Total");
        if (o != undefined && o != "null") {
            order = o.split(":");
            var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
            ordervalue = $(orderid).text();
            o = order[1] + "~" + ordervalue + "~" + order[2];
            JSON.stringify(o);
        }
        if (a != null) { d = (d - a) - 1; } else { d = (d - 40) - 1; }
        $("#example div").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d >= 0) {
            $.post('/Sales/AjaxGetPendingCRMLead', { id: "", start: d, pSize: a, search: b, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });
    $("#Next").on("click", function () {
        var total = sessionStorage.getItem("Total");
        var a = sessionStorage.getItem("PageSize");
        var c = sessionStorage.getItem("search");
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem("order");
        if (o != undefined && o != "null") {
            order = o.split(":");
            var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
            ordervalue = $(orderid).text();
            o = order[1] + "~" + ordervalue + "~" + order[2];
            JSON.stringify(o);
        }
        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 40 - 1; }
        $("#example div").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/Sales/AjaxGetPendingCRMLead', { id: "", start: d, pSize: a, search: c, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });


    $("#assignto").on("change", function () {
        var text = $("#assignto option:selected").text();
        var value = $("#assignto").val();
        var col = "assignedto";
        var search = value + "," + col + ":integer";

        JSON.stringify(search);
        sessionStorage.setItem("search", search);
        var pSize = sessionStorage.getItem("PageSize");
        $("#example div").remove();
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Sales/AjaxGetPendingCRMLead',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $("#fText").text(text);
                    $("#FilterText").show();
                    $(".filterDiv").css("display", "none")
                    sessionStorage.setItem("Total", data.recordsTotal);
                    loadData(data);
                }
            },
            error: function (data) {
                alert("Failed");
            }
        });
    });
    //for filtering on hometown
    $("#HomeTownfilter").submit(function () {
        //$('#ModelHomeTownFilter').modal('toggle');
        $('#ModelHomeTownFilter .close').click()
        var m = document.getElementById("homeTown");
        if (m.value != 0 || m.value != "undefined") {
            var hometown = document.getElementsByName("searchString");
            var empName = hometown["0"].value;
            var col = "HomeTown";
            var search = m.value + "," + col + ":integer";
            JSON.stringify(search);
            var pSize = sessionStorage.getItem("PageSize");
            alert(search);
            $("tbody").empty();
            $("#loading").show();
            $('#loadingmessage').show();
            gf1 = "HomeTown";
            $.ajax({
                url: '/Sales/AjaxGetPendingCRMLead',
                type: "POST",
                data: { start: 0, pSize: pSize, search: search },
                success: function (data) {
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    else {
                        $("#fText").text(empName);
                        $("#FilterText").show();
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
    });


    $(function () {

        //Added by Shweta
        $(".btn-ExportToExcel").click(function () {
            $(".LoaderOverlay").show();
            var $buttonClicked = $(this);

            $.ajax({
                //  type: "GET",
                url: "/CRM/ExportToExcel",
                //    contentType: "application/json; charset=utf-8",
                //    datatype: "json",
                //    data: {},
                success: function (data) {
                    //        debugger;
                    //      //  $('#MailCustomerContent').html(data);
                    //     //   $('#MailToCustomer').modal(options);
                    //        //    $('#MailToCustomer').modal('show');
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    else {
                        $(".LoaderOverlay").hide();
                    }
                },
                error: function () {
                    //        //$('#NoRow').modal(options);
                    //        //var Mtitle = "Select a Row";
                    //        //$('.modal-title').text(Mtitle);
                    //        //$('#NoRow').modal('show');
                    $(".LoaderOverlay").hide();
                }
            });
        });



        $("#AssignedtoForm").submit(function () {
            $('#Assignedto').modal('hide');

        });


        $("#closbtn").click(function () {
            debugger;
            $('#myModal').modal('hide');
        });
    });


    $("#filter").on("change", function () {
        var a = $("#filter").val();
        $(".filterDiv").css("display", "none")
        if (a != "0" && a != "1") {
            b = a.split(":");
            if (b[0] == 2) {
                var a = document.getElementById("dateC")
                a.style.display = "";
            } else if (b[0] == 3 || b[0] == 5 || b[0] == 9) {
                $("#TextC").css("display", "");
            } else if (b[0] == 6) {
                var a = document.getElementById("IssueC")
                a.style.display = "";
            }
            else if (b[0] == 4) {
                var a = document.getElementById("DealerC")
                a.style.display = "";
            }
            else if (b[0] == 7) {
                var a = document.getElementById("assigntoC")
                a.style.display = "";
            }
            else if (b[0] == 8) {
                $("#TextC").css("display", "");
            }
        }
    });
});


function removeFilter() {
    $(".filterDiv").css("display", "none")
    $("#P_dealers").val(0);
    $("#IssueFilter").val(0);
    $("#assignto").val(0);
    $("#filter").val(0);
    $("#filterText").val("");
    $("#min").val("");
    $("#max").val("");
}

function DoSearch() {
    var ValueToSearch = $("#filterText").val().trim();
    var filterSelected = $("#filter").val();
    var filter = filterSelected.split(":")
    var col = ""
    var search = ""
    if ($("#filterText").val() != "" || $("#filterText").val() != "undefined") {
        if (filter[0] == 3) {
            value = $("#filterText").val();
            col = "Topic";
            search = ValueToSearch + "," + col + ":string";
        }
        if (filter[0] == 6) {
            value = $("#filterText").val();
            col = "Location";
            search = ValueToSearch + "," + col + ":string";
        }
        if (filter[0] == 8) {
            value = $("#filterText").val();
            col = "P_crmlead";
            search = ValueToSearch + "," + col + ":integer";
        }
        if (filter[0] == 9) {
            value = $("#filterText").val();
            col = "Mobileno";
            search = ValueToSearch + "," + col + ":string";
        }
        JSON.stringify(search);
        sessionStorage.setItem("search", search);
        var pSize = sessionStorage.getItem("PageSize");
        $("#example div").remove();
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/Sales/AjaxGetPendingCRMLead',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $(".filterDiv").css("display", "none")
                    $("#fText").text(ValueToSearch);
                    $("#FilterText").show();
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

    value1 = $("#min").val();
    value2 = $("#max").val();
    col = "registerdate";
    search = value1 + "," + value2 + "," + col + ":date";

    JSON.stringify(search);
    sessionStorage.setItem("search", search);
    var pSize = sessionStorage.getItem("PageSize");
    $("#example div").remove();
    $("#loading").show();
    $('#loadingmessage').show();

    $.ajax({
        url: '/Sales/AjaxGetPendingCRMLead',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                // $("#fText").text(value);
                // $("#FilterText").show();
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        },
        error: function (data) {
            alert("Failed");
        }
    });


}

function hoverId(ctrl) {
    // $(ctrl).find('.MoreDetails').show()
    if (popOverOpen == true) {
        $(".MoreDetails").not(CurrentHoverRowId).hide;
    } else {
        $(ctrl).find('.MoreDetails').show();
        $(ctrl).find('.MoreDetails').css("display", "inline-flex");
    }
}

function hoverNot(ctrl) {
    $('.MoreDetails').hide();
    if (popOverOpen == true) {
        $(CurrentHoverRowId).find('.MoreDetails').show();
    }
}

function ShowCollaboratorCtrls(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    CurrentHoverRowId = Rowid;
    $(".ShowCollaboratorCtrls").popover('toggle');
    $(".ShowCollaboratorCtrlsDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })

    // Popover Grid
    $('.ShowCollaboratorCtrls').not(ctrl).popover('hide');
    $('.popover.fade.right.in').css('width', '180px');
    $('.popover.fade.right.in').css('left', '30px');
    $('.popover.fade.right.in').css('top', '40px');
    $('.popover.fade.right.in').css('max-width', 'none');
    $('.arrow').css('top', '-11px');
    $('.popover-content').css('width', '190px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-top', '3px');

    event.preventDefault();
}

function GetEmployeeData(pageNumber, start, PSize) {
    $('#loading').show();
    $('#loadingmessage').show();
    $.ajax({
        type: "POST",
        url: "/Sales/AjaxGetPendingCRMLead",
        data: { id: "", start: start, pSize: PSize },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                debugger;
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });
}
function ContactCustomerCtrls(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    CurrentHoverRowId = Rowid;
    $(".ContactCustomerCtrls").popover('toggle');
    $(".ContactCustomerCtrlsDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })

    // Popover Grid
    $('.ContactCustomerCtrls').not(ctrl).popover('hide');
    $('.popover.fade.right.in').css('width', '190px');
    $('.popover.fade.right.in').css('left', '30px');
    $('.popover.fade.right.in').css('top', '40px');
    $('.popover.fade.right.in').css('max-width', 'none');
    $('.arrow').css('top', '-11px');
    $('.popover-content').css('width', '209px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-top', '3px');



    event.preventDefault();

}
function MarkDuplicateCtrls(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    CurrentHoverRowId = Rowid;
    $(".MarkDuplicateCtrls").popover('toggle');
    $(".MarkDuplicateCtrlsDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })

    // Popover Grid
    $('.MarkDuplicateCtrls').not(ctrl).popover('hide');
    $('.popover.fade.right.in').css('width', '225px');
    $('.popover.fade.right.in').css('left', '30px');
    $('.popover.fade.right.in').css('top', '40px');
    $('.popover.fade.right.in').css('max-width', 'none');
    $('.arrow').css('top', '-11px');
    $('.arrow').css('left', '40%');
    $('.popover-content').css('width', '225px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-top', '3px');




    event.preventDefault();

}

// function to close button on popover
function popoverClose() {
    popOverOpen = false
    $('.popover').hide();
    $('.MoreDetails').popover('hide');
    $("#ShowSubTaskControlDiv").popover('hide');
    $(".ShowRemark").popover('hide');
}

function AddCollaborator(ctrl) {
    var id = $(ctrl).parent().parent().parent().parent()[0].id;
    popOverOpen = false
    var Rowid = "#tr-" + id;
    var TaskPid = '';
    if ($(Rowid).parent().hasClass("red")) {
        TaskPid = $(Rowid).children(1)[2].innerText;
    } else {
        TaskPid = $(Rowid).children(1)[1].innerText;
    }

    $('#CallCollaborators #PCall').val(TaskPid);

    $('#CallCollaborators').modal(options);
    $('#CallCollaborators').modal('show');

}
//$('["data-toggle"]').data - toggle();

function ShowLinkAccountModal(CallId) {
    $("#LinkAccountCallId").val(CallId);

    $('#LinkAccount').modal(options);
    $('#LinkAccount').modal('show');
}
// Function to fetch msg based on selected MsgTemplateId
function onTemplateChange(value, id) {

    if (value != 0) {
        $.ajax({
            url: '/CRM/GetMessageTemplateText',
            type: "POST",
            data: { TempId: value },
            success: function (data) {
                if (data != "") {
                    $("#T").val(data);
                }
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                
            },
            error: function () {
                $('#CallClosedContent').html();
                $('#CallClosed').modal(options);
                var Mtitle = "An error occured.Please try again later!"
                $('.modal-title').text(Mtitle);
                $('#CallClosed').modal('show');
            }
        });

    }

}
function CallClose(id) {
    popOverOpen = false
    var RowId = "#tr-" + id
    var CustName = ""
    var CallId = ""
    if ($(RowId).parent().hasClass("red")) {
        CustName = $(RowId).children(1)[4].innerText;
        CallId = $(RowId).children(1)[2].innerText;
    } else {
        CustName = $(RowId).children(1)[3].innerText;
        CallId = $(RowId).children(1)[1].innerText;
    }
    var hasRemarkid = "#HasRemark-" + id
    var hasRemarkValue = $(hasRemarkid).val();
    if (hasRemarkValue === "Y") {
        $.ajax({
            type: "GET",
            url: "/Sales/CallClosed",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: { Pid: CallId },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                var Mtitle
                $('#CallClosedContent').html();
                $('#CallClosed').modal(options);
                $('#CallClosed').modal('show');

                if (data == "NoRemarkAfterLastCall") {
                    Mtitle = "There is no remark after Last Call.Please add remark to close call :" + "  " + CustName;
                    $('.modal-title').text(Mtitle);
                } else if (data == "CustomerNotLink") {
                    Mtitle = "Call is not linked to customer, please link customer , then close the call."
                    $('.modal-title').text(Mtitle);
                } else {
                    Mtitle = "Call Closed Successfully :" + "  " + CustName;
                    $('.modal-title').text(Mtitle);
                    var MainDivid = "#MainDiv-" + id
                    $(MainDivid).remove();
                    setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);
                }
            },
            error: function (data) {
                //Changed Shweta
                //alert("An error occured.Please try again later.");
                $('#CallClosedContent').html();
                $('#CallClosed').modal(options);
                var Mtitle = "Call is not linked to customer, please link customer , then close the call."
                $('.modal-title').text(Mtitle);
                $('#CallClosed').modal('show');

                //alert("An error occured.Please try again later.");
            }
        });
    } else {
        $('#CallClosedContent').html();
        $('#CallClosed').modal(options);
        var Mtitle = "Please add Remark to close Call!"
        $('.modal-title').text(Mtitle);
        $('#CallClosed').modal('show');
    }

}
function OnsiteVisit(id) {
    popOverOpen = false;
    var RowId = "#Onsite-" + id;
    var OnsiteCount = $(RowId).val();

    $("#Onsitevisit").text("Current Onsite Visits: " + OnsiteCount);
    $("#PCall1").val(id);
    $("#CalledFrom").val("ManageRegCalls");
    $('#OnsiteModal').modal(options);
    $('#OnsiteModal').modal('show');

}
function CallAssignTo(Callid) {
    popOverOpen = false
    $("#PCall").val(Callid);
    $('#Assignedto').modal(options);
    $('#Assignedto').modal('show');

}
function MailToDealer(ctrl) {
    var id = $(ctrl).parent()[0].id;
    popOverOpen = false;
    var RowId = "#tr-" + id
    var CustName = '';
    if ($(RowId).parent().hasClass("red")) {
        CustName = $(RowId).children(1)[4].innerText;
    } else {
        CustName = $(RowId).children(1)[3].innerText;
    }

    $("#issuesfilegstkeyMailTodealer").val(id);

    $('#MailToDealer').modal(options);
    var Mtitle = "Mail To Dealer: " + CustName;
    $('MailToDealer .modal-title').text(Mtitle);
    $('#MailToDealer').modal('show');

}
function MsgToCustomer(ctrl) {
    var id = $(ctrl).parent().parent().parent().parent()[0].id;
    popOverOpen = false;
    var RowId = "#tr-" + id
    var CustName = '';
    var PCall = '';
    var phone = '';
    if ($(RowId).parent().hasClass("red")) {
        CustName = $(RowId).children(1)[4].innerText;
        PCall = $(RowId).children(1)[2].innerText;
        phone = $(RowId).children(1)[6].innerText;
    } else {
        CustName = $(RowId).children(1)[3].innerText;
        PCall = $(RowId).children(1)[1].innerText;
        phone = $(RowId).children(1)[5].innerText;
    }
    $("#PCallMsgToCustomer").val(PCall);
    $("#Mobileno").val(phone);
    $("#firmNameMsgtoCustomer").val(CustName);
    $('#MsgCustomer').modal(options);
    var Mtitle = "Message to Customer: " + CustName;
    $('#MsgCustomer .modal-title').text(Mtitle);
    $('#MsgCustomer').modal('show');

}
function MailToCustomer(ctrl) {
    var id = $(ctrl).parent().parent().parent().parent()[0].id;

    popOverOpen = false;
    var CustName = '';
    var PCall = '';
    var RowId = "#tr-" + id
    if ($(RowId).parent().hasClass("red")) {
        CustName = $(RowId).children(1)[4].innerText;
        PCall = $(RowId).children(1)[2].innerText;
        email = $(RowId).children(1)[7].innerText;
    } else {
        CustName = $(RowId).children(1)[3].innerText;
        PCall = $(RowId).children(1)[1].innerText;
        email = $(RowId).children(1)[6].innerText;
    }

    $("#PCallMailToCustomer").val(PCall);
    $("#firmNameMailtoCustomer").val(CustName);
    $("#emailMailtoCustomer").val(email);
    $('#MailToCustomer').modal(options);
    var Mtitle = "Mail To Customer: " + CustName;
    $('.modal-title').text(Mtitle);
    $('#MailToCustomer').modal('show');

}

function AddRemark(id) {
    popOverOpen = false
    $('#Remarktextarea').val('');
    var Rowid = "#tr-" + id;
    var Callid = '';
    var firmname = '';

    if ($(Rowid).parent().hasClass("red")) {
        Callid = $(Rowid).children(1)[2].innerText;
        firmname = $(Rowid).children(1)[4].innerText;
    } else {
        Callid = $(Rowid).children(1)[1].innerText;
        firmname = $(Rowid).children(1)[3].innerText;
    }
    $('#CallIdForRemark').val(Callid);
    $('#Remark').modal(options);
    var Mtitle = "Firm Name :  " + firmname;
    $('#Remark .modal-title').text(Mtitle);
    $('#Remark').modal('show');
}

function engageStatus(id) {
    popOverOpen = false
    var Rowid = "#tr-" + id;
    var Callid = '';
    var firmname = '';

    if ($(Rowid).parent().hasClass("red")) {
        Callid = $(Rowid).children(1)[2].innerText;
        firmname = $(Rowid).children(1)[4].innerText;
    } else {
        Callid = $(Rowid).children(1)[1].innerText;
        firmname = $(Rowid).children(1)[3].innerText;
    }
    $('#callId').val(Callid);
    $('#EngageStatus').modal(options);
    var Mtitle = "Firm Name :  " + firmname;
    $('#EngageStatus .modal-title').text(Mtitle);
    $('#EngageStatus').modal('show');
}
//Function to show the controls of collaborator in popover
function DeferCallctrls(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    CurrentHoverRowId = Rowid;
    $(".ShowDefferCallCtrls").popover('toggle');
    $(".ShowDefferCallControlDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })
    // Popover Grid
    $('.ShowDefferCallCtrls').not(ctrl).popover('hide');
    $('.popover.fade.right.in').css('width', '280px');
    $('.popover.fade.right.in').css('height', '60px');
    $('.popover.fade.right.in').css('left', '-20px');
    $('.arrow').css('right', '-11px');
    $('.arrow').css('left', '130px');
    $('.popover-content').css('width', '245px');
    $('.popover-content').css('height', '68px');
    //$('.popover-content').css('margin-top', '10px');
    $('.popover-content').css('padding-top', '3px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-left', '9px');

    event.preventDefault();
}

function CallEngagectrls(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var Callid = '';

    if ($(Rowid).parent().hasClass("red")) {
        Callid = $(Rowid).children(1)[2].innerText;
    } else {
        Callid = $(Rowid).children(1)[1].innerText;
    }
    $('#callId').val(Callid);
    CurrentHoverRowId = Rowid;
    $(".ShowCallEngageCtrls").popover('toggle');
    $(".CallEngagaeControlDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })
    var selectid = "#callstatusInput-" + id;
    $(selectid).empty();
    $.ajax({
        type: "POST",
        url: "/Sales/CallEngageStatusList",
        data: { key: id },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            debugger;
            var select = $(Rowid).find(".callstatusInput");
            // $("#callstatusInput").append('<option value=0>Select Engage Status</option');
            $(select[0]).append('<option value=0>Select Engage Status</option');
            var a = 1;
            $.each(data.data, function (index, item) {
                $(select[0]).append('<option value=' + item.P_Infotable + '>' + item.NameOfInfo + '</option>');
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
    $('.ShowCallEngageCtrls').not(ctrl).popover('hide');
    $('.popover.fade.right.in').css('width', '280px');
    $('.popover.fade.right.in').css('height', '60px');
    $('.popover.fade.right.in').css('left', '-20px');
    $('.arrow').css('right', '-11px');
    $('.arrow').css('left', '100px');
    $('.popover-content').css('width', '210px');
    $('.popover-content').css('height', '68px');
    $('.popover-content').css('padding-top', '3px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-left', '9px');

    event.preventDefault();
}
function SubmitCallRemark(btnid) {
    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton")
    var formdata = new FormData(document.getElementById('RegForm'))
    var id = $('#CallIdForRemark').val();
    //Creating an XMLHttpRequest and sending
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/Sales/AddCallRemark');
    xhr.send(formdata);
    $('#Remark').modal("hide");
    // $(".LoaderOverlay").show();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var Mtitle = "Remark added Successfully.";
            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text(Mtitle);
            // $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
            $('#CallClosed').modal("show");
            $(btn).removeClass("disabledbutton")
            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
            var hasRemarkid = "#HasRemark-" + id
            $(hasRemarkid).val("Y");
            var parentid = "#MainDiv-" + id;
            $(parentid).removeClass("red");
            $(parentid).css("background-color", "white");
            $(parentid).find(".MoreDetails").css("background-color", "white");
            var moredetails = "#" + id;
            $(moredetails).css("background-color", "white");
            $(parentid).css("color", "black");

        }
    }
    return false;
}

function SubmitCallAssignTo(btnid) {
    var empId = $("#Employee").val();
    var Callid = $('#PCall').val();
    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton");
    $('#Assignedto').modal("hide");
    $.ajax({
        type: "POST",
        url: "/Sales/CallAssignedTo",
        data: { Callid: Callid, empId: empId },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
           
            debugger;

            var Mtitle = "Call assigned Successfully.";

            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text(Mtitle);

            $('#CallClosed').modal("show");
            $("#Employee").val("");
            $('#PCall').val("");
            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "Select a Row";
            $('#NoRow .modal-title').text(Mtitle);
            $('.modal-title').css('text-align', 'center');
            $('#NoRow').modal('show');
        }
    });
    $(btn).removeClass("disabledbutton")
}

function SubmitMarkAsDuplicate(ctrl) {
    var Rowid1 = $(ctrl).parent().parent().parent().parent().parent().parent()[0].id;
    var hasRemarkid = "#HasRemark-" + Rowid1
    var hasRemarkValue = $(hasRemarkid).val();
    var rowid = "#tr-" + Rowid1
    $(ctrl).addClass("disabledbutton")

    var Callid = $(rowid).find(".TxtCallId").val();
    if (Callid != "" || Callid != "undefined") {
        //var PMainRow = "#P-" + Callid;
        //var MainRowId = $(PMainRow).val();
        //var MainRowKey = "#tr-" + MainRowId;
        //if ($(MainRowKey).parent().hasClass("red")) {
        //    var firmname = $(MainRowKey).children(1)[4].innerText;
        //} else {
        //    var firmname = $(MainRowKey).children(1)[3].innerText;
        //}
        //firmname="";
        AjaxCallMarkAsDuplicate(Callid, Rowid1, hasRemarkValue)
    }
    popoverClose();
    $(ctrl).removeClass("disabledbutton")

}
function AjaxCallMarkAsDuplicate(CallidText, CallKeytoDuplicate, hasRemark) {
    if (hasRemark === "Y") {
        $.ajax({
            url: '/CRM/CallMarkAsDuplicate',
            type: "POST",
            data: { MainCallid: CallidText, DuplicateCallkey: CallKeytoDuplicate, calltype: "L" },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }

                if (data == "NoRemarkAfterLastCall") {
                    $('#CallClosedContent').html();
                    $('#CallClosed').modal(options);
                    var Mtitle = "There is no remark after Last Call from Customer. Please put remark!"
                    $('.modal-title').text(Mtitle);
                    $('#CallClosed').modal('show');
                } else {
                    $('#CallClosedContent').html();
                    $('#CallClosed').modal(options);
                    var Mtitle = "Call Marked as Duplicate!"
                    $('.modal-title').text(Mtitle);
                    $('#CallClosed').modal('show');
                    setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);
                }
            },
            error: function () {
                $('#CallClosedContent').html();
                $('#CallClosed').modal(options);
                var Mtitle = "An error occured.Please try again later!"
                $('.modal-title').text(Mtitle);
                $('#CallClosed').modal('show');
            }
        });

    } else {
        $('#CallClosedContent').html();
        $('#CallClosed').modal(options);
        var Mtitle = "Add remark first then Mark as duplicate!"
        $('.modal-title').text(Mtitle);
        $('#CallClosed').modal('show');
    }
    var rowid = "#tr-" + CallKeytoDuplicate;
    $(rowid).find(".TxtCallId").val("");
}
//Show remarks of a task when clicking on the icon
function ViewRemarks(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var Callid = $(Rowid).children(1)[1].innerText;
    CurrentHoverRowId = Rowid;
    // Popover Grid
    $("#ShowRemarksDiv div").remove();
    $(".popover-content div").empty();
    var morediv = $("#ShowRemarksDiv");
    var more = $("<div class='col-md-12' style='display:flex; position:absolute; padding-right: 0px; z-index:10; margin-bottom:40px; width:665px; height:30px; color: #325faf; padding-left:0px; background-color:white;' id='SRTitle'  class='col-md-12'></div>");
    more.html(("<div class='col-md-1' style='text-align:center; padding-top:10px; margin-bottom:5px; padding-left: 0px;'><b>Sno.</b></div>")
      + " " + ("<div class='col-md-3' style='padding-left: 0px;padding-top: 10px;margin-bottom: 5px;padding-right: 50px; text-align:center;'><b>Remark</b></div>")
      + " " + ("<div class='col-md-2' style='text-align: center;padding-top: 10px;margin-bottom: 5px;padding-right: 20px;padding-left: 0px;width: 100px;' > <b>Comm. type</b> </div>")
     + " " + ("<div class='col-md-3' style='text-align: center;padding-top: 10px;margin-bottom: 5px;padding-right: 50px;' ><b>Date</b> </div>")
         + " " + ("<div class='col-md-2' style='padding-left: 0px; text-align:right; padding-top: 10px; margin-bottom: 5px;padding-right:10px;' > <b>Created By</b> </div>")
            + " " + ("<div class='col-md-1' style='margin-top:5px;padding-right: 0px;'> <span class='close' onclick='popoverClose();' style='padding-left: 10px;padding-bottom: 10px; font-size:18px'> &times; </span> </div>")
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
        url: "/Sales/AddRemarkData",
        data: { key: Callid },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            
            debugger;

            $(".popover-content").css("height", "200px")
            $(".popover-content").css("overflow-y", "scroll")
            //loadData1(data);
            var tblEmployee1 = $(".popover-content");
            //$(".popover-content #LoadingData").css('display', 'none');
            var a = 1;
            $.each(data.data, function (index, item) {
                var m = (a) + index;
                var more1 = $("<div class='col-md-12'  style='display:flex;margin-bottom:10px;color:black; padding-left:0px' id='" + item.CRMCommunication_key + "'  class='col-md-12'>" + m + "</div>");
                more1.html(("<div class='col-md-1' style='margin-left: 0px; padding-left: 10px;padding-right: 18px;'>" + m + "</div>")
                 + " " + ("<div class='col-md-3' style='width: 215px; padding-left:5px; text-align:left;padding-right:25px;' >" + item.Commtext + "</div>")
                 + " " + ("<div class='col-md-4' style='width: 130px; padding-left: 0px; padding-right: 0px; text-align:center;'  >" + item.TextCommunicationType + " </div>")
                 + " " + ("<div class='col-md-2' style='padding-left: 0px; width: 200px; padding-right: 10px;text-align: right;'>" + item.FrmtCreationDate + " </div>")
                 + " " + ("<div class='col-md-2' style='width:180px; padding-left:0px; text-align:right; padding-right:0px'>" + item.TextLogincode + "</div><div class='col-md-1'></div>")
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
    $('.popover.fade.left.in').css('max-width', '700px');
    $('.popover.fade.left.in').css('left', '-700px');
    $('.popover.fade.left.in').css('background-color', 'white');
    $('.popover.fade.left.in').css('top', '10px');
    $('.arrow').css('top', '13px');
    $('.popover-content').css('width', '698px');
    $('.popover-content').css('padding-top', '0px');
    $('.popover-content').css('overflow-y', 'scroll');


    event.preventDefault();
}

function SubmitLinkAccount(btnid) {
    var P_crmaccounts = $("#P_CRMAccounts").val();
    var CallId = $("#LinkAccountCallId").val();
    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton")
    $.ajax({
        type: "POST",
        url: "/Sales/LinkAccount",
        data: { CallId: CallId, P_crmaccounts: P_crmaccounts },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            
            debugger;
            $('#LinkCustomer').modal("hide");
            $(btn).removeClass("disabledbutton");
            var Mtitle = "Customer is linked Successfully.";
            $("#P_CRMAccounts").val("");
            $("#LinkAccountCallId").val("");
            $("#AccountName1").val("");

            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text(Mtitle);
            // $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
            $('#CallClosed').modal("show");

            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "Select a Row";
            $('#NoRow .modal-title').text(Mtitle);
            $('.modal-title').css('text-align', 'center');
            $('#NoRow').modal('show');
        }
    });
    $(btn).removeClass("disabledbutton")
}

function deleteCollaborator(id) {
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
            else {
                $('#ViewCollaborator').modal('hide');
                var Mtitle = "Collaborator deleted Successfully";

                $('#CallClosedContent').html('');
                $('#CallClosed').modal(options);
                $('#CallClosed .modal-title').text(Mtitle);
                // $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
                $('#CallClosed').modal("show");

                setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
            }
        },
        error: function () {
            alert("error")
        }
    });

}
function SubmitMsgToCustomer(btnid) {
    var Pcall = $("#PCallMsgToCustomer").val();
    var MobNo = $("#Mobileno").val();
    var PhoneMsg = $("#T").val();
    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton")
    $('#MsgCustomer').modal("hide");
    $.ajax({
        type: "POST",
        url: "/CRM/MsgToCustomer",
        data: { PCall: Pcall, MobNo: MobNo, Message: PhoneMsg, calltype: 'L' },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                debugger;

                var Mtitle = "Message is sent to Customer.";

                $('#CallClosedContent').html('');
                $('#CallClosed').modal(options);
                $('#CallClosed .modal-title').text(Mtitle);
                // $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
                $('#CallClosed').modal("show");
                $("#T").val("");
                $("#Mobileno").val("");
                $("#PCallMsgToCustomer").val("");
                setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
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
    $(btn).removeClass("disabledbutton")
}
function SubmitMailToCustomer(btnid) {
    var Pcall = $("#PCallMailToCustomer").val();
    var email = $("#emailMailtoCustomer").val();
    var Msg = $("#msgMailToCustomer").val();
    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton");
    $('#MailToCustomer').modal("hide");
    $.ajax({
        type: "POST",
        url: "/CRM/MailToCustomer",
        data: { PCall: Pcall, EmailId: email, Message: Msg, calltype: 'L' },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            
            debugger;

            var Mtitle = "Email is sent to Customer.";

            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text(Mtitle);
            // $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
            $('#CallClosed').modal("show");
            $("#PCallMailToCustomer").val("");
            $("#firmNameMailtoCustomer").val("");
            $("#emailMailtoCustomer").val("");
            $("#msgMailToCustomer").val("");
            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "Select a Row";
            $('#NoRow .modal-title').text(Mtitle);
            $('.modal-title').css('text-align', 'center');
            $('#NoRow').modal('show');
        }
    });
    $(btn).removeClass("disabledbutton")
}
function submitCallCollaborator(btnid) {
    var Pcall = $("#CallCollaborators #PCall").val();
    var collabId = $("#collaboratorId").val();
    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton")
    $('#CallCollaborators').modal("hide");
    $.ajax({
        type: "POST",
        url: "/CRM/AddCallCollaborators",
        data: { PCall: Pcall, collaboratorId: collabId, calltype: "L" },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
           
            debugger;

            var Mtitle = "Collaborator added successfully.";

            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text(Mtitle);
            // $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
            $('#CallClosed').modal("show");
            $("#CallCollaborators #PCall").val("");
            $("#collaboratorId").val("");
            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "Select a Row";
            $('#NoRow .modal-title').text(Mtitle);
            $('.modal-title').css('text-align', 'center');
            $('#NoRow').modal('show');
        }
    });
    popoverClose();
    $(btn).removeClass("disabledbutton")
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
            },
            error: function () {
                $('#NoRow').modal(options);
                var Mtitle = "An error Occured! Please try again";
                $('#NoRow .modal-title').text(Mtitle);
                $('.modal-title').css('text-align', 'center');
                $('#NoRow').modal('show');
            }
        });
    }
    popoverClose();
    $(ctrl).removeClass("disabledbutton");
}

function submitOnsiteVisit(btnid) {
    var Pcall = $("#PCall1").val();
    var btn = "#" + btnid;
    $(btn).addClass("disabledbutton");
    $('#OnsiteModal').modal("hide");
    $.ajax({
        type: "POST",
        url: "/CRM/OnsiteVisit",
        data: { PCall: Pcall },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
           
            debugger;

            var Mtitle = "Visit added successfully.";

            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text(Mtitle);
            // $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
            $('#CallClosed').modal("show");

            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
        },
        error: function () {
            $('#NoRow').modal(options);
            var Mtitle = "An Error Occured. Please try again Later";
            $('#NoRow .modal-title').text(Mtitle);
            $('.modal-title').css('text-align', 'center');
            $('#NoRow').modal('show');
        }
    });
    $(btn).removeClass("disabledbutton");
}
function defferCallSubmit(ctrl) {
    var rid = $(ctrl).parent().parent().parent().parent().parent().parent()[0].id;
    $(ctrl).addClass("disabledbutton");
    popoverClose();
    var id = rid.split("-")
    var rowid = "#" + rid
    var CallId = ""
    if ($(rowid).parent().hasClass("red")) {
        CallId = $(rowid).children(1)[2].innerText;
    } else {
        CallId = $(rowid).children(1)[1].innerText;
    }

    var NextDate = $(rowid).find(".NextActionDate").val();
    if (NextDate != undefined && NextDate != "") {

        $.ajax({
            type: "GET",
            url: "/CRM/DefferCalls",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: { Callid: CallId, NextActionDate: NextDate, calltype: "L" },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
               
                if (data == "") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                else {
                    $('#CallClosedContent').html();
                    $('#CallClosed').modal(options);
                    var Mtitle = "Call Deffered Successfully"
                    $('.modal-title').text(Mtitle);
                    $('#CallClosed').modal('show');
                    setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);
                }
            },
            error: function () {
                $('#CallClosedContent').html();
                $('#CallClosed').modal(options);
                var Mtitle = "An error Occured.Please try again."
                $('.modal-title').text(Mtitle);
                $('#CallClosed').modal('show');
            }
        });
    } else {
        $('#CallClosedContent').html();
        $('#CallClosed').modal(options);
        var Mtitle = "Please enter dateTime."
        $('.modal-title').text(Mtitle);
        $('#CallClosed').modal('show');
    }
    $(ctrl).removeClass("disabledbutton");

}
function ShowCollaborators(ctrl) {

    var id = $(ctrl).parent().parent().parent().parent()[0].id;
    var Rowid = "#tr-" + id;
    var CallPid = $(Rowid).children(1)[1].innerText;
    if ($(Rowid).parent().hasClass("red")) {
        CallPid = $(Rowid).children(1)[2].innerText;
    } else {
        CallPid = $(Rowid).children(1)[1].innerText;
    }


    $.ajax({
        type: "POST",
        url: "/CRM/AddCallCollaboratorsData",
        data: { CallId: CallPid, calltype: "L" },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            debugger;
            //loadData1(data);

            var tblEmployee1 = $("#ShowCollaborators");
            $("#ShowCollaborators").empty();
            //$(".popover-content #LoadingData").css('display', 'none');
            var a = 1;
            $.each(data.data, function (index, item) {
                var m = (a) + index;

                var more1 = $("<div style='display:flex; height:20px; margin-bottom:10px; padding-left:0px' id='" + item.CRMCollaborator_key + "'  class='col-md-12 body'>" + m + "</div>");
                more1.html(("<div class='col-md-2 ViewcollaboratorsSno ' style='text-align: center;'>" + m + "</div>")
                             + " " + ("<div class='col-md-8 ViewcollaboratorsEmpName' style='text-align:center;' >" + item.TxtCollaborator + "</div>")
                             + " " + ("<div class='col-md-2 ViewcollaboratorsClose' style='padding-right: 0px;padding-left: 30px;' ><a class='' id='" + item.CRMCollaborator_key + "' onclick='deleteCollaborator(this.id)' style='cursor: pointer;'><i class='glyphicon glyphicon-remove'></i></a></div>")
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
function ReloadGrid() {
    removeFilter();
    $("#example div").remove();
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 40 }
    GetEmployeeData(1, 0, 40);
    $("#fText").text("");
    $("#FilterText").hide();
}

function PageSize() {
    var a = $("#size").val();
    sessionStorage.setItem("PageSize", a);
    $(".yy").hide();
    var b = sessionStorage.getItem("search");
    var o = sessionStorage.getItem("order");
    if (o != undefined && o != "null") {
        order = o.split(":");
        var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
        ordervalue = "";
        o = order[1] + "~" + ordervalue + "~" + order[2];
        JSON.stringify(o);
    }
    $("#example tbody tr").remove();
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $('#p').css("display", "none");

    $.post('/Sales/AjaxGetPendingCRMLead', { id: "", start: 1, pSize: a, search: b, order: o, ServerOrderValue: firmname }, function (data) {
        loadData(data);
    })
}
$('#example').on('contextmenu', 'div.parentdiv', function (e) {
    console.log("right clicked");
});
$(function () {
    /**************************************************
     * Custom Command Handler
     **************************************************/

    //For Customer Name Filter
    //$.contextMenu.types.CallEngagectrls = function (key, options, item, opt, root) {


    //    var RowId = "#tr-" + id;
    //    var CallId = '';

    //    if ($(item.$trigger[0]).hasClass("red")) {
    //        var id = item.$trigger[0].children[0].children[1].id
    //        var RowId = "#tr-" + id
    //        CallId = $(RowId).children(1)[2].innerText;
    //    } else {
    //        var id = item.$trigger[0].children[0].children[0].id
    //        var RowId = "#tr-" + id
    //        CallId = $(RowId).children(1)[1].innerText;
    //    }
    //    $('<span>Status'
    //    + '<select id="CallEngagectrls" name="CallEngagectrls"  style="width:180px; color:black"/><div class="btn btn-success DateBtn"  style="padding: 2px 5px 1px 5px; margin-bottom: 5px;"><i class="glyphicon glyphicon-ok"></i></div></form>')
    //                .appendTo(this)
    //           .on('click', '#CallEngagectrls', function () {

    //               var CallEngage = $("#CallEngagectrls").val();
    //               if (CallEngage != undefined && CallEngage != "") {

    //                   $('#callId').val(Callid);
    //                   CurrentHoverRowId = Rowid;
    //                   $(".ShowCallEngageCtrls").popover('toggle');
    //                   $(".CallEngagaeControlDiv").show();
    //                   $('.popover-dismiss').popover({
    //                       trigger: 'focus'
    //                   })
    //                   $("#callstatusInput").val('');
    //                   $.ajax({
    //                       type: "POST",
    //                       url: "/CRM/CallEngageStatusList",
    //                       data: { key: id },
    //                       success: function (data) {
    //                           if (data == "") {
    //                               window.location.href = "/Home/LogOut";
    //                               return true;
    //                           }
    //                           debugger;
    //                           var select = $("#callstatusInput");
    //                           $("#callstatusInput").append('<option value=0>Select Engage Status</option');

    //                           var a = 1;
    //                           $.each(data.data, function (index, item) {
    //                               $("#callstatusInput").append('<option value=' + item.P_Infotable + '>' + item.NameOfInfo + '</option>');
    //                           });

    //                           if (data.recordsTotal == 0) {
    //                               $(".popover-content #LoadingData").css('display', 'block');
    //                               $(".popover-content #LoadingData").text('No Data');
    //                           } else {
    //                               $(".popover-content #LoadingData").css('display', 'none');
    //                               $(".popover-content #LoadingData").text('');
    //                           }
    //                       }
    //                   });
    //               }


    //               this.addClass('labels').on('contextmenu:focus', function (e) {
    //                   // setup some awesome stuff
    //               }).on('contextmenu:blur', function (e) {
    //                   // tear down whatever you did
    //               }).on('keydown', function (e) {
    //                   // some funky key handling, maybe?
    //               })




    //           });
    //};
    $.contextMenu.types.input = function (key, options, item, opt, root) {
        // this === item.$node
        var Rowid1;
        if ($(item.$trigger[0]).hasClass("red")) {
            Rowid1 = item.$trigger[0].children[0].children[1].id//childNodes[0]//.id;

        } else {
            Rowid1 = item.$trigger[0].children[0].children[0].id//childNodes[0]//.id;           
        }

        var hasRemarkid = "#HasRemark-" + Rowid1
        var hasRemarkValue = $(hasRemarkid).val();
        $('<span>Call Id'
            + '<form  id="MarkAsDuplicate"> <input id="TxtCallId" name="TxtCallId" type="text" style="width:150px; color:black" /><div class="btn btn-success DateBtn" id="SubmitMarkAsDuplicate" style="padding: 2px 5px 1px 5px; margin-bottom: 5px;"><i class="glyphicon glyphicon-ok"></i></div></form>')
            .appendTo(this)
       .on('click', '#SubmitMarkAsDuplicate', function () {
           //alert("Clicked");
           // Session["taskId"].val;

           if ($("#TxtCallId").val() != "" || $("#TxtCallId").val() != "undefined") {
               var Callid = $("#TxtCallId").val();
               var PMainRow = "#P-" + Callid;
               var MainRowId = $(PMainRow).val();
               var MainRowKey = "#tr-" + MainRowId;
               if ($(MainRowKey).parent().hasClass("red")) {
                   var firmname = $(MainRowKey).children(1)[4].innerText;
               } else {
                   var firmname = $(MainRowKey).children(1)[3].innerText;
               }
               AjaxCallMarkAsDuplicate(Callid, Rowid1, hasRemarkValue, firmname)

           }
           return false;
       });

        this.addClass('labels').on('contextmenu:focus', function (e) {
            // setup some awesome stuff
        }).on('contextmenu:blur', function (e) {
            // tear down whatever you did
        }).on('keydown', function (e) {
            // some funky key handling, maybe?
        });

    };
    //For Customer Code Filter
    $.contextMenu.types.DefferCall1 = function (key, options, item, opt, root) {
        // this === item.$node
        //var Rowid1 = options.$trigger[0].cells[0].children[0].childNodes[0].id;
        var id;
        var RowId = "#tr-" + id
        var CallId = ""
        if ($(item.$trigger[0]).hasClass("red")) {
            var id = item.$trigger[0].children[0].children[1].id
            var RowId = "#tr-" + id
            CallId = $(RowId).children(1)[2].innerText;
        } else {
            var id = item.$trigger[0].children[0].children[0].id
            var RowId = "#tr-" + id
            CallId = $(RowId).children(1)[1].innerText;
        }
        $('<span>Date'
        + ' <input id="NextActionDateContext" name="NextActionDate" type="datetime-local" style="width:180px; color:black" /><div class="btn btn-success DateBtn" id="DefferDate" style="padding-top: 2px;padding-right: 7px;padding-bottom: 1px;padding-left: 7px;"><i class="glyphicon glyphicon-ok"></i></div>')
        .appendTo(this)
   .on('click', '#DefferDate', function () {
       var NextDate = $("#NextActionDateContext").val();
       if (NextDate != undefined && NextDate != "") {
           $.ajax({
               type: "GET",
               url: "/CRM/DefferCalls",
               contentType: "application/json; charset=utf-8",
               datatype: "json",
               data: { Callid: CallId, NextActionDate: NextDate, calltype: "L" },
               success: function (data) {
                   if (data.statusCode == 500) {
                       window.location.href = "/Home/Error";
                   }
                   
                   if (data == "") {
                       window.location.href = "/Home/LogOut";
                       return true;
                   }
                   else {
                       $('#CallClosedContent').html();
                       $('#CallClosed').modal(options);
                       var Mtitle = "Call Deffered Successfully"
                       $('.modal-title').text(Mtitle);
                       $('#CallClosed').modal('show');
                       setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);
                   }
               },
               error: function () {
                   $('#CallClosedContent').html();
                   $('#CallClosed').modal(options);
                   var Mtitle = "An error Occured.Please try again."
                   $('.modal-title').text(Mtitle);
                   $('#CallClosed').modal('show');
               }
           });
       } else {
           $('#CallClosedContent').html();
           $('#CallClosed').modal(options);
           var Mtitle = "Please enter dateTime."
           $('.modal-title').text(Mtitle);
           $('#CallClosed').modal('show');
       }
   });
        this.addClass('labels').on('contextmenu:focus', function (e) {
            // setup some awesome stuff
        }).on('contextmenu:blur', function (e) {
            // tear down whatever you did
        }).on('keydown', function (e) {
            // some funky key handling, maybe?
        });
    };

    $.contextMenu.types.CustomerName1 = function (key, options, item, opt, root) {
        // this === item.$node
        //var Rowid1 = options.$trigger[0].cells[0].children[0].childNodes[0].id;
        $('<span>Customer Name'
            + '<form  id="CustNameFilter"> <input id="TxtCustomerName" name="TxtCustomerName" type="text" style="width:150px; color:black" /><div class="btn btn-success DateBtn" id="SubmitCustName" style="padding: 2px 5px 1px 5px; margin-bottom: 5px";><i class="glyphicon glyphicon-ok"></i></div></form>')
            .appendTo(this)
       .on('click', '#SubmitCustName', function () {
           //alert("Clicked");
           // Session["taskId"].val;
           if ($("#TxtCustomerName").val() != "" || $("#TxtCustomerName").val() != "undefined") {
               var empName = $("#TxtCustomerName").val();
               var col = "Firmname";
               var search = empName + "," + col + ":string";
               JSON.stringify(search);
               sessionStorage.setItem("search", search);
               var pSize = sessionStorage.getItem("PageSize");
               $("#example div").remove();
               $("#loading").show();
               $('#loadingmessage').show();
               gf1 = "CustName";
               $.ajax({
                   url: '/Sales/AjaxGetPendingCRMLead',
                   type: "POST",
                   data: { start: 0, pSize: pSize, search: search },
                   success: function (data) {
                       if (data.statusCode == 500) {
                           window.location.href = "/Home/Error";
                       }
                       else {
                           $("#fText").text(empName);
                           $("#FilterText").show();
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
           $(".btn-success").attr("disabled", true);
           //  $("#DefferTask").submit();        //Commented by Shweta
       });
        this.addClass('labels').on('contextmenu:focus', function (e) {
            // setup some awesome stuff
        }).on('contextmenu:blur', function (e) {
            // tear down whatever you did
        }).on('keydown', function (e) {
            // some funky key handling, maybe?
        });
    };

    $.contextMenu.types.Location = function (key, options, item, opt, root) {
        // this === item.$node
        //var Rowid1 = options.$trigger[0].cells[0].children[0].childNodes[0].id;
        $('<span>Location'
            + '<form  id="LocationFilter"> <input id="TxtLoc"  type="text" style="width:150px; color:black" /><div class="btn btn-success DateBtn" style="padding: 2px 5px 1px 5px; margin-bottom: 5px;" id="SubmitLocation"><i class="glyphicon glyphicon-ok"></i></div></form>')
            .appendTo(this)
       .on('click', '#SubmitLocation', function () {
           //alert("Clicked");
           // Session["taskId"].val;
           if ($("#TxtLoc").val() != "" || $("#TxtLoc").val() != "undefined") {
               var empName = $("#TxtLoc").val();
               var col = "Location";
               var search = empName + "," + col + ":string";
               JSON.stringify(search);
               sessionStorage.setItem("search", search);
               var pSize = sessionStorage.getItem("PageSize");
               alert(search);
               $("#example div").remove();
               $("#loading").show();
               $('#loadingmessage').show();

               $.ajax({
                   url: '/Sales/AjaxGetPendingCRMLead',
                   type: "POST",
                   data: { start: 0, pSize: pSize, search: search },
                   success: function (data) {
                       if (data.statusCode == 500) {
                           window.location.href = "/Home/Error";
                       }
                       else {
                           $("#fText").text(empName);
                           $("#FilterText").show();
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
           $(".btn-success").attr("disabled", true);
           //  $("#DefferTask").submit();        //Commented by Shweta
       });
        this.addClass('labels').on('contextmenu:focus', function (e) {
            // setup some awesome stuff
        }).on('contextmenu:blur', function (e) {
            // tear down whatever you did
        }).on('keydown', function (e) {
            // some funky key handling, maybe?
        });
    };
    $.contextMenu({
        selector: '#example div.parentdiv',
        build: function ($trigger) {
            var options = {
                callback: function (key, options) {
                    var divid = options.$trigger[0].id;
                    var temp = divid.split("-");
                    var id = temp[1];
                    var Rowid = "#tr-" + id;
                    var Callid = '';


                    switch (key) {
                        //function add Remark modal
                        case "AddRemark":



                            var firmname = '';
                            if ($(Rowid).parent().hasClass("red")) {
                                var Callid = $(Rowid).children(1)[2].innerText;
                                var firmname = $(Rowid).children(1)[4].innerText;
                            } else {
                                var Callid = $(Rowid).children(1)[1].innerText;
                                var firmname = $(Rowid).children(1)[3].innerText;
                            }
                            $('#CallIdForRemark').val(Callid);
                            $('#Remark').modal(options);
                            var Mtitle = "Firm Name :  " + firmname;
                            $('#Remark .modal-title').text(Mtitle);
                            $('#Remark').modal('show');
                            break;

                            //function to show remarks model
                        case "ViewRemarks":
                            var Rowid = "#tr-" + id;
                            var Callid = '';
                            if ($(Rowid).parent().hasClass("red")) {
                                Callid = $(Rowid).children(1)[2].innerText;
                            } else {
                                Callid = $(Rowid).children(1)[1].innerText;
                            }
                            $.ajax({
                                type: "POST",
                                url: "/Sales/AddRemarkData",
                                data: { key: Callid },
                                success: function (data) {
                                    if (data == "") {
                                        window.location.href = "/Home/LogOut";
                                        return true;
                                    }
                                    if (data.statusCode == 500) {
                                        window.location.href = "/Home/Error";
                                    }
                                    debugger;

                                    $(".popover-content").css("height", "200px")
                                    $(".popover-content").css("overflow-y", "scroll")
                                    //loadData1(data);
                                    $("#ShowRemarkContent").empty();
                                    var tblEmployee1 = $("#ShowRemarkContent");
                                    //$(".popover-content #LoadingData").css('display', 'none');
                                    var a = 1;
                                    $.each(data.data, function (index, item) {
                                        var m = (a) + index;
                                        var more1 = $("<div class='col-md-12'  style='display:flex;margin-bottom:10px;color:black; padding-left:0px' id='" + item.CRMCommunication_key + "'  class='col-md-12'>" + m + "</div>");
                                        more1.html(("<div class='col-md-1' style='margin-left: 0px; padding-left: 10px;padding-right: 18px;'>" + m + "</div>")
                                         + " " + ("<div class='col-md-3' style='width: 215px; padding-left:5px; text-align:left;padding-right:25px;' >" + item.Commtext + "</div>")
                                         + " " + ("<div class='col-md-4' style='width: 130px; padding-left: 0px; padding-right: 0px; text-align:center;'  >" + item.TextCommunicationType + " </div>")
                                         + " " + ("<div class='col-md-2' style='padding-left: 0px; width: 200px; padding-right: 10px;text-align: right;'>" + item.FrmtCreationDate + " </div>")
                                         + " " + ("<div class='col-md-2' style='width:180px; padding-left:0px; text-align:right; padding-right:0px'>" + item.TextLogincode + "</div><div class='col-md-1'></div>")
                                             );
                                        tblEmployee1.append(more1);
                                    });

                                    if (data.recordsTotal == 0) {
                                        $(".popover-content #LoadingData").css('display', 'block');
                                        tblEmployee1.text('No Data');
                                    } else {
                                        $(".popover-content #LoadingData").css('display', 'none');
                                        //tblEmployee1.text('');
                                    }
                                },
                                error: function () {
                                    alert("Error in loading data")
                                }
                            });
                            $('#ViewRemarks').modal(options);
                            $('#ViewRemarks').modal('show');
                            event.preventDefault();
                            break;


                            // function to show call assign too modal
                        case "CallAssignTo":
                            popOverOpen = false
                            var RowId = "#tr-" + id

                            var callId = ""
                            if ($(RowId).parent().hasClass("red")) {
                                callId = $(RowId).children(1)[2].innerText
                            } else {
                                callId = $(RowId).children(1)[1].innerText
                            }
                            $("#PCall").val(callId);
                            $('#Assignedto').modal(options);
                            $('#Assignedto').modal('show');
                            break;

                            //Function for call close modal
                        case "CallClose":
                            var RowId = "#tr-" + id
                            var CustName = ""
                            var callId = ""
                            if ($(RowId).parent().hasClass("red")) {
                                CustName = $(RowId).children(1)[4].innerText;
                                callId = $(RowId).children(1)[2].innerText
                            } else {
                                CustName = $(RowId).children(1)[3].innerText;
                                callId = $(RowId).children(1)[1].innerText
                            }
                            var hasRemarkid = "#HasRemark-" + id
                            var hasRemarkValue = $(hasRemarkid).val();
                            if (hasRemarkValue === "Y") {
                                $.ajax({
                                    type: "GET",
                                    url: "/CRM/CallClosed",
                                    contentType: "application/json; charset=utf-8",
                                    datatype: "json",
                                    data: { Pid: callId },
                                    success: function (data) {
                                        if (data.statusCode == 500) {
                                            window.location.href = "/Home/Error";
                                        }
                              
                                        var Mtitle
                                        $('#CallClosedContent').html();
                                        $('#CallClosed').modal(options);
                                        $('#CallClosed').modal('show');

                                        if (data == "NoRemarkAfterLastCall") {
                                            Mtitle = "There is no remark after Last Call.Please add remark to close call :" + "  " + CustName;
                                            $('.modal-title').text(Mtitle);
                                        } else if (data == "CustomerNotLink") {
                                            Mtitle = "Call is not linked to customer, please link customer , then close the call."
                                            $('.modal-title').text(Mtitle);
                                        } else {
                                            Mtitle = "Call Closed Successfully :" + "  " + CustName;
                                            $('.modal-title').text(Mtitle);
                                            var MainDivid = "#MainDiv-" + id
                                            $(MainDivid).remove();
                                            setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);
                                        }
                                    },
                                    error: function (data) {
                                        //Changed Shweta
                                        //alert("An error occured.Please try again later.");
                                        $('#CallClosedContent').html();
                                        $('#CallClosed').modal(options);
                                        var Mtitle = "Call is not linked to customer, please link customer , then close the call."
                                        $('.modal-title').text(Mtitle);
                                        $('#CallClosed').modal('show');

                                    }
                                });
                            } else {
                                $('#CallClosedContent').html();
                                $('#CallClosed').modal(options);
                                var Mtitle = "Please add Remark to close Call!"
                                $('.modal-title').text(Mtitle);
                                $('#CallClosed').modal('show');
                            }

                            break;

                            //function for onsite service modal
                        case "OnsiteVisit":
                            var RowId = "#Onsite-" + id;
                            var OnsiteCount = $(RowId).val();

                            $("#Onsitevisit").text("Current Onsite Visits: " + OnsiteCount);
                            $("#PCall1").val(id);
                            $("#CalledFrom").val("ManageRegCalls");
                            $('#OnsiteModal').modal(options);
                            $('#OnsiteModal').modal('show');
                            break;

                            //Function to show mailtodealer modal
                        case "MailToDealer":
                            var RowId = "#tr-" + id
                            var CustName = '';
                            if ($(RowId).parent().hasClass("red")) {
                                var CustName = $(RowId).children(1)[4].innerText;
                            } else {
                                var CustName = $(RowId).children(1)[3].innerText;
                            }

                            $("#issuesfilegstkeyMailTodealer").val(id);

                            $('#MailToDealer').modal(options);
                            var Mtitle = "Mail To Dealer: " + CustName;
                            $('MailToDealer .modal-title').text(Mtitle);
                            $('#MailToDealer').modal('show');
                            break;

                            //function to show msgto customer modal
                        case "MsgToCustomer":
                            var RowId = "#tr-" + id
                            var CustName = '';
                            var PCall = '';
                            var phone = '';
                            if ($(RowId).parent().hasClass("red")) {
                                CustName = $(RowId).children(1)[4].innerText;
                                PCall = $(RowId).children(1)[2].innerText;
                                phone = $(RowId).children(1)[6].innerText;
                            } else {
                                CustName = $(RowId).children(1)[3].innerText;
                                PCall = $(RowId).children(1)[1].innerText;
                                phone = $(RowId).children(1)[5].innerText;
                            }


                            $("#PCallMsgToCustomer").val(PCall);
                            $("#Mobileno").val(phone);
                            $("#firmNameMsgtoCustomer").val(CustName);
                            $('#MsgCustomer').modal(options);
                            var Mtitle = "Message to Customer: " + CustName;
                            $('#MsgCustomer .modal-title').text(Mtitle);
                            $('#MsgCustomer').modal('show');
                            break;

                            //function to show mailtocustomer model
                        case "MailToCustomer":
                            var RowId = "#tr-" + id
                            var CustName = '';
                            var PCall = '';
                            if ($(RowId).parent().hasClass("red")) {
                                CustName = $(RowId).children(1)[4].innerText;
                                PCall = $(RowId).children(1)[1].innerText;
                            } else {
                                CustName = $(RowId).children(1)[3].innerText;
                                PCall = $(RowId).children(1)[1].innerText;
                            }
                            $("#PCallMailToCustomer").val(PCall);
                            $("#firmNameMailtoCustomer").val(CustName);
                            $('#MailToCustomer').modal(options);
                            var Mtitle = "Mail To Customer: " + CustName;
                            $('.modal-title').text(Mtitle);
                            $('#MailToCustomer').modal('show');
                            break;

                            //function to show addcollaborator model
                        case "AddCollaborator":
                            var Rowid = "#tr-" + id;
                            var TaskPid = '';
                            if ($(Rowid).parent().hasClass("red")) {
                                var TaskPid = $(Rowid).children(1)[2].innerText;
                            } else {
                                var TaskPid = $(Rowid).children(1)[1].innerText;
                            }
                            $('#CallCollaborators #PCall').val(TaskPid);
                            $('#CallCollaborators').modal(options);
                            $('#CallCollaborators').modal('show');
                            break;


                            //function to show CallEngageStatus model


                            //function to show ShowCollaborators model
                        case "ShowCollaborators":
                            var Rowid = "#tr-" + id;
                            var CallPid = '';
                            var CustName = '';
                            if ($(Rowid).parent().hasClass("red")) {
                                var CallPid = $(Rowid).children(1)[2].innerText;
                                var CustName = $(Rowid).children(1)[4].innerText;
                            } else {
                                var CallPid = $(Rowid).children(1)[1].innerText;
                                var CustName = $(Rowid).children(1)[3].innerText;
                            }
                            var Mtitle = "Collaborators: " + CustName;

                            $.ajax({
                                type: "POST",
                                url: "/CRM/AddCallCollaboratorsData",
                                data: { CallId: CallPid },
                                success: function (data) {
                                    if (data == "") {
                                        window.location.href = "/Home/LogOut";
                                        return true;
                                    }
                                    if (data.statusCode == 500) {
                                        window.location.href = "/Home/Error";
                                    }
                                   
                                    debugger;
                                    //loadData1(data);

                                    var tblEmployee1 = $("#ShowCollaborators");
                                    $("#ShowCollaborators").empty();
                                    //$(".popover-content #LoadingData").css('display', 'none');
                                    var a = 1;
                                    $.each(data.data, function (index, item) {
                                        var m = (a) + index;

                                        var more1 = $("<div style='display:flex; height:20px; margin-bottom:10px; padding-left:0px' id='" + item.CRMCollaborator_key + "'  class='col-md-12 body'>" + m + "</div>");
                                        more1.html(("<div class='col-md-2 ViewcollaboratorsSno ' style='text-align: center;'>" + m + "</div>")
                                                     + " " + ("<div class='col-md-8 ViewcollaboratorsEmpName' style='text-align:center;' >" + item.TxtCollaborator + "</div>")
                                                     + " " + ("<div class='col-md-2 ViewcollaboratorsClose' style='padding-right: 0px;padding-left: 30px;' ><a class='' id='" + item.CRMCollaborator_key + "' onclick='deleteCollaborator(this.id)' style='cursor: pointer;'><i class='glyphicon glyphicon-remove'></i></a></div>")
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
                            $('#ViewCollaborator >.modal-title').text(Mtitle)
                            $('#ViewCollaborator').modal(options);
                            $('#ViewCollaborator').modal('show');
                            event.preventDefault();
                            break;

                            //function to show LinkCustomer model
                        case "ShowLinkCustomerModal":
                            var Rowid = "#tr-" + id;
                            var CallPid = '';
                            var CustName = '';
                            if ($(Rowid).parent().hasClass("red")) {
                                var CallPid = $(Rowid).children(1)[2].innerText;
                            } else {
                                var CallPid = $(Rowid).children(1)[1].innerText;
                            }
                            $("#LinkCustomerCallId").val(CallPid);
                            $('#LinkCustomer').modal(options);
                            $('#LinkCustomer').modal('show');
                            break;


                            //function to show Edit model
                        case "Edit":
                            var Rowid = "#tr-" + id;
                            var CallPid = '';
                            var CustName = '';
                            if ($(Rowid).parent().hasClass("red")) {
                                var CallPid = $(Rowid).children(1)[2].innerText;
                            } else {
                                var CallPid = $(Rowid).children(1)[1].innerText;
                            }
                            window.location = '/Sales/LeadForm?P_crmLead=' + CallPid + '&exitmode=edit&CalledFrom=ManageCRMLead';
                            break;
                        case "DeferCall":
                            var options = {
                                "backdrop": "static",
                                keyboard: true
                            };
                            $('#DeferCall').modal(options);
                            $('#DeferCall').modal('show');
                            position: [100, 200],
                           $(".LoaderOverlay").hide();
                            break;
                            //case "HomeTown":
                            //    var $buttonClicked = $(this);
                            //    var options = {
                            //        "backdrop": "static",
                            //        keyboard: true
                            //    };
                            //    $.ajax({
                            //        type: "GET",
                            //        url: "/CRM/LocationGrid",
                            //        contentType: "application/json; charset=utf-8",
                            //        datatype: "json",
                            //        success: function (data) {
                            //            debugger;
                            //            $('#ModelHomeTownFilter').modal(options);
                            //            $('#ModelHomeTownFilter').modal('show');
                            //            $('#LinkHometown').html(data);

                            //        },
                            //        error: function () {
                            //            alert("Content load failed.");
                            //        }
                            //    });
                            //    break;
                        case "ServicingDealer":
                            var options = {
                                "backdrop": "static",
                                keyboard: true
                            };
                            $('#ServicingAgent').modal(options);
                            $('#ServicingAgent').modal('show');
                            break;

                        case "CallEngage":
                            popOverOpen = false
                            var Rowid = "#tr-" + id;
                            var Callid = '';
                            var firmname = '';

                            if ($(Rowid).parent().hasClass("red")) {
                                Callid = $(Rowid).children(1)[2].innerText;
                                firmname = $(Rowid).children(1)[4].innerText;
                            } else {
                                Callid = $(Rowid).children(1)[1].innerText;
                                firmname = $(Rowid).children(1)[3].innerText;
                            }
                            $('#callId').val(Callid);
                            $('#EngageStatus').modal(options);
                            var Mtitle = "Firm Name :  " + firmname;
                            $('#EngageStatus .modal-title').text(Mtitle);
                            $('#EngageStatus').modal('show');
                            break;
                    }
                },
                items: {
                    "AddRemark": { name: "Add Remarks", icon: "fa-comment-o" },
                    "ViewRemarks": { name: "View Remarks", icon: "fa-list" },
                    "CallAssignTo": { name: "Call Assign To", icon: "fa-phone" },
                    //"CallClose": { name: "Call Closed", icon: "fa-close", css: "height'15px'" },
                    //"OnsiteVisit": { name: "Onsite Service", icon: "fa-suitcase" },
                    //"MailToDealer": { name: "Mail To Dealer", icon: "fa-envelope" },
                    //"ContactCustomer": {
                    //    name: "Contact Customer", icon: "fa-address-book",
                    //    "items": {
                    //        "MsgToCustomer": { name: "Msg To Customer", icon: "fa-mobile", css: "height'25px'" },
                    //        "MailToCustomer": { name: "Mail To Customer", icon: "fa-envelope-o" }
                    //    }
                    //},
                    //"Collaborators": {
                    //    name: "Collaborators", icon: "fa-users",
                    //    "items": {
                    //        "AddCollaborator": { name: "Add Collaborator", icon: "fa-plus" },
                    //        "ShowCollaborators": { name: "View Collaborator", icon: "fa-eye" },
                    //    }
                    //},
                    //"ShowLinkCustomerModal": { name: "Link Customer", icon: "fa-link" },
                    "Edit": { name: "Edit", icon: "fa-pencil" },
                    //"MarkAsDuplicate": {
                    //    name: "Mark As Duplicate", icon: "fa-clone",
                    //    "items": {
                    //        "input": {
                    //            type: 'input', customName: 'input', callback: HTMLInputElement
                    //        }
                    //    }
                    //},
                    //"DefferCall": {
                    //    name: "Deffer Call", icon: "fa-clock-o",
                    //    "items": {
                    //        "CustCode1": {
                    //            type: 'DefferCall1', customName: 'DefferCall1', callback: HTMLInputElement
                    //        }
                    //    }
                    //},
                    //"CallEngage": {
                    //    name: "Call Engage Status", icon: "fa-user",
                    //    //"items": {
                    //    //    "CallEngagectrls": {
                    //    //        type: 'CallEngagectrls', customName: 'select', callback: HTMLSelectElement
                    //    //    }
                    //    //}
                    //},
                    //"Filter": {
                    //    name: "Filter", icon: "fa-filter",
                    //    "items": {
                    //        "CustomerName": {
                    //            name: "Customer Name", icon: "fa-user",
                    //            "items": {
                    //                "CustomerName1": {
                    //                    type: 'CustomerName1', customName: 'CustomerName1', callback: HTMLInputElement
                    //                }
                    //            }
                    //        },
                    //        //"ServicingDealer": { name: "Servicing Dealer", icon: "fa-user-circle-o" },
                    //        //"HomeTown": {
                    //        //    name: "Home Town", icon: "fa-home", "items": {
                    //        //        "Location": {
                    //        //            type: 'Location', customName: 'Location', callback: HTMLInputElement
                    //        //        }
                    //        //    }
                    //        //},

                    //    }

                    //}
                },
            }
            return options;
        }
    })
})

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
    if (d == null || d == 0 || d == "undefined") { d = 50; sessionStorage.setItem("PageSize", d); };
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
        var callFreqdiv = "";
        var accordion = "";
        var panel = "";
        var rcorners = "";
        var div = "";
        var rcorners_inner = "";
        var plus = "";
        if (item.hasRemarks == "Y") {
            Parentdiv = $("<div id='MainDiv-" + item.Issuesfilegstkey + "' class='col-md-12  clickable parentdiv' style='width: 100%;padding-left: 0px;padding-right: 0px;'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
            accordion = $("<div   id='accordionBlue-" + item.Issuesfilegstkey + "'></div>");
            plus = "<a style='bottom:15px; padding-right:11px;' class='accordion accordionBlue' ><i class='glyphicon glyphicon-plus Plus' style='bottom:10px; font-size: 17px; color:#616A6B; cursor:pointer;'>               </i></a>"
            panel = $("<div id='panelBlue- " + item.Issuesfilegstkey + "' class='panelBlue Blue'></div>");
            panel.html(("<div class='col-md-6 HiddenBlue'         style='padding-left:20px; height:36px; overflow-y:auto'><b>Description:</b>" + item.Issuedescription + "</div>")
                   + " " + ("<div class='col-md-3 HiddenBlue'     style='padding-left:10px; height:36px;'><b>Servicing Dealer:</b><br /><input type='hidden' id='Onsite-" + item.Issuesfilegstkey + "' class='Onsite' value='" + item.OnsiteCount + "'/>" + item.TextServicingDealer + "</div>")
                   + " " + ("<div class='col-md-3 HiddenBlue'     style='padding-left:10px; height:36px;'><b> Next Action Date: </b> <br />" + item.FrmtNextActionDate + "</div>"));
            rcorners = $("<div id='rcorners1'></div>");
            div = $("<div class='col-md-12 TopBlue red ' id='top-" + item.Issuesfilegstkey + "' style=''></div>");
            rcorners_inner = $("<div id='rcorners_inner-" + item.Issuesfilegstkey + "'   class='clickable  rcorners_innerBlue' style='z-index:20;margin-top: 3px; padding-bottom: 0px;padding-left: 5px;padding-right: 22px;padding: 20px;padding: 2px 5px 0px 5px;margin-right: 20px;background-color: white;border-top-left-radius: 0px;border-top-right-radius: 0px;border-bottom-right-radius: 12px;border-bottom-left-radius: 12px;border-right: 2px solid #3c8dbc;border-left: 2px solid #3c8dbc;border-bottom: 1px solid #3c8dbc;width:100%;'></div>");
        }
        else {
            Parentdiv = $("<div id='MainDiv-" + item.Issuesfilegstkey + "' class='col-md-12  clickable parentdiv' style='width: 100%;padding-left: 0px;padding-right: 0px;'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
            accordion = $("<div  id='accordionRed-" + item.Issuesfilegstkey + "'></div>");
            plus = "<a style='bottom:15px; padding-right:11px;' class='accordion accordionRed' ><i class='glyphicon glyphicon-plus Plus' style='bottom:10px; font-size: 17px; color:#616A6B; cursor:pointer;'>               </i></a>";
            panel = $("<div id='panelRed- " + item.Issuesfilegstkey + "' class='panelRed'></div>");
            panel.html(("<div class='col-md-6 HiddenRed'         style='padding-left:20px; height:36px; overflow-y:auto'><b>Description:</b>" + item.Issuedescription + "</div>")
                   + " " + ("<div class='col-md-3 HiddenRed'     style='padding-left:10px; height:36px;'><b>Servicing Dealer:</b><br /><input type='hidden' id='Onsite-" + item.Issuesfilegstkey + "' class='Onsite' value='" + item.OnsiteCount + "'/>" + item.TextServicingDealer + "</div>")
                   + " " + ("<div class='col-md-3 HiddenRed'     style='padding-left:10px; height:36px;'><b> Next Action Date: </b> <br />" + item.FrmtNextActionDate + "</div>"));
            rcorners = $("<div id='rcorners3'></div>");
            div = $("<div class='col-md-12 TopRed red ' id='top' style='padding-left:35px; height:1.82em;'></div>");
            rcorners_inner = $("<div id='rcorners_innerRed-" + item.Issuesfilegstkey + "'   class='clickable rcorners_innerRed ' style='z-index:20;padding-bottom: 0px;padding-left: 5px; padding-right: 22px;padding: 20px;padding: 2px 5px 0px 5px;margin-right: 20px;background-color: white;border-top-left-radius: 0px;border-top-right-radius: 0px;border-bottom-right-radius: 12px;border-bottom-left-radius: 12px;border-right: 2px solid #e64945;border-left: 2px solid #e64945;border-bottom: 1px solid #e64945;width:100%;' ></div>");
        }
        if (item.callFreqCount > 0) {
            Parentdiv = $("<div id='MainDiv-" + item.Issuesfilegstkey + "' class='col-md-12  clickable parentdiv red' style='width: 100%;padding-left: 0px;padding-right: 0px;'  onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
            accordion = $("<div  id='accordionRed-" + item.Issuesfilegstkey + "'></div>");
            plus = "<a style='bottom:15px; padding-right:11px;' class='accordion accordionRed' ><i class='glyphicon glyphicon-plus Plus' style='bottom:10px; font-size: 17px; color:#616A6B; cursor:pointer;'>               </i></a>"
            panel = $("<div id='panelRed- " + item.Issuesfilegstkey + "' class='panelRed'></div>");
            panel.html(("<div class='col-md-6 HiddenRed'         style='padding-left:20px; height:36px; overflow-y:auto'><b>Description:</b>" + item.Issuedescription + "</div>")
                   + " " + ("<div class='col-md-3 HiddenRed'     style='padding-left:10px; height:36px;'><b>Servicing Dealer:</b><br /><input type='hidden' id='Onsite-" + item.Issuesfilegstkey + "' class='Onsite' value='" + item.OnsiteCount + "'/>" + item.TextServicingDealer + "</div>")
                   + " " + ("<div class='col-md-3 HiddenRed'     style='padding-left:10px; height:36px;'><b>Next Action Date:</b><br />" + item.FrmtNextActionDate + "</div>"));
            rcorners = $("<div id='rcorners3'></div>");
            div = $("<div class='col-md-12 TopRed red ' id='top' style=''></div>");
            rcorners_inner = $("<div id='rcorners_innerRed-" + item.Issuesfilegstkey + "'   class='clickable rcorners_innerRed ' style='z-index:20;padding-bottom: 0px;padding-left: 5px; padding-right: 22px;padding: 20px;padding: 2px 5px 0px 5px;margin-right: 20px;background-color: white;border-top-left-radius: 0px;border-top-right-radius: 0px;border-bottom-right-radius: 12px;border-bottom-left-radius: 12px;border-right: 2px solid #e64945;border-left: 2px solid #e64945;border-bottom: 1px solid #e64945;width:100%;'></div>");
            callFreqdiv = ("<div class='numberCircle' style=''>" + item.callFreqCount + "</div>")
        }
        tblEmployee.append(Parentdiv);
        Parentdiv.append(accordion);
        Parentdiv.append(panel);
        accordion.append(rcorners);

        m = m + 1;
        div.html(callFreqdiv
             //+ " " + ("<div class='col-md-1' style='font-size:16px;   color:#504f4f; bottom:0px; padding-right:0px; width:70px; padding-left:20px;' id='" + item.Issuesfilegstkey + "' value='" + item.Issuesfilegstkey + " style='margin-top:2px; float:left'><input type='hidden' class='isDeffered' value='" + item.IsDeffered + "'/><b>" + m + "</b></div>")
             + " " + ("<div class='col-md-1' style='font-size:16px;   color:#504f4f;   bottom:0px; padding-left:0px; padding-right:0px; text-align:center; float:right; width:6%;'>#<input type='hidden' id='HasRemark-" + item.Issuesfilegstkey + "' value='" + item.hasRemarks + "'/><b>" + item.P_issuesfilegst + "</b></div>")
             + " " + ("<div class='col-md-4' style='font-size:15.5px; color:#504f4f; top:1.5px;  padding-left:0px;  width:35%;  margin-left:0px;'>&nbsp;&nbsp;&nbsp;<b>" + item.Firmname + "</b></div>")
             + " " + ("<div class='col-md-2' style='font-size:14.5px; color:black;   top:1.5px;  padding-left:5px; width:22%;  padding-right:0px; text-align:left; margin-bottom:0px;'><i class='fa fa-user' style='color:#504f4f;'></i>&nbsp;&nbsp;" + item.Contactperson + "</div>")
             + " " + ("<div class='col-md-2' style='font-size:16px;   color:black;   bottom:0px; padding-left:0px; padding-right:0px; text-align:center; width:12%;'><i class='fa fa-phone' style='color:#504f4f;'></i>&nbsp;&nbsp;" + item.Mobileno + "</div>")
             + " " + ("<div class='col-md-2' style='font-size:15px;   color:black;   bottom:0px; padding-left:0px; padding-right:0px; text-align:center;'>" + item.TxtRegisterDate + "</div>")
            );
        rcorners.append(div);


        rcorners.append(rcorners_inner);

        var div1 = $("<div  style='min-height: 40px;'></div>");
        div.append(div1);

        var div2 = $("<div class='col-md-6' style='float:right; padding-left:190px;font-size:13.5px;'><b>Last Action Date: </b>" + item.TxtLastCallDate + "<br /> <b>Call Source: </b>" + item.Textsource + "</div>")
        rcorners_inner.append(div2);

        var div3 = $("<div style='padding-left:0px;font-size:14px;'><div class='col-md-12'><b>Issue:</b>" + item.TextIssuetype + "</div></div>")
        rcorners_inner.append(div3);

        var div4 = $("<div  style='padding-left: 15px;font-size:14px;display:inline-flex;bottom:3px;'></div>");
        rcorners_inner.append(div4);

        div4.html(("<div  style='padding-right:0px;min-width:140px;'><b>               <i class='glyphicon glyphicon-headphones'></i>&nbsp;" + item.TextAssignedto + "&nbsp;&nbsp;</b></div>")
          + " " + ("<div  style='padding-left: 5px;padding-right:0px;min-width:85px;'> <i class='fa fa-bell'></i>&nbsp;" + item.TextTaskStatus + "&nbsp;&nbsp;</div>")
          + " " + ("<div  style='padding-left: 5px;padding-right:0px;min-width:100px;'><i class='glyphicon glyphicon-map-marker'></i>&nbsp;" + item.Location + "</div>")
      );

        var MoreDetailsdiv = $("<div class='MoreDetails' id='" + item.Issuesfilegstkey + "' style='position:absolute ; display:none; width:390px; height:35px; padding-left:10px;padding-top:8px; margin-left:320px; float:right; top: 31px;background-color:white;'>");
        MoreDetailsdiv.html((plus +
        "<a data-toggle='Add Remarks'      onclick='AddRemark(" + item.Issuesfilegstkey + ");'>                <i class='glyphicon glyphicon-comment'               style='font-size:19px; color:#616A6B;' data-placement='left'>                                                                 </i></a>" +
        "<a data-toggle='View Remarks'     class='ShowRemark'>                                                 <i class='glyphicon glyphicon-list ShowRemark' onclick='ViewRemarks(this)'      style='font-size:17px; color:#616A6B; padding-left:11px; max-width:700px;'  >                 </i></a>" +
        "<a data-toggle='Call Assign To'   onclick='CallAssignTo(" + item.Issuesfilegstkey + ")'>              <i class='fa fa-phone'                               style='font-size:19px; color:#616A6B; padding-left:11px;'>                                              </i></a>" +
        "<a data-toggle='Call Closed'      onclick='CallClose(" + item.Issuesfilegstkey + ")'>                 <i class='fa fa-close'                               style='font-size:21px; color:#616A6B; padding-left:11px;'>                                              </i></a>" +
        "<a data-toggle='Onsite Service'   onclick='OnsiteVisit(" + item.Issuesfilegstkey + ")'>               <i class='fa fa-suitcase'                            style='font-size:19px; color:#616A6B; padding-left:11px;'>                                              </i></a>" +
        "<a data-toggle='Link Customer'    onclick='ShowLinkCustomerModal(" + item.Issuesfilegstkey + ")' >    <i class='fa fa-link' data-placement='right'         style='font-size:19px; color:#616A6B; padding-left:11px;'>                                              </i></a>" +
        "<a data-toggle='DeferCall'        >                              <i class='fa fa-clock-o ShowDefferCallCtrls'       onclick='DeferCallctrls(this)'         data-placement=right; style='font-size:21px; color:#616A6B; padding-left:11px;'>                                              </i></a>" +
        "<a data-toggle='Contact Customer' >                              <i class='fa fa-address-book ContactCustomerCtrls' onclick='ContactCustomerCtrls(this)'   data-placement=right; style='font-size:20px; color:#616A6B; padding-left:11px;'>                                              </i></a>" +
        "<a data-toggle='Mark Duplicate'   >                              <i class='fa fa-clone MarkDuplicateCtrls'          onclick='MarkDuplicateCtrls(this)'     data-placement=right; style='font-size:20px; color:#616A6B; padding-left:11px;'>                                              </i></a>" +
        "<a data-toggle='Collaborators'    >                              <i class='fa fa-users ShowCollaboratorCtrls'       onclick='ShowCollaboratorCtrls(this)'  data-placement=right; style='font-size:18px; color:#616A6B; padding-left:11px;'>                                              </i></a>" +
        "<a data-toggle='Edit&nbsp&nbsp'   href='/CRM/EditRegCalls?id=" + item.Issuesfilegstkey + "&CalledFrom=ManageRegCalls' id='Edit' >                          <i class='glyphicon glyphicon-pencil' style='font-size:19px; color:#616A6B;padding-left:11px;' >        </i></a>" +
        "<a data-toggle='Mail To Dealer'   onclick='MailToDealer(this)'>                                       <i class='fa fa-envelope'                            style='font-size:19px; color:#616A6B; padding-left:11px;'>                                              </i></a>" +
        "<div class='popover_content_wrapper3' style='display:none; float:left; data-placement=right' id='ShowRemarksDiv'></div>" +
        "<div class='popover_content_wrapper4' style='display:none; margin-top:0px; padding-top:5px' id='ShowCollaboratorsCtrlsDiv'>                            <span class='close' onclick='popoverClose();' style='text-align:right; padding-left:10px; padding-bottom:10px;'> &times; </span>                    <a  onclick='AddCollaborator(this);' style='color:#222223; cursor:pointer; font-size:13px;   margin-left: 5px;'>   <i class='fa fa-plus'   style='font-size:17px; opacity:1; color:#616A6B; padding-right:8px; padding-top:10px; margin-left:5x; '>                             </i>&nbsp; Add Collaborators  </a> </br>   <hr style='margin-top: 4px; margin-bottom: 3px; width: 160px;border-top-width: 2px;margin-left: 0px;'>    <a onclick='ShowCollaborators(this);' class='ViewCollaborator' style='color:#222223; cursor:pointer; font-size:13px' >                  <i class='fa fa-eye'        style='font-size:16px; color:#616A6B; opacity:1; margin-left:5px;'>                                  </i>&nbsp; View Collaborators        </a> </div>" +
        "<div class='popover_content_wrapper5' style='display:none; z-index:12; width:70px; margin-top:0px; padding-top:0px' id='ContactCustomerCtrlsDiv'>      <span class='close' onclick='popoverClose();' style='text-align:right; padding-left:10px; padding-bottom:10px;'> &times; </span>                    <a  onclick='MsgToCustomer(this)'    style='color:#222223; cursor:pointer; font-size:13.5px; margin-left: 5px;'>   <i class='fa fa-mobile' style='font-size:27px; opacity:1; color:#616A6B; padding-right:4px; padding-top:5px; padding-left:3px; z-index:12;  '>              </i>&nbsp; Message To Customer</a> </br>   <hr style='margin-top: 4px; margin-bottom: 3px; width: 180px;border-top-width: 2px;margin-left: 0px;'>    <a onclick='MailToCustomer(this);'                           style='color:#222223; cursor:pointer; font-size:13.5px; z-index:12;' >   <i class='fa fa-envelope-o' style='font-size:17px; color:#616A6B; opacity:1; margin-left:7px; padding-right:1px; z-index:12;'>   </i>&nbsp; Mail To Customer          </a> </div>" +
        "<div class='popover_content_wrapper6' style='display:none; z-index:12; width:70px; margin-top:10px; padding-top:10px' id='MarkDuplicateCtrlsDiv'>      <span class='close' onclick='popoverClose();' style='text-align:right; padding-left:15px; padding-bottom:0px; '> &times; </span>                    <span><div style='padding:10px 0px 0px 0px;'>Call Id</div><form> <input class='TxtCallId' type='text' style='width:150px; color:black; margin-bottom:5px; padding:0px;' /><div class='btn btn-success DateBtn' onclick='SubmitMarkAsDuplicate(this)'                  style='padding: 2px 5px 1px 5px'><i class='glyphicon glyphicon-ok'></i></div></form></span> </div> " +
        "<div class='popover_content_wrapper7' style='display:none; z-index:12; width:80px; margin-top:0px; padding-top:0px' id='ShowDefferCallControlDiv'>     <span class='close' onclick='popoverClose();' style='text-align:right; padding-left:15px; padding-bottom:10px;'> &times; </span>                    <div class='col-md-12' style='height: 55px;margin-top:0px;padding-top:10px;'>Date <input id='NextActionDate' name='NextActionDate' class='NextActionDate col-md-9' type='datetime-local' style='width:180px; color:black; margin-top: 0px;margin-right: 5px;padding-left: 5px;' /><div class='col-md-3 btn btn-success DateBtn' id='DefferDate' onclick='defferCallSubmit(this)' style='padding-top: 2px;padding-bottom: 0px;padding-right: 5px;padding-left: 5px;width: 28px;'><i class='glyphicon glyphicon-ok' class='IconClose'></i></div></div></div> ")
        );
        rcorners_inner.append(MoreDetailsdiv);


        //if (item.IsDeffered == "Y") {
        //    var Maindivid = "#" + "MainDiv-" + item.Issuesfilegstkey;
        //    $(Maindivid).css("background-color", "#cfcccc")
        //    $(Maindivid).css("color", "black")
        //    var ctrldivid = "#" + item.Issuesfilegstkey;
        //    $(Maindivid).find(".MoreDetails").css("background-color", "#cfcccc")

        //}
        //else if (item.TextTaskStatus == "Deffered") {
        //    var Maindivid = "#" + "MainDiv-" + item.Issuesfilegstkey;
        //    $(Maindivid).css("background-color", "rgb(243, 102, 99)")
        //    $(Maindivid).css("color", "white")
        //    var ctrldivid = "#" + item.Issuesfilegstkey;
        //    $(ctrldivid).css("background-color", "rgb(243, 102, 99)")
        //    $(Maindivid).find(".MoreDetails").css("background-color", "rgb(243, 102, 99)")
        //}

        $('.ShowRemark').popover({
            html: true,
            trigger: 'manual',
            // width: '700px',
            content: function () {
                return $('.popover_content_wrapper3').html();
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
            width: '700px',
            content: function () {
                return $('.popover_content_wrapper5').html();
            }
        })
        $('.MarkDuplicateCtrls').popover({
            html: true,
            trigger: 'manual',
            content: function () {
                return $('.popover_content_wrapper6').html();
            }
        })
        $('.ShowDefferCallCtrls').popover({
            html: true,
            trigger: 'manual',
            content: function () {
                return $('.popover_content_wrapper7').html();
            }
        })

        if (data.Array == 0) {
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
    });
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");

            var accDiv = $(this).parent().parent().parent().parent();
            var panel = accDiv[0].nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                if ($(this).hasClass("accordionBlue")) {
                    panel.style.borderBottom = '0px solid #4e4c4c';
                    panel.style.borderTop = '0px';
                    panel.style.borderLeft = '1px solid #4e4c4c';
                    panel.style.borderRight = '1px solid #4e4c4c';
                }
                else {
                    panel.style.borderBottom = '0px solid #e64945';
                    panel.style.borderTop = '0px';
                    panel.style.borderLeft = '2px solid #e64945';
                    panel.style.borderRight = '1px solid #e64945';
                }

                $(accDiv).find('.clickable').css('border-top-left-radius', ' 0px');
                $(accDiv).find('.clickable').css('border-top-right-radius', ' 0px');
                $(accDiv).find('.clickable').css('border-bottom-right-radius', '12px');
                $(accDiv).find('.clickable').css('border-bottom-left-radius', '12px');
                $(accDiv).find('.clickable').css('border-bottom-width', '1px');
                $(accDiv).find('.plus').removeClass('glyphicon-minus');
                $(accDiv).find('.plus').addClass('glyphicon-plus');
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                if ($(this).hasClass("accordionBlue")) {
                    panel.style.borderBottom = '1px solid #3c8dbc';
                    //panelBlue.style.borderTop = '2px solid #d8d8d8';
                    panel.style.borderLeft = '2px solid #3c8dbc';
                    panel.style.borderRight = '2px solid #3c8dbc';
                }
                else {
                    panel.style.borderBottom = '1px solid #e64945';
                    //panel1.style.borderTop = '2px solid #d8d8d8';
                    panel.style.borderLeft = '2px solid #e64945';
                    panel.style.borderRight = '2px solid #e64945';
                }

                $(accDiv).find('.clickable').css('border-top-left-radius', '0px');
                $(accDiv).find('.clickable').css('border-top-right-radius', '0px');
                $(accDiv).find('.clickable').css('border-bottom-right-radius', '0px');
                $(accDiv).find('.clickable').css('border-bottom-left-radius', '0px');
                $(accDiv).find('.clickable').css('border-bottom-width', '0px');
                $(accDiv).find('.plus').removeClass('glyphicon-plus');
                $(accDiv).find('.plus').addClass('glyphicon-minus');
            }
        });
    }

}




$(document).ready(function () {
    //$('a').tooltip();
    var a = 1;
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 50 }
    var SelectedRows = "";
    GetEmployeeData(a, 0, t);



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
            $.post('/CRM/AjaxGetJsonDataSortManageRegCalls', { id: "", start: d, pSize: a, search: b, order: o, ServerOrderValue: "" }, function (data) {
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
            $.post('/CRM/AjaxGetJsonDataSortManageRegCalls', { id: "", start: d, pSize: a, search: c, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });

    $("#filterbtn").attr("disabled", false)

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
                    $(".LoaderOverlay").hide();
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
        if (a == "0") {
            $("#TextC").css("display", "none");
            $("#StatusC").css("display", "none");
            var a = document.getElementById("dateC")
            a.style.display = "none";
        } else {
            b = a.split(":");
            if (b[1] == "date") {
                $("#TextC").css("display", "none");
                $("#StatusC").css("display", "none");
                var a = document.getElementById("dateC")
                a.style.display = "";
            } else if (b[1] == "string") {
                var a = document.getElementById("dateC")
                a.style.display = "none";
                $("#StatusC").css("display", "none");
                $("#TextC").css("display", "");
            } else if (b[1] == "integer") {
                var a = document.getElementById("dateC")
                a.style.display = "none";
                $("#TextC").css("display", "none");
                var a = document.getElementById("StatusC")
                a.style.display = "";
            }
        }
    });
    //$('[data-toggle="popover"]').popover();
});

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
function Refresh() {  // added by Shweta

    $("#example1 tbody tr").remove();
    $("#example1").hide();
    $("#Remark").modal("hide");  //To hide the model
    $(".tab").show();    //Added by Shweta
}

//function hoverId(ctrl) {
//    $(ctrl).find('.MoreDetails').show();
//    $(ctrl).find('.MoreDetails').css("display", "inline-flex");
//}

//function hoverNot(ctrl) {
//    $('.MoreDetails').hide();
//}

function hoverId(ctrl) {

    if (popOverOpen == true) {
        $(".MoreDetails").not(CurrentHoverRowId).hide;
    } else {
        $(ctrl).find('.MoreDetails').show();
        $(ctrl).find('.MoreDetails').css("display", "inline-flex");
    }
}

function hoverNot(ctrl) {
    popOverOpen = false;
    $('.MoreDetails').hide();
    if (popOverOpen == true) {
        $(CurrentHoverRowId).find('.MoreDetails').show();
    }
}
//Function to show the controls of collaborator in popover
function ShowCollaboratorCtrls(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#top-" + id;
    CurrentHoverRowId = id;
    $(".ShowCollaboratorCtrls").popover('toggle');
    $(".ShowCollaboratorCtrlsDiv").show();
    //$('.popover-dismiss').popover({
    //    trigger: 'focus'
    //})

    // Popover Grid
    $('.ShowCollaboratorCtrls').not(ctrl).popover('show')
    $('.popover.fade').removeClass('right;')
    $('.popover.fade').addClass('bottom')

    $('.popover.fade.in.bottom').css('width', '200px');
    $('.popover.fade.in.bottom').css('left', '-70px');
    $('.popover.fade.in.bottom').css('top', '30px');
    $('.popover.fade.in.bottom').css('height', '70px');
    $('.popover.fade.in.bottom').css('max-width', 'none');
    $('.arrow').css('top', '-11px');
    $('.popover-content').css('width', '200px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-top', '0px');

    event.preventDefault();
}

function GetEmployeeData(pageNumber, start, PSize) {
    $('#loading').show();
    $('#loadingmessage').show();
    $.ajax({
        type: "POST",
        url: "/CRM/AjaxGetJsonDataSortManageRegCalls",
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
    var Rowid = "#top-" + id;
    CurrentHoverRowId = Rowid;
    $(".ContactCustomerCtrls").popover('toggle');
    $(".ContactCustomerCtrlsDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })

    // Popover Grid
    $('.ContactCustomerCtrls').not(ctrl).popover('show');
    $('.popover.fade').removeClass('right;')
    $('.popover.fade').addClass('bottom')
    $('.popover.fade.in.bottom').css('width', '220px');
    $('.popover.fade.in.bottom').css('left', '-91px');
    $('.popover.fade.in.bottom').css('top', '20px');
    $('.popover.fade.in.bottom').css('max-width', 'none');
    $('.arrow').css('top', '-11px');
    $('.popover-content').css('width', '209px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-top', '2px');



    event.preventDefault();

}
function MarkDuplicateCtrls(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#top-" + id;
    CurrentHoverRowId = Rowid;
    $(".MarkDuplicateCtrls").popover('toggle');
    $(".MarkDuplicateCtrlsDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })

    // Popover Grid
    $('.MarkDuplicateCtrls').not(ctrl).popover('hide');
    $('.popover.fade').removeClass('right;')
    $('.popover.fade').addClass('bottom')
    $('.popover.fade.in.bottom').css('width', '225px');
    $('.popover.fade.in.bottom').css('left', '-72px');
    $('.popover.fade.in.bottom').css('top', '15px');
    $('.popover.fade.in.bottom').css('max-width', 'none');
    $('.arrow').css('top', '-11px');
    $('.arrow').css('left', '40%');
    $('.popover-content').css('width', '225px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-top', '0px');




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
    var Rowid = "#top-" + id;
    var TaskPid = '';
    if ($(RowId).parent().hasClass("red")) {
        TaskPid = $(Rowid).children(1)[5].innerText;
    } else {
        TaskPid = $(Rowid).children(1)[4].innerText;
    }

    $('#CallCollaborators #PCall').val(TaskPid);

    $('#CallCollaborators').modal(options);
    $('#CallCollaborators').modal('show');

}
//$('["data-toggle"]').data - toggle();

function ShowLinkCustomerModal(id) {
    $("#Issuesfilegstkey").val(id);

    $('#LinkCustomer').modal(options);
    $('#LinkCustomer').modal('show');
}
function CallClose(id) {
    popOverOpen = false
    var RowId = "#top-" + id
    var CustName = ""
    if ($(RowId).parent().hasClass("red")) {
        CustName = $(RowId).children(1)[2].innerText;
    } else {
        CustName = $(RowId).children(1)[1].innerText;
    }
    var hasRemarkid = "#HasRemark-" + id
    var hasRemarkValue = $(hasRemarkid).val();
    if (hasRemarkValue === "Y") {
        $.ajax({
            type: "GET",
            url: "/CRM/CallClosed",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: { id: id },
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
function CallAssignTo(id) {
    popOverOpen = false
    $("#PCall").val(id);
    $('#Assignedto').modal(options);
    $('#Assignedto').modal('show');

}
function MailToDealer(ctrl) {
    var id = $(ctrl).parent()[0].id;
    popOverOpen = false;
    var RowId = "#top-" + id
    var CustName = '';
    if ($(RowId).parent().hasClass("red")) {
        CustName = $(RowId).children(1)[2].innerText;
    } else {
        CustName = $(RowId).children(1)[1].innerText;
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
    var RowId = "#top-" + id
    var CustName = '';
    var PCall = '';
    var phone = '';
    if ($(RowId).parent().hasClass("red")) {
        CustName = $(RowId).children(1)[2].innerText;
        PCall = $(RowId).children(1)[5].innerText;
        phone = $(RowId).children(1)[4].innerText;
    } else {
        CustName = $(RowId).children(1)[1].innerText;
        PCall = $(RowId).children(1)[4].innerText;
        phone = $(RowId).children(1)[3].innerText;
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
    var RowId = "#rcorners_innerBlue-" + id
    if ($(RowId).parent().hasClass("red")) {
        CustName = $(RowId).children(1)[4].innerText;
        PCall = $(RowId).children(1)[2].innerText;
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

}

function AddRemark(id) {
    popOverOpen = false
    $('#Remarktextarea').val('');
    var Rowid = "#top-" + id;
    var Callid = '';
    var firmname = '';
    $('#issueId').val(id);
    if ($(Rowid).parent().hasClass("red")) {
        Callid = $(Rowid).children(1)[5].innerText;
        firmname = $(Rowid).children(1)[2].innerText;
    } else {
        Callid = $(Rowid).children(1)[4].innerText;
        firmname = $(Rowid).children(1)[1].innerText;
    }

    $('#Remark').modal(options);
    var Mtitle = "Firm Name :  " + firmname;
    $('#Remark .modal-title').text(Mtitle);
    $('#Remark').modal('show');
}

//Function to show the controls of DefferCall in popover
function DeferCallctrls(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#top-" + id;
    CurrentHoverRowId = Rowid;
    $(".ShowDefferCallCtrls").popover('toggle');
    $(".ShowDefferCallControlDiv").show();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })
    // Popover Grid
    $('.ShowDefferCallCtrls').not(ctrl).popover('hide');
    $('.popover.fade').removeClass('right;')
    $('.popover.fade').addClass('bottom')
    $('.popover.fade.in.bottom').css('min-width', '280px');
    $('.arrow').css('right', '-11px');
    $('.arrow').css('left', '130px');
    $('.popover-content').css('min-width', '255px');
    $('.popover-content').css('height', '68px');
    //$('.popover-content').css('margin-top', '10px');
    $('.popover-content').css('padding-top', '1px');
    $('.popover-content').css('padding-right', '5px');
    $('.popover-content').css('padding-left', '5px');

    event.preventDefault();
}
function SubmitCallRemark() {
    var formdata = new FormData(document.getElementById('RegForm'))
    var id = $('#issueId').val();
    //Creating an XMLHttpRequest and sending
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/CRM/AddCallRemark');
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

function SubmitCallAssignTo() {
    var empId = $("#Employee").val();
    var id = $('#PCall').val();

    $.ajax({
        type: "POST",
        url: "/CRM/CallAssignedTo",
        data: { id: id, empId: empId },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
         
            debugger;
            $('#Assignedto').modal("hide");
            var Mtitle = "Call assigned Successfully.";

            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text(Mtitle);
            // $('#CallClosedContent').html("<h4 class='text-center'>Remark added Successfully.</h4>");
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
}

function SubmitMarkAsDuplicate(ctrl) {
    var Rowid1 = $(ctrl).parent().parent().parent().parent().parent().parent()[0].id;
    var hasRemarkid = "#HasRemark-" + Rowid1
    var hasRemarkValue = $(hasRemarkid).val();
    var rowid = "#top-" + Rowid1
    var Callid = $(rowid).find(".TxtCallId").val();
    if (Callid != "" || Callid != "undefined") {
        //    if (hasRemarkValue === "Y") {
        //        $.ajax({
        //            url: '/CRM/CallMarkAsDuplicate',
        //            type: "POST",
        //            data: { MainCallid: Callid, DuplicateCallkey: Rowid1 },
        //            success: function (data) {
        //                if (data == "NoRemarkAfterLastCall") {
        //                    $('#CallClosedContent').html();
        //                    $('#CallClosed').modal(options);
        //                    var Mtitle = "There is no remark after Last Call from Customer. Please put remark!"
        //                    $('.modal-title').text(Mtitle);
        //                    $('#CallClosed').modal('show');
        //                } else {
        //                    $('#CallClosedContent').html();
        //                    $('#CallClosed').modal(options);
        //                    var Mtitle = "Call Marked as Duplicate!"
        //                    $('.modal-title').text(Mtitle);
        //                    $('#CallClosed').modal('show');
        //                    setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);
        //                }
        //            },
        //            error: function () {
        //                $('#CallClosedContent').html();
        //                $('#CallClosed').modal(options);
        //                var Mtitle = "An error occured.Please try again later!"
        //                $('.modal-title').text(Mtitle);
        //                $('#CallClosed').modal('show');
        //            }
        //        });

        //    } else {
        //        $('#CallClosedContent').html();
        //        $('#CallClosed').modal(options);
        //        var Mtitle = "Add remark first then Mark as duplicate!"
        //        $('.modal-title').text(Mtitle);
        //        $('#CallClosed').modal('show');
        //    }
        AjaxCallMarkAsDuplicate(Callid, Rowid1, hasRemarkValue)
    }
    popoverClose();

}
function AjaxCallMarkAsDuplicate(CallidText, CallKeytoDuplicate, hasRemark) {
    if (hasRemark === "Y") {
        $.ajax({
            url: '/CRM/CallMarkAsDuplicate',
            type: "POST",
            data: { MainCallid: CallidText, DuplicateCallkey: CallKeytoDuplicate },
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
    var rowid = "#top-" + CallKeytoDuplicate;
    $(rowid).find(".TxtCallId").val("");
}
//Show remarks of a task when clicking on the icon
function ViewRemarks(ctrl) {
    popoverClose()
    popOverOpen = true
    var id = $(ctrl).parent().parent()[0].id;
    var Rowid = "#top-" + id;
    var Callid = $(Rowid).children(1)[1].innerText;
    CurrentHoverRowId = id;
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
    var more2 = $("<div class='col-md-12 ShowRemarksValue' style='margin-bottom:40px' id='' ></div>");
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
        url: "/CRM/AddRemarkData",
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
            //$(".popover-content").css("width", "700px")
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
    $('.popover.fade.right.in').css('max-width', '900px')
    $('.popover.fade.right.in').css('left', '-900px');
    $('.popover.fade.right.in').css('background-color', 'white');
    $('.popover.fade.right.in').css('top', '0px');
    //  $('.arrow').css('left', '30px');//13
    $('.popover-content').css('width', '700px');
    $('.popover-content').css('padding-top', '0px');
    $('.popover-content').css('overflow-y', 'scroll');


    event.preventDefault();
}
function SubmitLinkCustomer() {
    var P_customers = $("#P_Customers").val();
    var id = $("#Issuesfilegstkey").val();

    $.ajax({
        type: "POST",
        url: "/CRM/LinkCustomer",
        data: { id: id, P_Customers: P_customers },
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
            var Mtitle = "Customer is linked Successfully.";
            $("#P_Customers").val("");
            $("#Issuesfilegstkey").val("");
            $("#FirmName1").val("");

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
}
function SubmitMailtoDealer() {
    var formdata = new FormData(document.getElementById('MailDealer'))
    //Creating an XMLHttpRequest and sending
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/CRM/MailToDealer');
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            $('#MailToDealer').modal("hide");
            var Mtitle = "Email Sent Successfully.";
            $('#CallClosedContent').html('');
            $('#CallClosed').modal(options);
            $('#CallClosed .modal-title').text(Mtitle);
            $('#CallClosed').modal("show");
            setTimeout(function () { $('#CallClosed').modal("hide"); }, 1000);
            $("#issuesfilegstkeyMailTodealer").val("");
            $("#MailtodealerEmail").val("");
            $("#OtherEmail").val("");

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
function SubmitMsgToCustomer() {
    var Pcall = $("#PCallMsgToCustomer").val();
    var MobNo = $("#Mobileno").val();
    var PhoneMsg = $("#T").val();
    $.ajax({
        type: "POST",
        url: "/CRM/MsgToCustomer",
        data: { PCall: Pcall, MobNo: MobNo, Message: PhoneMsg },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            
            debugger;
            $('#MsgCustomer').modal("hide");
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
function SubmitMailToCustomer() {
    var Pcall = $("#PCallMailToCustomer").val();
    var email = $("#emailMailtoCustomer").val();
    var Msg = $("#msgMailToCustomer").val();
    $.ajax({
        type: "POST",
        url: "/CRM/MailToCustomer",
        data: { PCall: Pcall, EmailId: email, Message: Msg },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
         
            debugger;
            $('#MailToCustomer').modal("hide");
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
}
function submitCallCollaborator() {
    var Pcall = $("#CallCollaborators #PCall").val();
    var collabId = $("#collaboratorId").val();

    $.ajax({
        type: "POST",
        url: "/CRM/AddCallCollaborators",
        data: { PCall: Pcall, collaboratorId: collabId },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
          
            debugger;
            $('#CallCollaborators').modal("hide");
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
}
function submitOnsiteVisit() {
    var Pcall = $("#PCall1").val();

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
            $('#OnsiteModal').modal("hide");
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
            var Mtitle = "Select a Row";
            $('#NoRow .modal-title').text(Mtitle);
            $('.modal-title').css('text-align', 'center');
            $('#NoRow').modal('show');
        }
    });
}
function defferCallSubmit(ctrl) {
    var rid = $(ctrl).parent().parent().parent().parent().parent().parent()[0].id;
    var id = rid.split("-")
    var rowid = "#" + rid
    var CallId = ""
    if ($(rowid).parent().hasClass("red")) {
        CallId = $(rowid).children(1)[5].innerText;
    } else {
        CallId = $(rowid).children(1)[4].innerText;
    }
    var NextDate = $(rowid).find(".NextActionDate").val();
    if (NextDate != undefined && NextDate != "") {
        popoverClose()
        $.ajax({
            type: "GET",
            url: "/CRM/DefferCalls",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: { Callid: CallId, NextActionDate: NextDate },
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


}
function ShowCollaborators(ctrl) {

    var id = $(ctrl).parent().parent().parent().parent()[0].id;
    var Rowid = "#top-" + id;
    var CallPid = $(Rowid).children(1)[1].innerText;
    if ($(RowId).parent().hasClass("red")) {
        CallPid = $(Rowid).children(1)[5].innerText;
    } else {
        CallPid = $(Rowid).children(1)[4].innerText;
    }


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

    $('#ViewCollaborator').modal(options);
    $('#ViewCollaborator').modal('show');

    event.preventDefault();
}
function ReloadGrid() {
    $("#example div").remove();
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 40 }
    GetEmployeeData(1, 0, 40);
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

    $.post('/CRM/AjaxGetJsonDataSortManageRegCalls', { id: "", start: 1, pSize: a, search: b, order: o, ServerOrderValue: firmname }, function (data) {
        loadData(data);
    })
}

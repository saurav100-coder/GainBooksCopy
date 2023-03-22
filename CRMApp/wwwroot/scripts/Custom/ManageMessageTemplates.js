var popOverOpen = false;
var CurrentHoverRowId = 0;
var options = {
    "backdrop": "static",
    "keyboard": false
}

$(document).ready(function () {
    sessionStorage.clear();
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 10 }
    var SelectedRows = "";
    GetData(0, t);
    sessionStorage.setItem("search", null);
    LoadVaribles();

    //PREV. Button 
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
        if (a != null) { d = (d - a) - 1; } else { d = (d - 20) - 1; }
        $("#example tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d >= 0) {
            $.post('/Configuration/AllMessageTemplates', { start: d, pSize: a, search: b, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });


    //Next Button 
    $("#Next").on("click", function () {
        
        var b = sessionStorage.getItem("Total");
        var a = sessionStorage.getItem("PageSize");
        var c = sessionStorage.getItem("search");
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
        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 20 - 1; }
        $("#example tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/Configuration/AllMessageTemplates', { start: d, pSize: a, search: c, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });

});

//Get Template List Data
function GetData(start, PSize) {
    $("#example tbody div").remove();
    $('#loading').show();
    $('#loadingmessage').show();
    $.post("/Configuration/AllMessageTemplates", { start: start, pSize: PSize }, function (data) {
        sessionStorage.setItem("Total", data.recordsTotal);
        loadData(data);
    });
}


function DeleteTemplateCtrls(ctrl) {
    var id = $(ctrl).parent().parent()[0].id;
    $("#deleteTemplateForm #p_msgTemplate").val(id);
    $("#deleteTemplate").modal(options);
    $("#deleteTemplate").modal("show");
}

function DeleteTemplate() {
    $("#deleteTemplate").modal("hide");
    var Pid = $("#deleteTemplateForm #p_msgTemplate").val();
    $.post('/Configuration/AjaxDeleteMsgTemplate', { p_msgTemplate: Pid}, function (data) {
        if (data.toLowerCase() === "success") {
            ShowMsg("Template Deleted successfully", "success");
            reloadGrid();
        }
        else if(""){
            window.location.href = "/home/logout";
        }
        else {
            showMsg(data);
        }
    });
}

//Show Messages
function ShowMsg(msg, msgType) {
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



//Load Template list on view
function loadData(data) {
    $("#side").removeClass("test")
    var tblEmployee = $("#example ");
    $("#example  div").remove();
    var a = data.draw;
    if ($("#Next").hasClass("disabledbutton") == true) {
        $("#Next").removeClass("disabledbutton");
    }
    if ($("#Prev").hasClass("disabledbutton") == true) {
        $("#Prev").removeClass("disabledbutton");
    }
    var d = sessionStorage.getItem("PageSize");
    if (d == null || d == 0 || d == "undefined") { d = 10; sessionStorage.setItem("PageSize", d); };
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
    $.each(data.data, function (index, item) {
         m = m + 1;
        var Parentdiv = $("<div id='MainDiv-" + item.Msgtemplate_key + "' class='maindiv clickable parentdiv' style='position:relative;' onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        tblEmployee.append(Parentdiv);
        var div = $("<div id='tr-" + item.Msgtemplate_key + "' class='MainTr' style='height:42px; padding-left:0 !important;' onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        var active = item.Active == "Y" ? "Yes" : "No";
        div.html(("<div  class='Sno basicTr'> &nbsp; " + m + "</div>")
         + " " + ("<div  class='Templateid basicTr'>" + item.P_msgtemplate + "</div>")
            + " " + ("<div  class='TemplateType basicTr clampTr'>" + item.TextTemplatetype + "</div>")
         + " " + ("<div  class='TemplateTitle basicTr clampTr'>" + item.Title + "</div>")
         + " " + ("<div  class='TemplateText basicTr clamp'>" + item.Text + "</div>")
         + " " + ("<div  class='Templatestatus basicTr'>" + active + "</div>")
         + " " + ("<div  class='CreateDate basicTr'>" + item.FrmmTimestamp + "</div>"));
        Parentdiv.append(div);
        var MoreDetailHtml = "";
        var MoreDetailsdiv = $(("<div class='MoreDetails col-sm-12' id='" + item.P_msgtemplate + "'  style='opacity:1;margin-left: 990px'> </div>")); 
        MoreDetailHtml += "<a data-toggle='Edit Template'><img src='/images/edit.png' style='width: 38px; margin-top:-4px;' onclick='EditTemplate(this)'> </a> ";
        MoreDetailHtml += "<a data-toggle='Delete&nbsp&nbsp&nbsp'> <img src='/images/icon-delete.png' onclick = 'DeleteTemplateCtrls(this)' style='width:20px; padding-top:6px;'></a>";

        MoreDetailsdiv.append(MoreDetailHtml);
        div.append(MoreDetailsdiv);

    });
    if (data.recordsTotal == 0) {
        //$('#loading').show();
        //$('#loadingmessage').hide();
        //$('#loading').addClass('clickable');
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $('#loading').addClass('clickable');
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
    }
    Deviceheight();
}

//Set table height according to screen 

function Deviceheight() {
    var sidebarposition = side.getBoundingClientRect();
    $("#example").height(sidebarposition.height - 78)
    //var Header = $("header").height();
    //var icondiv = $(".calHeightIcon").height();
    //var TableDive = $(".calHeightTaskBar").height();
    //var Footer = $(".main-footer").height();
    //var windowHeight = $(window).height();
    //var SumOfElementHeight = Header + TableDive + icondiv + Footer;
    //var MainHeight = windowHeight - SumOfElementHeight - 85;
    //$("#example").height(MainHeight);
}

Sidebar = $(".sidebar")[0];
var resizeObserver = new ResizeObserver(() => {
    var sidebarposition = side.getBoundingClientRect();
    $("#example").height(sidebarposition.height - 78)
    $(".right").height(sidebarposition.height)
    if ($(Sidebar).hasClass("test")) {
        $("#example").height(0)
    }

});

resizeObserver.observe(Sidebar);

$(document).ready(function () {
    $("#dropdown").removeClass("setStyle");
    $(window).resize(function () {
        Deviceheight();
        //DetailPaneHeight();
    });
});
//Load Variable Select List
function LoadVaribles() {
    $.ajax({
        url: "/Configuration/GetVariablesList",
        type: "Get",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                var html = "";
                $.each(data, function (index, item) {
                    html += "<option value=" + item.P_VariableTable + ">" + item.VariableName + "</option>"
                });
                $('#lstVariables').html(html);
            }
        }
    });
}

//when a row is hover show controls
function hoverId(ctrl) {
    if (popOverOpen == true) {
        $(".MoreDetails").not(CurrentHoverRowId).hide;
    } else {
        $(ctrl).find('.MoreDetails').show();
        $(ctrl).find('.MoreDetails').css("display", "inline-flex");
    }
}

//when row is not hover hide controls
function hoverNot(ctrl) {
    $('.MoreDetails').hide();
    if (popOverOpen == true) {
        $(CurrentHoverRowId).find('.MoreDetails').show();
    }
}

//Add Template button
function  CreateTemplate() {
    $.ajax({
        type: "Get",
        url: "/Configuration/MessageTemplateForm",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                $('#CreateMsgTemplateForm').html(data);
                $('#CreateMsgTemplateModel').modal(options);
                $('#CreateMsgTemplateModel').modal('show');
                $(".PanelForm").css({ "border": "none", "box-shadow": "none", "width": "200px" });
                $(".Task").css({ "margin-top": "0px", "margin-bottom": "10px" });
                $(".hr").append('<hr />')
                $(".hr").css("margin-bottom", "20px")
                $(".mainpanel").css({ "margin-left": "0px", "padding-left": "5px", "width": "270px" });
                $(".labeltext").css({ "margin-bottom": "10px" });
                $(".forminput").css({ "margin-bottom": "15px" });
                $(".mainbutton").css({ "margin": "20px 0px 20px 15px" });
                $(".cancel").attr("data-dismiss", "modal");
            }
        }
    });
};

//Reload Button
function reloadGrid() {
    $("#example  div").remove();
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 10 }
    GetData(0, t)
    Deviceheight();
}

//Edit Template button
function EditTemplate(ctrl) {
    var ID = $(ctrl).parent().parent()[0].id;
    $.ajax({
        type: "Get",
        url: "/Configuration/MessageTemplateForm?exitmode=Edit&id=" + ID,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                $('#CreateMsgTemplateForm').html(data);
                $('#CreateMsgTemplateModel').modal(options);
                $('#CreateMsgTemplateModel').modal('show');
                $(".PanelForm").css({ "border": "none", "box-shadow": "none", "width": "200px" });
                $(".Task").css({ "margin-top": "0px", "margin-bottom": "10px" });
                $(".hr").append('<hr />')
                $(".hr").css("margin-bottom", "20px")
                $(".mainpanel").css({ "margin-left": "0px", "padding-left": "5px", "width": "270px" });
                $(".labeltext").css({ "margin-bottom": "10px" });
                $(".forminput").css({ "margin-bottom": "15px" });
                $(".mainbutton").css({ "margin": "20px 0px 20px 15px" });
                $(".cancel").attr("data-dismiss", "modal");
            }
        }
    });
}






/**feature
            1. Show Variable List on right-click
            2. Set value on cursor position in TextArea
            3. Hide Variale List after select a value(In This case user click on list)
            4. Hide Variale List Without select a value(In This case user Press ESC key or click anywhere on screen )
          **/

var txtmsg = $('#Text');
window.onkeydown = listenKeys;
window.onclick = hideContextMenu;

//1. Show Variable List on right-click
function ShowContextmenu(event) { 
    var contextMenu = document.getElementById('contextMenu');
    event.preventDefault();
    contextMenu.style.display = 'inline';
    var dialogElm = $("#CreateMsgTemplateModel .modal-body ");
    var relativeX = event.pageX - dialogElm.offset().left;
    var relativeY = event.pageY - dialogElm.offset().top;
    contextMenu.style.left = relativeX + "px";
    contextMenu.style.top = relativeY + "px";
    return false;
}

//2  Set value on cursor position in TextArea
function setTextToCurrentPos() {
    var curPos = document.getElementById("Text").selectionStart;
    let x = $("#Text").val();
    let text_to_insert = "~~" + $("#lstVariables :selected").text();
    $("#Text").val(x.slice(0, curPos) + text_to_insert + x.slice(curPos));
    $("#Text").focus();
}

//3  Hide Variale List after select a value(In This case user click on list)
function getValueAndhideContextMenu() {
    var contextMenu = document.getElementById('contextMenu');
    contextMenu.style.display = 'none';
    setTextToCurrentPos();
}

//4  Hide Variale List Without select a value(In This case user click anywhere on screen )
function hideContextMenu() {
    var contextMenu = document.getElementById('contextMenu');
    contextMenu.style.display = 'none';
}

//5 Hide Variale List Without select a value(In This case user Press ESC key  )
function listenKeys(event) {
    var keyCode = event.which || event.keyCode;
    if (keyCode == 27) {
        hideContextMenu();
    }
}




var options = { "backdrop": "static", keyboard: true };
var popOverOpen = false;
var CurrentHoverRowId = 0;
var chkvalesArr = [];
var selectAll = false;

//this is a sessionStorageKey for Search
var searchKey = "searchCallRecording";
//this is a sessionStorageKey for order
var orderKey = "orderCallRecording";
//this is a sessionStorageKey for search Criteria div value
var searchMsgKey = "searchMsgCallRecording";
//this is a sessionStorageKey for basicFilter UI consistency on Page Reload
var basicFilterStrKey = "basicFilterStrCallRecording";


function searchByFirmName() {
    var frimName = $("#firmNameFilter").val();
    if (frimName.length == 0) {
        setSearchSessionStorage("");
        setSearchMsgSessionStorage("");
        ReloadGrid();
    }
    else {
        let search = frimName + ",m3.firmname:string";
        setSearchSessionStorage(search);
        let searchMsg = "Search Results: FirmName <span class='' style='font-weight: 600'>'" + frimName + "'</span>";
        setSearchMsgSessionStorage(searchMsg);
        ReloadGrid();
    }

}


//Basic filter multiple
function SubmitBasicFilter(search, searchMsg) {
    chkvalesArr = [];
    var pSize = sessionStorage.getItem("PageSize");
    $("#example div").remove();
    $("#example").height(0);
    $("#selectall").prop('checked', false);
    $('#loading').show();
    $('#loadingmessage').show();
    /*$('#Msg').hide();*/
    $.ajax({
        url: "/CRM/ajaxGetCallRecordingOfRegCalls",
        type: "POST",
        data: { id: "", start: 0, pSize: pSize, search: search },
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


function loadData(data) {
    var CollabPopOpen = false

    var tblEmployee = $("#example");
    $("#example div").remove();
    $("#example").height(0);
    $("#selectall").prop('checked', false);
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
    $("#RightShift").click();

    $.each(data.data, function (index, item) {
        var Parentdiv = "";
        var MoreDetailsdiv = "";


        Parentdiv = $("<div id='MainDiv-" + item.callrecordings_key + "' class='col-md-12  clickable parentdiv maindiv' onmouseover='hoverId(this)' onmouseout='hoverNot(this)'></div>");
        MoreDetailsdiv = $(("<div  class='MoreDetails MoreDetailsDiv' id='" + item.callrecordings_key + "'> </div>"))

        tblEmployee.append(Parentdiv);
        m = m + 1;
        var div = $("<div id='tr-" + item.callrecordings_key + "'  class='MainTr'></div>");
        div.html(("<div class='col-md-1 sno' style='width: 6%; padding:0px;' id='" + item.callrecordings_key + "' value='" + item.callrecordings_key + " style='margin-top:2px; float:left'><input type='checkbox' onclick='chkCheckUncheck(this)' class='checkboxall' id='chk-" + item.callrecordings_key + "' value='" + item.callrecordings_key + "' style='margin-top:2px; margin-right:10px; float:left'>" + m + ".</div>")
            + " " + ("<div class='col-md-1 basicTr call' style='width:7%; text-align: center;'><input type='hidden' class='filename' value='" + item.filename + ".amr' /><input type='hidden' class='linkurl' value='" + item.linkurl + "' />" + item.linkcode + "</div>")
          //+ " " + ("<div class='col-md-1 basicTr time' style='width: 8%; padding:0;'>" + item.Textmtimestamp + "</div>")
            + " " + ("<div class='col-md-1 basicTr time' style='width: 8%; padding:0;'>" + item.TextCallTime + "</div>")
            + " " + ("<div class='col-md-1 basicTr firm clamptr' style='width: 13%;'>" + item.Firmname + "</div>")
            + " " + ("<div class='col-md-1 basicTr mobile' style='width: 8%; padding:0;'>" + item.Mobileno + "</div>")
            + " " + ("<div class='col-md-1 basicTr location' style='width: 11%;text-align: left;'>" + item.Location + "</div>")
            + " " + ("<div class='col-md-1 basicTr type clamptr' style='width:12%; padding:0;'>" + item.TextIssuetype + "</div>")
            + " " + ("<div class='col-md-1 basicTr desc clamptr' style='width: 14%;text-align: left; padding:0;'>" + item.Issuedescription + "</div>")
            + " " + ("<div class='col-md-1 basicTr status' style='width:10%; text-align:left;'>" + item.TextStatus + "</div>")
            + " " + ("<div class='col-md-1 basicTr clamptr source' style='width:11%;padding-left:0; padding-right:0;'>" + item.source + "</div>")
            + " " + ("<div class='col-md-1 basicTr assign' style='width:11%;'>" + item.TextAssignedto + "</div>")
            )
        Parentdiv.append(div);

        MoreDetailsdiv.html(("<a data-toggle='Play Recording' style='cursor:pointer' onclick='PlayFile(" + item.callrecordings_key + ")'><i class=' atag glyphicon glyphicon-play' data-placement='right'  style='font-size:20px; color:#616A6B;padding-left:11px;'></i></a>" +
            "<a data-toggle='Download' style='cursor:pointer' onclick='DownloadFile(" + item.callrecordings_key + ")'><i class=' atag glyphicon glyphicon-download' data-placement='right'  style=' font-size:20px; color:#616A6B;padding-left:11px;'></i></a>"
        ));
       

        div.append(MoreDetailsdiv);

        if (selectAll) {
            $("#selectall").prop('checked', true);
            $('.checkboxall').each(function () {
                $(".checkboxall").prop('checked', true);
            })
        }
        else {
            for (var i = 0; i < chkvalesArr.length; i++) {
                $("#chk-" + chkvalesArr[i]).prop('checked', true);
            }
        }
    });
    if (data.data.length == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $('#loading').addClass('clickable');
        $("#example").height(0);
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
        Deviceheight();
    }
    
}


//Set table height according to screen

function Deviceheight() {
    var h = $(".content-wrapper").css("min-height")
    $("#example").height(h);
    //var sidebarposition = side.getBoundingClientRect();
    //$("#example").height(sidebarposition.height - 100)
    //var Header = $("header").height();
    //var Container = 0;
    //var icondiv = $(".calHeightIcon").height();
    //var TableDive = $(".calHeightTaskBar").height();
    //var Footer = $(".main-footer").height();
    //var windowHeight = $(window).height();
    //var SumOfElementHeight = Header + Container + TableDive + icondiv + Footer;
    //var MainHeight = windowHeight - SumOfElementHeight - 6;
    //$("#example").height(MainHeight);
}

var Sidebar = $(".sidebar")[0];
var resizeObserver = new ResizeObserver((event) => {
    var h = $(".content-wrapper").css("min-height")
    $("#example").height(h);

});
resizeObserver.observe(Sidebar);

$(window).resize(function () {
      Deviceheight();   
});

function DownloadFile(id) {
    var rowid = "#tr-" + id;
    var Filename = $(rowid)[0].children[1].children[0].value;
    var LinkUrl = $(rowid)[0].children[1].children[1].value;
    //window.location = '/CRM/downloadRecordedRegCall?Filename=' + Filename;
    $.post('/CRM/downloadRecordedRegCall', { Filename: Filename, LinkUrl: LinkUrl }, function (data) {
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
            window.location.href = "/CRM/DownloadFile?FullFilepath=" + data.FullFilepath + "&contentType=" + data.contentType + "&filename=" + data.filename
        }
    })
 
  
}

//Download Multiple Call RecordingFiles
function DownloadMultipleFiles() {
    var strLinkUrl = "";
    $(".checkboxall:checked").each(function () {
        var id = $(this).val();
        var rowid = "#tr-" + id;
        var LinkUrl = $(rowid)[0].children[1].children[1].value;
        strLinkUrl += strLinkUrl == "" ? LinkUrl : "," + LinkUrl;
    });
    window.location.href = '/CRM/downloadMultipleRecordedRegCall?LinkUrl=' + strLinkUrl;
}




$(document).ready(function () {
    $("nav").find(".newTitle").remove();
    var s = "<p class='newTitle' > Service Request Recordings</p>";
    $("nav").find(".titleName").append(s);


    var prevLeft = 0;
    $("#example").scroll(function (evt) {
        var currentLeft = $(this).scrollTop();
        if (prevLeft != currentLeft) {
           
            //$(".MoreDetails").css("display", "none");
            //$(".MoreDetailsDiv").removeClass("MoreDetails").addClass(".MoreDetailsscroll");
        }
        //$(".MoreDetailsDiv").removeClass("MoreDetailsscroll").addClass(".MoreDetails");
    });
$("#selectall").click(function () {
    
    if (this.checked) {
        $('.checkboxall').each(function () {
            $(".checkboxall").prop('checked', true);
            var s = $(this).parent().parent();
            var m = s.find(".MoreDetails");
            var n = m.find(".atag");
            var c = n.find("i");            
             $(n).addClass('colorwhite');

            $(s).parent().addClass('highlight');
            $(m).addClass('highlight');


            $(s).parent().removeClass('clickable');

            var index = chkvalesArr.indexOf($(this).val());
            if (index == -1) {
                chkvalesArr.push($(this).val());
            }
        })
        $("#subDiv #subDivLable").text("Select all rows");
        $("#subDiv").show();
    } else {
        $('.checkboxall').each(function () {
            $(".checkboxall").prop('checked', false);
            var t = $(this).parent().parent();
            var m = t.find(".MoreDetails");
            var n = m.find(".atag");
            console.log(n);
            $(n).removeClass('colorwhite');
            $(t).parent().removeClass('highlight');
            $(m).removeClass('highlight');
            $(t).parent().removeClass('clickable');
            var index = chkvalesArr.indexOf($(this).val());
            if (index > -1) {
                chkvalesArr.splice(index, 1);
            }
        })
        selectAll = false;
        $("#subDiv").hide();
    }

});


$('#example').on('click', "input[type='checkbox']", function () {
    
    if ($(this).prop("checked") == true) {
        var s = $(this).parent().parent();
        var m = s.find(".MoreDetails");
        var n = m.find(".atag");
        // var c = n.find("i");
        console.log(n);
        $(n).addClass('colorwhite');

        $(s).parent().toggleClass('highlight');
        $(m).toggleClass('highlight');
        $(m).css("color", "white !important");
        $(s).parent().removeClass('clickable');
    }
    else if ($(this).prop("checked") == false) {
        var t = $(this).parent().parent();
        var m = t.find(".MoreDetails");
        var n = m.find(".atag");
        console.log(n);
        $(n).removeClass('colorwhite');
        $(t).parent().toggleClass('highlight');
        $(m).toggleClass('highlight');
        $(t).parent().removeClass('clickable');
    }
});
});

function PlayFile(id) {
    $("#AUDIO").remove();
    $(".close").remove();
  
    var rowid = "#tr-" + id;
    var Filename = $(rowid)[0].children[1].children[0].value;
    var LinkUrl = $(rowid)[0].children[1].children[1].value;
    var path = '/CRM/PlayAudio?Filename=' + Filename + "&LinkUrl="+LinkUrl;
    gfg = document.createElement("AUDIO");
    gfg.setAttribute("src", path);
    gfg.setAttribute("controls", "controls");
    gfg.crossOrigin = 'anonymous';
    gfg.id = 'AUDIO'
    gfg.play();
    $(rowid).append(gfg);

    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    $(rowid).append(span);

    var d = document.createElement("div");//created new parent div for audio player & close btn
    d.className = "AudioDiv";
    d.appendChild(gfg);
    d.appendChild(span);
    $(rowid).append(d);

    span.addEventListener('click', () => {
        $("#AUDIO").remove();
        $(".close").remove();
    });

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

    $("#filter").on("change", function () {
        var a = $("#filter").val();
        $(".filterDiv").css("display", "none")
        if (a != "0" && a != "1") {
            b = a.split(":");
            if (b[0] == 2) {
                $("#DateC").css("display", "");
            } else if (b[0] == 3 || b[0] == 5) {
                $("#TextC").css("display", "");
            }
            else if (b[0] == 4) {
                $("#assignedtoC").css("display", "");
            }

        }
    });

    setBasicFilterUIOnPageReload();

    sessionStorage.setItem("start", 0);
    //sessionStorage.setItem("search", "");
    //sessionStorage.setItem("order", "");
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 50 }
    var SelectedRows = "";
    //GetEmployeeData(a, 0, t);
    setInterval(ReloadGrid(), 15 * 60 * 1000);//setting Interval of 15 minutes by which every 15 minutes grid is getting refresh.

    $("#Prev").on("click", function () {
        var a = sessionStorage.getItem("PageSize");
        //var b = sessionStorage.getItem("search");
        var b = sessionStorage.getItem(searchKey);
        if (b == "null") {
            b = "";
        }
        var d = sessionStorage.getItem("start");
        //var o = sessionStorage.getItem("order");
        var o = sessionStorage.getItem(orderKey);
        var total = sessionStorage.getItem("Total");
        //if (o != undefined && o != "null") {
        //    order = o.split(":");
        //    var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
        //    ordervalue = $(orderid).text();
        //    o = order[1] + "~" + ordervalue + "~" + order[2];
        //    JSON.stringify(o);
        //}
        if (a != null) { d = (d - a) - 1; } else { d = (d - 50) - 1; }
        $("#example div").remove();
        $("#example").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d >= 0) {
            $.post('/CRM/ajaxGetCallRecordingOfRegCalls', { id: "", start: d, pSize: a, search: b, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });
    $("#Next").on("click", function () {
        var total = sessionStorage.getItem("Total");
        var a = sessionStorage.getItem("PageSize");
        //var c = sessionStorage.getItem("search");
        var c = sessionStorage.getItem(searchKey);
        if (c == "null") {
            c = "";
        }
        var d = sessionStorage.getItem("start");
        //var o = sessionStorage.getItem("order");
        var o = sessionStorage.getItem(orderKey);
        //if (o != undefined && o != "null") {
        //    order = o.split(":");
        //    var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
        //    ordervalue = $(orderid).text();
        //    o = order[1] + "~" + ordervalue + "~" + order[2];
        //    JSON.stringify(o);
        //}
        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 50 - 1; }
        $("#example div").remove();
        $("#example").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/CRM/ajaxGetCallRecordingOfRegCalls', { id: "", start: d, pSize: a, search: c, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });

    
   
    $("#assignedto").on("change", function () {
        var text = $("#assignedto option:selected").text();
        var value = $("#assignedto").val();
        var col = "m2.linkcode";
        var search = value + "," + col + ":integer";
        $(".filterclose").show();
        $(".filterclose").addClass("paddingforClearFilter");
        JSON.stringify(search);
        //sessionStorage.setItem("search", search);

        var searchMsg = "Search Results: Call Assigned to <span class='' style='font-weight: 600'>'" + text + "'</span>";
        var basicFilterStr = $("#filter").val() + "~#assignedto:" + value;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);

        var pSize = sessionStorage.getItem("PageSize");
        chkvalesArr = [];
        $("#example div").remove();
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/CRM/ajaxGetCallRecordingOfRegCalls',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                //$("#fText").text(text);
                //$("#FilterText").show();
                //$(".filterDiv").css("display", "none")
                //$(".resultDiv .result-msg").html("<p>Search Results: Call Assigned to <span class='' style='font-weight: 600'>'" + text + "'</span></p> ");
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p>");
                    $(".resultDiv").show();
                    sessionStorage.setItem("Total", data.recordsTotal);
                    loadData(data);
                }
            },
            error: function (data) {
                alert("Failed");
            }
        });
    });
    
    
});


function removeFilter() {
    //$(".filterDiv").css("display", "none")
    //$("#assignedto").val(0);
    //$("#filter").val(0);
    //$("#filterText").val("");
    //$("#DateC #min").val("");
    //$("#DateC #max").val("");
    //$(".filterclose").hide();
    ////sessionStorage.setItem("search", "");
    ////sessionStorage.setItem("order", "");
    //setSearchSessionStorage("");
    //setOrderSessionStorage("");
    //$(".resultDiv .result-msg").html("");
    //$(".resultDiv").hide();
    removeBasicAdvanceFilter();
    ReloadGrid();
}

function DoSearch() {
    var ValueToSearch = $("#filterText").val().trim();
    var filterSelected = $("#filter").val();
    var filter = filterSelected.split(":")
    var col = ""
    var search = ""
    var searchMsg = "";
    var basicFilterStr = "";
    if ($("#filterText").val() != "" || $("#filterText").val() != "undefined") {
        if (filter[0] == 3) {
            value = $("#filterText").val();
            col = "m3.firmname";
            search = ValueToSearch + "," + col + ":string";
            searchMsg = "Search Results: Firm Name <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        if (filter[0] == 5) {
            value = $("#filterText").val();
            col = "m1.linkcode ";
            search = ValueToSearch + "," + col + ":integer";
            searchMsg = "Search Results:  CallId <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        $(".filterclose").show();
        $(".filterclose").addClass("paddingforClearFilter");
        JSON.stringify(search);
        //sessionStorage.setItem("search", search);
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem("PageSize");
        chkvalesArr = [];
        $("#example div").remove();
        $("#example").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/CRM/ajaxGetCallRecordingOfRegCalls',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                //$(".filterDiv").css("display", "none")
                //$("#fText").text(ValueToSearch);
                //$("#FilterText").show();
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p>");
                    $(".resultDiv").show();
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

    value1 = $("#DateC #min").val();
    value2 = $("#DateC #max").val();
    col = "m1.mtimestamp";
    search = value1 + "," + value2 + "," + col + ":date";
    $(".filterclose").show();
    $(".filterclose").addClass("paddingforClearFilter");
    var searchMsg = "Search Results: Date From <span class='' style='font-weight: 600'>'" + value1 + "'</span>  To <span class='' style='font-weight: 600'>'" + value2 + "'</span>";
    JSON.stringify(search);
    //sessionStorage.setItem("search", search);
    var basicFilterStr = $("#filter").val() + "~#DateC #min:" + value1 + "|#DateC #max:" + value2;
    setSearchSessionStorage(search);
    setSearchMsgSessionStorage(searchMsg);
    setBasicFilterStrSessionStorage(basicFilterStr);
    var pSize = sessionStorage.getItem("PageSize");
    chkvalesArr = [];
    $("#example div").remove();
    $("#example").height(0);
    $("#loading").show();
    $('#loadingmessage').show();

    $.ajax({
        url: '/CRM/ajaxGetCallRecordingOfRegCalls',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search },
        success: function (data) {
            // $("#fText").text(value);
            // $("#FilterText").show();
           // $(".resultDiv .resultContent").html("<div class='result-msg' style='word-spacing:3px;'>Search Results:  Start Date From<span class='' style='font-weight: 600'>  " + value1 + "  </span> To <span class='' style='font-weight: 600'>" + value2 + "</span></div>");;
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                $(".resultDiv  .result-msg").html("<p>" + searchMsg + "</p>");
                $(".resultDiv").show();
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
    // $("#AUDIO").remove();
}

function GetEmployeeData(pageNumber, start, PSize) {
    //var search = sessionStorage.getItem("search");
    //var order = sessionStorage.getItem("order");
    var search = sessionStorage.getItem(searchKey);
    var order = sessionStorage.getItem(orderKey);
    if (search==null || search == "") {
        $(".resultDiv .result-msg").html("");
        $(".resultDiv").hide();
    }
    else if (search != "" && sessionStorage.getItem(searchMsgKey) !== null) {
        $(".resultDiv .result-msg").html("<p>" + sessionStorage.getItem(searchMsgKey) + "</p>");
        $(".resultDiv").show();
    }

    chkvalesArr = [];
    $("#example  div").remove();
    $("#example").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $.ajax({
        type: "POST",
        url: "/CRM/ajaxGetCallRecordingOfRegCalls",
        data: { id: "", start: start, pSize: PSize, search: search, order: order },
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });
}

// function to close button on popover
function popoverClose() {
    popOverOpen = false
    $('.popover').hide();
    $('.MoreDetails').popover('hide');
    $("#ShowSubTaskControlDiv").popover('hide');
    $(".ShowRemark").popover('hide');
}
function ReloadGrid() {
    //removeFilter();
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 50 }
    GetEmployeeData(1, 0, 50);
    $("#fText").text("");
    $("#FilterText").hide();
}


function SubmitFilterSort(search, order, pSize, searchMsg) {
    $('#FilterModel').modal('hide');
    chkvalesArr = [];
    $("#example div").remove();
    $("#example").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $.ajax({
        url: '/CRM/ajaxGetCallRecordingOfRegCalls',
        type: "POST",
        data: { start: 0, pSize: pSize, search: search, order: order },
        success: function (data) {
            $(".filterclose").show();
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

    $.post('/CRM/ajaxGetCallRecordingOfRegCalls', { id: "", start: 1, pSize: a, search: b, order: o, ServerOrderValue: firmname }, function (data) {
        loadData(data);
    })
}
//$('#example').on('contextmenu', 'div.parentdiv', function (e) {
//    console.log("right clicked");
//});

function chkCheckUncheck(ctrl) {
    if (ctrl.checked) {
        var index = chkvalesArr.indexOf($(ctrl).val());
        if (index == -1) {
            chkvalesArr.push($(ctrl).val());
        }
    }
    else {
        var index = chkvalesArr.indexOf($(ctrl).val());
        if (index > -1) {
            chkvalesArr.splice(index, 1);
        }
    }
}





function Allselection() {
    if (!selectAll) {
        selectAll = true;
        $("#subDiv #subDivLable").text("Clear selections");
    }
    else {
        selectAll = false;
        $("#selectall").prop('checked', false);
        $('.checkboxall').each(function () {
            $(".checkboxall").prop('checked', false);
        })
        chkvalesArr = [];
        $("#subDiv").hide();
    }


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
//            var arr = str.split("~");
//            $("#filter").val(arr[0]).trigger('change');
//            var controls = arr[1].split("|");
//            for (var i = 0; i < controls.length; i++) {
//                var ctrl = controls[i].split(":");
//                //setFilterControlValueOnPageReload(ctrl[0],ctrl[1]);
//                var type = $(ctrl[0]).prop("type");
//                if (type == "select-multiple") {
//                    var valArr = ctrl[1].split(",");
//                    $(ctrl[0]).val(valArr);
//                    $("#btnTagSearch").show()
//                }
//                else {
//                    $(ctrl[0]).val(ctrl[1]);
//                }

//            }
//            $(".filterclose").show();
//            $(".filterclose").addClass("paddingforClearFilter");
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




$('#example').on('contextmenu', 'div.parentdiv', function (e) {
    console.log("right clicked");
});
$(function () {
    /**************************************************
     * Custom Command Handler
     **************************************************/
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
                        //function to show Edit model
                        case "Play":
                            PlayFile(id);
                            break;
                        case "Download":
                            DownloadFile(id);
                            break;

                        //9) function to redirect to  view Setting controller
                        //case "ViewSetting":
                        //    window.location = '/Configuration/ViewSetting?infotype=hoverstripstring&viewid=managecustomers'
                        //    break;
                    }
                },
                //10) blank array on item property
                items: {},

            }
            //11) for loop which we use in stpe , but this is for context menu
            if ($trigger.hasClass('parentdiv')) {
                var infoString = "1#Y#Play~2#Y#Download"
                var infoStringArray = infoString.split("~");
                var infoStringArray = infoString.split("~");
                for (var i = 0; i <= infoStringArray.length - 1; i++) {
                    var infoStringItemArray = infoStringArray[i].split("#");
                    var itemOrder = infoStringItemArray[0];
                    var itemEnable = infoStringItemArray[1];
                    var itemtext = $.trim(infoStringItemArray[2]);

                    if (itemtext.toLocaleLowerCase() == "play") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.Play = { name: "Play", icon: "fa-play" };
                        }
                    }
                    else if (itemtext.toLocaleLowerCase() == "download") {
                        if (itemEnable.toLocaleLowerCase() == "y") {
                            options.items.Download = { name: "Download", icon: "fa-download" };
                        }
                    }
                }
                //12) at last Show context menu which redirect to viewSetting Contoller
               // options.items.ViewSetting = { name: "Customize HoverStrip", icon: "glyphicon glyphicon-wrench" };
            }
            return options;
        }
    });
});



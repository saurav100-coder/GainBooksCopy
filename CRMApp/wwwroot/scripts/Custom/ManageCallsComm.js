var options = { "backdrop": "static", keyboard: true };


//this is a sessionStorageKey for Search
var searchKey = "searchCallsComm";
//this is a sessionStorageKey for order
var orderKey = "orderCallsComm";
//this is a sessionStorageKey for search Criteria div value
var searchMsgKey = "searchMsgCallsComm";
//this is a sessionStorageKey for basicFilter UI consistency on Page Reload
var basicFilterStrKey = "basicFilterStrCallsComm";

function searchRemarkBy() {
    var remarkBy = $("#remarkByFilter").val();
    if (remarkBy.length == 0) {
        setSearchSessionStorage("");
        setSearchMsgSessionStorage("");
        ReloadGrid();
    }
    else {
        let search = remarkBy + ",accmaster.accname:string";
        setSearchSessionStorage(search);
        let searchMsg = "Search Results: RemarkBy <span class='' style='font-weight: 600'>'" + remarkBy + "'</span>";
        setSearchMsgSessionStorage(searchMsg);
        ReloadGrid();
    }

}


//Basic filter multiple
function SubmitBasicFilter(search, searchMsg) {
    var psize = sessionStorage.getItem("PageSize");
    $("#example tbody tr").remove();
    $("#example tbody ").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    /*$('#Msg').hide();*/
    $.ajax({
        url: "/CRM/ajaxManageCallsComm",
        type: "POST",
        data: { start: 0, pSize: psize, search: search },
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


$(document).ready(function () {
    //logic to fill search dropdown
    var d = $("#fvalue").val();
    var m = [];
    m = d.split("|");
    var l;
    for (i = 0; i <= m.length - 1; i = i + 1) {
        l = m[i].split("~");
        $('#filter').append($('<option>', { value: l[1] + ":" + l[2], text: l[0] }));
    };
    $('a').tooltip();
    //done logic of filter dropdown
    var a = 1;

    $("#filter").on("change", function () {
        var a = $("#filter").val();
        $(".filterDiv").css("display", "none")
        if (a != "0" && a != "1") {
            b = a.split(":");
            if (b[0] == 2) {
                var a = document.getElementById("dateC")
                a.style.display = "";
            } else if (b[0] == 3 || b[0] == 5 || b[0] == 7) {
                $("#TextC").css("display", "");
            }
            else if (b[0] == 4) {
                var a = document.getElementById("IssueC")
                a.style.display = "";
            }
            else if (b[0] == 6) {
                var a = document.getElementById("remarkByC")
                a.style.display = "";
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

    setInterval(ReloadGrid(), 15 * 60 * 1000)

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
        if (a != null) { d = (d - a) - 1; } else { d = (d - 50) - 1; }
        $("#example tbody tr").remove();
        $("#example tbody").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d >= 0) {
            $.post('/CRM/ajaxManageCallsComm', { start: d, pSize: a, search: b, order: o }, function (data) {
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

        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 50 - 1; }
        $("#example tbody tr").remove();
        $("#example tbody").height(0);
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (d < total) {
            $.post('/CRM/ajaxManageCallsComm', { start: d, pSize: a, search: c, order: o, ServerOrderValue: "" }, function (data) {
                loadData(data);
            })
        }
    });




    $("#IssueFilter").on("change", function () {
        var text = $("#IssueFilter option:selected").text();
        var value = $("#IssueFilter").val();
        if (value != 0) {
            var col = "allcallsreg.Issuetype";
            var search = value + "," + col + ":integer";
            $(".filterclose").show();
            JSON.stringify(search);
            //sessionStorage.setItem("search", search);
            var searchMsg = "Search Results: Issue <span class='' style='font-weight: 600'>'" + text + "'</span>";
            var basicFilterStr = $("#filter").val() + "~#IssueFilter:" + value;
            setSearchSessionStorage(search);
            setSearchMsgSessionStorage(searchMsg);
            setBasicFilterStrSessionStorage(basicFilterStr);
            var pSize = sessionStorage.getItem("PageSize");
            $("#example tbody tr").remove();
            $("#example tbody").height(0);
            $("#loading").show();
            $('#loadingmessage').show();

            $.ajax({
                url: '/CRM/ajaxManageCallsComm',
                type: "POST",
                data: { start: 0, pSize: pSize, search: search },
                success: function (data) {
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    else {
                        $("#fText").text(text);
                        //$(".resultDiv .result-msg").html("<p>Search Results: Issue <span class='' style='font-weight: 600'>'" + text+ "'</span></p>");
                        $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p> ");
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

    });


    $("#RemarkBy").on("change", function () {
        var text = $("#RemarkBy option:selected").text();
        var value = $("#RemarkBy").val();
        if (value != 0) {
            var col = "CRMCommunication.logincode";
            var search = value + "," + col + ":integer";
            $(".filterclose").show();
            JSON.stringify(search);
            //sessionStorage.setItem("search", search);
            var searchMsg = "Search Results: Remark by <span class='' style='font-weight: 600'>'" + text + "'</span>";
            var basicFilterStr = $("#filter").val() + "~#RemarkBy:" + value;
            setSearchSessionStorage(search);
            setSearchMsgSessionStorage(searchMsg);
            setBasicFilterStrSessionStorage(basicFilterStr);
            var pSize = sessionStorage.getItem("PageSize");
            $("#example tbody tr").remove();
            $("#example tbody").height(0);
            $("#loading").show();
            $('#loadingmessage').show();

            $.ajax({
                url: '/CRM/ajaxManageCallsComm',
                type: "POST",
                data: { start: 0, pSize: pSize, search: search },
                success: function (data) {
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    else {
                        $("#fText").text(text);
                        //$(".resultDiv .result-msg").html("<p>Search Results: Remark by <span class='' style='font-weight: 600'>'" + text + "'</span></p>");
                        $(".resultDiv .result-msg").html("<p>" + searchMsg + "</p> ");
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

    });
});

function ReloadGrid() {
    //removeFilter();
    sessionStorage.setItem("start", 0);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 50 }
    GetEmployeeData(1, 0, 50);
    $("#fText").text("");
    $("#FilterText").hide();
}

function removeFilter() {
    //$(".filterDiv").css("display", "none")
    //$("#StatusFilter").val(0);
    //$("#RemarkBy").val(0);
    //$("#filter").val(0);
    //$("#filterText").val("");
    //$("#min").val("");
    //$("#max").val("");
    //$(".filterclose").hide();
    ////sessionStorage.setItem("search", "");
    ////sessionStorage.setItem("order", "");
    //setSearchSessionStorage("");
    //setOrderSessionStorage("");

    //$(".resultDiv .result-msg").html("");
    //$(".resultDiv").hide();
    removeBasicAdvanceFilter();
    ReloadGrid()
}

function GetEmployeeData(pageNumber, start, PSize) {
    //var search = sessionStorage.getItem("search");
    //var order = sessionStorage.getItem("order");
    var search = sessionStorage.getItem(searchKey);
    var order = sessionStorage.getItem(orderKey);
    if (search == null || search == "") {
        $(".resultDiv .result-msg").html("");
        $(".resultDiv").hide();
    }
    else if (search != "" && sessionStorage.getItem(searchMsgKey) !== null) {
        $(".resultDiv .result-msg").html("<p>" + sessionStorage.getItem(searchMsgKey) + "</p>");
        $(".resultDiv").show();
    }

    $("#example tbody tr").remove();
    $("#example tbody ").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $.ajax({
        type: "POST",
        url: "/CRM/ajaxManageCallsComm",
        data: { start: start, pSize: PSize, search: search, order: order },
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

function loadData(data) {
    $("#side").removeClass("test")
    var tblEmployee = $("#example tbody");
    $("#example tbody tr").remove();
    $("#example tbody ").height(0);
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
        if (item.statusCode == 500) {
            window.location.href = "/Home/Error";
        }
        var m = parseInt(a) + index;
        var tr = $("<tr id='" + item.allcallsreg_key + "' class='clickable u maindiv'></tr>");
        tr.html(("<td class='selectValue basicTr' style='width:4%;'>" + m + "</td>")
            + ("<td class='TaskIdValue basicTr' id='callid' style='width:6%; '>" + item.p_allcallsreg + "</td>")
            + ("<td class='DateValue basicTr' style='width:8%; padding-right:12px;'>" + item.FrmtCreationDate + "</td>")
            + ("<td class='TaskFirmValue basicTr clampTr' style='width:15%;padding-left:5px;font-size: 13px;'>" + item.firmname + "</td>")
            + " " + ("<td class=' Issue combineCol' style='padding-left:11px;width:20%;padding-right: 7px;'>"
                + "<div class='Tasktitle basicTr clampTr' style='font-size:13px !important' data-issuetype='" + item.Issuetype + "'>" + item.TextIssuetype + " </div>"
                + "<div class='TaskDescriptionValue basicTr clampTr' style='font-size:13px !important'>Desc - <span>" + item.issuedescription + "</span></div></td>")
            + ("<td class='RemarkValue basicTr clampTr' style='width:27%;font-size:13px !important'>" + item.Commtext + "</td>")
            + ("<td class='RemakByValue basicTr' style='width:10%; text-align:left;'>" + item.TextLogincode + "</td>")
            + ("<td class='FileValue basicTr' style='width:10%; word-wrap:break-word; padding-left:5px; '><a href='" + item.LinkURL + "' download>" + item.FileName + "</td>"));
        tblEmployee.append(tr);
    })

    if (data.recordsTotal == 0) {

        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $('#loading').addClass('clickable');
        $('#example tbody').height(0);
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
        Deviceheight();
    }
    $(document).ready(function () {
        $('.right').on('click', '#RightShift', function () {
            var isSomethingTrue = true;
            if (isSomethingTrue && ($(window).width() >= 600)) {
                Deviceheight();

                //var lastChkbox = $(".maindiv.rowActive").find(".checkboxall")[0];
                //if (lastChkbox !== undefined) {
                //    $(lastChkbox).attr("checked", false);
                //    chkCheckUncheck(lastChkbox);
                //}

                $(".maindiv").removeClass("rowActive");
                $(".main").css("display", "inline-flex");
                $("#dropdown").removeClass("setStyle");
                $(".right").hide();
                $(".left").show();
                $(".left").removeClass("move");
                $(".h").show();
                $("div").removeClass("style");
                $("div").css("box-shadow", "none");
                $(".right").css('display', 'none');
                $(".DateValue").removeClass("dateval");
                $(".Issue").removeClass("issopen");
                $(".Date").removeClass("Dateval");
                $(".issue").removeClass("Isshead");

                removeGridColumnCss();


            }
            else if (isSomethingTrue && ($(window).width() <= 600)) {
                $(".right").hide();
                $(".left").show();
                $(".left").removeClass("move");
                Deviceheight();
                DetailPaneHeight();
            }
        });
    });

    $(document).ready(function () {
        $('.tabs-navWeb a').on('click', function (event) {
            event.preventDefault();
            $('.tab-activeWeb').removeClass('tab-activeWeb');
            $(this).parent().addClass('tab-activeWeb');
            $('.tabs-stageWeb .div').hide();
            $('.tabs-stageWeb').find($(this).attr('href')).show();
        });

        $('.tabs-navWeb a:first').trigger('click'); // Default

        $('.tabs-nav a').on('click', function (event) {
            event.preventDefault();

            $('.tab-active').removeClass('tab-active');
            $(this).parent().addClass('tab-active');
            $('.tabs-stage .div').hide();
            $('.tabs-stage').find($(this).attr('href')).show();
        });

        $('.tabs-nav a:first').trigger('click'); // Default
        $('.ShareBox button').click(function () {
            $(this).prev("input").focus();
            $(this).prev("input").select();

            document.execCommand('copy');

        });

    });




}

function Deviceheight() {
    var h = $(".content-wrapper").css("min-height")
    $(".horizontal tbody").height(h);
    //var sidebarposition = side.getBoundingClientRect();
    //$(".horizontal tbody").height(sidebarposition.height - 100)
    //var Header = $("header").outerHeight(true);
    //var icondiv = $(".calHeightIcon").outerHeight(true);
    //var TableDive = $(".horizontal thead").outerHeight(true);
    //var Footer = $(".main-footer").outerHeight(true);
    //var windowHeight = $(window).height();
    //var SumOfElementHeight = Header + TableDive + icondiv + Footer;
    //var MainHeight = windowHeight - SumOfElementHeight - 15;
    //$(".horizontal tbody").height(MainHeight);
}
$(window).resize(function () {

    Deviceheight();

});

$("nav").find(".newTitle").remove();
var s = "<p class='newTitle' > Progress Notes</p>";
$("nav").find(".titleName").append(s);

function DoSearch() {
    var ValueToSearch = $("#filterText").val().trim();
    var filterSelected = $("#filter").val();
    var filter = filterSelected.split(":");
    var col = "";
    var search = "";
    var searchMsg = "";
    //(#filter).val()~ActualFilterId:value
    var basicFilterStr = "";
    if ($("#filterText").val() != "" || $("#filterText").val() != "undefined") {
        if (filter[0] == 3) {
            value = $("#filterText").val();
            col = "allcallsreg.firmname";
            search = ValueToSearch + "," + col + ":String";
            searchMsg = "Search Results: Firm Name <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        if (filter[0] == 7) {
            value = $("#filterText").val();
            col = "allcallsreg.p_allcallsreg";
            search = ValueToSearch + "," + col + ":Integer";
            searchMsg = "Search Results: CallId <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        if (filter[0] == 5) {
            value = $("#filterText").val();
            col = "allcallsreg.issuedescription";
            search = ValueToSearch + "," + col + ":String";
            searchMsg = "Search Results: Issue Description <span class='' style='font-weight: 600'>'" + ValueToSearch + "'</span>";
            basicFilterStr = filterSelected + "~#filterText:" + ValueToSearch;
        }
        $(".filterclose").show();
        JSON.stringify(search);
        //sessionStorage.setItem("search", search);
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem("PageSize");
        $("#example tbody tr").remove();
        $("#example tbody").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/CRM/ajaxManageCallsComm',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
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
    value1 = $("#dateC #min").val();
    value2 = $("#dateC #max").val();
    col = "crmcommunication.creationdate";
    search = value1 + "," + value2 + "," + col + ":Date";
    if (value1 != 0 || value2 != 0) {
        $(".filterclose").show();
        $(".filterclose").addClass("paddingforClearFilter");
        var searchMsg = "Search Results: Date From <span class='' style='font-weight: 600'>'" + value1 + "'</span> To <span class='' style='font-weight: 600'>'" + value2 + "'</span>";
        JSON.stringify(search);
        //sessionStorage.setItem("search", search);
        var basicFilterStr = $("#filter").val() + "~#dateC #min:" + value1 + "|#dateC #max:" + value2;
        setSearchSessionStorage(search);
        setSearchMsgSessionStorage(searchMsg);
        setBasicFilterStrSessionStorage(basicFilterStr);
        var pSize = sessionStorage.getItem("PageSize");
        $("#example tbody tr").remove();
        $("#example tbody ").height(0);
        $("#loading").show();
        $('#loadingmessage').show();

        $.ajax({
            url: '/CRM/ajaxManageCallsComm',
            type: "POST",
            data: { start: 0, pSize: pSize, search: search },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    //$(".resultDiv .resultContent").html("<div class='result-msg' style='word-spacing:3px;'>Search Results: Date From<span class='' style='font-weight: 600'>  " + value1 + "  </span> To <span class='' style='font-weight: 600'>" + value2 + "</span></div>");;
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
}

function SubmitFilterSort(search, order, pSize, searchMsg) {
    $('#FilterModel').modal('hide');
    $("#example tbody tr").remove();
    $("#example tbody ").height(0);
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $.ajax({
        url: '/CRM/ajaxManageCallsComm',
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



$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip({ delay: { "show": 500, "hide": 100 } });
    $("#dropdown").removeClass("setStyle");
    $('#example').on('click', '.u', function () {
        $(".right").hide();
        var isSomethingTrue = true;
        $("div").css("box-shadow", "none");
        if (isSomethingTrue && ($(window).width() >= 600)) {
            //var lastChkbox = $(".maindiv.rowActive").find(".checkboxall")[0];
            //if (lastChkbox !== undefined) {
            //    $(lastChkbox).attr("checked", false);
            //    chkCheckUncheck(lastChkbox);
            //}
            $(".maindiv").removeClass("rowActive");
            $(this).addClass("rowActive");
            //var chkBox = $(this).parent("div").find(".checkboxall")[0];
            //$(chkBox).attr("checked", true);
            //chkCheckUncheck(chkBox);
            $(".right").css("display", "flex");
            $(".left").addClass("move");
            $(".DateValue").addClass("dateval");
            $(".Issue").addClass("issopen");
            $(".Date").addClass("Dateval");
            $(".issue").addClass("Isshead");
            $(".h").hide();

            setGridColumnCss();
            Deviceheight();
            DetailPaneHeight()

            var $row = $(this).closest("tr");
            SetMainTasktDetailPane($row, ".right");

        }
    })

    $('#example').on('click', '.sub', function () {
        $(".right").hide();
        $("div").removeClass("style");
        var isSomethingTrue = true;
        if (isSomethingTrue && ($(window).width() >= 600)) {
            $("#dropdown").addClass("setStyle");
            //$(this).addClass("style");

            var lastChkbox = $(".maindiv.rowActive").find(".checkboxall")[0];
            if (lastChkbox !== undefined) {
                $(lastChkbox).attr("checked", false);
                chkCheckUncheck(lastChkbox);
            }

            $(".maindiv").removeClass("rowActive");
            $(this).parent("div").addClass("rowActive");
            var chkBox = $(this).parent("div").find(".checkboxall")[0];
            $(chkBox).attr("checked", true);
            chkCheckUncheck(chkBox);
            //$(this).parent("div").addClass("style");
            $(".right").show();
            $(".right").css("display", "flex");
            $(".left").addClass("move");
            //$(".Taskstatus").addClass(".mov");
            $(".h").hide();

            setGridColumnCss();

            var $row = $(this).closest("tr");
            SetSubTaskDetailPane($row, ".right")
        }
    })
    //Mobile detailpane onclick function
    $('#example').on('click', '.u', function () {
        var isSomethingTrue = true;
        if (isSomethingTrue && ($(window).width() <= 600)) {
            $("#dropdown").addClass("setStyle");
            $(".right").show();
            $(".right").css("display", "flex");
            $(".right").addClass("mobileDetailPane");
            $(".left").hide();
            Deviceheight();
            var $row = $(this).closest("tr");
            SetMainTasktDetailPane($row, ".right");
        }
    });

    $(".right").hide();
    $('#example').on('click', '.sub', function () {
        var isSomethingTrue = true;
        if (isSomethingTrue && ($(window).width() <= 600)) {
            $("#dropdown").addClass("setStyle");
            $(".right").show();
            $(".right").css("display", "flex");
            $(".right").addClass("mobileDetailPane");
            $(".left").hide();
            var $row = $(this).closest("tr");
            SetSubTaskDetailPane($row, ".right")
        }

    })
})

function setGridColumnCss() {
    $(".MainTr .combineCol").addClass("setCombineCol");
    $(".MainTr .TaskPriority").addClass("setTaskPriority");
    $(".MainTr .Taskcreateby").addClass("setCreatedBy");

    $(".TaskBar .TaskTitle").addClass("setTaskTitle");
    $(".TaskBar .TaskPriority").addClass("setTaskPriority");
    $(".TaskBar .CreatedBy").addClass("setCreatedBy");
}
function removeGridColumnCss() {
    $(".MainTr .combineCol").removeClass("setCombineCol");
    $(".MainTr .TaskPriority").removeClass("setTaskPriority");
    $(".MainTr .Taskcreateby").removeClass("setCreatedBy");

    $(".TaskBar .TaskTitle").removeClass("setTaskTitle");
    $(".TaskBar .TaskPriority").removeClass("setTaskPriority");
    $(".TaskBar .CreatedBy").removeClass("setCreatedBy");
}



//Set Main-Task Values to the DetailPane
function SetMainTasktDetailPane($row, destination) {

    var $id = $row[0].id;
    var $taskKey = $.trim($id.substring($id.indexOf("-") + 1));
    var $callid = $row.find(".TaskIdValue").text();
    var $remarkvalue = $row.find(".RemarkValue").text();
    var $taskdescription = $row.find(".TaskDescriptionValue span").text();
    var $firmtitle = $row.find(".TaskFirmValue").text();
    var $date = $row.find(".DateValue").text();
    var $duedate = $row.find(".Duedate").text();
    var $remarkby = $row.find(".RemakByValue").text();

    var $ddltaskstatus = $row.find(".Taskstatus").attr("data-taskstatus");
    var $assignedto = $row.find(".TaskAssignedto").text();
    var $ddlassignedto = $row.find(".TaskAssignedto").attr("data-assignedto");
    var $issuetitle = $row.find(".TaskTitle").text();
    var $ddlIssueType = $row.find(".issuetitle").text();
    var $ddlpriority = $row.find(".TaskPriority").attr("data-priority");

    $(destination + "   #callid").text($callid);
    $(destination + "   #taskkey").text($taskKey);
    $(destination + "   #remark").text($remarkvalue);
    $(destination + "   #txtremark").text($remarkvalue);
    $(destination + "   #taskdescription").text($taskdescription);
    $(destination + "   #txtissuedescription").text($taskdescription);
    $(destination + "   #ddlIssueType").val($ddlIssueType);
    $(destination + "   #firmtitle").text($firmtitle);
    $(destination + "   #txtfirmtitle").val($firmtitle);
    $(destination + "   #startdate").text($date);
    $(destination + "   #duedate").text($duedate);
    $(destination + "   #creadtedby").text($remarkby);
    $(destination + "   #issuetitle").text($issuetitle);


    $(destination + " .ShareBox input[type='text']").val("");
    $(destination + " .ShareBox").hide();

    $(".RemarkMessage #Content").text("");
    $('.RemarkMessage').hide();

    $("#taskeditTab #allActivity").empty();
    $('.tabs-navWeb a:first').trigger('click'); // Default

    $(".detailPane").scrollTop(0);
    CloseDiv('#TaskCloseModal')

    CancleEditCall(destination);
    LoadRemarks($callid, destination);
    ShowCollaboratorsNew(destination);
    ShowTagsNew(destination);
    LoadCallLogs($callid, destination);

}

function CloseDiv(ctrl) {
    $(ctrl).hide();
}

function DetailPaneHeight() {
    //var Header = $("header").outerHeight(true);
    //var Footer = $(".main-footer").outerHeight(true);
    //var windowHeight = $(window).outerHeight(true);
    //var SumOfElementHeight = Header + Footer;
    //var MainHeight = windowHeight - SumOfElementHeight;//- 20;
    //$(".right").height(MainHeight);
    var h = $(".content-wrapper").css("min-height")
    $(".right").height(h + 30);
}

//Table height will change according to Sidebar height

var Sidebar = $(".sidebar")[0];
var resizeObserver = new ResizeObserver((event) => {
    var h = $(".content-wrapper").css("min-height")
    $(".horizontal tbody").height(h);
    $(".right").height(h + 30)
    if ($(Sidebar).hasClass("test")) {
        $("#example").height(0)
    }
});
resizeObserver.observe(Sidebar);

//added by Rasika for purpose of responsiveness while switching from desktop view to mobile view
$(document).ready(function () {
    function resizewidth() {
        if ($(window).width() >= 600) {
            $(".detailpaneIconrow").find("#RightShift").removeClass("fa-arrow-left").addClass("fa-arrow-right");
            if ($(".right").css('display') != 'none') {
                $(".left").addClass("move");
                $(".left").show();
                $(".right").show();
                $(".right").css("display", "flex");
                $(".right").removeClass("mobileDetailPane");
            }
            else {
                $(".left").show();
                $(".right").hide();
            }
        }

        if ($(window).width() <= 600) {
            var i = $(".detailpaneIconrow").find("#RightShift").removeClass("fa-arrow-right").addClass("fa-arrow-left");
            if ($(".right").css('display') != 'none') {
                $(".left").hide();
                $(".right").addClass("mobileDetailPane");
            }
            else {
                $(".left").show();
                $(".right").hide();
                $(".right").removeClass("mobileDetailPane");
            }
        }
    }

    $(window).resize(function () {
        resizewidth();
        Deviceheight();
        DetailPaneHeight();
    });
});

//Load call Remarks
function LoadRemarks(Pid, destination) {
    $(destination + " #remarkTab #boxLoading #boxLoadingMessage").show();
    $(destination + " #remarkTab #AllRemarks").hide();
    $.ajax({
        type: "POST",
        url: "/CRM/AddRemarkData",
        data: { CallId: Pid },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                var a = 1;
                var finalDestination = $(destination + " #remarkTab #AllRemarks")
                finalDestination.empty();

                //var iconsHtml = $("<div style='top:0px;position:sticky;z-index:2;background:white;height:40px;'><a data-toggle='Export to excel' class='col-md-1' style='padding-left: 0px;padding-top: 9px;margin-bottom: 5px;padding-right: 10px;text-align: center;' onclick='remarkExportToExcel(" + Pid + ");' > <span class='glyphicon glyphicon-share' style='font-size:20px;Cursor:pointer;'></span></a></div>");

                $.each(data.data, function (index, item) {
                    var m = (a) + index;
                    //Load Data
                    var html = '<div class="RemarkHistoryItem col-sm-12 HistoryItem" id="' + item.CRMCommunication_key + '">'
                        + '<div class="line1 ">  <span class="">' + m + '</span>   <div class="text">' + item.Commtext + '</div></div>'
                        + '<div class="line2"><span class="Remarkuser"><img src="/images/profilemini.png">' + item.TextLogincode + '</span><span class="Remarkdate" style="float:right;"><img src="/images/calender.png">' + item.FrmtCreationDate + '</span></div>';
                    if (item.FileName != "") {
                        html = html + '<div class="line3"><span class="upload">Uploaded File :</span><a style="cursor:pointer" onClick="downloadRemarkFile(\'' + $.trim(item.FileName) + '\',\'' + item.LinkURL + '\')"  class="filenam">' + item.FileName + '</a></div></div>';
                    }
                    var remarkDiv = $(html);

                    finalDestination.append(remarkDiv);
                    $(destination + " #remarkTab #boxLoading #boxLoadingMessage").hide();
                    finalDestination.show();
                });
            }
            if (data.recordsTotal == 0) {
                //var NothingDiv = $('<div class="RemarkHistoryItem" style="padding-bottom:8px;"><div class="line1"><span>No Remarks here</span> </div></div>');
                var NothingDiv = $('<div class="RemarkHistoryItem HistoryItem"><div class="line1"><span style="width:100%;">No Progress Notes here</span> </div></div>');
                finalDestination.append(NothingDiv);
                $(destination + " #remarkTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            }
            else {
                finalDestination.prepend(/*iconsHtml*/);
            }
        },
        error: function () {
            //var NothingDiv = $('<div class="RemarkHistoryItem" style="padding-bottom:8px;"><div class="line1"><span>No Remarks here</span> </div></div>');
            var NothingDiv = $('<div class="RemarkHistoryItem HistoryItem"><div class="line1"><span style="width:100%;">No Progress Notes here</span> </div></div>');
            $(destination + " #remarkTab #AllRemarks").append(NothingDiv);
            $(destination + " #remarkTab #boxLoading #boxLoadingMessage").hide();
            $(destination + " #remarkTab #AllRemarks").show();
        }
    });
}

//Load Call Logs with Recording
function LoadCallLogs(Pid, destination) {
    $(destination + " #callLogsTab #boxLoading #boxLoadingMessage").show();
    $(destination + " #callLogsTab #AllCallLogs").hide();
    $.ajax({
        type: "POST",
        url: "/CustomerDetails/GetCallRecordingData",
        data: { P_allcallsreg: Pid },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            var a = 1;
            var finalDestination = $(destination + " #callLogsTab #AllCallLogs")
            finalDestination.empty();
            var CallRecordingdata = JSON.parse(data)

            $.each(CallRecordingdata, function (index, item) {
                var m = (a) + index;
                //Load Data
                //var html = '<div class="CallLogHistoryItem col-sm-12 HistoryItem" id="' + item.p_callfreq + '">'
                //    + '<div class="line1 ">  <span class="">' + m + '</span>   <div class=""><i class="fa fa-phone" style="padding-right:8px;"></i></div>  <div style="">' + item.mobileno + '</div></div>'
                //    + '<div class="line2"><span class="Remarkuser"><i class="fa fa-clock-o"></i>' + item.TextCallDuration + '</span><span class="Remarkdate" style="float:right;"><i class="fa fa-tag" aria-hidden="true"></i>' + item.calltype + '</span></div>'
                //    + '<div class="line2"><span class="Remarkuser" style="visibility:hidden";><img src="/images/profilemini.png">' + item.TextLogincode + '</span><span class="Remarkdate" style="float:right;"><img src="/images/calender.png">' + item.Textcalltime + '</span></div>';
                //if (item.callduration > 0 && item.filename !== "" && item.filename !== null) {
                //    html += '<div class="line2"><span class="Remarkuser"><i class="fa fa-play-circle" style="padding-right:8px;font-size:25px;cursor:pointer;"onclick="PlayFile(' + item.p_callfreq + ');"></i><input type="hidden" id="file-' + item.p_callfreq + '" value="' + $.trim(item.filename) + '"/><input type="hidden" id="link-' + item.p_callfreq + '" value="' + item.linkurl + '"/></span><div style="display: flex;"  id="recording-' + item.p_callfreq + '" ></div></div>'
                //}
                var html = '<div class="CallLogHistoryItem col-sm-12 HistoryItem" id="' + item.p_callfreq + '">'
                    + '<div class="line1"><div style="display:flex;"><span class="">' + m + '</span><div class=""><i class="fa fa-phone" style="padding-right:8px;"></i></div>  <div style="">' + item.mobileno + '</div></div><div style="display:flex;width:100%;justify-content:flex-end;"><div class=""><i class="fa fa-phone" style="padding-right:8px;"></i></div><div>' + item.empMobile + '</div></div></div>'
                    + '<div class="line2"><span class="Remarkuser"><i class="fa fa-clock-o"></i>' + item.TextCallDuration + '</span><span class="Remarkuser" style="float:right;margin-top: 3px;"><img src="/images/profilemini.png" style="margin-right:5px;">' + item.TextLogincode + '</span></div>'
                    + '<div class="line2"><span class="Remarkdate" style="" ><i class="fa fa-tag" aria-hidden="true"></i>' + item.Textcalltype + '</span><span class="Remarkdate" style="float:right;margin-top:3px;"><img src="/images/calender.png" style="margin-right:5px;">' + item.Textcalltime + '</span></div>';
                if (item.callduration > 0 && item.filename !== "" && item.filename !== null) {
                    html += '<div class="line2"><span class="Remarkuser"><i class="fa fa-play-circle" style="padding-right:8px;font-size:25px;cursor:pointer;"onclick="PlayFile(' + item.p_callfreq + ');">&nbsp;' + item.filename + '</i><input type="hidden" id="file-' + item.p_callfreq + '" value="' + $.trim(item.filename) + '"/><input type="hidden" id="link-' + item.p_callfreq + '" value="' + item.linkurl + '"/></span><div style="display: flex;"  id="recording-' + item.p_callfreq + '" ></div></div>'
                }

                var callLogsDiv = $(html);

                finalDestination.append(callLogsDiv);
                $(destination + " #callLogsTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            });
            if (CallRecordingdata.length == 0) {
                var NothingDiv = $('<div class="CallLogHistoryItem HistoryItem"><div class="line1"><span class="text" style="width:100% ">No Call Logs here</span> </div></div>');
                finalDestination.append(NothingDiv);
                $(destination + " #callLogsTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            }
        },
        error: function () {
            var NothingDiv = $('<div class="CallLogHistoryItem"><div class="line1"><span class="text" style="width:100% ;">No Call Logs here</span> </div></div>');
            $(destination + " #callLogsTab #AllCallLogs").append(NothingDiv);
            $(destination + " #callLogsTab #boxLoading #boxLoadingMessage").hide();
            $(destination + " #callLogsTab #AllCallLogs").show();
        }
    });
}



//Load Call Collaborators
function ShowCollaboratorsNew(destination) {
    $(destination + " .SectionCollaborators #boxLoading #boxLoadingMessage").show();
    $(destination + " .SectionCollaborators #AllCollab").hide();
    var CallPid = $(destination + " #callid").text();

    $.ajax({
        type: "POST",
        url: "/CRM/AddCallCollaboratorsData",
        data: { CallId: CallPid, calltype: "C" },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            $(destination + " .SectionCollaborators .boxx #AllCollab").empty();
            $.each(data.data, function (index, item) {
                var html = ' <div class="CollaboratorsBoxx" id="' + item.CRMCollaborator_key + '"><img src="/images/profilemini.png" class="icon-image collabIcon">'
                    + ' <span id="collaboratorName" class="text">' + item.TxtCollaborator + '</span>'
                    + '<img src="/images/icon-cancel.png" alt="Delete" class="deleteCollabIcon" id="' + item.CRMCollaborator_key + '" onclick=" deleteCollaboratorNew(this.id, \'' + destination + '\')">'
                    ;
                var collaboratorDiv = $(html);
                $(destination + " .SectionCollaborators .boxx #AllCollab").append(collaboratorDiv);
                $(destination + " .SectionCollaborators #boxLoading #boxLoadingMessage").hide();
                $(destination + " .SectionCollaborators #AllCollab").show();
            });

            if (data.recordsTotal == 0) {
                var NotingCollabDiv = $('<div class="CollaboratorsBoxx"><span id="collaboratorName" class="text">No Collaborators here</span></div>');
                $(destination + " .SectionCollaborators .boxx #AllCollab").append(NotingCollabDiv);
                $(destination + " .SectionCollaborators #boxLoading #boxLoadingMessage").hide();
                $(destination + " .SectionCollaborators #AllCollab").show();
            }
        },
        error: function () {
            var NotingCollabDiv = $('<div class="CollaboratorsBoxx"><span id="collaboratorName" class="text">No Collaborators here</span></div>');
            $(destination + " .SectionCollaborators .boxx #AllCollab").append(NotingCollabDiv);
            $(destination + " .SectionCollaborators #boxLoading #boxLoadingMessage").hide();
            $(destination + " .SectionCollaborators #AllCollab").show();
        }
    });

}

//Delete Call Collaborators
function deleteCollaboratorNew(id, destination) {
    $.ajax({
        type: "GET",
        url: "/Tasks/DeleteCollaborator",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        data: { id: id },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else{
                ShowMsg("Collaborator deleted Successfully");
                ShowCollaboratorsNew(destination);
            }
        },
        error: function () {
            alert("error")
        }
    });
}

//Add new Task Collaborator
function SubmitCollaboratorsNew(destination) {
    var PCall = $(destination + " #callid").text();
    var selectedCollaborator = $(destination + " #ddlCollab").val();

    if (selectedCollaborator != 0) {
        $.ajax({
            type: "POST",
            url: "/CRM/AddCallCollaborators",
            data: { PCall: PCall, calltype: "C", collaboratorId: selectedCollaborator },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                if (data == "Already Collborate") {
                    ShowMsg("Already a collaborator");
                    return true;
                }
                else if (data == "success") {
                    ShowMsg("Collaborator has been added Successfully.");
                    closeAddCollab(destination);
                    ShowCollaboratorsNew(destination);
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

//Show Controls to Add new call Collaborator
function AddCollaboratorsNew(destination) {
    $(destination + " .SectionCollaborators #AddCollab").hide();
    $(destination + " .SectionCollaborators #ddlCollab").show();
    $(destination + " .SectionCollaborators #closeAddCollab").show();
}

//Close Controls of Add new call Collaborator
function closeAddCollab(destination) {
    $(destination + " .SectionCollaborators #AddCollab").show();
    $(destination + " .SectionCollaborators #ddlCollab").val(0);
    $(destination + " .SectionCollaborators #ddlCollab").hide();
    $(destination + " .SectionCollaborators #closeAddCollab").hide();
}


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


//Load calls Tags
function ShowTagsNew(destination) {
    $(destination + " .task-classification #boxLoading #boxLoadingMessage").show();
    $(destination + " .task-classification #tag-container").hide();
    var callid = $("#callid").text();
    $.ajax({
        type: "POST",
        url: "/CRM/ShowTagsData",
        data: { Callid: callid },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            $(destination + " .task-classification .boxx #tag-container").empty();
            $.each(data.data, function (index, item) {

                var html = ' <div class="TagsBoxx" id="' + item.tags_key + '">'
                    + ' <span id="TagName" class="text">' + item.txttagname + '</span>'
                    + ' <img src="/images/icon-cancel.png" alt="Delete" class="tagDeleteIcon" id="' + item.p_tags + '" onclick="deleteTagsNew(this.id, \'' + destination + '\' )">';
                var TagDiv = $(html);
                $(destination + " .task-classification .boxx #tag-container").append(TagDiv);
                $(destination + " .task-classification #boxLoading #boxLoadingMessage").hide();
                $(destination + " .task-classification #tag-container").show();
            });

            if (data.recordsTotal == 0) {
                var NotingCollabDiv = $('<div class="TagsBoxx"><span id="TagName" class="text">No Tags here</span></div>');
                $(destination + " .task-classification .boxx #tag-container").append(NotingCollabDiv);
                $(destination + " .task-classification #boxLoading #boxLoadingMessage").hide();
                $(destination + " .task-classification #tag-container").show();
            }
        },
        error: function () {
            var NotingCollabDiv = $('<div class="TagsBoxx"><span id="TagName" class="text">No Tags here</span></div>');
            $(destination + " .task-classification .boxx #tag-container").append(NotingCollabDiv);
            $(destination + " .task-classification #boxLoading #boxLoadingMessage").hide();
            $(destination + " .task-classification #tag-container").show();
        }
    });

}

//Delete Task Collaborators
function deleteTagsNew(p_tags, destination) {
    $.ajax({
        type: "GET",
        url: "/CRM/DeleteTag",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        data: { p_tags: p_tags },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                ShowMsg("Tag deleted Successfully");
                ShowTagsNew(destination);
            }
        },
        error: function () {
            alert("error")
        }
    });
}

//Add new Task Tag
function SubmitTagsNew(destination) {
    var callid = $(destination + " #callid").text();
    var selectedTag = $(destination + " #ddlTags").val();
    if (selectedTag != 0) {
        $.ajax({
            type: "POST",
            url: "/CRM/AjaxAddCallTags",
            data: { Callid: callid, p_infotable: selectedTag },
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
                    closeTag(destination);
                    ShowTagsNew(destination);
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

//Show Controls to Add new Call Tag
function AddTagsNew(destination) {
    $(destination + " .task-classification #PlusTag").hide();
    $(destination + " .task-classification #ddlTags").show();
    $(destination + " .task-classification #closeTag").show();
}

//Close Controls of Add new Call Tag
function closeTag(destination) {
    $(destination + " .task-classification #PlusTag").show();
    $(destination + " .task-classification #ddlTags").val(0);
    $(destination + " .task-classification #ddlTags").hide();
    $(destination + " .task-classification #closeTag").hide();
}

//Submit Task Remark
function SubmitCallRemarkNew(destination) {
    var formdata = new FormData();
    var remark = $(destination + " #frmRemarkRight #txtRemark").val();
    formdata.append('remark', remark);
    var callid = $(destination + " #callid").text();
    formdata.append('CallId', callid);
    var file = $(destination + ' #frmRemarkRight #remarkfile')[0].files[0];
    formdata.append('file1', file);
    if ($.trim(remark) != "" || typeof file !== "undefined") {
        $.ajax({
            type: "POST",
            url: "/CRM/AddCallRemark",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data == "LogOut") {
                    window.location.href = "/Home/LogOut";
                    return true;
                }
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    ShowMsg("Progress Note added Successfully. . !");
                    LoadRemarks(callid, destination);
                    $(destination + " #frmRemarkRight #txtRemark").val("");
                    $(destination + ' #frmRemarkRight #remarkfile').val("");
                    var id = $(destination + " #callkey").text();
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
        });
    }
    else {
        ShowMsg("Please fill at lease one");
    }

    return false;
}



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

function showAssignmentHistoryTab() {
    //if ($("#callAssignHistoryTab #AllCallAssignment").children().length == 0) {

    //}

    var callid = $(".editSection #callid").text();
    LoadCallAssignmentHistory(callid)

}

function LoadCallAssignmentHistory(callid) {
    $("#callAssignHistoryTab #boxLoading #boxLoadingMessage").show();
    $("#callAssignHistoryTab #AllCallAssignment").hide();
    $.ajax({
        type: "POST",
        url: "/CustomerDetails/GetAssignedHistoryOfCall",
        data: { CallId: callid, calltype: "C" },
        success: function (data) {
            if (data == "logout") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            var a = 1;
            var finalDestination = $("#callAssignHistoryTab #AllCallAssignment")
            finalDestination.empty();
            var arr = JSON.parse(data)
            $.each(arr, function (index, item) {
                var m = (a) + index;
                //Load Data
                if (item.TextAssignedto != "") {
                    var html = '<div class="EditHistoryItem col-sm-12 HistoryItem" id="' + item.SrNo + '">'
                        + '<div class="line1 ">  <span class="">' + m + '</span>   <span class=""><img src="/images/profilemini.png" style="width:15px;"></span>  <div class="text">' + item.TextAssignedto + '</div></div>'
                        + '<div class="line2"><span class="Remarkuser" style="margin-top:-8px; float:right;"><span class="Remarkdate" style="float:right;"><img src="/images/calender.png">' + item.frmtStartDate + '</span></div>';

                    var detailDiv = $(html);

                    finalDestination.append(detailDiv);
                }
                $("#callAssignHistoryTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            });
            if (arr.length == 0) {
                var NothingDiv = $('<div class="EditHistoryItem HistoryItem"><div class="line1"><span class="text" style="width:100% ;">No Assignment history here</span> </div></div>');
                finalDestination.append(NothingDiv);
                $("#callAssignHistoryTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            }
            if (finalDestination.children().length == 0) {
                var NothingDiv = $('<div class="EditHistoryItem HistoryItem"><div class="line1"><span class="text" style="width:100% ;">No Assignment history here</span> </div></div>');
                finalDestination.append(NothingDiv);
                $("#callAssignHistoryTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            }
        },
        error: function () {
            var NothingDiv = $('<div class="EditHistoryItem HistoryItem"><div class="line1"><span class="text" style="width:100% ;">No Assignment history here</span> </div></div>');
            $("#callAssignHistoryTab #AllCallAssignment").append(NothingDiv);
            $("#callAssignHistoryTab #boxLoading #boxLoadingMessage").hide();
            $("#callAssignHistoryTab #AllCallAssignment").show();
        }
    });
}
function showEditHistoryTab() {
    //if ($("#CallEditTab #allActivity").children().length == 0) {
    var callid = $(".editSection #callid").text();
    LoadEditHistory(callid)
    //}

}

function LoadEditHistory(callid) {
    $("#CallEditTab #boxLoading #boxLoadingMessage").show();
    $("#CallEditTab #allActivity").hide();
    $.ajax({
        type: "POST",
        url: "/CRM/GetCallActivityLog",
        data: { callid: callid },
        success: function (data) {
            if (data == "") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            var a = 1;
            var finalDestination = $("#CallEditTab #allActivity")
            finalDestination.empty();
            $.each(data.data, function (index, item) {
                var m = (a) + index;
                //Load Data
                var html = '<div class="EditHistoryItem col-sm-12 HistoryItem" id="' + item.SrNo + '">'
                    + '<div class="line1 ">  <span class="">' + m + '</span>'
                if (item.ActivityType.toLowerCase() == "remark") {
                    html += '<div class=""><i class="fa fa-comment"></i></div>'
                        + '<div class="text">' + item.Text + '</div></div>'
                }
                else if (item.ActivityType.toLowerCase() == "document") {
                    var arr = item.Text.split(":");

                    html += '<div class=""><i class="fa fa-file-o"></i></div>'
                        + '<div style="">' + arr[0] + ': <a style="cursor:pointer" onClick="downloadRemarkFile(\'' + $.trim(arr[1]) + '\',\'' + $.trim(arr[2]) + '\')"  class="filenam">' + arr[1] + '</a></div></div>'
                }
                else if (item.ActivityType.toLowerCase() == "collaborator") {
                    html += '<div class=""><i class="fa fa-user"></i></div>'
                        + '<div class="text">' + item.Text + '</div></div>'
                }
                else if (item.ActivityType.toLowerCase() == "edit") {
                    html += '<div class=""><i class="fa fa-pencil-square-o" style="padding-right:8px;"></i></div>'
                        + '<div class="text">' + item.Text + '</div></div>'
                }

                //html +='<div style="">' + item.Text + '</div></div>'
                html += '<div class="line2"><span class="Remarkuser"><i class="" aria-hidden="true" ></i></span><span class="Remarkdate" style="float:right;"><img src="/images/calender.png">' + item.FrmDateTime + '</span></div>';

                var remarkDiv = $(html);

                finalDestination.append(remarkDiv);
                $("#CallEditTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            });
            if (data.recordsTotal == 0) {
                var NothingDiv = $('<div class="EditHistoryItem HistoryItem"><div class="line1"><span style="width:100%;">No Edit history here</span> </div></div>');
                finalDestination.append(NothingDiv);
                $("#CallEditTab #boxLoading #boxLoadingMessage").hide();
                finalDestination.show();
            }
        },
        error: function () {
            var NothingDiv = $('<div class="EditHistoryItem HistoryItem"><div class="line1"><span style="width:100%;">No Edit history here</span> </div></div>');
            $("#CallEditTab #allActivity").append(NothingDiv);
            $("#CallEditTab #boxLoading #boxLoadingMessage").hide();
            $("#CallEditTab #allActivity").show();
        }
    });
}


//Show controls to edit Call
function ShowEditCall(destination) {
    //Hide
    $(destination + " #editIcon").hide();
    $(destination + " #firmtitle").hide();
    $(destination + " #contactPerson").hide();
    $(destination + " #remark").hide();
    $(destination + " #issuetitle").hide();
    $(destination + " #taskdescription").hide();
    $(destination + " #callstatus").hide();
    //$(destination + " #assignedto").hide();
    $(destination + " #priorityOrder").hide();


    //Show
    $(destination + " #SaveCall").show();
    $(destination + " #CancleEdit").show();
    $(destination + " #firmDiv").show();
    $(destination + " #contactDiv").show();
    $(destination + " #issueDiv").show();
    $(destination + " #txtissuedescription").show();
    $(destination + " #txtremark").show();
    $(destination + " #ddlCallStatus").show();
    //$(destination + " #ddlAssignedto").show();
    $(destination + " #txtpriorityOrder").show();
    $(destination + " #issuehead").css("display","block");

}

//Close Controls to edit Call
function CancleEditCall(destination) {
    //Show
    $(destination + " #editIcon").show();
    $(destination + " #firmtitle").show();
    $(destination + " #contactPerson").show();
    $(destination + " #remark").show();
    $(destination + " #issuetitle").show();
    $(destination + " #taskdescription").show();
    $(destination + " #callstatus").show();
    //$(destination + " #assignedto").show();
    $(destination + " #priorityOrder").show();

    //Hide
    $(destination + " #SaveCall").hide();
    $(destination + " #CancleEdit").hide();
    $(destination + " #firmDiv").hide();
    $(destination + " #contactDiv").hide();
    $(destination + " #issueDiv").hide();
    $(destination + " #txtissuedescription").hide();
    $(destination + " #txtremark").hide();
    $(destination + " #ddlCallStatus").hide();
    //$(destination + " #ddlAssignedto").hide();
    $(destination + " #txtpriorityOrder").hide();
    $(destination + " #issuehead").css("display", "none");


}



//Submit Call Edit
function SubmitEditCall(destination) {
    var formData = {
        Firmname: $(destination + " #txtfirmtitle").val(),
        //Contactperson: $(destination + " #txtcontactPerson").val(),
        Remark: $(destination + " #txtremark").text(),
        Issuetype: $(destination + " #ddlIssueType").val(),
        IssueDescription: $(destination + " #txtissuedescription").text(),

    };

    $.ajax({
        type: "POST",
        url: "/CRM/EditCall",
        data: formData,
        success: function (data) {
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            if (data.toLowerCase() == "logout") {
                window.location.href = "/Home/LogOut";
                return true;
            }
            else if (data.toLowerCase() == "success") {
                ShowMsg("Call Edited Successfully.")
                window.location.href = "/CRM/ManageRegCalls";
            }
            else {
                ShowMsg(data);
            }
        },
        error: function () {
            alert("Error in loading data")
        }
    });

    return false;
}

function ShowFirmGrid() {
    var firmname = $("#txtfirmtitle").val();
    if (firmname.length >= 3) {
        $('#FirmContainer #loading').show();
        $('#FirmContainer #loadingmessage').show();
        $('#FirmContainer #Msg').hide();
        $("#FirmContainer").css("display", "");
        var tblEmployee = $("#tblFirms");
        $("#tblFirms tbody tr").remove();
        $.post('/CRM/FindCustomersCombinedAddress', { firmname: firmname }, function (data) {
            if (data != "error") {
                $.each(data.data, function (index, item) {
                    var m = index + 1;
                    var tr = $("<tr id='" + item.P_Customers + "' ></tr>");
                    tr.html(("<td>" + m + "</td>")
                        + " " + ("<td>" + item.CustCode + "</td>")
                        + " " + ("<td><input type='hidden' id='Email' class='Email' value='" + item.Email + "'/>" + item.CustName + "</td>")
                        + " " + ("<td>" + item.MobNo + "</td>")
                        + " " + ("<td><input type='hidden' id='MainBussCode' class='MainBusscode' value='" + item.MainBussCode + "'/>" + item.TextMainBussCode + "</td>")
                        + " " + ("<td>" + item.TextHomeTown + "</td>")
                        + " " + ("<td>" + item.CombinedAddress + "</td>")
                        + " " + ("<td>" + item.OnsiteFlag + "</td>")
                    );
                    tblEmployee.append(tr);
                })
                $('#FirmContainer #loading').hide();
                $('#FirmContainer #loadingmessage').hide();
                $('#FirmContainer #Msg').hide();
            } else {
                $('#FirmContainer #loading').show();
                $('#FirmContainer #loadingmessage').hide();
                $("#FirmContainer #Msg").show();
                $("#FirmContainer #Msg").text("No record found");
                $('#FirmContainer').css("display", "none");
            }
        });
    }
    else {
        $('#FirmContainer').css("display", "none");
        return;
    }
}

//Show Confirmation PopUp modal before close a call from Detail Pane
function ShowCloseCallModal(destination) {
    $("#CallCloseModal").modal(options);
    $("#CallCloseModal").modal("show");
    $("#CallCloseModal #destinationName").val(destination);

}

//Close a Call From Detail Pane
function CloseCallFromDetailPane() {
    var destination = $("#CallCloseModal #destinationName").val();
    $("#CallCloseModal").modal("hide");
    var CallId = $(destination + " #callid").text();
    var id = $(destination + " #callkey").text();
    var hasRemarkid = "#HasRemark-" + id;
    var hasRemarkValue = $(hasRemarkid).val();
    if (hasRemarkValue.toLowerCase() == "y") {
        $.ajax({
            type: "GET",
            url: "/CRM/CallClosed",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: { Pid: CallId },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                var Mtitle
                if (data == "NoRemarkAfterLastCall") {
                    Mtitle = "There is no remark after Last Call.Please add remark to close call";
                    ShowMsg(Mtitle);
                }
                else if (data == "CustomerNotLink") {
                    Mtitle = "Please link Customer, then close the call.";
                    ShowMsg(Mtitle);
                }
                else if (data == "CallNotAssigned") {
                    Mtitle = "Please Assign Call, then close the call.";
                    ShowMsg(Mtitle);
                }
                else if (data == "CallNotAssignedtoLoggedInEmployee") {
                    Mtitle = "Call can only be closed by whomever it is assigned!";
                    ShowMsg(Mtitle);
                }
                else {
                    $('#CallClosedContent').html();
                    $('#CallClosed').modal(options);
                    $('#CallClosed').modal('show');
                    Mtitle = "Call Closed Successfully";
                    $('#CallClosed .modal-title').text(Mtitle);
                    var MainDivid = "#MainDiv-" + id
                    $(MainDivid).remove();
                    $("#RightShift").trigger("click");
                    setTimeout(function () { $('#CallClosed').modal('hide'); }, 1000);


                }
            },
            error: function (data) {
                ShowMsg("Please link Customer, then close the call.");
            }
        });
    }
    else {
        ShowMsg("Please add Remark to close Call!");
    }
}

//Create Feedback link for Call
function CreateFeedbackLink(destination) {
    var p_allcallsreg = $(destination + " #callid").text();
    $.post('/CRM/CreateFeedbackUrlForCall', { P_AllCallsReg: p_allcallsreg }, function (data) {
        if (data == "logout") {
            window.location.href = "/Home/LogOut";
        }
        else {
            $(destination + " .ShareBox input[type='text']").val(data);
            $(destination + " .ShareBox").show();
        }

    })
}

//Show Confirmation PopUp modal before close Calls
function ShowMultiCallCloseModal() {
    var callids = "";

    for (var i = 0; i < chkvalesArr.length; i++) {
        var val = chkvalesArr[i];
        callids += callids == "" ? val : "," + val;
    }
    if ($.trim(callids) !== "") {
        $("#MultiCallCloseModal").modal(options);
        $("#MultiCallCloseModal").modal("show");
        $("#MultiCallCloseModal #callids").val(callids);
    }
    else {
        $('#TaskClosedContent').html('');
        $('#TaskClose').modal(options);
        $('#TaskClosedContent').html("<p class='text-center' style='font-size: 18px;margin-bottom: 30px;'>Please select at least 1 Call.</p>");
        $('#TaskClose').modal("show");
        setTimeout(function () { $('#TaskClose').modal("hide"); }, 2000);
    }


}


//Close multiple Calls
function CloseMultipleCalls() {
    var callids = $("#MultiCallCloseModal #callids").val();
    $("#MultiCallCloseModal").modal("hide");
    $.post('/CRM/MultilpleCallClosed', { callIds: callids }, function (data) {
        if (data == "") {
            window.location.href = "/Home/LogOut";
            return true;
        }
        $('#TaskClosedContent').html('');
        $('#TaskClose').modal(options);
        $('#TaskClosedContent').html("<p class='text-center' style='font-size: 18px;margin-bottom: 30px;'>" + data + "</p>");
        $('#TaskClose').modal("show");

    });
}



//Show PopUp modal before AddTags on Calls
function ShowMultiCallAddTagsModal() {
    var callids = "";

    for (var i = 0; i < chkvalesArr.length; i++) {
        var val = chkvalesArr[i];
        callids += callids == "" ? val : "," + val;
    }
    if ($.trim(callids) !== "") {
        $("#MultiTagsAddModal").modal(options);
        $("#MultiTagsAddModal").modal("show");
        $("#MultiTagsAddModal #callids").val(callids);
        $("#MultiTagsAddModal #ddlmultiTags").selectpicker('deselectAll');
    }
    else {
        $('#TaskClosedContent').html('');
        $('#TaskClose').modal(options);
        $('#TaskClosedContent').html("<p class='text-center' style='font-size: 18px;margin-bottom: 30px;'>Please select at least 1 Call.</p>");
        $('#TaskClose').modal("show");
        setTimeout(function () { $('#TaskClose').modal("hide"); }, 2000);
    }


}

//topnavbar start.........................

function progressdata() {
    $(".editSectiondata").hide();
    $(".SectionCollaborators").hide();
    $(".task-classification").hide();
    $(".AddRemarkDetailView").show();
    $(".tabSection").show();
    $(".AddRemarkDetailView").show();
    $("#list1").show();
    $("#list2").show();
    $("#list5").show();
    $("#remarkTab").show();
    $("#taskeditTab").hide();
    $(".AddRemarkDetailView").css("padding-top", "10px");
    $("#progressdata").addClass("active");
    $("#homedata").removeClass("active");
    $("#homedata").addClass("unactive");
    $("#edithistorydata").removeClass("active");
    $("#edithistorydata").addClass("unactive");
    $("#collaboratordata").addClass("unactive")
    $("#collaboratordata").removeClass("active")

    $("#classificationdata").addClass("unactive");
    $("#classificationdata").removeClass("active");
    $("#edithead").css("display", "none");
    $("#list3").show();
    $(".asidenav").hide();
    $(".detailPane").css("width", "100%");
    //$(".topnavbar a").css("padding", "8px 19.5px")
    $("#list1").addClass("tab-activeWeb");
    $("#list4").removeClass("tab-activeWeb");
    $(".save").css("margin-right", "20px");


}

function homedata() {
    $(".editSectiondata").show();
    $(".SectionCollaborators").show();
    $(".task-classification").show();
    $(".tabSection").show();
    $("#taskeditTab").hide();
    $(".AddRemarkDetailView").show();
    $("#list1").show();
    $("#list2").show();
    $("#list5").show();

    $("#remarkTab").show();
    $("#homedata").addClass("active")
    $("#progressdata").removeClass("active");
    $("#progressdata").addClass("unactive");
    $("#edithistorydata").removeClass("active");
    $("#edithistorydata").addClass("unactive");
    $("#collaboratordata").addClass("unactive")
    $("#collaboratordata").removeClass("active")

    $("#classificationdata").addClass("unactive");
    $("#classificationdata").removeClass("active");

    $(".AddRemarkDetailView").css("padding-top", "30px");
    $("#edithead").css("display", "none");
    $("#list3").show();
    $(".asidenav").show();
    $(".detailPane").css("width", "93%");
    //$(".topnavbar a").css("padding", "8px 16px");
    //$(".topnavbar a:last-child").css("padding-right", "7px");
    $("#list1").addClass("tab-activeWeb");
    $("#list4").removeClass("tab-activeWeb");
    $(".save").css("margin-right", "0px");
}

function edithistorydata() {

    showEditHistoryTab()
    $("#CallEditTab").show();
    $(".tabSection").show();
    //$("boxLoading").hide();
    //$("#allActivity").show();
    $(".editSectiondata").hide();
    $(".SectionCollaborators").hide();
    $(".task-classification").hide();
    $(".AddRemarkDetailView").hide();
    $("#list1").hide();
    $("#list2").hide();
    $("#list5").hide();
    $("#remarkTab").hide();
    $("#edithistorydata").addClass("active")
    $("#homedata").removeClass("active");
    $("#homedata").addClass("unactive")
    $("#progressdata").removeClass("active");
    $("#progressdata").addClass("unactive");
    $("#collaboratordata").addClass("unactive")
    $("#collaboratordata").removeClass("active")
    $("#classificationdata").addClass("unactive");
    $("#classificationdata").removeClass("active");
    $("#edithead").css("display", "block");
    $("#list3").hide();
    $(".asidenav").hide();
    $(".detailPane").css("width", "100%");
    //$(".topnavbar a").css("padding", "8px 19.5px")
    $(".save").css("margin-right", "20px");

}

function collaboratordata() {
    $(".editSectiondata").hide();
    $(".AddRemarkDetailView").hide();
    $(".tabSection").hide();
    $(".task-classification").hide();
    $(".SectionCollaborators").show();
    $("#collaboratordata").addClass("active")
    $("#edithistorydata").removeClass("active")
    $("#edithistorydata").addClass("unactive")
    $("#homedata").removeClass("active");
    $("#homedata").addClass("unactive")
    $("#progressdata").removeClass("active");
    $("#progressdata").addClass("unactive");
    $("#classificationdata").addClass("unactive");
    $("#classificationdata").removeClass("active");
    $(".asidenav").hide();
    $(".detailPane").css("width", "100%");
    //$(".topnavbar a").css("padding", "8px 19.5px")
    $(".save").css("margin-right", "20px");

}

function classificationdata() {
    $(".editSectiondata").hide();
    $(".AddRemarkDetailView").hide();
    $(".tabSection").hide();
    $(".task-classification").show();
    $(".SectionCollaborators").hide();
    $("#classification").addClass("active")
    $("#collaboratordata").removeClass("active")
    $("#edithistorydata").removeClass("active")
    $("#edithistorydata").addClass("unactive")
    $("#homedata").removeClass("active");
    $("#homedata").addClass("unactive")
    $("#progressdata").removeClass("active");
    $("#progressdata").addClass("unactive");
    $("#collaboratordata").addClass("unactive")
    $("#collaboratordata").removeClass("active")
    $("#classificationdata").addClass("active");
    $(".asidenav").hide();
    $(".detailPane").css("width", "100%");
    //$(".topnavbar a").css("padding", "8px 19.5px")
    $(".save").css("margin-right", "20px");

}


function asidenavActive(ctrl, scrollCtrl) {
    $(".asidenav .asidenav-tab").removeClass("menu__item--active");
    $(".asidenav " + ctrl).addClass("menu__item--active");
    var container = $(".detailPane");
    var scrollTo = $(scrollCtrl);
    var a = parseInt(scrollTo.position().top);
    var b = parseInt(container.position().top);
    var c = parseInt(container.scrollTop());
    var position = a - b + c - 55;

    container.animate({
        scrollTop: parseInt(position)
    });
}

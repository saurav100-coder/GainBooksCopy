$(document).ready(function () {
    LoadFilters();
});


//Show filter Inputs Div
function ShowCloseBasicFilter() {
    $("#filterDiv").toggle();
}


//Add Filter options Dropdown
function LoadFilters() {
    var rawFilterString = $("#afvalue").val(); //this string comes from controller
    var valueAfterSplitbyVerticalLine = [];
    valueAfterSplitbyVerticalLine = rawFilterString.split("|");  //split raw filter string by "|" and make an array

    var valueAfterSplitbyTilde;
    for (i = 0; i <= valueAfterSplitbyVerticalLine.length - 1; i = i + 1) {
        valueAfterSplitbyTilde = valueAfterSplitbyVerticalLine[i].split("~");
        var val = valueAfterSplitbyTilde[0] + ":" + valueAfterSplitbyTilde[2] + ":" + valueAfterSplitbyTilde[3] + ":" + valueAfterSplitbyTilde[4];

        var valueAfterSplitbyDollor = valueAfterSplitbyTilde[2].split("$");
        var id = $.trim(valueAfterSplitbyTilde[4].replace('.', '-'));
        if (valueAfterSplitbyDollor[0] == 5) {
            id = id + "5";
        }
        /*var html = $('<tr id="' + $.trim(valueAfterSplitbyTilde[4].replace('.', '-')) + '" data-val="' + val + '" data-text="' + valueAfterSplitbyTilde[1] + '"><td><input type="checkbox" onClick="basicFilterChecked(this);" class="basicFilterChk myCheckbox" style="margin: 5px;cursor:pointer;"></td><td style="font-weight:bold;">' + valueAfterSplitbyTilde[1] + '</td></tr>');*/
        var html = $('<tr id="' + id + '" data-val="' + val + '" data-text="' + valueAfterSplitbyTilde[1] + '"><td><input type="checkbox" onClick="basicFilterChecked(this);" class="basicFilterChk myCheckbox" style="margin: 5px;cursor:pointer;"></td><td style="font-weight:bold;">' + valueAfterSplitbyTilde[1] + '</td></tr>');
        var td = $("<td></td>");
        td.append(makeFilterHtml(val))
        html.append(td);
        $("#basicFilterTable tbody").append(html);
    };
    setBasicFilterUIOnPageReload();

}



function basicFilterChecked(chk) {
    if ($(chk).is(":checked")) {
        $(chk).parent().parent().addClass("basicFilterSeleted");
    }
    else {
        $(chk).parent().parent().removeClass("basicFilterSeleted");
    }

}

//Append input according to filter option
function makeFilterHtml(str) {
    var selectedFilterOptionValue = str;
    if (selectedFilterOptionValue != "1") {
        var html = "";
        count += 1;
        var td = "";
        var valueAfterSplitbyColon = selectedFilterOptionValue.split(":");
        var valueAfterSplitbyDollor = valueAfterSplitbyColon[1].split("$");
        if (valueAfterSplitbyDollor[0] == 1)/**Check is it a textBox?**/ {
            html = $('<input type="text" data-type="text" id="filterText" class="filterText" style="height: 29px;  width:90%; margin-right:8px; margin-left:10px; margin-top: 5px;" placeholder="Type to search" oninput="myFunction(this)">');
        }
        else if (valueAfterSplitbyDollor[0] == 2)/**Check is it a dropdown?**/ {
            var valueAfterSplitbyHash = valueAfterSplitbyDollor[1].split("#");
            var destination = "#basicFilterTable tr#"+ $.trim(valueAfterSplitbyColon[3].replace('.', '-'));

            //html = $('<div class="select-btn select-filterDropdown"><div style="width:90%"><div class="main-item"> <span class="checkbox" style="margin-right: 12px; margin-top:0; margin-bottom:0;"><input type="checkbox" name="" id="" class="select-checkbox"></span><input type="text" placeholder="Search...." id="myInput" onkeyup="filterFunction()"></div><span class="btn-text">-' + valueAfterSplitbyHash[6] + '-</span> </div><span class="arrow-dwn" ><i class="fa fa-chevron-down"></i></span></div><div class="list-items"> <ul class="lims" id="wrapper-filterDropdown" name="wrapper-filterDropdown"> </ul></div>');
            html = $('<div class="select-btn select-filterDropdown toggle-select" onclick="toggleDropdown(\'filterDropdown\',\'' + destination +'\')"><div style="width:90%">' +
                    '<span class="btn-text" data-title="'+$.trim(valueAfterSplitbyHash[6])+'">'+$.trim(valueAfterSplitbyHash[6])+'</span>'+
                '<div class="main-item"><span class="checkbox"><input class="select-checkbox" type="checkbox" onchange="toggleMultiCheckbox(this,\'filterDropdown\',\'' + destination +'\')"/></span>'+
                    '<input id="myInput" onkeyup="filterFunction(\'filterDropdown\',\''+ destination +'\')" placeholder="Search...." type="text"/></div></div>'+
                    '<span class="arrow-dwn" onclick="Dropdown(\'filterDropdown\',\'' + destination +'\')"><i class="fa fa-chevron-down"></i></span></div>');
           
            $.post("/CRM/GetDataforDropdown", { tableName: valueAfterSplitbyHash[1], displayColumnName: valueAfterSplitbyHash[2], keyColumnName: valueAfterSplitbyHash[3], where: valueAfterSplitbyHash[4], order: valueAfterSplitbyHash[5] }, function (data) {
                /*console.log("loading list-items : " + destination);*/
                var html2 = $('<div class="list-items"></div>');
                html.after(html2);
                var html3 = $('<ul class="lims" id="wrapper-filterDropdown" name="wrapper-filterDropdown"><input id="filterDropdown" name="filterDropdown" style="display:none" type="text" data-type="select-multiple"/></ul>');
                html2.append(html3);
                var data1 = JSON.parse(data);
                $.each(data1, function (index, item) {
                    html3.append($('<li class="item" id="'+$.trim(item[valueAfterSplitbyHash[3]])+'"><span class="checkbox"><input class="check" type="checkbox"/></span><span class="item-text" data-value="'+$.trim(item[valueAfterSplitbyHash[3]])+'">'+$.trim(item[valueAfterSplitbyHash[2]])+'</span></li>'));
                });
                
                html2.append('<div class="button-list"> <button class="cancelbtn" onclick="cancel(\'filterDropdown\',\''+$.trim(valueAfterSplitbyHash[6])+'\',\''+ destination +'\')" type="button" >Cancel</button><button class="applybtn"  onclick="apply(\'filterDropdown\',\''+ destination +'\')" type="button" >Apply</button></div>');
                setBasicFilterUIOnPageReload();
            });
        }
        else if (valueAfterSplitbyDollor[0] == 4)/**Check is it a From To date?**/ {
            var t = new Date($.now());
            var towDigitMonth = (t.getMonth() + 1) >= 10 ? (t.getMonth() + 1) : "0" + (t.getMonth() + 1);
            var towDigitDay = t.getDate() >= 10 ? t.getDate() : "0" + t.getDate();
            var maxDate = t.getFullYear() + "-" + towDigitMonth + "-" + towDigitDay;
            html = $('<label style="margin-left:10px;">From:</label><input type="date" data-type="date" style="height: 30px;  margin-top:1px; margin-bottom:0px; margin-left:10px;" id="min" onchange="handler(this)" class="min" value="" max="' + maxDate + '"> <label style="margin-left:2px; margin-top:7px;">To: </label><input type="date"  data-type="date" style="height: 30px;  margin-top:1px; margin-bottom:0px; margin-left:10px;" id="max" class="max" onchange="handler(this)" value="" max="' + maxDate + '">');
        }
        //Added by aslam for datetimefilter
        else if (valueAfterSplitbyDollor[0] == 5)/**Check is it a From To datetime?**/ {
            var t = new Date($.now());
            var towDigitMonth = (t.getMonth() + 1) >= 10 ? (t.getMonth() + 1) : "0" + (t.getMonth() + 1);
            var towDigitDay = t.getDate() >= 10 ? t.getDate() : "0" + t.getDate();
            var maxDate = t.getFullYear() + "-" + towDigitMonth + "-" + towDigitDay + "T23:59:59";
            /*html = $('<label>From:</label><input type="datetime-local"  id="minDT" class="minDT"  value="" max="' + maxDate + '" step="1"> <label>To:</label><input type="datetime-local"   id="maxDT"  class="maxDT" value="" max="' + maxDate + '" step="1">');*/
            html = $('<label style="margin-left:10px;">From:</label><input type="datetime-local" data-type="datetime-local" style="height: 30px;  margin-top:1px; margin-bottom:0px; margin-left:10px;width:100%" id="minDT" onchange="handler(this)" class="minDT" value="" max="' + maxDate + '" step="1"> <label style="margin-left:2px; margin-top:7px;">To: </label><input type="datetime-local" data-type="datetime-local" style="height: 30px;  margin-top:1px; margin-bottom:0px; margin-left:10px;width:100%" id="maxDT" class="maxDT" onchange="handler(this)" value="" max="' + maxDate + '" step="1">');
        }
        return html;
    }
}


//Apply Basic Filters 
function ApplyBasicFilters() {
    $(".quickSearch").val("");
    var search = "";
    var condition = "and";
    var searchMsg = "";
    var basicFilterStr = "";
    $("#basicFilterTable tbody tr.basicFilterSeleted").each(function () {
        var selectedFilterOptionValue = $(this).attr("data-val");
        var selectedFilterText = $(this).attr("data-text");

        if (selectedFilterOptionValue != "1") {
            basicFilterStr += basicFilterStr != "" ? "!#" + $(this).attr("id") : "#" + $(this).attr("id");
            var valueAfterSplitbyColon = selectedFilterOptionValue.split(":");
            var valueAfterSplitbyDollor = valueAfterSplitbyColon[1].split("$");
            if (valueAfterSplitbyDollor[0] == 1) {
                var value = $(this).find("#filterText").val();
                if (value != "" && value != "undefined") {
                    search += search == "" ? value + "," + valueAfterSplitbyColon[3] + ":" + valueAfterSplitbyColon[2] + "," + condition : ";" + value + "," + valueAfterSplitbyColon[3] + ":" + valueAfterSplitbyColon[2] + "," + condition;
                    searchMsg += " " + selectedFilterText + " <span class='' style='font-weight: 600'> '" + value + "'</span>";
                    basicFilterStr += "~#filterText:" + value;
                }
            }
            else if (valueAfterSplitbyDollor[0] == 2) {
                var value = $(this).find("#filterDropdown").val();
                //var ddltext = $(this).find("#filterDropdown option:selected").text();
                /*var ddltext = $(this).find("#filterDropdown option:selected").map(function () { return $(this).text(); }).get().join(",");*/
                var ddltext = $(this).find("#wrapper-filterDropdown .box-checked").parents(".item").find(".item-text").map(function () { return $(this).text(); }).get().join(",");
                if (value.length > 0) {
                    search += search == "" ? value + "," + valueAfterSplitbyColon[3] + ":" + valueAfterSplitbyColon[2] + "," + condition : ";" + value + "," + valueAfterSplitbyColon[3] + ":" + valueAfterSplitbyColon[2] + "," + condition;
                    searchMsg += " " + selectedFilterText + " <span class='' style='font-weight: 600'> '" + ddltext + "'</span>";
                    basicFilterStr += "~#filterDropdown:" + value;
                }
            }
            else if (valueAfterSplitbyDollor[0] == 4) {
                var value1 = $(this).find("#min").val();
                var value2 = $(this).find("#max").val();
                if ((value1 != "undefined" || value2 != "undefined") && (value1 != "" || value2 != "")) {
                    search += search == "" ? value1 + "," + value2 + "," + valueAfterSplitbyColon[3] + ":" + valueAfterSplitbyColon[2] + "," + condition : ";" + value1 + "," + value2 + "," + valueAfterSplitbyColon[3] + ":" + valueAfterSplitbyColon[2] + "," + condition;
                    searchMsg += " " + selectedFilterText + " From <span class='' style='font-weight: 600'> '" + value1 + "'</span>" + " To <span class='' style='font-weight: 600'> '" + value2 + "'</span>";
                    basicFilterStr += "~#min:" + value1 + "|#max:" + value2;
                }
            }
            //Added by aslam for datetimefilter
            else if (valueAfterSplitbyDollor[0] == 5) {
                var value1 = $(this).find("#minDT").val();
                var value2 = $(this).find("#maxDT").val();
                if ((value1 != "undefined" || value2 != "undefined") && (value1 != "" || value2 != "")) {

                    var dtv1 = value1.replace("T", " ");
                    dtv1 = dtv1.replace(/:/g, "_");

                    var dtv2 = value2.replace("T", " ");
                    dtv2 = dtv2.replace(/:/g, "_");
                    search += search == "" ? dtv1 + "," + dtv2 + "," + valueAfterSplitbyColon[3] + ":" + valueAfterSplitbyColon[2] + "," + condition : ";" + dtv1 + "," + dtv2 + "," + valueAfterSplitbyColon[3] + ":" + valueAfterSplitbyColon[2] + "," + condition;
                    searchMsg += " " + selectedFilterText + " From <span class='' style='font-weight: 600'> '" + value1 + "'</span>" + " To <span class='' style='font-weight: 600'> '" + value2 + "'</span>";
                    basicFilterStr += "~#minDT:" + value1 + "|#maxDT:" + value2;
                }
            }

            setBasicFilterStrSessionStorage(basicFilterStr);
        }
    });

    if (search != "") {
        if (search.lastIndexOf(",and") > -1) {
            search = search.substring(0, search.lastIndexOf(",and"));
        }
        setSearchSessionStorage(search);
        if ($.trim(searchMsg) != "") {
            searchMsg = "Search Results: " + searchMsg
        }
        setSearchMsgSessionStorage(searchMsg);
        SubmitBasicFilter(search, searchMsg);
        ShowCloseBasicFilter();


    }
    else {
        ShowMsg("Please select Filter", "error");
    }
}


function removeBasicAdvanceFilter() {
    $(".basicFilterChk").prop("checked", false);
    $(".filterText").val("");
    $(".min").val("");
    $(".max").val("");
    $(".minDT").val("");
    $("#maxDT").val("");
    setSearchSessionStorage("");
    setOrderSessionStorage("");
    $(".resultDiv .result-msg").html("");
    $(".resultDiv").hide();
    /*$(".filterDropdown").selectpicker("deselectAll");*/
    DeselectAll("filterDropdown","#basicFilterTable");
    /*$(".selectpicker").selectpicker('referesh');*/

    $(".quickSearch").val("");

}

function myFunction(text) {
    var x = $(text).val();
    if (x) {
        $(text).parents("tr").find(".myCheckbox").prop('checked', true);
        $(text).parents("tr").addClass("basicFilterSeleted");
    }
    else {
        $(text).parents("tr").find(".myCheckbox").prop('checked', false);
        $(text).parents("tr").removeClass("basicFilterSeleted");
    }
}
//function mySelect(option) {

//    //$(option).parents("tr").find(".myCheckbox").prop('checked', true);

//    var y = $(option).val();
//    if (y.length >= 1) {
//        $(option).parents("tr").find(".myCheckbox").prop('checked', true);
//        $(option).parents("tr").addClass("basicFilterSeleted");
//    }
//    else {
//        $(option).parents("tr").find(".myCheckbox").prop('checked', false);
//        $(option).parents("tr").removeClass("basicFilterSeleted");
//    }

//    $(option).parents("tr").find(".can-tag").show()

//}

function mySelect(ctrl) {
    var tr = $(ctrl).parents("tr");
    var y = $(tr).find("#wrapper-filterDropdown .box-checked").length;
    if (y > 0) {
        $(tr).find(".myCheckbox").prop('checked', true);
        $(tr).addClass("basicFilterSeleted");
    }
    else {
        $(tr).find(".myCheckbox").prop('checked', false);
        $(tr).removeClass("basicFilterSeleted");
    }
}

function handler(date) {

    //$(date).parents("tr").find(".myCheckbox").prop('checked', true);

    var z = $(date).val();
    if (z) {
        $(date).parents("tr").find(".myCheckbox").prop('checked', true);
        $(date).parents("tr").addClass("basicFilterSeleted");
    }
    else {
        $(date).parents("tr").find(".myCheckbox").prop('checked', false);
        $(date).parents("tr").removeClass("basicFilterSeleted");
    }

}



//$(document).ready(function () {
//    $("td").click(function () {
//        $(".can-tag").hide();
//    })
//    $("tr").append('<p title="close drop-down" class="can-tag" style="font-size:13px; margin:10px 0 0 -10px; border:none; background-color:#f4f4f4; padding:3px 8px; z-index:1" onclick="CanTag(this)">x</p>')
//    $(".can-tag").hide()

//});


//function CanTag(btn) {
//    $(btn).parents("tr").find(".selectpicker option:selected").prop("selected", false);
//    $(btn).parents("tr").find(".myCheckbox").prop('checked', false);
//    var title = $(btn).parents("tr").find(".selectpicker").prop('title');
//    $(btn).parents("tr").find(".filter-option-inner-inner").text(title)
//    $(".filter-option-inner-inner").css("color", "#999");
//    $(btn).parents("tr").find('button').prop('title', title);
//    $(btn).parents("tr").find(".can-tag").hide();

//}






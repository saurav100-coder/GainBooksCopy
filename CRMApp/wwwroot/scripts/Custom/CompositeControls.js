var fieldsArr = "";

function makeCompositeFieldHtml(fieldLabel, fieldType, fieldName, infotype, defaultvalue) {
    var html = "";
    if (fieldType == "text" || fieldType == "date" || fieldType == "password" || fieldType == "email" || fieldType == "number") {
        html = $("<input type='" + fieldType + "' name='" + fieldName + "' id='" + fieldName + "' value='" + defaultvalue + "' class='form-control input-sm composite_input'  />");
        //if (fieldsArr.length > 0) {
        //    $.each(fieldsArr, function (index, item) {
        //        var fieldarr = item.split("~")
        //        if (fieldarr[1] == fieldName) {
        //            setCompositeFieldValue(fieldarr);
        //        }
        //    });
        //}
    }
    else if (fieldType == "dropdown") {
        html = $("<select  name='" + fieldName + "' id='" + fieldName + "' data-defvalue='" + defaultvalue + "' class='form-control input-sm composite_dropdown' ></select>");
        html.append("<option value='0'>-Select " + fieldLabel + "-</option>");
        $.post('/sales/AjaxGetdataFromInfotableByInfotype', { infotype: infotype }, function (data) {
            if (data != "error") {
                $.each(data.data, function (index, item) {
                    html.append($("<option>", { value: item.P_infotable, text: $.trim(item.NameOfInfo) }));
                });
            }
            var ddvalue = $.trim($(html).attr("data-defvalue"));
            if (ddvalue != "") {
                $(html).val(ddvalue);
            }
            else {
                $(html).val("0");
            }

            if (fieldsArr.length > 0) {
                $.each(fieldsArr, function (index, item) {
                    var fieldarr = item.split("~")
                    if (fieldarr[1] == $(html).attr("name")) {
                        setCompositeFieldValue(fieldarr);
                    }
                });
            }
        });

    }
    else if (fieldType == "checkbox") {
        html = $("<div data-name='" + fieldName + "' data-defvalue='" + defaultvalue + "'></div>");
        $.post('/sales/AjaxGetdataFromInfotableByInfotype', { infotype: infotype }, function (data) {
            var checkoptions = "";
            var checkboxname = $(html).attr("data-name");
            if (data != "error") {
                $.each(data.data, function (index, item) {
                    checkoptions += "<label class='checkbox-inline' style='margin-left:10px'><input class='form-check-input' type='checkbox' id='" + checkboxname + "' name='" + checkboxname + "' value='" + item.P_infotable + "' />" + $.trim(item.NameOfInfo) + "</label>";
                });
                html.append(checkoptions);

                if ($.trim($(html).attr("data-defvalue"))!="") {
                    var valueArr = $.trim($(html).attr("data-defvalue")).split(",");
                    $.each(valueArr, function (index, item) {
                        $("input[type=checkbox][name=" + checkboxname + "][value=" + item + "]").attr("checked", true);
                    });
                }
            }

            if (fieldsArr.length > 0) {
                $.each(fieldsArr, function (index, item) {
                    var fieldarr = item.split("~")
                    if (fieldarr[1] == $(html).attr("data-name")) {
                        setCompositeFieldValue(fieldarr);
                    }
                });
            }
        });
    }
    else if (fieldType == "radio") {
        html = $("<div  data-name='" + fieldName + "' data-defvalue='" + defaultvalue + "' ></div>");
        $.post('/sales/AjaxGetdataFromInfotableByInfotype', { infotype: infotype }, function (data) {
            var radiooptions = "";
            var radioname = $(html).attr("data-name");
            var defval = $.trim($(html).attr("data-defvalue"));
            if (data != 'error') {
                $.each(data.data, function (index, item) {
                    radiooptions += "<label class='radio-inline' style='margin-left:10px'><input class='form-check-input' name='" + radioname + "' id='" + radioname + "' style='margin-right:5px;' type='radio' value='" + item.P_infotable + "' "
                    if (defval == item.P_infotable) {
                        radiooptions += "checked"
                    };
                    radiooptions += "/>" + $.trim(item.NameOfInfo) + "</label>"
                });
                html.append(radiooptions);
            }
            if (fieldsArr.length > 0) {
                $.each(fieldsArr, function (index, item) {
                    var fieldarr = item.split("~")
                    if (fieldarr[1] == $(html).attr("data-name")) {
                        setCompositeFieldValue(fieldarr);
                    }
                });
            }
        });
    }
    return html;
}

function setCompositeFieldValue(fieldarr) {
    if (fieldarr[0] == "text" || fieldarr[0] == "date" || fieldarr[0] == "password" || fieldarr[0] == "email" || fieldarr[0] == "number" || fieldarr[0] == "dropdown") {
        $("#" + fieldarr[1]).val($.trim(fieldarr[2]));
    }
    else if (fieldarr[0] == "radio") {
        $("input[type=" + fieldarr[0] + "][name=" + fieldarr[1] + "][value=" + $.trim(fieldarr[2]) + "]").attr("checked", true);
    }
    else if (fieldarr[0] == "checkbox") {
        $("input[type=" + fieldarr[0] + "][name=" + fieldarr[1] + "]:checked").attr("checked", false);
        var valArr = $.trim(fieldarr[2]).split(",");
        $.each(valArr, function (index, item) {
            if (item!="") {
                $("input[type=" + fieldarr[0] + "][name=" + fieldarr[1] + "][value=" + item + "]").attr("checked", true);
            }
        });
    }
}








//$("#od").click(function () {

//    $('html,body').animate({
//        scrollTop: $("#oth1").offset().top - 250
//    }, 'slow');

//});
//$("#gd").click(function () {

//    $('html,body').animate({
//        scrollTop: $("#gen1").offset().top - 600
//    }, 'slow');
//});



//window.onscroll = function () { myFunction(), Function() };
//function myFunction() {
//    if (document.body.scrollTop || document.documentElement.scrollTop > 350) {
//        document.getElementById("gd").className = "";
//    } else {
//        document.getElementById("gd").className = "active";
//        document.getElementById("od").className = "";
//    }
//}
//function Function() {
//    if (document.body.scrollTop || document.documentElement.scrollTop < 350) {
//        document.getElementById("od").className = "";
//        document.getElementById("Hwd").className = "";
//    } else if (document.body.scrollTop || document.documentElement.scrollTop < 1100) {
//        document.getElementById("gd").className = "";
//        document.getElementById("od").className = "active";
//        document.getElementById("Hwd").className = "";
//    }
//    else {
//        document.getElementById("gd").className = "";
//        document.getElementById("od").className = "";
//        document.getElementById("Hwd").className = "active";
//    }
//}

//$(".uu a").click(function () {
//    $(".active").removeClass("active");
//    $(this).addClass("active");
//});

//$(window).scroll(function () {
//    if ($(this).scrollTop() > 30) {
//        $(".rr").addClass("fixed-pos");
//    } else {
//        $(".rr").removeClass("fixed-pos");
//    }
//});

//$("input[type=button]").click(function () {
//    $(".uu a").removeClass("active");
//    $(".uu a").not("a:first").addClass("active");

//});


//For accept only numbers in input box
function isNumberKey(evt) {
    evt = evt ? evt : window.event;
    var charCode = (evt.which) ? evt.which : event.keyCode; 
    if (charCode>31 && (charCode<48 || charCode>57)) {
        return false;
    }
    return true;
   
}

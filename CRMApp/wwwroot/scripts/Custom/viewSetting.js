var count = 0;
var Timeout;

$(document).ready(function () {
    
    fillInfoType();
    fillViewId();
   
});


function fillInfoType() {
    //$.post('/Configuration/GetDistinctData', { columnName: "infotype", tableName: "ViewSettings" }, function (response) {
    //    var data = JSON.parse(response);
    //    var infoTypeDropDown = $('#infoType');
    //    $.each(data, function (index, item) {
    //        infoTypeDropDown.append($('<option>', {
    //            value: $.trim(item.infotype),
    //            text:$.trim(item.infotype.toUpperCase())
    //        }));
    //    })
    //    var viewbagInfotype = $("#ViewbagInfotype").val();
    //    if (viewbagInfotype != "") {
    //        infoTypeDropDown.val(viewbagInfotype);
    //        autoClickSearchButton();
    //    }
    //});

    var viewbagInfotype = $("#ViewbagInfotype").val();
    if (viewbagInfotype != "") {
        $('#infoType').val(viewbagInfotype);
        autoClickSearchButton();
    }

}

function fillViewId() {
    $.post('/Configuration/GetDistinctData', { columnName: "viewid", tableName: "ViewSettings", lcondition:" rowstatus=0 and infotype='hoverstripstring' " }, function (response) {
        var data = JSON.parse(response);
        var viewid = $('#viewid');
        $.each(data, function (index, item) {
            viewid.append($('<option>', {
                value:$.trim(item.viewid),
                text:$.trim(item.viewid.toUpperCase())
            }));
        })
        var viewbagViewid = $("#ViewbagViewid").val();
        if (viewbagViewid!="") {
            viewid.val(viewbagViewid);
            autoClickSearchButton();
        }
        
    });
}


function autoClickSearchButton() {
    var infotype =$("#infoType").val();
    var viewid = $("#viewid").val();
    if (infotype != 0 && viewid != 0) {
        loadViewSettingData();
    }
}


function loadViewSettingData() {
    $("#viewSettingDiv").css("display", "none");
    $("#tblViewSetting").find("tbody").remove();
    $(".loader").show();
    var infotype =$("#infoType").val();
    var viewid = $("#viewid").val();
    
    if (infotype!=0 && viewid!=0) {
        $.post('/Configuration/GetViewSettingData', { InfoType: infotype, ViewId: viewid }, function (data) {
            var infoString = data.Infostring;
            /*$("#tblViewSetting").find("tbody").remove();*/
            if (infoString != "") {
                var html = "";
                var infoStringArray = infoString.split("~");
                if (infoStringArray.length>0) {
                    for (var i = 0; i <= infoStringArray.length -1; i++) {
                        var infoStringItemArray = infoStringArray[i].split("#");
                        if (infoStringItemArray.length>0) {
                            var itemOrder = infoStringItemArray[0]
                            var itemEnable = infoStringItemArray[1]
                            var item = infoStringItemArray[2]
                            count += 1;

                            var toggleSwitch = '<div class="material-switch ">';
                            if (itemEnable.toLowerCase() == "y") {
                                toggleSwitch += '<input class="switchValue" id="switch' + count + '" name="switch' + count + '" type="checkbox" checked="checked"/>'
                            }
                            else {
                                toggleSwitch += '<input class="switchValue" id="switch' + count + '" name="switch' + count + '" type="checkbox"/>'
                            }
                            toggleSwitch += '<label for="switch' + count + '" class="label-primary"></label></div>';
                                                                                                                                                 //ValidateOrder function is here   //Accept only number values
                            html += '<tr data-position="' + itemOrder + '"><td class="item">' + item + '</td><td class="order"><input id="order" onfocusout="validateOrder(this);" onkeypress="return isNumberKey(event)" data-initial-value=' + itemOrder + '  type="number" min="0" style="width:90px;" value=' + itemOrder + '></td><td class="action">' + toggleSwitch + '</td></tr>';
                        }
                        
                    }
                    $("#tblViewSetting").append("<tbody></tbody>");
                    $("#tblViewSetting tbody").append(html);
                    sortTableByAscOrder();
                    $("#viewSettingDiv").css("display", "");
                }
            }
            else {
                $("#viewSettingDiv").css("display", "none");
            }
            $(".loader").hide();
        });
    }
   
    else {
        //$("#tblViewSetting").find('tbody').remove();
        $("#alertMsgDiv").empty();
        $("#viewSettingDiv").css("display", "none");
        $(".loader").hide();
        showAlert("Please select InfoType and View", "alert-info");
        
    }
}

function saveViewSettings() {    
    var infotype =$("#infoType").val();
    var viewid = $("#viewid").val();
    var settingsString = "";
    if (infotype != 0 && viewid != 0) {
        //we proceed if there is no blank input box for column sequence
        if (!(checkBlankOrder())) {
            $("#viewSettingDiv").css("display", "none");
            $(".loader").show();
            //we set data-position attribute for every row,  this is because we show rows in ASC order so when we save data it will be in ASC order
            setDataPostion();
            //Here we sort rows in ASC order by its data-position attribute
            sortTableByAscOrder();
            $("#tblViewSetting tbody tr").each(function () {
                var toggleSwitch = $(this).find(".switchValue")
                if (toggleSwitch.is(":checked")) {
                    settingsString += settingsString == "" ? $(this).find("td:eq(1) input[type='number']").val() + "#Y#" + $.trim($(this).find("td:eq(0)").text()) : "~" + $(this).find("td:eq(1) input[type='number']").val() + "#Y#" + $.trim($(this).find("td:eq(0)").text());
                }
                if (!toggleSwitch.is(":checked")) {
                    settingsString += settingsString == "" ? $(this).find("td:eq(1) input[type='number']").val() + "#N#" + $.trim($(this).find("td:eq(0)").text()) : "~" + $(this).find("td:eq(1) input[type='number']").val() + "#N#" + $.trim($(this).find("td:eq(0)").text());
                }
            });

            $.post('/Configuration/SaveViewSetting', { Infostring: settingsString, Infotype: infotype, Viewid: viewid }, function (response) {
                
                loadViewSettingData();
                $("#alertMsgDiv").empty();
                var alertClass = response[0] == 0 ? "alert-info" : "alert-success";
                showAlert(response[1], alertClass);
            });
        }
        else {
            showAlert("Please fill all order fileds.", "alert-info");
        }
        
    }
    else {
        showAlert("Please select InfoType and View", "alert-info");
    }
}



function showAlert(msg, classname) {
    clearTimeout(Timeout);

    var alertdiv = '<div id="alert" class="alert ' + classname + '  show " >';
    alertdiv += '<button type="button" class="close" onClick="closeAlert();" >&times;</button>';
    alertdiv += msg + '</div>';
    $("#alertMsgDiv").append(alertdiv);

    Timeout = setTimeout(function () {
        closeAlert();
    }, 5000);
}

function closeAlert() {
    $("#alert").addClass("hide_alert");
    setTimeout(function () {
        $("#alertMsgDiv").empty();
    }, 1000);
}


//Set Data-Position
function setDataPostion() {
    $("#tblViewSetting tbody tr").each(function () {
        debugger
        var value = $(this).find("td:eq(1) input[type='number']").val();
        $(this).attr("data-position",value);
            
    });
}


//Show data in Asc order
function sortTableByAscOrder() {
    // Loop over all tables
    $('#tblViewSetting tbody').each(function () {
        debugger
        // Retrieve references to current table TR elements
        let collection = Array.from(this.querySelectorAll('tr'))
            .sort(function (x, y) {
                let posX = +x.dataset.position
                    , posY = +y.dataset.position;
                
                if (posX != posY) {
                    return posX > posY ? 1 : -1;
                }                
            })
        ;

        // Finally move items into the container using the computed order
        collection.forEach(element => {
            this.append(element);
        });

    });
}

//find duplicate value in input box of column sequence
function validateOrder(ctrl) {
    var value = $(ctrl).val();
    var find = 0;
    if (value!="") {
        $("#tblViewSetting tr").each(function (i, row) {
            debugger
            i += 1;
            var val = $(this).find("td:eq(1) input[type='number']").not(ctrl).val();
            if (val == value) {
                var itemText = $.trim($(this).find("td:eq(0)").text());
                var msg = "Warning!You have already assign order " + value + " to " + itemText.toUpperCase();
                showAlert(msg, "alert-warning");
                debugger
                $(ctrl).val($(ctrl).attr("data-initial-value"));
                find = 1;
                return false;
            }
        });
        //set new initail-value
        if (find==0) {
            $(ctrl).attr("data-initial-value", value);
        }
    }
    //else {
    //    var msg = "Warning!You cannot leave blank this field";
    //    showAlert(msg, "alert-warning");
    //    $(ctrl).val($(ctrl).attr("data-initial-value"));
    //}
}

//This function check , is there any blank input box for column sequence? if yes then it return true
function checkBlankOrder() {
    debugger
    var isBlank = false;
    $("#tblViewSetting tbody tr").each(function (i, row) {
        i += 1;
        var value = $(this).find("td:eq(1) input[type='number']").val();
        debugger
        if (value == "" || value == "null") {
            debugger
            var itemText =$.trim( $(this).find("td:eq(0)").text());
            var msg = "Please assign order for '" +itemText + "' at row number " + i ;
            showAlert(msg, "alert-Warning");
            isBlank=true;
        }
    });
    return isBlank;
}


//For accept only numbers in input box
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    debugger
    console.log(charCode);
    if (!((charCode > 95 && charCode < 106)
      || (charCode > 47 && charCode < 58)
      || charCode == 8)) {
        return false;
    }

    //Keycode 96 to 105 =>output Numpad 0 to 9
    //Keycode 48 to 57  =>output   0 to 9 
    //Keycode 8 => output backspace
}





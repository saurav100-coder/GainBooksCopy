
function viewidChange() {
    if ($("#ddlViewid").val() != 0) {
        GetData($("#ddlViewid").val());
    }
    else {
        $("#divFields").hide();
        return false;
    }
}


function AddNewRow() {
    var newRowHtml = $("#tblprototype tbody tr").clone();
    $("#tblFields").append(newRowHtml);
}


function RemoveRow(btn) {
    $(btn).parents("tr").remove();
}

function GetData(p_viewsettings) {
    $("#divFields").hide();
    $("#tblFields tbody tr").remove();
    $(".loader").show();
    $.post('/Configuration/GetCompositeString', { p_viewsettings: p_viewsettings }, function (data) {
        if (data=="logout") {
            window.location.href = "/home/logout";
        }
        else if (data =="") {
            AddNewRow();
        }
        else {
            SetCompositeString(data);
        }
        $(".loader").hide();
        $("#divFields").show();
    })


}

function SetCompositeString(compositeString) {
    if (compositeString!="") {
        var arr = compositeString.split("#");
        for (var i = 0; i < arr.length; i++) {
            var ctrlArr = arr[i].split("~");
            AddNewRow();
            var lastRow = $("#tblFields tbody tr:last");
            $(lastRow).find("#FieldLabel").val(ctrlArr[0]);
            $(lastRow).find("#FieldType").val(ctrlArr[1]);
            $(lastRow).find("#FieldName").val(ctrlArr[2]);
            $(lastRow).find("#infotype").val(ctrlArr[3]);
            $(lastRow).find("#Defaultvalue").val(ctrlArr[4]);

           $(lastRow).find("#FieldType").prop("disabled",true);
           $(lastRow).find("#FieldName").prop("disabled",true);
           $(lastRow).find("#infotype").prop("disabled",true);
        }
    }
}



//make final composite Fields string from table
function MakeCompositeStringFromForm() {
    var finalCompositeString = "";
    $("#tblFields tbody tr").each(function () {
        var fieldLabel = $.trim($(this).find("#FieldLabel").val());
        var fieldType = $.trim($(this).find("#FieldType").val());
        var fieldName = $.trim( $(this).find("#FieldName").val());

        if (fieldLabel != "" && fieldType != "" && fieldName != "") {
            var infotype = $(this).find("#infotype").val();
            if (infotype == null || infotype =="0") {
                infotype = "";
            }
            if (finalCompositeString!="") {
                finalCompositeString +="#"
            }
            finalCompositeString += fieldLabel + "~" + fieldType + "~" + fieldName + "~" + infotype + "~" + $.trim($(this).find("#Defaultvalue").val());
        }
    });
    return finalCompositeString;
}

function SaveCompositeString() {
    var compositeString = MakeCompositeStringFromForm();
    if ($("#ddlViewid").val() != 0 ) {
        $.post('/configuration/SaveCompositeString', { p_viewsettings: $("#ddlViewid").val(), compositeString: compositeString }, function (data) {

            if (data=="logout") {
                window.location.href = "/home/logout";
            }
            else if (data=="error") {
                ShowMsg("Something went wrong. Please try again!")
            }
            else {
                ShowMsg("Data saved successfully.");
                GetData($("#ddlViewid").val());
            }
        });
    }
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

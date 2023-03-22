

function UpdateOpeningStock() {
    $("#TempMsg").html("");
    var file = document.getElementById('file1');
    if (file.files.length !== 0) {
        if (checkFile(file)) {
            var formdata = new FormData(document.getElementById('UpdateOpeningStockForm'))
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Invoices/AjaxUpdateStock');
            xhr.send(formdata);
            $("#loadspin,#overlay").show();
            xhr.onreadystatechange = function (data) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    $("#loadspin,#overlay").hide();
                    $("#loadspin,#overlay").hide();
                    $("#TempMsg").html("");
                    $("#TempMsg").html("Stock Updated Successfully");
                    $("#TempMsg").removeClass("text-danger").addClass("text-success");

                }
                else {
                    $("#loadspin,#overlay").hide();
                    $("#TempMsg").html("");
                    $("#TempMsg").html("An Error occured While storing your Information .Please Try again later.");
                    $("#TempMsg").removeClass("text-success").addClass("text-danger");
                }
            }
        }
    }
    else {
        $("#TempMsg").html("");
        $("#TempMsg").html("Please select file");
        $("#TempMsg").removeClass("text-success").addClass("text-danger");
    }
    return false;
}

function checkFile(sender) {
    var validExts = new Array(".xlsx");
    var fileExt = sender.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
        $("#TempMsg").html("");
        $("#TempMsg").html("Invalid file selected, Please select  " + validExts.toString() + " type files.");
        $("#TempMsg").removeClass("text-success").addClass("text-danger");
        return false;
    }
    else return true;
}
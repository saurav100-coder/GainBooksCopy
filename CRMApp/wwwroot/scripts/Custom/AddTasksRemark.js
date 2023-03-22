$(".ShowGrid").click(function () {
    $.post('/CRM/AddTasksRemarkData', {}, function (data) {
        $("#example1").toggle()
        var tblEmployee = $("#example1 tbody");
        $("#example1 tbody tr").remove();
        $.each(data.data, function (index, item) {
            var m = index + 1;
            var tr = $("<tr id='" + item.CRMCommunication_key + "'></tr>");
            tr.html(("<td style='width:3%'>" + m + "</td>")
              + " " + ("<td style='width:11%'>" + item.Commtext + "</td>")
            + " " + ("<td style='width:4%'>" + item.FrmtCreationDate + "</td>")
            + " " + ("<td style='width:5%'>" + item.TextLogincode + "</td>")
            + ("<td style='width:8%;'><a href='" + item.LinkURL + "' download>" + item.FileName + "</td>"));
            tblEmployee.append(tr);
        });
        $(".tab").hide();    //Added by Shweta
    });
});
$(document).ready(function () {
    $(".btn-Submit").click(function () {
        $(".btn-Submit").attr("disabled", true);
        $("#RegForm").submit();
    });
});



//for calender start
//jQuery('#datetimepicker').datetimepicker();
//for calender end

//Cur Date and Time Start
//var today = new Date();
//var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//var dateTime = date + ' ' + time;
//document.getElementById('datetimepicker').value = dateTime;
//Cur Date and Time End
$(document).ready(function () {
    $.post('/CRM/AddCollaboratorsData', {}, function (data) {
        var tblEmployee = $("#example1 tbody");
        $("#example1 tbody tr").remove();
        $.each(data.data, function (index, item) {
            var m = index + 1;
            var tr = $("<tr id='" + item.CRMCollaborator_key + "'></tr>");
            tr.html(("<td style='width:3%'>" + m + "</td>")
              + " " + ("<td style='width:11%'>" + item.TxtCollaborator + "</td>")
            + " " + ("<td style='width:6%'> <a class='' id='" + item.CRMCollaborator_key + "' onclick='deleteCollaborator(this.id)'><i class='glyphicon glyphicon-remove'></i></a></td>")
            );
            tblEmployee.append(tr);
        });
        $(".btn-Submit").click(function () {
            $(".btn-Submit").attr("disabled", true);
            $("#RegForm").submit();
        });
    });
});
function deleteCollaborator(id)
{
   
    $.ajax({
        type: "GET",
        url: "/CRM/DeleteCollaborator",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        data: { id: id },
        success: function (data) {
            debugger;
            if (data.statusCode == 500) {
                window.location.href = "/Home/Error";
            }
            else {
                var tblEmployee = $("#example1 tbody");
                $("#example1 tbody tr").remove();
                $.each(data.data, function (index, item) {
                    var m = index + 1;
                    var tr = $("<tr id='" + item.CRMCollaborator_key + "'></tr>");
                    tr.html(("<td style='width:3%'>" + m + "</td>")
                        + " " + ("<td style='width:11%'>" + item.TxtCollaborator + "</td>")
                        + " " + ("<td style='width:6%'> <a class='' id='" + item.CRMCollaborator_key + "' onclick='deleteCollaborator(this.id)'><i class='glyphicon glyphicon-remove'></i></a></td>")
                    );
                    tblEmployee.append(tr);

                })
            }
        },
        error: function () {
           alert("error")
        }
    });

}

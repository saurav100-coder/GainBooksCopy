$(document).ready(function () {
    $(".btn-Submit").click(function () {
        $(".btn-Submit").attr("disabled", true)
        $("#RegForm").submit();
    });
    $("#FirmName1").on('keyup ', function () {
        var firmname = $("#FirmName1").val();
        if (firmname.length >= 3) {
            $('#loading').show();
            $('#loadingmessage').show();
            $('#Msg').hide();
            $("#CustContainer").css("display", "");
            $.post('/CRM/FindCustomers', { firmname: firmname }, function (data) {
                var tblEmployee = $("#tblCustomers");
                $("#tblCustomers tbody tr").remove();
                if (data != "error") {
                    $.each(data.data, function (index, item) {
                        var m = index + 1;
                        var tr = $("<tr id='" + item.P_Customers + "'></tr>");
                        tr.html(("<td style='width:46px'>" + m + "</td>")
                           + " " + ("<td  style='width:173px'><input type='hidden' id='Email' class='Email' value='" + item.Email + "'/>" + item.CustName + "</td>")
                            + " " + ("<td style='width:88px'>" + item.MobNo + "</td>")
                           + " " + ("<td><input type='hidden' id='MainBussCode' class='MainBusscode' value='" + item.MainBussCode + "'/>" + item.TextMainBussCode + "</td>")
                            + " " + ("<td style='width:117px'>" + item.TextHomeTown + "</td>"));
                        tblEmployee.append(tr);
                    })
                    $('#loading').hide();
                    $('#loadingmessage').hide();
                    $('#Msg').hide();
                } else {
                    $('#loading').show();
                    $('#loadingmessage').hide();
                    $("#Msg").show();
                    $("#Msg").text("No record found");
                    //setTimeout($('#CustContainer').css("display", "none"), 5000)
                    $('#CustContainer').css("display", "none");
                }
            });
        }
        else {
            $('#CustContainer').css("display", "none");
            return;
        }
    });
    $('#tblCustomers').on('click', 'tr', function () {
        $("#CustContainer").css("display", "none");
        var rowid = this.id;
        var rid = "#" + rowid;
        var email = $(this).find("td:nth-child(2)").text();
        $("#FirmName1").val(email);
        $("#P_Customers").val(rowid);

    });
});
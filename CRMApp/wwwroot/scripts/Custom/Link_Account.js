$(document).ready(function () {

    $("#AccountName1").on('keyup ', function () {
        var accountname = $("#AccountName1").val();
        if (accountname.length >= 3) {
            $('#loading').show();
            $('#loadingmessage').show();
            $('#Msg').hide();
            $("#CustContainer").css("display", "");
            $.post('/CRM/AccountGridData', { accountname: accountname }, function (data) {
                var tblEmployee = $("#tblAccounts");
                $("#tblAccounts tbody tr").remove();
                if (data != "error") {
                    $.each(data.data, function (index, item) {
                        var m = index + 1;
                        var tr = $("<tr id='" + item.P_CRMAccounts + "'></tr>");
                        tr.html(("<td style='width:46px'>" + m + "</td>")
                           + " " + ("<td  style='width:173px'>" + item.AccountName + "</td>")
                            + " " + ("<td style='width:88px'>" + item.mobileno + "</td>")
                              + " " + ("<td style='width:88px'>" + item.Email + "</td>")
                           + " " + ("<td><input type='hidden' id='Industry' class='Industry' value='" + item.Industry + "'/>" + item.TextIndustry + "</td>")
                            + " " + ("<td style='width:117px'>" + item.TextHomeTown + "</td>")
                        + " " + ("<td style='width:117px'>" + item.District + "</td>")
                         + " " + ("<td style='width:117px'>" + item.State + "</td>")
                          + " " + ("<td style='width:117px'>" + item.Country + "</td>"));
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
    $('#tblAccounts').on('click', 'tr', function () {
        $("#CustContainer").css("display", "none");
        var rowid = this.id;
        var rid = "#" + rowid;
        $("#P_CRMAccounts").val(rowid);
        var email = $(this).find("td:nth-child(2)").text();
        $("#AccountName1").val(email);
        $("#P_CRMAccounts").val(rowid);

    });
});
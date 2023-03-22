$(document).ready(function () {
    $('#RegForm')[0].reset();
    $("#FirmName").on('keyup ', function () {
        var firmname = $("#FirmName").val();
        if (firmname.length >= 3) {
            $('#loading').show();
            $('#loadingmessage').show();
            $('#Msg').hide();
            $("#CustContainer").css("display", "");
            $.post('/CRM/FindCustomers', { firmname: firmname }, function (data) {
                var tblEmployee = $("#Customers");
                $("#Customers tbody tr").remove();
                if (data != "error") {
                    $.each(data.data, function (index, item) {
                        var m = index + 1;
                        var tr = $("<tr id='" + item.P_Customers + "'></tr>");
                        tr.html(("<td>" + m + "</td>")
                           + " " + ("<td><input type='hidden' id='Email' class='Email' value='" + item.Email + "'/>" + item.CustName + "</td>")
                            + " " + ("<td>" + item.MobNo + "</td>")
                           + " " + ("<td><input type='hidden' id='MainBussCode' class='MainBusscode' value='" + item.MainBussCode + "'/>" + item.TextMainBussCode + "</td>")
                            + " " + ("<td>" + item.TextHomeTown + "</td>"));
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
    $("#ContactPerson").on('click', function () {
        $('#CustContainer').css("display", "none");
    })

    $("#P_CustSearch").on('click', function () {
        var Pcust = $("#PCust_Text").val();
        if (Pcust != 0 || Pcust != undefined || Pcust != null) {
            $.post('/CRM/FindCustomersbyPcustomer', { pcustomer: Pcust }, function (data) {
                $('#FirmName').val(data[0].CustName);
                $('#EmailId').val(data[0].Email);
                $('#Mobileno').val(data[0].MobNo);
                $("#P_Customers").val(Pcust);
                if (data[0].MainBussCode == -2) {
                    data[0].MainBussCode = 0;
                }
                var findbuss = false;
                $('#Buss option').map(function () {
                    if ($(this).val() == data[0].MainBussCode) { findbuss = true; return this; }
                }).attr('selected', 'selected');
                if (findbuss == false) {
                    $('#Buss option').map(function () {
                        if ($(this).val() == 0) { return this; }
                    }).attr('selected', 'selected');
                }
                $('#Buss option').map(function () {
                    if ($(this).val() == data[0].MainBussCode) { findbuss = true; return this; }
                }).prop('selected', 'selected');
                if (findbuss == false) {
                    $('#Buss option').map(function () {
                        if ($(this).val() == 0) { return this; }
                    }).prop('selected', 'selected');
                }

                //$('#Buss').val(data[0].MainBussCode);
                $('#Location').val(data[0].TextHomeTown);
            });
            $.post('/CRM/FindContactPersonFromPCustomers', { P_Customers: Pcust }, function (data) {
                var ContactPerson = data;
                $('#ContactPerson').val(ContactPerson);
            });
        }
    });
    $('#Customers').on('click', 'tr', function () {
        $(this).addClass("highlight");
        $("#CustContainer").css("display", "none");
        var rowid = this.id;
        var rid = "#" + rowid;
        var email = $(rid).find("td input.Email").val();
        var BussCode = $(rid).find("td input.MainBusscode").val();
        $("#P_Customers").val(rowid);
        var fname = $(this).find("td:nth-child(2)").text();
        var Mobno = $(this).find("td:nth-child(3)").text();
        var Location = $(this).find("td:nth-child(5)").text();
        $('#EmailId').val(email);
        $('#Mobileno').val(Mobno);
        //var selectedText = 'Admin';
        if (BussCode == -2 || BussCode == null || BussCode == undefined) {
            BussCode = 0;
        }
        var findbuss = false;
        $('#Buss option').map(function () {
            if ($(this).val() == BussCode) { findbuss = true; return this; }
        }).attr('selected', 'selected');
        if (findbuss == false) {
            $('#Buss option').map(function () {
                if ($(this).val() == 0) { return this; }
            }).attr('selected', 'selected');
        }
        $('#Buss option').map(function () {
            if ($(this).val() == BussCode) { findbuss = true; return this; }
        }).prop('selected', 'selected');
        if (findbuss == false) {
            $('#Buss option').map(function () {
                if ($(this).val() == 0) { return this; }
            }).prop('selected', 'selected');
        }

        //$('#Buss').text(BussCode);
        $('#Location').val(Location);
        $('#FirmName').val(fname);
        if (rowid != 0 || rowid != undefined || rowid != null) {
            $.post('/CRM/FindContactPersonFromPCustomers', { P_Customers: rowid }, function (data) {
                var ContactPerson = data;
                $('#ContactPerson').val(ContactPerson);
            });
        }
    });
    $(".btn-Submit").click(function () {
        $(".btn-Submit").attr("disabled", true);
        $("#RegForm").submit();
    });
});
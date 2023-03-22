$(document).ready(function () {
    $('a').tooltip();
    $(function () {
        $(".btn-Remark").click(function () {
            var $buttonClicked = $(this);
            var options = {
                "backdrop": "static",
                keyboard: true
            };
            $.ajax({
                type: "GET",
                url: "/CRM/AddRemarkView",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                data: { id: $("#IssuefileGST_Key").val(), CalledFrom: "EditRegCalls" },
                success: function (data) {
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    else {
                        debugger;
                        $('#myRemark').html(data);
                        $('#Remark').modal(options);
                        $('#Remark').modal('show');
                    }
                },
                error: function () {
                    alert("Content load failed.");
                }
            });
        });
        $(".btn-MsgSend").click(function () {
            var $buttonClicked = $(this);
            var options = {
                "backdrop": "static",
                keyboard: true
            };
            $.ajax({
                type: "GET",
                url: "/CRM/MsgToCustomer",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                data: { id: $("#IssuefileGST_Key").val(), CalledFrom: "EditRegCalls" },
                success: function (data) {
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    else {
                        debugger;
                        $('#myMsgCustomer').html(data);
                        $('#MsgCustomer').modal(options);
                        $('#MsgCustomer').modal('show');
                    }
                },
                error: function () {
                    //$('#myModal').modal(options);
                    //$('#myModal').modal('show');
                    alert("Content load failed.");
                }
            });
        });
        $(".btn-MailCustomer").click(function () {
            var $buttonClicked = $(this);
            var options = {
                "backdrop": "static",
                keyboard: true
            };
            $.ajax({
                type: "GET",
                url: "/CRM/MailToCustomer",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                data: {
                    id: $("#IssuefileGST_Key").val(), CalledFrom: "EditRegCalls"
                },
                success: function (data) {
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    else {
                        debugger;
                        $('#MailCustomerContent').html(data);
                        $('#MailToCustomer').modal(options);
                        $('#MailToCustomer').modal('show');
                    }
                },
                error: function () {
                    alert("Content load failed.");
                }
            });
        });
        $(".btn-MailDealer").click(function () {
            var $buttonClicked = $(this);
            var options = {
                "backdrop": "static",
                keyboard: true
            };
            $.ajax({
                type: "GET",
                url: "/CRM/MailToDealer",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                data: { //id: $("#grid1").val()
                    id: $("#IssuefileGST_Key").val(),
                    CalledFrom: "EditRegCalls"
                },
                success: function (data) {
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    else {
                        debugger;
                        $('#MailDealerContent').html(data);
                        $('#MailToDealer').modal(options);
                        $('#MailToDealer').modal('show');
                    }
                },
                error: function () {
                    alert("Content load failed.");
                }
            });
        });
        $(".btn-LinkCustomer").click(function () {
            var $buttonClicked = $(this);
            var options = {
                "backdrop": "static",
                keyboard: true
            };
            $.ajax({
                type: "GET",
                url: "/CRM/LinkCustomer",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                data: {
                    id: $("#IssuefileGST_Key").val(), CalledFrom: "EditRegCalls"
                },
                success: function (data) {
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    else {
                        debugger;
                        $('#LinkCustomerContent').html(data);
                        $('#LinkCustomer').modal(options);
                        $('#LinkCustomer').modal('show');
                    }
                },
                error: function () {
                    alert("Content load failed.");
                }
            });
        });
        $(".btn-Submit").click(function () {
            $(".btn-Submit").attr("disabled", true)
            $("#RegForm1").submit();
        });
        $("#closbtn").click(function () {
            debugger;
            $('#myModal').modal('hide');
        });
    });
});
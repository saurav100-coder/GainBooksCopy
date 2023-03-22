$(document).ready(function () {
    var d = $("#fvalue").val();
    var m = [];
    m = d.split("|");
    var l;
    for (i = 0; i <= m.length - 1; i = i + 1) {
        l = m[i].split("~");
        var dropdown = $("#filter");
        $('#filter').append($('<option>', {
            value: l[1] + ":" + l[2],
            text: l[0]
        }));
    };
    $('a').tooltip();

    $("button").attr("disabled", "disable")
    $(".btn-edit").attr("disabled", "disable")
    $("#filterbtn").attr("disabled", false)
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
                data: { id: $("#grid1").val(), CalledFrom: "ManageRegCalls" },
                success: function (data) {
                    debugger;
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    else {
                        $('#myRemark').html(data);
                        $('#Remark').modal(options);
                        $('#Remark').modal('show');
                    }
                },
                error: function () {
                    $('#NoRow').modal(options);
                    var Mtitle = "Select a Row";
                    $('.modal-title').text(Mtitle);
                    $('#NoRow').modal('show');
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
                data: { id: $("#grid1").val(), CalledFrom: "ManageRegCalls" },
                success: function (data) {
                    debugger;
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    else {
                        $('#myMsgCustomer').html(data);
                        $('#MsgCustomer').modal(options);
                        var Mtitle = "Message To Customer: ";
                        $('.modal-title').text(Mtitle);
                        $('#MsgCustomer').modal('show');
                    }
                },
                error: function () {
                    $('#NoRow').modal(options);
                    var Mtitle = "Select a Row";
                    $('.modal-title').text(Mtitle);
                    $('#NoRow').modal('show');
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
                data: { id: $("#grid1").val(), CalledFrom: "ManageRegCalls" },
                success: function (data) {
                    debugger;
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    else {
                        $('#MailCustomerContent').html(data);
                        $('#MailToCustomer').modal(options);
                        $('#MailToCustomer').modal('show');
                    }
                },
                error: function () {
                    $('#NoRow').modal(options);
                    var Mtitle = "Select a Row";
                    $('.modal-title').text(Mtitle);
                    $('#NoRow').modal('show');
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
                data: { id: $("#grid1").val(), CalledFrom: "ManageRegCalls" },
                success: function (data) {
                    debugger;
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                    else {
                        $('#MailDealerContent').html(data);
                        $('#MailToDealer').modal(options);
                        $('#MailToDealer').modal('show');
                    }
                },
                error: function () {
                    $('#NoRow').modal(options);
                    var Mtitle = "Select a Row";
                    $('.modal-title').text(Mtitle);
                    $('#NoRow').modal('show');
                }
            });
        });
        $("#closbtn").click(function () {
            debugger;
            $('#myModal').modal('hide');
        });
    });
    //PaymentRelatedCalls Grid
    $('#example').dataTable({
        "scrollY": 420,
        "scrollX": true,
        "bPaginate": false,
        "select": { "style": "single" },
        "bFilter": false,
        "processing": true, // control the processing indicator.
        "serverSide": false, // recommended to use serverSide when data is more than 10000 rows for performance reasons
        "info": false,   // control table information display field
        "stateSave": true,  //restore table state on page reload,
        "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],    // use the first inner array as the page length values and the second inner array as the displayed options
        //        "ajax":{
        //            "url": "@String.Format('{0}://{1}{2}', Request.Url.Scheme, Request.Url.Authority, Url.Content('~'))/CRM/AjaxGetJsonData",
        //    "type": "GET"
        //},
        "ajax": {
            "url": "/CRM/AjaxCurrentActionableTask ",
            "type": "POST"

        },
        "columns": [
                                  { "data": "Issuesfilegstkey", "orderable": false, width: "2%" },
                                  { "data": "P_issuesfilegst", "orderable": true, width: "6%" },
                                  {
                                      "data": "FrmtCreationDate", "orderable": true, width: "5%"
                                      //"render": function (data) {return moment(data).format("MM/DD/YYYY h:mm:ss a");},target:2
                                  },
                    { "data": "Firmname", "orderable": true, width: "9%" },
                    { "data": "Contactperson", "orderable": true, "searchable": false, width: "8%" },
                    { "data": "Mobileno", "orderable": false, width: "5%" },
                    { "data": "Location", "orderable": false, width: "5%" },
                    { "data": "TextIssuetype", "orderable": false, "searchable": false, width: "10%" },
                    { "data": "Issuedescription", "orderable": false, "searchable": false, width: "10%" },
                    { "data": "TextStatus", "orderable": false, "searchable": false, width: "5%" }
        ],
        "order": [[2, "asc"]],
        fixedColumns: true,
        columnDefs: [
        {
            targets: 0,
            searchable: false,
            orderable: false,
            render: function (data, type, full, meta) {
                var a = meta.row + meta.settings._iDisplayStart + 1;
                return "<div><input type='checkbox' id='" + data + "' style='margin-top:2px; float:left'/>&nbsp;" + a + "</div>";
            }
        }, ]
    });
    var table = $('#example').DataTable();
    $("#filter").on("change", function () {
        var a = $("#filter").val();
        var b = [];
        if (a != 0) {
            b = a.split(":");
            if (b[1] == "string") {
                var a = document.getElementById("dateC")
                a.style.display = "none";
                $("#TextC").css("display", "");
            }
            else if (b[1] == "date") {
                //if (a == "2") {
                $("#TextC").css("display", "none");
                var a = document.getElementById("dateC")
                a.style.display = "";
            }
        }
        else {
            $("#TextC").css("display", "none");
            var a = document.getElementById("dateC")
            a.style.display = "none";
        }
    });
    //var d= ViewBag.Message;
    var table = $('#example').DataTable()
    //table.on('order.dt search.dt', function () {
    //    table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
    //        var a = i + 1;
    //        cell.innerHTML = "<div><input type='checkbox' id='" + data + "' />&nbsp;&nbsp;" + a+ "</div>";
    //    });
    //}).draw();

    $('#example tbody').on('click', "input[type='checkbox']", function () {
        var t = $(this).parent().parent();
        if ($(this).prop("checked") == true) {
            if ($(t).parent().hasClass('highlight')) {
                $(t).parent().removeClass('highlight');
            }
            else {
                var row = table.$('tr.highlight').find("td:first input");
                if ($(row).prop("checked") == true) {
                    $(row).prop("checked", false);
                }
                table.$('tr.highlight').removeClass('highlight');
                $(t).parent().addClass('highlight');
            }
        }
        else if ($(this).prop("checked") == false) {
            var t = $(this).parent().parent();
            $(t).parent().removeClass('highlight');
        }
    })
    $('#example tbody').on('click', 'tr', function () {
        //table.rows('.highlight').deselect();
        //$(this).toggleClass('selected');
        if (event.target.type !== 'checkbox') {
            $(':checkbox', this).trigger('click');
            //$(this).toggleClass('highlight');                               
        }
        var rowData = table.cell(".highlight", 0).data();
        document.getElementById("grid1").value = rowData;
        $(".btn-delete").attr("disabled", false)
        $(".btn-edit").attr("disabled", false)
    });
    //Code for context menu
    $.contextMenu({
        selector: '#example tr',
        callback: function (key, options) {
            //var m = "clicked: " + key + options.$trigger[0].cells[0].children[0].childNodes[0].id + "" + options.$trigger[0].cells[3].textContent;
            var Rowid = options.$trigger[0].cells[0].children[0].childNodes[0].id;
            var Custnameid = options.$trigger[0].cells[3].textContent;
            var IssueDescription = options.$trigger[0].cells[8].textContent;
            //window.console && console.log(m) || alert(m);
            switch (key) {
                case "edit":
                    location.href = '/CRM/EditRegCalls/' + Rowid;
                    break;
                case "remarks":
                    var options = {
                        "backdrop": "static",
                        keyboard: true
                    };
                    $.ajax({
                        type: "GET",
                        url: "/CRM/AddRemarkView",
                        contentType: "application/json; charset=utf-8",
                        datatype: "json",
                        data: { id: Rowid, CalledFrom: "ManageRegCalls" },
                        success: function (data) {
                            debugger;
                            if (data.statusCode == 500) {
                                window.location.href = "/Home/Error";
                            }
                            else {
                                $('#myRemark').html(data);
                                $('#Remark').modal(options);
                                var Mtitle = "Remark: " + Custnameid;
                                $('.modal-title').text(Mtitle);
                                $('#Remark').modal('show');
                            }
                        },
                        error: function () {
                            alert("Content load failed.");
                        }
                    });
                    break;
                case "MsgToCustomer":
                    var options = {
                        "backdrop": "static",
                        keyboard: true
                    };
                    $.ajax({
                        type: "GET",
                        url: "/CRM/MsgToCustomer",
                        contentType: "application/json; charset=utf-8",
                        datatype: "json",
                        data: { id: Rowid, CalledFrom: "ManageRegCalls" },
                        success: function (data) {
                            debugger;
                            if (data.statusCode == 500) {
                                window.location.href = "/Home/Error";
                            }
                            else {
                                $('#myMsgCustomer').html(data);
                                $('#MsgCustomer').modal(options);
                                var Mtitle = "Message To Customer: " + Custnameid;
                                $('.modal-title').text(Mtitle);
                                $('#MsgCustomer').modal('show');
                            }
                        },
                        error: function () {
                            alert("Content load failed.");
                        }
                    });
                    break;
                case "MailToCustomer":
                    var options = {
                        "backdrop": "static",
                        keyboard: true
                    };
                    $.ajax({
                        type: "GET",
                        url: "/CRM/MailToCustomer",
                        contentType: "application/json; charset=utf-8",
                        datatype: "json",
                        data: { id: Rowid, CalledFrom: "ManageRegCalls" },
                        success: function (data) {
                            debugger;
                            if (data.statusCode == 500) {
                                window.location.href = "/Home/Error";
                            }
                            else {
                                $('#MailCustomerContent').html(data);
                                $('#MailToCustomer').modal(options);
                                var Mtitle = "Mail To Customer: " + Custnameid;
                                $('.modal-title').text(Mtitle);
                                $('#MailToCustomer').modal('show');
                            }
                        },
                        error: function () {
                            alert("Content load failed.");
                        }
                    });
                    break;
                case "MailToDealer":
                    var options = {
                        "backdrop": "static",
                        keyboard: true
                    };
                    $.ajax({
                        type: "GET",
                        url: "/CRM/MailToDealer",
                        contentType: "application/json; charset=utf-8",
                        datatype: "json",
                        data: { id: Rowid, CalledFrom: "ManageRegCalls" },
                        success: function (data) {
                            debugger;
                            if (data.statusCode == 500) {
                                window.location.href = "/Home/Error";
                            }
                            else {
                                $('#MailDealerContent').html(data);
                                $('#MailToDealer').modal(options);
                                var Mtitle = "Mail To Dealer: " + Custnameid;
                                $('.modal-title').text(Mtitle);
                                $('#MailToDealer').modal('show');
                            }
                        },
                        error: function () {
                            alert("Content load failed.");
                        }
                    });
                    break;
                case "FollowUpCall":
                    var options = {
                        "backdrop": "static",
                        keyboard: true
                    };
                    $('#IssueDescription').html();
                    $('#FollowUpCall').modal(options);
                    var Mtitle = "Issue Description: " + Custnameid;
                    var Mbody = IssueDescription;
                    $('.modal-title').text(Mtitle);
                    $('#description').text(Mbody);
                    $('#FollowUpCall').modal('show');

                    break;
                case "Call Closed":
                    var options = {
                        "backdrop": "static",
                        keyboard: true
                    }; $.ajax({
                        type: "GET",
                        url: "/CRM/CallClosed",
                        contentType: "application/json; charset=utf-8",
                        datatype: "json",
                        data: { id: Rowid },
                        success: function () {
                            debugger;
                            if (data.statusCode == 500) {
                                window.location.href = "/Home/Error";
                            }
                            else {
                                $('#CallClosedContent').html();
                                $('#CallClosed').modal(options);
                                var Mtitle = "Call Closed Successfully:" + "  " + Custnameid;
                                $('.modal-title').text(Mtitle);
                                $('#CallClosed').modal('show');
                            }
                        },
                        error: function () {
                            alert("An error occured.Please try again later.");
                        }
                    });
                    break;

            }
        },
        items: {
            "edit": { name: "Edit", icon: "fa-pencil" },
            "remarks": { name: "Remarks", icon: "fa-comment-o" },
            "MsgToCustomer": { name: "Message To Customer", icon: "mobile" },
            "MailToCustomer": { name: "Mail To Customer", icon: "fa-envelope-o" },
            "MailToDealer": { name: "Mail To Dealer", icon: "MailD" },
            "Call Closed": { name: "Call Closed", icon: "fa-phone" },
        }
    });


    $('#example tr').on('click', function (e) {

        console.log('clicked', this);
    })

    $('#example').on('contextmenu', 'tr', function (e) {
        if ($(this).hasClass('highlight')) {
        }
        else {
            var row = table.$('tr.highlight').find("td:first input");
            if ($(row).prop("checked") == true) {
                $(row).prop("checked", false);
            }
            table.$('tr.highlight').removeClass('highlight');
            $(this).addClass('highlight');
            $(this).find("td:first input").prop("checked", true);

        }
    });
});
function dd() {
    var a = document.getElementById("grid1").value;
    if (a == "0" || a == null || a == undefined || a == "") {
        var options = {
            "backdrop": "static",
            keyboard: true
        };
        $('#NoRow').modal(options);
        var Mtitle = "Select a Row";
        $('.modal-title').text(Mtitle);
        $('#NoRow').modal('show');
    } else { location.href = '/CRM/EditRegCalls/' + a; }

}

function DoSearch() {
    var table = $('#example');
    var rows = document.getElementsByTagName("tr");
    var q = document.getElementById("filterText");
    var v = q.value.toLowerCase();
    var on = 0;

    var a = $("#filter").val();
    var b = [];
    b = a.split(":");
    for (var i = 2; i < rows.length; i++) {
        //var m = table.column(b[0]);
        var fullname = rows[i].getElementsByTagName("td");
        //var c = $(fullname).text(b[0]);
        //var s = rows[i].ce
        fullname = fullname[b[0]].innerHTML.toLowerCase();
        if (fullname) {
            if (v.length == 0 || (v.length < 3 && fullname.indexOf(v) == 0) || (v.length >= 3 && fullname.indexOf(v) > -1)) {
                rows[i].style.display = "";
                on++;
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}
function DateSearch() {
    var rows = document.getElementsByTagName("tr");
    var min = document.getElementById("min");
    var max = document.getElementById("max");
    if (min.value == "") {
        var min1 = null;
    }
    else {
        var min1 = new Date(min.value);
    }
    if (max.value == "") {
        var max1 = null;
    }
    else {
        var max1 = new Date(max.value);
    }
    var on = 0;
    for (var i = 2; i < rows.length; i++) {
        var fullname = rows[i].getElementsByTagName("td");
        fullname = new Date(fullname[2].innerHTML);
        if (fullname >= min1 && fullname <= max1 || fullname >= min1 && max1 == null || min1 == null && fullname <= max1 || max1 == null && min1 == null) {
            rows[i].style.display = "";
            on++;
        } else {
            rows[i].style.display = "none";
        }
    }
}
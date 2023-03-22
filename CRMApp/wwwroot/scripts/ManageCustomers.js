function PageSize(value) {
    var a = $("#size").val();
    sessionStorage.setItem("PageSize", a);
    $(".yy").hide();
    var b = sessionStorage.getItem("search");
    var o = sessionStorage.getItem("order");
    var custname = $("#example").find('tr:last td:nth-child(3)').text();
    //var key = $("#example").find('tr:nth-child(1) td:first input').val();
    if (o != undefined && o != "null") {
        order = o.split(":");
        var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
        ordervalue = "";
        o = order[1] + "~" + ordervalue + "~" + order[2];
        JSON.stringify(o);
    }
    $("#example tbody tr").remove();
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $('#p').css("display", "none");
    $.post('/Dealer/CustomerData', { id: 1, start: 1, pSize: a, direction: "F", search: b, order: o, ServerOrderValue: custname }, function (data) {
        loadData(data);
    })
}
$(document).ready(function () {
    sessionStorage.clear();
    //logic to fill search dropdown
    var d = $("#fvalue").val();
    var m = [];
    m = d.split("|");
    var l;
    for (i = 0; i <= m.length - 1; i = i + 1) {
        l = m[i].split("~");
        $('#filter').append($('<option>', { value: l[1] + ":" + l[2], text: l[0] }));
    };
    //done logic of filter dropdown 
    var a = 1;
    sessionStorage.setItem("start", 1);
    var t = sessionStorage.getItem("PageSize");
    if (t == null) { t = 20 }
    var SelectedRows = "";
    GetEmployeeData(a, 1, t, "F");
    sessionStorage.setItem("search", null);
    $("#example tbody tr").remove();

    var counter = 0;
    $("#Prev").on("click", function () {
        var key = $("#example").find('tr:nth-child(1) td:first input').val();
        var custname = $("#example").find('tr:nth-child(1) td:nth-child(3)').text();
        var a = sessionStorage.getItem("PageSize");
        var b = sessionStorage.getItem("search");
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem("order");
        if (o != undefined && o != "null") {
            order = o.split(":");
            var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
            ordervalue = $(orderid).text();
            o = order[1] + "~" + ordervalue + "~" + order[2];
            JSON.stringify(o);
        }
        if (a != null) { d = (d - a) - 1; } else { d = (d - 20) - 1; }
        $("#example tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (key != 1) {
            $.post('/Dealer/CustomerData', { id: key, start: d, pSize: a, direction: "R", search: b, order: o, ServerOrderValue: custname }, function (data) {
                loadData(data);
            })
        }
    });
    $("#Next").on("click", function () {
        var b = sessionStorage.getItem("Total");
        var custname = $("#example").find('tr:last td:nth-child(3)').text();
        var key = $("#example").find('tr:last td:first input').val();
        var a = sessionStorage.getItem("PageSize");
        var c = sessionStorage.getItem("search");
        var d = sessionStorage.getItem("start");
        var o = sessionStorage.getItem("order");
        if (o != undefined && o != "null") {
            order = o.split(":");
            var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
            ordervalue = $(orderid).text();
            o = order[1] + "~" + ordervalue + "~" + order[2];
            JSON.stringify(o);
        }
        if (a != null) { d = parseInt(d) + parseInt(a) - 1; } else { d = parseInt(d) + 20 - 1; }
        $("#example tbody tr").remove();
        $('#loading').show();
        $('#loadingmessage').show();
        $('#Msg').hide();
        if (key != b) {
            $.post('/Dealer/CustomerData', { id: key, start: d, pSize: a, direction: "F", search: c, order: o, ServerOrderValue: custname }, function (data) {
                loadData(data);
            })
        }
    });
    $('#example thead tr').on('click', 'th', function () {
        var ordervalue = "";
        var ele = $(this).find("input").val();
        var ids = $('.sortable');
        for (i = 0; i <= ids.length - 1; i++) {
            var selector = "#" + ids[i].id;
            $(selector).removeClass();
            $(selector).addClass("glyphicon glyphicon-sort sortable ");
        }
        if (ele != undefined) {
            var order = ele.split(":");
            var sort = "#" + "sort-" + order[0];
            if (order[2] == "none") {
                order[2] = "asc";
                $(sort).removeClass();
                $(sort).addClass("glyphicon glyphicon-sort-by-attributes sortable");
            } else if (order[2] == "asc") {
                order[2] = "desc";
                $(sort).removeClass();
                $(sort).addClass("glyphicon glyphicon-sort-by-attributes-alt sortable");
            }
            else if (order[2] == "desc") {
                order[2] = "asc";
                $(sort).removeClass();
                $(sort).addClass("glyphicon glyphicon-sort-by-attributes sortable");
            }
            var ControlVal = order[0] + ":" + order[1] + ":" + order[2];
            $(this).find("input").val(ControlVal);
            var a = "tbody tr:last td:nth-child(" + order[0] + ")";
            ordervalue = "";
            var o = order[1] + "~" + ordervalue + "~" + order[2];
            JSON.stringify(o);
            var search = sessionStorage.getItem("search");
            var a = sessionStorage.getItem("PageSize");
            sessionStorage.setItem("order", ele);
            $("#example tbody tr").remove();
            $('#loading').show();
            $('#loadingmessage').show();
            $('#Msg').hide();
            $.post('/Dealer/CustomerData', { id: 1, start: 1, pSize: a, direction: "F", search: search, order: o }, function (data) {
                loadData(data);
            })
        }
    });     
            $(".btn-reg").click(function () {
                var $buttonClicked = $(this);
                var options = {
                    "backdrop": "static",
                    keyboard: true
                };
                $('#myModal').modal(options);
                $('#myModal').modal('show');
            });
    
        $(function () {
            $(".btn-PayDetails").click(function () {
                $("#myModal").hide();
                var $buttonClicked = $(this);
                var options = {
                    "backdrop": "static",
                    keyboard: true
                };
                $.ajax({
                    type: "GET",
                    url: "/Dealer/PaymentDetails",
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    //data: { id: $("#grid1").val(), CalledFrom: "ManageRegCalls" },
                    success: function (data) {
                        //debugger;
                        $('#myRemark').html(data);
                        $('#payment').modal(options);
                        $('#payment').modal('show');
                    },
                    Error: function () {
                        alert("Content load failed.");
                    }
                });
            });
        });
        //var Table = $('#example').DataTable();
        $('#example').on('click', "input[type='checkbox']", function () {
            //if ($(this).prop("checked") == true) {
            //    var s = $(this).parent().parent();
            //    $(s).toggleClass('highlight');
            //    var rowData = $(s).find("td:first input").val();
            //    document.getElementById("grid1").value = rowData;
            //}
            //else if ($(this).prop("checked") == false) {
            //    var t = $(this).parent().parent();
            //    $(t).toggleClass('highlight');
            //}

            var t = $(this).parent().parent();
            if ($(this).prop("checked") == true) {
                if ($(t).hasClass('highlight')) {
                    $(t).removeClass('highlight');
                }
                else {
                    var row = $('#example tr.highlight').find("td:first input");
                    if ($(row).prop("checked") == true) {
                        $(row).prop("checked", false);
                    }
                    $('#example tr.highlight').removeClass('highlight');
                    $(t).addClass('highlight');
                }
            }
            else if ($(this).prop("checked") == false) {
                var t = $(this).parent().parent();
                $(t).removeClass('highlight');
            }
        });
        $('#example').on('click', 'tr', function () {
            if (event.target.type !== 'checkbox') {
                $(':checkbox', this).trigger('click');
            }
       
            var rowData = $(this).find("td:first input").val();
         document.getElementById("grid1").value = rowData;
         
        });
        $("#filter").on("change", function () {
            var a = $("#filter").val();
            if (a == "0") {
                $("#TextC").css("display", "none");
                var a = document.getElementById("dateC")
                a.style.display = "none";
            } else {
                b = a.split(":");
                if (b[1] == "date") {
                    $("#TextC").css("display", "none");
                    var a = document.getElementById("dateC")
                    a.style.display = "";
                } else if (b[1] == "string") {
                    var a = document.getElementById("dateC")
                    a.style.display = "none";
                    $("#TextC").css("display", "");
                } else if (b[1] == "integer") { }
            }
        });
        $('#popover1').popover({
            html: true,
            trigger: 'manual',
            content: function () { return $('#popover_content_wrapper1').html(); }
        });
        $(document).on('click', '#popover1', function () {
            $(this).popover('toggle');
            $('#popover2').popover({
                html: true,
                trigger: 'manual',
                content: function () { return $('#popover_content_wrapper2').html(); }
            });
        });
        $(document).on('click', '#popover2', function () { $(this).popover('toggle'); });
        $('a').tooltip();
        })
     
        function GetEmployeeData(pageNumber, start, PSize, dir) {
            $('#loading').show();
            $('#loadingmessage').show();
            $.post('/Dealer/CustomerData', { id: pageNumber, start: start, pSize: PSize, direction: dir }, function (data) {
                sessionStorage.setItem("Total", data.recordsTotal);
                loadData(data);
            });
        }
function DoSearch() {
    var value = $("#filterText").val();
    var col = $("#filter").val();
    var b = col.split(":");
    var search = value + "," + b[0] + ":" + b[1];
    JSON.stringify(search);
    sessionStorage.setItem("search", search);
    var a = sessionStorage.getItem("PageSize");
    var o = sessionStorage.getItem("order");
    if (o != undefined && o != "null") {
        order = o.split(":");
        var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
        ordervalue = "";
        o = order[1] + "~" + ordervalue + "~" + order[2];
        JSON.stringify(o);
    }
    $("#example tbody tr").remove();
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $.post('/Dealer/CustomerData', { id: 1, start: 1, pSize: a, direction: "F", search: search, order: o }, function (data) {
        loadData(data);
    })
}
function dd() {
    var selectedIDs = [];
    $("#example tr.highlight").each(function (index, row) {
        selectedIDs.push($(row).find("td:first input").val());
    });
    if (selectedIDs.length == "1") {
        var a = document.getElementById("grid1").value;
        location.href = '/Dealer/CustomerForm?exitmode=Edit&id=' + a;
    }
    else {
        var options = {
            "backdrop": "static",
            keyboard: true
        };
        $('#alert').modal(options);
        $('#alert').modal('show');
    }
}
function pp() {
    //var Table = $('#example').DataTable();
    var selectedIDs = [[]];
    var h = $("#example tr.highlight");
    var y = h.toArray();
    var d = h.length;
    if (d == "0") { $("#rew").hide(); $("p").show(); }
    else { $("#rew").show(); $("p").hide(); }
    var s = null;
    s = h;
    var register = document.getElementById("register");
    for (i = 0; i <= d - 1 ; i = i + 1) {
        var index = i + 1;
        newDiv = document.createElement('div');
        newDiv.innerHTML = ""
        //newDiv.id = 'r' + i;
        newDiv.className = 'col-md-12 mm';
        newDiv.id = 'newDiv';
        register.appendChild(newDiv);

        Div1 = document.createElement('div');
        Div1.className = 'col-md-1 jj';
        Div1.innerHTML = index;
        newDiv.appendChild(Div1);

        Div2 = document.createElement('div');
        Div2.className = 'col-md-4 uu';
        Div2.innerHTML = $(h[i]).find("td:nth-child(3)").text();
        newDiv.appendChild(Div2);

        Div3 = document.createElement("div");
        Div3.className = 'col-md-5 tt';
        Div3.innerHTML = "";
        newDiv.appendChild(Div3);

        Div31 = document.createElement('div');
        Div31.className = 'col-md-1 glyphicon glyphicon-calendar  icon';
        Div31.innerHTML = "";
        Div3.appendChild(Div31);

        Div32 = document.createElement("INPUT");
        Div32.setAttribute("type", "date");
        Div32.className = 'col-md-3 ii';
        Div32.innerHTML = h[i]["id"];
        document.createElement("INPUT");
        var a = $(h[i]).find("td:nth-child(7)").text();
        var parts = a.split('/');
        var mydate = new Date(parts[2], parts[1] - 1, parts[0]);
        var K = new Date(a);
        var b = moment(K).format("YYYY-MM-DD")
        Div32.setAttribute("value", b);
        Div3.appendChild(Div32);
    }
}
function myFunction() { $("#register").empty(); };


function DateSearch() {
    var min = $("#min").val();
    var max = $("#max").val();
    var col = $("#filter").val();
    var b = col.split(":");
    var search = min + "," + max + "," + b[0] + ":" + b[1];
    JSON.stringify(search);
    sessionStorage.setItem("search", search);
    var a = sessionStorage.getItem("PageSize");
    var o = sessionStorage.getItem("order");
    if (o != undefined && o != "null") {
        order = o.split(":");
        var orderid = "tbody tr:last td:nth-child(" + order[0] + ")";
        ordervalue = "";
        o = order[1] + "~" + ordervalue + "~" + order[2];
        JSON.stringify(o);
    }
    $("#example tbody tr").remove();
    $('#loading').show();
    $('#loadingmessage').show();
    $('#Msg').hide();
    $.post('/Dealer/CustomerData', { id: 1, start: 1, pSize: a, direction: "F", search: search, order: o }, function (data) { loadData(data); });
}
function loadData(data) {
    var tblEmployee = $("#example tbody");
    $("#example tbody tr").remove();
    var a = data.draw;
    if ($("#Next").hasClass("disabledbutton") == true) { $("#Next").removeClass("disabledbutton"); }
    if ($("#Prev").hasClass("disabledbutton") == true) { $("#Prev").removeClass("disabledbutton"); }
    var d = sessionStorage.getItem("PageSize");
    if (d == null || d == 0 || d == "undefined") { d = 20; sessionStorage.setItem("PageSize", d); };
    var b;
    if (a == 1) { b = d; } else { b = parseInt(a) + parseInt(d); a = parseInt(a) + 1 }
    sessionStorage.setItem("start", a);
    sessionStorage.setItem("Total", data.recordsTotal);
    var c = data.recordsTotal;
    if (c == 0) { a = c; b = c; $("#Next").addClass("disabledbutton"); $("#Prev").addClass("disabledbutton"); }
    else if (c < b && a == 1) { b = c; $("#Next").addClass("disabledbutton"); $("#Prev").addClass("disabledbutton"); }
    else if (c < b && a > 1) { b = c; $("#Next").addClass("disabledbutton"); }
    else if (a == 1) { $("#Prev").addClass("disabledbutton"); }
    else if (parseInt(a) + parseInt(d) > c) { $("#Next").addClass("disabledbutton"); $("#Prev").removeClass("disabledbutton"); }
    $("#info").text(a + "-" + b + " of " + c);
    $.each(data.data, function (index, item) {
        var m = parseInt(a) + index;
        var tr = $("<tr id='" + item.Customers_Key + "'></tr>");
        tr.html(("<td style='width:4%;'><input type='checkbox' id='" + item.Customers_Key + "' value='" + item.Customers_Key + "'/>&nbsp;&nbsp;" + m + "</td>")
          + " " + ("<td style='width:5%;'>" + item.CustCode + "</td>")
        + " " + ("<td style='width:10%;'>" + item.CustName + "</td>")
        + " " + ("<td style='width:7%;'>" + item.MobNo + "</td>")
        + " " + ("<td style='width:10%;'>" + item.TextHomeTown + "</td>")
         + " " + ("<td style='width:10%;'>" + item.TextMainBussCode + "</td>")
         + " " + ("<td style='width:8%;'>" + moment(item.AllowUpto).format("MM/DD/YYYY hh:mm") + "</td>")
        + " " + ("<td style='width:2%;'>" + item.Lan + "</td>")
        + " " + ("<td style='width:3%;'>" + item.Nodes + "</td>"));
        tblEmployee.append(tr);
    });
    if (data.recordsTotal == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $("#Next").addClass("disabledbutton");
        $("#Prev").addClass("disabledbutton");
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
    }
}

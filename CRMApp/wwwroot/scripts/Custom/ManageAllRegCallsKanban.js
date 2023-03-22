$(document).ready(function () {
    GetData();
    $("nav").find(".newTitle").remove();
    var s = "<p class='newTitle' >Manage All Register Calls Kanban</p>";
    $("nav").find(".titleName").append(s);
});

function GetData() {
    $.get('AllRegCalls', '', function (data) {
        loadData(data);
    })
}

function loadData(data) {
    var statusCount = data.StatusList.length;

    if (statusCount > 0) {
        var n = Math.ceil(12 / statusCount);
        var html = "";
        var Count = new Array();
        $.each(data.StatusList, function (index, item) {
            html += ' <div class="col-md-' + n + ' col-sm-' + n + '">'
            html += '<div class="col-md-12" style="background:#f4f5f7;border-radius:10px;">'
            html += '<h4 class="title">' + item.TextStatus + '</h4> <span id="title-' + item.Status + '"></span>'
            html += '<div class="Column" id="' + item.Status + '">'
            html += '</div> </div></div>'

            Count.push({
                id: item.Status,
                count: 0
            });
        });
        $('.drap').append(html);
        html = "";

        $.each(data.Data, function (index, item) {
            html += "<div class='panel panel-default'>"
            html += "<div class='panel-body'>"
            html += "<p style='font-size: 11px !important; line-height: 1.1;'><i class='glyphicon glyphicon-user' ></i> " + item.Firmname + "</p>"
            html += "<p style='font-size: 11px !important; line-height: 1.1;'><i class='fa fa-id-card-o'></i> " + item.P_issuesfilegst + "</p>"
            html += "<p style='font-size: 11px !important; line-height: 1.1;'><i class='glyphicon glyphicon-phone'></i> " + item.Mobileno + "</p>"
            html += "</div>"
            html += "</div>"

            var div = $("#" + item.Status);
            div.append(html);

            var objIndex = Count.findIndex(obj=> obj.id == item.Status);
            Count[objIndex].count += 1;
            var TotalRecords = $("#title-" + item.Status);
            TotalRecords.text("Total Records - " + Count[objIndex].count);

            html = "";
        });

    }
    else {
        $('.drap').append("<h4 style='text-align:center;color:red;'>Sorry! No Data </h4>");
    }

    $("#loader").hide();
}
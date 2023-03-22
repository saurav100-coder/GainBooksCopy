$(document).ready(function () {

   getAllNotifications(); 

});

function UpdateNoficationStatus(p_notification,ctrl) {
    $.post('/Notifications/UpdateNotificationStatusRead', { p_notification: p_notification }, function (data) {
        if (data == "logout") {
            window.location.href = "/Home/LogOut";
        }
        else if(data=="True") {
            $("#notifications-body #notification_card-" + p_notification).removeClass("unseen-notification");
            $("#notifications-body #notificationClick-" + p_notification).attr("onClick", "").unbind("click");
            $("#notifications_container-body #notification_card-" + p_notification).removeClass("unseen-notification");
            $("#notifications_container-body #notificationClick-" + p_notification).attr("onClick", "").unbind("click");
        }
    });
}

function getAllNotifications() {
    $("#notifications_container-body").hide();
    $('#loading').show();
    $('#loadingmessage').show();
    $.get('/Notifications/AllNotifications', {}, function (data) {
        if (data == "logout") {
            window.location.href = "/Home/LogOut";
        }
        else {
            var html = "";
            if (data.recordsTotal > 0) {
                $.each(data.data, function (index, item) {
                    if (item.NotificationStatus_Web == 0 || item.NotificationStatus_Web == 1) {
                        html += '<div class="notification_card unseen-notification" id="notification_card-' + item.P_notification + '">'
                    }
                    else {
                        html += '<div class="notification_card" id="notification_card-' + item.P_notification + '">'
                    }
                    html += '<div class="row">'
                    html += ' <div class="col-lg-1 col-md-2 col-sm-2 col-xs-3  text-center">'
                    html += ' <img src="/Images/avatar5.png" class="img-circle img-responsive">'
                    html += ' </div>'
                    html += '<div class="col-lg-8 col-md-9 col-sm-9 col-xs-9 ">'
                    html += '<strong class="text-info">' + item.NotificationSubject + '</strong>'
                    if (item.NotificationStatus_Web == 0 || item.NotificationStatus_Web == 1) {
                        html += '<div onClick="UpdateNoficationStatus(' + item.P_notification + ', this )" id="notificationClick-' + item.P_notification + '"> <a href="' + item.NotificationURL + '" target="_blank">' + item.NotificationText + '</a></div>'
                    }
                    else {
                        html += '<div> <a href="' + item.NotificationURL + '" target="_blank">' + item.NotificationText + '</a></div>'
                    }

                    html += '<small>' + item.FrmNotificationDateTime + '</small>'
                    html += '</div></div></div>'

                });
            }
            else {
                html += '<div class="notification_card">No Notifications</div>';
            }
            $("#notifications_container-body").empty();
            $("#notifications_container-body").append(html);
        }
        $('#loading').hide();
        $('#loadingmessage').hide();
        $("#notifications_container-body").show();
    });
}
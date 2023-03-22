var prevNotiCount = 0;

$(document).ready(function () {

    getNewNotificationsCountForBellIcon();

    $('#notification_Button').click(function () {
        if ($('#notifications').is(":hidden")) {
            $('#notifications').fadeToggle('fast', 'linear');

            getNotificationsForBellIcon();

            if (prevNotiCount > 0) {
                $('#notification_Counter').css({ opacity: 0 });
                $.post('/Notifications/UpdateNotificationStatusSeenForUser', {}, function (data) {
                    if (data == "logout") {
                        window.location.href = "/Home/LogOut";
                    }
                });
            }
        }
        else {
            $('#notifications').fadeToggle('fast', 'linear'); 
        }

        return false;
    });

    //$(document).click(function () {
    //    $('#notifications').hide();

    //});

    $("#CloseNotificationLayout").click(function() {
        $('#notifications').hide();
    })


});



function getNewNotificationsCountForBellIcon() {
    $.get('/Notifications/getNewNotificationsCountForBellIcon', {}, function (data) {
        if (data == "logout") {
            window.location.href = "/Home/Logout";
        }
        else {
            if (data != 0 && prevNotiCount != data) {
                    $('#notification_Counter')
                        .css({ opacity: 0 })
                        .text(data)
                        .css({ top: '-10px' })
                        .animate({ top: '5px', opacity: 1 }, 500);
                    prevNotiCount = data;
            }

            setTimeout(getNewNotificationsCountForBellIcon, 10 * 1000);

        }
    })
}


function UpdateNoficationStatusFromLayout(p_notification, ctrl) {
    $.post('/Notifications/UpdateNotificationStatusRead', { p_notification: p_notification }, function (data) {
        if (data == "logout") {
            window.location.href = "/Home/LogOut";
        }
        else if (data == "True") {
            $("#notifications-body #notification_card-" + p_notification).removeClass("unseen-notification");
            $("#notifications-body #notificationClick-" + p_notification).attr("onClick", "").unbind("click");
            $("#notifications_container-body #notification_card-" + p_notification).removeClass("unseen-notification");
            $("#notifications_container-body #notificationClick-" + p_notification).attr("onClick", "").unbind("click");

        }
    });
}


function getNotificationsForBellIcon() {
    $("#notifications-body").hide();
    $('#loading_layout').show();
    $('#loadingmessage_layout').show();
    $.get('/Notifications/getNotificationsForBellIcon', {}, function (data) {
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
                    html += ' <div class="col-lg-3 col-sm-3 col-xs-3 col-3 text-center">'
                    html += ' <img src="/Images/avatar5.png" class="img-circle img-responsive">'
                    html += ' </div>'
                    html += '<div class="col-lg-8 col-sm-8 col-xs-8 col-8">'
                    html += '<strong class="text-info">' + item.NotificationSubject + '</strong>'
                    if (item.NotificationStatus_Web == 0 || item.NotificationStatus_Web == 1) {
                        html += '<div onClick="UpdateNoficationStatusFromLayout(' + item.P_notification + ', this )" id="notificationClick-' + item.P_notification + '"> <a href="' + item.NotificationURL + '" target="_blank">' + item.NotificationText + '</a></div>'
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

            $("#notifications-body").empty();
            $("#notifications-body").append(html);
        }
        $('#loading_layout').hide();
        $('#loadingmessage_layout').hide();
        $("#notifications-body").show();
    });
}
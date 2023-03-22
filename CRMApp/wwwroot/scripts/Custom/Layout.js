//$(document).ready(function () {
//    var a = $("#type").val();
//    if (a == "Dealer") { $(".Dealers").css("display", ""); $(".Employee").css("display", "none"); }
//    if (a == "Employee") { $(".Dealers").css("display", "none"); $(".Employee").css("display", ""); }
//})

//$(document).ready(function () {
//    var a = $("#type").val();
//    var b = $("#type1").val();
//    var c = b.split(",");
//    for (i = 0; i <= c.length - 1; i++) {
//        var item = document.getElementById(c[i]);
//        if (item != null) {
//            item.style.display = 'block';
//        }
//    }
//});



$(document).ready(function () {
    var b = $("#type1").val();
    var data = JSON.parse(b);
    var html = "";
    $("ul.sidebar-menu li").remove();
    //$.each(data, function (index, item) {
    //    if (item.submenu.length>0) {
    //        html += '<li class="treeview" id="' + item.prgname + '" style="display:block;">';
    //    }
    //    else {
    //        html += '<li id="' + item.prgname + '" style="display:block;">';
    //    }
        
    //    html+= '<a href="' + item.webmenuurl + '"><i class="' + item.webicon + '"></i><span> ' + item.menulabelweb + '</span>';
    //    if (item.submenu.length>0) {
    //        html+='<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>';
    //    }
    //    html+='</a>';
    //    if (item.submenu.length > 0) {
    //        html+='<ul class="treeview-menu">';
    //        $.each(item.submenu, function (i, submenuitem) {
    //            html += '<li id="' + submenuitem.prgname + '"><a href="' + submenuitem.webmenuurl + '"><img src="/images/' + submenuitem.webicon + '" style="width: auto; margin-right:5px;" /> ' + submenuitem.menulabelweb + '</a></li>';
    //        });
    //        html += '</ul>';
    //    }
    //    html+='</li>';
    //});

    ///Using images in menu according to new UI
    $.each(data, function (index, item) {
        if (item.submenu.length > 0) {
            html += '<li class="treeview" id="' + item.prgname + '" style="display:block;">';
        }
        else {
            html += '<li id="' + item.prgname + '" style="display:block;">';
        }

        html += '<a href="' + item.webmenuurl + '">'
        if ((item.webicon).toLowerCase().indexOf(".png")!==-1) {
            html += '<img src="/images/' + item.webicon + '" class="main-sidebar-img" />'
        }
        else {
            html += '<img src="/images/' + item.webicon + '.png" class="main-sidebar-img" />'
        }
            
        html += '<span> ' + item.menulabelweb + '</span>';

        if (item.submenu.length > 0) {
            html += '<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>';
        }
        html += '</a>';
        if (item.submenu.length > 0) {
            html += '<ul class="treeview-menu">';
            $.each(item.submenu, function (i, submenuitem) {
                html += '<li id="' + submenuitem.prgname + '"><a href="' + submenuitem.webmenuurl + '" style="display: -webkit-box; white-space: normal;"><img src="/images/' + submenuitem.webicon + '" style="width: 20px; margin-right:5px; margin-top:auto;margin-bottom:auto; display:block;"/> <p style="width:90%; margin:0; margin-left:5px;">' + submenuitem.menulabelweb + '</p></a></li>';
            });
            html += '</ul>';
        }
        html += '</li>';
    });

    $("ul.sidebar-menu").append(html);




});
    
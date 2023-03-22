$(document).ready(function () {
    var b = $("#homeMenuJson").val();

    if(b!==undefined && b!=="")
    {
        var data = JSON.parse(b);
        var html = "";
        $(".cards").empty();
        ///Using images in menu according to new UI
        $.each(data, function (index, item) {
            html +='<a href="' + item.webmenuurl + '"><div class="card">'
            if ((item.webicon).toLowerCase().indexOf(".png")!==-1) {
                html += '<img src="/images/' + item.webicon + '" class="main-sidebar-img" />'
            }
            else {
                html += '<img src="/images/' + item.webicon + '.png" class="main-sidebar-img" />'
            }       
            html+='<div class="text"> <h3>' + item.menulabelweb + '</h3></div></div></a>'
        });

        $(".cards").append(html);
    }
    var h = $(".content-wrapper").css("min-height")
    $(".content").height(h);
});

//Sidebar = $(".sidebar")[0];
//var resizeObserver = new ResizeObserver(() => {
//    var sidebarposition = side.getBoundingClientRect();
//    $(".content").height(sidebarposition.height - 50)
//});

//resizeObserver.observe(Sidebar);

var Sidebar = $(".sidebar")[0];
var resizeObserver = new ResizeObserver((event) => {
    var h = $(".content-wrapper").css("min-height")
    $(".content").height(h);

});
resizeObserver.observe(Sidebar);
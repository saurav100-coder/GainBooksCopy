$(function () {
    var dt = $("#Otype").val();
    if (dt != "" || dt != null) {
        if (dt == "E") {
            $("#dealer").hide();
            $("#emp").show()
        }
        else {
            $("#emp").hide();
            $("#dealer").show();
        }
    }
});
function owner(id, s) {
    var aa = document.getElementById(id);
    var M = s;
    if (M == "D") {
        $("#dealer").show();
        $("#emp").hide();
    }
    else {
        $("#dealer").hide();
        $("#emp").show();
    }
}
$(window).scroll(function () {
    if ($(this).scrollTop() > 40) {
        $(".rr").addClass("fixed-pos");
    } else {
        $(".rr").removeClass("fixed-pos");
    }
});




function next() {
    var div = document.getElementById("collapseTwo");
    if (div.style.display !== "block") {
        div.style.display = "block";
    }
    else {
        div.style.display = "none";
    }

}

$("input[type=button]").click(function () {
    $('html,body').animate({
        scrollTop: $("#collapseTwo").offset().top
    },
        'slow');


});

$("input[type=button]").click(function () {
    $(".uu a").removeClass("active");
    $(".uu a").not("a:first").addClass("active");

});

$(document).ready(function () {
    var home = "";
    home = $("#TextHomeTown").val();
    $("#searchString").val(home);
    $(".ii").show();
    $("#TextHomeTown").hide();
    var AccountName = "";
    AccountName = $("#TextParentAccount").val();
    $("#searchAccount").val(AccountName);
    $(".jj").show();
    $("#TextParentAccount").hide();
    $(".btn-1").click(function () {
        $(this).hide();
    });
});
function ConfirmSubmit() {
    var b = $("#homeTown").val();
    var b1 = $("#Htype").val();
    var c = $("#AccountName").val();
    var c1 = $("#Ptype").val();
    if (b == 0 || b == "null" || b == "undefined" || b == "") {
        $("#homeTown").val(b1);
    }
    if (c == 0 || c == "null" || c == "undefined" || c == "") {
        $("#AccountName").val(c1);
    }
    var d = $("#AccountsForm");
    d.submit();

}

window.onscroll = function () { myFunction() };

function myFunction() {
    if (document.body.scrollTop || document.documentElement.scrollTop > 50) {
        document.getElementById("gd").className = "";


    } else {
        document.getElementById("gd").className = "active";
        document.getElementById("od").className = "";
    }


}
$(".uu a").click(function () {
    $(".active").removeClass("active");
    $(this).addClass("active");
});

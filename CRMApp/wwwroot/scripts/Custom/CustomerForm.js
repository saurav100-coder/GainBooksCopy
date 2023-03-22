

//$("#od").click(function () {

//    $('html,body').animate({
//        scrollTop: $("#oth1").offset().top - 250
//    }, 'slow');

//});
//$("#gd").click(function () {

//    $('html,body').animate({
//        scrollTop: $("#gen1").offset().top - 600
//    }, 'slow');
//});



//window.onscroll = function () { myFunction(), Function() };
//function myFunction() {
//    if (document.body.scrollTop || document.documentElement.scrollTop > 350) {
//        document.getElementById("gd").className = "";
//    } else {
//        document.getElementById("gd").className = "active";
//        document.getElementById("od").className = "";
//    }
//}
//function Function() {
//    if (document.body.scrollTop || document.documentElement.scrollTop < 350) {
//        document.getElementById("od").className = "";
//        document.getElementById("Hwd").className = "";
//    } else if (document.body.scrollTop || document.documentElement.scrollTop < 1100) {
//        document.getElementById("gd").className = "";
//        document.getElementById("od").className = "active";
//        document.getElementById("Hwd").className = "";
//    }
//    else {
//        document.getElementById("gd").className = "";
//        document.getElementById("od").className = "";
//        document.getElementById("Hwd").className = "active";
//    }
//}

//$(".uu a").click(function () {
//    $(".active").removeClass("active");
//    $(this).addClass("active");
//});

//$(window).scroll(function () {
//    if ($(this).scrollTop() > 30) {
//        $(".rr").addClass("fixed-pos");
//    } else {
//        $(".rr").removeClass("fixed-pos");
//    }
//});

//$("input[type=button]").click(function () {
//    $(".uu a").removeClass("active");
//    $(".uu a").not("a:first").addClass("active");

//});


//For accept only numbers in input box
function isNumberKey(evt) {
    evt = evt ? evt : window.event;
    var charCode = (evt.which) ? evt.which : event.keyCode; 
    if (charCode>31 && (charCode<48 || charCode>57)) {
        return false;
    }
    return true;
   
}

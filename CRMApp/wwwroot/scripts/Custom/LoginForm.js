

$(document).ready(function () {
    let h = screen.height;
    $(".main").height(h - 187)

    SetDeviceType();
    //$(".select").click(function () {
    //    $(".back-side").toggleClass("show");
    //});

    //$(".back-side ul li").click(function () {
    //   var data= $(this).attr("data-id");
    //    console.log(data);
    //    var a = $(this).parent().parent().parent().find(".main-side .text");
    //    $(a).text(data);
    //    if (data === "Individual") {
    //        $(".form-group.corporate").hide();
    //    }
    //    else {
    //        $(".form-group.corporate").show();
    //    }
    //});

   


    $("#UserType").change(function () {
        if (this.value == 'B') {
            $(".CorporateID").css("display", "block");
        }
        else  {
            $(".CorporateID").css("display", "none");
        }
    })

    $(".Submit").click(function () {
        $("#LoginForm").submit();
        $("#loadspin,#overlay").show();
    });

});



function SetDeviceType() {
    if ($(window).width() < 700) {
        $("#deviceType").val("M");
    }
    else {
        $("#deviceType").val("D");
    }
}
$(document).ready(function () {
    $('input[type=radio][name=UserType]').change(function () {
        debugger
        if (this.value == 'B') {
            $("#CorporateID").css("display", "block");
            $(".CorporateID").css("height", "52px");

        }
        else if (this.value == 'I') {
            debugger
            $("#CorporateID").css("display", "none");
            $(".CorporateID").css("height", "0");
        }
    })


    //$(window).load(function () {
        $(".col-3 input").val("");

        $(".input-effect").focusin(function () {
            debugger
            if ($(this).val() == "") {
                $(this).removeClass("has-content");
            } else {
                $(this).addClass("has-content");
            }
        })
    //});
    $("email1").val("");
    $(function () {
        $(".For").click(function () {
            var $buttonClicked = $(this);
            var options = {
                "backdrop": "static",
                keyboard: true
            };
            $('.Forgot').modal(options);
            $('.Forgot').modal('show');
        });
    });
});


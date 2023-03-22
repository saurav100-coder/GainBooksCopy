function Confirm() {
    var p = $("#NewP").val();
    var g = $("#NewP1").val();
    if ($("#NewP").val() == $("#NewP1").val() && $("#CurP").val() != "") {      
        $("#ChangePass").submit();
        $("#ChangePass").css("disabled", true);
    } else if ((p.length < 8 || p.length > 8) && (g.length < 8 || g.length > 8)) {
        $(".login-box-msg1").addClass("text-danger");
        $(".login-box-msg1").text("Password Should be of 8 max characters.");
        if ($("#NewP").val() != $("#NewP1").val()) {
            $(".login-box-msg1").addClass("text-danger");
            $(".login-box-msg1").text("New Passwords do not match. Please try again");
            $("#NewP").val("");
            $("#NewP1").val("");
        }
        $("#NewP").val("");
        $("#NewP1").val("");
    }
    else if ($("#NewP").val() != $("#NewP1").val()) {
        $(".login-box-msg1").addClass("text-danger");
        $(".login-box-msg1").text("New Passwords do not match. Please try again");
        $("#NewP").val("");
        $("#NewP1").val("");
    }
    else if ($("#CurP").val() == "") {
        $(".login-box-msg1").addClass("text-danger");
        $(".login-box-msg1").text("Please Enter Current Password");
        $("#NewP").val("");
        $("#NewP1").val("");
    }
}
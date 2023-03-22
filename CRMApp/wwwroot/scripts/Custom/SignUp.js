$(document).ready(function () {
    $('input[type=radio][name=g-CustType]').change(function () {

        var token = $("#gtoken").val();
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/Home/GoogleSignUp');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            console.log('Signed in as: ' + xhr.responseText);
        };
        xhr.send('idtoken=' + token + '&Custtype=' + this.value);

    })
})
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    //var profile = googleUser.getBasicProfile();
    //console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    //console.log('Full Name: ' + profile.getName());
    //console.log('Given Name: ' + profile.getGivenName());
    //console.log('Family Name: ' + profile.getFamilyName());
    //console.log("Image URL: " + profile.getImageUrl());
    //console.log("Email: " + profile.getEmail());


    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    $("#gtoken").val(id_token);
    var options = { "backdrop": "static", keyboard: true };
    $('#CustomerTypeModal').modal(options);
    $('#CustomerTypeModal').modal('show');


}

function FormSubmit() {
    var Mob = $("#Mobno").val();
    var usertype = $("input[type=radio][name=g-CustType]").val();
    if (Mob.Length == 10 && usertype != null && usertype != undefined && usertype != "undefined") {
        $("#SignUpForm").submit()
    } else if (Mob.Length == 10) {
        $("#MobValidation").css("display:block");
    } else {
    }
}

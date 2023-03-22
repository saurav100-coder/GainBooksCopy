$(document).ready(function () {
    $(".daily-div").hide()


});
$(document).ready(function () {

    $("#slotsno-input").keypress(function (e) {
        var charCode = (e.which) ? e.which : event.keyCode
        if (String.fromCharCode(charCode).match(/[^0-9]/g))
            return false;
    });

    $("#slotsduration-input").keypress(function (e) {
        var charCode = (e.which) ? e.which : event.keyCode
        if (String.fromCharCode(charCode).match(/[^0-9]/g))
            return false;
    });
});

function btn(box) {
    if ($(box).parents(".day").find("p").children().length == 1) {
        $(box).parents(".day").find("h4").show()
        $("p").removeClass("check")
        $(box).parents(".day").find((".coupon")).prop('checked', false);
    }
    else {
        $(box).parents(".day").find((".coupon")).prop('checked', true);
    }
    $(box).parents("tr").remove();
}


function slot(contant) {
    $(contant).parent().find("p").append('<tr><td><div style="background-color:white"><input type="time" id="slot" name="start"></div></td><td><div style="background-color:white"><input type="time" id="slot" name="end"></div></td><td><button id="btn2" onclick="btn(this)">X</button></td></tr>');
    $(contant).parent().find("h4").hide();
    $(contant).parents(".day").find(".coupon").prop('checked', true);


}

function checkd(checkbox) {
    if ($(checkbox).is(':checked')) {
        $(checkbox).parents(".day").find("h4").hide();
        $(checkbox).parents(".day").find("p").append('<tr><td><div style="background-color:white"><input type="time" id="slot" name="start"></div></td><td><div style="background-color:white"><input type="time" id="slot" name="end"></div></td><td><button id="btn2" onclick="btn(this)">X</button></td></tr>');
    }
    else {
        $(checkbox).parents(".day").find("p").children().remove();
        $(checkbox).parents(".day").find("h4").show();
    }
}



function employee() {
    var x = document.getElementById("myselect").value;
    document.getElementById("demo").innerHTML = "You selected: DR. " + x;
    $(".main-div p").each(function () { $(this).children().remove() });
    $(".main-div .coupon:checked").prop("checked", false);
    $("h4").show();
    $("#demo").show()
}

function show_week(block) {
    $(".week").hide();
    $(block).closest("div").find(".week").css("display", "block");
}


function apply(days) {
    var krg = $(days).closest("#datepicker").find("p").html();
    $('input[name ="mycheck"]:checked').each(function (index, element) {
        var appendto = ".main-div ." + this.value + " p";
        $(appendto).append(krg);
        $(".main-div ." + this.value + " h4").hide()
        $(".main-div ." + this.value + " .coupon").prop('checked', true)
        $(".main-div ." + this.value + " p").addClass("check")
    });
    $(".week").hide()
}

function modechange(ele) {
    if (ele.value == "W") {
        $(".week-days").show()
        $(".daily-div").hide()
    }
    else if (ele.value = "D") {
        $(".week-days").hide()
        $(".daily-div").show()
    }
    $("#myselect").val("")
    $("#slotsno-input").val("")
    $("#slotsduration-input").val("")
    $("#demo").hide()
}


function submit() {
    select = document.getElementById('myselect');
    if (select.value) {

        var jsonStr = '{"p_acccode":"' + $("#myselect").val() + '","mode":"' + $("#mymode").val() + '","noslots":' + $("#slotsno-input").val() + ',"slotduration":' + $("#slotsduration-input").val() + ',"info":[';
        $(".main-div input[class='coupon']:checked").each(function () {
            var parent = $(this).parents(".day");
            var parentlcass = "#" + $(parent).attr("id");
            $(parentlcass + " p tr").each(function () {
                var row = '{"weekday":"' + $(parent).attr("data-weekday") + '","starttime":"' + $(this).find("input[name='start']").val() + '","endtime":"' + $(this).find("input[name='end']").val() + '"},';
                jsonStr += row;
            });

        });
        if (jsonStr.lastIndexOf(",") > -1) {
            jsonStr = jsonStr.substring(0, jsonStr.lastIndexOf(","))
        }

        jsonStr += ']}';
        console.log(jsonStr);

        $(".main-div p").each(function () { $(this).children().remove() });
        $(".main-div .coupon:checked").prop("checked", false);
        $("h4").show();
        $("#myselect").val("")
        $("#slotsno-input").val("")
        $("#slotsduration-input").val("")
        $("#demo").hide()
    }
    else {
        alert("Please Select Doctor")
        return false;
    }

}













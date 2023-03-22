
function dd(id) {
    var c = id.split("/");
    document.getElementById("gridName").value = c[0];
    document.getElementById("grid1").value = c[1];
    if (c[1] == "Edit" || c[1] == "Delete") {
        document.getElementById("Rowid").value = c[2];
    }
    document.getElementById("dealer").submit();
    return false;
}

function ShowText(id) {
    var aa = document.getElementById(id);
    var bb = $(aa).find('option:selected').text()
    var a = "#Other" + id;
    if (bb == "Others") {
        $(a).show();
    } else {
        $(a).hide();
    }
}
$(function () {
    $('#you').change(function () {
        if ($('#you').val() == 'F') {
            $('#firmName').show();
        }
        else {
            $('#firmName').hide();
        }
    });
});
 

function changeText(id, name) {
    var d = "#Other" + name;
    var aa = document.getElementById(id);
    if (id == "-1" + name) {
        if ($(aa).is(":checked")) {
            $(d).show();
        }
        else {
            $(d).hide();
        }
    }
}


$(function () {
    $('#AddCountry').change(function () {
        $("#AddOtherState").hide();
        $("#AddOtherDistrict").hide();
        $("#AddOtherHomeTown").hide();
        var aa = $('#AddCountry').find('option:selected').text();
        if (aa == "Others") {
            $("#AddOtherCountry").show();
        } else {
            $("#AddOtherCountry").hide();
        }
        $('#AddState').empty();
        $('#AddDistrict').empty();
        $('#AddHomeTown').empty();

        $.ajax({
            type: "POST",
            url: "/Location/GetStatesByCountryId",
            datatype: "Json",
            data: { countryId: $('Select#AddCountry').val() },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $.each(data, function (index, value) {
                        $('#AddState').append('<option value="' + value.Value + '">' + value.Text + '</option>');
                    });
                }
            }
        });
    });

    $('#AddState').change(function () {
        $("#AddOtherState").hide();
        $("#AddOtherDistrict").hide();
        $("#AddOtherHomeTown").hide();
        var aa = $('#AddState').find('option:selected').text();
        if (aa == "Others") {
            $("#AddOtherState").show();
        } else {
            $("#AddOtherState").hide();
        }
        $('#AddDistrict').empty();
        $('#AddHomeTown').empty();

        $.ajax({
            type: "POST",
            url: "/Location/GetDistrict",
            datatype: "Json",
            data: { StateId: $('Select#AddState').val() },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $.each(data, function (index, value) {
                        $('#AddDistrict').append('<option value="' + value.Value + '">' + value.Text + '</option>');
                    });
                }
            }
        });
    });

    $('#AddDistrict').change(function () {
        $("#AddOtherDistrict").hide();
        $("#AddOtherHomeTown").hide();
        var aa = $('#AddDistrict').find('option:selected').text();
        if (aa == "Others") {
            $("#AddOtherDistrict").show();
        } else {
            $("#AddOtherDistrict").hide();
        }
        $('#AddHomeTown').empty();

        $.ajax({
            type: "POST",
            url: "/Location/GetHomeTown",
            datatype: "Json",

            data: { DistrictId: $('Select#AddDistrict').val() },
            success: function (data) {
                if (data.statusCode == 500) {
                    window.location.href = "/Home/Error";
                }
                else {
                    $.each(data, function (index, value) {
                        $('#AddHomeTown').append('<option value="' + value.Value + '">' + value.Text + '</option>');
                    });
                }
            }
        });
    });

    $('#AddHomeTown').change(function () {
        $("#AddOtherHomeTown").hide();
        var aa = $('#AddHomeTown').find('option:selected').text();
        if (aa == "Others") {
            $("#AddOtherHomeTown").show();
        } else {
            $("#AddOtherHomeTown").hide();
        }
    });
})
$(document).ready(function () {
    $.post('/CRM/LocationGridData', {}, function (data) {
        //$('#loading').show();
        //$('#loadingmessage').show();
        var tblEmployee = $("#htexample tbody");
        $("#htexample tbody tr").remove();
        $.each(data.data, function (index, item) {
            var m = index;
            var tr = $("<tr id='" + item.InfoTable_Key + "'></tr>");
            tr.html(("<td>" + m + "</td>")
               + " " + ("<td>" + item.TextHometown + "</td>")
            + " " + ("<td>" + item.District + "</td>")
            + " " + ("<td>" + item.State + "</td>")
            + " " + ("<td>" + item.Country + "</td>"));
            tblEmployee.append(tr);
        })
    });
    $('#htexample').on('click', 'tr', function () {
        if ($(this).hasClass('highlight')) { $(this).removeClass('highlight'); }
        else {
            $('htexample tr.highlight').removeClass('highlight');
            $(this).addClass('highlight');
            //Started by Shweta
            var c = $("#htexample tr.highlight");
            var s = document.getElementById("searchString");
            s.value = c.find("td:nth-child(2)").text();
            var m = document.getElementById("homeTown");
            m.value = c["0"].id;
            $('#search').css("display", "none");
            //Ended by Shweta
        }

        // var c = $("#example tr.highlight");
        // var s = document.getElementById("searchString");
        // s.value = c.find("td:nth-child(2)").text();              //These Lines Commented by Shweta
        // var m = document.getElementById("homeTown");
        // m.value = c["0"].id;                             
        //$('#search').css("display", "none");
    });
});
$(function () {
    $("#searchString").on('keyup ', function () {
        var searchString = $("#searchString").val().toLowerCase();
        if (searchString == "") {
            $('#search').css("display", "none");
            return;
        }
        var on = 0;
        var rows = $("#htexample tr");
        $('#search').css("display", "");
        for (var i = 1; i < rows.length; i++) {
            var fullname = rows[i].getElementsByTagName("td");
            fullname = fullname[1].innerHTML.toLowerCase();
            if (fullname) {
                if (searchString.length == 0 || (searchString.length < 3 && fullname.indexOf(searchString) == 0) || (searchString.length >= 3 && fullname.indexOf(searchString) > -1)) {
                    rows[i].style.display = "";
                    on++;
                } else { rows[i].style.display = "none"; }
            }
        }
    });
});

$(document).ready(function () {
    GetDoctorData();
});
$(document).ready(function () {
    $(".change").css("padding-left", "18px");
    $(".change").css("color", "grey");
    $(".time").hide();
    $(".confirm").hide();

    $(".date-picker").css("cursor", "pointer")
    $(".Third-div").hide();
    $(".message-box").hide();

    //$(".date-picker").click(function () {
    //    $(".date-picker").css("background-color", "white")
    //    $(this).css("background-color", "#fac72f")
    //    $(".time").show();
    //    $(".confirm").show();
    //    console.log($(this).attr("id"));


    //});

    $(".time-picker").click(function () {
        $(".time-picker").css("background-color", "#dadada")
        $(this).css("background-color", "#51b651")

    });
})



function confirmation() {
    var isSomethingTrue = true;
    if (isSomethingTrue && ($(window).width() <= 768)) {
        $(".Third-div").show();
        $(".First-div").hide();
        $(".Second-div").hide();

    }
    else {
        $(".Third-div").show();

    }
}
function submission() {
    $(".message-box").show();
}
function done() {
    $(".message-box").hide();
}







function generate_year_range(start, end) {
    var years = "";
    for (var year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
}

today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");


createYear = generate_year_range(currentYear, 2050);
/** or
 * createYear = generate_year_range( 1970, currentYear );
 */

document.getElementById("year").innerHTML = createYear;

var calendar = document.getElementById("calendar");
var lang = calendar.getAttribute('data-lang');

var months = "";
var days = "";

var monthDefault = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var dayDefault = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

if (lang == "en") {
    months = monthDefault;
    days = dayDefault;
} else if (lang == "id") {
    months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    days = ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
} else if (lang == "fr") {
    months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
} else {
    months = monthDefault;
    days = dayDefault;
}


var $dataHead = "<tr>";
for (dhead in days) {
    $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";

//alert($dataHead);
document.getElementById("thead-month").innerHTML = $dataHead;


monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);



function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    var firstDay = ( new Date( year, month ) ).getDay();

    tbl = document.getElementById("calendar-body");

    
    tbl.innerHTML = "";

    
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    var date = 1;
    for ( var i = 0; i < 6; i++ ) {
        
        var row = document.createElement("tr");

        
        for ( var j = 0; j < 7; j++ ) {
            if ( i === 0 && j < firstDay ) {
                cell = document.createElement( "td" );
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.id = year.toString() + '-' + padLeft((month + 1).toString()) + '-' + padLeft(date.toString());
                //cell.id = padLeft(date.toString()+'/'+ padLeft((month + 1).toString())+'/'+ year.toString());
                //cell.id = year.toString() + '/' + padLeft((month + 1).toString()) + '/' + padLeft(date.toString());
                cell.addEventListener("click", function () { showTimeSlot(this) });
                cell.innerHTML = "<span>" + date + "</span>";

                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cell.className = "date-picker selected";
                }
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row);
    }

}

function padLeft(value) {
    if (value.trim().length==1) {
      value= "0"+(value.trim());
    }
    return value;
}

function padRight() {
}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}


function showTimeSlot(ctrl) {
    $(".date-picker").css("background-color", "white")
    $(ctrl).css("background-color", "#fac72f")
    //ajax call here
    var acccode = document.getElementById("pacccode").innerHTML;
    GetSlots(acccode, ctrl.id);
    
}

function GetDoctorData() {
    var encStr = $("#encStr").val();
    $("#container").hide();
    $('#loading').show();
    $('#loadingmessage').show();
    var acccode = document.getElementById("pacccode").innerHTML;
    $.post('/publicurl/GetDoctorData', { DoctorId: acccode }, function (data1) {
        if (data1 == "err") {
            $('#loading').show();
            $('#loadingmessage').hide();
            $("#Msg").show();
            $("#Msg").text("Error in loading data");
            $('#loading').addClass('clickable');
        }
        else {
            var data = JSON.parse(data1);
            LoadDoctorData(data);
        }

    });
}


function LoadDoctorData(data) {
    //Remove all content 
    //ClearFields();
  
    //Set Values of fields
    $.each(data, function (index, item) {
        $("#name").text(item.accname);
        $("#Add").text(item.Add1);
        $("#ContactNo").text(item.mobile);

    })

    if (data.length == 0) {
        $('#loading').show();
        $('#loadingmessage').hide();
        $("#Msg").show();
        $("#Msg").text("No record found");
        $('#loading').addClass('clickable');
    } else {
        $('#loading').hide();
        $('#loadingmessage').hide();
        $('#Msg').hide();
        $("#container").show();
    }
}

function GetSlots(DoctorId,AppointDate) {
    var encStr = $("#encStr").val();
    $("#container").hide();
    $('#loading').show();
    $('#loadingmessage').show();
    $.post('/publicurl/GetSlots', { DoctorId: DoctorId }, function (data1) {
        if (data1 == "err") {
            $('#loading').show();
            $('#loadingmessage').hide();
            $("#Msg").show();
            $("#Msg").text("Error in loading data");
            $('#loading').addClass('clickable');
        }
        else {
            var slotDuration = JSON.parse(data1)[0].slotduration;
            //alert(slotDuration);
            if (slotDuration > 0) {
                $.post('/publicurl/GetSchedule', { DoctorId: DoctorId, AppointmentDate: AppointDate, slotDuration: slotDuration }, function (data1) {
                    if (data1 == "err") {
                        $('#loading').show();
                        $('#loadingmessage').hide();
                        $("#Msg").show();
                        $("#Msg").text("Error in loading data");
                        $('#loading').addClass('clickable');
                    }
                    else {
                        var tmpdata = JSON.parse(data1);
                        $('#loading').show();
                        if (tmpdata.length > 0) {
                            var divTime = $("#divTime");
                        for (var i = 0; i < tmpdata.length; i++) {
                                var tmpid = "div" + tmpdata[i]["StartTime"].replace(":","");
                                var div1 = $('<div class="time-picker" id="'+tmpid+'">'+tmpdata[i]['StartTime']+'</div>');
                                console.log(tmpdata[i]['StartTime']);
                                //div1.addEventListener("click", function () { showTimeSlot(this) });
                                divTime.append(div1);
                            }

                            document.getElementById("hSlots").innerHTML = "(" + tmpdata.length + " slots available)";
                        }
    $(".time").show();
    $(".confirm").show();
                        console.log(DoctorId);
                    }
                });
            }
            
            //$('#loading').hide();
            //$('#loadingmessage').hide();
            //$('#Msg').hide();
            //$("#container").show();
            //var data = JSON.parse(data1);
            //return a;
        }

    });
}


function CustSave(ctrlValue) {
    
}

function submission() {
    debugger;
    var CustName = $("#CustName").val();
    var CustGender = $("#CustGender").val();
    var CustDob = $("#CustDob").val();
    
    var EmailTrim = $("#CustEmail").val();
    var MobileTrim = $("#CustPhoneNo").val();
    
    if (MobileTrim == "" || CustName == "" || CustGender == "" || CustDob == "" || EmailTrim == "" || CustGender == "none" || EmailTrim == "undefined" || MobileTrim == "undefined") {
        $("#Msg").text('All Fields are mendatory');
    } else {
        $(".btn-Submit").attr("disabled", true);
        var d = $("#CustomerForm");
        $("#CustomerForm").attr('action', '/publicurl/SavePatient');
        var custcode = $("#CustCode").val();
        d.submit();
    }
}
function done() {
    $(".message-box").hide();
}
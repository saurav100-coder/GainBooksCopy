  $(function () {
      $("#searchAccount").on('keyup ', function () {
      
          var searchString = $("#searchAccount").val().toLowerCase();
          if (searchString.length>2){            
              $.post('/CRM/AccountGridData', { accountname :searchString}, function (data) {
                  var tblEmployee = $("#Accounts");
                  $("#Accounts tbody tr").remove();
                  $.each(data.data, function (index, item) {
                      var m = index;
                      var tr = $("<tr id='" + item.P_CRMAccounts + "'></tr>");
                      tr.html(("<td>" + m + "</td>")
                         + " " + ("<td>" + item.AccountName + "</td>")
                          + " " + ("<td>" + item.TextHometown + "</td>")
                      + " " + ("<td>" + item.District + "</td>")
                      + " " + ("<td>" + item.State + "</td>")
                      + " " + ("<td>" + item.Country + "</td>"));
                      tblEmployee.append(tr);
                  })
              })
              $('#searchA').css("display", "");
              }
          });
          //    var searchString = $("#searchAccount").val().toLowerCase();
          //    if (searchString == "") {
          //        $('#searchA').css("display", "none");
          //        return;
          //    }
          //    var on = 0;
          //    var rows = document.getElementsByTagName("tr");                     
          //    $('#searchA').css("display", "");
          //    $("#Accounts tbody tr td:nth-child(2)").each(function (i, element) {
          //        var content = $(element).text().toLowerCase();
          //        if (content.indexOf(searchString) != -1) {$(element).parent().css("display", "");}
          //        else {$(element).parent().css("display", "none");}
          //   });
       // });
      });
    $(function (){
        var tr = $('#Accounts').find('tbody tr');
        tr.bind('click', function (event)
        {
            $("tr").click(function () {
                var resultArray = $(this).closest('tr').find('td:nth-child(1)').text();
                var s = document.getElementById("searchAccount");
                s.value = resultArray;
                $('#searchA').css("display", "none");
            });
        });            
    });
    $(document).ready(function () {  
      
        $('#Accounts').on('click', 'tr', function () {
            if ($(this).hasClass('highlight')) {$(this).removeClass('highlight');}
            else {
            $('Accounts tr.highlight').removeClass('highlight');
                $(this).addClass('highlight');
            }
            var c = $("#Accounts tr.highlight"); 
            var s = document.getElementById("searchAccount");
            s.value = c.find("td:nth-child(2)").text();
            var m = document.getElementById("AccountName");
            m.value = c["0"].id;
            var s = document.getElementById("AccountCode");
            s.value = c["0"].id;
            $('#searchA').css("display", "none");        
        });
    });
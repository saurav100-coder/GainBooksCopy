  $(document).ready(function () {
        $(".btn-Submit").click(function () {
            $(".btn-Submit").attr("disabled", true)
            $("#RegForm").submit();
        });
    });
  function myFunction(value, id) {
      var msg = "";
      if (value == "1") {
          msg = "Dear Sir, We have been trying to call you regarding your call registered at Saral, but could not connect. Request you to contact at 9414184250 to discuss your issue. Thanks for your association with Saral. Have a great day! Regards Team Saral";
      }
      else if (value == "2") {
          msg = "Dear Sir, Our head office is closed today due to <reason>. Apologies for the inconvenience. Regards Saral Team";
      }
      else if (value == "3") {
          msg = "Dear Sir, Your call has been forwarded to our servicing dealer in your area. You can contact him on <email>, <phone> for your issue resolution.Regards Saral Team.";
      }
      else if (value == "4") {
          //msg = " Saral softech pvt ltd. A/c no.: 30450926206, Ifsc code: SBIN0011311, State bank of india branch:Mahaveer nagar kota, Regstration 1100/-, GST updation 2000/- one time depo.";
          msg = " Saral softech pvt ltd. \n A/c no.: 30450926206, Ifsc code: SBIN0011311, State bank of India, branch:Mahaveer nagar kota";
      }
      else if (value == "5") {
          //msg = "TECNOPINCH SOLUTIONS PVT LTD. \n A/c no.: 018405500839, IFSC: ICIC0000184, ICICI BANK branch:Jhalawar road kota, Regstration 1100rs+GST(18%), GST updation 2000rs+GST(18%)";
          msg = "TECNOPINCH SOLUTIONS PVT LTD. \n A/c no.: 018405500839, IFSC: ICIC0000184, ICICI BANK, branch:Jhalawar road kota";
      }
      else if (value == "6") {         
          msg = "Saral liaisoning and maintenance services \n A/c no.: 20743746125, IFSC: Alla0210364, Allahabad Bank, branch:Jhalawar road kota";
      }
      else if (value == "7") {         
          msg = "Saral Softech Pvt.ltd. \n A/c no.: 018405001003, IFSC: ICIC0000184, ICICI BANK, branch:Jhalawar road kota";
      }
         document.getElementById("T").value = msg;
    }

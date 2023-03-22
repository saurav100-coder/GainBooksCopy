$(document).ready(function () {
    $("#sqlResult").hide();
    $("#errormsg").hide();

    $("#btnRunQuery").click(function () {
        var sqlstr = $("#sqlQuery").val().trim();
        var dbName = $("#dbName").val().trim();
        if (sqlstr==="") {
            $("#errormsg").text("*Please Write Sql Query.");
            $("#errormsg").show();
            $("#sqlResult").hide();
        }
        else {
            $.ajax({
                type: "post",
                url: "/custom/RunSqlQuery",
                data: { sqlQuery: sqlstr, dbname: dbName },
                success: function (data) {
                    if (data.statusCode == 500) {
                        window.location.href = "/Home/Error";
                    }
                   
                    if (data != "Error") {
                        var parseJson = JSON.parse(data);
                        var result = JSON.stringify(parseJson, undefined, 4)
                        $("#errormsg").hide();
                        $("#sqlResult").val(result);
                        $("#sqlResult").show();
                    }
                    else {
                        if (data == "Please login") {
                            $("#sqlResult").hide();
                            $("#errormsg").text("Please login with your credentials to run the query");
                            $("#errormsg").show();

                        } else {
                            $("#sqlResult").hide();
                            $("#errormsg").text("*Something Went Wrong.Please check Sql Query and Database Name.");
                            $("#errormsg").show();
                        }
                    }
                }

            });
        }
        
    });
});
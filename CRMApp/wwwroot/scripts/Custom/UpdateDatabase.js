var options = { "backdrop": "static", keyboard: true };


function showUpdateDbCtrl() {
    $("#updateDbModel").modal(options);
    $("#updateDbModel").modal("show");
}

function UpdateDatabse() {
    $("#updateDbModel").modal("hide");
    $("#loadspin,#overlay").show();
    var destserverdb = $("#destserverdb").val();
    var wineyesnos = $("#wineyesno").is(":checked") ? "Y" : "N";

    var rewritemasters = $("#rewritemaster").is(":checked") ? "Y" : "N";
    console.log("wineyesno" +wineyesnos);
    console.log("rewritemasters " + rewritemasters);
    $.post('/DevUtility/callUpdatefunction', { CorpId: destserverdb, rewritemasters: rewritemasters, winebus: wineyesnos }, function (data) {
        $("#loadspin,#overlay").hide();
        if (data !== "") {
            window.location.href = "/DevUtility/downloadUpdateDbLogFile?filename=" + data;
        }
        else {
            window.location.href = "/Home/LogOut";
        }
    });
}


function showCreateFolderCtrl() {
    var foldername = $("#foldername").val();
    if ($.trim(foldername)=="") {
        showmsg("Please enter folder name!");
        return false;
    }
    $("#CreateFolderModel").modal(options);
    $("#CreateFolderModel").modal("show");
}


function CreateFolder() {
    $("#CreateFolderModel").modal("hide");
    $("#loadspin,#overlay").show();
    var foldername = $("#foldername").val();
    $.post('/DevUtility/CreateFoldersOnServer', { foldername: foldername }, function (data) {
        $("#loadspin,#overlay").hide();
        if (data !== "") {
            $("#foldername").val("")
            showmsg("Folders created successfully.")
        }
        else {
            window.location.href = "/Home/LogOut";
        }
    });
}

function showmsg(msg) {
    $("#InfoModel .msg").text(msg);
    $("#InfoModel").modal(options);
    $("#InfoModel").modal("show");

}



function showRunQueryCtrl() {
    var query = $("#sqlQuery").val();
    if ($.trim(query)=="") {
        showmsg("Please enter sql query.")
        return false;
    }
    $("#runQueryModel").modal(options);
    $("#runQueryModel").modal("show");
}

function RunSqlQuery() {
    $("#runQueryModel").modal("hide");
    $("#loadspin,#overlay").show();
    var query = $("#sqlQuery").val();
    var dbname = $("#userdb").val();
    var winebusiness = $("#wineBusiness").is(":checked") ? "Y" : "N";
    $.post('/DevUtility/RunSqlQuery', { sqlQuery: query, CorpId: dbname, winebus: winebusiness }, function (data) {
        $("#loadspin,#overlay").hide();
        if (data !== "") {
            window.location.href = "/DevUtility/downloadUpdateDbLogFile?filename=" + data;
            $("#sqlQuery").val("");
            $("#userdb").val("");
            $("#wineBusiness").attr("checked", false);
        }
        else {
            showmsg("*Something Went Wrong.Please check Sql Query and Database Name.");
        }
    });
}

function showDeleteDatabaseCtrl() {
    $("#deleteDbModel").modal(options);
    $("#deleteDbModel").modal("show");
}

function DeleteDatabase() {
    $("#deleteDbModel").modal("hide");
    var Corpids = $("#uDb").val();
    if ($.trim(Corpids) != "") {
        $("#loadspin,#overlay").show();
        $.post('/DevUtility/RemoveDatabase', { CorpId: Corpids }, function (data) {
            $("#loadspin,#overlay").hide();
            if (data !== "") {
                window.location.href = "/DevUtility/downloadUpdateDbLogFile?filename=" + data;
            }
            else {
                showmsg("*Something Went Wrong.Please try again later.");
            }
        });
    }
    else {
        showmsg("Please enter Database Name.");
    }
   
}


function showClearWineDatabaseCtrl() {
    $("#clearWineDatabaseModel").modal(options);
    $("#clearWineDatabaseModel").modal("show");
}

function ClearWineDatabase() {
    $("#clearWineDatabaseModel").modal("hide");
    $("#loadspin,#overlay").show();
    $.post('/DevUtility/ClearWineDatabase', function (data) {
        $("#loadspin,#overlay").hide();
        if (data !== "") {
            window.location.href = "/DevUtility/downloadUpdateDbLogFile?filename=" + data;
        }
        else {
            showmsg("*Something Went Wrong.Please try again later.");
        }
    });
    
   

}
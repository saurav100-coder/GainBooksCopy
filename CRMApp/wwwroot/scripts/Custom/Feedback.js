

$(document).ready(function () {
    $("input[name='feedbckpoints']").on("change", function () {
        $("#btnSubmit").attr("disabled", false);
    })
});

function SubmitFeedback() {
    var feedbckpoints = $("input[name='feedbckpoints']:checked").val();
    var feedbckremrks = $.trim($("#feedbckremrks").val());
    var encStr = $.trim($("#encStr").val()); 

    $.post('/PublicUrl/AjaxSubmitFeedback', { encStr: encStr, feedbckpoints: feedbckpoints, feedbckremrks: feedbckremrks }, function (data) {
      if (data == "true") {
          $("#mainDiv").hide();
          $("#thanksDiv").show();

        }
        else {
            alert("An error occured while storing your Information .Please try again later.");
        }
    })
}
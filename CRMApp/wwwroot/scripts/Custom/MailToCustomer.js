
    $(document).ready(function () {
        $(".btn-Submit").click(function () {
            $(".btn-Submit").attr("disabled", true)
            $("#RegForm").submit();
        });
    });

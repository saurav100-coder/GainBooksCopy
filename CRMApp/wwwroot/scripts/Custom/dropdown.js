
//    let tbody = document.getElementById("lii")
//    let bodydata = "";
//    bodydata =`<li class="item"> <span class="checkbox"> <i class="fa-solid fa-check check-icon"></i></span><span class="item-text">HTML & CSS</span></li>`
//    tbody.innerHTML = bodydata;


$(document).ready(function(){

    //$(document).on("click",".item",function () {
    //  $(this).toggleClass("checked")
    //});

    $(document).on("click", ".item-text", function () {
        var item = $(this).parent();
        item.toggleClass("checked");
        var checkBoxes = $(this).parent().find(".check")
        checkBoxes.prop("checked", !checkBoxes.prop("checked"));
        checkBoxes.toggleClass("box-checked");

        //if ($("#basicFilterTable").length>0) {
        //    mySelect(this);
        //}
        if ($(this).parents("#basicFilterTable").length>0) {
            mySelect(this);
        }
    });

    //$(document).on("click", ".checkbox", function () {
    //    var item = $(this).parent();
    //    item.toggleClass("checked")
    //    var Boxes = $(this).parent().find(".check")
    //    Boxes.prop("checked", !Boxes.prop("checked"));
    //    Boxes.toggleClass("box-checked");
    //});

    $(document).on("change", ".check", function () {
        var item = $(this).parent().parent();
        item.toggleClass("checked")
        var checkB = $(this).parent().find(".check")
        //checkB.prop("checked", !checkB.prop("checked"));
        checkB.toggleClass("box-checked");

        //if ($("#basicFilterTable").length > 0) {
        //    mySelect(this);
        //}

        if ($(this).parents("#basicFilterTable").length > 0) {
            mySelect(this);
        }
    });

    

    //$(document).on("click",".select-checkbox",function () {
    //    if (this.checked) {
    //        $('.check').prop('checked', true);
    //        $(".check").addClass("box-checked")
    //        $(".item").addClass("checked")
    //    }
    //    else {
    //        $('.check').prop('checked', false);
    //        $(".check").removeClass("box-checked")
    //        $(".item").removeClass("checked")
    //    }
    //})
})

    





function cancel(id,title,destination) {
    if(destination===undefined)
    {
        destination ="";
    }
    $(destination +" #wrapper-"+id +" .check").prop("checked", false).removeClass("box-checked");
    $(destination +" .select-"+id +" .select-checkbox").prop("checked", false);
    $(destination +" #wrapper-"+id +" .item").removeClass("checked")
    $(destination +" .select-"+id + " .btn-text").text(title);
    $(destination + " .select-" + id).removeClass("open")
    $(destination + " .select-" + id).addClass("toggle-select")
    $(destination + " #" + id).val("");
    if (id === "ddlmultiTags") {
        $("#MultiTagsAddModal").hide();
      
    }
}

function apply(id,destination) {
    if(destination===undefined)
    {
        destination ="";
    }
    var value = $(destination +" #wrapper-"+id+ " .box-checked").parents(".item").find(".item-text").map(function () { return $(this).attr("data-value"); }).get().join(",");
    $(destination+" #"+id).val(value);
    let checked  = $(destination+" #wrapper-"+id).find(".checked");
    let oldTitle =$(destination +" .select-"+id +" .btn-text").attr("data-title");
    if (checked && checked.length > 0){
         $(destination+" .select-"+id +" .btn-text").text(checked.length + " Selected");
    }
    else {
        $(destination + " .select-" + id + " .btn-text").text(oldTitle);
    }


    $(destination + " .select-" + id).removeClass("open")
    $(destination + " .select-" + id).addClass("toggle-select")
  
    if (id === "ddlmultiTags") {
        $("#MultiTagsAddModal").hide();
        AddMultipleTagsOnTasks()
    }

}

function filterFunction(id,destination) {
    var filter, a, i;
    if(destination===undefined)
    {
        destination ="";
    }
    filter = $(destination+  " .select-"+id + " input[id='myInput']").val().toUpperCase();
    a = $(destination+ " #wrapper-"+id +" .item");
    for (i = 0; i < a.length; i++) {
        txtValue =$(a[i]).text();
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            $(a[i]).show();
        } else {
             $(a[i]).hide()
        }
    }
}

function toggleDropdown(id,destination){
    //if(destination===undefined)
    //{
    //    destination ="";
    //}
    //$(destination + " .select-" + id).toggleClass('open');

    if (destination === undefined) {
        destination = "";
    }
    //$(destination + " .select-" + id +".toggle-select").toggleClass('open');
    $(destination + " .select-" + id + ".toggle-select").toggleClass('open')
    $(destination + " .select-" + id + ".toggle-select.open").removeClass("toggle-select")

}

function Dropdown(id, destination) {
    if (destination === undefined) {
        destination = "";
    }
    $(destination + " .select-" + id).addClass("toggle-select")
    //$(arrow).parent().addClass("toggle-select")
    console.log(id)
}


function toggleMultiCheckbox(ctrl, id, destination) {
    if (destination === undefined) {
        destination = "";
    }

    if ($(ctrl).is(":checked")) {
        $(destination + " #wrapper-" + id + " .check").prop('checked', true).addClass("box-checked");
        $(destination + " #wrapper-" + id + " .item").prop('checked', true).addClass("checked");
    }
    else {
        $(destination + " #wrapper-" + id + " .check").prop('checked', false).removeClass("box-checked");
        $(destination + " #wrapper-" + id + " .item").prop('checked', false).removeClass("checked");
    }

    if ($("#basicFilterTable").length > 0) {
        mySelect(ctrl);
    }
}


function SetValue(value, id, destination){
    if(destination===undefined)
    {
        destination ="";
    }
    if(Array.isArray(value)){
       for(let i=0; i<value.length;i++){
        var itemText = $(destination +" #wrapper-"+id + " .item#"+value[i] + " .item-text");
        if(itemText !== undefined){
            var item = $(itemText).parent();
            item.addClass("checked");
            var checkBoxes = $(item).find(".check")
            checkBoxes.prop("checked", true);
            checkBoxes.addClass("box-checked");
         }
       }
    }
    else{
        var itemText = $(destination +" #wrapper-"+id + " .item#"+value + " .item-text");
        if(itemText !== undefined){
            var item = $(itemText).parent();
            item.addClass("checked");
            var checkBoxes = $(item).find(".check")
            checkBoxes.prop("checked", true);
            checkBoxes.addClass("box-checked");
        }
    }

    apply(id,destination);
}


function DeselectAll(id, destination){
    if (destination === undefined) {
        destination = "";
    }

    $(destination + " #wrapper-" + id + " .item").removeClass("checked");
    $(destination + " #wrapper-" + id + " .item .check").prop("checked", false).removeClass("box-checked");
    $(destination + " .select-" + id + " .select-checkbox").prop("checked", false);
    $(destination + " #" + id).val("");
    apply(id, destination);
}




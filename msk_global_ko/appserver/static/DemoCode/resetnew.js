require(
    [
        'jquery',
        'splunkjs/mvc',
        'splunkjs/mvc/simplexml/ready!'
    ], 
    function(){
        var tokens=mvc.Components.get("default");
        $('#buttonId').on("click", function(e){
            tokens.set("form.name", " ");
            tokens.set("form.cmt", " ");
            tokens.set("form.rts", " ");
        });
    }
);
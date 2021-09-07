$( function() {
    $( "#dialog" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });
 
    $( "#opener" ).on( "click", function() {
      $("#dialog").html("<H3>This is a test</H3>")
      $( "#dialog" ).dialog( "open" );
    });
  } );
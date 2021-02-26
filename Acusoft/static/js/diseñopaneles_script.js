$("#orificiosPerforado").hide();
$("#dimensionesPerforado").hide();
$("#dimensionesDiafragmatico").hide();
$("#margenesPerforado").hide();


function renderDatosPerforado(){
    $("#orificiosPerforado").show();
    $("#dimensionesPerforado").show();
    $("#margenesPerforado").show();
}

function renderDatosDiafragmatico(){
    $("#dimensionesDiafragmatico").show();
}
var tipoPanel;

$("#Boton-perforado").click(function(){
    tipoPanel = "Perforado"
    console.log("Perforado")
    $("#dialogoverlay").hide();
    $("#dialogbox").hide();
    renderDatosPerforado();

})
$("#Boton-diafragmatico").click(function(){
    tipoPanel = "Diafragmatico"
    console.log("Diafragmático")
    $("#dialogoverlay").hide();
    $("#dialogbox").hide();+
    renderDatosDiafragmatico();
})


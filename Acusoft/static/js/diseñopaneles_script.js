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
    $("#dialogoverlay").hide();
    $("#dialogbox").hide();
    renderDatosPerforado();
    tipoPanel = "Perforado"

})

$("#Boton-diafragmatico").click(function(){
    $("#dialogoverlay").hide();
    $("#dialogbox").hide();
    renderDatosDiafragmatico();
    tipoPanel = "Diafragmático"
})

// § Submit

// General

$("#frecuencia").on('change',function(){
    $("#disenopaneles_form").submit();
})
$("#factorQ").on('change',function(){
    $("#disenopaneles_form").submit();
})

// Perforado
$("#b_perforado").on('change',function(){
    $("#disenopaneles_form").submit();
})
$("#h_perforado").on('change',function(){
    $("#disenopaneles_form").submit();
})
$("#g_perforado").on('change',function(){
    $("#disenopaneles_form").submit();
})
$("#d_perforado").on('change',function(){
    $("#disenopaneles_form").submit();
})
$("#per_perforado").on('change',function(){
    $("#disenopaneles_form").submit();
})
// Diafragmatico
$("#m_diafragmatico").on('change',function(){
    $("#disenopaneles_form").submit();
    habilitarPersonalizado();
})
$("#b_diafragmatico").on('change',function(){
    $("#disenopaneles_form").submit();
})
$("#h_diafragmatico").on('change',function(){
    $("#disenopaneles_form").submit();
})
$("#ro_diafragmatico").on('change',function(){
    $("#disenopaneles_form").submit();
})

const m_diafragmatico = document.getElementById('m_diafragmatico');
function habilitarPersonalizado(){
    if (m_diafragmatico.value != "Personalizado"){
        console.log("hola")
        $("#ro_diafragmatico").prop("disabled", true );
    }else{
        $("#ro_diafragmatico").prop("disabled", false );
    }
}

// Ajax

$(document).ready(function(){
    $("#disenopaneles_form").submit(function(e){
            e.preventDefault();
            $.ajax({
                    url: $(this).attr('action'),
                    type: $(this).attr('method'),
                    data: {
                        'tipo':tipoPanel,
                        'f':$('#frecuencia').val(),
                        'q':$('#factorQ').val(),

                        'db': $('#b_diafragmatico').val(),
                        'dh': $('#h_diafragmatico').val(),
                        'dm': $('#m_diafragmatico').val(),

                        'pb': $('#b_perforado').val(),
                        'ph': $('#h_perforado').val(),    
                        'pg': $('#g_perforado').val(),
                        'pd': $('#d_perforado').val(),
                        'pp': $('#per_perforado').val(),

                    },

                    success: function(datos){

                        console.log("success");
                        console.log(datos);

                        $("#totalOrificios").html(datos.pn);
                        $("#bOrificios").html(datos.pnb);
                        $("#hOrificios").html(datos.pnh);
                        $("#separacionOrificios").html(datos.ps + 'cm');

                        $("#margenh_perforado").html(datos.borde_altura + 'cm');
                        $("#margenb_perforado").html(datos.borde_base + 'cm');

                        $("#e_perforado").html(datos.pe + 'cm');

                        $("#ro_diafragmatico").val(datos.dd);
                        $("#e_diafragmatico").html(datos.de);
                        
                        $("#bw").html(datos.bw + ' Hz');
                        $("#fh").html(datos.fh + ' Hz');
                        $("#fl").html(datos.fl + ' Hz');
                        $("#RT60").html(datos.RT60 + ' s');

                        console.log($("#m_diafragmatico option:selected"))
                    },
                    error: function(){
                            console.log("error");
                            console.log($("#m_diafragmatico option:selected").val())
                    }      
            })
    })
})


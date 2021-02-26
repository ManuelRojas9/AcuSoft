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

$("#frecuencia").on('change',function(){
    $("#disenopaneles_form").submit();
})

$("#frecuencia").on('change',function(){
    $("#disenopaneles_form").submit();
})
$("#factorQ").on('change',function(){
    $("#disenopaneles_form").submit();
})
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

                        'db': $('#db').val(),
                        'dh': $('#dh').val(),
                        'dm': $('#dm').val(),

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
                        
                        $("#bw").html(datos.bw + ' Hz');
                        $("#fh").html(datos.fh + ' Hz');
                        $("#fl").html(datos.fl + ' Hz');
                        $("#RT60").html(datos.RT60 + ' s');
                    },
                    error: function(){
                            console.log("error");
                    }      
            })
    })
})


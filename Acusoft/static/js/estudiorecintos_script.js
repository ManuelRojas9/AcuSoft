// I. Datos de entrada

const x = document.getElementById("x");
const y = document.getElementById("y");
const z = document.getElementById("z");
const RT60_ideal = document.getElementById("RT60_ideal");
const Tipo_CuartoRT60 = document.getElementById("Tipo_Cuarto");

// § Cálculos

// Calculo de área y volumen
function calcularAreaVolumen(){
    a = 2*(x.value*y.value+x.value*z.value+y.value*z.value);
    v = x.value*y.value*z.value;
    $("#v").html(v.toFixed(2));
    $("#a").html(a.toFixed(2));
}

// Cálculo RT60 ideal
function calcularRT60ideal(){
    function formulaRT60ideal(a,b){
        tiempo = (a+(b*Math.log10(v)))
        return tiempo
    }
    if (Tipo_CuartoRT60.value == "Voz"){
        $('#RT60_ideal').val(formulaRT60ideal(-0.343,0.305).toFixed(3));
        $('#RT60_ideal').prop("disabled", true );
    }
    if (Tipo_CuartoRT60.value == "Jazz"){
        $('#RT60_ideal').val(formulaRT60ideal(-0.236,0.319).toFixed(3));
        $('#RT60_ideal').prop("disabled", true );
    }

    if (Tipo_CuartoRT60.value == "Orquesta"){
        $('#RT60_ideal').val(formulaRT60ideal(0.1034,0.332).toFixed(3));
        $('#RT60_ideal').prop("disabled", true );
    }

    if (Tipo_CuartoRT60.value == "Religiosa"){
        $('#RT60_ideal').val(formulaRT60ideal(0.4878,0.314).toFixed(3));
        $('#RT60_ideal').prop("disabled", true );
    }

    if (Tipo_CuartoRT60.value == "Personalizado"){
        $('#RT60_ideal').prop("disabled", false );
    }
}

// Cálculo proporciones de recinto
function calcularProporciones(){
    if (x.value == 0 || y.value == 0 || z.value == 0){
        propociones.innerHTML = "";
    }
    else {
        proporcion_x = x.value/Math.min(x.value,y.value,z.value);;
        proporcion_y = y.value/Math.min(x.value,y.value,z.value);;
        proporcion_z = z.value/Math.min(x.value,y.value,z.value);;
        $("#proporciones").html(proporcion_x.toFixed(2) + ":" + proporcion_y.toFixed(2) + ":" + proporcion_z.toFixed(2));
    }       
}

// Cálculo de regiones de comportamiento
function calcularRegiones(){
    if (x.value == 0 || y.value == 0 || z.value == 0 || RT60_ideal.value == 0){
        $("#RA1").html("");
        $("#RA2").html("");

        $("#RB1").html("");
        $("#RB2").html("");

        $("#RC1").html("");
        $("#RC2").html("");
        
        $("#RD1").html("");
        $("#RD2").html("");
    }
    else{
        var f1 = 343/(2*(Math.max(x.value,y.value,z.value)));
        var f2 = 1893*Math.pow(($('#RT60_ideal').val()/v),0.5);
        var f3 = f2*4;
        var fs = 2000*Math.pow(($('#RT60_ideal').val()/v),0.5);

        $("#RA1").html("20");
        $("#RA2").html(f1.toFixed(0));

        $("#RB1").html(f1.toFixed(0));
        $("#RB2").html(f2.toFixed(0));

        $("#RC1").html(f2.toFixed(0));
        $("#RC2").html(f3.toFixed(0));
        
        $("#RD1").html(f3.toFixed(0));
        $("#RD2").html("20,000");

        $("#freq_S").html(fs.toFixed(0) + " Hz")
    }
}

// Cálculo de ancho de banda modal
function calcularAnchoBanda(){
    if (x.value == 0 || y.value == 0 || z.value == 0 || RT60_ideal.value == 0){
        $("#bw").html("");
    }
    else{
        $("#bw").html((2.2/$('#RT60_ideal').val()).toFixed(2) + " Hz");
    }  
}

// § Submit si hay cambio

function CalcularTodo(){
        calcularAreaVolumen();
        calcularProporciones();
        calcularRT60ideal();
        calcularRegiones();
        calcularAnchoBanda();
}

$("#x").change(function() {
    if (x.value != 0 && y.value != 0 && z.value != 0 && RT60_ideal != ""){
        CalcularTodo();
        $("#estudiorecinto_form").submit();
    }
});
$("#y").change(function() {
    if (x.value != 0 && y.value != 0 && z.value != 0 && RT60_ideal != ""){
        CalcularTodo();
        $("#estudiorecinto_form").submit();
    }
});
$("#z").change(function() {
    if (x.value != 0 && y.value != 0 && z.value != 0 && RT60_ideal != ""){
        CalcularTodo();
        $("#estudiorecinto_form").submit();
    }
});
$("#RT60_ideal").change(function() {
    if (x.value != 0 && y.value != 0 && z.value != 0 && RT60_ideal != ""){
        CalcularTodo();
        $("#estudiorecinto_form").submit();
    }
});
$('#Tipo_Cuarto').on('change',function(){
    if (x.value != 0 && y.value != 0 && z.value != 0 && RT60_ideal != ""){
        CalcularTodo();
        $("#estudiorecinto_form").submit();
    }
});
$('#Material_T').on('change',function(){
    if (x.value != 0 && y.value != 0 && z.value != 0 && RT60_ideal != ""){
        $("#estudiorecinto_form").submit();
    }
});
$('#Material_P').on('change',function(){
    if (x.value != 0 && y.value != 0 && z.value != 0 && RT60_ideal != ""){
        $("#estudiorecinto_form").submit();
    }
});
$('#Material_WF').on('change',function(){
    if (x.value != 0 && y.value != 0 && z.value != 0 && RT60_ideal != ""){
        $("#estudiorecinto_form").submit();
    }
});
$('#Material_WB').on('change',function(){
    if (x.value != 0 && y.value != 0 && z.value != 0 && RT60_ideal != ""){
        $("#estudiorecinto_form").submit();
    }
});
$('#Material_WL').on('change',function(){
    if (x.value != 0 && y.value != 0 && z.value != 0 && RT60_ideal != ""){
        $("#estudiorecinto_form").submit();
    }
});
$('#Material_WR').on('change',function(){
    if (x.value != 0 && y.value != 0 && z.value != 0 && RT60_ideal != ""){
        $("#estudiorecinto_form").submit();
    }
});


// § Clases Elementos
class Elemento {
    constructor(Nombre,id,Material,Coeficiente){
        this.Nombre = Nombre;
        this.id = id;
        this.Material = Material;
        this.Coeficiente = Coeficiente
    }
}
class Pared extends Elemento {
    constructor(Nombre,id,Material,Coeficiente,Largo,Ancho){
        super(Nombre,id,Material,Coeficiente)
        this.Largo = Largo;
        this.Ancho = Ancho;
        this.Area = Largo*Ancho;
    }
}
class Panel extends Pared {
    constructor(Nombre,id,Material,Coeficiente,Largo,Ancho,ParedOrigen){
        super(Nombre,id,Material,Coeficiente,Largo,Ancho)
        this.ParedOrigen = ParedOrigen;
    }
}
class Mueble extends Elemento {
    constructor(Nombre,id,Material,Coeficiente,AreaSuperficial){
        super(Nombre,id,Material,Coeficiente);
        this.AreaSuperficial = AreaSuperficial
    }
}

// § Paneles

// Inicialización de variables globales
var listaPaneles = [];
var id = 0;
var listaPanelesJson;
var listaPanelesOOP = []

// Clase Prompt Añadir objetos
$("#dialogoverlay" ).hide();
$("#dialogbox").hide();
class AddPrompt {
    constructor() {

        // Render Prompt Añadir Objetos
        this.render = function(){
            $("#dialogoverlay").show();
            $("#dialogbox").show();
        };

        // Evento Botón añadir
        document.getElementById("anadir").addEventListener('click', () => {
            this.add();
            $("#RT60_inspector").hide();
            $("#estudiorecinto_form").submit();
        });

        // Evento Botón cancelar
        document.getElementById("cancelar").addEventListener('click', () => {
            this.cancel();
            $("#RT60_inspector").hide();
        });

        // Función Cancelar
        this.cancel = function(){
            $("#dialogoverlay" ).hide();
            $("#dialogbox").hide();
        };

        // Función Añadir
        this.add = function(){      
            let newPanel = new Panel();
            newPanel.Nombre =     $("#nombre_objeto").val();
            newPanel.Material =   $("#material_objeto").val();
            newPanel.Ancho =      $("#ancho_objeto").val();
            newPanel.Largo =      $("#largo_objeto").val();
            newPanel.Area =       newPanel.Ancho*newPanel.Largo;
            newPanel.id =         id;
            if ($("#" + Tabla + " tbody").length == 0) {
                $("#" + Tabla).append("<tbody></tbody>");
            }
            $("#" + Tabla + " tbody").append(
                "<tr>" +
                "<th id = 'td_nombreobjeto"+ id + "' class = 'td_nombreobjeto'>" + newPanel.Nombre +
                "<button id = 'delete_objeto' class = 'btn_tabla'"+
                "type='button' onclick='deleteObjeto(this);'>x</button>"+
                "</th>" +
                "<td id = 'td_materialobjeto"+ id + "'>" + newPanel.Material + "</td>" +
                "<td id = 'td_areaobjeto"+ id + "'>" + newPanel.Area + " m<sup>2</sup></p></td>" +
                "<td id = 'td_sa1objeto"+ id + "'></td>" +
                "<td id = 'td_sa2objeto"+ id + "'></td>" +
                "<td id = 'td_sa3objeto"+ id + "'></td>" +
                "<td id = 'td_sa4objeto"+ id + "'></td>" +
                "<td id = 'td_sa5objeto"+ id + "'></td>" +
                "<td id = 'td_sa6objeto"+ id + "'></td>" +
                "</tr>"
            );
            switch (Tabla){
                case "Tabla_T":
                    newPanel.ParedOrigen = "Techo"
                    break;
                case "Tabla_P":
                    newPanel.ParedOrigen = "Piso"
                    break;
                case "Tabla_WF":
                    newPanel.ParedOrigen = "Pared Frontal"
                    break;
                case "Tabla_WB":
                    newPanel.ParedOrigen = "Pared Trasera"
                    break;
                case "Tabla_WL":
                    newPanel.ParedOrigen = "Pared Izquierda"
                    break;
                case "Tabla_WR":
                    newPanel.ParedOrigen = "Pared Derecha"
                    break;
                }

            console.log(newPanel)
            let datosPanel = [];    
            datosPanel.push(newPanel.id,newPanel.Nombre,newPanel.ParedOrigen,newPanel.Ancho,newPanel.Largo,newPanel.Material);
            listaPaneles.push(datosPanel);
            listaPanelesJson = JSON.stringify(listaPaneles);
            
            $("#dialogoverlay" ).hide();
            $("#dialogbox").hide();

            listaPanelesOOP.push(newPanel);
            id++;
        };
    }
}
var addPrompt = new AddPrompt();

// Añadir Objeto
function addObjeto(pared){    
    addPrompt.render();
    $("#nombre_objeto").val("");
    $("#largo_objeto").val("");
    $("#ancho_objeto").val("");
    Tabla = pared.value;
}

// Eliminar Objeto
function removeItemFromArr(arr,item) {
    return arr.filter(function(e){
        return e !== item;
    });
};
var quit = [];
function deleteObjeto(ctl) {    
    var _row = $(ctl).parents("tr"); 
    var cols = _row.children("td");
    num = parseInt(cols[0].id.charAt(cols[0].id.length-1));
    console.log(num);
    for (i=0;i<listaPaneles.length;i++){
        if (num == listaPaneles[i][0]){
            quit = listaPaneles[i];
        }
    }
    listaPaneles = removeItemFromArr(listaPaneles,quit);    
    listaPanelesJson = JSON.stringify(listaPaneles);
    console.log(listaPaneles);
    $(ctl).parents("tr").remove();
    $("#estudiorecinto_form").submit();
}

const td_nombreobjeto = document.getElementsByClassName('td_nombreobjeto');



// § Inspector RT60

$("#RT60_inspector").hide();

// Cerrar Inspector
$("#btn_cerrarInspector").click(function(){
    $("#RT60_inspector").hide();
    for (i=0;i<td_nombreobjeto.length;i++){
        td_nombreobjeto[i].style.backgroundColor = "#ffd966";
    }
    td_nombreobjeto.onmouseover = function(){
        this.style.backgroundColor = "#d5a103";
    }
});  

// II. Main

// § Cambiar vista

// Vista default
$("#recintos_main__MaterialesRT60").show();
$("#recintos_main__GraficaRT60").hide();
$("#recintos_main__ConteoModos").hide();
$("#recintos_main__FrecuenciasModales").hide();
$("#recintos_main__CriterioBonello").hide();

// Cambiar vista select
$('#vista').on('change',function(){
    vista = $('#vista option:selected').val();
    switch (vista){
        case "Materiales RT60":
            $("#recintos_main__MaterialesRT60").show();
            $("#recintos_main__GraficaRT60").hide();
            $("#recintos_main__ConteoModos").hide();
            $("#recintos_main__FrecuenciasModales").hide();
            $("#recintos_main__CriterioBonello").hide();
        break
        case "Gráfica RT60":
            $("#recintos_main__MaterialesRT60").hide();
            $("#recintos_main__GraficaRT60").show();
            $("#recintos_main__ConteoModos").hide();
            $("#recintos_main__FrecuenciasModales").hide();
            $("#recintos_main__CriterioBonello").hide();
        break
        case "Conteo de Modos":
            $("#recintos_main__MaterialesRT60").hide();
            $("#recintos_main__GraficaRT60").hide();
            $("#recintos_main__ConteoModos").show();
            $("#recintos_main__FrecuenciasModales").hide();
            $("#recintos_main__CriterioBonello").hide();
        break
        case "Frecuencias Modales":
            $("#recintos_main__MaterialesRT60").hide();
            $("#recintos_main__GraficaRT60").hide();
            $("#recintos_main__ConteoModos").hide();
            $("#recintos_main__FrecuenciasModales").show();
            $("#recintos_main__CriterioBonello").hide();
        break
        case "Criterio de Bonello":
            $("#recintos_main__MaterialesRT60").hide();
            $("#recintos_main__GraficaRT60").hide();
            $("#recintos_main__ConteoModos").hide();
            $("#recintos_main__FrecuenciasModales").hide();
            $("#recintos_main__CriterioBonello").show();
        break
    }
    
});

// Cambiar vista con J/K
var c = 1;
document.addEventListener("keydown", function(e){
    var key = e.key
    if (key == "k"){
        if (c < 5){c++}
    }
    if (key == "j"){
        if (c > 1){c--}
    }
    switch (c){
        case 1:
            $('#vista').val("Materiales RT60");
            $("#recintos_main__MaterialesRT60").show();
            $("#recintos_main__GraficaRT60").hide();
            $("#recintos_main__ConteoModos").hide();
            $("#recintos_main__FrecuenciasModales").hide();
            $("#recintos_main__CriterioBonello").hide();
           break;
        case 2:
            $('#vista').val("Gráfica RT60");
            $("#recintos_main__MaterialesRT60").hide();
            $("#recintos_main__GraficaRT60").show();
            $("#recintos_main__ConteoModos").hide();
            $("#recintos_main__FrecuenciasModales").hide();
            $("#recintos_main__CriterioBonello").hide();
            break;
        case 3:
            $('#vista').val("Conteo de Modos");
            $("#recintos_main__MaterialesRT60").hide();
            $("#recintos_main__GraficaRT60").hide();
            $("#recintos_main__ConteoModos").show();
            $("#recintos_main__FrecuenciasModales").hide();
            $("#recintos_main__CriterioBonello").hide();
           break;
        case 4:
            $('#vista').val("Frecuencias Modales");
            $("#recintos_main__MaterialesRT60").hide();
            $("#recintos_main__GraficaRT60").hide();
            $("#recintos_main__ConteoModos").hide();
            $("#recintos_main__FrecuenciasModales").show();
            $("#recintos_main__CriterioBonello").hide();
            break;
        case 5:
            $('#vista').val("Criterio de Bonello");
            $("#recintos_main__MaterialesRT60").hide();
            $("#recintos_main__GraficaRT60").hide();
            $("#recintos_main__ConteoModos").hide();
            $("#recintos_main__FrecuenciasModales").hide();
            $("#recintos_main__CriterioBonello").show();
            break;
    }
})

// § Gráficas

// Función Gráfica RT60
var datos_RT60f = [];
var datos_RT60fAnterior = [];
function Render_GraficaRT60(datos_RT60f,RT60_promedio){    
    var ctx=document.getElementById("GraficaRT60").getContext("2d");
    var Grafica_RT60 = new Chart(ctx,{
        type:"line",
        axisY:{
                stripLines:[
                {
                        startValue:25,
                        endValue:32,
                        color:"#d8d8d8"
                }
                ]
        },
        data:{

                labels:["", "125 Hz","250 Hz","500 Hz","1000 Hz","2000 Hz","4000 Hz",""],
                datasets:[
                    {
                        label:"RT60 Actual",
                        data:datos_RT60f,
                        lineTension:0,
                        backgroundColor:'rgb(255,192,0)',
                                
                        fill: false,
                        pointRadius:5,
                        aspectRatio:1,
                    },
                    {
                        label:"RT60 Anterior",
                        data:datos_RT60fAnterior,
                        lineTension:0,
                        backgroundColor:'rgb(221,221,221)',
                        hidden: true,
                                
                        fill: false,
                        pointRadius:2,
                        aspectRatio:1,
                    },
                    {
                        label:"RT60 Promedio",
                        data:[RT60_promedio,RT60_promedio,RT60_promedio,RT60_promedio,RT60_promedio,RT60_promedio,RT60_promedio,RT60_promedio],
                        lineTension:0,
                        borderColor:'rgb(255,192,0)',
                        fill: false,
                        pointRadius:0,
                        aspectRatio:1,

                        backgroundColor: "#e755ba",
                        pointBackgroundColor: "#55bae7",
                        pointBorderColor: "#55bae7",
                        pointHoverBackgroundColor: "#55bae7",
                        pointHoverBorderColor: "#55bae7",
                    },
                    {
                        label:"RT60 Ideal",
                        data:[RT60_ideal.value,RT60_ideal.value,RT60_ideal.value,RT60_ideal.value,RT60_ideal.value,RT60_ideal.value,RT60_ideal.value,RT60_ideal.value],
                        lineTension:0,
                        borderDash: [5, 5],
                        borderColor:'rgb(255,192,0)',
                        fill: false,
                        pointRadius:0,
                        aspectRatio:1,
                    },
                ],
                },

        options:{
                responsive:true,
                aspectRatio:2,
                scales:{
                    xAxes:[{
                        scaleLabel: {
                            display: true,
                            labelString: 'Ancho de Banda'
                          },
                    }],
                    yAxes:[{
                        scaleLabel: {
                            display: true,
                            labelString: 'Tiempo de Reverberación'
                          },
                          
                        ticks:{
                                beginAtZero:true,
                                stepSize:0.20,
                                callback: function(value, index, values) {
                                    return value + ' s';
                                }
                                
                        },

                }],



                }
        },

    })
};
Render_GraficaRT60();

// Función Criterio de Bonello
var conteo_axiales = [];
var conteo_tangenciales = [];
function Render_CriterioBonello(conteo_axiales,conteo_tangenciales,conteo_oblicuos){
    var ctx=document.getElementById("CriterioBonello").getContext("2d");
    
    var CriterioBonello = new Chart(ctx,{        
        type:"bar",
        data:{
            labels:["20 Hz","25 Hz","31 Hz","40 Hz","50 Hz","63 Hz","80 Hz","100 Hz","125 Hz","160 Hz","200 Hz","250 Hz","315 Hz","400 Hz","500 Hz"],
            datasets:[
                {
                    label:"Oblicuos",
                    data:conteo_oblicuos,
                    backgroundColor:'rgb(255,192,0)'
                },
                {
                    label:"Tangenciales",
                    data:conteo_tangenciales,
                    backgroundColor:'rgb(255,128,0)'
                },
                {
                    label:"Axiales",
                    data:conteo_axiales,
                    backgroundColor:'rgb(112,173,71)'
                },
                
                
        ]
        },
        options:{
            responsive:true,
            aspectRatio:2,
            scales:{
                xAxes:[{
                    scaleLabel: {
                        display: true,
                        labelString: 'Ancho de Banda'
                      },
                    stacked: true,
                    ticks:{
                        beginAtZero:true
                    }
                }],
                yAxes:[{
                    scaleLabel: {
                        display: true,
                        labelString: 'Número de Modos'
                      },
                    stacked: true,
                    ticks:{
                        beginAtZero:true
                    }
                }]
            }
        }
    }
    )
};
Render_CriterioBonello();

// Función Gráfica Coeficientes
var datos_Coef = [];
function Render_GraficaCoeficientes(){
    var ctx=document.getElementById("GraficaCoeficientes").getContext("2d");
    var GraficaCoeficientes = new Chart(ctx,{
        type:"line",
        axisY:{
            stripLines:[
            {
                    startValue:25,
                    endValue:32,
                    color:"#d8d8d8"
            }
            ]
        },
        data:{
            labels:["", "125 Hz","250 Hz","500 Hz","1000 Hz","2000 Hz","4000 Hz",""],
            datasets:[
                {
                    label:"Coeficientes",
                    data:datos_Coef,
                    lineTension:0,
                    backgroundColor:'rgb(255,192,0)',
                            
                    fill: false,
                    pointRadius:5,
                    aspectRatio:1,
                }
            ]
        },
        options:{
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMax: 1
                    }
                }]
            }
        }
    })
    
}
Render_GraficaCoeficientes();

// Función Mapa de calor
function calcularGradiente(i,max){
    if(i>=max*0.9){
        return 1;
    }else if(i<max*0.9 && i>=max*0.8){
        return 0.9;
    }else if(i<max*0.8 && i>=max*0.7){
        return 0.8;
    }else if(i<max*0.7 && i>=max*0.6){
        return 0.7;
    }else if(i<max*0.6 && i>=max*0.5){
        return 0.6;
    }else if(i<max*0.5 && i>=max*0.4){
        return 0.5;
    }else if(i<max*0.4 && i>=max*0.3){
        return 0.4;
    }else if(i<max*0.3 && i>=max*0.2){
        return 0.3;
    }else if(i<max*0.2 && i>=max*0.1){
        return 0.2;
    }else if(i<max*0.1 && i>max*0){
        return 0.1;
    }else if(i==max*0){
        return 0;
    } 
};

// Función Criterio de Bonello
function CalcularCriterioBonello(modos,celda){
    var menor;
    for (i=0;i<modos.length;i++){
        if (modos[i-1] > modos[i]){
            menor = modos[i-1];
        } while (modos[i] < menor){
            $(celda+(i+1)).css('background-color','rgba(255,0,0,1)')
            break;
        }
    }
}

// § Criterio de Bonello

// Array Tercios de Octava
const bw3 = 31.25
const bw2 = bw3/Math.pow(2, 1/3)
const bw1 = bw2/Math.pow(2, 1/3)
var Tercios_Octava = [bw1,bw2,bw3]
var Tercios_Octava2 = [bw1,bw2,bw3]
for (i=2;i<6;i++){
    Tercios_Octava2 = Tercios_Octava2.map(function(x) { return x * 2; });
    Tercios_Octava = Tercios_Octava.concat(Tercios_Octava2);
}
const Tercios_Octava_Low  = Tercios_Octava.map(function(x) { return x / Math.pow(2, 1/6); });
const Tercios_Octava_High = Tercios_Octava.map(function(x) { return x * Math.pow(2, 1/6); });

// Buscar coincidencias modales
function BuscarCoincidenciasModales(frecuencias){
    let duplicados = [];
    frecuencias.sort((a, b) => a - b);
    for (i=0;i<frecuencias.length;i++){
        if (frecuencias[i+1] ==  frecuencias[i]){
            duplicados.push(parseFloat(frecuencias[i].toFixed(2)))
        }
    }
    duplicados = duplicados.filter((a,b)=> duplicados.indexOf(a) === b);
    return duplicados;
}

// Filtrar coincidencias modales
function FiltrarCoincidenciasModales(coincidencias,conteo){
    let Menores5 = [];
    let Mayores5 = [];
    for (i=0;i<coincidencias.length;i++){
        for (n=0;n<Tercios_Octava.length;n++){
            if (coincidencias[i]>Tercios_Octava_Low[n] && coincidencias[i]<Tercios_Octava_High[n]){
                if (conteo[0][n] <= 5){
                    Menores5.push(coincidencias[i])
                }else{
                    Mayores5.push(coincidencias[i])
                }
            }
        }
    }
    return [Menores5,Mayores5]
}

// Marcar coincidencias modales
function MarcarCoincidenciasModales(MenoresMayores5,frecuencias,celda){
    let Menores5 = MenoresMayores5[0]
    let Mayores5 = MenoresMayores5[1]    
    var frecuencias_redondeadas = [];
        for (i=0;i<frecuencias.length;i++){
            frecuencias_redondeadas.push(Math.round(frecuencias[i]));
        }
    for (i=0;i<Menores5.length;i++){
        let pos1 = frecuencias_redondeadas.indexOf(Math.round(Menores5[i]));
        if (pos1 != -1){
            $(celda+(pos1)).css('background-color','rgba(255,0,0,1)')
        }
    }
    for (i=0;i<Mayores5.length;i++){
        let pos2 = frecuencias_redondeadas.indexOf(Math.round(Mayores5[i]));
        if (pos2 != -1){
            $(celda+(pos2)).css('background-color','rgba(255,0,0,0.2)')
        }
    }
}

renderAyuda($("#dimensiones"),"hola");

function renderAyuda(e,texto){
    e.hover(function(){
        $("#ayuda").html(texto);
    },function(){
        $("#ayuda").html("");
    });
};

renderAyuda($("#td_T"),"xd")


// Hola



// Ajax

$(document).ready(function(){
    $("#estudiorecinto_form").submit(function(e){
            e.preventDefault();
            $.ajax({
                    url: $(this).attr('action'),
                    type: $(this).attr('method'),
                    data: {
                            'x': $('#x').val(),
                            'y': $('#y').val(),
                            'z': $('#z').val(),
                            'Material_T': $('#Material_T option:selected').val(),
                            'Material_P': $('#Material_P option:selected').val(),
                            'Material_WF': $('#Material_WF option:selected').val(),
                            'Material_WB': $('#Material_WB option:selected').val(),
                            'Material_WL': $('#Material_WL option:selected').val(),
                            'Material_WR': $('#Material_WR option:selected').val(),
                            'RT60_ideal' : $('#RT60_ideal').val(),
                            "Extras":listaPanelesJson,
                    },

                    success: function(datos){
                            console.log("success");
                            console.log(datos)

                            $("#td_sT" ).html("<p>" + datos.sT  + " m<sup>2</sup></p>");
                            $("#td_sP" ).html("<p>" + datos.sP  + " m<sup>2</sup></p>");
                            $("#td_sWF").html("<p>" + datos.sWF + " m<sup>2</sup></p>");
                            $("#td_sWB").html("<p>" + datos.sWB + " m<sup>2</sup></p>");
                            $("#td_sWL").html("<p>" + datos.sWL + " m<sup>2</sup></p>");
                            $("#td_sWR").html("<p>" + datos.sWR + " m<sup>2</sup></p>");

                            var maxSAT = Math.max.apply(null,datos.saT);
                            var maxSAP = Math.max.apply(null,datos.saP);
                            var maxSAWF = Math.max.apply(null,datos.saWF);
                            var maxSAWB = Math.max.apply(null,datos.saWB);
                            var maxSAWL = Math.max.apply(null,datos.saWL);
                            var maxSAWR = Math.max.apply(null,datos.saWR);

                            var maxSA = Math.max(maxSAT, maxSAP, maxSAWF, maxSAWB, maxSAWL, maxSAWR);

                            function rendersa(celda,sa){
                                for (var i = 0; i<6;i++){
                                    $(celda+i).html("<p>" + sa[i].toFixed(2) + " </p>");
                                    var gradiente = calcularGradiente(sa[i],maxSA);
                                    $(celda+i).css('background-color','rgba(255,217,102,'+gradiente+')');
                                }
                            }

                            rendersa("#td_saT",datos.saT);
                            rendersa("#td_saP",datos.saP);
                            rendersa("#td_saWF",datos.saWF);
                            rendersa("#td_saWB",datos.saWB);
                            rendersa("#td_saWL",datos.saWL);
                            rendersa("#td_saWR",datos.saWR);

                            for (var i = 0; i<6;i++){
                                $("#td_saS"+i).html("<p>" + datos.RT60f[0][i] + " s</p>");
                            }                          
                            
                            var nums = [];
                                for (var c=0;c < listaPaneles.length;c++){
                                        nums.push(listaPaneles[c][0]);      
                                }
                                for (var k=0;k<nums.length;k++){
                                        for (var i=1;i<7;i++){
                                                document.getElementById("td_sa"+i+"objeto"+nums[k]).innerHTML = datos.sobjsaW[k][i-1];
                                                var gradiente = calcularGradiente(datos.sobjsaW[k][i-1],maxSA);
                                                document.getElementById("td_sa"+i+"objeto"+nums[k]).style.backgroundColor = 'rgba(255,217,102,'+gradiente+')';
                                        }
                                }

                            $("#td_RT60promedio").html(datos.RT60 + " s");
                            $("#td_RT60dif").html(datos.dif + " s");

                            

                            var Techo = new Pared       ("Techo",           "T",    datos.matT, datos.cT,   datos.lT,   datos.aT);
                            var Piso = new Pared        ("Piso",            "P",    datos.matP, datos.cP,   datos.lP,   datos.aP);
                            var Frontal = new Pared     ("Pared Frontal",   "WF",   datos.matWF,datos.cWF,  datos.lWF,  datos.aWF);
                            var Trasera = new Pared     ("Pared Trasera",   "WB",   datos.matWB,datos.cWB,  datos.lWB,  datos.aWB);
                            var Izquierda = new Pared   ("Pared Derecha",   "WL",   datos.matWL,datos.cWL,  datos.lWL,  datos.aWL);
                            var Derecha = new Pared     ("Pared Izquierda", "WR",   datos.matWR,datos.cWR,  datos.lWR,  datos.aWR);
                            $("#td_T").val(Techo);
                            $("#td_P").val(Piso);
                            $("#td_WF").val(Frontal);
                            $("#td_WB").val(Trasera);
                            $("#td_WL").val(Izquierda);
                            $("#td_WR").val(Derecha);

                            for (i=0;i<listaPanelesOOP.length;i++){
                                listaPanelesOOP[i].Coeficiente = datos.objCoef[i];
                                
                                $("#td_nombreobjeto"+(i)).val(listaPanelesOOP[i]);
                            }
                            
                            $(".td_nombreobjeto").click(function(){
                                inspeccionarObjeto(this);
                                Render_GraficaCoeficientes();
                            });   
                            

                            // Conteo de Modos
                            
                            // Calculo del modo máximo (Para gradiente)

                            var maxConteox = Math.max.apply(null,datos.conteo_x[0]);
                            var maxConteoy = Math.max.apply(null,datos.conteo_y[0]);
                            var maxConteoz = Math.max.apply(null,datos.conteo_z[0]);
                            var maxConteotA = Math.max.apply(null,datos.conteoA_suma[0]);

                            var maxConteoxy = Math.max.apply(null,datos.conteo_xy[0]);
                            var maxConteozy = Math.max.apply(null,datos.conteo_zy[0]);
                            var maxConteoxz = Math.max.apply(null,datos.conteo_xz[0]);
                            var maxConteotT = Math.max.apply(null,datos.conteoT_suma[0]);

                            var maxConteoA = Math.max(maxConteox,maxConteoy,maxConteoz);
                            var maxConteoT = Math.max(maxConteoxy,maxConteozy,maxConteoxz);

                            var maxConteoO = Math.max.apply(null,datos.conteo_xyz[0]);    

                            // Función para renderizar el conteo de modos con gradiente
                            
                            function renderConteoModos(celda,conteo,maxConteo){
                                for (var i = 0; i<16;i++){
                                    $(celda+i).html("<p>" + conteo[0][i-1] + " </p>");
                                    var gradiente = calcularGradiente(conteo[0][i-1],maxConteo);
                                    $(celda+i).css('background-color','rgba(255,217,102,'+gradiente+')');
                                }
                            }

                            // Render Conteo Modos Axiales
                            renderConteoModos("#td_xmA",datos.conteo_x,maxConteoA);
                            renderConteoModos("#td_ymA",datos.conteo_y,maxConteoA);
                            renderConteoModos("#td_zmA",datos.conteo_z,maxConteoA);
                            renderConteoModos("#td_smA",datos.conteoA_suma,maxConteotA);
                            CalcularCriterioBonello(datos.conteoA_suma[0],"#td_smA")

                            // Render Conteo Modos Tangenciales
                            renderConteoModos("#td_xymT",datos.conteo_xy,maxConteoT);
                            renderConteoModos("#td_zymT",datos.conteo_zy,maxConteoT);
                            renderConteoModos("#td_xzmT",datos.conteo_xz,maxConteoT);
                            renderConteoModos("#td_smT",datos.conteoT_suma,maxConteotT);
                            CalcularCriterioBonello(datos.conteoT_suma[0],"#td_smT");

                            // Render Conteo Modos Oblicuos
                            renderConteoModos("#td_xyzmO",datos.conteo_xyz,maxConteoO);
                            CalcularCriterioBonello(datos.conteo_xyz[0],"#td_xyzmO");                            

                            // Render Suma de Conteo de Modos
                            var MaxConteoTotal = Math.max.apply(null,datos.SumaConteoTotal[0]);
                            renderConteoModos("#td_smTotal",datos.SumaConteoTotal,MaxConteoTotal);                            
                            CalcularCriterioBonello(datos.SumaConteoTotal[0],"#td_smTotal");

                            // § Tablas Frecuencias Modales

                            // Función render valores frecuencias Modales

                            function renderFrecuenciasModales(n,frecuencias,celda){
                                for (i=0;i<n;i++){  
                                    if (frecuencias[i] < Tercios_Octava_High[14]){
                                        $(celda+i).html("<p>" + frecuencias[i].toFixed(2) + "</p>"); 
                                    }     
                                }
                            }

                            // Frecuencias Modo Axial

                            $("#TablaFrecuenciasModalesAxial tbody").remove()
                            $("#TablaFrecuenciasModalesAxial").append("<tbody></tbody>");

                            for (var i = 0; i<datos.n;i++){
                                $("#TablaFrecuenciasModalesAxial tbody").append(
                                        "<tr>"+
                                        '<td id="td_xfA'+ i +'"></td>'+
                                        '<td id="td_yfA'+ i +'"></td>'+
                                        '<td id="td_zfA'+ i +'"></td>'+
                                        "</tr>"
                                )
                            }

                            renderFrecuenciasModales(datos.n,datos.axial_x,"#td_xfA");
                            renderFrecuenciasModales(datos.n,datos.axial_y,"#td_yfA");
                            renderFrecuenciasModales(datos.n,datos.axial_z,"#td_zfA");

                            // Frecuencias Modo Tangencial

                            $("#TablaFrecuenciasModalesTangencial tbody").remove()
                            $("#TablaFrecuenciasModalesTangencial").append("<tbody></tbody>");

                            for (var i = 0; i<Math.max(datos.tangencial_xz.length,datos.tangencial_xy.length,datos.tangencial_zy.length);i++){
                                $("#TablaFrecuenciasModalesTangencial tbody").append(
                                        "<tr>"+
                                        '<td id="td_xzfT'+ i +'"></td>'+
                                        '<td id="td_xyfT'+ i +'"></td>'+
                                        '<td id="td_zyfT'+ i +'"></td>'+
                                        "</tr>"
                                )
                            }

                            renderFrecuenciasModales(datos.tangencial_xz.length,datos.tangencial_xz,"#td_xzfT");
                            renderFrecuenciasModales(datos.tangencial_xy.length,datos.tangencial_xy,"#td_xyfT");
                            renderFrecuenciasModales(datos.tangencial_zy.length,datos.tangencial_zy,"#td_zyfT");
                            
                            // Frecuencias Modo Oblicuo

                            $("#TablaFrecuenciasModalesOblicuo tbody").remove()
                            $("#TablaFrecuenciasModalesOblicuo").append("<tbody></tbody>");

                            for (var i = 0; i<datos.oblicuo_xyz.length;i++){
                                $("#TablaFrecuenciasModalesOblicuo tbody").append(
                                        "<tr>"+
                                        '<td id="td_xyzfO'+ i +'"></td>'+
                                        "</tr>"
                                )
                            }

                            renderFrecuenciasModales(datos.oblicuo_xyz.length,datos.oblicuo_xyz,"#td_xyzfO");


                            frecuencias_axiales = datos.axial_x.concat(datos.axial_y,datos.axial_z);
                            coincidencias_axiales = BuscarCoincidenciasModales(frecuencias_axiales);
                            MenoresMayores5_axiales = FiltrarCoincidenciasModales(coincidencias_axiales,datos.conteoA_suma);
                            
                            MarcarCoincidenciasModales(MenoresMayores5_axiales,datos.axial_x,"#td_xfA")
                            MarcarCoincidenciasModales(MenoresMayores5_axiales,datos.axial_y,"#td_yfA")
                            MarcarCoincidenciasModales(MenoresMayores5_axiales,datos.axial_z,"#td_zfA")

                            frecuencias_tangenciales = datos.tangencial_xy.concat(datos.tangencial_xz,datos.tangencial_zy);
                            coincidencias_tangenciales = BuscarCoincidenciasModales(frecuencias_tangenciales);
                            MenoresMayores5_tangenciales = FiltrarCoincidenciasModales(coincidencias_tangenciales,datos.conteoT_suma);

                            MarcarCoincidenciasModales(MenoresMayores5_tangenciales,datos.tangencial_xy,"#td_xyfT");
                            MarcarCoincidenciasModales(MenoresMayores5_tangenciales,datos.tangencial_xz,"#td_xzfT");
                            MarcarCoincidenciasModales(MenoresMayores5_tangenciales,datos.tangencial_zy,"#td_zyfT");

                            frecuencias_oblicuas = datos.oblicuo_xyz;
                            coincidencias_oblicuas = BuscarCoincidenciasModales(frecuencias_oblicuas);
                            MenoresMayores5_oblicuos = FiltrarCoincidenciasModales(coincidencias_oblicuas,datos.conteo_xyz[0]);

                            MarcarCoincidenciasModales(MenoresMayores5_oblicuos,datos.oblicuo_xyz,"#td_xyzfO");
                            
                            // Calcular Criterio de Bonello                           

                            // § Render Gráfica RT60

                            datos_RT60fAnterior = datos_RT60f;
                            datos_RT60f = datos.RT60f[0];
                            datos_RT60f.unshift(null);  
                            
                            Render_GraficaRT60(datos_RT60f,datos.RT60);
                            
                            // Render Gráfica Criterio de Bonello
                            
                            Render_CriterioBonello(datos.conteoA_suma[0],datos.conteoT_suma[0],datos.conteo_xyz[0])

                            function inspeccionarObjeto(e){
                                console.log(e)
                                let objeto = e.value;
                                console.log(objeto);
                                $("#RT60_inspector").show();
                                $("#td_Nombre").html(objeto.Nombre);
                                if (objeto.constructor.name == "Pared"){
                                    $("#td_Pared").html(objeto.Nombre);
                                }else{
                                    $("#td_Pared").html(objeto.ParedOrigen);
                                }    
                                $("#td_Largo").html(objeto.Largo + " m");
                                $("#td_Ancho").html(objeto.Ancho + " m");
                                $("#td_Superficie").html(objeto.Area + " m2");
                                $("#td_Material").html(objeto.Material);
                            
                                for (i=0;i<5;i++){
                                    $("#td_C"+(i+1)).html(objeto.Coeficiente[1]);
                                }
                                for (i=0;i<td_nombreobjeto.length;i++){
                                    td_nombreobjeto[i].style.backgroundColor = "#ffd966";
                                }
                                e.style.backgroundColor = "#d5a103";
                            
                                datos_Coef = [null,objeto.Coeficiente[0],objeto.Coeficiente[1],objeto.Coeficiente[2],objeto.Coeficiente[3],objeto.Coeficiente[4],objeto.Coeficiente[5],null];
                            }
                                               
                    },
                    error: function(){
                            console.log("error");
                    }
            })
    })
})


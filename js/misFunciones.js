function calcular(){        
   
    document.getElementById("div_ecuacion").style="display: block";
    document.getElementById("div_respuesta").style="display: block";
    document.getElementById("div_formula").style="display: block";   
    document.getElementById("div_tabla").style="display: none";
    document.getElementById("div_grafica").style="display: none";
    
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
    let c = parseFloat(document.getElementById("c").value);
    
    let resultado ="";
    let valores = [];

    let raiz = parseFloat((b*b) - 4*a*c);

    if(raiz>=0){
        valores[0]= (-(b) + Math.sqrt((b*b)-4*a*c)) / (2*a);
        valores[1]= (-(b) - Math.sqrt((b*b)-4*a*c)) / (2*a);
        console.log(...valores);
        resultado = `X1 = ${valores[0].toFixed(2)},     X2= ${valores[1].toFixed(2)}`;
    
    }else{
        resultado = "<b>"+ "El discriminante es menor que cero entonces la ecuación no tiene resolución real." + "</b>";
    }
    
    let respuesta= document.getElementById("ecuacion");
    respuesta.innerHTML = pintar(a,b,c);
    

    let respuesta2 = document.getElementById("respuesta");
    respuesta2.innerHTML = resultado;
    formulas(a,b,c);   

}


function pintar(a,b,c){

    let colores=[];
    colores[0]=a+"X´2 ";
    let ecuacion="";

    if(b>0 && c>0){
        colores[1]= "+"+ b +"X ";
        colores[2]= " +" + c;
    } 
    else if(b<0 && c>0)
    {
        colores[1]= b +"X ";
        colores[2]= "+ " +c;
    } 
    else if(c<0 && b>0){
        colores[1]= "+ "+ b +"X ";
        colores[2]= "-" + Math.abs(c);
    } 
    else if(b<0 && c<0) {
        colores[1]= b +"X ";
        colores[2]= ""+c;
    }

    return "<b>" + "Calculo para: "+"</b>" + colores[0].fontcolor("green") + colores[1].fontcolor("red") + colores[2].fontcolor("blue") + " = 0";
}



function formulas(a,b,c){

    let colores=[];
    let v1 = document.getElementById("v1");
    colores[0] = "(" +b + ")";
    v1.innerHTML = colores[0].fontcolor("red");

    let v2 = document.getElementById("v2");
    colores[1] = "(" +b + ")";
    v2.innerHTML = colores[1].fontcolor("red")

    let v3 = document.getElementById("v3");
    colores[2]= "(" +a + ")";
    v3.innerHTML = colores[2].fontcolor("green");

    let v4 = document.getElementById("v4");
    colores[3] = "(" +c + ")";
    v4.innerHTML = colores[3].fontcolor("blue");

    let v5 = document.getElementById("v5");
    colores[4] =  "(" +a + ")";
    v5.innerHTML =colores[4].fontcolor("green");
}


function evaluar(){

    document.getElementById("mostrarTabla").style="display: block";
    
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
    let c = parseFloat(document.getElementById("c").value);
    
    let ini = parseFloat(document.getElementById("ini").value);
    let fin = parseFloat(document.getElementById("fin").value);

    let intervalo = [];
    let resultados = [];
    let contador =ini;

    for(let i = 0; i <= fin-ini;i++){
        intervalo[i]=contador;        
        resultados[i]=((a*Math.pow(intervalo[i],2))+(b*intervalo[i])+c);;
        contador++;               
    }

    drawTable(intervalo,resultados);
    drawBasic(intervalo,resultados);
}



function drawTable(intervalo, resultados) {
  
    document.getElementById("div_tabla").style="display: block";
    document.getElementById("div_respuesta").style="display: none";
    document.getElementById("div_formula").style="display: none";
    document.getElementById("div_grafica").style="display: none";    
    
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Y');
  
    let numero =intervalo.length;
   
    data.addRows(numero);
    for(let i =0; i<numero;i++){
      data.setCell(i, 0, intervalo[i]);
      data.setCell(i, 1, resultados[i]);
      }  
    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(data, {showRowNumber: true, width: '50%', height: '50%'});
}



function verGrafica() {
    document.getElementById("div_tabla").style="display: none";
    document.getElementById("div_respuesta").style="display: none";
    document.getElementById("div_formula").style="display: none";
    document.getElementById("div_grafica").style="display: block"; 
    
}




function drawBasic(intervalo, resultados) {

    var data = new google.visualization.DataTable();
    data.addColumn('number', '');
    data.addColumn('number', '');
    

    let datos = [];

    for (let i = 0; i < intervalo.length; i++) {
        datos[i] = [intervalo[i], resultados[i]];
    }

    console.log(datos);

    data.addRows(datos);

    var options = {
        hAxis: {
            title: 'X'
        },
        vAxis: {
            title: 'Y'
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}

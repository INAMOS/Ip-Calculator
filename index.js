let form=document.getElementsByTagName('form');

form[0].addEventListener('submit',(event)=>{

    
    event.preventDefault();

    var ip=document.getElementById('ip').value.split('.');
    var mask=document.getElementById('mask').value.split('.');
    var host=parseInt(document.getElementById('host').value);

    var Broadcast;
    var ipMin;
    var ipMax;
    var condicion=false
    var i=0;

    while(!condicion){

        var resultado=(Math.pow(2,i)-2);
        
        condicion= (resultado >= host)?true:false;
        var indice=i;

        i++;

    }

    function calculateMask(index){

        if(!index){
            return "11111111";
        }else{

            mask[3]="";

            let result=Math.abs(8-index);
            octo="00000000";
            
            for(let i=0;i<result;i++){
                mask[3]+='1';
            }

            return mask[3]+octo.substring(result);
        }
    }


    mask[3]=parseInt(calculateMask(indice),2);
    Broadcast=ip.slice();
    Broadcast[3]=(256-mask[3])-1;
    
    ipMin=ip.slice();
    ipMax=ip.slice();

    ipMin[3]=parseInt(ipMin[3])+1;
    ipMax[3]=(Broadcast[3]-1);
       
    let resultados=document.getElementById('resultados');

    resultados.innerHTML=`<h1 class="title">Host Solicitados: ${host}</h1><strong>
                          <h1 class="title">Host Encontrados: ${resultado}</h1>
                          <h1 class="title">Direccion de red: ${ip}</h1>
                          <h1 class="title">Mascara de red: ${mask}</h1>
                          <h1 class="title">Host Min: ${ipMin}</h1>
                          <h1 class="title">Host Max: ${ipMax}</h1>
                          <h1 class="title">Broadcast: ${Broadcast}</h1>`;
    
    let result=document.getElementById('resultado');
    result.style.display="block";
                      
  
    
});


const closeBar= ()=>{

    let bar=document.getElementById('resultado');
    bar.style.display="none"

}











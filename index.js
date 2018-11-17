let form=document.getElementsByTagName('form');

form[0].addEventListener('submit',(event)=>{

    
    event.preventDefault();

//     var ip=document.getElementById('ip').value.split('.');
//     var mask=document.getElementById('mask').value.split('.');
//     var host=parseInt(document.getElementById('host').value);

//     var Broadcast;
//     var ipMin;
//     var ipMax;
//     var condicion=false
//     var i=0;

//     while(!condicion){

//         var resultado=(Math.pow(2,i)-2);
        
//         condicion= (resultado >= host)?true:false;
//         var indice=i;

//         i++;

//     }

//     function calculateMask(index){

//         if(!index){
//             return "11111111";
//         }else{

//             mask[3]="";

//             let result=Math.abs(8-index);
//             octo="00000000";
            
//             for(let i=0;i<result;i++){
//                 mask[3]+='1';
//             }

//             return mask[3]+octo.substring(result);
//         }
//     }


//     mask[3]=parseInt(calculateMask(indice),2);
//     Broadcast=ip.slice();
//     Broadcast[3]=(256-mask[3])-1;
    
//     ipMin=ip.slice();
//     ipMax=ip.slice();

//     ipMin[3]=parseInt(ipMin[3])+1;
//     ipMax[3]=(Broadcast[3]-1);
       
//     let resultados=document.getElementById('resultados');

//     resultados.innerHTML=`<h1 class="title">Host Solicitados: ${host}</h1><strong>
//                           <h1 class="title">Host Encontrados: ${resultado}</h1>
//                           <h1 class="title">Direccion de red: ${ip}</h1>
//                           <h1 class="title">Mascara de red: ${mask}</h1>
//                           <h1 class="title">Host Min: ${ipMin}</h1>
//                           <h1 class="title">Host Max: ${ipMax}</h1>
//                           <h1 class="title">Broadcast: ${Broadcast}</h1>`;
    
//     let result=document.getElementById('resultado');
//     result.style.display="block";
                      
  
    
 });


                       
                        let hostN=getParam('N');
                        
                        let formGroup=document.getElementById('form');
                        let button=document.getElementById('button');
                        
                                               
                        for(let i=0;i<hostN;i++){

                            let field=document.createElement('div');
                            field.classList.add('field');

                            field.innerHTML=`
                                            <label class="label">Host SubRed ${i+1}</label>
                                            <div class="control">
                                                <input id="host${i+1}" class="input" type="number" value="1" min=1 placeholder="Host" required>
                                            </div>
                                            `
                                
                            formGroup.insertBefore(field,button);
                        }

                        

                        
               
                    function calculate(){
                        
                        var subne=new Array();

                        let hostValue=new Array();
                        let bodyTable=document.getElementsByTagName('tbody');
                        let inputs=document.getElementsByTagName('input');//obteniendo todos los inputs del formulario

                        let indice;
                        let saltoRed;
                        let banderillaIp=0;

                        let mascara=getParam('mascara');
                        let mascaras=[];
                        let direcciones=[getParam('ip')];
                        let broadcast=[];

                    
                        for(let i=0;i<inputs.length;i++){
                            hostValue[i]=inputs[i].value;            
                        }
                        
                        
                        hostValue.sort(function(a, b) {return b-a});//ordenando los host e mayor a menor

                        for(let i=0;i<inputs.length;i++){

                            subne[i]={
                                solicitados:hostValue[i],
                                encontrados:foundHost(hostValue[i]),
                                mascara:calculateMask(indice),
                                direccion:getIpdireccion(indice,direcciones[i]),
                                primeraIp:getPrimeraIp(direcciones[i]),
                                broadcast:Broadcast(direcciones[i+1]),
                                ultimaIp:getUltimaIp(broadcast[i])
                            }

                        }

                       
                        for(let i=0;i<subne.length;i++){

                            let  row=document.createElement('tr');
                        
                            row.innerHTML=` <td>${i+1}</td>
                                            <td>${subne[i].solicitados}</td>
                                            <td>${subne[i].encontrados}</td>
                                            <td>${subne[i].direccion}</td>
                                            <td>${subne[i].mascara}</td>
                                            <td>${subne[i].primeraIp}</td>
                                            <td>${subne[i].ultimaIp}</td>
                                            <td>${subne[i].broadcast}</td>
                                        `;

                             bodyTable[0].appendChild(row);

            
                        }


                    //funcion para calcular la mascara
                    function calculateMask(index){

                        let mascara=getParam('mascara');

                        octetos=mascara.split('.');

                        if(!index){
                            return `${octetos[0]}.${octetos[1]}.${octetos[2]}.${parseInt("11111111",2)}`;
                        }else{

                                octetos[3]="";

                                let result=Math.abs(8-index);
                                octo="00000000";
                                
                                for(let i=0;i<result;i++){
                                    octetos[3]+='1';
                                }
                                mascara
                                let newMask=`${octetos[0]}.${octetos[1]}.${octetos[2]}.${parseInt(octetos[3]+octo.substring(result),2)}`;
                                
                                mascaras.push(newMask);

                                return newMask;
                            }
                        }

                        //funcion para encontrar el numero de host
                    function foundHost(host,condicion=false){

                        let resultado;
                        let i=0;
                        while(!condicion){

                            resultado=(Math.pow(2,i)-2);
                            
                            if(resultado >= host){
                                indice=i;
                                return parseInt(resultado);
                            }

                            i++;
                            
                        }
                    }

                    function getIpdireccion(index,ip){

                        let mask=calculateMask(index).split('.');  
                        let Ip=getParam('ip').split('.');  
                        // let i=0;
                        
                        if(ip==getParam('ip')){

                            let newIp=`${Ip[0]}.${Ip[1]}.${Ip[2]}.${parseInt(mask[3])}`; 
                            direcciones.push(newIp);  
                            return getParam('ip');

                        }else{

                            let newIp=`${Ip[0]}.${Ip[1]}.${Ip[2]}.${parseInt(mask[3])}`; 
                            direcciones.push(newIp);

                            return direcciones[++banderillaIp];
                          

                        }

                    }

                    function getPrimeraIp(ip){

                        let Uip=ip.split('.');

                        Uip[3]=parseInt(Uip[3])+1;

                        return `${Uip[0]}.${Uip[1]}.${Uip[2]}.${Uip[3]}`;

                    }

                     function getUltimaIp(broad){

                        let Uip=broad.split('.');

                        Uip[3]=parseInt(Uip[3])-1;

                        return `${Uip[0]}.${Uip[1]}.${Uip[2]}.${Uip[3]}`;

                    }
                    
                    
                    //funcion para obtener el broadcast
                    function Broadcast(ip){

                        let Uip=ip.split('.');

                        Uip[3]=parseInt(Uip[3])-1;
                        
                        let newBroad=`${Uip[0]}.${Uip[1]}.${Uip[2]}.${Uip[3]}`;
                        broadcast.push(newBroad);
                        return newBroad;

                    }
            
           
                        
                }


                //funcion para obtener los parametros de la url 

                function getParam(param){

                        var sPaginaURL = window.location.search.substring(1);
                        var sURLVariables = sPaginaURL.split('&');
                        for (var i = 0; i < sURLVariables.length; i++) {
                            var sParametro = sURLVariables[i].split('=');
                            if (sParametro[0] == param) {
                            return sParametro[1];
                            }
                        }
                        return null;
                }









      

                    //funcion para encontrar el numero de host
                    const foundHost=(host,condicion=false)=>{

                        let resultado;
                        let i=0;
                        while(!condicion){
    
                            resultado=(Math.pow(2,i)-2);
                            
                            if(resultado >= host){
                                indice=i;
                                return parseInt(resultado);
                            }
    
                            i++;
                            
                        }
                        }
    
                        
                        //funcion para calcular la mascara
                        const calculateMask=(index)=>{
    
                            let mascara=mascara;
    
                            octetos=mascara.split('.');
    
                            if(!index){
                                return `${octetos[0]}.${octetos[1]}.${octetos[2]}.${parseInt("11111111",2)}`;
                            }else{
    
                                octetos[3]="";
    
                                let result=Math.abs(8-index);
                                octo="00000000";
                                
                                for(let i=0;i<result;i++){
                                    octetos[3]+='1';
                                }
                                mascara
                                let newMask=`${octetos[0]}.${octetos[1]}.${octetos[2]}.${parseInt(octetos[3]+octo.substring(result),2)}`;
                                
                                mascaras.push(newMask);
    
                                return newMask;
                            }
                        }
    
    
    
    const  getIpdireccion=(index,ip)=>{
    
    let mask=calculateMask(index).split('.');  
    let Ip=getParam('ip').split('.');  
    // let i=0;
    
    if(ip==getParam('ip')){
    
        let newIp=`${Ip[0]}.${Ip[1]}.${Ip[2]}.${parseInt(mask[3])}`; 
        direcciones.push(newIp);  
        return getParam('ip');
    
    }else{
    
        let newIp=`${Ip[0]}.${Ip[1]}.${Ip[2]}.${parseInt(mask[3])}`; 
        direcciones.push(newIp);
    
        return direcciones[++banderillaIp];
    
    
    }
    
    }
    
    const getPrimeraIp=(ip)=>{
    
    let Uip=ip.split('.');
    
    Uip[3]=parseInt(Uip[3])+1;
    
    return `${Uip[0]}.${Uip[1]}.${Uip[2]}.${Uip[3]}`;
    
    }
    
    const getUltimaIp=(broad)=>{
    
    let Uip=broad.split('.');
    
    Uip[3]=parseInt(Uip[3])-1;
    
    return `${Uip[0]}.${Uip[1]}.${Uip[2]}.${Uip[3]}`;
    
    }
    
    
    //funcion para obtener el broadcast
    const Broadcast=(ip)=>{
    
    let Uip=ip.split('.');
    
    Uip[3]=parseInt(Uip[3])-1;
    
    let newBroad=`${Uip[0]}.${Uip[1]}.${Uip[2]}.${Uip[3]}`;
    broadcast.push(newBroad);
    return newBroad;
    
    }
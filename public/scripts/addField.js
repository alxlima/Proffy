// -- modelo In-line(linha) comando padrão para iniciar consulta de objetos do javaScript executar ("") 
// document.querySelector('#container').style.backgroundColor="red";

// Comando para Procurar o Botão
document.querySelector("#add-time") // passo o ID="add-time" do botão
//ação quando clicar no botão
.addEventListener('click', cloneField)  // adiciono o listener(evento ouvidor) = 1°part-argument click , 2° parte-argument - ação do fazer

//Comando para executar chamada de uma ação exibindo no Log (console)
function cloneField() {
   //Testar Exibição Msg de Evento Button no Consulta
   // console.log("Chequei Aqui") // testo execução de evento na pagina crtl+F12/Console
 
   //Ação Duplicar os campos (schedule-item)-dias da semana/ times
   const newFildContainer = document.querySelector('.schedule-item').cloneNode(true) // [cloneNode] boolean- duplica objetos html -(True) pego all contudo div.

   //Ação pegar os Campos
   const fields = newFildContainer.querySelectorAll('input') // busca all tag imputs coloca na var fields 
   
   //Para cada Campo limpar - modo dinamico
   fields.forEach(function(field){  //add função pegar o field em run time dentro do forEach
      //Testar no console log.
      // console.log(field) 
      field.value = ""  
   })
 
   //Para cada Campo limpar - modo fixo(menos funcional -fica limitado quandidade de filds.) 
  // fields[0].value = ""
  // fields[1].value = ""

   //Testar no console log.
   //console.log(fields)// ver all posição
   //console.log(fields[0]) // ver posição = 0 
   //console.log(fields[0].value) //ver valor so  posição = 0 
   //console.log(fields[0].value="") // limpar so  posição = 0 
    
   //Ação Colocar objetos itens paginas
   document.querySelector('#schedule-items').appendChild(newFildContainer)  //add -[appendChild] - espera cloneNote (newFildContainer - var constante)
   

}


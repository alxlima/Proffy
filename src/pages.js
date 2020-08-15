
const Database = require('./database/db') // busca banco de dados

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')

 function pageLanding(req, res) {
     return res.render("index.html")
 }

async function pageStudy(req, res) {
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time) { // [!filters.subjects] - não existir [ || ] - ou 
        return res.render("study.html", { filters, subjects, weekdays }) // retorno const () int /utils/format
    }
     // executa função de converter horas em minutos  - exportada em pages.js
    const timeToMinutes = convertHoursToMinutes(filters.time) // [convertHoursToMinutes] -- converto

    const query = `
    SELECT classes.*, proffys.* 
    FROM proffys 
    JOIN classes ON (classes.proffy_id = proffys.id) 
    WHERE EXISTS (
        SELECT class_schedule.* 
        FROM class_schedule 
        WHERE class_schedule.class_id = classes.id 
        AND class_schedule.weekday = ${filters.weekday} 
        AND class_schedule.time_from <= ${timeToMinutes} 
        AND class_schedule.time_to > ${timeToMinutes}
    )
    AND classes.subject = '${filters.subject}'
    `
  
    // Caso haja Erro de consulta do banco de dados 
    try {
        const db = await Database
        const proffys = await db.all(query)
         //funcionalidade para ajustar o subject(matéria) number/String
         proffys.map((proffy) => {
             proffy.subject = getSubject(proffy.subject)
         })

        return res.render("study.html", { proffys, subjects, filters, weekdays })
    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res) {
    return res.render("give-classes.html", { subjects, weekdays })
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')
    
    // objetos -colecao de Proffys
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }
    
    // objetos -colecao de subjects()
    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }
    
     // objetos -// colecao de weekdays()
    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        // Receber os objetos saveClasses
        await createProffy(db, { proffyValue, classValue, classScheduleValues })
         
        // montar registros  da url 
        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString) // pagina + queryString de urls
    } catch (error) {
        console.log(error)
    }


}


// commando para exportar para o server.js
module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}

// ******  Anaotações complementares  *****/ // Funções  e processamentos logicos que retornan Rotas e objetos das paginas, Sem utilizar o Banco de Dados - o cadastro de Dados é Rum Time.
 // function pageLanding(req, res){
      //testar resposa de envio servidor
      //  return res.send("Hi from NLW")  // [req] é requisisão(pegar dados) - [res] é resposta (Mostrar resultado).
     // return res.sendfile(__dirname + "/views/index.html")  // [__dirname] =C:\nlw\src é caminho raiz do meu diretorio
 //     return res.render("index.html")   // [render]- renderizar pelo[nunjucks.configure('src/views'] o caminho raiz do meu diretorio configurado.
//  }


//  function pageStudy(req, res){
//      //return res.sendfile(__dirname + "/views/study.html")       // [resp] Rota - resultado na pagina.
//      //console.log(req.query) //[req.query é objeto de requisicao da page- { subject: '1', weekday: '0', time: '' }]
//      const filters = req.query  //var const filter, envido requisição para button filters
     
//      // [render] Rota - resultado na pagina/ usando renderização nunjucks
//      return res.render("study.html", { proffys ,filters, subjects, weekdays })  // {proffys}  pego colecao de proffs(argumentos) - passo chave {{proffys.objeto}} p/ pag.
//                                                                                 // {filters}  pego colecao de filters(argumentos) - passo chave {{filters.objeto}} p/ pag.
//                                                                                 // {subjects} pego colecao de subjects(argumentos)- passo chave {{subjects.objeto}} p/ pag.
//                                                                                 // {weekdays} pego colecao de weekdays(argumentos)- passo chave {{weekdays.objeto}} p/ pag.
                                                                             
//      // para testar nunjucks -passagem argumento 
//      // return res.render("study.html", { proffys, title:"Hi from Nunjucks" }) 
//      // return res.render("study.html", { alex: proffys[0], })  // return posição 0 de cadastro da colleção de proffs.
//  }

//  function pageGiveClasses(req, res){
//      //return res.sendfile(__dirname + "/views/give-classes.html") // [resp] Rota - resultado na pagina.
//      const data = req.query  //var const dados, envido requisição dados botao salvar cadastro
    
//      // verifico se tiver dados (data)
//      const isNotEmpty = Object.keys(data).length > 0 // pego chaves(data) do objetos e transformo em array[], valido comprimento[length>0] não é vazio 
//      if(isNotEmpty){
       
//        data.subject = getSubject(data.subject) //  return subject[position] na funcion

//        //Adicionar dados ao objetos a lista de proffys
//         proffys.push(data) // [push] --envio os dados 
       
//         return res.redirect("/study") // [redirect] - redirecionar pagina
//      }
    
//      // [render] Rota - resultado na pagina/ usando renderização nunjucks
//      return res.render("give-classes.html",{subjects, weekdays}) // {subjects, weekdays  } pego colecao de const (argumentos-dados)- passo chave {subjects} e {weekdays} p/ pag.
  
// //     //para testar dados recebidos
// //    // console.log(dados) //[req.query é objeto de requisicao da page-
// //         //evidencias de dados recebidos testes
// //         //    {
// //         //     name: 'Alex ',
// //         //     avatar: 'https://site.com',
// //         //     whatsapp: '23234',
// //         //     bio: 'att',
// //         //     subject: '2',
// //         //     cost: '01',
// //         //     weekday: [ '4', '0', '1' ],
// //         //     time_from: [ '05:15', '15:59', '12:32' ],
// //         //     time_to: [ '15:32', '04:59', '16:56' ]
// //         //   }
// }



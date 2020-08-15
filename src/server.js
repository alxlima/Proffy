// montar estrutura para receber dados cadastro ( Template Engine )

//const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages')


// Servidor
// Comando para chamar dependencias  Json
const express  = require('express')    // var Const express - executar requisição (express)
const server   = express()             // var Const server  - executar requeri () -devolve um objeto.

const { pageLanding, 
        pageStudy, 
        pageGiveClasses,
        saveClasses} = require('./pages') // retiro dentro do format.js(exportando objeto colection: subjects)

const nunjucks = require('nunjucks')   // var Const nunjucks  - importo ferramento template Engenier

// configurar nunjucks (Template - engine)
nunjucks.configure('src/views', {  
    express: server,                   // src/views 1° argumento, 2° argumento é o servidor express atual 
    noCache: true,                     // [noCache] - guarda em memoria- boolean : true - desativo o cache
})

// Inicio e configuração do servidor
server
//receber os dados do req.body
.use(express.urlencoded({ extended: true }))
// configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))         // [use] é funcionalidade de config. SERVIDOR. [express.static] arq. pasta public(img,css,Js etc)
// Rotas da aplicação
.get("/", pageLanding)                 // [Get] é funcionalidade do Exprees "/" é argumento. () => function curta. 
.get("/study", pageStudy)              // [Get] - chave - pag. Study
.get("/give-classes", pageGiveClasses) // [Get] - chave - pag. give-classes
.post("/save-classes", saveClasses)    // [post] - Criado para esconde s dados em Get pageGiveClasses
// Start do Servidor 
.listen(5500)                          //[listen]-- funcionalidade abrir porta 5500     


// Testar Função express
    //  function express(){
    //     return {         //função que retorno {} um objeto name.
    //         name:"Mayk", //name = objeto
    //         age: 3
    //     }
    //  }
    //  express().name
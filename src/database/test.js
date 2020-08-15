const Database = require('./db')  // [./] -- pasta atual
const createProffy = require('./createProffy') // esoirta a função de createProffy

Database.then(async(db)=>{    // (db)=> aro funcion)-- função curta
 
    //inserir dados -- Para testar o banco de Dados criado Sqlite.
    proffyValue = {
        name: "Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "89987654534", 
        bio: "Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",     
    }
     
    classValue = {
        subject: "Química", 
        cost: "20", 
     // proffy id virar pelo banco de dados
    }

    classScheduleValues = [
      //  class_id virá pelo banco de dados após cadastrarmos a class
     {
        weekday: 1,
        time_from: 720,
        time_to:1220,
      },
      {
        weekday: 0,
        time_from: 520,
        time_to:1220,
      }
     
    ]
 
    //  await createProffy(db, {proffyValue, classValue, classScheduleValues}) 

    //consultar os dados inseridos

    // todos os proffys
     const selectedProffs = await db.all("SELECT * FROM proffys")
        //console.log(selectedProffs)

     //consultar as classes de um determinado professor
     // e trazer junto os dados do professor
     const selectedClassesAndProffs = await db.all(`
         SELECT Classes.*, proffys.*
         FROM proffys
         JOIN classes ON (classes.proffy_id= proffys.id)
         WHERE classes.proffy_id= 1;'
         `)
        // console.log(selectedClassesAndProffs)

     // o horario que a pessoa trabalha, por exemplo, é das 8h - 18h
     // o horario do time_from (8h) precisa ser menor ou iqual ao horário solicitado
     // o time_to precisa ser acima

     const selectClassesSchedules = await db.all(`
          SELECT class_schedule.*
          FROM class_schedule
          WHERE class_schedule.class_id = "1"
          AND class_schedule.weekday = "0" 
          AND class_schedule.time_from <= "420" 
          AND class_schedule.time_to > "520" 
      `)

      console.log(selectClassesSchedules)
})
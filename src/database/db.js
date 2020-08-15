const Database = require('sqlite-async')


function execute(db){
    // criar as tabelas do banco de dados
    return db.exec(`
    CREATE TABLE IF NOT EXISTS proffys (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        whatsapp TEXT,
        bio TEXT
    );
    CREATE TABLE IF NOT EXISTS classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject INTEGER,
        cost TEXT,
        proffy_id INTEGER
    );
    CREATE TABLE IF NOT EXISTS class_schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class_id INTEGER,
        weekday INTEGER,
        time_from INTEGER,
        time_to INTEGER
    );
    `)
    
    //pra testar conexão
    //console.log("Chequei aqui")
    //console.log(db)
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute) // registro o arquivo no diretorio após execução
                                                                             // [module.exports]  exporto arquivos de fora Node identifica o required na operção. 
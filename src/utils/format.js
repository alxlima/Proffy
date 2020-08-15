const subjects = [ // colecao de subjects()
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [ // colecao de weekdays()
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

// Funcionalidades
function getSubject(subjectNumber){ // funçaõ para converter subject(matéria) de number para texto
    const position = +subjectNumber - 1 // pego a posição do arrya subject [+subjectNumber - 1] - number 1 numero - 1 number
      return subjects[position]
  } 

  // função onde corverto horas em minutos 
  function convertHoursToMinutes(time) {
    const [hour, minutes] = time.split(":") // [split]- usado como separadores valor de um objeto "hora" , "minutos"
    return Number((hour * 60) + minutes) // [Number] -retorno calculo da hora e mulplicado  por 60 minutos pegando o restante em minutos
}

  
 // commando para exportar para o server.js
 module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}
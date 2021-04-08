const parseArguments2 = (args: Array<String>): Array<number> => {
    if (args.length < 2) throw new Error('Need more arguments')
    // if (args.length > 4) throw new Error('Too many arguments')

    let exercises =[]

    for(let i = 3; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            exercises.push(Number(args[i]))
          } else {
            throw new Error('Provided values needs to be numbers!');
          }   
    }

    return exercises
     
}

const calculateExercises = (lista: Array<number>, target:number): Result => {

    const periodLength = lista.length
    const trainingDays = lista.filter(n => n > 0).length
    
    

    const average = lista.reduce((a,b) => a+b, 0) / lista.length
    let success
    if(average >= target) {
         success = true
    }
    else {success = false}
    
    let rating 

    if(average < 1) {
        rating = 1
    }else if (average > 1 && average < 2) {
        rating =2
    } else {
        rating=3
    }

    let ratingDescription

    if(rating === 0) {
        ratingDescription = 'terrible'
    } else if(rating === 1) {
        ratingDescription = 'not terrible but not great'
    }else {
        ratingDescription = 'great'
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }

}

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

try {
    const lista = parseArguments2(process.argv)
    let target
    if (!isNaN(Number(process.argv[2]))) {
         target = Number(process.argv[2])
      } else {
        throw new Error('Provided values needs to be numbers!');
      }   
    
    console.log(calculateExercises(lista, target))
}catch(error) {
    console.log('Error:', error.message)
}

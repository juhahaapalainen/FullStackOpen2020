interface Measurements {
    height: number,
    mass: number
}

const parseArguments = (args: Array<String>): Measurements => {
    if (args.length < 4) throw new Error('Need more arguments')
    if (args.length > 4) throw new Error('Too many arguments')

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          height: Number(args[2]),
          mass: Number(args[3])
        }
      } else {
        throw new Error('Provided values needs to be numbers!');
      }
}

const calculateBmi = (height: number, mass: number) : string => {
    if(height === 0) throw new Error('Divided by 0')
    const bmi = (mass/((height/100)*(height/100))) 

    if(bmi < 15) {
        return 'Very severely underweight'
    }
    else if(bmi > 15 && bmi < 16 ) {
        return 'Severely underweight'
    }
    else if(bmi > 16 && bmi < 18.5) {
        return 'Underweight'
    }
    else if(bmi > 18.5 && bmi < 25) {
        return 'Normal (healthy weight)'
    }
    else if(bmi > 25 && bmi < 30) {
        return 'Overweight'
    }
    else if(bmi > 30 && bmi < 35) {
        return 'Obese Class I (Moderately obese)'
    }
    else if(bmi > 35 && bmi < 40) {
        return 'Obese Class II (Severely obese)'
    }
    else {
        return 'Obese Class III (Very severely obese)'
    }
}

try {
    const {height, mass} = parseArguments(process.argv)
    console.log(calculateBmi(height,mass))
}catch(error) {
    console.log('Error:', error.message)
}
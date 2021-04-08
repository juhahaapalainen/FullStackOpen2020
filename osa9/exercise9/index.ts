import express from 'express';
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';

// const express = require('express');
const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;
    const bmi = calculateBmi(Number(height), Number(weight));

    if (isNaN(Number(height)) || isNaN(Number(weight)) || (typeof bmi != 'string')) {
        res.send({  
            error: "malformatted parameters"

        });
      } 
      else {
        res.send({
            weight,
            height,
            bmi
        });
      }

   
});

app.post('/exercises', (req, res) => {
    const dailyExercises = req.body.daily_exercises;
    const target = req.body.target;

    if(!dailyExercises || !target) {
        res.send({  
            error: "parameters missing"

        }).end()
    }
    else if(isNaN(Number(target)) || !Array.isArray(dailyExercises))  {
        res.send ({
            error: 'malformatted parameters'
        }).end()
    }
    else {
        res.send(calculateExercises(dailyExercises, target))
    };
      
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
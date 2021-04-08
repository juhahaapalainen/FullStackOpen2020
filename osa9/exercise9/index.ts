import express from 'express';
import {calculateBmi} from './bmiCalculator'

// const express = require('express');
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    var height = req.query.height
    var weight = req.query.weight
    var bmi = calculateBmi(Number(height), Number(weight))

    if (isNaN(Number(height)) || isNaN(Number(weight)) || (typeof bmi != 'string')) {
        res.send({  
            error: "malformatted parameters"

        })
      } 
      else {
        res.send({
            weight,
            height,
            bmi
        })
      }

   
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
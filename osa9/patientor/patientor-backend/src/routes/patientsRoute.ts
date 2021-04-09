/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {

  try{
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  }catch(error){
    res.status(400).send(error.message);
  }
  // const {name, dateOfBirth, gender, occupation, ssn} = req.body;
  // const newPatient = patientService.addPatient({
  //   name, 
  //   dateOfBirth, 
  //   gender, 
  //   occupation,
  //   ssn
  // });

  // res.json(newPatient);
});

export default router;
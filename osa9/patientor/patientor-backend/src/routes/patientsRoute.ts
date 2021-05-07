/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatient, { toNewEntry } from '../utils';

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
  
  
});

router.get("/:id", (req, res) => {
    try {
        const patient = patientService.getPatient(req.params.id);
        res.json(patient);
    } catch (error) {
        const message = (error as Error).message;
        res.status(404).send({ error: message });
    }
});

router.post('/:id/entries', (req, res) => {

    try {

        const patient = patientService.getPatient(req.params.id);
        if(!patient) {
            throw new Error("No patient found");
        }
        const newEntry = toNewEntry(req.body);
        const updatedPatient = patientService.addEntry(newEntry, patient);
        res.json(updatedPatient);

      
    } catch(error){
        res.status(400).send(error.message);
    }  
});

export default router;
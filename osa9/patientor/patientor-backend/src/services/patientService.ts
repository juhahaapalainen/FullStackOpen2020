import patientData from '../../data/patient.json';
import {Patient, NonSensitivePatients, NewPatient} from '../types';
import {v1 as uuid} from 'uuid';

const getPatients = ():Patient[] => {
    return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatients[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        
    }));
};

const getPatient = (id: string):Patient => {

    const foundPatient = patientData.find((patient) => patient.id === id);

    if(!foundPatient) {
        throw new Error("Patient not found!");
    }

    return foundPatient;
};
const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
        entries: []
    };

    patientData.push(newPatient);
    return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient
};


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

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };

    patientData.push(newPatient);
    return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};


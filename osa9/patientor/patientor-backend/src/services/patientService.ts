import patientData from '../../data/patient';
import {Patient, NonSensitivePatients, NewPatient, NewEntry} from '../types';
import {v1 as uuid} from 'uuid';

let patients: Patient[] = patientData;

const getPatients = ():Patient[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatients[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};

const getPatient = (id: string):Patient => {

    const foundPatient = patients.find((patient) => patient.id === id);

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

    patients.push(newPatient);
    return newPatient;
};

const addEntry = (newEntry: NewEntry, patient: Patient): Patient => {

    const entry = {
        id: uuid(),
        ...newEntry
    };

    const updatedPatient = {
        ...patient,
        entries: patient.entries.concat(entry)
    };

    patients = patients.map((p) => {
        if (p.id === updatedPatient.id) {
            return updatedPatient;
        }
        return p;
    });
    return updatedPatient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    getPatient,
    addEntry
};


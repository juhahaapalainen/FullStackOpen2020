import patientData from '../../data/patient.json';
import {Patient, NonSensitivePatients} from '../../types';

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


export default {
  getPatients,
  getNonSensitivePatients
};


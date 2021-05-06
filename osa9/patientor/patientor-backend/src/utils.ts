/*  eslint-disable @typescript-eslint/no-explicit-any */
import {Discharge, EntryType, Gender, HealthCheckRating, NewBaseEntry, NewEntry, NewPatient, SickLeave} from './types';

export const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
  
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
  
const parseDate = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};
  
const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
  
    return occupation;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
  
    return ssn;
};

type Fields = { name : unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, ssn: unknown };

const toNewPatient = ({ name, dateOfBirth, gender, occupation, ssn } : Fields): NewPatient => {

    const newPatient: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        ssn:parseSsn(ssn),
        entries: []
    };
  
    return newPatient;
};

const parseEntryType = (entryType: unknown): EntryType => {
    if(!isEntryType(entryType)) {
        throw new Error(`Wrong or missing type ${entryType || ""}`);
    }
    return entryType;
};

const isEntryType = (param: any): param is EntryType => {
    return Object.values(EntryType).includes(param);
};

const parseToString = (param: any, paramName: string): string => {
    if(!param || !isString(param)) {
        throw new Error(`Wrong or missing ${paramName || ""}`);
    }
    return param;
};

const parseHealthCheckRating = (hCRating: unknown): HealthCheckRating => {

    if( hCRating === null || hCRating === undefined
    || !isHealthCheckRating(hCRating)) {
        throw new Error(`Wrong or missing healthcheckrating ${hCRating ||""}`);
    }

    return hCRating;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
    const newBaseEntry:NewBaseEntry = {
        type: parseEntryType(object.type),
        description: parseToString(object.description, "description"),
        date: parseDate(object.date),
        specialist: parseToString(object.specialist, "specialist"),
    }; 

    return newBaseEntry;
};

const parseSickLeave = (object: any): SickLeave => {
    if(!object) throw new Error("Missing sickleave");

    return {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate)
    };
};

const parseDischarge = (object: any): Discharge => {
    if(!object) throw new Error("Missing sickleave");

    return {
        date: parseDate(object.date),
        criteria: parseToString(object.criteria, "discharge")
    };
};

export const toNewEntry = (object: any): NewEntry => {

    const newBaseEntry = toNewBaseEntry(object) as NewEntry;

    switch(newBaseEntry.type) {
    case EntryType.HealthCheck:
        return {
            ...newBaseEntry,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
        };
    case EntryType.OccupationalHealthcare:
        const newEntry = {
            ...newBaseEntry,
            employerName: parseToString(object.employerName, "employername"),

        };
        if(object.sickLeave) {
            newEntry.sickLeave= parseSickLeave(object.sickLeave);
        }
        return newEntry;
    case EntryType.Hospital:
        return {...newBaseEntry, discharge: parseDischarge(object.discharge)};
    default:
        return assertNever(newBaseEntry); 
    }

};

export default toNewPatient;
/*  eslint-disable @typescript-eslint/no-explicit-any */
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}
export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

interface BaseEntry {
  id: string;
  type: EntryType,
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    occupation: string;
    ssn: string;
    entries: Entry[]
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface SickLeave {
  startDate: string,
  endDate: string,
}

export interface Discharge {
  date: string,
  criteria: string,
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type NonSensitivePatients = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

export type NewBaseEntry = Omit<BaseEntry, "id">;

// type DistributiveOmit<T, K extends keyof any> = T extends any
//   ? Omit<T, K>
//   : never;

// export type NewEntry = DistributiveOmit<Entry, "id">;
export type NewEntry =
  | Omit<HospitalEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HealthCheckEntry, "id">;
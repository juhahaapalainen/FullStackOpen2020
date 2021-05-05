import React from "react";
import { useParams } from "react-router-dom";
import { setPatient, useStateValue } from "../state";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Header, Icon } from "semantic-ui-react";

const PatientPage = () => {

    
    const [{ patient }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const [{diagnoses}] = useStateValue();

    React.useEffect(() => { 
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          // dispatch({ type: "SET_PATIENT", payload: patientFromApi });
          dispatch(setPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatient();
    },[dispatch]);

    // console.log('ID:', id);
    // console.log('patients:', patients);
    //  console.log('PATIENT', patient);
    //  console.log('PATIENTNAME', patient?.name);

     const genderIcon = () => {
      if(patient?.gender === 'female') {
        return "venus";
      }
      else {
        return "mars";
      }
     };
     
     
console.log("Diagnoses:", diagnoses);
  return (
    <div>
        <Header size="large">{patient?.name} <Icon className={genderIcon()}></Icon></Header>
       <p>ssn: {patient?.ssn}</p> 
       <p>occupation: {patient?.occupation}</p>
       <Header size="medium">entries</Header>
       {patient?.entries?.map((entry: Entry) => (
         <div key={entry.id}>
       <div >{entry.date} {entry.description}</div>
       <div>{entry.diagnosisCodes?.map(code => 
       <li key={code}>{code} {code && diagnoses[code].name}</li> )}</div>
       </div>
       )
       )}
       
    </div>
     
  );
};

export default PatientPage;
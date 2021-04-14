import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
// import { Patient } from "../types";

const PatientPage = () => {

    
    const [{ patients }] = useStateValue();
    const { id } = useParams<{ id: string }>();

    // const foundPatient = patients.find(pat => pat.id === id);

    console.log('ID:', id);
    console.log('patients:', patients);
  return (
    <div>
        ID!!! {id}
        
    </div>
     
  );
};

export default PatientPage;
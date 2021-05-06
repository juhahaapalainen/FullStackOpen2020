import React from "react";
import { useParams } from "react-router-dom";
import { setPatient, useStateValue } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Button, Card, Header, Icon } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";


const PatientPage = () => {

    
    const [{ patient }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    // const [{diagnoses}] = useStateValue();

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
     
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = () => {
        console.log("entry");
    };
    // console.log("Diagnoses:", diagnoses);
    return (
        <div>
            <Header size="large">{patient?.name} <Icon className={genderIcon()}></Icon></Header>
            <p>ssn: {patient?.ssn}</p> 
            <p>occupation: {patient?.occupation}</p>
            <Header size="medium">entries</Header>
            <Card.Group>
                {patient?.entries?.map((entry) => (
                    <EntryDetails key={entry.id} entry={entry}/>
                )
                )}
            </Card.Group>
            
            <AddEntryModal 
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
            
        </div>
     
    );
};

export default PatientPage;
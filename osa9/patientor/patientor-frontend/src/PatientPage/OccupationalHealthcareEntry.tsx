import React from "react";
import { Card, Icon } from "semantic-ui-react";
import {OccupationalHealthcareEntry as OccupationalHealthcare} from "../types";

const OccupationalHealthcareEntry: React.FC<{entry: OccupationalHealthcare}> = ({entry}) => {
    console.log(entry);
    return (
        
        <Card fluid>
            <Card.Content>
                <Card.Header>{entry.date} <Icon className="stethoscope"></Icon> {entry.employerName} </Card.Header>
                <Card.Description>{entry.description}</Card.Description>
            </Card.Content>
        </Card>
    );
};

export default OccupationalHealthcareEntry;
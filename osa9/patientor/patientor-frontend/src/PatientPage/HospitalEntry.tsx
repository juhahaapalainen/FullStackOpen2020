import React from "react";
import { Card, Icon } from "semantic-ui-react";
import {HospitalEntry as Hospital} from "../types";

const HospitalEntry: React.FC<{entry: Hospital}> = ({entry}) => {
    console.log(entry);
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{entry.date} <Icon className="hospital"></Icon> </Card.Header>
                <Card.Description>{entry.description}</Card.Description>
                
            </Card.Content>
        </Card>
    );
};

export default HospitalEntry;
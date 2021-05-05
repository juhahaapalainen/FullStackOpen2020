import React from "react";
import { Card, Icon } from "semantic-ui-react";
import {HealthCheckEntry as HealthCheck} from "../types";

const HealthCheckEntry: React.FC<{entry: HealthCheck}> = ({entry}) => {
    console.log(entry);

    const healthRating = () => {
        if(entry.healthCheckRating === 0) {
            return "green"; 
        }
        if(entry.healthCheckRating === 1) {
            return "yellow"; 
        }
        if(entry.healthCheckRating === 2) {
            return "orange"; 
        }
        if(entry.healthCheckRating === 3) {
            return "red"; 
        }
    };
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{entry.date} <Icon className="doctor"></Icon> </Card.Header>
                <Card.Description>{entry.description}</Card.Description>
                <Card.Description><Icon className="heart" color={healthRating()}></Icon></Card.Description>
            </Card.Content>
        </Card>
      
    );
};

export default HealthCheckEntry;
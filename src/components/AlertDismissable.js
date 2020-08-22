import React, { useState } from "react";
import { Alert } from "react-bootstrap";

function AlertDismissible(props) {
    return (
        <Alert variant={props.variant || 'success'} onClose={props.close} dismissible>
            {
                props.heading && <Alert.Heading>{props.heading}</Alert.Heading>
            }
            <strong>{props.boldMessage}</strong>
            {props.message}
        </Alert>
    );
}

export default AlertDismissible
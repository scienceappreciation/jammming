import React from "react";
import './css/Alert.css';

function Alert(props) {
    if (props.isError) {
        // Login Error Element
        if (props.status === '401') {
            return (
                <div className="alert-container error">
                    <h2>Your login has expired.</h2>
                    <p>Sorry about that. You'll have to log in again.</p>
                    <button className="confirm-button" onClick={props.reset}>Reload</button>
                </div>
            );
        }
        // Error Element
        return (
            <div className="alert-container error">
                <h2>{`Error ${props.status}`}</h2>
                <p>{props.message}</p>
                <button className="confirm-button" onClick={props.onClose}>Ok</button>
            </div>
        );
    }

    // Success Element
    return (
        <div className="alert-container success">
            <h2>Success</h2>
            <p>{props.message}</p>
            <button className="confirm-button" onClick={props.onClose}>Ok</button>
        </div>
    );
}

export default Alert;
import React from "react";

function Track(props) {


    function onClick() {
        props.onRemove({ cover: props.cover, title: props.title, description: props.description });
    }

    return (<li>
        <img src={props.cover} alt={`${props.title} cover`} role="presentation" />
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <button className="rm-btn" onClick={onClick}>x Remove</button>
    </li>);
}

export default Track;
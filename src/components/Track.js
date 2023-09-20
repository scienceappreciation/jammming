import React from "react";

function Track(props) {


    function onClick() {
        props.onRemove(props.trackData);
    }

    return (<li>
        <img src={props.trackData.cover} alt={`${props.trackData.album} cover`} role="presentation" />
        <h2>{props.trackData.title}</h2>
        <span>{props.trackData.author}</span>
        <span>{props.trackData.album}</span>
        <button className="rm-btn" onClick={onClick}>x Remove</button>
    </li>);
}

export default Track;
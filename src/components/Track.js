import React from "react";
import styles from './css/Track.module.css';

function Track(props) {


    function onClick() {
        props.onRemove(props.trackData);
    }

    return (<li className={styles.card}>
        <img src={props.trackData.cover} alt={`${props.trackData.album} cover`} role="presentation" />
        <div>
            <h4>{props.trackData.title}</h4>
            <span>{`${props.trackData.author} - ${props.trackData.album}`}</span>
        </div>
        <button onClick={onClick}>X</button>
    </li>);
}

export default Track;
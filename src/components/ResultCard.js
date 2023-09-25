import React from 'react';
import styles from './css/ResultCard.module.css';

function ResultCard(props) {

    function onClick(e) {
        props.onAdd(props.trackData);
    }

    return (
        <li className={styles.card}>
            <img src={props.trackData.cover} alt={`${props.trackData.album} cover`} role="presentation" />
            <div>
                <h4>{props.trackData.title}</h4>
                <span>{`${props.trackData.author} - ${props.trackData.album}`}</span>
            </div>
            {!props.added && <button className='add-btn' onClick={onClick}>+  Add</button>}
            {props.added && <button className={styles.disabled} disabled>Added</button>}
        </li>
    );
}

export default ResultCard;
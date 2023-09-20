import React from 'react';

function ResultCard(props) {

    function onClick(e) {
        props.onAdd(props.trackData);
    }

    return (
        <li>
            <img src={props.trackData.cover} alt={`${props.trackData.album} cover`} role="presentation" />
            <h2>{props.trackData.title}</h2>
            <span>{props.trackData.author}</span>
            <span>{props.trackData.album}</span>
            <p>{props.trackData.description}</p>
            <button className='add-btn' onClick={onClick}>+  Add to Playlist</button>
        </li>
    );
}

export default ResultCard;
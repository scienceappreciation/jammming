import React from 'react';

function ResultCard(props) {

    function onClick(e) {
        props.onAdd({ cover: props.cover, title: props.title, description: props.description });
    }

    return (
        <li>
            <img src={props.cover} alt={`${props.title} cover`} role="presentation" />
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <button className='add-btn' onClick={onClick}>+  Add to Playlist</button>
        </li>
    );
}

export default ResultCard;
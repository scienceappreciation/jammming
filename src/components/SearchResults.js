import React from "react";
import ResultCard from './ResultCard';
import mainStyles from '../App.module.css';

function SearchResults(props) {
    function formatDataAsResult(data) {
        // Data is expected to be an Array of TrackData
        let resultCards = [];
        data.forEach((result, index) => {
            // 'cover' is a placeholder for the image used for the track.
            resultCards.push(<ResultCard key={`result_${index}`} trackData={result} onAdd={props.onAdd}/>)
        });
        return resultCards;
    }

    return (
    <div className={mainStyles.container}>
        <ul>
            {props.results ? formatDataAsResult(props.results) : <p>No results to show yet.</p>}
        </ul>    
    </div>);
}

export default SearchResults;
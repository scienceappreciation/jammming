import React from "react";
import ResultCard from './ResultCard';

function SearchResults(props) {
    function formatDataAsResult(data) {
        // Data is expected to be an Array of Objects
        let resultCards = [];
        data.forEach((result, index) => {
            // 'cover' is a placeholder for the image used for the track.
            resultCards.push(<ResultCard key={`result_${index}`} cover={result.cover} title={result.title} description={result.description} onAdd={props.onAdd}/>)
        });
        return resultCards;
    }

    return (
    <div>
        <ul>
            {props.results !== null ? formatDataAsResult(props.results) : <p>No results to show yet.</p>}
        </ul>    
    </div>);
}

export default SearchResults;
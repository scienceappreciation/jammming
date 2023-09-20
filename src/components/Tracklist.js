import React from "react";
import Track from './Track';

function TrackList(props) {

    function formatDataAsTracks(data) {
        // Data is assumed to be an array of objects
        let tracks = [];

        data.forEach((track, index) => {
            tracks.push(<Track key={`track_${index}`} cover={track.cover} title={track.title} description={track.description} onRemove={props.onRemove} />)
        });

        return tracks;
    }

    return(
    <div>
        <h3>Tracks</h3>
        { props.data.length > 0 ? <ol>{formatDataAsTracks(props.data)}</ol> : <span>Nothing here yet.</span>}
    </div>
    );
}

export default TrackList;
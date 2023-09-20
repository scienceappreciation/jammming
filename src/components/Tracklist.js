import React from "react";
import Track from './Track';
import styles from './css/TrackList.module.css';

function TrackList(props) {

    function formatDataAsTracks(data) {
        // Data is expected to be an array of TrackData
        let tracks = [];

        data.forEach((track, index) => {
            tracks.push(<Track key={`track_${index}`} trackData={track} onRemove={props.onRemove} />)
        });

        return tracks;
    }

    return(
    <div className={styles.container}>
        <h3>Tracks</h3>
        { props.data.length > 0 ? <ol>{formatDataAsTracks(props.data)}</ol> : <span>Nothing here yet.</span>}
    </div>
    );
}

export default TrackList;
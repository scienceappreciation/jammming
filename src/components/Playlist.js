import React from "react";
import TrackList from "./Tracklist";

function Playlist(props) {
    return (
    <div>
        <h2>Playlist</h2>
        <input type="text" id="playlist-title" placeholder="Title" aria-label="Playlist title" onChange={props.onTitleChange} value={props.title} />
        <TrackList data={props.trackList} onRemove={props.onRemove}/>
        <button id="spotify-submit">+ Add to Spotify</button>
    </div>);
}

export default Playlist;
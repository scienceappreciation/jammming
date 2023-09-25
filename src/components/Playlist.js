import React from "react";
import TrackList from "./Tracklist";
import mainStyles from '../App.module.css';
import styles from './css/PlayList.module.css';

import spotifyLogo from './img/spotify_icon.png';

function Playlist(props) {
    return (
    <div className={mainStyles.container}>
        <h3>Playlist</h3>
        <input className={styles["playlist-title"]} type="text" id="playlist-title" placeholder="Title" aria-label="Playlist title" onChange={props.onTitleChange} value={props.title} />
        <TrackList data={props.trackList} onRemove={props.onRemove}/>
        <button className={styles.spotify} id="spotify-submit" onClick={props.onSpotifySubmit}>+ Add to Spotify</button>
        <img className={styles["spotify-image"]} src={spotifyLogo} alt="spotify logo" />
    </div>);
}

export default Playlist;
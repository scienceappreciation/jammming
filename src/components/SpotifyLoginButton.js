import React from 'react';
import playListStyles from './css/PlayList.module.css';

function SpotifyLoginButton(props) {
    return (
    <div>
        <a href={props.url} className={playListStyles.spotify} style={{textDecoration: "none", marginLeft: "45%"}}>Authorize with Spotify</a>
    </div>)
}

export default SpotifyLoginButton;
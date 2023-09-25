/* React Components & Styles */
import React, { useState, useEffect } from 'react';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import SpotifyLoginButton from './components/SpotifyLoginButton';

import mainStyle from './App.module.css';

/* Extra Modules */
import TrackData from './classes/TrackData';
import './modules/Authorization/Authorization';
import { buildRequestUrl, formatParamsAsObject } from './modules/Authorization/Authorization';

/* TODO: Reduce Repetition */
/* TODO: Add real error handling for when we recieve an error object just in case */
/* TODO: Add a pretty alert element that indicates success or failure */
/* TODO: Fix the CSS */

function App() {

  const [ searchResults, setSearchResults ] = useState(null);
  const [ playListTitle, setPlayListTitle ] = useState('');
  const [ trackList, setTrackList ] = useState([]);
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ accessToken, setAccessToken ] = useState('');
  const [ searchQuery, setSearchQuery ] = useState('');

  const COMMON_HEADERS = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`
  };

  function validateAccess() {
    const urlParams = formatParamsAsObject(window.location.origin, window.location.href);

    const refreshUrl = () => window.location.href = window.location.origin;
    const logout = () => setLoggedIn(() => false);
    const clearToken = () => setAccessToken(() => '');
    const resetSession = () => { refreshUrl(); logout(); clearToken(); }

    if (urlParams["error"] && urlParams["error"] === "access_denied") {
      resetSession();
      return;
    }

    if (!urlParams['state']) return;

    // Since this point is unreachable otherwise, the following code assumes a valid session.
    const access_token = urlParams["access_token"];
    const expires_in_ms = urlParams["expires_in"] * 1000;
    setLoggedIn(() => true);
    setAccessToken(() => access_token);

    setTimeout(() => {resetSession()}, expires_in_ms);
  }

  useEffect(() => { validateAccess(); }, []);

  async function handleSearch(e) {
    e.preventDefault();

    const endpoint = "https://api.spotify.com/v1/search";
    const query = searchQuery;
    const type = "track";
    const market = "US";
    const limit = 10;
    const offset = 0;

    let requestUrl = endpoint;
    requestUrl += `?q=${encodeURIComponent(query)}`;
    requestUrl += `&type=${encodeURIComponent(type)}`;
    requestUrl += `&market=${encodeURIComponent(market)}`;
    requestUrl += `&limit=${encodeURIComponent(limit)}`;
    requestUrl += `&offset=${encodeURIComponent(offset)}`;

    await fetch(requestUrl, { 
      method: "GET",
      headers: COMMON_HEADERS
    }).then(async response => {
      const jsonResponse = await response.json();
      let results = [];

      if (jsonResponse.tracks.items.length <= 0) {
        setSearchResults(() => null);
        return;
      }

      for (const trackData of jsonResponse.tracks.items) {
        const uri = trackData.uri;
        const title = trackData.name;
        let author = "";
        
        for (const artist of trackData.artists) {
          author += artist.name + " ";
        }

        const album = trackData.album.name;
        const cover = trackData.album.images[trackData.album.images.length - 1].url;

        results.push(new TrackData(uri, title, author, album, cover));
      }

      setSearchResults(results);

    }).catch(e => {
        console.log(e);
        setSearchResults(() => null);
    });
  }

  async function handleSpotifySubmit() {
    if (trackList.length === 0) return alert("You don't have any saved tracks!");
    if (playListTitle.length === 0) return alert("You need to set a title!");

    let uris = [];
    for (const track of trackList) {
      uris.push(track.uri);
    }

    const userIdEndpoint = "https://api.spotify.com/v1/me";
    let user = null;

    await fetch(userIdEndpoint, {
        method: "GET",
        headers: COMMON_HEADERS
      }).then(async response => {
        user = await response.json();
      }).catch(e => {
        return alert(`User ID Request failed. Error: ${e}`);
      });

    const playlistCreateEndpoint = `https://api.spotify.com/v1/users/${user.id}/playlists`;
    const PLAYLIST_BODY = {
        name: playListTitle,
        description: "A custom playlist created through Jammming!",
        public: false
      };

      let playlist = null;
      await fetch(playlistCreateEndpoint, { method: "POST", headers: COMMON_HEADERS, body: JSON.stringify(PLAYLIST_BODY)
      }).then(async response => {
        playlist = await response.json();
      }).catch(e => {
        alert(`Error creating the Playlist: ${e}`);
        return;
      });
    
    const trackAddEndpoint = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`;
    const TRACK_BODY = {
        "uris": uris,
        "position": 0
    }

    await fetch(trackAddEndpoint, { method: "POST", headers: COMMON_HEADERS, body: JSON.stringify(TRACK_BODY) 
      }).then(async response => {
        const snapshot = await response.json();

        if (snapshot) return alert(`Playlist created successfully! ${snapshot.snapshot_id}`);

        alert("There was an error creating your playlist. Please try again.");
      }).catch(e => {
        return alert(`Error adding tracks: ${e}`);
      });
  }

  function handleQueryChange(e) { setSearchQuery(() => e.target.value); }

  function handleTitleChange(e) { setPlayListTitle(() => e.target.value); }

  function handleAdd(data) {
    // Expects Data to be TrackData
    setTrackList((prev) => {
      if (prev.some((track => TrackData.compare(track, data)))) return prev; // No duplicate tracks allowed
      return [data, ...prev];
    });
  }

  function handleRemove(data) {
    // Expects Data to be TrackData
    setTrackList((prev) => {
      return prev.filter(track => !TrackData.compare(track, data));
    });
  }

  if (!loggedIn) {
    return (<div>
      <h1 className={mainStyle["page-title"]}>Jammming</h1>
      <h2 className={mainStyle["page-subtitle"]}>An App for all of your playlist needs.</h2>
      <SpotifyLoginButton url={buildRequestUrl()} />
    </div>);
  }

  return (
    <div>
      <h1 className={mainStyle["page-title"]}>Jammming</h1>
      <h2 className={mainStyle["page-subtitle"]}>An App for all of your playlist needs.</h2>
      <SearchBar onSearch={handleSearch} query={searchQuery} onQuery={handleQueryChange}/>
      <SearchResults results={searchResults} onAdd={handleAdd}/>
      <Playlist onTitleChange={handleTitleChange} title={playListTitle} trackList={trackList} onRemove={handleRemove} onSpotifySubmit={handleSpotifySubmit}/>
    </div>
  );
}

export default App;

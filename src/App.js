import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import TrackData from './classes/TrackData';
import mainStyle from './App.module.css';
import './modules/Authorization/Authorization';
import { buildRequestUrl, formatParamsAsObject } from './modules/Authorization/Authorization';

import SpotifyLoginButton from './components/SpotifyLoginButton';

function App() {

  const [ searchResults, setSearchResults ] = useState(null);
  const [ playListTitle, setPlayListTitle ] = useState('');
  const [ trackList, setTrackList ] = useState([]);
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ accessToken, setAccessToken ] = useState('');
  const [ searchQuery, setSearchQuery ] = useState('');

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

  useEffect(() => {
    validateAccess();
  }, []);

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
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }  
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
        setSearchResults(() => null);
    });

  }

  function handleQueryChange(e) {
    const newQuery = e.target.value;
    setSearchQuery(() => newQuery);
  }

  function handleTitleChange(e) {
    const title = e.target.value;
    setPlayListTitle(() => title);
  }

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
      <Playlist onTitleChange={handleTitleChange} title={playListTitle} trackList={trackList} onRemove={handleRemove}/>
    </div>
  );
}

export default App;

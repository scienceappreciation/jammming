import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import TrackData from './classes/TrackData';
import mainStyle from './App.module.css';

/* TODO: App CSS */
/* TODO: Search CSS */
/* TODO: Results CSS */
/* TODO: Playlist CSS */
/* TODO: Tracks CSS */
/* TODO: Spotify Button CSS */

const mock_cover = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT39IVFHztC3vYZTT9k04c3x99_fytdXkQJH_ODRHb7eWe7S4f3";

const MOCK_TRACKS = [
  new TrackData("https://uri_1", "King of Meat", "Following the first ever tie episode, Mark and Bob attempt sharing host responsibilities, while Wade regales with tales of great and not so great eats.", "Markiplier", "Distractible", mock_cover),
  new TrackData("https://uri_2", "Mark Hates The Moon", "Mark explains his nearly inexplicable hatred toward a redditor who posts high resolution pictures of the moon and wonders if Bob and Wade have any similar situation.", "Markiplier", "Distractible", mock_cover),
  new TrackData("https://uri_3", "Whose Podcast Is It Anyway?", "Put on your Drew Carey glasses, hawaiian shirts, and bald caps! This episode is an homage to the show where everything is made up and the points don't matter!", "Markiplier", "Distractible", mock_cover)
];

function App() {

  const [ searchResults, setSearchResults ] = useState(null);
  const [ playListTitle, setPlayListTitle ] = useState('');
  const [ trackList, setTrackList ] = useState([]);

  function handleSearch(e) {
    e.preventDefault();
    setSearchResults(() => MOCK_TRACKS);
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

  return (
    <div>
      <h1 className={mainStyle["page-title"]}>Jammming</h1>
      <h2 className={mainStyle["page-subtitle"]}>An App for all of your playlist needs.</h2>
      <SearchBar onSearch={handleSearch}/>
      <SearchResults results={searchResults} onAdd={handleAdd}/>
      <Playlist onTitleChange={handleTitleChange} title={playListTitle} trackList={trackList} onRemove={handleRemove}/>
    </div>
  );
}

export default App;

import React from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import Tracklist from './components/Tracklist';

function App() {
  return (
    <>
      <h1>Jammming</h1>
      <span>An App for all of your playlist needs.</span>
      <SearchBar />
      <SearchResults />
      <Playlist />
      <Tracklist />
    </>
  );
}

export default App;

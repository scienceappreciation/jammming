import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';

function App() {

  const [ searchResults, setSearchResults ] = useState(null);
  const [ playListTitle, setPlayListTitle ] = useState('');
  const [ trackList, setTrackList ] = useState([]);

  function handleSearch(e) {
    e.preventDefault();
    setSearchResults(() => [{
      cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT39IVFHztC3vYZTT9k04c3x99_fytdXkQJH_ODRHb7eWe7S4f3",
      title: "King of Meat",
      description: "Following the first ever tie episode, Mark and Bob attempt sharing host responsibilities, while Wade regales with tales of great and not so great eats."
    }]);
  }

  function handleTitleChange(e) {
    const title = e.target.value;
    setPlayListTitle(() => title);
  }

  function handleAdd(data) {
    setTrackList((prev) => {
      if (prev.some((o => JSON.stringify(o) === JSON.stringify(data)))) return prev; // No duplicate tracks allowed

      return [data, ...prev];
    });
  }

  function handleRemove(data) {
    setTrackList((prev) => {
      return prev.filter(o => JSON.stringify(o) !== JSON.stringify(data)); // Shallow compare data
    });
  }

  return (
    <div>
      <h1>Jammming</h1>
      <span>An App for all of your playlist needs.</span>
      <SearchBar onSearch={handleSearch}/>
      <SearchResults results={searchResults} onAdd={handleAdd}/>
      <Playlist onTitleChange={handleTitleChange} title={playListTitle} trackList={trackList} onRemove={handleRemove}/>
    </div>
  );
}

export default App;

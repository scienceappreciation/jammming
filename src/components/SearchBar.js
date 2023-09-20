import React from "react";

function SearchBar(props) {
    return (<form onSubmit={props.onSearch}>
        <input type="search" id="search-bar" placeholder="Search for a Track" aria-label="Track Search"></input>
        <button type="submit" id="search-button">Search</button>
    </form>);
}

export default SearchBar;
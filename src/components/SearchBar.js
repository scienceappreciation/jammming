import React from "react";
import styles from './css/SearchBar.module.css';
import mainStyle from '../App.module.css';

function SearchBar(props) {
    return (<form onSubmit={props.onSearch} className={mainStyle.container}>
        <input name="query" className={styles.search} type="search" id="search-bar" value={props.query} onChange={props.onQuery} placeholder="Search for a track.." aria-label="Track Search" />
        <button className={styles.button} type="submit" id="search-button">Search</button>
    </form>);
}

export default SearchBar;
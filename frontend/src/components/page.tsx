"use client";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import "./page.css";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  function handleSearch() {
    setActiveSearch(search);
  }
  const movies = ["Alien", "Jaws", "Blade Runner"];
  const filterMovie = movies.filter((movie) =>
    movie.toLowerCase().includes(activeSearch.toLowerCase())
  );
  const resultFilter = filterMovie.map((movie) => <li key={movie}>{movie}</li>);

  let resultSearch;
  if (resultFilter.length === 0) {
    resultSearch = <p>Aucun film trouvé</p>;
  } else {
    resultSearch = <ul>{resultFilter}</ul>; //une <ul> doit contenir des <li>
  }

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Recherche..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          <FaSearch className="search-icon" />
        </button>
      </div>
      {resultSearch}
    </div>
  );
}

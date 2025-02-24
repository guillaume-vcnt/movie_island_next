'use client'

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./page.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // Ajoutez ici la logique de recherche
    console.log("Recherche pour :", searchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch} className="search-button">
        <FaSearch className="search-icon" />
        <span className="sr-only">Recherche</span>
      </button>
    </div>
  );
};

export default SearchBar;
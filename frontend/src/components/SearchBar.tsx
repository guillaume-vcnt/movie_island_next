"use client";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSearch() {
    if (search.trim() === "") return; // Si la recherche est vide, ne rien faire
    // Rediriger vers la page de résultats de recherche
    router.push(`/searching/${search}`);
  }
  return (
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
  );
}

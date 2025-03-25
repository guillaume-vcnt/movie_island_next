"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { Movie } from "@/types/globals";

export default function HomePage() {
  const [data, setData] = useState<Movie[]>([]); // Typage avec Movie[]
  console.log("Données reçues:", data); // Log des données pour vérifier

  useEffect(() => {
    // Exemple : un fetch pour récupérer des données
    const fetchData = async () => {
      // Ce code s'exécute après le premier rendu du composant (équivalent à componentDidMount en class component)
      try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          //credentials: "same-origin",
          //cache: "no-store", // Désactive le cache pour un rendu dynamique
        });

        // Parse la réponse en JSON.
        const result = await data.json();
        console.log("Données reçues:", result);

        // Mettre à jour l'état avec les données récupérées
        setData(result.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData(); // Appel de la fonction async pour récupérer les données
  }, []);

  return (
    <>
      <div id="title" className="flex justify-center mt-[1rem] mb-[1rem]">
        <Link className="font-bold" href="/">
          MOVIE ISLAND HOME PAGE
        </Link>
      </div>
      <div id="search-bar" className="flex justify-center mb-[1rem]">
        <SearchBar />
      </div>
      <div id="filter" className="flex justify-center gap-5 mb-[1.5rem]">
        <Link className="font-bold" href={"/movie/genre/Horror"}>
          Horror
        </Link>
        <Link className="font-bold" href={"/movie/genre/Adventure"}>
          Adventure
        </Link>
        <Link className="font-bold" href={"/movie/genre/Science-Fiction"}>
          Science-Fiction
        </Link>
      </div>
      <div id="movies" className="flex justify-center gap-5">
        {data.map((movie) => (
          <div key={movie.id}>
            <Link href={`/movie/${movie.id}`}>
              <Image
                src={movie.poster}
                alt="Poster du film"
                width={100}
                height={60}
              />
            </Link>
          </div>
        ))}
      </div>
      ;
    </>
  );
}

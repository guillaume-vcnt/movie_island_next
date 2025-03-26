"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types/globals";

export default function MoviePage({
  params,
}: {
  readonly params: { id: string };
}) {
  const [id, setId] = useState<string | null>(null);
  const [movieArray, setMovieArray] = useState<Movie[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Utilisation de React.use() pour extraire les paramètres
  const movieId = React.use(params).id;

  // Mettre l'ID dans l'état si ce n'est pas encore fait
  useEffect(() => {
    if (movieId) {
      setId(movieId); // On assigne l'ID dans l'état
    }
  }, [movieId]);

  // Utilisation du useEffect pour récupérer les données de l'API
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const data = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/movie/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              //credentials: "same-origin", //Désactive le cache pour un rendu dynamique
              //cache: "no-store", //
              //  Désactive le cache pour un rendu dynamique
            }
          );

          // Parse la réponse en JSON.
          const idMovie = await data.json();
          console.log("🎥", idMovie);

          // Typifier idMovie.data comme étant un tableau de films
          const movieArray: Movie[] = idMovie.data;
          console.log("🎥", movieArray);
          //movieArray est déjà typé comme un tableau de films (Movie[]). En TypeScript, un tableau n'a pas de propriété data par défaut. Ce qui signifie que l'accès à movieArray.data est invalide ici car movieArray est un tableau, pas un objet avec une propriété data.

          setMovieArray(idMovie.data); // Met à jour les films
        } catch (error) {
          console.error("Erreur lors de la récupération des films :", error);
        }
      };
      fetchData();
    }
  }, [id]);

  // Vérification si le film est dans les favoris
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") ?? "[]"
    );
    setIsFavorite(storedFavorites.includes(id)); // Met à jour l'état des favoris
  }, [id]);

  // Fonction pour ajouter ou retirer un film des favoris
  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") ?? "[]"
    );
    if (storedFavorites.includes(id)) {
      const updatedFavorites = storedFavorites.filter(
        (favoriteId: string) => favoriteId !== id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false); // Retirer le film des favoris
    } else {
      const updatedFavorites = [...storedFavorites, id];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(true); // Ajouter le film aux favoris
    }
  };

  return (
    <>
      <div id="movie" className="flex justify-center mt-[1rem] mb-[1rem]">
        {movieArray.map((movie) => (
          <div className="flex flex-col" key={movie.id}>
            <h2 className="self-center font-bold">{movie.title}</h2>
            <div className="mt-[1rem] mb-[1rem]">
              <p>Director: {movie.director}</p>
              <p>Genre: {movie.genre}</p>
              <p>Year: {movie.year}</p>
              <p>Duration: {movie.duration} minutes</p>
              <p>Audience: {movie.audience}</p>
            </div>
            <Image
              src={movie.poster}
              alt="Poster du film"
              width={100}
              height={150}
              style={{ width: 'auto', height: 'auto' }}  // Garantir le respect du ratio avec CSS
              priority // Ajoute cette propriété pour que l'image soit chargée en priorité
            />
            <button
              id="favoris-button"
              className="mt-[1rem]"
              onClick={toggleFavorite}
            >
              {isFavorite ? "⭐ Remove from favorites" : "⭐ Add to favorites"}
            </button>
          </div>
        ))}
      </div>
      <Link
        className="flex justify-center font-bold text-red-500 hover:text-red-800"
        href={`/movie/${id}/quiz`}
      >
        Start Quiz
      </Link>
      <Link className="flex justify-center" href="/">
        Return to home page
      </Link>
    </>
  );
}

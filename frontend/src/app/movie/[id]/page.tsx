import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types/globals";

export default async function movieIdPage({
  params,
}: {
  readonly params: { id: string };
}) {
  const { id } = params;
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    //credentials: "same-origin", //Désactive le cache pour un rendu dynamique
    //cache: "no-store", //
    //  Désactive le cache pour un rendu dynamique
  });

  // Parse la réponse en JSON.
  const idMovie = await data.json();
  console.log("🎥", idMovie);

  // Typifier idMovie.data comme étant un tableau de films
  const movieArray: Movie[] = idMovie.data;
  console.log("🎥", movieArray);
  //movieArray est déjà typé comme un tableau de films (Movie[]). En TypeScript, un tableau n'a pas de propriété data par défaut. Ce qui signifie que l'accès à movieArray.data est invalide ici car movieArray est un tableau, pas un objet avec une propriété data.

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
              className="self-center"
              src={movie.poster}
              alt="Poster du film"
              width={100}
              height={60}
            />
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

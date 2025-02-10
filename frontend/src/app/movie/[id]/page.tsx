import Link from "next/link";
import Image from "next/image";

interface Movie {
  id: number;
  director: string;
  title: string;
  genre: string;
  year: number;
  duration: number;
  audience: string;
  poster: string;
}

export default async function moviePage({
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
      <ul>
        {movieArray.map((movie) => (
          <li key={movie.id}>
            <h2 className="font-bold">{movie.title}</h2>
            <p>Director: {movie.director}</p>
            <p>Genre: {movie.genre}</p>
            <p>Year: {movie.year}</p>
            <p>Duration: {movie.duration} minutes</p>
            <p>Audience: {movie.audience}</p>
            <br></br>
            <Image
              src={movie.poster}
              alt="Poster du film"
              width={100}
              height={60}
            />
          </li>
        ))}
      </ul>
      <br></br>
      <Link
        className="text-red-500 hover:text-red-800"
        href={`/movie/${id}/quiz`}
      >
        Start Quiz
      </Link>
      <br></br>
      <br></br>
      <Link href="/">Return Home page</Link>
    </>
  );
}

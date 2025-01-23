import Link from "next/link";

interface Movie {
  id: number;
  director: string;
  title: string;
  genre: string;
  year: number;
  duration: number;
  audience: string;
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
    cache: "no-store", // Désactive le cache pour un rendu dynamique
  });

  // Parse la réponse en JSON.
  const idMovie = await data.json();
  //Affiche l'objet dans la console
  console.log("🎥", idMovie);

  // Typifier idMovie.data comme étant un tableau de films
  const movieArray: Movie[] = idMovie.data;
  //Affiche l'objet dans la console
  console.log(movieArray);
  //Le problème est que movieArray est déjà typé comme un tableau de films (Movie[]). En TypeScript, un tableau n'a pas de propriété data par défaut. Ce qui signifie que l'accès à movieArray.data est invalide car movieArray est un tableau, pas un objet avec une propriété data.

  return (
    <>
    <Link href="/">Return Home page</Link>
    <br></br>
    <br></br>
      <ul>
        {movieArray.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Director: {movie.director}</p>
            <p>Genre: {movie.genre}</p>
            <p>Year: {movie.year}</p>
            <p>Duration: {movie.duration} minutes</p>
            <p>Audience: {movie.audience}</p>
          </li>
        ))}
      </ul>
      <br></br>
      <Link className="text-red-500 hover:text-red-700" href="/quiz">Start Quiz</Link>
    </>
  );
}

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
  readonly params: { genre: string };
}) {
  const { genre } = params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie?genre=${genre}`,
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
  const genreMovie = await data.json();
  console.log("🎥", genreMovie);

  // Typifier idMovie.data comme étant un tableau de films
  const movieArray: Movie[] = genreMovie.data;
  console.log("🎥", movieArray);
  //movieArray est déjà typé comme un tableau de films (Movie[]). En TypeScript, un tableau n'a pas de propriété data par défaut. Ce qui signifie que l'accès à movieArray.data est invalide ici car movieArray est un tableau, pas un objet avec une propriété data.

  return (
    <>
      <p>Page {genre}</p>
      <br></br>
      <Link href="/">Return Home page</Link>
      <br></br>
      <br></br>
      <ul>
        {movieArray.map((movie) => (
          <li key={movie.id}>
            <Link href={`/movie/${movie.id}`}>
              {movie.title}
              <Image
                src={movie.poster}
                alt="Poster du film"
                width={100}
                height={60}
              />
            </Link>
            <Link
              className="text-red-500 hover:text-red-800"
              href={`/movie/${movie.id}/quiz`}
            >
              Start Quiz
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

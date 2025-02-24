import Link from "next/link";
import Image from "next/image";
import SearchBar from "../components/page";

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

export default async function Home() {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      //credentials: "same-origin", //Désactive le cache pour un rendu dynamique
      //cache: "no-store", //
      //  Désactive le cache pour un rendu dynamique
    });

    // Parse la réponse en JSON.
    const allMovies = await data.json();
    console.log(allMovies);

    // Typifier allMovies.data comme étant un tableau de films
    const movieArray: Movie[] = allMovies.data;
    console.log(allMovies.data);
    //allMovies est un objet qui contient une clé data, ce qui permet de typifier correctement allMovies.data comme un tableau de films (Movie[]).

    return (
      <>
        <ul>
          <Link className="font-bold" href="/">
            Home Page
          </Link>

          <SearchBar/>

          <br></br>
          <br></br>
          <Link className="font-bold text-red-500" href={"/movie/genre/Horror"}>
            Horror
          </Link>
          <br></br>
          <Link className="font-bold text-red-500" href={"/movie/genre/Adventure"}>
            Adventure
          </Link>
          <br></br>
          <Link className="font-bold text-red-500" href={"/movie/genre/Science-fiction"}>
          Science-fiction
          </Link>
          <br></br>
          <br></br>
        </ul>

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
            </li>
          ))}
        </ul>
        <br></br>
      <br></br>
      <Link href="/">Return Home page</Link>
      </>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

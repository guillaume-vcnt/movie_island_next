import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types/globals";

export default async function MovieGenrePage({
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
    <div id="genre" className="flex justify-center mt-[1rem]">
      <div className="flex flex-col">
        <h1 className="self-center font-bold">Page {genre}</h1>
        <div id="movies" className="flex mt-[1rem] mb-[1rem] gap-5">
          {movieArray.map((movie) => (
            <div key={movie.id}>
              <Link href={`/movie/${movie.id}`}>
                {movie.title}
                <Image
               src={movie.poster}
               alt="Poster du film"
               width={100}
               height={150}
               style={{ width: 'auto', height: 'auto' }}  // Garantir le respect du ratio avec CSS
               priority // Ajoute cette propriété pour que l'image soit chargée en priorité
                />
              </Link>
            </div>
          ))}
        </div>
        <Link className="self-center" href="/">
          Return to home page
        </Link>
      </div>
    </div>
  );
}

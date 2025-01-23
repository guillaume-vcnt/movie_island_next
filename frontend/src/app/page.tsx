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

export default async function Home() {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`, {
      // Facultatif en GET car méthode par défaut pour les requêtes HTTP envoyées par le navigateur. Utile avec POST, PUT, PATCH pour spécifier la méthode de la requête.
      method: "GET",
      headers: {
        // Facultatif en GET mais utile avec POST PUT PATCH si le serveur attend un certain type de contenu.
        "Content-Type": "application/json",
      },
    });

    // Parse la réponse en JSON.
    const allMovies = await data.json();
    //Affiche l'objet dans la console
    console.log(allMovies);

    // Typifier allMovies.data comme étant un tableau de films
    const movieArray: Movie[] = allMovies.data;
    //Affiche l'objet dans la console
    console.log(allMovies.data);
    //Dans ce cas, allMovies serait un objet qui contient bien une clé data, ce qui permet de typifier correctement allMovies.data comme un tableau de films (Movie[]).

    return (
      <>
        <ul>
          <Link href="/">Home Page</Link>
        </ul>

        <br></br>

        <ul>
          {movieArray.map((movie) => (
            <li key={movie.id}>
              <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

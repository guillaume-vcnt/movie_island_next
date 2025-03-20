import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types/globals";

export default async function SeachingPage({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("recherche :", slug);
  try {
    console.log(
      "🔍 Requête envoyée :",
      `${process.env.NEXT_PUBLIC_API_URL}/movie?searching=${slug}`
    );

    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/movie?searching=${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resultFetch = await data.json();
    console.log("📥 Données brutes reçues :", resultFetch);
    const movieArray: Movie[] = resultFetch.data;
    console.log("🎥", movieArray);
    if (movieArray.length === 0) {
      return (
        <div>
          <Link href="/">Return Home Page</Link>
          <br></br>
          <br></br>
          <p>❌ Aucun films trouvés</p>
        </div>
      );
    }

    return (
      <div>
        <Link href="/">Return Home Page</Link>
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
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }

  return (
    <div>
      <Link href="/">Return Home Page</Link>
      <br></br>
      <br></br>
      <p>❌ Une erreur est survenue lors du chargement des films.</p>
    </div>
  );
}

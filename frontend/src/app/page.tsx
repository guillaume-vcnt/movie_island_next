export default async function Page() {
  const data = await fetch("http://localhost:3001/api/movies/all");
  const allPosts = await data.json();
  console.log(allPosts)
  return (
    <ul>
      {allPosts.data.map((movie) => (
        <li key={movie.movie_id}>{movie.title}</li>
      ))}
    </ul>
  );
}

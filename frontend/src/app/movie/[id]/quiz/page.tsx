import Link from "next/link";

export default async function quizPage({
  params,
}: {
  readonly params: { id: string };
}) {
  const { id } = await params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/${id}/quiz`,
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
  const movieQuiz = await data.json();
  console.log(movieQuiz.quiz);

  return (
    <>
      <h1 className="font-bold">Page du Quiz</h1>
      <br></br>
      <p className="text-red-500">Question:</p> {movieQuiz.quiz.question}
      <p className="text-red-500">Answers:</p> {movieQuiz.quiz.answers}
      <p className="text-red-500">Correct answers:</p>{" "}
      {movieQuiz.quiz.correct_answer}
      <br></br>
      <br></br>
      <Link href={`/movie/${id}`}>Return Movie page</Link>
    </>
  );
}

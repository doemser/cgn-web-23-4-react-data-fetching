import { useState } from "react";
import useSWR from "swr";

export default function HomePage() {
  const [id, setId] = useState(0);
  const { data, error, isLoading } = useSWR(
    `https://example-apis.vercel.app/api/bad-jokes/${id}`
  );

  function handlePrevJoke() {
    setId(data.prevId);
  }

  function handleNextJoke() {
    setId(data.nextId);
  }

  const [funnyJokes, setFunnyJokes] = useState([]);

  function handleFunnyJokes(id) {
    if (funnyJokes.includes(id)) {
      setFunnyJokes(funnyJokes.filter((joke) => joke !== id));
    } else {
      setFunnyJokes([...funnyJokes, id]);
    }
  }

  if (error) {
    return <h1>Oops.. error.</h1>;
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <small>ID: {id}</small>
      <h1>{data.joke}</h1>
      <div>
        <button type="button" onClick={handlePrevJoke}>
          ← Prev Joke
        </button>
        <button type="button" onClick={handleNextJoke}>
          Next Joke →
        </button>
      </div>
      <button type="button" onClick={() => handleFunnyJokes(id)}>
        {funnyJokes.includes(id) ? "😂 is Funny" : "😐 is not Funny"}
      </button>
    </>
  );
}

const x = () => true;
const y = () => {
  console.log();
  return true;
};

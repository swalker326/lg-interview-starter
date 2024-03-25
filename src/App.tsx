import { useEffect, useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

function App() {
  // const [characters, setCharacters] = useState([]);

  const fetchAlbus = async () => {
    const res = await fetch(
      "https://api.potterdb.com/v1/characters?filter[name_cont]=Albus"
    );
    const data = await res.json();
    return data.data;
  };

  const {
    isLoading,
    error,
    isError,
    data: characters,
  } = useQuery({
    queryKey: ["albus"],
    queryFn: fetchAlbus,
  });

  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch(
  //       "https://api.potterdb.com/v1/characters?filter[name_cont]=Albus"
  //     );
  //     const data = await res.json();
  //     console.log(data);
  //     setCharacters(data.data);
  //   })();
  // }, []);

  if (isLoading) return <div>loading...</div>;

  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      <div>
        <h2>Hello</h2>
        <p>
          For this interview, you'll be utilizing the{" "}
          <a href='https://docs.potterdb.com/apis/rest'>Potter DB</a> to fetch a
          list of characters from Harry Potter. We would like you to retrieve
          all characters who's name matches 'albus'
        </p>
      </div>
      <ul>
        {characters.map((char) => (
          <li key={char.id}>{char.attributes.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

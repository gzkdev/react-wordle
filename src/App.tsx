import { useEffect, useState } from "react";
import WordGrid from "./components/WordGrid";

function App() {
  const [solution, setSolution] = useState("");

  async function fetchSolutions() {
    try {
      let req = await fetch(`http://localhost:3001/solutions`);
      let res = await req.json();
      let randomSolution = res[Math.floor(Math.random() * res.length)];
      setSolution(randomSolution.word);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchSolutions();
  }, []);

  return (
    <div className="App">
      <h1>React Wordle App</h1>
      {/* {solution && <h3>{solution}</h3>} */}
      {solution && <WordGrid solution={solution} />}
    </div>
  );
}

export default App;

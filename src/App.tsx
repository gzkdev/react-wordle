import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

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
      {/* {solution && <h3>{solution}</h3>} */}
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;

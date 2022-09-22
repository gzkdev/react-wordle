import { useEffect } from "react";
import useWordle from "../hooks/useWordle";

interface WordGridProp {
  solution: string;
}

function WordGrid({ solution }: WordGridProp) {
  const { currentGuess, handleKeyUp } = useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
    return;
  }, [handleKeyUp]);
  return (
    <div>
      WordGrid {solution}
      <div>Current Guess - {currentGuess}</div>
    </div>
  );
}

export default WordGrid;

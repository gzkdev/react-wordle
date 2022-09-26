import { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import KeyPad from "./KeyPad";

interface WordleProp {
  solution: string;
}

function Wordle({ solution }: WordleProp) {
  const { currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
    return;
  }, [handleKeyUp]);

  useEffect(() => {}, [guesses, turn, isCorrect]);
  return (
    <div>
      {/* Wordle {solution}
      <div>Current Guess - {currentGuess}</div> */}
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <KeyPad usedkeys={usedKeys} />
    </div>
  );
}

export default Wordle;

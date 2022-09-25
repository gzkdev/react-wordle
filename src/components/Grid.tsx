import React from "react";
import { Guess } from "../hooks/useWordle";
import Row from "./Row";

interface Prop {
  currentGuess: string;
  guesses: (Guess[] | undefined)[];
  turn: number;
}

function Grid({ currentGuess, guesses, turn }: Prop) {
  return (
    <div className="Grid">
      {guesses.map((guess, idx) => {
        return <Row key={idx} />;
      })}
    </div>
  );
}

export default Grid;

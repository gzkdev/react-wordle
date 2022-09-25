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
        if (turn == idx) {
          return <Row key={idx} currentGuess={currentGuess} />;
        }
        return <Row key={idx} guess={guess} />;
      })}
    </div>
  );
}

export default Grid;

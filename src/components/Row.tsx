import { Guess } from "../hooks/useWordle";
interface Prop {
  guess?: Guess[] | undefined;
  currentGuess?: string;
}

function Row({ guess, currentGuess }: Prop) {
  if (guess) {
    return (
      <div className="Row past">
        {guess.map((char, idx) => {
          return (
            <div key={idx} className={`Box ${char.color}`}>
              {char.key}
            </div>
          );
        })}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split("");
    return (
      <div className="Row current">
        {letters.map((letter, idx) => {
          return (
            <div className="Box filled" key={idx}>
              {letter}
            </div>
          );
        })}
        {[...Array(5 - letters.length)].map((_, idx) => {
          return <div className="Box" key={idx}></div>;
        })}
      </div>
    );
  }
  return (
    <div className="Row">
      <div className="Box"></div>
      <div className="Box"></div>
      <div className="Box"></div>
      <div className="Box"></div>
      <div className="Box"></div>
    </div>
  );
}

export default Row;

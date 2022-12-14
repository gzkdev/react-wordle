import { useState } from "react";

/**
 * Interface of a Guess object
 */
export interface Guess {
  key: string;
  color: string;
}

export interface UsedKeys extends Record<string, any> {}

export default function useWordle(solution: string) {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<Array<Guess[] | undefined>>([
    ...Array(6),
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [isCorrect, setisCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState<UsedKeys>({});

  /**
   * Format a guess into an array of letter objects e.g [{key: 'a', color: 'yellow'}]
   */
  function formatGuess() {
    let solutionArray: Array<string | null> = [...solution];
    let formatedGuess: Array<Guess> = [...currentGuess].map((char) => {
      return { key: char, color: "grey" };
    });

    formatedGuess.forEach((char, i) => {
      if (solutionArray[i] === char.key) {
        formatedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    formatedGuess.forEach((char, i) => {
      if (solutionArray.includes(char.key) && char.color !== "green") {
        formatedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(char.key)] = null;
      }
    });

    return formatedGuess;
  }

  function addNewGuess(formattedGuess: Guess[]) {
    if (currentGuess === solution) {
      setisCorrect(true);
    }

    setGuesses((guesses) => {
      let newGuesses = [...guesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((history) => {
      return [...history, currentGuess];
    });

    setTurn((turn) => turn + 1);

    setUsedKeys((usedKeys) => {
      formattedGuess.forEach((guess) => {
        let currentColor = usedKeys?.[guess.key];

        if (guess.color === "green") {
          return (usedKeys[guess.key] = "green");
        }

        if (guess.color === "yellow" && currentColor !== "green") {
          return (usedKeys[guess.key] = "yellow");
        }

        if (guess.color === "grey" && currentColor !== ("green" || "yellow")) {
          return (usedKeys[guess.key] = "grey");
        }
      });

      return usedKeys;
    });

    setCurrentGuess("");
  }

  function handleKeyUp(e: KeyboardEvent) {
    if (e.key === "Enter") {
      if (turn > 5) {
        return console.log("You used all your guesses");
      }

      if (history.includes(currentGuess)) {
        return console.log("You already tried the word");
      }

      if (currentGuess.length !== 5) {
        return console.log("Word must be 5 letters long");
      }

      const formattedGuess = formatGuess();
      addNewGuess(formattedGuess);
    }

    if (e.key === "Backspace") {
      return setCurrentGuess((currentGuess) => currentGuess.slice(0, -1));
    }

    if (/^[A-Za-z]$/.test(e.key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((currentGuess) => currentGuess + e.key);
      }
    }
  }

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    handleKeyUp,
    usedKeys,
  };
}

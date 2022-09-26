import { useEffect, useState } from "react";
import { UsedKeys } from "../hooks/useWordle";

interface Prop {
  usedkeys: UsedKeys;
}

function KeyPad({ usedkeys }: Prop) {
  const [letters, setLetters] = useState<any[]>([]);

  async function fetchLetters() {
    try {
      let res = await fetch("http://localhost:3001/letters");
      let data = await res.json();
      setLetters(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchLetters();
    console.log("used keys", usedkeys);
  }, []);

  return (
    <div className="KeyPad">
      {letters &&
        letters.map((l: any, idx) => {
          return (
            <div className="Key" data-color={usedkeys?.[l.key]} key={idx}>
              {l.key}
            </div>
          );
        })}
    </div>
  );
}

export default KeyPad;

import { useEffect, useState } from "react";

import useRickAndMorty from "../../services/RickAndMorty";
import Spinner from "../spinner/Spinner";

import "./charList.scss";

import rick from "../../assets/img/Rick.png";

function CharList() {
  const [chars, setChars] = useState([]);
  const [offset, setOffset] = useState(0);
  const [charsLoading, setCharsLoading] = useState(false);
  const [charsEnded, setCharsEnded] = useState(false);

  const { loading, error, getCharacters } = useRickAndMorty();

  useEffect(() => {
    onRequest(offset);
  }, []);

  const onRequest = (offset) => {
    setCharsLoading(true);
    getCharacters(offset).then((newChars) => onLoadChars(newChars, offset));
  };

  const onLoadChars = (newChars, offset) => {
    const end = newChars.length < 9;

    setChars((prevChars) =>
      offset === 0 ? newChars : [...prevChars, ...newChars],
    );

    setCharsEnded(end);
    setCharsLoading(false);
  };

  const cards = chars.map((character) => (
    <li className="charlist__card" key={character.id}>
      <img
        src={character.image}
        alt={character.name}
        className="charlist__img"
      />

      <div className="charlist__name">{character.name}</div>
    </li>
  ));

  const spinner = loading ? <Spinner /> : null;

  return (
    <div className="charlist">
      <ul className="charlist__cards">
        {cards}
        {spinner}
      </ul>
      <button
        className="charlist__btn"
        style={{ display: chars.length === 0 || charsEnded ? "none" : "block" }}
        disabled={charsLoading}
        onClick={() => {
          const newOffset = offset + 9;
          setOffset(newOffset);
          onRequest(newOffset);
        }}
      >
        Load more
      </button>
    </div>
  );
}

export default CharList;

import { useEffect, useState } from "react";

import useRickAndMorty from "../../services/RickAndMorty";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

function setContent(process, Component, charsLoading) {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return charsLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state");
  }
}

function CharList({ onSelectedChar, selectedChar }) {
  const [chars, setChars] = useState([]);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(9);
  const [charsLoading, setCharsLoading] = useState(false);

  const { getCharacters, process, setProcess } = useRickAndMorty();

  useEffect(() => {
    onRequest(page, true);
  }, []);

  const onRequest = (page, initial = false) => {
    initial ? setCharsLoading(false) : setCharsLoading(true);
    getCharacters(page)
      .then(onLoadChars)
      .then(() => setProcess("confirmed"));
  };

  const onLoadChars = (newChars) => {
    setChars((prevChars) =>
      chars.length === 0 ? newChars : [...prevChars, ...newChars],
    );
    setCharsLoading(false);
  };

  const createCards = (chars) => {
    return chars.slice(0, offset).map((character) => (
      <li
        className={
          selectedChar === character.id
            ? "charlist__card charlist__card-active"
            : "charlist__card"
        }
        key={character.id}
        onClick={() => {
          onSelectedChar(character.id);
        }}
      >
        <img
          src={character.image}
          alt={character.name}
          className="charlist__img"
        />

        <div className="charlist__name">{character.name}</div>
      </li>
    ));
  };

  return (
    <div className="charlist">
      <ul className="charlist__cards">
        {setContent(process, () => createCards(chars), charsLoading)}
      </ul>
      <button
        className="charlist__btn"
        style={{ display: chars.length === 0 ? "none" : "block" }}
        disabled={process === "loading"}
        onClick={() => {
          const newOffset = offset + 9;

          setOffset(newOffset);

          if (newOffset >= chars.length) {
            const newPage = page + 1;
            setPage(newPage);
            onRequest(newPage);
          }
        }}
      >
        Load more
      </button>
    </div>
  );
}

export default CharList;

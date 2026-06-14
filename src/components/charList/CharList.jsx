import { useEffect, useState } from "react";

import useRickAndMorty from "../../services/RickAndMorty";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

function CharList({ onSelectedChar, selectedChar }) {
  const [chars, setChars] = useState([]);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(9);
  const [charsLoading, setCharsLoading] = useState(false);

  const { loading, error, getCharacters } = useRickAndMorty();

  useEffect(() => {
    onRequest(page);
  }, []);

  const onRequest = (page) => {
    setCharsLoading(true);
    getCharacters(page).then(onLoadChars);
  };

  const onLoadChars = (newChars) => {
    setChars((prevChars) =>
      chars.length === 0 ? newChars : [...prevChars, ...newChars],
    );

    setCharsLoading(false);
  };

  const cards = chars.slice(0, offset).map((character) => (
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

  const spinner = loading && chars.length === 0 ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className="charlist">
      <ul className="charlist__cards">
        {cards}
        {spinner}
        {errorMessage}
      </ul>
      <button
        className="charlist__btn"
        style={{ display: chars.length === 0 ? "none" : "block" }}
        disabled={charsLoading}
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

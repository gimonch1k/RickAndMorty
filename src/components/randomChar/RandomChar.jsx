import { useEffect, useState } from "react";

import useRickAndMorty from "../../services/RickAndMorty";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./randomChar.scss";

import rick from "../../assets/img/Rick.png";
import logo from "../../assets/img/RickMortyLogo.png";

function RandomChar() {
  const [char, setChar] = useState({});

  const { loading, error, clearError, getCharacter } = useRickAndMorty();

  useEffect(() => {
    onLoadChar();
  }, []);

  const onLoadChar = () => {
    clearError();
    const random = Math.floor(Math.random() * 20) + 1;
    getCharacter(random).then(setChar);
    console.log(random);
  };

  const errorMessage = error && !loading ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !loading && !error ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}

      <div className="randomchar__right">
        <div className="randomchar__text">
          Random character for today! <br /> Do you want to get to know him
          better?
        </div>

        <div className="randomchar__text">Or choose another one</div>

        <button href="#" className="randomchar__try" onClick={onLoadChar}>
          Try it
        </button>

        <img src={logo} alt="logo" className="randomchar__logo" />
      </div>
    </div>
  );
}

function View({ char }) {
  return (
    <div className="randomchar__left">
      <img src={char.image} alt={char.name} className="randomchar__img" />
      <div className="randomchar__description">
        <div className="randomchar__name">{char.name}</div>
        <div className="randomchar__about">
          {char.species} - {char.status}
        </div>
        <div className="randomchar__links">
          <a href="#" className="randomchar__homepage">
            Homepage
          </a>

          <a
            href={`https://rickandmortyapi.com/api/character/${char.id}`}
            className="randomchar__wiki"
          >
            Wiki
          </a>
        </div>
      </div>
    </div>
  );
}

export default RandomChar;

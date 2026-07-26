import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useRickAndMorty from "../../services/RickAndMorty";
import StatusIndicator from "../statusIndicator/StatusIndicator";
import setContent from "../../utils/SetContent";

import "./randomChar.scss";

import logo from "../../assets/img/RickMortyLogo.png";

function RandomChar() {
  const [char, setChar] = useState({});

  const { clearError, getCharacter, process, setProcess } = useRickAndMorty();

  useEffect(() => {
    onLoadChar();
  }, []);

  const onLoadChar = () => {
    clearError();
    const random = Math.floor(Math.random() * 826) + 1;
    getCharacter(random)
      .then(setChar)
      .then(() => setProcess("confirmed"));
    console.log(random);
  };

  return (
    <div className="randomchar">
      {setContent(process, View, char)}

      <div className="randomchar__right">
        <div className="randomchar__text">
          Random character for today! <br /> Do you want to get to know him
          better?
        </div>

        <div className="randomchar__text">Or choose another one</div>

        <button className="randomchar__try" onClick={onLoadChar}>
          Try it
        </button>

        <img src={logo} alt="logo" className="randomchar__logo" />
      </div>
    </div>
  );
}

function View({ data }) {
  const _wikiPath = "https://rickandmorty.fandom.com/wiki/";

  return (
    <div className="randomchar__left">
      <img src={data.image} alt={data.name} className="randomchar__img" />
      <div className="randomchar__description">
        <div className="randomchar__name">{data.name}</div>
        <div className="randomchar__about">
          {data.species} - {data.status}{" "}
          {<StatusIndicator status={data.status} />}
        </div>
        <div className="randomchar__links">
          <Link to={`/character/${data.id}`} className="randomchar__homepage">
            Homepage
          </Link>

          <a
            className="randomchar__wiki"
            href={`${_wikiPath}${data.name}`}
            target="_blank"
            rel="noreferrer"
          >
            Wiki
          </a>
        </div>
      </div>
    </div>
  );
}

export default RandomChar;

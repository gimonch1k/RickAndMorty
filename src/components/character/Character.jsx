import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import useRickAndMorty from "../../services/RickAndMorty";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import StatusIndicator from "../statusIndicator/StatusIndicator";

import "./character.scss";

function Character({ charId }) {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter } = useRickAndMorty();

  useEffect(() => {
    getCharacter(charId).then(setChar);
  }, []);

  const spinner = loading && !error ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !loading && !error && char ? <View char={char} /> : null;

  return (
    <div className="character">
      {spinner}
      {errorMessage}
      {content}
    </div>
  );
}

function View({ char }) {
  return (
    <>
      <div className="character__main">
        <img src={char.image} alt="character" className="character__img" />
        <div className="character__name">{char.name}</div>
        <div className="character__info">
          {char.species} - {char.status}{" "}
          <StatusIndicator status={char.status} />
        </div>
      </div>

      <ul className="character__descr">
        {char.episode.map((item, i) => (
          <li className="character__link" key={i}>
            <Link to={`/episodes/${item.slice(40)}`}>
              Episode {item.slice(40)}
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/" className="character__back">
        Back to home
      </Link>
    </>
  );
}

export default Character;

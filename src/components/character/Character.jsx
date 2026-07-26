import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import useRickAndMorty from "../../services/RickAndMorty";
import StatusIndicator from "../statusIndicator/StatusIndicator";
import setContent from "../../utils/SetContent";

import "./character.scss";

function Character({ charId }) {
  const [char, setChar] = useState(null);

  const { getCharacter, process, setProcess } = useRickAndMorty();

  useEffect(() => {
    getCharacter(charId)
      .then(setChar)
      .then(() => setProcess("confirmed"));
  }, []);

  return <div className="character">{setContent(process, View, char)}</div>;
}

function View({ data }) {
  return (
    <>
      <div className="character__main">
        <img src={data.image} alt="character" className="character__img" />
        <div className="character__name">{data.name}</div>
        <div className="character__info">
          {data.species} - {data.status}{" "}
          <StatusIndicator status={data.status} />
        </div>
        <div className="character__id">ID: {data.id}</div>
      </div>

      <ul className="character__descr">
        {data.episode.map((item, i) => (
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

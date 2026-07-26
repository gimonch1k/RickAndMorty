import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import useRickAndMorty from "../../services/RickAndMorty";
import setContent from "../../utils/SetContent";

import "./episode.scss";

import cover from "../../assets/img/Rick_and_Morty_Season.jpg";

function Episode({ charId }) {
  const [episode, setChar] = useState(null);

  const { getEpisode, process, setProcess } = useRickAndMorty();

  useEffect(() => {
    getEpisode(charId)
      .then(setChar)
      .then(() => setProcess("confirmed"));
  }, []);

  return <div className="episode">{setContent(process, View, episode)}</div>;
}

function View({ data }) {
  return (
    <>
      <div className="episode__main">
        <img src={cover} alt="cover" className="episode__img" />
        <div className="episode__title">{data.name}</div>
        <div className="episode__date">{data.date}</div>
        <div className="episode__id">EP: {data.id}</div>
      </div>

      <ul className="episode__chars">
        {data.characters.map((item, i) => (
          <li key={i}>
            <Link to={`/character/${item.slice(42)}`} className="episode__char">
              Character {item.slice(42)}
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/episodes" className="episode__back">
        Back to all
      </Link>
    </>
  );
}

export default Episode;

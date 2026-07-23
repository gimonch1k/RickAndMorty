import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import useRickAndMorty from "../../services/RickAndMorty";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./episode.scss";

import cover from "../../assets/img/Rick_and_Morty_Season.jpg";

function Episode({ charId }) {
  const [episode, setChar] = useState(null);

  const { loading, error, getEpisode } = useRickAndMorty();

  useEffect(() => {
    getEpisode(charId).then(setChar);
  }, []);

  const spinner = loading && !error ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content =
    !loading && !error && episode ? <View episode={episode} /> : null;

  return (
    <div className="episode">
      {spinner}
      {errorMessage}
      {content}
    </div>
  );
}

function View({ episode }) {
  return (
    <>
      <div className="episode__main">
        <img src={cover} alt="cover" className="episode__img" />
        <div className="episode__title">{episode.name}</div>
        <div className="episode__date">{episode.date}</div>
      </div>

      <ul className="episode__chars">
        {episode.characters.map((item, i) => (
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

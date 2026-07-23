import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useRickAndMorty from "../../services/RickAndMorty";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import StatusIndicator from "../statusIndicator/StatusIndicator";

import "./charInfo.scss";

import rick from "../../assets/img/Rick.png";

function CharInfo({ selectedId }) {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter } = useRickAndMorty();

  useEffect(() => {
    onLoadChar();
  }, [selectedId]);

  const onLoadChar = () => {
    if (!selectedId) return;

    getCharacter(selectedId).then(setChar);
  };

  const skeleton = !char && !loading && !error ? <Skeleton /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !error ? <Spinner /> : null;
  const content = !loading && !error && char ? <List char={char} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {skeleton}
      {content}
    </>
  );
}

function List({ char }) {
  const [showAll, setShowAll] = useState(false);

  const _wikiPath = "https://rickandmorty.fandom.com/wiki/";

  const status = useState(null);

  const episodesList = char.episode;
  const cutEpisodesList = episodesList.slice(0, 18);

  const episodes = episodesList.map((item, i) => (
    <li className="charinfo__episode" key={i}>
      <a href={item} target="_blank">
        {item}
      </a>

      {i === cutEpisodesList.length - 1 &&
        episodesList.length > 18 &&
        !showAll && (
          <div className="charinfo__plus" onClick={() => setShowAll(true)} />
        )}

      {i === episodesList.length - 1 && showAll && (
        <div className="charinfo__minus" onClick={() => setShowAll(false)} />
      )}
    </li>
  ));

  return (
    <div className="charinfo">
      <div className="charinfo__persone">
        <img src={char.image} alt={char.name} className="charinfo__img" />
        <div className="charinfo__info">
          <div className="charinfo__name">{char.name}</div>
          <Link to={`/character/${char.id}`} className="charinfo__homepage">
            Homepage
          </Link>

          <a
            className="charinfo__wiki"
            href={`${_wikiPath}${char.name}`}
            target="_blank"
            rel="noreferrer"
          >
            Wiki
          </a>
        </div>
      </div>

      <div className="charinfo__descr">
        {char.species} - {char.status}{" "}
        {<StatusIndicator status={char.status} />}
      </div>

      <h3>Episodes:</h3>

      <ul className="charinfo__episodes">
        {showAll ? episodes : episodes.slice(0, 18)}
      </ul>
    </div>
  );
}

export default CharInfo;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useRickAndMorty from "../../services/RickAndMorty";
import StatusIndicator from "../statusIndicator/StatusIndicator";
import setContent from "../../utils/SetContent";

import "./charInfo.scss";

import rick from "../../assets/img/Rick.png";

function CharInfo({ selectedId }) {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, process, setProcess } =
    useRickAndMorty();

  useEffect(() => {
    onLoadChar();
  }, [selectedId]);

  const onLoadChar = () => {
    if (!selectedId) return;

    getCharacter(selectedId)
      .then(setChar)
      .then(() => setProcess("confirmed"));
  };

  return <>{setContent(process, List, char)}</>;
}

function List({ data }) {
  const [showAll, setShowAll] = useState(false);

  const _wikiPath = "https://rickandmorty.fandom.com/wiki/";

  const status = useState(null);

  const episodesList = data.episode;
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
        <img src={data.image} alt={data.name} className="charinfo__img" />
        <div className="charinfo__info">
          <div className="charinfo__name">{data.name}</div>
          <Link to={`/character/${data.id}`} className="charinfo__homepage">
            Homepage
          </Link>

          <a
            className="charinfo__wiki"
            href={`${_wikiPath}${data.name}`}
            target="_blank"
            rel="noreferrer"
          >
            Wiki
          </a>
        </div>
      </div>

      <div className="charinfo__descr">
        {data.species} - {data.status}{" "}
        {<StatusIndicator status={data.status} />}
      </div>

      <h3>Episodes:</h3>

      <ul className="charinfo__episodes">
        {showAll ? episodes : episodes.slice(0, 18)}
      </ul>
    </div>
  );
}

export default CharInfo;

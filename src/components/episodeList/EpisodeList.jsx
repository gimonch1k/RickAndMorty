import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useRickAndMorty from "../../services/RickAndMorty";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./episodeList.scss";

import cover from "../../assets/img/Rick_and_Morty_Season.jpg";

function EpisodeList() {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [ended, setEnded] = useState(false);
  const { loading, error, getEpisodes } = useRickAndMorty();

  useEffect(() => {
    onRequest(page);
  }, []);

  const onRequest = (page) => {
    getEpisodes(page).then(onLoadEpisodes);
  };

  const onLoadEpisodes = (newEpisodes) => {
    const end = newEpisodes.length < 20;

    setEpisodes((prevEpisodes) =>
      episodes.length === 0 ? newEpisodes : [...prevEpisodes, ...newEpisodes],
    );

    setEnded(end);
  };

  const content = episodes.map((episode) => (
    <li className="episodelist__episode" key={episode.id}>
      <Link to={`/episodes/${episode.id}`}>
        <img src={cover} alt={episode.name} className="episodelist__img" />
      </Link>
      <div className="episodelist__title">{episode.name}</div>
      <div className="episodelist__date">{episode.date}</div>
    </li>
  ));

  const spinner = loading && !error ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <>
      {spinner}
      {errorMessage}
      <ul className="episodelist">{content}</ul>

      <button
        className="episodelist__btn"
        style={{ display: episodes.length === 0 || ended ? "none" : "block" }}
        disabled={loading}
        onClick={() => {
          const newPage = page + 1;
          setPage(newPage);
          onRequest(newPage);
        }}
      >
        Load more
      </button>
    </>
  );
}

export default EpisodeList;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useRickAndMorty from "../../services/RickAndMorty";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./episodeList.scss";

import cover from "../../assets/img/Rick_and_Morty_Season.jpg";

function setContent(process, Component, charsLoading) {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return charsLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state");
  }
}

function EpisodeList() {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [ended, setEnded] = useState(false);
  const [episodesLoading, setEpisodesLoading] = useState(false);
  const { getEpisodes, process, setProcess } = useRickAndMorty();

  useEffect(() => {
    onRequest(page, true);
  }, []);

  const onRequest = (page, initial = false) => {
    initial ? setEpisodesLoading(false) : setEpisodesLoading(true);
    getEpisodes(page)
      .then(onLoadEpisodes)
      .then(() => setProcess("confirmed"));
  };

  const onLoadEpisodes = (newEpisodes) => {
    const end = newEpisodes.length < 20;

    setEpisodes((prevEpisodes) =>
      episodes.length === 0 ? newEpisodes : [...prevEpisodes, ...newEpisodes],
    );

    setEpisodesLoading(false);
    setEnded(end);
  };

  const createEpisodes = (episodes) => {
    return (
      <ul className="episodelist">
        {episodes.map((episode) => (
          <li className="episodelist__episode" key={episode.id}>
            <Link to={`/episodes/${episode.id}`}>
              <img
                src={cover}
                alt={episode.name}
                className="episodelist__img"
              />
            </Link>
            <div className="episodelist__title">{episode.name}</div>
            <div className="episodelist__date">{episode.date}</div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section style={{ marginTop: "50px" }}>
      {setContent(process, () => createEpisodes(episodes), episodesLoading)}

      <button
        className="episodelist__btn"
        style={{ display: episodes.length === 0 || ended ? "none" : "block" }}
        disabled={process === "loading"}
        onClick={() => {
          const newPage = page + 1;
          setPage(newPage);
          onRequest(newPage);
        }}
      >
        Load more
      </button>
    </section>
  );
}

export default EpisodeList;

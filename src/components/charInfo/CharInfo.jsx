import { useEffect, useState } from "react";

import useRickAndMorty from "../../services/RickAndMorty";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

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
  const content =
    !loading && !error && !skeleton && char ? <List char={char} /> : null;

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
  const episodes = char.episode.map((item, i) => (
    <li className="charinfo__episode" key={i}>
      {item}
    </li>
  ));

  return (
    <div className="charinfo">
      <div className="charinfo__persone">
        <img src={char.image} alt={char.name} className="charinfo__img" />
        <div className="charinfo__info">
          <div className="charinfo__name">{char.name}</div>
          <a href="#" className="charinfo__homepage">
            homepage
          </a>
          <a href="#" className="charinfo__wiki">
            wiki
          </a>
        </div>
      </div>

      <div className="charinfo__descr">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, delectus
        minus odit eum totam quo officia fuga beatae quaerat error?
      </div>

      <h3>Episodes:</h3>

      <ul className="charinfo__episodes">{episodes.slice(0, 20)}</ul>
    </div>
  );
}

export default CharInfo;

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";

import useRickAndMorty from "../../services/RickAndMorty";

import "./searchPanel.scss";

function SearchPanel() {
  const [char, setChar] = useState(null);
  const [status, setStatus] = useState("nothing");

  const { getCharacterByName } = useRickAndMorty();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const character = await getCharacterByName(data.name);
      setChar(character);

      console.log(character);

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="searchpanel" onSubmit={handleSubmit(onSubmit)}>
      <div className="searchpanel__title">Or find a character by name:</div>
      <div className="searchpanel__wrapper">
        <input
          className="searchpanel__name"
          type="text"
          {...register("name", {
            required: "This field is required",
            onChange: () => {
              setStatus("nothing");
              setChar(null);
            },
          })}
          placeholder="Enter name"
        />
        <button className="searchpanel__find">Find</button>
      </div>

      {errors.name ? (
        <div className="searchpanel__error">{errors.name.message}</div>
      ) : null}

      {status === "success" && (
        <div className="searchpanel__info">
          <div className="searchpanel__success">
            Yes! Visit {char.name} page?
          </div>
          <Link to={`/character/${char.id}`} className="searchpanel__topage">
            To page
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="searchpanel__error">The character was not found</div>
      )}
    </form>
  );
}

export default SearchPanel;

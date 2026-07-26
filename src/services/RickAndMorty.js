import { useHttp } from "../hooks/http.hook";

function useRickAndMorty() {
  const _apiPath = "https://rickandmortyapi.com/api/";

  const { request, clearError, process, setProcess } = useHttp();

  const getCharacter = async (id) => {
    const data = await request(`${_apiPath}character/${id}`);
    return _transformCharacter(data);
  };

  const getCharacters = async (page = 1) => {
    const data = await request(`${_apiPath}character/?page=${page}`);
    return data.results.map(_transformCharacter);
  };

  const getCharacterByName = async (name) => {
    const data = await request(`${_apiPath}character/?name=${name}`);
    return _transformCharacter(data.results[0]);
  };

  const getEpisodes = async (page = 1) => {
    const data = await request(`${_apiPath}episode/?page=${page}`);
    return data.results.map(_tranformEpisode);
  };

  const getEpisode = async (id) => {
    const data = await request(`${_apiPath}episode/${id}`);
    return _tranformEpisode(data);
  };

  const _transformCharacter = (character) => {
    return {
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      image: character.image,
      episode: character.episode,
    };
  };

  const _tranformEpisode = (episode) => {
    return {
      id: episode.id,
      name: episode.name,
      date: episode.air_date,
      characters: episode.characters,
    };
  };

  return {
    process,
    setProcess,
    clearError,
    getCharacter,
    getCharacters,
    getCharacterByName,
    getEpisode,
    getEpisodes,
  };
}

export default useRickAndMorty;

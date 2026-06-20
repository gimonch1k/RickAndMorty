import { useHttp } from "../hooks/http.hook";

function useRickAndMorty() {
  const _apiPath = "https://rickandmortyapi.com/api/";

  const { loading, error, request, clearError } = useHttp();

  const getCharacter = async (id) => {
    const data = await request(`${_apiPath}character/${id}`);
    return _tranformCharacter(data);
  };

  const getCharacters = async (page = 1) => {
    const data = await request(`${_apiPath}character/?page=${page}`);
    return data.results.map(_tranformCharacter);
  };

  const getEpisodes = async (page = 1) => {
    const data = await request(`${_apiPath}episode/?page=${page}`);
    return data.results.map(_tranformEpisode);
  };

  const _tranformCharacter = (character) => {
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
    loading,
    error,
    clearError,
    getCharacter,
    getCharacters,
    getEpisodes,
  };
}

export default useRickAndMorty;

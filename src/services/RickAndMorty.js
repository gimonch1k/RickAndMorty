import { useHttp } from "../hooks/http.hook";

function useRickAndMorty() {
  const _apiPath = "https://rickandmortyapi.com/api/";

  const { loading, error, request, clearError } = useHttp();

  const getCharacter = async (id) => {
    const data = await request(`${_apiPath}character/${id}`);
    return _tranformCharacter(data);
  };

  const getCharacters = async (offset = 0, page = 1) => {
    const data = await request(`${_apiPath}character/?page=${page}`);
    return data.results.slice(offset, offset + 9).map(_tranformCharacter);
  };

  const _tranformCharacter = (character) => {
    return {
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      image: character.image,
    };
  };

  return { loading, error, clearError, getCharacter, getCharacters };
}

export default useRickAndMorty;

import { useHttp } from "../hooks/http.hook";

function useRickAndMorty() {
  const _apiPath = "https://rickandmortyapi.com/api/";

  const { loading, error, request, clearError } = useHttp();

  const getCharacter = async (id) => {
    const data = await request(`${_apiPath}character/${id}`);
    return _tranformCharacter(data);
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

  return { loading, error, clearError, getCharacter };
}

export default useRickAndMorty;

import { api } from './api';
import { Pokemon, PokemonListResponse } from '../types/pokemon';

export const pokemonService = {
  getPokemonList: async (offset: number = 0): Promise<PokemonListResponse> => {
    const response = await api.get<PokemonListResponse>(`/pokemon`, {
      params: { limit: 20, offset },
    });
    return response.data;
  },

  getPokemonById: async (id: number | string): Promise<Pokemon> => {
    const response = await api.get<Pokemon>(`/pokemon/${id}`);
    return response.data;
  },

  searchPokemon: async (): Promise<PokemonListResponse> => {
    const response = await api.get<PokemonListResponse>(`/pokemon?limit=10000`);
    return response.data;
  },
};

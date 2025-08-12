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

  //   getPokemonByName: async (name: string): Promise<Pokemon> => {
  //     const response = await api.get<Pokemon>(`/pokemon/${name.toLowerCase()}`);
  //     return response.data;
  //   },

  //   searchPokemon: async (query: string): Promise<Pokemon | null> => {
  //     try {
  //       const response = await api.get<Pokemon>(
  //         `/pokemon/${query.toLowerCase()}`,
  //       );
  //       return response.data;
  //     } catch (error) {
  //       console.error('Pokemon not found:', query);
  //       return null;
  //     }
  //   },

  //   getPokemonSpecies: async (id: number | string) => {
  //     const response = await api.get(`/pokemon-species/${id}`);
  //     return response.data;
  //   },

  //   getPokemonEvolutionChain: async (url: string) => {
  //     const response = await api.get(url);
  //     return response.data;
  //   },
};

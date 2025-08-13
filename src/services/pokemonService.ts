import { api } from './api';
import {
  ColorResponse,
  MoveResponse,
  Pokemon,
  PokemonListResponse,
  TypeResponse,
} from '../types/pokemon';
import { getId } from '../utils/strings';

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

  getPokemonMoves: async (): Promise<PokemonListResponse> => {
    const response = await api.get<PokemonListResponse>(`/move`);
    return response.data;
  },

  getPokemonByMoves: async (move: string): Promise<string[]> => {
    const response = await api.get<MoveResponse>(`/move/${move}`);
    return response.data.learned_by_pokemon.map(item => getId(item));
  },
  getPokemonTypes: async (): Promise<PokemonListResponse> => {
    const response = await api.get<PokemonListResponse>(`/type`);
    return response.data;
  },
  getPokemonByTypes: async (type: string): Promise<string[]> => {
    const response = await api.get<TypeResponse>(`/type/${type}`);
    return response.data.pokemon.map((item: any) => getId(item.pokemon));
  },
  getPokemonColors: async (): Promise<PokemonListResponse> => {
    const response = await api.get<PokemonListResponse>(`/pokemon-color`);
    return response.data;
  },
  getPokemonByColors: async (color: string): Promise<string[]> => {
    const response = await api.get<ColorResponse>(`/pokemon-color/${color}`);
    return response.data.pokemon_species.map(item => getId(item));
  },
};

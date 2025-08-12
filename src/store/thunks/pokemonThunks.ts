import { createAsyncThunk } from '@reduxjs/toolkit';
import { pokemonService } from '../../services/pokemonService';
import { Pokemon, PokemonListResponse } from '../../types/pokemon';

export const fetchPokemonList = createAsyncThunk<
  { list: PokemonListResponse; detailedList: Pokemon[] },
  { limit?: number; offset?: number }
>(
  'pokemon/fetchList',
  async ({ limit = 20, offset = 0 }) => {
    const list = await pokemonService.getPokemonList(limit, offset);
    
    const detailedList = await Promise.all(
      list.results.map(async (item) => {
        const idMatch = item.url.match(/\/(\d+)\/$/);
        const id = idMatch ? idMatch[1] : item.name;
        return await pokemonService.getPokemonById(id);
      })
    );
    
    return { list, detailedList };
  }
);

export const fetchPokemonById = createAsyncThunk<Pokemon, string | number>(
  'pokemon/fetchById',
  async (id) => {
    return await pokemonService.getPokemonById(id);
  }
);

export const fetchPokemonByName = createAsyncThunk<Pokemon, string>(
  'pokemon/fetchByName',
  async (name) => {
    return await pokemonService.getPokemonByName(name);
  }
);

export const searchPokemon = createAsyncThunk<Pokemon | null, string>(
  'pokemon/search',
  async (query) => {
    return await pokemonService.searchPokemon(query);
  }
);

export const fetchPokemonForCompare = createAsyncThunk<
  { index: 0 | 1; pokemon: Pokemon },
  { index: 0 | 1; id: string | number }
>(
  'pokemon/fetchForCompare',
  async ({ index, id }) => {
    const pokemon = await pokemonService.getPokemonById(id);
    return { index, pokemon };
  }
);
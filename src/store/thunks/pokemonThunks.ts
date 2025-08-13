import { createAsyncThunk } from '@reduxjs/toolkit';
import { pokemonService } from '../../services/pokemonService';
import {
  Evolution,
  Evolves,
  Pokemon,
  PokemonListResponse,
} from '../../types/pokemon';
import { api } from '../../services/api';
import { createImgLink } from '../../utils/strings';
import { IFilter } from '../slices/pokemonSlice';
import { intersectArrays } from '../../utils/arrays';

export const fetchPokemonList = createAsyncThunk<
  { detailedList: Pokemon[] },
  { offset?: number }
>('pokemon/fetchList', async ({ offset = 0 }) => {
  const list = await pokemonService.getPokemonList(offset);

  const detailedList = await Promise.all(
    list.results.map(async item => {
      const idMatch = item.url.match(/\/(\d+)\/$/);
      const id = idMatch ? idMatch[1] : item.name;
      return await pokemonService.getPokemonById(id);
    }),
  );

  const finalResult = await Promise.all(
    detailedList.map(async (item): Promise<Pokemon> => {
      const b = (await api.get(item.species.url)).data;
      return {
        ...item,
        colors: { name: b.color.name },
        evolutionChain: { url: b.evolution_chain.url },
      };
    }),
  );

  return { detailedList: finalResult };
});

export const fetchPokemonById = createAsyncThunk<Pokemon, string | number>(
  'pokemon/fetchById',
  async id => {
    const detail = await pokemonService.getPokemonById(id);
    const species = await api.get(detail.species.url);
    const evolution = await api.get(species.data.evolution_chain.url);
    const chain = evolution.data.chain;
    const evolutionResult: Evolution[] = [];
    let hasEvolution = true;

    if (chain) {
      hasEvolution = chain.evolves_to.length > 0;
      let evolve: Evolves = chain;
      while (hasEvolution) {
        const evol: Evolution = {
          evolutionFrom: evolve.species.name,
          level: evolve.evolves_to[0].evolution_details[0].min_level,
          evolutionTo: evolve.evolves_to[0].species.name,
          evolutionImgFrom: createImgLink(0, evolve.species.url),
          evolutionImgTo: createImgLink(0, evolve.evolves_to[0].species.url),
        };

        evolutionResult.push(evol);
        hasEvolution = evolve.evolves_to[0].evolves_to.length > 0;
        evolve = evolve.evolves_to[0];
      }
    }

    return {
      ...detail,
      colors: { name: species.data.color.name },
      evolutionChain: { url: species.data.evolution_chain.url },
      evolutions: evolutionResult,
    };
  },
);

export const searchPokemon = createAsyncThunk<PokemonListResponse>(
  'pokemon/search',
  async () => {
    return await pokemonService.searchPokemon();
  },
);

export const getPokemonMoves = createAsyncThunk<PokemonListResponse>(
  'pokemon/moves',
  async () => {
    return await pokemonService.getPokemonMoves();
  },
);

export const getPokemonTypes = createAsyncThunk<PokemonListResponse>(
  'pokemon/types',
  async () => {
    return await pokemonService.getPokemonTypes();
  },
);

export const getPokemonColors = createAsyncThunk<PokemonListResponse>(
  'pokemon/colors',
  async () => {
    return await pokemonService.getPokemonColors();
  },
);

export const getPokemonFiltered = createAsyncThunk<
  { detailedList: Pokemon[] },
  IFilter
>('pokemon/filtered', async ({ colorSelected, moveSelected, typeSelected }) => {
  const fetchPromises: Promise<string[]>[] = [];

  if (typeSelected) {
    fetchPromises.push(pokemonService.getPokemonByTypes(typeSelected));
  }
  if (moveSelected) {
    fetchPromises.push(pokemonService.getPokemonByMoves(moveSelected));
  }
  if (colorSelected) {
    fetchPromises.push(pokemonService.getPokemonByColors(colorSelected));
  }

  const resAll: string[][] = await Promise.all(fetchPromises);

  let results = intersectArrays(...resAll);

  if (resAll.length === 1) {
    results = resAll[0];
  }

  const detailedList = await Promise.all(
    results.map(async item => {
      return await pokemonService.getPokemonById(item);
    }),
  );

  const finalResult = await Promise.all(
    detailedList.map(async (item): Promise<Pokemon> => {
      const b = (await api.get(item.species.url)).data;
      return {
        ...item,
        colors: { name: b.color.name },
        evolutionChain: { url: b.evolution_chain.url },
      };
    }),
  );

  return { detailedList: finalResult };
});

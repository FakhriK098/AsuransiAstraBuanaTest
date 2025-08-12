import { createSlice } from '@reduxjs/toolkit';
import { Pokemon, PokemonListResponse } from '../../types/pokemon';
import {
  fetchPokemonList,
  fetchPokemonById,
  searchPokemon,
} from '../thunks/pokemonThunks';

interface PokemonState {
  pokemonList: Pokemon[];
  pokemonDetail: Pokemon | null;
  searchResult: PokemonListResponse | null;
  loading: boolean;
  searchLoading: boolean;
  error: string | null;
  errorSearch: string | null;
  currentPage: number;
  totalCount: number;
}

const initialState: PokemonState = {
  pokemonList: [],
  searchResult: null,
  pokemonDetail: null,
  loading: false,
  error: null,
  currentPage: 0,
  totalCount: 0,
  searchLoading: false,
  errorSearch: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPokemonList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        const offset = action.meta.arg.offset || 0;
        if (offset === 0) {
          state.pokemonList = action.payload.detailedList;
        } else {
          state.pokemonList = [
            ...state.pokemonList,
            ...action.payload.detailedList,
          ];
        }
        state.totalCount = action.payload.list.count;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemon list';
      })

      .addCase(fetchPokemonById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonById.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonDetail = action.payload;
      })
      .addCase(fetchPokemonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemon';
      })
      .addCase(searchPokemon.pending, state => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchPokemon.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResult = action.payload;
        if (!action.payload) {
          state.error = 'Pokemon not found';
        }
      })
      .addCase(searchPokemon.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.error.message || 'Search failed';
      });
  },
});

export default pokemonSlice.reducer;

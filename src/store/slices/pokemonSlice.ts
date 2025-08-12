import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon, PokemonListResponse } from '../../types/pokemon';
import {
  fetchPokemonList,
  fetchPokemonById,
  fetchPokemonByName,
  searchPokemon,
  fetchPokemonForCompare,
} from '../thunks/pokemonThunks';

interface PokemonState {
  pokemonList: Pokemon[];
  pokemonListResponse: PokemonListResponse | null;
  selectedPokemon: Pokemon | null;
  searchResult: Pokemon | null;
  comparePokemon: [Pokemon | null, Pokemon | null];
  loading: boolean;
  searchLoading: boolean;
  compareLoading: [boolean, boolean];
  error: string | null;
  currentPage: number;
  totalCount: number;
}

const initialState: PokemonState = {
  pokemonList: [],
  pokemonListResponse: null,
  selectedPokemon: null,
  searchResult: null,
  comparePokemon: [null, null],
  loading: false,
  searchLoading: false,
  compareLoading: [false, false],
  error: null,
  currentPage: 0,
  totalCount: 0,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSelectedPokemon: (state, action: PayloadAction<Pokemon | null>) => {
      state.selectedPokemon = action.payload;
    },
    setComparePokemon: (state, action: PayloadAction<{ index: 0 | 1; pokemon: Pokemon | null }>) => {
      state.comparePokemon[action.payload.index] = action.payload.pokemon;
    },
    clearComparePokemon: (state) => {
      state.comparePokemon = [null, null];
    },
    clearSearchResult: (state) => {
      state.searchResult = null;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonList = action.payload.detailedList;
        state.pokemonListResponse = action.payload.list;
        state.totalCount = action.payload.list.count;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemon list';
      })
      
      .addCase(fetchPokemonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPokemon = action.payload;
      })
      .addCase(fetchPokemonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemon';
      })
      
      .addCase(fetchPokemonByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonByName.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPokemon = action.payload;
      })
      .addCase(fetchPokemonByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemon';
      })
      
      .addCase(searchPokemon.pending, (state) => {
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
      })
      
      .addCase(fetchPokemonForCompare.pending, (state, action) => {
        const index = action.meta.arg.index;
        state.compareLoading[index] = true;
        state.error = null;
      })
      .addCase(fetchPokemonForCompare.fulfilled, (state, action) => {
        const { index, pokemon } = action.payload;
        state.compareLoading[index] = false;
        state.comparePokemon[index] = pokemon;
      })
      .addCase(fetchPokemonForCompare.rejected, (state, action) => {
        const index = action.meta.arg.index;
        state.compareLoading[index] = false;
        state.error = action.error.message || 'Failed to fetch Pokemon for comparison';
      });
  },
});

export const {
  setSelectedPokemon,
  setComparePokemon,
  clearComparePokemon,
  clearSearchResult,
  setCurrentPage,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
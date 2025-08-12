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
  pokemonDetail: Pokemon | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalCount: number;
}

const initialState: PokemonState = {
  pokemonList: [],
  pokemonDetail: null,
  loading: false,
  error: null,
  currentPage: 0,
  totalCount: 0,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
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
      });

    // .addCase(fetchPokemonByName.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchPokemonByName.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.selectedPokemon = action.payload;
    // })
    // .addCase(fetchPokemonByName.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message || 'Failed to fetch Pokemon';
    // })

    // .addCase(searchPokemon.pending, (state) => {
    //   state.searchLoading = true;
    //   state.error = null;
    // })
    // .addCase(searchPokemon.fulfilled, (state, action) => {
    //   state.searchLoading = false;
    //   state.searchResult = action.payload;
    //   if (!action.payload) {
    //     state.error = 'Pokemon not found';
    //   }
    // })
    // .addCase(searchPokemon.rejected, (state, action) => {
    //   state.searchLoading = false;
    //   state.error = action.error.message || 'Search failed';
    // })

    // .addCase(fetchPokemonForCompare.pending, (state, action) => {
    //   const index = action.meta.arg.index;
    //   state.compareLoading[index] = true;
    //   state.error = null;
    // })
    // .addCase(fetchPokemonForCompare.fulfilled, (state, action) => {
    //   const { index, pokemon } = action.payload;
    //   state.compareLoading[index] = false;
    //   state.comparePokemon[index] = pokemon;
    // })
    // .addCase(fetchPokemonForCompare.rejected, (state, action) => {
    //   const index = action.meta.arg.index;
    //   state.compareLoading[index] = false;
    //   state.error = action.error.message || 'Failed to fetch Pokemon for comparison';
    // });
  },
});

export const {
  // setSelectedPokemon,
  // setComparePokemon,
  // clearComparePokemon,
  // clearSearchResult,
  setCurrentPage,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;

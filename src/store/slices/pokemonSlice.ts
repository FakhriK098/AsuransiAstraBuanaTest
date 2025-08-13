import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon, PokemonListResponse } from '../../types/pokemon';
import {
  fetchPokemonList,
  fetchPokemonById,
  searchPokemon,
  getPokemonMoves,
  getPokemonTypes,
  getPokemonColors,
  getPokemonFiltered,
} from '../thunks/pokemonThunks';

interface PokemonState {
  pokemonList: Pokemon[];
  pokemonDetail: Pokemon | null;
  searchResult: PokemonListResponse | null;
  pokemonMoves: PokemonListResponse | null;
  pokemonTypes: PokemonListResponse | null;
  pokemonColors: PokemonListResponse | null;
  loading: boolean;
  searchLoading: boolean;
  movesLoading: boolean;
  typesLoading: boolean;
  colorsLoading: boolean;
  error: string | null;
  errorSearch: string | null;
  currentPage: number;
  moveSelected: string | null;
  typeSelected: string | null;
  colorSelected: string | null;
  countFilter: number;
}

export interface IFilter {
  moveSelected: string | null;
  typeSelected: string | null;
  colorSelected: string | null;
}

const initialState: PokemonState = {
  pokemonList: [],
  searchResult: null,
  pokemonDetail: null,
  loading: false,
  error: null,
  currentPage: 0,
  searchLoading: false,
  errorSearch: null,
  pokemonMoves: null,
  pokemonTypes: null,
  pokemonColors: null,
  movesLoading: false,
  typesLoading: false,
  colorsLoading: false,
  moveSelected: null,
  typeSelected: null,
  colorSelected: null,
  countFilter: 0,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<IFilter>) => {
      state.moveSelected = action.payload.moveSelected;
      state.typeSelected = action.payload.typeSelected;
      state.colorSelected = action.payload.colorSelected;

      state.countFilter = [
        state.moveSelected,
        state.typeSelected,
        state.colorSelected,
      ].filter(Boolean).length;
    },
    resetFilter: state => {
      state.moveSelected = null;
      state.typeSelected = null;
      state.colorSelected = null;
      state.countFilter = 0;
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
      })

      .addCase(getPokemonMoves.pending, state => {
        state.movesLoading = true;
        state.error = null;
      })
      .addCase(getPokemonMoves.fulfilled, (state, action) => {
        state.movesLoading = false;
        state.pokemonMoves = action.payload;
      })
      .addCase(getPokemonMoves.rejected, (state, action) => {
        state.movesLoading = false;
        state.error = action.error.message || 'Data No Found';
      })

      .addCase(getPokemonTypes.pending, state => {
        state.typesLoading = true;
        state.error = null;
      })
      .addCase(getPokemonTypes.fulfilled, (state, action) => {
        state.typesLoading = false;
        state.pokemonTypes = action.payload;
      })
      .addCase(getPokemonTypes.rejected, (state, action) => {
        state.typesLoading = false;
        state.error = action.error.message || 'Data No Found';
      })

      .addCase(getPokemonColors.pending, state => {
        state.colorsLoading = true;
        state.error = null;
      })
      .addCase(getPokemonColors.fulfilled, (state, action) => {
        state.colorsLoading = false;
        state.pokemonColors = action.payload;
      })
      .addCase(getPokemonColors.rejected, (state, action) => {
        state.colorsLoading = false;
        state.error = action.error.message || 'Data No Found';
      })

      .addCase(getPokemonFiltered.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPokemonFiltered.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonList = action.payload.detailedList;
      })
      .addCase(getPokemonFiltered.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to filter Pokemon list';
      });
  },
});

export const { setFilter, resetFilter } = pokemonSlice.actions;

export default pokemonSlice.reducer;

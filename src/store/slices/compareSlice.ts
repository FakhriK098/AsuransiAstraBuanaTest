import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon, PokemonListResponse } from '../../types/pokemon';
import { fetchPokemonById, searchPokemon } from '../thunks/pokemonThunks';

interface CompareState {
  pokemonList: Pokemon[];
  availableSlot: number;
  options: PokemonListResponse | null;
  loading: boolean;
  optionLoading: boolean;
  error: string | null;
}

const initialState: CompareState = {
  pokemonList: [],
  loading: false,
  error: null,
  availableSlot: 2,
  options: null,
  optionLoading: false,
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addPokemonToCompare: state => {
      const length = state.pokemonList.length;

      if (length === state.availableSlot) {
        state.availableSlot += 1;
      }

      const newOptions =
        state.options?.results.filter(
          option =>
            !state.pokemonList.some(pokemon => pokemon.name === option.name),
        ) || [];

      state.options = {
        ...state.options,
        results:
          newOptions?.map(item => {
            return {
              name: item.name,
              url: item.url,
            };
          }) || [],
      };
    },
    removePokemonToCompare: (
      state,
      action: PayloadAction<{ name: string; url: string }>,
    ) => {
      const newPokemon = state.pokemonList.filter(
        pokemon => pokemon.name !== action.payload.name,
      );

      if (newPokemon.length > 0) {
        state.availableSlot -= 1;
      }

      state.pokemonList = newPokemon;
      state.options?.results.push(action.payload);
    },
    resetState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPokemonById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonById.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonList.push(action.payload);
      })
      .addCase(fetchPokemonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemon';
      })

      .addCase(searchPokemon.pending, state => {
        state.optionLoading = true;
        state.error = null;
      })
      .addCase(searchPokemon.fulfilled, (state, action) => {
        state.optionLoading = false;
        state.options = action.payload;
      })
      .addCase(searchPokemon.rejected, (state, action) => {
        state.optionLoading = false;
        state.error = action.error.message || 'Search failed';
      });
  },
});

export const { addPokemonToCompare, resetState, removePokemonToCompare } =
  compareSlice.actions;
export default compareSlice.reducer;

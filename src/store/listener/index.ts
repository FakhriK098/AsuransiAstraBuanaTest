import { createListenerMiddleware } from '@reduxjs/toolkit';
import { resetFilter, setFilter } from '../slices/pokemonSlice';
import { fetchPokemonList, getPokemonFiltered } from '../thunks/pokemonThunks';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setFilter,
  effect: async (action, listenerApi) => {
    await listenerApi.dispatch(
      getPokemonFiltered({
        moveSelected: action.payload.moveSelected,
        typeSelected: action.payload.typeSelected,
        colorSelected: action.payload.colorSelected,
      }),
    );
  },
});

listenerMiddleware.startListening({
  actionCreator: resetFilter,
  effect: async (_, listenerApi) => {
    await listenerApi.dispatch(
      fetchPokemonList({
        offset: 0,
      }),
    );
  },
});

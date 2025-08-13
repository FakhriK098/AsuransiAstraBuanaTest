import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { listenerMiddleware } from './listener';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'pokemon/fetchList/fulfilled',
        ],
        ignoredPaths: ['pokemon.pokemonList'],
        warnAfter: 128,
      },
      immutableCheck: {
        warnAfter: 128,
      },
    }).prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

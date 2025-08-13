import { combineReducers } from '@reduxjs/toolkit';
import pokemonReducer from './slices/pokemonSlice';
import compareReducer from './slices/compareSlice';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  compare: compareReducer,
});

export default rootReducer;

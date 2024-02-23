import {combineReducers, configureStore} from '@reduxjs/toolkit';
import pokemonReducer from './pokemon';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

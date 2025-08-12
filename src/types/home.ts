import { Pokemon } from './pokemon';

export interface CardPokemonProps {
  item: Pokemon;
}

export interface TypeProps {
  text: string;
  isLight: boolean;
  backgroundColor?: string;
  fontSize?: number;
}

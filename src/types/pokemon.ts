export type Types = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type Sprites = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  other: { 'official-artwork': { front_default: string } };
};

export type Moves = {
  move: {
    name: string;
  };
};

export type Species = {
  name: string;
  url: string;
};

export type Colors = {
  name: string;
};

export type Ability = {
  ability: { name: string };
};

export type Evolution = {
  evolutionFrom: string;
  evolutionImgFrom: string;
  level: string | number;
  evolutionTo: string;
  evolutionImgTo: string;
};

export type EvolutionDetail = {
  min_level: number;
};

export type Evolves = {
  evolution_details: EvolutionDetail[];
  evolves_to: Evolves[];
  species: { name: string; url: string };
};

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export type Pokemon = {
  id: number;
  name: string;
  types: Types[];
  sprites: Sprites;
  weight: number;
  height: number;
  base_experience: number;
  moves: Moves[];
  species: Species;
  stats: Stat[];
  colors: Colors;
  abilities: Ability[];
  evolutionChain: { url: string };
  chain: Evolves;
  evolutions?: Evolution[];
};

export interface PokemonResult {
  name: string;
  url: string;
}

export type PokemonListResponse = {
  count?: number;
  next?: string;
  prev?: string;
  results: PokemonResult[];
};

export type MoveResponse = {
  learned_by_pokemon: PokemonResult[];
};

export type TypeResponse = {
  pokemon: {
    pokemon: PokemonResult;
  }[];
};

export type ColorResponse = {
  pokemon_species: PokemonResult[];
};

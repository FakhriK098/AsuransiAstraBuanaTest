import { Evolution, Stat } from './pokemon';

export interface LabelProps {
  title: string;
  value?: string;
}

export interface EvolutionProps {
  evolutions?: Evolution[];
}

export interface ChainType {
  name: string;
  image: string;
}

export interface EvolutionChainProps {
  evolutionFrom: ChainType;
  evolutionTo: ChainType;
  level: string | number;
}

export interface StatProps {
  stats: Stat[];
  color: string;
  isLight: boolean;
}

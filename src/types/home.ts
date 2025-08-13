import { IHandles } from 'react-native-modalize/lib/options';
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

export interface ModalFilterProps {
  modalRef: React.RefObject<IHandles | null>;
}

export interface SectionFilterProps {
  onSelected: (value: string) => void;
  selected: string;
  options: string[];
  title: string;
}

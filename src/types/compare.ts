import { IHandles } from 'react-native-modalize/lib/options';
import { Pokemon } from './pokemon';

export interface ItemCompareProps {
  image?: string;
  name?: string;
  url?: string;
  onPressChoose: () => void;
  onPressRemove: (name: string, url: string) => void;
}

export interface ModalPokemonProps {
  modalRef: React.RefObject<IHandles | null>;
}

export interface ColumnCompareProps {
  type: string;
  pokemon: Pokemon;
}

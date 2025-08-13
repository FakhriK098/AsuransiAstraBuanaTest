import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Detail: { pokemonId?: string };
  Search: undefined;
  Compare?: { pokemonId: string };
};

export type RootNavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type DetailNavigationParams = RouteProp<RootStackParamList, 'Detail'>;
export type CompareNavigationParams = RouteProp<RootStackParamList, 'Compare'>;

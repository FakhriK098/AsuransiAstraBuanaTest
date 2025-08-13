import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  DetailNavigationParams,
  RootNavigationProps,
} from '../../navigation/type';
import { fetchPokemonById } from '../../store/thunks/pokemonThunks';
import Type from '../home/components/Type';
import tinycolor from 'tinycolor2';
import { colors } from '../../themes/colors';
import Label from './components/Label';
import Evolution from './components/Evolution';
import Stat from './components/Stat';
import FloatingCompare from '../../components/FloatingCompare';
import { resetDetail } from '../../store/slices/pokemonSlice';

const DetailPage = () => {
  const {
    params: { pokemonId },
  } = useRoute<DetailNavigationParams>();
  const { navigate } = useNavigation<RootNavigationProps>();
  const dispatch = useAppDispatch();
  const { pokemonDetail, detailLoading } = useAppSelector(
    state => state.pokemon,
  );

  useEffect(() => {
    dispatch(fetchPokemonById({ id: pokemonId || '', page: 'detail' }));

    return () => {
      dispatch(resetDetail());
    };
  }, [dispatch, pokemonId]);

  const isLight = useMemo(() => {
    if (pokemonDetail) {
      const tinyColor = tinycolor(pokemonDetail.colors.name);
      return tinyColor.isLight();
    }
    return false;
  }, [pokemonDetail]);

  if (!pokemonDetail) return null;

  const {
    sprites: { other, front_default, back_default, back_shiny, front_shiny },
    name,
    id,
    colors: { name: pokemonColor },
    height,
    weight,
    abilities,
    evolutions,
    base_experience,
    stats,
  } = pokemonDetail;

  const sprites = [front_default, back_default, front_shiny, back_shiny];

  return (
    <SafeAreaView style={styles.container}>
      {detailLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.black} />
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Image
            source={{
              uri: other['official-artwork'].front_default,
            }}
            style={styles.image}
          />
          <View style={styles.descContainer}>
            <Text>{`#${id}`}</Text>
            <Text style={styles.textTitle}>{name}</Text>
            <View style={styles.typeContainer}>
              {pokemonDetail.types.map((type, index) => (
                <Type
                  key={index}
                  text={type.type.name}
                  isLight={!isLight}
                  backgroundColor={pokemonColor}
                  fontSize={12}
                />
              ))}
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Stat stats={stats} color={pokemonColor} isLight={!isLight} />
          <View style={styles.detailContainer}>
            <Label title="Height" value={`${height / 10} m`} />
            <Label title="Weight" value={`${weight / 10} m`} />
            <Label title="Base Experience" value={base_experience.toString()} />
            <Label
              title="Abilities"
              value={abilities.map(ability => ability.ability.name).join(', ')}
            />
            <Label title="Sprites" />
            <View style={styles.spriteContainer}>
              {sprites.map((sprite, index) => (
                <Image
                  key={index}
                  source={{
                    uri: sprite,
                  }}
                  resizeMode="cover"
                  style={styles.imageSprite}
                />
              ))}
            </View>
          </View>
          <Evolution evolutions={evolutions} />
        </View>
      </ScrollView>
      <FloatingCompare
        onPress={() =>
          navigate('Compare', { pokemonId: String(pokemonDetail.id) || '' })
        }
      />
    </SafeAreaView>
  );
};

export default DetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 8,
    paddingTop: 16,
    flexDirection: 'row',
    zIndex: 99,
  },
  image: {
    width: 150,
    height: 150,
  },
  descContainer: {
    marginLeft: 16,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  typeContainer: {
    flexDirection: 'row',
    marginTop: 4,
    flex: 1,
    flexWrap: 'wrap',
    maxWidth: 240,
  },
  contentContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopEndRadius: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 40,
    marginTop: -40,
  },
  spriteContainer: {
    flexDirection: 'row',
  },
  imageSprite: {
    width: 70,
    height: 70,
  },
  detailContainer: {
    padding: 8,
    borderWidth: 1,
    borderColor: colors.shade75,
    borderRadius: 8,
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.shade50,
    zIndex: 10,
    opacity: 0.4,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

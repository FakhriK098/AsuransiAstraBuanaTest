import { useNavigation } from '@react-navigation/native';
import { CardPokemonProps } from '../../../types/home';
import { RootNavigationProps } from '../../../navigation/type';
import tinycolor from 'tinycolor2';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Type from './Type';
import { colors } from '../../../themes/colors';

const CardPokemon = ({ item }: CardPokemonProps) => {
  const { navigate } = useNavigation<RootNavigationProps>();
  const tinyColor = tinycolor(item.colors.name);
  const isLight = tinyColor.isLight();

  const {
    colors: { name: itemColor },
    sprites: { other },
    name,
    types,
  } = item;

  const handleOnPress = () => {
    navigate('Detail', { pokemonId: item.id.toString() });
  };

  return (
    <Pressable style={styles.container} onPress={handleOnPress}>
      <View
        style={[
          styles.background,
          { backgroundColor: itemColor || colors.white },
        ]}
      />
      <View style={styles.contentContainer}>
        <Image
          source={{
            uri: other['official-artwork'].front_default,
          }}
          style={styles.image}
        />
        <View style={styles.descContainer}>
          <Text
            style={[
              styles.title,
              { color: isLight ? colors.black : colors.white },
            ]}
            numberOfLines={1}
          >
            {name}
          </Text>
          <View style={styles.typeContainer}>
            {types.map((type, index) => (
              <Type key={index} text={type.type.name} isLight={isLight} />
            ))}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CardPokemon;

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 8,
    padding: 16,
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    flex: 1 / 2,
    backgroundColor: colors.white,
  },
  image: {
    width: 62,
    height: 62,
  },
  contentContainer: {
    flexDirection: 'row',
    zIndex: 99,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
    opacity: 0.65,
    zIndex: 9,
  },
  descContainer: {
    marginLeft: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  typeContainer: {
    flexDirection: 'column',
    marginTop: 4,
    flex: 1,
    flexWrap: 'wrap',
    maxWidth: 240,
  },
});

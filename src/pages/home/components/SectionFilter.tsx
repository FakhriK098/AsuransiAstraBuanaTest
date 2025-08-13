import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { SectionFilterProps } from '../../../types/home';
import { colors } from '../../../themes/colors';
import images from '../../../assets/images';

const SectionFilter = ({
  title,
  options,
  selected,
  onSelected,
}: SectionFilterProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOnPress = () => {
    setIsOpen(!isOpen);
  };

  const handleOnPressItem = (item: string) => {
    if (item === selected) {
      onSelected('');
      return;
    }
    onSelected(item);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.headerContainer} onPress={handleOnPress}>
        <Text>{title}</Text>
        <View style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}>
          <Image source={images.arrowDown} style={styles.icon} />
        </View>
      </Pressable>
      {isOpen ? (
        <ScrollView>
          {options.map((item, index) => (
            <Pressable
              key={`option-${index}`}
              style={[
                styles.itemContainer,
                {
                  backgroundColor:
                    selected === item ? colors.shade50 : colors.white,
                },
              ]}
              onPress={() => handleOnPressItem(item)}
            >
              <Text>{item}</Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <></>
      )}
    </View>
  );
};

export default SectionFilter;

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
    marginBottom: 4,
  },
  headerContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.shade800,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: colors.shade75,
  },
});

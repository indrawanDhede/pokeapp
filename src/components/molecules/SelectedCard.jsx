import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../themes/Colors';
import {useThemes} from '../../themes/ThemeProvider';
import {ImagePokeBall} from '../../assets';

const SelectedCard = React.memo(
  ({
    item,
    selectedPokemon1,
    selectedPokemon2,
    setSelectedPokemon1,
    setSelectedPokemon2,
    closeModal,
  }) => {
    const {theme} = useThemes();

    const handleSelected = pokemon => {
      if (!selectedPokemon1 && !selectedPokemon2) {
        setSelectedPokemon1(pokemon);
        setSelectedPokemon2(null);
      } else if (selectedPokemon1 && selectedPokemon2) {
        setSelectedPokemon1(pokemon);
        setSelectedPokemon2(null);
      } else if (!selectedPokemon1 && selectedPokemon2) {
        setSelectedPokemon1(pokemon);
      } else if (selectedPokemon1 && !selectedPokemon2) {
        setSelectedPokemon2(pokemon);
      }

      closeModal();
    };

    return (
      <TouchableOpacity
        onPress={() => handleSelected(item)}
        activeOpacity={0.7}
        style={styles.containerCard(theme, item.type)}>
        <View>
          <Text>{item.name.toUpperCase()}</Text>
        </View>
        <FastImage
          style={{width: 120, height: 120}}
          source={{uri: `${item.image}`, priority: FastImage.priority.high}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Image
          source={ImagePokeBall}
          style={[
            styles.pokeballImage,
            {tintColor: 'rgba(192, 192, 192, 0.5)', zIndex: -1},
          ]}
        />
      </TouchableOpacity>
    );
  },
);

export default SelectedCard;

const styles = StyleSheet.create({
  containerCard: (theme, color) => ({
    backgroundColor: Colors[color],
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginBottom: 20,
    padding: 20,
    flexDirection: 'row',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    elevation: 4,
    borderWidth: 0.5,
    shadowColor: 'black',
    borderColor: 'rgba(0,0,0,0.200)',
  }),
  pokeballImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    resizeMode: 'contain',
  },
});

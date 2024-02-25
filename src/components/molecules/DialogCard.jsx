import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ImagePokeBall} from '../../assets';
import {Colors} from '../../themes/Colors';
import {generatePercenWidth} from '../../themes/Sizes';

const DialogCard = ({pokemon, handleSelected}) => {
  return (
    <TouchableOpacity
      onPress={() => handleSelected(pokemon)}
      activeOpacity={0.7}
      style={styles.container(pokemon)}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{pokemon.name}</Text>
      </View>

      <FastImage
        style={{width: 120, height: 120}}
        source={{uri: `${pokemon.image}`, priority: FastImage.priority.high}}
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
};

export default DialogCard;

const styles = StyleSheet.create({
  container: pokemon => ({
    backgroundColor: Colors[pokemon.type],
    justifyContent: 'space-between',
    width: generatePercenWidth(90),
    height: generatePercenWidth(40),
    marginHorizontal: 18,
    marginBottom: 20,
    padding: 20,
    flexDirection: 'row',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    elevation: 4,
    borderWidth: 0.5,
    shadowColor: Colors.black,
    borderColor: 'rgba(0,0,0,0.200)',
    position: 'relative',
  }),
  pokeballImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

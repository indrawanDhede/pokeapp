import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ModalSelected} from '../../../components';
import {generatePercenHeight, generatePercenWidth} from '../../../themes/Sizes';

const SelectedPokemonComponent = ({
  selectedPokemon,
  setSelectedPokemon,
  isModalVisible,
  closeModal,
  openDialog,
  identifier,
}) => {
  return (
    <TouchableOpacity
      style={styles.selectedPokemonContainer}
      activeOpacity={0.4}
      onPress={() => openDialog(identifier)}>
      <ModalSelected
        visible={isModalVisible}
        closeModal={closeModal}
        setSelected={setSelectedPokemon}
        identifier={identifier}
      />

      {selectedPokemon ? (
        <>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            allowFontScaling={false}
            style={styles.textName}>
            {selectedPokemon.name.toUpperCase()}
          </Text>
          <FastImage
            style={{
              width: 90,
              height: 90,
            }}
            source={{
              uri: `${selectedPokemon.image}`,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </>
      ) : (
        <Text allowFontScaling={false} style={styles.textName}>
          Select Pokemon
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default SelectedPokemonComponent;

const styles = StyleSheet.create({
  selectedPokemonContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    padding: 16,
    alignItems: 'center',
  },
  textName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});

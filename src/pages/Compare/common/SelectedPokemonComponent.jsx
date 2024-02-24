import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ModalSelected} from '../../../components';

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
      onPress={() => openDialog(identifier)}>
      <ModalSelected
        visible={isModalVisible}
        closeModal={closeModal}
        setSelected={setSelectedPokemon}
        identifier={identifier}
      />

      {selectedPokemon ? (
        <>
          <Text style={styles.selectedPokemonName}>
            {selectedPokemon.name.toUpperCase()}
          </Text>
          <FastImage
            style={{width: 100, height: 100}}
            source={{
              uri: `${selectedPokemon.image}`,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </>
      ) : (
        <Text>Select Pokemon</Text>
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
  selectedPokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ModalDialog} from '../../../components';

const DialogPokemonComponent = ({
  selectedPokemon1,
  selectedPokemon2,
  setSelectedPokemon1,
  setSelectedPokemon2,
  isModalVisible,
  closeModal,
  openDialog,
  identifier,
}) => {
  return (
    <TouchableOpacity
      style={styles.showListButton}
      onPress={() => openDialog(identifier)}>
      <Text style={{color: 'black'}}>Choose Pokemon</Text>
      <ModalDialog
        selectedPokemon1={selectedPokemon1}
        selectedPokemon2={selectedPokemon2}
        setSelectedPokemon1={setSelectedPokemon1}
        setSelectedPokemon2={setSelectedPokemon2}
        visible={isModalVisible}
        closeModal={closeModal}
      />
    </TouchableOpacity>
  );
};

export default DialogPokemonComponent;

const styles = StyleSheet.create({
  showListButton: {
    padding: 12,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    borderRadius: 8,
  },
});

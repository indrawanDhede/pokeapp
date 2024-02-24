import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import ChartComparisonComponent from './common/ChartComparionComponent';
import DialogPokemonComponent from './common/DialogPokemonComponent';
import SelectedPokemonComponent from './common/SelectedPokemonComponent';

const ComparePokemon = () => {
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);

  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);

  const openModal1 = () => {
    setModalVisible1(true);
  };

  const closeModal1 = () => {
    setModalVisible1(false);
  };

  const openModal2 = () => {
    setModalVisible2(true);
  };

  const closeModal2 = () => {
    setModalVisible2(false);
  };

  const openModal3 = () => {
    setModalVisible3(true);
  };

  const closeModal3 = () => {
    setModalVisible3(false);
  };

  const openDialog = identifier => {
    if (identifier === 'modal1') {
      openModal1();
    } else if (identifier === 'modal2') {
      openModal2();
    } else if (identifier === 'modal3') {
      openModal3();
    }
  };

  const handleClear = () => {
    setSelectedPokemon1(null);
    setSelectedPokemon2(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectedPokemonSection}>
        <SelectedPokemonComponent
          selectedPokemon={selectedPokemon1}
          setSelectedPokemon={setSelectedPokemon1}
          isModalVisible={isModalVisible1}
          closeModal={closeModal1}
          openDialog={() => openDialog('modal1')}
          identifier="modal1"
        />

        <SelectedPokemonComponent
          selectedPokemon={selectedPokemon2}
          setSelectedPokemon={setSelectedPokemon2}
          isModalVisible={isModalVisible2}
          closeModal={closeModal2}
          openDialog={() => openDialog('modal2')}
          identifier="modal2"
        />
      </View>

      <ChartComparisonComponent
        selectedPokemon1={selectedPokemon1}
        selectedPokemon2={selectedPokemon2}
      />

      <DialogPokemonComponent
        selectedPokemon1={selectedPokemon1}
        selectedPokemon2={selectedPokemon2}
        setSelectedPokemon1={setSelectedPokemon1}
        setSelectedPokemon2={setSelectedPokemon2}
        isModalVisible={isModalVisible3}
        closeModal={closeModal3}
        openDialog={() => openDialog('modal3')}
        identifier="modal3"
      />

      <TouchableOpacity
        onPress={() => handleClear()}
        style={styles.buttonClear}>
        <Text style={styles.textClear}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ComparePokemon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  selectedPokemonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  buttonClear: {
    marginTop: 10,
    padding: 12,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    borderRadius: 8,
  },
  textClear: {
    color: 'black',
  },
});

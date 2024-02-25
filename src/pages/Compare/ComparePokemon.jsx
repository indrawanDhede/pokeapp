import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ChartComparisonComponent from './common/ChartComparionComponent';
import DialogPokemonComponent from './common/DialogPokemonComponent';
import SelectedPokemonComponent from './common/SelectedPokemonComponent';
import {generatePercenHeight} from '../../themes/Sizes';

const ComparePokemon = () => {
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);

  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

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

  const openDialog = identifier => {
    if (identifier === 'modal1') {
      openModal1();
    } else if (identifier === 'modal2') {
      openModal2();
    }
  };

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
  };

  return (
    <GestureHandlerRootView style={styles.container}>
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

      <View style={styles.footer} />

      <DialogPokemonComponent handleSelected={handleSelected} />
    </GestureHandlerRootView>
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
  footer: {
    bottom: 0,
    height: generatePercenHeight(15),
  },
});

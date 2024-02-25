import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {selectAllPokemon} from '../../libs/redux/pokemon';
import {Colors} from '../../themes/Colors';

const ModalSelected = ({visible, closeModal, setSelected}) => {
  const pokemonList = useSelector(selectAllPokemon);

  const handleSelect = pokemon => {
    setSelected(pokemon);
    closeModal();
  };

  return (
    <Modal
      isVisible={visible}
      useNativeDriver={true}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      style={{backgroundColor: 'white', paddingBottom: 20}}>
      <View style={styles.container}>
        <Text style={styles.textContainer}>Choose Pokemon</Text>
      </View>

      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>X</Text>
      </TouchableOpacity>

      <FlatList
        data={pokemonList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.content}
            onPress={() => handleSelect(item)}>
            <Text style={styles.textContent}>{item.name}</Text>
          </TouchableOpacity>
        )}
        initialNumToRender={25}
        maxToRenderPerBatch={50}
        windowSize={75}
        updateCellsBatchingPeriod={100}
        scrollEventThrottle={16}
        decelerationRate="fast"
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 10,
        }}
      />
    </Modal>
  );
};

export default ModalSelected;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textContainer: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  content: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: Colors.gray2,
  },
  textContent: {
    fontSize: 16,
    color: Colors.black,
  },
});

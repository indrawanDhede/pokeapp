import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {selectAllPokemon} from '../../libs/redux/pokemon';

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
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Choose Pokemon
        </Text>
      </View>

      <TouchableOpacity
        onPress={closeModal}
        style={{position: 'absolute', top: 10, right: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>X</Text>
      </TouchableOpacity>

      <FlatList
        data={pokemonList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              backgroundColor: '#f8f8f8',
            }}
            onPress={() => handleSelect(item)}>
            <Text style={{fontSize: 16, color: 'black'}}>{item.name}</Text>
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

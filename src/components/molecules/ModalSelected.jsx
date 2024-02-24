import React, {useCallback, useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchPokemon,
  selectAllPokemon,
  selectStatus,
} from '../../libs/redux/pokemon';
import {LoadingView} from '.';

const ModalSelected = ({visible, closeModal, setSelected}) => {
  const dispatch = useDispatch();
  const pokemonList = useSelector(selectAllPokemon);
  const status = useSelector(selectStatus);

  useEffect(() => {
    if (!pokemonList || pokemonList.length === 0) {
      dispatch(fetchPokemon({limit: 25, offset: 0}));
    }
  }, [dispatch, pokemonList]);

  const handleEndReached = useCallback(
    e => {
      if (e.distanceFromEnd === 0 && status !== 'loading') {
        dispatch(fetchPokemon({limit: 25, offset: pokemonList.length}));
      }
    },
    [dispatch, pokemonList.length, status],
  );

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
        onEndReached={handleEndReached}
        onEndReachedThreshold={0}
        initialNumToRender={25}
        maxToRenderPerBatch={25}
        windowSize={25}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingVertical: 10,
        }}
        ListFooterComponent={status === 'loading' ? <LoadingView /> : null}
      />
    </Modal>
  );
};

export default ModalSelected;

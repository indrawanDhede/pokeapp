import React, {useCallback, useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {selectAllPokemon, selectStatus} from '../../libs/redux/pokemon';
import {LoadingView, SelectedCard} from '..';

const ModalDialog = ({
  selectedPokemon1,
  selectedPokemon2,
  setSelectedPokemon1,
  setSelectedPokemon2,
  visible,
  closeModal,
}) => {
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
          <SelectedCard
            item={item}
            selectedPokemon1={selectedPokemon1}
            selectedPokemon2={selectedPokemon2}
            setSelectedPokemon1={setSelectedPokemon1}
            setSelectedPokemon2={setSelectedPokemon2}
            closeModal={closeModal}
          />
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

export default ModalDialog;

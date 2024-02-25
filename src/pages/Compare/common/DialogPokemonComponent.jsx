import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetVirtualizedList,
} from '@gorhom/bottom-sheet';
import React, {useMemo, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectAllPokemon} from '../../../libs/redux/pokemon';
import {DialogCard} from '../../../components';
import {Colors} from '../../../themes/Colors';

const DialogPokemonComponent = ({handleSelected}) => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['15%', '50%', '75%'], []);

  const pokemonList = useSelector(selectAllPokemon);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      style={styles.container}>
      <BottomSheetVirtualizedList
        data={pokemonList}
        keyExtractor={(item, index) => index.toString()}
        getItemCount={pokemonList => pokemonList.length}
        getItem={(pokemonList, index) => pokemonList[index]}
        ListHeaderComponent={() => (
          <View style={{marginBottom: 10}}>
            <Text style={styles.textHeader}>Choose Pokemon</Text>
          </View>
        )}
        renderItem={({item}) => (
          <DialogCard pokemon={item} handleSelected={handleSelected} />
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </BottomSheet>
  );
};

export default DialogPokemonComponent;

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  contentContainer: {
    alignItems: 'center',
  },
  textHeader: {color: 'black', fontSize: 18, fontWeight: 'bold'},
});

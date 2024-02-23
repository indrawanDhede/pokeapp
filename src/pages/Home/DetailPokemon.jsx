import {View, Text} from 'react-native';
import React from 'react';

const DetailPokemon = ({route}) => {
  const {items} = route.params;

  console.log('item', items.id);
  return (
    <View>
      <Text>DetailPokemon</Text>
    </View>
  );
};

export default DetailPokemon;

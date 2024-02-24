import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SvgCssUri} from 'react-native-svg/css';
import {useDispatch, useSelector} from 'react-redux';
import {filterPokemonByName} from '../../libs/redux/pokemon';
import DetailTab from './DetailTab';
import {Colors} from '../../themes/Colors';
import {useNavigation} from '@react-navigation/native';

const DetailPokemon = ({route}) => {
  const navigation = useNavigation();
  const {pokemonName} = route.params;
  const dispatch = useDispatch();
  const filterPokemon = useSelector(state => state.pokemon.filteredData);
  const [color, setColor] = useState('white');

  useEffect(() => {
    if (route.params) {
      dispatch(filterPokemonByName({name: pokemonName}));
    }

    if (filterPokemon) {
      setColor(Colors[filterPokemon.type]);
    }
  }, [dispatch, pokemonName, filterPokemon]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color,
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginHorizontal: 24,
            marginTop: 20,
          }}>
          <Image
            source={require('../../assets/icons/back.png')}
            style={{
              height: 24,
              width: 24,
              tintColor: 'white',
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 40,
            }}>
            {filterPokemon.name}
          </Text>
          <SvgCssUri
            key={filterPokemon.image}
            width="140"
            height="140"
            uri={`${filterPokemon.image}`}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          padding: 20,
        }}>
        <DetailTab data={filterPokemon} />
      </View>
    </View>
  );
};

export default DetailPokemon;

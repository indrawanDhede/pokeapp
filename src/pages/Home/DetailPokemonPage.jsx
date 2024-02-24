import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {filterPokemonByName} from '../../libs/redux/pokemon';
import DetailTab from './common/DetailTab';
import {Colors} from '../../themes/Colors';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const DetailPokemonPage = ({route}) => {
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
    <SafeAreaView style={[styles.container, {backgroundColor: color}]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../../assets/icons/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.title}>{filterPokemon.name}</Text>

          <FastImage
            key={filterPokemon.image}
            style={styles.pokemonImage}
            source={{
              uri: `${filterPokemon.image}`,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </View>

      <View style={styles.detailContainer}>
        <DetailTab data={filterPokemon} />
      </View>
    </SafeAreaView>
  );
};

export default DetailPokemonPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
  },
  backButton: {
    marginHorizontal: 24,
    marginTop: 20,
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: 'white',
  },
  headerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pokemonImage: {
    width: 160,
    height: 160,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
  },
});

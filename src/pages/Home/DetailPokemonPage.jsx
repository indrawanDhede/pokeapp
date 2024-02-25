import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {ImagePokeBall} from '../../assets';
import {filterPokemonByName} from '../../libs/redux/pokemon';
import {Colors} from '../../themes/Colors';
import DetailTab from './common/DetailTab';

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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Image
          source={require('../../assets/icons/back.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <View style={styles.headerContent}>
        <Image
          style={[styles.backgroundImage, styles.pokemonImage]}
          source={ImagePokeBall}
          resizeMode="cover"
        />
        <FastImage
          key={filterPokemon.image}
          style={styles.pokemonImage}
          source={{
            uri: `${filterPokemon.image}`,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.title}>{filterPokemon.name}</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pokemonImage: {
    width: 180,
    height: 180,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    zIndex: -1,
    opacity: 0.7,
    tintColor: 'rgba(192, 192, 192, 0.5)',
  },
});

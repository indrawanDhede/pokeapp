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
import {IconBack} from '../../assets';
import {filterPokemonByName} from '../../libs/redux/pokemon';
import {Colors} from '../../themes/Colors';
import DetailTab from './common/DetailTab';
import {useThemes} from '../../themes/ThemeProvider';

const DetailPokemonPage = ({route}) => {
  const navigation = useNavigation();
  const {theme} = useThemes();
  const {pokemonName} = route.params;
  const dispatch = useDispatch();
  const filterPokemon = useSelector(state => state.pokemon.filteredData);
  const [color, setColor] = useState('skyblue');

  useEffect(() => {
    if (route.params) {
      dispatch(filterPokemonByName({name: pokemonName}));
    }

    if (filterPokemon) {
      setColor(Colors[filterPokemon.type]);
    }
  }, [dispatch, pokemonName, filterPokemon]);

  return (
    <SafeAreaView style={styles.container(color)}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Image source={IconBack} style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.headerContent}>
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
  container: color => ({
    flex: 1,
    backgroundColor: color,
  }),
  backButton: {
    marginHorizontal: 24,
    marginTop: 20,
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: Colors.white,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
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
    backgroundColor: Colors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
  },
});

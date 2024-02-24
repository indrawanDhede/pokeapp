import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useThemes} from '../../themes/ThemeProvider';
import {useNavigation} from '@react-navigation/native';
import {SvgCssUri} from 'react-native-svg/css';
import {Colors} from '../../themes/Colors';

const CardItem = React.memo(
  ({item}) => {
    const {theme} = useThemes();
    const navigation = useNavigation();

    const handleDetail = value => {
      navigation.navigate('Detail', {pokemonName: value.name});
    };

    return (
      <TouchableOpacity
        onPress={() => handleDetail(item)}
        activeOpacity={0.7}
        style={styles.container(theme, item.type)}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.name.toUpperCase()}</Text>
        </View>
        <SvgCssUri width="100" height="100" uri={`${item.image}`} />
        <Image
          source={require('../../assets/images/Pokeball.png')}
          style={[
            styles.pokeballImage,
            {tintColor: 'rgba(192, 192, 192, 0.5)', zIndex: -1},
          ]}
        />
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.item.id === nextProps.item.id;
  },
);

export default CardItem;

const styles = StyleSheet.create({
  container: (theme, color) => ({
    backgroundColor: Colors[color],
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginBottom: 20,
    padding: 20,
    flexDirection: 'row',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    elevation: 4,
    borderWidth: 0.5,
    shadowColor: 'black',
    borderColor: 'rgba(0,0,0,0.200)',
  }),
  pokeballImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    resizeMode: 'contain',
  },
  textContainer: {},
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {generatePercenWidth} from '../../themes/Sizes';
import {Colors} from '../../themes/Colors';

const ChartCard = ({pokemon1, title, pokemon2}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textPokemon1}>
        <Text style={styles.text}>{pokemon1}</Text>
      </View>
      <View style={styles.textTitle}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.textPokemon2}>
        <Text style={styles.text}>{pokemon2}</Text>
      </View>
    </View>
  );
};

export default ChartCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  textPokemon1: {
    width: generatePercenWidth(20),
    backgroundColor: Colors.fire,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textTitle: {
    width: generatePercenWidth(40),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textPokemon2: {
    width: generatePercenWidth(20),
    backgroundColor: Colors.grass,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 12,
    color: Colors.black,
  },
});

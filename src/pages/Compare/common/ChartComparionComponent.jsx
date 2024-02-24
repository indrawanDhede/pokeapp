import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ChartCard} from '../../../components';

const ChartComparisonComponent = ({selectedPokemon1, selectedPokemon2}) => {
  if (selectedPokemon1 && selectedPokemon2) {
    return (
      <View style={styles.chartContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.textChart}>Chart</Text>
        </View>
        <ChartCard
          pokemon1={selectedPokemon1.stats.hp}
          title="HP"
          pokemon2={selectedPokemon2.stats.hp}
        />
        <ChartCard
          pokemon1={selectedPokemon1.stats.attack}
          title="ATTACK"
          pokemon2={selectedPokemon2.stats.attack}
        />
        <ChartCard
          pokemon1={selectedPokemon1.stats.defense}
          title="DEFENSE"
          pokemon2={selectedPokemon2.stats.defense}
        />
        <ChartCard
          pokemon1={selectedPokemon1.stats.specialAttack}
          title="SPECIAL ATTACK"
          pokemon2={selectedPokemon2.stats.specialAttack}
        />
        <ChartCard
          pokemon1={selectedPokemon1.stats.specialDefense}
          title="SPECIAL DEFENSE"
          pokemon2={selectedPokemon2.stats.specialDefense}
        />
        <ChartCard
          pokemon1={selectedPokemon1.stats.speed}
          title="SPEED"
          pokemon2={selectedPokemon2.stats.speed}
        />
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.chartContainer,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text>Select two Pokemon to compare</Text>
      </View>
    );
  }
};

export default ChartComparisonComponent;

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  textChart: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
});

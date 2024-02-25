import React from 'react';
import {View, StyleSheet} from 'react-native';
import {StatCard} from '../../../components';

const StatSection = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.statContainer}>
        <StatCard title="Hp" number={data.stats.hp} color={data.type} />
        <StatCard title="Attack" number={data.stats.attack} color={data.type} />
        <StatCard
          title="Defense"
          number={data.stats.defense}
          color={data.type}
        />
        <StatCard
          title="Sp.Atk"
          number={data.stats.specialAttack}
          color={data.type}
        />
        <StatCard
          title="Sp.Def"
          number={data.stats.specialDefense}
          color={data.type}
        />
        <StatCard title="Speed" number={data.stats.speed} color={data.type} />
      </View>
    </View>
  );
};

export default StatSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  statContainer: {
    flex: 1,
    marginTop: 20,
  },
});

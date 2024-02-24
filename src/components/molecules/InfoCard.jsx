import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const InfoCard = ({title, desc}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.descContainer}>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  titleContainer: {
    width: 100,
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  descContainer: {
    flex: 1,
  },
  desc: {
    fontSize: 16,
    color: 'black',
  },
});

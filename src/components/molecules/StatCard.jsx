import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Statline} from '.';

const StatCard = ({title, number, color}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>{title}</Text>
      </View>

      <View style={styles.numberContainer}>
        <Text style={styles.textNumber}>{number}</Text>
      </View>

      <View style={styles.statlineContainer}>
        <Statline number={number} color={color} />
      </View>
    </View>
  );
};

export default StatCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  titleContainer: {
    width: 100,
  },
  textTitle: {
    fontSize: 16,
    color: 'black',
  },
  berContainer: {
    width: 50,
  },
  textNumber: {
    fontSize: 16,
    color: 'black',
  },
  statlineContainer: {
    flex: 1,
  },
});

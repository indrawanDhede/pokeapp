import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

const AbilitiesSection = ({data}) => {
  const [abilityDetails, setAbilityDetails] = useState([]);

  useEffect(() => {
    const fetchAbilityDetails = async () => {
      const details = await Promise.all(
        data.abilities.map(async abilityData => {
          const abilityResponse = await fetch(abilityData.ability.url);
          const abilityInfo = await abilityResponse.json();
          return abilityInfo;
        }),
      );
      setAbilityDetails(details);
    };

    fetchAbilityDetails();
  }, [data]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {abilityDetails.map((ability, index) => (
        <View key={index} style={styles.abilityContainer}>
          <Text style={styles.abilityName}>Name: {ability.name}</Text>
          <Text style={styles.abilityDescription}>
            Description: {ability.effect_entries[0].short_effect}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default AbilitiesSection;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  abilityContainer: {
    marginBottom: 20,
  },
  abilityName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  abilityDescription: {
    marginTop: 5,
  },
});

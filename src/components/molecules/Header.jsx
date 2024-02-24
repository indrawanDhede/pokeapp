import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {generatePercenWidth, generateRatioHeight} from '../../themes/Sizes';

const Header = React.memo(({title, name}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {title} - {name}
      </Text>
    </View>
  );
});

export default Header;

const styles = StyleSheet.create({
  container: {
    width: generatePercenWidth(100),
    height: generateRatioHeight(20),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

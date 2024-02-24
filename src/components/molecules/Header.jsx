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
    height: generateRatioHeight(30),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {generatePercenWidth, generateRatioHeight} from '../../themes/Sizes';
import {Colors} from '../../themes/Colors';

const Header = React.memo(({title, name}) => {
  return (
    <View style={styles.container}>
      <Text
        allowFontScaling={false}
        ellipsizeMode="tail"
        numberOfLines={1}
        style={styles.text}>
        {title} - {name}
      </Text>
    </View>
  );
});

export default Header;

const styles = StyleSheet.create({
  container: {
    width: generatePercenWidth(100),
    height: generateRatioHeight(18),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
});

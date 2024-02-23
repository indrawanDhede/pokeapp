import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useThemes} from '../../themes/ThemeProvider';
import {useNavigation} from '@react-navigation/native';
import {SvgCssUri} from 'react-native-svg/css';

const CardItem = React.memo(
  ({item}) => {
    const {theme} = useThemes();
    const navigation = useNavigation();

    const handleDetail = value => {
      navigation.navigate('Detail', {items: value});
    };

    return (
      <View>
        {item.image && (
          <TouchableOpacity
            onPress={() => handleDetail(item)}
            activeOpacity={0.7}
            style={styles.container(theme)}>
            <View
              style={{
                backgroundColor: 'yellow',
                justifyContent: 'flex-start',
                alignItem: 'flex-start',
              }}>
              <Text>{item.name.toUpperCase()}</Text>
            </View>
            <SvgCssUri width="100" height="100" uri={`${item.image}`} />
          </TouchableOpacity>
        )}
      </View>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.item.id === nextProps.item.id;
  },
);

export default CardItem;

const styles = StyleSheet.create({
  container: theme => ({
    backgroundColor: 'white',
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
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});

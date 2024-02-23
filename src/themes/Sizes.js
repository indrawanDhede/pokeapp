import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default SIZES = {
  margin_5: width * (5 / 100),
  margin_10: width * (10 / 100),
};

export const generateWidth = val => {
  return width * (val / 100);
};

export const generateHeight = val => {
  return height * (val / 100);
};

import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

export default SIZES = {
  margin_5: width * (5 / 100),
  margin_10: width * (10 / 100),
};

export const generatePercenWidth = val => {
  return width * (val / 100);
};

export const generatePercenHeight = val => {
  return height * (val / 100);
};

export const generateRatioWidth = val => {
  const sizeInDIP = val / PixelRatio.get();
  return width * (sizeInDIP / 100);
};

export const generateRatioHeight = val => {
  const sizeInDIP = val / PixelRatio.get();
  return height * (sizeInDIP / 100);
};

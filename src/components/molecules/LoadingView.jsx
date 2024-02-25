import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Colors} from '../../themes/Colors';

const LoadingView = () => {
  return (
    <ActivityIndicator
      color={Colors.ice}
      size="small"
      style={{marginVertical: 10}}
    />
  );
};

export default LoadingView;

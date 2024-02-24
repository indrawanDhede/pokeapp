import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../themes/Colors';

const Statline = ({number, color}) => {
  return (
    <View
      style={{
        width: number,
        height: 5,
        marginVertical: 6,
        marginLeft: 10,
        borderRadius: 5,
        backgroundColor: Colors[color],
      }}
    />
  );
};

export default Statline;

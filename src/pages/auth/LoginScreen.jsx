import React from 'react';
import {Button, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction} from '../../libs/redux/user';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.user);

  console.log('user login', data);

  const handleLogin = async () => {
    dispatch(loginAction());
  };

  return (
    <View>
      <Button title="Login" onPress={() => handleLogin()} />
    </View>
  );
};

export default LoginScreen;

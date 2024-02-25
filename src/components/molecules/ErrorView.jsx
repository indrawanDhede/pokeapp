import {View, Text, Button, StyleSheet} from 'react-native';
import React from 'react';
import {useThemes} from '../../themes/ThemeProvider';

const ErrorView = ({error, handleRetry}) => {
  const {theme} = useThemes();

  return (
    <View style={styles.container(theme)}>
      <Text
        allowFontScaling={false}
        ellipsizeMode="tail"
        numberOfLines={3}>{`Error: ${error}`}</Text>
      <Button title="Retry" onPress={handleRetry} />
    </View>
  );
};

export default ErrorView;

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLOR_WHITE_NAVY,
  }),
});

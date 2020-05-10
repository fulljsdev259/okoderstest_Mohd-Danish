import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text, Spinner} from 'native-base';
import COLORS from '../utils/colors';

export default function GenericButton({
  onPress,
  isLoading,
  disabled,
  text,
  style,
  block,
}) {
  return (
    <Button
      onPress={onPress}
      disabled={disabled  ? disabled :false}
      style={styles.button}
    >
      {isLoading ? <Spinner color={COLORS.WHITE} /> : <Text>{text}</Text>}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    justifyContent: 'center',
  },
});

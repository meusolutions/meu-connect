import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import colors from '../../values/colors';
const CheckBoxComponent = ({text, value, onValueChange, index = 0}) => {
  return (
    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>{text}</Text>
      <CheckBox
        disabled={false}
        value={value}
        boxType="circle"
        onValueChange={newValue => onValueChange(newValue, index)}
        tintColor={colors.blue04}
      />
    </SafeAreaView>
  );
};

export default CheckBoxComponent;

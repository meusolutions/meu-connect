import React from 'react';
import {View} from 'react-native';
import TextInputComponent from '../../../../components/TextInputComponent';
import ButtonComponent from '../../../../components/ButtonComponent';
import colors from '../../../../values/colors';
const ActiveCode = props => {
  const {activeCode, setActiveCode, onPressRequestInvite} = props;

  return (
    <View>
      <TextInputComponent
        value={activeCode}
        placeholder={'12345'}
        styleAreaInput={{backgroundColor: 'white'}}
        autoCompleteType={'postal-address'}
        onChangeText={setActiveCode}
        errors={activeCode.length == 0}
      />
      <ButtonComponent
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 15,
        }}
        text={'Đồng ý'}
        textStyle={{color: colors.blue04, fontWeight: 'bold'}}
        onPress={
          activeCode.length > 0
            ? () => onPressRequestInvite()
            : console.log('onPressRequest')
        }
        backgroundColor={colors.white}
        bordered={true}
      />
    </View>
  );
};

export default ActiveCode;

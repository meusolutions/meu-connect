import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {HelperText} from 'react-native-paper';
import colors from '../values/colors';
import styles from '../screens/authentication/login/styles';
const TextInputComponent = ({
  placeholder,
  style,
  placeholderTextColor,
  keyboardType,
  autoCapitalize,
  onChangeText,
  onBlur,
  value,
  errors,
  rightIcon,
  onPressRightIcon,
  leftIcon,
  onPressLeftIcon,
  styleAreaInput,
  secureTextEntry,
  label,
  require,
  styleLabel,
  maxLength,
  onFocus,
  disable,
  noBorder,
  autoCompleteType,
  borderColor,
  type,
  multiline,
  numberOfLines,
}) => {
  return (
    <View style={stylesTextInput.container}>
      {label && (
        <View style={stylesTextInput.containerLabel}>
          <Text
            children={`${label}`}
            style={[stylesTextInput.textLabel, styleLabel]}
          />
          {require && <Text children={' *'} style={{color: colors.red}} />}
        </View>
      )}
      <View
        style={[
          noBorder
            ? stylesTextInput.containerAreaInputNoBorder
            : stylesTextInput.containerAreaInput,
          styleAreaInput,
          {borderColor: borderColor},
        ]}>
        {leftIcon && (
          <TouchableOpacity
            onPress={() => {
              onPressLeftIcon && onPressLeftIcon();
            }}
            style={stylesTextInput.leftIcon}>
            <Image source={leftIcon} style={stylesTextInput.icon} />
          </TouchableOpacity>
        )}
        <TextInput
          style={[stylesTextInput.textInput, style]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor ?? colors.grayC4}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          onFocus={onFocus}
          editable={!disable}
          autoComplete={autoCompleteType}
          multiline={multiline}
          numberOfLines={10}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={() => {
              onPressRightIcon && onPressRightIcon();
            }}>
            <Image source={rightIcon} style={stylesTextInput.icon} />
          </TouchableOpacity>
        )}
      </View>
      {errors && (
        <HelperText type="error" visible={Boolean(errors)}>
          {'Vui lòng nhập đầy đủ !!!'}
        </HelperText>
      )}
    </View>
  );
};
const stylesTextInput = StyleSheet.create({
  container: {
    width: '100%',
  },
  containerAreaInput: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: '100%',
    ...styles.inputBox2,
    marginTop: 5,
    paddingHorizontal: 8,
    paddingRight: 12,
    borderColor: colors.black1,
    borderWidth: 1,
  },
  containerAreaInputNoBorder: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    ...styles.inputBox2,
    marginTop: 5,
    paddingHorizontal: 8,
    paddingRight: 12,
    borderBottomWidth: 0.2,
  },
  icon: {
    width: 20,
    height: 20,
  },
  textInput: {
    flex: 1,
    color: colors.royal_blue,
    // marginLeft: 10,
    height: 40,
  },
  textLabel: {
    color: colors.black1,
    fontSize: 16,
    fontFamily: 'SegoeUI',
  },
  leftIcon: {
    height: 50,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  containerLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default TextInputComponent;

import React from 'react';
import {
  View,
  Text,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import {styles, txtStyles} from './deleteStyles';
import {IcGreyBack, DeleteAccountSVG} from '../../../values/images';
import colors from '../../../values/colors';
import * as Yup from 'yup';
import {Formik} from 'formik';
export default function DeleteMainView(props) {
  const {
    isLoading,
    timeLeft,
    handleSendDeleteOtp,
    handleDeleteAccount,
    onBack,
  } = props;
  const Schema = Yup.object().shape({
    email: Yup.string()
      .email('Vui lòng nhập email hợp lệ')
      .required('Nhập email của bạn')
      .trim(),
    password: Yup.string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(25, 'Mật khẩu không dài quá 25 ký tự')
      .required('Nhập mật khẩu')
      .trim(),
    otpCode: Yup.string().required('Nhập mã OTP').trim(),
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.main}
      onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.main}>
        <View style={styles.main}>
          <Formik
            initialValues={{
              email: '',
              password: '',
              otpCode: '',
            }}
            validationSchema={Schema}
            onSubmit={async data => handleDeleteAccount(data)}
            validateOnChange>
            {({handleSubmit, handleChange, handleBlur, errors, values}) => {
              const deleteInput = [
                {
                  label: 'Email',
                  placeholder: 'Nhập email của bạn',
                  name: 'email',
                  value: values.email,
                  error: errors.email,
                },
                {
                  label: 'Password',
                  placeholder: 'Nhập mật khẩu',
                  name: 'password',
                  value: values.password,
                  error: errors.password,
                },
                {
                  label: 'OTP',
                  placeholder: 'Vui lòng nhập mã xác thực',
                  name: 'otpCode',
                  value: values.otpCode,
                  error: errors.otpCode,
                },
              ];
              return (
                <View>
                  <TouchableOpacity
                    onPress={onBack}
                    style={{
                      marginTop: 10,
                    }}>
                    <IcGreyBack width={30} height={30} />
                  </TouchableOpacity>
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <DeleteAccountSVG width={300} height={300} />
                  </View>
                  <View
                    style={{
                      marginVertical: 10,
                      backgroundColor: colors.white,
                    }}>
                    {deleteInput.map(input => {
                      const {label, placeholder, name} = input;
                      return (
                        <View style={styles.inputContainer} key={name}>
                          <View
                            style={{
                              flex: 1,
                              paddingLeft: 10,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: colors.gray9e,
                              }}>
                              {label}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 3,
                            }}>
                            <TextInput
                              style={{
                                fontSize: 16,
                              }}
                              placeholder={placeholder}
                              placeholderTextColor={colors.gray9e}
                              activeOutlineColor={colors.black1}
                              secureTextEntry={input.name == 'password'}
                              autoCapitalize="none"
                              onChangeText={handleChange(input.name)}
                              value={input.value}
                              errors={input.error}
                              // label={label}
                              outlineColor={colors.white}
                              outlineStyle={{
                                borderColor: colors.white,
                              }}
                              require
                              mode="outlined"
                            />
                            {input.error && (
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: 'red',
                                }}>
                                {input.error}
                              </Text>
                            )}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                  <TouchableOpacity
                    onPress={() => handleSendDeleteOtp()}
                    style={styles.btnSendOTP}>
                    <Text
                      style={{
                        color: colors.blue04,
                      }}>
                      {`${'Send otp'} 00:${timeLeft
                        .toString()
                        .padStart(2, '0')}`}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={
                      values.email.length == 0 ||
                      values.password.length == 0 ||
                      values.otpCode.length == 0
                        ? true
                        : false
                    }
                    onPress={handleSubmit}
                    style={
                      values.email.length == 0 ||
                      values.password.length == 0 ||
                      values.otpCode.length == 0
                        ? styles.btnDisableSubmit
                        : styles.btnSubmit
                    }>
                    <Text
                      style={{
                        color: colors.white,
                        fontWeight: '600',
                      }}>
                      {'Xóa tài khoản'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
}

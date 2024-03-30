import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
  Text,
} from 'react-native';
import colors from '../../../values/colors';
import signupStyles from './styles';
import {TextInput, Button} from 'react-native-paper';
import {IMAGES, BgIntroduce} from '../../../values/images';
import RootNavigation from '../../../navigation/RootNavigation';
import {APP_NAVIGATE_SCREEN} from '../../../utils/constant';
import {LOGO} from '../../../assets/svgAsset';
import TextInputComponent from '../../../components/TextInputComponent';
import LoadingProgress from '../../../components/LoadingProgress';
export default function SignUpMainView(props) {
  const {
    t,
    userInfo,
    setUserInfo,
    navigateToLogin,
    onSubmitRegister,
    isLoading,
  } = props;
  const formSignUp = [
    {
      name: t('Full_name'),
      placeholder: t('Enter_your_full_name'),
      value: userInfo.name,
      onChangeText: value => setUserInfo(prev => ({...prev, name: value})),
      secureTextEntry: false,
      rightIcon: null,
    },
    {
      name: t('Email'),
      placeholder: t('Enter_your_email'),
      value: userInfo.email,
      onChangeText: value => setUserInfo(prev => ({...prev, email: value})),
      secureTextEntry: false,
      rightIcon: null,
    },
    {
      name: t('Password'),
      placeholder: t('Enter_your_password'),
      value: userInfo.password,
      onChangeText: value => setUserInfo(prev => ({...prev, password: value})),
      secureTextEntry: showPass,
      rightIcon: showPass ? IMAGES.IcVisibleEye : IMAGES.IcHideEye,
      onPressRightIcon: () => setShowPass(!showPass),
    },
    {
      name: t('Re_enter_your_password'),
      placeholder: t('Re_enter_your_password'),
      value: userInfo.re_password,
      onChangeText: value =>
        setUserInfo(prev => ({...prev, re_password: value})),
      secureTextEntry: showRePass,
      rightIcon: showRePass ? IMAGES.IcVisibleEye : IMAGES.IcHideEye,
      onPressRightIcon: () => setShowRePass(!showRePass),
    },
  ];
  const [showPass, setShowPass] = useState(true);
  const [showRePass, setShowRePass] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Image
            source={BgIntroduce.BgTop}
            style={[signupStyles.bgFullWidth]}
          />
        </View>
        <View
          style={[
            signupStyles.signUpContainer,
            {alignItems: 'center', flex: 8},
          ]}>
          <View style={signupStyles.viewSignUp}>
            <Text style={[signupStyles.textTitleHeader, signupStyles.textBlue]}>
              {t('SignUp')}
            </Text>
            {formSignUp.map((item, index) => {
              return (
                <View style={{width: '100%'}} key={index}>
                  <Text style={{color: 'black', fontSize: 13}}>
                    {item.name}
                  </Text>
                  <TextInputComponent
                    styleAreaInput={{
                      backgroundColor: colors.white,
                      marginVertical: 8,
                    }}
                    placeholder={item.placeholder}
                    value={item.value}
                    onChangeText={value => item.onChangeText(value)}
                    secureTextEntry={
                      (item.name == t('Password') && showPass) ||
                      (item.name == t('Re_enter_your_password') && showRePass)
                    }
                    rightIcon={
                      item.name == t('Password')
                        ? showPass
                          ? IMAGES.IcVisibleEye
                          : IMAGES.IcHideEye
                        : item.name == t('Re_enter_your_password')
                        ? showRePass
                          ? IMAGES.IcVisibleEye
                          : IMAGES.IcHideEye
                        : null
                    }
                    onPressRightIcon={() =>
                      item.name == t('Password')
                        ? setShowPass(!showPass)
                        : item.name == t('Re_enter_your_password')
                        ? setShowRePass(!showRePass)
                        : null
                    }
                    borderColor={
                      item.value.length === 0
                        ? colors.red
                        : colors.black &&
                          item.name == t('Re_enter_your_password')
                        ? item.value === userInfo.password
                          ? colors.black
                          : colors.red
                        : colors.black
                    }
                  />
                </View>
              );
            })}
            <Text style={signupStyles.haveAccTxt} onPress={navigateToLogin}>
              {t('Have_account')}
            </Text>

            <Button
              mode="contained"
              uppercase={false}
              color={colors.blue2b}
              labelStyle={{color: colors.white}}
              style={{marginBottom: 8}}
              onPress={onSubmitRegister}>
              {t('SignUp')}
            </Button>
            <Button
              mode="none"
              uppercase={false}
              color={colors.yellow}
              labelStyle={{color: colors.blue2b}}
              onPress={() =>
                RootNavigation.navigate(APP_NAVIGATE_SCREEN.LOGIN)
              }>
              {t('Back')}
            </Button>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Image source={BgIntroduce.BgFtStep1} />
        </View>
      </SafeAreaView>
      {isLoading && <LoadingProgress />}
    </KeyboardAvoidingView>
  );
}

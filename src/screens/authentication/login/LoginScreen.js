import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  View
} from 'react-native';
import ButtonComponent from '../../../components/ButtonComponent';
import LoadingProgress from '../../../components/LoadingProgress';
import TextInputComponent from '../../../components/TextInputComponent';
import MyWebComponent from '../../../components/webview';
import RootNavigation from '../../../navigation/RootNavigation';
import { APP_NAVIGATE_SCREEN } from '../../../utils/constant';
import colors from '../../../values/colors';
import { BgIntroduce, IMAGES } from '../../../values/images';
import styles from './styles';

const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({
  loading,
  showPass,
  handleLogin,
  setShowPass,
  userAccount,
  handleUserName,
  handlePassword,
  isAccept,
  setAccept,
  isOpenWebView,
  setOpenWebView,
  onCloseWebView,
}) => {
  const URI_PRIVACY_POLICY = 'https://meu-solutions.com/privacy-policy/';
  const {t, i18n} = useTranslation();

  return (
    <SafeAreaView style={styles.slide5}>
      {isOpenWebView ? (
        <MyWebComponent uri={URI_PRIVACY_POLICY} onBack={onCloseWebView} />
      ) : (
        <View style={styles.slide5}>
          <View style={{flex: 1}}>
            <Image source={BgIntroduce.BgTop} style={[styles.bgFullWidth]} />
          </View>
          <View
            style={[styles.loginContainer, {flex: 4, alignItems: 'center'}]}>
            <View style={styles.viewLogin}>
              <Text style={[styles.textTitleHeader, styles.textBlue]}>
                {t('Login')}
              </Text>
              <Text style={{color: 'black'}}>{t('Email')}</Text>
              <TextInputComponent
                styleAreaInput={{
                  backgroundColor: colors.white,
                  marginBottom: 10,
                }}
                placeholder={t('Enter_your_email')}
                keyboardType={'email-address'}
                onChangeText={handleUserName}
                value={userAccount.username}
                leftIcon={IMAGES.IcMail}
              />
              <Text style={{color: 'black'}}>{t('Password')}</Text>
              <TextInputComponent
                styleAreaInput={{
                  backgroundColor: colors.white,
                  marginBottom: 10,
                }}
                placeholder={t('Enter_your_password')}
                onChangeText={handlePassword}
                value={userAccount.password}
                rightIcon={showPass ? IMAGES.IcVisibleEye : IMAGES.IcHideEye}
                onPressRightIcon={() => {
                  setShowPass(!showPass);
                }}
                secureTextEntry={showPass}
                leftIcon={IMAGES.IcLock}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                  <View style={styles.checkbox}>
                  <CheckBox
                  value={isAccept}
                  onValueChange={setAccept}
                  hideBox
                  //style={styles.checkbox}
                />
                  </View>
               
                <Text
                // style={styles.forgetPassword}
                >
                  {t('Accept_term')}
                </Text>
                <Text
                  style={styles.txtTerm}
                  onPress={() => setOpenWebView(true)}>
                  {t('Terms_and_conditions')}
                </Text>
              </View>
              <Text
                style={styles.forgetPassword}
                onPress={() =>
                  RootNavigation.navigate(APP_NAVIGATE_SCREEN.SIGN_UP)
                }>
                {t('Sign_Up_Account')}
              </Text>
              <ButtonComponent
                style={[
                  styles.loginScreenBtn,
                  {backgroundColor: colors.primary_blue},
                ]}
                text={t('Login')}
                textStyle={{color: colors.white, fontWeight: 'bold'}}
                onPress={handleLogin}
                backgroundColor={colors.white}
                bordered={true}
              />
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Image source={BgIntroduce.BgFtStep1} />
          </View>
          {loading && <LoadingProgress />}
        </View>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

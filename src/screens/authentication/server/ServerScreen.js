import React from 'react';
import {
  Button,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';
import {IMAGES, BgIntroduce} from '../../../values/images';
import colors from '../../../values/colors';
import string from '../../../values/string';
import styles from './styles';
import TextInputComponent from '../../../components/TextInputComponent';
import ButtonComponent from '../../../components/ButtonComponent';
import LoadingProgress from '../../../components/LoadingProgress';
import Alert from 'react-native-awesome-alerts';
import {useTranslation} from 'react-i18next';
import SelectDropdown from 'react-native-select-dropdown';

const ServerScreen = ({
  loading,
  domain,
  showAlert,
  errorDomain,
  chooseLanguage,
  defaultLanguage,
  onSubmitDomain,
  hideAlert,
  onChangeDomain,
  onChangeLanguage,
}) => {
  const language = ['Vn', 'En'];
  const {t, i18n} = useTranslation();
  return (
    <SafeAreaView style={styles.slide4}>
      <View style={styles.slide4}>
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
          <SelectDropdown
            data={language}
            dropdownIconPosition={'right'}
            defaultButtonText={defaultLanguage}
            buttonStyle={styles.dropdown1BtnStyle}
            onSelect={(selectedItem, index) => onChangeLanguage(selectedItem)}
            placeholder
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <Image
                  source={isOpened ? IMAGES.IcUpArrow : IMAGES.IcDownArrow}
                  style={{width: 20, height: 20}}
                />
              );
            }}
          />
        </View>
        <View style={{flex: 4}}>
          <Image source={IMAGES.IcInputDomain} style={{alignSelf: 'center'}} />

          <View style={styles.loginContainer}>
            <Text
              style={errorDomain.type ? styles.errorUrl : styles.validateUrl}>
              {t('Domain')}
            </Text>
            <TextInputComponent
              styleAreaInput={{backgroundColor: colors.white}}
              style={styles.inputDomain}
              value={domain}
              onChangeText={newText => onChangeDomain(newText)}
              autoCompleteType={'postal-address'}
              keyboardType={'url'}
              borderColor={errorDomain.type === false && '#00d816'}
              rightIcon={errorDomain.isShow === true && errorDomain.icon}
            />
            <Text
              style={[
                errorDomain.type ? styles.errorUrl : styles.validateUrl,
                {marginTop: -15, marginBottom: 20},
              ]}>
              {errorDomain.text}
            </Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ButtonComponent
                style={[styles.btnNext, {backgroundColor: errorDomain.color}]}
                onPress={onSubmitDomain}
                text={t('Next')}
                textStyle={styles.textDisabled}
              />
            </View>
          </View>
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text style={{marginLeft: 20}}>2022 @ MeU Solutions, Inc</Text>
          <Image source={BgIntroduce.BgFtStep1} style={styles.bgFullWidth} />
        </View>
        {loading && <LoadingProgress />}
      </View>
      <Alert
        show={showAlert.isError}
        showProgress={false}
        title={showAlert.title}
        message={showAlert.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Đóng"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={hideAlert}
      />
    </SafeAreaView>
  );
};

export default ServerScreen;

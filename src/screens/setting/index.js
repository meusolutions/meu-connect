import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, SafeAreaView, Text, View} from 'react-native';
import RNRestart from 'react-native-restart';
import ButtonComponent from '../../components/ButtonComponent';
import CheckBoxComponent from '../../components/checkbox';
import Config from '../../configuration';
import RootNavigation from '../../navigation/RootNavigation';
import Utils from '../../utils';
import colors from '../../values/colors';
import {BgHeaders} from '../../values/images';
import styles from './settingStyles';
const restartApp = () => {
  RNRestart.restart();
};

const SettingMainView = React.memo(
  function (props) {
    const {checkboxValue, t, handleSelectTheme, checkboxHandler, onGoBack} =
      props;
    return (
      <View>
        <Text style={styles.txtTitle}>Đổi chủ đề</Text>
        <View style={styles.optionContainer}>
          {checkboxValue.map((item, index) => (
            <View
              key={index}
              style={{
                margin: 20,
                alignItems: 'center',
              }}>
              <Image
                source={item.icon}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 60,
                }}
              />
              <CheckBoxComponent
                text={item.name}
                value={item.checked}
                onValueChange={checkboxHandler}
                index={index}
              />
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <ButtonComponent
            style={[styles.button, {backgroundColor: colors.red}]}
            text={t('Cancel')}
            textStyle={styles.buttonText}
            onPress={onGoBack}
            backgroundColor={colors.blue04}
            bordered={true}
          />
          <ButtonComponent
            style={[styles.button, {backgroundColor: colors.primary_blue}]}
            text={t('Confirm')}
            textStyle={styles.buttonText}
            onPress={handleSelectTheme}
            backgroundColor={colors.white}
            bordered={true}
          />
        </View>
      </View>
    );
  },
  function areEqual(prevProps, nextProps) {
    return prevProps.checkboxValue === nextProps.checkboxValue;
    // return true => không re-render
  },
);
export default function SettingScreen(props) {
  const {t, i18n} = useTranslation();
  const [checkboxValue, setCheckboxValue] = React.useState(BgHeaders);

  const checkboxHandler = (value, index) => {
    const newValue = checkboxValue.map((checkbox, i) => {
      if (i !== index)
        return {
          ...checkbox,
          checked: false,
        };
      if (i === index) {
        const item = {
          ...checkbox,
          checked: !checkbox.checked,
        };
        return item;
      }
      return checkbox;
    });
    setCheckboxValue(newValue);
  };
  const onGoBack = () => RootNavigation.goBack();
  const loadTheme = async () => {
    var cloneThem = [...BgHeaders];
    const getTheme = await Utils.getData(Config.storageKey.THEME);
    if (Object.keys(getTheme).length > 0) {
      const index = BgHeaders.findIndex(e => e.icon === getTheme[0].icon);
      cloneThem[index] = getTheme[0];
      setCheckboxValue([...cloneThem]);
    } else {
      cloneThem[0].checked = true;
      setCheckboxValue([...cloneThem]);
    }
  };
  const handleSelectTheme = async () => {
    const theme = checkboxValue.filter(item => item.checked);
    await Utils.storeData(Config.storageKey.THEME, theme).then(restartApp);
  };
  useEffect(() => {
    loadTheme();
  }, []);
  const settingProps = {
    checkboxValue,
    t,
    handleSelectTheme,
    checkboxHandler,
    onGoBack,
  };
  return (
    <SafeAreaView>
      <SettingMainView {...settingProps} />
    </SafeAreaView>
  );
}

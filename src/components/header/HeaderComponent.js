import React, {useEffect, useState} from 'react';
import {ImageBackground, SafeAreaView, Image} from 'react-native';
import Config from '../../configuration';
import Utils from '../../utils';
import {IMAGES} from '../../values/images';
import styles from './style';
import {useSelector} from 'react-redux';
import {myCompanyInfoSelector} from '../../app/selectors';

const HeaderComponent = props => {
  const [theme, setTheme] = useState();

  const companyInfo = useSelector(myCompanyInfoSelector);

  const loadTheme = async () => {
    const getTheme = await Utils.getData(Config.storageKey.THEME);
    Object.keys(getTheme).length > 0
      ? setTheme(getTheme[0].icon)
      : setTheme(IMAGES.BgHeader);
  };

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground
        style={styles.container}
        source={theme}
        resizeMode="stretch">
        {companyInfo && companyInfo.length > 0 && (
          <Image
            source={{uri: companyInfo[0].website + companyInfo[0].logo}}
            style={{width: 35, height: 35}}
          />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HeaderComponent;

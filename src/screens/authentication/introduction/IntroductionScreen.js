import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {IMAGES, BgIntroduce} from '../../../values/images';
import colors from '../../../values/colors';
import string from '../../../values/string';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';

const windowHeight = Dimensions.get('window').height;

const IntroductionScreen = ({
  indexSwiper,
  showsPagination,
  scroll,
  nextView,
  preView,
  onSwiper,
  navigateToDomain
}) => {
  const {t, i18n} = useTranslation();
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      loop={false}
      index={indexSwiper}
      showsPagination={showsPagination}
      scrollEnabled={scroll}
      activeDot={
        <View
          style={{
            backgroundColor: '#007aff',
            width: 25,
            height: 8,
            borderRadius: 4,
          }}
        />
      }
      paginationStyle={{
        bottom: windowHeight / 4,
      }}
      onIndexChanged={index => onSwiper(index)}>
      <SafeAreaView style={styles.slide1}>
        <View style={styles.slide1}>
          <Image source={BgIntroduce.BgStep1} style={styles.ImageIntroduce} />
          <Image source={IMAGES.IcLogo} style={styles.logoMin}/>
          <LinearGradient
            colors={['#fbc2eb', '#a6c1ee']}
            style={{
              width: 60,
              height: 5,
              marginTop: 10,
              marginBottom: 30,
              borderRadius: 10,
            }}
          />

          {/* <Text style={styles.text}>{string.TITLE_STEP_1}</Text> */}
          <Text style={styles.text}>{t('Overtime_monitoring')}</Text>
          <Text style={styles.subText}>{t('Send_req_OT')}</Text>
          {/* <TouchableOpacity onPress={nextView} style={[styles.startedBtn, styles.centerBtn]}>
                        <Text style={styles.txtBtn}>{string.GET_STARTED}</Text>
                    </TouchableOpacity> */}
          <Image
            source={BgIntroduce.BgFtStep1}
            style={styles.ImageFooterIntroduce}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.slide2}>
        <View style={styles.slide2}>
          <Image source={BgIntroduce.BgStep2} style={styles.ImageIntroduce} />
          <Image source={IMAGES.IcLogo} style={styles.logoMin}/>
          <LinearGradient
            colors={['#fbc2eb', '#a6c1ee']}
            style={{
              width: 60,
              height: 5,
              marginTop: 15,
              marginBottom: 20,
              borderRadius: 10,
            }}
          />

          <Text style={styles.text}>{t('Manager_Leave')}</Text>
          <Text style={styles.subText}>{t('Track_emp_leave')}</Text>
          {/* <TouchableOpacity onPress={nextView} style={[styles.centerBtn, styles.noBorderBtn]} title="Next" >
                        <Text style={styles.textPrimary}>{string.NEXT_BUTTON}</Text>
                    </TouchableOpacity> */}
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.slide3}>
        <View style={styles.slide3}>
          <Image source={BgIntroduce.BgStep3} style={styles.ImageIntroduce} />
          <Image source={IMAGES.IcLogo} style={styles.logoMin}/>
          <LinearGradient
            colors={['#fbc2eb', '#a6c1ee']}
            style={{
              width: 60,
              height: 5,
              marginTop: 15,
              marginBottom: 20,
              borderRadius: 10,
            }}
          />

          <Text style={styles.text}>{t('Payroll')}</Text>
          <Text style={styles.subText}>{t('Ez_manager_payroll')}</Text>
          <TouchableOpacity
            onPress={navigateToDomain}
            style={[styles.centerBtn, styles.noBorderBtn]}
            title="Next">
            <Text style={styles.textPrimary}>{string.NEXT_BUTTON}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Swiper>
  );
};

export default IntroductionScreen;

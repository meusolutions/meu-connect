import React from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {Menu, MenuItem} from 'react-native-material-menu';
import {EMAIL_SVG, SMART_PHONE} from '../../../../assets/svgAsset';
import colors from '../../../../values/colors';
import {IMAGES} from '../../../../values/images';
import styles from '../../style';
const {width, height} = Dimensions.get('window');

const GuestView = props => {
  const {onNavigateToServer, navigateToLogout, visibleMenu, setVisibleMenu} =
    props;
  return (
    <SafeAreaView>
      <ScrollView
        decelerationRate={'fast'}
        horizontal
        style={{marginHorizontal: 10}}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}>
        <View style={{marginHorizontal: 10}}>
          <View style={styles.viewPersonInfo}>
            <TouchableOpacity onPress={setVisibleMenu} style={styles.icShare}>
              <Image source={IMAGES.IcMenuVertical} />
              <Menu visible={visibleMenu} onRequestClose={setVisibleMenu}>
                <MenuItem onPress={onNavigateToServer}>
                  <Text>Nhập server</Text>
                </MenuItem>
                <MenuItem onPress={navigateToLogout}>
                  <Text>Đăng nhập</Text>
                </MenuItem>
              </Menu>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('press avatar')}
              style={styles.viewAvatar}>
              <ImageBackground
                style={styles.imgAvatar}
                source={IMAGES.ImgAvatar}
                imageStyle={styles.imgAvatar}></ImageBackground>
            </TouchableOpacity>

            <Text style={styles.txtName}>Khách</Text>

            <Text style={{color: colors.purple_blue, marginBottom: 20}}>
              Khách
            </Text>

            <Text style={styles.contentCard}>
              'I’m a kiddo that fall in love with amazing user-centric designs.
              I have been playing around with designs via Figma for a long time'
            </Text>

            <View style={{width: '100%'}}>
              <View style={[styles.flexRow, {marginTop: 15}]}>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <EMAIL_SVG />
                </View>
                <Text style={[styles.subTxt, {flex: 2}]}>
                  example@gmail.com
                </Text>
              </View>

              <View style={styles.flexRow}>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <SMART_PHONE />
                </View>
                <Text style={[styles.subTxt, {flex: 2}]}>Chưa có</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GuestView;

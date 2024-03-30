import {Dimensions, StyleSheet} from 'react-native';
import dimension from '../../../values/dimension';
import colors from '../../../values/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  loginContainer: {
    marginTop: dimension.defaultMargin * 2,
    marginHorizontal: dimension.defaultMargin * 1.5,
  },
  signUpContainer: {
    marginTop: dimension.defaultMargin,
    marginHorizontal: dimension.defaultMargin * 1.5,
  },
  signText: {
    fontSize: dimension.fontSizeLarge,
    fontFamily: 'SegoeUI-Semibold',
    color: colors.white,
    marginBottom: dimension.defaultMargin * 2,
  },
  loginText: {
    fontSize: dimension.fontSizeLarge,
    fontFamily: 'SegoeUI-Semibold',
    color: colors.white,
    marginBottom: dimension.defaultMargin * 2.5,
  },
  inputBox: {
    marginTop: dimension.defaultMargin,
    borderRadius: dimension.borderRadius,
    paddingHorizontal: dimension.defaultPadding,
    paddingVertical: dimension.defaultPadding * 0.75,
    color: colors.white,
    backgroundColor: colors.royal_blue,
    fontFamily: 'SegoeUI',
  },
  inputBox2: {
    marginTop: dimension.defaultMargin * 0.6,
    borderRadius: dimension.borderRadius,
    paddingHorizontal: dimension.defaultPadding,
    paddingVertical: dimension.defaultPadding * 0.75,
    color: colors.white,
    backgroundColor: colors.input_green,
    fontFamily: 'SegoeUI',
  },
  loginScreenBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
  },
  forgetPassword: {
    alignSelf: 'flex-end',
    color: colors.royal_blue,
    fontSize: 14,
    marginBottom: 10,
  },
  signUpLines: {
    marginTop: dimension.defaultMargin * 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    color: colors.royal_blue,
    fontSize: 16,
    fontFamily: 'SegoeUI',
    marginTop: -12,
    paddingHorizontal: 12,
    zIndex: 3,
  },
  textError: {
    color: colors.red,
    fontSize: 14,
    marginTop: 5,
    marginLeft: 5,
  },
  logo: {
    width: Dimensions.get('screen').height * 0.2,
    height: Dimensions.get('screen').height * 0.2,
    borderRadius: 5,
    borderBottomLeftRadius: 60,
  },
  containerLogo: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 120,
  },
  containerEmailSend: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  textSendEmail: {
    textAlign: 'center',
    color: colors.royal_blue,
    marginTop: 10,
    paddingHorizontal: '10%',
  },
  iconMailSender: {
    width: 50,
    height: 50,
  },
  textTitleHeader: {
    fontWeight: '400',
    fontSize: 20,
  },
  wrapper: {},
  slide1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  slide2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  slide3: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  slide4: {
    flex: 1,
    backgroundColor: colors.white,
  },
  slide5: {
    flex: 1,
    backgroundColor: colors.white,

    backgroundColor: colors.white,
  },
  text: {
    color: colors.purple_blue,
    fontSize: 25,
    fontWeight: '500',
  },
  subText: {
    color: '#757575',
    fontSize: 16,
  },
  textPrimary: {
    color: colors.primary_blue,
    fontSize: 18,
  },
  textDisabled: {
    color: colors.white,
    fontSize: 18,
  },
  textBlack: {
    color: 'black',
    fontSize: 18,
  },
  txtBtn: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Times',
  },
  centerBtn: {
    position: 'absolute',
    bottom: windowHeight / 6,
  },
  noBorderBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  startedBtn: {
    borderWidth: 1,
    borderColor: colors.primary_blue,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 2.5,
    height: 50,
    backgroundColor: colors.primary_blue,
  },
  inputDomain: {
    borderRadius: 50,
  },
  ImageIntroduce: {
    width: windowWidth,
    height: windowHeight / 2,
  },
  ImageFooterIntroduce: {
    width: windowWidth,
    height: 60,
    bottom: 0,
    position: 'absolute',
  },
  btnNext: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 3,
    borderRadius: 10,
  },
  disableBtn: {
    padding: 15,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 3,
    borderRadius: 10,
  },
  validateUrl: {
    color: colors.green,
  },
  errorUrl: {
    color: colors.red,
  },
  bgFullWidth: {
    width: windowWidth,
  },
  viewLogin: {
    borderWidth: 0.1,
    borderRadius: 30,
    borderColor: '#e2e2e2',
    padding: 20,
  },
  textBlue: {
    color: '#1399fb',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 25,
    fontWeight: 'bold',
  },
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'center'},
  dropdown1BtnStyle: {
    backgroundColor: '#FFF',
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: 'red'},
  logoMin: {
    width: 30,
    height: 30,
  },
});

export default styles;

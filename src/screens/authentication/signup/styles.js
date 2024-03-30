import {StyleSheet, Dimensions} from 'react-native';
import dimension from '../../../values/dimension';
import colors from '../../../values/colors';
const windowWidth = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: dimension.authPaddingTop,
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch',
  },
  txtInputEmail: {
    width: dimension.largeButton * 1.1,
    backgroundColor: colors.white,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  viewSignUp: {
    borderWidth: 0.1,
    borderRadius: 30,
    borderColor: '#e2e2e2',
    padding: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
  },
  signUpContainer: {
    marginTop: dimension.defaultMargin * 2,
    marginHorizontal: dimension.defaultMargin * 1.5,
  },
  textBlue: {
    color: '#1399fb',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  textTitleHeader: {
    fontWeight: '400',
    fontSize: 20,
  },
  bgFullWidth: {
    width: windowWidth,
    height: 100,
  },
  haveAccTxt: {
    textAlign: 'right',
    marginBottom: 24,
    marginTop: 8,
    color: colors.blue04,
    textDecorationColor: colors.blue04,
    textDecorationLine: 'underline',
  },
});

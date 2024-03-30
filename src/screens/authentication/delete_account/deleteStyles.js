import {StyleSheet} from 'react-native';
import colors from '../../../values/colors';
export const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  buttonBackIcon: {
    width: 25,
    height: 25,
    backgroundColor: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderColor: colors.grey9e,
    alignItems: 'center',
  },
  headerView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  btnSubmit: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.red,
    paddingVertical: 15,
    marginTop: 10,
  },

  btnDisableSubmit: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.grey,
    paddingVertical: 15,
    marginTop: 10,
  },
  btnSendOTP: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
});
export const txtStyles = StyleSheet.create({
  subTitle: {
    fontSize: 13,
    color: colors.grey9e,
  },
  subBlackTitle: {
    fontSize: 10,
    color: colors.black,
  },
  title: {
    color: colors.black1,
    fontSize: 16,
    fontWeight: '500',
  },

  centerView: {
    alignSelf: 'center',
  },
});

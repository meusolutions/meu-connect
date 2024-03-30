import {Dimensions, StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import colors from '../../../values/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerView: {
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderColor: colors.white,
    width: windowWidth / 1.1,
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  txtTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: colors.royal_blue,
  },
  btnSendRequest: {
    backgroundColor: colors.blue5c,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  btnBack: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 10,
  },
  txtResponse: {
    textAlign: 'center',
    color: 'black',
  },
  bgFullWidth: {
    width: windowWidth,
  },
  btnSave: {
    backgroundColor: colors.blue5c,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default styles;

import {Dimensions, StyleSheet} from 'react-native';
import dimension from '../../values/dimension';
import colors from '../../values/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  buttonTouchable: {
    zIndex: 10,
  },
  buttonText: {
    fontSize: 21,
    color: 'red',
  },
  maxScreen: {
    width: windowWidth,
    height: windowHeight,
  },
  cardView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  marker: {
    borderColor: colors.white,
    borderRadius: 20,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  viewBottom: {
    marginTop: 50,
    backgroundColor: colors.grayC4,
    flexDirection: 'row',
    width: windowWidth - 30,
    padding: 10,
    borderRadius: 10,
  },
  btnBottomAction: {
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  padding: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  errorScanTxt: {
    color: colors.red,
    top: -60,
    position: 'absolute',
    right: '25%',
    fontWeight: 'bold',
  },
});

export default styles;

import {Dimensions, StyleSheet} from 'react-native';
import dimension from '../../values/dimension';
import colors from '../../values/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
    padding: 10,
    backgroundColor: colors.white,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  txtTitle: {fontWeight: '600', color: colors.black1, fontSize: 18, margin: 10},
  button: {
    width: 70,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;

import {Dimensions, StyleSheet} from 'react-native';
import dimension from '../../values/dimension';
import colors from '../../values/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  btnAddMoreSocial: {
    flexDirection: 'row',
  },
  txtConfirm: {
    color: colors.purple_blue,
    fontWeight: '600',
    fontSize: 18,
  },

  btnSave: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.purple_blue,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
});

export default styles;

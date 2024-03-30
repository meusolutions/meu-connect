import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../values/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  itemContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  marginCenterView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnActive: {
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.red,
  },
});

export const txtStyles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.black,
  },
});
export default styles;

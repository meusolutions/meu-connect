import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 50,
    flexDirection: 'row',
  },

  iconMenu: {
    width: 25,
    height: 25,
  },
  iconLogo: {
    width: 35,
    height: 35,
  },
  ImgAvatar: {
    width: 30,
    height: 30,
    marginRight: 10,
    alignSelf: 'center',
    borderRadius: 30,
  },
  iconBell: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
});
export default styles;

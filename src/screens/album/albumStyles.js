import {Dimensions, StyleSheet} from 'react-native';
import dimension from '../../values/dimension';
import colors from '../../values/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemPlayer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  playerTitle: {
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  btnAddMore: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    padding: 10,
    borderRadius: 50,
    borderColor: colors.blue04,
    borderWidth: 1,
  },
  inputFields: {
    maxHeight: 70,
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 10,
  },
  inputGallery: {
    marginTop: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  imgAvatar: {
    marginTop: 10,
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  btnConfirm: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: colors.blue04,
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  selectedItemsButton: {
    backgroundColor: colors.white,
    width: '100%',
  },
});

export default styles;

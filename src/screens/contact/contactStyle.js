import {Dimensions, StyleSheet} from 'react-native';
import dimension from '../../values/dimension';
import colors from '../../values/colors';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    flexDirection: 'row',
    alignItems: 'center',
  },
  txtHeader: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    color: colors.black1,
  },
  subTxt: {
    fontSize: 13,
    color: colors.grayC4,
    marginTop: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 60,
    borderWidth: 0.3,
    borderColor: colors.white,
  },
  avatarLst: {
    width: 60,
    height: 60,
    marginRight: 20,
    borderRadius: 60,
    borderWidth: 0.3,
    borderColor: colors.white,
  },
  cover_img: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  contactView: {
    flex: 1,
    padding: 10,
  },
  viewBorderRadius: {
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 0.1,
    borderColor: colors.white,
    marginTop: 5,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    paddingHorizontal: 5,
  },
  header: {
    marginLeft: 5,
    marginTop: 5,
    color: colors.black1,
    fontWeight: '800',
  },
  emptyView: {justifyContent: 'center', alignItems: 'center', flex: 1},
  buttonChat: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.blue5c,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginTop: 10,
    backgroundColor: colors.blue5c,
    shadowColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowRadius: 3.84,
  },
  txtChat: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.white,
  },
});

export default styles;

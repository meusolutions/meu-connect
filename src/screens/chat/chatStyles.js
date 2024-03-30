import {Dimensions, StyleSheet} from 'react-native';
import dimension from '../../values/dimension';
import colors from '../../values/colors';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  itemView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginVertical: 5,
  },
  itemContent: {
    borderBottomColor: colors.grey,
    paddingBottom: 15,
    borderBottomWidth: 1,
    width: '100%',
  },
  title: {
    fontSize: 17,
    color: colors.black1,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray59,
  },
  viewH2: {
    marginVertical: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtH2: {
    fontSize: 23,
    fontWeight: '600',
    color: colors.black1,
  },
  inputView: {
    borderRadius: 5,
    height: 50,
    backgroundColor: colors.greyF3,
  },
  bottomInput: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  footer: {
    flex: 1,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  },
  leftChatView: {
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: 2,
  },
  rightChatView: {
    width: '100%',
    alignItems: 'flex-end',
    marginVertical: 1,
  },
  contentLeftChatWidth: {
    backgroundColor: colors.white,
    maxWidth: '70%',
    padding: 10,
  },
  contentLeftChat: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  contentLeft2Chat: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  contentLeft3Chat: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  contentRightChat: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  contentRight2Chat: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  contentRight3Chat: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  contentRightChatWidth: {
    backgroundColor: colors.purple_blue,
    maxWidth: '70%',
    padding: 10,
  },
  txtLeftChat: {
    color: colors.purple_blue,
    fontSize: 16,
  },
  txtRightChat: {
    color: colors.white,
    fontSize: 16,
  },
  item: {
    paddingHorizontal: 10,
  },
  headerView: {
    flex: 0.8,
    justifyContent: 'center',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  boxShadow: {
    elevation: 7,
    shadowColor: '#000',

    //ios
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.28,
    shadowRadius: 1,
  },
  senderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  },
});

export default styles;

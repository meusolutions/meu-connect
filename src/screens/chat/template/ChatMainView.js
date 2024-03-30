import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../chatStyles';
import {SERVER_URL} from '../../../values/string';
import {Searchbar} from 'react-native-paper';
import {IMAGES} from '../../../values/images';
import {chatPath} from '../../../configuration';
import ListMessage from './subViews/ListMessenger';
import MessageBox from './subViews/MessageBox';

export const ChatMainView = props => {
  const {listMessageProps, pageName, messageProps} = props;

  let ChatComponent;
  switch (pageName) {
    case chatPath.homeScreen:
      ChatComponent = <ListMessage {...listMessageProps} />;
      break;
    case chatPath.chatScreen:
      ChatComponent = <MessageBox {...messageProps} />;
      break;
    default:
      ChatComponent = <ListMessage {...listMessageProps} />;
      break;
  }
  return <SafeAreaView style={styles.container}>{ChatComponent}</SafeAreaView>;
};
export default ChatMainView;

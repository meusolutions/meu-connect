import React, { useEffect } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Text,
  FlatList,
} from 'react-native';
import styles from '../../chatStyles';
import { IMAGES, LogoSocial } from '../../../../values/images';
import { TextInput } from 'react-native-paper';
import { IC_OPTION, IC_SEND_MESSAGE } from '../../../../assets/svgAsset';
import { SERVER_URL } from '../../../../values/string';
import generalStyles from '../../../../styles/generalStyles';
import colors from '../../../../values/colors';
import Utils from '../../../../utils';

const MessageBox = props => {
  const {
    currentChatMessage,
    setCurrentChatMessage,
    onBackToHomePage,
    chatroom,
    chatSegment,
    userDetails,
    navigation,
    handleAddNewMessage,
    filterPositionMessages,
    onLoadMoreMessage
  } = props;
  const Header = () => (
    <View style={styles.headerView}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={onBackToHomePage}>
          <Image
            source={IMAGES.IcLeftArrow}
            style={{ width: 20, height: 20, marginRight: 5 }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
          <Image
            source={{ uri: Utils.searchAvatar(chatroom?.avatar) }}
            style={{ ...generalStyles.avatarIcon, marginRight: 5 }}
          />
          <View>
            <Text style={styles.title}>{chatroom.name_sender}</Text>
            <Text style={styles.subtitle}>Đang online</Text>
          </View>
        </View>
      </View>
    </View>
  );
  const Item = ({ item, index }) => {
    return (
      <View style={styles.item}>
        {item.created_by === userDetails?.id ? (
          <SenderMessages item={item} />
        ) : (
          <ApproverMessages item={item} />
        )}
      </View>
    );
  };
  const SenderMessages = ({ item }) => {
    const isLastMessage = filterPositionMessages(item);
    return (
      <View style={styles.rightChatView}>
        <View
          style={[
            styles.boxShadow,
            (isLastMessage == 1 && styles.contentRightChat) ||
            (isLastMessage == 2 && styles.contentRight2Chat) ||
            (isLastMessage == 3 && styles.contentRight3Chat),
            styles.contentRightChatWidth,
          ]}>
          <Text style={styles.txtRightChat}>{item.content}</Text>
        </View>
      </View>
    );
  };
  const ApproverMessages = ({ item }) => {
    const isLastMessage = filterPositionMessages(item);
    return (
      <View style={styles.leftChatView}>
        <View
          style={[
            styles.boxShadow,
            (isLastMessage == 1 && styles.contentLeftChat) ||
            (isLastMessage == 2 && styles.contentLeft2Chat) ||
            (isLastMessage == 3 && styles.contentLeft3Chat),
            styles.contentLeftChatWidth,
          ]}>
          <Text style={styles.txtLeftChat}>{item.content}</Text>
        </View>
      </View>
    );
  };
  useEffect(() => {
    //hide bottom bar
    navigation.setOptions({
      tabBarStyle: {
        display: 'none',
        tabBarVisible: false,
      },
    });
    return () =>
      navigation.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ flex: 5, padding: 10, marginBottom: 10 }}>
        {chatSegment.length > 0 && (
          <FlatList
            inverted
            data={[...chatSegment].reverse()}
            renderItem={({ item, index }) => <Item item={item} index={index} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            onEndReached={onLoadMoreMessage}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
      <View style={styles.footer}>
        <View style={styles.bottomInput}>
          <TouchableOpacity>
            <IC_OPTION width={30} height={30} fill={colors.purple_blue} />
          </TouchableOpacity>

          <TextInput
            placeholder={'Type a message here...'}
            style={{
              maxHeight: 55,
              width: '70%',
            }}
            mode="outlined"
            onChangeText={txt => setCurrentChatMessage(txt)}
            value={currentChatMessage}
            outlineStyle={{ borderRadius: 10 }}
            maxLength={2000}
          />
          <TouchableOpacity onPress={() => handleAddNewMessage()}>
            <IC_SEND_MESSAGE width={40} height={40} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.chatSegment === nextProps.chatSegment &&
    prevProps.currentChatMessage === nextProps.currentChatMessage
  );
  /* Trả về true nếu nextProps bằng prevProps, ngược lại trả về false */
};
export default React.memo(MessageBox, areEqual);

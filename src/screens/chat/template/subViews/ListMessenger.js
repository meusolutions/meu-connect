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
import styles from '../../chatStyles';
import {SERVER_URL} from '../../../../values/string';
import {Searchbar} from 'react-native-paper';
import {IMAGES} from '../../../../values/images';
import FastImage from 'react-native-fast-image';
import {IC_ADD_NEW_MESSAGE} from '../../../../assets/svgAsset';
const Item = React.memo(props => {
  const {item, onInitLoadMessage, showLessMessage, calcMessageArrival} = props;
  return (
    <TouchableOpacity
      onPress={() => onInitLoadMessage(item)}
      style={styles.itemView}
      activeOpacity={0.2}>
      <View style={styles.itemContent}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <FastImage
              source={{
                uri: SERVER_URL + item.avatar,
              }}
              style={styles.senderAvatar}
            />
            <View>
              <Text style={styles.title}>{item.name_sender}</Text>
              <Text style={styles.subtitle}>
                {showLessMessage(item.last_read_message)}
              </Text>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={[styles.subtitle]}>
              {calcMessageArrival(item.updated_at ?? item.created_at)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});
const ListMessage = React.memo(props => {
  const {
    searchQuery,
    onChangeSearch,
    onInitLoadMessage,
    chatroomList,
    t,
    calcMessageArrival,
  } = props;

  const showLessMessage = message => {
    if (message) {
      return message.length > 95 ? message.slice(0, 35) + '...' : message;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewH2}>
        <Text style={styles.txtH2}>{t('Message')}</Text>
        <TouchableOpacity>
          <IC_ADD_NEW_MESSAGE />
        </TouchableOpacity>
      </View>
      <View style={{margin: 10}}>
        {/* <Searchbar
          style={styles.inputView}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          icon={() => (
            <Image
              source={IMAGES.IcSearch}
              style={{width: 25, height: 25}}
              resizeMode="contain"
            />
          )}
        /> */}
      </View>
      <View>
        <FlatList
          data={chatroomList}
          renderItem={({item}) => (
            <Item
              item={item}
              onInitLoadMessage={onInitLoadMessage}
              showLessMessage={showLessMessage}
              calcMessageArrival={calcMessageArrival}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
});

export default ListMessage;

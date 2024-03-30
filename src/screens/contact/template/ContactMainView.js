import React from 'react';
import {
  Image,
  SafeAreaView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IMAGES} from '../../../values/images';
import {SERVER_URL} from '../../../values/string';
import styles from '../contactStyle';
import ContactInfoComponent from './subViews/ContactInfoComponent';
const ContactMainView = props => {
  const {
    formatContact,
    openInfo,
    onPressOpenInfo,
    onPressVisitSocial,
    userContactList,
    onBackPhoneBook,
    onPressPhoneCall,
    onPressSendMailTo,
    onNavigateToChat,
    isShowContact,
  } = props;
  const InfoItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressOpenInfo(item)}
        style={styles.item}>
        <Image
          source={{
            uri: SERVER_URL + item.avatar,
          }}
          style={styles.avatarLst}
        />
        <View>
          <Text style={styles.title}>{item.extend_user_full_name}</Text>
          <Text style={styles.subTxt}>{item.department}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {
        formatContact &&
        formatContact.length > 0 &&
        !openInfo && (
          <SectionList
            sections={formatContact}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => <InfoItem item={item} />}
            renderSectionHeader={({section: {last_name}}) => (
              <Text style={styles.header}>{last_name}</Text>
            )}
          />
        )}
      {formatContact.length === 0 && (
        <View style={styles.emptyView}>
          <Image
            source={IMAGES.IcEmptyBox}
            style={{width: 100, height: 100, alignSelf: 'center'}}
          />
        </View>
      )}
      {openInfo && (
        <ContactInfoComponent
          userInfo={openInfo}
          onPressVisitSocial={onPressVisitSocial}
          userContactList={userContactList}
          onBackPhoneBook={onBackPhoneBook}
          onPressPhoneCall={onPressPhoneCall}
          onPressSendMailTo={onPressSendMailTo}
          onNavigateToChat={onNavigateToChat}
        />
      )}
    </SafeAreaView>
  );
};
export default ContactMainView;

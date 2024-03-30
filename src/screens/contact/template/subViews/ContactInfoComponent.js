import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {IMAGES, LogoSocial} from '../../../../values/images';
import {SERVER_URL} from '../../../../values/string';
import styles from '../../contactStyle';
import Utils from '../../../../utils';
import {useTranslation} from 'react-i18next';

const ContactInfoComponent = props => {
  const {
    userInfo,
    onPressVisitSocial,
    userContactList,
    onBackPhoneBook,
    onPressPhoneCall,
    onPressSendMailTo,
    onNavigateToChat,
  } = props;
  const {t, i18n} = useTranslation();
  return (
    <View style={styles.contactView}>
      <TouchableOpacity
        onPress={onBackPhoneBook}
        style={{flexDirection: 'row'}}>
        <Image
          source={IMAGES.IcLeftArrow}
          style={{width: 20, height: 20, marginRight: 5}}
        />
        <Text>Danh bạ</Text>
      </TouchableOpacity>
      <View style={{...styles.viewBorderRadius, paddingBottom: 20}}>
        <Image
          source={
            userInfo?.cover_image
              ? {
                  uri: SERVER_URL + userInfo?.cover_image,
                }
              : IMAGES.ImgCover
          }
          style={[styles.cover_img]}
        />
        <View style={{alignItems: 'center', marginTop: -50}}>
          <Image
            source={{
              uri: SERVER_URL + userInfo?.avatar,
            }}
            style={styles.avatar}
          />
          <Text style={styles.title}>{userInfo.extend_user_full_name}</Text>
          {userInfo.position && (
            <Text style={styles.subTxt}>{userInfo.position}</Text>
          )}
        </View>
        <View style={{marginLeft: 10, marginTop: 15}}>
          {userInfo.email && (
            <TouchableOpacity
              onPress={() => onPressSendMailTo(userInfo.email)}
              style={[styles.rowView]}>
              <Image
                source={IMAGES.IcMail}
                style={{width: 20, height: 20, marginRight: 13}}
              />
              <Text>{userInfo.email}</Text>
            </TouchableOpacity>
          )}
          {userInfo.cell_phone && (
            <TouchableOpacity
              onPress={() => onPressPhoneCall(userInfo.cell_phone)}
              style={styles.rowView}>
              <Image
                source={IMAGES.IcPhone}
                style={{width: 20, height: 20, marginRight: 13}}
              />
              <Text>{userInfo.cell_phone}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView>
        {userContactList.length > 0 &&
          userContactList.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onPressVisitSocial(item.contact_unique_id)}
              style={styles.viewBorderRadius}>
              <View
                style={{
                  ...styles.rowView,
                  justifyContent: 'space-between',
                  padding: 5,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={Utils.findLogoContact(item.type)}
                    style={{width: 40, height: 40}}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}>
                    Ghé thăm hồ sơ của tôi
                  </Text>
                </View>
                <Image
                  source={IMAGES.IcRightArrow}
                  style={{width: 20, height: 20}}
                />
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonChat}
        onPress={() => onNavigateToChat(userInfo.id)}>
        <Text style={styles.txtChat}>{t('Chat_now')}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ContactInfoComponent;

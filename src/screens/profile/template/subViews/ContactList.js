import React from 'react';
import { Image, Text, View } from 'react-native';
import colors from '../../../../values/colors';
import { SERVER_URL } from '../../../../values/string';
import styles from '../../style';
import Utils from '../../../../utils';
const ContactList = props => {
  const { contactList } = props;
  return (
    <View style={{ marginTop: 30, marginBottom: 10 }}>
      <Text style={styles.contactTitle}>Danh bạ</Text>
      {contactList.length > 0 &&
        contactList.map((item, index) => (
          <View style={styles.itemContact} key={index}>
            <Image
              source={{ uri: Utils.searchAvatar(item?.avatar) }}
              style={styles.avatarContact}
            />
            <View>
              <Text style={{ color: colors.black1, fontSize: 16 }}>
                {item.extend_user_full_name}
              </Text>
              <Text style={{ color: colors.gray59, fontSize: 13 }}>
                {item.cell_phone}
              </Text>
              <Text style={{ color: colors.gray59, fontSize: 13 }}>
                {item.email}
              </Text>
            </View>
          </View>
        ))}
    </View>
  );
};

export default ContactList;

import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
import styles from '../../../profile/style';
import {
  FACEBOOK,
  INSTAGRAM,
  LINKEDIN,
  SKYPE,
  TWITTER,
} from '../../../../assets/svgAsset';
import Utils from '../../../../utils';
import {IMAGES} from '../../../../values/images';
const ListSocial = ({social, onEditSocial, onDelete}) => {
  const [showContent, setShowContent] = useState(false);
  const [modalSocial, setModalSocial] = useState();
  const [iconSocial, setIconSocial] = useState();

  const onPressChangeIconSocial = icon => {
    const socialSVG = [
      {
        name: 'FACEBOOK',
        icon: <FACEBOOK />,
      },
      {
        name: 'SKYPE',
        icon: <SKYPE />,
      },
      {
        name: 'INSTAGRAM',
        icon: <INSTAGRAM />,
      },
      {
        name: 'LINKEDIN',
        icon: <LINKEDIN />,
      },
      {
        name: 'TWITTER',
        icon: <TWITTER />,
      },
    ];
    const filter = socialSVG.filter(item => item.name !== icon);

    setModalSocial(
      <View>
        {filter.length > 0 &&
          filter.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setIconSocial(item);
                setShowContent(false);
              }}>
              {item.icon}
            </TouchableOpacity>
          ))}
      </View>,
    );
  };
  return (
    <View style={styles.inputView}>
      <TextInput
        label={
          iconSocial != null
            ? Utils.capitalizeFLetter(iconSocial.name)
            : Utils.capitalizeFLetter(social.type)
        }
        mode="outlined"
        onChangeText={text => onEditSocial(text, social)}
        value={social.contact_unique_id}
        outlineStyle={{borderWidth: 1}}
        left={
          <TextInput.Icon
            icon={() => <Image source={Utils.findLogoContact(social.type)} />}
            onPress={() => {
              setShowContent(true);
              onPressChangeIconSocial(
                iconSocial != null ? iconSocial.name : social.type,
              );
            }}
            size={30}
          />
        }
        right={
          <TextInput.Icon
            icon={IMAGES.IcTrash}
            onPress={() => onDelete(social.id)}
            size={25}
          />
        }
      />
      <Modal animationType="slide" transparent={true} visible={showContent}>
        <TouchableOpacity
          onPress={() => {
            setShowContent(!showContent);
          }}
          style={{
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}>
          {modalSocial}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ListSocial;

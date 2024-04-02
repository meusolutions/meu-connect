import React, { useRef } from 'react';
import {
  Animated,
  Image,
  Modal,
  PanResponder,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-paper';
import { IC_SEND } from '../../../../assets/svgAsset';
import ButtonComponent from '../../../../components/ButtonComponent';
import colors from '../../../../values/colors';
import { IMAGES, IconProfile } from '../../../../values/images';
import { SERVER_URL } from '../../../../values/string';
import styles from '../../style';
import Utils from '../../../../utils';
const ModalHappyBirthday = props => {
  const {
    openModalWishBirthday,
    closeModalWishBirthday,
    modalVisible,
    handleCloseDesBirthday,
    addMoreImgFromGallery,
    sendHappyBirthday,
    setMessageBirthday,
    messageBirthday,
  } = props;
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          handleCloseDesBirthday();
        }
        return !(gestureState.dx === 0 && gestureState.dy === 0);
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;
  return (
    <Modal animationType="slide" transparent={true}>
      <Animated.View
        style={[
          styles.contentContainer,
          styles.baseShadow,
          {
            transform: [{ translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}>
        {/* <Modal animationType="slide" transparent={true} /> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>
            {`Ngày ${modalVisible?.day?.day} tháng ${modalVisible?.day?.month} năm ${modalVisible?.day?.year} 🎉`}
          </Text>
          <ButtonComponent
            iconSource={IconProfile.IcCloseBlack}
            styleIcon={{ width: 20, height: 20, zIndex: 99 }}
            onPress={handleCloseDesBirthday}
          />
        </View>

        {modalVisible?.birthdayArr?.map((item, index) => {
          return (
            <View
              key={index}
              style={[
                styles.viewHappyBirthday,
                modalVisible?.managerOpenWish[index].enable
                  ? styles.openViewHappyBirthday
                  : styles.closeViewHappyBirthday,
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={{
                      uri: Utils.searchAvatar(item.avatar)
                    }}
                    style={{ width: 40, height: 40, borderRadius: 5 }}
                  />
                  <View style={{ paddingLeft: 10 }}>
                    <Text
                      style={
                        styles.txtTitle
                      }>{`${item.first_name} ${item.middle_name} ${item.last_name}`}</Text>
                    <Text>{item.position}</Text>
                  </View>
                </View>
                {!modalVisible?.managerOpenWish[index].enable && (
                  <TouchableOpacity
                    style={{
                      zIndex: 99,
                    }}
                    onPress={() => openModalWishBirthday(index)}>
                    <IC_SEND />
                  </TouchableOpacity>
                )}
              </View>
              {modalVisible?.managerOpenWish[index].enable && (
                <View>
                  <View style={{ marginTop: 10 }}>
                    <TextInput
                      mode="outlined"
                      activeUnderlineColor={false}
                      multiline
                      numberOfLines={3}
                      placeholder={
                        'Vui lòng nhập lời chúc tại đây hoặc gợi ý bên dưới'
                      }
                      placeholderTextColor={colors.gray59}
                      style={{ backgroundColor: 'white' }}
                      value={messageBirthday.massage}
                      onChangeText={txt =>
                        setMessageBirthday(prev => ({
                          ...prev,
                          massage: txt,
                        }))
                      }
                    />
                    {/** suggest wish  */}
                    <View style={{ flexDirection: 'row' }}>
                      <ButtonComponent
                        style={styles.btnSuggest}
                        text={'Chúc mưng sinh nhật !'}
                        textStyle={{ color: colors.purple_blue }}
                        onPress={() =>
                          setMessageBirthday(prev => ({
                            ...prev,
                            massage: 'Chúc mưng sinh nhật !',
                          }))
                        }
                      />
                      <ButtonComponent
                        style={styles.btnSuggest}
                        text={'Sinh nhật vui vẻ 🍰'}
                        textStyle={{ color: colors.purple_blue }}
                        onPress={() =>
                          setMessageBirthday(prev => ({
                            ...prev,
                            massage: 'Sinh nhật vui vẻ 🍰',
                          }))
                        }
                      />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      {item?.imgArr &&
                        item?.imgArr.map((el, position) => {
                          return (
                            <View key={position} style={{ marginRight: 10 }}>
                              <FastImage
                                source={{
                                  uri: el.uri,
                                }}
                                style={{
                                  width: 60,
                                  height: 60,
                                  marginTop: 10,
                                }}
                              />
                            </View>
                          );
                        })}
                      {!item.imgArr && (
                        <View style={styles.viewAddMoreImg}>
                          <ButtonComponent
                            iconSource={IMAGES.IcAddMoreImg}
                            styleIcon={{ height: 25, width: 25 }}
                            onPress={() => addMoreImgFromGallery(index)}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 30,
                    }}>
                    <ButtonComponent
                      style={styles.btnCancel}
                      text={'Hủy'}
                      textStyle={{
                        color: colors.purple_blue,
                        fontSize: 18,
                        fontWeight: '500',
                      }}
                      onPress={() => closeModalWishBirthday(index)}
                    />
                    <ButtonComponent
                      style={styles.btnSend}
                      text={'Gửi'}
                      textStyle={{
                        color: colors.white,
                        fontSize: 18,
                        fontWeight: '500',
                      }}
                      onPress={() => {
                        closeModalWishBirthday(index);
                        sendHappyBirthday(item.id);
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </Animated.View>
    </Modal>
  );
};

export default ModalHappyBirthday;

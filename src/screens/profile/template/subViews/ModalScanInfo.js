import React from 'react';
import {Modal, Image, View, TouchableOpacity} from 'react-native';
import {IMAGES, BgIntroduce} from '../../../../values/images';
import styles from '../../style';
import ECardView from './ECardView';
const ModalScanInfo = props => {
  const {scanInfo, modalVisible, setModalVisible, onPressAddContact} = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={{maxHeight: '50%'}}>
          <ECardView
            userDetails={scanInfo}
            infoUser={scanInfo}
            avatar={null}
            onPressShareInfo={() => {}}
            isShare={false}
            isShowBtnScan={false}
            socialLink={scanInfo.hr_user_extra_contact}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => onPressAddContact(scanInfo)}>
            <Image
              source={BgIntroduce.IcCheckedGreen}
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Image source={IMAGES.IcDenied} style={{width: 50, height: 50}} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalScanInfo;

import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {IMAGES} from '../../values/images';
const ModalComponent = props => {
  const {children, onPressCloseModalActiveMember} = props;
  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={styles.centeredView}>
        <TouchableOpacity
          style={styles.btnClose}
          onPress={onPressCloseModalActiveMember}>
          <Image source={IMAGES.IcClose} style={{width: 20, height: 20}} />
        </TouchableOpacity>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnClose: {position: 'absolute', top: 15, right: 10, zIndex: 100},
});
export default ModalComponent;

import React, {useLayoutEffect, useState} from 'react';
import {Modal, View, Image} from 'react-native';
import styles from '../../style';
import SelectDropdown from 'react-native-select-dropdown';
import {IMAGES} from '../../../../values/images';
import Utils from '../../../../utils';
import Config from '../../../../configuration';
const ModalServer = props => {
  const {modalServerVisible, setModalServerVisible, onSelectServer} = props;
  const [defaultServer, setDefaultServer] = useState();
  const servers = ['CLBDN', 'JOSUN', 'SIYB', 'DTLAB'];

  useLayoutEffect(() => {
    Utils.getData(Config.storageKey.SERVER).then(res => setDefaultServer(res));
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalServerVisible}
      onRequestClose={() => setModalServerVisible(!modalServerVisible)}
      onDismiss={() => setModalServerVisible(!modalServerVisible)}>
      <View style={styles.centeredView}>
        <View style={{maxHeight: '50%'}}>
          <SelectDropdown
            buttonStyle={styles.selectedItemsButton}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            data={servers}
            defaultValue={defaultServer || servers[0]}
            onSelect={(selectedItem, index) => onSelectServer(selectedItem)}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            renderDropdownIcon={isOpened => {
              return (
                <Image
                  source={isOpened ? IMAGES.IcUpArrow : IMAGES.IcDownArrow}
                  style={{width: 20, height: 20}}
                />
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalServer;

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Button,
} from 'react-native';
import styles from '../../albumStyles';
import {memo} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {IMAGES} from '../../../../values/images';
import ButtonComponent from '../../../../components/ButtonComponent';
import colors from '../../../../values/colors';
import Config from '../../../../configuration';
import SelectDropdown from 'react-native-select-dropdown';
import {TextInput} from 'react-native-paper';
const AddNew = props => {
  const {
    t,
    addNewAlbumInfo,
    onAddNewAlbumChange,
    openGallery,
    onPressDeleteGallery,
    onSubmitAddNewAlbum,
    onSwitchPage,
  } = props;
  const countries = ['Youtube', 'Carousel'];

  const inputFields = [
    {key: 'title', placeholder: 'Tiêu đề', value: addNewAlbumInfo?.title || ''},
    // {
    //   key: 'description',
    //   placeholder: 'Mô tả',
    //   value: addNewAlbumInfo?.description,
    // },
    {key: 'link', placeholder: 'Link', value: addNewAlbumInfo?.link || ''},
  ];
  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}
        onPress={() => onSwitchPage(Config.albumPath.ShowScreen)}>
        <Image
          source={IMAGES.IcLeftArrow}
          style={{width: 20, height: 20, marginRight: 5}}
        />
        <Text>Thêm mới</Text>
      </TouchableOpacity>

      {inputFields.map((item, index) => (
        <TextInput
          key={index}
          label={item.placeholder}
          style={styles.inputFields}
          mode="outlined"
          onChangeText={text => onAddNewAlbumChange(text, item.key)}
          value={item.value}
          outlineStyle={{borderWidth: 1}}
          error={item.value.length === 0}
        />
      ))}
      <SelectDropdown
        buttonStyle={styles.selectedItemsButton}
        data={countries}
        defaultValue={'Youtube'}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
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
      />
      {addNewAlbumInfo?.image && addNewAlbumInfo?.image?.length < 4 ? (
        <ImageBackground
          style={{
            ...styles.imgAvatar,
            alignItems: 'flex-end',
            paddingHorizontal: 10,
          }}
          imageStyle={styles.imgAvatar}
          source={{uri: addNewAlbumInfo?.image[0].uri}}>
          <TouchableOpacity onPress={onPressDeleteGallery}>
            <Image style={{width: 30, height: 30}} source={IMAGES.IcDenied} />
          </TouchableOpacity>
        </ImageBackground>
      ) : (
        <View>
          <TouchableOpacity style={styles.inputGallery} onPress={openGallery}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      )}
      <ButtonComponent
        style={styles.btnConfirm}
        text={t('Confirm')}
        textStyle={{color: colors.white, fontWeight: 'bold', fontSize: 18}}
        onPress={onSubmitAddNewAlbum}
        backgroundColor={colors.white}
        bordered={true}
      />
    </SafeAreaView>
  );
};

export default memo(AddNew);

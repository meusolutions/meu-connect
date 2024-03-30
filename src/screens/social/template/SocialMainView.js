import React from 'react';
import {SafeAreaView, TouchableOpacity, View, Text, Image} from 'react-native';
import ListSocial from './subViews/MySocial';
import styles from '../socialStyles';
import {IMAGES} from '../../../values/images';
import {IcGreyBack} from '../../../values/images';
import LoadingProgress from '../../../components/LoadingProgress';
const SocialMainView = props => {
  const {
    socialLink = [],
    onEditSocial,
    t,
    addFieldSocialLink,
    onBack,
    onSubmit,
    onDelete,
    isLoading,
  } = props;
  const BtnAddMoreSocial = () => (
    <TouchableOpacity
      activeOpacity={0.2}
      style={{
        width: '100%',
        marginVertical: 10,
      }}
      onPress={addFieldSocialLink}>
      <View style={styles.btnAddMoreSocial}>
        <Image source={IMAGES.IcAdd} style={{width: 20, height: 20}} />
        <Text>{t('Add_social_link')}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={onBack}
        style={{
          marginTop: 10,
        }}>
        <IcGreyBack width={30} height={30} />
      </TouchableOpacity>
      <View style={{padding: 10}}>
        {socialLink.length < 7 && <BtnAddMoreSocial />}
        {socialLink?.length > 0 &&
          socialLink.map((item, index) => (
            <ListSocial
              key={index}
              social={item}
              onEditSocial={onEditSocial}
              onDelete={onDelete}
            />
          ))}

        {socialLink.length > 0 && (
          <TouchableOpacity onPress={onSubmit} style={styles.btnSave}>
            <Text style={styles.txtConfirm}>{t('Confirm')}</Text>
          </TouchableOpacity>
        )}
      </View>
      {isLoading && <LoadingProgress />}
    </SafeAreaView>
  );
};

export default SocialMainView;

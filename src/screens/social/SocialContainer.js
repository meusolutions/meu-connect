import React, {useEffect, useState} from 'react';
import RootNavigation from '../../navigation/RootNavigation';
import Utils from '../../utils';
import {ToastMessage} from '../../utils/MessageUtil';
import {
  addNewSocial,
  editSocial,
  getMySocials,
  removeSocial,
} from './SocialSlice';
import SocialMainView from './template/SocialMainView';
var md5 = require('md5');
const SocialContainer = props => {
  const {socialList, t, dispatch, userDetails, isLoading} = props;
  const [socialLink, setSocialLink] = useState([]);
  const [openSocialModal, setSocialModal] = useState(false);

  const switchSocialModal = () => setSocialModal(!openSocialModal);

  const onEditSocial = (text, item) => {
    let clone = [...socialLink];
    let itemLink = {...item};
    let index = socialLink.findIndex(obj => obj.id == item.id);
    itemLink.contact_unique_id = text;
    clone[index] = itemLink;
    setSocialLink([...clone]);
  };

  const addFieldSocialLink = () => {
    let mergeArr = [];
    let results = [];
    // Find unique elements in arr1 & push them into result
    socialLink.forEach(e =>
      Utils.AllLogoSocial.find(f => f.name === e.type)
        ? null
        : mergeArr.push(e),
    );
    // Find unique elements in arr2 & push them into result
    Utils.AllLogoSocial.forEach(e =>
      socialLink.find(f => f.type === e.name) ? null : mergeArr.push(e),
    );

    if (mergeArr.length === 0) {
      return;
    }
    for (var i = 0; i < mergeArr.length; i++) {
      results.push({
        id: i,
        type: mergeArr[i].name,
        contact_unique_id: '',
        icon: mergeArr[i].icon,
      });
    }

    setSocialLink(prev => [...prev, ...results]);
  };
  const onSubmit = async () => {
    try {
      let newSocial = [];
      const clone = [...socialLink];
      const editSocials = [];
      // if initial state not have data
      if (socialList.length === 0) {
        clone.forEach(
          item =>
            item.contact_unique_id.length > 0 &&
            dispatch(
              addNewSocial({
                userId: userDetails.id,
                payload: {
                  type: item.type,
                  contact_unique_id: item.contact_unique_id,
                  user_id: userDetails.id,
                },
              }),
            ).then(() => {
              ToastMessage({
                title: t('Add_social_success'),
              });
              onLoadSocials();
            }),
        );
        ToastMessage({
          title: t('Add_social_success'),
        });
        return;
      }
      // Find unique elements in arr2 & push them into result
      clone.forEach(e =>
        socialList.find(f => f.id === e.id) ? null : newSocial.push(e),
      );
      clone.forEach(e =>
        socialList.find(
          f => f.id === e.id && f.contact_unique_id === e.contact_unique_id,
        )
          ? null
          : editSocials.push(e),
      );

      if (editSocials.length > 0) {
        editSocials.forEach(
          async e =>
            await dispatch(editSocial({id: e.id, payload: e})).then(() =>
              onLoadSocials(),
            ),
        );
        ToastMessage({
          title: t('System'),
          message: t('Edit_link_social_success'),
        });
      }
      if (newSocial.length > 0) {
        newSocial.forEach(
          async item =>
            item.contact_unique_id.length > 0 &&
            (
              await dispatch(
                addNewSocial({
                  userId: userDetails.id,
                  payload: {
                    type: item.type,
                    contact_unique_id: item.contact_unique_id,
                    user_id: userDetails.id,
                  },
                }),
              )
            ).then(() => {
              ToastMessage({
                title: t('Add_social_success'),
              });
              onLoadSocials();
            }),
        );
      }
    } catch (e) {
      console.error('on save social', e);
    }
  };
  const onBack = () => {
    RootNavigation.goBack();
  };

  const onLoadSocials = () => {
    if (userDetails) {
      dispatch(getMySocials({userId: userDetails.id}));
    }
  };
  const onDelete = async socialId => {
    if (!socialId) {
      ToastMessage({
        title: t('System'),
        message: t('Please_enter_link_social'),
        type: 'error',
      });
      return;
    }
    const res = await dispatch(removeSocial({socialId: socialId}));
    const {success} = Utils.getValues(res, 'payload', false);
    if (success) {
      onLoadSocials();
      ToastMessage({
        title: t('Delete_social_success'),
      });
    } else {
      ToastMessage({
        title: t('System'),
        message: t('Delete_social_failure'),
        type: 'error',
      });
    }
  };

  useEffect(() => {
    socialList && setSocialLink(socialList);
  }, [socialList]);

  const socialContainerProps = {
    t,
    socialLink,
    openSocialModal,
    isLoading,
    onSubmit,
    onBack,
    onEditSocial,
    switchSocialModal,
    addFieldSocialLink,
    onDelete,
  };
  return <SocialMainView {...socialContainerProps} />;
};

export default SocialContainer;

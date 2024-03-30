import React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import styles from '../style';
import ECardView from './subViews/ECardView';
import ModalScanInfo from './subViews/ModalScanInfo';
import ModalComponent from '../../../components/modal';
import ActiveCode from './subViews/ActiveCode';
import ModalServer from './subViews/ModalServer';
import ButtonComponent from '../../../components/ButtonComponent';
import GuestView from './subViews/GuestView';
const ProfileMainView = props => {
  const {
    scanProfileProps,
    cardProps,
    activeCodeProps,
    modalActiveMember,
    modalActiveMemberProps,
    modalServerProps,
    guestProps,
  } = props;
  const {modalServerVisible = false} = modalServerProps;
  const {userDetails, navigateToLogout} = cardProps;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {userDetails ? (
          <ECardView {...cardProps} />
        ) : (
          <GuestView {...guestProps} />
        )}
      </ScrollView>

      {scanProfileProps?.modalVisible && (
        <ModalScanInfo {...scanProfileProps} />
      )}
      {modalActiveMember && (
        <ModalComponent {...modalActiveMemberProps}>
          <ActiveCode {...activeCodeProps} />
        </ModalComponent>
      )}
      {modalServerVisible && <ModalServer {...modalServerProps} />}
      {!userDetails && (
        <ButtonComponent
          style={styles.btnSendRequest}
          text={'Đăng nhập'}
          textStyle={{color: 'white'}}
          onPress={navigateToLogout}
        />
      )}
    </SafeAreaView>
  );
};

export default ProfileMainView;

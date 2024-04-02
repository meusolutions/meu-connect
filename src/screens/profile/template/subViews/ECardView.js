import moment from 'moment';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Menu, MenuItem } from 'react-native-material-menu';
import { TextInput } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import {
  EMAIL_SVG,
  IC_EDIT,
  SCAN_FRAME,
  SMART_PHONE,
} from '../../../../assets/svgAsset';
import ButtonComponent from '../../../../components/ButtonComponent';
import Utils from '../../../../utils';
import colors from '../../../../values/colors';
import { FrameAvatar, IMAGES } from '../../../../values/images';
import { SERVER_URL } from '../../../../values/string';
import styles from '../../style';
import Collapsible from 'react-native-collapsible';
const { width, height } = Dimensions.get('window');
const CompanyInfo = React.memo(
  function ({ myCompanyInfo }) {
    return (
      <View style={styles.viewImageProfile}>
        <View style={styles.viewAvatar}>
          <ImageBackground
            style={styles.imgAvatar}
            source={{ uri: SERVER_URL + myCompanyInfo[0]?.logo }}
            imageStyle={styles.imgAvatar}></ImageBackground>
        </View>
        <Text style={styles.txtName}>{`${myCompanyInfo[0]?.name}`}</Text>

        <Text style={{ color: colors.purple_blue, marginBottom: 20 }}>
          {myCompanyInfo[0]?.company_field}
        </Text>

        <Text style={styles.contentCard}>{myCompanyInfo[0]?.full_address}</Text>

        <View style={{ width: '100%' }}>
          {myCompanyInfo[0]?.email && (
            <View style={[styles.flexRow, { marginTop: 15 }]}>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <EMAIL_SVG />
              </View>
              <Text style={[styles.subTxt, { flex: 2 }]}>
                {myCompanyInfo[0]?.email}
              </Text>
            </View>
          )}
          {myCompanyInfo[0]?.cellphone && (
            <View style={styles.flexRow}>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <SMART_PHONE />
              </View>
              <Text style={[styles.subTxt, { flex: 2 }]}>
                {myCompanyInfo[0]?.cellphone}
              </Text>
            </View>
          )}
          {myCompanyInfo[0]?.website && (
            <View style={styles.flexRow}>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <SMART_PHONE />
              </View>
              <Text style={[styles.subTxt, { flex: 2 }]}>
                {myCompanyInfo[0]?.website}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  },
  function areEqual(prevProps, nextProps) {
    return prevProps.myCompanyInfo === nextProps.myCompanyInfo;
    // return true => không re-render
  },
);
const QRcode = React.memo(
  function ({ viewShotRef, onPressShareInfo, infoUser, valueQr }) {
    return (
      <View style={styles.viewQrCodeContainer}>
        <TouchableOpacity onPress={onPressShareInfo} style={styles.icShare}>
          <Image source={IMAGES.IcShare} style={styles.icShare} />
        </TouchableOpacity>

        <ViewShot
          ref={viewShotRef}
          options={{ format: 'png', quality: 1.0, result: 'data-uri' }}>
          <Text style={styles.title}>Quét mã Qr</Text>
          <View style={styles.cardView}>
            <SCAN_FRAME height={190} color={colors.blue04} />
            {infoUser && (
              <View style={{ marginTop: -170 }}>
                <QRCode
                  backgroundColor="white"
                  size={150}
                  value={valueQr}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                />
              </View>
            )}
          </View>
        </ViewShot>
      </View>
    );
  },
  function areEqual(prevProps, nextProps) {
    return prevProps.infoUser?.id === nextProps.infoUser?.id;
    // return true => không re-render
  },
);
const ECardView = props => {
  const {
    userDetails,
    infoUser,
    onPressShareInfo,
    viewShotRef,
    navigateToLogout,
    avatar,
    openGallery,
    isEditField,
    onPressScan,
    isShowBtnScan = true,
    onPressEditProfile,
    onEditInfo,
    visibleMenu,
    setVisibleMenu,
    onPressCancelEdit,
    onPressChangeInfo,
    socialLink,
    onPressVisitSocial,
    onNavigateToCharge,
    onNavigateToOtp,
    myRole,
    onPressOpenModalActiveMember,
    t,
    showEditBirthday,
    hideEditBirthday,
    editBirthday,
    onCheckValidDate,
    myCompanyInfo = [],
    onNavigateToSocial,
    isActiveMember = false,
    navigateToSetting,
    onNavigateToServer,
  } = props;
  const valueQr =
    myCompanyInfo.length > 0 && myCompanyInfo[0].code
      ? `https://${myCompanyInfo[0].code}.meu-solutions.com/business-card?id=${userDetails?.id}&email=${userDetails?.email}`
      : `${SERVER_URL}/business-card?id=${userDetails?.id}&email=${userDetails?.email}`;

  const cardData = [
    {
      name: 'card company',
    },
    {
      name: 'card person',
    },
    {
      name: 'Qr code',
    },
  ];
  return (
    <SafeAreaView>
      <ScrollView
        decelerationRate={'fast'}
        horizontal
        style={{ marginHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}>
        {cardData.map((item, index) => (
          <View key={index}>
            {index === 0 && isActiveMember && myCompanyInfo.length > 0 && (
              <View>
                <CompanyInfo myCompanyInfo={myCompanyInfo} />
                <View
                  style={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={IMAGES.IcDotFilled}
                    style={{ width: 20, height: 20 }}
                  />
                  <Image
                    source={IMAGES.IcDotOutline}
                    style={{ width: 20, height: 20 }}
                  />
                  <Image
                    source={IMAGES.IcDotOutline}
                    style={{ width: 20, height: 20 }}
                  />
                </View>
              </View>
            )}
            {index === 1 && infoUser && (
              <View
                style={
                  isActiveMember && myCompanyInfo.length > 0
                    ? { marginLeft: 30 }
                    : { marginHorizontal: 10 }
                }>
                <View style={styles.viewPersonInfo}>
                  {isActiveMember && myCompanyInfo.length > 0 && (
                    <Image
                      source={{ uri: SERVER_URL + myCompanyInfo[0].logo }}
                      style={styles.imageLogo}
                    />
                  )}
                  {!isEditField?.personal_info && (
                    <TouchableOpacity
                      onPress={setVisibleMenu}
                      style={styles.icShare}>
                      <Image source={IMAGES.IcMenuVertical} />
                      <Menu
                        visible={visibleMenu}
                        onRequestClose={setVisibleMenu}>
                        <MenuItem onPress={onPressEditProfile}>
                          <Text>Chỉnh sửa thông tin</Text>
                        </MenuItem>
                        {myRole?.name === 'Admin' && (
                          <MenuItem onPress={onNavigateToCharge}>
                            <Text>Danh sách các thành viên</Text>
                          </MenuItem>
                        )}
                        {!isActiveMember && (
                          <MenuItem onPress={onPressOpenModalActiveMember}>
                            <Text>Yêu cầu kích hoạt hội viên</Text>
                          </MenuItem>
                        )}
                        {/* <MenuItem onPress={() => setCollapse(false)}>
                          <Text>Nhập server</Text>
                          <Collapsible collapsed={isCollapse}>
                            <Text>Nhập server</Text>
                            <Text>Nhập server</Text>
                            <Text>Nhập server</Text>
                          </Collapsible>
                        </MenuItem> */}
                        <MenuItem onPress={onNavigateToServer}>
                          <Text>Nhập server</Text>
                        </MenuItem>
                        <MenuItem onPress={navigateToSetting}>
                          <Text>Cài đặt</Text>
                        </MenuItem>

                        <MenuItem onPress={onNavigateToOtp}>
                          <Text style={{ color: colors.red }}>Xóa tài khoản</Text>
                        </MenuItem>
                        <MenuItem onPress={navigateToLogout}>
                          <Text>Đăng xuất</Text>
                        </MenuItem>
                      </Menu>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() =>
                      isEditField?.personal_info
                        ? openGallery()
                        : console.log('press avatar')
                    }
                    style={styles.viewAvatar}>
                    <ImageBackground
                      style={styles.imgAvatar}
                      source={
                        avatar
                          ? { uri: avatar[0].uri }
                          : infoUser?.avatar
                            ? { uri: Utils.searchAvatar(infoUser?.avatar) }
                            : IMAGES.ImgAvatar
                      }
                      imageStyle={styles.imgAvatar}>
                      {isEditField?.personal_info && <IC_EDIT />}
                      {!isEditField?.personal_info && (
                        <Image
                          source={FrameAvatar.FrameBronze}
                          style={styles.frameAvatar}
                        />
                      )}
                    </ImageBackground>
                  </TouchableOpacity>

                  {isEditField?.personal_info ? (
                    <TextInput
                      label={t('Full_name')}
                      style={{
                        maxHeight: 70,
                        width: '100%',
                        backgroundColor: 'white',
                      }}
                      mode="outlined"
                      onChangeText={txt =>
                        onEditInfo('extend_user_full_name', txt)
                      }
                      value={infoUser?.extend_user_full_name}
                      outlineStyle={{ borderWidth: 1 }}
                      maxLength={20}
                    />
                  ) : (
                    <Text style={styles.txtName}>
                      {`${infoUser?.extend_user_full_name}`}
                    </Text>
                  )}
                  {isEditField?.personal_info && (
                    <View style={styles.inputView}>
                      <DatePicker
                        modal
                        mode="date"
                        open={editBirthday}
                        date={onCheckValidDate(infoUser?.birthday)}
                        onConfirm={date => {
                          hideEditBirthday();
                          onEditInfo('birthday', date);
                        }}
                        onCancel={hideEditBirthday}
                        cancelText={t('Cancel')}
                        confirmText={t('Confirm')}
                      />
                      <TouchableOpacity onPress={showEditBirthday}>
                        <TextInput
                          label={t('Birthday')}
                          mode="outlined"
                          value={moment(infoUser?.birthday).format(
                            'DD/MM/YYYY',
                          )}
                          outlineStyle={{ borderWidth: 1 }}
                          editable={false}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  {isEditField?.personal_info ? (
                    <TextInput
                      label={t('Position')}
                      style={styles.inputView}
                      mode="outlined"
                      onChangeText={txt => onEditInfo('position', txt)}
                      value={infoUser?.position}
                      outlineStyle={{ borderWidth: 1 }}
                    />
                  ) : (
                    <Text style={{ color: colors.purple_blue, marginBottom: 20 }}>
                      {infoUser?.position}
                    </Text>
                  )}

                  {isEditField?.personal_info ? (
                    <TextInput
                      label={t('Description')}
                      outlineStyle={{ borderWidth: 1 }}
                      style={[styles.inputView, { width: '100%' }]}
                      mode="outlined"
                      multiline={true}
                      numberOfLines={4}
                      onChangeText={txt => onEditInfo('job_description', txt)}
                      value={infoUser?.job_description || ''}
                    />
                  ) : (
                    <Text style={styles.contentCard}>
                      {infoUser?.job_description ||
                        'I’m a kiddo that fall in love with amazing user-centric designs. I have been playing around with designs via Figma for a long time'}
                    </Text>
                  )}
                  <View style={{ width: '100%' }}>
                    {!isEditField?.personal_info && (
                      <View style={[styles.flexRow, { marginTop: 15 }]}>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                          <EMAIL_SVG />
                        </View>
                        <Text style={[styles.subTxt, { flex: 2 }]}>
                          {infoUser?.email}
                        </Text>
                      </View>
                    )}
                    {isEditField?.personal_info ? (
                      <TextInput
                        style={styles.inputView}
                        mode="outlined"
                        value={infoUser?.cell_phone}
                        label={t('Phone_number')}
                        onChangeText={txt => onEditInfo('cell_phone', txt)}
                        outlineStyle={{ borderWidth: 1 }}
                        keyboardType="phone-pad"
                      />
                    ) : (
                      infoUser?.cell_phone && (
                        <View style={styles.flexRow}>
                          <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <SMART_PHONE />
                          </View>
                          <Text style={[styles.subTxt, { flex: 2 }]}>
                            {infoUser?.cell_phone}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                  {isEditField?.personal_info && (
                    <TouchableOpacity
                      activeOpacity={0.2}
                      style={{
                        width: '100%',
                      }}
                      onPress={onNavigateToSocial}>
                      <View style={styles.btnNavigateSocial}>
                        <Text>{t('Edit_social')}</Text>
                        <Image
                          source={IMAGES.IcRightArrow}
                          style={{ width: 20, height: 20 }}
                        />
                      </View>
                    </TouchableOpacity>
                  )}

                  {!isEditField?.personal_info ? (
                    <View
                      style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                      {socialLink?.length > 0 &&
                        socialLink.map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() =>
                              onPressVisitSocial(item.contact_unique_id)
                            }>
                            {
                              <Image
                                source={Utils.findLogoContact(item.type)}
                                style={{ width: 35, height: 35 }}
                                resizeMode="contain"
                              />
                            }
                          </TouchableOpacity>
                        ))}
                    </View>
                  ) : (
                    <View style={styles.viewActionButton}>
                      <ButtonComponent
                        style={styles.btnCancel}
                        text={'Hủy'}
                        textStyle={styles.txtCancel}
                        onPress={onPressCancelEdit}
                      />
                      <ButtonComponent
                        style={styles.btnSave}
                        text={'Lưu'}
                        textStyle={styles.txtSave}
                        onPress={onPressChangeInfo}
                      />
                    </View>
                  )}
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  {isActiveMember && myCompanyInfo.length > 0 && (
                    <Image
                      source={IMAGES.IcDotOutline}
                      style={{ width: 20, height: 20 }}
                    />
                  )}
                  <Image
                    source={IMAGES.IcDotFilled}
                    style={{ width: 20, height: 20 }}
                  />
                  <Image
                    source={IMAGES.IcDotOutline}
                    style={{ width: 20, height: 20 }}
                  />
                </View>
              </View>
            )}
            {index === 2 && (
              <QRcode
                viewShotRef={viewShotRef}
                onPressShareInfo={onPressShareInfo}
                infoUser={infoUser}
                valueQr={valueQr}
              />
            )}
          </View>
        ))}
      </ScrollView>

      {isShowBtnScan && (
        <TouchableOpacity onPress={onPressScan} style={{ alignItems: 'center' }}>
          <Image source={IMAGES.IcScan} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default ECardView;

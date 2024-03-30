import moment from 'moment';
import React, {useRef, useState} from 'react';
import {
  Animated,
  Image,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {toggleAnimation} from '../../../../animation/toggleAnimation';
import TextInputComponent from '../../../../components/TextInputComponent';
import generalStyles from '../../../../styles/generalStyles';
import colors from '../../../../values/colors';
import {IMAGES} from '../../../../values/images';
import {SERVER_URL} from '../../../../values/string';
import RootNavigation from '../../../../navigation/RootNavigation';
import {APP_NAVIGATE_SCREEN} from '../../../../utils/constant';
import styles, {txtStyles} from '../../chargeStyles';

const MemberShip = props => {
  const {member, addNewMembership} = props;

  const [showContent, setShowContent] = useState(false);
  const [fee, setFee] = useState();
  const animationController = useRef(new Animated.Value(0)).current;
  const toggleListItem = () => {
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setShowContent(!showContent);
  };

  return (
    <View style={styles.itemContainer}>
      <View style={generalStyles.flexRow}>
        <View style={{flex: 1}}>
          <Image
            source={{uri: SERVER_URL + member?.avatar}}
            style={generalStyles.imgAvatarSmall}
          />
        </View>
        <View style={{marginLeft: 10, flex: 3}}>
          <Text
            style={txtStyles.title}
            onPress={() =>
              RootNavigation.navigate(APP_NAVIGATE_SCREEN.CONTACT, {
                userId: member.user_id,
              })
            }>
            {member?.full_name}
          </Text>
          <Text>{`${moment(member.created_at).format('DD/MM/YYYY')} - ${moment(
            member.expired_at,
          ).format('DD/MM/YYYY')}`}</Text>
          <Text>
            {member.fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
              ' vnđ'}
          </Text>
        </View>
        <View style={[styles.marginCenterView, {flex: 1}]}>
          {member.active ? (
            <Image
              source={IMAGES.IcCheckMark}
              style={generalStyles.smallIcon}
            />
          ) : (
            <TouchableOpacity style={styles.btnActive} onPress={toggleListItem}>
              <Text
                style={{color: colors.red, fontWeight: '700', fontSize: 13}}>
                Active
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {showContent && (
        <View style={{marginVertical: 10, flexDirection: 'row'}}>
          <View style={{width: 200, flex: 4}}>
            <TextInputComponent
              value={fee}
              placeholder={'10.000.000 vnđ'}
              styleAreaInput={{backgroundColor: 'white'}}
              autoCompleteType={'postal-address'}
              keyboardType={'numeric'}
              onChangeText={setFee}
            />
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => addNewMembership(member.user_id, fee)}>
              <Image
                source={IMAGES.IcCheckMark}
                style={generalStyles.smallIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default MemberShip;

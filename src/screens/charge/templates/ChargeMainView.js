import React, {useState, useMemo} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  FlatList,
} from 'react-native';
import MemberShip from './subViews/Membership';
import {IMAGES} from '../../../values/images';
import generalStyles from '../../../styles/generalStyles';
const ChargeMainView = props => {
  const {addNewMembership, goBack, memberList} = props;

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={goBack}>
        <Image source={IMAGES.IcLeftArrow} style={generalStyles.smallIcon} />
      </TouchableOpacity>
      <FlatList
        data={memberList}
        keyExtractor={item => item.user_id.toString()}
        renderItem={({item}) => (
          <MemberShip member={item} addNewMembership={addNewMembership} />
        )}
      />
    </SafeAreaView>
  );
};

export default ChargeMainView;

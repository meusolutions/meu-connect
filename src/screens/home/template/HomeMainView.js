import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import styles from '../style';
import RandomQuote from './subViews/RandomQuote';
import BirthdayComponent from './subViews/BirthdayComponent';
import ModalHappyBirthday from './subViews/ModalHappyBirthday';
const HomeMainView = props => {
  const {quotation, modalVisible} = props;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <RandomQuote quotation={quotation} />
        <BirthdayComponent {...props} />
        {modalVisible?.isVisible && <ModalHappyBirthday {...props} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeMainView;

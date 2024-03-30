import React from 'react';
import {Image, Text, View} from 'react-native';
import {IMAGES} from '../../../../values/images';
import styles from '../../style';
const RandomQuote = ({quotation}) => {
  return (
    <View style={[styles.viewQuote, styles.baseShadow]}>
      <View
        style={{
          padding: 10,
        }}>
        <Text style={styles.textQuote}>
          {quotation?.content
            ? quotation.content
            : `If you cannot do greats things, do small things in a great way`}
        </Text>
        <Text style={{color: 'black', textAlign: 'right'}}>
          {quotation?.name ? '-' + quotation?.name : `-Napoleon Hill`}
        </Text>
      </View>
      <Image style={styles.bgQuote} source={IMAGES.BgQuote} />
    </View>
  );
};

export default RandomQuote;

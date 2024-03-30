
import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../../values/colors'
import { ImageLogo, } from '../../../values/images'
import FastImage from 'react-native-fast-image'
const SplashScreen = () => {

  return (
    <LinearGradient
      colors={colors.appTheme}
      style={styles.main}
      useAngle={true}
      angle={45}>
      <FastImage source={ImageLogo.GifLogo} style={styles.iconLogo} />
    </LinearGradient>

  )
}

export default SplashScreen
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textEvent: {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 30,
    lineHeight: 26,
  },
  iconLogo: {
    width: 300,
    height: 300,
  },
})

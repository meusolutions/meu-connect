import React, { useRef } from 'react';

import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { BACK_SVG } from '../../assets/svgAsset';
import colors from '../../values/colors';
import styles from './scanStyle';
function ScanScreen(props) {
  const {
    handleDecodeWhenOpenGallery,
    onPressCloseScan,
    onDecodeBarcode,
    scanFailTxt,
  } = props;

  const ref = useRef();
  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        onPress={onPressCloseScan}
        style={{
          position: 'absolute',
          top: 30,
          left: 10,
          zIndex: 10,
        }}>
        <BACK_SVG width={32} height={32} color={colors.white} />
      </TouchableOpacity>
      <QRCodeScanner
        ref={ref}
        containerStyle={{flex: 1}}
        cameraStyle={styles.maxScreen}
        markerStyle={styles.marker}
        showMarker={true}
        onRead={onDecodeBarcode}
        reactivateTimeout={2000}
        cameraContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
        topContent={
          <View style={styles.buttonTouchable}>
            <Text style={styles.title}>Quét mã Qr</Text>
            <Text style={{color: colors.white}}>
              Quét mã QR để lấy thông tin
            </Text>
          </View>
        }
        //flashMode={RNCamera.Constants.FlashMode.torch}
        bottomContent={
          <View style={styles.viewBottom}>
            {scanFailTxt && (
              <Text style={styles.errorScanTxt}>{scanFailTxt}</Text>
            )}
            <TouchableOpacity
              style={[
                styles.buttonTouchable,
                styles.btnBottomAction,
                styles.padding,
              ]}>
              <Text>Quét mã</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDecodeWhenOpenGallery()}
              style={(styles.buttonTouchable, styles.padding)}>
              <Text>Mở thư viện</Text>
            </TouchableOpacity>
          </View>
        }></QRCodeScanner>
    </SafeAreaView>
  );
}

export default ScanScreen;

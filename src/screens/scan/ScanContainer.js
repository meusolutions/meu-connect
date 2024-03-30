import React, {useState} from 'react';
import {LogBox, PermissionsAndroid, Platform} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import RootNavigation from '../../navigation/RootNavigation';
import {APP_NAVIGATE_SCREEN} from '../../utils/constant';
import ScanScreen from './ScanScreen';
const ScanContainer = props => {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const {params} = props.route;
  const {onOpenLibrary, onPressCloseScan, decodeBarcode, onScan} = params.data;

  const [scanFailTxt, setFailTxt] = useState();

  const handleDecodeWhenOpenGallery = async () => {
    // if (Platform.OS === 'android') {
    //   try {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //       {
    //         title: 'Cool Photo App Camera Permission',
    //         message:
    //           'Cool Photo App needs access to your camera ' +
    //           'so you can take awesome pictures.',
    //         buttonNeutral: 'Ask Me Later',
    //         buttonNegative: 'Cancel',
    //         buttonPositive: 'OK',
    //       },
    //     );
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       launchImageLibrary(
    //         {
    //           mediaType: 'photo',
    //           includeBase64: true,
    //         },
    //         async response => {
    //           if (!response.didCancel) {
    //             const res = await onScan(response.assets[0].uri);
    //             if (!res) {
    //               setFailTxt('Không tìm thấy thông tin');
    //             } else {
    //               setFailTxt('');
    //             }
    //           }
    //         },
    //       );
    //     } else {
    //       console.log('Camera permission denied');
    //     }
    //   } catch (err) {
    //     console.warn(err);
    //   }
    // }
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      async response => {
        if (!response.didCancel) {
          const res = await onScan(response.assets[0].uri);
          if (!res) {
            setFailTxt('Không tìm thấy thông tin');
          } else {
            setFailTxt('');
          }
        }
      },
    );
  };

  const onDecodeBarcode = async e => {
    const resDecode = await decodeBarcode(e.data);
    if (resDecode !== true) {
      RootNavigation.navigate(APP_NAVIGATE_SCREEN.CONTACT, {userId: resDecode});
      setFailTxt(resDecode);
      return;
    }
    setFailTxt('');
  };
  const scanProps = {
    onOpenLibrary,
    onPressCloseScan,
    decodeBarcode,
    scanFailTxt,
    handleDecodeWhenOpenGallery,
    onDecodeBarcode,
  };
  return <ScanScreen {...scanProps} />;
};

export default ScanContainer;

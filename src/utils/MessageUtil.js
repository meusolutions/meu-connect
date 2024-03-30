import Toast from 'react-native-toast-message'
export const ToastMessage = ({
  message,
  title,
  onHide,
  timeVisible,
  onShow,
  type,
}) => {
  Toast.show({
    text1: title ?? 'Notification',
    text2: message ?? 'Success',
    onHide: onHide,
    onShow: onShow,
    visibilityTime: timeVisible ?? 1500,
    type: type ?? 'success',
  })
}

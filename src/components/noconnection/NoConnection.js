
import React from 'react'
import { SafeAreaView, View, Text, Linking, StyleSheet, Dimensions, Image, Button } from 'react-native'
//Screen
import { IMAGES } from '../../values/images'
//Values
import string from '../../values/string'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function NoConnection() {
    const onOpenSetting = () => {
        Linking.openSettings('App-Prefs:General')
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.mainView}>
                <Image source={IMAGES.BgNoConnection} style={{ width: windowWidth, height: windowHeight / 2 }} />
                <View style={styles.textWrapper}>
                    <Text style={styles.text} numberOfLines={2}>
                        {string.NO_CONNECTION_TEXT}
                    </Text>
                </View>
                <View style={{marginTop: 40 }}>
                    <Button
                        title={"Try again"}
                        onPress={onOpenSetting}

                    />
                </View>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        textAlign: 'center',
        marginLeft: 50,
        marginRight: 50,
        color: 'black',
    },
    emptyView: { flex: 2, backgroundColor: 'white' },
})
export default NoConnection

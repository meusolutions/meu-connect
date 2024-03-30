
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Image,
    Text,
    View,
} from 'react-native';
import { BgIntroduce } from '../../../values/images'
import ButtonComponent from '../../../components/ButtonComponent';
import TextInputComponent from '../../../components/TextInputComponent';
import styles from './style'
const ForgotPasswordScreen = ({
    email,
    txtResponse,
    onSubmit,
    goBack,
    isError,
    onChangeText
}) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Image source={BgIntroduce.BgTop} style={[styles.bgFullWidth,]} />
                </View>
                <View style={{ flex: 3, alignItems: 'center' }}>
                    <View style={styles.centerView}>
                        <Text style={styles.txtTitle}>Khôi phục tài khoản</Text>
                        {txtResponse && <Text style={styles.txtResponse}> {txtResponse}</Text>}
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Email</Text>
                        <View>
                            {isError.type && < Text style={{ color: 'red', fontSize: 11 }}>{isError.text}</Text>}
                            <TextInputComponent
                                value={email}
                                placeholder={'Vui lòng nhập email của bạn'}
                                styleAreaInput={{ backgroundColor: 'white' }}
                                autoCompleteType={'postal-address'}
                                keyboardType={'email'}
                                onChangeText={onChangeText}
                            />

                        </View>
                        <ButtonComponent
                            style={styles.btnSendRequest}
                            text={"Gửi yêu cầu"}
                            textStyle={{ color: 'white' }}
                            onPress={onSubmit}
                        />
                        <ButtonComponent
                            style={styles.btnBack}
                            text={"Quay lại"}
                            textStyle={{ color: 'blue' }}
                            onPress={goBack}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={{ marginLeft: 20 }}>2022 @ MeU Solutions, Inc</Text>
                    <Image source={BgIntroduce.BgFtStep1} style={styles.bgFullWidth} />
                </View>
            </View>
        </SafeAreaView >
    )
};

export default ForgotPasswordScreen;

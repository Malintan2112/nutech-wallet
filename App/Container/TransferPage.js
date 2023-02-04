import React, { useEffect, useState } from 'react'
import { Text, View, StatusBar, FlatList, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native'
import FloatingActionContainer from '../Component/FloatingActionButtonKLK'
import Header from '../Component/Header'
import Colors from '../Constants/Colors'
import Fonts from '../Constants/Fonts'
import ActionHelpers from '../Helpers/ActionHelpers'
import isEmpty from 'lodash/isEmpty'
import Icon from 'react-native-vector-icons/FontAwesome5';

const TransferPage = (props) => {

    const [ammount, setAmmount] = useState('')
    const [errorAmmount, setErrorAmmount] = useState('')
    const [contactPerson, setContactPerson] = useState('')

    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR }}>
            <Header title='Transfer' />
            <StatusBar backgroundColor={Colors.WHITE_COLOR} />
            <ScrollView>
                <View style={{ paddingHorizontal: 25 }}>
                    <View>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('ContactListPage', { setContactPerson: (e) => setContactPerson(e) })}
                            style={{ borderBottomColor: Colors.GRAY_DARK_COLOR, borderBottomWidth: 1, paddingBottom: 5, paddingTop: 30, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <Text allowFontScaling={false} style={{ fontSize: Fonts.FontSize.md, color: contactPerson ? Colors.BLACK_COLOR : Colors.GRAY_COLOR, fontFamily: Fonts.FontsFamily.fontRegular }}>{contactPerson || 'Masukkan nama atau nomor handphone'} </Text>
                            <Icon name='address-book' style={{ fontSize: 15 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: "center" }}>
                        <Image source={require('../Assets/Images/loginRegister/logo.webp')} style={{ width: 42, height: 53 }} resizeMode='contain' />
                        <View style={{ marginLeft: 10 }}>
                            <Text allowFontScaling={false} style={{ fontSize: Fonts.FontSize.sm, fontFamily: Fonts.FontsFamily.fontSemiBold }}>Nutech Wallet</Text>
                            <Text allowFontScaling={false} style={{ fontSize: Fonts.FontSize.sm, color: Colors.GRAY_COLOR, fontFamily: Fonts.FontsFamily.fontRegular }}>Saldo <Text allowFontScaling={false} style={{ color: Colors.BLACK_COLOR }}>Rp500.000</Text></Text>
                        </View>
                    </View>
                    <Text allowFontScaling={false} style={{ marginTop: 20, fontSize: 10, fontFamily: Fonts.FontsFamily.fontRegular, color: Colors.GRAY_DARK_COLOR }}>Nominal Transfer</Text>
                    <View style={{ marginBottom: 20 }}>
                        <TextInput
                            value={ammount}
                            keyboardType='decimal-pad'
                            onChangeText={(e) => {
                                setAmmount(ActionHelpers.NumberWithCommas(e.replace(/\./g, '')))
                            }}
                            placeholder='Minimal Rp10.000'
                            style={{ backgroundColor: isEmpty(ammount) ? '#E5E5E5' : '#D9E5F4', marginTop: 10, borderRadius: 5, paddingHorizontal: 15 }}
                        />
                        {errorAmmount !== '' && <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontRegular, fontSize: Fonts.FontSize.sm, marginTop: 5, color: Colors.RED_COLOR }}>{errorAmmount}</Text>}
                    </View>
                </View>
            </ScrollView>
            <FloatingActionContainer
                primaryText='Top Up Sekarang'
                keyExtractor={(item, index) => `history transfer ${index}`}
                disabled={isEmpty(ammount) || isEmpty(contactPerson)}
                onPressPrimary={() => {
                    if (ammount.replace(/\./g, '') < 10000) {
                        setErrorAmmount('Nominal tidak boleh kurang dari Rp10.000')
                    } else {
                        setErrorAmmount('')

                    }
                }}
            />
        </View>
    )
}


export default TransferPage
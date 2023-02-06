import React from 'react'
import { Text, View, StatusBar, FlatList, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Header from '../Component/Header'
import Colors from '../Constants/Colors'
import Fonts from '../Constants/Fonts'
import { numberWithCommas } from '../Helpers/ActionHelpers'
const DetailTransactionPage = (props) => {
    const params = props.route?.params?.data
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR }}>
            <Header title='Detail Transaksi' />
            <StatusBar backgroundColor={Colors.WHITE_COLOR} />
            <View style={{ paddingHorizontal: 25, paddingVertical: 25 }}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text allowFontScaling={false} style={localstyles.titleHeading}>{params.type}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontSemiBold, color: Colors.GREEN_COLOR, fontSize: Fonts.FontSize.sm }}>Berhasil</Text>
                        <View style={{ width: 12, height: 12, backgroundColor: Colors.GREEN_COLOR, borderRadius: 6, marginLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name='check' style={{ fontSize: 8, color: Colors.WHITE_COLOR }} />
                        </View>
                    </View>
                </View>
                <Text allowFontScaling={false} style={localstyles.titleTxtContent}>{params.toUser}</Text>
                <View style={{ paddingVertical: 15, marginVertical: 15, borderTopWidth: 1, borderTopColor: Colors.GRAY_COLOR, borderBottomWidth: 1, borderBottomColor: Colors.GRAY_COLOR }}>
                    <Text allowFontScaling={false} style={[localstyles.titleHeading]}>Detail Transaksi</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text allowFontScaling={false} style={localstyles.titleTxtContent}>Nominal</Text>
                        <Text allowFontScaling={false} style={localstyles.titleTxtContent}>Rp{numberWithCommas(params?.amount)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text allowFontScaling={false} style={localstyles.titleTxtContent}>Biaya Admin</Text>
                        <Text allowFontScaling={false} style={localstyles.titleTxtContent}>Rp0</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text allowFontScaling={false} style={[localstyles.titleTxtContent, { fontFamily: Fonts.FontsFamily.fontSemiBold }]}>Total</Text>
                        <Text allowFontScaling={false} style={[localstyles.titleTxtContent, { fontFamily: Fonts.FontsFamily.fontSemiBold }]}>Rp{numberWithCommas(params?.amount)}</Text>
                    </View>
                </View>
                <Text allowFontScaling={false} style={localstyles.titleTxtContent}>Nomor Referensi: DDR1{params?.transaction_id}</Text>
            </View>

        </View>
    )
}

const localstyles = StyleSheet.create({
    titleHeading: { fontFamily: Fonts.FontsFamily.fontSemiBold, color: Colors.BLACK_COLOR, fontSize: Fonts.FontSize.md },
    titleTxtContent: { fontSize: Fonts.FontSize.sm, fontFamily: Fonts.FontsFamily.fontRegular, color: Colors.BLACK_COLOR, marginTop: 5 }
})
export default DetailTransactionPage

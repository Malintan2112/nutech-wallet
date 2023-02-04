import React from 'react'
import { Text, View, StatusBar, FlatList } from 'react-native'
import Header from '../Component/Header'
import Colors from '../Constants/Colors'
import Fonts from '../Constants/Fonts'
const HistoryPage = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR }}>
      <Header title='Riwayat Transaksi' />
      <StatusBar backgroundColor={Colors.WHITE_COLOR} />
      <View style={{ paddingHorizontal: 25 }}>
        <FlatList
          data={[1, 1, 1, 2, 2, 1, 1, 1, 2, 2]}
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: 15 }}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: '#DEE5EF', height: 75, marginTop: 10, borderRadius: 10, elevation: 5, flex: 1, paddingVertical: 10, paddingHorizontal: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
              <View>
                <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontSemiBold, fontSize: 14, color: Colors.BLACK_COLOR }}>
                  {item === 1 ? 'Bank BCA' : 'Tokopedia'}
                </Text>
                <Text allowFontScaling={false} style={{ fontSize: 10, color: Colors.GRAY_DARK_COLOR, fontFamily: Fonts.FontsFamily.fontRegular }}>
                  24 Januari 2022, 08:15:44 WIB
                </Text>
                <Text allowFontScaling={false} style={{ fontSize: 10, color: Colors.BLACK_COLOR, fontFamily: Fonts.FontsFamily.fontRegular }}>{item === 1 ? 'Top Up' : 'Transfer'}</Text>
              </View>
              <Text allowFontScaling={false} style={{ fontSize: 10, fontFamily: Fonts.FontsFamily.fontSemiBold, color: item === 1 ? '#22B07D' : '#D62827' }}>{item === 1 ? '+' : '-'}Rp500.000</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default HistoryPage

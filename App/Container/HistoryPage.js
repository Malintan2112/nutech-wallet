import React, { useEffect } from 'react'
import { Text, View, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native'
import Header from '../Component/Header'
import Loader from '../Component/Loader'
import Colors from '../Constants/Colors'
import Fonts from '../Constants/Fonts'
import { numberWithCommas } from '../Helpers/ActionHelpers'
import { formatLLL } from '../Helpers/Days'
import useEzFetch from '../Services/useEzFetch'
const HistoryPage = (props) => {
  const { get, data = [], fetching } = useEzFetch()

  useEffect(() => {
    get('/transactionHistory', { authorization: true })
  }, [])
  const randomName = [
    'Hernawan (Gopay)', 'Abdi (Gopay)', 'Khusnul (ShoopePay)', 'Amri (ShoopePay)'
  ]
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR }}>
      <Header title='Riwayat Transaksi' />
      <StatusBar backgroundColor={Colors.WHITE_COLOR} />
      <Loader loading={fetching} />

      <View style={{ paddingHorizontal: 25 }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: 15 }}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
          ListEmptyComponent={() => (
            <View style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../Assets/Images/historyTransaction/emptyList.webp')} style={{ width: 124, height: 122 }} resizeMode={'contain'} />
              <Text allowFontScaling={false} style={{ color: Colors.BLACK_COLOR, marginTop: 20, fontFamily: Fonts.FontsFamily.fontSemiBold, fontSize: Fonts.FontSize.md }}>Belum Ada Informasi</Text>
              <Text allowFontScaling={false} style={{ color: Colors.GRAY_DARK_COLOR, fontFamily: Fonts.FontsFamily.fontRegular, fontSize: Fonts.FontSize.sm }}>kami pasti kasih tahu anda jika ada informasi</Text>
            </View>
          )}
          renderItem={({ item }) => {
            const isTopUp = item?.transaction_type === 'topup'
            const toUser = isTopUp ? 'Bank BCA' : randomName[Math.floor(Math.random() * 4)]
            const dateCustome = `${formatLLL(item.transaction_time)} WIB`
            const type = isTopUp ? 'Top Up' : 'Transfer'
            return (
              (
                <TouchableOpacity onPress={() => props.navigation.navigate('DetailTransactionPage', { data: { ...item, dateCustome, type, toUser } })} style={{ backgroundColor: '#DEE5EF', height: 75, marginTop: 10, borderRadius: 10, elevation: 5, flex: 1, paddingVertical: 10, paddingHorizontal: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
                  <View>
                    <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontSemiBold, fontSize: 14, color: Colors.BLACK_COLOR }}>
                      {toUser}
                    </Text>
                    <Text allowFontScaling={false} style={{ fontSize: 10, color: Colors.GRAY_DARK_COLOR, fontFamily: Fonts.FontsFamily.fontRegular }}>
                      {dateCustome}
                    </Text>
                    <Text allowFontScaling={false} style={{ fontSize: 10, color: Colors.BLACK_COLOR, fontFamily: Fonts.FontsFamily.fontRegular }}>{type}</Text>
                  </View>
                  <Text allowFontScaling={false} style={{ fontSize: 10, fontFamily: Fonts.FontsFamily.fontSemiBold, color: isTopUp ? '#22B07D' : '#D62827' }}>{isTopUp ? '+' : '-'}Rp{numberWithCommas(item?.amount)}</Text>
                </TouchableOpacity>
              )
            )
          }}
        />
      </View>
    </View>
  )
}

export default HistoryPage

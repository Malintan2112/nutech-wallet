import React, { useState } from 'react'
import { Text, View, StatusBar, FlatList, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native'
import FloatingActionContainer from '../Component/FloatingActionButtonKLK'
import Header from '../Component/Header'
import Colors from '../Constants/Colors'
import Fonts from '../Constants/Fonts'
import ActionHelpers from '../Helpers/ActionHelpers'
import isEmpty from 'lodash/isEmpty'

const TopUpPage = (props) => {
  const [ammount, setAmmount] = useState('')
  const [errorAmmount, setErrorAmmount] = useState('')
  const listSuggestion = [
    {
      title: 'Rp100.000',
      value: '100.000'
    },
    {
      title: 'Rp200.000',
      value: '200.000'
    },
    {
      title: 'Rp500.000',
      value: '500.000'
    }
  ]
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR }}>
      <Header title='Top Up' />
      <StatusBar backgroundColor={Colors.WHITE_COLOR} />
      <ScrollView>
        <View style={{ paddingHorizontal: 25 }}>
          <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontRegular, fontSize: 14, color: Colors.GRAY_DARK_COLOR, textAlign: 'center', marginTop: 30 }}>Saldo Anda</Text>
          <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontRegular, textAlign: 'center', color: Colors.BLUE_COLOR, fontSize: 36, marginBottom: 30 }}>Rp500.000</Text>
          <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontSemiBold, color: Colors.BLACK_COLOR }}>Pilih Nominal Top Up</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            {listSuggestion.map((list, index) =>
              <TouchableOpacity
                onPress={() => { setAmmount(list?.value) }}
                key={'list suggestion' + index} style={{ width: '32%', paddingVertical: 5, alignItems: 'center', borderRadius: 30, borderWidth: 1, borderColor: Colors.GRAY_COLOR }}
              >
                <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontRegular, fontSize: Fonts.FontSize.sm, color: Colors.BLACK_COLOR }}>{list?.title}</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text allowFontScaling={false} style={{ marginTop: 20, fontSize: 10, fontFamily: Fonts.FontsFamily.fontRegular, color: Colors.GRAY_DARK_COLOR }}>Nominal Lainnya</Text>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              value={ammount}
              keyboardType='decimal-pad'
              onChangeText={(e) => {
                setAmmount(ActionHelpers.numberWithCommas(e.replace(/\./g, '')))
              }}
              placeholder='Minimal Rp10.000'
              style={{ backgroundColor: isEmpty(ammount) ? '#E5E5E5' : '#D9E5F4', marginTop: 10, borderRadius: 5, paddingHorizontal: 15 }}
            />
            {errorAmmount !== '' && <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontRegular, fontSize: Fonts.FontSize.sm, marginTop: 5, color: Colors.RED_COLOR }}>{errorAmmount}</Text>}
          </View>
          <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontSemiBold, color: Colors.BLACK_COLOR }}>Kartu Debit</Text>
          <Image source={require('../Assets/Images/topUp/bca.webp')} style={{ width: 55, height: 32 }} />
          <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontRegular, fontSize: Fonts.FontSize.sm, color: Colors.BLACK_COLOR }}>Nomor Kartu <Text style={{ fontFamily: Fonts.FontsFamily.fontSemiBold }}> 1234 - 5678 - 9876 - XXXX</Text></Text>
        </View>
      </ScrollView>
      <FloatingActionContainer
        primaryText='Top Up Sekarang'
        disabled={isEmpty(ammount)}
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

export default TopUpPage

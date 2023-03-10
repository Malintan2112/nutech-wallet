import React, { useRef, useState } from 'react'
import { Text, View, StatusBar, FlatList, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native'
import FloatingActionContainer from '../Component/FloatingActionButtonKLK'
import Header from '../Component/Header'
import Colors from '../Constants/Colors'
import Fonts from '../Constants/Fonts'
import ActionHelpers, { numberWithCommas } from '../Helpers/ActionHelpers'
import isEmpty from 'lodash/isEmpty'
import Loader from '../Component/Loader'
import ModalStatusProcess from '../Component/ModalStatusProcess'
import { useDispatch, useSelector } from 'react-redux'
import useEzFetch from '../Services/useEzFetch'
import GeneralAction from '../Redux/GeneralRedux'


const TopUpPage = (props) => {
  const [ammount, setAmmount] = useState('')
  const [errorAmmount, setErrorAmmount] = useState('')
  const modalStatusProcessRef = useRef(null)
  const balance = useSelector(state => state.general.balance)
  const { post, fetchingPost } = useEzFetch()
  const dispatch = useDispatch()

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
          <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontRegular, textAlign: 'center', color: Colors.BLUE_COLOR, fontSize: 36, marginBottom: 30 }}>Rp{numberWithCommas(balance)}</Text>
          <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontSemiBold, color: Colors.BLACK_COLOR }}>Pilih Nominal Top Up</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            {listSuggestion.map((list, index) =>
              <TouchableOpacity
                onPress={() => { setAmmount(list?.value); setErrorAmmount(''); }}
                key={'list suggestion' + index} style={{ width: '32%', paddingVertical: 5, alignItems: 'center', borderRadius: 30, borderWidth: 1, borderColor: Colors.GRAY_COLOR, backgroundColor: list.value === ammount ? '#D9E5F4' : Colors.WHITE_COLOR }}
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
                if (errorAmmount) setErrorAmmount('')
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
          const ammountFix = ammount.replace(/\./g, '')
          if (ammountFix < 10000) {
            setErrorAmmount('Nominal tidak boleh kurang dari Rp10.000')
          } else {
            post('/topup', { amount: ammountFix }, { authorization: true }, ({ response }) => {
              if (response.status === 200) {
                modalStatusProcessRef.current.setModal(true)
                const balanceFix = parseInt(balance) + parseInt(ammountFix)
                dispatch(GeneralAction.setBalance(balanceFix))
              } else {
                setErrorAmmount(response?.message || 'Terjadi kesalahan koneksi')
              }
            })
          }
        }}
      />
      <ModalStatusProcess ref={modalStatusProcessRef} desc={`Top up sebesar Rp${numberWithCommas(ammount.replace(/\./g, ''))} berhasil`} onRequestClose={() => { setAmmount(''); }} />
      <Loader loading={fetchingPost} />
    </View>
  )
}

export default TopUpPage

import React, { useEffect, useRef, useState } from 'react'
import { Text, View, StatusBar, FlatList, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native'
import FloatingActionContainer from '../Component/FloatingActionButtonKLK'
import Header from '../Component/Header'
import Colors from '../Constants/Colors'
import Fonts from '../Constants/Fonts'
import ActionHelpers, { numberWithCommas } from '../Helpers/ActionHelpers'
import isEmpty from 'lodash/isEmpty'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Loader from '../Component/Loader'
import ModalStatusProcess from '../Component/ModalStatusProcess'
import { useDispatch, useSelector } from 'react-redux'
import useEzFetch from '../Services/useEzFetch'
import GeneralAction from '../Redux/GeneralRedux'


const TransferPage = (props) => {
  const [ammount, setAmmount] = useState('')
  const [errorAmmount, setErrorAmmount] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const balance = useSelector(state => state.general.balance)
  const dispatch = useDispatch()

  const modalStatusProcessRef = useRef(null)
  const { post, fetchingPost } = useEzFetch()
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR }}>
      <Header title='Transfer' />
      <StatusBar backgroundColor={Colors.WHITE_COLOR} />
      <ScrollView>
        <View style={{ paddingHorizontal: 25 }}>
          <View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ContactListPage', { setContactPerson: (e) => setContactPerson(e) })}
              style={{ borderBottomColor: Colors.GRAY_DARK_COLOR, borderBottomWidth: 1, paddingBottom: 5, paddingTop: 30, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}
            >
              <Text allowFontScaling={false} style={{ fontSize: Fonts.FontSize.md, color: contactPerson ? Colors.BLACK_COLOR : Colors.GRAY_COLOR, fontFamily: Fonts.FontsFamily.fontRegular }}>{contactPerson || 'Masukkan nama atau nomor handphone'} </Text>
              <Icon name='address-book' style={{ fontSize: 15 }} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../Assets/Images/loginRegister/logo.webp')} style={{ width: 42, height: 53 }} resizeMode='contain' />
            <View style={{ marginLeft: 10 }}>
              <Text allowFontScaling={false} style={{ fontSize: Fonts.FontSize.sm, fontFamily: Fonts.FontsFamily.fontSemiBold }}>Nutech Wallet</Text>
              <Text allowFontScaling={false} style={{ fontSize: Fonts.FontSize.sm, color: Colors.GRAY_COLOR, fontFamily: Fonts.FontsFamily.fontRegular }}>Saldo <Text allowFontScaling={false} style={{ color: Colors.BLACK_COLOR }}>Rp{numberWithCommas(balance)}</Text></Text>
            </View>
          </View>
          <Text allowFontScaling={false} style={{ marginTop: 20, fontSize: 10, fontFamily: Fonts.FontsFamily.fontRegular, color: Colors.GRAY_DARK_COLOR }}>Nominal Transfer</Text>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              value={ammount}
              keyboardType='decimal-pad'
              onChangeText={(e) => {
                if(errorAmmount) setErrorAmmount('')
                setAmmount(ActionHelpers.numberWithCommas(e.replace(/\./g, '')))
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
          const ammountFix = ammount.replace(/\./g, '')
          if (ammountFix < 10000) {
            setErrorAmmount('Nominal tidak boleh kurang dari Rp10.000')
          } else if (ammount.replace(/\./g, '') > balance) {
            setErrorAmmount('Saldo anda tidak mencukupi')
          } else {
            post('/transfer', { amount: ammountFix }, { authorization: true }, ({ response }) => {
              if (response.status === 200) {
                modalStatusProcessRef.current.setModal(true)
                const balanceFix = parseInt(balance) - parseInt(ammountFix)
                dispatch(GeneralAction.setBalance(balanceFix))
              } else {
                setErrorAmmount(response?.message || 'Terjadi kesalahan koneksi')
              }
            })
          }
        }}
      />
      <Loader loading={fetchingPost} />
      <ModalStatusProcess ref={modalStatusProcessRef} desc={`Transfer sebesar Rp${numberWithCommas(ammount.replace(/\./g, ''))} berhasil`} onRequestClose={() => { setAmmount(''); setContactPerson(''); }} />
    </View>
  )
}

export default TransferPage

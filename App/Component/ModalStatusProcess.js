import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { StyleSheet, View, Modal, Text, Image } from 'react-native'
import Colors from '../Constants/Colors'
import Fonts from '../Constants/Fonts'
import FloatingActionContainer from './FloatingActionButtonKLK'

const ModalStatusProcess = ({ desc, onRequestClose = () => { } }, ref) => {
  const [modal, setModal] = useState(false)
  useImperativeHandle(ref,
    () => ({
      setModal
    }), [])
  return (
    <Modal
      animationType='slide'
      statusBarTranslucent
      visible={modal}
      onRequestClose={() => { setModal(false); onRequestClose() }}
    >
      <View style={styles.modalBackground}>
        <Image source={require('../Assets/Images/loginRegister/success.webp')} style={{ width: 80, height: 80, marginBottom: 10 }} />
        <Text allowFontScaling={false} style={{  fontSize: 36, fontFamily: Fonts.FontsFamily.fontBold, color: Colors.BLACK_COLOR }}>SELAMAT</Text>
        <Text allowFontScaling={false} style={{ fontSize: Fonts.FontSize.md, color: Colors.BLACK_COLOR, fontFamily: Fonts.FontsFamily.fontRegular, textAlign: 'center' }}>{desc || 'Pembayaran anda berhasil'}</Text>
        <FloatingActionContainer primaryText='Kembali' onPressPrimary={() => { setModal(false); onRequestClose() }} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.WHITE_COLOR,
    paddingHorizontal: 25, 
    justifyContent:'center'
  }
})

export default forwardRef(ModalStatusProcess)

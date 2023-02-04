import React, { useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import InputBox from '../Component/InputBox'
import Colors from '../Constants/Colors'
import Fonts from '../Constants/Fonts'
import { useValidate } from '../Helpers/Validate'
const AuthPage = (props) => {
  const authType = props.route.params?.authType || 'login'
  const [form, setForm] = useState({})
  const onTextChange = (obj, input) => {
    setForm(state => ({ ...state, [obj]: String(input), [`${obj}Error`]: '' }))
  }

  const authSetting = {
    login: {
      title: 'Login',
      primaryText: 'Login',
      secondaryText: 'Buat akun baru',
      desc: 'Transfer beda bank, top up e-wallet, kirim uang ke luar negeri, dan beli produk digital. Semua lebih terjangkau di ',
      onPressPrimary: () => {
        const validateForm = useValidate(form, setForm)
        if (!validateForm?.isError) {
          props.navigation.replace('Homepage')
        }
      },
      onPressSecondary: () => {
        props.navigation.push('AuthPage', { authType: 'register' })
      },
      formRequirement: [
        {
          type: 'email',
          title: 'Email',
          desc: 'Contoh: alamat@email.com',
          placeholder: 'Masukan alamat email yang sesuai'
        },
        {
          type: 'passwordEs',
          title: 'Kata Sandi',
          desc: 'Contoh: alamat@email.com',
          placeholder: 'Masukkan kata sandi'
        }
      ]
    },
    register: {
      title: 'Register',
      primaryText: 'Register',
      secondaryText: 'Sudah mempunyai akun ?',
      desc: 'Lengkapi data dirimu untuk memulai transaksi',
      onPressPrimary: () => {
        const validateForm = useValidate(form, setForm)
        if (!validateForm?.isError) {
          props.navigation.pop()
        }
      },
      onPressSecondary: () => {
        props.navigation.replace('AuthPage', { authType: 'login' })
      },
      formRequirement: [
        {
          type: 'firstName',
          title: 'Nama Depan',
          desc: 'Contoh: Hernawan Putra',
          placeholder: 'Masukan nama depan anda'
        },
        {
          type: 'lastName',
          title: 'Nama Belakang',
          desc: 'Contoh: Malintan',
          placeholder: 'Masukan nama belakang anda'
        },
        {
          type: 'email',
          title: 'Email',
          desc: 'Contoh: alamat@email.com',
          placeholder: 'Masukan alamat email yang sesuai'
        },
        {
          type: 'password',
          title: 'Kata Sandi',
          placeholder: 'Masukkan kata sandi'
        },
        {
          type: 'confirmPassword',
          title: 'Ulangi Kata Sandi',
          placeholder: 'Ulangi kata sandi'
        }
      ]
    }
  }

  useEffect(() => {
    if (authType) {
      let defaultForm = {}
      authSetting?.[authType]?.formRequirement.forEach(element => {
        defaultForm = { ...defaultForm, [element?.type]: '' }
      })
      setForm(defaultForm)
    }
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR, paddingTop: 30 }}>
      <KeyboardAvoidingView>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={{ paddingHorizontal: 25, flex: 1, paddingBottom: 40, paddingTop: authType !== 'register' ? 50 : 0 }}>

            <Text allowFontScaling={false} style={localstyles.txtLogin}>{authSetting[authType]?.title}</Text>
            <Text allowFontScaling={false} style={localstyles.descLogin}>{authSetting[authType]?.desc}{authType !== 'register' && <Text style={{ fontFamily: Fonts.FontsFamily.fontSemiBold, color: Colors.BLACK_COLOR }}>Nutech Wallet</Text>}</Text>
            {authType !== 'register' && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, marginTop: 20 }}>
                <View style={localstyles.btnContainer}>
                  <Text allowFontScaling={false} style={localstyles.txtSocialLogin}>Google</Text>
                </View>
                <View style={[localstyles.btnContainer]}>
                  <Text allowFontScaling={false} style={localstyles.txtSocialLogin}>Facebook</Text>
                </View>
              </View>
            )}

            {authSetting?.[authType]?.formRequirement.map((formItem, index) =>
              <InputBox
                key={'formIten ' + index}
                autoCapitalize='none'
                value={form?.[formItem?.type]}
                placeholder={formItem?.placeholder}
                title={formItem?.title}
                onChangeText={(text) => onTextChange(formItem?.type, text)}
                msgError={form?.[`${formItem?.type}Error`]?.toString() || ''}
                password={formItem?.type?.toLowerCase()?.includes('pass')}
                withActionEye={formItem?.type?.toLowerCase()?.includes('pass')}
              />
            )}

            {authType !== 'register' && <Text allowFontScaling={false} style={[localstyles.txtSocialLogin, { color: Colors.BLUE_SKY, textAlign: 'right', fontSize: 10 }]}>Lupa kata sandi</Text>}

            <View style={{ marginBottom: 30, marginTop: 30 }}>
              <TouchableOpacity onPress={authSetting[authType]?.onPressPrimary} style={[localstyles.btnContainer, { backgroundColor: Colors.BLUE_SKY, width: '100%' }]}>
                <Text allowFontScaling={false} style={[localstyles.txtSocialLogin, { color: Colors.WHITE_COLOR }]}>{authSetting[authType]?.primaryText}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={authSetting[authType]?.onPressSecondary} style={[localstyles.btnContainer, { backgroundColor: Colors.WHITE_COLOR, width: '100%' }]}>
                <Text allowFontScaling={false} style={[localstyles.txtSocialLogin, { color: Colors.BLUE_SKY, textAlign: 'center' }]}>{authSetting[authType]?.secondaryText}</Text>
              </TouchableOpacity>
            </View>
            <Image source={require('../Assets/Images/loginRegister/logo.webp')} style={localstyles.styleImg} resizeMode='contain' />

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const localstyles = StyleSheet.create({
  txtSocialLogin: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.GRAY_DARK_COLOR },
  btnContainer: { height: 50, backgroundColor: Colors.GRAY_LIGHT_COLOR, width: '48%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  txtLogo: { fontSize: 12, color: Colors.BLACK_COLOR, alignSelf: 'center', fontFamily: 'Inter-Bold', marginBottom: 20 },
  txtLogin: { fontSize: 26, color: Colors.BLACK_COLOR, fontFamily: 'Inter-Bold', marginBottom: 5 },
  styleImg: { height: 53, width: 42, marginBottom: 5, alignSelf: 'center' },
  descLogin: { fontSize: 12, color: Colors.GRAY_DARK_COLOR, fontFamily: 'Inter-Regular', marginBottom: 10 }

})
export default AuthPage

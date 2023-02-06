import React, { useEffect, useRef, useState } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import InputBox from '../Component/InputBox'
import Loader from '../Component/Loader'
import ModalStatusProcess from '../Component/ModalStatusProcess'
import Colors from '../Constants/Colors'
import Fonts from '../Constants/Fonts'
import { capitalizeEachWord } from '../Helpers/ActionHelpers'
import { useValidate } from '../Helpers/Validate'
import useEzFetch from '../Services/useEzFetch'
import * as Sessions from '../Services/Sessions'
import { useDispatch } from 'react-redux'
import GeneralAction from '../Redux/GeneralRedux'


const AuthPage = (props) => {

  // Initial type auth
  const authType = props.route.params?.authType || 'login'
  // state 
  const [form, setForm] = useState({})
  const [msgError, setMsgError] = useState('')
  const [msgSuccess, setMsgSuccess] = useState('')
  // Initial all form ref
  const emailRef = useRef()
  const passwordEsRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const modalStatusProcessRef = useRef()
  // Fetch Data Using Custom Hooks 
  const { post, fetchingPost } = useEzFetch()
  const dispatch = useDispatch()


  const authSetting = {
    login: {
      title: 'Login',
      primaryText: 'Login',
      secondaryText: 'Buat akun baru',
      desc: 'Transfer beda bank, top up e-wallet, kirim uang ke luar negeri, dan beli produk digital. Semua lebih terjangkau di ',
      onPressPrimary: async () => {
        try {
          const validateForm = useValidate(form, setForm)
          if (!validateForm?.isError) {
            const { email, passwordEs: password } = form
            post('/login', { email, password }, {}, ({ response }) => {
              if (response.status === 200) {
                Sessions.setValue(Sessions.API_TOKEN, response?.data?.data?.token)
                dispatch(GeneralAction.setUserData(response?.data?.data))
                props.navigation.replace('Homepage')
              } else {
                setMsgError(response?.data?.message || 'Terjadi kesalahan server dengan code error ')
              }
            })

          }
        } catch (error) {
          setMsgError('Terjadi kesalahan teknis dalam aplikasi')
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
          placeholder: 'Masukan alamat email yang sesuai',
          ref: emailRef,
          nextRef: passwordEsRef
        },
        {
          type: 'passwordEs',
          title: 'Kata Sandi',
          placeholder: 'Masukkan kata sandi',
          ref: passwordEsRef
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
        const { email, password, firstName: first_name, lastName: last_name } = form
        if (!validateForm?.isError) {
          post('/registration', { email, password, first_name, last_name }, {}, ({ response }) => {
            if (response.status === 200) {
              setMsgSuccess(response?.data?.message)
              modalStatusProcessRef.current.setModal(true)
            } else {
              if (response?.data?.message?.includes('email')) {
                setForm({ ...form, emailError: 'Email anda tidak valid' })
              } else {
                setMsgError('Terjadi kesalahan server dengan code error ' + response.status)
              }
            }
          })
        }
      },
      onPressSecondary: () => {
        props.navigation.replace('AuthPage', { authType: 'login' })
      },
      formRequirement: [
        {
          type: 'firstName',
          title: 'Nama Depan',
          placeholder: 'Masukan nama depan anda',
          ref: firstNameRef,
          nextRef: lastNameRef
        },
        {
          type: 'lastName',
          title: 'Nama Belakang',
          placeholder: 'Masukan nama belakang anda',
          ref: lastNameRef,
          nextRef: emailRef
        },
        {
          type: 'email',
          title: 'Email',
          desc: 'Contoh: alamat@email.com',
          placeholder: 'Masukan alamat email yang sesuai',
          ref: emailRef,
          nextRef: passwordRef
        },
        {
          type: 'password',
          title: 'Kata Sandi',
          placeholder: 'Masukkan kata sandi',
          ref: passwordRef,
          nextRef: confirmPasswordRef,
          desc: 'Contoh: Nutech!23 atau Nutech$23'
        },
        {
          type: 'confirmPassword',
          title: 'Ulangi Kata Sandi',
          placeholder: 'Ulangi kata sandi',
          ref: confirmPasswordRef,
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

  const onTextChange = (obj, input) => {
    if (msgError !== '') {
      setMsgError('')
    }
    setForm(state => ({ ...state, [obj]: String(input), [`${obj}Error`]: '' }))
  }
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
            {/* render form input */}
            {authSetting?.[authType]?.formRequirement.map((formItem, index) =>
              <InputBox
                key={'formItem ' + index}
                ref={formItem.ref}
                autoCapitalize={'none'}
                value={form?.[formItem?.type]}
                placeholder={formItem?.placeholder}
                title={formItem?.title}
                onChangeText={(text) => onTextChange(formItem?.type, text)}
                onBlur={() => formItem?.type?.toLowerCase()?.includes('name') && onTextChange(formItem?.type, capitalizeEachWord(form[formItem?.type]))}
                onSubmitEditing={() => formItem.nextRef && formItem.nextRef.current.focus()}
                msgError={form?.[`${formItem?.type}Error`]?.toString() || ''}
                password={formItem?.type?.toLowerCase()?.includes('pass')}
                withActionEye={formItem?.type?.toLowerCase()?.includes('pass')}
                desc={formItem?.desc}
              />
            )}

            {authType !== 'register' && <Text allowFontScaling={false} style={[localstyles.txtSocialLogin, { color: Colors.BLUE_SKY, textAlign: 'right', fontSize: 10 }]}>Lupa kata sandi</Text>}

            {msgError !== '' && <Text allowFontScaling={false} style={{ color: Colors.RED_COLOR, fontSize: Fonts.FontSize.sm }}>{msgError}</Text>}
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
      <Loader loading={fetchingPost} />
      <ModalStatusProcess ref={modalStatusProcessRef} onRequestClose={() => props.navigation.pop()} desc={msgSuccess} />
    </View>
  )
}

const localstyles = StyleSheet.create({
  txtSocialLogin: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.GRAY_DARK_COLOR },
  btnContainer: { height: 50, backgroundColor: Colors.GRAY_LIGHT_COLOR, width: '48%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  txtLogo: { fontSize: 12, color: Colors.BLACK_COLOR, alignSelf: 'center', fontFamily: 'Inter-Bold', marginBottom: 20 },
  txtLogin: { fontSize: 35, color: Colors.BLACK_COLOR, fontFamily: 'Inter-Bold', marginBottom: 5 },
  styleImg: { height: 53, width: 42, marginBottom: 5, alignSelf: 'center' },
  descLogin: { fontSize: 10, color: Colors.GRAY_DARK_COLOR, fontFamily: 'Inter-Regular', marginBottom: 10 }

})
export default AuthPage

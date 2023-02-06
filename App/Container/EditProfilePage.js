import React, { useEffect, useRef, useState } from 'react'
import { View, StatusBar } from 'react-native'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import FloatingActionContainer from '../Component/FloatingActionButtonKLK'
import Header from '../Component/Header'
import InputBox from '../Component/InputBox'
import Loader from '../Component/Loader'
import ModalStatusProcess from '../Component/ModalStatusProcess'
import Colors from '../Constants/Colors'
import { useValidate } from '../Helpers/Validate'
import useEzFetch from '../Services/useEzFetch'
import GeneralAction from '../Redux/GeneralRedux'

const EditProfilePage = (props) => {
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const [form, setForm] = useState({})
  const user = useSelector(state => state.general.user)
  const dispatch = useDispatch()
  const { post, fetchingPost } = useEzFetch()

  const modalStatusProcessRef = useRef()

  const editProfileSetting = [
    {
      type: 'firstName',
      title: 'Nama Depan',
      desc: 'Contoh: Hernawan Putra',
      placeholder: 'Masukan nama depan anda',
      ref: firstNameRef,
      nextRef: lastNameRef,
      value: user?.first_name
    },
    {
      type: 'lastName',
      title: 'Nama Belakang',
      desc: 'Contoh: Malintan',
      placeholder: 'Masukan nama belakang anda',
      ref: lastNameRef,
      value: user?.last_name

    }
  ]
  useEffect(() => {
    let defaultForm = {}
    editProfileSetting.forEach(element => {
      defaultForm = { ...defaultForm, [element?.type]: element?.value || '' }
    })
    setForm(defaultForm)
  }, [user])

  const onTextChange = (obj, input) => {
    setForm(state => ({ ...state, [obj]: String(input), [`${obj}Error`]: '' }))
  }
  const updateProfile = () => {
    const validateForm = useValidate(form, setForm)
    if (!validateForm?.isError) {
      const { firstName: first_name, lastName: last_name } = form
      post('/updateProfile', { first_name, last_name }, { authorization: true }, ({ response }) => {
        if (response.status === 200) {
          modalStatusProcessRef.current.setModal(true)
          dispatch(GeneralAction.setUserData({ ...user, ...response?.data?.data }))
        } else {
          // if (response?.data?.message?.includes('email')) {
          //   setForm({ ...form, emailError: 'Email anda tidak valid' })
          // } else {
          //   setMsgError('Terjadi kesalahan server dengan code error ' + response.status)
          // }
        }
      })
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR }}>
      <Header title='Edit Profile' />
      <StatusBar backgroundColor={Colors.WHITE_COLOR} />
      <View style={{ paddingHorizontal: 25, paddingVertical: 25 }}>
        {editProfileSetting?.map((formItem, index) =>
          <InputBox
            key={'formIten ' + index}
            ref={formItem.ref}
            autoCapitalize='none'
            value={form?.[formItem?.type]}
            placeholder={formItem?.placeholder}
            title={formItem?.title}
            disabled
            withEdited
            onChangeText={(text) => onTextChange(formItem?.type, text)}
            onSubmitEditing={() => formItem.nextRef && formItem.nextRef.current.focus()}
            msgError={form?.[`${formItem?.type}Error`]?.toString() || ''}
            password={formItem?.type?.toLowerCase()?.includes('pass')}
            withActionEye={formItem?.type?.toLowerCase()?.includes('pass')}
          />
        )}
      </View>
      <Loader loading={fetchingPost} />
      <ModalStatusProcess ref={modalStatusProcessRef} desc={'Profile anda berhasil di terupdate'} onRequestClose={() => props.navigation.pop()} />
      <FloatingActionContainer onPressPrimary={updateProfile} disabled={(user?.first_name === form?.firstName && user?.last_name === form?.lastName)} />
    </View>
  )
}

export default EditProfilePage

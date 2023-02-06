import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../Constants/Colors'
import Fonts from '../Constants/Fonts'
import { getInitials, maskString } from '../Helpers/ActionHelpers'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import * as Sessions from '../Services/Sessions'
import { useSelector } from 'react-redux'

const ProfilePage = () => {
  const navigation = useNavigation()
  const user = useSelector(state => state.general.user)
 
  const listMainMenuProfile = [
    {
      title: 'Phone',
      placeHolderValue: 'Belum tersedia'
      // isMasking: true
    },
    {
      title: 'Edit Profile',
      navigate: 'EditProfilePage'
    },
    {
      title: 'Pengaturan PIN',
      placeHolderValue: 'PIN belum di atur'
    },
    {
      title: 'Bahasa',
      placeHolderValue: 'Indonesia'
    }

  ]

  const listSecondaryMenuProfile = [
    {
      title: 'Ketentuan Layanan'
    },
    {
      title: 'Edit Kebijakan Privasi'
    },
    {
      title: 'Pusat Bantuan',
      placeHolderValue: 'FAQ'
    }

  ]
  return (
    <View style={{ flex: 1, backgroundColor: Colors.BLUE_MOON }}>
      <View style={localStyles.containerListOuter}>
        <View>
          <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontSemiBold, fontSize: Fonts.FontSize.xl }}>{user?.first_name} {user?.last_name}</Text>
          <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontRegular, fontSize: Fonts.FontSize.xl }}>{maskString(user?.email || '', '*', user?.email?.length  - 5, 'start')}</Text>
        </View>
        <View style={{ backgroundColor: Colors.BLUE_COLOR, height: 50, width: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
          <Text allowFontScaling={false} style={{ color: Colors.WHITE_COLOR }}>{getInitials(`${user?.first_name} ${user?.last_name}`)}</Text>
        </View>
      </View>
      <View style={[localStyles.containerListOuter, { flexDirection: 'column', justifyContent: 'flex-end', paddingVertical: 0 }]}>
        {listMainMenuProfile.map((itemMainMenu, index) => (
          <TouchableOpacity onPress={() => itemMainMenu?.navigate && navigation.navigate(itemMainMenu?.navigate)} key={'itemListProfile' + index} style={{ paddingVertical: 20, borderTopWidth: index !== 0 ? 1 : 0, borderTopColor: Colors.GRAY_COLOR, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontSemiBold, fontSize: Fonts.FontSize.sm }}>{itemMainMenu.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {itemMainMenu?.placeHolderValue && <Text allowFontScaling={false} style={{ fontSize: Fonts.FontSize.sm, fontFamily: Fonts.FontsFamily.fontRegular, color: Colors.GRAY_COLOR }}>{itemMainMenu?.isMasking ? maskString(itemMainMenu?.placeHolderValue || '', '*', 5, 'end') : itemMainMenu?.placeHolderValue}</Text>}
              <Icon name='chevron-right' style={{ marginLeft: 10, color: Colors.BLACK_COLOR, fontSize: 14 }} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[localStyles.containerListOuter, { flexDirection: 'column', justifyContent: 'flex-end', paddingVertical: 0 }]}>
        {listSecondaryMenuProfile.map((itemMainMenu, index) => (
          <View key={'itemListProfile' + index} style={{ paddingVertical: 20, borderTopWidth: index !== 0 ? 1 : 0, borderTopColor: Colors.GRAY_COLOR, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontSemiBold, fontSize: Fonts.FontSize.sm }}>{itemMainMenu.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {itemMainMenu?.placeHolderValue && <Text allowFontScaling={false} style={{ fontSize: Fonts.FontSize.sm, fontFamily: Fonts.FontsFamily.fontRegular, color: Colors.GRAY_COLOR }}>{itemMainMenu?.isMasking ? maskString(itemMainMenu?.placeHolderValue || '', '*', 5, 'start') : itemMainMenu?.placeHolderValue}</Text>}
              <Icon name='chevron-right' style={{ marginLeft: 10, color: Colors.BLACK_COLOR, fontSize: 14 }} />
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={() => { navigation.replace('AuthPage'); Sessions.destroy(); }} style={[localStyles.containerListOuter, { justifyContent: 'center' }]}>
        <Text allowFontScaling={false} style={{ color: '#427BC8', fontFamily: Fonts.FontsFamily.fontSemiBold, fontSize: Fonts.FontSize.md }}>Keluar</Text>
      </TouchableOpacity>
    </View>
  )
}

const localStyles = StyleSheet.create({
  containerListOuter: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: Colors.WHITE_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  }
})
export default ProfilePage

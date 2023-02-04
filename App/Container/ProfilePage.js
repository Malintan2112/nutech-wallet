import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../Constants/Colors'
import Fonts from '../Constants/Fonts'
import { getInitials, maskString } from '../Helpers/ActionHelpers'
import Icon from 'react-native-vector-icons/FontAwesome5'

const ProfilePage = () => {
  const user = {
    name: 'HERNAWAN PUTRA MALINTAN',
    phone: '08980087646'
  }
  const listMainMenuProfile = [
    {
      title: 'Email',
      placeHolderValue: 'hernawanputra.net@gmail.com',
      isMasking: true
    },
    {
      title: 'Edit Profile',
      onPress: () => { }

    },
    {
      title: 'Pengaturan PIN'
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
      title: 'Pusat Bantuan'
    }

  ]
  return (
    <View style={{ flex: 1, backgroundColor: Colors.BLUE_MOON }}>
      <View style={localStyles.containerListOuter}>
        <View>
          <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontSemiBold, fontSize: Fonts.FontSize.xl }}>{user?.name}</Text>
          <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontRegular, fontSize: Fonts.FontSize.xl }}>{maskString(user?.phone || '', '*', 5, 'end')}</Text>
        </View>
        <View style={{ backgroundColor: Colors.BLUE_COLOR, height: 50, width: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
          <Text allowFontScaling={false} style={{ color: Colors.WHITE_COLOR }}>{getInitials(user?.name)}</Text>
        </View>
      </View>
      <View style={[localStyles.containerListOuter, { flexDirection: 'column', justifyContent: 'flex-end', paddingVertical: 0 }]}>
        {listMainMenuProfile.map((itemMainMenu, index) => (
          <View key={'itemListProfile' + index} style={{ paddingVertical: 20, borderTopWidth: index !== 0 ? 1 : 0, borderTopColor: Colors.GRAY_COLOR, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontSemiBold, fontSize: Fonts.FontSize.sm }}>{itemMainMenu.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {itemMainMenu?.placeHolderValue && <Text allowFontScaling={false} style={{ fontSize: Fonts.FontSize.sm, fontFamily: Fonts.FontsFamily.fontRegular, color: Colors.GRAY_COLOR }}>{itemMainMenu?.isMasking ? maskString(itemMainMenu?.placeHolderValue || '', '*', 5, 'start') : itemMainMenu?.placeHolderValue}</Text>}
              <Icon name='chevron-right' style={{ marginLeft: 10, color: Colors.BLACK_COLOR, fontSize: 14 }} />
            </View>
          </View>
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
      <View style={[localStyles.containerListOuter, { justifyContent: 'center' }]}>
        <Text allowFontScaling={false} style={{ color: '#427BC8', fontFamily: Fonts.FontsFamily.fontSemiBold, fontSize: Fonts.FontSize.md }}>Keluar</Text>
      </View>
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

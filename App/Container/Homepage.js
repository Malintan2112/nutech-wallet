import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../Constants/Colors'
import GeneralAction from '../Redux/GeneralRedux'
import ParallaxScroll from '@monterosa/react-native-parallax-scroll'
import { chunk } from 'lodash'
import Fonts from '../Constants/Fonts'
import { useFocusEffect } from '@react-navigation/native'

const Homepage = ({ navigation }) => {
  const dispatch = useDispatch()
  const generalData = useSelector(state => state.general)
  const sheetRef = useRef(null)
  const [statusBarCollor, setStatusBarColor] = useState(Colors.BLUE_MOON)

  useEffect(() => {
    // dispatch(GeneralAction.generalRequest())
  }, [])
  const menuHeaderList = [
    {
      title: 'Listrik',
      image: require('../Assets/Images/menuContent/menu-listrik.webp'),
      navigate: ''
    },
    {
      title: 'Pulsa',
      image: require('../Assets/Images/menuContent/menu-pulsa.webp'),
      navigate: ''
    },
    {
      title: 'Angsuran',
      image: require('../Assets/Images/menuContent/menu-angsuran.webp'),
      navigate: ''
    },
    {
      title: 'M-Tix',
      image: require('../Assets/Images/menuContent/menu-m-tix.webp'),
      navigate: ''
    }
  ]

  const menuContentList = [
    {
      title: 'Top-up',
      image: require('../Assets/Images/menuHeader/top-up.webp'),
      navigate: 'TopUpPage'
    },
    {
      title: 'Transfer',
      image: require('../Assets/Images/menuHeader/transfer.webp'),
      navigate: 'TransferPage'
    },
    {
      title: 'Request',
      image: require('../Assets/Images/menuHeader/request.webp'),
      navigate: ''
    },
    {
      title: 'Riwayat',
      image: require('../Assets/Images/menuHeader/riwayat.webp'),
      navigate: 'HistoryPage'
    },
    {
      title: 'TV Digital & Internet',
      image: require('../Assets/Images/menuContent/menu-tv-digital.webp'),
      navigate: ''
    },
    {
      title: 'Games',
      image: require('../Assets/Images/menuContent/menu-games.webp'),
      navigate: ''
    },
    {
      title: 'BPJS',
      image: require('../Assets/Images/menuContent/menu-bpjs.webp'),
      navigate: ''
    },
    {
      title: 'Semua',
      image: require('../Assets/Images/menuContent/menu-semua.webp'),
      navigate: ''
    }

  ]
  const promoInfoList = [
    {
      title: 'promo1',
      image: require('../Assets/Images/promoInfo/promo1.webp'),
      navigate: ''
    },
    {
      title: 'promo2',
      image: require('../Assets/Images/promoInfo/promo2.webp'),
      navigate: ''
    },
    {
      title: 'promo3',
      image: require('../Assets/Images/promoInfo/promo3.webp'),
      navigate: ''
    }
  ]
  const Background = () => {
    return (
      <View style={{ paddingHorizontal: 25, paddingVertical: 25, backgroundColor: Colors.BLUE_MOON }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text
              allowFontScaling={false} style={{
                fontFamily: Fonts.FontsFamily.fontSemiBold,
                fontSize: Fonts.FontSize.xl,
                color: Colors.BLACK_COLOR
              }}
            >Rp500.000
            </Text>
            <Text
              allowFontScaling={false} style={{
                fontFamily: Fonts.FontsFamily.fontRegular,
                fontSize: 12,
                color: Colors.GRAY_DARK_COLOR
              }}
            >SPE Points{' '}
              <Text
                allowFontScaling={false} style={{
                  fontFamily: Fonts.FontsFamily.fontSemiBold,
                  color: Colors.ORANGE_COLOR
                }}
              >1.520
              </Text>
            </Text>
          </View>
          <Image source={require('../Assets/Images/loginRegister/logo.webp')} style={{ width: 42, height: 53 }} resizeMode='contain' />
        </View>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
            {menuHeaderList.map((menuHeader, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (menuHeader.navigate !== '') {
                      navigation.navigate('')
                    }
                  }}
                  key={'menuHeaderList' + index}
                >
                  <Image source={menuHeader.image} style={{ width: 48, height: 48 }} />
                  <Text
                    allowFontScaling={false} style={{
                      fontFamily: Fonts.FontsFamily.fontMedium,
                      color: Colors.BLACK_COLOR,
                      fontSize: 12,
                      marginTop: 10
                    }}
                  >{menuHeader.title}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
  const Separator = () => {
    return (
      <View style={{
        backgroundColor: Colors.BLUE_MOON,
        height: 10,
        width: '100%',
        marginVertical: 25
      }}
      />
    )
  }
  return (
    <>
      <StatusBar backgroundColor={statusBarCollor} />
      <ParallaxScroll
        headerHeight={0}
        isHeaderFixed={false}
        parallaxHeight={190}
        renderHeader={({ animatedValue }) => null}
        renderParallaxBackground={({ animatedValue }) => <Background animatedValue={animatedValue} />}

        parallaxBackgroundScrollSpeed={5}
        parallaxForegroundScrollSpeed={2.5}
        onChangeHeaderVisibility={(isVisible) => {
          if (isVisible) {
            setStatusBarColor(Colors.BLUE_MOON)
          } else {
            setStatusBarColor(Colors.WHITE_COLOR)
          }
        }}
      >
        <View style={{ backgroundColor: Colors.BLUE_MOON, flex: 1 }}>
          <View style={localstyles.containerChildParralax}>
            <View style={localstyles.containerChild} />
            <View style={{ marginTop: 15 }}>
              <View>
                {chunk(menuContentList, 4).map((outerMenuContent, indexOuter) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: 20
                      }} key={'outerMenu' + indexOuter}
                    >
                      {outerMenuContent.map((menuHeader, index) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              if (menuHeader.navigate !== '') navigation.navigate(menuHeader.navigate)
                            }}
                            key={'menuHeaderList' + index}
                            style={{ alignContent: 'center', width: 60 }}
                          >
                            <Image source={menuHeader.image} style={{ width: 48, height: 48, alignSelf: 'center' }} />
                            <Text allowFontScaling={false} style={localstyles.titlemenuHeader}>{menuHeader.title}</Text>
                          </TouchableOpacity>
                        )
                      })}
                    </View>
                  )
                })}
              </View>
            </View>
            <Separator />
            <View>
              <Text style={{ marginLeft: 25, fontFamily: Fonts.FontsFamily.fontSemiBold, color: Colors.BLACK_COLOR }}>Promo dan Info</Text>
              <FlatList
                horizontal
                data={promoInfoList}
                keyExtractor={(item, index) => `promoInfo ${index}`}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ paddingTop: 5, paddingBottom: 20 }}>
                      <Image source={item?.image} style={{ height: 125, width: 325, marginLeft: 10 }} resizeMode='contain' />
                    </View>
                  )
                }}
              />
            </View>
            <Separator />
            <View style={{ paddingBottom: 190 }}>
              <Text style={{ marginLeft: 25, fontFamily: Fonts.FontsFamily.fontSemiBold, color: Colors.BLACK_COLOR }}>Promo dan Info</Text>
              {promoInfoList.map((promoInfo, index) => {
                return (
                  <View style={{ paddingTop: 5, paddingBottom: 20 }} key={'promoInfo2' + index}>
                    <Image source={promoInfo?.image} style={{ height: 125, width: 325, alignSelf: 'center' }} resizeMode='contain' />
                  </View>
                )
              })}
            </View>
          </View>
        </View>
      </ParallaxScroll>
    </>
  )
}

const localstyles = StyleSheet.create({
  containerChildParralax: {
    width: '100%',
    backgroundColor: Colors.WHITE_COLOR,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50
  },
  titlemenuHeader: {
    fontFamily: Fonts.FontsFamily.fontMedium,
    color: Colors.BLACK_COLOR,
    fontSize: 10,
    marginTop: 10,
    width: 60,
    textAlign: 'center'
  },
  containerChild: {
    width: 50,
    height: 5,
    backgroundColor: Colors.GRAY_LIGHT_COLOR,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10
  }
})
export default Homepage

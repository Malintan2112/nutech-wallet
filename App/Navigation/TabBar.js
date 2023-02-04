import React from 'react';
import {
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../Constants/Colors';

const isIos = Platform.OS === 'ios';
const TabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }



  const getIcon = (name, isActive) => {
    let iconTab = require('../Assets/Images/footerActive/home.webp');
    if (isActive) {
      switch (name) {
        case 'Home':
          iconTab = require('../Assets/Images/footerActive/home.webp');
          break;
        case 'Voucher':
          iconTab = require('../Assets/Images/footerActive/voucher.webp');
          break;
        case 'Bayar':
          iconTab = require('../Assets/Images/footerActive/scan.webp');
          break;
        case 'Inbox':
          iconTab = require('../Assets/Images/footerActive/inbox.webp');
          break;
        case 'Profile':
          iconTab = require('../Assets/Images/footerActive/profile.webp');
          break;
        default:
          iconTab = require('../Assets/Images/footerActive/home.webp');
          break;
      }
    } else {
      switch (name) {
        case 'Home':
          iconTab = require('../Assets/Images/footerInActive/home.webp');
          break;
        case 'Voucher':
          iconTab = require('../Assets/Images/footerInActive/voucher.webp');
          break;
        case 'Bayar':
          iconTab = require('../Assets/Images/footerActive/scan.webp');
          break;
        case 'Inbox':
          iconTab = require('../Assets/Images/footerInActive/inbox.webp');
          break;
        case 'Profile':
          iconTab = require('../Assets/Images/footerInActive/profile.webp');
          break;
        default:
          iconTab = require('../Assets/Images/footerInActive/home.webp');
          break;
      }
    }
    return iconTab;
  };
  const tabBarComponet = (route, index) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;

    const label = route.name;
    // const image = ''

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.1)', true)}
        key={index}
        accessibilityRole="button"
        accessibilityStates={isFocused ? ['selected'] : []}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ alignItems: 'center' }}>
        <View style={{ alignItems: 'center', height: 50, justifyContent: 'center' }}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: 24,
              height: 24,
              zIndex: 0,
            }}
            source={getIcon(label, isFocused)}
            resizeMode="contain"
          />
          <Text
            allowFontScaling={false}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              color: isFocused ? '#213D64' : '#9E9E9E',
              fontFamily: 'Poppins-Regular',
              fontSize: 10,
              paddingLeft: 2,
              marginTop: 5,
            }}>
            {label}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
  const tabBarScan = (route, index) => {
    const label = route.name;
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;
    return (
      <TouchableOpacity
        key={index}
        accessibilityRole="button"
        accessibilityLabel={options.tabBarAccessibilityLabel}
        onPress={() => { }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ alignItems: 'center' }}>
        <View style={{ position: 'relative', width: 50 }}>
          <View style={{ alignItems: 'center', height: 50, justifyContent: 'center', position: "absolute", top: -16 }}>
            <View style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 10,
              backgroundColor: Colors.WHITE_COLOR,
              borderRadius: 25,
              zIndex: 1
            }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  zIndex: 1,
                }}
                source={getIcon(label, isFocused)}
                resizeMode="contain"
              />
            </View>
            <Text
              allowFontScaling={false}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color: isFocused ? '#213D64' : '#9E9E9E',
                fontFamily: 'Poppins-Regular',
                fontSize: 10,
                paddingLeft: 2,
                marginTop: 5,
              }}>
              {label}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: isIos ? 20 : 8,
        borderTopWidth: 0.5,
        borderColor: '#F0F2F7',
        backgroundColor: Colors.WHITE_COLOR,
      }}>
      {state.routes.map((route, index) => {
        if (index === 2) {
          return tabBarScan(route, index)
        }
        return tabBarComponet(route, index);
      })}
    </View>
  );
};

const localstyles = StyleSheet.create({

})
export default TabBar;

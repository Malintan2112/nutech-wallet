import React from 'react'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import Colors from '../Constants/Colors'
import { useNavigation } from '@react-navigation/native'
import Fonts from '../Constants/Fonts'
const { width } = Dimensions.get('window')

/**
 *
 * @param {Object} props
 * @param {String} props.title
 * @param {String} props.dir
 *
 *
 */
export default Header = ({ dir, title }) => {
  const navigation = useNavigation()
  return (
    <View style={localStyles.containerBack}>
      <Animatable.View style={localStyles.containerBackRow}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop()
          }}
          style={{ height: 30, width: 30, justifyContent: 'center' }}
        >
          <Icon name='arrow-left' style={localStyles.iconChevronBack} />
        </TouchableOpacity>
        <View style={localStyles.containerBackRowHalfRight}>
          <Text style={localStyles.dirText} numberOfLines={1}>{title}</Text>
        </View>
      </Animatable.View>
    </View>
  )
}

const localStyles = StyleSheet.create({
  defaultBackground: {
    backgroundColor: Colors.WHITE_COLOR,
    height: '100%',
    width: '100%'
  },
  containerBack: {
    width: '100%',
    backgroundColor: Colors.WHITE_COLOR,
    height: 50,
    justifyContent: 'center',
    elevation: 3
  },
  containerBackRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  iconChevronBack: {
    fontSize: 25,
    color: Colors.BLACK_COLOR,
    marginRight: 5
  },
  containerBackRowHalfRight: {
    width: width * 0.8,
    alignItems: 'center'
  },
  dirText: {
    fontSize: 16,
    color: Colors.BLACK_COLOR,
    fontFamily: Fonts.FontsFamily.fontSemiBold
  },
  titleText: {
    fontSize: 20,
    color: Colors.BLACK_COLOR,
    fontWeight: 'bold'
  }
})

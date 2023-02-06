import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator, Keyboard } from 'react-native'
import Colors from '../Constants/Colors'

/**
 * @param {Object} props
 * @param {String} [props.type]
 * @param {String} [props.text]
 * @param {Object} [props.containerStyle]
 * @param {Object} [props.textStyle]
 * @param {Boolean} [props.loading]
 * @param {Boolean} [props.disabled]
 * @param {String} [props.btnColor]
 * @param {Number} [props.paddingVertical]
 * @param {String} [props.textColor]
 * @param {Number} [props.borderRadius]
 * @param {Number} [props.borderWidth]
 * @param {Number} [props.fontSize]
 * @param {String} [props.fontFamily]
 * @param {Function} [props.onPress]
 * @returns
 */

// if type outline textColor not read if you want break this use textStyle (break with same props in mini style)
const ButtonVariant = ({
  // Will there be added type variants in the future? example : gradient
  type = 'solid', // solid || outline
  text = 'Your Text/Icon Component',
  // styling (break with same props in mini style or add new style)
  containerStyle = {},
  textStyle = {},
  // mini style (simple style)
  disabled = false,
  loading = false,
  btnColor = Colors.BLUE_SKY,
  paddingVertical = 10,
  textColor = 'white',
  borderRadius = 5,
  borderWidth = 1,
  fontSize = 14,
  fontFamily = 'Poppins-Bold',
  onPress = null
}) => {
  if (loading) disabled = true

  if (disabled) {
    btnColor = Colors.GRAY_LIGHT_COLOR
    textColor = '#80838C'
  }

  return (
    <TouchableOpacity disabled={disabled} style={[{ backgroundColor: type === 'outline' ? disabled ? '#F8F8F8' : 'transparent' : btnColor, borderWidth: type === 'outline' ? borderWidth : 0, borderColor: type === 'outline' ? btnColor : 'transparent', borderRadius: borderRadius, alignItems: 'center', paddingVertical: paddingVertical }, containerStyle]} onPress={() => { Keyboard.dismiss(); onPress(); }}>
      {loading ? <ActivityIndicator size='small' color={type === 'outline' ? disabled ? '#A0A0A0' : btnColor : textColor} /> : <Text style={[{ color: type === 'outline' ? disabled ? '#A0A0A0' : btnColor : textColor, fontSize: fontSize, fontFamily: fontFamily }, textStyle]}>{text}</Text>}
    </TouchableOpacity>
  )
}

export default ButtonVariant

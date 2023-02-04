import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Navigate } from '../Services/NavigationService'
import Colors from '../Constants/Colors'

/**
 *
 * @param {Object} props
 * @param {String} props.title
 * @param {String} [props.placeholder]
 * @param {String} [props.keyboardType]
 * @param {Boolean} [props.withAction]
 * @param {Function} [props.actionNavigateTo]
 * @param {Boolean} [props.error]
 * @param {String} [props.msgError]
 * @param {Array} [props.forgotAction] [0] - Show forgot action (true/false) [1] - Text [2] - Navigate To | example:[ true, 'Lupa PIN', 'PinPageKLK ]
 * @param {Boolean} [props.disabled]
 * @param {Boolean} [props.verified]
 * @param {Boolean} [props.phoneNumber]
 * @param {String} [props.value]
 * @param {Boolean} [props.password]
 * @param {Boolean} [props.withActionEye]
 * @param {Boolean} [props.unverified]
 * @param {String} [props.unverifiedMessage]
 * @param {String} [props.unverifiedActionNavigateTo]
 * @param {Boolean} [props.multiline]
 * @param {Boolean} [props.isCalendar]
 * @param {Function} [props.onChangeText]
 * @param {Function} [props.onBlur]
 * @param {Function} [props.onEndEditing]
 * @param {Function} [props.onFocus]
 * @param {Boolean} [props.isPicker]
 * @param {Number} [props.maxLength]
 * @param {'none'|'words'|'characters'|'undefined'|'sentences'} props.autoCapitalize
 * @param {import('react-native').TextStyle} [props.titleStyle]
 * @param {String} [props.desc]
 * @param {String} [props.hint]
 *
 */

const InputBox = ({ title = '', placeholder = '', maxLength = null, keyboardType = 'default', withAction = false, actionNavigateTo = '', error = false, msgError = '', disabled = false, verified = false, phoneNumber = false, value = '', password = false, forgotAction = [false], withActionEye = false, unverified = false, unverifiedMessage = '', unverifiedActionNavigateTo = '', multiline = false, onChangeText = null, onBlur = null, onEndEditing = null, isCalendar = false, onFocus = null, isPicker = false, pointerEvents = undefined, width = undefined, isBottomTitle = false, titleStyle = {}, desc = null, hint = '', autoCapitalize = 'sentences', onPressVerification = () => { }, ref }) => {
  const [lockPass, setLockPass] = useState(password)
  return (
    <View style={{ marginVertical: 8 }}>

      {/* Header Section */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
        {!isBottomTitle && title !== '' && <Text style={[{ fontFamily: 'Inter-Regular', fontSize: 14, color: msgError ? '#E01B0E' : '#313339' }, { ...titleStyle }]}>{title}</Text>}
        {
          verified && (
            <View style={{ backgroundColor: '#F6FFF3', paddingVertical: 3, paddingHorizontal: 5, borderRadius: 100, justifyContent: 'center', alignItems: 'center', marginLeft: 8, flexDirection: 'row' }}>
              <Icon name='check-circle' size={20} color='#4D9035' />
              <Text style={{ fontFamily: 'Inter-Regular', fontSize: 13, marginLeft: 5, color: '#4D9035' }}>Terverifikasi</Text>
            </View>
          )
        }
      </View>

      {/* Container Input */}
      <View pointerEvents={pointerEvents} style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 10, borderColor: error || msgError ? '#E01B0E' : '#E3E4E7', backgroundColor: !disabled ? 'white' : '#F3F4F5', overflow: 'hidden', width: width }}>

        {/* Left Section */}
        {
          phoneNumber && (
            <View style={{ backgroundColor: '#E3E4E7', paddingHorizontal: 10, justifyContent: 'center' }}>
              <Text onPress={() => { }} style={{ fontFamily: 'Inter-Bold', fontSize: 15, alignSelf: 'center', color: 'gray' }}>+62</Text>
            </View>
          )
        }

        {/* Input Section */}
        <TextInput
          ref={ref}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          style={{
            flex: 1,
            paddingLeft: 10,
            paddingRight: multiline ? 10 : 0,
            height: multiline ? 100 : 45,
            fontFamily: 'Inter-Regular',
            fontSize: 15,
            color: !disabled ? 'black' : 'gray',
            textAlignVertical: 'top'
            // minHeight: multiline ? 100 : 0
          }}
          onChangeText={onChangeText}
          onBlur={onBlur}
          onEndEditing={onEndEditing}
          value={value}
          keyboardType={keyboardType}
          editable={!disabled}
          maxLength={maxLength}
          secureTextEntry={lockPass}
          placeholder={placeholder}
          multiline={multiline}
          onFocus={onFocus}
        />

        {/* Right Section */}
        {
          withAction && (
            <TouchableOpacity style={{ justifyContent: 'center', paddingHorizontal: 10 }} onPress={actionNavigateTo}>
              <Text style={{ fontFamily: 'Inter-Bold', fontSize: 13, alignSelf: 'center', color: '#F26A25' }}>Ubah</Text>
            </TouchableOpacity>
          )
        }
        {
          (withActionEye && password) && (
            <TouchableOpacity style={{ justifyContent: 'center', paddingHorizontal: 10 }} onPress={() => setLockPass(!lockPass)}>
              {lockPass
                ? <Icon name='eye-off' size={20} color={Colors.GRAY_DARK_COLOR} />
                : <Icon name='eye' size={20} color={Colors.GRAY_DARK_COLOR} />}
            </TouchableOpacity>)
        }
        {
          isCalendar
            ? (
              <View style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
                <Icon name='calendar-week' size={20} color='#313339' />
              </View>
            )
            : null
        }
        {
          isPicker
            ? (
              <View style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
                <Icon name='chevron-down' size={20} color='#313339' />
              </View>
            )
            : null
        }
      </View>

      {/* Bottom Section */}

      {/* Unferified Section */}
      {
        unverified && (
          <View style={{ backgroundColor: '#FFF7ED', borderRadius: 10, minHeight: 40, marginTop: 5, padding: 10 }}>
            <Text style={{ color: '#BB7A2B', fontFamily: 'Inter-Regular', fontSize: 14 }}>{unverifiedMessage}
              <Text onPress={onPressVerification} style={{ color: '#BB7A2B', fontFamily: 'Inter-Bold', fontSize: 14, textDecorationLine: 'underline' }}>Verifikasi Sekarang</Text>
            </Text>
          </View>
        )
      }

      {/* Msg Error */}
      {
        !!msgError && (
          <Text style={{ color: '#E01B0E', fontFamily: 'Inter-Regular', fontSize: 13, paddingTop: 5, paddingLeft: 4 }}>{msgError}</Text>
        )
      }
      {/* Forgot Pin */}
      {
        forgotAction?.[0] && (
          <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => { forgotAction?.[2] && Navigate(forgotAction?.[2]); typeof forgotAction?.[3] === 'function' && forgotAction?.[3]() }}><Text style={{ color: Colors.BLUE_COLOR, fontFamily: 'Inter-Bold', fontSize: 13, paddingTop: 12 }}>{forgotAction?.[1] || ''}</Text></TouchableOpacity>
        )
      }
      {isBottomTitle && title !== '' && <Text style={{ fontFamily: 'Inter-Regular', fontSize: 15, color: Colors.GRAY_DARK_COLOR, paddingTop: 6 }}>{title}</Text>}
      {desc && !msgError && <Text style={{ marginTop: 10, fontFamily: 'Inter-Regular', color: '#80838C', fontSize: 12 }}>{desc}</Text>}
      {hint !== '' && !msgError && <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#80838C', paddingTop: 4, textAlign: 'justify' }}>{hint}</Text>}

    </View>
  )
}

export default InputBox

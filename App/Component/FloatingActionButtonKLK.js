import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import ButtonVariant from './ButtonVariant'
import Colors from '../Constants/Colors'

/**
 *
 * @param {Object} props
 * @param {Function} [props.onPressPrimary] - single and counter variants using onPressPrimary
 * @param {Function} [props.onPressSecondary]
 * @param {Function} [props.onSkip]
 * @param {Boolean} [props.disabled]
 * @param {Boolean} [props.disabledSkip]
 * @param {String} [props.variant] - single, double, counter
 * @param {String} [props.primaryText] - single and counter variants using primaryText
 * @param {String} [props.secondaryText]
 * @param {BigInteger} [props.counter] - for counter variant only
 *
 */

const FloatingActionContainer = ({ onPressPrimary = null, onPressSecondary = null, onSkip = null, disabled = false, variant = 'single', primaryText = 'Simpan', secondaryText = 'Simpan', counter = 0, disabledSkip = true }) => {
  const twoButton = () => {
    return (
      <View style={styles.twoButtonContainer}>
        <ButtonVariant text={secondaryText} containerStyle={[styles.buttonContainer, { width: '48%', marginRight: 12 }]} onPress={onPressSecondary} disabled={disabled} type='outline' />
        <ButtonVariant text={primaryText} containerStyle={[styles.buttonContainer, { width: '48%' }]} onPress={onPressPrimary} disabled={disabled} />
      </View>
    )
  }

  const singleButton = () => {
    return (
      <ButtonVariant text={primaryText} containerStyle={[styles.buttonContainer, { marginHorizontal: 16 }]} onPress={onPressPrimary} disabled={disabled} />
    )
  }
  const singleButtonWithSkip = () => {
    return (
      <>
        <ButtonVariant text='Lewati' containerStyle={[styles.buttonContainer, { marginHorizontal: 16, marginTop: 10, marginBottom: 0, backgroundColor: Colors.WHITE_COLOR }]} textColor={Colors.BLUE_COLOR} onPress={onSkip} disabled={disabledSkip} />
        <ButtonVariant text={primaryText} containerStyle={[styles.buttonContainer, { marginHorizontal: 16, marginTop: 5, marginBottom: 15 }]} onPress={onPressPrimary} disabled={disabled} />
      </>
    )
  }

  const counterVariant = () => {
    return (
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{counter} Terpilih</Text>
        <ButtonVariant text={primaryText} onPress={onPressPrimary} containerStyle={styles.counterButton} disabled={disabled} />
      </View>
    )
  }

  return (
    <View style={styles.root}>
      {variant === 'double' && twoButton()}
      {variant === 'single' && singleButton()}
      {variant === 'single-with-skip' && singleButtonWithSkip()}
      {variant === 'counter' && counterVariant()}
    </View>
  )
}

export default FloatingActionContainer

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#80838c26',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 5,
    shadowRadius: 4,
    elevation: 4
  },
  buttonContainer: {
    marginTop: 12,
    marginBottom: 28,
    paddingVertical: 10
  },
  twoButtonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16
  },
  counterText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#313339'
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 28
  },
  counterButton: {
    width: '45%',
    paddingVertical: 10
  }
})

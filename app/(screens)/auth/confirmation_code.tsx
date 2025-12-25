import { View } from 'react-native'
import React from 'react'
import ConfirmationCodeScreen from '@/screens/auth/ConfirmationCodeScreen'

export default function confirmation_code() {
  const handleConfirmCode = (code: string) => {
console.log("OTP code: ", code)
  }
  return (
    <View>
      <ConfirmationCodeScreen handleConfirmCode={handleConfirmCode} />
    </View>
  )
}
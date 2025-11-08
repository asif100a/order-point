import { View } from 'react-native'
import React from 'react'
import SuccessPage from '@/components/ui/page/SuccessPage'

export default function reset_success() {
  return (
    <View>
      <SuccessPage title='Password Reset Successfully' description='Now you can login by using your new password' buttonText='Go to Login' navigationLink='/auth/sign_in' />
    </View>
  )
}
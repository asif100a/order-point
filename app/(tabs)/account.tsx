import { Text } from 'react-native'
import React from 'react'
import PrivateRoute from '@/routes/PrivateRoute'

export default function Account() {
  return (
    <PrivateRoute>
      <Text>Account</Text>
      <Text>Account</Text>
      <Text>Account</Text>
      <Text>Account</Text>
      <Text>Account</Text>
      <Text>Account</Text>
    </PrivateRoute>
  )
}
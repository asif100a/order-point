import { Text } from 'react-native'
import React from 'react'
import PrivateRoute from '@/routes/PrivateRoute'

export default function Favorite() {
  return (
    <PrivateRoute>
      <Text>Favorite</Text>
    </PrivateRoute>
  )
}
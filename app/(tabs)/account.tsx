import React from 'react'
import PrivateRoute from '@/routes/PrivateRoute'
import AccountScreen from '@/screens/AccountScreen'

export default function Account() {
  return (
    <PrivateRoute>
      <AccountScreen />
    </PrivateRoute>
  )
}
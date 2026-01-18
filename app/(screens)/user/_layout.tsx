import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name='search' options={{headerShown: false}} />
      <Stack.Screen name='contact_us' options={{headerShown: false}} />
    </Stack>
  )
}
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name='faq' options={{headerShown: false}} />
      <Stack.Screen name='terms_and_conditions' options={{headerShown: false}} />
      <Stack.Screen name='privacy_policy' options={{headerShown: false}} />
      <Stack.Screen name='about_us' options={{headerShown: false}} />
    </Stack>
  )
}
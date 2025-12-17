import { View, Text } from 'react-native'
import React from 'react'
import TopNavigationHeader from '@/components/ui/navigation/TopNavigationHeader'

export default function notification() {
  return (
    <View>
      <TopNavigationHeader title='Notifications' description='' link={'/home' as any} />
    </View>
  )
}
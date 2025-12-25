import { View, Text } from 'react-native'
import React from 'react'
import { useGetUserQuery } from '@/store/api/authApi';

export default function PrivateRoute() {
   const { data: User, isLoading, isError, error } = useGetUserQuery();

   if(isLoading) {
    return <View>
        
    </View>
   }

  return (
    <View>
      <Text>PrivateRoute</Text>
    </View>
  )
}
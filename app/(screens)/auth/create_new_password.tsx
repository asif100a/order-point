import { View } from 'react-native'
import React from 'react'
import CreateNewPasswordScreen from '@/screens/auth/CreateNewPasswordScreen'
import { useRouter } from 'expo-router';

export default function CreateNewPassword() {
  const router = useRouter();

  const handleCreateNewPass = () => {
    router.push("/auth/reset_success");
  }

  return (
    <View>
      <CreateNewPasswordScreen handleCreateNewPass={handleCreateNewPass} />
    </View>
  )
}
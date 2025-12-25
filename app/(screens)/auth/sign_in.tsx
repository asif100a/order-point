import { View } from "react-native";
import React from "react";
import SignInScreen from "@/screens/auth/SignInScreen";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = (email: string, password: string) => {
    console.log('Email: ', email, '\n Password: ', password)
    if(!email) {
      return alert('Email is missing!');
    }else if(!password) {
      return alert('Password is missing!');
    }
    dispatch(login({email, password}));
  };

  return (
    <View>
      <SignInScreen handleLogin={handleLogin} />
    </View>
  );
}

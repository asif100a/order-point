import { useEffect, useState } from "react";
import { useGetUserQuery } from "@/store/api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "@/types/user.type";

interface UseAuthType {
  user: UserType | undefined;
  hasToken: boolean;
  isAuthLoading: boolean;
}

export default function useAuth(): UseAuthType {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    data: userRes,
    isLoading: isProfileLoading,
    isError,
    error,
  } = useGetUserQuery();
  const user = userRes?.data;

  useEffect(() => {
    if (isError) {
      console.error("❌ error while getting user: ", error);
    }
  }, [isError, error]);

  useEffect(() => {
    setLoading(true);
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setUserToken(token);
      setLoading(false);
    };
    getToken();
  }, []);

  return {
    user: user,
    hasToken: userToken ? true : false,
    isAuthLoading: isProfileLoading || loading,
  };
}

import { View, StyleSheet, Image, Text, Pressable, Alert } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ScreenContainer from "@/components/ui/layout/ScreenContainer";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import PLACEHOLDER_PROFILE from "@/assets/images/profile/placeholder_profile.png";
import Button from "@/components/ui/buttons/Button";
import ButtonOutline from "@/components/ui/buttons/ButtonOutline";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useUpdateUserMutation } from "@/store/api/userApi";
import Toast from "react-native-toast-message";

export default function AddPhoto() {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { theme, colorScheme, primaryColor } = useTheme();
  const styles = createStyles({ theme, colorScheme, primaryColor });
  const [isSheetOpen, setSheetOpen] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    undefined
  );
  const [savedImage, setSavedImage] = useState<string | undefined>(undefined);

  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();

  // If already has saved image
  useEffect(() => {
    async function getSavedPhoto() {
      try {
      } catch (error) {
        console.error("❌ Error while retrieving saved files: ", error);
      }
    }
    getSavedPhoto();
  }, []);

  const handleAddPicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUploadedImage(result.assets[0]?.uri);
      console.log("result----------->: ", result);
    } else {
      alert("You didn't upload any image");
    }
  };

  const handleTakePhoto = async () => {
    await ImagePicker.requestCameraPermissionsAsync();

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setUploadedImage(result.assets[0]?.uri);
      console.log("result----------->: ", result);
    } else {
      alert("You didn't upload any image");
    }
  };

  const snapPoints = useMemo(() => ["40%"], []);

  // callbacks
  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleCloseSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSavePhoto = async (uri: string) => {
    if (!uri) {
      Toast.show({
        type: "error",
        text1: "Failed to save photo",
        text2: 'Photo not found!',
      });
      return;
    }
    const formData = new FormData();
    formData.append("image", uri);
    try {
      const res = await updateUser(formData).unwrap();
      console.log('Photo update Res: ', res)
      // ✅ Check for error in the response
      if ("error" in res) {
        // Handle different error types
        const err = res.error as {
          status?: number;
          message?: string;
          data?: { message: string };
        };
        const errorMessage =
          "status" in err && err.status != null
            ? `Error: ${err.status} ${err.message || err?.data?.message}`
            : "Unknown error";

        return Toast.show({
          type: "error",
          text1: "Failed to save photo",
          text2: errorMessage,
        });
      }

      if (res.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Photo saved successfully",
        });
        router.push('/auth/sign_in')
      }
    } catch (error) {
      console.error("❌Error while saving photo: ", error);
    }
  };

  const handleSkip = () => {
    router.push("/auth/sign_in");
  };

  useEffect(() => {
    if (uploadedImage) handleCloseSheet();
  }, [uploadedImage, handleCloseSheet]);

  return (
    <View style={{ position: "relative" }}>
      <ScreenContainer
        customStyles={
          {
            // backgroundColor: isSheetOpen ? "#999696ff" : theme.background,
          }
        }
      >
        <TopNavigationHeader
          title={
            uploadedImage
              ? "Confirm or change your profile picture"
              : "Add Profile Picture"
          }
          description={
            uploadedImage ? "" : "Everyone will be able to see your picture."
          }
        />

        <View style={styles.addPhotoContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={
                uploadedImage
                  ? { uri: uploadedImage }
                  : savedImage
                  ? { uri: savedImage }
                  : PLACEHOLDER_PROFILE
              }
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {uploadedImage ? (
            <View style={styles.buttonContainer}>
              <Button
                title="Done"
                onPress={() => handleSavePhoto(uploadedImage || "")}
                loading={isUpdateLoading}
              />
              <ButtonOutline title="Change Picture" onPress={handleOpenSheet} />
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <Button title="Add Picture" onPress={handleOpenSheet} />
              <ButtonOutline title="Skip" onPress={handleSkip} />
            </View>
          )}
        </View>
      </ScreenContainer>

      <BottomSheet
        ref={bottomSheetRef}
        style={styles.uploadContainer}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        onChange={(index) => {
          setSheetOpen(index !== -1);
        }}
        backgroundStyle={{ backgroundColor: "#EEEEEE" }}
      >
        <BottomSheetView>
          <Text style={styles.sheetTitle}>Add Picture</Text>

          <View style={styles.box}>
            <Pressable onPress={handleAddPicture} style={styles.option}>
              <Text style={styles.buttonText}>Choose from Camera Roll</Text>
            </Pressable>

            <View style={styles.divider} />

            <Pressable onPress={handleTakePhoto} style={styles.option}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

function createStyles({
  theme,
  colorScheme,
  primaryColor,
}: {
  theme: ThemeTypes;
  colorScheme: ColorSchemeTypes;
  primaryColor: PrimaryColorTypes;
}) {
  return StyleSheet.create({
    addPhotoContainer: {
      flex: 1,
      justifyContent: "space-between",
      paddingVertical: 32,
      minHeight: 500,
    },
    imageContainer: {
      alignItems: "center",
      marginBottom: 40,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 100,
    },
    buttonContainer: {
      gap: 12,
      paddingHorizontal: 20,
    },
    uploadContainer: {
      padding: 24,
      gap: 16,
    },
    sheetTitle: {
      fontSize: 24,
      fontWeight: "600",
      textAlign: "center",
      color: colorScheme === "dark" ? "#fff" : primaryColor.primaryBlack,
      marginBottom: 16,
    },
    box: {
      backgroundColor: colorScheme === "dark" ? "#2a2a2a" : "white",
      borderRadius: 12,
      overflow: "hidden",
    },
    option: {
      padding: 20,
    },
    buttonText: {
      fontSize: 18,
      textAlign: "center",
      color: colorScheme === "dark" ? "#fff" : primaryColor.primaryBlack,
    },
    divider: {
      height: 1,
      backgroundColor: colorScheme === "dark" ? "#444" : "#ddd",
    },
  });
}

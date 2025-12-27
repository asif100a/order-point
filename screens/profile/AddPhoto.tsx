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
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";

export default function AddPhoto() {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { theme, colorScheme, primaryColor } = useTheme();
  const styles = createStyles({ theme, colorScheme, primaryColor });
  const [isSheetOpen, setSheetOpen] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    undefined
  );
  const [savedImage, setSavedImage] = useState<string | undefined>(
    undefined
  );
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // If already has saved image
  useEffect(() => {
    async function getSavedPhoto() {
      try {
        const uploadDir = new FileSystem.Directory(
          FileSystem.Paths.document,
          "uploaded",
          "images"
        );
        console.log("Upload Dir: ", uploadDir);
        if (await uploadDir.exists) {
          const files = uploadDir.list();
          console.log("Saved Files: ", files);

          if (files.length > 0) {
            const sortedFiles = files.sort((a, b) => {
              const timeA = parseInt(a.name.split(".jpg")[0], 10);
              const timeB = parseInt(b.name.split(".jpg")[0], 10);
              return timeA - timeB;
            });
            const latestFile = sortedFiles[0];
            setSavedImage(latestFile.uri);
          }
        }
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

  const handleSkip = () => {
    router.push("/subscription/choose_plan");
  };

  const snapPoints = useMemo(() => ["40%"], []);

  // callbacks
  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  // const handleCloseSheet = useCallback(() => {
  //   bottomSheetRef.current?.close()
  // }, [])

  const handleSavePhoto = async (uri: string) => {
    try {
      // Create the Directory Structure
      const uploadDir = new FileSystem.Directory(
        FileSystem.Paths.document,
        "uploaded",
        "images"
      );
      uploadDir.create({ intermediates: true, idempotent: true }); // Create the directory if doesn't exist

      // Create Unique filename
      const filename = `${new Date().getTime()}.jpg`;

      // Create the destination file
      const sourceFile = new FileSystem.File(uri);
      const destinationFile = new FileSystem.File(uploadDir, filename);

      // Copy the image
      await sourceFile.copy(destinationFile);

      console.log("Image saved to: ", destinationFile.uri);
      Alert.alert("Success", "Image saved successfully!");

      setIsSaved(true); // Set save after saving
      // Return the uri
      return destinationFile.uri;
    } catch (error) {
      console.error("❌Error while saving photo: ", error);
      Alert.alert("Error", "Failed to save image");
    }
  };

  useEffect(() => {
    if (isSaved) {
      setTimeout(() => {
        router.push("/subscription/choose_plan");
      }, 1000);
    }
  }, [isSaved, router]);

  return (
    <View style={{ position: "relative" }}>
      <ScreenContainer
        customStyles={{
          backgroundColor: isSheetOpen ? "#999696ff" : theme.background,
        }}
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
          link={"/auth/sign_up" as any}
        />

        <View style={styles.addPhotoContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={
                uploadedImage ? { uri: uploadedImage } : savedImage ? {uri: savedImage} : PLACEHOLDER_PROFILE
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
          // console.log("index: ", index);
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

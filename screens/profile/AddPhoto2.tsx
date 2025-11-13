import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import ScreenContainer from "@/components/ui/layout/ScreenContainer";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import PLACEHOLDER_PROFILE from "@/assets/images/profile/placeholder_profile.png";
import Button from "@/components/ui/buttons/Button";
import ButtonOutline from "@/components/ui/buttons/ButtonOutline";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AddPhoto() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { theme, colorScheme, primaryColor } = useTheme();
  const styles = createStyles({ theme, colorScheme, primaryColor });

  const handleAddPicture = () => {
    console.log("Choose from camera roll");
  };

  const handleTakePhoto = () => {
    console.log("Take photo");
  };

  const handleSkip = () => {
    console.log("Skip");
  };

  const snapPoints = useMemo(() => ["30%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'gray' }}>
        <ScreenContainer>
          <TopNavigationHeader
            title="Add Profile Picture"
            description="Everyone will be able to see your picture."
            link={"/auth/sign_up" as any}
          />

          <View style={styles.addPhotoContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={PLACEHOLDER_PROFILE}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Add Picture" onPress={() => {}} />
              <ButtonOutline title="Skip" onPress={handleSkip} />
            </View>
          </View>
        </ScreenContainer>

        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.uploadContainer}>
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
    </GestureHandlerRootView>
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
      gap: 32,
    },
    sheetTitle: {
      fontSize: 24,
      fontWeight: "600",
      textAlign: "center",
      color: colorScheme === "dark" ? "#fff" : primaryColor.primaryBlack,
    },
    box: {
      backgroundColor: colorScheme === "dark" ? "#2a2a2a" : "#f9f9f9",
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

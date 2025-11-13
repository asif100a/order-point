import { View, StyleSheet, Image, Text, Pressable } from "react-native";
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

export default function AddPhoto() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { theme, colorScheme, primaryColor } = useTheme();
  const styles = createStyles({ theme, colorScheme, primaryColor });
  const [isSheetOpen, setSheetOpen] = useState<boolean>(false);

  const handleAddPicture = () => {
    console.log("Choose from camera roll");
  };

  const handleTakePhoto = () => {
    console.log("Take photo");
  };

  const handleSkip = () => {
    console.log("Skip");
  };

  const snapPoints = useMemo(() => ["40%"], []);

  // callbacks
  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  // const handleCloseSheet = useCallback(() => {
  //   bottomSheetRef.current?.close()
  // }, [])

  return (
    <View style={{ position: "relative" }}>
      <ScreenContainer
        customStyles={{ backgroundColor: isSheetOpen ? "#999696ff" : theme.background }}
      >
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
            <Button title="Add Picture" onPress={handleOpenSheet} />
            <ButtonOutline title="Skip" onPress={handleSkip} />
          </View>
        </View>
      </ScreenContainer>

      <BottomSheet
        ref={bottomSheetRef}
        style={styles.uploadContainer}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        onChange={(index) => {
          console.log("index: ", index);
          setSheetOpen(index !== -1);
        }}
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

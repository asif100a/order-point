import { View, StyleSheet, Image } from "react-native";
import React from "react";
import ScreenContainer from "@/components/ui/layout/ScreenContainer";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import PLACEHOLDER_PROFILE from "@/assets/images/profile/placeholder_profile.png";
import Button from "@/components/ui/buttons/Button";
import ButtonOutline from "@/components/ui/buttons/ButtonOutline";

export default function AddPhoto() {
  const styles = createStyles({});

  const handleAddPicture = () => {};

  const handleSkip = () => {};

  return (
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
            width={200}
            height={200}
            alt="User Image"
            style={styles.image}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Add Picture" onPress={handleAddPicture} />
          <ButtonOutline title="Skip" onPress={handleSkip} />
        </View>
      </View>
    </ScreenContainer>
  );
}

function createStyles({}) {
  return StyleSheet.create({
    addPhotoContainer: {
      flex: 1,
      justifyContent: "space-between",
      marginVertical: 32,
      height: 600,
    },
    imageContainer: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    image: {
      width: 200,
      height: 200,
    },
    buttonContainer: {
      gap: 12,
    },
  });
}

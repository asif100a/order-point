import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableHighlight,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import useTheme from "@/hooks/useTheme";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import PLACEHOLDER_PROFILE from "@/assets/images/profile/placeholder_profile.png";
import TextInputField from "@/components/ui/form/TextInputField";
import EmailInputField from "@/components/ui/form/EmailInputField";
import Button from "@/components/ui/buttons/Button";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import useAuth from "@/hooks/useAuth";
import LoaderUI from "@/components/ui/loader/LoaderUI";

export default function EditProfileScreen({
  handleUpdate,
  isUpdateLoading,
}: {
  handleUpdate: (
    name: string,
    email: string,
    address: string,
    phoneNumber: string,
    photoURI: string
  ) => void;
  isUpdateLoading: boolean;
}) {
  // Hook Calls
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { theme, colorScheme, primaryColor } = useTheme();
  const { isAuthLoading, user } = useAuth();

  // State Definitions
  const [isSheetOpen, setSheetOpen] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    undefined
  );
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // Custom Styles
  const styles = createStyles({ theme, colorScheme, primaryColor });

  const snapPoints = useMemo(() => ["40%"], []);

  // callbacks
  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleAddPicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUploadedImage(result.assets[0]?.uri);
      bottomSheetRef.current?.close(); // Close the sheet
    }
  };

  const handleTakePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setUploadedImage(result.assets[0]?.uri);
      bottomSheetRef.current?.close(); // Close the sheet
    }
  };

  const handleCloseSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const onSubmit = () =>
    handleUpdate(userName, email, address, phoneNumber, uploadedImage || "");

  useEffect(() => {
    if (uploadedImage) handleCloseSheet();
  }, [uploadedImage, handleCloseSheet]);

  useEffect(() => {
    if (user) {
      setUserName(user?.name);
      setEmail(user?.email);
      setAddress(user?.address);
      setPhoneNumber(user?.contractNumber);
    }
  }, [user]);

  if (isAuthLoading) return <LoaderUI />;

  return (
    <SafeAreaView style={[styles.container]}>
      {/* Overlay */}
      {/* {isSheetOpen && <View style={styles.overlay} />} */}
      <TopNavigationHeader
        title="Edit Profile"
        description=""
        link={"/(tabs)/account" as any}
      />

      {/* Profile View */}
      <View style={styles.addPhotoContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={
              uploadedImage
                ? { uri: uploadedImage }
                : user?.photoUrl ? {uri: user?.photoUrl} : PLACEHOLDER_PROFILE
            }
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableHighlight
            onPress={handleOpenSheet}
            style={styles.editButton}
          >
            <LinearGradient
              colors={["#556D55", "#76A976"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={{ borderRadius: 50, padding: 4 }}
            >
              <Feather name="edit-3" size={20} color={"white"} />
            </LinearGradient>
          </TouchableHighlight>
        </View>
      </View>

      {/* Input Fields */}
      <View style={styles.form}>
        {/* User Name */}
        <TextInputField
          label="User Name"
          value={userName}
          onTextChange={setUserName}
          placeholder="Enter your name"
        />

        {/* Email */}
        <EmailInputField value={email} onEmailChange={setEmail} readOnly />

        {/* Address */}
        <TextInputField
          label="Address"
          value={address}
          onTextChange={setAddress}
          placeholder="Enter your address"
        />

        {/* Phone Number */}
        <TextInputField
          label="Phone Number"
          value={phoneNumber}
          onTextChange={setPhoneNumber}
          placeholder="Enter your name"
        />

        {/* Update Button */}
        <Button title="Update" onPress={onSubmit} loading={isUpdateLoading} />
      </View>

      {/* Bottom Sheet */}
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
    </SafeAreaView>
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
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 16,
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
      zIndex: 1, // Below the bottom sheet but above content
    },
    addPhotoContainer: {
      justifyContent: "space-between",
      paddingVertical: 32,
    },
    imageContainer: {
      marginHorizontal: "auto",
      width: 150,
      height: 150,
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 100,
    },
    editButton: {
      position: "absolute",
      bottom: 0,
      right: 16,
      zIndex: 10,
      borderRadius: 50,
    },
    form: {
      flexDirection: "column",
    },
    uploadContainer: {
      padding: 24,
      gap: 16,
      zIndex: 2, // Above the overlay
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

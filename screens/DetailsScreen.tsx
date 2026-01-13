import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import useTheme from "@/hooks/useTheme";
import CategoryImg1 from "@/assets/images/category/category1.png";
import hotelImg from "@/assets/images/category/hotel.png";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import gallery1 from "@/assets/images/details/gallery1.png";
import gallery2 from "@/assets/images/details/gallery2.png";
import gallery3 from "@/assets/images/details/gallery3.png";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailsScreen() {
  const { colorScheme, theme, primaryColor } = useTheme();
  const [bookmark, setBookmark] = useState<boolean>(false);

  const styles = createStyles(theme, colorScheme, primaryColor);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <TopNavigationHeader
            title="Discount Details"
            description=""
            link={"/(tabs)" as any}
          />

          {/* Image with Bookmark */}
          <View style={styles.imageWrapper}>
            <Image
              source={CategoryImg1}
              style={styles.image}
              alt="Coffee Haven"
            />
            <Pressable
              style={styles.bookmarkButton}
              onPress={() => setBookmark(!bookmark)}
            >
              {bookmark ? (
                <FontAwesome name="bookmark" size={20} color="white" />
              ) : (
                <Feather name="bookmark" size={20} color="white" />
              )}
            </Pressable>
          </View>

          <View style={styles.section}>
            {/* Hotel Info */}
            <View style={styles.hotelContainer}>
              <View style={styles.hotelInfo}>
                <Image
                  source={hotelImg}
                  style={styles.hotelIcon}
                  alt="Hotel Icon"
                />
                <Text style={styles.hotelName}>Coffee Haven</Text>
              </View>
              <Link href="/map" style={styles.viewLink}>
                <EvilIcons
                  name="location"
                  size={20}
                  color={primaryColor.secondaryBlack}
                />
                <Text style={styles.viewText}>View</Text>
              </Link>
            </View>

            {/* Description */}
            <Text style={styles.description}>
              A cappuccino is an Italian coffee drink made with a balance of
              espresso, steamed milk, and a thick layer of milk foam.
            </Text>
          </View>

          {/* Discount Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Discount Information</Text>

            {/* Discount */}
            <View style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <View style={styles.iconCircle}>
                  <Feather
                    name="percent"
                    size={16}
                    color={primaryColor.primaryBlack}
                  />
                </View>
                <Text style={styles.infoLabel}>Discount:</Text>
              </View>
              <Text style={styles.infoValue}>20%</Text>
            </View>

            {/* Location */}
            <View style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <View style={styles.iconCircle}>
                  <EvilIcons
                    name="location"
                    size={20}
                    color={primaryColor.primaryBlack}
                  />
                </View>
                <Text style={styles.infoLabel}>Location</Text>
              </View>
              <View style={styles.locationTags}>
                <View style={styles.locationTag}>
                  <Text style={styles.locationTagText}>Dhaka</Text>
                </View>
                <View style={styles.locationTag}>
                  <Text style={styles.locationTagText}>Rajshahi</Text>
                </View>
              </View>
            </View>

            {/* Can be used */}
            <View style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <View style={styles.iconCircle}>
                  <Feather
                    name="refresh-cw"
                    size={16}
                    color={primaryColor.primaryBlack}
                  />
                </View>
                <Text style={styles.infoLabel}>Can be used</Text>
              </View>
              <Text style={styles.infoValue}>2/5</Text>
            </View>
          </View>

          {/* Deal Description Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Deal Description</Text>
            <Text style={styles.dealDescription}>
              A cappuccino is an Italian coffee drink made with a balance of
              espresso, steamed milk, and a thick layer of milk foam.
            </Text>
          </View>

          {/* Team & Conditions Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Team & Conditions</Text>

            {/* Entrance & Welcome Area */}
            <View style={styles.conditionGroup}>
              <View style={styles.conditionHeader}>
                <Feather
                  name="check-circle"
                  size={18}
                  color={primaryColor.greenNormal}
                />
                <Text style={styles.conditionTitle}>
                  Entrance & Welcome Area
                </Text>
              </View>
              <View style={styles.conditionList}>
                <View style={styles.conditionItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.conditionText}>
                    Welcome board with birthday name & age
                  </Text>
                </View>
                <View style={styles.conditionItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.conditionText}>
                    Balloon arch / gate decoration
                  </Text>
                </View>
                <View style={styles.conditionItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.conditionText}>
                    Flower stand or LED frame at entry
                  </Text>
                </View>
                <View style={styles.conditionItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.conditionText}>
                    Red carpet or themed walkway
                  </Text>
                </View>
                <View style={styles.conditionItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.conditionText}>Photo booth backdrop</Text>
                </View>
              </View>
            </View>

            {/* Cake & Dessert Section */}
            <View style={styles.conditionGroup}>
              <View style={styles.conditionHeader}>
                <Feather
                  name="check-circle"
                  size={18}
                  color={primaryColor.greenNormal}
                />
                <Text style={styles.conditionTitle}>
                  Cake & Dessert Section
                </Text>
              </View>
              <View style={styles.conditionList}>
                <View style={styles.conditionItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.conditionText}>
                    Cake stand & dessert trays
                  </Text>
                </View>
                <View style={styles.conditionItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.conditionText}>
                    Cake backdrop or arch
                  </Text>
                </View>
                <View style={styles.conditionItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.conditionText}>
                    LED candles or spotlight on cake
                  </Text>
                </View>
                <View style={styles.conditionItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.conditionText}>
                    Customized cake topper
                  </Text>
                </View>
              </View>
            </View>

            {/* Photo Zone */}
            <View style={styles.conditionGroup}>
              <View style={styles.conditionHeader}>
                <Feather
                  name="check-circle"
                  size={18}
                  color={primaryColor.greenNormal}
                />
                <Text style={styles.conditionTitle}>Photo Zone</Text>
              </View>
              <View style={styles.conditionList}>
                <View style={styles.conditionItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.conditionText}>
                    Themed photo booth with props
                  </Text>
                </View>
                <View style={styles.conditionItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.conditionText}>
                    Neon light signs (
                    {`"Let's Party", "Cheers", "Happy Birthday"`})
                  </Text>
                </View>
                <View style={styles.conditionItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.conditionText}>
                    Instax / Polaroid corner for instant photos
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Contact Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>

            <View style={styles.contactList}>
              <View style={[styles.contactItem, styles.phoneContact]}>
                <View style={styles.contactIconWrapper}>
                  <Feather name="phone" size={18} color="#3B82F6" />
                </View>
                <Text style={styles.contactText}>+1 (555) 123-4567</Text>
              </View>

              <View style={[styles.contactItem, styles.emailContact]}>
                <View style={styles.contactIconWrapper}>
                  <Feather name="mail" size={18} color="#10B981" />
                </View>
                <Text style={styles.contactText}>youremail.com</Text>
              </View>

              <View style={[styles.contactItem, styles.emailContact]}>
                <View style={styles.contactIconWrapper}>
                  <Feather name="globe" size={18} color="#10B981" />
                </View>
                <Text style={styles.contactText}>www.website.com</Text>
              </View>

              <View style={[styles.contactItem, styles.emailContact]}>
                <View style={styles.contactIconWrapper}>
                  <Feather name="instagram" size={18} color="#10B981" />
                </View>
                <Text style={styles.contactText}>www.Instagram.com</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.gallery}>
          <Text style={styles.galleryText}>Gallery</Text>

          <View style={styles.galleryImgContainer}>
            <Image source={gallery1} style={styles.galleryImg} />
            <Image source={gallery2} style={styles.galleryImg} />
            <Image source={gallery3} style={styles.galleryImg} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes
) {
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: colorScheme === "dark" ? "#1a1313" : "#F9FAFB",
    },
    scrollContainer: {},
    container: {
      paddingHorizontal: 16,
      paddingBottom: 24,
    },
    imageWrapper: {
      position: "relative",
      width: "100%",
      height: 200,
      borderRadius: 16,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    bookmarkButton: {
      position: "absolute",
      top: 12,
      right: 12,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      borderRadius: 50,
      padding: 8,
      width: 36,
      height: 36,
      justifyContent: "center",
      alignItems: "center",
    },
    hotelContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 16,
    },
    hotelInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    hotelIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
    hotelName: {
      fontSize: 16,
      fontWeight: "600",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    viewLink: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    viewText: {
      fontSize: 14,
      color: primaryColor.secondaryBlack,
      textDecorationLine: "underline",
    },
    description: {
      fontSize: 13,
      color: primaryColor.secondaryBlack,
      lineHeight: 20,
      marginTop: 12,
    },
    section: {
      marginTop: 24,
      padding: 12,
      borderRadius: 12,
      backgroundColor: colorScheme === "dark" ? "#3b3737" : "white",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      marginBottom: 16,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor:
        colorScheme === "dark"
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.05)",
    },
    infoLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    iconCircle: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor:
        colorScheme === "dark"
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.05)",
      justifyContent: "center",
      alignItems: "center",
    },
    infoLabel: {
      fontSize: 14,
      color: primaryColor.secondaryBlack,
    },
    infoValue: {
      fontSize: 14,
      fontWeight: "600",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    locationTags: {
      flexDirection: "row",
      gap: 8,
    },
    locationTag: {
      backgroundColor:
        colorScheme === "dark" ? "rgba(255, 255, 255, 0.1)" : "#F5F5F5",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    locationTagText: {
      fontSize: 13,
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    dealDescription: {
      fontSize: 13,
      color: primaryColor.secondaryBlack,
      lineHeight: 20,
    },
    conditionGroup: {
      marginBottom: 20,
    },
    conditionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 12,
    },
    conditionTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
    },
    conditionList: {
      paddingLeft: 26,
    },
    conditionItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 8,
      gap: 8,
    },
    bulletDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: primaryColor.secondaryBlack,
      marginTop: 6,
    },
    conditionText: {
      fontSize: 13,
      color: primaryColor.secondaryBlack,
      lineHeight: 20,
      flex: 1,
    },
    contactList: {
      gap: 12,
    },
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 14,
      borderRadius: 8,
    },
    phoneContact: {
      backgroundColor:
        colorScheme === "dark" ? "rgba(59, 130, 246, 0.1)" : "#EFF6FF",
    },
    emailContact: {
      backgroundColor:
        colorScheme === "dark" ? "rgba(16, 185, 129, 0.1)" : "#F0FDF4",
    },
    contactIconWrapper: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    contactText: {
      fontSize: 14,
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      flex: 1,
    },
    gallery: {
      marginTop: 24,
    },
    galleryText: {
      fontSize: 18,
      fontWeight: 500,
      color: colorScheme === "dark" ? "white" : primaryColor.primaryBlack,
      paddingHorizontal: 16,
    },
    galleryImgContainer: {
      flexDirection: "row",
      gap: 6,
      marginTop: 12,
    },
    galleryImg: {
      width: 172,
      height: 136,
    },
  });
}

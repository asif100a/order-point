import TopNavigationHeader from '@/components/ui/navigation/TopNavigationHeader';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CheckIcon = () => (
  <View style={styles.checkIcon}>
    <Text style={styles.checkIconText}>✓</Text>
  </View>
);

const TermsAndConditions = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.headerContainer}><TopNavigationHeader title='Terms & Conditions' description='' link /></View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Date */}
        <Text style={styles.date}>October 30, 2025</Text>
        
        {/* Welcome Text */}
        <Text style={styles.welcomeText}>
          Welcome to SaveKey! These Terms and Conditions outline the rules and regulations for the use of our exchange platform. By accessing or using our app you agree to these terms.
        </Text>

        {/* Section 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Account Registration</Text>
          <Text style={styles.sectionText}>
            To use our services, you must create an account. You agree to provide accurate and complete information, and to keep your account credentials confidential.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Product Exchange Policy</Text>
          
          <View style={styles.bulletPoint}>
            <CheckIcon />
            <Text style={styles.bulletText}>
              We reserve the right to refuse products purchased through our app within 3 days of receipt.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <CheckIcon />
            <Text style={styles.bulletText}>
              Items must be returned in their original condition, unopened, and with all tags attached.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <CheckIcon />
            <Text style={styles.bulletText}>
              Certain categories may be non-returnable or non exchangeable.
            </Text>
          </View>
        </View>

        {/* Section 3 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Refunds and Credits</Text>
          
          <View style={styles.bulletPoint}>
            <CheckIcon />
            <Text style={styles.bulletText}>
              Refunds are processed once the returned item is received and inspected.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <CheckIcon />
            <Text style={styles.bulletText}>
              Refunds will be issued via the original payment method.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <CheckIcon />
            <Text style={styles.bulletText}>
              Shipping costs, exchanges may be preferred over refunds, depending product availability.
            </Text>
          </View>
        </View>

        {/* Section 4 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Changes to Terms</Text>
          <Text style={styles.sectionText}>
            We reserve the right to update these terms at any time. Continued use of the app constitutes your acceptance of the revised terms.
          </Text>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer:{
    paddingHorizontal: 16,
    paddingTop: 16
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 20,
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingRight: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
    marginLeft: 12,
  },
  checkIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4b5563',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkIconText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default TermsAndConditions;
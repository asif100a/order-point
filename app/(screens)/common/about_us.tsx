import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import useTheme from "@/hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNavigationHeader from "@/components/ui/navigation/TopNavigationHeader";
import RenderHTML from "react-native-render-html";

export default function AboutUs() {
  const { colorScheme, theme, primaryColor } = useTheme();

  const styles = createStyles(theme, colorScheme, primaryColor);

  // Custom styles for HTML tags
  const tagsStyles = {
    body: {
      color: colorScheme === 'dark' ? '#ffffff' : '#2c3e50',
      fontSize: 16,
      lineHeight: 24,
    },
    h1: {
      color: colorScheme === 'dark' ? '#ffffff' : '#2c3e50',
      fontSize: 28,
      fontWeight: 'bold' as const,
      lineHeight: 36,
      marginBottom: 10,
    },
    h2: {
      color: colorScheme === 'dark' ? '#5dade2' : '#2980b9',
      fontSize: 24,
      fontWeight: 'bold' as const,
      lineHeight: 32,
      marginTop: 20,
      marginBottom: 12,
    },
    h3: {
      color: colorScheme === 'dark' ? '#ffffff' : '#2c3e50',
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
      marginTop: 0,
    },
    p: {
      fontSize: 16,
      marginBottom: 16,
      color: colorScheme === 'dark' ? '#e0e0e0' : '#34495e',
    },
    a: {
      color: colorScheme === 'dark' ? '#5dade2' : '#2980b9',
      textDecorationLine: 'none' as const,
      fontWeight: 'bold' as const,
    },
    strong: {
      fontWeight: 'bold' as const,
      color: colorScheme === 'dark' ? '#ffffff' : '#2c3e50',
    },
    em: {
      fontStyle: 'italic' as const,
    },
    ul: {
      marginBottom: 16,
    },
    li: {
      marginBottom: 8,
      color: colorScheme === 'dark' ? '#e0e0e0' : '#34495e',
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigationHeader title="About Us" description="" link />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <RenderHTML
          source={{ html: htmlContent }}
          tagsStyles={tagsStyles}
          defaultTextProps={{ selectable: true }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes,
) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.background,
    },
    scrollContent: {
      paddingBottom: 16,
    },
  });
}

const htmlContent = `
  <div style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
    <header style="border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 30px;">
      <h1 style="color: #2c3e50; font-size: 2.5rem; margin-bottom: 10px;">
        The State of Blogging in 2026: Human Creativity in the AI Era
      </h1>
      <p style="color: #7f8c8d; font-style: italic;">
        Published on January 22, 2026 • By Digital Trends Insights
      </p>
    </header>

    <section style="margin-bottom: 30px;">
      <p style="font-size: 1.1rem; margin-bottom: 20px;">
        As we move through <strong>2026</strong>, the landscape of blogging has
        undergone a profound transformation. While critics once predicted that
        short-form video and artificial intelligence would render the written
        word obsolete, blogs have instead evolved into high-value sanctuaries
        for deep-dive analysis and authentic human connection.
      </p>

      <h2 style="color: #2980b9; margin-top: 30px;">
        1. The Shift to "Expertise-First" Content
      </h2>
      <p>
        With search engines now prioritizing{" "}
        <em>
          Experience, Expertise, Authoritativeness, and Trustworthiness
          (E-E-A-T)
        </em>
        , the generic "how-to" blogs of the past have been replaced. Today's
        successful bloggers focus on lived experiences that AI cannot replicate.
        Readers are flocking to platforms like{" "}
        <a
          href="https://substack.com"
          style="color: #2980b9; text-decoration: none; font-weight: bold;"
        >
          Substack
        </a>{" "}
        and{" "}
        <a
          href="https://medium.com"
          style="color: #2980b9; text-decoration: none; font-weight: bold;"
        >
          Medium
        </a>{" "}
        to find specialized knowledge and unique perspectives.
      </p>
    </section>

    <section style="background-color: #eef2f3; padding: 20px; border-left: 5px solid #2980b9; margin-bottom: 30px;">
      <h3 style="margin-top: 0; color: #2c3e50;">Key Stats for 2026</h3>
      <ul style="list-style-type: square; margin-bottom: 0;">
        <li>
          Over <strong>650 million</strong> active blogs globally.
        </li>
        <li>
          82% of consumers trust blogs more than social media advertisements.
        </li>
        <li>
          Multimedia integration (audio and interactive charts) has increased
          engagement by 40%.
        </li>
      </ul>
    </section>

    <section style="margin-bottom: 30px;">
      <h2 style="color: #2980b9;">2. Hybrid Monetization Models</h2>
      <p>
        In 2026, the reliance on banner ads has dwindled. Modern bloggers use a
        diverse mix of revenue streams:
      </p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
        <div style="background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">
          <strong style="display: block; margin-bottom: 5px; color: #d35400;">
            Direct Support
          </strong>
          Paid newsletters and premium membership tiers via platforms like{" "}
          <a
            href="https://ghost.org"
            style="color: #2980b9; text-decoration: none;"
          >
            Ghost
          </a>
          .
        </div>
        <div style="background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">
          <strong style="display: block; margin-bottom: 5px; color: #d35400;">
            Curated Commerce
          </strong>
          High-intent affiliate marketing and bespoke digital products.
        </div>
      </div>
    </section>

    <section style="margin-bottom: 30px;">
      <h2 style="color: #2980b9;">3. Conclusion</h2>
      <p>
        Blogging in 2026 is no longer just about writing; it is about building a
        community. As the digital world becomes increasingly saturated with
        generated content, the value of a trusted, human-curated blog has never
        been higher. For those looking to start, the best time remains today.
      </p>
    </section>

    <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
      <a
        href="https://wordpress.com"
        style="display: inline-block; background-color: #2c3e50; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; transition: background 0.3s;"
      >
        Start Your Own Blog Today
      </a>
    </footer>
  </div>
`;

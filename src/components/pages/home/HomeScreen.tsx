import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';

type Navigation = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type IconName = React.ComponentProps<typeof MaterialDesignIcons>['name'];

const rescueSteps: {
  number: string;
  title: string;
  description: string;
  icon: IconName;
  tint: string;
  color: string;
}[] = [
  {
    number: '01',
    title: 'Share what you have',
    description: 'Post good food that would otherwise go to waste.',
    icon: 'food-apple-outline',
    tint: '#FCE9D6',
    color: '#B65C20',
  },
  {
    number: '02',
    title: 'Find a nearby match',
    description: 'Connect with a local organization ready to receive it.',
    icon: 'map-marker-radius-outline',
    tint: '#E4F0E7',
    color: '#26734D',
  },
  {
    number: '03',
    title: 'Get it to the table',
    description: 'Coordinate a pickup and keep the good food moving.',
    icon: 'truck-fast-outline',
    tint: '#F6E7B8',
    color: '#8C6819',
  },
];

function BrandMark() {
  return (
    <View style={styles.brandMark}>
      <MaterialDesignIcons name="heart-pulse" size={21} color={colors.green} />
    </View>
  );
}

function RescueStep({
  number,
  title,
  description,
  icon,
  tint,
  color,
}: (typeof rescueSteps)[number]) {
  return (
    <View style={styles.stepCard}>
      <View style={[styles.stepIcon, { backgroundColor: tint }]}>
        <MaterialDesignIcons name={icon} size={22} color={color} />
      </View>
      <View style={styles.stepCopy}>
        <Text style={styles.stepNumber}>STEP {number}</Text>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
      <MaterialDesignIcons
        name="arrow-up-right"
        size={18}
        color={colors.muted}
      />
    </View>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const { width } = useWindowDimensions();
  const compact = width < 400;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.page}>
          <View style={styles.header}>
            <View style={styles.brandGroup}>
              <BrandMark />
              <View>
                <Text style={styles.brandName}>Vitality Logistics</Text>
                <Text style={styles.brandCaption}>FOOD RESCUE NETWORK</Text>
              </View>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.pressed,
              ]}
              onPress={() => navigation.navigate('Login')}
              accessibilityRole="button"
            >
              <Text style={styles.loginButtonText}>Log in</Text>
            </Pressable>
          </View>

          <View style={[styles.hero, compact && styles.compactHero]}>
            <View style={styles.heroOrnament} />
            <View style={styles.heroContent}>
              <View style={styles.eyebrow}>
                <View style={styles.eyebrowDot} />
                <Text style={styles.eyebrowText}>GOOD FOOD, GOOD NEIGHBORS</Text>
              </View>
              <Text style={[styles.heroTitle, compact && styles.compactHeroTitle]}>
                A second life{'\n'}for good food.
              </Text>
              <Text style={styles.heroDescription}>
                Bringing surplus food and local communities together, one
                thoughtful handoff at a time.
              </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.pressedButton,
                ]}
                onPress={() => navigation.navigate('Register')}
                accessibilityRole="button"
              >
                <Text style={styles.primaryButtonText}>Join the food loop</Text>
                <MaterialDesignIcons
                  name="arrow-right"
                  size={18}
                  color={colors.deepGreen}
                />
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.volunteerLink,
                  pressed && styles.pressed,
                ]}
                onPress={() => navigation.navigate('Register')}
                accessibilityRole="button"
              >
                <Text style={styles.volunteerLinkText}>
                  Have time to help? Become a volunteer
                </Text>
                <MaterialDesignIcons
                  name="chevron-right"
                  size={17}
                  color={colors.lightGreen}
                />
              </Pressable>
            </View>
            {!compact ? (
              <View style={styles.heroIllustration} pointerEvents="none">
                <View style={styles.illustrationHalo} />
                <View style={styles.illustrationPlate}>
                  <MaterialDesignIcons
                    name="food-apple"
                    size={64}
                    color={colors.deepGreen}
                  />
                </View>
                <View style={styles.illustrationLeaf}>
                  <MaterialDesignIcons
                    name="leaf"
                    size={21}
                    color={colors.deepGreen}
                  />
                </View>
              </View>
            ) : null}
          </View>

          <View style={styles.intro}>
            <Text style={styles.sectionEyebrow}>A SMALL ACT, A BIGGER TABLE</Text>
            <Text style={styles.sectionTitle}>Here’s how food finds its way.</Text>
            <Text style={styles.sectionDescription}>
              A simple local loop makes it easier to share surplus and get it
              where it can do the most good.
            </Text>
          </View>

          <View style={styles.steps}>
            {rescueSteps.map(step => (
              <RescueStep key={step.number} {...step} />
            ))}
          </View>

          <View style={styles.communityCard}>
            <View style={styles.communityIcon}>
              <MaterialDesignIcons
                name="hand-heart-outline"
                size={23}
                color={colors.green}
              />
            </View>
            <View style={styles.communityCopy}>
              <Text style={styles.communityTitle}>There’s room for you here.</Text>
              <Text style={styles.communityDescription}>
                Whether you have food to share or a little time to give, every
                neighbor can be part of the rescue.
              </Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.communityButton,
                pressed && styles.pressed,
              ]}
              onPress={() => navigation.navigate('Register')}
              accessibilityRole="button"
            >
              <Text style={styles.communityButtonText}>Get started</Text>
              <MaterialDesignIcons
                name="arrow-right"
                size={16}
                color={colors.green}
              />
            </Pressable>
          </View>

          <Text style={styles.footerText}>
            Vitality Logistics · Nourishing communities, together.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const colors = {
  background: '#F7F5EF',
  paper: '#FFFEFB',
  ink: '#1C2C25',
  muted: '#69766E',
  green: '#26734D',
  deepGreen: '#173F32',
  lightGreen: '#C6E2C5',
  line: '#E8E5DC',
  yellow: '#E8C968',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 28,
  },
  page: {
    width: '100%',
    maxWidth: 920,
    alignSelf: 'center',
    paddingHorizontal: 22,
  },
  header: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandMark: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#E2EDDF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  brandCaption: {
    color: colors.green,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 3,
  },
  loginButton: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D5DCCF',
    backgroundColor: colors.paper,
  },
  loginButtonText: {
    color: colors.deepGreen,
    fontSize: 13,
    fontWeight: '700',
  },
  hero: {
    minHeight: 378,
    borderRadius: 27,
    overflow: 'hidden',
    backgroundColor: colors.deepGreen,
    paddingHorizontal: 30,
    paddingVertical: 31,
    justifyContent: 'center',
  },
  compactHero: {
    minHeight: 412,
    paddingHorizontal: 22,
    paddingVertical: 25,
  },
  heroContent: {
    width: '72%',
    maxWidth: 490,
    zIndex: 1,
  },
  eyebrow: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 17,
  },
  eyebrowDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.yellow,
  },
  eyebrowText: {
    color: colors.lightGreen,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.15,
  },
  heroTitle: {
    color: colors.paper,
    fontSize: 42,
    lineHeight: 47,
    fontWeight: '800',
    letterSpacing: -1.3,
  },
  compactHeroTitle: {
    fontSize: 35,
    lineHeight: 40,
    letterSpacing: -0.8,
  },
  heroDescription: {
    maxWidth: 380,
    color: '#D5E4D9',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 13,
    marginBottom: 19,
  },
  primaryButton: {
    minHeight: 46,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: colors.yellow,
  },
  primaryButtonText: {
    color: colors.deepGreen,
    fontSize: 13,
    fontWeight: '800',
  },
  volunteerLink: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 12,
    paddingVertical: 4,
  },
  volunteerLinkText: {
    color: '#E0ECE2',
    fontSize: 11,
    fontWeight: '600',
  },
  heroOrnament: {
    position: 'absolute',
    width: 390,
    height: 390,
    top: -182,
    right: -123,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'rgba(217, 236, 214, 0.13)',
  },
  heroIllustration: {
    position: 'absolute',
    width: 174,
    height: 174,
    right: 12,
    top: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationHalo: {
    position: 'absolute',
    width: 164,
    height: 164,
    borderRadius: 82,
    backgroundColor: 'rgba(222, 235, 200, 0.09)',
  },
  illustrationPlate: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: colors.yellow,
    borderWidth: 8,
    borderColor: '#F2D98A',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-9deg' }],
  },
  illustrationLeaf: {
    position: 'absolute',
    right: 9,
    bottom: 17,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#D7E8C8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  intro: {
    paddingTop: 36,
    paddingBottom: 17,
  },
  sectionEyebrow: {
    color: colors.green,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 23,
    lineHeight: 29,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  sectionDescription: {
    maxWidth: 520,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 7,
  },
  steps: {
    gap: 10,
  },
  stepCard: {
    minHeight: 84,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
  },
  stepIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCopy: {
    flex: 1,
  },
  stepNumber: {
    color: colors.green,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  stepTitle: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 3,
  },
  stepDescription: {
    color: colors.muted,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 3,
  },
  communityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
    padding: 16,
    borderRadius: 19,
    backgroundColor: '#E9EEE2',
  },
  communityIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#F9F8F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  communityCopy: {
    flex: 1,
  },
  communityTitle: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '800',
  },
  communityDescription: {
    color: colors.muted,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },
  communityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 8,
    paddingLeft: 3,
  },
  communityButtonText: {
    color: colors.green,
    fontSize: 10,
    fontWeight: '800',
  },
  footerText: {
    color: '#899187',
    fontSize: 9,
    textAlign: 'center',
    marginTop: 22,
  },
  pressed: {
    opacity: 0.72,
  },
  pressedButton: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
});

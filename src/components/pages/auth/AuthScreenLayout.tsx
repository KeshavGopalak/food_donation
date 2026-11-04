import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';

type Props = {
  activePage: 'Login' | 'Register';
  children: ReactNode;
};

type Navigation = NativeStackNavigationProp<RootStackParamList>;

function MissionPanel({ compact }: { compact?: boolean }) {
  return (
    <View style={[styles.missionPanel, compact && styles.compactMissionPanel]}>
      <View style={styles.missionContent}>
        <View style={styles.missionEyebrow}>
          <View style={styles.missionDot} />
          <Text style={styles.eyebrow}>OUR MISSION</Text>
        </View>
        <Text style={styles.missionTitle}>
          Bridging the gap between surplus and scarcity.
        </Text>
        <Text style={styles.missionCopy}>
          Empowering communities through efficient logistics and compassionate
          distribution. We turn food waste into food security for thousands
          every day.
        </Text>
      </View>
    </View>
  );
}

export default function AuthScreenLayout({ activePage, children }: Props) {
  const navigation = useNavigation<Navigation>();
  const { width } = useWindowDimensions();
  const isWide = width >= 760;

  const renderForm = () => (
    <View style={[styles.formPane, isWide && styles.wideFormPane]}>
      <View style={styles.formContent}>{children}</View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.brandGroup}>
          <View style={styles.brandMark}>
            <MaterialDesignIcons
              name="heart-pulse"
              size={20}
              color="#26734D"
            />
          </View>
          <View>
            <Text style={styles.brand}>Vitality Logistics</Text>
            <Text style={styles.brandCaption}>FOOD RESCUE NETWORK</Text>
          </View>
        </View>
        <View style={styles.navigation}>
          {(['Login', 'Register'] as const).map(page => (
            <Pressable
              key={page}
              onPress={() => navigation.navigate(page)}
              style={[
                styles.navigationButton,
                activePage === page && styles.activeNavigationButton,
              ]}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.navigationText,
                  activePage === page && styles.activeNavigationText,
                ]}
              >
                {page}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {isWide ? (
          <View style={styles.wideContent}>
            <ScrollView
              style={styles.formScroll}
              contentContainerStyle={styles.formScrollContent}
              keyboardShouldPersistTaps="handled"
            >
              {renderForm()}
            </ScrollView>
            <MissionPanel />
          </View>
        ) : (
          <ScrollView
            style={styles.mobileContent}
            contentContainerStyle={styles.mobileContentContainer}
            keyboardShouldPersistTaps="handled"
          >
            {renderForm()}
            <MissionPanel compact />
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F5EF',
  },
  keyboardAvoiding: {
    flex: 1,
  },
  header: {
    minHeight: 76,
    paddingHorizontal: 22,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  brandGroup: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 10,
  },
  brandMark: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#E2EDDF',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  brand: {
    color: '#1C2C25',
    fontSize: 15,
    fontWeight: '800' as const,
    letterSpacing: -0.2,
  },
  brandCaption: {
    color: '#26734D',
    fontSize: 8,
    fontWeight: '800' as const,
    letterSpacing: 1,
    marginTop: 3,
  },
  navigation: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  navigationButton: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 13,
  },
  activeNavigationButton: {
    backgroundColor: '#E9EEE2',
  },
  navigationText: {
    color: '#69766E',
    fontSize: 13,
  },
  activeNavigationText: {
    color: '#26734D',
    fontWeight: '600' as const,
  },
  wideContent: {
    flex: 1,
    flexDirection: 'row' as const,
  },
  formScroll: {
    flex: 1,
    backgroundColor: '#F7F5EF',
  },
  formScrollContent: {
    flexGrow: 1,
    justifyContent: 'center' as const,
    paddingVertical: 20,
  },
  formPane: {
    backgroundColor: '#F7F5EF',
  },
  wideFormPane: {
    flex: 1,
    justifyContent: 'center' as const,
    paddingHorizontal: 16,
  },
  formContent: {
    width: '100%' as const,
    maxWidth: 440,
    alignSelf: 'center' as const,
  },
  missionPanel: {
    flex: 1,
    backgroundColor: '#173F32',
    justifyContent: 'center' as const,
    margin: 18,
    borderRadius: 27,
    paddingHorizontal: 34,
    paddingVertical: 36,
  },
  compactMissionPanel: {
    flex: 0,
    minHeight: 215,
    marginTop: 0,
    marginHorizontal: 18,
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  missionContent: {
    width: '100%' as const,
    maxWidth: 490,
    alignSelf: 'center' as const,
  },
  missionEyebrow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    marginBottom: 19,
  },
  missionDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#E8C968',
  },
  eyebrow: {
    color: '#C6E2C5',
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 1,
  },
  missionTitle: {
    color: '#FFFEFB',
    fontSize: 29,
    lineHeight: 37,
    fontWeight: '800' as const,
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  missionCopy: {
    color: '#D5E4D9',
    fontSize: 14,
    lineHeight: 22,
  },
  mobileContent: {
    flex: 1,
    backgroundColor: '#F7F5EF',
  },
  mobileContentContainer: {
    flexGrow: 1,
    paddingBottom: 18,
  },
};

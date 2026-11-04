import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { useAuth } from '../../../tanstack/auth/AuthContext';
import {
  getAccountRole,
  getVolunteerReviewState,
} from '../../../tanstack/services/authServices';
import { profileService } from '../../../tanstack/services/profileServices';

type Navigation = NativeStackNavigationProp<
  RootStackParamList,
  'AccountPending'
>;

export default function AccountPendingScreen() {
  const navigation = useNavigation<Navigation>();
  const { token, setToken } = useAuth();
  const [isChecking, setIsChecking] = useState(false);
  const [message, setMessage] = useState('');

  const checkStatus = async () => {
    if (!token) {
      setMessage('Your session has expired. Please sign in again.');
      return;
    }

    setIsChecking(true);
    setMessage('');
    try {
      const profile = await profileService.getProfile(token);
      const role = getAccountRole(profile);
      if (
        role === 'donor' ||
        (role === 'volunteer' &&
          getVolunteerReviewState(profile) === 'approved')
      ) {
        navigation.replace('UserDashboard');
        return;
      }

      setMessage(
        'Your profile is still awaiting approval. Please check again later.',
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Unable to check your status. Please try again.',
      );
    } finally {
      setIsChecking(false);
    }
  };

  const logOut = async () => {
    try {
      await setToken(null);
      navigation.replace('Login');
    } catch (error) {
      setMessage(
        error instanceof Error
          ? `Unable to log out: ${error.message}`
          : 'Unable to log out. Please try again.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>Vitality Logistics</Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>✓</Text>
        </View>
        <Text style={styles.title}>Account Approval Pending</Text>
        <Text style={styles.description}>
          An admin needs to verify your volunteer profile before you can log in.
          We&apos;ll take you to your dashboard as soon as your account is
          approved.
        </Text>

        {message ? (
          <Text style={styles.message} accessibilityRole="alert">
            {message}
          </Text>
        ) : null}

        <Pressable
          style={[styles.primaryButton, isChecking && styles.disabledButton]}
          disabled={isChecking}
          onPress={checkStatus}
          accessibilityRole="button"
        >
          {isChecking ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>Check Status</Text>
          )}
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={logOut}
          accessibilityRole="button"
        >
          <Text style={styles.secondaryButtonText}>
            Log Out / Back to Login
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    minHeight: 66,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E7EC',
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  brand: {
    color: '#087657',
    fontSize: 19,
    fontWeight: '700',
  },
  content: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6F4EF',
  },
  icon: {
    color: '#087657',
    fontSize: 31,
    fontWeight: '700',
  },
  title: {
    color: '#172033',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    color: '#667085',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
  },
  message: {
    color: '#475467',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  primaryButton: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#087657',
  },
  disabledButton: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#D5DBE5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#344054',
    fontSize: 15,
    fontWeight: '600',
  },
});

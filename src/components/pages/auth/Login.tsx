import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AuthScreenLayout from './AuthScreenLayout';
import { AuthStyles as styles } from '../../../styles/AuthStyles';
import { RootStackParamList } from '../../../navigation/types';
import { useLogin } from '../../../tanstack/hooks/useLogin';
import { useAuth } from '../../../tanstack/auth/AuthContext';
import {
  getVolunteerReviewState,
  getAuthToken,
} from '../../../tanstack/services/authServices';
import { profileService } from '../../../tanstack/services/profileServices';

type Navigation = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
  const navigation = useNavigation<Navigation>();
  const { setToken } = useAuth();
  const { mutateAsync: login, isPending } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');
    if (!email.trim() || !password) {
      setErrorMessage('Enter your email address and password.');
      return;
    }

    try {
      const loginResponse = await login({
        email: email.trim(),
        password,
      });
      const token = getAuthToken(loginResponse);
      if (!token) {
        setErrorMessage(
          'The login response did not include an authentication token.',
        );
        return;
      }

      await setToken(token);
      let profile: unknown;
      try {
        profile = await profileService.getProfile(token);
      } catch (error) {
        if (getVolunteerReviewState(loginResponse) === 'pending') {
          navigation.replace('AccountPending');
          return;
        }
        await setToken(null);
        throw error;
      }

      if (
        getVolunteerReviewState(loginResponse) === 'pending' ||
        getVolunteerReviewState(profile) === 'pending'
      ) {
        navigation.replace('AccountPending');
        return;
      }

      navigation.replace('UserDashboard');
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to sign in. Please try again.',
      );
    }
  };

  return (
    <AuthScreenLayout activePage="Login">
      <View style={styles.form}>
        <View style={styles.formEyebrow}>
          <View style={styles.formEyebrowDot} />
          <Text style={styles.formEyebrowText}>WELCOME TO THE FOOD LOOP</Text>
        </View>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Please enter your details to access your dashboard.
        </Text>

        <View style={styles.fieldGroup}>
          <View style={styles.field}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              accessibilityLabel="Email Address"
              placeholder="you@example.com"
              placeholderTextColor="#98A2B3"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              returnKeyType="next"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              accessibilityLabel="Password"
              placeholder="Password"
              placeholderTextColor="#98A2B3"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="password"
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />
          </View>
        </View>

        <View style={styles.optionsRow}>
          <Pressable
            style={styles.rememberRow}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: rememberMe }}
            onPress={() => setRememberMe(value => !value)}
          >
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxActive]}
            />
            <Text style={styles.helperText}>Remember me</Text>
          </Pressable>
          <Text style={styles.linkText}>Forgot password?</Text>
        </View>

        {errorMessage ? (
          <Text style={styles.errorText} accessibilityRole="alert">
            {errorMessage}
          </Text>
        ) : null}

        <TouchableOpacity
          style={[
            styles.primaryButton,
            isPending && styles.primaryButtonDisabled,
          ]}
          activeOpacity={0.8}
          disabled={isPending}
          onPress={handleLogin}
        >
          <Text style={styles.primaryButtonText}>
            {isPending ? 'Signing in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert(
              'Google sign-in unavailable',
              'Google sign-in has not been configured for this app yet.',
            )
          }
        >
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.helperText}>Don&apos;t have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </AuthScreenLayout>
  );
}

import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AuthScreenLayout from './AuthScreenLayout';
import { AuthStyles as styles } from '../../../styles/AuthStyles';
import { RootStackParamList } from '../../../navigation/types';
import { useAuth } from '../../../tanstack/auth/AuthContext';
import {
  authService,
  getAuthToken,
  getVolunteerReviewState,
} from '../../../tanstack/services/authServices';
import { profileService } from '../../../tanstack/services/profileServices';

type Role = 'Donor' | 'Volunteer';
type Navigation = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function Register() {
  const navigation = useNavigation<Navigation>();
  const { setToken } = useAuth();
  const [role, setRole] = useState<Role>('Donor');
  const [isRolePickerVisible, setRolePickerVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    setErrorMessage('');
    if (!name.trim() || !email.trim() || !password) {
      setErrorMessage('Complete all fields to create your account.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const registrationResponse = await authService.register({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
      });
      const token = getAuthToken(registrationResponse);
      if (!token) {
        Alert.alert(
          'Account created',
          'Your account is ready. Sign in to continue.',
        );
        navigation.replace('Login');
        return;
      }

      await setToken(token);
      let profile: unknown;
      try {
        profile = await profileService.getProfile(token);
      } catch (error) {
        if (getVolunteerReviewState(registrationResponse) === 'pending') {
          navigation.replace('AccountPending');
          return;
        }
        await setToken(null);
        throw error;
      }

      if (
        getVolunteerReviewState(registrationResponse) === 'pending' ||
        getVolunteerReviewState(profile) === 'pending'
      ) {
        navigation.replace('AccountPending');
      } else {
        navigation.replace('UserDashboard');
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to create your account. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthScreenLayout activePage="Register">
      <View style={styles.form}>
        <View style={styles.formEyebrow}>
          <View style={styles.formEyebrowDot} />
          <Text style={styles.formEyebrowText}>JOIN YOUR LOCAL FOOD LOOP</Text>
        </View>
        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.subtitle}>
          Sign up to get started with your food donation dashboard.
        </Text>

        <View style={styles.fieldGroup}>
          <View style={styles.field}>
            <Text style={styles.label}>Account type</Text>
            <Pressable
              style={styles.selector}
              onPress={() => setRolePickerVisible(true)}
              accessibilityRole="button"
              accessibilityLabel={`Account type, ${role}`}
            >
              <Text style={styles.selectorText}>
                {role === 'Donor' ? 'Donor / User' : role}
              </Text>
              <Text style={styles.selectorIcon}>⌄</Text>
            </Pressable>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={[styles.input, styles.inputWhite]}
              accessibilityLabel="Full name"
              placeholder="Your name"
              placeholderTextColor="#98A2B3"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              textContentType="name"
              returnKeyType="next"
            />
          </View>

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
              textContentType="newPassword"
              returnKeyType="done"
              onSubmitEditing={handleRegister}
            />
          </View>
        </View>

        {errorMessage ? (
          <Text style={styles.errorText} accessibilityRole="alert">
            {errorMessage}
          </Text>
        ) : null}

        <TouchableOpacity
          style={[
            styles.primaryButton,
            isSubmitting && styles.primaryButtonDisabled,
          ]}
          activeOpacity={0.8}
          disabled={isSubmitting}
          onPress={handleRegister}
        >
          <Text style={styles.primaryButtonText}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.helperText}>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Sign in</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        visible={isRolePickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setRolePickerVisible(false)}
      >
        <Pressable
          style={styles.optionsOverlay}
          onPress={() => setRolePickerVisible(false)}
        >
          <View style={styles.optionsCard}>
            {(['Donor', 'Volunteer'] as const).map(option => (
              <Pressable
                key={option}
                style={styles.option}
                onPress={() => {
                  setRole(option);
                  setRolePickerVisible(false);
                }}
              >
                <Text style={styles.optionText}>
                  {option === 'Donor' ? 'Donor / User' : option}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </AuthScreenLayout>
  );
}

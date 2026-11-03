import React, { useState } from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import AntDesign from '@react-native-vector-icons/ant-design';
import { useLogin } from '../../../tanstack/hooks/useLogin';
import { LoginStyles } from '../../../styles/LoginStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../../tanstack/auth/AuthContext';
import { getAuthToken } from '../../../tanstack/services/authServices';

// 1. Define your navigation stack parameters
export type RootStackParamList = {
  Login: undefined;
  UserDashboard: undefined;
};

// 2. Define the navigation prop type for this screen
type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export default function Login() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { setToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing details', 'Enter your email and password.');
      return;
    }

    login(
      { email: email.trim(), password },
      {
        onSuccess: response => {
          const token = getAuthToken(response);
          if (!token) {
            Alert.alert(
              'Login failed',
              'The login response did not include an authentication token.',
            );
            return;
          }

          setToken(token);
          navigation.navigate('UserDashboard');
        },
        onError: error => {
          Alert.alert('Login failed', error.message);
        },
      },
    );
  };

  const { mutate: login, isPending } = useLogin();

  return (
    <SafeAreaView style={LoginStyles.container}>
      <View style={LoginStyles.content}>
        {/* Header */}
        <View style={LoginStyles.header}>
          <View style={LoginStyles.logoContainer}>
            <MaterialDesignIcons
              name="truck-fast-outline"
              size={28}
              color="#FFFFFF"
            />
          </View>

          <Text style={LoginStyles.title}>Vitality Logistics</Text>

          <Text style={LoginStyles.subtitle}>
            Welcome to the Vitality Logistics{'\n'}
            app! Please log in to continue.
          </Text>
        </View>

        {/* Login Card */}
        <View style={LoginStyles.loginCard}>
          {/* Email */}
          <View style={LoginStyles.inputSection}>
            <Text style={LoginStyles.label}>Email Address</Text>

            <View style={LoginStyles.inputContainer}>
              <MaterialDesignIcons
                name="email-outline"
                size={18}
                color="#586360"
                style={LoginStyles.inputIcon}
              />

              <TextInput
                style={LoginStyles.input}
                placeholder="user@example.com"
                placeholderTextColor="#7A8280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password */}
          <View style={LoginStyles.inputSection}>
            <View style={LoginStyles.passwordLabelRow}>
              <Text style={LoginStyles.label}>Password</Text>

              <TouchableOpacity activeOpacity={0.7}>
                <Text style={LoginStyles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View style={LoginStyles.inputContainer}>
              <MaterialDesignIcons
                name="lock-outline"
                size={18}
                color="#586360"
                style={LoginStyles.inputIcon}
              />

              <TextInput
                style={LoginStyles.input}
                placeholder="Password"
                placeholderTextColor="#7A8280"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />

              <Pressable
                style={LoginStyles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialDesignIcons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={19}
                  color="#586360"
                />
              </Pressable>
            </View>
          </View>

          {/* Keep Signed In */}
          <TouchableOpacity
            style={LoginStyles.keepSignedInRow}
            activeOpacity={0.7}
            onPress={() => setKeepSignedIn(!keepSignedIn)}
          >
            <View
              style={[
                LoginStyles.checkbox,
                keepSignedIn && LoginStyles.checkboxActive,
              ]}
            >
              {keepSignedIn && (
                <MaterialDesignIcons name="check" size={13} color="#FFFFFF" />
              )}
            </View>

            <Text style={LoginStyles.keepSignedInText}>Keep me signed in</Text>
          </TouchableOpacity>

          {/* Sign In */}
          <TouchableOpacity
            style={LoginStyles.signInButton}
            activeOpacity={0.85}
            disabled={isPending}
            onPress={handleLogin}
          >
            <Text style={LoginStyles.signInText}>
              {isPending ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={LoginStyles.dividerContainer}>
            <View style={LoginStyles.dividerLine} />

            <Text style={LoginStyles.dividerText}>OR CONTINUE WITH</Text>

            <View style={LoginStyles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={LoginStyles.socialButtons}>
            <TouchableOpacity
              style={LoginStyles.socialButton}
              activeOpacity={0.8}
            >
              <AntDesign name="google" size={18} color="#4285F4" />

              <Text style={LoginStyles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={LoginStyles.socialButton}
              activeOpacity={0.8}
            >
              <AntDesign name="google" size={18} color="#4285F4" />

              <Text style={LoginStyles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Register */}
        <View style={LoginStyles.registerContainer}>
          <Text style={LoginStyles.registerText}>Don't have an account?</Text>

          <TouchableOpacity activeOpacity={0.7}>
            <Text style={LoginStyles.registerButton}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
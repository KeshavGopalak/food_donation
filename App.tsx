/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Login from './src/components/pages/auth/Login.tsx';
import Providers from './src/tanstack/providers/queryProvider.tsx';
import { Children } from 'react';
import UserDashboard from './src/components/pages/userdb/UserDashboard.tsx';
import UserDonation from './src/components/pages/userdb/UserDonation.tsx';
import UserProfile from './src/components/pages/userdb/UserProfile.tsx';
const RootStack = createNativeStackNavigator({
  screens: {
    
    Login: {
      screen: Login,


      options: {
        headerShown: false,
      },
      
    },
    UserDashboard: {
      
      screen: UserDashboard,options: {
        headerShown: false,
      },
    },
    UserDonation: {
      screen: UserDonation
    },
    UserProfile: {
      screen: UserProfile
    }
  },
});

const Navigation = createStaticNavigation(RootStack);
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      {' '}
      <Providers>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Navigation />
      </Providers>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

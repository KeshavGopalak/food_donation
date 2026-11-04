/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/components/pages/home/HomeScreen.tsx';
import Login from './src/components/pages/auth/Login.tsx';
import Register from './src/components/pages/auth/Register.tsx';
import AccountPendingScreen from './src/components/pages/auth/AccountPendingScreen.tsx';
import Providers from './src/tanstack/providers/queryProvider.tsx';
import UserDashboard from './src/components/pages/userdb/UserDashboard.tsx';
import UserDonation from './src/components/pages/userdb/UserDonation.tsx';
import UserProfile from './src/components/pages/userdb/UserProfile.tsx';
import { AuthProvider } from './src/tanstack/auth/AuthContext';
const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        headerShown: false,
      },
    },
    Login: {
      screen: Login,
      options: {
        headerShown: false,
      },
    },
    Register: {
      screen: Register,
      options: {
        headerShown: false,
      },
    },
    AccountPending: {
      screen: AccountPendingScreen,
      options: {
        headerShown: false,
      },
    },
    UserDashboard: {
      screen: UserDashboard,
      options: {
        headerShown: false,
      },
    },
    UserDonation: {
      screen: UserDonation,
      options: {
        headerShown: false,
      },
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
      <AuthProvider>
        <Providers>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Navigation />
        </Providers>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;

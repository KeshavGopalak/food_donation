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

import Login from './src/components/pages/auth/Login.tsx';
import Providers from './src/tanstack/providers/queryProvider.tsx';
import UserDashboard from './src/components/pages/userdb/UserDashboard.tsx';
import UserDonation from './src/components/pages/userdb/UserDonation.tsx';
import UserProfile from './src/components/pages/userdb/UserProfile.tsx';
import { AuthProvider } from './src/tanstack/auth/AuthContext';
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

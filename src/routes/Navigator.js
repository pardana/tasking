import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, SignIn, SignUp, SplashScreen} from '../screens';
import RNBootSplash from 'react-native-bootsplash';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide({fade: true})}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarTranslucent: true,
          statusBarColor: 'transparent',
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Background} from '../components/screens';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

export default function SplashScreen({navigation}) {
  const refreshToken = async () => {
    try {
      const credential = await EncryptedStorage.getItem('user_credential');
      if (credential) {
        const response = await axios.post(
          'https://todo-api-omega.vercel.app/api/v1/auth/login',
          JSON.parse(credential),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        navigation.replace('Home', {token: response?.data?.user?.token});
      } else {
        navigation.replace('SignIn');
      }
    } catch (error) {
      console.log(error);
      navigation.replace('SignIn');
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <View style={styles.container}>
      <Background />
      <Image
        source={require('../assets/images/app_logo.png')}
        style={{width: 150, height: 150}}
      />
      <Text style={styles.textVersion}>v0.0.1-alpha-rc</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textVersion: {
    color: 'white',
    fontFamily: 'HelveticaNeue-MediumExt',
    position: 'absolute',
    bottom: 5,
    fontSize: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

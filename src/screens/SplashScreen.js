import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Background} from '../components/screens';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignIn');
    }, 3000);
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

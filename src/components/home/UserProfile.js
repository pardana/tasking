import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function UserProfile({token, navigation}) {
  const [username, setUsername] = useState('Pengguna');

  const getUserData = async () => {
    try {
      const response = await axios.get(
        'https://todo-api-omega.vercel.app/api/v1/profile',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUsername(response?.data?.user?.username);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await EncryptedStorage.removeItem('user_credential');
      navigation.replace('SignIn');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.viewProfile}>
      <Text style={styles.textDefault}>
        Hi, <Text style={styles.textUserName}>{username}</Text>
      </Text>
      <TouchableNativeFeedback useForeground onPress={() => logout()}>
        <Icon name="logout" color={'#9A4242'} size={30} />
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  textUserName: {
    color: 'white',
    fontFamily: 'HelveticaNeueBold',
    fontSize: 22,
  },
  viewProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 20,
  },
  textDefault: {
    color: 'white',
    fontFamily: 'HelveticaNeueMedium',
  },
});

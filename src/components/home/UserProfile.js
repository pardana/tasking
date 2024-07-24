import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function UserProfile({token}) {
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

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.viewProfile}>
      <>
        <Text style={styles.textDefault}>
          Hi, <Text style={styles.textUserName}>{username}</Text>
        </Text>
      </>
      <Icon name="account-circle" color={'white'} size={50} />
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

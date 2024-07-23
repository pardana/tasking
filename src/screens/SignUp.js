import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import {Background, Gap} from '../components/screens';

export default function SignUp() {
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [rememberUser, setRememberUser] = useState(false);

  //FORM DATA
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitSignUp = () => {
    console.log({username, email, password, confirmPassword});
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  return (
    <View style={styles.container}>
      <Background />

      <View>
        <ScrollView>
          <View style={styles.viewContainer}>
            <Text style={styles.textTitle}>Sign Up</Text>
            <Gap height={15} />

            <View style={styles.viewSignUp}>
              {/* INPUT NAME */}
              <Text style={styles.textInputTitle}>Name</Text>
              <View style={styles.viewInput}>
                <Icon name="account" color={'black'} size={23} />
                <TextInput
                  placeholder="Your Name"
                  keyboardType="default"
                  autoCapitalize="none"
                  style={styles.input}
                  onChangeText={setUsername}
                />
              </View>

              <Gap height={20} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewInput: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    borderRadius: 50 / 2,
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 5,
  },
  textInputTitle: {
    color: 'white',
    fontFamily: 'HelveticaNeueMedium',
    marginBottom: 5,
  },
  viewSignUp: {
    backgroundColor: '#ffffff4d',
    width: '95%',
    borderRadius: 20,
    padding: 30,
  },
  textTitle: {
    color: 'white',
    fontFamily: 'HelveticaNeueHeavy',
    fontSize: 27,
  },
  viewContainer: {
    alignSelf: 'center',
    maxWidth: 480,
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
  },
});

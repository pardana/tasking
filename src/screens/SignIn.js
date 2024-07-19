import {
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Background, Gap} from '../components/screens';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';

export default function SignIn({navigation}) {
  const [securePassword, setSecurePassword] = useState(true);
  const [rememberUser, setRememberUser] = useState(false);

  //FORM DATA
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitSignIn = () => {
    console.log({email, password});
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.viewContainer}>
        <Text style={styles.textTitle}>Sign In</Text>
        <Gap height={15} />

        <View style={styles.viewSignIn}>
          {/* INPUT EMAIL */}
          <Text style={styles.textInputTitle}>Email</Text>
          <View style={styles.viewInput}>
            <Icon name={'gmail'} color={'black'} size={23} />
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              onChangeText={setEmail}
            />
          </View>

          <Gap height={20} />

          <Text style={styles.textInputTitle}>Password</Text>
          <View style={styles.viewInput}>
            <Icon name={'lock'} color={'black'} size={23} />
            <TextInput
              placeholder="Password"
              secureTextEntry={securePassword}
              autoCapitalize="none"
              style={styles.input}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setSecurePassword(!securePassword)}>
              <Icon
                name={securePassword ? 'eye-off' : 'eye'}
                size={23}
                color={'black'}
              />
            </TouchableOpacity>
          </View>

          {/* REMEMBER ME */}
          <View style={styles.viewRememberMe}>
            <CheckBox
              tintColors={{true: 'white', false: 'white'}}
              value={rememberUser}
              onValueChange={() => setRememberUser(!rememberUser)}
            />
            <Text
              style={styles.plainText}
              onPress={() => setRememberUser(!rememberUser)}>
              Remember Me
            </Text>
          </View>

          <Gap height={20} />

          {/* SIGNIN & SIGNUP */}
          <TouchableNativeFeedback
            useForeground={true}
            onPress={() => submitSignIn()}>
            <View style={styles.btnSubmit}>
              <Text style={styles.textBtnTitle}>Sign in</Text>
            </View>
          </TouchableNativeFeedback>

          <Gap height={10} />

          <TouchableNativeFeedback
            useForeground={true}
            onPress={() => navigation.navigate('SignUp')}>
            <View
              style={{
                ...styles.btnSubmit,
                backgroundColor: '#9A4242',
                width: 150,
              }}>
              <Text style={styles.textBtnTitle}>Sign up</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textBtnTitle: {
    color: 'white',
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 16,
  },
  btnSubmit: {
    height: 45,
    width: 230,
    backgroundColor: '#00677E',
    borderRadius: 45 / 2,
    elevation: 3,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  plainText: {
    color: 'white',
    fontFamily: 'HelveticaNeue-Medium',
  },
  viewRememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 15,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    fontFamily: 'HelveticaNeue-Medium',
    color: 'black',
  },
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
    fontSize: 16,
    fontFamily: 'HelveticaNeue-Medium',
    marginBottom: 5,
  },
  viewSignIn: {
    backgroundColor: '#ffffff4d',
    width: '95%',
    borderRadius: 20,
    padding: 30,
  },
  textTitle: {
    color: 'white',
    fontSize: 27,
    fontFamily: 'HelveticaNeue-Heavy',
  },
  viewContainer: {
    maxWidth: '480',
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});

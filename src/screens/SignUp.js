import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import {Background, Gap} from '../components/screens';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function SignUp({navigation}) {
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [rememberUser, setRememberUser] = useState(false);
  const [loading, setLoading] = useState(false);

  //FORM DATA
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitSignUp = () => {
    setLoading(true);
    fetch('https://todo-api-omega.vercel.app/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        setLoading(false);
        if (json?.status == 'success') {
          rememberUser &&
            EncryptedStorage.setItem(
              'user_credential',
              JSON.stringify({email, password}),
            );
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        } else {
          console.log(json);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
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

              {/* INPUT EMAIL */}
              <Text style={styles.textInputTitle}>Email</Text>
              <View style={styles.viewInput}>
                <Icon name="gmail" color={'black'} size={23} />
                <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                  onChangeText={setEmail}
                />
              </View>

              <Gap height={20} />

              {/* INPUT PASSWORD */}
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
                    color={'black'}
                    size={23}
                  />
                </TouchableOpacity>
              </View>

              <Gap height={20} />

              {/* INPUT CONFIRM PASSWORD */}
              <Text style={styles.textInputTitle}>Confirm Password</Text>
              <View style={styles.viewInput}>
                <Icon name={'lock'} color={'black'} size={23} />
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry={secureConfirmPassword}
                  autoCapitalize="none"
                  style={styles.input}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() =>
                    setSecureConfirmPassword(!secureConfirmPassword)
                  }>
                  <Icon
                    name={secureConfirmPassword ? 'eye-off' : 'eye'}
                    color={'black'}
                    size={23}
                  />
                </TouchableOpacity>
              </View>

              {/* REMEMBER ME */}
              <View style={styles.viewRememberMe}>
                <CheckBox
                  tintColors={{false: 'white', true: 'white'}}
                  value={rememberUser}
                  onValueChange={() => setRememberUser(!rememberUser)}
                />
                <Text
                  style={styles.plainText}
                  onPress={() => setRememberUser(!rememberUser)}>
                  Remember me
                </Text>
              </View>

              <Gap height={20} />

              {/* SUBMIT & REGISTER */}
              <TouchableNativeFeedback
                useForeground
                onPress={() => submitSignUp()}>
                <View style={styles.btnSubmit}>
                  {loading ? (
                    <ActivityIndicator color={'white'} />
                  ) : (
                    <Text style={styles.textBtnSubmit}>Register</Text>
                  )}
                </View>
              </TouchableNativeFeedback>

              <Gap height={10} />

              <TouchableNativeFeedback
                useForeground
                onPress={() => navigation.goBack()}>
                <View
                  style={{
                    ...styles.btnSubmit,
                    backgroundColor: '#9A4242',
                    width: 150,
                  }}>
                  <Text style={styles.textBtnSubmit}>Back</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textBtnSubmit: {
    color: 'white',
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'HelveticaNeueMedium',
    fontSize: 16,
  },
  btnSubmit: {
    height: 45,
    width: 230,
    backgroundColor: '#00677E',
    borderRadius: 45 / 2,
    elevation: 3,
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  plainText: {
    color: 'white',
    fontFamily: 'HelveticaNeueMedium',
  },
  viewRememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    fontFamily: 'HelveticaNeueMedium',
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

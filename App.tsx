import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CheckBox from '@react-native-community/checkbox';


function App(): React.JSX.Element {
  const [done, setDone] = useState(false)

  return (
    <View>
      <Text>App</Text>
      <Icon name={'trash-can'} size={43} color='tomato' />
      <CheckBox value={done} onValueChange={() => setDone(!done)} />
    </View>
  )
}

const styles = StyleSheet.create({

});

export default App;

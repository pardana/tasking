import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


function App(): React.JSX.Element {


  return (
    <View>
      {/* <Text>App</Text> */}
      <Icon name={'trash-can'} size={43} color='tomato' />
    </View>
  )
}

const styles = StyleSheet.create({

});

export default App;

import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CheckBox from '@react-native-community/checkbox';


function App(): React.JSX.Element {
  const [modalVisible, setModalVisible] = useState(false)
  const [tasks, setTasks] = useState([
    {
      title: 'Belajar React Native',
      done: false,
      id: 0
    }
  ])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={'#330074'} />

      {/* HEADER */}
      <View style={styles.viewHeader}>
        <Icon name={'notebook'} size={27} color={'#fff'} />
        <Text style={styles.textHeaderTitle}>Tasking App</Text>
      </View>


      {/* INPUT TUGAS */}
      <View style={styles.viewInput}>
        <View style={styles.viewTextInput}>
          <TextInput placeholder='Buat tugas...' />
        </View>
        <View style={{ width: 20 }}>
          <TouchableOpacity style={styles.btnAddTask}>
            <Icon name={'plus'} size={27} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>


      {/* RENDER TUGAS */}
      {tasks.length == 0 && (
        <Text style={{ textAlign: 'center' }}>Tidak ada tugas</Text>
      )}
      {tasks.length != 0 && (
        tasks.map((task) => {
          return (
            <View key={task.id} style={styles.viewTask}>
              <CheckBox value={task.done} />
              <View style={styles.viewTaskContent}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <View style={styles.line} />

                <View>
                  <TouchableOpacity style={{ ...styles.btnOption, backgroundColor: '#6600E7' }} onPress={() => setModalVisible(true)}>
                    <Icon name={'pencil'} size={21} color={'#fff'} />
                  </TouchableOpacity>
                  <View style={{ height: 10 }} />
                  <TouchableOpacity style={{ ...styles.btnOption, backgroundColor: 'tomato' }}>
                    <Icon name={'trash-can'} size={21} color={'#fff'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        })
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  textHeaderTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 10,
  },
  viewHeader: {
    backgroundColor: '#6600E7',
    height: 50,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  modalBackdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.2,
  },
  textBtnEdit: {
    color: 'white',
    fontWeight: '500',
    fontSize: 17,
  },
  btnEditTask: {
    backgroundColor: '#6600E7',
    height: 40,
    width: 120,
    alignSelf: 'center',
    borderRadius: 5,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    elevation: 5,
    padding: 20,
    borderRadius: 20,
  },
  modalAlignment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOption: {
    width: 35,
    height: 35,
    borderRadius: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    backgroundColor: 'black',
    width: StyleSheet.hairlineWidth,
    height: 35,
    marginHorizontal: 15,
  },
  taskTitle: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
    flex: 1,
  },
  viewTaskContent: {
    backgroundColor: 'white',
    elevation: 5,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginLeft: 15,
  },
  viewTask: {
    flexDirection: 'row',
    margin: 20,
    marginTop: 5,
    alignItems: 'center',
  },
  btnAddTask: {
    backgroundColor: '#6600E7',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  viewTextInput: {
    height: 50,
    backgroundColor: '#ECECEC',
    borderRadius: 50 / 2,
    flex: 0.9,
    elevation: 3,
    paddingHorizontal: 20,
  },
  viewInput: {
    flexDirection: 'row',
    margin: 20,
  },
});

export default App;

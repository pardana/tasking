import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const createTask = () => {
    setTasks(tasks => {
      return [{title: newTask, id: tasks.length + 1, done: false}, ...tasks];
    });
    setNewTask('');
  };

  const deleteTask = id => {
    setTasks(tasks => {
      return tasks.filter(task => task.id != id);
    });
  };

  const [editedTask, setEditedTask] = useState({
    title: '',
    done: false,
    id: null,
  });

  const editTask = () => {
    setTasks(tasks => {
      return tasks.map(task => {
        return task.id === editedTask.id
          ? {...task, title: editedTask.title}
          : task;
      });
    });

    setModalVisible(false);
  };

  const checkTask = selectedId => {
    setTasks(tasks => {
      return tasks.map(task => {
        return task.id === selectedId ? {...task, done: !task.done} : task;
      });
    });
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#330074'} />

      {/* HEADER */}
      <View style={styles.viewHeader}>
        <Icon name={'notebook'} size={27} color={'#fff'} />
        <Text style={styles.textHeaderTitle}>Tasking App</Text>
      </View>

      {/* INPUT TUGAS */}
      <View style={styles.viewInput}>
        <View style={styles.viewTextInput}>
          <TextInput
            placeholder="Buat tugas..."
            value={newTask}
            onChangeText={setNewTask}
          />
        </View>
        <View style={{width: 20}}>
          <TouchableOpacity style={styles.btnAddTask} onPress={createTask}>
            <Icon name={'plus'} size={27} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* RENDER TUGAS */}
      {tasks.length === 0 && (
        <Text style={{textAlign: 'center'}}>Tidak ada tugas</Text>
      )}
      {tasks.length !== 0 &&
        tasks.map(task => {
          return (
            <View key={task.id} style={styles.viewTask}>
              <CheckBox
                value={task.done}
                onValueChange={() => checkTask(task.id)}
              />
              <View style={styles.viewTaskContent}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <View style={styles.line} />

                <View>
                  <TouchableOpacity
                    style={{...styles.btnOption, backgroundColor: '#6600E7'}}
                    onPress={() => {
                      setModalVisible(true);
                      setEditedTask(task);
                    }}>
                    <Icon name={'pencil'} size={21} color={'#fff'} />
                  </TouchableOpacity>
                  <View style={{height: 10}} />
                  <TouchableOpacity
                    style={{...styles.btnOption, backgroundColor: 'tomato'}}
                    onPress={() => deleteTask(task.id)}>
                    <Icon name={'trash-can'} size={21} color={'#fff'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}

      {/* MODAL EDIT TUGAS */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalAlignment}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setModalVisible(false)}
          />

          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Icon name={'notebook-edit'} size={27} color={'black'} />
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Edit Tugas
              </Text>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name={'close-circle-outline'} size={27} color={'black'} />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Edit Tugas..."
              underlineColorAndroid={'#330074'}
              style={{marginHorizontal: 30, paddingHorizontal: 10}}
              value={editedTask.title}
              onChangeText={taskTitle =>
                setEditedTask({...editedTask, title: taskTitle})
              }
            />

            <View style={{height: 10}} />
            <TouchableOpacity style={styles.btnEditTask} onPress={editTask}>
              <Text style={styles.textBtnEdit}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
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

import {
  ActivityIndicator,
  Alert,
  FlatList,
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import {Background, Gap, RenderItem} from '../components/screens';
import UserProfile from '../components/home/UserProfile';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function Home({route}) {
  const token = route?.params?.token;
  const [openDetail, setOpenDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    setLoading(true);
    fetch('https://todo-api-omega.vercel.app/api/v1/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        setLoading(false);
        if (json?.status == 'success') {
          setTasks(json?.data?.todos);
        } else {
          console.log(json);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  //ADD MODAL
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const closeModalAdd = () => {
    setModalAddVisible(false);
  };

  const addTask = () => {
    setLoadingAdd(true);
    fetch('https://todo-api-omega.vercel.app/api/v1/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        desc: description,
        checked: false,
      }),
    })
      .then(response => response.json())
      .then(json => {
        setLoadingAdd(false);
        if (json?.status == 'success') {
          getTasks();
          setModalAddVisible(false);
        } else {
          console.log(json);
        }
      })
      .catch(error => {
        setLoadingAdd(false);
        console.error(error);
      });
  };

  //EDIT MODAL
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [editedTask, setEditedTask] = useState({
    _id: null,
    title: '',
    desc: '',
    checked: false,
  });

  const closeModalEdit = () => {
    setModalEditVisible(false);
  };

  const updateTask = () => {
    console.log('Edit Task: ', editedTask);
    setLoadingEdit(true);
    fetch(`https://todo-api-omega.vercel.app/api/v1/todos/${editedTask._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedTask),
    })
      .then(response => response.json())
      .then(json => {
        setLoadingEdit(false);
        if (json?.status == 'success') {
          getTasks();
          setModalEditVisible(false);
        } else {
          console.log(json);
        }
      })
      .catch(error => {
        setLoadingEdit(false);
        console.error(error);
      });
  };

  //DELETE TASK
  const [loadingDelete, setLoadingDelete] = useState(false);
  const confirmDelete = id => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
      },
      {
        text: 'OK',
        onPress: () => deleteTask(id),
      },
    ]);
  };

  const deleteTask = id => {
    fetch(`https://todo-api-omega.vercel.app/api/v1/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json?.status == 'success') {
          getTasks();
        } else {
          console.log(json);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const checklistTask = task => {
    fetch(`https://todo-api-omega.vercel.app/api/v1/todos/${task._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        checked: !task.checked,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json?.status == 'success') {
          getTasks();
        } else {
          console.log(json);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Background />

      {/* USER FPROFILE */}
      <UserProfile token={token} />

      <View style={styles.viewLine} />

      {/* VIEW DATA */}
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index}
        refreshing={loading}
        onRefresh={() => getTasks()}
        ListFooterComponent={<Gap height={20} />}
        ListEmptyComponent={<Text style={styles.textEmpty}>No Data</Text>}
        renderItem={({item, index}) => {
          const handleOpenDetail = () => {
            LayoutAnimation.easeInEaseOut();
            setOpenDetail(index == openDetail ? null : index);
          };
          const open = openDetail == index;

          return (
            <RenderItem
              item={item}
              onCheckbox={() => checklistTask(item)}
              onPressDetail={handleOpenDetail}
              open={open}
              onPressDelete={() => confirmDelete(item?._id)}
              onPressEdit={() => {
                setModalEditVisible(true);
                setEditedTask(item);
              }}
            />
          );
        }}
      />

      {/* BUTTON ADD */}
      <View style={styles.viewLine} />
      <TouchableNativeFeedback
        useForeground
        onPress={() => setModalAddVisible(true)}>
        <View style={styles.btnAdd}>
          <Icon name="plus-circle-outline" color={'white'} size={20} />
          <Gap width={5} />
          <Text style={styles.textBtnTitle}>Tambah</Text>
        </View>
      </TouchableNativeFeedback>

      <Gap height={30} />

      {/* MODAL ADD */}
      <Modal
        visible={modalAddVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModalAdd}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.modalBackdrop} onPress={closeModalAdd} />
          <View style={styles.viewModalContainer}>
            <View style={styles.viewModalHeader}>
              <Icon name="notebook-plus-outline" size={30} color={'white'} />
              <Text style={{...styles.textDefault, fontSize: 20}}>
                Add Task
              </Text>
              <TouchableOpacity onPress={closeModalAdd}>
                <Icon name="close-circle-outline" size={30} color={'white'} />
              </TouchableOpacity>
            </View>

            <View style={styles.viewModalInput}>
              {/* INPUT TITLE */}
              <Text style={styles.textInputTitle}>
                Title <Text style={{color: 'red'}}>*</Text>
              </Text>
              <View style={styles.viewInput}>
                <Icon name="format-title" size={23} color={'black'} />
                <TextInput
                  placeholder="Title..."
                  style={{flex: 1, fontFamily: 'HelveticaNeueMedium'}}
                  onChangeText={setTitle}
                />
              </View>

              <Gap height={15} />

              {/* INPUT DESCRIPTION */}
              <Text style={styles.textInputTitle}>
                Description <Text style={{color: 'red'}}>*</Text>
              </Text>
              <View style={styles.viewInput}>
                <Icon name="text" size={23} color={'black'} />
                <TextInput
                  placeholder="Description..."
                  style={{flex: 1, fontFamily: 'HelveticaNeueMedium'}}
                  onChangeText={setDescription}
                />
              </View>

              <Gap height={30} />

              {/* BUTTON SUBMIT */}
              <TouchableNativeFeedback useForeground onPress={() => addTask()}>
                <View style={styles.btnSubmitAdd}>
                  {loadingAdd ? (
                    <ActivityIndicator color={'white'} />
                  ) : (
                    <Text style={styles.textBtnTitle}>Submit</Text>
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL EDIT */}
      <Modal
        visible={modalEditVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModalEdit}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.modalBackdrop} onPress={closeModalEdit} />
          <View style={styles.viewModalContainer}>
            <View style={styles.viewModalHeader}>
              <Icon name="notebook-edit-outline" size={30} color={'white'} />
              <Text style={{...styles.textDefault, fontSize: 20}}>
                Edit Task
              </Text>
              <TouchableOpacity onPress={closeModalEdit}>
                <Icon name="close-circle-outline" size={30} color={'white'} />
              </TouchableOpacity>
            </View>

            <View style={styles.viewModalInput}>
              {/* INPUT TITLE */}
              <Text style={styles.textInputTitle}>
                Title <Text style={{color: 'red'}}>*</Text>
              </Text>
              <View style={styles.viewInput}>
                <Icon name="format-title" size={23} color={'black'} />
                <TextInput
                  placeholder="Title..."
                  style={{flex: 1, fontFamily: 'HelveticaNeueMedium'}}
                  onChangeText={title => setEditedTask({...editedTask, title})}
                  value={editedTask.title}
                />
              </View>

              <Gap height={15} />

              {/* INPUT DESCRIPTION */}
              <Text style={styles.textInputTitle}>
                Description <Text style={{color: 'red'}}>*</Text>
              </Text>
              <View style={styles.viewInput}>
                <Icon name="text" size={23} color={'black'} />
                <TextInput
                  placeholder="Description..."
                  style={{flex: 1, fontFamily: 'HelveticaNeueMedium'}}
                  onChangeText={desc => setEditedTask({...editedTask, desc})}
                  value={editedTask.desc}
                />
              </View>

              <Gap height={30} />

              {/* BUTTON UPDATE */}
              <TouchableNativeFeedback
                useForeground
                onPress={() => updateTask()}>
                <View style={styles.btnSubmitAdd}>
                  {loadingEdit ? (
                    <ActivityIndicator color={'white'} />
                  ) : (
                    <Text style={styles.textBtnTitle}>Update</Text>
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  textBtnTitle: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'HelveticaNeueMedium',
    fontSize: 15,
  },
  btnSubmitAdd: {
    height: 45,
    width: 130,
    backgroundColor: '#00677E',
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: 45 / 2,
    elevation: 3,
    justifyContent: 'center',
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
  viewModalInput: {
    padding: 30,
  },
  viewModalHeader: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  viewModalContainer: {
    backgroundColor: '#164877',
    width: '85%',
    alignSelf: 'center',
    maxWidth: 400,
    borderRadius: 20,
    elevation: 5,
  },
  modalBackdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    color: 'white',
    textAlign: 'center',
  },
  textBtnTitle: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'HelveticaNeueMedium',
    fontSize: 16,
  },
  btnAdd: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#164877',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
    marginTop: -50,
    borderRadius: 50 / 2,
    elevation: 3,
    overflow: 'hidden',
  },
  viewLine: {
    width: '85%',
    height: 2,
    backgroundColor: 'white',
    alignSelf: 'center',
    transform: [{rotate: '-2deg'}],
    marginVertical: 20,
    marginBottom: 25,
  },
  textDefault: {
    color: 'white',
    fontFamily: 'HelveticaNeueMedium',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

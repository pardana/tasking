import {
  Alert,
  FlatList,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  UIManager,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Background,
  Gap,
  ModalAddTask,
  ModalEditTask,
  RenderItem,
} from '../components/screens';
import UserProfile from '../components/home/UserProfile';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function Home({route, navigation}) {
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
  const [desc, setDesc] = useState('');

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
        desc: desc,
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
    // console.log('Edit Task: ', editedTask);
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
    setLoadingDelete(true);
    fetch(`https://todo-api-omega.vercel.app/api/v1/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        setLoadingDelete(false);
        if (json?.status == 'success') {
          getTasks();
        } else {
          console.log(json);
        }
      })
      .catch(error => {
        setLoadingDelete(false);
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
      <UserProfile token={token} navigation={navigation} />

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
              loadingDelete={loadingDelete}
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
      <ModalAddTask
        visible={modalAddVisible}
        onRequestClose={closeModalAdd}
        onChangeTitle={setTitle}
        onChangeDesc={setDesc}
        onPressSubmit={() => addTask()}
        loadingAdd={loadingAdd}
      />

      {/* MODAL EDIT */}
      <ModalEditTask
        visible={modalEditVisible}
        onRequestClose={closeModalEdit}
        onChangeTitle={title => setEditedTask({...editedTask, title})}
        onChangeDesc={desc => setEditedTask({...editedTask, desc})}
        valueTitle={editedTask?.title}
        valueDesc={editedTask?.desc}
        onPressSubmit={() => updateTask()}
        loadingEdit={loadingEdit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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

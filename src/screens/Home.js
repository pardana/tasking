import {
  ActivityIndicator,
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
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import {Background, Gap} from '../components/screens';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const dummyData = [
    {
      id: 1,
      title: 'Task 1',
      description:
        'Deskripsi tugas satu yang sangat panjang sekali dan terlalu panjang',
      checked: false,
    },
    {
      id: 2,
      title: 'Task 2',
      description:
        'Deskripsi tugas dua yang sangat panjang sekali dan terlalu panjang',
      checked: true,
    },
    {
      id: 3,
      title: 'Task 3',
      description:
        'Deskripsi tugas tiga yang sangat panjang sekali dan terlalu panjang',
      checked: true,
    },
  ];

  //ADD MODAL
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const closeModalAdd = () => {
    setModalAddVisible(false);
  };

  const addTask = () => {
    console.log('Add Task: ', title, description);
  };

  //EDIT MODAL
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [editedTask, setEditedTask] = useState({
    id: null,
    title: '',
    description: '',
    checked: null,
  });

  const closeModalEdit = () => {
    setModalEditVisible(false);
  };

  const editTask = () => {
    console.log('Edit Task: ', editedTask);
  };

  const onPressSubmit = () => {
    console.log('Add Task: ', title, description);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      closeModalAdd();
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Background />

      {/* USER FPROFILE */}
      <View style={styles.viewProfile}>
        <>
          <Text style={styles.textDefault}>Hi, </Text>
          <Text style={styles.textUserName}>User Name</Text>
        </>
        <Icon name="account-circle" color={'white'} size={50} />
      </View>

      <View style={styles.viewLine} />

      {/* VIEW DATA */}
      <FlatList
        data={dummyData}
        keyExtractor={item => item.id}
        ListFooterComponent={<Gap height={20} />}
        ListEmptyComponent={<Text style={styles.textEmpty}>No Data</Text>}
        renderItem={({item, index}) => {
          const handleOpenDetail = () => {
            LayoutAnimation.easeInEaseOut();
            setOpenDetail(index == openDetail ? null : index);
          };
          const open = openDetail == index ? true : false;

          return (
            <View style={styles.viewItem}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <CheckBox
                  value={item.checked}
                  tintColors={{true: 'white', false: 'white'}}
                />

                <Text style={styles.textItemTitle}>{item.title}</Text>
                <TouchableNativeFeedback
                  useForeground
                  background={TouchableNativeFeedback.Ripple('#ffffff42')}
                  onPress={() => handleOpenDetail()}>
                  <View style={styles.btnDetail}>
                    <Icon
                      name={open ? 'chevron-up' : 'chevron-down'}
                      color={'white'}
                      size={30}
                    />
                  </View>
                </TouchableNativeFeedback>
              </View>

              {open && (
                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      ...styles.textDefault,
                      textAlign: 'justify',
                      lineHeight: 20,
                    }}>
                    {item.description}
                  </Text>
                  <View style={styles.viewBtnOption}>
                    <TouchableNativeFeedback useForeground>
                      <View style={styles.btnDelete}>
                        <Icon name="delete" color={'white'} size={20} />
                      </View>
                    </TouchableNativeFeedback>
                    <Gap width={10} />
                    <TouchableNativeFeedback
                      useForeground
                      onPress={() => {
                        setModalEditVisible(true);
                        setEditedTask(item);
                      }}>
                      <View style={styles.btnEdit}>
                        <Icon name="pencil" color={'white'} size={20} />
                        <Gap width={10} />
                        <Text style={styles.textDefault}>Edit</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
              )}
            </View>
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
                  onChangeText={text => setTitle(text)}
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
                  onChangeText={text => setDescription(text)}
                />
              </View>

              <Gap height={30} />

              {/* BUTTON SUBMIT */}
              <TouchableNativeFeedback
                useForeground
                onPress={() => onPressSubmit()}>
                <View style={styles.btnSubmitAdd}>
                  {loading ? (
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
                  onChangeText={text => setTitle(text)}
                  value={title}
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
                  onChangeText={text => setDescription(text)}
                  value={description}
                />
              </View>

              <Gap height={30} />

              {/* BUTTON SUBMIT */}
              <TouchableNativeFeedback
                useForeground
                onPress={() => onPressSubmit()}>
                <View style={styles.btnSubmitAdd}>
                  {loading ? (
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
  btnEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#164877',
    width: 80,
    borderRadius: 80 / 2,
  },
  btnDelete: {
    backgroundColor: '#9A4242',
    borderRadius: 50,
    padding: 8,
  },
  viewBtnOption: {
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  btnDetail: {
    marginLeft: 10,
    padding: 5,
  },
  textItemTitle: {
    color: 'white',
    fontFamily: 'HelveticaNeueMedium',
    fontSize: 22,
  },
  viewItem: {
    padding: 20,
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
  textUserName: {
    color: 'white',
    fontFamily: 'HelveticaNeueBold',
    fontSize: 18,
  },
  textDefault: {
    color: 'white',
    fontFamily: 'HelveticaNeueMedium',
  },
  viewProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

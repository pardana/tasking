import {
  FlatList,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
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
    </View>
  );
}

const styles = StyleSheet.create({
  textEmpty: {
    color: 'white',
    textAlign: 'center',
  },
  btnEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#00677E',
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

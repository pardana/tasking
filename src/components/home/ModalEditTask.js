import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React from 'react';
import Gap from '../screens/Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ModalEditTask({
  visible,
  onRequestClose,
  onChangeTitle,
  onChangeDesc,
  valueTitle,
  valueDesc,
  onPressSubmit,
  loadingEdit,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}>
      <View style={styles.modalContainer}>
        <Pressable style={styles.modalBackdrop} onPress={onRequestClose} />
        <View style={styles.viewModalContainer}>
          <View style={styles.viewModalHeader}>
            <Icon name="notebook-edit-outline" size={30} color={'white'} />
            <Text style={{...styles.textDefault, fontSize: 20}}>Edit Task</Text>
            <TouchableOpacity onPress={onRequestClose}>
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
                onChangeText={onChangeTitle}
                value={valueTitle}
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
                onChangeText={onChangeDesc}
                value={valueDesc}
              />
            </View>

            <Gap height={30} />

            {/* BUTTON UPDATE */}
            <TouchableNativeFeedback
              useForeground
              onPress={() => onPressSubmit()}>
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
  textDefault: {
    color: 'white',
    fontFamily: 'HelveticaNeueMedium',
  },
});

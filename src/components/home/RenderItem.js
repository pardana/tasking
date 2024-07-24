import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../screens';

export default function RenderTask({
  item,
  onCheckbox,
  onPressDetail,
  open,
  onPressEdit,
  onPressDelete,
}) {
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
          value={item?.checked}
          tintColors={{true: 'white', false: 'white'}}
          onValueChange={onCheckbox}
        />
        <Text style={styles.textItemTitle}>{item?.title}</Text>
        <TouchableNativeFeedback
          useForeground
          background={TouchableNativeFeedback.Ripple('#ffffff42')}
          onPress={onPressDetail}>
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
            {item?.desc}
          </Text>
          <View style={styles.viewBtnOption}>
            <TouchableNativeFeedback useForeground onPress={onPressDelete}>
              <View style={styles.btnDelete}>
                <Icon name="delete" color={'white'} size={20} />
              </View>
            </TouchableNativeFeedback>
            <Gap width={10} />
            <TouchableNativeFeedback useForeground onPress={onPressEdit}>
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
}

const styles = StyleSheet.create({
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
    fontSize: 18,
  },
  viewItem: {
    padding: 20,
  },
  textDefault: {
    color: 'white',
    fontFamily: 'HelveticaNeueMedium',
  },
});

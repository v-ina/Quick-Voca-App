import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const data = [
  { id: 'all', title: '내 리스트 전부 보기' },
  // { id: 'date', title: '특정 날짜 보기' },
  { id: 'unclearonly', title: '몰라요만 보기' },
  { id: 'favoriteonly', title: '즐겨찾기만 보기' },
];

const Item = ({ title, filter }) => (
  <TouchableOpacity onPress={filter}>
    <Text style={styles.filterTitle}>{title}</Text>
  </TouchableOpacity>
);

const ListFilterModal = ({ isVisible, hide, filter }) => {
  return (
    <Modal
      isVisible={isVisible}
      avoidKeyboard
      onBackdropPress={hide}
      onSwipeComplete={hide}
      swipeDirection="down"
    >
      <View style={styles.modalLayout}>
        <View style={styles.modalContent}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Item
                title={item.title}
                filter={() => filter(item.id)} // Pass filter option to the function
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ListFilterModal;

const styles = StyleSheet.create({
  modalLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    height: 'auto',
    alignItems: 'stretch',
    position: 'relative',
  },
  filterTitle: {
    fontSize: 14,
    marginVertical: 10,
  },
});

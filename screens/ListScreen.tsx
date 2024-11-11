import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import mockWordFR from "../data/mockWordFR";
import mockWordEN from "../data/mockWordEN";
import { NavigationProps } from "../types";
import { Word } from './HomeScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AddWordModal from '../components/AddWordModal';
import ListFilterModal from '../components/ListFilterModal';
import { SwipeListView } from 'react-native-swipe-list-view';
import DatePickerModal from '../components/DatePickerModal';

const ListScreen: React.FC<NavigationProps<'List'>> = ({ route, navigation }) => {
  const { dictionaryId } = route.params;
  const [wordList, setWordList] = useState<Word[]>(dictionaryId === 0 ? mockWordFR : mockWordEN);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddWordModal, setShowAddWordModal] = useState(false);
  const [wordToEdit, setWordToEdit] = useState<Word | undefined>(undefined);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterOption, setFilterOption] = useState<'all' | 'favoriteonly' | 'date' | 'unclearonly'>('all');
  const [showSearchInput, setShowSearchInput] = useState(false); // State to control search input visibility
const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd');
  };

  // 단어 목록 정렬
  const sortedWordList = [...wordList].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // 단어 상태 토글
  const toggleStatus = (id: number) => {
    setWordList((prevList: Word[]) =>
      prevList.map(item =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  // 단어 즐겨찾기 토글
  const toggleFavorite = (id: number) => {
    setWordList((prevList: Word[]) =>
      prevList.map(item =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  // 검색 필터링된 데이터
  const filteredData = wordList.filter(item =>
    item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.definition1.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.definition2?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.definition3?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setFilterOption('date');
    setShowDatePicker(false); // 날짜 선택기 닫기
};

  const getFilteredList = () => {
    let filteredList = searchQuery.length > 1 ? filteredData : sortedWordList;

    if (filterOption === 'favoriteonly') {
      return filteredList.filter(item => item.favorite);
    } else if (filterOption === 'unclearonly') {
      return filteredList.filter(item => !item.status);
    } 
    
    // else if (filterOption === 'date' && selectedDate) {
    //   return filteredList.filter(item => {
    //     const itemDate = new Date(item.createdAt).toDateString();
    //     return itemDate === selectedDate.toDateString();
    //   })
    // }

    return filteredList; // 'all' 옵션인 경우 전체 리스트 반환
  };
  // 단어 수정
  const editWord = (word: Word) => {
    setWordToEdit(word); // 수정할 단어 설정
    setShowAddWordModal(true); // 모달 열기
  };

  // 단어 삭제
  const deleteWord = (id: number) => {
    setWordList(prevList => prevList.filter(item => item.id !== id));
  };

  // 스와이프 리스트 아이템
  const renderSlideItem = ({ item }: { item: Word }) => (
    <View style={styles.wordContainer}>
      <Text style={styles.wordText}>{item.word}</Text>
      <Text style={styles.definitionText}>1. {item.definition1}</Text>
      <Text style={styles.definitionText}>2. {item.definition2}</Text>
      <Text style={styles.definitionText}>3. {item.definition3}</Text>
      <View style={styles.subFlexRow}>
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => toggleStatus(item.id)}
        >
          <Text style={item.status ? styles.clearButton : styles.unclearButton}>
            {item.status ? '알아요' : '몰라요'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => toggleFavorite(item.id)}
        >
          <FontAwesome
            name={item.favorite ? 'star' : 'star-o'}
            size={30}
            color="#32A877"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  // 숨겨진 버튼 (수정 및 삭제)
  const renderHiddenItem = ({ item }: { item: Word }) => (
    <View style={styles.hiddenContainer}>
      <TouchableOpacity
        style={[styles.hiddenButton, styles.leftButton]}
        activeOpacity={0.8}
        onPress={() => editWord(item)}
      >
        <Text style={styles.hiddenButtonText}>수정</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.hiddenButton, styles.rightButton]}
        activeOpacity={0.8}
        onPress={() => deleteWord(item.id)}
      >
        <Text style={styles.hiddenButtonText}>삭제</Text>
      </TouchableOpacity>
    </View>
  );


  const openDatePicker = () => {
    setShowDatePicker(true);
};


  return (
    <View style={styles.container}>
      <View style={styles.flexBetween}>
        <Text style={styles.listScreenTitle}>불/한 단어 리스트</Text>
        <View style={styles.flexRow}>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => setShowFilterModal(true)}
          >
            <FontAwesome name="filter" size={30} color="#A4DAC3" />
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => {
              setWordToEdit(undefined); // 새로운 단어 추가 모드로 설정
              setShowAddWordModal(true); // 모달 열기
            }}
          >
            <FontAwesome name="plus-circle" size={30} color="#A4DAC3" />
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => setShowSearchInput(prev => !prev)} // Toggle search input visibility
          >
            <FontAwesome name="search" size={30} color="#A4DAC3" />
          </TouchableOpacity>
        </View>
      </View>
      
      {showSearchInput && ( // Show the search input only if showSearchInput is true
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      )}

      <SwipeListView
        data={getFilteredList()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSlideItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        leftOpenValue={75}
      />

      {/* 필터 모달 */}
      <ListFilterModal 
        isVisible={showFilterModal}
        hide={() => setShowFilterModal(false)}
        filter={(option) => {
          setFilterOption(option);
          setShowFilterModal(false);
        }}
      />

      {/* 단어 추가 및 수정 모달 */}
      <AddWordModal
        isVisible={showAddWordModal}
        hide={() => setShowAddWordModal(false)}
        add={(wordObj: Word) => {
          if (wordToEdit) {
            // 수정 모드
            setWordList(prevList => prevList.map(word =>
              word.id === wordToEdit.id ? wordObj : word
            ));
          } else {
            // 새 단어 추가
            setWordList([...wordList, wordObj]);
          }
          setShowAddWordModal(false); // 모달 닫기
        }}
        wordToEdit={wordToEdit} // 수정할 단어 전달
      />
      {/* <DatePickerModal 
    isVisible={showDatePicker} // showDatePicker가 false일 경우 모달은 보이지 않아야 합니다.
    onClose={() => {
        setShowDatePicker(false); // 모달 닫기

    }}
    onSelectDate={handleSelectDate}
/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  wordContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  hiddenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  hiddenButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
    padding: 10,
  },
  leftButton: {
    backgroundColor: '#FFD700',
  },
  rightButton: {
    backgroundColor: '#FF6347',
  },
  hiddenButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  wordText: {
    fontSize: 18,
    marginBottom: 10,
  },
  definitionText: {
    fontSize: 14,
  },
  flexRow: {
    flexDirection: 'row',
    gap: 20,
    paddingBottom: 10,
    marginBottom: 10,
  },
  listScreenTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#32A877',
  },
  flexBetween: {
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
    height: 60,
    flexDirection: 'row',
  },
  subFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  clearButton: {
    borderWidth: 2,
    borderColor: "#32A877",
    color: "#32A877",
    borderRadius: 5,
    padding: 5,
    fontSize: 14,
    marginRight: 10,
  },
  unclearButton: {
    borderWidth: 2,
    borderColor: "#C70A0A",
    color: "#C70A0A",
    borderRadius: 5,
    padding: 5,
    fontSize: 14,
    marginRight: 10,
  },
});

export default ListScreen;

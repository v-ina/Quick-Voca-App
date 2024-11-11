import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Word } from '../screens/HomeScreen'; // Word 타입 정의 가져오기
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AddWordModal = (
  { isVisible, hide, add, wordToEdit, dictionaryId }: { 
      isVisible: boolean, 
      hide?: () => void, 
      add: (wordObj: Word) => void, 
      wordToEdit?: Word, 
      dictionaryId: number // dictionaryId prop 추가
  }
) => {
  // 단어와 각 정의의 상태를 관리
  const [word, setWord] = useState(wordToEdit ? wordToEdit.word : '');
  const [definition1, setDefinition1] = useState(wordToEdit ? wordToEdit.definition1 : '');
  const [definition2, setDefinition2] = useState(wordToEdit ? wordToEdit.definition2 : '');
  const [definition3, setDefinition3] = useState(wordToEdit ? wordToEdit.definition3 : '');

  console.log(dictionaryId, 'dictionaryId');
  

  // wordToEdit가 변경될 때 상태 업데이트
  useEffect(() => {
    if (wordToEdit) {
      setWord(wordToEdit.word);
      setDefinition1(wordToEdit.definition1);
      setDefinition2(wordToEdit.definition2);
      setDefinition3(wordToEdit.definition3);
    } else {
      // wordToEdit가 없으면 상태를 초기화
      setWord('');
      setDefinition1('');
      setDefinition2('');
      setDefinition3('');
    }
  }, [wordToEdit]);

  // 저장 핸들러
  const handleSave = () => {
    if (word.trim() === '' || definition1.trim() === '') return; // 필수 입력값 체크
    const wordObj: Word = {
      id: wordToEdit ? wordToEdit.id : Date.now(), // 수정 시 기존 ID 사용, 아니면 새로 생성
      dictionary_id: dictionaryId, // 수정된 부분: dictionaryId 사용
      word,
      definition1,
      definition2,
      definition3,
      createdAt: new Date().toISOString(),
      unclearCount: wordToEdit ? wordToEdit.unclearCount : 0,
      status: false,
      favorite: false,
    };
    add(wordObj); // 부모 컴포넌트로 단어 데이터 전달
    
    if (hide) hide(); // 모달 닫기
    setWord('');
    setDefinition1('');
    setDefinition2('');
    setDefinition3(''); 
  };

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
          <ScrollView contentContainerStyle={styles.scrollContent}>

            <TouchableOpacity 
              onPress={hide} 
              style={styles.closeButton}
            >
              <FontAwesome name="times" size={24} color="#32A877" />
            </TouchableOpacity>

            {/* 단어 입력 */}
            <View style={styles.addWordTitle}>
              <Text style={styles.label}>추가 할 단어</Text>
              <TextInput 
                placeholder='필수 입력' 
                style={styles.wordInput}
                value={word}
                onChangeText={setWord} // 입력값 업데이트
              />
            </View>

            {/* 뜻 1 입력 */}
            <View style={styles.definition}>
              <Text style={styles.label}>뜻 1</Text>
              <TextInput 
                placeholder='필수 입력' 
                style={styles.wordInput}
                value={definition1}
                onChangeText={setDefinition1} // 입력값 업데이트
              />
            </View>

            {/* 뜻 2 입력 */}
            <View style={styles.definition}>
              <Text style={styles.label}>뜻 2</Text>
              <TextInput 
                style={styles.wordInput}
                value={definition2}
                onChangeText={setDefinition2} // 입력값 업데이트
              />
            </View>

            {/* 뜻 3 입력 */}
            <View style={styles.definition}>
              <Text style={styles.label}>뜻 3</Text>
              <TextInput 
                style={styles.wordInput}
                value={definition3}
                onChangeText={setDefinition3} // 입력값 업데이트
              />
            </View>

            {/* 저장 버튼 */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSave} // 저장 버튼 클릭 시 handleSave 실행
            >
              <View style={styles.submitButton}>
                <Text style={styles.submitButtonText}>{wordToEdit ? '수정' : '저장'}</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddWordModal;

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
  },
  scrollContent: {
    flexGrow: 1, 
    justifyContent: 'center',
    position: 'relative', 
  },
  closeButton: {
    position: 'absolute',
    top: -15,
    right: -10,
    padding: 10,
  },
  addWordTitle: {
    marginBottom: 12,
    marginTop: 16,
  },
  label: {
    fontSize: 12,
    marginTop: 8,
    marginBottom: 4,
  },
  wordInput: {
    backgroundColor: "#FFF9D0",
    width: '100%',
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  definition: {},
  submitButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
    backgroundColor: "#32A877",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#FFFFFF",
    textAlign: 'center',
  }
});

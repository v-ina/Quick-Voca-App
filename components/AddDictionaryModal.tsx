
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import { Word } from '../screens/HomeScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const AddDictionaryModal = (
    {isVisible, hide, add}: {isVisible: boolean, hide?:()=>void, add:(wordObj: Word)=>void }
) => {

    const [newWord, setNewWord] = useState<Partial<Word>>({});

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

                <TouchableOpacity 
                    onPress={hide} 
                    style={styles.closeButton}
                >
                    <FontAwesome name="times" size={24} color="#32A877" />
                </TouchableOpacity>

                <View style={styles.addWordTitle}>
                    <Text style={styles.label}>추가 할 사전 이름 (5글자 내)</Text>
                    <TextInput 
                        placeholder='ex) 불/한' 
                        style={styles.wordInput}
                        // value={newWord} 
                        // onChangeText={setNewWord}
                        // onEndEditing={()=>{add(newWord); setNewWord('')}}
                    />
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={hide}
                >
                    <View style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>추가</Text>
                    </View>
                </TouchableOpacity>

                </View>
            </View>
    </Modal>
    )
 }

export default AddDictionaryModal

const styles = StyleSheet.create({
    modalLayout:{
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
    closeButton: {
        // alignSelf:'flex-end',
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
    addWordTitle: {
        marginBottom: 12,
        marginTop: 16
    },
    label: {
        fontSize: 14,
        marginTop: 8,
        marginBottom: 10
    },
    wordInput: {
        backgroundColor: "#FFF9D0",
        width: '100%',
        fontSize: 14,
        paddingVertical: 6,
        // borderRadius: 2, 
        paddingHorizontal: 10
    },
    submitButton: {
        marginTop: 20,
        alignSelf: 'flex-end',
        backgroundColor: "#32A877",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 5
    },
    submitButtonText: {
        color: "#FFFFFF",
        textAlign: 'center'
    }

})
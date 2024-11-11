
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, FlatList } from 'react-native'
import Modal from 'react-native-modal';
import { Word } from '../screens/HomeScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const data = [
    { id: 'all', option: 'Item 1', title: '내 리스트 전부 보기' },
    { id: 'date', option: 'Item 2', title: '날짜별 테스트 보기' },
    { id: 'unclearonly', option: 'Item 3', title: '몰라요만 테스트 보기' },
    { id: 'favoriteonly', option: 'Item 4', title: '즐겨찾기만 테스트 보기' },
  ];

const Item = ({title, navigatepath, navigate}: {title: string, navigatepath: string, navigate: (path: string) => void}) => (
    <TouchableOpacity
        onPress={()=>navigate(navigatepath)}
        style={styles.pathList}
    >
        <Text style={styles.pathTitle}>{title}</Text>
    </TouchableOpacity>
)

const TestModal = (
    {isVisible, hide, navigate}: {isVisible: boolean, hide?:()=>void, navigate:(path: string)=>void }
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
                        <FontAwesome name="times" size={24} color="#32A877"  />
                    </TouchableOpacity>

                    <Text style={styles.testModalTitle}>테스트 보기 옵션</Text>

                    <FlatList
                        data={data}
                        renderItem={({item})=> <Item title={item.title} navigatepath={item.option} navigate={navigate} />}
                        keyExtractor={item => item.id}
                    >
                    </FlatList>
                </View>
            </View>
    </Modal>
    )
 }

export default TestModal

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
        position: 'relative',
    },
    closeButton: {
        alignSelf: 'flex-end',
        position: 'absolute',
        top:10,
        right: 10,
        padding: 10,
        zIndex: 10
    },
    testModalTitle: {
        color: "#32A877",
        fontWeight: 'bold',
        paddingTop: 10
    },
    pathList: {
        marginTop: 20
    },
    pathTitle: {
        fontSize: 14,
        marginVertical: 6,
        // color: "#32A877"

    },
})
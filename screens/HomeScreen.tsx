import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationProps } from "../types";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage 임포트
import AddWordModal from "../components/AddWordModal";
import TestModal from "../components/TestModal";
import { StackNavigationProp } from '@react-navigation/stack';

export interface Word {
    id: number,
    dictionary_id: number,
    word: string, 
    definition1: string,
    definition2?: string, 
    definition3?: string,
    createdAt: string,
    unclearCount: number,
    status: boolean,
    favorite: boolean
}

type RootStackParamList = {
    Home: undefined;
    Setting: undefined;
    List: { dictionaryId: number };
    Test: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
    navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [showAddWordModal, setShowAddWordModal] = useState(false);
    const [selectedDictionary, setSelectedDictionary] = useState(0);
    const [showTestModal, setShowTestModal] = useState(false);
    const [words, setWords] = useState<Word[]>([]);
    const [dictionaryId, setDictionaryId] = useState<number | null>(null); // 추가된 상태

    // 선택된 사전 ID를 AsyncStorage에 저장
    const saveDictionaryId = async (id: number) => {
        try {
            await AsyncStorage.setItem('selectedDictionaryId', id.toString());
        } catch (e) {
            console.error('Failed to save the dictionary ID.', e);
        }
    };

    // AsyncStorage에서 선택된 사전 ID를 불러옴
    const loadDictionaryId = async () => {
        try {
            const id = await AsyncStorage.getItem('selectedDictionaryId');
            if (id !== null) {
                setDictionaryId(Number(id)); // 불러온 ID를 상태에 저장
            }
        } catch (e) {
            console.error('Failed to load the dictionary ID.', e);
        }
    };

    // 컴포넌트가 마운트될 때 사전 ID 불러오기
    useEffect(() => {
        loadDictionaryId();
    }, []);

    // 단어 추가 함수
    const addWord = (wordObj: Word) => {
        setWords(prevWords => [...prevWords, wordObj]);
        console.log('Added word:', wordObj);
        setShowAddWordModal(false);
    };

    return (
        <>
            <View style={styles.dictionaries}>
                {/* 사전 선택 버튼 */}
                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => {
                        setSelectedDictionary(0);
                        saveDictionaryId(0); // 선택된 사전 ID 저장
                    }}
                >
                    <View style={selectedDictionary === 0 ? styles.headerButtonActive : styles.headerButtonDefault}>
                        <Text style={selectedDictionary === 0 ? styles.headerButtonActiveText : styles.headerButtonDefaultText}>불/한</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => {
                        setSelectedDictionary(1);
                        saveDictionaryId(1); // 선택된 사전 ID 저장
                    }}
                >
                    <View style={selectedDictionary === 1 ? styles.headerButtonActive : styles.headerButtonDefault}>
                        <Text style={selectedDictionary === 1 ? styles.headerButtonActiveText : styles.headerButtonDefaultText}>영/한</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => {
                        setSelectedDictionary(2);
                        saveDictionaryId(2); // 선택된 사전 ID 저장
                    }}
                >
                    <View style={selectedDictionary === 2 ? styles.headerButtonActive : styles.headerButtonDefault}>
                        <Text style={selectedDictionary === 2 ? styles.headerButtonActiveText : styles.headerButtonDefaultText}>이/한</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.homeScreen}>
                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => setShowAddWordModal(true)}
                >
                    <View style={styles.homeButton}>
                        <Text style={styles.homeButtonText}>단어 추가하기</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('List', { dictionaryId: selectedDictionary })}
                >
                    <View style={styles.homeButton}>
                        <Text style={styles.homeButtonText}>단어 목록보기</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => setShowTestModal(true)}
                >
                    <View style={styles.homeButton}>
                        <Text style={styles.homeButtonText}>테스트 보기</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.settingIcon}>
                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Setting')}
                >
                    <FontAwesome name="cog" size={30} color="#A4DAC3"/>
                </TouchableOpacity>
            </View>

            <AddWordModal 
                isVisible={showAddWordModal}
                hide={() => setShowAddWordModal(false)} 
                add={addWord}
                dictionaryId={selectedDictionary} // dicId 전달
            />
        
            <TestModal 
                isVisible={showTestModal}
                hide={() => setShowTestModal(false)} 
                navigate={() => navigation.navigate('Test')}
            />
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    homeScreen: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        gap: 20,
    },
    homeButton: {
        backgroundColor: "#32A877",
        paddingVertical: 14,
        width: 180,
        borderRadius: 10
    },
    homeButtonText: {
        color: "#FFFFFF",
        textAlign: 'center'
    },
    dictionaries: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginTop: 30,
        paddingTop: 50
    },
    headerButtonActive: {
        backgroundColor: "#32A877",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    headerButtonDefault: {
        borderWidth: 2,
        borderColor: "#32A877",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 5,
    },
    headerButtonActiveText: {
        color: "#FFFFFF",
        textAlign: 'center'
    },
    headerButtonDefaultText: {
        color: "#32A877",
        textAlign: 'center'
    },
    settingIcon: {
        marginBottom: 50,
        color: "#A4DAC3",
        alignSelf: 'flex-end', 
        marginRight: 30
    }
});

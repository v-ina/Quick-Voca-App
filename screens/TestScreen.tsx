import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TestScreen = () => {

    const unclearCountSetting = 2
    const testWord = {
        id: 4,
        dictionary_id: 3,
        word: "Au revoir",
        definition1: "안녕히 가세요",
        definition2: "작별 인사",
        definition3: "",
        createdAt: "2024-09-20T09:15:00Z",
        unclearCount: 0,
        status: true,
        favorite: true,
    }

    const [showInfoModal, setShowInfoModal] = useState(false)
    const [showAnswerModal, setShowAnswerModal] = useState(false);

    // console.log(showInfoModal,'showInfoModal');
    
    useEffect(() => {
        console.log('showInfoModal changed:', showInfoModal);
      }, [showInfoModal]); // showInfoModal이 변경될 때마다 호출됨

    return (
        <View style={styles.testScreenLayout}>
            <View style={[styles.headerFlex, styles.flexBetween, styles.header]}>
                <View style={styles.headerUnclearPart}>
                    <Text>몰라요 횟수
                        <Text style={styles.textBold}>   {testWord.unclearCount}</Text>
                    </Text>
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        style={styles.headerInfoButton} 
                        // onPress={()=>console.log('click')}
                        onPressIn={() => setShowInfoModal(true)}  // 클릭 유지 시 모달 열림
                        onPressOut={() => setShowInfoModal(false)}
                        
                    >
                        <FontAwesome name="info-circle" size={16} color="#adadad" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity  
                activeOpacity={0.8}
                    onPressIn={() => setShowAnswerModal(true)}  // 클릭 유지 시 모달 열림
                    onPressOut={() => setShowAnswerModal(false)}
                
                >
                    <FontAwesome name="question-circle" size={40} color="#32A877" />
                </TouchableOpacity>

                <Modal
                    transparent={true}
                    visible={showAnswerModal}
                
                    animationType="fade"
                    // onRequestClose={() => setShowAnswerModal(false)} // Android에서 뒤로가기 닫힘
                >
                    <View style={styles.answerModal}>
                        <Text>1. {testWord.definition1}</Text>
                        <Text>2. {testWord.definition2 ?? testWord.definition2}</Text>
                        <Text>3. {testWord.definition3 ?? testWord.definition3}</Text>

                    </View>
                </Modal>


                    <Modal
                    transparent={true}
                    visible={showInfoModal}  // 모달의 가시성을 상태에 따라 설정
                    // animationType="fade"
                    // onRequestClose={() => setShowInfoModal(false)}  // 모달 닫는 함수
                  >
                    <View style={styles.headerInfoModal}>
                        <Text style={styles.headerInfoModalText}>몰라요 {unclearCountSetting}회시 즐겨찾기에 자동저장 됨</Text>
                    </View>

                    </Modal>

            </View>

            <View>
                <Text style={[styles.testWord, styles.textBold]}>{testWord.word}</Text>
            </View>

            <View style={[styles.flexRow,styles.flexAround, styles.testButton]}>
                <TouchableOpacity>
                    <View style={styles.clearButton}>
                        <Text style={styles.clearButtonText}>알아요</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.unclearButton}>
                        <Text style={styles.unclearButtonText}>몰라요</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
 }

export default TestScreen

const styles = StyleSheet.create({
    testScreenLayout: {
        flex: 1,
        justifyContent: 'space-between',
        // alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#A4DAC3'
    },
    textBold: {
        fontWeight:'bold',
        // fontSize: 16
    },
    flexRow: {
        flexDirection: 'row'
    },
    flexBetween: {
        justifyContent: 'space-between'
    },
    flexAround:{
        justifyContent:'space-around'
    },
    headerFlex:{
        flexDirection:'row',
        alignItems: 'center'
    },
    header: {
        paddingTop: 30,
        position: 'relative'
    },
    headerUnclearPart:{
        position:'relative'
    },
    headerInfoModal:{
        position:'absolute',
        left: 130,
        top: 20,
        borderWidth: 1,
        borderRadius: 2,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderColor: "#7c7c7c"
    },
    headerInfoModalText:{
        fontSize:8
    },
    headerInfoButton: {
        position:'absolute',
        right: -20,
        top: -10,
        zIndex: 10
    },
    testWord:{
        alignSelf:'center',
        fontSize: 40
    },
    clearButton:{
        borderWidth: 2,
        borderColor: "#32A877",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 5,
    },
    clearButtonText:{
        color: "#32A877",
        textAlign: 'center'
    },
    unclearButton:{
        backgroundColor: "#32A877",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    unclearButtonText:{
        color: "#FFFFFF",
        textAlign: 'center'
    },
    testButton:{
        paddingBottom: 60
    },
    answerModal:{
        backgroundColor: "#FFFFFF",
        maxWidth: 200,
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 10,
        borderRadius: 10,
        position: 'absolute',
        top: 60,
        right: 60



    },
})
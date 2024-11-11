import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AddDictionaryModal from "../components/AddDictionaryModal";

const SettingScreen = ({navigation}) => {
    const isPremiumUser = false;
    // const isPremiumUser = true;
    const [number, setNumber] = useState('');
    const [toggles, setToggles] = useState({
        first: true,
        second: false,
        third: false,
    });

    const toggleSwitch = (key:string ) => {
        setToggles((prevToggles) => ({
            first: key === 'first' ? !prevToggles.first : false,
            second: key === 'second' ? !prevToggles.second : false,
            third: key === 'third' ? !prevToggles.third : false,
        }));
    };
    const [elevation, setElevation] = useState(0);

    const handleScroll = (event: any) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        // 스크롤이 내려가면 elevation 2로 설정, 그렇지 않으면 0으로 설정
        if (scrollY > 0) {
            setElevation(2);
        } else {
            setElevation(0);
        }
    }
    const [showAddDictionaryModal, setShowAddDictionaryModal] = useState(false)

    const showPremiumAlert = () => {
        Alert.alert(
            isPremiumUser ? "PDF로 다운로드":"유료 전용 서비스", // 제목
            isPremiumUser ? "다운로드를 진행하시겠습니까?" : "유료 전용 서비스 입니다. \n 사용을 원하시면 유료로 결제한 뒤 다시 시도해 주세요.", // 메시지
            [
                {
                    text: "취소",
                    onPress: () => console.log("취소 클릭됨"),
                    style: "cancel" // 취소 버튼 스타일
                },
                { 
                    text: isPremiumUser? "다운로드":"결제 페이지로 이동", 
                    onPress: () =>{ 
                        if(isPremiumUser){
                            console.log("확인 클릭됨")
                        } else {
                            console.log("유료 결제 페이지로 이동")
                        }
                    } // 확인 버튼
                }
            ]
        );
    }

    const showDeleteAlert = (dictionaryName : string) => {
        Alert.alert(
            `${dictionaryName} 사전 삭제하기`, // 제목
            "삭제된 사전은 영원히 복구 할 수 없습니다.\n그래도 삭제하시겠습니까?", // 메시지
            [
                {
                    text: "취소",
                    onPress: () => console.log("취소 클릭됨"),
                    style: "cancel" // 취소 버튼 스타일
                },
                { 
                    text: "삭제하기", 
                    onPress: () => console.log("확인 클릭됨") // 확인 버튼
                }
            ]
        )
    }

    return (
        <View style={styles.settingScreenLayout}>
            <View style={[styles.finalSaveButtonLayout, { elevation }]}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.finalSaveButton}
                    onPress={()=>navigation.navigate('Home')}
                >
                    <Text style={styles.finalSaveButtonText}>저장</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.container} onScroll={handleScroll} scrollEventThrottle={16}>

                <View>
                    <Text style={styles.settingTitle}>즐겨찾기 자동 저장</Text>
                    <View style={styles.flexBetween}>
                        <Text>테스트 몰라요 횟수</Text>
                        <TextInput
                            placeholder="3"
                            keyboardType="numeric" 
                            value={number}
                            onChangeText={setNumber} 
                            style={styles.numberInput}
                        />
                    </View>
                </View>

                <View style={styles.line} />

                <View>
                    <Text style={styles.settingTitle}>디폴트 사전 설정하기</Text>
                    
                    <View style={styles.flexBetween}>
                        <Text>불/한</Text>
                        <TouchableOpacity onPress={() => toggleSwitch('first')}>
                            <FontAwesome name={toggles.first ? "toggle-on" : "toggle-off"} size={30} color={toggles.first ? "#32A877" : "#A4DAC3"} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.flexBetween}>
                        <Text>영/한</Text>
                        <TouchableOpacity onPress={() => toggleSwitch('second')}>
                            <FontAwesome name={toggles.second ? "toggle-on" : "toggle-off"} size={30} color={toggles.second ? "#32A877" : "#A4DAC3"} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.flexBetween}>
                        <Text>이/한</Text>
                        <TouchableOpacity onPress={() => toggleSwitch('third')}>
                            <FontAwesome name={toggles.third ? "toggle-on" : "toggle-off"} size={30} color={toggles.third ? "#32A877" : "#A4DAC3"} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.line} />

                <View>
                    <Text style={styles.settingTitle}>사전 관리하기</Text>
                    <View style={styles.flexBetween}>
                        <Text>불/한</Text>
                        <TouchableOpacity 
                            onPress={()=>showDeleteAlert('불/한')}
                        >
                        <FontAwesome name="trash" size={30} color="#A4DAC3" />
                    </TouchableOpacity>
                    </View>

                    <View style={styles.flexBetween}>
                        <Text>영/한</Text>
                        <TouchableOpacity 
                            onPress={()=>showDeleteAlert('영/한')}
                            >
                        <FontAwesome name="trash" size={30} color="#A4DAC3" />
                    </TouchableOpacity>
                    </View>

                        <TouchableOpacity 
                            onPress={()=>setShowAddDictionaryModal(true)}
                        >
                    <View style={styles.flexCenter}>
                            <FontAwesome name="plus" size={24} color="#32A877" />
                        <Text>사전 추가하기</Text>
                    </View>
                        </TouchableOpacity>
                </View>

                <AddDictionaryModal 
                    isVisible={showAddDictionaryModal}
                    hide={()=>{setShowAddDictionaryModal(false)}} 
                    add={()=>{
                        setShowAddDictionaryModal(false)
                        // saveTodos(todos) 
                    }}
                />

                <View style={styles.line} />

                <View>
                    <Text style={styles.settingTitle}>유료 전환하기</Text>
                        <Text style={styles.text}>유료 전환은 이런 장점이 있습니다</Text>
                        <View style={styles.subtextView}>
                            <Text style={styles.subtext}>-  단어장을 pdf 파일로 저장 가능</Text>
                            <Text style={styles.subtext}>-  최대 3개의 단어장 생성 가능</Text>
                            <Text style={styles.subtext}>-  AI를 이용한 단어 뜻 자동 생성 기능</Text>
                        </View>

                        <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.paymentButton}
                    >
                        <Text style={styles.paymentButtonText}>유료 결제하기</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.line} />

                <View>
                    <Text style={styles.settingTitle}>사전 PDF로 다운로드 하기</Text>
                    {/* <Text style={styles.subtext}>유료 이용자만 가능한 서비스 입니다.</Text> */}

                    <View style={styles.flexBetween}>
                        <Text>불/한</Text>
                        <TouchableOpacity 
                            onPress={isPremiumUser ?showPremiumAlert : showPremiumAlert}
                            >
                        <FontAwesome name="download" size={30} color="#A4DAC3" />
                    </TouchableOpacity>
                    </View>

                    <View style={styles.flexBetween}>
                        <Text>영/한</Text>
                        <TouchableOpacity 
                            onPress={isPremiumUser ?showPremiumAlert : showPremiumAlert}
                        >
                        <FontAwesome name="download" size={30} color="#A4DAC3" />
                    </TouchableOpacity>
                    </View>

                    <View style={styles.flexBetween}>
                        <Text>이/한</Text>
                        <TouchableOpacity 
                            onPress={isPremiumUser ?showPremiumAlert : showPremiumAlert}
                            >
                        <FontAwesome name="download" size={30} color="#A4DAC3" />
                    </TouchableOpacity>
                    </View>
                    
                </View>

                {/* <View style={styles.line} /> */}


            </ScrollView>

        </View>
    )
}


export default SettingScreen;

const styles = StyleSheet.create({
    settingScreenLayout: {
        position: 'relative',
    },
    container: {
        flexGrow: 1,
        paddingVertical: 10,
        paddingHorizontal: 20, 
        gap: 10,
        marginTop: 70,
        paddingBottom: 90,

    },
    finalSaveButtonLayout: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 5,
        backgroundColor: '#F2F2F2',
        width: '100%',
        height: 80,
        // elevation: 2,
    },
    finalSaveButton: {
        position: 'absolute',
        top: 0,
        right: 20,
        marginTop: 20,
        zIndex: 10,
        alignSelf: 'flex-end',
        backgroundColor: "#32A877",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 5,
    },
    finalSaveButtonText: {
        color: "#FFFFFF",
        textAlign: 'center'
    },

    flexBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10

    },
    flexCenter:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginVertical: 10

    },

    settingTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 30,
        marginBottom: 20,
        
    },
    line: {
        width: '100%', 
        height: 2, 
        backgroundColor: '#00000053',
    },
    text: {
        fontSize: 14,

    },
    subtextView: {
        marginTop: 10,
        marginLeft: 10,
    },
    subtext: {
        fontSize: 12,
    },    
    numberInput: {
        fontSize: 16,
        // borderWidth: 1,
        // borderBottomWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 18
    },
    paymentButton: {
        marginTop: 20,
        alignSelf: 'flex-end',
        backgroundColor: "#32A877",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 5,
        marginBottom:10
    },
    paymentButtonText: {
        color: "#FFFFFF",
        textAlign: 'center'
    },
});

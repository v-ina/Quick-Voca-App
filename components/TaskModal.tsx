
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native'
import Modal from 'react-native-modal';


const TaskModal= ({isVisible, hide, add}: {isVisible: boolean, hide?:()=>void, add:(title: string)=>void }) => {

    const [newTask, setNewTask] = useState<string>('');
    return (
        <Modal isVisible={isVisible} avoidKeyboard style={taskStyles.modal} onBackdropPress={hide} onSwipeComplete={hide}  swipeDirection="down" 
                
            >
            <View style={taskStyles.container}>
                <TextInput placeholder='새로운 할 일을 추가해 주세요' value={newTask} onChangeText={setNewTask} onEndEditing={()=>{add(newTask); setNewTask('')}}/>
            </View>
        </Modal>
    )
}

export default TaskModal

const taskStyles = StyleSheet.create ({
    modal : {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container: {
        padding: 16, 
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    }
})
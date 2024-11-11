import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

type ShowAlertType = () => void 

const StartButton = ({showAlert, disabled}: {showAlert: ShowAlertType, disabled?:boolean}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={disabled? undefined : showAlert}>
            <View style={disabled? styles.disabled :  styles.box}>
                <Text style={styles.text}>시작하기</Text>
            </View>
        </TouchableOpacity>
    )
}

export default StartButton

const styles = StyleSheet.create({
    box: {
        backgroundColor: "#6830CF",
        padding: 18,
    },
    text: {
        color: "#FFFFFF"
    },
    disabled: {
        backgroundColor:'#9E9E9E',
        padding: 18
    }

})
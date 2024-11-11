import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const DeleteButton = () => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={deleteStyles.button}>

            <Text>삭제</Text>

        </TouchableOpacity>
    )
}

export default DeleteButton

const deleteStyles = StyleSheet.create({
    button: {
        backgroundColor: 'red'
    }
})
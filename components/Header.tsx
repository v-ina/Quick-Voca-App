import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const Header = ({show}: {show: ()=> void}) => {
    return (
        <View style={headerStyles.container}>
            <Text style={headerStyles.title}>TO-DO LIST</Text>

            <TouchableOpacity activeOpacity={0.8} style={headerStyles.button} onPress={show}>
                <Text  style={headerStyles.plusIcon}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Header



const headerStyles = StyleSheet.create({
    container: {
        marginTop: 32,
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center'

    },
    title: {
        color: '#212121',
        fontSize: 24,
        fontWeight: '600'
    },
    button: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#212121',
        justifyContent: 'center',
        alignItems:'center'
    },
    plusIcon: {
        color: '#FFFFFF',
        // fontSize: 16,
        // padding: 8
    }
})
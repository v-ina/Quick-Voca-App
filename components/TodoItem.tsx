import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // FontAwesome 4 아이콘
import { SwipeListView } from 'react-native-swipe-list-view';

const TodoItem = ({
    title,
    done,
    remove,
    change
}: {title: string, done: boolean, remove:()=>void, change: ()=>void}) => {



    const renderItem = () => (
        <View style={todoStyles.container}>
                        <View style={todoStyles.todo}>
                            <TouchableOpacity activeOpacity={0.5} style={done? todoStyles.done : todoStyles.check} onPress={change}>
                                <FontAwesome name='check' color={done? '#FFFFFF' : '#E0E0E0'} size={14} style={todoStyles.checkIcon}/>
        
                            </TouchableOpacity>
                            <Text style={todoStyles.title}>{title}</Text>
                        </View>
                    </View>
        )
        
        const renderHiddenItem = () => (
            <TouchableOpacity activeOpacity={0.8} style={todoStyles.deletebutton} onPress={remove}>
        
                    <Text style={todoStyles.deleteText}>Delete</Text>
        
                </TouchableOpacity>
        )
        
        const data = [
            { key: `title`, title, done },
            // { key: '2', title, done },
        ];


    return (

        <SwipeListView 
            data={data}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={75}
            leftOpenValue={-75}
            // disableLeftSwipe
         />
    )
}

export default TodoItem



const todoStyles = StyleSheet.create({
    container: {
        // marginTop: 12,
        // marginBottom: 10,
        paddingStart: 20,
        paddingLeft: 20,
        backgroundColor: '#FFFFFF'

    },
    todo: {
        flexDirection: 'row',
        alignItems:'center',
        height:60,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",

    },
    title: {
        color: '#424242',
        fontSize: 14,
        // fontWeight: '600'
    },
    check : {
        borderWidth: 1,
        borderColor: "#E5E5E5",
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 14,
        marginRight:8
    },
    checkIcon:{
        textAlign: 'center'
    },
    done : {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 14,
        marginRight:8,
        backgroundColor: '#6830CF'
    },
    deletebutton: {
        // backgroundColor: 'red',
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 60,
        padding: 10,

    },
    deleteText: {
        color: '#FFFFFF',
        marginRight: 8,
    }
})
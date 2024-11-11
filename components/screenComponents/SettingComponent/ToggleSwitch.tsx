import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const ToggleSwitch = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const animatedValue = new Animated.Value(0); // 애니메이션 값

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        Animated.timing(animatedValue, {
            toValue: isEnabled ? 0 : 1, // 현재 상태에 따라 애니메이션 값 변경
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    // 아이콘 위치 계산
    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 30], // 0에서 30으로 이동
    });

    return (
        <TouchableOpacity onPress={toggleSwitch} style={[styles.container, { backgroundColor: isEnabled ? '#32A877' : '#ccc' }]}>
            <Animated.View style={[styles.toggleIcon, { transform: [{ translateX }] }]}>
                <Text style={styles.iconText}>{isEnabled ? '✅' : '❌'}</Text> {/* 상태에 따라 아이콘 변경 */}
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        paddingHorizontal: 5,
        alignItems: 'flex-start', // 아이콘을 왼쪽으로 정렬
        margin: 20,
    },
    toggleIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 18,
    },
});

export default ToggleSwitch;

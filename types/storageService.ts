// storageService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface MyData {
    id: number;
    name: string;
}

// 데이터를 저장하는 함수
export const storeData = async (key: string, value: MyData) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error('Failed to save the data.', e);
    }
};

// 데이터를 불러오는 함수
export const loadData = async (key: string): Promise<MyData | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('Failed to load the data.', e);
        return null;
    }
};

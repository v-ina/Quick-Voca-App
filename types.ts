// types.ts 또는 다른 파일에 정의
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


export type RootStackParamList = {
  Home: undefined; // Home은 매개변수가 없음
  List: { dictionaryId: number }; // List는 dictionaryId를 매개변수로 받음
  Settings: undefined; // Settings는 매개변수가 없음
  Test: undefined; // Test는 매개변수가 없음
};

// NavigationProps를 정의합니다.
export type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: NavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

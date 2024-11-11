import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; // 홈 스크린 컴포넌트
import ListScreen from './screens/ListScreen';
import SettingScreen from './screens/SettingScreen';
import TestScreen from './screens/TestScreen';
// import DetailsScreen from './screens/DetailsScreen'; // 상세 스크린 컴포넌트

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{ headerShown: false }} 
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        <Stack.Screen name="List" component={ListScreen}/>

        <Stack.Screen name="Setting" component={SettingScreen}/>
        <Stack.Screen name="Test" component={TestScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

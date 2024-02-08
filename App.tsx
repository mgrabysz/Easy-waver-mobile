import React from "react";
import {LogBox,} from "react-native";
import "reflect-metadata"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SamplesScreen} from "./screens/samplesScreen/SamplesScreen";
import {PedalBoardScreen} from "./screens/pedalboardScreen/PedalBoardScreen";
import {NavigationContainer} from "@react-navigation/native";
import Entypo from '@expo/vector-icons/Entypo';
import {MaterialCommunityIcons} from '@expo/vector-icons';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'My samples') {
            return <Entypo name={"beamed-note"} size={size} color={color}/>
          } else {
            return <MaterialCommunityIcons name="sine-wave" size={size} color={color}/>
          }
        }
      })}>
      <Tab.Screen name="My samples" component={SamplesScreen}/>
      <Tab.Screen name="Pedalboard" component={PedalBoardScreen}/>
    </Tab.Navigator>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  )
}

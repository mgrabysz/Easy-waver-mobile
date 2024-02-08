import React from "react";
import {LogBox,} from "react-native";
import "reflect-metadata"
import {NavigationContainer} from "@react-navigation/native";
import {MainTabs} from "./screens/tabs/MainTabs";

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message


export default function App() {

  return (
    <NavigationContainer>
      <MainTabs/>
    </NavigationContainer>
  )
}

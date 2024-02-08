import React, {useEffect, useState} from "react";
import {Button, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View,} from "react-native";
import RestClient from './network/RestClient'
import Constants from "expo-constants";
import {Container} from "typedi";
import "reflect-metadata"
import * as FileSystem from 'expo-file-system';
import {EncodingType} from 'expo-file-system';
import { Audio} from "expo-av";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SamplesScreen} from "./screens/samplesScreen/samplesScreen";
import {PedalboardScreen} from "./screens/pedalboardScreen/pedalboardScreen";
import {NavigationContainer} from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My samples" component={SamplesScreen}/>
      <Tab.Screen name="Pedalboard" component={PedalboardScreen}/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
  },
  wrapperStyle: {
    minHeight: 128,
  },
  buttonStyles: {
    backgroundColor: "dodgerblue",
  },
  textStyles: {
    fontSize: 20,
    color: "white",
    padding: 10,
  },
});
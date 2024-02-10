import React from "react";
import {StyleSheet} from "react-native";
import Theme from "../../theme";
import Entypo from "@expo/vector-icons/Entypo";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {SamplesScreen} from "../samplesScreen/SamplesScreen";
import {PedalBoardScreen} from "../pedalboardScreen/PedalBoardScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export function MainTabs() {
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
        },
        tabBarStyle: styles.bottomTab
      })}>
      <Tab.Screen
        name="My samples"
        component={SamplesScreen}
        options={() => ({
          headerStyle: styles.header,
        })}
      />
      <Tab.Screen
        name="Pedalboard"
        component={PedalBoardScreen}
        options={{headerStyle: styles.header}}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Theme.primary
  },
  bottomTab: {
    backgroundColor: Theme.primary
  },
})
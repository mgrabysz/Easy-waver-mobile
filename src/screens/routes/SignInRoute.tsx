import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SignInScreen} from "../signInScreen/SignInScreen";
import {SignUpScreen} from "../signUpScreen/SignUpScreen";
import React from "react";

const Stack = createNativeStackNavigator();

export function SignInRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"Sign in"} component={SignInScreen}/>
      <Stack.Screen name={"Sign up"} component={SignUpScreen} options={{title: "Create an account"}}/>
    </Stack.Navigator>
  )
}
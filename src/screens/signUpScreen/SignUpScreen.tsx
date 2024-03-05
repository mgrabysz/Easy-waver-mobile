import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useState} from "react";
import InputCard from "../../components/InputCard";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {FirebaseAuth} from "../../../firebaseConfig";
import LoadingActivity from "../../components/LoadingActivity";
import SignInStyles from "../styles/signInStyles";
import {Container} from "typedi";
import RestClient from "../../network/RestClient";
import LoggedUserContext from "../../contexts/LoggedUserContext";

// @ts-ignore
export function SignUpScreen() {
  const restClient = Container.get(RestClient)

  const {isLogged, setIsLogged} = useContext(LoggedUserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function onSignUp() {
    setLoading(true)
    createUserWithEmailAndPassword(FirebaseAuth, email, password)
      .then(() => {
        return restClient.initializeStorage()
      })
      .then(() => setIsLogged(true))
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
        alert("Error creating an account")
      })
      .finally(() => setLoading(false));
  }

  return (
    <SafeAreaView style={SignInStyles.container}>
      <ScrollView contentContainerStyle={SignInStyles.scrollContainer} style={SignInStyles.scroll}>
        <View style={SignInStyles.frame}>
          <View style={SignInStyles.square}>
            <MaterialCommunityIcons name="sine-wave" size={64} color="black"/>
          </View>
          <InputCard title={"Email"} text={email} setText={setEmail}/>
          <InputCard title={"Password"} text={password} setText={setPassword} secure={true}/>
          <TouchableOpacity style={SignInStyles.loginButton} onPress={onSignUp}>
            <Text>Confirm and create account</Text>
            <AntDesign name="adduser" size={24} color="black"/>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading && <LoadingActivity/>}
    </SafeAreaView>
  )
}

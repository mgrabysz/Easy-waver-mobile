import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useState} from "react";
import InputCard from "../../components/InputCard";
import {AntDesign, Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import {signInWithEmailAndPassword} from "firebase/auth";
import {FirebaseAuth} from "../../../firebaseConfig";
import LoadingActivity from "../../components/LoadingActivity";
import SignInStyles from "../styles/signInStyles";
import LoggedUserContext from "../../contexts/LoggedUserContext";

// @ts-ignore
export function SignInScreen({navigation}) {

  const {isLogged, setIsLogged} = useContext(LoggedUserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function onSignIn() {
    setLoading(true)
    signInWithEmailAndPassword(FirebaseAuth, email, password)
      .then(() => setIsLogged(true))
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
        alert("Incorrect credentials")
      })
      .finally(() => setLoading(false));
  }

  return (
    <SafeAreaView style={SignInStyles.container}>
      <ScrollView contentContainerStyle={SignInStyles.scrollContainer} style={SignInStyles.scroll}>
        <View style={SignInStyles.frame}>
          <View style={SignInStyles.square}>
            <MaterialCommunityIcons name="sine-wave" size={64} color="black" />
          </View>
          <InputCard title={"Email"} text={email} setText={setEmail}/>
          <InputCard title={"Password"} text={password} setText={setPassword} secure={true}/>
          <TouchableOpacity style={SignInStyles.loginButton} onPress={onSignIn}>
            <Text>Sign in</Text>
            <Entypo name="login" size={24} color="black"/>
          </TouchableOpacity>
          <TouchableOpacity style={SignInStyles.loginButton} onPress={() => navigation.navigate('Sign up')}>
            <Text>Create account</Text>
            <AntDesign name="adduser" size={24} color="black"/>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading && <LoadingActivity/>}
    </SafeAreaView>
  )
}

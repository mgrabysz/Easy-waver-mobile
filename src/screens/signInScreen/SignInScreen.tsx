import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Theme from "../../themes/theme";
import React, {useState} from "react";
import InputCard from "./components/InputCard";
import {AntDesign, Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import {signInWithEmailAndPassword} from "firebase/auth";
import {FirebaseAuth} from "../../../firebaseConfig";
import LoadingActivity from "../../components/LoadingActivity";

export function SignInScreen() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function onSignIn() {
    setLoading(true)
    signInWithEmailAndPassword(FirebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        alert("Incorrect credentials")
      })
      .finally(() => setLoading(false));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scroll}>
        <View style={styles.frame}>
          <View style={styles.square}>
            <MaterialCommunityIcons name="sine-wave" size={64} color="black" />
          </View>
          <InputCard title={"Email"} text={email} setText={setEmail}/>
          <InputCard title={"Password"} text={password} setText={setPassword} secure={true}/>
          <TouchableOpacity style={styles.loginButton} onPress={onSignIn}>
            <Text>Sign in</Text>
            <Entypo name="login" size={24} color="black"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={onSignIn}>
            <Text>Create account</Text>
            <AntDesign name="adduser" size={24} color="black"/>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading && <LoadingActivity/>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: Theme.secondary,
  },
  scrollContainer: {
    padding: 20,
  },
  scroll: {
    width: '100%',
  },
  frame: {
    backgroundColor: Theme.primary,
    padding: 15,
    paddingBottom: 25,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: "100%",
  },
  square: {
    width: 72,
    height: 72,
    backgroundColor: Theme.intenseBlue,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    paddingVertical: 10
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: Theme.intenseBlue,
    width: "100%",
    height: 40,
    flexDirection: "row",
    columnGap: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 20,
  }

})
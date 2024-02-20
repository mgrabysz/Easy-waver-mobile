import React, {useState} from "react";
import {LogBox,} from "react-native";
import "reflect-metadata"
import {NavigationContainer} from "@react-navigation/native";
import {MainTabs} from "./src/screens/tabs/MainTabs";
import SamplesMetadataContext from "./src/contexts/SamplesMetadataContext";
import {PaperProvider} from "react-native-paper";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SignInScreen} from "./src/screens/signInScreen/SignInScreen";
import {onAuthStateChanged} from "firebase/auth";
import {FirebaseAuth} from "./firebaseConfig";

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message


export default function App() {

  const [samplesMetadata, setSamplesMetadata] = useState<SampleMetadata[]>([])
  const samplesContextValue = React.useMemo(() => ({samplesMetadata, setSamplesMetadata}), [samplesMetadata]);

  const [isLogged, setIsLogged] = useState(false)

  onAuthStateChanged(FirebaseAuth, (user) => {
    if (user) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  });

  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider>
      <SamplesMetadataContext.Provider value={samplesContextValue}>
        <NavigationContainer>
          {isLogged ? (
            <MainTabs/>
          ) : (
            <Stack.Navigator>
              <Stack.Screen name={"Sign in"} component={SignInScreen}/>
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </SamplesMetadataContext.Provider>
    </PaperProvider>
  )
}

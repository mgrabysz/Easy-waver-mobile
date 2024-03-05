import React, {useState} from "react";
import {LogBox,} from "react-native";
import "reflect-metadata"
import {NavigationContainer} from "@react-navigation/native";
import {MainRoute} from "./src/screens/routes/MainRoute";
import SamplesMetadataContext from "./src/contexts/SamplesMetadataContext";
import {PaperProvider} from "react-native-paper";
import {SignInRoute} from "./src/screens/routes/SignInRoute";
import LoggedUserContext from "./src/contexts/LoggedUserContext";

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message


export default function App() {

  const [samplesMetadata, setSamplesMetadata] = useState<SampleMetadata[]>([])
  const samplesContextValue = React.useMemo(() => ({samplesMetadata, setSamplesMetadata}), [samplesMetadata]);

  const [isLogged, setIsLogged] = useState(false)
  const loggedUserContextValue = React.useMemo(() => ({isLogged, setIsLogged}), [isLogged]);

  return (
    <PaperProvider>
      <LoggedUserContext.Provider value={loggedUserContextValue}>
        <SamplesMetadataContext.Provider value={samplesContextValue}>
          <NavigationContainer>
            {isLogged ? (<MainRoute/>) : (<SignInRoute/>)}
          </NavigationContainer>
        </SamplesMetadataContext.Provider>
      </LoggedUserContext.Provider>
    </PaperProvider>
  )
}

import React, {useState} from "react";
import {LogBox,} from "react-native";
import "reflect-metadata"
import {NavigationContainer} from "@react-navigation/native";
import {MainTabs} from "./src/screens/tabs/MainTabs";
import SamplesMetadataContext from "./src/contexts/SamplesMetadataContext";
import {PaperProvider} from "react-native-paper";

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message


export default function App() {

  const [samplesMetadata, setSamplesMetadata] = useState<SampleMetadata[]>([])
  const samplesContextValue = React.useMemo(() => ({samplesMetadata, setSamplesMetadata}), [samplesMetadata]);

  return (
    <PaperProvider>
      <SamplesMetadataContext.Provider value={samplesContextValue}>
        <NavigationContainer>
          <MainTabs/>
        </NavigationContainer>
      </SamplesMetadataContext.Provider>
    </PaperProvider>

  )
}

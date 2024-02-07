import React, {useEffect, useState} from "react";
import {Platform, SafeAreaView, ScrollView, StyleSheet, Text, View,} from "react-native";
import RestClient from './network/RestClient'
import Constants from "expo-constants";
import {Container} from "typedi";
import "reflect-metadata"


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [samples, setSamples] = useState<SampleMetadata[]>([])

  const restClient = Container.get(RestClient)

  useEffect(() => {

      restClient.getSamplesMetadata()
        .then(samples => {
          setSamples(samples);
          setIsLoading(false)
        })
        .catch(error => {
          console.log(error.message)
          alert("Error fetching data")
        })

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {isLoading && <Text> Loading </Text>}
      </View>
      <ScrollView>
        {samples.map((sample, index) =>
          <Text key={index}>{sample.name}</Text>)}
      </ScrollView>
    </SafeAreaView>
  );
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
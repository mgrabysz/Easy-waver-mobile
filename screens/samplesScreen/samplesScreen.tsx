import {Button, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import Constants from "expo-constants";
import {Audio} from "expo-av";
import {Container} from "typedi";
import RestClient from "../../network/RestClient";

type SamplesProps = {}

export function SamplesScreen(props: SamplesProps) {

  const restClient = Container.get(RestClient)

  const [sampleMetadataList, setSampleMetadataList] = useState<SampleMetadata[]>([])
  const [sound, setSound] = useState<Audio.Sound>();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( { uri: "https://easy-waver-jyn7b2y2ja-lm.a.run.app/files/guitar.wav"}, {}, null, true);
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    // get samples metadata
    restClient.getSamplesMetadata()
      .then(samples => {
        setSampleMetadataList(samples)
      })
      .catch(error => {
        console.log(error)
        alert("Error fetching data")
      })

    // clean up sound
    return sound
      ? () => {
        console.log('Unloading Sound');
        // @ts-ignore
        sound.unloadAsync();
      }
      : undefined;
  }, [sound])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {sampleMetadataList.map((sample, index) =>
          <Text key={index}>{sample.name}</Text>)}
      </ScrollView>
      <View style={styles.container}>
        <Button title="Play Sound" onPress={playSound}/>
      </View>

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
  }
});
import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {Audio} from "expo-av";
import {Container} from "typedi";
import RestClient from "../../network/RestClient";
import SoundClient from "../../network/SoundClient";
import SampleCard from "./SampleCard";

type SamplesProps = {}

export function SamplesScreen(props: SamplesProps) {
  const restClient = Container.get(RestClient)
  const soundClient = Container.get(SoundClient)

  const [sampleMetadataList, setSampleMetadataList] = useState<SampleMetadata[]>([])
  const [sound, setSound] = useState<Audio.Sound>();

  async function playSound(sampleName: string) {
    console.log('Loading Sound');
    const sound = await soundClient.getSound(sampleName);
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
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scroll}>
        {sampleMetadataList.map((sample, index) => {
          return (
            <SampleCard key={index} name={sample.name} onPress={() => playSound(sample.name)}></SampleCard>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 20
  },
  scroll: {
    width: '100%',
  }
});
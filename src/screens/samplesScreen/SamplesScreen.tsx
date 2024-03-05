import {Alert, RefreshControl, SafeAreaView, ScrollView, StyleSheet} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {Audio} from "expo-av";
import {Container} from "typedi";
import RestClient from "../../network/RestClient";
import SoundClient from "../../network/SoundClient";
import SampleCard from "./components/SampleCard";
import Theme from "../../themes/theme";
import NewSampleModal from "../../components/NewSampleModal";
import RecordingModal from "./components/StopRecordingModal";
import * as FileSystem from 'expo-file-system';
import {SamplesHeader} from "./components/SamplesHeader";
import {Recording} from "expo-av/build/Audio/Recording";
import {startRecording, stopRecording} from "../../internal/RecordingAgent";
import LoadingActivity from "../../components/LoadingActivity";
import SamplesMetadataContext from "../../contexts/SamplesMetadataContext";


// @ts-ignore
export function SamplesScreen({navigation}) {
  const restClient = Container.get(RestClient)
  const soundClient = Container.get(SoundClient)

  const {samplesMetadata, setSamplesMetadata} = useContext(SamplesMetadataContext)

  const [sound, setSound] = useState<Audio.Sound>();
  const [recording, setRecording] = useState<Recording>();
  // strings
  const [recentRecordingUri, setRecentRecordingUri] = useState('');
  const [newSampleName, setNewSampleName] = useState('');
  // booleans
  const [newSampleModalVisible, setNewSampleModalVisible] = useState(false);
  const [recordingModalVisible, setRecordingModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLoading(true)
    refreshSamplesMetadata().then(() => setLoading(false))

    navigation.setOptions({
      headerRight: () => <SamplesHeader onMicrophoneClicked={
        () => startRecording()
          .then((recording) => {
            setRecording(recording);
            setRecordingModalVisible(true)
          })
          .catch(() => {
            alert("Error starting recording")
          })}
      />
    })
  }, []);

  useEffect(() => {
    // clean up sound
    return sound
      ? () => {
        console.log('Unloading Sound');
        // @ts-ignore
        sound.unloadAsync();
      }
      : undefined;
  }, [sound])

  async function refreshSamplesMetadata(): Promise<void> {
    try {
      const samples = await restClient.getSamplesMetadata()
      setSamplesMetadata(samples)
    } catch (error) {
      console.log(error)
      alert("Error fetching data")
    }
  }

  async function playSound(sampleName: string) {
    console.log('Loading Sound');
    const sound = await soundClient.getSound(sampleName);
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
  }

  async function playSoundFromLocalUri(uri: string) {
    console.log('Loading Sound');
    const {sound} = await Audio.Sound.createAsync({uri: uri})
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
  }

  async function renameRecording(uri: string, newName: string) {
    const newUri = FileSystem.cacheDirectory + newName + '.m4a'
    await FileSystem.moveAsync({
      from: uri,
      to: newUri
    })
    return newUri;
  }

  return (
    <SafeAreaView style={styles.container}>
      <RecordingModal
        visible={recordingModalVisible}
        setVisible={setRecordingModalVisible}
        onForcedClose={() => {
          Alert.alert('Recording has been canceled');
          setRecordingModalVisible(!recordingModalVisible);
          stopRecording(recording).then(() => setRecording(undefined))
        }}
        onStop={() => {
          setRecordingModalVisible(!recordingModalVisible)
          setNewSampleModalVisible(!newSampleModalVisible)
          stopRecording(recording)
            .then(uri => {
              if (uri != null) {
                void playSoundFromLocalUri(uri)
                setRecording(undefined)
                setRecentRecordingUri(uri)
              } else {
                alert("Error saving recording")
              }
            })
        }}
      />
      <NewSampleModal
        visible={newSampleModalVisible}
        setVisible={setNewSampleModalVisible}
        text={newSampleName}
        onChangeText={setNewSampleName}
        onDiscard={() => setNewSampleModalVisible(false)}
        onUpload={() => {
          setNewSampleModalVisible(false)
          setLoading(true)
          renameRecording(recentRecordingUri, newSampleName)
            .then(newUri => {
              setNewSampleName('')
              setRecentRecordingUri('')
              return restClient.uploadSample(newUri);
            })
            .then(refreshSamplesMetadata)
            .finally(() => setLoading(false))
        }}
        onForcedClose={() => {
          Alert.alert('Recording has been discarded');
          setNewSampleModalVisible(false);
        }}/>
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scroll}
                  refreshControl={
                    <RefreshControl refreshing={refreshing}
                                    onRefresh={() => {
                                      setRefreshing(true)
                                      refreshSamplesMetadata()
                                        .then(() => setRefreshing(false))
                                    }}/>
                  }>
        {samplesMetadata.map((sample, index) => {
          return (
            <SampleCard key={index} name={sample.name} onPlayPressed={() => playSound(sample.name)}
                        onDeletePressed={() => {
                          setLoading(true)
                          restClient.deleteSample(sample.name)
                            .then(refreshSamplesMetadata)
                            .catch(() => alert("Error deleting file"))
                            .finally(() => setLoading(false))
                        }}/>
          )
        })}
      </ScrollView>
      {loading && <LoadingActivity/>}
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.secondary
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 20
  },
  scroll: {
    width: '100%',
  },
});
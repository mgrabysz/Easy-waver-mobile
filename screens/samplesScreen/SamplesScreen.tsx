import {Alert, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Audio} from "expo-av";
import {Container} from "typedi";
import RestClient from "../../network/RestClient";
import SoundClient from "../../network/SoundClient";
import SampleCard from "./SampleCard";
import Theme from "../../theme";
import Entypo from "@expo/vector-icons/Entypo";
import {FontAwesome} from "@expo/vector-icons";
import NewSampleModal from "./components/NewSampleModal";
import RecordingModal from "./components/StopRecordingModal";
import {AndroidAudioEncoder, AndroidOutputFormat} from "expo-av/build/Audio/RecordingConstants";
import * as FileSystem from 'expo-file-system';


// @ts-ignore
export function SamplesScreen({navigation}) {
  const restClient = Container.get(RestClient)
  const soundClient = Container.get(SoundClient)

  const [sampleMetadataList, setSampleMetadataList] = useState<SampleMetadata[]>([])
  const [sound, setSound] = useState<Audio.Sound>();

  const [recordingModalVisible, setRecordingModalVisible] = useState(false);
  const [newSampleModalVisible, setNewSampleModalVisible] = useState(false);
  const [recording, setRecording] = useState();
  const [recentRecordingUri, setRecentRecordingUri] = useState('');
  const [newSampleName, setNewSampleName] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.button}>
            <Entypo name="upload" size={24} color="black"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            startRecording().then(() => setRecordingModalVisible(true))
          }}>
            <FontAwesome name="microphone" size={24} color="black"/>
          </TouchableOpacity>
        </View>
      )
    })
  }, []);

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        console.log('Starting recording..');
        const {recording} = await Audio.Recording.createAsync({
          isMeteringEnabled: true,
          android: {
            ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
            outputFormat: AndroidOutputFormat.MPEG_4,
            audioEncoder: AndroidAudioEncoder.AAC,
            numberOfChannels: 1
          },
          ios: {
            ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
            numberOfChannels: 1
          },
          web: {
            mimeType: 'audio/wav',
            bitsPerSecond: 128000,
          },
        });
        // @ts-ignore
        setRecording(recording);
        console.log('Recording started');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    // @ts-ignore
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    // @ts-ignore
    const uri = recording.getURI();
    setRecentRecordingUri(uri);
    console.log('Recording stopped and stored at', uri);
    return uri;
  }

  async function playSound(sampleName: string) {
    console.log('Loading Sound');
    const sound = await soundClient.getSound(sampleName);
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
  }

  async function playLocalSound(uri: string) {
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
      <RecordingModal
        visible={recordingModalVisible}
        setVisible={setRecordingModalVisible}
        onForcedClose={() => {
          Alert.alert('Recording has been canceled');
          setRecordingModalVisible(!recordingModalVisible);
          stopRecording().then()
        }}
        onStop={() => {
          setRecordingModalVisible(!recordingModalVisible)
          stopRecording()
            .then(uri => playLocalSound(uri))
          setNewSampleModalVisible(!newSampleModalVisible)
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
          renameRecording(recentRecordingUri, newSampleName)
            .then(newUri => {
              restClient.uploadSample(newUri);
              setNewSampleName('')
              setRecentRecordingUri('')
            })
        }}/>
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
    backgroundColor: Theme.secondary
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 20
  },
  scroll: {
    width: '100%',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: "center",
    paddingRight: 15
  },
  button: {
    paddingHorizontal: 20
  },

});
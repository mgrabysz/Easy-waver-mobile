import {Audio} from "expo-av";
import {AndroidAudioEncoder, AndroidOutputFormat} from "expo-av/build/Audio/RecordingConstants";

export async function startRecording() {
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
      console.log('Recording started');
      return recording
    }
  } catch (err) {
    console.error('Failed to start recording', err);
  }
}

export async function stopRecording(recording: Audio.Recording | undefined) {
  if (recording == null) {
    throw Error("Recording missing")
  }
  console.log('Stopping recording..');
  await recording.stopAndUnloadAsync();
  await Audio.setAudioModeAsync(
    {
      allowsRecordingIOS: false,
    }
  );
  const uri = recording.getURI();
  console.log('Recording stopped and stored at', uri);
  return uri;
}

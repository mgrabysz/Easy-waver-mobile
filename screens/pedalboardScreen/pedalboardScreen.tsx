import {View, Text} from "react-native";

export function PedalboardScreen() {
  // FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'samples', {intermediates: true})
  //   .then(() => console.log('finished dupa'))
  //   .then(() => FileSystem.downloadAsync(url, FileSystem.documentDirectory + 'samples/' + 'wave.wav'))
  //   .then(({ uri }) => console.log('Finished downloading to ', uri))
  //   .then(() => FileSystem.readDirectoryAsync(FileSystem.documentDirectory! + 'samples'))
  //   .then(response => setFolderContent(response))
  //   .catch(error => {throw error} )
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}
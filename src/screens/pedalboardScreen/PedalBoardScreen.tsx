import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import Theme from "../../themes/theme";
import InputSampleCard from "./components/InputSampleCard";
import {useContext} from "react";
import SamplesMetadataContext from "../../contexts/SamplesMetadataContext";

export function PedalBoardScreen() {
  const {samplesMetadata, setSamplesMetadata} = useContext(SamplesMetadataContext)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scroll}>
        <InputSampleCard samplesMetadata={samplesMetadata}/>
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
});
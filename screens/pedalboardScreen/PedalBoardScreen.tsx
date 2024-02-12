import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import Theme from "../../theme";
import InputSampleCard from "./components/InputSampleCard";

export function PedalBoardScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scroll}>
        <InputSampleCard/>
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
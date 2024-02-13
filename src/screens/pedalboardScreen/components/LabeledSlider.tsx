import {StyleSheet, Text, View} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Theme from "../../../themes/theme";

interface LabeledSliderProps {
  value: number,
  setValue: (v: number) => void,
  label: string
}

function getRounded(i: number): string {
  return (Math.round(i * 100) / 100).toFixed(2)
}

const LabeledSlider = (props: LabeledSliderProps) => {
  return (<View>
    <View style={styles.labelContainer}>
      <Text>{props.label}</Text>
      <Text>{getRounded(props.value)}</Text>
    </View>
    <MultiSlider
      values={[props.value]}
      min={0}
      max={1}
      step={0.05}
      sliderLength={200}
      onValuesChange={(v) => props.setValue(v[0])}
      allowOverlap={true}   // for some reason it enables reaching max value
      markerStyle={styles.slider}
      selectedStyle={styles.slider}
    ></MultiSlider>
  </View>)
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  slider: {
    backgroundColor: Theme.intenseBlue
  }
})

export default LabeledSlider
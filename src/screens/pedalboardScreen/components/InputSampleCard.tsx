import {StyleSheet, Text, View} from "react-native";
import Theme from "../../../themes/theme";
import {Picker} from '@react-native-picker/picker';
import Entypo from "@expo/vector-icons/Entypo";

interface InputSampleCardProps {
  samplesMetadata: SampleMetadata[],
  selectedSample: string,
  setSelectedSample: (s: string) => void
}

function trimExtension(filename: string) {
  return filename.replace(/\.[^/.]+$/, "")
}

const InputSampleCard = (props: InputSampleCardProps) => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>Select a sample</Text>
      <View style={styles.bottomContainer}>
        <View style={styles.square}>
          <Entypo name={"note"} size={15} color={"black"}/>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={props.selectedSample}
            onValueChange={(itemValue, itemIndex) => {
              props.setSelectedSample(itemValue)
            }}
            prompt={"Select a sample"}
          >
            {props.samplesMetadata.map((sample, index) => {
              return (<Picker.Item key={index} label={trimExtension(sample.name)} value={sample.name}/>)
            })}
          </Picker>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: Theme.primary,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: Theme.intenseBlue,
    borderRadius: 5,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    paddingBottom: 10
  },
  pickerContainer: {
    flexGrow: 1,
    borderRadius: 5,
    backgroundColor: "#ebeef0"
  },
  picker: {},
})

export default InputSampleCard;
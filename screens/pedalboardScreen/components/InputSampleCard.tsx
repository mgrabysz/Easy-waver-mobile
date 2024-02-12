import {StyleSheet, Text, View} from "react-native";
import Theme from "../../../theme";
import {Picker} from '@react-native-picker/picker';
import Entypo from "@expo/vector-icons/Entypo";
import {useState} from "react";
import mockSamples from '../../../mockSamples.json'

const InputSampleCard = () => {
  const [selectedSample, setSelectedSample] = useState();
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
            selectedValue={selectedSample}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedSample(itemValue)
            }
            prompt={"Select a song"}
          >
            {mockSamples.map((sample, index) => {
              return (<Picker.Item key={index} label={sample.name} value={sample.id}/>)
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
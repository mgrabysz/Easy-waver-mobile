import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import ModalStyles from "./ModalStyles";
import {Picker} from "@react-native-picker/picker";
import React from "react";
import {AntDesign} from '@expo/vector-icons';
import DecisionButtons from "../../../components/DecisionButtons";
import {FilterCategory} from "../../../model/Filter";

export interface FilterModalState {
  isVisible: boolean,
  type: string,
  category: string,
  c_freq: number,
  bandwidth?: number,
  order: number
}

export function getDefaultFilterModalState(): FilterModalState {
  return {
    isVisible: false,
    type: "BUTTER",
    category: "LOWPASS",
    c_freq: 400,
    order: 2
  }
}

export function extractFilterParams(state: FilterModalState) {
  return {
    type: state.type,
    category: state.category,
    c_freq: state.c_freq,
    bandwidth: state.bandwidth,
    order: state.order
  }
}

interface FilterModalProps {
  state: FilterModalState,
  setState: (s: FilterModalState) => void,
  onDiscard: () => void,
  onAccept: () => void
}

function getFreqFieldName(category: string) {
  switch (category) {
    case "BANDPASS":
    case "BANDREJECT":
      return "Central frequency"
    case "LOWPASS":
    case "HIGHPASS":
      return "Cutoff frequency"
    default:
      return('')
  }
}

function isBandwidthRequired(category: string) {
  return category == "BANDPASS" || category == "BANDREJECT"
}

function titleCaseWord(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

export function FilterModal(props: FilterModalProps) {

  let state = props.state

  return <Modal
    animationType={"slide"}
    transparent={true}
    visible={state.isVisible}
    onRequestClose={props.onDiscard}>
    <View style={ModalStyles.centeredView}>
      <View style={ModalStyles.modalView}>
        <View style={ModalStyles.titleContainer}>
          <Text style={ModalStyles.title}>Configure filter pedal</Text>
        </View>

        <View style={styles.typeContainer}>
          <Text>Filter category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={state.category}
              onValueChange={(itemValue) => {
                props.setState({...props.state, category: itemValue})
              }}
              prompt={"Select filter category"}>
              {Object.keys(FilterCategory).map(value => <Picker.Item label={titleCaseWord(value)} value={value}/>)}
            </Picker>
          </View>
        </View>

        <View style={styles.typeContainer}>
          <Text>{getFreqFieldName(state.category) + " (Hz)"}</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              props.setState({...state, c_freq: Number(text)})
            }}
            value={state.c_freq.toString()}
            autoFocus={true}
            inputMode={"numeric"}
          />
        </View>

        {isBandwidthRequired(state.category) && <View style={styles.typeContainer}>
          <Text>Bandwidth (Hz)</Text>
          <TextInput
            style={styles.input}
            value={state.bandwidth?.toString()}
            defaultValue={"0"}
            onChangeText={(text) => {
              props.setState({...state, bandwidth: Number(text)})
            }}
            autoFocus={true}
            inputMode={"numeric"}
          />
        </View>}

        <View style={styles.orderContainer}>
          <Text style={{flexGrow: 1}}>Order</Text>
          <View style={styles.numberSetter}>
            <TouchableOpacity onPress={() => {
              if (state.order > 1) {
                props.setState({...state, order: state.order - 1})
              }
            }}>
              <AntDesign name="caretleft" size={24} color="black" />
            </TouchableOpacity>
            <Text>{state.order}</Text>
            <TouchableOpacity onPress={() => {
              props.setState({...state, order: state.order + 1})
            }}>
              <AntDesign name="caretright" size={24} color="black" />
            </TouchableOpacity>

          </View>

        </View>
        <DecisionButtons styleConfig={{marginTop: 10}} positiveText={"Accept"} negativeText={"Discard"}
                         onPositive={props.onAccept}
                         onNegative={props.onDiscard}/>
      </View>
    </View>
  </Modal>
}

const styles = StyleSheet.create({
  typeContainer: {
    flexDirection: "column",
    width: "100%",
    marginVertical: 10
  },
  pickerContainer: {
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    backgroundColor: "#ebeef0"
  },
  input: {
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 5
  },
  orderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: 'red',
    width: "100%",
    marginVertical: 10

  },
  numberSetter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
    // backgroundColor: 'green'
  }
})
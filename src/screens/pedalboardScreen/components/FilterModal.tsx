import {Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import ModalStyles from "./ModalStyles";
import {Picker} from "@react-native-picker/picker";
import React from "react";
import {AntDesign} from '@expo/vector-icons';
import DecisionButtons from "../../../components/DecisionButtons";
import {FilterCategory, FilterType} from "../../../model/Filter";
import Theme from "../../../themes/theme";

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
    type: "butter",
    category: "lowpass",
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

function titleCaseWord(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

function getFilterTypeName(type: string) {
  return type == "canonical" ? "Canonical" : "Butterworth"
}

function getMaxOrder(type: string) {
  return type == "canonical" ? 2 : 5
}

export function FilterModal(props: FilterModalProps) {

  let state = props.state
  const frequencyLabel = ["bandpass", "bandreject"].includes(state.category) ? "Central frequency" : "Cutoff frequency"
  const isBandwidthRequired = ["bandpass", "bandreject"].includes(state.category)
  const maxOrder = getMaxOrder(state.type)

  return <Modal
    animationType={"slide"}
    transparent={true}
    visible={state.isVisible}
    onRequestClose={props.onDiscard}>
    <View style={ModalStyles.centeredView}>
      <View style={styles.modalView}>
        <View style={ModalStyles.titleContainer}>
          <Text style={ModalStyles.title}>Configure filter pedal</Text>
        </View>
        <ScrollView>
          <View style={styles.typeContainer}>
            <Text>Filter type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={state.type}
                onValueChange={(itemValue) => {
                  const maxOrder = getMaxOrder(itemValue)
                  if (state.order > maxOrder) {
                    props.setState({...props.state, order: maxOrder, type: itemValue})
                  } else {
                    props.setState({...props.state, type: itemValue})
                  }
                }}
                prompt={"Select filter category"}>
                {Object.values(FilterType).map((value, index) => <Picker.Item key={index}
                                                                              label={getFilterTypeName(value)}
                                                                              value={value}/>)}
              </Picker>
            </View>
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
                {Object.values(FilterCategory).map((value, index) => <Picker.Item key={index}
                                                                                  label={titleCaseWord(value)}
                                                                                  value={value}/>)}
              </Picker>
            </View>
          </View>

          <View style={styles.typeContainer}>
            <Text>{frequencyLabel + " (Hz)"}</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                props.setState({...state, c_freq: Number(text)})
              }}
              value={state.c_freq.toString()}
              autoFocus={false}
              inputMode={"numeric"}
            />
          </View>

          {isBandwidthRequired && <View style={styles.typeContainer}>
            <Text>Bandwidth (Hz)</Text>
            <TextInput
              style={styles.input}
              value={state.bandwidth?.toString()}
              defaultValue={"0"}
              onChangeText={(text) => {
                props.setState({...state, bandwidth: Number(text)})
              }}
              autoFocus={false}
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
                <AntDesign name="caretleft" size={24} color="black"/>
              </TouchableOpacity>
              <Text>{state.order}</Text>
              <TouchableOpacity onPress={() => {
                if (state.order < maxOrder) {
                  props.setState({...state, order: state.order + 1})
                }
              }}>
                <AntDesign name="caretright" size={24} color="black"/>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <DecisionButtons styleConfig={{marginTop: 10}} positiveText={"Accept"} negativeText={"Discard"}
                         onPositive={props.onAccept} isPositiveDisabled={false} onNegative={props.onDiscard}/>
      </View>
    </View>
  </Modal>
}

const styles = StyleSheet.create({
  modalView: {
    flexDirection: "column",
    alignItems: 'center',
    padding: 35,
    width: "80%",
    height: "75%",
    backgroundColor: Theme.primary,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
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
import {Modal, Text, View} from "react-native";
import ModalStyles from "./ModalStyles";
import {Picker} from "@react-native-picker/picker";
import React from "react";
import DecisionButtons from "../../../components/DecisionButtons";

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
    type: "canonical",
    category: "lowpass",
    c_freq: 400,
    order: 2
  }
}

interface FilterModalProps {
  state: FilterModalState,
  setState: (s: FilterModalState) => void,
  onDiscard: () => void,
  onAccept: () => void
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

        <View style={ModalStyles.typeContainer}>
          <Text>Filter type</Text>
          <View style={ModalStyles.pickerContainer}>
            <Picker
              selectedValue={state.type}
              onValueChange={(itemValue) => {
                props.setState({...props.state, type: itemValue})
              }}
              prompt={"Select filter type"}>
              <Picker.Item label={"Canonical"} value={"Canonical"}/>
              <Picker.Item label={"Butter"} value={"Butter"}/>
            </Picker>
          </View>
        </View>

        <View style={ModalStyles.typeContainer}>
          <Text>Filter category</Text>
          <View style={ModalStyles.pickerContainer}>
            <Picker
              selectedValue={state.category}
              onValueChange={(itemValue) => {
                props.setState({...props.state, category: itemValue})
              }}
              prompt={"Select filter category"}>
              <Picker.Item label={"Lowpass"} value={"Lowpass"}/>
              <Picker.Item label={"Highpass"} value={"Highpass"}/>
              <Picker.Item label={"Bandpass"} value={"Bandpass"}/>
              <Picker.Item label={"Bandreject"} value={"Bandreject"}/>
            </Picker>
          </View>
        </View>
        <DecisionButtons styleConfig={{marginTop: 10}} positiveText={"Accept"} negativeText={"Discard"}
                         onPositive={props.onAccept}
                         onNegative={props.onDiscard}/>
      </View>
    </View>
  </Modal>
}
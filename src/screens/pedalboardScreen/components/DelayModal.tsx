import {Modal, Text, View} from "react-native";
import LabeledSlider from "./LabeledSlider";
import React from "react";
import {Picker} from "@react-native-picker/picker";
import DecisionButtons from "../../../components/DecisionButtons";
import ModalStyles from "./ModalStyles";

export interface DelayModalState {
  isVisible: boolean,
  type: string,
  level: number,
  time: number
}

export function getDefaultDelayModalState(): DelayModalState {
  return {
    isVisible: false,
    type: "IIR",
    level: 0.5,
    time: 0.5
  }
}

interface DelayModalProps {
  state: DelayModalState
  setState: (s: DelayModalState) => void
  onDiscard: () => void,
  onAccept: () => void
}

export function DelayModal(props: DelayModalProps) {

  let state = props.state

  return <Modal
    animationType={"slide"}
    transparent={true}
    visible={state.isVisible}
    onRequestClose={props.onDiscard}
  >
    <View style={ModalStyles.centeredView}>
      <View style={ModalStyles.modalView}>
        <View style={ModalStyles.titleContainer}>
          <Text style={ModalStyles.title}>Configure delay pedal</Text>
        </View>
        <View style={ModalStyles.typeContainer}>
          <Text>Delay type</Text>
          <View style={ModalStyles.pickerContainer}>
            <Picker
              selectedValue={state.type}
              onValueChange={(itemValue) => {
                props.setState({...props.state, type: itemValue})
              }}
              prompt={"Select delay type"}>
              <Picker.Item label={"IIR"} value={"IIR"}/>
              <Picker.Item label={"FIR"} value={"FIR"}/>
            </Picker>
          </View>
        </View>
        <LabeledSlider value={state.level} setValue={(value) => {
          props.setState({...props.state, level: value})
        }} label={"Level"}/>
        <LabeledSlider value={state.time} setValue={(value) => {
          props.setState({...props.state, time: value})
        }} label={"Time"}/>
        <DecisionButtons styleConfig={{marginTop: 10}} positiveText={"Accept"} negativeText={"Discard"}
                         onPositive={props.onAccept}
                         onNegative={props.onDiscard}/>
      </View>
    </View>
  </Modal>
}

import {Modal, StyleSheet, Text, View} from "react-native";
import Theme from "../../../themes/theme";
import LabeledSlider from "./LabeledSlider";
import React from "react";
import {Picker} from "@react-native-picker/picker";
import DecisionButtons from "../../../components/DecisionButtons";
import {DelayModalState} from "../../../model/Delay";

interface DelayModalProps {
  state: DelayModalState
  setState: (s: DelayModalState) => void
  onDiscard: () => void,
  onAccept: () => void
}

export default function DelayModal(props: DelayModalProps) {

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


const ModalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flexDirection: "column",
    alignItems: 'center',
    padding: 35,
    width: "80%",
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
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  title: {
    fontWeight: "bold",
    fontSize: 18
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pickerContainer: {
    flexGrow: 1,
    borderRadius: 5,
    marginVertical: 20,
    marginLeft: 20,
    backgroundColor: "#ebeef0"
  },
})

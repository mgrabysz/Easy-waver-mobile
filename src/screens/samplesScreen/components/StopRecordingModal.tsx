import {Modal, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import ModalStyles from "./ModalStyles";

interface StopRecordingModalProps {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  onForcedClose: () => void,
  onStop: () => void
}

export default function RecordingModal(props: StopRecordingModalProps) {
  return <Modal
    animationType="slide"
    transparent={true}
    visible={props.visible}
    onRequestClose={props.onForcedClose}>
    <View style={ModalStyles.centeredView}>
      <View style={ModalStyles.modalView}>
        <Text style={ModalStyles.modalText}>Recording...</Text>
        <TouchableOpacity style={[ModalStyles.modalButton, ModalStyles.negativeButton]} onPress={props.onStop}>
          <Text style={ModalStyles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>;
}

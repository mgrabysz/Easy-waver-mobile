import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import Theme from "../../../theme";

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
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Recording...</Text>
        <TouchableOpacity style={[styles.modalButton, styles.negativeButton]} onPress={props.onStop}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>;
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: Theme.primary,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%"
  },
  modalButton: {
    width: 90,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  negativeButton: {
    backgroundColor: Theme.alertingRed
  },
  positiveButton: {
    backgroundColor: Theme.positiveGreen
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%"
  },
  decisionButtonsView: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
})
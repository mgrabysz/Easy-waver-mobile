import React from "react";
import {Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Theme from "../../../theme";

interface NewSampleModalProps {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  text: string,
  onChangeText: React.Dispatch<React.SetStateAction<string>>,
  onDiscard: () => void,
  onUpload: () => void
}

export default function NewSampleModal(props: NewSampleModalProps) {
  return <Modal
    animationType="slide"
    transparent={true}
    visible={props.visible}
    onRequestClose={() => {
      Alert.alert('Recording has been discarded');
      props.setVisible(!props.visible)
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TextInput
          style={styles.input}
          onChangeText={props.onChangeText}
          value={props.text}
          placeholder='My new sample'
          autoFocus={true}
        />
        <View style={styles.decisionButtonsView}>
          <TouchableOpacity style={[styles.negativeButton, styles.modalButton]} onPress={props.onDiscard}>
            <Text style={styles.buttonText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.positiveButton, styles.modalButton]} onPress={props.onUpload}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
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
    width: '80%'
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
    marginBottom: 25,
    borderWidth: 1,
    padding: 10,
    width: '100%'
  },
  decisionButtonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%'
  }
})
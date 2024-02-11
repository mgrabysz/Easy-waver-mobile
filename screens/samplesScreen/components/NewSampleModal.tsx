import React from "react";
import {Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import ModalStyles from "./ModalStyles";

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
    <View style={ModalStyles.centeredView}>
      <View style={ModalStyles.modalView}>
        <TextInput
          style={styles.input}
          onChangeText={props.onChangeText}
          value={props.text}
          placeholder='My new sample'
          autoFocus={true}
        />
        <View style={styles.decisionButtonsView}>
          <TouchableOpacity style={[ModalStyles.negativeButton, ModalStyles.modalButton]} onPress={props.onDiscard}>
            <Text style={ModalStyles.buttonText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[ModalStyles.positiveButton, ModalStyles.modalButton]} onPress={props.onUpload}>
            <Text style={ModalStyles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>;
}

const styles = StyleSheet.create({
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
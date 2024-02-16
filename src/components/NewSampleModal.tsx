import React from "react";
import {Modal, StyleSheet, TextInput, View} from "react-native";
import DecisionButtons from "./DecisionButtons";
import Theme from "../themes/theme";

interface NewSampleModalProps {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  text: string,
  onChangeText: React.Dispatch<React.SetStateAction<string>>,
  onDiscard: () => void,
  onUpload: () => void,
  onForcedClose: () => void
}

export default function NewSampleModal(props: NewSampleModalProps) {
  const isNameCorrect = props.text.length > 0

  return <Modal
    animationType="slide"
    transparent={true}
    visible={props.visible}
    onRequestClose={props.onForcedClose}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TextInput
          style={styles.input}
          onChangeText={props.onChangeText}
          value={props.text}
          placeholder='My new sample'
          autoFocus={true}
          autoCorrect={false}
        />
        <DecisionButtons positiveText={"Upload"} negativeText={"Discard"} onPositive={props.onUpload}
                         onNegative={props.onDiscard} isPositiveDisabled={!isNameCorrect}/>
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
    width: '100%',
    borderRadius: 5
  },
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
})
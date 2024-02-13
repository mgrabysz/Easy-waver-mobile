import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import Theme from "../themes/theme";

interface DecisionButtonsProps {
  styleConfig?: {},
  positiveText: string,
  negativeText: string,
  onPositive: () => void,
  onNegative: () => void
}
const DecisionButtons = (props: DecisionButtonsProps) => {
  return (
    <View style={[styles.decisionButtonsView, props.styleConfig]}>
      <TouchableOpacity style={[styles.negativeButton, styles.modalButton]} onPress={props.onNegative}>
        <Text style={styles.buttonText}>{props.negativeText}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.positiveButton, styles.modalButton]} onPress={props.onPositive}>
        <Text style={styles.buttonText}>{props.positiveText}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
  decisionButtonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%'
  },
  modalButton: {
    width: 90,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
})

export default DecisionButtons;
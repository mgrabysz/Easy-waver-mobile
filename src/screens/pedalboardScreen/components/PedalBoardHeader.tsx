import {StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import React from "react";
import Theme from "../../../themes/theme";

interface PedalBoardHeaderProps {
  onPlayClicked: () => void
  disabled: boolean
}

export function PedalBoardHeader(props: PedalBoardHeaderProps) {
  const buttonColor = props.disabled ? Theme.inactiveGrey : 'black'
  return <View style={styles.headerButtons}>
    <TouchableOpacity style={styles.button} onPress={props.onPlayClicked} disabled={props.disabled}>
      <MaterialCommunityIcons name="amplifier" size={24} color={buttonColor} />
    </TouchableOpacity>
  </View>;
}

const styles = StyleSheet.create({
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: "center",
    paddingRight: 15
  },
  button: {
    paddingHorizontal: 20
  }
});
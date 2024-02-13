import {StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
import React from "react";

interface PedalBoardHeaderProps {
  onPlayClicked: () => void
}

export function PedalBoardHeader(props: PedalBoardHeaderProps) {
  return <View style={styles.headerButtons}>
    <TouchableOpacity style={styles.button} onPress={props.onPlayClicked}>
      <MaterialIcons name="piano" size={24} color="black"/>
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
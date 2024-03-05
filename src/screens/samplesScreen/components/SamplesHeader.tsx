import {StyleSheet, TouchableOpacity, View} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import {FontAwesome} from "@expo/vector-icons";
import React from "react";

interface SamplesHeaderProps {
  onMicrophoneClicked: () => Promise<void>
  onSignOutClicked: () => void
}

export function SamplesHeader(props: SamplesHeaderProps) {

  return <View style={styles.headerButtons}>
    <TouchableOpacity style={styles.button} onPress={props.onMicrophoneClicked}>
      <FontAwesome name="microphone" size={24} color="black"/>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={props.onSignOutClicked}>
      <Entypo name="log-out" size={24} color="black"/>
    </TouchableOpacity>
  </View>;
}

const styles = StyleSheet.create({
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: "center",
    paddingRight: 10
  },
  button: {
    paddingHorizontal: 20
  },
})
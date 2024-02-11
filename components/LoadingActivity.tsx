import {ActivityIndicator, StyleSheet, View} from "react-native";
import React from "react";
import Theme from "../theme";

export default function LoadingActivity() {
  return (<View style={styles.loading}>
    <ActivityIndicator size='large' color={Theme.intenseBlue}/>
  </View>)
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
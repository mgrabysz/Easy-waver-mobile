import {StyleSheet, Text, TextInput, View} from "react-native";
import Theme from "../../../themes/theme";

interface InputCardProps {
  title: string,
  text: string,
  setText: (s: string) => void,
  secure?: boolean
}

const InputCard = (props: InputCardProps) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput style={styles.input} value={props.text} onChangeText={props.setText} secureTextEntry={props.secure}/>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: Theme.primary,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: "100%",
    marginBottom: 20
  },
  title: {
    fontSize: 18,
    paddingVertical: 10
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 5
  }})

export default InputCard
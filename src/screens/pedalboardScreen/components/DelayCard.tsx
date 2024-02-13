import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Theme from "../../../themes/theme";
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

interface DelayCardProps {
  type: string,
  level: number,
  time: number,
  onEdit: () => void,
  onRemove: () => void
}

function getRounded(i: number): string {
  return (Math.round(i * 100) / 100).toFixed(2)
}

const DelayCard = (props: DelayCardProps) => {

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}>
          <MaterialCommunityIcons name="waveform" size={24} color="black"/>
        </View>
      </View>
      <View style={styles.itemRight}>
        <Text style={styles.titleText}>{props.type} delay</Text>
        <View style={styles.paramsContainer}>
          <View style={styles.labelContainer}>
            <Text>Level: {getRounded(props.level)}</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text>Time: {getRounded(props.time)} s</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={{paddingRight: 10}} onPress={props.onEdit}>
        <Ionicons name="pencil" size={24} color="black"/>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onRemove}>
        <Ionicons name="trash" size={24} color="black"/>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  item: {
    backgroundColor: Theme.primary,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemRight: {
    flexGrow: 1
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: Theme.intenseBlue,
    borderRadius: 5,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontWeight: "bold"
  },
  paramsContainer: {
    flexDirection: "row",
  },
  labelContainer: {
    flexDirection: "row",
    flexGrow: 1
  },
})

export default DelayCard
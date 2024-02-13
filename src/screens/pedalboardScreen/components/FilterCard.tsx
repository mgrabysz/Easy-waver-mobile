import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Theme from "../../../themes/theme";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";

interface FilterCardProps {
  type: string,
  category: string,
  c_freq: number,
  onEdit: () => void,
  onRemove: () => void
}

const FilterCard = (props: FilterCardProps) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}>
          <MaterialCommunityIcons name="waveform" size={24} color="black"/>
        </View>
      </View>
      <View style={styles.itemRight}>
        <Text style={styles.titleText}>{props.type} filter</Text>
        <View style={styles.paramsContainer}>
          <View style={styles.labelContainer}>
            <Text>{props.category}</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text>{props.c_freq} Hz</Text>
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

export default FilterCard;

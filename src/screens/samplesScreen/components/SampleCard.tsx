import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import {Ionicons} from '@expo/vector-icons';
import Theme from "../../../themes/theme";

function trimExtension(filename: string) {
  return filename.replace(/\.[^/.]+$/, "")
}

interface SampleCardProps {
  name: string
  onPlayPressed: () => void
  onDeletePressed: () => void
}

const SampleCard = (props: SampleCardProps) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}>
          <Entypo name="note" size={15} color="black"/>
        </View>
        <Text style={styles.itemText}>{trimExtension(props.name)}</Text>
      </View>
      <View style={styles.itemRight}>
        <TouchableOpacity style={styles.iconHolder} onPress={props.onPlayPressed}>
          <Ionicons name="play-circle-outline" size={24} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconHolder} onPress={props.onDeletePressed}>
          <Ionicons name="trash" size={24} color="black"/>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    marginBottom: 20
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  itemRight: {
    flexDirection: 'row',
    columnGap: 20
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
  itemText: {
    maxWidth: '80%'
  },
  iconHolder: {}
})
export default SampleCard;
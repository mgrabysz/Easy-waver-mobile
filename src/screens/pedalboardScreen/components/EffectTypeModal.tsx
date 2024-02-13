import {EffectType} from "../../../model/EffectType";
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ModalStyles from "./ModalStyles";
import Theme from "../../../themes/theme";

export interface EffectTypeModalState {
  effectType: EffectType,
  isVisible: boolean
}

export function getDefaultEffectTypeModalState(): EffectTypeModalState {
  return {
    isVisible: false,
    effectType: EffectType.DELAY
  }
}

interface EffectTypeModalProps {
  state: EffectTypeModalState,
  onTypeChosen: (e: EffectType) => void,
  onDiscard: () => void
}

export function EffectTypeModal(props: EffectTypeModalProps) {

  let state = props.state

  return <Modal
    animationType={"slide"}
    transparent={true}
    visible={state.isVisible}
    onRequestClose={props.onDiscard}>
    <View style={ModalStyles.centeredView}>
      <View style={ModalStyles.modalView}>
        {Object.entries(EffectType).map((type, index) => {
          return (<TouchableOpacity key={index} style={styles.modalButton} onPress={() => {
              props.onTypeChosen(type[1])
            }}>
              <Text>{type[0]}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  </Modal>
}

const styles = StyleSheet.create({
  modalButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    elevation: 2,
    backgroundColor: Theme.secondary
  },
})
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Theme from "../../themes/theme";
import InputSampleCard from "./components/InputSampleCard";
import {useContext, useState} from "react";
import SamplesMetadataContext from "../../contexts/SamplesMetadataContext";
import DelayCard from "./components/DelayCard";
import DelayModal from "./components/DelayModal";
import {Entypo} from '@expo/vector-icons';
import {getDefaultDelay} from "../../utils/EffectUtils";
import {Effect} from "../../model/Effect";
import {DelayModalState, getDefaultDelayModalState} from "../../model/Delay";


export function PedalBoardScreen() {
  const {samplesMetadata, setSamplesMetadata} = useContext(SamplesMetadataContext)

  const [effects, setEffects] = useState<Effect[]>([])
  const [activeEffect, setActiveEffect] = useState<Effect>()
  const [isCreatingNew, setIsCreatingNew] = useState(true)

  const [delayModalState, setDelayModalState] = useState<DelayModalState>(getDefaultDelayModalState())

  function addEffect() {
    setActiveEffect(getDefaultDelay)
    setDelayModalState(getDefaultDelayModalState)
    setDelayModalState({...delayModalState, isVisible: true})
    setIsCreatingNew(true)
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scroll}>
        <InputSampleCard samplesMetadata={samplesMetadata}/>
        {effects.map((effect, index) => {
          const params = effect.params
          return (
            // @ts-ignore
            <DelayCard key={index} type={params.type} level={params.level} time={params.time}
                       onRemove={() => {
                         const newArray = [...effects]
                         newArray.splice(index, 1)
                         setEffects(newArray);
                       }}
                       onEdit={() => {
                         const activeEffect = effects[index]
                         setActiveEffect(activeEffect)
                         setDelayModalState({
                           time: activeEffect.params.time!,
                           type: activeEffect.params.type!,
                           level: activeEffect.params.level!,
                           isVisible: true
                         })
                       }}/>
          )
        })}
        <View style={styles.addEffectContainer}>
          <TouchableOpacity style={styles.addEffectButton} onPress={addEffect}>
            <Text>Add effect</Text>
            <Entypo name="circle-with-plus" size={24} color="black"/>
          </TouchableOpacity>
        </View>
        <DelayModal state={delayModalState}
                    setState={setDelayModalState}
                    onAccept={() => {
                      activeEffect!.params.type = delayModalState.type
                      activeEffect!.params.level = delayModalState.level
                      activeEffect!.params.time = delayModalState.time
                      if (isCreatingNew) {
                        const newArray = [...effects, activeEffect!];
                        setEffects(newArray)
                        setIsCreatingNew(false)
                      }
                      setDelayModalState(getDefaultDelayModalState())
                    }}
                    onDiscard={() => {
                      setDelayModalState({
                        ...delayModalState,
                        isVisible: false
                      })
                      setIsCreatingNew(false)
                      setActiveEffect(undefined)
                    }
                    }/>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.secondary
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  scroll: {
    width: '100%',
  },
  addEffectContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  addEffectButton: {
    backgroundColor: Theme.intenseBlue,
    width: 150,
    height: 40,
    flexDirection: "row",
    columnGap: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 20,
  }
});
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Theme from "../../themes/theme";
import InputSampleCard from "./components/InputSampleCard";
import React, {useContext, useEffect, useState} from "react";
import SamplesMetadataContext from "../../contexts/SamplesMetadataContext";
import DelayCard from "./components/DelayCard";
import {DelayModal, DelayModalState, getDefaultDelayModalState} from "./components/DelayModal";
import {Entypo} from '@expo/vector-icons';
import {getDefaultDelay, getDefaultFilter} from "../../utils/EffectUtils";
import {Effect} from "../../model/Effect";
import {EffectTypeModal, getDefaultEffectTypeModalState} from "./components/EffectTypeModal";
import {EffectType} from "../../model/EffectType";
import {FilterModal, FilterModalState, getDefaultFilterModalState} from "./components/FilterModal";
import FilterCard from "./components/FilterCard";
import {PedalBoardHeader} from "./components/PedalBoardHeader";
import {ObjectMapper} from "json-object-mapper";


// @ts-ignore
export function PedalBoardScreen({navigation}) {
  const {samplesMetadata, setSamplesMetadata} = useContext(SamplesMetadataContext)

  const [effects, setEffects] = useState<Effect[]>([])
  const [activeEffect, setActiveEffect] = useState<Effect>()
  const [isCreatingNew, setIsCreatingNew] = useState(true)

  const [effectTypeModalState, setEffectTypeModalState] = useState(getDefaultEffectTypeModalState)

  const [delayModalState, setDelayModalState] = useState<DelayModalState>(getDefaultDelayModalState())
  const [filterModalState, setFilterModalState] = useState<FilterModalState>(getDefaultFilterModalState())

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <PedalBoardHeader onPlayClicked={()=>{
        let stringified: String = ObjectMapper.serialize(effects[0]);
        console.log(stringified)
      }}/>
    })
  }, [effects]);

  function onAddEffectClicked() {
    setEffectTypeModalState({
      ...effectTypeModalState,
      isVisible: true
    })
  }

  function removeEffect(index: number) {
    const newArray = [...effects]
    newArray.splice(index, 1)
    setEffects(newArray);
  }

  function onEditEffectClicked(index: number, setModalState: any) {
    const activeEffect = effects[index]
    setActiveEffect(activeEffect)
    setModalState({
      ...activeEffect.params,
      isVisible: true
    })
  }

  function RenderEffectCards() {
    return effects.map((effect, index) => {
      const params = effect.params
      switch (effect.type) {
        case EffectType.DELAY:
          return (
            <DelayCard key={index} type={params.type} level={params.level} time={params.time}
                       onRemove={() => {
                         removeEffect(index);
                       }}
                       onEdit={() => {
                         onEditEffectClicked(index, setDelayModalState)
                       }}/>
          )
        case EffectType.FILTER:
          return (
            <FilterCard key={index} type={params.type} category={params.category} c_freq={params.c_freq}
                        onRemove={() => {
                          removeEffect(index);
                        }}
                        onEdit={() => {
                          onEditEffectClicked(index, setFilterModalState)
                        }}/>
          )
      }
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scroll}>
        <InputSampleCard samplesMetadata={samplesMetadata}/>
        <RenderEffectCards/>
        <View style={styles.addEffectContainer}>
          <TouchableOpacity style={styles.addEffectButton} onPress={onAddEffectClicked}>
            <Text>Add effect</Text>
            <Entypo name="circle-with-plus" size={24} color="black"/>
          </TouchableOpacity>
        </View>

      </ScrollView>
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
      <FilterModal state={filterModalState}
                   setState={setFilterModalState}
                   onDiscard={() => {
                     setFilterModalState({
                       ...filterModalState,
                       isVisible: false
                     })
                     setIsCreatingNew(false)
                     setActiveEffect(undefined)
                   }}
                   onAccept={() => {
                     activeEffect!.params.type = filterModalState.type
                     activeEffect!.params.category = filterModalState.category
                     activeEffect!.params.c_freq = filterModalState.c_freq
                     activeEffect!.params.order = filterModalState.order
                     if (isCreatingNew) {
                       const newArray = [...effects, activeEffect!]
                       setEffects(newArray)
                       setIsCreatingNew(false)
                     }
                     setFilterModalState(getDefaultFilterModalState)
                   }}/>
      <EffectTypeModal state={effectTypeModalState}
                       onDiscard={() => {
                         setEffectTypeModalState({
                           ...effectTypeModalState,
                           isVisible: false
                         })
                       }}
                       onTypeChosen={(effectType) => {
                         switch (effectType) {
                           case EffectType.DELAY:
                             setActiveEffect(getDefaultDelay)
                             setDelayModalState(getDefaultDelayModalState)
                             setDelayModalState({...delayModalState, isVisible: true})
                             break
                           case EffectType.FILTER:
                             setActiveEffect(getDefaultFilter)
                             setFilterModalState(getDefaultFilterModalState)
                             setFilterModalState({...filterModalState, isVisible: true})
                         }
                         setIsCreatingNew(true)
                         setEffectTypeModalState({effectType: effectType, isVisible: false})
                       }}/>
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
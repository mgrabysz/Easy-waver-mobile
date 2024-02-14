import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Theme from "../../themes/theme";
import InputSampleCard from "./components/InputSampleCard";
import React, {useContext, useEffect, useState} from "react";
import SamplesMetadataContext from "../../contexts/SamplesMetadataContext";
import DelayCard from "./components/DelayCard";
import {DelayModal, DelayModalState, extractDelayParams, getDefaultDelayModalState} from "./components/DelayModal";
import {FilterModal, FilterModalState, extractFilterParams, getDefaultFilterModalState} from "./components/FilterModal";
import {Entypo} from '@expo/vector-icons';
import {getDefaultDelay, getDefaultFilter} from "../../utils/EffectUtils";
import {Effect} from "../../model/Effect";
import {EffectTypeModal, getDefaultEffectTypeModalState} from "./components/EffectTypeModal";
import {EffectType} from "../../model/EffectType";
import FilterCard from "./components/FilterCard";
import {PedalBoardHeader} from "./components/PedalBoardHeader";
import {Container} from "typedi";
import RestClient from "../../network/RestClient";


// @ts-ignore
export function PedalBoardScreen({navigation}) {
  const {samplesMetadata, setSamplesMetadata} = useContext(SamplesMetadataContext)

  const [selectedSample, setSelectedSample] = useState('');

  const [effects, setEffects] = useState<Effect[]>([])
  const [activeEffect, setActiveEffect] = useState<Effect>()
  const [isCreatingNew, setIsCreatingNew] = useState(true)

  const [effectTypeModalState, setEffectTypeModalState] = useState(getDefaultEffectTypeModalState)

  const [delayModalState, setDelayModalState] = useState<DelayModalState>(getDefaultDelayModalState())
  const [filterModalState, setFilterModalState] = useState<FilterModalState>(getDefaultFilterModalState())

  const restClient = Container.get(RestClient)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <PedalBoardHeader onPlayClicked={() => {
        restClient.postModulation(selectedSample, "New Beethoven.wav", effects).then(refreshSamplesMetadata)
      }}/>
    })
  }, [effects]);

  async function refreshSamplesMetadata(): Promise<void> {
    restClient.getSamplesMetadata()
      .then(samples => {
        setSamplesMetadata(samples)
      })
      .catch(error => {
        console.log(error)
        alert("Error fetching data")
      })
  }


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
  if (samplesMetadata.length > 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scroll}>
          <InputSampleCard samplesMetadata={samplesMetadata} selectedSample={selectedSample} setSelectedSample={setSelectedSample}/>
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
                      activeEffect!.params = extractDelayParams(delayModalState);
                      if (isCreatingNew) {
                        const newArray = [...effects, activeEffect!];
                        setEffects(newArray)
                        setIsCreatingNew(false)
                      }
                      setDelayModalState(getDefaultDelayModalState)
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
                       activeEffect!.params = extractFilterParams(filterModalState)
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
                               setDelayModalState({...getDefaultDelayModalState(), isVisible: true})
                               break
                             case EffectType.FILTER:
                               setActiveEffect(getDefaultFilter)
                               setFilterModalState({...getDefaultFilterModalState(), isVisible: true})
                           }
                           setIsCreatingNew(true)
                           setEffectTypeModalState({effectType: effectType, isVisible: false})
                         }}/>
      </SafeAreaView>
    );
  }
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
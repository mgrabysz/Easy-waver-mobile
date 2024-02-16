import {Service} from "typedi";
import {Effect, EffectType} from "../model/Effect";
import {Delay} from "../model/Delay";
import {DelayDTO, FilterDTO} from "../model/ModelsDTO";
import {Filter} from "../model/Filter";

@Service()
export default class EffectMapper {

  public constructor() {
  }

  public mapEffectsToDTO(effects: Effect[]) {
    return effects.map(effect => {
      switch (effect.type) {
        case EffectType.DELAY:
          // @ts-ignore
          return this.mapDelayToDTO(effect)
        case EffectType.FILTER:
          return this.mapFilterToDTO(effect)
      }
    });
  }

  private mapDelayToDTO(effect: Delay): DelayDTO {
    const params = effect.params
    return {
      effect_type: "delay",
      params: {
        delay_type: params.type.toLowerCase() + "_comb",
        level: params.level,
        time: params.time
      }
    }
  }

  private mapFilterToDTO(effect: Filter): FilterDTO {
    const params = effect.params
    return {
      effect_type: "filter",
      params: {
        filter_type: params.type.toLowerCase(),
        category: params.category.toLowerCase(),
        c_freq: params.c_freq,
        bandwidth: params.bandwidth,
        order: params.order
      }
    }
  }
}
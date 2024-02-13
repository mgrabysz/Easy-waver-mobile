import {EffectType} from "./EffectType";

export interface Effect {

  type: EffectType
  params: {
    type: string | undefined
    level: number | undefined
    time: number | undefined
  }

}
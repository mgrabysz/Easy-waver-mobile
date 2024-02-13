import {EffectType} from "../model/EffectType";
import {Effect} from "../model/Effect";

export function getDefaultDelay(): Effect {
  return {
    type: EffectType.DELAY,
    params: {
      type: 'IIR',
      level: 0.5,
      time: 0.5
    }}
}

export function getDefaultFilter(): Effect {
  return {
    type: EffectType.FILTER,
    params: {
      type: 'Canonical'
    }
  }
}
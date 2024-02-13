import {EffectType} from "../model/EffectType";
import {Effect} from "../model/Effect";

export function getDefaultDelay(): Effect {
  return new Effect(EffectType.DELAY, {
    type: 'IIR',
    level: 0.5,
    time: 0.5
  })
}

export function getDefaultFilter(): Effect {
  return new Effect(EffectType.FILTER, {
    type: "Canonical"
  })
}
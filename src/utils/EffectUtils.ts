import {EffectType} from "../model/EffectType";
import {Delay, DelayType} from "../model/Delay";
import {Filter, FilterCategory, FilterType} from "../model/Filter";

export function getDefaultDelay(): Delay {
  return new Delay(EffectType.DELAY,
    DelayType.IIR,
    0.5,
    0.5
  )
}

export function getDefaultFilter(): Filter {
  return new Filter(EffectType.FILTER, FilterType.CANONICAL, FilterCategory.LOWPASS, 400)
}

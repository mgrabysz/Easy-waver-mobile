import {EffectType} from "./Effect";

export enum FilterType {
  CANONICAL = "Canonical",
  BUTTER = "Butter"
}

export enum FilterCategory {
  LOWPASS = "lowpass",
  HIGHPASS = "highpass",
  BANDPASS = "bandpass",
  BANDREJECT = "bandreject"
}

export interface Filter {
  type: EffectType,
  params: {
    type: FilterType
    category: FilterCategory
    c_freq: number
    bandwidth?: number
    order?: number
  }
}

export function getDefaultFilter(): Filter {
  return {
    type: EffectType.FILTER,
    params: {
      type: FilterType.CANONICAL,
      category: FilterCategory.LOWPASS,
      c_freq: 400
    }
  }
}

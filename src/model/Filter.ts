import {JsonProperty, Serializer} from "json-object-mapper";
import {Effect} from "./Effect";
import {EffectType} from "./EffectType";

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

class FilterTypeSerializer implements Serializer {
  serialize = (value: FilterType): string => {
    return '"' + value.toLowerCase() + '"'
  }
}

class FilterCategorySerializer implements Serializer {
  serialize = (value: FilterCategory): string => {
    return '"' + value.toLowerCase() + '"'
  }
}

class Params {
  @JsonProperty({name: "filter_type", serializer: FilterTypeSerializer})
  type: FilterType
  @JsonProperty({name: "category", serializer: FilterCategorySerializer})
  category: FilterCategory
  c_freq: number
  bandwidth?: number
  order?: number

  constructor(type: FilterType, category: FilterCategory, c_freq: number) {
    this.type = type
    this.category = category
    this.c_freq = c_freq
  }
}

export class Filter extends Effect {

  params: Params

  constructor(effectType: EffectType, filterType: FilterType, category: FilterCategory, c_freq: number) {
    super(effectType);
    this.params = new Params(filterType, category, c_freq)
  }
}

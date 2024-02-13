import {Serializer} from "json-object-mapper";

export enum EffectType {
  DELAY = "Delay",
  FILTER = "Filter"
}

export class EffectTypeSerializer implements Serializer {
  serialize = (value: EffectType): string => {
    return '"' + value.toLowerCase() + '"'
  }
}

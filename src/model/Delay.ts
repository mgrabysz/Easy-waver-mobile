import {Effect} from "./Effect";
import {JsonProperty, Serializer} from "json-object-mapper";
import {EffectType} from "./EffectType";

export enum DelayType {
  IIR = "IIR",
  FIR = "FIR"
}

class DelayTypeSerializer implements Serializer {
  serialize = (value: DelayType): string => {
    return '"' + value.toLowerCase() + '_comb"'
  }
}

class Params {
  @JsonProperty({name: "delay_type", serializer: DelayTypeSerializer})
  type: DelayType
  level: number
  time: number

  constructor(type: DelayType, level: number, time: number) {
    this.type = type;
    this.level = level;
    this.time = time;
  }
}
export class Delay extends Effect {

  params: Params

  constructor(effectType: EffectType, delayType: DelayType, level: number, time: number) {
    super(effectType);
    this.params = new Params(delayType, level, time);
  }
}
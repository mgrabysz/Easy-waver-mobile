import {EffectType} from "./Effect";

export enum DelayType {
  IIR = "IIR",
  FIR = "FIR"
}

export interface Delay {
  type: EffectType.DELAY,
  params: {
    type: DelayType
    level: number
    time: number
  }
}

export function getDefaultDelay(): Delay {
  return {
    type: EffectType.DELAY,
    params: {
      type: DelayType.IIR,
      level: 0.5,
      time: 0.5
    }
  }
}
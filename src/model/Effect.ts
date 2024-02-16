export enum EffectType {
  DELAY = "Delay",
  FILTER = "Filter"
}

export interface Effect {
  type: EffectType,
  params: any
}

export interface DelayModalState {
  isVisible: boolean,
  type: string,
  level: number,
  time: number
}

export function getDefaultDelayModalState() {
  return {
    isVisible: false,
    type: "IIR",
    level: 0.5,
    time: 0.5
  }
}
export interface DelayDTO {
  effect_type: string,
  params: {
    delay_type: string,
    time: number,
    level: number
  }
}

export interface FilterDTO {
  effect_type: string,
  params: {
    filter_type: string,
    category: string,
    c_freq: number,
    bandwidth?: number,
    order?: number
  }
}
import {EffectType, EffectTypeSerializer} from "./EffectType";
import {JsonProperty} from "json-object-mapper";

export class Effect {

  constructor(type: EffectType, params: any) {
    this.type = type;
    this.params = params;
  }

  @JsonProperty({name: "effect_type", serializer: EffectTypeSerializer})
  type: EffectType
  params: any

}
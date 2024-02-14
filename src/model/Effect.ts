import {EffectType, EffectTypeSerializer} from "./EffectType";
import {JsonProperty} from "json-object-mapper";

export abstract class Effect {

  protected constructor(type: EffectType) {
    this.type = type;
  }

  @JsonProperty({name: "effect_type", serializer: EffectTypeSerializer})
  type: EffectType
  params: any
}

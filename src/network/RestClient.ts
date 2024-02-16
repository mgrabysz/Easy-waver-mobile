import axios, {AxiosResponse} from "axios"
import {Container, Service} from "typedi";
import * as FileSystem from 'expo-file-system';
import {Effect} from "../model/Effect";
import EffectMapper from "../internal/EffectMapper";

@Service()
export default class RestClient {

  private baseUrl = process.env.EXPO_PUBLIC_API_URL
  private mapper = Container.get(EffectMapper)

  public constructor() {
  }

  public async getSamplesMetadata(): Promise<SampleMetadata[]> {
    const url = `${this.baseUrl}/files/`
    const response = await axios.get(url)
    return response.data
  }

  public async uploadSample(uri: string): Promise<void> {
    console.log('Uploading sample')
    const url = `${this.baseUrl}/files/`
    try {
      const response = await FileSystem.uploadAsync(url, uri, {
        mimeType: 'audio/wav',
        fieldName: 'file',
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(JSON.stringify(response, null, 4));
    } catch (error) {
      console.log(error);
    }
  }

  public async postModulation(sourceSampleName: string, newSampleName: string, effects: Effect[]): Promise<AxiosResponse> {
    const url = `${this.baseUrl}/modulations/`
    const effectsDTO = this.mapper.mapEffectsToDTO(effects)
    const body = {
      sample: {
        name: sourceSampleName
      },
      pedalboard: {
        effects: effectsDTO
      },
      new_name: newSampleName
    }
    console.log(body)
    return await axios.post(url, body);
  }
}

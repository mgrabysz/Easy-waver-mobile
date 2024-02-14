import axios, {AxiosResponse} from "axios"
import {Service} from "typedi";
import * as FileSystem from 'expo-file-system';
import {Effect} from "../model/Effect";
import {ObjectMapper} from "json-object-mapper";

@Service()
export default class RestClient {

  private baseUrl = process.env.EXPO_PUBLIC_API_URL

  public constructor() {
  }

  public async getSamplesMetadata(): Promise<SampleMetadata[]> {
    // mock
    // return mockSamples
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
    const body = {
      sample: {
        name: sourceSampleName
      },
      pedalboard: {
        // @ts-ignore
        effects: JSON.parse(ObjectMapper.serialize(effects))
      },
      new_name: newSampleName
    }
    const response = await axios.post(url, body)
    return response;
  }
}

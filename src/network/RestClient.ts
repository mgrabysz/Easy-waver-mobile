import axios, {AxiosResponse} from "axios"
import {Container, Service} from "typedi";
import * as FileSystem from 'expo-file-system';
import {Effect} from "../model/Effect";
import EffectMapper from "../internal/EffectMapper";
import {FirebaseAuth} from "../../firebaseConfig";

@Service()
export default class RestClient {

  private baseUrl = process.env.EXPO_PUBLIC_API_URL
  private mapper = Container.get(EffectMapper)

  public constructor() {
  }

  public async getSamplesMetadata(): Promise<SampleMetadata[]> {
    const url = `${this.baseUrl}/files/`
    const token = await this.getUserToken()
    const config = this.getAuthConfig(token)
    const response = await axios.get(url, config)
    return response.data
  }

  public async uploadSample(uri: string): Promise<void> {
    console.log('Uploading sample')
    const url = `${this.baseUrl}/files/`
    const token = await this.getUserToken()
    try {
      const response = await FileSystem.uploadAsync(url, uri, {
        mimeType: 'audio/wav',
        fieldName: 'file',
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
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
    const token = await this.getUserToken()
    const config = this.getAuthConfig(token)
    return await axios.post(url, body, config);
  }

  public async testAuthorization() {
    const url = `${this.baseUrl}/firebase_user`
    const token = await this.getUserToken()
    const config = this.getAuthConfig(token)
    const response = await axios.get(url, config)
    console.log(response.data)
    return response.data
  }

  public async deleteSample(sampleName: string): Promise<void> {
    const url = `${this.baseUrl}/files/${sampleName}`
    const token = await this.getUserToken()
    const config = this.getAuthConfig(token)
    await axios.delete(url, config)
  }

  public async initializeStorage(): Promise<void> {
    const url = `${this.baseUrl}/files/init}`
    const token = await this.getUserToken()
    const config = this.getAuthConfig(token)
    await axios.post(url, null, config)
  }

  private async getUserToken() {
    const token = await FirebaseAuth.currentUser?.getIdToken()
    if (token == null) {
      throw Error("Token could not be retrieved")
    }
    return token
  }

  private getAuthConfig(token: string) {
    return {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  }
}

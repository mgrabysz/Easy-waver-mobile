import axios from "axios"
import {Service} from "typedi";

@Service()
export default class RestClient {

  private baseUrl = process.env.EXPO_PUBLIC_API_URL

  public constructor() {
  }

  public async getSamplesMetadata(): Promise<SampleMetadata[]> {
    const url = `${this.baseUrl}/files/`
    const response = await axios.get(url)
    return response.data
  }

  // nie udało się
  // public async getSampleContent(): Promise<string>{
  //   const url = `${this.baseUrl}/files/wave_FAC.wav`
  //   const response = await axios.get(url, {
  //     responseType: 'blob'
  //   })
  //   return response.data
  // }


}
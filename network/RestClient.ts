import axios from "axios"
import {Service} from "typedi";

@Service()
export default class RestClient {

  private baseUrl = "http://10.0.2.2:8000"

  public constructor() {
  }

  public async getSamplesMetadata(config: Object = {}): Promise<SampleMetadata[]> {
    const url = `${this.baseUrl}/files/`
    const response = await axios.get(url)
    return response.data
  }


}
import {Service} from "typedi";
import {Audio} from "expo-av";

@Service()
export default class SoundClient {

  private baseUrl = process.env.EXPO_PUBLIC_API_URL

  public constructor() {
  }

  public async getSound(sampleName: string): Promise<Audio.Sound> {
    const sampleUrl = `${this.baseUrl}/files/${sampleName}`
    const {sound} = await Audio.Sound.createAsync({uri: sampleUrl});
    return sound
  }
}
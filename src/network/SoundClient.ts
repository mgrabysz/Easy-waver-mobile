import {Service} from "typedi";
import {Audio} from "expo-av";
import {FirebaseAuth} from "../../firebaseConfig";

@Service()
export default class SoundClient {

  private baseUrl = process.env.EXPO_PUBLIC_API_URL

  public constructor() {
  }

  public async getSound(sampleName: string): Promise<Audio.Sound> {
    const sampleUrl = `${this.baseUrl}/files/${sampleName}`
    const token = await this.getUserToken()
    const {sound} = await Audio.Sound.createAsync({
      uri: sampleUrl, headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return sound
  }

  private async getUserToken() {
    const token = await FirebaseAuth.currentUser?.getIdToken()
    if (token == null) {
      throw Error("Token could not be retrieved")
    }
    return token
  }
}
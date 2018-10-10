import { EmotivePoint } from "../shared/models/emotivePoint";
import { Face } from "../shared/models/faces";
import * as FaceApi from "../shared/faceapi";
import * as emojiLookup from "emoji-dictionary";

const EMOJIS_TO_TRAIN = [
  "☺️",
  "🤓",
  "😃",
  "😆",
  "😉",
  "😍",
  "😎",
  "😐",
  "😕",
  "😖",
  "😘",
  "😜",
  "😝",
  "😠",
  "😧",
  "😩",
  "😬",
  "😭",
  "😱",
  "😳",
  "😴"
];

async function getCalibrationArrayString(context) {
  let str = "[";

  for (let emoji of EMOJIS_TO_TRAIN) {
    context.log(`Processing ${emoji}`);
    // Given an emoji like 😴 returns the word version, like 'sleepy'
    let emojiName = emojiLookup.getName(emoji);
    let emotion = await FaceApi.getEmotionFromLocalProxyImage(context, emojiName);
    // console.debug(emotion);
    let point = new EmotivePoint(emotion);
    let face = new Face(point, null);
    // context.log(`Existing emojis is ${face.mojiIcon}`);
    str += `{
        emotiveValues: new EmotivePoint({
            anger: ${emotion.anger},
            contempt: ${emotion.contempt},
            disgust: ${emotion.disgust},
            fear: ${emotion.fear},
            happiness: ${emotion.happiness},
            neutral: ${emotion.neutral},
            sadness: ${emotion.sadness},
            surprise: ${emotion.surprise}
        }),
        emojiIcon: "${emoji}"
      },`;
  }
  str += "]";
  return str;
}

export async function index(context, req) {
    context.log(`Calibrate HTTP trigger`);

    const array = await getCalibrationArrayString(context);
    const body = {MOJIS: array};

    context.res = {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    };
}
